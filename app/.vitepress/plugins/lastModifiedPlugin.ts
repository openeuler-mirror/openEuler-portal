import { exec } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { minimatch } from 'minimatch';
import pLimit from 'p-limit';
import path from 'path';
import type { PluginContext } from 'rollup';
import { promisify } from 'util';
import type { Plugin } from 'vite';

const execAsync = promisify(exec);

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface PageInfo {
  lastmod: number;
  changefreq: ChangeFreq;
}

export interface LastModifiedPluginOptions {
  /** Absolute path to the git repository root.
   *  Default: 3 levels up from this file. */
  gitRoot?: string;
  /** Absolute path to the app source directory, used as base for output JSON keys.
   *  Default: 2 levels up from this file. */
  appDir?: string;
  /** Absolute path for the output JSON file.
   *  Default: `<this file's directory>/../last-modified.json` */
  outputFile?: string;
  /** Max number of concurrent `git log` processes. Default: 20. */
  concurrency?: number;
  /** Number of recent commits to fetch per file for changefreq calculation. Default: 10. */
  commitCount?: number;
  /** Glob patterns (relative to appDir) to exclude MD pages from analysis. */
  ignore?: string | string[];
  /** Glob patterns (relative to appDir) to exclude dependency files from traversal and timestamp calculation. */
  ignoreDeps?: string | string[];
}

/** Normalize to forward-slash so comparisons work on both Windows and Unix */
function toFwdSlash(p: string): string {
  return p.replace(/\\/g, '/');
}

/**
 * Derive a changefreq value from a sorted list of commit timestamps (ms).
 * Uses the average interval between consecutive commits.
 */
function calcChangefreq(timestamps: number[]): ChangeFreq {
  if (timestamps.length < 2) return 'never';
  const sorted = [...timestamps].sort((a, b) => a - b);
  let total = 0;
  for (let i = 1; i < sorted.length; i++) {
    total += sorted[i] - sorted[i - 1];
  }
  const avgDays = total / (sorted.length - 1) / 86_400_000;
  if (avgDays <= 1) return 'daily';
  if (avgDays <= 7) return 'weekly';
  if (avgDays <= 30) return 'monthly';
  if (avgDays <= 365) return 'yearly';
  return 'never';
}

export default function viteLastModifiedPlugin(options: LastModifiedPluginOptions = {}): Plugin {
  // Always store as forward-slash paths to match Vite module IDs
  const gitRoot = toFwdSlash(options.gitRoot ?? path.resolve(__dirname, '../../../'));
  const appDir = toFwdSlash(options.appDir ?? path.resolve(__dirname, '../../'));
  const outputFile = options.outputFile ?? path.resolve(__dirname, '../last-modified.json');
  const concurrency = options.concurrency ?? 20;
  const commitCount = options.commitCount ?? 10;
  const ignorePatterns = options.ignore
    ? Array.isArray(options.ignore) ? options.ignore : [options.ignore]
    : [];
  const ignoreDepPatterns = options.ignoreDeps
    ? Array.isArray(options.ignoreDeps) ? options.ignoreDeps : [options.ignoreDeps]
    : [];

  const result: Record<string, PageInfo> = {};
  let isSsr: boolean;

  return {
    name: 'vite-last-modified',

    configResolved(config) {
      isSsr = config.build.ssr;
    },

    async buildEnd() {
      if (isSsr) {
        return;
      }
      // Per-build cache: file id -> Promise<timestamps[]> (ms, newest first)
      const cache = new Map<string, Promise<number[]>>();
      const limit = pLimit(concurrency);

      const getGitTimestamps = (absolutePath: string): Promise<number[]> => {
        if (cache.has(absolutePath)) {
          return cache.get(absolutePath)!;
        }
        const promise = limit(async () => {
          try {
            // Strip query string (e.g. ?vue&type=script&...) before asking git
            const cleanPath = absolutePath.includes('?')
              ? absolutePath.slice(0, absolutePath.indexOf('?'))
              : absolutePath;
            const rel = path.relative(gitRoot, cleanPath).replace(/\\/g, '/');
            const { stdout } = await execAsync(
              `git log --follow -n ${commitCount} --format=%at -- "${rel}"`,
              { cwd: gitRoot },
            );
            return stdout.trim()
              ? stdout.trim().split('\n').map((l) => parseInt(l, 10) * 1000)
              : [];
          } catch {
            return [];
          }
        });
        cache.set(absolutePath, promise);
        return promise;
      };

      const collectDeps = (fileId: string, visited: Set<string>, ctx: PluginContext): void => {
        if (visited.has(fileId)) return;
        visited.add(fileId);
        const info = ctx.getModuleInfo(fileId);
        if (info) {
          for (const depId of info.importedIds) {
            if (!depId.startsWith(appDir)) {
              continue;
            }
            // depId is always forward-slash; slice directly instead of path.relative
            const rel = depId.slice(appDir.length).replace(/^\/?/, '').split('?')[0];
            if (ignorePatterns.some((p) => minimatch(rel, p, { dot: true }))) {
              continue;
            }
            if (ignoreDepPatterns.some((p) => minimatch(rel, p, { dot: true }))) {
              continue;
            }
            collectDeps(depId, visited, ctx);
          }
        }
      };

      const mdFiles = [...this.getModuleIds()].filter((id) => {
        if (!id.endsWith('.md') || !existsSync(id)) {
          return false;
        }
        if (!id.startsWith(appDir)) {
          return false;
        }
        const rel = id.slice(appDir.length).replace(/^\//, '');
        if (!rel.startsWith('zh/') && !rel.startsWith('en/')) {
          return false;
        }
        return !ignorePatterns.some((p) => minimatch(rel, p, { dot: true }));
      });

      if (mdFiles.length === 0) {
        console.warn('[lastModifiedPlugin] No MD files found in module graph');
        return;
      }

      console.log('[lastModifiedPlugin] start collect MD files deps');
      // Phase 1 (sync): traverse module graph, collect dep sets per MD file
      const mdDepMap = new Map<string, Set<string>>();
      for (const mdFile of mdFiles) {
        const deps = new Set<string>();
        collectDeps(mdFile, deps, this);
        mdDepMap.set(mdFile, deps);
      }
      console.log(`[lastModifiedPlugin] Analyzed ${mdFiles.length} MD files`);

      // Phase 2 (async): fire all git queries with bounded concurrency
      const allFiles = new Set<string>();
      for (const deps of mdDepMap.values()) {
        for (const dep of deps) {
          allFiles.add(dep);
        }
      }
      await Promise.all([...allFiles].map(getGitTimestamps));

      // Phase 3: compute lastmod + changefreq per MD page (git results already cached)
      for (const [mdFile, deps] of mdDepMap) {
        const relKey = mdFile.slice(appDir.length).replace(/^\//, '');
        const allTimestamps = (await Promise.all([...deps].map(getGitTimestamps))).flat();
        const lastmod = allTimestamps.length > 0 ? Math.max(...allTimestamps) : 0;
        const changefreq = calcChangefreq(allTimestamps);
        result[relKey] = { lastmod, changefreq };
      }
    },

    closeBundle() {
      if (isSsr) {
        return;
      }
      const sorted = Object.fromEntries(
        Object.entries(result).sort(([a], [b]) => a.localeCompare(b))
      );
      writeFileSync(outputFile, JSON.stringify(sorted, null, 2), 'utf8');
      console.log(`[lastModifiedPlugin] Written ${outputFile}`);
    },
  };
}

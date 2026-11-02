import { expect, describe, it } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const PROJECT_ROOT = process.cwd();

// 已下线条目的标识串：源码与数据中不应再出现任何引用（测试守卫文件本身除外）
const REMOVED_MARKERS = ['business-practice', 'xinhuo'];

// 文本类扩展名（排除二进制：图片 / 字体 / 压缩包等）
const TEXT_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.vue', '.yaml', '.yml', '.md', '.json',
  '.scss', '.css', '.html', '.cjs', '.mjs', '.mts',
]);

// 递归扫描时跳过的目录名（basename 匹配，任意层级生效）
const SKIP_DIRS = new Set([
  '.git', 'node_modules', 'dist', 'tests', '.opencode', '.claude',
  '.agents', '.codegraph', 'cache', '.cache', '.tmp',
]);

function collectTextFiles(rootDir: string): string[] {
  if (!existsSync(rootDir)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      if (SKIP_DIRS.has(entry)) continue;
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (TEXT_EXT.has(extname(full))) out.push(full);
    }
  };
  walk(rootDir);
  return out;
}

function findMarkerHits(markers: string[]): { file: string; marker: string }[] {
  const hits: { file: string; marker: string }[] = [];
  const files = collectTextFiles(PROJECT_ROOT);
  for (const file of files) {
    let text: string;
    try {
      text = readFileSync(file, 'utf-8');
    } catch {
      continue;
    }
    for (const marker of markers) {
      if (text.includes(marker)) {
        hits.push({ file: file.replace(PROJECT_ROOT + '/', ''), marker });
      }
    }
  }
  return hits;
}

describe('"商业实践单位遴选" banner 全仓零引用扫描（设计 §5 tester 补测：business-practice 字符串全仓零引用）', () => {
  it('源码与数据中无任何文件引用 "business-practice"（排除 tests/ 守卫自身）', () => {
    const hits = findMarkerHits(['business-practice']);
    expect(
      hits,
      `不应存在引用 business-practice 的源码文件，命中：\n${hits.map((h) => `  - ${h.file}`).join('\n')}`
    ).toHaveLength(0);
  });

  it('源码与数据中无任何文件引用 "xinhuo"（custom_class 下线后零残留，排除 tests/ 守卫自身）', () => {
    const hits = findMarkerHits(['xinhuo']);
    expect(
      hits,
      `不应存在引用 xinhuo 的源码文件，命中：\n${hits.map((h) => `  - ${h.file}`).join('\n')}`
    ).toHaveLength(0);
  });

  it('business-practice / xinhuo 同时扫描均零命中', () => {
    const hits = findMarkerHits(REMOVED_MARKERS);
    expect(hits).toHaveLength(0);
  });
});

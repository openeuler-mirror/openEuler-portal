// Generic loader for the project's root `.content/` directory.
//
// `.content/` holds runtime-editable structured data (YAML) that operations
// folks edit by hand and ship via PR. This module wires those files into
// the build by:
//   - parsing every YAML under .content/ at build time (vite-plugin-yaml)
//   - emitting a stable URL for every image under .content/
//
// Conventions:
//   .content/<domain>/<slug>.yaml   one data record per file
//   .content/<domain>/images/...    images referenced by `image:` fields
//
// Why relative globs (not the `@content` alias):
//   VitePress sets Vite's workspace root to `app/`. `.content/` lives outside
//   that root, and aliases inside `import.meta.glob()` don't follow it. The
//   relative-path form Vite docs sanction does work, so the four `../` segments
//   here are intentional. The detail is sealed inside this file so callers
//   never see it.
//
// Usage:
//   import { loadFile, loadFiles, loadDomain, resolveAsset } from '@/utils/content';

const allYaml = import.meta.glob(
  '../../../../.content/**/*.{yaml,yml}',
  { eager: true, import: 'default' }
) as Record<string, unknown>;

const allImages = import.meta.glob(
  '../../../../.content/**/images/**/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true, import: 'default', query: '?url' }
) as Record<string, string>;

// ── Internal helpers ────────────────────────────────────────────────────────

function entriesForDomain(domain: string): Array<[string, unknown]> {
  const needle = `/.content/${domain}/`;
  const out: Array<[string, unknown]> = [];
  for (const [path, data] of Object.entries(allYaml)) {
    const idx = path.indexOf(needle);
    if (idx === -1) continue;
    const sub = path.slice(idx + needle.length);
    if (sub.includes('/')) continue; // only direct children of <domain>/
    const slug = sub.replace(/\.(yaml|yml)$/, '');
    out.push([slug, data]);
  }
  return out;
}

// ── Public API ──────────────────────────────────────────────────────────────

/** Load one file: `.content/<domain>/<slug>.yaml`. Throws if missing. */
export function loadFile<T = unknown>(domain: string, slug: string): T {
  const hit = entriesForDomain(domain).find(([s]) => s === slug);
  if (!hit) {
    const available = entriesForDomain(domain).map(([s]) => s).join(', ') || '(none)';
    throw new Error(
      `[content] no file: .content/${domain}/${slug}.yaml — available: ${available}`
    );
  }
  return hit[1] as T;
}

/** Load multiple files in the order given. Throws on any miss. */
export function loadFiles<T = unknown>(domain: string, slugs: string[]): T[] {
  return slugs.map((s) => loadFile<T>(domain, s));
}

/** Load every direct YAML under `.content/<domain>/`, sorted alphabetically. */
export function loadDomain<T = unknown>(
  domain: string
): Array<{ slug: string; data: T }> {
  return entriesForDomain(domain)
    .map(([slug, data]) => ({ slug, data: data as T }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Resolve an asset under `.content/<domain>/images/`. Returns the URL Vite
 * emits. Throws at module-evaluation time if the file is missing, so a typo
 * in a YAML `image:` field breaks the build instead of rendering a 404.
 */
export function resolveAsset(domain: string, relPath: string): string {
  const suffix = `/.content/${domain}/images/${relPath}`;
  for (const [key, url] of Object.entries(allImages)) {
    if (key.endsWith(suffix)) return url;
  }
  throw new Error(`[content] image not found: ${domain}/images/${relPath}`);
}

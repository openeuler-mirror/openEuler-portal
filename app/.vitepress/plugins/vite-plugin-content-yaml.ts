// 把 `.content/**/*.yaml` 接入 Vite 资源管线,支持单文件与目录粒度 import。
//
// - 单文件:`*.yaml` → JS module,值中形如 `./images/x.png` 的字符串改写为 `import`,
//   让 Vite 输出带 hash 的真实资源 URL。
// - 目录:`#content/<domain>` → 该目录下所有 yaml 按 slug 索引的虚拟模块。
//
// 用 `load` 而非 `transform`:VitePress 内置插件会把 `.yaml` 当 raw text 兜底,
// 只挂 transform 会被它再包一层 `export default "..."`。

import type { Plugin } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ASSET_EXT = /\.(png|jpe?g|webp|svg|gif)$/i;
const SENTINEL = '__VITE_CONTENT_ASSET_';
const VIRTUAL_PREFIX = '\0content-dir:';
const CONTENT_ALIAS = '#content';

export default function contentYamlPlugin(): Plugin {
  let contentRoot: string | undefined;

  return {
    name: 'vite-plugin-content-yaml',
    enforce: 'pre',

    configResolved(config) {
      const found = config.resolve.alias.find((a) => a.find === CONTENT_ALIAS);
      contentRoot = found?.replacement;
    },

    async resolveId(id) {
      if (!contentRoot) return;
      if (/\.ya?ml$/.test(id)) return;

      // Vite 内置 alias 插件可能在我们之前把 `#content/<x>` 展开成绝对路径,两种形态都要认。
      let abs: string | undefined;
      if (id.startsWith(`${CONTENT_ALIAS}/`)) {
        abs = path.resolve(contentRoot, id.slice(CONTENT_ALIAS.length + 1));
      } else if (path.isAbsolute(id) && (id === contentRoot || id.startsWith(`${contentRoot}/`))) {
        abs = id;
      }
      if (!abs) return;

      try {
        const stat = await fs.promises.stat(abs);
        if (stat.isDirectory()) return VIRTUAL_PREFIX + abs;
      } catch {
        /* not a directory — fall through */
      }
      return;
    },

    async load(id) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        const dir = id.slice(VIRTUAL_PREFIX.length);
        const files = (await fs.promises.readdir(dir))
          .filter((f) => /\.ya?ml$/.test(f))
          .sort();
        const imports: string[] = [];
        const entries: string[] = [];
        files.forEach((f, i) => {
          const slug = f.replace(/\.ya?ml$/, '');
          const fp = path.join(dir, f);
          imports.push(`import __d${i} from ${JSON.stringify(fp)};`);
          entries.push(`${JSON.stringify(slug)}: __d${i}`);
        });
        return {
          code: `${imports.join('\n')}\nexport default { ${entries.join(', ')} };\n`,
          map: null,
        };
      }

      const clean = id.split('?', 1)[0];
      if (!/\.ya?ml$/.test(clean)) return;

      const code = await fs.promises.readFile(clean, 'utf-8');
      const data = yaml.load(code);
      const imports: string[] = [];

      // 字段名不限,只看值:相对路径 + 图片扩展名即视为资源。
      const replaced = walk(data, (val) => {
        if (typeof val !== 'string') return val;
        if (!val.startsWith('./') && !val.startsWith('../') && !val.startsWith('~@/')) return val;
        if (!ASSET_EXT.test(val)) return val;
        const idx = imports.length;
        imports.push(`import __a${idx} from ${JSON.stringify(val)};`);
        return `${SENTINEL}${idx}__`;
      });

      let json = JSON.stringify(replaced);
      json = json.replace(new RegExp(`"${SENTINEL}(\\d+)__"`, 'g'), '__a$1');

      return {
        code: `${imports.join('\n')}\nexport default ${json};\n`,
        map: null,
      };
    },
  };
}

function walk(node: unknown, fn: (s: string) => unknown): unknown {
  if (Array.isArray(node)) return node.map((n) => walk(n, fn));
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([k, v]) => [
        k,
        typeof v === 'string' ? fn(v) : walk(v, fn),
      ]),
    );
  }
  return node;
}

import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { processHtml } from '../src-new/utils/cleanHtml';

const PREFIX = '\0public-raw:';

export default function publicRawPlugin(): Plugin {
  let publicDir = '';
  return {
    name: 'public-raw',
    configResolved(config) {
      publicDir = config.publicDir;
    },
    resolveId(id) {
      if (id.startsWith('public-raw:')) {
        const relPath = id.slice('public-raw:'.length).replace(/\.html?$/, '');
        return PREFIX + relPath;
      }
      return null;
    },
    load(id) {
      if (!id.startsWith(PREFIX)) return undefined;
      const relPath = id.slice(PREFIX.length) + '.html';
      const filePath = path.join(publicDir, relPath);
      const text = fs.readFileSync(filePath, 'utf-8');
      // baseUrl 与 HtmlViewer.vue 历史 logic 等价：
      //   frontmatter.htmlPath = '/whitepaper/html/xxx.html'
      //   baseUrl = htmlPath.replace(/[^/]+$/, '')  →  '/whitepaper/html/'
      // relPath 形如 'whitepaper/html/xxx.html'，去文件名 + 前导 / 即同值
      const baseUrl = '/' + relPath.replace(/[^/]+$/, '');
      const { content, toc } = processHtml(text, baseUrl);
      return `export default ${JSON.stringify({ content, toc })}`;
    },
  };
}

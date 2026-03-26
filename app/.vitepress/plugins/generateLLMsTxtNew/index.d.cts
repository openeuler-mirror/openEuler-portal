import { Plugin } from 'vite';
import { L as LlmsOptions } from './full-DxGtIRWO.cjs';
export { a as LlmsFullConfig, b as LlmsLink, c as LlmsSection, d as buildLlmsFullTxt } from './full-DxGtIRWO.cjs';

/**
 * Vite / VitePress plugin that generates an `llms.txt` file at build time.
 *
 * @example
 * ```ts
 * // vite.config.ts / .vitepress/config.ts
 * import { viteLlmsTxt } from 'vite-plugin-llms-txt'
 *
 * export default defineConfig({
 *   plugins: [
 *     viteLlmsTxt({
 *       title: 'My Project',
 *       description: 'A short summary of what this project does.',
 *       details: 'Extended description that provides more context.',
 *       sections: [
 *         {
 *           title: 'Docs',
 *           links: [
 *             { title: 'Getting Started', url: '/docs/getting-started', description: 'Installation and setup' },
 *             { title: 'API Reference',   url: '/docs/api' },
 *           ],
 *         },
 *         {
 *           title: 'Optional',
 *           links: [
 *             { title: 'Changelog', url: '/changelog' },
 *           ],
 *         },
 *       ],
 *     }),
 *   ],
 * })
 * ```
 */
declare function viteLlmsTxt(options: LlmsOptions): Plugin;

export { LlmsOptions, viteLlmsTxt as default, viteLlmsTxt };

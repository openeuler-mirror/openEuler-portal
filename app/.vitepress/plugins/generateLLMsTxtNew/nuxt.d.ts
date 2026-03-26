import * as _nuxt_schema from '@nuxt/schema';
import { L as LlmsOptions, a as LlmsFullConfig } from './full-DxGtIRWO.js';
export { b as LlmsLink, c as LlmsSection } from './full-DxGtIRWO.js';

/** Options accepted by the Nuxt module (extends LlmsOptions with a `full` field). */
interface NuxtLlmsOptions extends LlmsOptions {
    /**
     * Configuration for `llms-full.txt` generation (SSG / `nuxi generate` only).
     * Set to `false` to disable. Omit to use defaults.
     * @default {}  (enabled with default settings)
     */
    full?: LlmsFullConfig | false;
}
/**
 * Nuxt module that generates `llms.txt` (and optionally `llms-full.txt`) files.
 *
 * - `llms.txt`      — generated via Nitro's `publicAssets` pipeline, works for
 *                     both `nuxi build` (SSR) and `nuxi generate` (SSG).
 * - `llms-full.txt` — generated on `generate:done`, **SSG only**, because it
 *                     requires the pre-rendered HTML files to be present.
 *
 * @example
 * ```ts
 * // nuxt.config.ts
 * import nuxtLlmsTxt from 'vite-plugin-llms-txt/nuxt'
 *
 * export default defineNuxtConfig({
 *   modules: [
 *     [nuxtLlmsTxt, {
 *       title: 'My Nuxt Site',
 *       description: 'A short summary.',
 *       sections: [
 *         {
 *           title: 'Docs',
 *           links: [
 *             { title: 'Getting Started', url: '/docs/start' },
 *           ],
 *         },
 *       ],
 *       // llms-full.txt config (SSG only)
 *       full: {
 *         contentSelector: 'main',   // CSS selector for main content
 *       },
 *       // full: false               // set to false to disable
 *     }],
 *   ],
 * })
 * ```
 */
declare const _default: _nuxt_schema.NuxtModule<NuxtLlmsOptions, NuxtLlmsOptions, false>;

export { LlmsFullConfig, LlmsOptions, type NuxtLlmsOptions, _default as default };

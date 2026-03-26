import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'
import { generateContent } from './generator'
import type { LlmsOptions } from './types'

export type { LlmsOptions, LlmsSection, LlmsLink } from './types'

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
export function viteLlmsTxt(options: LlmsOptions): Plugin {
  if (!options?.title) {
    throw new Error('[vite-plugin-llms-txt] `title` is required.')
  }

  let config: ResolvedConfig

  return {
    name: 'vite-plugin-llms-txt',

    // Run only during production builds
    apply: 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    // Write the file after all chunks have been emitted
    closeBundle() {
      const filename = options.filename ?? 'llms.txt'

      const outDir = options.outDir
        ? resolve(config.root, options.outDir)
        : resolve(config.root, config.build.outDir)

      const content = generateContent(options)

      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, filename), content, 'utf-8')

      config.logger.info(
        `\x1b[32m✓\x1b[0m \x1b[2m[llms-txt]\x1b[0m generated \x1b[36m${join(outDir, filename)}\x1b[0m`,
      )
    },
  }
}

export default viteLlmsTxt

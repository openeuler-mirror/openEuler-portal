/**
 * A single link entry in an llms.txt file list section.
 */
interface LlmsLink {
    /** The link display text */
    title: string;
    /** The URL of the link */
    url: string;
    /** Optional description appended after a colon */
    description?: string;
}
/**
 * A file-list section delimited by a heading (H2 / H3 / H4).
 *
 * Sections can nest up to **3 heading levels** deep (H2 → H3 → H4).
 * Use `children` for sub-sections or inline links, or `links` for links
 * that belong directly to this heading.
 *
 * `children` accepts a mix of {@link LlmsSection} and {@link LlmsLink}:
 * - Items **with** a `url` property are rendered as list links.
 * - Items **without** a `url` property are rendered as sub-headings.
 *
 * @example
 * ```ts
 * {
 *   title: 'Guide',
 *   children: [
 *     {
 *       title: 'Installation',
 *       children: [
 *         { title: 'Quick start', url: '/guide/quick-start', description: 'Up and running in 5 minutes' },
 *       ],
 *     },
 *   ],
 * }
 * // Generates:
 * // ## Guide
 * // ### Installation
 * // - [Quick start](/guide/quick-start): Up and running in 5 minutes
 * ```
 */
interface LlmsSection {
    /** The section heading text. "Optional" has special meaning in the spec. */
    title: string;
    /**
     * Links rendered directly under this heading.
     * Equivalent to placing {@link LlmsLink} items in `children`.
     */
    links?: LlmsLink[];
    /**
     * Nested content: sub-sections ({@link LlmsSection}) or inline links
     * ({@link LlmsLink}). Items are distinguished by the presence of a `url`
     * field. Maximum nesting depth is 3 heading levels (H2 → H3 → H4).
     */
    children?: (LlmsSection | LlmsLink)[];
}
/**
 * Configuration object for the llms.txt content and plugin behaviour.
 */
interface LlmsOptions {
    /**
     * H1 project / site name. **Required** – the only mandatory field in the spec.
     */
    title: string;
    /**
     * Short project summary rendered as a Markdown blockquote (`> …`).
     */
    description?: string;
    /**
     * Free-form detail paragraphs placed between the blockquote and the first
     * H2 section. Pass a string for a single paragraph or an array for multiple.
     */
    details?: string | string[];
    /**
     * Ordered list of H2 file-list sections.
     * The special section title "Optional" tells LLM clients that those URLs
     * can be skipped to reduce context size.
     */
    sections?: LlmsSection[];
    /**
     * Output file name.
     * @default "llms.txt"
     */
    filename?: string;
    /**
     * Override the Vite `build.outDir` used when writing the file.
     * Resolved relative to the Vite `root`.
     */
    outDir?: string;
}

/**
 * Configuration for `llms-full.txt` generation.
 */
interface LlmsFullConfig {
    /**
     * CSS selector used to extract the main content area from each HTML page.
     * Tried in order if not specified: `main`, `article`, `[role="main"]`, `.content`.
     */
    contentSelector?: string;
    /**
     * Output filename.
     * @default "llms-full.txt"
     */
    filename?: string;
    /**
     * Whether to embed content for links inside the "Optional" section.
     * @default true
     */
    includeOptional?: boolean;
}
/**
 * Generates an `llms-full.txt` file where each link's page content is embedded
 * as Markdown instead of just referenced by URL.
 *
 * **Must be called after the framework has finished rendering all HTML pages.**
 *
 * - VitePress: call inside the `buildEnd` config hook
 * - Nuxt SSG:  the Nuxt module calls this automatically on `generate:done`
 *
 * @param outDir  - Directory containing the generated HTML files
 * @param options - Same options object passed to `viteLlmsTxt` / the Nuxt module
 * @param config  - Optional extraction / output settings
 *
 * @example VitePress
 * ```ts
 * // .vitepress/config.ts
 * import { viteLlmsTxt, buildLlmsFullTxt } from 'vite-plugin-llms-txt'
 *
 * const llmsOptions = { title: 'My Docs', sections: [...] }
 *
 * export default defineConfig({
 *   vite: { plugins: [viteLlmsTxt(llmsOptions)] },
 *   buildEnd: async (siteConfig) => {
 *     await buildLlmsFullTxt(siteConfig.outDir, llmsOptions)
 *   },
 * })
 * ```
 */
declare function buildLlmsFullTxt(outDir: string, options: LlmsOptions, config?: LlmsFullConfig): Promise<void>;

export { type LlmsOptions as L, type LlmsFullConfig as a, type LlmsLink as b, type LlmsSection as c, buildLlmsFullTxt as d };

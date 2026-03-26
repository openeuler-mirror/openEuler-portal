/**
 * A single link entry in an llms.txt file list section.
 */
export interface LlmsLink {
  /** The link display text */
  title: string
  /** The URL of the link */
  url: string
  /** Optional description appended after a colon */
  description?: string
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
export interface LlmsSection {
  /** The section heading text. "Optional" has special meaning in the spec. */
  title: string
  /**
   * Links rendered directly under this heading.
   * Equivalent to placing {@link LlmsLink} items in `children`.
   */
  links?: LlmsLink[]
  /**
   * Nested content: sub-sections ({@link LlmsSection}) or inline links
   * ({@link LlmsLink}). Items are distinguished by the presence of a `url`
   * field. Maximum nesting depth is 3 heading levels (H2 → H3 → H4).
   */
  children?: (LlmsSection | LlmsLink)[]
}

/**
 * Configuration object for the llms.txt content and plugin behaviour.
 */
export interface LlmsOptions {
  // ── Content ──────────────────────────────────────────────────────────────

  /**
   * H1 project / site name. **Required** – the only mandatory field in the spec.
   */
  title: string

  /**
   * Short project summary rendered as a Markdown blockquote (`> …`).
   */
  description?: string

  /**
   * Free-form detail paragraphs placed between the blockquote and the first
   * H2 section. Pass a string for a single paragraph or an array for multiple.
   */
  details?: string | string[]

  /**
   * Ordered list of H2 file-list sections.
   * The special section title "Optional" tells LLM clients that those URLs
   * can be skipped to reduce context size.
   */
  sections?: LlmsSection[]

  // ── Plugin options ────────────────────────────────────────────────────────

  /**
   * Output file name.
   * @default "llms.txt"
   */
  filename?: string

  /**
   * Override the Vite `build.outDir` used when writing the file.
   * Resolved relative to the Vite `root`.
   */
  outDir?: string
}

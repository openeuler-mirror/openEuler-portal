import type { LlmsLink, LlmsOptions, LlmsSection } from './types'

/** Maximum heading depth relative to H2 (0 = H2, 1 = H3, 2 = H4). */
const MAX_DEPTH = 2

function isLink(child: LlmsSection | LlmsLink): child is LlmsLink {
  return 'url' in child
}

/**
 * Renders one section and all its descendants recursively.
 * @param depth  0 → ##  |  1 → ###  |  2 → ####
 */
function renderSection(section: LlmsSection, depth: number, lines: string[]): void {
  const prefix = '#'.repeat(depth + 2) // depth 0 → "##", 1 → "###", 2 → "####"
  lines.push('')
  lines.push(`${prefix} ${section.title}`)

  // Collect links and child-sections from both sources
  const directLinks: LlmsLink[] = section.links ? [...section.links] : []
  const subSections: LlmsSection[] = []

  for (const child of section.children ?? []) {
    if (isLink(child)) {
      directLinks.push(child)
    } else {
      subSections.push(child)
    }
  }

  // Render links immediately under this heading
  if (directLinks.length > 0) {
    lines.push('')
    for (const link of directLinks) {
      const desc = link.description ? `: ${link.description}` : ''
      lines.push(`- [${link.title}](${encodeURI(link.url)})${desc}`)
    }
  }

  // Render sub-sections (respect max depth)
  for (const child of subSections) {
    if (depth < MAX_DEPTH) {
      renderSection(child, depth + 1, lines)
    } else {
      // Beyond max depth: flatten child links instead of adding a heading
      const childLinks = [
        ...(child.links ?? []),
        ...(child.children ?? []).filter(isLink),
      ]
      if (childLinks.length > 0) {
        if (directLinks.length === 0) lines.push('')
        for (const link of childLinks) {
          const desc = link.description ? `: ${link.description}` : ''
          lines.push(`- [${link.title}](${link.url})${desc}`)
        }
      }
    }
  }
}

/**
 * Converts an {@link LlmsOptions} object into a spec-compliant llms.txt string.
 *
 * Spec summary:
 *   # Title          ← required H1
 *   > Description    ← optional blockquote
 *   detail paragraphs (no headings allowed)
 *   ## Section       ← H2, may contain H3 / H4 sub-sections
 *   - [title](url): description
 */
export function generateContent(options: LlmsOptions): string {
  const lines: string[] = []

  // ── H1 title (required) ──────────────────────────────────────────────────
  lines.push(`# ${options.title}`)

  // ── Blockquote description ───────────────────────────────────────────────
  if (options.description) {
    lines.push('')
    const descLines = options.description.split('\n')
    for (const dl of descLines) {
      lines.push(`> ${dl}`)
    }
  }

  // ── Detail paragraphs ────────────────────────────────────────────────────
  if (options.details) {
    const paragraphs = Array.isArray(options.details)
      ? options.details
      : [options.details]

    for (const para of paragraphs) {
      if (para.trim()) {
        lines.push('')
        lines.push(para)
      }
    }
  }

  // ── Sections (H2 → H3 → H4) ──────────────────────────────────────────────
  for (const section of options.sections ?? []) {
    renderSection(section, 0, lines)
  }

  return lines.join('\n') + '\n'
}

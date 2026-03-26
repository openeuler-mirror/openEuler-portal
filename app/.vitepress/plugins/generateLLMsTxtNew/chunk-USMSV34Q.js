// src/generator.ts
var MAX_DEPTH = 2;
function isLink(child) {
  return "url" in child;
}
function renderSection(section, depth, lines) {
  const prefix = "#".repeat(depth + 2);
  lines.push("");
  lines.push(`${prefix} ${section.title}`);
  const directLinks = section.links ? [...section.links] : [];
  const subSections = [];
  for (const child of section.children ?? []) {
    if (isLink(child)) {
      directLinks.push(child);
    } else {
      subSections.push(child);
    }
  }
  if (directLinks.length > 0) {
    lines.push("");
    for (const link of directLinks) {
      const desc = link.description ? `: ${link.description}` : "";
      lines.push(`- [${link.title}](${link.url})${desc}`);
    }
  }
  for (const child of subSections) {
    if (depth < MAX_DEPTH) {
      renderSection(child, depth + 1, lines);
    } else {
      const childLinks = [
        ...child.links ?? [],
        ...(child.children ?? []).filter(isLink)
      ];
      if (childLinks.length > 0) {
        if (directLinks.length === 0) lines.push("");
        for (const link of childLinks) {
          const desc = link.description ? `: ${link.description}` : "";
          lines.push(`- [${link.title}](${link.url})${desc}`);
        }
      }
    }
  }
}
function generateContent(options) {
  const lines = [];
  lines.push(`# ${options.title}`);
  if (options.description) {
    lines.push("");
    const descLines = options.description.split("\n");
    for (const dl of descLines) {
      lines.push(`> ${dl}`);
    }
  }
  if (options.details) {
    const paragraphs = Array.isArray(options.details) ? options.details : [options.details];
    for (const para of paragraphs) {
      if (para.trim()) {
        lines.push("");
        lines.push(para);
      }
    }
  }
  for (const section of options.sections ?? []) {
    renderSection(section, 0, lines);
  }
  return lines.join("\n") + "\n";
}

// src/full.ts
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
function isLink2(child) {
  return "url" in child;
}
function collectLinks(section) {
  const links = [...section.links ?? []];
  for (const child of section.children ?? []) {
    if (isLink2(child)) links.push(child);
    else links.push(...collectLinks(child));
  }
  return links;
}
function resolveHtmlPath(outDir, url) {
  if (/^https?:\/\/|^\/\//.test(url)) return null;
  const clean = url.split("?")[0].split("#")[0].replace(/^\//, "");
  const candidates = [
    resolve(outDir, clean),
    // exact match (already .html)
    resolve(outDir, `${clean}.html`),
    // /page  →  page.html
    resolve(outDir, clean, "index.html")
    // /page  →  page/index.html
  ];
  return candidates.find((p) => existsSync(p) && statSync(p).isFile()) ?? null;
}
function toMarkdown(html, selector, td) {
  const $ = cheerio.load(html);
  const selectors = selector ? [selector] : ["main", "article", '[role="main"]', ".content", "#content"];
  for (const sel of selectors) {
    const inner = $(sel).html();
    if (inner) return td.turndown(inner);
  }
  return td.turndown($("body").html() ?? html);
}
async function buildLlmsFullTxt(outDir, options, config = {}) {
  const filename = config.filename ?? "llms-full.txt";
  const includeOptional = config.includeOptional ?? true;
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-"
  });
  const lines = [];
  lines.push(`# ${options.title}`);
  if (options.description) {
    lines.push("");
    for (const dl of options.description.split("\n")) {
      lines.push(`> ${dl}`);
    }
  }
  if (options.details) {
    const paragraphs = Array.isArray(options.details) ? options.details : [options.details];
    for (const para of paragraphs) {
      if (para.trim()) {
        lines.push("");
        lines.push(para);
      }
    }
  }
  for (const section of options.sections ?? []) {
    if (!includeOptional && section.title === "Optional") continue;
    lines.push("");
    lines.push(`## ${section.title}`);
    for (const link of collectLinks(section)) {
      const filePath = resolveHtmlPath(outDir, link.url);
      let content;
      if (filePath) {
        const html = readFileSync(filePath, "utf-8");
        content = toMarkdown(html, config.contentSelector, td);
      } else {
        content = link.description ?? `*Content not available locally. See ${link.url}*`;
      }
      lines.push("");
      lines.push("---");
      lines.push(`url: ${link.url}`);
      lines.push("---");
      lines.push("");
      lines.push(content);
      lines.push("");
      lines.push("---");
    }
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, filename), lines.join("\n") + "\n", "utf-8");
}

export {
  generateContent,
  buildLlmsFullTxt
};

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/nuxt.ts
var nuxt_exports = {};
__export(nuxt_exports, {
  default: () => nuxt_default
});
module.exports = __toCommonJS(nuxt_exports);
var import_kit = require("@nuxt/kit");
var import_node_fs2 = require("fs");
var import_node_path2 = require("path");

// src/full.ts
var import_node_fs = require("fs");
var import_node_path = require("path");
var cheerio = __toESM(require("cheerio"), 1);
var import_turndown = __toESM(require("turndown"), 1);
function isLink(child) {
  return "url" in child;
}
function collectLinks(section) {
  const links = [...section.links ?? []];
  for (const child of section.children ?? []) {
    if (isLink(child)) links.push(child);
    else links.push(...collectLinks(child));
  }
  return links;
}
function resolveHtmlPath(outDir, url) {
  if (/^https?:\/\/|^\/\//.test(url)) return null;
  const clean = url.split("?")[0].split("#")[0].replace(/^\//, "");
  const candidates = [
    (0, import_node_path.resolve)(outDir, clean),
    // exact match (already .html)
    (0, import_node_path.resolve)(outDir, `${clean}.html`),
    // /page  →  page.html
    (0, import_node_path.resolve)(outDir, clean, "index.html")
    // /page  →  page/index.html
  ];
  return candidates.find((p) => (0, import_node_fs.existsSync)(p) && (0, import_node_fs.statSync)(p).isFile()) ?? null;
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
  const td = new import_turndown.default({
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
        const html = (0, import_node_fs.readFileSync)(filePath, "utf-8");
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
  (0, import_node_fs.mkdirSync)(outDir, { recursive: true });
  (0, import_node_fs.writeFileSync)((0, import_node_path.join)(outDir, filename), lines.join("\n") + "\n", "utf-8");
}

// src/generator.ts
var MAX_DEPTH = 2;
function isLink2(child) {
  return "url" in child;
}
function renderSection(section, depth, lines) {
  const prefix = "#".repeat(depth + 2);
  lines.push("");
  lines.push(`${prefix} ${section.title}`);
  const directLinks = section.links ? [...section.links] : [];
  const subSections = [];
  for (const child of section.children ?? []) {
    if (isLink2(child)) {
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
        ...(child.children ?? []).filter(isLink2)
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

// src/nuxt.ts
var nuxt_default = (0, import_kit.defineNuxtModule)({
  meta: {
    name: "nuxt-llms-txt",
    configKey: "llmsTxt"
  },
  setup(options, nuxt) {
    if (!options.title) {
      throw new Error("[nuxt-llms-txt] `title` is required.");
    }
    const logger = (0, import_kit.useLogger)("nuxt-llms-txt");
    const filename = options.filename ?? "llms.txt";
    const stagingDir = (0, import_node_path2.join)(nuxt.options.buildDir, "llms-txt");
    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.publicAssets ?? (nitroConfig.publicAssets = []);
      nitroConfig.publicAssets.push({
        dir: stagingDir,
        maxAge: 0
      });
    });
    nuxt.hook("nitro:build:before", () => {
      const content = generateContent(options);
      (0, import_node_fs2.mkdirSync)(stagingDir, { recursive: true });
      (0, import_node_fs2.writeFileSync)((0, import_node_path2.join)(stagingDir, filename), content, "utf-8");
      logger.success(`Generated ${filename}`);
    });
    if (options.full !== false) {
      const fullConfig = options.full ?? {};
      const publicDir = options.outDir ? (0, import_node_path2.resolve)(nuxt.options.rootDir, options.outDir) : (0, import_node_path2.resolve)(nuxt.options.rootDir, ".output", "public");
      nuxt.hook("generate:done", async () => {
        await buildLlmsFullTxt(publicDir, options, fullConfig);
        logger.success(`Generated ${fullConfig.filename ?? "llms-full.txt"}`);
      });
    }
  }
});

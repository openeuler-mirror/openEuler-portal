import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * TDK 去重辅助（构建期）
 *
 * 背景：
 * - news / blog 详情页的 description 优先取 md frontmatter 的 summary；当 summary 缺失或在
 *   news/blog 之间重复时，改为截取 md 正文段落（首段，若首段仍重复则并入次段）作为 description；
 *   正文无有效文字（如纯图片页）时回退到 title，并追加发布日期以彻底消歧。
 * - showcase 案例详情页的 <title> 直接取 frontmatter.title（公司名），同公司多案例会重复；
 *   仅当公司名在 showcase 内出现多次时，追加案例摘要片段区分（只影响 SEO <title>，不改页面可见横幅）。
 *
 * 已在 md frontmatter 中配置 canonical link 的页面（近期“重复页面整改”提交涉及的文件）跳过，
 * 不再覆盖其 description。
 */

const __dirname = fileURLToPath(new URL('.', import.meta.url));
// .vitepress 的上一级即 app/，relativePath 相对 app/ 解析
const appDir = resolve(__dirname, '..');

type Frontmatter = Record<string, unknown>;

const DESC_MAX = 160;
const CAND_MAX = 200;

/** 拆分 frontmatter 与正文（简易 YAML，仅需顶层标量，避免引入额外依赖） */
const splitFrontmatter = (raw: string): { fm: Frontmatter; body: string } => {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) {
    return { fm: {}, body: raw };
  }
  const fm: Frontmatter = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s?(.*)$/.exec(line);
    if (kv) {
      fm[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  return { fm, body: m[2] };
};

const walkMd = (dir: string, out: string[] = []): string[] => {
  if (!existsSync(dir)) {
    return out;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMd(p, out);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
};

/** 去除 markdown / 内联 HTML，尽量还原为纯文本 */
const stripInline = (s: string): string =>
  s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const clamp = (s: string, max: number): string => (s.length > max ? s.slice(0, max).trimEnd() : s);

/** 提取正文中的有效文字段落（跳过代码块、注释、纯标题、纯图片/HTML 块） */
const textParagraphs = (body: string): string[] => {
  const blocks = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\r?\n\s*\r?\n/);
  const paras: string[] = [];
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (!lines.length) {
      continue;
    }
    const headingOnly = lines.every((l) => l.startsWith('#'));
    const mediaOnly = lines.every((l) => /^(!\[[^\]]*\]\([^)]*\)|<img\b|<\/?[a-z][\s\S]*>)/i.test(l));
    if (headingOnly || mediaOnly) {
      continue;
    }
    const text = stripInline(block);
    if (text.length >= 8) {
      paras.push(text);
    }
  }
  return paras;
};

/** 正文候选 description：首段（+次段，若首段偏短），用于全局唯一性判定 */
const bodyCandidate = (body: string): string => {
  const paras = textParagraphs(body);
  if (!paras.length) {
    return '';
  }
  let text = paras[0];
  if (paras[1] && text.length < 40) {
    text = `${text} ${paras[1]}`;
  }
  return clamp(text, CAND_MAX);
};

interface ArticleMeta {
  summary: string;
  candidate: string;
  title: string;
  date: string;
}

type DedupIndex = {
  dupSummaries: Set<string>;
  candidateCount: Map<string, number>;
  articleMeta: Map<string, ArticleMeta>;
  dupShowcaseTitles: Set<string>;
};

const buildIndex = (): DedupIndex => {
  const summaryCount = new Map<string, number>();
  const candidateCount = new Map<string, number>();
  const showcaseTitleCount = new Map<string, number>();
  const articleMeta = new Map<string, ArticleMeta>();
  const bump = (map: Map<string, number>, key: string) => key && map.set(key, (map.get(key) ?? 0) + 1);

  for (const locale of ['zh', 'en']) {
    for (const kind of ['news', 'blog']) {
      for (const file of walkMd(join(appDir, locale, kind))) {
        const raw = readFileSync(file, 'utf-8');
        const { fm, body } = splitFrontmatter(raw);
        const relativePath = file.slice(appDir.length + 1).replace(/\\/g, '/');
        const summary = String(fm.summary ?? '').trim();
        const candidate = bodyCandidate(body);
        const title = String(fm.title ?? '').trim();
        const date = String(fm.date ?? '').trim();
        bump(summaryCount, summary);
        bump(candidateCount, candidate);
        articleMeta.set(relativePath, { summary, candidate, title, date });
      }
    }
    for (const file of walkMd(join(appDir, locale, 'showcase'))) {
      const { fm } = splitFrontmatter(readFileSync(file, 'utf-8'));
      bump(showcaseTitleCount, String(fm.title ?? '').trim());
    }
  }

  return {
    dupSummaries: new Set([...summaryCount].filter(([, n]) => n > 1).map(([k]) => k)),
    candidateCount,
    articleMeta,
    dupShowcaseTitles: new Set([...showcaseTitleCount].filter(([, n]) => n > 1).map(([k]) => k)),
  };
};

const index = buildIndex();

/** frontmatter.head 是否已配置 canonical（近期重复页面整改，跳过 description 覆盖） */
const hasCanonical = (headTags: unknown): boolean =>
  Array.isArray(headTags) &&
  headTags.some(
    (tag: unknown) =>
      Array.isArray(tag) && tag[0] === 'link' && (tag[1] as { rel?: string })?.rel === 'canonical'
  );

/**
 * 计算 news / blog 页的去重 description。
 * @returns 需要覆盖时返回新 description；保持原 summary 时返回 null。
 */
export const resolveNewsBlogDescription = (
  fm: Frontmatter,
  relativePath: string
): string | null => {
  if (hasCanonical(fm.head)) {
    return null;
  }
  const summary = String(fm.summary ?? '').trim();
  const needDedup = !summary || index.dupSummaries.has(summary);
  if (!needDedup) {
    return null;
  }
  const meta = index.articleMeta.get(relativePath);
  // 优先正文候选（首段，必要时并入次段），仅当全局唯一时采用
  const candidate = meta?.candidate;
  if (candidate && candidate !== summary && (index.candidateCount.get(candidate) ?? 0) <= 1) {
    return clamp(candidate, DESC_MAX);
  }
  // 正文缺失或候选仍重复：回退到 title，并用发布日期彻底消歧
  const title = meta?.title || String(fm.title ?? '').trim();
  const date = meta?.date || String(fm.date ?? '').trim();
  const base = title || summary;
  if (!base) {
    return null;
  }
  return clamp(date ? `${base}（发布于 ${date}）` : base, DESC_MAX);
};

/**
 * 计算 showcase 案例详情页的去重 <title>（仅 SEO，不改页面可见横幅）。
 * @returns 标题冲突时返回新 title；否则 null（沿用原 title）。
 */
export const resolveShowcaseTitle = (fm: Frontmatter): string | null => {
  const title = String(fm.title ?? '').trim();
  if (!title || !index.dupShowcaseTitles.has(title)) {
    return null;
  }
  const summary = String(fm.summary ?? '').trim();
  if (!summary) {
    return null;
  }
  const marker = clamp(summary.split(/[，,。.：:；;、]/)[0].trim(), 24);
  if (!marker) {
    return null;
  }
  return `${title}：${marker}`;
};

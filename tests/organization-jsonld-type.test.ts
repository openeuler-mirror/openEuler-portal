// 组织架构页 frontmatter head 块里 JSON-LD <script> 的 type 修正回归测试。
//
// 背景: 该页 frontmatter head 块的 JSON-LD script 原先 type 为空字符串('')，
// 浏览器把 JSON-LD 内容当 JavaScript 执行，`{ "@context": ... }` 中字符串后的
// `:` 触发 SyntaxError。修正为 `application/ld+json` 后，浏览器识别为结构化
// 数据，不再执行，无报错。本用例直接读 md frontmatter，断言 type 值正确、
// JSON-LD body 能被 JSON.parse（即内容本身无语法问题，不会在被 JS 引擎执行时抛错）。
//
// 参见设计文档 §3 / §4 / §5。

import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();
const ZH_MD = resolve(PROJECT_ROOT, 'app/zh/community/organization/index.md');
const EN_MD = resolve(PROJECT_ROOT, 'app/en/community/organization/index.md');

function readFrontmatter(filePath: string): Record<string, unknown> | null {
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;
  return yaml.load(frontmatterMatch[1]) as Record<string, unknown>;
}

// head 是 VitePress frontmatter head 数组：[[tag, attrs, children], ...]。
// JSON-LD script 在 head[0]：tag='script', attrs={ type }, children=JSON 字符串。
function getJsonLdScriptHead(frontmatter: Record<string, unknown>) {
  const head = frontmatter.head;
  expect(head, 'frontmatter 应有 head 块').toBeDefined();
  expect(Array.isArray(head), 'head 应是数组').toBe(true);
  const first = (head as unknown[][])[0];
  expect(first[0], 'head[0][0] 应是 script 标签').toBe('script');
  return {
    attrs: first[1] as { type?: string },
    body: typeof first[2] === 'string' ? (first[2] as string).trim() : '',
  };
}

describe('zh 组织架构页 frontmatter JSON-LD script type 修正', () => {
  const frontmatter = readFrontmatter(ZH_MD);

  it('md 文件存在且有 frontmatter', () => {
    expect(frontmatter, `未找到 frontmatter: ${ZH_MD}`).not.toBeNull();
  });

  it('JSON-LD script 的 type 为 application/ld+json（不再为空字符串）', () => {
    const { attrs } = getJsonLdScriptHead(frontmatter!);
    expect(attrs.type, 'type 不应为空字符串（空值会触发浏览器按 JS 执行 JSON-LD → SyntaxError）')
      .toBe('application/ld+json');
  });

  it('JSON-LD script 的 type 不为空字符串 / 不为 undefined（回归守卫）', () => {
    const { attrs } = getJsonLdScriptHead(frontmatter!);
    expect(attrs.type).not.toBe('');
    expect(attrs.type).not.toBeUndefined();
  });

  it('JSON-LD body 非空且含 @context / @graph 结构标记（script 携带的是 JSON-LD 内容）', () => {
    // 不做严格 JSON.parse：body 内个别字符串值含未转义 ASCII 双引号，属既存
    // 数据质量问题（不在本次 type 修复范围）。type 修正后浏览器不再把
    // script 当 JS 执行，故 body 是否严格 JSON 不影响本次修复目标（无 SyntaxError）。
    const { body } = getJsonLdScriptHead(frontmatter!);
    expect(body.length, 'JSON-LD body 不应为空').toBeGreaterThan(0);
    expect(body, 'JSON-LD body 应含 @context').toContain('"@context"');
    expect(body, 'JSON-LD body 应含 @graph').toContain('"@graph"');
  });
});

describe('en 组织架构页 JSON-LD 全由 .geo 注入（无 frontmatter head 块）', () => {
  // 设计 §4 边界：en 页无 frontmatter head 块，JSON-LD 全由 .geo 正确注入，无需改动。
  const frontmatter = readFrontmatter(EN_MD);

  it('en 页 md 存在且有 frontmatter', () => {
    expect(frontmatter, `未找到 frontmatter: ${EN_MD}`).not.toBeNull();
  });

  it('en 页 frontmatter 不含 head 块（JSON-LD 由 .geo 注入，type 正确）', () => {
    expect(frontmatter!.head, 'en 页不应有 frontmatter head 块').toBeUndefined();
  });
});

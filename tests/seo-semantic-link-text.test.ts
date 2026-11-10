import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const SRC_NEW = 'app/.vitepress/src-new';

function readSrc(rel: string) {
  return fs.readFileSync(path.join(PROJECT_ROOT, rel), 'utf8');
}

const NestOSResources = readSrc(
  `${SRC_NEW}/views/projects/NestOS/components/NestOSResources.vue`
);
const NestOSEn = readSrc(`${SRC_NEW}/i18n/nestos/nestos-en.ts`);
const NestOSZh = readSrc(`${SRC_NEW}/i18n/nestos/nestos-zh.ts`);
const HomeEn = readSrc(`${SRC_NEW}/i18n/home/home-en.ts`);
const HomeZh = readSrc(`${SRC_NEW}/i18n/home/home-zh.ts`);

// ==================== C. 语义化链接文本 + i18n 占位符同步 ====================

describe('NestOSResources — 链接文本带 topic 上下文（非泛化"了解更多"）', () => {
  it('两处 OLink 文本用 t(\'nestos.learnMore\', { topic: t(item.title_key) })', () => {
    const matches = NestOSResources.match(
      /t\('nestos\.learnMore', \{ topic: t\(item\.title_key\) \}\)/g
    );
    expect(matches, '应至少 2 处带 topic 的 learnMore 调用').toBeTruthy();
    expect(matches!.length).toBeGreaterThanOrEqual(2);
  });

  it('NestOSResources 不再含裸 t(\'nestos.learnMore\')（无 topic 占位）', () => {
    // 排除带 topic 的调用，确认无裸调用残留
    const stripped = NestOSResources.replace(
      /t\('nestos\.learnMore', \{ topic: t\(item\.title_key\) \}\)/g,
      ''
    );
    expect(stripped).not.toContain("t('nestos.learnMore')");
  });

  it('NestOSResources 的 target="_blank" 均带 rel="noopener noreferrer"', () => {
    const blankLinks = NestOSResources.match(/target="_blank"/g) ?? [];
    expect(blankLinks.length).toBeGreaterThanOrEqual(2);
    // 每个 target="_blank" 同行/同元素须有 rel
    const withRel = NestOSResources.match(
      /target="_blank" rel="noopener noreferrer"/g
    ) ?? [];
    expect(withRel.length).toBe(blankLinks.length);
  });
});

describe('nestos i18n — learnMore 占位符 {topic} zh/en 同步', () => {
  function extractLearnMore(src: string): string | undefined {
    const m = src.match(/learnMore:\s*'([^']*)'/);
    return m?.[1];
  }

  it('nestos-en learnMore 含 {topic} 占位符', () => {
    const val = extractLearnMore(NestOSEn);
    expect(val, '未找到 nestos-en learnMore').toBeDefined();
    expect(val!).toContain('{topic}');
    expect(val!).not.toBe('Learn More');
  });

  it('nestos-zh learnMore 含 {topic} 占位符', () => {
    const val = extractLearnMore(NestOSZh);
    expect(val, '未找到 nestos-zh learnMore').toBeDefined();
    expect(val!).toContain('{topic}');
    expect(val!).not.toBe('了解更多');
  });

  it('zh/en learnMore 占位符数量一致（防单语漏改占位符）', () => {
    const enVal = extractLearnMore(NestOSEn) ?? '';
    const zhVal = extractLearnMore(NestOSZh) ?? '';
    const enTopics = (enVal.match(/\{topic\}/g) ?? []).length;
    const zhTopics = (zhVal.match(/\{topic\}/g) ?? []).length;
    expect(zhTopics).toBe(enTopics);
    expect(enTopics).toBeGreaterThan(0);
  });
});

describe('home i18n — viewDetails 语义化（非泛化"Learn More"）', () => {
  it('home-en viewDetails 为 "View contribution details"（非 Learn More）', () => {
    const m = HomeEn.match(/viewDetails:\s*'([^']*)'/);
    expect(m, '未找到 home-en viewDetails').toBeTruthy();
    expect(m![1]).toBe('View contribution details');
    expect(m![1]).not.toBe('Learn More');
  });

  it('home-zh viewDetails 存在且为中文（i18n 双语键同步）', () => {
    const m = HomeZh.match(/viewDetails:\s*'([^']*)'/);
    expect(m, '未找到 home-zh viewDetails').toBeTruthy();
    expect(m![1].trim().length).toBeGreaterThan(0);
  });
});

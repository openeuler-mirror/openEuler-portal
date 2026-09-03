import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PROJECT_ROOT = resolve(__dirname, '..');

const PERSONAL_CLA_ID = '6983225bdcbb19710248ccf0';
const ENTERPRISE_CLA_ID = '6946817fe1b3f3e542b4e2d9';
const CLA_BASE = `https://clasign.osinfra.cn/sign/${PERSONAL_CLA_ID}`;

const HEADER_ZH = 'app/.vitepress/src-new/i18n/header/header-zh.ts';
const HEADER_EN = 'app/.vitepress/src-new/i18n/header/header-en.ts';
const CONTRIBUTION_ZH = 'app/.vitepress/src/i18n/contribution/contribution-zh.ts';
const CONTRIBUTION_EN = 'app/.vitepress/src/i18n/contribution/contribution-en.ts';
const FOOTER_DATA = 'app/.vitepress/src-new/data/footer/index.ts';
const COMPATIBILITY_DATA = 'app/.vitepress/src-new/data/compatibility/index.ts';

const ZH_CONTRIBUTION_DETAIL = 'app/zh/community/contribution/detail.md';
const EN_CONTRIBUTION_DETAIL = 'app/en/community/contribution/detail.md';
const ZH_WIKI_CONTRIBUTION = 'app/zh/wiki/contribution/index.md';
const EN_WIKI_CONTRIBUTION = 'app/en/wiki/contribution/index.md';

const ZH_FAQ = 'app/zh/faq/index.md';
const EN_FAQ = 'app/en/faq/index.md';
const ZH_BLOG_CLA = 'app/zh/blog/2022-11-25-cla/CLA签署流程.md';

function read(rel: string): string {
  const full = resolve(PROJECT_ROOT, rel);
  if (!existsSync(full)) {
    throw new Error(`file not found: ${full}`);
  }
  return readFileSync(full, 'utf-8');
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let n = 0;
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    n += 1;
    idx = haystack.indexOf(needle, idx + needle.length);
  }
  return n;
}

describe('header i18n — CLA href 携带 locale 查询参数（设计 §3）', () => {
  it('header-zh.ts 存在且可读', () => {
    expect(read(HEADER_ZH).length).toBeGreaterThan(0);
  });

  it('header-zh CLA href 追加 ?lang=zh', () => {
    expect(read(HEADER_ZH)).toContain(`${CLA_BASE}?lang=zh`);
  });

  it('header-zh CLA href 不残留裸 URL（无 ?lang= 后缀）', () => {
    const content = read(HEADER_ZH);
    expect(content).not.toContain(`href: '${CLA_BASE}'`);
  });

  it('header-en.ts 存在且可读', () => {
    expect(read(HEADER_EN).length).toBeGreaterThan(0);
  });

  it('header-en CLA href 追加 ?lang=en', () => {
    expect(read(HEADER_EN)).toContain(`${CLA_BASE}?lang=en`);
  });

  it('header-en CLA href 不残留裸 URL（无 ?lang= 后缀）', () => {
    const content = read(HEADER_EN);
    expect(content).not.toContain(`href: '${CLA_BASE}'`);
  });

  it('zh/en header CLA href 末尾 locale 不交叉（zh≠en）', () => {
    expect(read(HEADER_ZH)).not.toContain(`${CLA_BASE}?lang=en`);
    expect(read(HEADER_EN)).not.toContain(`${CLA_BASE}?lang=zh`);
  });
});

describe('contribution i18n LINK_LIST — 4 条 CLA URL 均带 locale 参数（设计 §3）', () => {
  it('contribution-zh.ts 存在且可读', () => {
    expect(read(CONTRIBUTION_ZH).length).toBeGreaterThan(0);
  });

  it('contribution-zh 含恰好 4 条 ?lang=zh 的 CLA URL', () => {
    expect(countOccurrences(read(CONTRIBUTION_ZH), `${CLA_BASE}?lang=zh`)).toBe(4);
  });

  it('contribution-zh 不残留裸 CLA URL（无 ?lang= 后缀）', () => {
    expect(countOccurrences(read(CONTRIBUTION_ZH), `URL: '${CLA_BASE}'`)).toBe(0);
  });

  it('contribution-en.ts 存在且可读', () => {
    expect(read(CONTRIBUTION_EN).length).toBeGreaterThan(0);
  });

  it('contribution-en 含恰好 4 条 ?lang=en 的 CLA URL', () => {
    expect(countOccurrences(read(CONTRIBUTION_EN), `${CLA_BASE}?lang=en`)).toBe(4);
  });

  it('contribution-en 不残留裸 CLA URL（无 ?lang= 后缀）', () => {
    expect(countOccurrences(read(CONTRIBUTION_EN), `URL: '${CLA_BASE}'`)).toBe(0);
  });

  it('zh/en contribution CLA URL locale 不交叉（zh≠en）', () => {
    expect(countOccurrences(read(CONTRIBUTION_ZH), `${CLA_BASE}?lang=en`)).toBe(0);
    expect(countOccurrences(read(CONTRIBUTION_EN), `${CLA_BASE}?lang=zh`)).toBe(0);
  });
});

describe('contribution / wiki md 正文 CLA 链接带 locale 参数（设计 §3）', () => {
  it('zh/community/contribution/detail.md 含恰好 2 条 ?lang=zh 的 CLA URL', () => {
    expect(countOccurrences(read(ZH_CONTRIBUTION_DETAIL), `${CLA_BASE}?lang=zh`)).toBe(2);
  });

  it('zh/community/contribution/detail.md 不残留裸 CLA URL', () => {
    const content = read(ZH_CONTRIBUTION_DETAIL);
    // 裸 URL 即 ](URL) 形式且无 ?lang
    expect(countOccurrences(content, `](${CLA_BASE})`)).toBe(0);
  });

  it('en/community/contribution/detail.md 含恰好 1 条 ?lang=en 的 CLA URL（设计 §4 非对称）', () => {
    expect(countOccurrences(read(EN_CONTRIBUTION_DETAIL), `${CLA_BASE}?lang=en`)).toBe(1);
  });

  it('en/community/contribution/detail.md 不残留裸 CLA URL', () => {
    expect(countOccurrences(read(EN_CONTRIBUTION_DETAIL), `](${CLA_BASE})`)).toBe(0);
  });

  it('zh/wiki/contribution/index.md CLA URL 带 ?lang=zh', () => {
    expect(read(ZH_WIKI_CONTRIBUTION)).toContain(`${CLA_BASE}?lang=zh`);
  });

  it('zh/wiki/contribution/index.md 不残留裸 CLA URL', () => {
    expect(countOccurrences(read(ZH_WIKI_CONTRIBUTION), `](${CLA_BASE})`)).toBe(0);
  });

  it('en/wiki/contribution/index.md CLA URL 带 ?lang=en', () => {
    expect(read(EN_WIKI_CONTRIBUTION)).toContain(`${CLA_BASE}?lang=en`);
  });

  it('en/wiki/contribution/index.md 不残留裸 CLA URL', () => {
    expect(countOccurrences(read(EN_WIKI_CONTRIBUTION), `](${CLA_BASE})`)).toBe(0);
  });

  it('zh/en wiki CLA URL locale 不交叉（zh≠en）', () => {
    expect(read(ZH_WIKI_CONTRIBUTION)).not.toContain(`${CLA_BASE}?lang=en`);
    expect(read(EN_WIKI_CONTRIBUTION)).not.toContain(`${CLA_BASE}?lang=zh`);
  });
});

describe('out-of-scope CLA URL 回归保护（设计 §5 防扩面）', () => {
  it('zh/faq/index.md 含 CLA URL 但保持裸链接（不含 ?lang=）', () => {
    const content = read(ZH_FAQ);
    expect(content).toContain(CLA_BASE);
    // CLA URL 其后不应跟 ?lang（防本次改动扩面到需求明确排除的 faq）
    expect(countOccurrences(content, `${CLA_BASE}?lang`)).toBe(0);
  });

  it('en/faq/index.md 含 CLA URL 但保持裸链接（不含 ?lang=）', () => {
    const content = read(EN_FAQ);
    expect(content).toContain(CLA_BASE);
    expect(countOccurrences(content, `${CLA_BASE}?lang`)).toBe(0);
  });

  it('zh/blog/2022-11-25-cla/CLA签署流程.md CLA URL 保持裸链接（不含 ?lang=）', () => {
    const content = read(ZH_BLOG_CLA);
    expect(content).toContain(CLA_BASE);
    // 全文不应出现该 ID + ?lang 的组合
    expect(countOccurrences(content, `${PERSONAL_CLA_ID}?lang`)).toBe(0);
  });
});

describe('active 页脚无 CLA 入口（设计 §1 防"页脚 CLA"幻觉）', () => {
  it('src-new/data/footer/index.ts 不含 clasign.osinfra.cn 域', () => {
    const content = read(FOOTER_DATA);
    expect(content).not.toContain('clasign.osinfra.cn');
  });

  it('src-new/data/footer/index.ts 不含个人 CLA ID', () => {
    const content = read(FOOTER_DATA);
    expect(content).not.toContain(PERSONAL_CLA_ID);
  });
});

describe('企业 CLA URL 不被误改（设计 §1 / §4 不混淆）', () => {
  it('data/compatibility/index.ts 仍使用企业 CLA ID（与个人 CLA 不同）', () => {
    const content = read(COMPATIBILITY_DATA);
    expect(content).toContain(ENTERPRISE_CLA_ID);
  });

  it('data/compatibility/index.ts 不含个人 CLA ID（不混淆两类 CLA）', () => {
    const content = read(COMPATIBILITY_DATA);
    expect(content).not.toContain(PERSONAL_CLA_ID);
  });
});

import { expect, describe, it } from 'vitest';
import { friendshipLinks } from '../app/.vitepress/src-new/data/footer/index.ts';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');

describe('InfoQ 拼写修正 — 页脚友情链接 zh locale', () => {
  const infoqZh = friendshipLinks.zh.find((item) => item.link.includes('infoq.cn'));

  it('zh 友情链接存在 InfoQ 条目', () => {
    expect(infoqZh).toBeDefined();
  });

  it('zh InfoQ 条目 title 为 "InfoQ"（首字母大写 I）', () => {
    expect(infoqZh!.title).toBe('InfoQ');
  });

  it('zh InfoQ 条目 title 不含 "infoQ"（首字母小写 i）', () => {
    expect(infoqZh!.title).not.toBe('infoQ');
  });
});

describe('InfoQ 拼写修正 — 页脚友情链接 en locale', () => {
  const infoqEn = friendshipLinks.en.find((item) => item.link.includes('infoq.cn'));

  it('en 友情链接存在 InfoQ 条目', () => {
    expect(infoqEn).toBeDefined();
  });

  it('en InfoQ 条目 title 为 "InfoQ"（首字母大写 I）', () => {
    expect(infoqEn!.title).toBe('InfoQ');
  });

  it('en InfoQ 条目 title 不含 "infoQ"（首字母小写 i）', () => {
    expect(infoqEn!.title).not.toBe('infoQ');
  });
});

describe('InfoQ 拼写修正 — 新闻 20220729-openatom2022.md', () => {
  const content = readFileSync(resolve(ROOT, 'app/zh/news/20220729-openatom2022.md'), 'utf-8');

  it('正文中包含 "InfoQ"（首字母大写 I）', () => {
    expect(content).toContain('InfoQ');
  });

  it('正文中不含 "infoQ"（首字母小写 i）', () => {
    expect(content).not.toContain('infoQ');
  });
});

describe('InfoQ 拼写修正 — 新闻 20220728-guwen.md', () => {
  const content = readFileSync(resolve(ROOT, 'app/zh/news/20220728-guwen.md'), 'utf-8');

  it('正文中包含 "InfoQ"（首字母大写 I）', () => {
    expect(content).toContain('InfoQ');
  });

  it('正文中不含 "infoQ"（首字母小写 i）', () => {
    expect(content).not.toContain('infoQ');
  });
});

describe('InfoQ 拼写 — 新闻 20220801-openueuler08.md 回归验证', () => {
  const content = readFileSync(resolve(ROOT, 'app/zh/news/20220801-openueuler08.md'), 'utf-8');

  it('正文中包含 "InfoQ"（首字母大写 I）', () => {
    expect(content).toContain('InfoQ');
  });

  it('正文中不含 "infoQ"（首字母小写 i）', () => {
    expect(content).not.toContain('infoQ');
  });
});

describe('全站 "infoQ" 小写拼写零残留', () => {
  const footerTitles = [
    ...friendshipLinks.zh.map((item) => item.title),
    ...friendshipLinks.en.map((item) => item.title),
  ];

  it('页脚友情链接 zh/en 所有 title 不含 "infoQ"', () => {
    for (const title of footerTitles) {
      expect(title).not.toBe('infoQ');
    }
  });

  it('三篇相关新闻 md 全部不含 "infoQ"', () => {
    const files = [
      'app/zh/news/20220729-openatom2022.md',
      'app/zh/news/20220728-guwen.md',
      'app/zh/news/20220801-openueuler08.md',
    ];
    for (const file of files) {
      const content = readFileSync(resolve(ROOT, file), 'utf-8');
      expect(content).not.toContain('infoQ');
    }
  });

  it('InfoQ URL 拼写不变（仍为 infoq.cn）', () => {
    const infoqZh = friendshipLinks.zh.find((item) => item.link.includes('infoq.cn'));
    const infoqEn = friendshipLinks.en.find((item) => item.link.includes('infoq.cn'));
    expect(infoqZh!.link).toContain('www.infoq.cn');
    expect(infoqEn!.link).toContain('www.infoq.cn');
  });
});
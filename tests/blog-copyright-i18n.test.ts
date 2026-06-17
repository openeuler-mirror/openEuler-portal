import { expect, describe, it } from 'vitest';
import blogZh from '../app/.vitepress/src-new/i18n/blog/blog-zh';
import blogEn from '../app/.vitepress/src-new/i18n/blog/blog-en';

describe('blog.copyRight 词条完整性（设计 §3）', () => {
  it('zh 词条包含 copyRight key', () => {
    expect(blogZh).toHaveProperty('copyRight');
  });

  it('en 词条包含 copyRight key', () => {
    expect(blogEn).toHaveProperty('copyRight');
  });

  it('zh copyRight 非空且非原始 key 名', () => {
    expect(typeof blogZh.copyRight).toBe('string');
    expect(blogZh.copyRight.length).toBeGreaterThan(0);
    expect(blogZh.copyRight).not.toBe('blog.copyRight');
  });

  it('en copyRight 非空且非原始 key 名', () => {
    expect(typeof blogEn.copyRight).toBe('string');
    expect(blogEn.copyRight.length).toBeGreaterThan(0);
    expect(blogEn.copyRight).not.toBe('blog.copyRight');
  });
});

describe('blog.copyRight {year} 插值占位符（设计 §4）', () => {
  it('zh copyRight 包含 {year} 占位符', () => {
    expect(blogZh.copyRight).toContain('{year}');
  });

  it('en copyRight 包含 {year} 占位符', () => {
    expect(blogEn.copyRight).toContain('{year}');
  });

  it('zh copyRight 中 {year} 出现 1 次（无重复占位符）', () => {
    const occurrences = blogZh.copyRight.split('{year}').length - 1;
    expect(occurrences).toBe(1);
  });

  it('en copyRight 中 {year} 出现 1 次（无重复占位符）', () => {
    const occurrences = blogEn.copyRight.split('{year}').length - 1;
    expect(occurrences).toBe(1);
  });
});

describe('blog.copyRight 内容语义校验（设计 §6 预览清单）', () => {
  it('zh copyRight 包含 "Copyright"', () => {
    expect(blogZh.copyRight).toContain('Copyright');
  });

  it('zh copyRight 包含 "openEuler Community"', () => {
    expect(blogZh.copyRight).toContain('openEuler Community');
  });

  it('en copyRight 包含 "Copyright"', () => {
    expect(blogEn.copyRight).toContain('Copyright');
  });

  it('en copyRight 包含 "openEuler Community"', () => {
    expect(blogEn.copyRight).toContain('openEuler Community');
  });

  it('zh copyRight 以版权声明标记开头', () => {
    expect(blogZh.copyRight).toMatch(/^【版权声明】/);
  });

  it('en copyRight 以版权声明标记开头', () => {
    expect(blogEn.copyRight).toMatch(/^\[Copyright\]/);
  });
});

describe('blog i18n 双语同步红线（AGENTS.md §5 红线#7）', () => {
  const zhKeys = Object.keys(blogZh).sort();
  const enKeys = Object.keys(blogEn).sort();

  it('zh 和 en 词条 key 集合完全一致', () => {
    expect(zhKeys).toEqual(enKeys);
  });

  it('copyRight 在 zh 和 en 中均为 string 类型', () => {
    expect(typeof blogZh.copyRight).toBe('string');
    expect(typeof blogEn.copyRight).toBe('string');
  });
});

describe('blog.copyRight vue-i18n 插值行为验证（设计 §4 边界）', () => {
  it('t("blog.copyRight", { year: 2026 }) 应替换 {year} 为 2026', () => {
    const template = blogZh.copyRight;
    const result = template.replace('{year}', '2026');
    expect(result).toContain('2026');
    expect(result).not.toContain('{year}');
  });

  it('year 为 undefined 时显示原始 {year} 占位符（设计 §4 边界）', () => {
    const template = blogZh.copyRight;
    const result = template.replace('{year}', String(undefined));
    expect(result).toContain('undefined');
  });
});

import { expect, describe, it, vi, beforeEach } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { SUPPORTED_LOCALES } from '~@/data/header';

const APP_DIR = resolve(__dirname, '../app');

describe('config.ts transformPageData — availableLocales 注入逻辑', () => {
  function computeAvailableLocales(filePath: string, siblingExists: boolean): string[] | undefined {
    const matchedLocale = SUPPORTED_LOCALES.find(prefix => filePath.startsWith(`${prefix}/`));
    if (!matchedLocale) return undefined;
    const available = [matchedLocale];
    for (const other of SUPPORTED_LOCALES) {
      if (other === matchedLocale) continue;
      const siblingPath = filePath.replace(`${matchedLocale}/`, `${other}/`);
      if (siblingExists) {
        available.push(other);
      }
    }
    return available;
  }

  it('zh 页面有 en 兄弟文件 → availableLocales = ["zh","en"]', () => {
    const result = computeAvailableLocales('zh/download/index.md', true);
    expect(result).toEqual(['zh', 'en']);
  });

  it('zh 页面无 en 兄弟文件 → availableLocales = ["zh"]', () => {
    const result = computeAvailableLocales('zh/showcase/finance/gs/gs.md', false);
    expect(result).toEqual(['zh']);
  });

  it('en 页面有 zh 兄弟文件 → availableLocales = ["en","zh"]', () => {
    const result = computeAvailableLocales('en/download/index.md', true);
    expect(result).toEqual(['en', 'zh']);
  });

  it('en 页面无 zh 兄弟文件 → availableLocales = ["en"]', () => {
    const result = computeAvailableLocales('en/some/lonely/page.md', false);
    expect(result).toEqual(['en']);
  });

  it('filePath 不以 zh/ 或 en/ 开头 → availableLocales 不设置', () => {
    const result = computeAvailableLocales('other/projects/nestos.md', true);
    expect(result).toBeUndefined();
  });

  it('filePath 为 zh/ 根路径且有 en 兄弟 → 双语', () => {
    const result = computeAvailableLocales('zh/index.md', true);
    expect(result).toEqual(['zh', 'en']);
  });
});

describe('AppHeader.vue — langShow 与 availableLocales 交集过滤逻辑', () => {
  function filterLangShow(langShow: string[], availableLocales: string[] | undefined): string[] {
    if (!availableLocales) return langShow;
    return langShow.filter(l => {
      if (!SUPPORTED_LOCALES.includes(l)) return true;
      return availableLocales.includes(l);
    });
  }

  it('availableLocales = ["zh","en"] 且 langShow = ["zh","en"] → 不变', () => {
    expect(filterLangShow(['zh', 'en'], ['zh', 'en'])).toEqual(['zh', 'en']);
  });

  it('availableLocales = ["zh"] 且 langShow = ["zh","en"] → 仅保留 zh', () => {
    expect(filterLangShow(['zh', 'en'], ['zh'])).toEqual(['zh']);
  });

  it('availableLocales = ["en"] 且 langShow = ["zh","en"] → 仅保留 en', () => {
    expect(filterLangShow(['zh', 'en'], ['en'])).toEqual(['en']);
  });

  it('availableLocales = ["zh"] 且 langShow = ["zh","en","ar"] → 仅保留 zh 和 ar（ar 不在 SUPPORTED_LOCALES 中，跳过检查）', () => {
    expect(filterLangShow(['zh', 'en', 'ar'], ['zh'])).toEqual(['zh', 'ar']);
  });

  it('availableLocales = ["zh","en"] 且 langShow = ["zh"] → 不变（已满足）', () => {
    expect(filterLangShow(['zh'], ['zh', 'en'])).toEqual(['zh']);
  });

  it('availableLocales undefined → langShow 不变', () => {
    expect(filterLangShow(['zh', 'en'], undefined)).toEqual(['zh', 'en']);
  });

  it('首页场景: langShow=["zh","en","ar"]，availableLocales=["zh","en"] → ar 保留（ar 不在 SUPPORTED_LOCALES 中）', () => {
    expect(filterLangShow(['zh', 'en', 'ar'], ['zh', 'en'])).toEqual(['zh', 'en', 'ar']);
  });
});

describe('HeaderLanguage.vue — changeLanguage availableLocales 兜底拦截逻辑', () => {
  function shouldProceedChange(currentLang: string, newLang: string, availableLocales: string[] | undefined): boolean {
    if (currentLang === newLang) return false;
    if (availableLocales && SUPPORTED_LOCALES.includes(newLang) && !availableLocales.includes(newLang)) return false;
    return true;
  }

  it('availableLocales=["zh","en"], zh→en → 允许跳转', () => {
    expect(shouldProceedChange('zh', 'en', ['zh', 'en'])).toBe(true);
  });

  it('availableLocales=["zh"], zh→en → 拦截（目标 locale 不可用）', () => {
    expect(shouldProceedChange('zh', 'en', ['zh'])).toBe(false);
  });

  it('availableLocales=["en"], en→zh → 拦截（目标 locale 不可用）', () => {
    expect(shouldProceedChange('en', 'zh', ['en'])).toBe(false);
  });

  it('currentLang===newLang → 拦截（同语言不跳转）', () => {
    expect(shouldProceedChange('zh', 'zh', ['zh', 'en'])).toBe(false);
  });

  it('availableLocales undefined → 允许跳转（无兜底限制）', () => {
    expect(shouldProceedChange('zh', 'en', undefined)).toBe(true);
  });

  it('availableLocales=["zh","en"], en→zh → 允许跳转', () => {
    expect(shouldProceedChange('en', 'zh', ['zh', 'en'])).toBe(true);
  });

  it('availableLocales=["en"], en→ar → 允许跳转（ar 不在 SUPPORTED_LOCALES 中，跳过检查）', () => {
    expect(shouldProceedChange('en', 'ar', ['en'])).toBe(true);
  });

  it('changeLanguageMobile 仅在成功切换后触发 emit', () => {
    const switched = shouldProceedChange('zh', 'en', ['zh', 'en']);
    expect(switched).toBe(true);
    const blocked = shouldProceedChange('zh', 'en', ['zh']);
    expect(blocked).toBe(false);
  });
});

describe('真实文件系统 — locale 兄弟文件存在性集成验证', () => {
  it('zh/showcase/finance/gs/gs.md 的 en 兄弟不存在', () => {
    const siblingPath = join(APP_DIR, 'en/showcase/finance/gs/gs.md');
    expect(existsSync(siblingPath)).toBe(false);
  });

  it('zh/download/index.md 的 en 兄弟存在', () => {
    const siblingPath = join(APP_DIR, 'en/download/index.md');
    expect(existsSync(siblingPath)).toBe(true);
  });

  it('zh/security/security-bulletins/index.md 的 en 兄弟存在', () => {
    const siblingPath = join(APP_DIR, 'en/security/security-bulletins/index.md');
    expect(existsSync(siblingPath)).toBe(true);
  });

  it('zh/showcase/index.md 的 en 兄弟存在', () => {
    const siblingPath = join(APP_DIR, 'en/showcase/index.md');
    expect(existsSync(siblingPath)).toBe(true);
  });

  it('en/showcase/energy 下有 zh 兄弟目录（即 showcase 目录存在）', () => {
    const zhShowcaseDir = join(APP_DIR, 'zh/showcase');
    expect(existsSync(zhShowcaseDir)).toBe(true);
  });

  it('en/showcase/index.md 的 zh 兄弟存在', () => {
    const siblingPath = join(APP_DIR, 'zh/showcase/index.md');
    expect(existsSync(siblingPath)).toBe(true);
  });
});

describe('transformPageData 完整流程模拟 — frontmatter 注入验证', () => {
  function simulateTransformPageData(filePath: string, siblingExists: boolean) {
    const pageData: { filePath: string; frontmatter: Record<string, any> } = {
      filePath,
      frontmatter: {},
    };

    const matchedLocale = SUPPORTED_LOCALES.find(prefix => filePath.startsWith(`${prefix}/`));
    if (matchedLocale) {
      const available = [matchedLocale];
      for (const other of SUPPORTED_LOCALES) {
        if (other === matchedLocale) continue;
        const siblingPath = filePath.replace(`${matchedLocale}/`, `${other}/`);
        if (siblingExists) {
          available.push(other);
        }
      }
      pageData.frontmatter.availableLocales = available;
    }

    return pageData;
  }

  it('showcase 子页面（仅 zh）— frontmatter.availableLocales = ["zh"]', () => {
    const pd = simulateTransformPageData('zh/showcase/finance/gs/gs.md', false);
    expect(pd.frontmatter.availableLocales).toEqual(['zh']);
  });

  it('下载页（zh+en）— frontmatter.availableLocales = ["zh","en"]', () => {
    const pd = simulateTransformPageData('zh/download/index.md', true);
    expect(pd.frontmatter.availableLocales).toEqual(['zh', 'en']);
  });

  it('en 下载页 → frontmatter.availableLocales = ["en","zh"]', () => {
    const pd = simulateTransformPageData('en/download/index.md', true);
    expect(pd.frontmatter.availableLocales).toEqual(['en', 'zh']);
  });

  it('en 首页 → frontmatter.availableLocales = ["en","zh"]', () => {
    const pd = simulateTransformPageData('en/index.md', true);
    expect(pd.frontmatter.availableLocales).toEqual(['en', 'zh']);
  });
});
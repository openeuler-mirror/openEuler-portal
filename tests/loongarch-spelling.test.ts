import { expect, describe, it } from 'vitest';
import footerZh from '../app/.vitepress/src-new/i18n/footer/footer-zh';
import footerEn from '../app/.vitepress/src-new/i18n/footer/footer-en';
import brandZh from '../app/.vitepress/src-new/i18n/brand/brand-zh';
import brandEn from '../app/.vitepress/src-new/i18n/brand/brand-en';
import brandJsonLd from '../.geo/jsonld/zh/other/brand/index.json';

describe('LoongArch 拼写修正 — 页脚 zh locale', () => {
  it('atomText 包含 "LoongArch"（首字母大写 L）', () => {
    expect(footerZh.atomText).toContain('LoongArch');
  });

  it('atomText 不含 "loongArch"（首字母小写 l）', () => {
    expect(footerZh.atomText).not.toContain('loongArch');
  });
});

describe('LoongArch 拼写修正 — 品牌页 zh locale', () => {
  it('useDesc 包含 "LoongArch"（首字母大写 L）', () => {
    expect(brandZh.useDesc).toContain('LoongArch');
  });

  it('useDesc 不含 "loongArch"（首字母小写 l）', () => {
    expect(brandZh.useDesc).not.toContain('loongArch');
  });
});

describe('LoongArch 拼写修正 — 品牌页 SEO JSON-LD', () => {
  it('Organization description 包含 "LoongArch"（首字母大写 L）', () => {
    const org = brandJsonLd.find((item) => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org!.description).toContain('LoongArch');
  });

  it('Organization description 不含 "loongArch"（首字母小写 l）', () => {
    const org = brandJsonLd.find((item) => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org!.description).not.toContain('loongArch');
  });
});

describe('LoongArch 拼写 — en locale 回归验证', () => {
  it('页脚 en locale atomText 包含 "LoongArch"', () => {
    expect(footerEn.atomText).toContain('LoongArch');
  });

  it('页脚 en locale atomText 不含 "loongArch"', () => {
    expect(footerEn.atomText).not.toContain('loongArch');
  });

  it('品牌页 en locale useDesc 包含 "LoongArch"', () => {
    expect(brandEn.useDesc).toContain('LoongArch');
  });

  it('品牌页 en locale useDesc 不含 "loongArch"', () => {
    expect(brandEn.useDesc).not.toContain('loongArch');
  });
});

describe('全站 "loongArch" 小写拼写零残留', () => {
  it('页脚 zh/en locale 全部不含 "loongArch"', () => {
    const allTexts = [footerZh.atomText, footerEn.atomText];
    for (const text of allTexts) {
      expect(text).not.toContain('loongArch');
    }
  });

  it('品牌页 zh/en locale 全部不含 "loongArch"', () => {
    const allTexts = [brandZh.useDesc, brandEn.useDesc];
    for (const text of allTexts) {
      expect(text).not.toContain('loongArch');
    }
  });

  it('品牌页 JSON-LD 全部不含 "loongArch"', () => {
    for (const item of brandJsonLd) {
      if (typeof item.description === 'string') {
        expect(item.description).not.toContain('loongArch');
      }
    }
  });
});
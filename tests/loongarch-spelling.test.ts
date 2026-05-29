import { expect, describe, it } from 'vitest';
import footerZh from '../app/.vitepress/src-new/i18n/footer/footer-zh';
import footerEn from '../app/.vitepress/src-new/i18n/footer/footer-en';
import brandZh from '../app/.vitepress/src-new/i18n/brand/brand-zh';
import brandEn from '../app/.vitepress/src-new/i18n/brand/brand-en';
import brandJsonLd from '../.geo/jsonld/zh/other/brand/index.json';
import summit2025Zh from '../app/.vitepress/src-new/views/summit/summit2025/data/data_zh';
import summit2025En from '../app/.vitepress/src-new/views/summit/summit2025/data/data_en';
import commercialRelease from '../app/.vitepress/src-new/data/download/download-commercial-release';

function collectTitles(obj: unknown): string[] {
  const titles: string[] = [];
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for (const item of obj) titles.push(...collectTitles(item));
    } else {
      const record = obj as Record<string, unknown>;
      if (typeof record.title === 'string') titles.push(record.title);
      for (const val of Object.values(record)) titles.push(...collectTitles(val));
    }
  }
  return titles;
}

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

describe('LoongArch 拼写修正 — summit2025 zh 数据', () => {
  const titles = collectTitles(summit2025Zh);

  it('议程标题中不含 "loongArch"（小写 l 驼峰拼写）', () => {
    for (const title of titles) {
      expect(title).not.toContain('loongArch');
    }
  });

  it('议程标题中不含 "loongarch"（全小写品牌名拼写）', () => {
    for (const title of titles) {
      expect(title).not.toContain('loongarch');
    }
  });

  it('修正后的标题包含 "LoongArch"', () => {
    expect(titles).toContain('基于LoongArch 的trampoline和kexec_file功能开发');
  });
});

describe('LoongArch 拼写 — summit2025 en 数据回归验证', () => {
  const titles = collectTitles(summit2025En);

  it('议程标题中不含 "loongArch"（小写 l 驼峰拼写）', () => {
    for (const title of titles) {
      expect(title).not.toContain('loongArch');
    }
  });

  it('议程标题中不含 "loongarch"（全小写品牌名拼写）', () => {
    for (const title of titles) {
      expect(title).not.toContain('loongarch');
    }
  });

  it('对应标题已使用 "LoongArch"', () => {
    expect(titles).toContain('trampoline and kexec_file Features Based on LoongArch');
  });
});

describe('LoongArch 拼写 — download 商业发行版显示文本', () => {
  function collectArchValues(obj: unknown): string[] {
    const values: string[] = [];
    if (obj && typeof obj === 'object') {
      if (Array.isArray(obj)) {
        for (const item of obj) values.push(...collectArchValues(item));
      } else {
        const record = obj as Record<string, unknown>;
        if (typeof record.ARCH === 'string') values.push(record.ARCH);
        for (const val of Object.values(record)) values.push(...collectArchValues(val));
      }
    }
    return values;
  }

  function collectDescValues(obj: unknown): string[] {
    const values: string[] = [];
    if (obj && typeof obj === 'object') {
      if (Array.isArray(obj)) {
        for (const item of obj) values.push(...collectDescValues(item));
      } else {
        const record = obj as Record<string, unknown>;
        if (typeof record.DESC === 'string') values.push(record.DESC);
        for (const val of Object.values(record)) values.push(...collectDescValues(val));
      }
    }
    return values;
  }

  const zhArchValues = collectArchValues(commercialRelease.zh);
  const enArchValues = collectArchValues(commercialRelease.en);
  const zhDescValues = collectDescValues(commercialRelease.zh);
  const enDescValues = collectDescValues(commercialRelease.en);

  it('zh locale ARCH 显示值中 "LoongArch64" 使用首字母大写 L', () => {
    const loongArchEntries = zhArchValues.filter((v) => v.toLowerCase().includes('loongarch'));
    for (const entry of loongArchEntries) {
      expect(entry).toBe('LoongArch64');
    }
  });

  it('en locale ARCH 显示值中 "LoongArch64" 使用首字母大写 L', () => {
    const loongArchEntries = enArchValues.filter((v) => v.toLowerCase().includes('loongarch'));
    for (const entry of loongArchEntries) {
      expect(entry).toBe('LoongArch64');
    }
  });

  it('zh locale DESC 文本不含 "loongArch"（小写 l 驼峰拼写）', () => {
    for (const desc of zhDescValues) {
      expect(desc).not.toContain('loongArch');
    }
  });

  it('en locale DESC 文本不含 "loongArch"（小写 l 驼峰拼写）', () => {
    for (const desc of enDescValues) {
      expect(desc).not.toContain('loongArch');
    }
  });

  it('zh locale DESC 文本中品牌名 "LoongArch" 使用首字母大写 L', () => {
    const descsWithLoong = zhDescValues.filter((d) => d.includes('LoongArch') || d.includes('loongarch') || d.includes('loongArch'));
    for (const desc of descsWithLoong) {
      expect(desc).toContain('LoongArch');
      expect(desc).not.toContain('loongArch');
      expect(desc).not.toContain('loongarch');
    }
  });
});
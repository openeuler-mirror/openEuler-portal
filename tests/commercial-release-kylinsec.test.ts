import { expect, describe, it } from 'vitest';
import commercialReleaseData from '../app/.vitepress/src-new/data/download/download-commercial-release';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const geoDir = resolve(__dirname, '../.geo');

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'jsonld', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

const zhList = commercialReleaseData.zh.COMMERCIAL_RELEASE_LIST;
const enList = commercialReleaseData.en.COMMERCIAL_RELEASE_LIST;

function findKylinsecItems(list: any[]) {
  return list.filter((item: any) => item.MANUFACTURER.includes('Kylinsec') || item.MANUFACTURER.includes('麒麟信安'));
}

const zhKylinsec = findKylinsecItems(zhList);
const enKylinsec = findKylinsecItems(enList);

describe('zh 商业发行版数据 — Kylinsec 条目数量与名称', () => {
  it('zh 区 Kylinsec 条目恰好 4 条', () => {
    expect(zhKylinsec).toHaveLength(4);
  });

  const expectedZhNames = [
    '麒麟信安 Kylinsec V6 SP1',
    '麒麟信安 Kylinsec V3.4.5-Update2',
    '麒麟信安 Kylinsec V6',
    '麒麟信安 Kylinsec V3.5.2',
  ];

  for (const name of expectedZhNames) {
    it(`zh 区包含 "${name}"`, () => {
      const found = zhKylinsec.find((item: any) => item.NAME === name);
      expect(found).toBeDefined();
    });
  }
});

describe('en 商业发行版数据 — Kylinsec 条目数量与名称', () => {
  it('en 区 Kylinsec 条目恰好 4 条', () => {
    expect(enKylinsec).toHaveLength(4);
  });

  const expectedEnNames = [
    'Kylinsec V6 SP1',
    'Kylinsec V3.4.5-Update2',
    'Kylinsec V6',
    'Kylinsec V3.5.2',
  ];

  for (const name of expectedEnNames) {
    it(`en 区包含 "${name}"`, () => {
      const found = enKylinsec.find((item: any) => item.NAME === name);
      expect(found).toBeDefined();
    });
  }
});

describe('已删除版本不再出现在数据中', () => {
  const deletedNames = [
    '麒麟信安 Kylinsec V3.5.1',
    '麒麟信安 Kylinsec V3.4-5',
    '麒麟信安 Kylinsec V3.4-4',
    'Kylinsec V3.4-4',
  ];

  for (const name of deletedNames) {
    it(`zh/en 数据不含 "${name}"`, () => {
      const zhFound = zhList.find((item: any) => item.NAME === name);
      const enFound = enList.find((item: any) => item.NAME === name);
      expect(zhFound).toBeUndefined();
      expect(enFound).toBeUndefined();
    });
  }
});

describe('V3.5.2 DOWNLOAD_URL 已更新为新域名', () => {
  it('zh V3.5.2 DOWNLOAD_URL 为 mirrorlists.kylinsec.com.cn', () => {
    const v352 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V3.5.2');
    expect(v352!.DOWNLOAD_URL).toBe('https://mirrorlists.kylinsec.com.cn/iso/V3.5.2/');
  });

  it('en V3.5.2 DOWNLOAD_URL 为 mirrorlists.kylinsec.com.cn', () => {
    const v352 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V3.5.2');
    expect(v352!.DOWNLOAD_URL).toBe('https://mirrorlists.kylinsec.com.cn/iso/V3.5.2/');
  });

  it('zh V3.5.2 DETAILED_LINK 使用 mirrorlists 域名', () => {
    const v352 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V3.5.2');
    for (const link of v352!.DETAILED_LINK) {
      if (link.LINK) {
        expect(link.LINK).toContain('mirrorlists.kylinsec.com.cn/iso/V3.5.2/');
      }
    }
  });

  it('en V3.5.2 DETAILED_LINK 使用 mirrorlists 域名', () => {
    const v352 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V3.5.2');
    for (const link of v352!.DETAILED_LINK) {
      if (link.LINK) {
        expect(link.LINK).toContain('mirrorlists.kylinsec.com.cn/iso/V3.5.2/');
      }
    }
  });
});

describe('V6 SP1 数据完整性', () => {
  it('zh V6 SP1 DOWNLOAD_URL 为 mirrorlists.kylinsec.com.cn', () => {
    const v6sp1 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V6 SP1');
    expect(v6sp1!.DOWNLOAD_URL).toBe('https://mirrorlists.kylinsec.com.cn/iso/V6-SP1/');
  });

  it('zh V6 SP1 支持 x86_64 / AArch64 / LoongArch64 三种架构', () => {
    const v6sp1 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V6 SP1');
    const archs = v6sp1!.DETAILED_LINK.map((l: any) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs).toContain('LoongArch64');
  });

  it('en V6 SP1 DOWNLOAD_URL 为 mirrorlists.kylinsec.com.cn', () => {
    const v6sp1 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V6 SP1');
    expect(v6sp1!.DOWNLOAD_URL).toBe('https://mirrorlists.kylinsec.com.cn/iso/V6-SP1/');
  });

  it('en V6 SP1 支持 x86_64 / AArch64 / LoongArch64 三种架构', () => {
    const v6sp1 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V6 SP1');
    const archs = v6sp1!.DETAILED_LINK.map((l: any) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs).toContain('LoongArch64');
  });
});

describe('V6 数据完整性', () => {
  it('zh V6 支持 x86_64 / AArch64 / LoongArch64 三种架构', () => {
    const v6 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V6');
    const archs = v6!.DETAILED_LINK.map((l: any) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs).toContain('LoongArch64');
  });

  it('en V6 支持 x86_64 / AArch64 / LoongArch64 三种架构', () => {
    const v6 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V6');
    const archs = v6!.DETAILED_LINK.map((l: any) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs).toContain('LoongArch64');
  });
});

describe('V3.4.5-Update2 数据完整性', () => {
  it('zh V3.4.5-Update2 仅支持 x86_64 / AArch64（不含 LoongArch64）', () => {
    const v345 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V3.4.5-Update2');
    const archs = v345!.DETAILED_LINK.map((l: any) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs).not.toContain('LoongArch64');
  });

  it('en V3.4.5-Update2 仅支持 x86_64 / AArch64（不含 LoongArch64）', () => {
    const v345 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V3.4.5-Update2');
    const archs = v345!.DETAILED_LINK.map((l: any) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs).not.toContain('LoongArch64');
  });
});

describe('zh 商业发行版 JSON-LD 配置', () => {
  const jsonLd = readJsonLdJson('zh', 'download/commercial-release');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 BreadcrumbList 条目', () => {
    const asArray = jsonLd as any[];
    const breadcrumb = asArray.find((item: any) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
  });

  it('包含 ItemList 条目', () => {
    const asArray = jsonLd as any[];
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeDefined();
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });

  const itemList = (jsonLd as any[]).find((item: any) => item['@type'] === 'ItemList');
  const itemNames = itemList!.itemListElement.map((li: any) => li.item.name);

  it('ItemList numberOfItems 与 COMMERCIAL_RELEASE_LIST 长度一致', () => {
    expect(itemList!.numberOfItems).toBe(zhList.length);
  });

  it('ItemList 包含新 Kylinsec V6 SP1 条目', () => {
    expect(itemNames).toContain('麒麟信安 Kylinsec V6 SP1');
  });

  it('ItemList 包含新 Kylinsec V3.4.5-Update2 条目', () => {
    expect(itemNames).toContain('麒麟信安 Kylinsec V3.4.5-Update2');
  });

  it('ItemList 包含新 Kylinsec V6 条目', () => {
    expect(itemNames).toContain('麒麟信安 Kylinsec V6');
  });

  it('ItemList 包含 Kylinsec V3.5.2 条目', () => {
    expect(itemNames).toContain('麒麟信安 Kylinsec V3.5.2');
  });

  it('ItemList 不含已删除的 Kylinsec V3.5.1 条目', () => {
    expect(itemNames).not.toContain('麒麟信安 Kylinsec V3.5.1');
  });

  it('ItemList 不含已删除的 Kylinsec V3.4-5 条目', () => {
    expect(itemNames).not.toContain('麒麟信安 Kylinsec V3.4-5');
  });

  it('ItemList 不含已删除的 Kylinsec V3.4-4 条目', () => {
    expect(itemNames).not.toContain('麒麟信安 Kylinsec V3.4-4');
  });

  it('ItemList position 从 1 开始连续递增', () => {
    const positions = itemList!.itemListElement.map((li: any) => li.position);
    for (let i = 0; i < positions.length; i++) {
      expect(positions[i]).toBe(i + 1);
    }
  });

  it('每个 SoftwareApplication 条目包含必填字段', () => {
    for (const li of itemList!.itemListElement) {
      const app = li.item;
      expect(app['@type']).toBe('SoftwareApplication');
      expect(app.name).toBeDefined();
      expect(app.applicationCategory).toBe('Operating System');
      expect(app.operatingSystem).toBe('Linux');
      expect(app.publisher).toBeDefined();
      expect(app.publisher['@type']).toBe('Organization');
    }
  });
});

describe('en 商业发行版 JSON-LD 配置', () => {
  const jsonLd = readJsonLdJson('en', 'download/commercial-release');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 BreadcrumbList 条目', () => {
    const asArray = jsonLd as any[];
    const breadcrumb = asArray.find((item: any) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
  });

  it('包含 ItemList 条目', () => {
    const asArray = jsonLd as any[];
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeDefined();
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });

  const itemList = (jsonLd as any[]).find((item: any) => item['@type'] === 'ItemList');
  const itemNames = itemList!.itemListElement.map((li: any) => li.item.name);

  it('ItemList numberOfItems 与 en COMMERCIAL_RELEASE_LIST 长度一致', () => {
    expect(itemList!.numberOfItems).toBe(enList.length);
  });

  it('ItemList 包含新 Kylinsec V6 SP1 条目', () => {
    expect(itemNames).toContain('Kylinsec V6 SP1');
  });

  it('ItemList 包含新 Kylinsec V3.4.5-Update2 条目', () => {
    expect(itemNames).toContain('Kylinsec V3.4.5-Update2');
  });

  it('ItemList 包含新 Kylinsec V6 条目', () => {
    expect(itemNames).toContain('Kylinsec V6');
  });

  it('ItemList 包含 Kylinsec V3.5.2 条目', () => {
    expect(itemNames).toContain('Kylinsec V3.5.2');
  });

  it('ItemList 不含已删除的 Kylinsec V3.4-4 条目', () => {
    expect(itemNames).not.toContain('Kylinsec V3.4-4');
  });

  it('ItemList position 从 1 开始连续递增', () => {
    const positions = itemList!.itemListElement.map((li: any) => li.position);
    for (let i = 0; i < positions.length; i++) {
      expect(positions[i]).toBe(i + 1);
    }
  });

  it('每个 SoftwareApplication 条目包含必填字段', () => {
    for (const li of itemList!.itemListElement) {
      const app = li.item;
      expect(app['@type']).toBe('SoftwareApplication');
      expect(app.name).toBeDefined();
      expect(app.applicationCategory).toBe('Operating System');
      expect(app.operatingSystem).toBe('Linux');
      expect(app.publisher).toBeDefined();
      expect(app.publisher['@type']).toBe('Organization');
    }
  });
});

describe('zh/en 双语数据一致性', () => {
  it('zh 和 en 的 Kylinsec 条目数量相同（均为 4 条）', () => {
    expect(zhKylinsec.length).toBe(enKylinsec.length);
  });

  it('zh 和 en 的 Kylinsec DOWNLOAD_URL 基础域名一致（均为 mirrorlists.kylinsec.com.cn）', () => {
    const zhUrls = zhKylinsec.map((item: any) => item.DOWNLOAD_URL);
    const enUrls = enKylinsec.map((item: any) => item.DOWNLOAD_URL);
    for (const url of zhUrls) {
      expect(url).toContain('mirrorlists.kylinsec.com.cn');
    }
    for (const url of enUrls) {
      expect(url).toContain('mirrorlists.kylinsec.com.cn');
    }
  });

  it('zh V6 SP1 / V6 / V3.5.2 LoongArch64 支持，V3.4.5-Update2 不含 LoongArch64', () => {
    const v6sp1 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V6 SP1');
    const v6 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V6');
    const v352 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V3.5.2');
    const v345 = zhKylinsec.find((item: any) => item.NAME === '麒麟信安 Kylinsec V3.4.5-Update2');

    expect(v6sp1!.DETAILED_LINK.map((l: any) => l.ARCH)).toContain('LoongArch64');
    expect(v6!.DETAILED_LINK.map((l: any) => l.ARCH)).toContain('LoongArch64');
    expect(v352!.DETAILED_LINK.map((l: any) => l.ARCH)).toContain('LoongArch64');
    expect(v345!.DETAILED_LINK.map((l: any) => l.ARCH)).not.toContain('LoongArch64');
  });

  it('en V6 SP1 / V6 / V3.5.2 LoongArch64 支持，V3.4.5-Update2 不含 LoongArch64', () => {
    const v6sp1 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V6 SP1');
    const v6 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V6');
    const v352 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V3.5.2');
    const v345 = enKylinsec.find((item: any) => item.NAME === 'Kylinsec V3.4.5-Update2');

    expect(v6sp1!.DETAILED_LINK.map((l: any) => l.ARCH)).toContain('LoongArch64');
    expect(v6!.DETAILED_LINK.map((l: any) => l.ARCH)).toContain('LoongArch64');
    expect(v352!.DETAILED_LINK.map((l: any) => l.ARCH)).toContain('LoongArch64');
    expect(v345!.DETAILED_LINK.map((l: any) => l.ARCH)).not.toContain('LoongArch64');
  });
});

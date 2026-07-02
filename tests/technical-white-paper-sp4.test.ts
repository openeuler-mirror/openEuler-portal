import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PROJECT_ROOT = resolve(__dirname, '..');
const geoDir = join(PROJECT_ROOT, '.geo');
const publicDir = join(PROJECT_ROOT, 'app/.vitepress/public');

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'jsonld', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

const dataModulePath = join(PROJECT_ROOT, 'app/.vitepress/src/data/showcase/technical-while-paper.ts');

describe('技术白皮书数据文件 — 24.03 LTS SP4 条目验证', () => {
  let data: any;
  let sourceContent: string;

  it('数据文件 technical-while-paper.ts 存在', () => {
    expect(existsSync(dataModulePath)).toBe(true);
  });

  it('数据文件可正确导出 zh 和 en 数组', () => {
    sourceContent = readFileSync(dataModulePath, 'utf-8');
    expect(sourceContent).toContain('export default');
    expect(sourceContent).toContain('zh:');
    expect(sourceContent).toContain('en:');
  });

  it('zh 数组首位为 24.03 LTS SP4 条目', () => {
    const match = sourceContent.match(/zh:\s*\[([\s\S]*?)\]\s*,\s*en:/);
    expect(match).not.toBeNull();
    const zhSection = match![1];
    const firstEntryMatch = zhSection.match(/\{[^}]+\}/);
    expect(firstEntryMatch).not.toBeNull();
    const firstEntry = firstEntryMatch![0];
    expect(firstEntry).toContain('24.03%20LTS%20SP4');
    expect(firstEntry).toContain('技术白皮书');
  });

  it('zh SP4 条目 path 使用 %20 URL 编码（LTS 版本惯例）', () => {
    const match = sourceContent.match(/zh:\s*\[([\s\S]*?)\]\s*,\s*en:/);
    const zhSection = match![1];
    const firstEntryMatch = zhSection.match(/\{[^}]+\}/);
    const firstEntry = firstEntryMatch![0];
    expect(firstEntry).toContain('%20');
    expect(firstEntry).toContain('24.03%20LTS%20SP4%20技术白皮书.pdf');
  });

  it('zh SP4 条目仅含 path 和 summary 两个字段', () => {
    const match = sourceContent.match(/zh:\s*\[([\s\S]*?)\]\s*,\s*en:/);
    const zhSection = match![1];
    const firstEntryMatch = zhSection.match(/\{([^}]+)\}/);
    const entryContent = firstEntryMatch![1];
    expect(entryContent).toContain('path');
    expect(entryContent).toContain('summary');
    const fieldNames = entryContent
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.includes(':'))
      .map(f => f.split(':')[0].trim().replace(/['"]/g, ''))
      .filter(f => f.length > 0);
    expect(fieldNames).toEqual(['path', 'summary']);
  });

  it('zh 数组原有条目（SP3 等）不受影响', () => {
    const match = sourceContent.match(/zh:\s*\[([\s\S]*?)\]\s*,\s*en:/);
    const zhSection = match![1];
    expect(zhSection).toContain('24.03%20LTS%20SP3');
    expect(zhSection).toContain('25.09');
  });

  it('en 数组首位为 24.03 LTS SP3 条目（SP4 en 条目为 TODO 注释状态）', () => {
    const enSection = sourceContent.substring(sourceContent.indexOf('en:'));
    const activeEntries = enSection.match(/^\s*\{[^}]+\}/gm);
    if (activeEntries) {
      const firstActiveEntry = activeEntries[0];
      expect(firstActiveEntry).toContain('24.03 LTS SP3');
    }
  });

  it('en SP4 条目为注释状态，包含 TODO 标记', () => {
    const enSection = sourceContent.substring(sourceContent.indexOf('en:'));
    expect(enSection).toContain('TODO');
    expect(enSection).toContain('SP4');
  });

  it('en SP3 条目 path 不编码空格（非编码惯例）', () => {
    const enSection = sourceContent.substring(sourceContent.indexOf('en:'));
    const sp3EntryMatch = enSection.match(/\{[^}]*24\.03 LTS SP3[^}]*\}/);
    if (sp3EntryMatch) {
      expect(sp3EntryMatch![0]).toContain('openEuler 24.03 LTS SP3 Technical White Paper.pdf');
    }
  });
});

describe('zh 技术白皮书 JSON-LD — 24.03 LTS SP4 条目验证', () => {
  const jsonLd = readJsonLdJson('zh', 'showcase/technical-white-paper');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为合规 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 CollectionPage schema 条目', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    expect(collectionPage).toBeDefined();
  });

  it('CollectionPage.hasPart 首位为 SP4 TechArticle', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    expect(collectionPage).toBeDefined();
    const hasPart = collectionPage!.hasPart;
    expect(Array.isArray(hasPart)).toBe(true);
    expect(hasPart!.length).toBeGreaterThan(0);
    const firstArticle = hasPart![0];
    expect(firstArticle['@type']).toBe('TechArticle');
    expect(firstArticle.name).toContain('24.03 LTS SP4');
    expect(firstArticle.inLanguage).toBe('zh-CN');
  });

  it('SP4 TechArticle about 字段包含 SoftwareApplication', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    const firstArticle = collectionPage!.hasPart[0];
    expect(firstArticle.about).toBeDefined();
    expect(firstArticle.about['@type']).toBe('SoftwareApplication');
    expect(firstArticle.about.name).toContain('openEuler 24.03 LTS SP4');
  });

  it('CollectionPage.hasPart 条目数为 13（含新增 SP4 后所有版本白皮书）', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    expect(collectionPage!.hasPart.length).toBe(13);
  });

  it('hasPart 中每个 TechArticle 包含 @type/name/url/inLanguage/about', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    for (const article of collectionPage!.hasPart) {
      expect(article).toHaveProperty('@type');
      expect(article).toHaveProperty('name');
      expect(article).toHaveProperty('url');
      expect(article).toHaveProperty('inLanguage');
      expect(article).toHaveProperty('about');
    }
  });

  it('包含 ItemList schema 条目', () => {
    const asArray = jsonLd as any[];
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeDefined();
  });

  it('ItemList numberOfItems 为 13（与实际条目数一致）', () => {
    const asArray = jsonLd as any[];
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeDefined();
    expect(itemList!.numberOfItems).toBe(13);
    expect(itemList!.itemListElement.length).toBe(13);
  });

  it('ItemList 首位为 SP4 ListItem（position=1）', () => {
    const asArray = jsonLd as any[];
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    const firstItem = itemList!.itemListElement[0];
    expect(firstItem['@type']).toBe('ListItem');
    expect(firstItem.position).toBe(1);
    expect(firstItem.name).toContain('24.03 LTS SP4');
  });

  it('ItemList position 编号连续从 1 到 13', () => {
    const asArray = jsonLd as any[];
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    const positions = itemList!.itemListElement.map((item: any) => item.position);
    const expected = Array.from({ length: 13 }, (_, i) => i + 1);
    expect(positions).toEqual(expected);
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });

  it('域名不含 openatom.cn', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
  });

  it('SP4 TechArticle url 使用 www.openeuler.org', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    const firstArticle = collectionPage!.hasPart[0];
    expect(firstArticle.url).toContain('www.openeuler.org/zh/showcase/technical-white-paper');
  });
});

describe('en 技术白皮书 JSON-LD — 24.03 LTS SP4 条目验证', () => {
  const jsonLd = readJsonLdJson('en', 'showcase/technical-white-paper');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为合规 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 CollectionPage schema 条目', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    expect(collectionPage).toBeDefined();
  });

  it('CollectionPage.hasPart 首位为 SP4 TechArticle', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    expect(collectionPage).toBeDefined();
    const hasPart = collectionPage!.hasPart;
    expect(Array.isArray(hasPart)).toBe(true);
    expect(hasPart!.length).toBeGreaterThan(0);
    const firstArticle = hasPart![0];
    expect(firstArticle['@type']).toBe('TechArticle');
    expect(firstArticle.name).toContain('24.03 LTS SP4');
  });

  it('SP4 TechArticle about 字段含 operatingSystem 和 publisher', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    const firstArticle = collectionPage!.hasPart[0];
    expect(firstArticle.about).toBeDefined();
    expect(firstArticle.about.operatingSystem).toBe('Linux');
    expect(firstArticle.publisher).toBeDefined();
    expect(firstArticle.publisher['@type']).toBe('Organization');
    expect(firstArticle.publisher.name).toBe('openEuler');
  });

  it('en JSON-LD 包含 BreadcrumbList（无 ItemList）', () => {
    const asArray = jsonLd as any[];
    const breadcrumb = asArray.find((item: any) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
    const itemList = asArray.find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeUndefined();
  });

  it('BreadcrumbList 不受 SP4 新增影响', () => {
    const asArray = jsonLd as any[];
    const breadcrumb = asArray.find((item: any) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumb!.itemListElement.length).toBe(3);
    expect(breadcrumb!.itemListElement[0].position).toBe(1);
    expect(breadcrumb!.itemListElement[0].name).toBe('Home');
  });

  it('CollectionPage.inLanguage 为 en', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    expect(collectionPage!.inLanguage).toBe('en');
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });

  it('域名不含 openatom.cn', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
  });

  it('SP4 TechArticle url 使用 www.openeuler.org', () => {
    const asArray = jsonLd as any[];
    const collectionPage = asArray.find((item: any) => item['@type'] === 'CollectionPage');
    const firstArticle = collectionPage!.hasPart[0];
    expect(firstArticle.url).toContain('www.openeuler.org/en/showcase/technical-white-paper');
  });
});

describe('zh SP4 PDF 文件存在性验证', () => {
  it('openEuler 24.03 LTS SP4 技术白皮书.pdf 存在于 public/whitepaper/', () => {
    const pdfPath = join(publicDir, 'whitepaper', 'openEuler 24.03 LTS SP4 技术白皮书.pdf');
    expect(existsSync(pdfPath)).toBe(true);
  });

  it('SP4 PDF 文件大小大于 0', () => {
    const pdfPath = join(publicDir, 'whitepaper', 'openEuler 24.03 LTS SP4 技术白皮书.pdf');
    const stats = readFileSync(pdfPath);
    expect(stats.length).toBeGreaterThan(0);
  });

  it('zh 数据文件 path 中 %20 编码指向的实际文件名可解码匹配', () => {
    const encodedPath = '/whitepaper/openEuler%2024.03%20LTS%20SP4%20技术白皮书.pdf';
    const decodedFileName = decodeURIComponent(encodedPath.replace('/whitepaper/', ''));
    const pdfPath = join(publicDir, 'whitepaper', decodedFileName);
    expect(existsSync(pdfPath)).toBe(true);
  });
});

describe('en SP4 PDF 文件状态（TODO 注释）', () => {
  it('en SP4 PDF 文件当前不存在（对应 TODO 注释状态）', () => {
    const pdfPath = join(publicDir, 'whitepaper/en', 'openEuler 24.03 LTS SP4 Technical White Paper.pdf');
    expect(existsSync(pdfPath)).toBe(false);
  });
});

describe('zh/en 双语数据一致性验证', () => {
  it('zh 数据文件 path 与 zh jsonld hasPart name 对应（SP4 条目）', () => {
    const jsonLd = readJsonLdJson('zh', 'showcase/technical-white-paper') as any[];
    const collectionPage = jsonLd.find((item: any) => item['@type'] === 'CollectionPage');
    const sp4Article = collectionPage!.hasPart.find(
      (a: any) => a.name.includes('24.03 LTS SP4')
    );
    expect(sp4Article).toBeDefined();
    expect(sp4Article!.name).toBe('openEuler 24.03 LTS SP4 白皮书');
  });

  it('en 数据文件 path 与 en jsonld hasPart name 对应（SP4 条目）', () => {
    const jsonLd = readJsonLdJson('en', 'showcase/technical-white-paper') as any[];
    const collectionPage = jsonLd.find((item: any) => item['@type'] === 'CollectionPage');
    const sp4Article = collectionPage!.hasPart.find(
      (a: any) => a.name.includes('24.03 LTS SP4')
    );
    expect(sp4Article).toBeDefined();
    expect(sp4Article!.name).toBe('openEuler 24.03 LTS SP4 Technical White Paper');
  });
});

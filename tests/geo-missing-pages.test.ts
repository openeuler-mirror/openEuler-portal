import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PROJECT_ROOT = resolve(__dirname, '..');
const geoDir = join(PROJECT_ROOT, '.geo');

function readTdkJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'tdks', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'jsonld', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function listSubdirs(basePath: string): string[] {
  if (!existsSync(basePath)) return [];
  return readdirSync(basePath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

function findEnShowcaseJsonldPaths(): string[] {
  const showcaseBase = join(geoDir, 'jsonld', 'en', 'showcase');
  if (!existsSync(showcaseBase)) return [];
  const categories = listSubdirs(showcaseBase);
  const paths: string[] = [];
  for (const cat of categories) {
    const catBase = join(showcaseBase, cat);
    const entries = listSubdirs(catBase);
    for (const entry of entries) {
      const indexPath = join(catBase, entry, 'index.json');
      if (existsSync(indexPath)) {
        paths.push(`showcase/${cat}/${entry}`);
      }
    }
  }
  return paths;
}

function findEnShowcaseTdkPaths(): string[] {
  const showcaseBase = join(geoDir, 'tdks', 'en', 'showcase');
  if (!existsSync(showcaseBase)) return [];
  const categories = listSubdirs(showcaseBase);
  const paths: string[] = [];
  for (const cat of categories) {
    const catBase = join(showcaseBase, cat);
    const entries = listSubdirs(catBase);
    for (const entry of entries) {
      const indexPath = join(catBase, entry, 'index.json');
      if (existsSync(indexPath)) {
        paths.push(`showcase/${cat}/${entry}`);
      }
    }
  }
  return paths;
}

const enShowcaseJsonldPaths = findEnShowcaseJsonldPaths();
const enShowcaseTdkPaths = findEnShowcaseTdkPaths();

describe('sig-detail JSON-LD 补全（设计 §4 Step 4）', () => {
  const sigDetailPages = [
    { locale: 'zh', path: 'sig/sig-detail', label: 'sig-detail zh' },
    { locale: 'en', path: 'sig/sig-detail', label: 'sig-detail en' },
  ];

  for (const { locale, path, label } of sigDetailPages) {
    describe(`sig-detail JSON-LD ${label}`, () => {
      const jsonLd = readJsonLdJson(locale, path);

      it('JSON-LD 配置文件存在', () => {
        expect(jsonLd).not.toBeNull();
      });

      it('JSON-LD 为合规 array 格式', () => {
        expect(Array.isArray(jsonLd)).toBe(true);
      });

      it('包含 WebPage schema 条目', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage).toBeDefined();
      });

      it('WebPage 包含 name、url、description、inLanguage', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage!).toHaveProperty('name');
        expect(webPage!).toHaveProperty('url');
        expect(webPage!).toHaveProperty('description');
        expect(webPage!).toHaveProperty('inLanguage');
      });

      it('WebPage inLanguage 字段正确', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage!.inLanguage).toBe(locale === 'zh' ? 'zh' : 'en');
      });

      it('WebPage 包含 breadcrumb 导航', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage!).toHaveProperty('breadcrumb');
        expect(webPage!.breadcrumb['@type']).toBe('BreadcrumbList');
      });

      it('包含 Organization schema 条目', () => {
        const asArray = jsonLd as any[];
        const org = asArray.find((item: any) => item['@type'] === 'Organization');
        expect(org).toBeDefined();
      });

      it('Organization 包含 parentOrganization', () => {
        const asArray = jsonLd as any[];
        const org = asArray.find((item: any) => item['@type'] === 'Organization');
        expect(org!).toHaveProperty('parentOrganization');
        expect(org!.parentOrganization['@type']).toBe('Organization');
      });

      it('所有条目均有 @context 且为 https://schema.org', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          expect(item['@context']).toBe('https://schema.org');
        }
      });

      it('所有条目均有 @type', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          expect(item).toHaveProperty('@type');
        }
      });

      it('URL 使用 www.openeuler.org 占位符（生产域名适配机制）', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          if (item.url) {
            expect(item.url).toContain('www.openeuler.org');
          }
        }
      });

      it('域名不含 openatom.cn', () => {
        const str = JSON.stringify(jsonLd);
        expect(str).not.toContain('openeuler.openatom.cn');
      });

      it('URL 使用完整 https 绝对路径', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          if (item.url && typeof item.url === 'string') {
            expect(item.url).toMatch(/^https:\/\//);
          }
        }
      });
    });
  }
});

describe('en/sig/meeting-guide TDK 补全（设计 §4 Step 5）', () => {
  const tdk = readTdkJson('en', 'sig/meeting-guide');

  it('TDK 配置文件存在', () => {
    expect(tdk).not.toBeNull();
  });

  it('title 字段存在且非空', () => {
    expect(tdk).toHaveProperty('title');
    expect(typeof tdk!.title).toBe('string');
    expect(tdk!.title.length).toBeGreaterThan(0);
  });

  it('description 字段存在且非空', () => {
    expect(tdk).toHaveProperty('description');
    expect(typeof tdk!.description).toBe('string');
    expect(tdk!.description.length).toBeGreaterThan(0);
  });

  it('keywords 字段存在且非空', () => {
    expect(tdk).toHaveProperty('keywords');
    expect(typeof tdk!.keywords).toBe('string');
    expect(tdk!.keywords.length).toBeGreaterThan(0);
  });

  it('title 包含 SIG', () => {
    expect(tdk!.title).toContain('SIG');
  });

  it('title 包含 openEuler', () => {
    expect(tdk!.title).toContain('openEuler');
  });

  it('keywords 包含 openEuler', () => {
    expect(tdk!.keywords.toLowerCase()).toContain('openeuler');
  });

  it('keywords 包含 SIG', () => {
    expect(tdk!.keywords).toContain('SIG');
  });

  it('description 使用英文（不含中文）', () => {
    const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.description);
    expect(hasChinese).toBe(false);
  });

  it('keywords 使用英文关键词（不含中文）', () => {
    const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
    expect(hasChinese).toBe(false);
  });
});

describe('en/community/certification-services JSON-LD（新增）', () => {
  const jsonLd = readJsonLdJson('en', 'community/certification-services');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为合规 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 WebPage schema 条目', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage).toBeDefined();
  });

  it('WebPage 包含 name、url、description、inLanguage', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!).toHaveProperty('name');
    expect(webPage!).toHaveProperty('url');
    expect(webPage!).toHaveProperty('description');
    expect(webPage!).toHaveProperty('inLanguage');
    expect(webPage!.inLanguage).toBe('en');
  });

  it('WebPage 包含 breadcrumb', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!).toHaveProperty('breadcrumb');
    expect(webPage!.breadcrumb['@type']).toBe('BreadcrumbList');
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });

  it('URL 使用 www.openeuler.org 占位符', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      if (item.url) {
        expect(item.url).toContain('www.openeuler.org');
      }
    }
  });

  it('域名不含 openatom.cn', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
  });
});

describe('en/community/certification-services/search JSON-LD（新增）', () => {
  const jsonLd = readJsonLdJson('en', 'community/certification-services/search');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为合规 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 WebPage schema 条目', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage).toBeDefined();
  });

  it('WebPage inLanguage 为 en', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!.inLanguage).toBe('en');
  });

  it('WebPage breadcrumb 包含 4 级导航', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!.breadcrumb.itemListElement.length).toBe(4);
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
});

describe('download/get-os JSON-LD（新增）', () => {
  const getOsPages = [
    { locale: 'zh', path: 'download/get-os', label: 'get-os zh' },
    { locale: 'en', path: 'download/get-os', label: 'get-os en' },
  ];

  for (const { locale, path, label } of getOsPages) {
    describe(`get-os JSON-LD ${label}`, () => {
      const jsonLd = readJsonLdJson(locale, path);

      it('JSON-LD 配置文件存在', () => {
        expect(jsonLd).not.toBeNull();
      });

      it('JSON-LD 为合规 array 格式', () => {
        expect(Array.isArray(jsonLd)).toBe(true);
      });

      it('包含 WebPage schema 条目', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage).toBeDefined();
      });

      it('WebPage 包含 name、url、description、inLanguage', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage!).toHaveProperty('name');
        expect(webPage!).toHaveProperty('url');
        expect(webPage!).toHaveProperty('description');
        expect(webPage!).toHaveProperty('inLanguage');
      });

      it('WebPage inLanguage 字段正确', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage!.inLanguage).toBe(locale === 'zh' ? 'zh' : 'en');
      });

      it('WebPage 包含 breadcrumb', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        expect(webPage!).toHaveProperty('breadcrumb');
        expect(webPage!.breadcrumb['@type']).toBe('BreadcrumbList');
      });

      it('breadcrumb 包含 Download 级', () => {
        const asArray = jsonLd as any[];
        const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
        const items = webPage!.breadcrumb.itemListElement;
        const hasDownload = items.some((i: any) => i.name.includes('下载') || i.name.includes('Download'));
        expect(hasDownload).toBe(true);
      });

      it('所有条目均有 @context 且为 https://schema.org', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          expect(item['@context']).toBe('https://schema.org');
        }
      });

      it('URL 使用 www.openeuler.org 占位符', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          if (item.url) {
            expect(item.url).toContain('www.openeuler.org');
          }
        }
      });

      it('域名不含 openatom.cn', () => {
        const str = JSON.stringify(jsonLd);
        expect(str).not.toContain('openeuler.openatom.cn');
      });
    });
  }
});

describe('zh/showcase/white-paper JSON-LD（新增）', () => {
  const jsonLd = readJsonLdJson('zh', 'showcase/white-paper');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为合规 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 WebPage schema 条目', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage).toBeDefined();
  });

  it('包含 Article schema 条目', () => {
    const asArray = jsonLd as any[];
    const article = asArray.find((item: any) => item['@type'] === 'Article');
    expect(article).toBeDefined();
  });

  it('Article 包含 headline、description、url、publisher', () => {
    const asArray = jsonLd as any[];
    const article = asArray.find((item: any) => item['@type'] === 'Article');
    expect(article!).toHaveProperty('headline');
    expect(article!).toHaveProperty('description');
    expect(article!).toHaveProperty('url');
    expect(article!).toHaveProperty('publisher');
  });

  it('Article publisher 包含 logo', () => {
    const asArray = jsonLd as any[];
    const article = asArray.find((item: any) => item['@type'] === 'Article');
    expect(article!.publisher).toHaveProperty('logo');
  });

  it('WebPage inLanguage 为 zh', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!.inLanguage).toBe('zh');
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });

  it('URL 使用 www.openeuler.org 占位符', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      if (item.url) {
        expect(item.url).toContain('www.openeuler.org');
      }
    }
  });

  it('域名不含 openatom.cn', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
  });
});

describe('zh/community/program JSON-LD（新增）', () => {
  const programPages = [
    { path: 'community/program/oEVP-application-form', label: 'oEVP 申请表' },
    { path: 'community/program/site-resources-contribution', label: '站点资源贡献' },
  ];

  for (const { path, label } of programPages) {
    describe(`zh/program JSON-LD ${label}`, () => {
      const jsonLd = readJsonLdJson('zh', path);

      it('JSON-LD 配置文件存在', () => {
        expect(jsonLd).not.toBeNull();
      });

      it('JSON-LD 为合规 array 格式', () => {
        expect(Array.isArray(jsonLd)).toBe(true);
      });

      it('所有条目均有 @context 且为 https://schema.org', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          expect(item['@context']).toBe('https://schema.org');
        }
      });

      it('所有条目均有 @type', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          expect(item).toHaveProperty('@type');
        }
      });

      it('URL 使用 www.openeuler.org 占位符', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          if (item.url) {
            expect(item.url).toContain('www.openeuler.org');
          }
        }
      });

      it('域名不含 openatom.cn', () => {
        const str = JSON.stringify(jsonLd);
        expect(str).not.toContain('openeuler.openatom.cn');
      });
    });
  }
});

describe('en showcase JSON-LD — 新增条目整体验证', () => {
  const newEnShowcaseEntries = [
    'showcase/energy/China-Huadian-Corporation-30',
    'showcase/energy/China-National-Offshore-Oil-Corporation-37',
    'showcase/energy/Kylinsec-OS-35',
    'showcase/energy/Kylinsec-OS-at-ems-36',
    'showcase/energy/PV-power-forecasting-31',
    'showcase/energy/Refined-Oil-Product-34',
    'showcase/energy/SCADA-System-of-CDT-33',
    'showcase/energy/The-power-monitoring-system-32',
    'showcase/finance/Bank-of-Changsha-17',
    'showcase/finance/Bank-of-Hangzhou-16',
    'showcase/finance/Bank-of-Tianjin-15',
    'showcase/finance/China-Zheshang-Bank-12',
    'showcase/finance/China-Zheshang-Bank-13',
    'showcase/finance/Chuangpuyun-10',
    'showcase/finance/Industrial-Bank-09',
    'showcase/finance/Ping-An-Bank-18',
    'showcase/finance/Shenwan-Hongyuan-11',
    'showcase/finance/The-Bank-of-China-20',
    'showcase/finance/The-Postal-Savings-Bank-of-China-19',
    'showcase/finance/Tianhong-Fund-14',
    'showcase/finance/industrial-bank-08',
    'showcase/others/CSIOS-51',
    'showcase/others/Campus-Management-Platform-47',
    'showcase/others/Changsha-Intelligent-Transportation-Development-Center-54',
    'showcase/others/China-Post-55',
    'showcase/others/Electronic-Toll-Collection-(ETC)-gantry-system-53',
    'showcase/others/FusionOS-52',
    'showcase/others/Hunan-Tobacco-Monopoly-Administration-45',
    'showcase/others/Real2tech-Platform-46',
    'showcase/others/Second-Affiliated-Hospital-of-Tianjin-University-of-TCM-48',
    'showcase/others/Security-and-Trustworthiness-Technology-50',
    'showcase/others/SinoRail-Cloud-41',
    'showcase/others/Tianjin-Blood-Center-49',
    'showcase/provider/China-Mobile-Cloud-21',
    'showcase/provider/China-Mobile-Software-Technology-29',
    'showcase/provider/China-Mobile-Zhejiang-23',
    'showcase/provider/China-Mobile-Zhejiang-26',
    'showcase/provider/China-Unicom-24',
    'showcase/provider/China-Unicom-25',
    'showcase/provider/China-Unicom-Cloud-28',
    'showcase/provider/China-Unicom-Wo-Cloud-27',
    'showcase/provider/eSurfing-Cloud-22',
  ];

  it('en showcase jsonld 数量足够（≥40）', () => {
    expect(enShowcaseJsonldPaths.length).toBeGreaterThanOrEqual(40);
  });

  it('所有新增 en showcase jsonld 条目均为合规 array 格式', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath);
      if (!jsonLd || !Array.isArray(jsonLd)) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Failed paths: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase jsonld 条目均含 @context 且为 https://schema.org', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      for (const item of jsonLd) {
        if (item['@context'] !== 'https://schema.org') {
          failCount++;
          failedPaths.push(pagePath);
        }
      }
    }
    expect(failCount, `Failed paths: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase jsonld 条目均含 @type', () => {
    let failCount = 0;
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      for (const item of jsonLd) {
        if (!item['@type']) {
          failCount++;
        }
      }
    }
    expect(failCount).toBe(0);
  });

  it('所有新增 en showcase jsonld 包含 WebPage 条目', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      const hasWebPage = jsonLd.some((item: any) => item['@type'] === 'WebPage');
      if (!hasWebPage) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Missing WebPage in: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase jsonld 包含 TechArticle 或 Article 条目', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      const hasArticle = jsonLd.some((item: any) => item['@type'] === 'TechArticle' || item['@type'] === 'Article');
      if (!hasArticle) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Missing Article in: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase jsonld 不含 openatom.cn 残留', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath);
      const str = JSON.stringify(jsonLd);
      if (str.includes('openeuler.openatom.cn')) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `openatom.cn found in: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase jsonld url 使用 www.openeuler.org 占位符', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      for (const item of jsonLd) {
        if (item.url && typeof item.url === 'string') {
          if (!item.url.includes('www.openeuler.org')) {
            failCount++;
            failedPaths.push(pagePath);
          }
        }
      }
    }
    expect(failCount, `Missing openeuler.org in: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase jsonld url 为完整 https 绝对路径', () => {
    let failCount = 0;
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      for (const item of jsonLd) {
        if (item.url && typeof item.url === 'string') {
          if (!item.url.startsWith('https://')) {
            failCount++;
          }
        }
      }
    }
    expect(failCount).toBe(0);
  });

  it('所有新增 en showcase jsonld WebPage 条目含 inLanguage=en', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseEntries) {
      const jsonLd = readJsonLdJson('en', pagePath) as any[];
      const webPage = jsonLd.find((item: any) => item['@type'] === 'WebPage');
      if (webPage && webPage.inLanguage !== 'en') {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Wrong inLanguage in: ${failedPaths.join(',')}`).toBe(0);
  });
});

describe('en showcase TDK — 新增条目整体验证', () => {
  const newEnShowcaseTdkEntries = [
    'showcase/energy/China-Huadian-Corporation-30',
    'showcase/energy/China-National-Offshore-Oil-Corporation-37',
    'showcase/energy/Kylinsec-OS-35',
    'showcase/energy/Kylinsec-OS-at-ems-36',
    'showcase/energy/PV-power-forecasting-31',
    'showcase/energy/Refined-Oil-Product-34',
    'showcase/energy/SCADA-System-of-CDT-33',
    'showcase/energy/The-power-monitoring-system-32',
    'showcase/finance/Bank-of-Changsha-17',
    'showcase/finance/Bank-of-Hangzhou-16',
    'showcase/finance/Bank-of-Tianjin-15',
    'showcase/finance/China-Zheshang-Bank-12',
    'showcase/finance/China-Zheshang-Bank-13',
    'showcase/finance/Chuangpuyun-10',
    'showcase/finance/Industrial-Bank-09',
    'showcase/finance/Ping-An-Bank-18',
    'showcase/finance/Shenwan-Hongyuan-11',
    'showcase/finance/The-Bank-of-China-20',
    'showcase/finance/The-Postal-Savings-Bank-of-China-19',
    'showcase/finance/Tianhong-Fund-14',
    'showcase/finance/industrial-bank-08',
    'showcase/others/CSIOS-51',
    'showcase/others/Campus-Management-Platform-47',
    'showcase/others/Changsha-Intelligent-Transportation-Development-Center-54',
    'showcase/others/China-Post-55',
    'showcase/others/Electronic-Toll-Collection-(ETC)-gantry-system-53',
    'showcase/others/FusionOS-52',
    'showcase/others/Hunan-Tobacco-Monopoly-Administration-45',
    'showcase/others/Real2tech-Platform-46',
    'showcase/others/Second-Affiliated-Hospital-of-Tianjin-University-of-TCM-48',
    'showcase/others/Security-and-Trustworthiness-Technology-50',
    'showcase/others/SinoRail-Cloud-41',
    'showcase/others/Tianjin-Blood-Center-49',
    'showcase/provider/China-Mobile-Cloud-21',
    'showcase/provider/China-Mobile-Software-Technology-29',
    'showcase/provider/China-Mobile-Zhejiang-23',
    'showcase/provider/China-Mobile-Zhejiang-26',
    'showcase/provider/China-Unicom-24',
    'showcase/provider/China-Unicom-25',
    'showcase/provider/China-Unicom-Cloud-28',
    'showcase/provider/China-Unicom-Wo-Cloud-27',
    'showcase/provider/eSurfing-Cloud-22',
  ];

  it('en showcase 子页 TDK 数量足够（≥40）', () => {
    expect(enShowcaseTdkPaths.length).toBeGreaterThanOrEqual(40);
  });

  it('所有新增 en showcase TDK 均含 title/description/keywords', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseTdkEntries) {
      const tdk = readTdkJson('en', pagePath);
      if (!tdk || !tdk.title || !tdk.description || !tdk.keywords) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Missing fields in: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase TDK keywords 包含 openEuler', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseTdkEntries) {
      const tdk = readTdkJson('en', pagePath);
      if (tdk && !tdk.keywords.toLowerCase().includes('openeuler')) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Missing openEuler keyword in: ${failedPaths.join(',')}`).toBe(0);
  });

  it('所有新增 en showcase TDK 不含中文', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of newEnShowcaseTdkEntries) {
      const tdk = readTdkJson('en', pagePath);
      if (tdk) {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk.title) || /[\u4e00-\u9fff]/.test(tdk.description) || /[\u4e00-\u9fff]/.test(tdk.keywords);
        if (hasChinese) {
          failCount++;
          failedPaths.push(pagePath);
        }
      }
    }
    expect(failCount, `Chinese found in: ${failedPaths.join(',')}`).toBe(0);
  });
});

describe('en showcase 采样验证 — 新增条目', () => {
  const sampledNewEntries = [
    { path: 'showcase/energy/China-Huadian-Corporation-30', label: 'China Huadian' },
    { path: 'showcase/finance/The-Bank-of-China-20', label: 'Bank of China' },
    { path: 'showcase/others/SinoRail-Cloud-41', label: 'SinoRail Cloud' },
    { path: 'showcase/provider/China-Mobile-Cloud-21', label: 'China Mobile Cloud' },
    { path: 'showcase/energy/Kylinsec-OS-35', label: 'Kylinsec OS' },
    { path: 'showcase/others/China-Post-55', label: 'China Post' },
    { path: 'showcase/provider/eSurfing-Cloud-22', label: 'eSurfing Cloud' },
  ];

  for (const { path, label } of sampledNewEntries) {
    describe(`en showcase ${label}`, () => {
      const jsonLd = readJsonLdJson('en', path);
      const tdk = readTdkJson('en', path);

      it('JSON-LD 配置文件存在', () => {
        expect(jsonLd).not.toBeNull();
      });

      it('TDK 配置文件存在', () => {
        expect(tdk).not.toBeNull();
      });

      it('JSON-LD 包含 WebPage 和 TechArticle/Article', () => {
        const asArray = jsonLd as any[];
        expect(asArray.find((item: any) => item['@type'] === 'WebPage')).toBeDefined();
        expect(asArray.find((item: any) => item['@type'] === 'TechArticle' || item['@type'] === 'Article')).toBeDefined();
      });

      it('TDK title 非空且包含 openEuler', () => {
        expect(tdk!.title.length).toBeGreaterThan(0);
        expect(tdk!.title).toContain('openEuler');
      });

      it('TDK description 非空', () => {
        expect(tdk!.description.length).toBeGreaterThan(0);
      });

      it('TDK keywords 包含 openEuler', () => {
        expect(tdk!.keywords.toLowerCase()).toContain('openeuler');
      });

      it('TDK 不含中文', () => {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.title + tdk!.description + tdk!.keywords);
        expect(hasChinese).toBe(false);
      });
    });
  }
});

describe('sig-FlagOS JSON-LD 双语验证（设计 §4 Step 2）', () => {
  const flagosPages = [
    { locale: 'zh', path: 'sig/sig-FlagOS', label: 'sig-FlagOS zh' },
    { locale: 'en', path: 'sig/sig-FlagOS', label: 'sig-FlagOS en' },
  ];

  for (const { locale, path, label } of flagosPages) {
    describe(`sig-FlagOS JSON-LD ${label}`, () => {
      const jsonLd = readJsonLdJson(locale, path);

      it('JSON-LD 配置文件存在', () => {
        expect(jsonLd).not.toBeNull();
      });

      it('JSON-LD 为合规 array 格式', () => {
        expect(Array.isArray(jsonLd)).toBe(true);
      });

      it('包含 Organization + CollectionPage + FAQPage 三种 schema', () => {
        const asArray = jsonLd as any[];
        expect(asArray.find((item: any) => item['@type'] === 'Organization')).toBeDefined();
        expect(asArray.find((item: any) => item['@type'] === 'CollectionPage')).toBeDefined();
        expect(asArray.find((item: any) => item['@type'] === 'FAQPage')).toBeDefined();
      });

      it('Organization 包含 member 列表', () => {
        const asArray = jsonLd as any[];
        const org = asArray.find((item: any) => item['@type'] === 'Organization');
        expect(org!).toHaveProperty('member');
        expect(Array.isArray(org!.member)).toBe(true);
      });

      it('FAQPage 包含 mainEntity', () => {
        const asArray = jsonLd as any[];
        const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
        expect(faq!).toHaveProperty('mainEntity');
        expect(faq!.mainEntity.length).toBeGreaterThanOrEqual(1);
      });

      it('FAQPage 不含虚构数量', () => {
        const asArray = jsonLd as any[];
        const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
        const str = JSON.stringify(faq);
        expect(str).not.toMatch(/\d{2,3}\+ SIG/);
      });

      it('所有条目均有 @context 且为 https://schema.org', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          expect(item['@context']).toBe('https://schema.org');
        }
      });

      it('URL 使用 www.openeuler.org 占位符', () => {
        const asArray = jsonLd as any[];
        for (const item of asArray) {
          if (item.url && typeof item.url === 'string') {
            expect(item.url).toContain('www.openeuler.org');
          }
        }
      });

      it('域名不含 openatom.cn', () => {
        const str = JSON.stringify(jsonLd);
        expect(str).not.toContain('openeuler.openatom.cn');
      });
    });
  }
});

describe('setJSONLD URL 替换逻辑验证 — 新增页面', () => {
  const pagesToTest = [
    { locale: 'zh', path: 'sig/sig-detail' },
    { locale: 'en', path: 'sig/sig-detail' },
    { locale: 'zh', path: 'download/get-os' },
    { locale: 'en', path: 'download/get-os' },
    { locale: 'en', path: 'community/certification-services' },
    { locale: 'zh', path: 'showcase/white-paper' },
    { locale: 'zh', path: 'sig/sig-FlagOS' },
    { locale: 'en', path: 'sig/sig-FlagOS' },
  ];

  for (const { locale, path } of pagesToTest) {
    it(`${locale}/${path} JSON-LD 中 www.openeuler.org 可被 replaceAll 替换`, () => {
      const jsonLd = readJsonLdJson(locale, path) as any[];
      const content = JSON.stringify(jsonLd);
      const testHostname = 'https://test.openeuler.org';
      const replaced = content.replaceAll('https://www.openeuler.org', testHostname);
      const replacedParsed = JSON.parse(replaced) as any[];
      for (const item of replacedParsed) {
        if (item.url && typeof item.url === 'string') {
          expect(item.url).not.toContain('https://www.openeuler.org');
          expect(item.url).toContain(testHostname);
        }
      }
    });

    it(`${locale}/${path} JSON-LD 中 URL 使用完整 https 绝对路径`, () => {
      const jsonLd = readJsonLdJson(locale, path) as any[];
      for (const item of jsonLd) {
        if (item.url && typeof item.url === 'string') {
          expect(item.url).toMatch(/^https:\/\//);
        }
      }
    });
  }
});

describe('zh/blog/gitee-cmd 新增 JSON-LD 验证', () => {
  const jsonLd = readJsonLdJson('zh', 'blog/gitee-cmd/Guide-for-Uploading-a-Software-Package-to-the-openEuler-Community');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为合规 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
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
});

describe('zh/blog/gitee-cmd 新增 TDK 验证', () => {
  const tdk = readTdkJson('zh', 'blog/gitee-cmd/Guide-for-Uploading-a-Software-Package-to-the-openEuler-Community');

  it('TDK 配置文件存在', () => {
    expect(tdk).not.toBeNull();
  });

  it('title 字段存在且非空', () => {
    expect(tdk).toHaveProperty('title');
    expect(typeof tdk!.title).toBe('string');
    expect(tdk!.title.length).toBeGreaterThan(0);
  });

  it('description 字段存在且非空', () => {
    expect(tdk).toHaveProperty('description');
    expect(typeof tdk!.description).toBe('string');
    expect(tdk!.description.length).toBeGreaterThan(0);
  });
});

describe('en showcase TDK 与 JSON-LD 双向覆盖验证', () => {
  const newEnShowcaseEntries = [
    'showcase/energy/China-Huadian-Corporation-30',
    'showcase/finance/The-Bank-of-China-20',
    'showcase/others/SinoRail-Cloud-41',
    'showcase/provider/China-Mobile-Cloud-21',
  ];

  for (const pagePath of newEnShowcaseEntries) {
    it(`${pagePath} 同时有 TDK 和 JSON-LD`, () => {
      const tdk = readTdkJson('en', pagePath);
      const jsonLd = readJsonLdJson('en', pagePath);
      expect(tdk).not.toBeNull();
      expect(jsonLd).not.toBeNull();
    });
  }
});

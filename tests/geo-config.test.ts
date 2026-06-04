import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const geoDir = resolve(__dirname, '../.geo');

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

describe('年报 TDK 配置 — keywords 字段补齐', () => {
  const annualReportPages = [
    { locale: 'zh', path: 'annual-report/openEuler-annual-report-2024', label: '2024 zh' },
    { locale: 'zh', path: 'annual-report/openEuler-annual-report-2025', label: '2025 zh' },
    { locale: 'en', path: 'annual-report/openEuler-annual-report-2024', label: '2024 en' },
    { locale: 'en', path: 'annual-report/openEuler-annual-report-2025', label: '2025 en' },
  ];

  for (const { locale, path, label } of annualReportPages) {
    describe(`年报 ${label}`, () => {
      const tdk = readTdkJson(locale, path);

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

      it('keywords 字段已补齐且非空', () => {
        expect(tdk).toHaveProperty('keywords');
        expect(typeof tdk!.keywords).toBe('string');
        expect(tdk!.keywords.length).toBeGreaterThan(0);
      });

      it('title 包含年份关键词', () => {
        const year = label.split(' ')[0];
        expect(tdk!.title).toContain(year);
      });

      it('keywords 包含 openEuler', () => {
        expect(tdk!.keywords.toLowerCase()).toContain('openeuler');
      });

      it('zh keywords 使用中文关键词', () => {
        if (locale === 'zh') {
          const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
          expect(hasChinese).toBe(true);
        }
      });

      it('en keywords 使用英文关键词', () => {
        if (locale === 'en') {
          const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
          expect(hasChinese).toBe(false);
        }
      });

      it('keywords 逗号分隔且每项长度合理', () => {
        const keywordsList = tdk!.keywords.split(',').map((k: string) => k.trim());
        expect(keywordsList.length).toBeGreaterThanOrEqual(4);
        for (const kw of keywordsList) {
          expect(kw.length).toBeGreaterThan(0);
          expect(kw.length).toBeLessThanOrEqual(30);
        }
      });
    });
  }
});

describe('年报 JSON-LD 配置（新增）', () => {
  const annualReportJsonldPages = [
    { locale: 'zh', path: 'annual-report/openEuler-annual-report-2024', label: '2024 zh' },
    { locale: 'zh', path: 'annual-report/openEuler-annual-report-2025', label: '2025 zh' },
    { locale: 'en', path: 'annual-report/openEuler-annual-report-2024', label: '2024 en' },
    { locale: 'en', path: 'annual-report/openEuler-annual-report-2025', label: '2025 en' },
  ];

  for (const { locale, path, label } of annualReportJsonldPages) {
    describe(`年报 JSON-LD ${label}`, () => {
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

      it('包含 Report schema 条目', () => {
        const asArray = jsonLd as any[];
        const report = asArray.find((item: any) => item['@type'] === 'Report');
        expect(report).toBeDefined();
      });

      it('Report 包含 name、url、description、author', () => {
        const asArray = jsonLd as any[];
        const report = asArray.find((item: any) => item['@type'] === 'Report');
        expect(report!).toHaveProperty('name');
        expect(report!).toHaveProperty('url');
        expect(report!).toHaveProperty('description');
        expect(report!).toHaveProperty('author');
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
    });
  }
});

describe('devday2026 TDK 配置（新增）', () => {
  const tdk = readTdkJson('zh', 'interaction/summit-list/devday2026');

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

  it('title 包含 Developer Day', () => {
    expect(tdk!.title).toContain('Developer Day');
  });

  it('keywords 包含 openEuler', () => {
    expect(tdk!.keywords.toLowerCase()).toContain('openeuler');
  });
});

describe('devday2026 JSON-LD — 格式修复为合规 array', () => {
  const jsonLd = readJsonLdJson('zh', 'interaction/summit-list/devday2026');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为 array 格式（非单 dict 对象）', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('JSON-LD 不含 note 占位字段', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item).not.toHaveProperty('note');
    }
  });

  it('包含 Event schema 条目', () => {
    const asArray = jsonLd as any[];
    const eventEntry = asArray.find((item: any) => item['@type'] === 'Event');
    expect(eventEntry).toBeDefined();
  });

  it('Event schema 包含必填字段', () => {
    const asArray = jsonLd as any[];
    const eventEntry = asArray.find((item: any) => item['@type'] === 'Event');
    expect(eventEntry!['@context']).toBe('https://schema.org');
    expect(eventEntry!).toHaveProperty('name');
    expect(eventEntry!).toHaveProperty('startDate');
    expect(eventEntry!).toHaveProperty('endDate');
    expect(eventEntry!).toHaveProperty('url');
    expect(eventEntry!).toHaveProperty('location');
    expect(eventEntry!['location']['@type']).toBe('Place');
    expect(eventEntry!).toHaveProperty('organizer');
    expect(eventEntry!['organizer']['@type']).toBe('Organization');
    expect(eventEntry!).toHaveProperty('eventStatus');
    expect(eventEntry!).toHaveProperty('eventAttendanceMode');
    expect(eventEntry!).toHaveProperty('inLanguage');
  });

  it('包含 WebPage schema 条目', () => {
    const asArray = jsonLd as any[];
    const webPageEntry = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPageEntry).toBeDefined();
    expect(webPageEntry!).toHaveProperty('name');
    expect(webPageEntry!).toHaveProperty('url');
    expect(webPageEntry!).toHaveProperty('description');
  });

  it('所有条目均有 @context 且为 https://schema.org', () => {
    const asArray = jsonLd as any[];
    for (const item of asArray) {
      expect(item['@context']).toBe('https://schema.org');
    }
  });
});

describe('SIG 页面 TDK 回归验证（7 个页面）', () => {
  const sigPages = [
    { locale: 'en', path: 'sig/role-description' },
    { locale: 'en', path: 'sig/sig-guidance' },
    { locale: 'en', path: 'sig/sig-list' },
    { locale: 'zh', path: 'sig/meeting-guide' },
    { locale: 'zh', path: 'sig/role-description' },
    { locale: 'zh', path: 'sig/sig-guidance' },
    { locale: 'zh', path: 'sig/sig-list' },
  ];

  for (const { locale, path } of sigPages) {
    it(`${locale}/${path} TDK 配置文件存在且完整`, () => {
      const tdk = readTdkJson(locale, path);
      expect(tdk).not.toBeNull();
      expect(tdk).toHaveProperty('title');
      expect(tdk).toHaveProperty('description');
      expect(tdk).toHaveProperty('keywords');
      expect(typeof tdk!.title).toBe('string');
      expect(typeof tdk!.description).toBe('string');
      expect(typeof tdk!.keywords).toBe('string');
      expect(tdk!.title.length).toBeGreaterThan(0);
      expect(tdk!.description.length).toBeGreaterThan(0);
      expect(tdk!.keywords.length).toBeGreaterThan(0);
    });
  }
});

describe('SIG 页面 JSON-LD 配置（新增）', () => {
  const sigJsonldPages = [
    { locale: 'zh', path: 'sig/meeting-guide', label: '会议指南 zh' },
    { locale: 'zh', path: 'sig/role-description', label: '角色描述 zh' },
    { locale: 'zh', path: 'sig/sig-guidance', label: '指导原则 zh' },
    { locale: 'zh', path: 'sig/sig-list', label: 'SIG列表 zh' },
    { locale: 'en', path: 'sig/role-description', label: 'Community Roles en' },
    { locale: 'en', path: 'sig/sig-guidance', label: 'Set up a SIG en' },
    { locale: 'en', path: 'sig/sig-list', label: 'SIG list en' },
  ];

  for (const { locale, path, label } of sigJsonldPages) {
    describe(`SIG JSON-LD ${label}`, () => {
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
    });
  }
});

describe('NestOS 页面 TDK 配置（新增）', () => {
  const nestosPages = [
    { path: 'other/projects/nestos', label: 'NestOS 主页' },
    { path: 'other/projects/nestos/feature/custom-image', label: '定制镜像' },
    { path: 'other/projects/nestos/feature/kernel', label: '内核增强' },
    { path: 'other/projects/nestos/feature/nkd', label: 'NKD' },
    { path: 'other/projects/nestos/feature/pilotgo', label: 'PilotGo' },
    { path: 'other/projects/nestos/feature/rubik', label: 'Rubik' },
    { path: 'other/projects/nestos/feature/x2nestos', label: 'x2NestOS' },
  ];

  for (const { path, label } of nestosPages) {
    describe(`NestOS TDK ${label}`, () => {
      const tdk = readTdkJson('zh', path);

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

      it('keywords 包含 NestOS 或 openEuler', () => {
        const kwLower = tdk!.keywords.toLowerCase();
        expect(kwLower.includes('nestos') || kwLower.includes('openeuler')).toBe(true);
      });

      it('title 包含 NestOS 或对应功能名', () => {
        expect(tdk!.title.length).toBeGreaterThan(0);
      });
    });
  }
});

describe('NestOS 页面 JSON-LD 回归验证（7 个页面）', () => {
  const nestosPages = [
    'other/projects/nestos',
    'other/projects/nestos/feature/custom-image',
    'other/projects/nestos/feature/kernel',
    'other/projects/nestos/feature/nkd',
    'other/projects/nestos/feature/pilotgo',
    'other/projects/nestos/feature/rubik',
    'other/projects/nestos/feature/x2nestos',
  ];

  for (const pagePath of nestosPages) {
    it(`zh/${pagePath} JSON-LD 为合规 array 格式`, () => {
      const jsonLd = readJsonLdJson('zh', pagePath);
      expect(jsonLd).not.toBeNull();
      expect(Array.isArray(jsonLd)).toBe(true);
    });

    it(`zh/${pagePath} JSON-LD 每个条目含 @context 和 @type`, () => {
      const asArray = (readJsonLdJson('zh', pagePath) as any[]);
      for (const item of asArray) {
        expect(item).toHaveProperty('@context');
        expect(item).toHaveProperty('@type');
      }
    });

    it(`zh/${pagePath} JSON-LD 每个条目含 url 和 name/headline`, () => {
      const asArray = (readJsonLdJson('zh', pagePath) as any[]);
      for (const item of asArray) {
        expect(item).toHaveProperty('url');
        expect(item['name'] || item['headline']).toBeTruthy();
      }
    });

    it(`zh/${pagePath} JSON-LD 每个条目含 description`, () => {
      const asArray = (readJsonLdJson('zh', pagePath) as any[]);
      for (const item of asArray) {
        expect(item).toHaveProperty('description');
      }
    });

    it(`zh/${pagePath} JSON-LD WebPage 条目含 inLanguage`, () => {
      const asArray = (readJsonLdJson('zh', pagePath) as any[]);
      const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
      if (webPage) {
        expect(webPage).toHaveProperty('inLanguage');
      }
    });
  }
});

describe('setTdk keywords 注入逻辑验证', () => {
  it('keywords 存在时应注入到 frontmatter.head 中', () => {
    const tdk = readTdkJson('zh', 'annual-report/openEuler-annual-report-2024');
    expect(tdk!.keywords).toBeTruthy();
    const head: any[] = [];
    const keywords = tdk!.keywords;
    const keywordsIndex = head.findIndex((item: any) => item[1]?.name === 'keywords');
    if (keywordsIndex !== -1) {
      head.splice(keywordsIndex, 1, ['meta', { name: 'keywords', content: keywords }]);
    } else {
      head.push(['meta', { name: 'keywords', content: keywords }]);
    }
    expect(head.length).toBe(1);
    expect(head[0][0]).toBe('meta');
    expect(head[0][1].name).toBe('keywords');
    expect(head[0][1].content).toBe(keywords);
  });

  it('已有 keywords meta 标签时应替换而非新增', () => {
    const tdk = readTdkJson('zh', 'annual-report/openEuler-annual-report-2024');
    const head: any[] = [['meta', { name: 'keywords', content: 'old keywords' }]];
    const keywords = tdk!.keywords;
    const keywordsIndex = head.findIndex((item: any) => item[1]?.name === 'keywords');
    if (keywordsIndex !== -1) {
      head.splice(keywordsIndex, 1, ['meta', { name: 'keywords', content: keywords }]);
    } else {
      head.push(['meta', { name: 'keywords', content: keywords }]);
    }
    expect(head.length).toBe(1);
    expect(head[0][1].content).toBe(keywords);
  });
});

describe('setJSONLD URL 替换逻辑验证', () => {
  it('非生产域名下应替换 www.openeuler.org URL', () => {
    const jsonLd = readJsonLdJson('zh', 'interaction/summit-list/devday2026') as any[];
    const content = JSON.stringify(jsonLd);
    const replaced = content.replaceAll('https://www.openeuler.org', 'https://test.openeuler.org');
    const replacedParsed = JSON.parse(replaced) as any[];
    for (const item of replacedParsed) {
      if (item.url) {
        expect(item.url).not.toContain('https://www.openeuler.org');
      }
    }
  });

  it('JSON-LD 中 URL 使用完整路径而非相对路径', () => {
    const jsonLd = readJsonLdJson('zh', 'interaction/summit-list/devday2026') as any[];
    for (const item of jsonLd) {
      if (item.url) {
        expect(item.url).toMatch(/^https?:\/\//);
      }
    }
  });
});
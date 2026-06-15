import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { globSync } from 'glob';

const PROJECT_ROOT = process.cwd();
const geoDir = resolve(PROJECT_ROOT, '.geo');

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'jsonld', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function readMdFile(filePath: string) {
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, 'utf-8');
}

const zhMdFiles = [
  { path: 'app/zh/index.md', label: '首页' },
  { path: 'app/zh/community/charter/index.md', label: '社区章程' },
  { path: 'app/zh/community/conduct/index.md', label: '行为准则' },
  { path: 'app/zh/community/vote/index.md', label: '选举条例' },
  { path: 'app/zh/community/meeting-system/index.md', label: '会议制度' },
  { path: 'app/zh/sig/sig-list/index.md', label: 'SIG列表' },
];

describe('zh frontmatter 内嵌 JSON-LD 已移除', () => {
  for (const { path: filePath, label } of zhMdFiles) {
    it(`${label}(${filePath}) frontmatter 不含 application/ld+json script 块`, () => {
      const content = readMdFile(resolve(PROJECT_ROOT, filePath));
      expect(content).not.toBeNull();
      const frontmatterMatch = content!.match(/^---\n([\s\S]*?)\n---/);
      expect(frontmatterMatch, `${label} 应有 frontmatter`).toBeDefined();
      const frontmatter = frontmatterMatch![1];
      expect(frontmatter).not.toContain('application/ld+json');
      expect(frontmatter).not.toContain('"@context": "https://schema.org"');
      expect(frontmatter).not.toContain('"@type":');
    });
  }
});

describe('zh 首页 og:image 路径已修复', () => {
  it('og:image 使用 /img/for-cdn/logo.png 而非 /assets/logo.*', () => {
    const content = readMdFile(resolve(PROJECT_ROOT, 'app/zh/index.md'));
    expect(content).not.toBeNull();
    const frontmatterMatch = content!.match(/^---\n([\s\S]*?)\n---/);
    expect(frontmatterMatch).toBeDefined();
    const frontmatter = frontmatterMatch![1];
    expect(frontmatter).toContain('/img/for-cdn/logo.png');
    expect(frontmatter).not.toContain('/assets/logo.XeUCiAZu.svg');
    expect(frontmatter).not.toContain('/assets/logo.png');
  });
});

describe('zh SIG列表 og:image 路径已修复', () => {
  it('og:image 使用 /img/for-cdn/logo.png 而非 /assets/og-sig-center.png', () => {
    const content = readMdFile(resolve(PROJECT_ROOT, 'app/zh/sig/sig-list/index.md'));
    expect(content).not.toBeNull();
    const frontmatterMatch = content!.match(/^---\n([\s\S]*?)\n---/);
    expect(frontmatterMatch).toBeDefined();
    const frontmatter = frontmatterMatch![1];
    expect(frontmatter).toContain('/img/for-cdn/logo.png');
    expect(frontmatter).not.toContain('/assets/og-sig-center.png');
  });
});

describe('.geo/jsonld 域名统一 — 无 openatom.cn 残留', () => {
  it('zh/index.json 不含 openeuler.openatom.cn', () => {
    const jsonLd = readJsonLdJson('zh', '');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
    expect(str).toContain('www.openeuler.org');
  });

  it('en/index.json 不含 openeuler.openatom.cn', () => {
    const jsonLd = readJsonLdJson('en', '');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
    expect(str).toContain('www.openeuler.org');
  });

  it('zh/sig/sig-list/index.json 不含 openeuler.openatom.cn', () => {
    const jsonLd = readJsonLdJson('zh', 'sig/sig-list');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
    expect(str).toContain('www.openeuler.org');
  });

  it('en/sig/sig-list/index.json 不含 openeuler.openatom.cn', () => {
    const jsonLd = readJsonLdJson('en', 'sig/sig-list');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
    expect(str).toContain('www.openeuler.org');
  });

  it('en/community/conduct/index.json 不含 openeuler.openatom.cn', () => {
    const jsonLd = readJsonLdJson('en', 'community/conduct');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
    expect(str).toContain('www.openeuler.org');
  });
});

describe('.geo/jsonld logo 路径统一 — 无 /assets/logo.* 残留', () => {
  it('zh/index.json logo 使用 /img/for-cdn/logo.png', () => {
    const jsonLd = readJsonLdJson('zh', '');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('/assets/logo.XeUCiAZu.svg');
    expect(str).not.toContain('/assets/logo.png');
    expect(str).toContain('/img/for-cdn/logo.png');
  });

  it('en/index.json logo 使用 /img/for-cdn/logo.png', () => {
    const jsonLd = readJsonLdJson('en', '');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('/assets/logo.XeUCiAZu.svg');
    expect(str).not.toContain('/assets/logo.png');
    expect(str).toContain('/img/for-cdn/logo.png');
  });

  it('en/community/conduct/index.json logo 使用 /img/for-cdn/logo.png', () => {
    const jsonLd = readJsonLdJson('en', 'community/conduct');
    expect(jsonLd).not.toBeNull();
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('/assets/logo.png');
    expect(str).toContain('/img/for-cdn/logo.png');
  });
});

describe('zh/index.json — aggregateRating 和 BreadcrumbList 已删除', () => {
  const jsonLd = readJsonLdJson('zh', '');

  it('为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('不含 aggregateRating', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('aggregateRating');
  });

  it('不含独立 BreadcrumbList 对象（即 @type 为 BreadcrumbList 的顶层对象）', () => {
    const asArray = jsonLd as any[];
    const breadcrumbObj = asArray.find((item: any) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumbObj).toBeUndefined();
  });

  it('包含 Organization 对象', () => {
    const asArray = jsonLd as any[];
    const org = asArray.find((item: any) => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org!.logo).toContain('/img/for-cdn/logo.png');
    expect(org!.url).toContain('www.openeuler.org');
  });

  it('包含 SoftwareApplication 对象', () => {
    const asArray = jsonLd as any[];
    const app = asArray.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(app).toBeDefined();
    expect(app!.releaseNotes).toContain('www.openeuler.org');
    expect(app!.releaseNotes).toContain('/zh/interaction/summit-list/');
  });

  it('仅有 Organization 和 SoftwareApplication 2 个对象', () => {
    const asArray = jsonLd as any[];
    expect(asArray.length).toBe(2);
  });
});

describe('en/index.json — BreadcrumbList 已删除', () => {
  const jsonLd = readJsonLdJson('en', '');

  it('为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('不含独立 BreadcrumbList 对象', () => {
    const asArray = jsonLd as any[];
    const breadcrumbObj = asArray.find((item: any) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumbObj).toBeUndefined();
  });

  it('包含 Organization 和 SoftwareApplication 2 个对象', () => {
    const asArray = jsonLd as any[];
    expect(asArray.length).toBe(2);
  });
});

describe('zh 社区页 FAQPage 补字段验证', () => {
  const communityPages = [
    { path: 'community/charter', label: '社区章程' },
    { path: 'community/conduct', label: '行为准则' },
    { path: 'community/vote', label: '选举条例' },
    { path: 'community/meeting-system', label: '会议制度' },
  ];

  for (const { path: pagePath, label } of communityPages) {
    describe(`${label} FAQPage`, () => {
      const jsonLd = readJsonLdJson('zh', pagePath);

      it('JSON-LD 配置文件存在', () => {
        expect(jsonLd).not.toBeNull();
      });

      it('包含 @id 字段', () => {
        expect(jsonLd!['@id']).toBeDefined();
        expect(jsonLd!['@id']).toContain('www.openeuler.org/zh/' + pagePath);
      });

      it('包含 url 字段', () => {
        expect(jsonLd!['url']).toBeDefined();
        expect(jsonLd!['url']).toContain('www.openeuler.org/zh/' + pagePath);
      });

      it('包含 inLanguage 字段', () => {
        expect(jsonLd!['inLanguage']).toBe('zh');
      });

      it('@type 为 FAQPage', () => {
        expect(jsonLd!['@type']).toBe('FAQPage');
      });

      it('域名不含 openatom.cn', () => {
        const str = JSON.stringify(jsonLd);
        expect(str).not.toContain('openeuler.openatom.cn');
      });

      it('@id 和 url 值一致', () => {
        expect(jsonLd!['@id']).toBe(jsonLd!['url']);
      });
    });
  }
});

describe('zh/sig/sig-list JSON-LD 结构验证', () => {
  const jsonLd = readJsonLdJson('zh', 'sig/sig-list');

  it('为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 3 个 schema 对象 (WebPage + CollectionPage + FAQPage)', () => {
    const asArray = jsonLd as any[];
    expect(asArray.length).toBe(3);
    expect(asArray.find((item: any) => item['@type'] === 'WebPage')).toBeDefined();
    expect(asArray.find((item: any) => item['@type'] === 'CollectionPage')).toBeDefined();
    expect(asArray.find((item: any) => item['@type'] === 'FAQPage')).toBeDefined();
  });

  it('WebPage 包含 @id 和 inLanguage', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!['@id']).toBeDefined();
    expect(webPage!.inLanguage).toBe('zh');
  });

  it('FAQPage 包含 @id、url、inLanguage', () => {
    const asArray = jsonLd as any[];
    const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
    expect(faq!['@id']).toBeDefined();
    expect(faq!['url']).toBeDefined();
    expect(faq!['inLanguage']).toBe('zh');
  });

  it('FAQPage 不含虚构数量（如"100余个"等硬编码数字）', () => {
    const asArray = jsonLd as any[];
    const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
    const str = JSON.stringify(faq);
    expect(str).not.toContain('100余个');
    expect(str).not.toContain('100 余');
  });
});

describe('en/community/conduct JSON-LD 验证', () => {
  const jsonLd = readJsonLdJson('en', 'community/conduct');

  it('为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 WebPage 和 FAQPage 2 个对象', () => {
    const asArray = jsonLd as any[];
    expect(asArray.length).toBe(2);
    expect(asArray.find((item: any) => item['@type'] === 'WebPage')).toBeDefined();
    expect(asArray.find((item: any) => item['@type'] === 'FAQPage')).toBeDefined();
  });

  it('WebPage logo 使用 /img/for-cdn/logo.png', () => {
    const asArray = jsonLd as any[];
    const webPage = asArray.find((item: any) => item['@type'] === 'WebPage');
    expect(webPage!['publisher']['logo']['url']).toContain('/img/for-cdn/logo.png');
  });

  it('FAQPage 含 @id 和 inLanguage', () => {
    const asArray = jsonLd as any[];
    const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
    expect(faq!['@id']).toContain('www.openeuler.org/en/community/conduct');
    expect(faq!['inLanguage']).toBe('en');
  });

  it('域名不含 openatom.cn', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
  });
});

describe('en/sig/sig-list JSON-LD 验证', () => {
  const jsonLd = readJsonLdJson('en', 'sig/sig-list');

  it('为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('包含 3 个 schema 对象 (WebPage + CollectionPage + FAQPage)', () => {
    const asArray = jsonLd as any[];
    expect(asArray.length).toBe(3);
    expect(asArray.find((item: any) => item['@type'] === 'WebPage')).toBeDefined();
    expect(asArray.find((item: any) => item['@type'] === 'CollectionPage')).toBeDefined();
    expect(asArray.find((item: any) => item['@type'] === 'FAQPage')).toBeDefined();
  });

  it('FAQPage 含 @id 和 inLanguage', () => {
    const asArray = jsonLd as any[];
    const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
    expect(faq!['@id']).toContain('www.openeuler.org/en/sig/sig-list');
    expect(faq!['inLanguage']).toBe('en');
  });

  it('域名不含 openatom.cn', () => {
    const str = JSON.stringify(jsonLd);
    expect(str).not.toContain('openeuler.openatom.cn');
  });

  it('FAQPage 不含虚构数量（硬编码 SIG 数量数字）', () => {
    const asArray = jsonLd as any[];
    const faq = asArray.find((item: any) => item['@type'] === 'FAQPage');
    const str = JSON.stringify(faq);
    expect(str).not.toMatch(/\d{2,3}\+ SIG/);
  });
});

describe('setJSONLD 逻辑 — 域名环境替换验证', () => {
  it('非生产环境下 JSON-LD 中 www.openeuler.org 应被替换', () => {
    const jsonLd = readJsonLdJson('zh', 'sig/sig-list') as any[];
    const content = JSON.stringify(jsonLd);
    const testHostname = 'https://test.openeuler.org';
    const replaced = content.replaceAll('https://www.openeuler.org', testHostname);
    const replacedParsed = JSON.parse(replaced) as any[];
    for (const item of replacedParsed) {
      if (item.url) {
        expect(item.url).not.toContain('https://www.openeuler.org');
        expect(item.url).toContain(testHostname);
      }
    }
  });
});

describe('logo 静态资源存在性验证', () => {
  it('/img/for-cdn/logo.png 文件存在于 public 目录', () => {
    const logoPath = resolve(PROJECT_ROOT, 'app/.vitepress/public/img/for-cdn/logo.png');
    expect(existsSync(logoPath)).toBe(true);
  });
});

describe('releaseNotes URL 对应页面存在', () => {
  it('zh/index.json 中 releaseNotes 对应的 md 页面存在', () => {
    const jsonLd = readJsonLdJson('zh', '') as any[];
    const swApp = jsonLd.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(swApp).toBeDefined();
    const releaseNotesUrl = swApp!.releaseNotes;
    const mdPath = releaseNotesUrl
      .replace('https://www.openeuler.org', '')
      .replace(/^\//, '')
      .replace(/\/$/, '') + '/index.md';
    const fullPath = resolve(PROJECT_ROOT, 'app', mdPath);
    expect(existsSync(fullPath), `releaseNotes 页面应存在: ${fullPath}`).toBe(true);
  });
});

describe('批量替换残留验证 — openatom.cn 与 /assets/logo', () => {
  it('.geo/jsonld 目录中无 openeuler.openatom.cn 残留', () => {
    const pattern = resolve(geoDir, 'jsonld/**/*.json');
    const files = globSync(pattern);
    let hasResidual = false;
    for (const f of files) {
      const content = readFileSync(f, 'utf-8');
      if (content.includes('openeuler.openatom.cn')) {
        hasResidual = true;
        break;
      }
    }
    expect(hasResidual, '.geo/jsonld 中不应有 openeuler.openatom.cn 残留').toBe(false);
  });

  it('.geo/jsonld 目录中无 /assets/logo.XeUCiAZu.svg 残留', () => {
    const pattern = resolve(geoDir, 'jsonld/**/*.json');
    const files = globSync(pattern);
    let hasResidual = false;
    for (const f of files) {
      const content = readFileSync(f, 'utf-8');
      if (content.includes('/assets/logo.XeUCiAZu.svg')) {
        hasResidual = true;
        break;
      }
    }
    expect(hasResidual, '.geo/jsonld 中不应有 /assets/logo.XeUCiAZu.svg 残留').toBe(false);
  });

  it('.geo/jsonld 目录中无 /assets/logo.png 残留（404路径）', () => {
    const pattern = resolve(geoDir, 'jsonld/**/*.json');
    const files = globSync(pattern);
    let hasResidual = false;
    for (const f of files) {
      const content = readFileSync(f, 'utf-8');
      if (content.includes('/assets/logo.png')) {
        hasResidual = true;
        break;
      }
    }
    expect(hasResidual, '.geo/jsonld 中不应有 /assets/logo.png 残留').toBe(false);
  });
});
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

function findShowcaseTdkPaths(locale: string): string[] {
  const showcaseBase = join(geoDir, 'tdks', locale, 'showcase');
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
      } else {
        const subEntries = listSubdirs(join(catBase, entry));
        for (const sub of subEntries) {
          const subIndexPath = join(catBase, entry, sub, 'index.json');
          if (existsSync(subIndexPath)) {
            paths.push(`showcase/${cat}/${entry}/${sub}`);
          }
        }
      }
    }
  }
  return paths;
}

function findEnSigJsonldPaths(): string[] {
  const sigBase = join(geoDir, 'jsonld', 'en', 'sig');
  if (!existsSync(sigBase)) return [];
  return listSubdirs(sigBase);
}

const enSigNames = findEnSigJsonldPaths();
const zhShowcasePaths = findShowcaseTdkPaths('zh');
const enShowcasePaths = findShowcaseTdkPaths('en');

const sampledEnSigs = ['Kernel', 'ai', 'sig-RISC-V', 'sig-CloudNative', 'Virt', 'meeting-guide'];
const sampledZhShowcase = [
  'showcase/finance/hengsheng',
  'showcase/finance/8pingan/8pingan',
  'showcase/cloud-computing/tianhe',
  'showcase/education/beihang',
  'showcase/energy/datang',
  'showcase/others/12/12',
  'showcase/provider/tianyiyun',
];
const sampledEnShowcase = [
  'showcase/finance/hengsheng',
  'showcase/provider/tianyiyun0330',
];

describe('en SIG JSON-LD — 新增 ~108 文件整体验证', () => {
  it('en SIG jsonld 目录存在且包含足够数量的 SIG', () => {
    expect(enSigNames.length).toBeGreaterThanOrEqual(100);
  });

  it('所有 en SIG jsonld 文件均为合规 array 格式', () => {
    let failCount = 0;
    const failedSigs: string[] = [];
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`);
      if (!jsonLd || !Array.isArray(jsonLd)) {
        failCount++;
        failedSigs.push(sigName);
      }
    }
    expect(failCount, `Failed SIGs: ${failedSigs.join(',')}`).toBe(0);
  });

  it('所有 en SIG jsonld 条目均含 @context 且为 https://schema.org', () => {
    let failCount = 0;
    const failedSigs: string[] = [];
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`) as any[];
      for (const item of jsonLd) {
        if (item['@context'] !== 'https://schema.org') {
          failCount++;
          failedSigs.push(sigName);
        }
      }
    }
    expect(failCount, `Failed SIGs: ${failedSigs.join(',')}`).toBe(0);
  });

  it('所有 en SIG jsonld 条目均含 @type', () => {
    let failCount = 0;
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`) as any[];
      for (const item of jsonLd) {
        if (!item['@type']) {
          failCount++;
        }
      }
    }
    expect(failCount).toBe(0);
  });

  it('所有 en SIG jsonld 不含 openeuler.openatom.cn 残留', () => {
    let failCount = 0;
    const failedSigs: string[] = [];
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`);
      const str = JSON.stringify(jsonLd);
      if (str.includes('openeuler.openatom.cn')) {
        failCount++;
        failedSigs.push(sigName);
      }
    }
    expect(failCount, `openatom.cn found in: ${failedSigs.join(',')}`).toBe(0);
  });

  it('所有 en SIG jsonld url 使用 www.openeuler.org 占位符（生产域名适配机制）', () => {
    let failCount = 0;
    const failedSigs: string[] = [];
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`) as any[];
      for (const item of jsonLd) {
        if (item.url && typeof item.url === 'string') {
          if (!item.url.includes('www.openeuler.org')) {
            failCount++;
            failedSigs.push(sigName);
          }
        }
      }
    }
    expect(failCount, `Missing openeuler.org URL in: ${failedSigs.join(',')}`).toBe(0);
  });

  it('所有 en SIG jsonld url 为完整 https 绝对路径', () => {
    let failCount = 0;
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`) as any[];
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

  it('所有 en SIG jsonld 不含 /assets/logo 残留', () => {
    let failCount = 0;
    for (const sigName of enSigNames) {
      const jsonLd = readJsonLdJson('en', `sig/${sigName}`);
      const str = JSON.stringify(jsonLd);
      if (str.includes('/assets/logo')) {
        failCount++;
      }
    }
    expect(failCount).toBe(0);
  });
});

for (const sigName of sampledEnSigs) {
  describe(`en SIG JSON-LD 采样验证 — ${sigName}`, () => {
    const jsonLd = readJsonLdJson('en', `sig/${sigName}`);

    it('JSON-LD 配置文件存在', () => {
      expect(jsonLd).not.toBeNull();
    });

    it('为合规 array 格式', () => {
      expect(Array.isArray(jsonLd)).toBe(true);
    });

    it('包含 Organization 或 WebPage schema 条目', () => {
      const asArray = jsonLd as any[];
      const hasOrg = asArray.some(item => item['@type'] === 'Organization');
      const hasWebPage = asArray.some(item => item['@type'] === 'WebPage');
      expect(hasOrg || hasWebPage).toBe(true);
    });

    it('所有条目含 @context = https://schema.org', () => {
      const asArray = jsonLd as any[];
      for (const item of asArray) {
        expect(item['@context']).toBe('https://schema.org');
      }
    });

    it('Organization 条目 url 使用 www.openeuler.org 占位符', () => {
      const asArray = jsonLd as any[];
      const org = asArray.find(item => item['@type'] === 'Organization');
      if (org) {
        expect(org.url).toContain('www.openeuler.org/en/sig/');
      }
    });

    it('CollectionPage 条目含 inLanguage=en', () => {
      const asArray = jsonLd as any[];
      const collPage = asArray.find(item => item['@type'] === 'CollectionPage');
      if (collPage) {
        expect(collPage.inLanguage).toBe('en');
      }
    });

    it('FAQPage 条目不含虚构数量', () => {
      const asArray = jsonLd as any[];
      const faq = asArray.find(item => item['@type'] === 'FAQPage');
      if (faq) {
        const str = JSON.stringify(faq);
        expect(str).not.toMatch(/\d{2,3}\+ SIG/);
      }
    });

    it('域名不含 openatom.cn', () => {
      const str = JSON.stringify(jsonLd);
      expect(str).not.toContain('openeuler.openatom.cn');
    });
  });
}

describe('zh showcase TDK — 新增 ~100 子页整体验证', () => {
  it('zh showcase 子页 TDK 数量足够（≥90）', () => {
    expect(zhShowcasePaths.length).toBeGreaterThanOrEqual(90);
  });

  it('所有 zh showcase TDK 均含 title/description/keywords', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of zhShowcasePaths) {
      const tdk = readTdkJson('zh', pagePath);
      if (!tdk || !tdk.title || !tdk.description || !tdk.keywords) {
        failCount++;
        if (tdk) failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Missing fields in: ${failedPaths.slice(0, 10).join(',')}`).toBe(0);
  });

  it('所有 zh showcase TDK keywords 包含 openEuler', () => {
    let failCount = 0;
    const failedPaths: string[] = [];
    for (const pagePath of zhShowcasePaths) {
      const tdk = readTdkJson('zh', pagePath);
      if (tdk && !tdk.keywords.toLowerCase().includes('openeuler')) {
        failCount++;
        failedPaths.push(pagePath);
      }
    }
    expect(failCount, `Missing openEuler keyword in: ${failedPaths.slice(0, 10).join(',')}`).toBe(0);
  });

  it('所有 zh showcase TDK keywords 包含中文关键词', () => {
    let failCount = 0;
    for (const pagePath of zhShowcasePaths) {
      const tdk = readTdkJson('zh', pagePath);
      if (tdk) {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk.keywords);
        if (!hasChinese) failCount++;
      }
    }
    expect(failCount).toBe(0);
  });

  it('zh showcase TDK title 包含行业关键词（金融/能源/教育等）', () => {
    const industryKeywords = ['金融', '能源', '教育', '其他行业', '云计算', '物流', '服务商', '高校与科研', '运营商'];
    for (const pagePath of sampledZhShowcase) {
      const tdk = readTdkJson('zh', pagePath);
      if (tdk) {
        const hasIndustry = industryKeywords.some(kw => tdk.title.includes(kw) || tdk.keywords.includes(kw));
        expect(hasIndustry || tdk.title.includes('案例')).toBe(true);
      }
    }
  });
});

for (const pagePath of sampledZhShowcase) {
  describe(`zh showcase TDK 采样验证 — ${pagePath}`, () => {
    const tdk = readTdkJson('zh', pagePath);

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

    it('keywords 包含 openEuler', () => {
      expect(tdk!.keywords.toLowerCase()).toContain('openeuler');
    });

    it('keywords 使用中文关键词', () => {
      const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
      expect(hasChinese).toBe(true);
    });

    it('title 格式为"公司名 | openEuler行业案例"', () => {
      expect(tdk!.title).toContain('openEuler');
      expect(tdk!.title).toContain('案例');
    });
  });
}

describe('en showcase TDK — 新增 ~14 子页整体验证', () => {
  it('en showcase 子页 TDK 数量足够（≥10）', () => {
    expect(enShowcasePaths.length).toBeGreaterThanOrEqual(10);
  });

  it('所有 en showcase TDK 均含 title/description/keywords', () => {
    let failCount = 0;
    for (const pagePath of enShowcasePaths) {
      const tdk = readTdkJson('en', pagePath);
      if (!tdk || !tdk.title || !tdk.description || !tdk.keywords) {
        failCount++;
      }
    }
    expect(failCount).toBe(0);
  });

  it('所有 en showcase TDK keywords 包含 openEuler', () => {
    let failCount = 0;
    for (const pagePath of enShowcasePaths) {
      const tdk = readTdkJson('en', pagePath);
      if (tdk && !tdk.keywords.toLowerCase().includes('openeuler')) {
        failCount++;
      }
    }
    expect(failCount).toBe(0);
  });

  it('en showcase TDK keywords 使用英文关键词（不含中文）', () => {
    let failCount = 0;
    for (const pagePath of enShowcasePaths) {
      const tdk = readTdkJson('en', pagePath);
      if (tdk) {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk.keywords);
        if (hasChinese) failCount++;
      }
    }
    expect(failCount).toBe(0);
  });
});

for (const pagePath of sampledEnShowcase) {
  describe(`en showcase TDK 采样验证 — ${pagePath}`, () => {
    const tdk = readTdkJson('en', pagePath);

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

    it('keywords 包含 openEuler', () => {
      expect(tdk!.keywords.toLowerCase()).toContain('openeuler');
    });

    it('title 使用英文', () => {
      const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.title);
      expect(hasChinese).toBe(false);
    });

    it('keywords 使用英文关键词', () => {
      const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
      expect(hasChinese).toBe(false);
    });

    it('title 含行业关键词（Finance/Carrier/Energy 等）', () => {
      const enIndustryKeywords = ['Finance', 'Carrier', 'Energy', 'Education', 'Logistics', 'Case', 'Provider'];
      const hasIndustry = enIndustryKeywords.some(kw => tdk!.title.includes(kw));
      expect(hasIndustry).toBe(true);
    });
  });
}

describe('sitemap priority 规则 — config.ts 新增 3 条', () => {
  const configPath = resolve(PROJECT_ROOT, 'app/.vitepress/config.ts');
  const configContent = readFileSync(configPath, 'utf-8');

  it('config.ts 包含 mirror/list sitemap priority 规则', () => {
    expect(configContent).toContain("'^(zh|en)/mirror/list/?$'");
  });

  it('mirror/list priority 为 0.8', () => {
    expect(configContent).toContain("'^(zh|en)/mirror/list/?$': { priority: 0.8 }");
  });

  it('config.ts 包含 summit2025 sitemap priority 规则', () => {
    expect(configContent).toContain("'^(zh|en)/interaction/summit-list/summit2025/?$'");
  });

  it('summit2025 priority 为 0.8', () => {
    expect(configContent).toContain("'^(zh|en)/interaction/summit-list/summit2025/?$': { priority: 0.8 }");
  });

  it('config.ts 包含 quick-start sitemap priority 规则', () => {
    expect(configContent).toContain("'^(zh|en)/wiki/about/quick-start/?$'");
  });

  it('quick-start priority 为 0.7', () => {
    expect(configContent).toContain("'^(zh|en)/wiki/about/quick-start/?$': { priority: 0.7 }");
  });

  it('3 条新规则正则语法正确（能匹配对应 zh/en 路径）', () => {
    const rules = [
      { regex: '^(zh|en)/mirror/list/?$', testPaths: ['zh/mirror/list', 'en/mirror/list', 'zh/mirror/list/', 'en/mirror/list/'] },
      { regex: '^(zh|en)/interaction/summit-list/summit2025/?$', testPaths: ['zh/interaction/summit-list/summit2025', 'en/interaction/summit-list/summit2025', 'zh/interaction/summit-list/summit2025/'] },
      { regex: '^(zh|en)/wiki/about/quick-start/?$', testPaths: ['zh/wiki/about/quick-start', 'en/wiki/about/quick-start', 'zh/wiki/about/quick-start/'] },
    ];
    for (const { regex, testPaths } of rules) {
      const re = new RegExp(regex);
      for (const path of testPaths) {
        expect(re.test(path), `Regex ${regex} should match ${path}`).toBe(true);
      }
    }
  });

  it('新规则不会误匹配不相关路径', () => {
    const rules = [
      '^(zh|en)/mirror/list/?$',
      '^(zh|en)/interaction/summit-list/summit2025/?$',
      '^(zh|en)/wiki/about/quick-start/?$',
    ];
    const falsePaths = [
      'zh/mirror/list/subpage',
      'en/interaction/summit-list/summit2024',
      'zh/wiki/about/quick-start/guide',
      'zh/download',
    ];
    for (const regex of rules) {
      const re = new RegExp(regex);
      for (const path of falsePaths) {
        expect(re.test(path), `Regex ${regex} should NOT match ${path}`).toBe(false);
      }
    }
  });
});

describe('showcase 双路径命名边界 — 8pingan/8pingan 模式', () => {
  it('zh showcase finance 8pingan/8pingan TDK 路径存在', () => {
    const tdk = readTdkJson('zh', 'showcase/finance/8pingan/8pingan');
    expect(tdk).not.toBeNull();
  });

  it('8pingan/8pingan TDK title 非空且含公司名', () => {
    const tdk = readTdkJson('zh', 'showcase/finance/8pingan/8pingan');
    expect(tdk!.title.length).toBeGreaterThan(0);
    expect(tdk!.title).toContain('openEuler');
  });

  it('zh showcase others/lanling/lanling TDK 路径存在（另一个双路径案例）', () => {
    const tdk = readTdkJson('zh', 'showcase/others/lanling/lanling');
    expect(tdk).not.toBeNull();
  });
});

describe('en SIG JSON-LD 域名替换逻辑验证', () => {
  it('en SIG jsonld 中 www.openeuler.org 可被 replaceAll 替换', () => {
    const jsonLd = readJsonLdJson('en', 'sig/Kernel') as any[];
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

  it('en SIG jsonld 中 URL 使用完整 https 绝对路径而非相对路径', () => {
    const jsonLd = readJsonLdJson('en', 'sig/Kernel') as any[];
    for (const item of jsonLd) {
      if (item.url && typeof item.url === 'string') {
        expect(item.url).toMatch(/^https:\/\//);
      }
    }
  });
});

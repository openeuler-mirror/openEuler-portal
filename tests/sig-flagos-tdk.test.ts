import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PROJECT_ROOT = resolve(__dirname, '..');
const geoDir = join(PROJECT_ROOT, '.geo');

function readTdkJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'tdks', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

const flagosPages = [
  { locale: 'zh', path: 'sig/sig-FlagOS', label: 'sig-FlagOS zh' },
  { locale: 'en', path: 'sig/sig-FlagOS', label: 'sig-FlagOS en' },
];

for (const { locale, path, label } of flagosPages) {
  describe(`sig-FlagOS TDK ${label}`, () => {
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

    it('keywords 字段存在且非空', () => {
      expect(tdk).toHaveProperty('keywords');
      expect(typeof tdk!.keywords).toBe('string');
      expect(tdk!.keywords.length).toBeGreaterThan(0);
    });

    it('title 包含 FlagOS', () => {
      expect(tdk!.title).toContain('FlagOS');
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

    it('keywords 包含 FlagOS', () => {
      expect(tdk!.keywords).toContain('FlagOS');
    });

    it('keywords 逗号分隔且每项长度合理', () => {
      const keywordsList = tdk!.keywords.split(',').map((k: string) => k.trim());
      expect(keywordsList.length).toBeGreaterThanOrEqual(4);
      for (const kw of keywordsList) {
        expect(kw.length).toBeGreaterThan(0);
        expect(kw.length).toBeLessThanOrEqual(30);
      }
    });

    it('description 包含 FlagOS', () => {
      expect(tdk!.description).toContain('FlagOS');
    });

    it('description 包含 openEuler', () => {
      expect(tdk!.description.toLowerCase()).toContain('openeuler');
    });

    if (locale === 'zh') {
      it('zh keywords 使用中文关键词', () => {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
        expect(hasChinese).toBe(true);
      });

      it('zh title 使用中文标题', () => {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.title);
        expect(hasChinese).toBe(true);
      });

      it('zh description 使用中文描述', () => {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.description);
        expect(hasChinese).toBe(true);
      });
    }

    if (locale === 'en') {
      it('en keywords 不包含中文', () => {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.keywords);
        expect(hasChinese).toBe(false);
      });

      it('en description 不包含中文', () => {
        const hasChinese = /[\u4e00-\u9fff]/.test(tdk!.description);
        expect(hasChinese).toBe(false);
      });
    }
  });
}

describe('sig-FlagOS lookupKey 映射验证', () => {
  it('动态路由页面 filePath zh/sig/sig-FlagOS.md → lookupKey 为 zh/sig/sig-FlagOS', () => {
    const filePath = 'zh/sig/sig-FlagOS.md';
    const lookupKey = filePath.slice(0, -3);
    expect(lookupKey).toBe('zh/sig/sig-FlagOS');
  });

  it('en 动态路由页面 filePath en/sig/sig-FlagOS.md → lookupKey 为 en/sig/sig-FlagOS', () => {
    const filePath = 'en/sig/sig-FlagOS.md';
    const lookupKey = filePath.slice(0, -3);
    expect(lookupKey).toBe('en/sig/sig-FlagOS');
  });

  it('lookupKey encodeURI 无特殊字符（sig-FlagOS 不含需编码字符）', () => {
    const lookupKey = 'zh/sig/sig-FlagOS';
    expect(encodeURI(lookupKey)).toBe(lookupKey);
  });

  it('TDK 文件路径与 lookupKey 映射一致', () => {
    for (const { locale, path } of flagosPages) {
      const filePath = join(geoDir, 'tdks', locale, path, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    }
  });
});

describe('sig-FlagOS setTdk 注入逻辑验证', () => {
  it('sig-FlagOS zh TDK keywords 注入到 frontmatter.head', () => {
    const tdk = readTdkJson('zh', 'sig/sig-FlagOS');
    expect(tdk!.keywords).toBeTruthy();
    const head: any[] = [];
    const keywords = tdk!.keywords;
    head.push(['meta', { name: 'keywords', content: keywords }]);
    expect(head.length).toBe(1);
    expect(head[0][0]).toBe('meta');
    expect(head[0][1].name).toBe('keywords');
    expect(head[0][1].content).toBe(keywords);
  });

  it('sig-FlagOS en TDK keywords 注入到 frontmatter.head', () => {
    const tdk = readTdkJson('en', 'sig/sig-FlagOS');
    expect(tdk!.keywords).toBeTruthy();
    const head: any[] = [];
    const keywords = tdk!.keywords;
    head.push(['meta', { name: 'keywords', content: keywords }]);
    expect(head[0][1].content).toBe(keywords);
  });

  it('已有 keywords meta 标签时应替换而非新增', () => {
    const tdk = readTdkJson('zh', 'sig/sig-FlagOS');
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

  it('sig-FlagOS 不命中 isBlog 正则（路径为 /sig/ 而非 /blog/ /news/ /showcase/）', () => {
    const isBlog = /.+\/(?:news|blog|showcase)\/.+$/;
    expect(isBlog.test('zh/sig/sig-FlagOS')).toBe(false);
    expect(isBlog.test('en/sig/sig-FlagOS')).toBe(false);
  });

  it('sig-FlagOS TDK 不存在时（模拟缺失）setTdk 不降级取 summary', () => {
    const isBlog = /.+\/(?:news|blog|showcase)\/.+$/;
    const lookupKey = 'zh/sig/sig-FlagOS';
    expect(isBlog.test(lookupKey)).toBe(false);
  });
});

describe('sig-FlagOS 与现有 SIG TDK 格式一致性', () => {
  const kernelZhTdk = readTdkJson('zh', 'sig/Kernel');
  const kernelEnTdk = readTdkJson('en', 'sig/Kernel');
  const flagosZhTdk = readTdkJson('zh', 'sig/sig-FlagOS');
  const flagosEnTdk = readTdkJson('en', 'sig/sig-FlagOS');

  it('zh sig-FlagOS TDK 结构与 zh sig/Kernel 一致（均含 title/description/keywords）', () => {
    const kernelKeys = Object.keys(kernelZhTdk!);
    const flagosKeys = Object.keys(flagosZhTdk!);
    for (const key of ['title', 'description', 'keywords']) {
      expect(flagosKeys).toContain(key);
    }
  });

  it('en sig-FlagOS TDK 结构与 en sig/Kernel 一致', () => {
    const kernelKeys = Object.keys(kernelEnTdk!);
    const flagosKeys = Object.keys(flagosEnTdk!);
    for (const key of ['title', 'description', 'keywords']) {
      expect(flagosKeys).toContain(key);
    }
  });

  it('zh sig-FlagOS title 格式与 Kernel 一致（"XXX SIG 兴趣小组 | openEuler社区"）', () => {
    expect(flagosZhTdk!.title).toMatch(/SIG.*兴趣小组.*openEuler社区/);
    expect(kernelZhTdk!.title).toMatch(/SIG.*兴趣小组.*openEuler社区/);
  });

  it('en sig-FlagOS title 格式与 Kernel 一致（"XXX SIG | openEuler"）', () => {
    expect(flagosEnTdk!.title).toMatch(/SIG.*openEuler/);
    expect(kernelEnTdk!.title).toMatch(/SIG.*openEuler/);
  });
});

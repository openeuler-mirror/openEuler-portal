import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import tocData from '../app/.vitepress/src/data/about-us/about-us-toc';
import { hideNssRoutes } from '../app/.vitepress/src/data/common/nss';

const PROJECT_ROOT = process.cwd();

describe('about-us-toc.ts — zh 侧边栏 AIGC 条目', () => {
  const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');

  it('zh 侧边栏包含"政策和规则"分组', () => {
    expect(zhPolicies).toBeDefined();
    expect(zhPolicies!.children).toBeDefined();
  });

  it('"政策和规则"分组中包含"生成式AI工具使用与贡献策略"条目', () => {
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'aigc');
    expect(aigcEntry).toBeDefined();
    expect(aigcEntry!.label).toBe('生成式AI工具使用与贡献策略');
  });

  it('AIGC 条目位于"行为准则"之后', () => {
    const children = zhPolicies!.children!;
    const conductIdx = children.findIndex((c) => c.link === 'conduct');
    const aigcIdx = children.findIndex((c) => c.link === 'aigc');
    expect(conductIdx, '行为准则条目应存在').toBeGreaterThan(-1);
    expect(aigcIdx, 'AIGC条目应存在').toBeGreaterThan(-1);
    expect(aigcIdx).toBe(conductIdx + 1);
  });

  it('AIGC 条目位于"运作制度"之前', () => {
    const children = zhPolicies!.children!;
    const aigcIdx = children.findIndex((c) => c.link === 'aigc');
    const meetingIdx = children.findIndex((c) => c.link === 'meeting-system');
    expect(aigcIdx).toBeLessThan(meetingIdx);
  });

  it('"政策和规则"子菜单顺序完整: 社区章程 → 选举条例 → 行为准则 → AIGC → 运作制度', () => {
    const children = zhPolicies!.children!;
    const links = children.map((c) => c.link);
    expect(links).toContain('charter');
    expect(links).toContain('vote');
    expect(links).toContain('conduct');
    expect(links).toContain('aigc');
    expect(links).toContain('meeting-system');
  });
});

describe('about-us-toc.ts — en 侧边栏不含 AIGC 条目（i18n 未适配）', () => {
  const enPolicies = tocData.en.find((item) => item.label === 'Policies and Rules');

  it('en 侧边栏包含"Policies and Rules"分组', () => {
    expect(enPolicies).toBeDefined();
    expect(enPolicies!.children).toBeDefined();
  });

  it('en"Policies and Rules"分组中不包含 aigc 条目', () => {
    const aigcEntry = enPolicies!.children!.find((c) => c.link === 'aigc');
    expect(aigcEntry).toBeUndefined();
  });

  it('en"Policies and Rules"仅含 Code of Conduct', () => {
    const children = enPolicies!.children!;
    expect(children.length).toBe(1);
    expect(children[0].link).toBe('conduct');
  });
});

describe('nss.ts — /community/aigc 隐藏 NSS 按钮', () => {
  it('hideNssRoutes 包含 /community/aigc', () => {
    expect(hideNssRoutes).toContain('/community/aigc');
  });

  it('/community/aigc 与其他政策页路由并列（conduct、charter 等也在列表中）', () => {
    expect(hideNssRoutes).toContain('/community/conduct');
    expect(hideNssRoutes).toContain('/community/charter');
    expect(hideNssRoutes).toContain('/community/vote');
  });
});

describe('TDK 配置 — .geo/tdks/zh/community/aigc/index.json', () => {
  const tdkPath = path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json');

  it('TDK 配置文件存在', () => {
    expect(fs.existsSync(tdkPath), `TDK 文件应存在: ${tdkPath}`).toBe(true);
  });

  it('TDK 配置包含 title、description、keywords 字段', () => {
    const tdk = JSON.parse(fs.readFileSync(tdkPath, 'utf8'));
    expect(tdk.title).toBeTypeOf('string');
    expect(tdk.title.length, 'title 不应为空').toBeGreaterThan(0);
    expect(tdk.description).toBeTypeOf('string');
    expect(tdk.description.length, 'description 不应为空').toBeGreaterThan(0);
    expect(tdk.keywords).toBeTypeOf('string');
    expect(tdk.keywords.length, 'keywords 不应为空').toBeGreaterThan(0);
  });

  it('title 包含"AIGC"或"生成式AI"关键词', () => {
    const tdk = JSON.parse(fs.readFileSync(tdkPath, 'utf8'));
    expect(
      tdk.title.includes('AIGC') || tdk.title.includes('生成式AI'),
      `title "${tdk.title}" 应包含 AIGC 或 生成式AI`
    ).toBe(true);
  });

  it('keywords 包含 AIGC 和 openEuler', () => {
    const tdk = JSON.parse(fs.readFileSync(tdkPath, 'utf8'));
    expect(tdk.keywords).toContain('AIGC');
    expect(tdk.keywords).toContain('openEuler');
  });
});

describe('JSON-LD 配置 — .geo/jsonld/zh/community/aigc/index.json', () => {
  const jsonldPath = path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json');

  it('JSON-LD 配置文件存在', () => {
    expect(fs.existsSync(jsonldPath), `JSON-LD 文件应存在: ${jsonldPath}`).toBe(true);
  });

  it('JSON-LD 配置是数组且包含 Article 类型', () => {
    const jsonld = JSON.parse(fs.readFileSync(jsonldPath, 'utf8'));
    expect(Array.isArray(jsonld), 'JSON-LD 应为数组格式').toBe(true);
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article, '应包含 Article 类型条目').toBeDefined();
  });

  it('Article 条目包含必要字段: name、description、url、inLanguage', () => {
    const jsonld = JSON.parse(fs.readFileSync(jsonldPath, 'utf8'));
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toBeTypeOf('string');
    expect(article.name.length, 'name 不应为空').toBeGreaterThan(0);
    expect(article.description).toBeTypeOf('string');
    expect(article.url).toBeTypeOf('string');
    expect(article.url).toContain('/zh/community/aigc');
    expect(article.inLanguage).toBe('zh-CN');
  });

  it('Article 条目包含 @context: https://schema.org', () => {
    const jsonld = JSON.parse(fs.readFileSync(jsonldPath, 'utf8'));
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article['@context']).toBe('https://schema.org');
  });

  it('Article 条目包含 isPartOf 关联到 openEuler 社区官网', () => {
    const jsonld = JSON.parse(fs.readFileSync(jsonldPath, 'utf8'));
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.isPartOf).toBeDefined();
    expect(article.isPartOf['@type']).toBe('WebSite');
    expect(article.isPartOf.name).toBe('openEuler社区官网');
    expect(article.isPartOf.url).toBe('https://www.openeuler.org');
  });
});

describe('AIGC 页面 MD 文件 — app/zh/community/aigc/index.md', () => {
  const mdPath = path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md');

  it('MD 文件存在', () => {
    expect(fs.existsSync(mdPath), `MD 文件应存在: ${mdPath}`).toBe(true);
  });

  it('frontmatter 包含 title 字段且值为"社区生成式AI工具使用与贡献策略"', () => {
    const content = fs.readFileSync(mdPath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    expect(frontmatterMatch, 'MD 文件应有 frontmatter').toBeDefined();
    const frontmatter = frontmatterMatch![1];
    expect(frontmatter).toContain('title: 社区生成式AI工具使用与贡献策略');
  });

  it('frontmatter 包含 category: about-us（与 conduct 等政策页同模式）', () => {
    const content = fs.readFileSync(mdPath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    expect(frontmatterMatch![1]).toContain('category: about-us');
  });

  it('页面正文包含主要章节标题（背景/术语/规范与要求等）', () => {
    const content = fs.readFileSync(mdPath, 'utf8');
    expect(content).toContain('## 背景/目标/原则');
    expect(content).toContain('## 术语');
    expect(content).toContain('## 规范与要求');
  });

  it('页面正文包含披露要求（Assisted-by / Generated-by）', () => {
    const content = fs.readFileSync(mdPath, 'utf8');
    expect(content).toContain('Assisted-by');
    expect(content).toContain('Generated-by');
  });
});

describe('SEO 配置与页面内容一致性', () => {
  it('TDK title 与 MD frontmatter title 一致', () => {
    const mdContent = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    const frontmatterMatch = mdContent.match(/^---\n([\s\S]*?)\n---/);
    const mdTitle = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'))
      ?.replace('title:', '')
      .trim();

    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    expect(tdk.title).toBe(mdTitle);
  });

  it('JSON-LD name 与 MD frontmatter title 一致', () => {
    const mdContent = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    const frontmatterMatch = mdContent.match(/^---\n([\s\S]*?)\n---/);
    const mdTitle = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'))
      ?.replace('title:', '')
      .trim();

    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toBe(mdTitle);
  });

  it('TDK description 与 JSON-LD description 一致', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(tdk.description).toBe(article.description);
  });
});

describe('en 侧 SEO 配置不存在（i18n 未适配）', () => {
  it('.geo/tdks/en/community/aigc/ 不存在', () => {
    const enTdkPath = path.join(PROJECT_ROOT, '.geo/tdks/en/community/aigc/index.json');
    expect(fs.existsSync(enTdkPath), 'en TDK 配置不应存在').toBe(false);
  });

  it('.geo/jsonld/en/community/aigc/ 不存在', () => {
    const enJsonldPath = path.join(PROJECT_ROOT, '.geo/jsonld/en/community/aigc/index.json');
    expect(fs.existsSync(enJsonldPath), 'en JSON-LD 配置不应存在').toBe(false);
  });

  it('app/en/community/aigc/ 不存在', () => {
    const enMdPath = path.join(PROJECT_ROOT, 'app/en/community/aigc/index.md');
    expect(fs.existsSync(enMdPath), 'en MD 页面不应存在').toBe(false);
  });
});
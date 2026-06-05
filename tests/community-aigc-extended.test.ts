import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import tocData from '../app/.vitepress/src/data/about-us/about-us-toc';

const PROJECT_ROOT = process.cwd();

const EXPECTED_TITLE = '生成式AI工具使用与开源贡献政策';

describe('回归守卫 — "政策"而非"策略"', () => {
  it('TDK title 使用"政策"而非"策略"', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    expect(tdk.title).toContain('政策');
    expect(tdk.title).not.toContain('策略');
  });

  it('TDK description 使用"开源贡献政策"而非"开源贡献策略"', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    expect(tdk.description).toContain('开源贡献政策');
    expect(tdk.description).not.toContain('开源贡献策略');
  });

  it('TDK keywords 使用"政策"而非"策略"', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    expect(tdk.keywords).toContain('开源贡献政策');
    expect(tdk.keywords).not.toContain('开源贡献策略');
  });

  it('JSON-LD name 使用"政策"而非"策略"', () => {
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toContain('政策');
    expect(article.name).not.toContain('策略');
  });

  it('JSON-LD description 使用"开源贡献政策"而非"开源贡献策略"', () => {
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.description).toContain('开源贡献政策');
    expect(article.description).not.toContain('开源贡献策略');
  });

  it('侧边栏 label 使用"政策"而非"策略"', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'aigc');
    expect(aigcEntry!.label).toContain('政策');
    expect(aigcEntry!.label).not.toContain('策略');
  });

  it('MD frontmatter title 使用"政策"而非"策略"', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const titleLine = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'));
    expect(titleLine).toContain('政策');
    expect(titleLine).not.toContain('策略');
  });
});

describe('标题一致性链 — sidebar ≡ H1 ≡ frontmatter ≡ TDK ≡ JSON-LD', () => {
  it('MD H1 与 frontmatter title 一致', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const mdTitle = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'))
      ?.replace('title:', '')
      .trim();
    const h1Match = content.match(/^# (.+)$/m);
    expect(h1Match).toBeDefined();
    expect(h1Match![1].trim()).toBe(mdTitle);
  });

  it('侧边栏 label 与 MD frontmatter title 完全一致', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'aigc');
    expect(aigcEntry!.label).toBe(EXPECTED_TITLE);
  });

  it('TDK title 与侧边栏 label 完全一致', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'aigc');
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    expect(tdk.title).toBe(aigcEntry!.label);
  });

  it('JSON-LD name 与 TDK title 完全一致', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toBe(tdk.title);
  });
});

describe('代码块空格修正 — openEuler 与中文间无多余空格', () => {
  it('"openEuler技术栈适配"无多余空格', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    expect(content).toContain('openEuler技术栈适配');
    expect(content).not.toContain('openEuler 技术栈适配');
  });

  it('"经过openEuler验证"无多余空格', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    expect(content).toContain('经过openEuler验证');
    expect(content).not.toContain('经过 openEuler 验证');
    expect(content).not.toContain('经过openEuler 验证');
    expect(content).not.toContain('经过 openEuler验证');
  });
});

describe('LayoutAboutUs.vue — 移动端样式响应式适配', () => {
  const vuePath = path.join(
    PROJECT_ROOT,
    'app/.vitepress/src/layouts/LayoutAboutUs.vue'
  );

  it('Vue 文件存在', () => {
    expect(fs.existsSync(vuePath)).toBe(true);
  });

  it('.about-markdown pre 在 respond-to("<=pad_v") 内包含 white-space: pre-wrap', () => {
    const content = fs.readFileSync(vuePath, 'utf8');
    const scssContent = content.substring(content.indexOf('<style'));
    expect(scssContent).toMatch(
      /pre\s*\{[^}]*@include respond-to\('<=pad_v'\)\s*\{[^}]*white-space:\s*pre-wrap/
    );
  });

  it('.about-markdown pre 在 respond-to("<=pad_v") 内包含 word-break: break-word', () => {
    const content = fs.readFileSync(vuePath, 'utf8');
    const scssContent = content.substring(content.indexOf('<style'));
    expect(scssContent).toMatch(/@include respond-to\('<=pad_v'\)\s*\{[^}]*word-break:\s*break-word/);
  });

  it('.about-markdown code 在 respond-to("<=pad_v") 内包含 font-size 降级', () => {
    const content = fs.readFileSync(vuePath, 'utf8');
    const scssContent = content.substring(content.indexOf('<style'));
    const codeBlockMatch = scssContent.match(
      /code\s*\{[^}]*@include respond-to\('<=pad_v'\)\s*\{[^}]*font-size:\s*var\(--e-font-size-tip\)/s
    );
    expect(codeBlockMatch).toBeDefined();
  });

  it('.about-markdown code 在 respond-to("<=pad_v") 内包含 line-height 降级', () => {
    const content = fs.readFileSync(vuePath, 'utf8');
    const scssContent = content.substring(content.indexOf('<style'));
    const codeBlockMatch = scssContent.match(
      /code\s*\{[^}]*@include respond-to\('<=pad_v'\)\s*\{[^}]*line-height:\s*var\(--e-line-height-tip\)/s
    );
    expect(codeBlockMatch).toBeDefined();
  });

  it('新增的移动端样式使用 respond-to mixin 而非硬编码 @media', () => {
    const content = fs.readFileSync(vuePath, 'utf8');
    const scssContent = content.substring(content.indexOf('<style'));
    const aboutMarkdownSection = scssContent.substring(
      scssContent.indexOf('.about-markdown')
    );
    const preSection = aboutMarkdownSection.substring(
      aboutMarkdownSection.indexOf('pre {')
    );
    const respondToBlocks = preSection.match(/@include respond-to\('<=pad_v'\)\s*\{/g);
    expect(respondToBlocks, 'pre 和 code 应各有一处 respond-to').toHaveLength(2);
  });
});

describe('TDK title 无"openEuler社区"前缀（简洁化）', () => {
  it('TDK title 不以"openEuler社区"开头', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/aigc/index.json'), 'utf8')
    );
    expect(tdk.title).not.toMatch(/^openEuler\s*社区/);
  });

  it('JSON-LD name 不以"openEuler社区"开头', () => {
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/aigc/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).not.toMatch(/^openEuler\s*社区/);
  });

  it('侧边栏 label 不含"社区"前缀', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'aigc');
    expect(aigcEntry!.label).not.toContain('社区');
  });

  it('MD H1 不含"社区"前缀', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/aigc/index.md'),
      'utf8'
    );
    const h1Match = content.match(/^# (.+)$/m);
    expect(h1Match![1].trim()).not.toContain('社区');
  });
});
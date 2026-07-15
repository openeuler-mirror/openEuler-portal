import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import tocData from '../app/.vitepress/src/data/about-us/about-us-toc';

const PROJECT_ROOT = process.cwd();

const EXPECTED_TITLE = '生成式AI工具使用与开源贡献策略';

describe('回归守卫 — "策略"而非"政策"', () => {
  it('TDK title 使用"策略"而非"政策"', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    expect(tdk.title).toContain('策略');
    expect(tdk.title).not.toContain('政策');
  });

  it('TDK description 使用"策略规范"而非"政策规范"', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    expect(tdk.description).toContain('策略规范');
    expect(tdk.description).not.toContain('政策规范');
  });

  it('TDK keywords 使用"策略"而非"政策"', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    expect(tdk.keywords).toContain('开源贡献策略');
    expect(tdk.keywords).not.toContain('开源贡献政策');
  });

  it('JSON-LD name 使用"策略"而非"政策"', () => {
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toContain('策略');
    expect(article.name).not.toContain('政策');
  });

  it('JSON-LD description 使用"策略规范"而非"政策规范"', () => {
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.description).toContain('策略规范');
    expect(article.description).not.toContain('政策规范');
  });

  it('侧边栏 label 使用"策略"而非"政策"', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'ai-coding-assistants');
    expect(aigcEntry!.label).toContain('策略');
    expect(aigcEntry!.label).not.toContain('政策');
  });

  it('MD frontmatter title 使用"策略"而非"政策"', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/ai-coding-assistants/index.md'),
      'utf8'
    );
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const titleLine = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'));
    expect(titleLine).toContain('策略');
    expect(titleLine).not.toContain('政策');
  });
});

describe('标题一致性链 — sidebar ⊂ frontmatter ≡ JSON-LD ⊂ TDK', () => {
  it('MD H1 与 frontmatter title 一致', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/ai-coding-assistants/index.md'),
      'utf8'
    );
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const mdTitle = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'))
      ?.replace('title:', '')
      .trim();
    const h1Match = content.match(/^# (.+)$/m);
    expect(h1Match).toBeDefined();
    expect(h1Match![1].trim()).toBe(mdTitle);
  });

  it('侧边栏 label 与 EXPECTED_TITLE 一致', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'ai-coding-assistants');
    expect(aigcEntry!.label).toBe(EXPECTED_TITLE);
  });

  it('TDK title 包含侧边栏 label', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'ai-coding-assistants');
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    expect(tdk.title).toContain(aigcEntry!.label);
  });

  it('JSON-LD name 与 MD frontmatter title 完全一致', () => {
    const mdContent = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/ai-coding-assistants/index.md'),
      'utf8'
    );
    const frontmatterMatch = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const mdTitle = frontmatterMatch![1]
      .split('\n')
      .find((line) => line.startsWith('title:'))
      ?.replace('title:', '')
      .trim();
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toBe(mdTitle);
  });

  it('TDK title 以 JSON-LD name 开头', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(tdk.title.startsWith(article.name)).toBe(true);
  });
});

describe('代码块空格修正 — openEuler 与中文间无多余空格', () => {
  it('"openEuler技术栈适配"无多余空格', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/ai-coding-assistants/index.md'),
      'utf8'
    );
    expect(content).toContain('openEuler技术栈适配');
    expect(content).not.toContain('openEuler 技术栈适配');
  });

  it('"经过openEuler社区验证"无多余空格', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/ai-coding-assistants/index.md'),
      'utf8'
    );
    expect(content).toContain('经过openEuler社区验证');
    expect(content).not.toContain('经过 openEuler 社区验证');
    expect(content).not.toContain('经过openEuler 社区验证');
    expect(content).not.toContain('经过 openEuler社区验证');
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

describe('标题前缀规范 — 侧边栏简洁化，SEO 保留品牌前缀', () => {
  it('TDK title 以"openEuler社区"开头（SEO 品牌前缀）', () => {
    const tdk = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/tdks/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    expect(tdk.title).toMatch(/^openEuler\s*社区/);
  });

  it('JSON-LD name 以"openEuler社区"开头（SEO 品牌前缀）', () => {
    const jsonld = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/ai-coding-assistants/index.json'), 'utf8')
    );
    const article = jsonld.find((item: any) => item['@type'] === 'Article');
    expect(article.name).toMatch(/^openEuler\s*社区/);
  });

  it('侧边栏 label 不含"社区"前缀（简洁化）', () => {
    const zhPolicies = tocData.zh.find((item) => item.label === '政策和规则');
    const aigcEntry = zhPolicies!.children!.find((c) => c.link === 'ai-coding-assistants');
    expect(aigcEntry!.label).not.toContain('社区');
  });

  it('MD H1 包含"openEuler社区"（页面标题与 frontmatter 一致）', () => {
    const content = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/zh/community/ai-coding-assistants/index.md'),
      'utf8'
    );
    const h1Match = content.match(/^# (.+)$/m);
    expect(h1Match![1].trim()).toContain('openEuler社区');
  });
});
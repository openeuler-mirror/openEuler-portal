import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import zh from '../app/.vitepress/src/i18n/internship/internship-zh';
import { internshipTaskLinks } from '../app/.vitepress/src/views/internship/components/internshipTask';

const PROJECT_ROOT = process.cwd();
const SUBMIT_TASK_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/components/SubmitTask.vue'
);

const i18n = zh;

describe('internship-zh.ts — 新增 attention1/attention2 i18n key', () => {
  it('attention1 存在且值为"注意1："', () => {
    expect(i18n.attention1).toBe('注意1：');
  });

  it('attention1Desc 存在且值为"请遵守"', () => {
    expect(i18n.attention1Desc).toBe('请遵守');
  });

  it('attention1Link 存在且值为"社区AI贡献策略"', () => {
    expect(i18n.attention1Link).toBe('社区AI贡献策略');
  });

  it('attention2 存在且值为"注意2："', () => {
    expect(i18n.attention2).toBe('注意2：');
  });

  it('attention2Desc 存在且值包含"AI"和"低质量PR"', () => {
    expect(i18n.attention2Desc).toContain('AI');
    expect(i18n.attention2Desc).toContain('低质量PR');
  });

  it('attention2Code 存在且值为"/intern-fail"', () => {
    expect(i18n.attention2Code).toBe('/intern-fail');
  });

  it('原有的 attention key 不受影响（仍为"注意: "）', () => {
    expect(i18n.attention).toBe('注意: ');
  });

  it('原有的 noPoints1/2/3 key 不受影响', () => {
    expect(i18n.noPoints1).toBeDefined();
    expect(i18n.noPoints2).toBeDefined();
    expect(i18n.noPoints3).toBeDefined();
  });
});

describe('internshipTask.ts — 新增 aiCodingAssistants 链接常量', () => {
  it('aiCodingAssistants 存在且指向 openEuler AI 贡献策略页面', () => {
    expect(internshipTaskLinks.aiCodingAssistants).toBe(
      'https://www.openeuler.org/zh/community/ai-coding-assistants/'
    );
  });

  it('aiCodingAssistants 链接为 https 协议', () => {
    expect(internshipTaskLinks.aiCodingAssistants.startsWith('https://')).toBe(true);
  });

  it('aiCodingAssistants 链接路径包含 /zh/（中文页面）', () => {
    expect(internshipTaskLinks.aiCodingAssistants).toContain('/zh/');
  });

  it('internshipTaskLinks 原有链接常量不受影响', () => {
    expect(internshipTaskLinks.viewTask).toBeDefined();
    expect(internshipTaskLinks.internshipTestTask).toBeDefined();
    expect(internshipTaskLinks.mindsporeLink).toBeDefined();
    expect(internshipTaskLinks.vllmAscendLink).toBeDefined();
    expect(internshipTaskLinks.internshipEmailTemp).toBeDefined();
    expect(internshipTaskLinks.applyInternshipTemp).toBeDefined();
    expect(internshipTaskLinks.internshipCertTemplate).toBeDefined();
  });
});

describe('SubmitTask.vue — 模板新增 attention1/attention2 区域', () => {
  let content: string;

  it('SubmitTask.vue 文件存在', () => {
    expect(fs.existsSync(SUBMIT_TASK_VUE)).toBe(true);
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
  });

  it('import 了 OLink 组件', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes("import { OLink } from '@opensig/opendesign'")).toBe(true);
  });

  it('import 了 internshipTaskLinks', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes("import { internshipTaskLinks } from './internshipTask'")).toBe(true);
  });

  it('模板引用 i18n.internship.attention1', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention1')).toBe(true);
  });

  it('模板引用 i18n.internship.attention1Desc', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention1Desc')).toBe(true);
  });

  it('模板引用 i18n.internship.attention1Link', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention1Link')).toBe(true);
  });

  it('模板引用 i18n.internship.attention2', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention2')).toBe(true);
  });

  it('模板引用 i18n.internship.attention2Desc', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention2Desc')).toBe(true);
  });

  it('模板引用 i18n.internship.attention2Code', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention2Code')).toBe(true);
  });

  it('OLink 使用 internshipTaskLinks.aiCodingAssistants 作为 href', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('internshipTaskLinks.aiCodingAssistants')).toBe(true);
  });

  it('OLink 使用 target="_blank"（外部链接新窗口打开）', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('target="_blank"')).toBe(true);
  });

  it('attention2Code 使用 .code CSS 类（与既有 noPoints2 一致）', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    const codeClassWithAttention2Code = content.match(/class="code"[^>]*>.*?i18n\.internship\.attention2Code/s);
    expect(codeClassWithAttention2Code, 'attention2Code 所在 span 应有 class="code"').toBeDefined();
  });
});

describe('SubmitTask.vue — 样式新增', () => {
  let content: string;

  it('包含 .contact 样式（在 .attention 内）', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('.contact')).toBe(true);
  });

  it('.contact 样式使用 CSS 变量 var(--o-color-primary1)', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('var(--o-color-primary1)')).toBe(true);
  });

  it('.contact hover 样式使用 var(--o-color-primary2)', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('var(--o-color-primary2)')).toBe(true);
  });

  it('包含 .attention + .attention 间距规则', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('.attention + .attention')).toBe(true);
  });

  it('.attention + .attention 使用 margin-top: 8px', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('margin-top: 8px')).toBe(true);
  });
});

describe('SubmitTask.vue — 结构完整性', () => {
  let content: string;

  it('模板中存在 3 个 .attention div（原有 1 个 + 新增 2 个）', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    const attentionDivs = content.match(/class="attention"/g);
    expect(attentionDivs).toBeDefined();
    expect(attentionDivs!.length).toBe(3);
  });

  it('每个 .attention div 内含 .attention-text span', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    const attentionTexts = content.match(/class="attention-text"/g);
    expect(attentionTexts).toBeDefined();
    expect(attentionTexts!.length).toBe(3);
  });

  it('新增 attention1 区域使用 OLink 组件（非原生 a 标签）', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('<OLink')).toBe(true);
  });

  it('原有的 attention 区域（noPoints 相关）仍保留', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(content.includes('i18n.internship.attention')).toBe(true);
    expect(content.includes('i18n.internship.noPoints1')).toBe(true);
  });
});

describe('i18n 与模板一致性', () => {
  it('i18n 中 attention1/attention2 key 的全角冒号与现有 attention 半角冒号区分', () => {
    expect(i18n.attention1).toContain('：');
    expect(i18n.attention2).toContain('：');
    expect(i18n.attention).toContain(': ');
    expect(i18n.attention).not.toContain('：');
  });

  it('attention2Code 值 "/intern-fail" 与 i18n 中 noPoints2 的 "/intern-fail" 一致', () => {
    expect(i18n.attention2Code).toBe(i18n.noPoints2);
  });
});

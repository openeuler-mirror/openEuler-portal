import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import zh from '../app/.vitepress/src/i18n/internship/internship-zh';
import internshipIndex from '../app/.vitepress/src/i18n/internship/index';
import { internshipTaskLinks } from '../app/.vitepress/src/views/internship/components/internshipTask';

const PROJECT_ROOT = process.cwd();
const SUBMIT_TASK_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/components/SubmitTask.vue'
);
const RECEIVE_TASK_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/components/ReceiveTask.vue'
);
const APPLY_INTERNSHIP_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/components/ApplyInternship.vue'
);

const i18n = zh;

describe('i18n 导出链 — 新增 key 通过 index.ts 可访问', () => {
  it('internshipIndex.zh 与直接 import 的 zh 是同一对象', () => {
    expect(internshipIndex.zh).toBe(zh);
  });

  it('internshipIndex.zh.attention1 存在且值正确', () => {
    expect(internshipIndex.zh.attention1).toBe('注意1：');
  });

  it('internshipIndex.zh.attention2 存在且值正确', () => {
    expect(internshipIndex.zh.attention2).toBe('注意2：');
  });

  it('internshipIndex.zh.attention1Desc 存在且值正确', () => {
    expect(internshipIndex.zh.attention1Desc).toBe('请遵守');
  });

  it('internshipIndex.zh.attention1Link 存在且值正确', () => {
    expect(internshipIndex.zh.attention1Link).toBe('社区AI贡献策略');
  });

  it('internshipIndex.zh.attention2Desc 存在且值正确', () => {
    expect(internshipIndex.zh.attention2Desc).toContain('AI');
  });

  it('internshipIndex.zh.attention2Code 存在且值正确', () => {
    expect(internshipIndex.zh.attention2Code).toBe('/intern-fail');
  });
});

describe('i18n key 命名规范 — 遵循 rules/naming.md §i18n Key 命名', () => {
  const newKeys = [
    'attention1',
    'attention1Desc',
    'attention1Link',
    'attention2',
    'attention2Desc',
    'attention2Code',
  ];

  it.each(newKeys)('key "%s" 是 camelCase 格式', (key) => {
    expect(key).toMatch(/^[a-z][a-zA-Z0-9]*$/);
  });

  it('新增 key 均以 attention 为前缀，与模块语义一致', () => {
    newKeys.forEach((key) => {
      expect(key.startsWith('attention')).toBe(true);
    });
  });

  it('新增 key 不与已有 key 重复', () => {
    const allKeys = Object.keys(i18n);
    const uniqueKeys = new Set(allKeys);
    expect(allKeys.length).toBe(uniqueKeys.size);
  });
});

describe('i18n 值质量 — 非空 + 类型检查', () => {
  const newKeys = [
    'attention1',
    'attention1Desc',
    'attention1Link',
    'attention2',
    'attention2Desc',
    'attention2Code',
  ];

  it.each(newKeys)('key "%s" 的值是非空字符串', (key) => {
    expect(typeof i18n[key as keyof typeof i18n]).toBe('string');
    expect((i18n[key as keyof typeof i18n] as string).length).toBeGreaterThan(0);
  });

  it('attention1 和 attention2 都以全角冒号结尾', () => {
    expect(i18n.attention1.endsWith('：')).toBe(true);
    expect(i18n.attention2.endsWith('：')).toBe(true);
  });

  it('attention1Link 是中文文本（非 URL）', () => {
    expect(i18n.attention1Link).not.toMatch(/^https?:\/\//);
    expect(i18n.attention1Link.length).toBeGreaterThan(0);
  });

  it('attention2Code 以斜杠开头（类命令格式）', () => {
    expect(i18n.attention2Code.startsWith('/')).toBe(true);
  });
});

describe('internshipTaskLinks — 完整性与 URL 格式', () => {
  const allLinkKeys = Object.keys(internshipTaskLinks) as (keyof typeof internshipTaskLinks)[];

  it('aiCodingAssistants 是新增的 key', () => {
    expect(allLinkKeys).toContain('aiCodingAssistants');
  });

  it('所有链接常量均为非空字符串', () => {
    allLinkKeys.forEach((key) => {
      expect(typeof internshipTaskLinks[key]).toBe('string');
      expect(internshipTaskLinks[key].length).toBeGreaterThan(0);
    });
  });

  it('外部链接均使用 https 协议', () => {
    const externalKeys: (keyof typeof internshipTaskLinks)[] = [
      'viewTask',
      'internshipTestTask',
      'mindsporeLink',
      'vllmAscendLink',
      'aiCodingAssistants',
    ];
    externalKeys.forEach((key) => {
      expect(internshipTaskLinks[key].startsWith('https://')).toBe(true);
    });
  });

  it('内部链接以 / 开头', () => {
    const internalKeys: (keyof typeof internshipTaskLinks)[] = [
      'internshipEmailTemp',
      'applyInternshipTemp',
      'internshipCertTemplate',
    ];
    internalKeys.forEach((key) => {
      expect(internshipTaskLinks[key].startsWith('/')).toBe(true);
    });
  });

  it('aiCodingAssistants 链接域名是 openeuler.org', () => {
    const url = new URL(internshipTaskLinks.aiCodingAssistants);
    expect(url.hostname).toBe('www.openeuler.org');
  });

  it('aiCodingAssistants 链接路径包含 /zh/community/', () => {
    const url = new URL(internshipTaskLinks.aiCodingAssistants);
    expect(url.pathname).toContain('/zh/community/');
  });
});

describe('SubmitTask.vue — 模板结构深入验证', () => {
  let content: string;

  it('文件可读取', () => {
    expect(fs.existsSync(SUBMIT_TASK_VUE)).toBe(true);
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
  });

  it('新增 attention1 区域内含 OLink 组件（非原生 <a> 标签）', () => {
    expect(content).toMatch(/<OLink[^>]*class="contact"/);
  });

  it('attention1 区域使用 internshipTaskLinks.aiCodingAssistants（非硬编码 URL）', () => {
    expect(content.includes('internshipTaskLinks.aiCodingAssistants')).toBe(true);
    expect(content).not.toMatch(/href="https:\/\/www\.openeuler\.org\/zh\/community\/ai-coding-assistants/);
  });

  it('attention2 区域内含 .code 样式的 span（非 OLink）', () => {
    const codeWithAttention2Code = content.match(
      /class="code"[^>]*>\s*\{\{\s*i18n\.internship\.attention2Code\s*\}\}/s
    );
    expect(codeWithAttention2Code).toBeDefined();
  });

  it('attention1 区域在 attention2 区域之前', () => {
    const idx1 = content.indexOf('i18n.internship.attention1');
    const idx2 = content.indexOf('i18n.internship.attention2');
    expect(idx1).toBeGreaterThan(0);
    expect(idx2).toBeGreaterThan(idx1);
  });

  it('新增两个 attention div 在原有 attention div 之后', () => {
    const idxOriginal = content.indexOf('i18n.internship.attention');
    const idx1 = content.indexOf('i18n.internship.attention1');
    expect(idx1).toBeGreaterThan(idxOriginal);
  });

  it('新增 attention div 内含内层 <div> 包裹（与既有结构一致）', () => {
    const attention1Block = content.match(
      /class="attention-text">\{\{\s*i18n\.internship\.attention1\s*\}\}<\/span>\s*<div>[\s\S]*?<\/div>\s*<\/div>/
    );
    expect(attention1Block).toBeDefined();

    const attention2Block = content.match(
      /class="attention-text">\{\{\s*i18n\.internship\.attention2\s*\}\}<\/span>\s*<div>[\s\S]*?<\/div>\s*<\/div>/
    );
    expect(attention2Block).toBeDefined();
  });

  it('SubmitTask.vue 中无 window/document 直接访问（SSR 安全）', () => {
    const templateAndScript = content.replace(/<style[\s\S]*<\/style>/, '');
    expect(templateAndScript).not.toMatch(/\bwindow\b/);
    expect(templateAndScript).not.toMatch(/\bdocument\b/);
  });
});

describe('SubmitTask.vue — 样式一致性（与 ReceiveTask/ApplyInternship 对比）', () => {
  let submitContent: string;
  let receiveContent: string;

  it('所有文件可读取', () => {
    submitContent = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    receiveContent = fs.readFileSync(RECEIVE_TASK_VUE, 'utf8');
  });

  it('SubmitTask 的 .contact 样式使用 var(--o-color-primary1)（与 ReceiveTask 一致）', () => {
    expect(submitContent).toContain('var(--o-color-primary1)');
    expect(receiveContent).toContain('var(--o-color-primary1)');
  });

  it('SubmitTask 的 .contact hover 使用 var(--o-color-primary2)（与 ReceiveTask 一致）', () => {
    expect(submitContent).toContain('var(--o-color-primary2)');
    expect(receiveContent).toContain('var(--o-color-primary2)');
  });

  it('SubmitTask 使用 OLink class="contact"（与 ReceiveTask 同模式）', () => {
    expect(submitContent).toMatch(/<OLink[^>]*class="contact"/);
    expect(receiveContent).toMatch(/<OLink[^>]*class="contact"/);
  });

  it('SubmitTask 不使用 :deep(.o-link) 穿透（避免 scoped 失效风险）', () => {
    expect(submitContent).not.toContain(':deep(.o-link)');
  });

  it('SubmitTask 的 .attention + .attention 间距规则存在', () => {
    expect(submitContent).toContain('.attention + .attention');
  });
});

describe('SubmitTask.vue — OLink 使用规范', () => {
  let content: string;

  it('文件可读取', () => {
    content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
  });

  it('OLink 从 @opensig/opendesign 导入（符合 AGENTS.md §红线第1条）', () => {
    expect(content.includes("import { OLink } from '@opensig/opendesign'")).toBe(true);
  });

  it('OLink 使用动态绑定 :href（非静态 href）', () => {
    expect(content).toMatch(/<OLink[^>]*:href=/);
  });

  it('OLink 设置 target="_blank"（外部链接新窗口打开）', () => {
    expect(content).toMatch(/<OLink[^>]*target="_blank"/);
  });
});

describe('i18n 单语确认 — internship 模块仅有 zh', () => {
  it('internship i18n 目录下仅有 internship-zh.ts 和 index.ts', () => {
    const i18nDir = path.join(PROJECT_ROOT, 'app/.vitepress/src/i18n/internship');
    const files = fs.readdirSync(i18nDir);
    expect(files.sort()).toEqual(['index.ts', 'internship-zh.ts']);
  });

  it('index.ts 仅导出 zh（无 en）', () => {
    const indexContent = fs.readFileSync(
      path.join(PROJECT_ROOT, 'app/.vitepress/src/i18n/internship/index.ts'),
      'utf8'
    );
    expect(indexContent).toContain('zh');
    expect(indexContent).not.toContain('en');
  });
});

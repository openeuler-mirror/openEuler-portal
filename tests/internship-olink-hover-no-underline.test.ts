import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const COMPONENTS_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/components'
);

const FILES = {
  submitTask: path.join(COMPONENTS_DIR, 'SubmitTask.vue'),
  salaryAndCertificate: path.join(COMPONENTS_DIR, 'SalaryAndCertificate.vue'),
  theActivityIntro: path.join(COMPONENTS_DIR, 'TheActivityIntro.vue'),
  receiveTask: path.join(COMPONENTS_DIR, 'ReceiveTask.vue'),
  theInternshipReward: path.join(COMPONENTS_DIR, 'TheInternshipReward.vue'),
  applyInternship: path.join(COMPONENTS_DIR, 'ApplyInternship.vue'),
};

function read(file: string): string {
  return fs.readFileSync(file, 'utf8');
}

/**
 * 工具:从源文件中提取所有 `&:hover { ... }` 块的文本(非贪婪匹配到下一个 `}`)。
 * 用于逐块断言 hover 块内是否含某条声明。仅匹配直接 `&:hover {` 形式,
 * 不匹配 `&:hover .xxx {` 复合选择器(那些不含 text-decoration,不在改动范围)。
 */
function extractHoverBlocks(source: string): string[] {
  const blocks: string[] = [];
  const regex = /&:hover\s*\{([^}]*)\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

/**
 * 工具:提取某选择器(如 `.o-link`)所在块体,做花括号平衡匹配。
 * 返回每个匹配选择器块的花括号内文本(含嵌套花括号块)。
 */
function extractSelectorBlocks(source: string, selector: string): string[] {
  const blocks: string[] = [];
  const escSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escSelector + '\\s*\\{', 'g');
  let m: RegExpExecArray | null;
  while ((m = regex.exec(source)) !== null) {
    const start = m.index! + m[0].length;
    let depth = 1;
    let i = start;
    for (; i < source.length && depth > 0; i++) {
      if (source[i] === '{') depth++;
      else if (source[i] === '}') depth--;
    }
    blocks.push(source.slice(start, i - 1));
  }
  return blocks;
}

describe('开源实习 OLink hover 下划线移除 — 文件存在性', () => {
  it('5 个改动组件文件均存在', () => {
    Object.values(FILES).forEach((f) => {
      expect(fs.existsSync(f), `${f} 应存在`).toBe(true);
    });
  });
});

describe('改动组件 — text-decoration: underline 已被删除(无下划线)', () => {
  const changedFiles: Array<[string, string]> = [
    ['SubmitTask.vue', FILES.submitTask],
    ['SalaryAndCertificate.vue', FILES.salaryAndCertificate],
    ['TheActivityIntro.vue', FILES.theActivityIntro],
    ['ReceiveTask.vue', FILES.receiveTask],
    ['TheInternshipReward.vue', FILES.theInternshipReward],
  ];

  changedFiles.forEach(([name, file]) => {
    it(`${name} 不含任何 text-decoration: underline 声明`, () => {
      const content = read(file);
      expect(
        content.includes('text-decoration: underline'),
        `${name} 不应再包含 text-decoration: underline`
      ).toBe(false);
    });

    it(`${name} 不含任何 text-decoration 声明(更严格,确认无残留)`, () => {
      const content = read(file);
      expect(
        content.includes('text-decoration'),
        `${name} 不应包含任何 text-decoration 声明`
      ).toBe(false);
    });
  });
});

describe('改动组件 — hover 变色反馈保留(color: var(--o-color-primary2) 仍在 hover 块内)', () => {
  const changedFiles: Array<[string, string]> = [
    ['SubmitTask.vue', FILES.submitTask],
    ['SalaryAndCertificate.vue', FILES.salaryAndCertificate],
    ['ReceiveTask.vue', FILES.receiveTask],
    ['TheInternshipReward.vue', FILES.theInternshipReward],
  ];

  changedFiles.forEach(([name, file]) => {
    it(`${name} 仍存在 &:hover 块`, () => {
      const content = read(file);
      expect(content.includes('&:hover')).toBe(true);
    });

    it(`${name} 至少一个 &:hover 块内含 color: var(--o-color-primary2)`, () => {
      const content = read(file);
      const hoverBlocks = extractHoverBlocks(content);
      expect(hoverBlocks.length, `${name} 应至少有 1 个 &:hover 块`).toBeGreaterThan(0);
      const hasColorHover = hoverBlocks.some((b) =>
        b.includes('color: var(--o-color-primary2)')
      );
      expect(
        hasColorHover,
        `${name} 应存在一个 &:hover 块保留 color: var(--o-color-primary2)`
      ).toBe(true);
    });

    it(`${name} 所有 &:hover 块均不含 text-decoration`, () => {
      const content = read(file);
      const hoverBlocks = extractHoverBlocks(content);
      hoverBlocks.forEach((block, idx) => {
        expect(
          block.includes('text-decoration'),
          `${name} 第 ${idx + 1} 个 &:hover 块不应含 text-decoration`
        ).toBe(false);
      });
    });
  });
});

describe('TheActivityIntro.vue — PC + 移动两处 .o-link hover 块分别覆盖', () => {
  it('TheActivityIntro.vue 含 2 个 .o-link 选择器块(PC 与移动断点各一)', () => {
    const content = read(FILES.theActivityIntro);
    const olinkBlocks = extractSelectorBlocks(content, '.o-link');
    expect(olinkBlocks.length, '应有 2 个 .o-link 选择器块').toBe(2);
  });

  it('TheActivityIntro.vue 2 个 .o-link 块均含 &:hover 子块', () => {
    const content = read(FILES.theActivityIntro);
    const olinkBlocks = extractSelectorBlocks(content, '.o-link');
    expect(olinkBlocks.length).toBe(2);
    olinkBlocks.forEach((block, idx) => {
      expect(
        block.includes('&:hover'),
        `第 ${idx + 1} 个 .o-link 块应含 &:hover 子选择器`
      ).toBe(true);
    });
  });

  it('TheActivityIntro.vue 2 个 .o-link 块的 &:hover 均保留 color: var(--o-color-primary2)', () => {
    const content = read(FILES.theActivityIntro);
    const olinkBlocks = extractSelectorBlocks(content, '.o-link');
    olinkBlocks.forEach((block, idx) => {
      const hovers = extractHoverBlocks(block);
      expect(hovers.length, `第 ${idx + 1} 个 .o-link 块应含 1 个 &:hover`).toBe(1);
      expect(
        hovers[0].includes('color: var(--o-color-primary2)'),
        `第 ${idx + 1} 个 .o-link 的 &:hover 应保留 color: var(--o-color-primary2)`
      ).toBe(true);
    });
  });

  it('TheActivityIntro.vue 2 个 .o-link 块的 &:hover 均不含 text-decoration', () => {
    const content = read(FILES.theActivityIntro);
    const olinkBlocks = extractSelectorBlocks(content, '.o-link');
    olinkBlocks.forEach((block, idx) => {
      const hovers = extractHoverBlocks(block);
      hovers.forEach((hoverBody) => {
        expect(
          hoverBody.includes('text-decoration'),
          `第 ${idx + 1} 个 .o-link 的 &:hover 不应含 text-decoration`
        ).toBe(false);
      });
    });
  });

  it('TheActivityIntro.vue 含移动端断点 respond mixin 或 @media(确认第二处为移动样式块)', () => {
    const content = read(FILES.theActivityIntro);
    expect(
      content.includes('@include respond') ||
        content.includes('respond(') ||
        content.includes('@media'),
      '应包含 respond mixin 或 @media 断点'
    ).toBe(true);
  });
});

describe('作用域隔离 — 5 个改动组件均为 <style scoped>', () => {
  const changedFiles: Array<[string, string]> = [
    ['SubmitTask.vue', FILES.submitTask],
    ['SalaryAndCertificate.vue', FILES.salaryAndCertificate],
    ['TheActivityIntro.vue', FILES.theActivityIntro],
    ['ReceiveTask.vue', FILES.receiveTask],
    ['TheInternshipReward.vue', FILES.theInternshipReward],
  ];

  changedFiles.forEach(([name, file]) => {
    it(`${name} 使用 <style scoped> 隔离(改动不泄漏到其他 OLink 页面)`, () => {
      const content = read(file);
      expect(
        content.includes('<style scoped') || content.includes('<style lang="scss" scoped'),
        `${name} 应使用 scoped 样式隔离`
      ).toBe(true);
    });
  });
});

describe('ApplyInternship.vue — 已补 :hover-underline 且本就无 text-decoration(回归确认)', () => {
  it('ApplyInternship.vue 不含 text-decoration: underline(本就无需删除)', () => {
    const content = read(FILES.applyInternship);
    expect(
      content.includes('text-decoration: underline'),
      'ApplyInternship.vue 不应含 text-decoration: underline'
    ).toBe(false);
  });

  it('ApplyInternship.vue 仍含 OLink 引用(确认本测试目标文件正确)', () => {
    const content = read(FILES.applyInternship);
    expect(content.includes('OLink')).toBe(true);
  });
});

describe('OLink hover 下划线禁用 — 实习页 OLink 均传 :hover-underline="false"', () => {
  // OLink 的 hoverUnderline prop 默认为 true,会通过 .o-link-label 上的
  // background 渐变(非 text-decoration)在 hover 时显示下划线。前轮仅删除
  // 局部 text-decoration: underline 无法去除该渐变下划线(维护者反馈"修改没有生效")。
  // 正确修复:对实习页所有 OLink 显式传 :hover-underline="false" 关闭组件默认下划线。
  it('含 OLink 的 6 个组件均传 :hover-underline="false"', () => {
    const filesWithOLink: Array<[string, string]> = [
      ['SubmitTask.vue', FILES.submitTask],
      ['SalaryAndCertificate.vue', FILES.salaryAndCertificate],
      ['TheActivityIntro.vue', FILES.theActivityIntro],
      ['ReceiveTask.vue', FILES.receiveTask],
      ['TheInternshipReward.vue', FILES.theInternshipReward],
      ['ApplyInternship.vue', FILES.applyInternship],
    ];
    filesWithOLink.forEach(([name, file]) => {
      const content = read(file);
      expect(
        content.includes(':hover-underline="false"'),
        `${name} 的 OLink 应传 :hover-underline="false" 以禁用组件默认渐变下划线`
      ).toBe(true);
    });
  });

  it('实习页所有 <OLink> 标签均传 :hover-underline="false"(逐个标签断言,无遗漏)', () => {
    const files = fs
      .readdirSync(COMPONENTS_DIR)
      .filter((f) => f.endsWith('.vue'))
      .map((f) => path.join(COMPONENTS_DIR, f));
    const missing: string[] = [];
    for (const f of files) {
      const content = read(f);
      const olinkTags = content.match(/<OLink\b[^>]*>/g) || [];
      if (olinkTags.length > 0) {
        const allDisabled = olinkTags.every((tag) =>
          tag.includes(':hover-underline="false"')
        );
        if (!allDisabled) {
          missing.push(path.basename(f));
        }
      }
    }
    expect(
      missing,
      `以下组件存在未传 :hover-underline="false" 的 OLink:${missing.join(', ')}`
    ).toEqual([]);
  });
});

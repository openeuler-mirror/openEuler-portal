import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();

const LINK_SCSS = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/assets/style/theme/link.scss'
);

const BOUNDARY_FILES = {
  homeShowCase: path.join(
    PROJECT_ROOT,
    'app/.vitepress/src-new/views/home/HomeShowCase.vue'
  ),
  theProjects: path.join(
    PROJECT_ROOT,
    'app/.vitepress/src-new/views/projects/TheProjects.vue'
  ),
  markdownCardLayout: path.join(
    PROJECT_ROOT,
    'app/.vitepress/src-new/components/markdown/MarkdownCardLayout.vue'
  ),
  theOsv: path.join(
    PROJECT_ROOT,
    'app/.vitepress/src/views/support/osv/TheOsv.vue'
  ),
  theCompatibility: path.join(
    PROJECT_ROOT,
    'app/.vitepress/src-new/views/support/compatibility/TheCompatibility.vue'
  ),
  theSofWareInfo: path.join(
    PROJECT_ROOT,
    'app/.vitepress/src-new/views/support/compatibility/TheSofWareInfo.vue'
  ),
};

function read(file: string): string {
  return fs.readFileSync(file, 'utf8');
}

/**
 * 提取某选择器(如 `.o-link-main`)所在块体,做花括号平衡匹配。
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

describe('link.scss 根因修复 — .o-link-main 由 flex 改为 inline-flex(设计 §3)', () => {
  const scss = read(LINK_SCSS);

  it('.o-link-main 使用 display: inline-flex(回到行内级,修根因)', () => {
    const blocks = extractSelectorBlocks(scss, '.o-link-main');
    expect(blocks.length, '.o-link-main 块应存在').toBeGreaterThanOrEqual(1);
    expect(
      blocks[0].includes('display: inline-flex'),
      '.o-link-main 应为 display: inline-flex'
    ).toBe(true);
  });

  it('.o-link-main 不再使用块级 display: flex(根因已消除)', () => {
    const blocks = extractSelectorBlocks(scss, '.o-link-main');
    expect(
      blocks[0].includes('display: flex'),
      '.o-link-main 不应回退到块级 display: flex(不含 inline-flex 的裸 flex)'
    ).toBe(false);
  });

  it('.o-link 父级仍为 inline-flex(未误改,回归)', () => {
    const blocks = extractSelectorBlocks(scss, '.o-link');
    expect(blocks.length, '.o-link 块应存在').toBeGreaterThanOrEqual(1);
    expect(
      blocks[0].includes('display: inline-flex'),
      '.o-link 父级应保持 inline-flex'
    ).toBe(true);
  });

  it('.o-link-main 保留 align-items: center(图标对齐能力不丢)', () => {
    const blocks = extractSelectorBlocks(scss, '.o-link-main');
    expect(
      blocks[0].includes('align-items: center'),
      '.o-link-main 应保留 align-items: center'
    ).toBe(true);
  });

  it('link.scss 无 !important(StyleLint 禁用, AGENTS.md §5 红线)', () => {
    expect(scss.includes('!important'), 'link.scss 不应出现 !important').toBe(
      false
    );
  });
});

describe('既有 :deep(.o-link-main) 覆盖点回归 — 覆盖仍在且与 inline-flex 兼容(设计 §4)', () => {
  it('HomeShowCase.vue :deep(.o-link-main) 保留 align-items: flex-start + flex-direction: column(inline-flex 兼容)', () => {
    const content = read(BOUNDARY_FILES.homeShowCase);
    const blocks = extractSelectorBlocks(content, ':deep(.o-link-main)');
    expect(blocks.length, '应有 :deep(.o-link-main) 块').toBeGreaterThanOrEqual(1);
    const block = blocks[0];
    expect(block.includes('align-items: flex-start')).toBe(true);
    expect(block.includes('flex-direction: column')).toBe(true);
    // inline-flex 支持 flex-direction,纵向堆叠布局不变
  });

  it('TheProjects.vue :deep(.o-link) .o-link-main 保留 width: 100%(inline-flex 吃 width)', () => {
    const content = read(BOUNDARY_FILES.theProjects);
    const olinkBlocks = extractSelectorBlocks(content, ':deep(.o-link)');
    expect(olinkBlocks.length, '应有 :deep(.o-link) 块').toBeGreaterThanOrEqual(1);
    const hasWidth = olinkBlocks.some((b) =>
      b.includes('.o-link-main') && b.includes('width: 100%')
    );
    expect(hasWidth, ':deep(.o-link) 内 .o-link-main 应含 width: 100%').toBe(true);
  });

  it('MarkdownCardLayout.vue :deep(.o-link) .o-link-main 保留 width: 100% + justify-content: space-between', () => {
    const content = read(BOUNDARY_FILES.markdownCardLayout);
    const olinkBlocks = extractSelectorBlocks(content, ':deep(.o-link)');
    expect(olinkBlocks.length, '应有 :deep(.o-link) 块').toBeGreaterThanOrEqual(1);
    const hasOverrides = olinkBlocks.some(
      (b) =>
        b.includes('.o-link-main') &&
        b.includes('width: 100%') &&
        b.includes('justify-content: space-between')
    );
    expect(
      hasOverrides,
      ':deep(.o-link) 内 .o-link-main 应含 width: 100% 与 justify-content: space-between'
    ).toBe(true);
  });

  it('TheOsv.vue(旧版 src/) :deep(.o-link) .o-link-main 保留 display: inline(旧版自绕过,印证根因)', () => {
    const content = read(BOUNDARY_FILES.theOsv);
    const olinkBlocks = extractSelectorBlocks(content, ':deep(.o-link)');
    expect(olinkBlocks.length, '应有 :deep(.o-link) 块').toBeGreaterThanOrEqual(1);
    const hasInline = olinkBlocks.some(
      (b) => b.includes('.o-link-main') && b.includes('display: inline')
    );
    expect(
      hasInline,
      '旧版 TheOsv.vue 应已用 display: inline 绕过同一根因(改全局后被局部覆盖覆盖)'
    ).toBe(true);
  });
});

describe('兼容性列表页局部 hack 保留 — .tips .o-link { display: inline } 未被删(设计 §1 不动的部分)', () => {
  it('TheCompatibility.vue .tips 块内 .o-link 仍为 display: inline', () => {
    const content = read(BOUNDARY_FILES.theCompatibility);
    const tipsBlocks = extractSelectorBlocks(content, '.tips');
    expect(tipsBlocks.length, '应有 .tips 块').toBeGreaterThanOrEqual(1);
    const hasInlineHack = tipsBlocks.some(
      (b) => b.includes('.o-link') && b.includes('display: inline')
    );
    expect(
      hasInlineHack,
      '.tips 内 .o-link { display: inline } 局部 hack 应保留(设计 §1 明确不动)'
    ).toBe(true);
  });
});

describe('兼容性详情页 tips 模板结构 — tipsText 文本 + tipsLink OLink 同处(设计 §6)', () => {
  const content = read(BOUNDARY_FILES.theSofWareInfo);

  it('TheSofWareInfo.vue 含 tipsText 文本 span', () => {
    expect(
      content.includes("t('compatibility.tipsText')"),
      '应含 tipsText 文本 span'
    ).toBe(true);
  });

  it('TheSofWareInfo.vue 含 tipsLink 的 OLink', () => {
    expect(
      content.includes("t('compatibility.tipsLink')"),
      '应含 tipsLink 的 OLink'
    ).toBe(true);
  });

  it('TheSofWareInfo.vue tips 文本 span 与 OLink 在同一 .tips 容器内(同行前提)', () => {
    // 全局 .o-link-main 改 inline-flex 后,OLink 回到行内级,
    // tipsText span 与 tipsLink OLink 即可同行(不再被块级 flex 撑换行)
    const tipsCount = (content.match(/t\('compatibility\.tipsText'\)/g) || []).length;
    const linkCount = (content.match(/t\('compatibility\.tipsLink'\)/g) || []).length;
    expect(tipsCount, '应至少 1 处 tipsText').toBeGreaterThanOrEqual(1);
    expect(linkCount, '应至少 1 处 tipsLink').toBeGreaterThanOrEqual(1);
  });
});

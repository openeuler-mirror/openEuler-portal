import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const APP_FOOTER_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/components/AppFooter.vue'
);
const FOOTER_DATA = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/data/footer/index.ts'
);

const RAW = fs.readFileSync(APP_FOOTER_VUE, 'utf8');

/**
 * 从 SCSS 源码中按选择器抽取规则块（含嵌套）。
 * 选择器行形如 `    .link {`，返回从该行起到同缩进闭合 `}` 的整段文本。
 */
function extractRuleBlock(src: string, selector: string): string {
  const lines = src.split('\n');
  const startIdx = lines.findIndex((l) => {
    const trimmed = l.trim();
    return trimmed.startsWith(selector + ' {') || trimmed === selector + ' {';
  });
  expect(startIdx, `选择器 "${selector}" 应存在于 AppFooter.vue`).toBeGreaterThan(-1);

  const indent = lines[startIdx].match(/^(\s*)/)?.[1].length ?? 0;
  const closeLine = `${' '.repeat(indent)}}`;
  let endIdx = -1;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i] === closeLine) {
      endIdx = i;
      break;
    }
  }
  expect(endIdx, `"${selector}" 块应有同缩进闭合 }`).toBeGreaterThan(-1);
  return lines.slice(startIdx, endIdx + 1).join('\n');
}

describe('AppFooter.vue .link 默认/hover 颜色（设计 §3 关键改动）', () => {
  const linkBlock = extractRuleBlock(RAW, '.link');

  it('.link 默认态 color 为 rgba(255, 255, 255, 0.6)（60% 白）', () => {
    expect(
      linkBlock.includes('color: rgba(255, 255, 255, 0.6)'),
      '默认态应压暗为 60% 白'
    ).toBe(true);
  });

  it('.link hover 态 color 为 rgba(255, 255, 255, 1)（纯白）', () => {
    expect(
      linkBlock.includes('color: rgba(255, 255, 255, 1)'),
      'hover 态应切纯白'
    ).toBe(true);
  });

  it('.link 不再使用纯白 $color 变量（默认/hover 有区分, 非回归）', () => {
    expect(
      linkBlock.includes('color: $color'),
      '.link 不应回退到 color: $color（#fff 纯白, 无 hover 区分）'
    ).toBe(false);
  });

  it('.link 默认 0.6 与 hover 1.0 有明显亮度区分（设计 §5 视觉用例）', () => {
    const defaultMatch = linkBlock.match(/rgba\(255,\s*255,\s*255,\s*0?\.?6\)/);
    const hoverMatch = linkBlock.match(/rgba\(255,\s*255,\s*255,\s*1\)/);
    expect(defaultMatch, '默认态应含 0.6 alpha').not.toBeNull();
    expect(hoverMatch, 'hover 态应含 1 alpha').not.toBeNull();
  });
});

describe('AppFooter.vue .link 使用项目 hover mixin（AGENTS.md §5 红线 / 样式规范）', () => {
  const linkBlock = extractRuleBlock(RAW, '.link');

  it('.link 使用 @include hover 而非裸 &:hover（项目约定）', () => {
    expect(
      linkBlock.includes('@include hover'),
      '应使用 @include hover mixin'
    ).toBe(true);
    expect(
      linkBlock.includes('&:hover'),
      '不应使用裸 &:hover（与同文件其他暗底链接不一致）'
    ).toBe(false);
  });

  it('.link 规则无 !important（StyleLint 禁用, AGENTS.md §6）', () => {
    expect(
      linkBlock.includes('!important'),
      '.link 不应出现 !important'
    ).toBe(false);
  });

  it('.link 规则嵌套层级 ≤ 3（StyleLint 禁超 3 层）', () => {
    const lines = RAW.split('\n');
    const startIdx = lines.findIndex((l) => l.trim().startsWith('.link {'));
    expect(startIdx).toBeGreaterThan(-1);
    let depth = 0;
    let maxDepth = 0;
    for (let i = startIdx; i < lines.length; i++) {
      const opens = (lines[i].match(/{/g) || []).length;
      const closes = (lines[i].match(/}/g) || []).length;
      depth += opens - closes;
      if (depth > maxDepth) maxDepth = depth;
      if (depth === 0 && i > startIdx) break;
    }
    // .link 自身 1 层 + @include hover 1 层 = 2 层,允许 ≤ 3
    expect(maxDepth, `.link 块最大嵌套 ${maxDepth} 应 ≤ 3`).toBeLessThanOrEqual(3);
  });
});

describe('AppFooter.vue 暗底链接模式对齐（设计 §3 / §4 边界）', () => {
  const linkBlock = extractRuleBlock(RAW, '.link');
  const navABlock = extractRuleBlock(RAW, 'a'); // .nav a 块（首个 a 选择器）
  const friendshipBlock = extractRuleBlock(RAW, '.friendship-link-item');
  const filingLinkBlock = extractRuleBlock(RAW, '.filing-link');

  const DEFAULT = 'rgba(255, 255, 255, 0.6)';
  const HOVER = 'rgba(255, 255, 255, 1)';

  it('.link / .nav a / .friendship-link-item / .filing-link 四处默认态均 60% 白', () => {
    expect(linkBlock.includes(DEFAULT), '.link 默认态').toBe(true);
    expect(navABlock.includes(DEFAULT), '.nav a 默认态').toBe(true);
    expect(friendshipBlock.includes(DEFAULT), '.friendship-link-item 默认态').toBe(true);
    expect(filingLinkBlock.includes(DEFAULT), '.filing-link 默认态').toBe(true);
  });

  it('四处 hover 态均切纯白（@include hover）', () => {
    expect(linkBlock.includes(HOVER), '.link hover 态').toBe(true);
    expect(navABlock.includes(HOVER), '.nav a hover 态').toBe(true);
    expect(friendshipBlock.includes(HOVER), '.friendship-link-item hover 态').toBe(true);
    expect(filingLinkBlock.includes(HOVER), '.filing-link hover 态').toBe(true);
  });

  it('.link 与 .friendship-link-item 的 rgba-white 默认/hover 颜色序列一致', () => {
    // 仅抽取 color 声明行（忽略 white-space / display / 嵌套结构差异）
    const colorLines = (blk: string) =>
      blk
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.startsWith('color:'));

    const linkColors = colorLines(linkBlock);
    const friendColors = colorLines(friendshipBlock);
    expect(linkColors, '.link 与 .friendship-link-item 的 color 声明应一致').toEqual(
      friendColors
    );
  });
});

describe('AppFooter.vue footer 恒暗表面（设计 §4 边界 — 主题 token 例外依据）', () => {
  it('footer 背景硬编码为 #121214（恒暗,与主题切换无关）', () => {
    expect(
      RAW.includes('background: #121214'),
      'footer 应为恒暗背景 #121214'
    ).toBe(true);
  });

  it('footer 背景无 [data-o-theme="dark"] 覆盖（恒暗非主题相关）', () => {
    expect(
      /\[data-o-theme=["']dark["']\]/.test(RAW),
      'footer 不应有 dark 主题覆盖（恒暗表面例外）'
    ).toBe(false);
  });
});

describe('AppFooter.vue .link 作用域（设计 §3 — 仅影响 footer-option 内四按钮）', () => {
  it('.link 规则位于 .footer-option 块内', () => {
    const lines = RAW.split('\n');
    const footerOptionIdx = lines.findIndex((l) => l.trim().startsWith('.footer-option {'));
    const linkIdx = lines.findIndex((l) => l.trim().startsWith('.link {'));
    expect(footerOptionIdx, '.footer-option 块应存在').toBeGreaterThan(-1);
    expect(linkIdx, '.link 块应在 .footer-option 之后').toBeGreaterThan(footerOptionIdx);
  });

  it('.link 对应模板渲染 4 个文本按钮（class="link"）', () => {
    const templateMatch = RAW.match(/<a\s+:target="target"\s+:href="link\.URL"\s+class="link"/);
    expect(templateMatch, '模板应有 <a class="link"> 渲染').not.toBeNull();
  });
});

describe('linksData2 四按钮 i18n 双语同步（设计 §4 边界 / AGENTS.md §5 红线#7）', () => {
  const dataRaw = fs.readFileSync(FOOTER_DATA, 'utf8');
  // 先定位 linksData2 对象块（文件中存在多个 zh:/en: 数组,须限定作用域）
  const linksData2Match = dataRaw.match(/export const linksData2 = \{([\s\S]*?)\};/);
  expect(linksData2Match, 'linksData2 对象应存在').not.toBeNull();
  const linksData2Body = linksData2Match![1];

  it('zh 含 4 条链接（品牌/隐私声明/法律声明/关于cookies）', () => {
    const zhBlock = linksData2Body.match(/zh:\s*\[([\s\S]*?)\]/);
    expect(zhBlock, 'linksData2.zh 应为数组').not.toBeNull();
    const zhContent = zhBlock![1];
    expect(zhContent.match(/NAME:\s*'品牌'/), '品牌').not.toBeNull();
    expect(zhContent.match(/NAME:\s*'隐私声明'/), '隐私声明').not.toBeNull();
    expect(zhContent.match(/NAME:\s*'法律声明'/), '法律声明').not.toBeNull();
    expect(zhContent.match(/NAME:\s*'关于cookies'/), '关于cookies').not.toBeNull();
  });

  it('en 含 4 条链接（Trademark/Privacy Statement/Legal Notice/About Cookies）', () => {
    const enBlock = linksData2Body.match(/en:\s*\[([\s\S]*?)\]/);
    expect(enBlock, 'linksData2.en 应为数组').not.toBeNull();
    const enContent = enBlock![1];
    expect(enContent.match(/NAME:\s*'Trademark'/), 'Trademark').not.toBeNull();
    expect(enContent.match(/NAME:\s*'Privacy Statement'/), 'Privacy Statement').not.toBeNull();
    expect(enContent.match(/NAME:\s*'Legal Notice'/), 'Legal Notice').not.toBeNull();
    expect(enContent.match(/NAME:\s*'About Cookies'/), 'About Cookies').not.toBeNull();
  });

  it('zh 与 en 链接数一致（各 4 条）', () => {
    const zhBlock = linksData2Body.match(/zh:\s*\[([\s\S]*?)\]/)!;
    const enBlock = linksData2Body.match(/en:\s*\[([\s\S]*?)\]/)!;
    const zhCount = (zhBlock[1].match(/NAME:/g) || []).length;
    const enCount = (enBlock[1].match(/NAME:/g) || []).length;
    expect(zhCount, 'zh 应有 4 条').toBe(4);
    expect(enCount, 'en 应有 4 条').toBe(4);
    expect(zhCount, 'zh/en 链接数应一致').toBe(enCount);
  });
});

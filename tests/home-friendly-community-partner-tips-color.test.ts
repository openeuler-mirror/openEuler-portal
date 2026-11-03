import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const COMPONENT = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/home/HomeFriendlyCommunity.vue'
);

const RAW = fs.readFileSync(COMPONENT, 'utf8');

/**
 * 提取某选择器(如 `.partner-tips`)所在块体,做花括号平衡匹配。
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

describe('HomeFriendlyCommunity.vue .partner-tips 颜色规则(设计 §3 关键改动)', () => {
  it('.partner-tips 块存在且声明 color: var(--o-color-info2)', () => {
    const blocks = extractSelectorBlocks(RAW, '.partner-tips');
    expect(blocks.length, '.partner-tips 样式块应存在').toBeGreaterThanOrEqual(1);
    expect(
      blocks.some((b) => /color:\s*var\(--o-color-info2\)/.test(b)),
      '.partner-tips 应声明 color: var(--o-color-info2)(次文本色 token)'
    ).toBe(true);
  });

  it('.partner-tips 不使用硬编码颜色值(rules/styling.md §禁止事项)', () => {
    const blocks = extractSelectorBlocks(RAW, '.partner-tips');
    expect(blocks.length).toBeGreaterThanOrEqual(1);
    const hardcode = /#[0-9a-fA-F]{3,8}\b|rgb\(|rgba\(|hsl\(|hsla\(/;
    expect(
      blocks.some((b) => hardcode.test(b)),
      '.partner-tips 不应出现硬编码颜色(应统一用 CSS 变量)'
    ).toBe(false);
  });

  it('.partner-tips 规则无 !important(StyleLint 禁用, AGENTS.md §6)', () => {
    const blocks = extractSelectorBlocks(RAW, '.partner-tips');
    expect(blocks.length).toBeGreaterThanOrEqual(1);
    expect(
      blocks.some((b) => b.includes('!important')),
      '.partner-tips 不应出现 !important'
    ).toBe(false);
  });
});

describe('HomeFriendlyCommunity.vue 作用域与目标元素(设计 §1 边界)', () => {
  it('<style> 为 scoped,不泄漏到 intelligenceMember.vue 同名 .partner-tips', () => {
    const styleTagMatch = RAW.match(/<style[^>]*>/);
    expect(styleTagMatch, '应存在 <style> 标签').not.toBeNull();
    expect(
      styleTagMatch![0].includes('scoped'),
      '<style> 应带 scoped(同名单类不跨组件污染)'
    ).toBe(true);
  });

  it('模板渲染 <p class="partner-tips"> 绑定 $t(home.sortTips)(目标元素确认)', () => {
    expect(
      RAW.includes('class="partner-tips"'),
      '模板应有 class="partner-tips" 元素'
    ).toBe(true);
    expect(
      RAW.includes("$t('home.sortTips')"),
      '.partner-tips 应绑定 i18n 键 home.sortTips'
    ).toBe(true);
  });
});

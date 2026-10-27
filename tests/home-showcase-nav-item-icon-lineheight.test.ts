import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const filePath = resolve(
  __dirname,
  '../app/.vitepress/src-new/views/home/HomeShowCase.vue'
);
const content = readFileSync(filePath, 'utf-8');

/**
 * 工具:提取某选择器(如 `.nav-item-icon`)所在块体,做花括号平衡匹配,
 * 返回每个匹配选择器块的花括号内文本(含嵌套花括号块,如 @include respond(...) { ... })。
 * 复用自 internship-olink-hover-no-underline.test.ts 同名工具,因 .nav-item-icon
 * 块内含 @include respond 嵌套花括号,非贪婪 [^}]* 无法正确匹配。
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

// 文件内 .nav-item-icon 选择器可能出现多次(主样式块 + phone 端 display:none 块),
// 仅主样式块含 `@include h2`,据此定位本次改动的目标块。
const navItemIconBlocks = extractSelectorBlocks(content, '.nav-item-icon');
const mainBlock =
  navItemIconBlocks.find((b) => b.includes('@include h2')) ?? '';

describe('HomeShowCase.vue .nav-item-icon — line-height 塌缩修复(icon 与文案垂直居中)', () => {
  it('文件存在且含 .nav-item-icon 选择器块', () => {
    expect(content.includes('.nav-item-icon')).toBe(true);
    expect(navItemIconBlocks.length).toBeGreaterThan(0);
  });

  it('改动目标为含 @include h2 的主样式块(已定位)', () => {
    expect(mainBlock, '应存在含 @include h2 的 .nav-item-icon 块').not.toBe('');
  });

  it('保留 @include h2(取其响应式 font-size 作图标尺寸 token,不删 mixin)', () => {
    expect(mainBlock).toMatch(/@include\s+h2\s*;/);
  });

  it('主样式块含 line-height: 1(unitless,塌缩行盒)', () => {
    expect(mainBlock).toMatch(/line-height:\s*1\s*;/);
  });

  it('主样式块不含硬编码像素 line-height(符合 rules/styling.md 禁硬编码)', () => {
    expect(mainBlock).not.toMatch(/line-height:\s*\d+(\.\d+)?px/);
  });

  it('主样式块不含 !important(符合 rules/styling.md 禁 !important)', () => {
    expect(mainBlock).not.toMatch(/!important/);
  });

  it('laptop 断点覆写 line-height: 1(@include respond(laptop))', () => {
    expect(mainBlock).toMatch(
      /@include\s+respond\(\s*['"]laptop['"]\s*\)\s*\{[^}]*line-height:\s*1\s*;/
    );
  });

  it('pad_h 断点覆写 line-height: 1(@include respond(pad_h))', () => {
    expect(mainBlock).toMatch(
      /@include\s+respond\(\s*['"]pad_h['"]\s*\)\s*\{[^}]*line-height:\s*1\s*;/
    );
  });

  it('pad_v 断点覆写 line-height: 1(@include respond(pad_v))', () => {
    expect(mainBlock).toMatch(
      /@include\s+respond\(\s*['"]pad_v['"]\s*\)\s*\{[^}]*line-height:\s*1\s*;/
    );
  });

  it('line-height: 1 在主样式块共出现 4 次(desktop + laptop + pad_h + pad_v,缺一即在该断点复现 bug)', () => {
    const matches = mainBlock.match(/line-height:\s*1\s*;/g);
    expect(matches, '应有 4 处 line-height: 1(各可见断点均需覆写)').not.toBeNull();
    expect(matches!.length).toBe(4);
  });

  it('主样式块内所有 line-height 声明值均为 1(无其它行高值残留)', () => {
    const allLineHeights = mainBlock.match(/line-height:\s*([^;]+);/g) || [];
    expect(allLineHeights.length).toBeGreaterThan(0);
    allLineHeights.forEach((decl, idx) => {
      expect(
        decl,
        `第 ${idx + 1} 处 line-height 声明应为 1,实际为:${decl}`
      ).toMatch(/line-height:\s*1\s*;/);
    });
  });
});

describe('HomeShowCase.vue — 作用域隔离(改动不泄漏到其它页面)', () => {
  it('使用 <style scoped> 隔离(不波及 TheShowCase.vue 等同名 class 页面)', () => {
    expect(
      content.includes('<style scoped') ||
        content.includes('<style lang="scss" scoped'),
      'HomeShowCase.vue 应使用 scoped 样式隔离'
    ).toBe(true);
  });
});

describe('HomeShowCase.vue — 暗色主题与断点作用域(设计 §3)', () => {
  const darkBlocks = extractSelectorBlocks(content, "[data-o-theme='e.dark']");
  const darkBlock = darkBlocks[0] ?? '';

  it('存在 [data-o-theme="e.dark"] 暗色主题块', () => {
    expect(darkBlock, '应存在暗色主题块').not.toBe('');
  });

  it('暗色主题块不复声明 .nav-item-icon(基线 line-height:1 修复自动覆盖暗色,两套主题对齐一致)', () => {
    expect(
      darkBlock.includes('.nav-item-icon'),
      '暗色块不应重声明 .nav-item-icon,否则会覆盖基线 line-height:1 修复'
    ).toBe(false);
  });

  it('max-width:700px 块内 .nav-item-icon 为 display:none(icon 隐藏,line-height 修复对该断点无影响)', () => {
    const mediaBlocks = extractSelectorBlocks(
      content,
      '@media screen and (max-width: 700px)'
    );
    expect(mediaBlocks.length, '应存在 max-width:700px 媒体块').toBeGreaterThan(
      0
    );
    const iconInMobile = extractSelectorBlocks(
      mediaBlocks[0],
      '.nav-item-icon'
    );
    expect(
      iconInMobile.length,
      '700px 块内应有 .nav-item-icon 声明'
    ).toBeGreaterThan(0);
    expect(iconInMobile[0]).toMatch(/display:\s*none/);
    expect(
      iconInMobile[0].match(/line-height/),
      '700px 块内 .nav-item-icon 不应设 line-height(icon 已隐藏)'
    ).toBeNull();
  });
});

describe('HomeShowCase.vue — 模板绑定与垂直居中机制(设计 §0/§3)', () => {
  it('模板使用 OIcon 组件承载 nav-item-icon(其 .o-icon{line-height:1} 库内基线即本次修复目标)', () => {
    expect(content).toMatch(/<OIcon[^>]*class="nav-item-icon"/);
  });

  it('.item-tab 主块设 align-items:center(icon 行盒塌缩后在此上下文与文案垂直居中)', () => {
    const itemTabBlocks = extractSelectorBlocks(content, '.item-tab');
    const mainItemTab = itemTabBlocks.find((b) => b.includes('align-items')) ?? '';
    expect(mainItemTab, '应存在含 align-items 的 .item-tab 主块').not.toBe('');
    expect(mainItemTab).toMatch(/align-items:\s*center/);
  });
});

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();

const DOWNLOAD_GET_OS = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/download/DownloadGetOs.vue'
);

function read(file: string): string {
  return fs.readFileSync(file, 'utf8');
}

/**
 * 背景：@opendesign-plus/components 通过 theme/index.ts 的
 * `import '@opendesign-plus/components/styles'` 向全局注入了工具类
 * `.grid-container { width: 100vw; max-width: 1920px; margin: 0 auto;
 *   padding-left/right: var(--grid--layout-padding) }`（源自
 * @opendesign-plus/styles 的 dist/mixin/grid.scss，无 scoped 限制）。
 *
 * DownloadGetOs.vue 曾将局部网格类命名为同名 `grid-container`，
 * 导致全局规则的 padding-left/right（PC 端 64px / laptop 40px）、
 * width/max-width/margin 泄漏进【其他获取方式】楼层，网格被挤压、
 * 与左侧 get-os-intro 错位。故重命名为 `links-grid` 以彻底解耦。
 */
describe('download 页【其他获取方式】类名与设计系统全局工具类解耦', () => {
  const content = read(DOWNLOAD_GET_OS);

  it('DownloadGetOs.vue 不再使用 grid-container 类名（避免命中 @opendesign-plus 全局工具类）', () => {
    expect(
      content.includes('grid-container'),
      '不应再出现 grid-container 类名：@opendesign-plus/components/styles 在全局注入了同名工具类（padding: var(--grid--layout-padding) 等），同名会泄漏样式'
    ).toBe(false);
  });

  it('模板使用 links-grid 作为网格容器类名', () => {
    expect(content.includes('class="links-grid"')).toBe(true);
  });

  it('模板与样式引用一致：links-grid 样式规则存在', () => {
    const styleMatches = content.match(/\.links-grid\s*\{/g) || [];
    expect(styleMatches.length, '样式块中 .links-grid 规则应存在').toBeGreaterThanOrEqual(1);
  });

  it('模板与样式引用一致：模板中的 links-grid 无悬空样式引用（模板类名均在样式中定义）', () => {
    const templateHasGrid = content.includes('class="links-grid"');
    const styleHasGrid = (content.match(/\.links-grid\s*\{/g) || []).length > 0;
    expect(templateHasGrid && styleHasGrid).toBe(true);
  });
});

describe('设计系统全局工具类仍存在（印证冲突来源，供后续维护者理解上下文）', () => {
  const componentsCss = path.join(
    PROJECT_ROOT,
    'node_modules/@opendesign-plus/components/dist/components.css'
  );

  it('@opendesign-plus/components/dist/components.css 含全局 .grid-container 工具类', () => {
    if (!fs.existsSync(componentsCss)) {
      // 依赖未安装时跳过（CI 环境差异），不阻塞
      return;
    }
    const css = read(componentsCss);
    expect(css.includes('.grid-container{')).toBe(true);
    expect(
      css.includes('padding-left:var(--grid--layout-padding)'),
      '全局工具类应含 --grid--layout-padding 的 padding（冲突的直接来源）'
    ).toBe(true);
  });

  it('theme/index.ts 引入 @opendesign-plus/components/styles（全局注入入口，勿随意移除）', () => {
    const themeIndex = path.join(PROJECT_ROOT, 'app/.vitepress/theme/index.ts');
    const theme = read(themeIndex);
    expect(theme.includes("@opendesign-plus/components/styles")).toBe(true);
  });
});

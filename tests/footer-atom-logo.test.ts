import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const SRC_NEW_FOOTER = path.join(PROJECT_ROOT, 'app/.vitepress/src-new/assets/category/footer');
const OLD_SRC_FOOTER = path.join(PROJECT_ROOT, 'app/.vitepress/src/assets/common/footer');
const ATOM_LOGO_PNG = path.join(SRC_NEW_FOOTER, 'atom-logo.png');
const ATOM_LOGO_SVG_SRC_NEW = path.join(SRC_NEW_FOOTER, 'atom-logo.svg');
const ATOM_LOGO_PNG_OLD = path.join(OLD_SRC_FOOTER, 'atom-logo.png');
const ATOM_LOGO_SVG_OLD = path.join(OLD_SRC_FOOTER, 'atom-logo.svg');
const APP_FOOTER_VUE = path.join(PROJECT_ROOT, 'app/.vitepress/src-new/components/AppFooter.vue');

function readPngDimensions(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  expect(buf[0], 'PNG signature byte 0').toBe(0x89);
  expect(buf[1], 'PNG signature byte 1').toBe(0x50);
  expect(buf[2], 'PNG signature byte 2').toBe(0x4e);
  expect(buf[3], 'PNG signature byte 3').toBe(0x47);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

describe('atom-logo.png 新版图片 — 文件有效性', () => {
  it('atom-logo.png 文件存在且非空', () => {
    expect(fs.existsSync(ATOM_LOGO_PNG), 'src-new 下 atom-logo.png 应存在').toBe(true);
    const stat = fs.statSync(ATOM_LOGO_PNG);
    expect(stat.size, 'atom-logo.png 文件大小应大于 0').toBeGreaterThan(0);
  });

  it('atom-logo.png 是合法 PNG 格式(PNG 签名校验)', () => {
    const buf = fs.readFileSync(ATOM_LOGO_PNG);
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
  });

  it('atom-logo.png IHDR colorType 合法(非 JPEG 伪装)', () => {
    const buf = fs.readFileSync(ATOM_LOGO_PNG);
    const ihdrColorType = buf[25];
    expect(
      [0, 2, 3, 4, 6].includes(ihdrColorType),
      `IHDR colorType=${ihdrColorType} 应为合法 PNG 类型`
    ).toBe(true);
  });

  it('atom-logo.png 文件大小合理(1KB~200KB)', () => {
    const stat = fs.statSync(ATOM_LOGO_PNG);
    expect(stat.size, 'atom-logo.png 应 ≥ 1KB').toBeGreaterThanOrEqual(1024);
    expect(stat.size, 'atom-logo.png 应 ≤ 200KB(Logo 不应过大)').toBeLessThanOrEqual(200 * 1024);
  });
});

describe('atom-logo.png 新版图片 — 尺寸校验', () => {
  it('atom-logo.png 尺寸为正整数(非 0×0)', () => {
    const dims = readPngDimensions(ATOM_LOGO_PNG);
    expect(dims.width, 'width 应 > 0').toBeGreaterThan(0);
    expect(dims.height, 'height 应 > 0').toBeGreaterThan(0);
  });

  it('atom-logo.png 尺寸约为 323×64(新版横向 Logo)', () => {
    const dims = readPngDimensions(ATOM_LOGO_PNG);
    expect(dims.width, `width=${dims.width} 应接近 323(±5)`).toBeGreaterThanOrEqual(318);
    expect(dims.width, `width=${dims.width} 应接近 323(±5)`).toBeLessThanOrEqual(328);
    expect(dims.height, `height=${dims.height} 应接近 64(±5)`).toBeGreaterThanOrEqual(59);
    expect(dims.height, `height=${dims.height} 应接近 64(±5)`).toBeLessThanOrEqual(69);
  });

  it('atom-logo.png 宽高比约为 5:1(横向 Logo 特征)', () => {
    const dims = readPngDimensions(ATOM_LOGO_PNG);
    const ratio = dims.width / dims.height;
    expect(ratio, `宽高比 ${dims.width}×${dims.height} 应 ≥ 4(横向 Logo)`).toBeGreaterThanOrEqual(4);
    expect(ratio, `宽高比 ${dims.width}×${dims.height} 应 ≤ 7(横向 Logo)`).toBeLessThanOrEqual(7);
  });
});

describe('旧版 atom-logo.svg 删除验证', () => {
  it('src-new 下 atom-logo.svg 已删除(零代码引用,删除无 404 风险)', () => {
    expect(fs.existsSync(ATOM_LOGO_SVG_SRC_NEW), 'src-new 下 atom-logo.svg 应已删除').toBe(false);
  });

  it('旧版 src 下 atom-logo.png 已删除(旧版零引用)', () => {
    expect(fs.existsSync(ATOM_LOGO_PNG_OLD), '旧版 src 下 atom-logo.png 应已删除').toBe(false);
  });

  it('旧版 src 下 atom-logo.svg 已删除(旧版零引用)', () => {
    expect(fs.existsSync(ATOM_LOGO_SVG_OLD), '旧版 src 下 atom-logo.svg 应已删除').toBe(false);
  });
});

describe('AppFooter.vue — Logo 引用与链接验证', () => {
  it('AppFooter.vue 仅 import atom-logo.png(不含 .svg)', () => {
    const content = fs.readFileSync(APP_FOOTER_VUE, 'utf8');
    const pngImportRegex = /import\s+LogoAtom\s+from\s+['"]~@\/assets\/category\/footer\/atom-logo\.png['"]/;
    expect(pngImportRegex.test(content), '应 import atom-logo.png').toBe(true);
    const svgImportRegex = /atom-logo\.svg/;
    expect(svgImportRegex.test(content), '不应引用 atom-logo.svg').toBe(false);
  });

  it('AppFooter.vue 使用 <img :src="LogoAtom"> 渲染 Logo', () => {
    const content = fs.readFileSync(APP_FOOTER_VUE, 'utf8');
    const imgRegex = /<img\s+:src="LogoAtom"\s+class="atom-logo"/;
    expect(imgRegex.test(content), '应使用 <img :src="LogoAtom"> 渲染').toBe(true);
  });

  it('AppFooter.vue 基金会 Logo 链接指向 https://openatom.cn', () => {
    const content = fs.readFileSync(APP_FOOTER_VUE, 'utf8');
    const linkRegex = /href="https:\/\/openatom\.cn"/;
    expect(linkRegex.test(content), 'Logo 链接应指向 openatom.cn').toBe(true);
  });

  it('AppFooter.vue 中无硬编码 atom-logo 文件路径(全部通过 import)', () => {
    const content = fs.readFileSync(APP_FOOTER_VUE, 'utf8');
    const lines = content.split('\n');
    const hardcodedLines = lines.filter((line) => {
      const trimmed = line.trim();
      return /src="/.test(trimmed) && !/:src="/.test(trimmed) && /atom-logo/.test(trimmed);
    });
    expect(hardcodedLines.length, '不应有静态 src 硬编码 atom-logo 路径').toBe(0);
  });
});

describe('全局排查 — atom-logo 引用仅限于 AppFooter.vue', () => {
  it('src-new 下 Vue/TS 文件仅 AppFooter.vue 引用 atom-logo', () => {
    const srcNewDir = path.join(PROJECT_ROOT, 'app/.vitepress/src-new');
    const files: string[] = [];

    function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (/\.(vue|ts|js)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }
    walk(srcNewDir);

    const referencingFiles = files.filter((f) => {
      const content = fs.readFileSync(f, 'utf8');
      return /atom-logo/.test(content);
    });

    const relativePaths = referencingFiles.map((f) => path.relative(PROJECT_ROOT, f));
    expect(relativePaths, '仅 AppFooter.vue 应引用 atom-logo').toEqual(
      relativePaths.filter((p) => p.includes('AppFooter.vue'))
    );
    expect(relativePaths.length, '应至少有 AppFooter.vue 引用').toBeGreaterThanOrEqual(1);
  });
});

describe('atom-logo.css 样式 — 高度设置验证', () => {
  it('AppFooter.vue 中 .atom-logo 高度设置为 32px(PC) / 30px(mobile)', () => {
    const content = fs.readFileSync(APP_FOOTER_VUE, 'utf8');
    expect(content.includes('height: 32px'), 'PC 端 .atom-logo height 应为 32px').toBe(true);
    expect(content.includes('height: 30px'), '移动端 .atom-logo height 应为 30px').toBe(true);
  });
});

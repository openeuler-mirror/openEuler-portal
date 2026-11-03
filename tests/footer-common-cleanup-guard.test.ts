import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const COMMON_FOOTER_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/assets/common/footer'
);
const COMMON_HEADER_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/assets/common/header'
);
const FLOATING_BUTTON_ZH = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/components/FloatingButton.vue'
);
const FLOATING_BUTTON_EN = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/components/FloatingButtonEn.vue'
);
const VITE_CONFIG = path.join(PROJECT_ROOT, 'app/vite.config.js');

/**
 * 本次 issue(#331)删除的 21 个旧版 footer 静态资源(2 SVG + 19 PNG)。
 * 位于 app/.vitepress/src/assets/common/footer/ 下,经全仓核实零引用。
 */
const DELETED_FILES = [
  'logo.svg',
  'logo_dark.svg',
  '51cto.png',
  'bilibili.png',
  'bilibili@2x.png',
  'code-xzs.png',
  'code-zgz.png',
  'csdn.png',
  'footer-bg.png',
  'footer-bg-mo.png',
  'footer-logo1.png',
  'footer-logo2.png',
  'img-gzh.png',
  'img-xzs.png',
  'infoq.png',
  'juejin.png',
  'linkedin@2x.png',
  'oschina.png',
  'reddit-square@2x.png',
  'twitter@2x.png',
  'youtube@2x.png',
] as const;

/**
 * common/footer/ 下必须保留的 8 个 SVG 图标,被 FloatingButton 两个组件以
 * `~icons/footer/icon-*.svg` 虚拟模块消费(unplugin-icons footer collection)。
 */
const KEEP_ICONS = [
  'icon-cancel.svg',
  'icon-chat.svg',
  'icon-faq.svg',
  'icon-headset.svg',
  'icon-quickissue_dark.svg',
  'icon-quickissue_light.svg',
  'icon-smile.svg',
  'icon-top.svg',
] as const;

/**
 * common/header/ 下必须保留的 4 个文件,被 AppHeader.vue 及多个旧版 layout
 * 以 `@/assets/common/header/*` 消费(本次清理不动 header)。
 */
const KEEP_HEADER = [
  'logo.svg',
  'logo_dark.svg',
  'logo.png',
  'logo_dark.png',
] as const;

function listFiles(dir: string): string[] {
  return fs.existsSync(dir) ? fs.readdirSync(dir) : [];
}

/**
 * 递归收集指定目录下所有 vue/ts/js/scss/md 文件的绝对路径。
 */
function walkSource(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSource(full).forEach((f) => out.push(f));
    } else if (/\.(vue|ts|js|scss|md)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

describe('common/footer 目录清理守卫(设计 §1 / §3 — 仅保留 8 个 icon SVG)', () => {
  it('common/footer 目录存在(未整体删除)', () => {
    expect(
      fs.existsSync(COMMON_FOOTER_DIR),
      'common/footer 目录应保留(8 个 SVG 仍被 ~icons/footer 消费)'
    ).toBe(true);
  });

  it('common/footer 仅保留 8 个文件(全部为 icon-*.svg)', () => {
    const files = listFiles(COMMON_FOOTER_DIR).sort();
    expect(files, 'common/footer 应恰好保留 8 个 icon SVG').toEqual(
      [...KEEP_ICONS].sort()
    );
  });

  it('common/footer 无非 SVG 文件(PNG/旧 logo 等冗余资源已清理)', () => {
    const files = listFiles(COMMON_FOOTER_DIR);
    const nonSvg = files.filter((f) => !f.endsWith('.svg'));
    expect(nonSvg, '不应残留任何非 SVG 文件').toEqual([]);
  });

  it('8 个保留 SVG 均存在且非空(图标 loader 仍有效)', () => {
    KEEP_ICONS.forEach((name) => {
      const p = path.join(COMMON_FOOTER_DIR, name);
      expect(fs.existsSync(p), `${name} 应存在`).toBe(true);
      expect(
        fs.statSync(p).size,
        `${name} 应非空`
      ).toBeGreaterThan(0);
    });
  });
});

describe('21 个已删文件回归守卫(设计 §1 / §3 — 防止冗余文件回潮)', () => {
  DELETED_FILES.forEach((name) => {
    it(`common/footer/${name} 已删除(零引用,删除安全)`, () => {
      expect(
        fs.existsSync(path.join(COMMON_FOOTER_DIR, name)),
        `${name} 不应回潮存在`
      ).toBe(false);
    });
  });
});

describe('FloatingButton 图标消费完整性(设计 §4 边界1 — loader 仍有效)', () => {
  function extractFooterIconImports(file: string): string[] {
    const src = fs.readFileSync(file, 'utf8');
    const re = /~icons\/footer\/(icon-[\w-]+\.svg)/g;
    const set = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) set.add(m[1]);
    return [...set];
  }

  it('FloatingButton.vue(zh)消费的 ~icons/footer/ 图标全部命中保留集合', () => {
    const imported = extractFooterIconImports(FLOATING_BUTTON_ZH);
    expect(imported.length, 'zh 应至少 import 一个 footer 图标').toBeGreaterThan(0);
    imported.forEach((icon) => {
      expect(
        KEEP_ICONS.includes(icon as (typeof KEEP_ICONS)[number]),
        `FloatingButton.vue 引用的 ${icon} 必须在保留集合内`
      ).toBe(true);
      expect(
        fs.existsSync(path.join(COMMON_FOOTER_DIR, icon)),
        `${icon} 文件应存在(~icons/footer 消费目标)`
      ).toBe(true);
    });
  });

  it('FloatingButtonEn.vue(en)消费的 ~icons/footer/ 图标全部命中保留集合', () => {
    const imported = extractFooterIconImports(FLOATING_BUTTON_EN);
    expect(imported.length, 'en 应至少 import 一个 footer 图标').toBeGreaterThan(0);
    imported.forEach((icon) => {
      expect(
        KEEP_ICONS.includes(icon as (typeof KEEP_ICONS)[number]),
        `FloatingButtonEn.vue 引用的 ${icon} 必须在保留集合内`
      ).toBe(true);
      expect(
        fs.existsSync(path.join(COMMON_FOOTER_DIR, icon)),
        `${icon} 文件应存在(~icons/footer 消费目标)`
      ).toBe(true);
    });
  });

  it('两个 FloatingButton 组件合计消费的图标集合 === 目录内 8 个保留 SVG(一一对应)', () => {
    const zh = extractFooterIconImports(FLOATING_BUTTON_ZH);
    const en = extractFooterIconImports(FLOATING_BUTTON_EN);
    const consumed = [...new Set([...zh, ...en])].sort();
    expect(consumed, '消费集合应等于目录内 8 个 SVG(无悬空消费、无多余保留)').toEqual(
      [...KEEP_ICONS].sort()
    );
  });
});

describe('vite.config footer 图标 loader 完整性(设计 §4 边界1)', () => {
  it('footer FileSystemIconLoader 仍指向 common/footer 目录', () => {
    const src = fs.readFileSync(VITE_CONFIG, 'utf8');
    expect(
      src.includes("footer: FileSystemIconLoader"),
      '应保留 footer collection 的 FileSystemIconLoader 定义'
    ).toBe(true);
    expect(
      src.includes("'./.vitepress/src/assets/common/footer'"),
      'footer loader 应指向 ./.vitepress/src/assets/common/footer'
    ).toBe(true);
  });
});

describe('common/header 资源保留守卫(设计 §1 — 不动 header)', () => {
  it('common/header 目录存在', () => {
    expect(fs.existsSync(COMMON_HEADER_DIR), 'common/header 应保留').toBe(true);
  });

  KEEP_HEADER.forEach((name) => {
    it(`common/header/${name} 保留(被 AppHeader 及旧版 layout 消费)`, () => {
      const p = path.join(COMMON_HEADER_DIR, name);
      expect(fs.existsSync(p), `${name} 应存在`).toBe(true);
      expect(fs.statSync(p).size, `${name} 应非空`).toBeGreaterThan(0);
    });
  });
});

describe('全仓无 dangling 引用(设计 §3 证据 — 删除后零 broken ref)', () => {
  const SCAN_DIRS = [
    'app/.vitepress/src',
    'app/.vitepress/src-new',
    'app/zh',
    'app/en',
    'scripts',
  ];

  const sourceFiles: string[] = [];
  SCAN_DIRS.forEach((d) => {
    walkSource(path.join(PROJECT_ROOT, d)).forEach((f) => sourceFiles.push(f));
  });

  DELETED_FILES.forEach((name) => {
    it(`无源码引用旧路径 common/footer/${name}`, () => {
      const needle = `common/footer/${name}`;
      const hits = sourceFiles.filter((f) =>
        fs.readFileSync(f, 'utf8').includes(needle)
      );
      expect(
        hits.map((f) => path.relative(PROJECT_ROOT, f)),
        `不应有任何源码引用 ${needle}`
      ).toEqual([]);
    });
  });
});

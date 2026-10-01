import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const IMAGES_DIR = path.join(PROJECT_ROOT, '.content/home/images/release');

function parseBannerYaml() {
  const content = fs.readFileSync(BANNER_YAML_PATH, 'utf8');
  return yaml.load(content) as Record<string, any>[];
}

function isValidJpg(filePath: string): boolean {
  const buf = fs.readFileSync(filePath);
  return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

// 复刻 HomeBanner.vue:30 的 locale 过滤逻辑：
//   foldI18n(banners, locale).filter(item => !item.locale || item.locale.split(',').includes(locale))
function visibleBanners(locale: 'zh' | 'en') {
  const banners = parseBannerYaml();
  return foldI18n(banners, locale)
    .filter((item: any) => !item.locale || item.locale.split(',').includes(locale));
}

describe('banner.yaml — release 条目原地替换为 openEuler 26.09（设计 §3）', () => {
  const banners = parseBannerYaml();
  // 按内容定位条目，避免对列表顺序的硬编码假设
  const entry = banners.find((b) => b.bg_pc && b.bg_pc.includes('images/release/'));

  it('banner.yaml 可解析为非空数组', () => {
    expect(Array.isArray(banners)).toBe(true);
    expect(banners.length).toBeGreaterThanOrEqual(5);
  });

  it('release 条目存在于轮播列表中', () => {
    expect(entry).toBeDefined();
    expect(entry.bg_pc).toContain('images/release/');
  });

  it('title_zh 为 "openEuler 26.09 正式发布"（设计 §3 关键改动点）', () => {
    expect(entry.title_zh).toBe('openEuler 26.09 正式发布');
  });

  it('locale 为 zh（仅中文首页展示，英文首页无 release banner，与 24.03 行为一致）', () => {
    expect(entry.locale).toBe('zh');
  });

  it('bg_mb 指向 ./images/release/mb.jpg（覆盖后的 26.09 移动端图）', () => {
    expect(entry.bg_mb).toBe('./images/release/mb.jpg');
  });

  it('条目使用共用 bg_mb（无 bg_mb_zh / bg_mb_en 后缀，移动端图文案烘焙进图）', () => {
    expect(entry.bg_mb).toBeDefined();
    expect(entry.bg_mb_zh).toBeUndefined();
    expect(entry.bg_mb_en).toBeUndefined();
  });

  it('bg_pc / bg_pad 复用现有 release 背景图（设计 §3：PC/Pad 不动）', () => {
    expect(entry.bg_pc).toBe('./images/release/pc.jpg');
    expect(entry.bg_pad).toBe('./images/release/pad.jpg');
  });

  it('bg_theme 为 light', () => {
    expect(entry.bg_theme).toBe('light');
  });

  it('btn_zh 为 "下载"', () => {
    expect(entry.btn_zh).toBe('下载');
  });

  it('href_zh 为 /zh/download（去版本锚点，设计 §3 / §4 边界）', () => {
    expect(entry.href_zh).toBe('/zh/download');
  });

  it('href_zh 不再含 24.03 LTS SP4 版本锚点（回归守卫）', () => {
    expect(entry.href_zh).not.toContain('24.03');
    expect(entry.href_zh).not.toContain('LTS');
    expect(entry.href_zh).not.toContain('SP4');
    expect(entry.href_zh).not.toContain('#');
  });

  it('is_blank 为 true（新窗口打开）', () => {
    expect(entry.is_blank).toBe(true);
  });

  it('条目仅提供 _zh 字段，无 _en 字段（locale 限定单语条目）', () => {
    expect(entry.title_zh).toBeDefined();
    expect(entry.btn_zh).toBeDefined();
    expect(entry.href_zh).toBeDefined();
    expect(entry.title_en).toBeUndefined();
    expect(entry.btn_en).toBeUndefined();
    expect(entry.href_en).toBeUndefined();
  });

  it('图片路径使用相对路径 ./images/ 前缀', () => {
    expect(entry.bg_pc).toMatch(/^\.\//);
    expect(entry.bg_pad).toMatch(/^\.\//);
    expect(entry.bg_mb).toMatch(/^\.\//);
  });
});

describe('release 轮播图片资源（设计 §3 / §4 边界 / §6 预览清单）', () => {
  const requiredImages = ['pc.jpg', 'pad.jpg', 'mb.jpg'];

  requiredImages.forEach((img) => {
    it(`${img} 文件存在`, () => {
      const p = path.join(IMAGES_DIR, img);
      expect(fs.existsSync(p), `${img} 应存在于 ${IMAGES_DIR}`).toBe(true);
    });

    it(`${img} 文件非空`, () => {
      const p = path.join(IMAGES_DIR, img);
      const stat = fs.statSync(p);
      expect(stat.size, `${img} 文件大小应大于 0`).toBeGreaterThan(0);
    });

    it(`${img} 是合法 JPEG 格式（FF D8 FF 签名校验）`, () => {
      const p = path.join(IMAGES_DIR, img);
      expect(isValidJpg(p), `${img} 应为合法 JPEG`).toBe(true);
    });

    it(`${img} 文件大小合理（10KB~2MB，避免 broken image / 体积过大）`, () => {
      const p = path.join(IMAGES_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 10KB`).toBeGreaterThanOrEqual(10 * 1024);
      expect(size, `${img} 应 ≤ 2MB`).toBeLessThanOrEqual(2 * 1024 * 1024);
    });
  });

  it('mb.jpg 已被 26.09 图覆盖（体积与 24.03 旧图 103377B 不同，设计 §3 改动点）', () => {
    const p = path.join(IMAGES_DIR, 'mb.jpg');
    const size = fs.statSync(p).size;
    expect(size, '覆盖后 mb.jpg 体积应不同于旧 24.03 图(103377B)').not.toBe(103377);
  });
});

describe('回归守卫 — 不应再存在 24.03 LTS SP4 release banner（设计 §5 测试策略）', () => {
  const banners = parseBannerYaml();

  it('release 条目 title_zh 不含 "24.03 LTS SP4 正式发布"', () => {
    const releaseEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('images/release/'));
    expect(releaseEntry).toBeDefined();
    expect(releaseEntry.title_zh).not.toBe('openEuler 24.03 LTS SP4 正式发布');
    expect(releaseEntry.title_zh).not.toContain('24.03 LTS SP4');
  });

  it('banner.yaml 中无任何条目的 title_zh 为 "openEuler 24.03 LTS SP4 正式发布"', () => {
    const stale = banners.filter((b) => b.title_zh === 'openEuler 24.03 LTS SP4 正式发布');
    expect(stale, '不应残留 24.03 LTS SP4 release banner').toHaveLength(0);
  });

  it('release 条目 href_zh 不含 24.03 LTS SP4 锚点', () => {
    const releaseEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('images/release/'));
    expect(releaseEntry.href_zh).not.toContain('#openEuler%2024.03');
  });
});

describe('foldI18n — release 条目 _zh 字段折叠为基线字段（设计 §2 数据流转）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('images/release/'));

  it('zh locale 下 title_zh 折叠为 title', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.title).toBe('openEuler 26.09 正式发布');
    expect(result.title_zh).toBeUndefined();
    expect(result.title_en).toBeUndefined();
  });

  it('zh locale 下 btn_zh 折叠为 btn', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.btn).toBe('下载');
    expect(result.btn_zh).toBeUndefined();
  });

  it('zh locale 下 href_zh 折叠为 href', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.href).toBe('/zh/download');
    expect(result.href_zh).toBeUndefined();
  });

  it('bg_mb 无后缀字段在 zh locale 下保持不变（中英文共用）', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/release/mb.jpg');
  });

  it('非 i18n 字段（bg_pc, bg_pad, bg_theme, locale, is_blank）保持不变', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.bg_pc).toBe('./images/release/pc.jpg');
    expect(result.bg_pad).toBe('./images/release/pad.jpg');
    expect(result.bg_theme).toBe('light');
    expect(result.locale).toBe('zh');
    expect(result.is_blank).toBe(true);
  });
});

describe('locale 过滤 — zh 可见 / en 不可见（设计 §2 / §4 i18n 单语）', () => {
  it('zh locale 下 release 条目出现在可见列表中且文案为 26.09', () => {
    const visible = visibleBanners('zh');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('images/release/'));
    expect(entry).toBeDefined();
    expect(entry.title).toBe('openEuler 26.09 正式发布');
    expect(entry.href).toBe('/zh/download');
  });

  it('en locale 下 release 条目被过滤掉（locale: zh 不含 en）', () => {
    const visible = visibleBanners('en');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('images/release/'));
    expect(entry).toBeUndefined();
  });
});

describe('useScreen 三端 bg 选择逻辑（设计 §2 数据流转）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('images/release/'));

  // 复刻 HomeBanner.vue:48-54 的三端选图逻辑
  function selectBg(item: Record<string, any>, screen: 'gtPad' | 'isPad' | 'isPhone') {
    const folded = foldI18n(item, 'zh') as Record<string, any>;
    if (screen === 'gtPad') return folded.bg_pc || item.bg_pc;
    if (screen === 'isPad') return folded.bg_pad || item.bg_pad;
    return folded.bg_mb || item.bg_mb;
  }

  it('PC 端（gtPad）选择 bg_pc', () => {
    expect(selectBg(rawEntry, 'gtPad')).toBe('./images/release/pc.jpg');
  });

  it('PAD 端（isPad）选择 bg_pad', () => {
    expect(selectBg(rawEntry, 'isPad')).toBe('./images/release/pad.jpg');
  });

  it('移动端（isPhone）选择 bg_mb（覆盖后的 26.09 图）', () => {
    expect(selectBg(rawEntry, 'isPhone')).toBe('./images/release/mb.jpg');
  });

  it('三端 bg 均不为空（避免 OFigure broken image）', () => {
    expect(selectBg(rawEntry, 'gtPad')).toBeTruthy();
    expect(selectBg(rawEntry, 'isPad')).toBeTruthy();
    expect(selectBg(rawEntry, 'isPhone')).toBeTruthy();
  });

  it('三端 bg 对应的物理图片文件均存在', () => {
    const screens = ['gtPad', 'isPad', 'isPhone'] as const;
    for (const s of screens) {
      const bg = selectBg(rawEntry, s).replace(/^\.\//, '');
      const absPath = path.join(PROJECT_ROOT, '.content/home', bg);
      expect(fs.existsSync(absPath), `${s} 对应图片应存在: ${absPath}`).toBe(true);
    }
  });
});

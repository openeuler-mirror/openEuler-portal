import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const IMAGES_DIR = path.join(PROJECT_ROOT, '.content/home/images/business-practice');

function parseBannerYaml() {
  const content = fs.readFileSync(BANNER_YAML_PATH, 'utf8');
  return yaml.load(content) as Record<string, any>[];
}

function isValidJpg(filePath: string): boolean {
  const buf = fs.readFileSync(filePath);
  return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

// 复刻 HomeBanner.vue:29-30 的 locale 过滤逻辑：
//   foldI18n(banners, locale).filter(item => !item.locale || item.locale.split(',').includes(locale))
function visibleBanners(locale: 'zh' | 'en') {
  const banners = parseBannerYaml();
  return foldI18n(banners, locale)
    .filter((item: any) => !item.locale || item.locale.split(',').includes(locale));
}

describe('banner.yaml — 新增"商业实践单位遴选"轮播条目（设计 §改动清单）', () => {
  const banners = parseBannerYaml();
  const entry = banners.find((b) => b.bg_pc && b.bg_pc.includes('business-practice'));

  it('banner.yaml 可解析为非空数组', () => {
    expect(Array.isArray(banners)).toBe(true);
    expect(banners.length).toBeGreaterThanOrEqual(7);
  });

  it('"商业实践单位遴选"条目存在于轮播列表中', () => {
    expect(entry).toBeDefined();
    expect(entry.bg_pc).toContain('business-practice');
  });

  it('条目位于 raw 数组 index 1（summit[0] 之后、release 之前，设计 §banner.yaml 顺序约束）', () => {
    expect(banners[1].bg_pc).toContain('business-practice');
    // 前一条是 summit
    expect(banners[0].bg_pc).toContain('summit');
    // 后一条是 release（贡献之星下线后，原 index 3 上移到 index 2）
    expect(banners[2].bg_pc).toContain('release');
  });

  it('条目包含三端背景图字段 bg_pc / bg_pad / bg_mb', () => {
    expect(entry.bg_pc).toBeDefined();
    expect(entry.bg_pad).toBeDefined();
    expect(entry.bg_mb).toBeDefined();
  });

  it('条目使用共用 bg_mb（无 bg_mb_zh / bg_mb_en 后缀，三端图中英文共用写法）', () => {
    expect(entry.bg_mb).toBeDefined();
    expect(entry.bg_mb_zh).toBeUndefined();
    expect(entry.bg_mb_en).toBeUndefined();
  });

  it('bg_theme 为 light', () => {
    expect(entry.bg_theme).toBe('light');
  });

  it('locale 为 zh（仅中文站展示，微信文章为中文平台）', () => {
    expect(entry.locale).toBe('zh');
  });

  it('条目仅提供 _zh 字段，无 _en 字段（locale 限定单语条目先例）', () => {
    expect(entry.btn_zh).toBeDefined();
    expect(entry.href_zh).toBeDefined();
    expect(entry.btn_en).toBeUndefined();
    expect(entry.href_en).toBeUndefined();
  });

  it('条目无 title_zh（PNG 原图已烘焙标题文字，对齐 summit 无 title_zh 先例，避免双标题）', () => {
    expect(entry.title_zh).toBeUndefined();
    expect(entry.title_en).toBeUndefined();
  });

  it('btn_zh 为"查看详情"（对齐 call-for-submissions 最近先例）', () => {
    expect(entry.btn_zh).toBe('查看详情');
  });

  it('href_zh 指向微信公众号文章链接（issue #570 指定链接）', () => {
    expect(entry.href_zh).toMatch(/^https:\/\/mp\.weixin\.qq\.com\/s\//);
    expect(entry.href_zh).toBe('https://mp.weixin.qq.com/s/ws3TM25VnKJ_FmjOmqoqOw');
  });

  it('is_blank 为 true（沿用既有条目写法，新标签页实由 OButton target=_blank 保证）', () => {
    expect(entry.is_blank).toBe(true);
  });

  it('条目不设 attach / custom_class（无独立文字图、无高度定制需求）', () => {
    expect(entry.attach).toBeUndefined();
    expect(entry.custom_class).toBeUndefined();
  });

  it('图片路径使用相对路径 ./images/ 前缀', () => {
    expect(entry.bg_pc).toMatch(/^\.\//);
    expect(entry.bg_pad).toMatch(/^\.\//);
    expect(entry.bg_mb).toMatch(/^\.\//);
  });

  it('图片路径遵循 business-practice/pc.jpg / pad.jpg / mb.jpg 命名约定', () => {
    expect(entry.bg_pc).toBe('./images/business-practice/pc.jpg');
    expect(entry.bg_pad).toBe('./images/business-practice/pad.jpg');
    expect(entry.bg_mb).toBe('./images/business-practice/mb.jpg');
  });
});

describe('"商业实践单位遴选"轮播图片资源（设计 §改动清单 体积 ≤300kb 约束）', () => {
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

    it(`${img} 文件大小合理（≥ 10KB，避免 broken image）`, () => {
      const p = path.join(IMAGES_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 10KB`).toBeGreaterThanOrEqual(10 * 1024);
    });
  });

  it('PC 端图片体积 ≤ 300kb（设计 §改动清单 硬约束）', () => {
    const size = fs.statSync(path.join(IMAGES_DIR, 'pc.jpg')).size;
    expect(size, `pc.jpg 应 ≤ 300kb`).toBeLessThanOrEqual(300 * 1024);
  });

  it('PAD 端图片体积 ≤ 300kb（设计 §改动清单 硬约束）', () => {
    const size = fs.statSync(path.join(IMAGES_DIR, 'pad.jpg')).size;
    expect(size, `pad.jpg 应 ≤ 300kb`).toBeLessThanOrEqual(300 * 1024);
  });
});

describe('foldI18n — "商业实践单位遴选"条目 _zh 字段折叠为基线字段（设计 §0 数据流转）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('business-practice'));

  it('zh locale 下 btn_zh 折叠为 btn', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.btn).toBe(rawEntry.btn_zh);
    expect(result.btn_zh).toBeUndefined();
    expect(result.btn_en).toBeUndefined();
  });

  it('zh locale 下 href_zh 折叠为 href', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.href).toBe(rawEntry.href_zh);
    expect(result.href_zh).toBeUndefined();
  });

  it('zh locale 下无 title 字段（原图烘焙标题，无 title_zh 可折叠，DOM 不渲染文字标题）', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.title).toBeUndefined();
    expect(result.title_zh).toBeUndefined();
    expect(result.title_en).toBeUndefined();
  });

  it('bg_mb 无后缀字段在 zh locale 下保持不变（中英文共用）', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/business-practice/mb.jpg');
  });

  it('非 i18n 字段（bg_pc, bg_pad, bg_theme, locale, is_blank）保持不变', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.bg_pc).toBe(rawEntry.bg_pc);
    expect(result.bg_pad).toBe(rawEntry.bg_pad);
    expect(result.bg_theme).toBe('light');
    expect(result.locale).toBe('zh');
    expect(result.is_blank).toBe(true);
  });
});

describe('locale 过滤 — zh 可见 / en 不可见（设计 §0 i18n 单语条目约束）', () => {
  it('zh locale 下"商业实践单位遴选"条目出现在可见列表中', () => {
    const visible = visibleBanners('zh');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('business-practice'));
    expect(entry).toBeDefined();
    expect(entry.btn).toBe('查看详情');
    expect(entry.href).toMatch(/^https:\/\/mp\.weixin\.qq\.com\/s\//);
  });

  it('en locale 下"商业实践单位遴选"条目被过滤掉（locale: zh 不含 en）', () => {
    const visible = visibleBanners('en');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('business-practice'));
    expect(entry).toBeUndefined();
  });

  it('zh locale 下条目的 locale 字段被 foldI18n 保留（filter 阶段据此放行）', () => {
    const banners = parseBannerYaml();
    const folded = foldI18n(banners, 'zh') as Record<string, any>[];
    const entry = folded.find((b) => b.bg_pc && b.bg_pc.includes('business-practice'));
    expect(entry.locale).toBe('zh');
  });

  it('en locale 下 foldI18n 仍保留 locale 字段（filter 阶段据此排除）', () => {
    const banners = parseBannerYaml();
    const folded = foldI18n(banners, 'en') as Record<string, any>[];
    const entry = folded.find((b) => b.bg_pc && b.bg_pc.includes('business-practice'));
    expect(entry.locale).toBe('zh');
  });
});

describe('useScreen 三端 bg 选择逻辑（设计 §0 数据流转 / HomeBanner.vue:48-54）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('business-practice'));

  // 复刻 HomeBanner.vue:48-54 的三端选图逻辑
  function selectBg(item: Record<string, any>, screen: 'gtPad' | 'isPad' | 'isPhone') {
    const folded = foldI18n(item, 'zh') as Record<string, any>;
    if (screen === 'gtPad') return folded.bg_pc || item.bg_pc;
    if (screen === 'isPad') return folded.bg_pad || item.bg_pad;
    return folded.bg_mb || item.bg_mb;
  }

  it('PC 端（gtPad）选择 bg_pc', () => {
    expect(selectBg(rawEntry, 'gtPad')).toBe('./images/business-practice/pc.jpg');
  });

  it('PAD 端（isPad）选择 bg_pad', () => {
    expect(selectBg(rawEntry, 'isPad')).toBe('./images/business-practice/pad.jpg');
  });

  it('移动端（isPhone）选择 bg_mb', () => {
    expect(selectBg(rawEntry, 'isPhone')).toBe('./images/business-practice/mb.jpg');
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

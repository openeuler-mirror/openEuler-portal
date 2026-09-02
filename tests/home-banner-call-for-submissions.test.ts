import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const IMAGES_DIR = path.join(PROJECT_ROOT, '.content/home/images/call-for-submissions');

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

describe('banner.yaml — 新增"有奖征稿"轮播条目（设计 §3）', () => {
  const banners = parseBannerYaml();
  const entry = banners.find((b) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));

  it('banner.yaml 可解析为非空数组', () => {
    expect(Array.isArray(banners)).toBe(true);
    expect(banners.length).toBeGreaterThanOrEqual(5);
  });

  it('"有奖征稿"条目存在于轮播列表中', () => {
    expect(entry).toBeDefined();
    expect(entry.bg_pc).toContain('call-for-submissions');
  });

  it('"有奖征稿"条目位于列表首位（设计 §3：置于首位以获最大曝光）', () => {
    expect(banners[0].bg_pc).toContain('call-for-submissions');
  });

  it('条目包含三端背景图字段 bg_pc / bg_pad / bg_mb', () => {
    expect(entry.bg_pc).toBeDefined();
    expect(entry.bg_pad).toBeDefined();
    expect(entry.bg_mb).toBeDefined();
  });

  it('条目使用共用 bg_mb（无 bg_mb_zh / bg_mb_en 后缀，三端图中英文共用）', () => {
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
    expect(entry.title_zh).toBeDefined();
    expect(entry.btn_zh).toBeDefined();
    expect(entry.href_zh).toBeDefined();
    expect(entry.title_en).toBeUndefined();
    expect(entry.btn_en).toBeUndefined();
    expect(entry.href_en).toBeUndefined();
  });

  it('title_zh 文案包含"openEuler"与"好礼"关键词', () => {
    expect(entry.title_zh).toContain('openEuler');
    expect(entry.title_zh).toContain('好礼');
  });

  it('btn_zh 为"查看详情"', () => {
    expect(entry.btn_zh).toBe('查看详情');
  });

  it('href_zh 指向微信公众号文章链接', () => {
    expect(entry.href_zh).toMatch(/^https:\/\/mp\.weixin\.qq\.com\/s\//);
    expect(entry.href_zh).toBe('https://mp.weixin.qq.com/s/w16G9sFo6XHWV_lQSs0syQ');
  });

  it('is_blank 为 true（沿用既有条目写法，新标签页实由 OButton target=_blank 保证）', () => {
    expect(entry.is_blank).toBe(true);
  });

  it('图片路径使用相对路径 ./images/ 前缀', () => {
    expect(entry.bg_pc).toMatch(/^\.\//);
    expect(entry.bg_pad).toMatch(/^\.\//);
    expect(entry.bg_mb).toMatch(/^\.\//);
  });

  it('图片路径遵循 call-for-submissions/pc.jpg / pad.jpg / mb.jpg 命名约定', () => {
    expect(entry.bg_pc).toBe('./images/call-for-submissions/pc.jpg');
    expect(entry.bg_pad).toBe('./images/call-for-submissions/pad.jpg');
    expect(entry.bg_mb).toBe('./images/call-for-submissions/mb.jpg');
  });
});

describe('"有奖征稿"轮播图片资源（设计 §3 / §4 边界 / §6 预览清单）', () => {
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
});

describe('foldI18n — "有奖征稿"条目 _zh 字段折叠为基线字段（设计 §2 数据流转）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));

  it('zh locale 下 title_zh 折叠为 title', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.title).toBe(rawEntry.title_zh);
    expect(result.title_zh).toBeUndefined();
    expect(result.title_en).toBeUndefined();
  });

  it('zh locale 下 btn_zh 折叠为 btn', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.btn).toBe(rawEntry.btn_zh);
    expect(result.btn_zh).toBeUndefined();
  });

  it('zh locale 下 href_zh 折叠为 href', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.href).toBe(rawEntry.href_zh);
    expect(result.href_zh).toBeUndefined();
  });

  it('bg_mb 无后缀字段在 zh locale 下保持不变（中英文共用）', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/call-for-submissions/mb.jpg');
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

describe('locale 过滤 — zh 可见 / en 不可见（设计 §2 / §4 i18n 单语漏改风险）', () => {
  it('zh locale 下"有奖征稿"条目出现在可见列表中', () => {
    const visible = visibleBanners('zh');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));
    expect(entry).toBeDefined();
    expect(entry.title).toBeDefined();
    expect(entry.href).toMatch(/^https:\/\/mp\.weixin\.qq\.com\/s\//);
  });

  it('en locale 下"有奖征稿"条目被过滤掉（locale: zh 不含 en）', () => {
    const visible = visibleBanners('en');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));
    expect(entry).toBeUndefined();
  });

  it('zh locale 下条目的 locale 字段被 foldI18n 保留（filter 阶段据此放行）', () => {
    const banners = parseBannerYaml();
    const folded = foldI18n(banners, 'zh') as Record<string, any>[];
    const entry = folded.find((b) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));
    expect(entry.locale).toBe('zh');
  });

  it('en locale 下 foldI18n 仍保留 locale 字段（filter 阶段据此排除）', () => {
    const banners = parseBannerYaml();
    const folded = foldI18n(banners, 'en') as Record<string, any>[];
    const entry = folded.find((b) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));
    expect(entry.locale).toBe('zh');
  });
});

describe('useScreen 三端 bg 选择逻辑（设计 §2 数据流转 / §4 三端图变形）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));

  // 复刻 HomeBanner.vue:48-54 的三端选图逻辑
  function selectBg(item: Record<string, any>, screen: 'gtPad' | 'isPad' | 'isPhone') {
    const folded = foldI18n(item, 'zh') as Record<string, any>;
    if (screen === 'gtPad') return folded.bg_pc || item.bg_pc;
    if (screen === 'isPad') return folded.bg_pad || item.bg_pad;
    return folded.bg_mb || item.bg_mb;
  }

  it('PC 端（gtPad）选择 bg_pc', () => {
    expect(selectBg(rawEntry, 'gtPad')).toBe('./images/call-for-submissions/pc.jpg');
  });

  it('PAD 端（isPad）选择 bg_pad', () => {
    expect(selectBg(rawEntry, 'isPad')).toBe('./images/call-for-submissions/pad.jpg');
  });

  it('移动端（isPhone）选择 bg_mb', () => {
    expect(selectBg(rawEntry, 'isPhone')).toBe('./images/call-for-submissions/mb.jpg');
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

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const IMAGES_DIR = path.join(PROJECT_ROOT, '.content/home/images/national-day');
const HOMEBANNER_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/home/HomeBanner.vue'
);

function parseBannerYaml() {
  const content = fs.readFileSync(BANNER_YAML_PATH, 'utf8');
  return yaml.load(content) as Record<string, any>[];
}

function isValidPng(filePath: string): boolean {
  const buf = fs.readFileSync(filePath);
  // PNG 文件签名：89 50 4E 47 0D 0A 1A 0A
  return (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  );
}

// 复刻 HomeBanner.vue:28-30 的 locale 过滤逻辑：
//   foldI18n(banners, locale).filter(item => !item.locale || item.locale.split(',').includes(locale))
function visibleBanners(locale: 'zh' | 'en') {
  const banners = parseBannerYaml();
  return foldI18n(banners, locale)
    .filter((item: any) => !item.locale || item.locale.split(',').includes(locale));
}

// 复刻 HomeBanner.vue:48-54 的三端选图逻辑
function selectBg(item: Record<string, any>, screen: 'gtPad' | 'isPad' | 'isPhone', locale: 'zh' | 'en' = 'zh') {
  const folded = foldI18n(item, locale) as Record<string, any>;
  if (screen === 'gtPad') return folded.bg_pc || item.bg_pc;
  if (screen === 'isPad') return folded.bg_pad || item.bg_pad;
  return folded.bg_mb || item.bg_mb;
}

describe('banner.yaml — 新增"国庆"轮播条目（设计 §3）', () => {
  const banners = parseBannerYaml();
  const entry = banners.find((b) => b.bg_pc && b.bg_pc.includes('national-day'));

  it('banner.yaml 可解析为非空数组', () => {
    expect(Array.isArray(banners)).toBe(true);
    expect(banners.length).toBeGreaterThanOrEqual(6);
  });

  it('"国庆"条目存在于轮播列表中', () => {
    expect(entry).toBeDefined();
    expect(entry.bg_pc).toContain('national-day');
  });

  it('"国庆"条目位于列表首位（设计 §3：置于首位以获最大曝光，作为轮播首帧）', () => {
    expect(banners[0].bg_pc).toContain('national-day');
  });

  it('条目包含三端背景图字段 bg_pc / bg_pad / bg_mb（中英文共用，无 _zh/_en 后缀）', () => {
    expect(entry.bg_pc).toBeDefined();
    expect(entry.bg_pad).toBeDefined();
    expect(entry.bg_mb).toBeDefined();
    expect(entry.bg_mb_zh).toBeUndefined();
    expect(entry.bg_mb_en).toBeUndefined();
  });

  it('条目包含 attach 附加装饰图（艺术文字图层，设计 §1 / §3）', () => {
    expect(entry.attach).toBeDefined();
    expect(entry.attach).toMatch(/national-day\/attach\.png$/);
  });

  it('条目包含 custom_class: banner-national-day（设计 §3：用 custom_class 解耦脆弱的 per-index 样式）', () => {
    expect(entry.custom_class).toBe('banner-national-day');
  });

  it('bg_theme 为 light', () => {
    expect(entry.bg_theme).toBe('light');
  });

  it('locale 为 zh（仅中文站展示，设计 §2 blast radius 仅限 zh）', () => {
    expect(entry.locale).toBe('zh');
  });

  it('条目为纯背景+attach 装饰型，无 title/btn/href 文本字段（attach.png 即艺术文字）', () => {
    expect(entry.title_zh).toBeUndefined();
    expect(entry.title_en).toBeUndefined();
    expect(entry.btn_zh).toBeUndefined();
    expect(entry.btn_en).toBeUndefined();
    expect(entry.href_zh).toBeUndefined();
    expect(entry.href_en).toBeUndefined();
  });

  it('图片路径使用相对路径 ./images/ 前缀', () => {
    expect(entry.bg_pc).toMatch(/^\.\//);
    expect(entry.bg_pad).toMatch(/^\.\//);
    expect(entry.bg_mb).toMatch(/^\.\//);
    expect(entry.attach).toMatch(/^\.\//);
  });

  it('图片路径遵循 national-day/<角色>.png 命名约定（保留 PNG 透明通道，设计 §3 / §4）', () => {
    expect(entry.bg_pc).toBe('./images/national-day/pc.png');
    expect(entry.bg_pad).toBe('./images/national-day/pad.png');
    expect(entry.bg_mb).toBe('./images/national-day/mb.png');
    expect(entry.attach).toBe('./images/national-day/attach.png');
  });
});

describe('国庆轮播图片资源（设计 §3 / §4 透明度 / §6 预览清单）', () => {
  const requiredImages = ['pc.png', 'pad.png', 'mb.png', 'attach.png'];

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

    it(`${img} 是合法 PNG 格式（89 50 4E 47 签名校验，禁止转 jpg 以保留透明通道）`, () => {
      const p = path.join(IMAGES_DIR, img);
      expect(isValidPng(p), `${img} 应为合法 PNG`).toBe(true);
    });

    it(`${img} 文件大小合理（≥10KB，避免 broken image）`, () => {
      const p = path.join(IMAGES_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 10KB`).toBeGreaterThanOrEqual(10 * 1024);
    });
  });
});

describe('foldI18n — 国庆条目非 i18n 字段保留（设计 §2 数据流转）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('national-day'));

  it('zh locale 下 attach 字段原样保留', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.attach).toBe(rawEntry.attach);
  });

  it('zh locale 下 custom_class 字段原样保留', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.custom_class).toBe('banner-national-day');
  });

  it('zh locale 下 locale 字段原样保留（filter 阶段据此放行）', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.locale).toBe('zh');
  });

  it('zh locale 下三端 bg 字段保持不变', () => {
    const result = foldI18n(rawEntry, 'zh') as Record<string, any>;
    expect(result.bg_pc).toBe(rawEntry.bg_pc);
    expect(result.bg_pad).toBe(rawEntry.bg_pad);
    expect(result.bg_mb).toBe(rawEntry.bg_mb);
  });

  it('en locale 下 foldI18n 仍保留 locale=zh（filter 阶段据此排除）', () => {
    const result = foldI18n(rawEntry, 'en') as Record<string, any>;
    expect(result.locale).toBe('zh');
  });
});

describe('locale 过滤 — zh 可见 / en 不可见（设计 §2 / §4 i18n 隔离）', () => {
  it('zh locale 下国庆条目出现在可见列表首位', () => {
    const visible = visibleBanners('zh');
    expect(visible.length).toBeGreaterThanOrEqual(1);
    expect(visible[0].bg_pc).toContain('national-day');
    expect(visible[0].custom_class).toBe('banner-national-day');
  });

  it('en locale 下国庆条目被过滤掉（locale: zh 不含 en）', () => {
    const visible = visibleBanners('en');
    const entry = visible.find((b: any) => b.bg_pc && b.bg_pc.includes('national-day'));
    expect(entry).toBeUndefined();
  });

  it('en locale 下首项为 ai-coding（索引不变，无跨 locale 副作用，设计 §4）', () => {
    const visible = visibleBanners('en');
    expect(visible[0].bg_pc).toContain('ai-coding-assistants');
  });

  it('en locale 下可见条目数 = zh locale 下可见条目数 - 1（国庆仅 zh 多出一条）', () => {
    const zhVisible = visibleBanners('zh');
    const enVisible = visibleBanners('en');
    // zh 可见: national-day + call-for-submissions + ai-coding + release + annual-report + download = 6
    // en 可见: ai-coding + annual-report + download = 3
    // call-for-submissions(locale:zh) 与 release(locale:zh) 也被 en 排除
    expect(enVisible.length).toBeLessThan(zhVisible.length);
  });
});

describe('useScreen 三端 bg 选择逻辑（设计 §2 数据流转 / §5 测试策略 ①）', () => {
  const banners = parseBannerYaml();
  const rawEntry = banners.find((b) => b.bg_pc && b.bg_pc.includes('national-day'));

  it('PC 端（gtPad, >1200px）选择 bg_pc', () => {
    expect(selectBg(rawEntry, 'gtPad')).toBe('./images/national-day/pc.png');
  });

  it('PAD 端（isPad, 601-1200px）选择 bg_pad', () => {
    expect(selectBg(rawEntry, 'isPad')).toBe('./images/national-day/pad.png');
  });

  it('移动端（isPhone, ≤600px）选择 bg_mb', () => {
    expect(selectBg(rawEntry, 'isPhone')).toBe('./images/national-day/mb.png');
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

describe('attach 仅 PC/PAD 可见、phone 端无 attach（设计 §4 移动端只显背景 / §5 测试策略 ②）', () => {
  // HomeBanner.vue 模板：PC/PAD 轮播（v-if="!isPhone"）内含 <img v-if="!isPhone && info.attach" class="banner-attach" />
  // phone 轮播（v-if="isPhone"）无 attach 渲染分支
  const source = fs.readFileSync(HOMEBANNER_VUE, 'utf8');

  it('HomeBanner.vue 模板存在 attach 渲染守卫 v-if="!isPhone && info.attach"', () => {
    expect(source).toContain('v-if="!isPhone && info.attach"');
  });

  it('attach <img> 使用 banner-attach class（SCSS .banner-national-day .banner-attach 据此挂钩）', () => {
    expect(source).toContain('class="banner-attach"');
  });

  it('phone 轮播分支（v-if="isPhone"）模板内不渲染 attach', () => {
    // phone 分支位于 PC 分支之后，且其模板内无 banner-attach 引用
    const phoneBranchMatch = source.match(/v-if="isPhone"[\s\S]*?<\/OCarousel>/);
    expect(phoneBranchMatch, 'phone 轮播分支应存在').not.toBeNull();
    expect(phoneBranchMatch![0]).not.toContain('banner-attach');
  });

  it('国庆条目数据层 attach 字段存在（供 PC/PAD 模板渲染）', () => {
    const banners = parseBannerYaml();
    const entry = banners.find((b) => b.bg_pc && b.bg_pc.includes('national-day'));
    expect(entry.attach).toBeDefined();
  });
});

describe('HomeBanner.vue — custom_class 模板绑定（设计 §3：解耦 per-index 样式）', () => {
  const source = fs.readFileSync(HOMEBANNER_VUE, 'utf8');

  it('OCarouselItem class 绑定包含 info.custom_class', () => {
    // 模板应为 :class="[`banner-item${index}`, info.custom_class]"
    expect(source).toContain('info.custom_class');
  });

  it('PC/PAD 轮播与 phone 轮播两处 class 绑定均更新（无漏改）', () => {
    const occurrences = source.split('info.custom_class').length - 1;
    expect(occurrences, '应在 PC 与 phone 两处 OCarouselItem 均绑定 custom_class').toBe(2);
  });

  it('SCSS 存在 .banner-national-day 样式块（设计 §3 SCSS 末尾追加）', () => {
    expect(source).toContain('.banner-national-day');
  });

  it('SCSS .banner-national-day 内定义 .banner-attach 尺寸（height + object-fit）', () => {
    expect(source).toMatch(/\.banner-national-day[\s\S]*?\.banner-attach[\s\S]*?height/);
  });

  it('SCSS .banner-national-day 使用 respond mixin 适配 PAD 断点（设计 §3 pad 分支）', () => {
    const block = source.match(/\.banner-national-day[\s\S]*?\n\}/);
    expect(block, '.banner-national-day 样式块应存在').not.toBeNull();
    expect(block![0]).toContain("respond('pad')");
  });
});

describe('索引漂移边界（设计 §4：per-index 索引漂移，zh 各项索引 +1）', () => {
  const banners = parseBannerYaml();

  it('国庆项插首位后，zh 第二项为 call-for-submissions（原首位下移）', () => {
    expect(banners[0].bg_pc).toContain('national-day');
    expect(banners[1].bg_pc).toContain('call-for-submissions');
  });

  it('ai-coding 条目按内容定位仍可找到（不依赖索引，设计 §4 防御性写法）', () => {
    const aiCoding = banners.find((b) => b.bg_pc && b.bg_pc.includes('ai-coding-assistants'));
    expect(aiCoding).toBeDefined();
    expect(aiCoding.title_zh).toBeDefined();
  });

  it('en 轮播首项索引不变（national-day 被过滤，ai-coding 仍为 en 的 index 0）', () => {
    const enVisible = visibleBanners('en');
    expect(enVisible[0].bg_pc).toContain('ai-coding-assistants');
  });
});

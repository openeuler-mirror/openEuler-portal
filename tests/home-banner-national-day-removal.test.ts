import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const NATIONAL_DAY_IMAGES_DIR = path.join(PROJECT_ROOT, '.content/home/images/national-day');
const HOMEBANNER_VUE_PATH = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/home/HomeBanner.vue'
);

function parseBannerYaml() {
  const content = fs.readFileSync(BANNER_YAML_PATH, 'utf8');
  return yaml.load(content) as Record<string, any>[];
}

// 复刻 HomeBanner.vue:30 的 locale 过滤逻辑：
//   foldI18n(banners, locale).filter(item => !item.locale || item.locale.split(',').includes(locale))
function visibleBanners(locale: 'zh' | 'en') {
  const banners = parseBannerYaml();
  return foldI18n(banners, locale).filter(
    (item: any) => !item.locale || item.locale.split(',').includes(locale)
  );
}

describe('国庆 banner 删除回归守卫（设计 §5：banner.yaml 不含 national-day 路径）', () => {
  const banners = parseBannerYaml();
  const rawYaml = fs.readFileSync(BANNER_YAML_PATH, 'utf8');

  it('banner.yaml 原文不含 "national-day" 字符串（防止条目被重新引入）', () => {
    expect(rawYaml, 'banner.yaml 原文不应出现 national-day').not.toContain('national-day');
  });

  it('解析后无任何条目的 bg_pc 引用 national-day', () => {
    const hits = banners.filter((b) => b.bg_pc && b.bg_pc.includes('national-day'));
    expect(hits, '不应存在 bg_pc 引用 national-day 的条目').toHaveLength(0);
  });

  it('解析后无任何条目的 bg_pad 引用 national-day', () => {
    const hits = banners.filter((b) => b.bg_pad && b.bg_pad.includes('national-day'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 bg_mb 引用 national-day', () => {
    const hits = banners.filter((b) => b.bg_mb && b.bg_mb.includes('national-day'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 attach 引用 national-day', () => {
    const hits = banners.filter((b) => b.attach && b.attach.includes('national-day'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目 custom_class 为 banner-national-day', () => {
    const hits = banners.filter((b) => b.custom_class === 'banner-national-day');
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目含 attach 字段（national-day 是唯一使用 attach 的条目）', () => {
    const hits = banners.filter((b) => b.attach !== undefined);
    expect(hits).toHaveLength(0);
  });
});

describe('国庆 banner 图片资产删除守卫（设计 §4 边界 / §6 预览清单）', () => {
  it('.content/home/images/national-day/ 目录已删除', () => {
    expect(
      fs.existsSync(NATIONAL_DAY_IMAGES_DIR),
      `${NATIONAL_DAY_IMAGES_DIR} 不应存在`
    ).toBe(false);
  });

  it('national-day/pc.png 已删除', () => {
    expect(fs.existsSync(path.join(NATIONAL_DAY_IMAGES_DIR, 'pc.png'))).toBe(false);
  });

  it('national-day/pad.png 已删除', () => {
    expect(fs.existsSync(path.join(NATIONAL_DAY_IMAGES_DIR, 'pad.png'))).toBe(false);
  });

  it('national-day/mb.png 已删除', () => {
    expect(fs.existsSync(path.join(NATIONAL_DAY_IMAGES_DIR, 'mb.png'))).toBe(false);
  });

  it('national-day/attach.png 已删除', () => {
    expect(fs.existsSync(path.join(NATIONAL_DAY_IMAGES_DIR, 'attach.png'))).toBe(false);
  });
});

describe('HomeBanner.vue 专属 SCSS 清理守卫（设计 §3 关键改动点）', () => {
  const vueSource = fs.readFileSync(HOMEBANNER_VUE_PATH, 'utf8');

  it('HomeBanner.vue 不含 .banner-national-day SCSS 选择器', () => {
    expect(vueSource).not.toContain('banner-national-day');
  });

  it('HomeBanner.vue 不含 "national-day" 字符串（防止残留注释 / 条件分支）', () => {
    expect(vueSource).not.toContain('national-day');
  });
});

describe('删除国庆条目后 banner 数量与索引守卫（设计 §4 索引漂移）', () => {
  const banners = parseBannerYaml();

  it('raw 数组共 5 条（release / call-for-submissions / ai-coding / annual-report / download）', () => {
    expect(banners).toHaveLength(5);
  });

  it('raw[0] 为 release 条目', () => {
    expect(banners[0].bg_pc).toContain('images/release/');
  });

  it('raw[1] 为 call-for-submissions 条目（删国庆后从 index 2 上移到 index 1）', () => {
    expect(banners[1].bg_pc).toContain('call-for-submissions');
  });

  it('raw[2] 为 ai-coding-assistants 条目', () => {
    expect(banners[2].bg_pc).toContain('ai-coding-assistants');
  });

  it('raw[3] 为 annual-report 条目', () => {
    expect(banners[3].bg_pc).toContain('annual-report');
  });

  it('raw[4] 为 download 条目', () => {
    expect(banners[4].bg_pc).toContain('images/download/');
  });

  it('zh 可见 banner 共 5 条（national-day locale=zh 被删除后 zh 减 1）', () => {
    expect(visibleBanners('zh')).toHaveLength(5);
  });

  it('en 可见 banner 共 3 条（national-day 本就 locale=zh，en 端无变化）', () => {
    expect(visibleBanners('en')).toHaveLength(3);
  });
});

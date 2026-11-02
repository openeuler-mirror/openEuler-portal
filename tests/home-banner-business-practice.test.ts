import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const BUSINESS_PRACTICE_IMAGES_DIR = path.join(
  PROJECT_ROOT,
  '.content/home/images/business-practice'
);
const HOMEBANNER_VUE_PATH = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/home/HomeBanner.vue'
);

function parseBannerYaml() {
  const content = fs.readFileSync(BANNER_YAML_PATH, 'utf8');
  return yaml.load(content) as Record<string, any>[];
}

// 复刻 HomeBanner.vue:29-30 的 locale 过滤逻辑：
//   foldI18n(banners, locale).filter(item => !item.locale || item.locale.split(',').includes(locale))
function visibleBanners(locale: 'zh' | 'en') {
  const banners = parseBannerYaml();
  return foldI18n(banners, locale).filter(
    (item: any) => !item.locale || item.locale.split(',').includes(locale)
  );
}

describe('"商业实践单位遴选" banner 删除回归守卫（设计 §5：banner.yaml 不含 business-practice）', () => {
  const banners = parseBannerYaml();
  const rawYaml = fs.readFileSync(BANNER_YAML_PATH, 'utf8');

  it('banner.yaml 原文不含 "business-practice" 字符串（防止条目被重新引入）', () => {
    expect(rawYaml, 'banner.yaml 原文不应出现 business-practice').not.toContain('business-practice');
  });

  it('解析后无任何条目的 bg_pc 引用 business-practice', () => {
    const hits = banners.filter((b) => b.bg_pc && b.bg_pc.includes('business-practice'));
    expect(hits, '不应存在 bg_pc 引用 business-practice 的条目').toHaveLength(0);
  });

  it('解析后无任何条目的 bg_pad 引用 business-practice', () => {
    const hits = banners.filter((b) => b.bg_pad && b.bg_pad.includes('business-practice'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 bg_mb 引用 business-practice', () => {
    const hits = banners.filter((b) => b.bg_mb && b.bg_mb.includes('business-practice'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 attach 引用 business-practice', () => {
    const hits = banners.filter((b) => b.attach && b.attach.includes('business-practice'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目 custom_class 为 xinhuo', () => {
    const hits = banners.filter((b) => b.custom_class === 'xinhuo');
    expect(hits).toHaveLength(0);
  });
});

describe('"商业实践单位遴选" banner 图片资产删除守卫（设计 §3 关键改动点 / §6 预览清单）', () => {
  it('.content/home/images/business-practice/ 目录已删除', () => {
    expect(
      fs.existsSync(BUSINESS_PRACTICE_IMAGES_DIR),
      `${BUSINESS_PRACTICE_IMAGES_DIR} 不应存在`
    ).toBe(false);
  });

  it('business-practice/pc.jpg 已删除', () => {
    expect(fs.existsSync(path.join(BUSINESS_PRACTICE_IMAGES_DIR, 'pc.jpg'))).toBe(false);
  });

  it('business-practice/pad.jpg 已删除', () => {
    expect(fs.existsSync(path.join(BUSINESS_PRACTICE_IMAGES_DIR, 'pad.jpg'))).toBe(false);
  });

  it('business-practice/mb.jpg 已删除', () => {
    expect(fs.existsSync(path.join(BUSINESS_PRACTICE_IMAGES_DIR, 'mb.jpg'))).toBe(false);
  });
});

describe('HomeBanner.vue 专属 SCSS 清理守卫（设计 §3 关键改动点）', () => {
  const vueSource = fs.readFileSync(HOMEBANNER_VUE_PATH, 'utf8');

  it('HomeBanner.vue 不含 .xinhuo SCSS 选择器', () => {
    expect(vueSource).not.toContain('xinhuo');
  });

  it('HomeBanner.vue 不含 "business-practice" 字符串（防止残留注释 / 条件分支）', () => {
    expect(vueSource).not.toContain('business-practice');
  });
});

describe('删除"商业实践单位遴选"条目后 banner 数量与索引守卫（设计 §4 索引漂移）', () => {
  const banners = parseBannerYaml();

  it('raw 数组共 5 条（删 business-practice 与 call-for-submissions 后）', () => {
    expect(banners).toHaveLength(5);
  });

  it('raw[0] 为 summit 条目', () => {
    expect(banners[0].bg_pc).toContain('images/summit/');
  });

  it('raw[1] 为 release 条目（删 business-practice 后从 index 2 上移到 index 1）', () => {
    expect(banners[1].bg_pc).toContain('release');
  });

  it('raw[2] 为 ai-coding-assistants 条目（删 call-for-submissions 后从 index 3 上移到 index 2）', () => {
    expect(banners[2].bg_pc).toContain('ai-coding-assistants');
  });

  it('raw[3] 为 annual-report 条目', () => {
    expect(banners[3].bg_pc).toContain('annual-report');
  });

  it('raw[4] 为 download 条目', () => {
    expect(banners[4].bg_pc).toContain('images/download/');
  });

  it('zh 可见 banner 共 5 条（business-practice / call-for-submissions 均 locale=zh 被删除后 zh 减 2）', () => {
    expect(visibleBanners('zh')).toHaveLength(5);
  });

  it('en 可见 banner 共 4 条（business-practice / call-for-submissions 本就 locale=zh，en 端无变化）', () => {
    expect(visibleBanners('en')).toHaveLength(4);
  });
});

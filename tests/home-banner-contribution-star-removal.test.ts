import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const CONTRIBUTION_STAR_IMAGES_DIR = path.join(
  PROJECT_ROOT,
  '.content/home/images/contribution-star'
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

describe('贡献之星 banner 删除回归守卫（设计 §5：banner.yaml 不含 contribution-star）', () => {
  const banners = parseBannerYaml();
  const rawYaml = fs.readFileSync(BANNER_YAML_PATH, 'utf8');

  it('banner.yaml 原文不含 "contribution-star" 字符串（防止条目被重新引入）', () => {
    expect(rawYaml, 'banner.yaml 原文不应出现 contribution-star').not.toContain('contribution-star');
  });

  it('解析后无任何条目的 bg_pc 引用 contribution-star', () => {
    const hits = banners.filter((b) => b.bg_pc && b.bg_pc.includes('contribution-star'));
    expect(hits, '不应存在 bg_pc 引用 contribution-star 的条目').toHaveLength(0);
  });

  it('解析后无任何条目的 bg_pad 引用 contribution-star', () => {
    const hits = banners.filter((b) => b.bg_pad && b.bg_pad.includes('contribution-star'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 bg_mb 引用 contribution-star', () => {
    const hits = banners.filter((b) => b.bg_mb && b.bg_mb.includes('contribution-star'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 attach 引用 contribution-star', () => {
    const hits = banners.filter((b) => b.attach && b.attach.includes('contribution-star'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目 custom_class 为 contribution-star', () => {
    const hits = banners.filter((b) => b.custom_class === 'contribution-star');
    expect(hits).toHaveLength(0);
  });
});

describe('贡献之星 banner 图片资产删除守卫（设计 §3 关键改动点 / §6 预览清单）', () => {
  it('.content/home/images/contribution-star/ 目录已删除', () => {
    expect(
      fs.existsSync(CONTRIBUTION_STAR_IMAGES_DIR),
      `${CONTRIBUTION_STAR_IMAGES_DIR} 不应存在`
    ).toBe(false);
  });

  it('contribution-star/pc.jpg 已删除', () => {
    expect(fs.existsSync(path.join(CONTRIBUTION_STAR_IMAGES_DIR, 'pc.jpg'))).toBe(false);
  });

  it('contribution-star/pad.jpg 已删除', () => {
    expect(fs.existsSync(path.join(CONTRIBUTION_STAR_IMAGES_DIR, 'pad.jpg'))).toBe(false);
  });

  it('contribution-star/mb.jpg 已删除', () => {
    expect(fs.existsSync(path.join(CONTRIBUTION_STAR_IMAGES_DIR, 'mb.jpg'))).toBe(false);
  });

  it('contribution-star/text.png 已删除', () => {
    expect(fs.existsSync(path.join(CONTRIBUTION_STAR_IMAGES_DIR, 'text.png'))).toBe(false);
  });
});

describe('HomeBanner.vue 专属 SCSS 清理守卫（设计 §3 关键改动点）', () => {
  const vueSource = fs.readFileSync(HOMEBANNER_VUE_PATH, 'utf8');

  it('HomeBanner.vue 不含 .contribution-star SCSS 选择器', () => {
    expect(vueSource).not.toContain('contribution-star');
  });

  it('HomeBanner.vue 不含 "贡献之星" 字符串（防止残留注释 / 条件分支）', () => {
    expect(vueSource).not.toContain('贡献之星');
  });
});

describe('删除贡献之星条目后 banner 数量与索引守卫（设计 §4 索引漂移）', () => {
  const banners = parseBannerYaml();

  it('raw 数组共 7 条（删 contribution-star 后 8→7）', () => {
    expect(banners).toHaveLength(7);
  });

  it('raw[0] 为 summit 条目', () => {
    expect(banners[0].bg_pc).toContain('images/summit/');
  });

  it('raw[1] 为 business-practice 条目', () => {
    expect(banners[1].bg_pc).toContain('business-practice');
  });

  it('raw[2] 为 release 条目（删 contribution-star 后从 index 3 上移到 index 2）', () => {
    expect(banners[2].bg_pc).toContain('release');
  });

  it('raw[3] 为 call-for-submissions 条目', () => {
    expect(banners[3].bg_pc).toContain('call-for-submissions');
  });

  it('raw[4] 为 ai-coding-assistants 条目', () => {
    expect(banners[4].bg_pc).toContain('ai-coding-assistants');
  });

  it('raw[5] 为 annual-report 条目', () => {
    expect(banners[5].bg_pc).toContain('annual-report');
  });

  it('raw[6] 为 download 条目', () => {
    expect(banners[6].bg_pc).toContain('images/download/');
  });

  it('zh 可见 banner 共 7 条（contribution-star locale=zh 被删除后 zh 减 1）', () => {
    expect(visibleBanners('zh')).toHaveLength(7);
  });

  it('en 可见 banner 共 4 条（contribution-star 本就 locale=zh，en 端无变化）', () => {
    expect(visibleBanners('en')).toHaveLength(4);
  });
});

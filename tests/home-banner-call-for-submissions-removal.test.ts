import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const CALL_FOR_SUBMISSIONS_IMAGES_DIR = path.join(
  PROJECT_ROOT,
  '.content/home/images/call-for-submissions'
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

describe('有奖征稿 banner 删除回归守卫（设计 §3：banner.yaml 不含 call-for-submissions）', () => {
  const banners = parseBannerYaml();
  const rawYaml = fs.readFileSync(BANNER_YAML_PATH, 'utf8');

  it('banner.yaml 原文不含 "call-for-submissions" 字符串（防止条目被重新引入）', () => {
    expect(rawYaml, 'banner.yaml 原文不应出现 call-for-submissions').not.toContain(
      'call-for-submissions'
    );
  });

  it('解析后无任何条目的 bg_pc 引用 call-for-submissions', () => {
    const hits = banners.filter((b) => b.bg_pc && b.bg_pc.includes('call-for-submissions'));
    expect(hits, '不应存在 bg_pc 引用 call-for-submissions 的条目').toHaveLength(0);
  });

  it('解析后无任何条目的 bg_pad 引用 call-for-submissions', () => {
    const hits = banners.filter((b) => b.bg_pad && b.bg_pad.includes('call-for-submissions'));
    expect(hits).toHaveLength(0);
  });

  it('解析后无任何条目的 bg_mb 引用 call-for-submissions', () => {
    const hits = banners.filter(
      (b) =>
        (b.bg_mb && b.bg_mb.includes('call-for-submissions')) ||
        (b.bg_mb_zh && b.bg_mb_zh.includes('call-for-submissions')) ||
        (b.bg_mb_en && b.bg_mb_en.includes('call-for-submissions'))
    );
    expect(hits).toHaveLength(0);
  });
});

describe('有奖征稿 banner 图片资产删除守卫（设计 §3 关键改动点 / §6 预览清单）', () => {
  it('.content/home/images/call-for-submissions/ 目录已删除', () => {
    expect(
      fs.existsSync(CALL_FOR_SUBMISSIONS_IMAGES_DIR),
      `${CALL_FOR_SUBMISSIONS_IMAGES_DIR} 不应存在`
    ).toBe(false);
  });

  it('call-for-submissions/pc.jpg 已删除', () => {
    expect(fs.existsSync(path.join(CALL_FOR_SUBMISSIONS_IMAGES_DIR, 'pc.jpg'))).toBe(false);
  });

  it('call-for-submissions/pad.jpg 已删除', () => {
    expect(fs.existsSync(path.join(CALL_FOR_SUBMISSIONS_IMAGES_DIR, 'pad.jpg'))).toBe(false);
  });

  it('call-for-submissions/mb.jpg 已删除', () => {
    expect(fs.existsSync(path.join(CALL_FOR_SUBMISSIONS_IMAGES_DIR, 'mb.jpg'))).toBe(false);
  });
});

describe('删除有奖征稿条目后 banner 数量与索引守卫（设计 §3 / §4 索引漂移）', () => {
  const banners = parseBannerYaml();

  it('raw 数组共 5 条（summit / release / ai-coding-assistants / annual-report / download）', () => {
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

  it('zh 可见 banner 共 5 条（call-for-submissions locale=zh 被删除后 zh 减 1）', () => {
    expect(visibleBanners('zh')).toHaveLength(5);
  });

  it('en 可见 banner 共 4 条（call-for-submissions 本就 locale=zh，en 端无变化）', () => {
    expect(visibleBanners('en')).toHaveLength(4);
  });
});

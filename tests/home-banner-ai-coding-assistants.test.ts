import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const BANNER_YAML_PATH = path.join(PROJECT_ROOT, '.content/home/banner.yaml');
const IMAGES_DIR = path.join(PROJECT_ROOT, '.content/home/images/ai-coding-assistants');

function parseBannerYaml() {
  const content = fs.readFileSync(BANNER_YAML_PATH, 'utf8');
  return yaml.load(content) as Record<string, any>[];
}

function isValidJpg(filePath: string): boolean {
  const buf = fs.readFileSync(filePath);
  return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

describe('banner.yaml — 新增 AI coding assistants 轮播条目（设计 §3）', () => {
  const banners = parseBannerYaml();

  it('banner.yaml 可解析为非空数组', () => {
    expect(Array.isArray(banners)).toBe(true);
    expect(banners.length).toBeGreaterThanOrEqual(4);
  });

  it('第一条轮播为 AI coding assistants 条目', () => {
    const first = banners[0];
    expect(first.bg_pc).toContain('ai-coding-assistants');
  });

  it('AI coding assistants 条目包含所有必填字段', () => {
    const first = banners[0];
    expect(first.bg_pc).toBeDefined();
    expect(first.bg_pad).toBeDefined();
    expect(first.bg_theme).toBeDefined();
    expect(first.title_zh).toBeDefined();
    expect(first.title_en).toBeDefined();
    expect(first.href_zh).toBeDefined();
    expect(first.href_en).toBeDefined();
  });

  it('bg_mb_zh 和 bg_mb_en 均存在（中英文移动端不同）', () => {
    const first = banners[0];
    expect(first.bg_mb_zh).toBeDefined();
    expect(first.bg_mb_en).toBeDefined();
    expect(first.bg_mb).toBeUndefined();
  });

  it('bg_theme 为 light', () => {
    const first = banners[0];
    expect(first.bg_theme).toBe('light');
  });

  it('title_zh 包含"生成式AI"关键词', () => {
    const first = banners[0];
    expect(first.title_zh).toContain('生成式AI');
  });

  it('title_en 包含 "Generative AI" 或 "AI" 关键词', () => {
    const first = banners[0];
    expect(first.title_en).toContain('AI');
  });

  it('btn_zh 和 btn_en 均存在', () => {
    const first = banners[0];
    expect(first.btn_zh).toBeDefined();
    expect(first.btn_en).toBeDefined();
  });

  it('href_zh 指向 openeuler.openatom.cn 中文页面', () => {
    const first = banners[0];
    expect(first.href_zh).toContain('openeuler.openatom.cn/zh/community/ai-coding-assistants');
  });

  it('href_en 指向 openeuler.openatom.cn 英文页面', () => {
    const first = banners[0];
    expect(first.href_en).toContain('openeuler.openatom.cn/en/community/ai-coding-assistants');
  });

  it('is_blank 为 true（新窗口打开）', () => {
    const first = banners[0];
    expect(first.is_blank).toBe(true);
  });

  it('图片路径使用相对路径 ./images/ 前缀', () => {
    const first = banners[0];
    expect(first.bg_pc).toMatch(/^\.\//);
    expect(first.bg_pad).toMatch(/^\.\//);
    expect(first.bg_mb_zh).toMatch(/^\.\//);
    expect(first.bg_mb_en).toMatch(/^\.\//);
  });

  it('图片路径遵循 <活动名>/pc.jpg / pad.jpg / mb.jpg / mb_en.jpg 命名约定', () => {
    const first = banners[0];
    expect(first.bg_pc).toBe('./images/ai-coding-assistants/pc.jpg');
    expect(first.bg_pad).toBe('./images/ai-coding-assistants/pad.jpg');
    expect(first.bg_mb_zh).toBe('./images/ai-coding-assistants/mb.jpg');
    expect(first.bg_mb_en).toBe('./images/ai-coding-assistants/mb_en.jpg');
  });
});

describe('AI coding assistants 轮播图片资源（设计 §3 / §6 预览清单）', () => {
  const requiredImages = ['pc.jpg', 'pad.jpg', 'mb.jpg', 'mb_en.jpg'];

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

    it(`${img} 文件大小合理（10KB~1MB）`, () => {
      const p = path.join(IMAGES_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 10KB`).toBeGreaterThanOrEqual(10 * 1024);
      expect(size, `${img} 应 ≤ 1MB`).toBeLessThanOrEqual(1024 * 1024);
    });
  });
});

describe('foldI18n — bg_mb_zh/bg_mb_en 折叠为 bg_mb（设计 §2 数据流转）', () => {
  const mockBannerItem = {
    bg_pc: './images/ai-coding-assistants/pc.jpg',
    bg_pad: './images/ai-coding-assistants/pad.jpg',
    bg_mb_zh: './images/ai-coding-assistants/mb.jpg',
    bg_mb_en: './images/ai-coding-assistants/mb_en.jpg',
    bg_theme: 'light',
    title_zh: '中文标题',
    title_en: 'English Title',
    btn_zh: '查看详情',
    btn_en: 'View More',
    href_zh: 'https://example.com/zh/',
    href_en: 'https://example.com/en/',
    is_blank: true,
  };

  it('zh locale 下 bg_mb_zh 折叠为 bg_mb', () => {
    const result = foldI18n(mockBannerItem, 'zh') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/ai-coding-assistants/mb.jpg');
    expect(result.bg_mb_zh).toBeUndefined();
    expect(result.bg_mb_en).toBeUndefined();
  });

  it('en locale 下 bg_mb_en 折叠为 bg_mb', () => {
    const result = foldI18n(mockBannerItem, 'en') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/ai-coding-assistants/mb_en.jpg');
    expect(result.bg_mb_zh).toBeUndefined();
    expect(result.bg_mb_en).toBeUndefined();
  });

  it('zh locale 下 title_zh 折叠为 title', () => {
    const result = foldI18n(mockBannerItem, 'zh') as Record<string, any>;
    expect(result.title).toBe('中文标题');
    expect(result.title_zh).toBeUndefined();
    expect(result.title_en).toBeUndefined();
  });

  it('en locale 下 title_en 折叠为 title', () => {
    const result = foldI18n(mockBannerItem, 'en') as Record<string, any>;
    expect(result.title).toBe('English Title');
    expect(result.title_zh).toBeUndefined();
    expect(result.title_en).toBeUndefined();
  });

  it('zh locale 下 btn_zh 折叠为 btn', () => {
    const result = foldI18n(mockBannerItem, 'zh') as Record<string, any>;
    expect(result.btn).toBe('查看详情');
  });

  it('en locale 下 btn_en 折叠为 btn', () => {
    const result = foldI18n(mockBannerItem, 'en') as Record<string, any>;
    expect(result.btn).toBe('View More');
  });

  it('非 i18n 字段（bg_pc, bg_pad, bg_theme, is_blank）保持不变', () => {
    const resultZh = foldI18n(mockBannerItem, 'zh') as Record<string, any>;
    expect(resultZh.bg_pc).toBe('./images/ai-coding-assistants/pc.jpg');
    expect(resultZh.bg_pad).toBe('./images/ai-coding-assistants/pad.jpg');
    expect(resultZh.bg_theme).toBe('light');
    expect(resultZh.is_blank).toBe(true);
  });

  it('数组形式调用 foldI18n — 每个 item 均被正确折叠', () => {
    const items = [mockBannerItem, { ...mockBannerItem, title_zh: '另一个' }];
    const result = foldI18n(items, 'zh') as Record<string, any>[];
    expect(result[0].title).toBe('中文标题');
    expect(result[1].title).toBe('另一个');
  });
});

describe('foldI18n — bg_mb 无后缀共用场景（现有 banner 条目兼容性）', () => {
  const sharedMbItem = {
    bg_pc: './images/release/pc.jpg',
    bg_pad: './images/release/pad.jpg',
    bg_mb: './images/release/mb.jpg',
    bg_theme: 'light',
    title_zh: '发布',
    title_en: 'Release',
  };

  it('zh locale 下 bg_mb 保持不变（无后缀共用）', () => {
    const result = foldI18n(sharedMbItem, 'zh') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/release/mb.jpg');
  });

  it('en locale 下 bg_mb 保持不变（无后缀共用）', () => {
    const result = foldI18n(sharedMbItem, 'en') as Record<string, any>;
    expect(result.bg_mb).toBe('./images/release/mb.jpg');
  });
});

describe('banner.yaml 整体数据完整性（设计 §3 / §5 测试策略）', () => {
  const banners = parseBannerYaml();

  it('所有 banner 条目均包含 bg_pc 字段', () => {
    for (const item of banners) {
      expect(item.bg_pc, `条目应包含 bg_pc: ${JSON.stringify(item)}`).toBeDefined();
    }
  });

  it('所有 banner 条目均包含 bg_pad 字段', () => {
    for (const item of banners) {
      expect(item.bg_pad, `条目应包含 bg_pad`).toBeDefined();
    }
  });

  it('所有 banner 条目均包含 bg_theme 字段且值为 light 或 dark', () => {
    for (const item of banners) {
      expect(['light', 'dark'], `bg_theme 应为 light 或 dark`).toContain(item.bg_theme);
    }
  });

  it('所有 banner 条目均包含 title_zh 和 title_en（locale 限定条目可省略另一语言）', () => {
    for (const item of banners) {
      const locales = item.locale ? item.locale.split(',') : ['zh', 'en'];
      if (locales.includes('zh')) {
        expect(item.title_zh, 'zh 可见条目应包含 title_zh').toBeDefined();
      }
      if (locales.includes('en')) {
        expect(item.title_en, 'en 可见条目应包含 title_en').toBeDefined();
      }
    }
  });

  it('所有 banner 条目均包含 href_zh 和 href_en（locale 限定条目可省略另一语言）', () => {
    for (const item of banners) {
      const locales = item.locale ? item.locale.split(',') : ['zh', 'en'];
      if (locales.includes('zh')) {
        expect(item.href_zh, 'zh 可见条目应包含 href_zh').toBeDefined();
      }
      if (locales.includes('en')) {
        expect(item.href_en, 'en 可见条目应包含 href_en').toBeDefined();
      }
    }
  });

  it('移动端背景图字段规则: bg_mb_zh/bg_mb_en 或 bg_mb 三选一/二', () => {
    for (const item of banners) {
      const hasMb = item.bg_mb !== undefined;
      const hasMbZh = item.bg_mb_zh !== undefined;
      const hasMbEn = item.bg_mb_en !== undefined;
      const hasI18nMb = hasMbZh || hasMbEn;
      if (hasI18nMb) {
        expect(hasMb, '不应同时存在 bg_mb 和 bg_mb_zh/en').toBe(false);
      }
      if (hasMbZh) {
        expect(hasMbEn, 'bg_mb_zh 和 bg_mb_en 应同时存在').toBe(true);
      }
      if (hasMbEn) {
        expect(hasMbZh, 'bg_mb_zh 和 bg_mb_en 应同时存在').toBe(true);
      }
    }
  });
});

describe('banner.yaml 引用的图片文件均存在（设计 §4 边界）', () => {
  const banners = parseBannerYaml();
  const imageFields = ['bg_pc', 'bg_pad', 'bg_mb', 'bg_mb_zh', 'bg_mb_en'];

  for (let i = 0; i < banners.length; i++) {
    const item = banners[i];
    for (const field of imageFields) {
      if (item[field] !== undefined) {
        it(`banner[${i}].${field} → ${item[field]} 物理文件存在`, () => {
          const relativePath = item[field].replace(/^\.\//, '');
          const absPath = path.join(PROJECT_ROOT, '.content/home', relativePath);
          expect(fs.existsSync(absPath), `图片文件应存在: ${absPath}`).toBe(true);
        });
      }
    }
  }
});

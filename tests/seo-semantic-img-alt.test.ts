import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const SRC_NEW = 'app/.vitepress/src-new';
const SRC_OLD = 'app/.vitepress/src';

function readSrc(rel: string) {
  return fs.readFileSync(path.join(PROJECT_ROOT, rel), 'utf8');
}

const HomeDisplayZone = readSrc(`${SRC_NEW}/views/home/HomeDisplayZone.vue`);
const HomeIntro = readSrc(`${SRC_NEW}/views/home/HomeIntro.vue`);
const HomeShowCase = readSrc(`${SRC_NEW}/views/home/HomeShowCase.vue`);
const OMZone = readSrc(`${SRC_OLD}/views/om/OMZone.vue`);
const FaqMd = readSrc('app/en/faq/index.md');

// ==================== A. img alt 补齐 ====================

describe('img alt — HomeDisplayZone 装饰性图标 alt 留空', () => {
  it('display-zone-item 图标 <img> 用 alt="" （装饰性图片，邻接有 title 文本）', () => {
    const imgTag =
      HomeDisplayZone.match(/<img[\s\S]*?class="display-zone-item-icon"[\s\S]*?\/>/)?.[0] ?? '';
    expect(imgTag, '未找到 display-zone-item-icon <img>').toBeTruthy();
    expect(imgTag).toContain('alt=""');
    expect(imgTag).not.toContain(':alt="item.title"');
  });

  it('HomeDisplayZone 不再含重复静态 alt="openEuler"', () => {
    expect(HomeDisplayZone).not.toContain('alt="openEuler"');
  });
});

describe('img alt — HomeIntro 内容图绑定 introData[active].alt', () => {
  it('PC 与 mobile 两处 intro 图均用 :alt="introData[active]?.alt || \'\'"', () => {
    const matches = HomeIntro.match(/:alt="introData\[active\]\?\.alt \|\| ''"/g);
    expect(matches, '应至少 2 处动态 alt 绑定').toBeTruthy();
    expect(matches!.length).toBeGreaterThanOrEqual(2);
  });

  it('HomeIntro 不再含静态 alt="openEuler"', () => {
    expect(HomeIntro).not.toContain('alt="openEuler"');
  });

  it('HomeIntro 不再用 .title 作为 alt', () => {
    expect(HomeIntro).not.toContain(':alt="introData[active]?.title');
  });
});

describe('img alt — HomeShowCase OFigure 装饰性图片 alt 留空', () => {
  it('right-img 的 <OFigure> 含 :src 与 alt="" （装饰性图片）', () => {
    const ofigureTag =
      HomeShowCase.match(/<OFigure[\s\S]*?\/>/)?.[0] ?? '';
    expect(ofigureTag, '未找到 <OFigure/> 标签').toBeTruthy();
    expect(ofigureTag).toContain(':src="cases[activeTab].img"');
    expect(ofigureTag).toContain('alt=""');
    expect(ofigureTag).not.toContain(':alt="cases[activeTab].label"');
  });
});

describe('img alt — OMZone 二维码图 alt 留空（邻接有 label 文本）', () => {
  it('qr-code <img> 用 alt="" 而非 :alt="label"', () => {
    const imgTag = OMZone.match(/<img class="qr-code"[\s\S]*?\/>/)?.[0] ?? '';
    expect(imgTag, '未找到 qr-code <img>').toBeTruthy();
    expect(imgTag).toContain('alt=""');
    expect(imgTag).not.toContain(':alt="label"');
  });
});

// ==================== faq md 图片 alt ====================

describe('faq md — 内容图具名 alt，装饰 note 图标保持空 alt', () => {
  // 收集所有 markdown 图片 ![alt](url)
  const images = [...FaqMd.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({
    alt: m[1],
    url: m[2],
  }));

  it('faq md 至少有 15 张图片（本次改动覆盖范围）', () => {
    expect(images.length).toBeGreaterThanOrEqual(15);
  });

  it('所有空 alt 图片仅为装饰性 icon-note.gif', () => {
    const emptyAlt = images.filter((i) => i.alt.trim() === '');
    for (const img of emptyAlt) {
      expect(
        img.url,
        `空 alt 图片非装饰 note 图标：${img.url}`
      ).toContain('icon-note.gif');
    }
  });

  it('所有内容图（非 icon-note.gif）均有非空描述性 alt', () => {
    const contentImgs = images.filter((i) => !i.url.includes('icon-note.gif'));
    expect(contentImgs.length).toBeGreaterThan(0);
    for (const img of contentImgs) {
      expect(
        img.alt.trim().length,
        `内容图缺描述性 alt：${img.url}`
      ).toBeGreaterThan(0);
      // 描述性 alt 不应是占位符 fig
      expect(img.alt.trim()).not.toBe('fig');
    }
  });

  it('内容图 alt 长度 ≤ 125 字符（W3C 建议）', () => {
    const contentImgs = images.filter((i) => !i.url.includes('icon-note.gif'));
    for (const img of contentImgs) {
      expect(
        img.alt.length,
        `alt 过长（${img.alt.length}）：${img.alt}`
      ).toBeLessThanOrEqual(125);
    }
  });
});

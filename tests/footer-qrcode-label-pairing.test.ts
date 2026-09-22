import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const APP_FOOTER_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/components/AppFooter.vue'
);
const FOOTER_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/assets/category/footer'
);
const I18N_FOOTER_ZH = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/i18n/footer/footer-zh.ts'
);
const I18N_FOOTER_EN = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/i18n/footer/footer-en.ts'
);

const RAW = fs.readFileSync(APP_FOOTER_VUE, 'utf8');

interface QrcodeItem {
  img: string;
  labelKey: string;
}

/**
 * 从 AppFooter.vue 源码中抽取 `const qrcode = [ ... ];` 数组块。
 */
function extractQrcodeBlock(src: string): string {
  const startIdx = src.indexOf('const qrcode = [');
  expect(startIdx, '应存在 const qrcode = [ 数组定义').toBeGreaterThan(-1);
  const closeIdx = src.indexOf('];', startIdx);
  expect(closeIdx, 'qrcode 数组应以 ]; 闭合').toBeGreaterThan(startIdx);
  return src.slice(startIdx, closeIdx + 2);
}

/**
 * 从 qrcode 数组块中解析出每一项 { img, label }。
 * 形如 `{ img: CodeImgZgz, label: t('footer.qrCode'), }`。
 */
function extractQrcodeItems(blockSrc: string): QrcodeItem[] {
  const items: QrcodeItem[] = [];
  const itemRegex =
    /\{\s*img:\s*(\w+)\s*,\s*label:\s*t\(['"]footer\.(\w+)['"]\)\s*,?\s*\}/g;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(blockSrc)) !== null) {
    items.push({ img: match[1], labelKey: match[2] });
  }
  return items;
}

describe('AppFooter.vue — qrcode 数组存在性与结构（设计 §3）', () => {
  it('源码中存在 const qrcode = [ 数组定义', () => {
    expect(RAW.includes('const qrcode = ['), '应有 const qrcode = [').toBe(true);
  });

  it('qrcode 数组恰好包含 2 个条目（小助手 + 公众号）', () => {
    const block = extractQrcodeBlock(RAW);
    const items = extractQrcodeItems(block);
    expect(items.length, '应有 2 个 qrcode 条目').toBe(2);
  });
});

describe('AppFooter.vue — img/label 配对一致性（维护者评审：交换二维码，保持公众号在前顺序）', () => {
  const block = extractQrcodeBlock(RAW);
  const items = extractQrcodeItems(block);

  it('第 1 项：img=CodeImgZgz（公众号码）配 label=qrCode（公众号）', () => {
    expect(items[0]?.img, '第 1 项 img 应为 CodeImgZgz').toBe('CodeImgZgz');
    expect(items[0]?.labelKey, '第 1 项 label 应为 qrCode').toBe('qrCode');
  });

  it('第 2 项：img=CodeImgXzs（小助手码）配 label=qrAssistant（小助手）', () => {
    expect(items[1]?.img, '第 2 项 img 应为 CodeImgXzs').toBe('CodeImgXzs');
    expect(items[1]?.labelKey, '第 2 项 label 应为 qrAssistant').toBe(
      'qrAssistant'
    );
  });

  it('回归守卫：不再出现旧的错位配对（CodeImgXzs+qrCode）', () => {
    const brokenRegex =
      /\{\s*img:\s*CodeImgXzs\s*,\s*label:\s*t\(['"]footer\.qrCode['"]\)/;
    expect(brokenRegex.test(block), '不应再出现 CodeImgXzs 配 qrCode 的错位').toBe(
      false
    );
  });

  it('回归守卫：不再出现旧的错位配对（CodeImgZgz+qrAssistant）', () => {
    const brokenRegex =
      /\{\s*img:\s*CodeImgZgz\s*,\s*label:\s*t\(['"]footer\.qrAssistant['"]\)/;
    expect(
      brokenRegex.test(block),
      '不应再出现 CodeImgZgz 配 qrAssistant 的错位'
    ).toBe(false);
  });

  it('顺序守卫（维护者要求）：第 1 项为公众号（qrCode）、第 2 项为小助手（qrAssistant），顺序不可改变', () => {
    expect(items[0]?.labelKey, '第 1 项须为公众号 qrCode').toBe('qrCode');
    expect(items[1]?.labelKey, '第 2 项须为小助手 qrAssistant').toBe(
      'qrAssistant'
    );
  });
});

describe('AppFooter.vue — import 资源映射正确性（设计 §4 边界）', () => {
  it('CodeImgXzs import 自 code-xzs.png（小助手码素材）', () => {
    const importRegex =
      /import\s+CodeImgXzs\s+from\s+['"]~@\/assets\/category\/footer\/code-xzs\.png['"]/;
    expect(importRegex.test(RAW), '应 import CodeImgXzs 自 code-xzs.png').toBe(true);
  });

  it('CodeImgZgz import 自 code-zgz.jpg（公众号码素材）', () => {
    const importRegex =
      /import\s+CodeImgZgz\s+from\s+['"]~@\/assets\/category\/footer\/code-zgz\.jpg['"]/;
    expect(importRegex.test(RAW), '应 import CodeImgZgz 自 code-zgz.jpg').toBe(true);
  });

  it('两个二维码素材文件均存在且非空', () => {
    const xzs = path.join(FOOTER_DIR, 'code-xzs.png');
    const zgz = path.join(FOOTER_DIR, 'code-zgz.jpg');
    expect(fs.existsSync(xzs), 'code-xzs.png 应存在').toBe(true);
    expect(fs.existsSync(zgz), 'code-zgz.jpg 应存在').toBe(true);
    expect(fs.statSync(xzs).size, 'code-xzs.png 应非空').toBeGreaterThan(0);
    expect(fs.statSync(zgz).size, 'code-zgz.jpg 应非空').toBeGreaterThan(0);
  });
});

describe('i18n — label 语义与图片命名含义一致（设计 §1 / §4）', () => {
  it('zh: qrCode = openEuler公众号（对应 code-zgz 公众号码）', () => {
    const zh = fs.readFileSync(I18N_FOOTER_ZH, 'utf8');
    const m = zh.match(/qrCode:\s*['"]([^'']+)['"]/);
    expect(m, 'zh footer 应定义 qrCode').toBeTruthy();
    expect(m![1], 'qrCode 应为 openEuler公众号').toContain('公众号');
  });

  it('zh: qrAssistant = openEuler小助手（对应 code-xzs 小助手码）', () => {
    const zh = fs.readFileSync(I18N_FOOTER_ZH, 'utf8');
    const m = zh.match(/qrAssistant:\s*['"]([^'']+)['"]/);
    expect(m, 'zh footer 应定义 qrAssistant').toBeTruthy();
    expect(m![1], 'qrAssistant 应为 openEuler小助手').toContain('小助手');
  });

  it('en: qrCode / qrAssistant 双语 key 同步存在（设计 §4 en 站不受影响）', () => {
    const en = fs.readFileSync(I18N_FOOTER_EN, 'utf8');
    expect(en.includes('qrCode'), 'en 应有 qrCode key').toBe(true);
    expect(en.includes('qrAssistant'), 'en 应有 qrAssistant key').toBe(true);
  });
});

describe('AppFooter.vue — en 站不渲染二维码 code-box（设计 §4 en 守护）', () => {
  it('qrcode prop 受 lang === "en" ? {} : qrcode 守护', () => {
    const guardRegex = /:qrcode="lang\s*===\s*['"]en['"]\s*\?\s*\{\}\s*:\s*qrcode"/;
    expect(
      guardRegex.test(RAW),
      '应通过 lang === "en" ? {} : qrcode 在 en 站隐藏二维码'
    ).toBe(true);
  });
});

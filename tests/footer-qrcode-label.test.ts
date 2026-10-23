import { expect, describe, it } from 'vitest';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');

type QrcodeItem = { img: string; label: string };
type FooterData = {
  qrcode: QrcodeItem[];
};

const zh = yaml.load(
  readFileSync(resolve(ROOT, '.content/footer/zh.yaml'), 'utf8')
) as FooterData;
const en = yaml.load(
  readFileSync(resolve(ROOT, '.content/footer/en.yaml'), 'utf8')
) as FooterData;

describe('页脚二维码中文 label 文案修正 — 设计 §改动清单', () => {
  it('zh.qrcode[0].label 为 "openEuler公众号"', () => {
    expect(zh.qrcode[0].label).toBe('openEuler公众号');
  });

  it('zh.qrcode[1].label 为 "openEuler小助手"', () => {
    expect(zh.qrcode[1].label).toBe('openEuler小助手');
  });

  it('zh.yaml 不再残留旧术语 "WeChat Subscription"', () => {
    expect(zh.qrcode[0].label).not.toBe('WeChat Subscription');
  });

  it('zh.yaml 不再残留旧术语 "WeChat Assistant"', () => {
    expect(zh.qrcode[1].label).not.toBe('WeChat Assistant');
  });
});

describe('页脚二维码结构 / 图片不变 — 设计 §不动的部分', () => {
  it('zh.qrcode 恰好 2 条', () => {
    expect(zh.qrcode).toHaveLength(2);
  });

  it('zh.qrcode[0].img 仍为 ./images/code-zgz.jpg（图片本身不变）', () => {
    expect(zh.qrcode[0].img).toBe('./images/code-zgz.jpg');
  });

  it('zh.qrcode[1].img 仍为 ./images/code-xzs.png（图片本身不变）', () => {
    expect(zh.qrcode[1].img).toBe('./images/code-xzs.png');
  });

  it('zh.qrcode 顺序保持（公众号在前, 小助手在后）', () => {
    const labels = zh.qrcode.map((q) => q.label);
    expect(labels).toEqual(['openEuler公众号', 'openEuler小助手']);
  });
});

describe('英文站二维码边界 — 设计 §i18n 单语漏改', () => {
  it('en.qrcode 仍为空数组（英文站不展示二维码, 无 label 文案面）', () => {
    expect(en.qrcode).toEqual([]);
  });

  it('en.yaml 无 qrcode label 文案（无需同步, 非 i18n 漏改）', () => {
    expect(en.qrcode.length).toBe(0);
  });
});

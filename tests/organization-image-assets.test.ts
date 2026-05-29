import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/organization');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');
const YANGJIGUO_PATH = path.join(IMAGES_DIR, 'yangjiguo.png');

function readPngDimensions(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  expect(buf[0], 'PNG signature byte 0').toBe(0x89);
  expect(buf[1], 'PNG signature byte 1').toBe(0x50);
  expect(buf[2], 'PNG signature byte 2').toBe(0x4e);
  expect(buf[3], 'PNG signature byte 3').toBe(0x47);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

describe('yangjiguo.png 图片替换 — 文件有效性', () => {
  it('yangjiguo.png 文件存在且非空', () => {
    expect(fs.existsSync(YANGJIGUO_PATH), 'yangjiguo.png 应存在').toBe(true);
    const stat = fs.statSync(YANGJIGUO_PATH);
    expect(stat.size, 'yangjiguo.png 文件大小应大于 0').toBeGreaterThan(0);
  });

  it('yangjiguo.png 是合法 PNG 格式(PNG 签名校验)', () => {
    const buf = fs.readFileSync(YANGJIGUO_PATH);
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
  });

  it('yangjiguo.png 是 RGBA 或 RGB PNG(非 JPEG masquerading)', () => {
    const buf = fs.readFileSync(YANGJIGUO_PATH);
    const ihdrColorType = buf[25];
    expect(
      [0, 2, 3, 4, 6].includes(ihdrColorType),
      `IHDR colorType=${ihdrColorType} 应为合法 PNG 类型(0=灰度,2=RGB,3=索引,4=灰度+Alpha,6=RGBA)`
    ).toBe(true);
  });

  it('yangjiguo.png 文件大小合理(1KB~500KB)', () => {
    const stat = fs.statSync(YANGJIGUO_PATH);
    expect(stat.size, 'yangjiguo.png 应 ≥ 1KB').toBeGreaterThanOrEqual(1024);
    expect(stat.size, 'yangjiguo.png 应 ≤ 500KB(头像图不应过大)').toBeLessThanOrEqual(500 * 1024);
  });
});

describe('yangjiguo.png 图片替换 — 尺寸校验', () => {
  it('yangjiguo.png 尺寸为正整数(非 0×0)', () => {
    const dims = readPngDimensions(YANGJIGUO_PATH);
    expect(dims.width, 'width 应 > 0').toBeGreaterThan(0);
    expect(dims.height, 'height 应 > 0').toBeGreaterThan(0);
  });

  it('yangjiguo.png 宽高比合理(接近正方形,适配圆形头像 CSS)', () => {
    const dims = readPngDimensions(YANGJIGUO_PATH);
    const ratio = dims.width / dims.height;
    expect(ratio, `宽高比 ${dims.width}×${dims.height} 应在 0.8~1.2 之间`).toBeGreaterThanOrEqual(0.8);
    expect(ratio, `宽高比 ${dims.width}×${dims.height} 应在 0.8~1.2 之间`).toBeLessThanOrEqual(1.2);
  });

  it('yangjiguo.png 分辨率不超过 500×500(头像图无需超高分辨率)', () => {
    const dims = readPngDimensions(YANGJIGUO_PATH);
    expect(dims.width, `width=${dims.width} 应 ≤ 500`).toBeLessThanOrEqual(500);
    expect(dims.height, `height=${dims.height} 应 ≤ 500`).toBeLessThanOrEqual(500);
  });
});

describe('yangjiguo.png 图片替换 — YAML 引用路径不变', () => {
  it('committee.yaml 中杨继国的 image 字段仍为 ./images/yangjiguo.png', () => {
    const committeeYaml = fs.readFileSync(path.join(CONTENT_DIR, 'committee.yaml'), 'utf8');
    const committee = yaml.load(committeeYaml) as any;
    const yangjiguo = committee.groups
      ?.flatMap((g: any) => g.members ?? [])
      ?.find((m: any) => m.name === '杨继国' || m.name_en === 'Yang Jiguo');
    expect(yangjiguo, 'committee.yaml 应有杨继国成员').toBeDefined();
    expect(yangjiguo.image, '杨继国 image 应为 ./images/yangjiguo.png').toBe('./images/yangjiguo.png');
  });
});

describe('yangjiguo.png 图片替换 — 边界:峰会嘉宾图不受影响', () => {
  const SUMMIT_YANGJIGUO = path.join(
    PROJECT_ROOT,
    'app/.vitepress/src/views/summit/summit2023/img/guest/yangjiguo.png'
  );

  it('summit 2023 yangjiguo.png 存在(边界:不应被联动修改)', () => {
    expect(fs.existsSync(SUMMIT_YANGJIGUO), '峰会嘉宾 yangjiguo.png 应存在').toBe(true);
  });

  it('organization yangjiguo 与 summit yangjiguo 是不同文件(不同路径/不同内容)', () => {
    const orgStat = fs.statSync(YANGJIGUO_PATH);
    const summitStat = fs.statSync(SUMMIT_YANGJIGUO);
    expect(YANGJIGUO_PATH).not.toBe(SUMMIT_YANGJIGUO);
    const orgBuf = fs.readFileSync(YANGJIGUO_PATH);
    const summitBuf = fs.readFileSync(SUMMIT_YANGJIGUO);
    expect(orgBuf.length === summitBuf.length && orgBuf.equals(summitBuf),
      'organization 与 summit 的 yangjiguo.png 应是不同文件(内容不同)').toBe(false);
  });
});
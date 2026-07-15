import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const ASSETS_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/assets/category/internship'
);
const LIGHT_PATH = path.join(ASSETS_DIR, 'submit-task-light.png');
const DARK_PATH = path.join(ASSETS_DIR, 'submit-task-dark.png');
const SUBMIT_TASK_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/components/SubmitTask.vue'
);

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

describe('submit-task 配图替换 — 文件有效性', () => {
  it('submit-task-light.png 文件存在且非空', () => {
    expect(fs.existsSync(LIGHT_PATH), 'submit-task-light.png 应存在').toBe(true);
    const stat = fs.statSync(LIGHT_PATH);
    expect(stat.size, '文件大小应大于 0').toBeGreaterThan(0);
  });

  it('submit-task-dark.png 文件存在且非空', () => {
    expect(fs.existsSync(DARK_PATH), 'submit-task-dark.png 应存在').toBe(true);
    const stat = fs.statSync(DARK_PATH);
    expect(stat.size, '文件大小应大于 0').toBeGreaterThan(0);
  });

  it('submit-task-light.png 是合法 PNG 格式(PNG 签名校验)', () => {
    const buf = fs.readFileSync(LIGHT_PATH);
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
  });

  it('submit-task-dark.png 是合法 PNG 格式(PNG 签名校验)', () => {
    const buf = fs.readFileSync(DARK_PATH);
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
  });

  it('两张配图是合法 PNG colorType(非 JPEG masquerading)', () => {
    const lightBuf = fs.readFileSync(LIGHT_PATH);
    const darkBuf = fs.readFileSync(DARK_PATH);
    const validColorTypes = [0, 2, 3, 4, 6];
    expect(
      validColorTypes.includes(lightBuf[25]),
      `light IHDR colorType=${lightBuf[25]} 应为合法 PNG 类型`
    ).toBe(true);
    expect(
      validColorTypes.includes(darkBuf[25]),
      `dark IHDR colorType=${darkBuf[25]} 应为合法 PNG 类型`
    ).toBe(true);
  });
});

describe('submit-task 配图替换 — 文件大小合理', () => {
  it('submit-task-light.png 文件大小合理(1KB~1MB)', () => {
    const stat = fs.statSync(LIGHT_PATH);
    expect(stat.size, '应 ≥ 1KB').toBeGreaterThanOrEqual(1024);
    expect(stat.size, '应 ≤ 1MB(流程配图不应过大)').toBeLessThanOrEqual(1024 * 1024);
  });

  it('submit-task-dark.png 文件大小合理(1KB~1MB)', () => {
    const stat = fs.statSync(DARK_PATH);
    expect(stat.size, '应 ≥ 1KB').toBeGreaterThanOrEqual(1024);
    expect(stat.size, '应 ≤ 1MB(流程配图不应过大)').toBeLessThanOrEqual(1024 * 1024);
  });
});

describe('submit-task 配图替换 — 尺寸校验', () => {
  it('submit-task-light.png 尺寸为正整数(非 0×0)', () => {
    const dims = readPngDimensions(LIGHT_PATH);
    expect(dims.width, 'width 应 > 0').toBeGreaterThan(0);
    expect(dims.height, 'height 应 > 0').toBeGreaterThan(0);
  });

  it('submit-task-dark.png 尺寸为正整数(非 0×0)', () => {
    const dims = readPngDimensions(DARK_PATH);
    expect(dims.width, 'width 应 > 0').toBeGreaterThan(0);
    expect(dims.height, 'height 应 > 0').toBeGreaterThan(0);
  });

  it('light 与 dark 配图尺寸一致(避免主题切换时排版跳变)', () => {
    const lightDims = readPngDimensions(LIGHT_PATH);
    const darkDims = readPngDimensions(DARK_PATH);
    expect(lightDims.width, 'light/dark 宽度应一致').toBe(darkDims.width);
    expect(lightDims.height, 'light/dark 高度应一致').toBe(darkDims.height);
  });
});

describe('SubmitTask.vue — import 路径与主题切换逻辑验证', () => {
  it('SubmitTask.vue 存在', () => {
    expect(fs.existsSync(SUBMIT_TASK_VUE), 'SubmitTask.vue 应存在').toBe(true);
  });

  it('SubmitTask.vue import 了 submit-task-light.png 路径', () => {
    const content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(
      content.includes('submit-task-light.png'),
      '应包含 submit-task-light.png import'
    ).toBe(true);
  });

  it('SubmitTask.vue import 了 submit-task-dark.png 路径', () => {
    const content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(
      content.includes('submit-task-dark.png'),
      '应包含 submit-task-dark.png import'
    ).toBe(true);
  });

  it('SubmitTask.vue 包含 isDark computed 逻辑(主题切换)', () => {
    const content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(
      content.includes('isDark'),
      '应包含 isDark computed 判断'
    ).toBe(true);
  });

  it('SubmitTask.vue flowImg computed 基于 isDark 切换 light/dark', () => {
    const content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(
      content.includes('isDark.value ? imgDark : imgLight'),
      'flowImg computed 应包含 isDark.value ? imgDark : imgLight 三元表达式'
    ).toBe(true);
  });

  it('SubmitTask.vue 模板使用 flowImg 作为 img src', () => {
    const content = fs.readFileSync(SUBMIT_TASK_VUE, 'utf8');
    expect(
      content.includes(':src="flowImg"'),
      '模板应包含 :src="flowImg"'
    ).toBe(true);
  });
});

describe('submit-task 配图替换 — 边界:其他 internship 配图不受影响', () => {
  const OTHER_LIGHT = path.join(ASSETS_DIR, 'internship-certificate-bg-light.png');
  const OTHER_DARK = path.join(ASSETS_DIR, 'internship-certificate-bg-dark.png');

  it('internship-certificate-bg-light.png 仍存在(不应被联动修改)', () => {
    expect(fs.existsSync(OTHER_LIGHT)).toBe(true);
  });

  it('internship-certificate-bg-dark.png 仍存在(不应被联动修改)', () => {
    expect(fs.existsSync(OTHER_DARK)).toBe(true);
  });
});

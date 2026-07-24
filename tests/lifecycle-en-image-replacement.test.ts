import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const ASSETS_DIR = path.join(PROJECT_ROOT, 'app/.vitepress/src-new/assets/category/lifecycle');
const VUE_PATH = path.join(PROJECT_ROOT, 'app/.vitepress/src-new/views/lifecycle/TheLifecycle.vue');

const NEW_EN_IMAGES = ['img-en1.jpg', 'img-en2.jpg'];
const OLD_EN_IMAGES_PNG = ['img-en1.png', 'img-en2.png'];
const ZH_IMAGES = ['img-zh1.jpg', 'img-zh2.jpg'];
const BANNER_IMAGE = 'banner.jpg';

function isValidJpeg(filePath: string): boolean {
  const buf = fs.readFileSync(filePath);
  return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

describe('英文站生命周期新 JPG 图片 — 文件有效性', () => {
  NEW_EN_IMAGES.forEach((img) => {
    it(`${img} 文件存在且非空`, () => {
      const p = path.join(ASSETS_DIR, img);
      expect(fs.existsSync(p), `${img} 应存在`).toBe(true);
      expect(fs.statSync(p).size, `${img} 文件大小应大于 0`).toBeGreaterThan(0);
    });

    it(`${img} 是合法 JPEG 格式(JFIF 签名校验)`, () => {
      const p = path.join(ASSETS_DIR, img);
      expect(isValidJpeg(p), `${img} 应为合法 JPEG`).toBe(true);
    });

    it(`${img} 文件大小合理(1KB~2MB)`, () => {
      const p = path.join(ASSETS_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 1KB`).toBeGreaterThanOrEqual(1024);
      expect(size, `${img} 应 ≤ 2MB`).toBeLessThanOrEqual(2 * 1024 * 1024);
    });
  });
});

describe('英文站生命周期旧 PNG 图片已移除', () => {
  OLD_EN_IMAGES_PNG.forEach((img) => {
    it(`${img} 不应存在(已被 JPG 替换)`, () => {
      const p = path.join(ASSETS_DIR, img);
      expect(fs.existsSync(p), `${img} 应已删除`).toBe(false);
    });
  });
});

describe('中文站生命周期图片未受影响', () => {
  ZH_IMAGES.forEach((img) => {
    it(`${img} 仍存在(不应被误删或替换)`, () => {
      const p = path.join(ASSETS_DIR, img);
      expect(fs.existsSync(p), `${img} 应存在`).toBe(true);
    });
  });

  it(`${BANNER_IMAGE} 仍存在(不应被误删或替换)`, () => {
    const p = path.join(ASSETS_DIR, BANNER_IMAGE);
    expect(fs.existsSync(p), `${BANNER_IMAGE} 应存在`).toBe(true);
  });
});

describe('TheLifecycle.vue import 引用路径 — 新 JPG 引用正确', () => {
  const vueContent = fs.readFileSync(VUE_PATH, 'utf8');

  it('import imgEn1 引用 img-en1.jpg(而非 .png)', () => {
    expect(vueContent).toContain('img-en1.jpg');
  });

  it('import imgEn2 引用 img-en2.jpg(而非 .png)', () => {
    expect(vueContent).toContain('img-en2.jpg');
  });
});

describe('TheLifecycle.vue import 引用路径 — zh 图片和 banner 未变', () => {
  const vueContent = fs.readFileSync(VUE_PATH, 'utf8');

  it('img-zh1.jpg import 仍为 .jpg 扩展名', () => {
    expect(vueContent).toContain('img-zh1.jpg');
  });

  it('img-zh2.jpg import 仍为 .jpg 扩展名', () => {
    expect(vueContent).toContain('img-zh2.jpg');
  });

  it('banner.jpg import 仍为 .jpg 扩展名', () => {
    expect(vueContent).toContain('banner.jpg');
  });
});

describe('TheLifecycle.vue import 引用路径 — 所有引用的图片文件均物理存在', () => {
  const vueContent = fs.readFileSync(VUE_PATH, 'utf8');
  const importLines = vueContent.split('\n').filter((l: string) => l.includes("from '~@/assets/category/lifecycle/"));
  const imgRefs = importLines.map((l: string) => {
    const m = l.match(/lifecycle\/([^']+)'/);
    return m ? m[1] : '';
  }).filter(Boolean);

  imgRefs.forEach((img) => {
    it(`${img} 物理文件存在`, () => {
      expect(fs.existsSync(path.join(ASSETS_DIR, img)), `${img} 应存在`).toBe(true);
    });
  });
});

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const ZH_IMAGES_DIR = path.join(PROJECT_ROOT, 'app/zh/blog/2022-11-25-cla/images');
const EN_IMAGES_DIR = path.join(PROJECT_ROOT, 'app/en/blog/2022-11-25-cla/images');
const ZH_MD_PATH = path.join(PROJECT_ROOT, 'app/zh/blog/2022-11-25-cla/CLA签署流程.md');
const EN_MD_PATH = path.join(PROJECT_ROOT, 'app/en/blog/2022-11-25-cla/CLA签署流程.md');

const ZH_NEW_IMAGES = ['cla-zh-1.png', 'cla-zh-2.png'];
const EN_NEW_IMAGES = ['cla-en-1.png', 'cla-en-2.png'];

function isValidPng(filePath: string): boolean {
  const buf = fs.readFileSync(filePath);
  return buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
}

function readPngDimensions(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

describe('CLA 博客新图片 — 文件有效性（设计 §3）', () => {
  ZH_NEW_IMAGES.forEach((img) => {
    it(`zh ${img} 文件存在且非空`, () => {
      const p = path.join(ZH_IMAGES_DIR, img);
      expect(fs.existsSync(p), `${img} 应存在`).toBe(true);
      expect(fs.statSync(p).size, `${img} 文件大小应大于 0`).toBeGreaterThan(0);
    });

    it(`zh ${img} 是合法 PNG 格式(PNG 签名校验)`, () => {
      const p = path.join(ZH_IMAGES_DIR, img);
      expect(isValidPng(p), `${img} 应为合法 PNG`).toBe(true);
    });

    it(`zh ${img} 文件大小合理(1KB~500KB)`, () => {
      const p = path.join(ZH_IMAGES_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 1KB`).toBeGreaterThanOrEqual(1024);
      expect(size, `${img} 应 ≤ 500KB`).toBeLessThanOrEqual(500 * 1024);
    });
  });

  EN_NEW_IMAGES.forEach((img) => {
    it(`en ${img} 文件存在且非空`, () => {
      const p = path.join(EN_IMAGES_DIR, img);
      expect(fs.existsSync(p), `${img} 应存在`).toBe(true);
      expect(fs.statSync(p).size, `${img} 文件大小应大于 0`).toBeGreaterThan(0);
    });

    it(`en ${img} 是合法 PNG 格式(PNG 签名校验)`, () => {
      const p = path.join(EN_IMAGES_DIR, img);
      expect(isValidPng(p), `${img} 应为合法 PNG`).toBe(true);
    });

    it(`en ${img} 文件大小合理(1KB~500KB)`, () => {
      const p = path.join(EN_IMAGES_DIR, img);
      const size = fs.statSync(p).size;
      expect(size, `${img} 应 ≥ 1KB`).toBeGreaterThanOrEqual(1024);
      expect(size, `${img} 应 ≤ 500KB`).toBeLessThanOrEqual(500 * 1024);
    });
  });
});

describe('CLA 博客新图片 — 尺寸校验（设计 §6 预览清单）', () => {
  ZH_NEW_IMAGES.forEach((img) => {
    it(`zh ${img} 尺寸为正整数(非 0×0)`, () => {
      const p = path.join(ZH_IMAGES_DIR, img);
      const dims = readPngDimensions(p);
      expect(dims.width, 'width 应 > 0').toBeGreaterThan(0);
      expect(dims.height, 'height 应 > 0').toBeGreaterThan(0);
    });
  });

  EN_NEW_IMAGES.forEach((img) => {
    it(`en ${img} 尺寸为正整数(非 0×0)`, () => {
      const p = path.join(EN_IMAGES_DIR, img);
      const dims = readPngDimensions(p);
      expect(dims.width, 'width 应 > 0').toBeGreaterThan(0);
      expect(dims.height, 'height 应 > 0').toBeGreaterThan(0);
    });
  });
});

describe('CLA 博客 md 引用路径 — 新图片引用正确（设计 §3）', () => {
  const zhMd = fs.readFileSync(ZH_MD_PATH, 'utf8');
  const enMd = fs.readFileSync(EN_MD_PATH, 'utf8');

  it('zh md 包含 cla-zh-1.png 引用', () => {
    expect(zhMd).toContain('./images/cla-zh-1.png');
  });

  it('zh md 包含 cla-zh-2.png 引用', () => {
    expect(zhMd).toContain('./images/cla-zh-2.png');
  });

  it('en md 包含 cla-en-1.png 引用', () => {
    expect(enMd).toContain('./images/cla-en-1.png');
  });

  it('en md 包含 cla-en-2.png 引用', () => {
    expect(enMd).toContain('./images/cla-en-2.png');
  });
});

describe('CLA 博客 md 引用路径 — 旧引用不再出现于被替换位置（设计 §4 边界）', () => {
  it('zh md 不再引用 ./images/1.png（已被 cla-zh-1.png 替换）', () => {
    const zhMd = fs.readFileSync(ZH_MD_PATH, 'utf8');
    expect(zhMd).not.toContain('./images/1.png');
  });

  it('zh md 不再引用 ./images/5.png（已被 cla-zh-2.png 替换）', () => {
    const zhMd = fs.readFileSync(ZH_MD_PATH, 'utf8');
    expect(zhMd).not.toContain('./images/5.png');
  });

  it('en md 不再引用 ./images/1.jpg（已被 cla-en-1.png 替换）', () => {
    const enMd = fs.readFileSync(EN_MD_PATH, 'utf8');
    expect(enMd).not.toContain('./images/1.jpg');
  });

  it('en md 不再引用 ./images/5.jpg（已被 cla-en-2.png 替换）', () => {
    const enMd = fs.readFileSync(EN_MD_PATH, 'utf8');
    expect(enMd).not.toContain('./images/5.jpg');
  });
});

describe('CLA 博客 md 引用路径 — 其余图片引用仍存在（设计 §4 边界）', () => {
  const zhMd = fs.readFileSync(ZH_MD_PATH, 'utf8');
  const enMd = fs.readFileSync(EN_MD_PATH, 'utf8');

  const zhStillReferenced = ['./images/2.png', './images/3.png', './images/4.png', './images/8.jpg', './images/9.png', './images/6.png', './images/7.png'];
  const enStillReferenced = ['./images/2.png', './images/3.png', './images/4.png', './images/8.jpg', './images/9.png', './images/6.png', './images/7.png'];

  zhStillReferenced.forEach((ref) => {
    it(`zh md 仍引用 ${ref}（未受替换影响）`, () => {
      expect(zhMd).toContain(ref);
    });
  });

  enStillReferenced.forEach((ref) => {
    it(`en md 仍引用 ${ref}（未受替换影响）`, () => {
      expect(enMd).toContain(ref);
    });
  });
});

describe('CLA 博客 md 引用路径 — 引用的所有图片文件均存在（设计 §6 预览清单）', () => {
  const zhMd = fs.readFileSync(ZH_MD_PATH, 'utf8');
  const enMd = fs.readFileSync(EN_MD_PATH, 'utf8');

  const zhImgRefs = [...zhMd.matchAll(/!\[images\]\(\.\/images\/([^)]+)\)/g)].map((m) => m[1]);
  const enImgRefs = [...enMd.matchAll(/!\[images\]\(\.\/images\/([^)]+)\)/g)].map((m) => m[1]);

  zhImgRefs.forEach((img) => {
    it(`zh images/${img} 物理文件存在`, () => {
      expect(fs.existsSync(path.join(ZH_IMAGES_DIR, img)), `${img} 应存在`).toBe(true);
    });
  });

  enImgRefs.forEach((img) => {
    it(`en images/${img} 物理文件存在`, () => {
      expect(fs.existsSync(path.join(EN_IMAGES_DIR, img)), `${img} 应存在`).toBe(true);
    });
  });
});

describe('CLA 博客双语同步红线（AGENTS.md §5 红线#7）', () => {
  it('zh 和 en md 中新图片引用数量一致（各 2 处）', () => {
    const zhMd = fs.readFileSync(ZH_MD_PATH, 'utf8');
    const enMd = fs.readFileSync(EN_MD_PATH, 'utf8');
    const zhNewRefs = (zhMd.match(/cla-zh-\d\.png/g) || []).length;
    const enNewRefs = (enMd.match(/cla-en-\d\.png/g) || []).length;
    expect(zhNewRefs).toBe(2);
    expect(enNewRefs).toBe(2);
  });
});

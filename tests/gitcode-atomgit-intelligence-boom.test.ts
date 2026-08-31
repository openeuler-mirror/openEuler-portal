import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const DATA_FILE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/data/project/intelligence-boom.ts'
);

function readData(): string {
  return fs.readFileSync(DATA_FILE, 'utf8');
}

function extractUrls(src: string): string[] {
  return [...src.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1]);
}

describe('intelligence-boom.ts — gitcode → atomgit host 迁移', () => {
  it('数据文件存在', () => {
    expect(fs.existsSync(DATA_FILE)).toBe(true);
  });

  it('全文无 gitcode 残留(不区分大小写)', () => {
    expect(readData().toLowerCase()).not.toContain('gitcode');
  });

  it('所有 url 字段 host 均为 atomgit.com', () => {
    const urls = extractUrls(readData());
    expect(urls.length, '应至少抓到 25 条 url').toBeGreaterThanOrEqual(25);
    urls.forEach((url, i) => {
      expect(
        url.startsWith('https://atomgit.com/'),
        `第 ${i + 1} 条 url 未指向 atomgit.com: ${url}`
      ).toBe(true);
    });
  });

  it('无任何 url 字段仍指向 gitcode.com', () => {
    const urls = extractUrls(readData());
    urls.forEach((url, i) => {
      expect(
        url,
        `第 ${i + 1} 条 url 仍含 gitcode: ${url}`
      ).not.toMatch(/gitcode/i);
    });
  });

  it('url 字段总数 = atomgit 命中数(全部已迁,无遗漏)', () => {
    const src = readData();
    const urls = extractUrls(src);
    const atomgitCount = urls.filter((u) => u.startsWith('https://atomgit.com/')).length;
    expect(atomgitCount).toBe(urls.length);
  });
});

describe('intelligence-boom.ts — 关键样本 URL 路径保留(同路径直替)', () => {
  it('VERSION_INFO.zh.first.url 指向 llm_solution Release Notes', () => {
    const src = readData();
    expect(src).toContain(
      "url: 'https://atomgit.com/openeuler/llm_solution/blob/master/doc/Release Notes/Version 1.0_Hui Noodle.md'"
    );
  });

  it('VERSION_INFO.zh.second.url 指向 llm_solution 仓库根', () => {
    expect(readData()).toContain("url: 'https://atomgit.com/openeuler/llm_solution',");
  });

  it('ARCHITECTURE_DATA openEuler Intelligence 指向 euler-copilot-framework', () => {
    expect(readData()).toContain(
      "url: 'https://atomgit.com/openeuler/euler-copilot-framework'"
    );
  });

  it('非 openeuler 命名空间 mindspore 路径保留(/mindspore)', () => {
    expect(readData()).toContain("url:'https://atomgit.com/mindspore'");
  });

  it('非 openeuler 命名空间 openGauss 路径保留(/opengauss)', () => {
    expect(readData()).toContain("url: 'https://atomgit.com/opengauss'");
  });

  it('非 openeuler 命名空间 openFuyao 路径保留(/openFuyao)', () => {
    expect(readData()).toContain("url: 'https://atomgit.com/openFuyao'");
  });

  it('ascend 命名空间 ascendnpu-ir 路径保留', () => {
    expect(readData()).toContain(
      "url: 'https://atomgit.com/ascend/ascendnpu-ir'"
    );
  });

  it('GitHub_Trending 命名空间 LMCache 路径保留', () => {
    expect(readData()).toContain(
      "url: 'https://atomgit.com/GitHub_Trending/lm/LMCache'"
    );
  });
});

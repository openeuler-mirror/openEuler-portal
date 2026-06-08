import { expect, describe, it } from 'vitest';
import commercialReleaseData from '../app/.vitepress/src-new/data/download/download-commercial-release.ts';

const zhList = commercialReleaseData.zh.COMMERCIAL_RELEASE_LIST;
const enList = commercialReleaseData.en.COMMERCIAL_RELEASE_LIST;

const MANDATORY_KEYS: (keyof (typeof zhList)[number])[] = [
  'NAME',
  'DOWNLOAD_URL',
  'MANUFACTURER',
  'PUBLISH_DATE',
];

describe('commercial-release — 数据结构完整性', () => {
  it('zh COMMERCIAL_RELEASE_LIST 是非空数组', () => {
    expect(Array.isArray(zhList)).toBe(true);
    expect(zhList.length).toBeGreaterThan(0);
  });

  it('en COMMERCIAL_RELEASE_LIST 是非空数组', () => {
    expect(Array.isArray(enList)).toBe(true);
    expect(enList.length).toBeGreaterThan(0);
  });

  it('zh 每条记录都有 NAME / DOWNLOAD_URL / MANUFACTURER / PUBLISH_DATE', () => {
    for (const item of zhList) {
      for (const key of MANDATORY_KEYS) {
        expect(item[key], `zh 条目 "${item.NAME}" 缺 ${key}`).toBeDefined();
      }
    }
  });

  it('en 每条记录都有 NAME / DOWNLOAD_URL / MANUFACTURER / PUBLISH_DATE', () => {
    for (const item of enList) {
      for (const key of MANDATORY_KEYS) {
        expect(item[key], `en 条目 "${item.NAME}" 缺 ${key}`).toBeDefined();
      }
    }
  });

  it('拥有 DETAILED_LINK 的条目，DETAILED_LINK 是数组且每项有 ARCH', () => {
    for (const locale of ['zh', 'en'] as const) {
      const list = locale === 'zh' ? zhList : enList;
      for (const item of list) {
        if (!item.DETAILED_LINK) continue;
        expect(Array.isArray(item.DETAILED_LINK), `${locale} "${item.NAME}" DETAILED_LINK 应为数组`).toBe(true);
        for (const link of item.DETAILED_LINK) {
          expect(link.ARCH, `${locale} "${item.NAME}" DETAILED_LINK 项缺 ARCH`).toBeTypeOf('string');
        }
      }
    }
  });
});

describe('commercial-release — SP3 条目新增验证（设计 §3）', () => {
  const zhSP3 = zhList.find((item) => item.NAME === '浪潮云启操作系统 23.12 LTS SP3');
  const enSP3 = enList.find((item) => item.NAME === 'InLinux 23.12 LTS SP3');

  it('zh 数组中存在"浪潮云启操作系统 23.12 LTS SP3"条目', () => {
    expect(zhSP3).toBeDefined();
  });

  it('en 数组中存在"InLinux 23.12 LTS SP3"条目', () => {
    expect(enSP3).toBeDefined();
  });

  it('zh SP3 的 DOWNLOAD_URL 指向 InLinux-23.12-LTS-SP3 仓库', () => {
    expect(zhSP3!.DOWNLOAD_URL).toBe('https://repos-inlinux.inspurcloud.cn/InLinux-23.12-LTS-SP3/');
  });

  it('en SP3 的 DOWNLOAD_URL 与 zh SP3 一致', () => {
    expect(enSP3!.DOWNLOAD_URL).toBe(zhSP3!.DOWNLOAD_URL);
  });

  it('zh SP3 MANUFACTURER 为"浪潮云信息技术股份公司"', () => {
    expect(zhSP3!.MANUFACTURER).toBe('浪潮云信息技术股份公司');
  });

  it('en SP3 MANUFACTURER 为"Inspur Cloud Information Technology Co., Ltd."', () => {
    expect(enSP3!.MANUFACTURER).toBe('Inspur Cloud Information Technology Co., Ltd.');
  });

  it('zh SP3 PUBLISH_DATE 为"2025/10"', () => {
    expect(zhSP3!.PUBLISH_DATE).toBe('2025/10');
  });

  it('en SP3 PUBLISH_DATE 与 zh SP3 一致', () => {
    expect(enSP3!.PUBLISH_DATE).toBe(zhSP3!.PUBLISH_DATE);
  });

  it('zh SP3 DESC 含"浪潮云启"和"InLinux"', () => {
    expect(zhSP3!.DESC).toContain('浪潮云启');
    expect(zhSP3!.DESC).toContain('InLinux');
  });

  it('en SP3 DESC 含"InLinux"和"Inspur"', () => {
    expect(enSP3!.DESC).toContain('InLinux');
    expect(enSP3!.DESC).toContain('Inspur');
  });

  it('zh SP3 DETAILED_LINK 包含 x86_64 和 AArch64 两个架构', () => {
    const archs = zhSP3!.DETAILED_LINK.map((l) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs.length).toBe(2);
  });

  it('en SP3 DETAILED_LINK 包含 x86_64 和 AArch64 两个架构', () => {
    const archs = enSP3!.DETAILED_LINK.map((l) => l.ARCH);
    expect(archs).toContain('x86_64');
    expect(archs).toContain('AArch64');
    expect(archs.length).toBe(2);
  });

  it('SP3 DETAILED_LINK AArch64 的 URL 路径为 aarch64（全小写，设计 §4）', () => {
    for (const link of zhSP3!.DETAILED_LINK) {
      if (link.ARCH === 'AArch64' && link.LINK) {
        expect(link.LINK.endsWith('/aarch64/'), `AArch64 LINK 应以 /aarch64/ 结尾，实际: ${link.LINK}`).toBe(true);
      }
    }
    for (const link of enSP3!.DETAILED_LINK) {
      if (link.ARCH === 'AArch64' && link.LINK) {
        expect(link.LINK.endsWith('/aarch64/'), `AArch64 LINK 应以 /aarch64/ 结尾，实际: ${link.LINK}`).toBe(true);
      }
    }
  });

  it('SP3 DETAILED_LINK x86_64 的 URL 路径为 x86_64', () => {
    for (const link of zhSP3!.DETAILED_LINK) {
      if (link.ARCH === 'x86_64' && link.LINK) {
        expect(link.LINK.endsWith('/x86_64/'), `x86_64 LINK 应以 /x86_64/ 结尾，实际: ${link.LINK}`).toBe(true);
      }
    }
    for (const link of enSP3!.DETAILED_LINK) {
      if (link.ARCH === 'x86_64' && link.LINK) {
        expect(link.LINK.endsWith('/x86_64/'), `x86_64 LINK 应以 /x86_64/ 结尾，实际: ${link.LINK}`).toBe(true);
      }
    }
  });
});

describe('commercial-release — InLinux SP3 双语同步验证（设计 §0）', () => {
  it('en 中所有 InLinux 条目在 zh 中都有对应条目（DOWNLOAD_URL 匹配）', () => {
    const enInLinuxEntries = enList.filter((item) => item.NAME.includes('InLinux'));
    for (const enEntry of enInLinuxEntries) {
      const hasMatch = zhList.some(
        (zhEntry) => zhEntry.DOWNLOAD_URL === enEntry.DOWNLOAD_URL
      );
      expect(hasMatch, `en InLinux 条目 "${enEntry.NAME}" 在 zh 中无对应条目`).toBe(true);
    }
  });

  it('SP3 条目 zh/en DOWNLOAD_URL 一致', () => {
    const zhSP3 = zhList.find((item) => item.NAME === '浪潮云启操作系统 23.12 LTS SP3');
    const enSP3 = enList.find((item) => item.NAME === 'InLinux 23.12 LTS SP3');
    expect(zhSP3!.DOWNLOAD_URL).toBe(enSP3!.DOWNLOAD_URL);
  });

  it('SP3 条目 zh/en PUBLISH_DATE 一致', () => {
    const zhSP3 = zhList.find((item) => item.NAME === '浪潮云启操作系统 23.12 LTS SP3');
    const enSP3 = enList.find((item) => item.NAME === 'InLinux 23.12 LTS SP3');
    expect(zhSP3!.PUBLISH_DATE).toBe(enSP3!.PUBLISH_DATE);
  });

  it('SP3 条目 zh/en DETAILED_LINK 架构列表一致', () => {
    const zhSP3 = zhList.find((item) => item.NAME === '浪潮云启操作系统 23.12 LTS SP3');
    const enSP3 = enList.find((item) => item.NAME === 'InLinux 23.12 LTS SP3');
    const zhArchs = zhSP3!.DETAILED_LINK.map((l) => l.ARCH);
    const enArchs = enSP3!.DETAILED_LINK.map((l) => l.ARCH);
    expect(zhArchs).toEqual(enArchs);
  });
});

describe('commercial-release — DETAILED_LINK ARCH 大小写一致性（设计 §4）', () => {
  it('拥有 DETAILED_LINK 的条目，ARCH 使用一致约定（x86_64 全小写, AArch64 大写 A）', () => {
    for (const locale of ['zh', 'en'] as const) {
      const list = locale === 'zh' ? zhList : enList;
      for (const item of list) {
        if (!item.DETAILED_LINK || !Array.isArray(item.DETAILED_LINK)) continue;
        for (const link of item.DETAILED_LINK) {
          if (link.ARCH.toLowerCase() === 'x86_64') {
            expect(link.ARCH, `${locale} "${item.NAME}" x86_64 ARCH 应全小写`).toBe('x86_64');
          }
          if (link.ARCH.toLowerCase() === 'aarch64') {
            expect(link.ARCH, `${locale} "${item.NAME}" AArch64 ARCH 应大写 A`).toBe('AArch64');
          }
        }
      }
    }
  });
});
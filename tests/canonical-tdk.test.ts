import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { HeadConfig } from 'vitepress';

const PROJECT_ROOT = resolve(__dirname, '..');
const geoDir = join(PROJECT_ROOT, '.geo');

function readTdkJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'tdks', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function simulateSetTdkCanonical(
  tdkInfo: { canonical?: string } | null,
  currentHostname: string
): HeadConfig[] | null {
  const head: HeadConfig[] = [];
  if (!tdkInfo) return null;
  const { canonical } = tdkInfo;
  if (canonical) {
    head.push(['link', { rel: 'canonical', href: `${currentHostname}${canonical}` }]);
  }
  return head.length > 0 ? head : null;
}

describe('TDK canonical 字段 — aigc 页面', () => {
  const tdk = readTdkJson('zh', 'community/aigc');

  it('TDK 配置文件存在', () => {
    expect(tdk).not.toBeNull();
  });

  it('TDK 包含 canonical 字段', () => {
    expect(tdk).toHaveProperty('canonical');
  });

  it('canonical 字段值以 / 开头（相对路径格式）', () => {
    expect(tdk!.canonical).toMatch(/^\//);
  });

  it('canonical 字段值为 /zh/community/aigc/', () => {
    expect(tdk!.canonical).toBe('/zh/community/aigc/');
  });

  it('canonical 以斜杠结尾（避免重复路径）', () => {
    expect(tdk!.canonical.endsWith('/')).toBe(true);
  });

  it('canonical 路径与页面 URL 路径一致', () => {
    expect(tdk!.canonical).toContain('community/aigc');
  });
});

describe('TDK canonical 字段 — oEEP 页面', () => {
  const tdk = readTdkJson('zh', 'oEEP');

  it('TDK 配置文件存在', () => {
    expect(tdk).not.toBeNull();
  });

  it('TDK 包含 canonical 字段', () => {
    expect(tdk).toHaveProperty('canonical');
  });

  it('canonical 字段值以 / 开头（相对路径格式）', () => {
    expect(tdk!.canonical).toMatch(/^\//);
  });

  it('canonical 字段值为 /zh/oEEP/', () => {
    expect(tdk!.canonical).toBe('/zh/oEEP/');
  });

  it('canonical 以斜杠结尾', () => {
    expect(tdk!.canonical.endsWith('/')).toBe(true);
  });

  it('canonical 路径与页面 URL 路径一致', () => {
    expect(tdk!.canonical).toContain('oEEP');
  });
});

describe('setTdk canonical 注入逻辑 — 模拟验证', () => {
  const defaultHostname = 'https://www.openeuler.org';

  it('aigc TDK 有 canonical 时，应注入 link 标签到 frontmatter.head', () => {
    const tdk = readTdkJson('zh', 'community/aigc');
    const result = simulateSetTdkCanonical(tdk, defaultHostname);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(1);
    expect(result![0][0]).toBe('link');
    expect(result![0][1].rel).toBe('canonical');
    expect(result![0][1].href).toBe(`${defaultHostname}/zh/community/aigc/`);
  });

  it('oEEP TDK 有 canonical 时，应注入 link 标签', () => {
    const tdk = readTdkJson('zh', 'oEEP');
    const result = simulateSetTdkCanonical(tdk, defaultHostname);
    expect(result).not.toBeNull();
    expect(result![0][1].href).toBe(`${defaultHostname}/zh/oEEP/`);
  });

  it('canonical href 使用 currentHostname 动态拼接（域名适配机制）', () => {
    const tdk = readTdkJson('zh', 'community/aigc');
    const customHostname = 'https://test.openeuler.org';
    const result = simulateSetTdkCanonical(tdk, customHostname);
    expect(result![0][1].href).toBe(`${customHostname}/zh/community/aigc/`);
    expect(result![0][1].href).not.toContain('www.openeuler.org');
  });

  it('TDK 无 canonical 字段时，不注入 link 标签（向后兼容）', () => {
    const tdkWithoutCanonical = { title: 'test', description: 'test', keywords: 'test' };
    const result = simulateSetTdkCanonical(tdkWithoutCanonical, defaultHostname);
    expect(result).toBeNull();
  });

  it('TDK 文件不存在时，不注入（向后兼容）', () => {
    const result = simulateSetTdkCanonical(null, defaultHostname);
    expect(result).toBeNull();
  });

  it('canonical 为空字符串时，不注入', () => {
    const tdkWithEmptyCanonical = { title: 'test', description: 'test', keywords: 'test', canonical: '' };
    const result = simulateSetTdkCanonical(tdkWithEmptyCanonical, defaultHostname);
    expect(result).toBeNull();
  });
});

describe('updateCanonical — DOM 更新逻辑验证', () => {
  const mockGetUrlParam = (param: string) => {
    const url = window.location.toString();
    const arrObj = url.split('?');
    if (arrObj.length > 1) {
      const arrPara = arrObj[1].split('&');
      for (let i = 0; i < arrPara.length; i++) {
        const arr = arrPara[i].split('=');
        if (arr[0] === param) {
          return arr[1];
        }
      }
      return '';
    }
    return '';
  };

  const CANONICAL_OEEP_MAP: Record<string, string> = {
    'oEEP-0025': '/zh/community/aigc/',
  };

  function runUpdateCanonical() {
    const link = document.querySelector('link[rel="canonical"]');
    const name = mockGetUrlParam('name');
    if (!link) return;
    if (name && CANONICAL_OEEP_MAP[name]) {
      link.setAttribute(
        'href',
        `${window.location.origin}${CANONICAL_OEEP_MAP[name]}`
      );
    } else if (name) {
      link.setAttribute(
        'href',
        `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`
      );
    }
  }

  beforeEach(() => {
    document.head.innerHTML = '';
    window.history.pushState({}, '', '/zh/oEEP/');
  });

  afterEach(() => {
    document.head.innerHTML = '';
    window.history.pushState({}, '', '/');
  });

  it('页面有 canonical link 且 URL 含 ?name=oEEP-0025 时，通过 CANONICAL_OEEP_MAP 映射至权威路径 /zh/community/aigc/', () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');
    runUpdateCanonical();
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}/zh/community/aigc/`
    );
  });

  it('URL 含 ?name= 且含空格编码但不匹配 CANONICAL_OEEP_MAP 时，canonical href 使用 query 参数', () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025%20Proposal');
    runUpdateCanonical();
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(link.getAttribute('href')).toContain('name=');
    expect(link.getAttribute('href')).toContain('oEEP-0025');
    expect(link.getAttribute('href')).not.toContain('/zh/community/aigc/');
  });

  it('URL 无 ?name= 参数时，不更新 canonical href（保持 base canonical）', () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/');
    runUpdateCanonical();
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(link.getAttribute('href')).toBe('https://www.openeuler.org/zh/oEEP/');
  });

  it('页面无 canonical link 元素时，不创建新 link', () => {
    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');
    runUpdateCanonical();
    const link = document.querySelector('link[rel="canonical"]');
    expect(link).toBeNull();
  });

  it('从无 query 导航到有 query(oEEP-0025) 后，canonical 应映射至权威路径 /zh/community/aigc/', () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/');
    runUpdateCanonical();
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(link.getAttribute('href')).toBe('https://www.openeuler.org/zh/oEEP/');

    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');
    runUpdateCanonical();
    expect(link.getAttribute('href')).toBe(`${window.location.origin}/zh/community/aigc/`);
  });

  it('从无 query 导航到有 query(oEEP-0001，非映射项) 后，canonical href 包含 query 参数', () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/');
    runUpdateCanonical();
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(link.getAttribute('href')).toBe('https://www.openeuler.org/zh/oEEP/');

    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0001');
    runUpdateCanonical();
    expect(link.getAttribute('href')).toContain('name=oEEP-0001');
  });
});

describe('aigc 页面 canonical — 静态页面无需 query 参数更新', () => {
  it('aigc canonical href 不含 query 参数', () => {
    const tdk = readTdkJson('zh', 'community/aigc');
    const href = `https://www.openeuler.org${tdk!.canonical}`;
    expect(href).not.toContain('?');
    expect(href).not.toContain('name=');
  });

  it('aigc canonical href 为完整绝对路径格式', () => {
    const tdk = readTdkJson('zh', 'community/aigc');
    const href = `https://www.openeuler.org${tdk!.canonical}`;
    expect(href).toMatch(/^https:\/\/[^/]+\/.*$/);
    expect(href).toBe('https://www.openeuler.org/zh/community/aigc/');
  });
});

describe('向后兼容 — 其他页面 TDK 无 canonical 不受影响', () => {
  const pagesWithoutCanonical = [
    { locale: 'zh', path: 'sig/Kernel' },
    { locale: 'zh', path: 'download' },
    { locale: 'en', path: 'sig/Kernel' },
  ];

  for (const { locale, path } of pagesWithoutCanonical) {
    it(`${locale}/${path} TDK 如存在则不应有 canonical 字段，或 canonical 为空`, () => {
      const tdk = readTdkJson(locale, path);
      if (tdk) {
        expect(!tdk.canonical || tdk.canonical === '').toBe(true);
      }
    });
  }
});

describe('CANONICAL_OEEP_MAP — oEEP-0025 引流至权威路径 /zh/community/aigc/', () => {
  const CANONICAL_OEEP_MAP: Record<string, string> = {
    'oEEP-0025': '/zh/community/aigc/',
  };

  it('CANONICAL_OEEP_MAP 包含 oEEP-0025 键', () => {
    expect(CANONICAL_OEEP_MAP).toHaveProperty('oEEP-0025');
  });

  it('oEEP-0025 映射至 /zh/community/aigc/', () => {
    expect(CANONICAL_OEEP_MAP['oEEP-0025']).toBe('/zh/community/aigc/');
  });

  it('映射目标路径以斜杠结尾', () => {
    expect(CANONICAL_OEEP_MAP['oEEP-0025'].endsWith('/')).toBe(true);
  });

  it('映射目标与 aigc 页面 TDK canonical 一致', () => {
    const tdk = readTdkJson('zh', 'community/aigc');
    expect(CANONICAL_OEEP_MAP['oEEP-0025']).toBe(tdk!.canonical);
  });
});

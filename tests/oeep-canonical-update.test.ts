import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * 本测试针对 issue #266(oEEP 详情页出现两个 <link rel="canonical">)的修复。
 *
 * 修复目标(见 design):TheOeep.vue 的 updateCanonical 应**复用** head 中已存在的
 * `<link rel="canonical">`(由 config.ts 的 setTdk 静态注入),给它补 id=oeep-canonical-link
 * 并按规则改 href,而不是用 document.head.appendChild 新建第二个 link。
 *
 * 与 canonical-tdk.test.ts 的区别:后者用一个**手写的 mock** runUpdateCanonical 来模拟
 * 期望行为(实现一旦改动,测试不会跟着变 → 假绿)。本文件直接从 TheOeep.vue 源码中**抽取真实的
 * updateCanonical 函数源码**,剥离 TS 类型注解后用 new Function 执行,确保被测对象就是仓库里
 * 实际跑的那段函数 —— 实现若回归到 appendChild / 不复用,本测试会真实失败。
 */

const PROJECT_ROOT = resolve(__dirname, '..');
const COMPONENT_PATH = resolve(
  PROJECT_ROOT,
  'app/.vitepress/src/views/oeep/TheOeep.vue'
);
const componentSource = readFileSync(COMPONENT_PATH, 'utf-8');

// ---- 工具:从 .vue 源码中按括号平衡抽取指定函数的真实源码 ----
function extractFunctionSource(source: string, fnName: string): string {
  const scriptMatch = source.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  if (!scriptMatch) throw new Error('无法定位 <script> 块');
  const script = scriptMatch[1];
  const start = script.indexOf(`function ${fnName}(`);
  if (start === -1) throw new Error(`未找到 function ${fnName}`);
  let i = script.indexOf('{', start);
  if (i === -1) throw new Error(`${fnName} 未找到起始 {`);
  let depth = 0;
  let end = -1;
  for (; i < script.length; i++) {
    const ch = script[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`${fnName} 括号未平衡`);
  return script.slice(start, end + 1);
}

// 剥离 TS `as <Type>` 类型断言,使 new Function 可执行(仅 updateCanonical 内出现
// `as HTMLLinkElement | null` 一处,正则保守:仅在 )/;/, 前的 `as ...` 才剥离)
function stripTsCasts(tsFnSource: string): string {
  return tsFnSource.replace(/\s+as\s+[A-Za-z_| ]+?(?=\)|;|,)/g, '');
}

// 抽取真实 updateCanonical 源码并构造可执行函数
const updateCanonicalSource = extractFunctionSource(
  componentSource,
  'updateCanonical'
);
const updateCanonicalJs = stripTsCasts(updateCanonicalSource);

// 与 TheOeep.vue 中定义保持一致(数据,非逻辑)
const CANONICAL_OEEP_MAP: Record<string, string> = {
  'oEEP-0025': '/zh/community/ai-coding-assistants/',
};
const canonicalId = 'oeep-canonical-link';

// getUrlParam 的实现(对齐 @/shared/utils.ts 中字符串 split 取值、不做 decodeURIComponent)
function getUrlParam(param: string): string {
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
}

// 用 new Function 执行真实源码,把依赖作为参数注入,返回真实 updateCanonical
const realUpdateCanonical = new Function(
  'getUrlParam',
  'CANONICAL_OEEP_MAP',
  'canonicalId',
  'document',
  'window',
  `${updateCanonicalJs}\nreturn updateCanonical;`
)(getUrlParam, CANONICAL_OEEP_MAP, canonicalId, document, window) as () => void;

// 记录是否调用过 appendChild / createElement,用于"不新建 link"的断言
let appendChildSpy: ReturnType<typeof vi.spyOn>;
let createElementSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  document.head.innerHTML = '';
  window.history.pushState({}, '', '/zh/oEEP/');
  appendChildSpy = vi.spyOn(document.head, 'appendChild');
  createElementSpy = vi.spyOn(document, 'createElement');
});

afterEach(() => {
  appendChildSpy.mockRestore();
  createElementSpy.mockRestore();
  document.head.innerHTML = '';
  window.history.pushState({}, '', '/');
});

describe('TheOeep.vue updateCanonical — 静态源码契约(防止实现回归)', () => {
  it('真实源码中存在 updateCanonical 函数定义', () => {
    expect(updateCanonicalSource, '应能从 TheOeep.vue 抽取到 updateCanonical').toMatch(
      /function updateCanonical\(/
    );
  });

  it('使用 querySelector(\'link[rel="canonical"]\') 复用已存在的静态 canonical', () => {
    expect(componentSource).toMatch(
      /document\.querySelector\(\s*['"]link\[rel="canonical"\]['"]\s*\)/
    );
  });

  it('不再使用 document.head.appendChild 新建 canonical link', () => {
    expect(
      componentSource,
      'updateCanonical 不应再 appendChild 新建 link(否则产生重复 canonical)'
    ).not.toMatch(/document\.head\.appendChild/);
  });

  it('不再使用 document.createElement(\'link\') 新建 canonical link', () => {
    expect(componentSource).not.toMatch(
      /document\.createElement\(\s*['"]link['"]\s*\)/
    );
  });

  it('找不到 link 时直接 return,不新建', () => {
    expect(updateCanonicalSource).toMatch(/if\s*\(\s*!link\s*\)\s*return/);
  });

  it('给复用的 link 设置 id = canonicalId(oeep-canonical-link)', () => {
    expect(updateCanonicalSource).toMatch(/link\.id\s*=\s*canonicalId/);
  });

  it('oEEP-0025 在 CANONICAL_OEEP_MAP 中(映射至 ai-coding-assistants)', () => {
    expect(CANONICAL_OEEP_MAP['oEEP-0025']).toBe(
      '/zh/community/ai-coding-assistants/'
    );
  });

  it('真实源码未引入 encodeURIComponent 对 name 二次编码(self-canonical 分支)', () => {
    const selfCanonicalBranch = updateCanonicalSource.match(
      /else\s+if\s*\(\s*name\s*\)[\s\S]*?\}/
    );
    expect(selfCanonicalBranch, '应存在 else if (name) 分支').not.toBeNull();
    expect(selfCanonicalBranch![0]).not.toContain('encodeURIComponent');
  });
});

describe('TheOeep.vue updateCanonical — 真实函数 DOM 行为', () => {
  it('head 已存在无 id 的 link[rel=canonical] 时,复用而非新增(oEEP-0025 映射)', () => {
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');

    realUpdateCanonical();

    const links = document.querySelectorAll('link[rel="canonical"]');
    expect(links.length, '应仅保留 1 个 canonical link(复用,不新增)').toBe(1);
    const link = links[0] as HTMLLinkElement;
    expect(link.id, '复用的 link 应被赋予 oeep-canonical-link id').toBe(
      canonicalId
    );
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}/zh/community/ai-coding-assistants/`
    );
    expect(appendChildSpy, '不应调用 appendChild 新建 link').not.toHaveBeenCalled();
    expect(createElementSpy, '不应调用 createElement 新建 link').not.toHaveBeenCalled();
  });

  it('非映射项 ?name=oEEP-0001 → self-canonical,href 含 ?name= 且不二次编码', () => {
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0001');

    realUpdateCanonical();

    const link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(link.id).toBe(canonicalId);
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}${window.location.pathname}?name=oEEP-0001`
    );
    // 不应出现 %2520 之类的二次编码
    expect(link.getAttribute('href')).not.toContain('%25');
    expect(appendChildSpy).not.toHaveBeenCalled();
  });

  it('name 含百分号编码(如 %20)的非映射项 → href 保留原始编码,不二次编码', () => {
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    // 模拟 oEEP-0000%20oEEP%20%20索引 (onMounted 重定向后的索引页)
    window.history.pushState(
      {},
      '',
      '/zh/oEEP/?name=oEEP-0000%20oEEP%20%20%E7%B4%A2%E5%BC%95'
    );

    realUpdateCanonical();

    const link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(link.id).toBe(canonicalId);
    const href = link.getAttribute('href') || '';
    expect(href).toContain('?name=oEEP-0000%20oEEP%20%20');
    // 不二次编码:%20 不应变成 %2520
    expect(href).not.toContain('%2520');
    expect(href).not.toContain('%25');
  });

  it('无 ?name= 参数时,保持 base canonical href,但仍给 link 补 id', () => {
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/');

    realUpdateCanonical();

    const link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(link.id, '即使无 name 也应给静态 canonical 补 id').toBe(canonicalId);
    expect(link.getAttribute('href')).toBe(
      'https://www.openeuler.org/zh/oEEP/'
    );
  });

  it('页面无 canonical link 元素时,不创建新 link(对齐 canonical-tdk.test.ts:207-212)', () => {
    document.head.innerHTML = ''; // 无静态 canonical(构建异常等极端情况)
    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');

    realUpdateCanonical();

    const link = document.querySelector('link[rel="canonical"]');
    expect(link, 'querySelector 返回 null 时不应新建 link').toBeNull();
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('从无 query 导航到 ?name=oEEP-0025 后,canonical href 更新为权威映射路径', () => {
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/');
    realUpdateCanonical();
    const link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(link.getAttribute('href')).toBe(
      'https://www.openeuler.org/zh/oEEP/'
    );

    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');
    realUpdateCanonical();
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}/zh/community/ai-coding-assistants/`
    );
    expect(link.id).toBe(canonicalId);
    // 整个过程只复用同一个 link 元素,未新增
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
  });

  it('从无 query 导航到 ?name=oEEP-0001(非映射) 后,canonical href 含 query 且唯一', () => {
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    window.history.pushState({}, '', '/zh/oEEP/');
    realUpdateCanonical();
    const link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0001');
    realUpdateCanonical();
    expect(link.getAttribute('href')).toContain('name=oEEP-0001');
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(link.id).toBe(canonicalId);
  });

  it('多页签来回切换(oEEP-0025 → oEEP-0001 → oEEP-0000 索引)canonical 始终唯一且 href 同步', () => {
    // 现实流程:onMounted 在无 name 时会 router.go 重定向到
    // ?name=oEEP-0000%20oEEP%20%20索引,故索引页实际带 ?name= 参数
    // (见 design §4 边界情况)。本用例模拟用户在多个 oEEP 项间来回切换。
    document.head.innerHTML =
      '<link rel="canonical" href="https://www.openeuler.org/zh/oEEP/" />';
    const link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0025');
    realUpdateCanonical();
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}/zh/community/ai-coding-assistants/`
    );

    window.history.pushState({}, '', '/zh/oEEP/?name=oEEP-0001');
    realUpdateCanonical();
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}${window.location.pathname}?name=oEEP-0001`
    );

    // 切回索引页(非映射项 → self-canonical,href 含 ?name=oEEP-0000%20...)
    window.history.pushState(
      {},
      '',
      '/zh/oEEP/?name=oEEP-0000%20oEEP%20%20%E7%B4%A2%E5%BC%95'
    );
    realUpdateCanonical();
    expect(link.getAttribute('href')).toBe(
      `${window.location.origin}${window.location.pathname}?name=oEEP-0000%20oEEP%20%20%E7%B4%A2%E5%BC%95`
    );

    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(link.id).toBe(canonicalId);
    expect(appendChildSpy).not.toHaveBeenCalled();
  });
});

describe('TheOeep.vue — onUnmounted 清理逻辑(源码契约)', () => {
  // onUnmounted 通过 id 移除 canonical;复用静态 canonical 后,该 link 已带 id,
  // 离开 oEEP 时会随之移除(避免残留过期 canonical)。
  it('源码中 onUnmounted 按 getElementById(canonicalId) 移除', () => {
    expect(componentSource).toMatch(
      /onUnmounted\([\s\S]*?document\.getElementById\(canonicalId\)[\s\S]*?\.remove\(\)/
    );
  });

  it('canonicalId 常量值为 oeep-canonical-link', () => {
    expect(componentSource).toMatch(
      /const\s+canonicalId\s*=\s*['"]oeep-canonical-link['"]/
    );
  });
});

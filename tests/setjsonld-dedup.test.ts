import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PROJECT_ROOT = process.cwd();
const geoDir = resolve(PROJECT_ROOT, '.geo');
const configSrc = readFileSync(resolve(PROJECT_ROOT, 'app/.vitepress/config.ts'), 'utf-8');
const DEFAULT_HOST = 'https://www.openeuler.org';

type HeadEntry = [string, Record<string, string> | undefined, ...unknown[]];

/**
 * 忠实镜像 app/.vitepress/config.ts 中 `setJSONLD` 的 head 注入算法(逐行对应)。
 * 之所以用镜像而非直接 import:setJSONLD 是 config.ts 的模块级局部常量、未导出,
 * 而 tester 角色禁止改动业务代码(无法为了测试而导出它)。镜像算法与源码逐行对应,
 * 配合下文「源码级守卫」用例锁定二者一致——若源码去重逻辑被改坏,源码守卫会先失败。
 */
async function applyJSONLD(head: HeadEntry[], pagePath: string, hostname = DEFAULT_HOST) {
  const jsonFile = join(geoDir, 'jsonld', pagePath, 'index.json');
  if (!existsSync(jsonFile)) return;
  const content = readFileSync(jsonFile, 'utf-8');
  if (!content) return;
  const payload = hostname !== DEFAULT_HOST ? content.replaceAll(DEFAULT_HOST, hostname) : content;
  const ldIndex = head.findIndex(
    (item: HeadEntry) => item[0] === 'script' && item[1]?.type === 'application/ld+json'
  );
  if (ldIndex !== -1) {
    head.splice(ldIndex, 1, ['script', { type: 'application/ld+json' }, payload]);
    return;
  }
  head.push(['script', { type: 'application/ld+json' }, payload]);
}

function countLdJson(head: HeadEntry[]) {
  return head.filter((i) => i[0] === 'script' && i[1]?.type === 'application/ld+json').length;
}

function getLdPayload(head: HeadEntry[]) {
  const entry = head.find((i) => i[0] === 'script' && i[1]?.type === 'application/ld+json');
  return entry ? String(entry[2]) : null;
}

describe('setJSONLD 源码级守卫 — config.ts 去重实现存在(回归守卫)', () => {
  it('setJSONLD 用 findIndex 查找已存在的 application/ld+json script', () => {
    expect(configSrc).toMatch(/findIndex\([\s\S]*?application\/ld\+json/);
  });
  it('setJSONLD 命中时用 splice(idx, 1, [...]) 原位替换(幂等去重)', () => {
    expect(configSrc).toMatch(/\.splice\([^,]+,\s*1,\s*\[/);
  });
  it('setJSONLD 未命中时仍走 head.push([...])(保留首注入路径)', () => {
    expect(configSrc).toMatch(/head\.push\(\[/);
  });
  it('payload 仍走 replaceAll 生产域名适配(未破坏 rules/seo.md §生产域名适配机制)', () => {
    expect(configSrc).toMatch(/replaceAll\(['"]https:\/\/www\.openeuler\.org['"]/);
  });
  it('setJSONLD 无 .geo jsonld 文件时提前 return(无回归)', () => {
    expect(configSrc).toMatch(/if\s*\(\s*!existsSync\(jsonFile\)\s*\)\s*\{[\s\S]*?return/);
  });
});

describe('setJSONLD 源码级守卫 — 控制流顺序完整性(防重排回归)', () => {
  // 抽取 setJSONLD 函数体:从 `const setJSONLD = async` 到下一个声明 `const setTdk`。
  // 用声明边界而非花括号计数,避免嵌套大括号误匹配;若源码重排使二者不再相邻,
  // fnBody 为空 → 下一用例的"能抽取"断言先失败,提示源码结构已变。
  const start = configSrc.indexOf('const setJSONLD = async');
  const end = configSrc.indexOf('const setTdk');
  const fnBody = start !== -1 && end !== -1 && end > start ? configSrc.slice(start, end) : '';

  it('能从 config.ts 抽取 setJSONLD 函数体(守卫前提:函数边界可识别)', () => {
    expect(fnBody.length).toBeGreaterThan(50);
  });

  it('findIndex 出现在 head.push 之前(去重检查先于注入路径,防盲推回归)', () => {
    const findIdx = fnBody.indexOf('findIndex');
    const pushIdx = fnBody.indexOf('head.push');
    expect(findIdx).toBeGreaterThan(-1);
    expect(pushIdx).toBeGreaterThan(-1);
    expect(findIdx).toBeLessThan(pushIdx);
  });

  it('splice 位于 ldIndex !== -1 守卫之后(原位替换仅在命中时发生)', () => {
    const checkIdx = fnBody.indexOf('!== -1');
    const spliceIdx = fnBody.indexOf('.splice(');
    expect(checkIdx).toBeGreaterThan(-1);
    expect(spliceIdx).toBeGreaterThan(-1);
    expect(spliceIdx).toBeGreaterThan(checkIdx);
  });
});

describe('setJSONLD 幂等去重 — 模拟 transformPageData 对含 frontmatter head 页二次执行', () => {
  it('zh 首页(含 frontmatter head):两次调用后 ld+json 恰为 1 条', async () => {
    const head: HeadEntry[] = [
      ['meta', { name: 'description', content: '首页描述' }],
      ['meta', { property: 'og:image', content: '/img/for-cdn/logo.png' }],
    ];
    await applyJSONLD(head, 'zh');
    await applyJSONLD(head, 'zh');
    expect(countLdJson(head)).toBe(1);
  });

  it('zh SIG 列表:两次调用后 ld+json 恰为 1 条', async () => {
    const head: HeadEntry[] = [];
    await applyJSONLD(head, 'zh/sig/sig-list');
    await applyJSONLD(head, 'zh/sig/sig-list');
    expect(countLdJson(head)).toBe(1);
  });

  it('en 首页(无 frontmatter head):两次调用后仍仅 1 条', async () => {
    const head: HeadEntry[] = [];
    await applyJSONLD(head, 'en');
    await applyJSONLD(head, 'en');
    expect(countLdJson(head)).toBe(1);
  });

  it('单次调用:ld+json 恰为 1 条(未多注、未漏注)', async () => {
    const head: HeadEntry[] = [];
    await applyJSONLD(head, 'zh');
    expect(countLdJson(head)).toBe(1);
  });
});

describe('setJSONLD payload 与生产域名适配', () => {
  it('默认生产域名:payload 与 .geo 原文逐字节一致(未替换)', async () => {
    const head: HeadEntry[] = [];
    await applyJSONLD(head, 'zh');
    const original = readFileSync(join(geoDir, 'jsonld', 'zh', 'index.json'), 'utf-8');
    expect(getLdPayload(head)).toBe(original);
  });

  it('非生产域名:payload 中 www.openeuler.org 被 replaceAll 替换', async () => {
    const head: HeadEntry[] = [];
    await applyJSONLD(head, 'zh', 'https://test.openeuler.org');
    const payload = getLdPayload(head);
    expect(payload).not.toContain('https://www.openeuler.org');
    expect(payload).toContain('https://test.openeuler.org');
  });

  it('非生产域名连续两次调用:仍仅 1 条且 payload 已替换', async () => {
    const head: HeadEntry[] = [];
    await applyJSONLD(head, 'zh/sig/sig-list', 'https://test.openeuler.org');
    await applyJSONLD(head, 'zh/sig/sig-list', 'https://test.openeuler.org');
    expect(countLdJson(head)).toBe(1);
    expect(getLdPayload(head)).toContain('https://test.openeuler.org');
  });
});

describe('setJSONLD 内容漂移 — 已有 ld+json 时原位替换而非追加', () => {
  it('预置一份过期 ld+json,调用后数量仍为 1 且 payload 被更新', async () => {
    const head: HeadEntry[] = [['script', { type: 'application/ld+json' }, 'STALE_PAYLOAD']];
    await applyJSONLD(head, 'zh');
    expect(countLdJson(head)).toBe(1);
    expect(getLdPayload(head)).not.toBe('STALE_PAYLOAD');
    const original = readFileSync(join(geoDir, 'jsonld', 'zh', 'index.json'), 'utf-8');
    expect(getLdPayload(head)).toBe(original);
  });

  it('keywords 等非 ld+json head 项不被误删', async () => {
    const head: HeadEntry[] = [['meta', { name: 'keywords', content: 'openEuler,Linux' }]];
    await applyJSONLD(head, 'zh');
    await applyJSONLD(head, 'zh');
    const keywords = head.filter((i) => i[0] === 'meta' && i[1]?.name === 'keywords');
    expect(keywords.length).toBe(1);
    expect(countLdJson(head)).toBe(1);
  });
});

describe('setJSONLD 无 .geo jsonld 文件 — 提前 return,head 不变(无回归)', () => {
  it('不存在的 pagePath:head 保持空,ld+json 为 0', async () => {
    const head: HeadEntry[] = [['meta', { name: 'x', content: 'y' }]];
    await applyJSONLD(head, 'zh/__definitely_no_such_page__');
    expect(head.length).toBe(1);
    expect(countLdJson(head)).toBe(0);
  });
});

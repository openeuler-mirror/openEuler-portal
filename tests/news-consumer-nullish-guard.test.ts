import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Issue 343 — TheNews.vue 消费层 nullish 守卫验证
 *
 * 设计 §3: getNews() / initTag() 两处 .then 链加 nullish 守卫
 *   - getNews:  res?.obj → obj?.records ?? [] / obj?.count ?? 0  + .catch
 *   - initTag:  res?.obj?.totalNum ?? []                        + .catch
 *
 * 仓内无 @vue/test-utils / @vitejs/plugin-vue（vitest.config.js 未配 Vue SFC 编译），
 * 无法挂载组件；采用仓内既有源码级测试模式（参考 footer-link-hover-style.test.ts）
 * + 守卫表达式逻辑复现验证。
 */

const PROJECT_ROOT = process.cwd();
const NEWS_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/news/TheNews.vue'
);
const API_NEWS = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/api/api-news.ts'
);

const VUE_SRC = fs.readFileSync(NEWS_VUE, 'utf8');
const API_SRC = fs.readFileSync(API_NEWS, 'utf8');

/**
 * 从源码中抽取指定函数的代码块（从 `const xxx =` 或 `const xxx = ()` 到下一个同级 `const`/`}`）。
 */
function extractFnBlock(src: string, fnName: string): string {
  const lines = src.split('\n');
  const startIdx = lines.findIndex((l) => l.includes(`const ${fnName} =`));
  expect(startIdx, `函数 ${fnName} 应存在于源码`).toBeGreaterThan(-1);

  let braceDepth = 0;
  let endIdx = startIdx;
  let started = false;
  for (let i = startIdx; i < lines.length; i++) {
    const opens = (lines[i].match(/{/g) || []).length;
    const closes = (lines[i].match(/}/g) || []).length;
    braceDepth += opens - closes;
    if (opens > 0) started = true;
    if (started && braceDepth <= 0) {
      endIdx = i;
      break;
    }
  }
  return lines.slice(startIdx, endIdx + 1).join('\n');
}

// -------------------- api-news.ts 解包层源码断言 --------------------

describe('api-news.ts — 解包层使用可选链 res?.data（设计 §3）', () => {
  it('getTagsData 使用 res?.data 而非 res.data', () => {
    expect(API_SRC).toContain('res?.data');
    expect(API_SRC).not.toMatch(/return\s+res\.data\b(?!&|\?)/);
  });

  it('源码中不存在未守卫的 res.data（无 ?. 守卫）', () => {
    const unguarded = API_SRC.match(/return\s+res\.data/g);
    expect(unguarded, '不应存在 return res.data（须为 res?.data）').toBeNull();
  });
});

// -------------------- TheNews.vue getNews 守卫源码断言 --------------------

describe('TheNews.vue getNews — nullish 守卫（设计 §3）', () => {
  const block = extractFnBlock(VUE_SRC, 'getNews');

  it('使用 res?.obj 可选链（res 为 undefined 时不抛）', () => {
    expect(block).toContain('res?.obj');
  });

  it('records 使用 obj?.records ?? [] 兜底空数组', () => {
    expect(block).toContain('obj?.records ?? []');
  });

  it('count 使用 obj?.count ?? 0 兜底零', () => {
    expect(block).toContain('obj?.count ?? 0');
  });

  it('链尾有 .catch 错误兜底（rules/api-and-state.md §组件中调用 API）', () => {
    expect(block).toContain('.catch');
    expect(block).toContain('console.error');
  });

  it('不存在未守卫的 res.obj.records 直接访问', () => {
    expect(block).not.toMatch(/res\.obj\.records/);
  });

  it('不存在未守卫的 res.obj.count 直接访问', () => {
    expect(block).not.toMatch(/res\.obj\.count/);
  });
});

// -------------------- TheNews.vue initTag 守卫源码断言 --------------------

describe('TheNews.vue initTag — nullish 守卫（设计 §3）', () => {
  const block = extractFnBlock(VUE_SRC, 'initTag');

  it('使用 res?.obj?.totalNum ?? [] 兜底空数组', () => {
    expect(block).toContain('res?.obj?.totalNum ?? []');
  });

  it('链尾有 .catch 错误兜底', () => {
    expect(block).toContain('.catch');
    expect(block).toContain('console.error');
  });

  it('不存在未守卫的 res.obj.totalNum 直接访问', () => {
    expect(block).not.toMatch(/res\.obj\.totalNum/);
  });
});

// -------------------- 守卫表达式逻辑复现验证 --------------------

describe('守卫表达式逻辑验证 — undefined / 缺 obj 时不抛且落空态', () => {
  // 复现 getNews 中的守卫表达式
  function getNewsGuard(res: unknown) {
    const obj = (res as any)?.obj;
    return {
      newsData: obj?.records ?? [],
      total: obj?.count ?? 0,
    };
  }

  // 复现 initTag 中的守卫表达式
  function initTagGuard(res: unknown) {
    return (res as any)?.obj?.totalNum ?? [];
  }

  it('getNews 守卫: res=undefined → newsData=[] total=0', () => {
    const { newsData, total } = getNewsGuard(undefined);
    expect(newsData).toEqual([]);
    expect(total).toBe(0);
  });

  it('getNews 守卫: res={} (无 obj) → newsData=[] total=0', () => {
    const { newsData, total } = getNewsGuard({});
    expect(newsData).toEqual([]);
    expect(total).toBe(0);
  });

  it('getNews 守卫: res={obj:{}} (obj 无 records/count) → newsData=[] total=0', () => {
    const { newsData, total } = getNewsGuard({ obj: {} });
    expect(newsData).toEqual([]);
    expect(total).toBe(0);
  });

  it('getNews 守卫: 正常数据 → 正确解包', () => {
    const { newsData, total } = getNewsGuard({
      obj: { records: [{ id: 1 }, { id: 2 }], count: 2 },
    });
    expect(newsData).toEqual([{ id: 1 }, { id: 2 }]);
    expect(total).toBe(2);
  });

  it('getNews 守卫: 错误信封 {status:500,msg:"err"} (无 obj) → 空态', () => {
    const { newsData, total } = getNewsGuard({ status: 500, msg: 'err' });
    expect(newsData).toEqual([]);
    expect(total).toBe(0);
  });

  it('initTag 守卫: res=undefined → []', () => {
    expect(initTagGuard(undefined)).toEqual([]);
  });

  it('initTag 守卫: res={} (无 obj) → []', () => {
    expect(initTagGuard({})).toEqual([]);
  });

  it('initTag 守卫: 正常数据 → 正确返回 totalNum', () => {
    expect(initTagGuard({ obj: { totalNum: [{ key: 'a' }, { key: 'b' }] } })).toEqual([
      { key: 'a' },
      { key: 'b' },
    ]);
  });
});

// -------------------- 无 unhandled rejection 验证 --------------------

describe('消费层 .catch 兜底 — 模拟 reject 时不产生 unhandled rejection', () => {
  it('getNews 模式: .then 链 reject 被 .catch 捕获，控制台无 unhandled rejection', async () => {
    const errors: string[] = [];
    const origError = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(String(args[0]));
    };

    // 复现 getNews 的 .then(...).catch(...) 链
    let newsData: unknown[] = [999];
    let total = 999;

    await new Promise<void>((resolve) => {
      Promise.reject(new Error('simulated reject'))
        .then((res: unknown) => {
          const obj = (res as any)?.obj;
          newsData = obj?.records ?? [];
          total = obj?.count ?? 0;
        })
        .catch((e: unknown) => {
          console.error('getNews failed:', e);
          resolve();
        });
    });

    console.error = origError;

    // .catch 捕获后 newsData/total 保持上次值（不崩），控制台有 error 日志
    expect(errors.some((e) => e.includes('getNews failed:'))).toBe(true);
  });

  it('initTag 模式: .then 链 reject 被 .catch 捕获', async () => {
    const errors: string[] = [];
    const origError = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(String(args[0]));
    };

    let options: unknown[] = [999];

    await new Promise<void>((resolve) => {
      Promise.reject(new Error('simulated reject'))
        .then((res: unknown) => {
          const list = (res as any)?.obj?.totalNum ?? [];
          options = list;
        })
        .catch((e: unknown) => {
          console.error('getTagsData failed:', e);
          resolve();
        });
    });

    console.error = origError;

    expect(errors.some((e) => e.includes('getTagsData failed:'))).toBe(true);
  });
});

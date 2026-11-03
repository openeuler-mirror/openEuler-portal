import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Issue 343 — api-news.ts 解包层 nullish 守卫验证
 *
 * 设计 §3: getTagsData / getNewsData / getBlogsData 三处 res.data → res?.data，
 * 杜绝链路 resolve 到 undefined 时抛 Cannot read properties of undefined (reading 'data')。
 *
 * 本文件 mock ~@/shared/axios 的 request，在解包层（.then 回调）层面验证：
 * 1. res 为 undefined 时不抛、返回 {}（根因修复，res?.data ?? {} 兜底）
 * 2. res 有 data 时正常解包返回
 * 3. ignoreDuplicates 配置按设计传递（getTagsData/getBlogsData 传，getNewsData 不传）
 * 4. 请求 reject 时解包层不吞异常，向消费层传播（由消费层 .catch 兜底）
 */

const mockPost = vi.hoisted(() => vi.fn());

vi.mock('~@/shared/axios', () => ({
  request: {
    post: mockPost,
  },
}));

import { getTagsData, getNewsData, getBlogsData } from '../app/.vitepress/src-new/api/api-news';

describe('api-news.ts — res 为 undefined 时不抛（根因修复）', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('getTagsData: request.post resolve undefined → 返回 {} 不抛', async () => {
    mockPost.mockResolvedValue(undefined);
    const result = await getTagsData({ lang: 'zh', category: 'news', want: 'tags' });
    expect(result).toEqual({});
  });

  it('getNewsData: request.post resolve undefined → 返回 {} 不抛', async () => {
    mockPost.mockResolvedValue(undefined);
    const result = await getNewsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    expect(result).toEqual({});
  });

  it('getBlogsData: request.post resolve undefined → 返回 {} 不抛', async () => {
    mockPost.mockResolvedValue(undefined);
    const result = await getBlogsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    expect(result).toEqual({});
  });
});

describe('api-news.ts — res 有 data 时正常解包返回', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('getTagsData: 返回 res.data（含 obj.totalNum）', async () => {
    const payload = { obj: { totalNum: [{ key: '2026' }, { key: '2025' }] } };
    mockPost.mockResolvedValue({ data: payload });
    const result = await getTagsData({ lang: 'zh', category: 'news', want: 'tags' });
    expect(result).toEqual(payload);
  });

  it('getNewsData: 返回 res.data（含 obj.records / obj.count）', async () => {
    const payload = { obj: { records: [{ title: 't1' }, { title: 't2' }], count: 2 } };
    mockPost.mockResolvedValue({ data: payload });
    const result = await getNewsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    expect(result).toEqual(payload);
  });

  it('getBlogsData: 返回 res.data（含 obj.records）', async () => {
    const payload = { obj: { records: [{ title: 'blog1' }] } };
    mockPost.mockResolvedValue({ data: payload });
    const result = await getBlogsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    expect(result).toEqual(payload);
  });

  it('getNewsData: 错误信封（无 obj，仅 status/msg）也能正常解包不抛', async () => {
    const payload = { status: 500, msg: 'error' };
    mockPost.mockResolvedValue({ data: payload });
    const result = await getNewsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    expect(result).toEqual(payload);
  });
});

describe('api-news.ts — ignoreDuplicates 配置传递（设计 §3）', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockPost.mockResolvedValue({ data: {} });
  });

  it('getTagsData 传 ignoreDuplicates: true', async () => {
    await getTagsData({ lang: 'zh', category: 'news', want: 'tags' });
    const [, , config] = mockPost.mock.calls[0];
    expect(config).toEqual({ ignoreDuplicates: true });
  });

  it('getTagsData 的 URL 为 /api-search/search/tags', async () => {
    await getTagsData({ lang: 'zh', category: 'news', want: 'tags' });
    const [url] = mockPost.mock.calls[0];
    expect(url).toBe('/api-search/search/tags');
  });

  it('getBlogsData 不传 ignoreDuplicates（仅 url+params，保留各自差异）', async () => {
    await getBlogsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    const callArgs = mockPost.mock.calls[0];
    expect(callArgs.length).toBe(2);
    expect(callArgs[0]).toBe('/api-search/search/sort/blog');
  });

  it('getNewsData 不传 ignoreDuplicates（第三参数 undefined）', async () => {
    await getNewsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 });
    const callArgs = mockPost.mock.calls[0];
    expect(callArgs.length).toBe(2);
    expect(callArgs[0]).toBe('/api-search/search/sort');
  });
});

describe('api-news.ts — 请求 reject 时解包层不吞异常（消费层 .catch 兜底）', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('getTagsData: request.post reject → Promise reject（不被 .then 吞掉）', async () => {
    const err = new Error('network error');
    mockPost.mockRejectedValue(err);
    await expect(
      getTagsData({ lang: 'zh', category: 'news', want: 'tags' })
    ).rejects.toThrow('network error');
  });

  it('getNewsData: request.post reject → Promise reject', async () => {
    const err = new Error('timeout');
    mockPost.mockRejectedValue(err);
    await expect(
      getNewsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 })
    ).rejects.toThrow('timeout');
  });

  it('getBlogsData: request.post reject → Promise reject', async () => {
    const err = new Error('server error');
    mockPost.mockRejectedValue(err);
    await expect(
      getBlogsData({ category: 'news', lang: 'zh', page: 1, pageSize: 12 })
    ).rejects.toThrow('server error');
  });
});

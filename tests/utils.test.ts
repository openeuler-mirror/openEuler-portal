import { expect, describe, it, vi } from 'vitest';
import { isValidKey, isBrowser, getNowFormatDate, getUrlParams, isTestEmail, isTestPhone, setCustomCookie, getCustomCookie, removeCustomCookie } from '../app/.vitepress/src/shared/utils';

describe('测试 isValidKey', () => {
  it('key 为 string', () => {
    const obj1 = { 'key': 1 };
    expect(isValidKey('key', obj1)).toBe(true);
    expect(isValidKey('b', obj1)).toBe(false);
  });

  it('key 为 number', () => {
    const obj1 = { 1: 1 };
    expect(isValidKey(1, obj1)).toBe(true);
    expect(isValidKey(2, obj1)).toBe(false);
  });

  it('key 为 symbol', () => {
    const symbol1 = Symbol('key1');
    const symbol2 = Symbol('key2');
    const obj1 = { [symbol1]: 1 };
    expect(isValidKey(symbol1, obj1)).toBe(true);
    expect(isValidKey(symbol2, obj1)).toBe(false);
  });
});

describe('测试 isBrowser', () => {
  it('非浏览器环境', () => {
    expect(isBrowser()).toBe(false);
  });
});

describe('测试 getNowFormatDate', () => {
  it('获取格式化时间', () => {
    const mockDate = new Date(2026, 2, 10);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
    expect(getNowFormatDate()).toBe('2026/3/10');
    vi.useRealTimers();
  });
});

describe('测试 getUrlParams', () => {
  it('存在 url 参数', () => {
    expect(getUrlParams('http://example.com?a=1')).toHaveProperty('a');
    expect(getUrlParams('http://example.com?a=1&b=2')).toHaveProperty('b');
  });

  it('不存在 url 参数', () => {
    expect(getUrlParams('http://example.com?a=1')).not.toHaveProperty('c');
    expect(getUrlParams('http://example.com?a=1&b=2')).not.toHaveProperty('c');
  });

  it('非法 url 地址', () => {
    expect(getUrlParams('sdfgdfsgasDKJBFSJKFB')).toBe(undefined);
  });
});

describe('测试 isTestEmail', () => {
  it('正确的电子邮箱格式', () => {
    expect(isTestEmail('asdsad@163.com')).toBe(true);
    expect(isTestEmail('123456@qq.com')).toBe(true);
  });

  it('非法的电子邮箱格式', () => {
    expect(isTestEmail('asdfsadfsdf')).toBe(false);
    expect(isTestEmail('asdsad@@sss')).toBe(false);
    expect(isTestEmail('asdsad@@qq.com')).toBe(false);
  });
});

describe('测试 isTestPhone', () => {
  it('正确的手机号格式', () => {
    expect(isTestPhone('18245678562')).toBe(true);
    expect(isTestPhone('13885765346')).toBe(true);
  });

  it('非法的手机号格式', () => {
    expect(isTestPhone('asdfsadfsdf')).toBe(false);
    expect(isTestPhone('11111111111')).toBe(false);
    expect(isTestPhone('123456')).toBe(false);
  });
});

describe('测试 cookie 功能', () => {
  const KEY = 'vitest-key';

  it('setCustomCookie', () => {
    setCustomCookie(KEY, '1');
    setCustomCookie(KEY, '2');
  });

  it('getCustomCookie', () => {
    expect(getCustomCookie(KEY)).toBe('2');
  });

  it('removeCustomCookie', () => {
    removeCustomCookie(KEY);
    expect(getCustomCookie(KEY)).toBe(undefined);
  });

  it('测试 cookie 时效性', () => {
    setCustomCookie(KEY, '1', 0);
    expect(getCustomCookie(KEY)).toBe(undefined);
    setCustomCookie(KEY, '1', 1);
    expect(getCustomCookie(KEY)).toBe('1');
  });
});

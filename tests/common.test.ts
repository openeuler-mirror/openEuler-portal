import { expect, describe, it, afterEach } from 'vitest';
import Cookies from 'js-cookie';
import { getCookie, setCookie, removeCookie } from '../app/.vitepress/src-new/utils/common';

describe('测试 common.ts cookie 功能', () => {
  const KEY = 'vitest-common-key';

  afterEach(() => {
    removeCookie(KEY);
  });

  it('setCookie 设置值后 getCookie 可读取', () => {
    setCookie(KEY, 'hello');
    expect(getCookie(KEY)).toBe('hello');
  });

  it('setCookie 重复设置取最新值', () => {
    setCookie(KEY, 'a');
    setCookie(KEY, 'b');
    expect(getCookie(KEY)).toBe('b');
  });

  it('removeCookie 后 getCookie 返回 undefined', () => {
    setCookie(KEY, 'val');
    removeCookie(KEY);
    expect(getCookie(KEY)).toBeUndefined();
  });

  it('getCookie 未设置的 key 返回 undefined', () => {
    expect(getCookie('nonexistent-key')).toBeUndefined();
  });

  it('setCookie 支持 day 参数 0（立即过期）', () => {
    setCookie(KEY, 'temp', 0);
    expect(getCookie(KEY)).toBeUndefined();
  });

  it('setCookie 支持 day 参数 1（1天有效）', () => {
    setCookie(KEY, 'valid', 1);
    expect(getCookie(KEY)).toBe('valid');
  });
});

describe('CVE-2026-46625: js-cookie __proto__ 原型污染防护验证', () => {
  it('Cookies.set() 传入 __proto__ 属性不会污染 Object.prototype', () => {
    const originalProto = Object.getPrototypeOf({});
    Cookies.set('cve-test', 'value', { __proto__: { polluted: 'yes' } });
    expect(Object.getPrototypeOf({})).toBe(originalProto);
    expect({}.polluted).toBeUndefined();
    Cookies.remove('cve-test');
  });

  it('Cookies.withAttributes() 传入 __proto__ 不会污染 Object.prototype', () => {
    const originalProto = Object.getPrototypeOf({});
    const custom = Cookies.withAttributes({ __proto__: { polluted: 'yes' } });
    expect(Object.getPrototypeOf({})).toBe(originalProto);
    expect({}.polluted).toBeUndefined();
    custom.set('cve-test-2', 'value2');
    Cookies.remove('cve-test-2');
  });
});

describe('js-cookie Object.prototype 污染对 Cookies.get() 的影响（3.0.5 已存问题，非回归）', () => {
  it('Object.prototype 污染属性会通过 Cookies.get(key) 泄露（已知问题）', () => {
    Object.prototype.__testLeak = 'leaked';
    const result = Cookies.get('__testLeak');
    delete Object.prototype.__testLeak;
    expect(result).toBe('leaked');
  });

  it('Object.prototype 污染属性会出现在 Cookies.get() 返回对象中（已知问题）', () => {
    Object.prototype.__testLeakKey = 'leakedValue';
    setCookie('real-cookie', 'real-value');
    const all = Cookies.get();
    expect(all.__testLeakKey).toBe('leakedValue');
    expect(all['real-cookie']).toBe('real-value');
    delete Object.prototype.__testLeakKey;
    removeCookie('real-cookie');
  });
});
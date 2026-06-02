import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { isValidKey, isBrowser, getNowFormatDate, getUrlParams, isTestEmail, isTestPhone, setCustomCookie, getCustomCookie, removeCustomCookie, firstToUpper, useStoreData, getLanguage, login, logout } from '../app/.vitepress/src/shared/utils';

// vitepress 的 useData 在 SSG 环境注入，单测环境需 mock
vi.mock('vitepress', () => ({
  useData: () => ({
    lang: { value: 'zh' },
  }),
}));

// user store 依赖 analytics、@opendesign-plus/composables 等浏览器模块，单测中替换为最小实现
vi.mock('@/stores/user', async () => {
  const pinia = await vi.importActual<typeof import('pinia')>('pinia');
  const vue = await vi.importActual<typeof import('vue')>('vue');
  return {
    useUserInfoStore: pinia.defineStore('userInfo', () => {
      const guardAuthClient = vue.ref({ email: '', photo: '', username: '' });
      const setGuardAuthClient = vi.fn();
      const clearGuardAuthClient = vi.fn();
      return { guardAuthClient, setGuardAuthClient, clearGuardAuthClient };
    }),
  };
});

// mock @opendesign-plus/composables 中的 doLogin 和 doLogout
vi.mock('@opendesign-plus/composables', () => ({
  doLogin: vi.fn(),
  doLogout: vi.fn(),
  useLoginStore: vi.fn(() => ({ isLogined: false })),
}));

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

describe('测试 firstToUpper', () => {
  it('应该将单个单词的首字母大写', () => {
    expect(firstToUpper('hello')).toBe('Hello');
  });
  it('应该将多个单词的首字母大写（Title Case）', () => {
    expect(firstToUpper('hello world')).toBe('Hello World');
  });
  it('应该处理全大写的输入，将其转为首字母大写，其余小写', () => {
    expect(firstToUpper('HELLO WORLD')).toBe('Hello World');
  });
});

describe('测试 useStoreData', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('应返回 user store 中的响应式引用', () => {
    const stores = useStoreData();
    expect(stores).toHaveProperty('guardAuthClient');
    expect(stores.guardAuthClient.value).toEqual({
      email: '',
      photo: '',
      username: '',
    });
  });

  it('修改 store 后引用值应同步更新', () => {
    const stores = useStoreData();
    stores.guardAuthClient.value = {
      email: 'test@openeuler.org',
      photo: '',
      username: 'tester',
    };
    expect(stores.guardAuthClient.value.username).toBe('tester');
    expect(stores.guardAuthClient.value.email).toBe('test@openeuler.org');
  });
});

describe('测试 getLanguage', () => {
  const originalPath = window.location.pathname;

  afterEach(() => {
    window.history.pushState({}, '', originalPath);
  });

  it('路径中包含 /zh/ 时应返回中文配置', () => {
    window.history.pushState({}, '', '/zh/sig/Kernel');
    expect(getLanguage()).toEqual({ lang: 'zh', language: 'zh-CN' });
  });

  it('路径中包含 /en/ 时应返回英文配置', () => {
    window.history.pushState({}, '', '/en/sig/Kernel');
    expect(getLanguage()).toEqual({ lang: 'en', language: 'en-US' });
  });

  it('根路径应返回英文配置', () => {
    window.history.pushState({}, '', '/');
    expect(getLanguage()).toEqual({ lang: 'en', language: 'en-US' });
  });

  it('其他不包含 /zh/ 的路径应返回英文配置', () => {
    window.history.pushState({}, '', '/blog/2026/something');
    expect(getLanguage()).toEqual({ lang: 'en', language: 'en-US' });
  });
});

describe('测试 login', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_LOGIN_ORIGIN', 'https://login.openeuler.org');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('应该构建正确的登录 URL 并调用 doLogin', async () => {
    const { doLogin } = await import('@opendesign-plus/composables');
    login('zh');
    const expectedUrl = `https://login.openeuler.org/login?redirect_uri=${encodeURIComponent(location.href)}&lang=zh`;
    expect(doLogin).toHaveBeenCalledWith(expectedUrl);
  });

  it('应该支持多语言参数', async () => {
    const { doLogin } = await import('@opendesign-plus/composables');
    login('en');
    const expectedUrl = `https://login.openeuler.org/login?redirect_uri=${encodeURIComponent(location.href)}&lang=en`;
    expect(doLogin).toHaveBeenCalledWith(expectedUrl);
  });
});

describe('测试 logout', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_LOGIN_ORIGIN', 'https://login.openeuler.org');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('应该构建正确的登出 URL 并调用 doLogout', async () => {
    const { doLogout } = await import('@opendesign-plus/composables');
    logout('zh');
    const expectedUrl = `https://login.openeuler.org/logout?redirect_uri=${encodeURIComponent(location.href)}&lang=zh`;
    expect(doLogout).toHaveBeenCalledWith(expectedUrl);
  });

  it('应该支持多语言参数', async () => {
    const { doLogout } = await import('@opendesign-plus/composables');
    logout('en');
    const expectedUrl = `https://login.openeuler.org/logout?redirect_uri=${encodeURIComponent(location.href)}&lang=en`;
    expect(doLogout).toHaveBeenCalledWith(expectedUrl);
  });
});

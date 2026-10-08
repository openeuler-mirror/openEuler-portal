import { expect, describe, it, vi } from 'vitest';
import axios from 'axios';

import setConfig from '../app/.vitepress/src-new/shared/axios/setConfig';
import handleResponse from '../app/.vitepress/src-new/shared/axios/handleResponse';

describe('axios 1.20.0 版本验证', () => {
  it('installed version should be 1.20.0', () => {
    expect(axios.VERSION).toBe('1.20.0');
  });
});

describe('axios API compatibility — CancelToken / isCancel / Cancel', () => {
  it('CancelToken is still available and functional', () => {
    expect(typeof axios.CancelToken).toBe('function');
    expect(typeof axios.CancelToken.source).toBe('function');
  });

  it('CancelToken.source() returns { token, cancel }', () => {
    const source = axios.CancelToken.source();
    expect(source.token).toBeDefined();
    expect(typeof source.cancel).toBe('function');
  });

  it('isCancel correctly identifies cancelled errors', () => {
    const source = axios.CancelToken.source();
    source.cancel('test cancel');
    expect(axios.isCancel({ __CANCEL__: true, message: 'test cancel' })).toBe(true);
    expect(axios.isCancel(new Error('not cancel'))).toBe(false);
  });

  it('Cancel constructor still works', () => {
    expect(typeof axios.Cancel).toBe('function');
    const cancel = new axios.Cancel('operation cancelled');
    expect(cancel.message).toBe('operation cancelled');
  });
});

describe('axios API compatibility — AxiosHeaders / AxiosError', () => {
  it('AxiosHeaders is still available', () => {
    expect(typeof axios.AxiosHeaders).toBe('function');
    const headers = new axios.AxiosHeaders({ 'Content-Type': 'application/json' });
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('AxiosError is still available and functional', () => {
    expect(typeof axios.AxiosError).toBe('function');
    const err = new axios.AxiosError('request failed', 'ERR_BAD_REQUEST');
    expect(err.message).toBe('request failed');
    expect(err.code).toBe('ERR_BAD_REQUEST');
    expect(axios.AxiosError.ERR_BAD_REQUEST).toBeDefined();
  });

  it('AxiosRequestHeaders type exists via RawAxiosRequestHeaders & AxiosHeaders', () => {
    const headers = new axios.AxiosHeaders();
    headers.set('X-Custom', 'value');
    expect(headers.get('X-Custom')).toBe('value');
  });
});

describe('setConfig — default config still applies correctly with 1.20.0', () => {
  it('applies default timeout and headers', () => {
    const instance = setConfig(axios);
    expect(instance.defaults.timeout).toBe(20000);
    expect(instance.defaults.headers['Content-Type']).toBe('application/json;charset=UTF-8');
  });

  it('custom config overrides defaults', () => {
    const customAxios = axios.create();
    setConfig(customAxios as any, { timeout: 5000 });
    expect(customAxios.defaults.timeout).toBe(5000);
  });

  it('returns the same axios instance', () => {
    const result = setConfig(axios);
    expect(result).toBe(axios);
  });
});

describe('handleResponse — still passes through response', () => {
  it('returns the response object unchanged', () => {
    const mockResponse = {
      data: { id: 1, name: 'test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    } as any;
    const result = handleResponse(mockResponse);
    expect(result).toBe(mockResponse);
    expect(result.data).toEqual({ id: 1, name: 'test' });
    expect(result.status).toBe(200);
  });
});

describe('axios instance — request/intactRequest exports', () => {
  it('intactRequest is AxiosStatic (axios itself with interceptors)', async () => {
    vi.mock('~@/i18n', () => ({
      default: { global: { t: (k: string) => k } },
    }));
    vi.mock('@opensig/opendesign', () => ({
      isBoolean: (v: any) => typeof v === 'boolean',
      useLoading: () => ({ toggle: vi.fn() }),
      useMessage: () => ({ show: vi.fn() }),
      isNull: (v: any) => v === null,
      isUndefined: (v: any) => v === undefined,
    }));

    const { intactRequest } = await import('../app/.vitepress/src-new/shared/axios/index');
    expect(typeof intactRequest).toBe('function');
    expect(typeof intactRequest.get).toBe('function');
    expect(typeof intactRequest.post).toBe('function');
    expect(typeof intactRequest.CancelToken).toBe('function');
    expect(typeof intactRequest.isCancel).toBe('function');
  });
});

describe('CancelToken duplicate request cancellation — mechanism still works with 1.20.0', () => {
  it('CancelToken.source().cancel() produces a cancel error identifiable by isCancel', () => {
    const source = axios.CancelToken.source();
    source.cancel('request cancelled by user');
    expect(source.token.reason).toBeDefined();
    expect(source.token.reason?.message).toBe('request cancelled by user');
    expect(axios.isCancel(source.token.reason)).toBe(true);
  });

  it('Cancel constructor message is accessible', () => {
    const cancelMsg = 'duplicate request cancelled';
    const cancelErr = new axios.Cancel(cancelMsg);
    expect(cancelErr.message).toBe(cancelMsg);
    expect(axios.isCancel(cancelErr)).toBe(true);
  });

  it('CancelToken token Promise resolves when cancelled', async () => {
    const source = axios.CancelToken.source();
    source.cancel('abort');
    await expect(source.token.promise).resolves.toBeDefined();
    const reason = await source.token.promise;
    expect(reason.message).toBe('abort');
  });
});

describe('axios.defaults behavior — 1.20.0 regression check', () => {
  it('defaults.headers is AxiosHeaders instance after setConfig', () => {
    setConfig(axios);
    expect(axios.defaults.headers).toBeDefined();
    expect(axios.defaults.headers['Content-Type']).toBe('application/json;charset=UTF-8');
  });

  it('axios.create() produces a new instance with inherited defaults', () => {
    setConfig(axios);
    const instance = axios.create();
    expect(instance.defaults.timeout).toBe(20000);
    expect(instance.defaults.headers['Content-Type']).toBe('application/json;charset=UTF-8');
  });
});

describe('axios AbortController 前向兼容 — CancelToken 弃用迁移路径 (1.20.0)', () => {
  // CancelToken 自 v0.22.0 起被官方文档标记为 deprecated，README 推荐 AbortController 替代。
  // 本组用例验证：若将 shared/axios/index.ts:88 的 `new axios.CancelToken(...)` 迁移至
  // AbortController，项目现有的 `axios.isCancel(err)` 判定（index.ts:150 / 163）仍能正确识别取消请求。
  it('AbortController is available as a global constructor', () => {
    expect(typeof AbortController).toBe('function');
    const controller = new AbortController();
    expect(typeof controller.abort).toBe('function');
    expect(controller.signal).toBeDefined();
    expect(controller.signal.aborted).toBe(false);
  });

  it('axios.CanceledError is exported (the error type AbortController abort produces)', () => {
    expect(typeof axios.CanceledError).toBe('function');
  });

  it('pre-aborted signal rejects with a CanceledError identifiable by axios.isCancel', async () => {
    const controller = new AbortController();
    controller.abort();
    let caught: unknown;
    try {
      await axios.get('http://127.0.0.1:1/never-listened', {
        signal: controller.signal,
        timeout: 1000,
      });
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(axios.CanceledError);
    expect(axios.isCancel(caught)).toBe(true);
    expect((caught as { code?: string }).code).toBe(axios.AxiosError.ERR_CANCELED);
  });

  it('aborted AbortController signal flips to aborted state (control surface for migration)', () => {
    const controller = new AbortController();
    expect(controller.signal.aborted).toBe(false);
    controller.abort();
    expect(controller.signal.aborted).toBe(true);
  });
});
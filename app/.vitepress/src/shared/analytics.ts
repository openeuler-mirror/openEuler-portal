import {
  OpenAnalytics,
  OpenEventKeys,
  getClientInfo,
} from '@opensig/open-analytics';
import { reporAnalytics } from '@/api/api-analytics';
import { Awaitable } from 'vitepress';
import { COOKIE_AGREED_STATUS, useCookieStore } from '~@/stores/common';
import { useLogin } from '@/stores/login';
import { removeCustomCookie } from './utils';

const DEFAULT_SERVICE = 'portal';

const REGEXP = /^\/(?:zh|en)\/(security\/cve|download|sig)\/?/;

const pathServiceMap = {
  'security/cve': 'cvemanager',
  download: 'download',
  sig: 'sig',
} as Record<string, string>;

export const oa = new OpenAnalytics({
  appKey: 'openEuler',
  request: (data) => {
    if (
      useCookieStore().getUserCookieStatus() !== COOKIE_AGREED_STATUS.ALL_AGREED
    ) {
      disableOA();
      removeHM();
      return;
    }
    reporAnalytics(data);
  },
});

export const enableOA = () => {
  oa.setHeader(getClientInfo());
  oa.enableReporting(true);
};

export const disableOA = () => {
  oa.enableReporting(false);
  [
    'oa-openEuler-client',
    'oa-openEuler-events',
    'oa-openEuler-session',
  ].forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const removeHM = () => {
  const scripts = document.querySelectorAll('script.analytics-script');
  scripts.forEach((script) => {
    script.remove();
  });
  const hm = /^hm/i;
  document.cookie
    .split(';')
    .map((c) => c.trim())
    .forEach((c) => {
      const key = decodeURIComponent(c.split('=')[0]);
      if (hm.test(key)) {
        removeCustomCookie(key, { domain: location.hostname });
      }
    });
  [sessionStorage, localStorage].forEach((storage) => {
    const keys = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)!;
      if (hm.test(key)) {
        keys.push(key);
      }
    }
    keys.forEach(key => storage.removeItem(key));
  })
}

export const reportPV = () => {
  const path = REGEXP.exec(window.location.pathname)?.[1];
  const service = path && pathServiceMap[path];
  oaReport(OpenEventKeys.PV, null, service);
};

export const reportPerformance = () => {
  oaReport(OpenEventKeys.LCP);
  oaReport(OpenEventKeys.INP);
  oaReport(OpenEventKeys.PageBasePerformance);
};

/**
 * @param event 事件名
 * @param eventData 上报数据
 * @param $service service字段取值
 * @param options options
 */
export function oaReport<T extends Record<string, any>>(
  event: string,
  eventData?: T | ((...opts: any[]) => Awaitable<T>) | null,
  $service = DEFAULT_SERVICE,
  options?: {
    immediate?: boolean;
    eventOptions?: any;
  }
) {
  if (!oa.enabled) {
    return;
  }
  return oa.report(
    event,
    async (...opt) => {
      const loginStore = useLogin();
      return {
        $service,
        login_status: loginStore.isLoggedIn,
        ...(typeof eventData === 'function'
          ? await eventData(...opt)
          : eventData),
      };
    },
    options
  );
}

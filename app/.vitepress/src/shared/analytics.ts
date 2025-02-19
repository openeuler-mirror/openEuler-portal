import { OpenAnalytics, OpenEventKeys } from '@opensig/open-analytics';
import { reporAnalytics } from '@/api/api-analytics';
import { Awaitable } from 'vitepress';
import { COOKIE_AGREED_STATUS, useCookieStore } from '~@/stores/common';

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
      return;
    }
    reporAnalytics(data);
  },
});

export const enableOA = () => {
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
    async (...opt) => ({
      $service,
      ...(typeof eventData === 'function'
        ? await eventData(...opt)
        : eventData),
    }),
    options
  );
}

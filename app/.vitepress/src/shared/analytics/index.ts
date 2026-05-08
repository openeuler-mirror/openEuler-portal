import {
  OpenAnalytics,
  OpenEventKeys,
  getClientInfo,
} from '@opensig/open-analytics';
import startListenCookieSet, {
  isCookieAgreed,
  setIsCookieAgreed,
} from './cookie';
import startListenHistoryChange from './history';
import { vAnalytics } from './directives';

export const DEFAULT_SERVICE = 'portal';

let appKey: string;
export let oa: OpenAnalytics | null = null;

type onReport = ConstructorParameters<typeof OpenAnalytics>[0]['request'];

export const installer = (
  app: any,
  options: {
    isCookieAgreed?: () => boolean;
    appKey: string;
    request: string | onReport;
    onEnable?: () => void;
    onDisable?: () => void;
    onPageView?: (from: string, to: string) => Record<string, any> | void;
  }
) => {
  appKey = options.appKey;
  if (typeof options.isCookieAgreed === 'function')
    setIsCookieAgreed(options.isCookieAgreed);
  oa = new OpenAnalytics({
    appKey: options.appKey,
    request: (data) => {
      if (!isCookieAgreed()) {
        disableOA();
        return;
      }
      if (typeof options.request === 'string') {
        fetch(options.request, {
          body: JSON.stringify(data),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (typeof options.request === 'function') {
        options.request(data);
      }
    },
  });
  if (
    typeof options.onEnable === 'function' ||
    typeof options.onDisable === 'function'
  ) {
    const enableReporting = OpenAnalytics.prototype.enableReporting;
    OpenAnalytics.prototype.enableReporting = function (
      this: OpenAnalytics,
      enable: boolean
    ) {
      try {
        if (enable) {
          options.onEnable?.();
        } else {
          options.onDisable?.();
        }
      } finally {
        enableReporting.call(this, enable);
      }
    };
  }
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (isCookieAgreed()) {
      enableOA();
    }
    startListenCookieSet(() => {
      if (isCookieAgreed()) {
        if (!oa?.enabled) enableOA();
      } else {
        if (oa?.enabled) disableOA();
      }
    });
    startListenHistoryChange(options.onPageView);
    if (options.onPageView) {
      reportPV(options.onPageView('/', location.pathname));
    } else {
      reportPV();
    }
    reportPerformance();
  }
  app.directive('analytics', vAnalytics);
};

/**
 * 开启埋点上报功能
 *
 * 设置上报内容的header信息为浏览器相关信息
 */
export const enableOA = () => {
  oa?.setHeader(getClientInfo());
  oa?.enableReporting(true);
};

/**
 * 关闭埋点上报功能，清除localStorage中关于埋点的条目
 */
export const disableOA = () => {
  oa?.enableReporting(false);
  [
    `oa-${appKey}-client`,
    `oa-${appKey}-events`,
    `oa-${appKey}-session`,
  ].forEach((key) => {
    localStorage.removeItem(key);
  });
};

/**
 * 上报PageView事件
 * @param $referrer 从哪一个页面跳转过来
 */
export const reportPV = (options?: Record<string, any> | void) => {
  oaReport(OpenEventKeys.PV, options || null);
};

/**
 * 上报性能指标
 */
export const reportPerformance = () => {
  oaReport(OpenEventKeys.LCP);
  oaReport(OpenEventKeys.INP);
  oaReport(OpenEventKeys.PageBasePerformance);
};

type Awaitable<T> = T | Promise<T>;

/**
 * 上报埋点数据
 *
 * @param event 事件名
 * @param eventData 上报数据
 * @param $service service字段取值
 * @param options options
 *
 * @example
 * // 最终上报数据格式：
 * {
 *  event: string; // 事件名
 *  properties: {
 *    $service: string; // service字段
 *    ...eventData // 上报数据
 *  }
 * }
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
  return oa?.report(
    event,
    async (...opt) => {
      return {
        $service,
        ...(typeof eventData === 'function'
          ? await eventData(...opt)
          : eventData),
      };
    },
    options
  );
}

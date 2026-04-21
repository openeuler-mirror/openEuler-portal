import { oa, reportPV } from './index';

export default function startListenHistoryChange(
  onPageView?: (from: string, to: string) => Record<string, any> | void
) {
  let $referrer: string;

  ['replaceState', 'pushState'].forEach((method) => {
    const native = History.prototype[method as 'replaceState' | 'pushState'];
    History.prototype[method as 'replaceState' | 'pushState'] = function (
      data: any,
      unused: string,
      url?: string | URL | null
    ) {
      try {
        if (oa?.enabled) {
          const beforePath = location.pathname;
          native.call(this, data, unused, url);
          const afterPath = location.pathname;
          if (beforePath !== afterPath) {
            reportPV({
              $referrer,
              ...(onPageView ? onPageView(beforePath, afterPath) : {}),
            });
          }
        } else {
          native.call(this, data, unused, url);
        }
      } catch {
        native.call(this, data, unused, url);
      } finally {
        $referrer = location.href;
      }
    };
  });

  window.addEventListener('popstate', () => {
    const prevPath = new URL($referrer).pathname;
    if (prevPath !== location.pathname) {
      reportPV({
        $referrer,
        ...(onPageView
          ? onPageView(prevPath, new URL(location.href).pathname)
          : {}),
      });
    }
    $referrer = location.href;
  });
}

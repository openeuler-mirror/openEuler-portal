import type { App } from 'vue';
import { createPinia } from 'pinia';
import { SeoBox } from '@/components/seo-box';

import 'aos/dist/aos.css';
import '@/shared/styles/element-plus/index.scss';
import '@/shared/styles/index.scss';
//--------------------------------------
import '~@/assets/style/theme/default-light.token.css';
import '~@/assets/style/theme/dark.token.css';
import '@opensig/opendesign/es/index.css';
import '@opendesign-plus/components/styles';
import '~@/assets/style/theme/index.scss';
import '~@/assets/style/theme/media.token.scss';
import '~@/assets/style/markdown-new.scss';

import ElementPlus from 'element-plus';
import OpenDesign from 'opendesign';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import i18n from '~@/i18n';
import scrollBottomDirective from '~@/directive/scroll-bottom';
import clampTextDirective from '~@/directive/clamp-text';

import Layout from '@/App.vue';
import NotFound from '@/NotFound.vue';
import { installer } from '@/shared/analytics';
import { reporAnalytics } from '@/api/api-analytics';
import { removeCustomCookie } from '@/shared/utils';

export default {
  Layout,
  NotFound,
  enhanceApp({ app }: { app: App }) {
    if (typeof global !== 'undefined') {
      // @ts-ignore
      global.window = {};
      global.__VUE_PROD_DEVTOOLS__ = false;
    }
    app.use(installer, {
      appKey: 'openEuler',
      isCookieAgreed() {
        return location.pathname.startsWith('/zh') ? true : document.cookie.includes('agreed-cookiepolicy-en=1');
      },
      onPageView(_, to) {
        if (to.includes('/security/cve')) {
          return { $service: 'cvemanager' };
        }
        if (to.includes('/sig')) {
          return { $service: 'sig' };
        }
        if (to.includes('/download')) {
          return { $service: 'download' };
        }
      },
      onEnable() {
        const hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?ab8d86daab9a8e98cf8faa239aefcd3c';
        hm.classList.add('analytics-script');
        const s = document.getElementsByTagName('HEAD')[0];
        s.appendChild(hm);
      },
      onDisable() {
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
      },
      request(data) {
        reporAnalytics(data)
      },
    });
    app.directive('clamp-text', clampTextDirective);
    app.directive('scroll-bottom', scrollBottomDirective);
    app.use(VueDOMPurifyHTML);
    app.use(SeoBox as any);
    app.use(createPinia());
    app.use(ElementPlus);
    app.use(OpenDesign);
    app.use(i18n);
  },
};

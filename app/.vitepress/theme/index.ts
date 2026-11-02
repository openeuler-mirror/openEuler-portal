import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';
import { SeoBox } from '@/components/seo-box';

import 'aos/dist/aos.css';
import '@/shared/styles/element-plus/index.scss';
import '@/shared/styles/index.scss';
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
//--------------------------------------
import '@opensig/opendesign/es/theme/openeuler/index.scss';
import '@opensig/opendesign-token/themes/e.light.token.css';
import '@opensig/opendesign-token/themes/e.dark.token.css';
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
import { initOpenDesignAnalytics } from '@opendesign-plus/plugins/analytics';
import { reporAnalytics } from '@/api/api-analytics';
import { removeCustomCookie } from '@/shared/utils';
import { createTheme } from '@opendesign-plus/composables';

import MarkdownLayout from '~@/components/markdown/MarkdownLayout.vue';

export default {
  Layout,
  NotFound,
  async enhanceApp({ app }: { app: App }) {
    if (typeof globalThis !== 'undefined') {
      // @ts-ignore
      globalThis.__VUE_PROD_DEVTOOLS__ = false;
    }
    app.use(initOpenDesignAnalytics, {
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
    app.component('MarkdownLayout', MarkdownLayout);
    app.use(VueDOMPurifyHTML);
    app.use(SeoBox as any);
    app.use(createPinia());
    app.use(ElementPlus);
    app.use(OpenDesign);
    app.use(i18n);
    // 内容编辑器:仅编辑模式(VITE_EDIT_MODE=true)动态加载。
    // 动态 import 保证普通 dev/build 完全不加载 SDK 模块图
    // (editor-plugin 内部的 #content-manifest 虚拟模块仅在编辑模式可解析)。
    if (import.meta.env.VITE_EDIT_MODE === 'true') {
      const { defineContentEditor } = await import('portal-cms/vitepress');
      // 全自动:模块从 .content 目录自动发现,路由按"目录 = URL"约定推导。
      // routes 仅声明约定不成立的例外(URL 修正 / null 纯数据模块)。
      app.use(
        defineContentEditor({
          routes: {
            organization: ['/zh/community/organization', '/en/community/organization'],
            search: ['/zh/other/search', '/en/other/search'],
            'security/safety-bulletin': ['/zh/security/security-bulletins', '/en/security/security-bulletins'],
            // 纯数据(无独立预览页):仅表单编辑,不驱动 iframe 导航
            activity: null,
            common: null,
            community: null,
            footer: null,
            header: null,
            wiki: null,
          },
        }) as unknown as Plugin,
      );
    }
    app.use(
      createTheme({
        cookieKey: 'openEuler-theme-appearance',
        cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN,
        attributeLightValue: 'e.light',
        attributeDarkValue: 'e.dark',
      })
    );
  },
};

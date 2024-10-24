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


import ElementPlus from 'element-plus';
import OpenDesign from 'opendesign';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import i18n from '~@/i18n';

import Layout from '@/App.vue';
import NotFound from '@/NotFound.vue';

export default {
  Layout,
  NotFound,
  enhanceApp({ app }: { app: App }) {
    if (typeof global !== 'undefined') {
      // @ts-ignore
      global.window = {};
    }
    app.use(VueDOMPurifyHTML);
    app.use(SeoBox as any);
    app.use(createPinia());
    app.use(ElementPlus);
    app.use(OpenDesign);
    app.use(i18n);
  },
};

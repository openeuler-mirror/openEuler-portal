import type { App } from 'vue';
import { createPinia } from 'pinia';
import { SeoBox } from '@/components/seo-box';

import 'aos/dist/aos.css';
import '@/shared/styles/element-plus/index.scss';
import '@/shared/styles/index.scss';

import ElementPlus from 'element-plus';
import OpenDesign from 'opendesign';
import VueDOMPurifyHTML from 'vue-dompurify-html';

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
  },
};

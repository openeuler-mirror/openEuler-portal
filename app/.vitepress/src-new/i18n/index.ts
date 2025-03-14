import { computed } from 'vue';
import { createI18n, type I18nOptions } from 'vue-i18n';
import { useData } from 'vitepress';

// 公共模块
import response from './response';
import cookie from './cookie';
import header from './header';
import footer from './footer';
import common from './common';
import search from './search';
// 业务
import talentAssessment from './talent-assessment';
import contactUs from './contact-us';
import home from './home';
import download from './download';
import sig from './sig';

import { getCurrentLocale } from '~@/utils/locale';

const datetimeFormats: I18nOptions['datetimeFormats'] = {
  zh: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  },
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  },
};

const messages = {
  zh: {
    // 公共模块
    response: response.zh,
    cookie: cookie.zh,
    header: header.zh,
    footer: footer.zh,
    common: common.zh,
    search: search.zh,

    // 业务
    talent: talentAssessment.zh,
    contact: contactUs.zh,
    home: home.zh,
    download: download.zh,
    sig: sig.zh,
  },
  en: {
    // 公共模块
    response: response.en,
    cookie: cookie.en,
    header: header.en,
    footer: footer.en,
    common: common.en,
    search: search.en,

    // 业务
    talent: talentAssessment.en,
    contact: contactUs.en,
    home: home.en,
    download: download.en,
    sig: sig.en,
  },
};

const locale = getCurrentLocale();

const i18n = createI18n({
  globalInjection: true,
  locale,
  legacy: false,
  fallbackLocale: 'zh',
  messages,
  datetimeFormats,
});

// TODO: 使用composables的 useLocale,对象放在 data 里面
export function useI18n() {
  const { lang } = useData();
  return computed(() => messages[lang.value]);
}

export default i18n;

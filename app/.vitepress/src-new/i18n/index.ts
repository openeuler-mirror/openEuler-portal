import { createI18n, type I18nOptions } from 'vue-i18n';

// 公共模块
import response from './response';
import cookie from './cookie';
// 业务
import talentAssessment from './talent-assessment';
import contactUs from './contact-us';
import home from './home';

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

    // 业务
    talent: talentAssessment.zh,
    contact: contactUs.zh,
    home: home.zh,
  },
  en: {
    // 公共模块
    response: response.en,
    cookie: cookie.en,

    // 业务
    talent: talentAssessment.en,
    contact: contactUs.en,
    home: home.en,
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

export default i18n;

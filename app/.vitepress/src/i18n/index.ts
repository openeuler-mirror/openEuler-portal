import { useData } from 'vitepress';

import sig from './sig';
import download from './download';
import brand from './brand';
import security from './security';
import home from './home';
import common from './common';
import mooc from './learn';
import atune from './projects/atune';
import bishengjdk from './projects/bishengjdk';
import isula from './projects/isula';
import secgear from './projects/secgear';
import stratovirt from './projects/stratovirt';
import showcase from './showcase';
import interaction from './interaction';
import live from './interaction/live';

const i18n: { [key: string]: any } = {
  zh: {
    sig: sig.zh,
    download: download.zh,
    brand: brand.zh,
    security: security.zh,
    home: home.zh,
    common: common.zh,
    mooc: mooc.zh,
    atune: atune.zh,
    bishengjdk: bishengjdk.zh,
    isula: isula.zh,
    secgear: secgear.zh,
    stratovirt: stratovirt.zh,
    showcase: showcase,
    interaction: interaction.zh,
    live: live.zh,
  },
  en: {
    sig: sig.en,
    download: download.en,
    brand: brand.en,
    security: security.en,
    home: home.en,
    common: common.en,
    atune: atune.en,
    bishengjdk: bishengjdk.en,
    isula: isula.en,
    secgear: secgear.en,
    stratovirt: stratovirt.en,
    interaction: interaction.en,
    live: live.en,
  },
  ru: {
    sig: sig.ru,
    download: download.ru,
    brand: brand.ru,
    security: security.ru,
    home: home.ru,
    common: common.ru,
    atune: atune.ru,
    bishengjdk: bishengjdk.ru,
    isula: isula.ru,
    secgear: secgear.ru,
    stratovirt: stratovirt.ru,
    interaction: interaction.ru,
    live: live.ru,
  },
};

export function useI18n() {
  const { lang } = useData();
  return i18n[lang.value];
}

export default i18n;

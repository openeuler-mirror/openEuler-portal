import { computed } from 'vue';
import { useData } from 'vitepress';

import sig from './sig';
import brand from './brand';
import common from './common';
import mooc from './learn';
import atune from './minisite/atune';
import bisheng from './minisite/bisheng';
import isula from './minisite/isula';
import secgear from './minisite/secgear';
import stratovirt from './minisite/stratovirt';
import showcase from './showcase';
import interaction from './interaction';
import live from './interaction/live';
import filter from './filter';
import contribution from './contribution';
import mailing from './mailing';
import osv from './support/osv';
import compatibility from './support/compatibility';
import cve from './support/cve';
import safetyBulletin from './support/safety-bulletin';
import about from './about';
import sky from './sky';
import group from './group';
import university from './university';
import cookie from './cookie';
import migration from './migration';
import faq from './faq';
import nestos from './nestos';

const i18n: { [key: string]: any } = {
  zh: {
    sig: sig.zh,
    brand: brand.zh,
    common: common.zh,
    mooc: mooc.zh,
    atune: atune.zh,
    bisheng: bisheng.zh,
    isula: isula.zh,
    secgear: secgear.zh,
    stratovirt: stratovirt.zh,
    showcase: showcase.zh,
    interaction: interaction.zh,
    live: live.zh,
    approve: osv.zh,
    compatibility: compatibility.zh,
    cve: cve.zh,
    safetyBulletin: safetyBulletin.zh,
    filter: filter.zh,
    contribution: contribution.zh,
    mailing: mailing.zh,
    about: about.zh,
    sky: sky.zh,
    group: group.zh,
    university: university.zh,
    cookie: cookie.zh,
    migration: migration.zh,
    faq: faq.zh,
    nestos: nestos.zh,
  },
  en: {
    sig: sig.en,
    brand: brand.en,
    common: common.en,
    atune: atune.en,
    bisheng: bisheng.en,
    isula: isula.en,
    secgear: secgear.en,
    stratovirt: stratovirt.en,
    showcase: showcase.en,
    interaction: interaction.en,
    live: live.en,
    approve: osv.en,
    compatibility: compatibility.en,
    cve: cve.en,
    safetyBulletin: safetyBulletin.en,
    filter: filter.en,
    contribution: contribution.en,
    mailing: mailing.en,
    about: about.en,
    sky: sky.en,
    group: group.en,
    cookie: cookie.en,
    mooc: mooc.en,
    migration: migration.en,
    faq: faq.en,
  },
};

export function useI18n() {
  const { lang } = useData();
  return computed(() => i18n[lang.value]);
}

export default i18n;

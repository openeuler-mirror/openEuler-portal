<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import { OFooter } from '@opendesign-plus/components';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import {
  linksData,
  quickNav,
} from '~@/data/footer';
import footerContent from '#content/footer';

import LogoFooter from '~@/assets/category/footer/footer-logo2.png';
import LogoAtom from '~@/assets/category/footer/atom-logo.png';
import footerImg from '~@/assets/category/footer/footer-bg.png';
import footerImgMb from '~@/assets/category/footer/footer-bg-mo.png';

// 公众号、小助手
import CodeImgXzs from '~@/assets/category/footer/code-xzs.png';
import CodeImgZgz from '~@/assets/category/footer/code-zgz.jpg';

const { t } = useLocale();
const { lePadV } = useScreen();
const { lang } = useData();

const friendshipLinks = {
  zh: footerContent.zh.friendship_links,
  en: footerContent.en.friendship_links,
};
const filingData = footerContent.zh.filing;

const info = computed(() => {
  return {
    title: t('footer.atomText'),
    logo: LogoAtom,
    href: 'https://openatom.cn',
  }
});

const quickData = computed(() => {
  return quickNav[lang.value];
});

const friendshipData = computed(() => {
  return {
    title: t('footer.friendshipLink'),
    children: friendshipLinks[lang.value]
  };
});

const footerLogo = {
  logo: LogoFooter,
  email: 'contact@openeuler.io',
};

const footerOption = computed(() => {
  return {
    children: linksData[lang.value],
    licenseText: t('footer.license_1'),
    licenseInfo: t('footer.license_2'),
    copyright: t('footer.copyRight', { year: new Date().getFullYear() }),
    beianInfo1: t('footer.filingText1'),
    beianInfo2: t('footer.filingText2'),
    beianLink: filingData.link,
    policeIcon: filingData.icon,
  };
});

// 公众号、小助手
const qrcode = [
  {
    img: CodeImgXzs,
    label: t('footer.qrCode'),
  },
  {
    img: CodeImgZgz,
    label: t('footer.qrAssistant'),
  },
];
</script>

<template>
  <div id="tour_footer" class="footer">
    <OFooter
      :info="info"
      :quick-nav="quickData"
      :friendship-link="friendshipData"
      :footer-logo="footerLogo"
      :footer-option="footerOption"
      :qrcode="lang === 'en' ? {} : qrcode"
      :footer-bg-img="lePadV ? footerImgMb : footerImg"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>

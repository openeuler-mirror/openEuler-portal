<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import seoConfig from '@/data/common/seo';

import AppRouterTemplate from '~@/components/AppRouterTemplate.vue';
import AppRouterTemplateMo from '~@/components/AppRouterTemplateMo.vue';

import banner from '~@/assets/category/download/download-banner.png';
import IconCommunityReleases from '~icons/download/community-releases.svg';
import IconCommercaialReleases from '~icons/download/commercaial-releases.svg';

const { lang } = useData();
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const bannerData = {
  bannerImg: banner,
  bannerTitle: computed(() => t('download.download')),
  subtitle: computed(() => t('download.downloadDec')),
};

const tabsData = computed(() => [
  {
    title: t('download.COMMUNITY'),
    name: 'download',
    href: `/${locale.value}/download/`,
    icon: IconCommunityReleases,
    subtitle: locale.value === 'zh' ? t('download.communitySub') : '',
  },
  {
    title: t('download.commercaial'),
    name: 'commercial-release',
    href: `/${locale.value}/download/commercial-release/`,
    icon: IconCommercaialReleases,
    subtitle: locale.value === 'zh' ? t('download.commercaialSub') : '',
  },
]);
</script>
<template>
  <div>
    <SeoBox :seo-data="seoConfig[lang]?.download" />
    <component
      :is="lePadV ? AppRouterTemplateMo : AppRouterTemplate"
      :banner-data="bannerData"
      :tabs-data="tabsData"
    ></component>
    <Content />
  </div>
</template>

<style scoped lang="scss"></style>

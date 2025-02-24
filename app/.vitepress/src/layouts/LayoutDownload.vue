<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useData, useRoute } from 'vitepress';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import seoConfig from '@/data/common/seo';

import AppRouterTemplate from '~@/components/AppRouterTemplate.vue';
import AppRouterTemplateMo from '~@/components/AppRouterTemplateMo.vue';

import banner from '~@/assets/category/download/download-banner.png';
import IconCommunityReleases from '~icons/download/community-releases.svg';
import IconCommercaialReleases from '~icons/download/commercaial-releases.svg';
import { oaReport } from '@/shared/analytics';

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

const route = useRoute();

watch(
  () => route.path,
  (val) => {
    const module = /\/download\/?$/.test(val)
      ? tabsData.value[0].title
      : tabsData.value[1].title;
    oaReport(
      'click',
      {
        target: module,
        module,
      },
      'download'
    );
  }
);
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

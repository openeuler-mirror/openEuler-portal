<script lang="ts" setup>
import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-interaction.png';
import illustration from '@/assets/illustrations/salon.png';

const { lang } = useData();
const i18n = useI18n();
const salonData = computed(() => i18n.value.interaction.MEETUPSLIST);

const router = useRouter();

const bannerData = {
  bannerImg: banner,
  bannerText: 'CONNECT',
  bannerTitle: computed(() => {
    return salonData.value.MEETUPS;
  }),
  bannerIllustration: illustration,
};
const tabsData = {
  tabPane: [
    {
      label: salonData.value.YEAR_PLAN,
      name: 'event-list',
    },
    {
      label: salonData.value.DETAIL_NEWS,
      name: 'latest',
    },
    {
      label: salonData.value.DETAIL_REVIEW,
      name: 'review',
    },
  ],
};
function clickTab(val: string) {
  val === 'event-list'
    ? router.go(`/${lang.value}/interaction/event-list/`)
    : router.go(`/${lang.value}/interaction/event-list/${val}/`);
}
</script>
<template>
  <div>
    <AppRouterTemplate
      :banner-data="bannerData"
      :tabs-data="tabsData"
      @click-tab="clickTab"
    />
    <Content />
  </div>
</template>

<style scoped lang="scss">
.salon-tabs {
  margin: 0 auto;
  padding-left: 44px;
  padding-right: 44px;
  max-width: 1504px;
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
  }
}
</style>

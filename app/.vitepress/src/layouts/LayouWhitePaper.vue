<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useData, useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/technical-white-paper.png';

const { lang } = useData();
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.showcase);

const router = useRouter();

const bannerData = {
  bannerImg: banner,
  bannerTitle: computed(() => {
    return userCaseData.value.whilePaper;
  }),
  bannerIllustration: illustration,
};

const tabsData = reactive({
  tabPane: [
    {
      label: computed(() => {
        return userCaseData.value.technicalWhilePaper;
      }),
      name: 'technical-white-paper',
    },
    {
      label: computed(() => {
        return userCaseData.value.IndustryWhilePaper;
      }),
      name: 'industry-white-paper',
    },
  ],
});
function clickTab(val: string) {
  val === 'technical-white-paper'
    ? router.go(`/${lang.value}/showcase/technical-white-paper/`)
    : router.go(`/${lang.value}/showcase/industry-white-paper/`);
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
</style>

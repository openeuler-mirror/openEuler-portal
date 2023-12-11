<script lang="ts" setup>
import { reactive, computed, ref, onMounted, onUpdated } from 'vue';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';
import seoConfig from '@/data/common/seo';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-download.png';
import illustration from '@/assets/illustrations/iso.png';
import { useRouter } from 'vitepress';

const { lang } = useData();
const i18n = useI18n();

const router = useRouter();
const clickTab = (val: string) => {
  val === 'download'
    ? router.go(`/${lang.value}/download/`)
    : router.go(`/${lang.value}/download/${val}/`);
};
const bannerData = {
  bannerImg: banner,
  bannerTitle: computed(() => {
    return i18n.value.download.OUTSIDE_TITLE;
  }),
  bannerIllustration: illustration,
};

const tabsData = reactive({
  tabPane: [
    {
      label: computed(() => {
        return i18n.value.download.COMMUNITY;
      }),
      name: 'download',
    },
    {
      label: computed(() => {
        return i18n.value.download.BUSINESS;
      }),
      name: 'commercial-release',
    },
  ],
});

const activeTab = ref('');
onMounted(() => {
  onUpdated(() => {
    const pathList = router.route.path.split('/');
    activeTab.value = pathList[pathList.length - 2];
  });
});
</script>
<template>
  <div>
    <SeoBox :seo-data="seoConfig[lang]?.download" />
    <AppRouterTemplate
      :banner-data="bannerData"
      :tabs-data="tabsData"
      :active-tab="activeTab"
      @click-tab="clickTab"
    />
    <Content />
  </div>
</template>

<style scoped lang="scss"></style>

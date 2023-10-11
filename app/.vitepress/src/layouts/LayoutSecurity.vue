<script lang="ts" setup>
import { reactive, computed, ref, onMounted, onUpdated } from 'vue';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-security.png';
import illustration from '@/assets/illustrations/support/cve.png';
import { useRouter } from 'vitepress';

const { lang } = useData();
const i18n = useI18n();

const btnLink = computed(() => {
  return `${lang.value}/security/vulnerability-reporting/`;
});

const router = useRouter();
const clickTab = (val: string) => {
  val === 'cve'
    ? router.go(`/${lang.value}/security/cve/`)
    : router.go(`/${lang.value}/security/security-bulletins/`);
};
const bannerData = {
  bannerImg: banner,
  bannerText: 'DOWNLOAD',
  bannerTitle: i18n.value.cve.SAFETY_CENTER,
  bannerIllustration: illustration,
};

const tabsData = reactive({
  tabPane: [
    {
      label: computed(() => {
        return i18n.value.cve.SECURITY_ADVISORIES;
      }),
      name: 'security-bulletins',
    },
    {
      label: computed(() => {
        return i18n.value.cve.CVE;
      }),
      name: 'cve',
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
    <AppRouterTemplate
      :banner-data="bannerData"
      :tabs-data="tabsData"
      :active-tab="activeTab"
      :button-text="i18n.cve.VULNERABILITY"
      :button-link="btnLink"
      @click-tab="clickTab"
    />
    <Content />
  </div>
</template>

<style scoped lang="scss"></style>

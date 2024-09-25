<script setup lang="ts">
import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed, onMounted } from 'vue';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';
import LayoutAboutUs from '@/layouts/LayoutAboutUs.vue';
import LayoutAboutUsArchived from '@/layouts/LayoutAboutUsArchived.vue';
import LayoutDownload from './layouts/LayoutDownload.vue';
import LayoutEvent from './layouts/LayoutEvent.vue';
import LayoutSecurity from './layouts/LayoutSecurity.vue';
import LayoutWiki from './layouts/LayoutWiki.vue';
import LayoutFAQ from '@/layouts/LayoutFAQ.vue';

import AppFloat from '@/components/AppFloat.vue';
import AppFloatEn from '@/components/AppFloatEn.vue';
import CookieNotice from '@/components/CookieNotice.vue';

import categories from '@/data/common/category';
import { setStoreData } from './shared/login';

const { frontmatter, lang } = useData();

const locale = computed(() => {
  return lang.value === 'zh' ? zhCn : en;
});

const compMapping: {
  [name: string]: Component;
} = {
  blog: LayoutBlog,
  news: LayoutNews,
  showcase: LayoutShowcase,
  migration: LayoutMigration,
  'about-us': LayoutAboutUs,
  'about-us-archived': LayoutAboutUsArchived,
  download: LayoutDownload,
  event: LayoutEvent,
  security: LayoutSecurity,
  faq: LayoutFAQ,
  wiki: LayoutWiki,
};

const isCustomLayout = computed(() => {
  return (
    !!frontmatter.value.category &&
    categories.indexOf(frontmatter.value.category) !== -1
  );
});

const comp = computed(() => {
  return compMapping[frontmatter.value.category];
});

import { OpenAnalytics, OpenEventKeys } from '@opensig/open-analytics';

const oa = new OpenAnalytics({
  appKey: 'openEuler',
  request: (data) => {
    console.log(data);
  },
});

oa.enableReporting();
oa.report(OpenEventKeys.PV);
oa.report(OpenEventKeys.LCP);
oa.report(OpenEventKeys.INP);
oa.report(OpenEventKeys.PageBasePerformance);

onMounted(() => {
  setStoreData();
});
</script>

<template>
  <AppHeader />
  <el-config-provider :locale="locale">
    <main :class="frontmatter.class ? frontmatter.class : ''">
      <component :is="comp" v-if="isCustomLayout"></component>
      <Content v-else />
      <AppFloat v-if="lang === 'zh'" />
      <AppFloatEn v-else />
    </main>
  </el-config-provider>
  <CookieNotice />
  <AppFooter />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
  min-height: calc(100vh - 259px);
  background-color: var(--e-color-bg1);
  padding-top: 80px;
  &::after {
    content: '';
    display: table;
  }
  @media (max-width: 1100px) {
    padding-top: 48px;
  }
  &.download-page {
    @media (max-width: 1100px) {
      overflow: visible;
    }
  }
}
</style>

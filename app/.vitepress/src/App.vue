<script setup lang="ts">
import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed, onMounted, watch } from 'vue';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

//opendesign 国际化
import zhCN from '@opensig/opendesign/es/locale/lang/zh-cn';
import enUS from '@opensig/opendesign/es/locale/lang/en-us';

import { isClient, OScroller, OConfigProvider } from '@opensig/opendesign';

import AppHeader from '~@/components/header/AppHeader.vue';
// import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '~@/components/AppFooter.vue';
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
import LayouWhitePaper from '@/layouts/LayouWhitePaper.vue';

import FloatingButton from '~@/components/FloatingButton.vue';
import FloatingButtonEn from '~@/components/FloatingButtonEn.vue';
import CookieNotice from '~@/components/CookieNotice.vue';
import AppYear from '@/components/AppYear.vue';

import AppTour from '~@/components/AppTour.vue';

import categories from '@/data/common/category';
import { setStoreData } from './shared/login';
import { useLocale } from '~@/composables/useLocale';

const { changeLocale, isZh } = useLocale();
const { frontmatter, lang } = useData();

const elLocale = computed(() => {
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
  'white-paper': LayouWhitePaper,
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

// 是否添加footer 边距
const isDocs = computed(() => {
  return (
    frontmatter.value.category === 'migration' ||
    frontmatter.value.category === 'about-us' ||
    frontmatter.value.category === 'wiki'
  );
});
// ----------------------------- new ----------------------------

watch(
  () => lang.value,
  () => {
    changeLocale(lang.value);
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  setStoreData();
});
</script>

<template>
  <AppHeader />
  <OConfigProvider :locale="isZh ? zhCN : enUS">
    <el-config-provider :locale="elLocale">
      <main :class="frontmatter.class ? frontmatter.class : ''">
        <component :is="comp" v-if="isCustomLayout"></component>
        <Content v-else />
        <FloatingButton v-if="lang === 'zh'" />
        <FloatingButtonEn v-else />
        <AppYear />
      </main>
    </el-config-provider>
  </OConfigProvider>
  <CookieNotice />
  <AppFooter :class="{ 'is-docs': isDocs }" :lang="lang" />
  <ClientOnly>
    <AppTour />
  </ClientOnly>
</template>

<style lang="scss" scoped>
// TODO: 导航高度使用变量
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.o-scroller {
  height: 100vh;
  background-color: var(--o-color-fill1);
  --scrollbar-height: calc(100vh - var(--layout-header-height) * 2 - 10px);
  :deep(.o-scroller-container) {
    scroll-padding-top: var(--layout-header-height);
  }
}

main {
  position: relative;
  min-height: calc(100vh - 259px);
  background-color: var(--o-color-fill1);
  padding-top: 80px;
  &::after {
    content: '';
    display: table;
  }
  @include respond-to('<=pad_v') {
    padding-top: 48px;
  }
  &.download-page {
    @media (max-width: 1100px) {
      overflow: visible;
    }
  }
}
.is-docs {
  margin-left: 300px;
  @media (max-width: 1100px) {
    margin-left: 0;
  }
}
</style>

<style lang="scss">
#app {
  --layout-content-max-width: 1544px;
  --layout-content-padding: 64px;
  --layout-header-height: 80px;

  @include respond-to('<=laptop') {
    --layout-content-max-width: 100%;
    --layout-content-padding: 40px;
  }

  @include respond-to('<=pad') {
    --layout-content-padding: 32px;
  }

  @include respond-to('phone') {
    --layout-content-padding: 24px;
  }
}
</style>

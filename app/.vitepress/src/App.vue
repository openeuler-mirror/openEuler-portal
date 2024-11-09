<script setup lang="ts">
import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed, onMounted, watch } from 'vue';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

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

import categories from '@/data/common/category';
import { setStoreData } from './shared/login';
import { useLocale } from '~@/composables/useLocale';

const { changeLocale } = useLocale();
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
  <el-config-provider :locale="locale">
    <main :class="frontmatter.class ? frontmatter.class : ''">
      <component :is="comp" v-if="isCustomLayout"></component>
      <Content v-else />
      <FloatingButton v-if="lang === 'zh'" />
      <FloatingButtonEn v-else />
    </main>
  </el-config-provider>
  <CookieNotice />
  <AppFooter :class="{ 'is-docs': isDocs }" :lang="lang" />
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
  --layout-content-max-width: 1616px;
  --layout-content-padding: 64px;

  @include respond-to('<=laptop') {
    --layout-content-max-width: 100%;
    --layout-content-padding: 40px;
  }

  @include respond-to('<=pad') {
    --layout-content-padding: 32px;
  }

  @include respond-to('<=pad_v') {
    --layout-content-padding: 24px;
  }
}
</style>

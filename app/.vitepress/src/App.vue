<script setup lang="ts">
import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed, onMounted, ref } from 'vue';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';
import LayoutAboutUs from '@/layouts/LayoutAboutUs.vue';
import LayoutDownload from './layouts/LayoutDownload.vue';
import LayoutEvent from './layouts/LayoutEvent.vue';

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
  download: LayoutDownload,
  event: LayoutEvent,
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

// cookies使用提示
const isCookieTip = ref(false);
function onCookieClick() {
  isCookieTip.value = false;
  localStorage.setItem('euler-cookie', 'false');
}

onMounted(() => {
  const show = localStorage.getItem('euler-cookie');
  isCookieTip.value = show ? false : true;
  setStoreData();
});
</script>

<template>
  <AppHeader />
  <el-config-provider :locale="locale">
    <main :class="frontmatter.class ? frontmatter.class : ''">
      <component :is="comp" v-if="isCustomLayout"></component>
      <Content v-else />
    </main>
  </el-config-provider>
  <AppFooter :is-cookie-tip="isCookieTip" @click-cookie="onCookieClick" />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
  min-height: calc(100vh - 259px);
  background-color: var(--o-color-bg1);
  padding-top: 80px;
  overflow: hidden;

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

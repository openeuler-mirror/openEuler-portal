<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import type { Component } from 'vue';
import { computed, onMounted, ref } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';

import categories from '@/data/common/category';
import { setStoreData } from './shared/login';

const { frontmatter } = useData();

const compMapping: {
  [name: string]: Component;
} = {
  blog: LayoutBlog,
  news: LayoutNews,
  showcase: LayoutShowcase,
  migration: LayoutMigration,
};

const route = useRoute();
const isBigEvent = computed(() => {
  return (
    route.path === '/zh' ||
    route.path === '/zh/' ||
    route.path === '/en' ||
    route.path === '/en/'
  );
});

console.log(isBigEvent.value);

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
const isCookieTip = ref(true);
function clickCookieClose() {
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
  <AppHeader :class="{ 'big-event': isBigEvent }" />
  <main :class="{ 'big-event': isBigEvent }">
    <component :is="comp" v-if="isCustomLayout"></component>
    <Content v-else />
  </main>
  <AppFooter
    :is-cookie-tip="isCookieTip"
    @click-close="clickCookieClose"
    :class="{ 'big-event': isBigEvent }"
  />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
  min-height: calc(100vh - 339px);
  background-color: var(--o-color-bg1);
  margin-top: 80px;
  overflow: hidden;

  @media (max-width: 1100px) {
    margin-top: 48px;
  }
}
</style>

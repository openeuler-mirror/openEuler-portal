<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useScreen } from '~@/composables/useScreen';
import navFilterConfig from '@/data/common/nav-filter';

import HeaderNav from './HeaderNav.vue';
import HeaderNavMoblie from './HeaderNavMoblie.vue';

const router = useRouter();
const { lang } = useData();
const { lePadV } = useScreen();

const routerPath = ref(router.route.path);
const langShow = ref(['zh', 'en']);
const isNewsorBlog = computed(() =>
  /^\/(zh|en)\/(news|blog)\//g.test(router.route.path)
);

const isHome = computed(() =>
  ['/', '/zh/', '/zh', '/en/', '/en'].includes(router.route.path)
);
watch(
  () => router.route.path,
  (val: string) => {
    routerPath.value = val;
    langShow.value = ['zh', 'en'];

    // 首页
    if (isHome.value) {
      return;
    }

    // 新闻、博客不一定存在对应中文
    if (isNewsorBlog.value) {
      langShow.value = [lang.value];
      return;
    }

    // 英文页面一定有中文
    if (lang.value === 'en') {
      return;
    }

    // 语言过滤
    for (let i = 0, len = navFilterConfig.length; i < len; i++) {
      // 其他
      const routeArr = routerPath.value.split('/');
      const routeName = routeArr[routeArr.length - 2];
      // TODO:目前只支持一级
      const names = navFilterConfig[i].name.split('/')
      const name = names[0];

      if (
        // 路径后缀匹配
        routeName === name ||
        // 路径全匹配
        routerPath.value === name ||
        // 子路径匹配
        (names[1] && names[1] === '**' && routerPath.value.includes(name))
      ) {
        langShow.value = navFilterConfig[i].lang;
        break;
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <HeaderNavMoblie v-if="lePadV" :lang-options="langShow" />
  <HeaderNav v-else :lang-options="langShow" />
</template>

<style lang="scss" scoped>
</style>

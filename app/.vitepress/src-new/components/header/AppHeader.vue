<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useScreen } from '~@/composables/useScreen';
import navFilterConfig from '@/data/common/nav-filter';

import HeaderNav from './HeaderNav.vue';
import SearchHeaderMo from '~@/views/search/SearchHeaderMo.vue';

import HeaderNavMoblie from './HeaderNavMoblie.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import logo_light from '~@/assets/category/header/logo.svg';
import logo_dark from '~@/assets/category/header/logo_dark.svg';
import IconClose from '~icons/app-new/icon-close.svg';
import IconMenu from '~icons/app-new/icon-header-menu.svg';
import IconBack from '~icons/app-new/icon-arrow-left.svg';

const router = useRouter();
const { lang, frontmatter } = useData();
const { lePadV } = useScreen();

const routerPath = ref(router.route.path);
const langShow = ref(['zh', 'en']);
const isNewsorBlog = computed(() =>
  /^\/(zh|en)\/(news|blog)\//g.test(router.route.path)
);

const isHome = computed(() =>
  ['/', '/zh/', '/zh', '/en/', '/en'].includes(router.route.path)
);

import { useCommon } from '@/stores/common';
import { isPadSize } from '@opensig/opendesign/lib/_utils/global';
const commonStore = useCommon();
// Logo主题判断
const logoUrl = computed(() =>
  commonStore.theme === 'light' ? logo_light : logo_dark
);

// 返回首页
const goHome = () => {
  menuShow.value = false;
  router.go(`/${lang.value}/`);
};

const goBack = (href: string) => {
  router.go(href);
};

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
      const names = navFilterConfig[i].name.split('/');
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

// 简单文字头部
const isSimpleHeader = computed(() => {
  return frontmatter.value.simpleHeader;
});

// 搜索页移动端布局
const isSearchPage = computed(() => {
  return frontmatter.value.searchPage;
});
const mobileNav = ref();
const menuShow = ref(false);
const menuPanel = () => {
  setTimeout(() => {
    menuShow.value = !menuShow.value;
  }, 200);
};

const mobileClick = () => {
  menuPanel();
};
</script>

<template>
  <header class="app-header" :class="{ dark: commonStore.theme === 'dark' }">
    <ContentWrapper class="app-header-wrap">
      <div v-if="lePadV && !isSimpleHeader && !isSearchPage" class="menu-icon">
        <div class="icon" @click="menuPanel">
          <OIcon>
            <IconMenu v-if="!menuShow" />
            <IconClose v-else />
          </OIcon>
        </div>
      </div>
      <!--  二级路由简单头部 -->
      <div v-if="lePadV && isSimpleHeader" class="simple-header">
        <OIcon class="icon-back" @click="goBack(isSimpleHeader)">
          <IconBack />
        </OIcon>
        <span>
          {{ frontmatter.title }}
        </span>
      </div>
      <SearchHeaderMo v-if="isSearchPage && lePadV" />
      <img
        v-if="(!isSimpleHeader && !isSearchPage) || !lePadV"
        class="logo"
        alt="openEuler logo"
        :src="logoUrl"
        @click="goHome"
      />
      <ClientOnly>
        <HeaderNavMoblie
          v-if="lePadV && !isSimpleHeader && !isSearchPage"
          ref="mobileNav"
          :lang-options="langShow"
          :menuShow="menuShow"
          @link-click="mobileClick"
        />
        <HeaderNav
          v-else-if="(!isSimpleHeader && !isSearchPage) || !lePadV"
          :lang-options="langShow"
        />
      </ClientOnly>
    </ContentWrapper>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: var(--o-color-fill2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  box-shadow: var(--o-shadow-1);
  backdrop-filter: blur(5px);

  @include respond-to('>pad_v') {
    &.dark {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: var(--o-color-control4);
      }
    }

    &:before {
      bottom: 0;
      box-shadow: var(--o-shadow-1);
      content: '';
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
    }
  }
  .simple-header {
    display: flex;
    align-items: center;
    @include h4;
    color: var(--o-color-info1);
    .o-icon {
      cursor: pointer;
      margin-right: 16px;
      font-size: var(--o-icon_size-m);
    }
  }

  .app-header-wrap {
    display: flex;
    align-items: center;
    @include respond-to('>pad_v') {
      height: 80px;
    }
    @include respond-to('<=pad_v') {
      height: 48px;
      justify-content: space-between;
      position: relative;
    }
  }
}

.logo {
  cursor: pointer;

  @include respond-to('>pad_v') {
    height: 32px;
    width: 136px;
    margin-right: var(--o-gap-7);

    @include respond-to('laptop') {
      margin-right: 28px;
    }
    @include respond-to('pad_h') {
      margin-right: var(--o-gap-2);
    }
  }
  @include respond-to('<=pad_v') {
    height: 24px;
    width: 136px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
  }
}

.menu-icon {
  flex: 1;
  display: block;
  .icon {
    font-size: var(--o-icon_size-m);
    color: var(--o-color-info1);
    height: 24px;
    cursor: pointer;
  }
}

html[lang='en'] {
  .logo {
    @media (min-width: 841px) and (max-width: 1000px) {
      width: 100px;
    }
  }
}
</style>

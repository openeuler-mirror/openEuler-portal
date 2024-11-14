<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted, watch, nextTick } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';

import useWindowResize from '@/components/hooks/useWindowResize';
import navFilterConfig from '@/data/common/nav-filter';

import HeaderNavNew from './HeaderNavNew.vue';
import HeaderSearch from './HeaderSearch.vue';
import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';
import AppLogin from './AppLogin.vue';

import logo_light from '@/assets/common/header/logo.svg';
import logo_dark from '@/assets/common/header/logo_dark.svg';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconMenu from '~icons/app/icon-menu.svg';

interface NavItem {
  NAME: string;
  PATH: string;
  ID: string;
  CHILDREN: NavItem;
  LABEL?: string;
}

const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));

const router = useRouter();
const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();

// 导航数据
const navRouterNew = computed(() => i18n.value.common.NAV_ROUTER_CONFIG_NEW);
const navRouterNewInfo = computed(() => i18n.value.common.NAV_ROUTER_INFO);

const logo = computed(() =>
  commonStore.theme === 'light' ? logo_light : logo_dark
);

const routerPath = ref(router.route.path);

// 移动菜单事件
const mobileMenuIcon = ref(false);
const mobileChildMenu = ref<NavItem | any>([]);

const mobileMenuPanel = () => {
  mobileChildMenu.value = [];
  toBody.value = true;
  setTimeout(() => {
    mobileMenuIcon.value = !mobileMenuIcon.value;
    document.documentElement.classList.toggle('overflow');
    activeNav.value = '';
  }, 200);
};

const isNewsorBlog = computed(() =>
  /^\/(zh|en)\/(news|blog)\//g.test(router.route.path)
);

const isHome = computed(() =>
  ['/', '/zh/', '/zh', '/en/', '/en'].includes(router.route.path)
);

const langShow = ref(['zh', 'en']);

watch(
  () => router.route.path,
  (val: string) => {
    // TODO:需优化代码复杂度
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

const toBody = ref(false);
onMounted(() => {
  toBody.value = true;
});
onUnmounted(() => {
  toBody.value = false;
});

// 返回首页
const goHome = () => {
  toBody.value = false;
  mobileMenuIcon.value = false;
  document.documentElement.classList.remove('overflow');
  router.go(`/${lang.value}/`);
};

// 兼容非ZH
const activeNav = ref<string>();

// 移动端默认选中、二级菜单

const isShowBox = ref(false);

const searchControl = (val: boolean) => {
  isShowBox.value = val;
};

const navItemClick = () => {
  mobileMenuIcon.value = false;
  document.documentElement.classList.remove('overflow');
};
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <!-- 移动端菜单图标 -->
      <div v-if="isMobile" class="mobile-menu-icon">
        <OIcon class="icon" @click="mobileMenuPanel">
          <IconMenu v-if="!mobileMenuIcon" />
          <IconCancel v-else />
        </OIcon>
      </div>
      <div class="logo">
        <ClientOnly>
          <img alt="openEuler logo" :src="logo" @click="goHome" />
        </ClientOnly>
      </div>
      <ClientOnly>
        <div
          v-show="!isShowBox || !isMobile"
          class="header-content"
          :class="lang"
        >
          <div class="header-nav" :class="{ active: mobileMenuIcon }">
            <HeaderNavNew
              :nav-items="navRouterNew"
              :is-switch="mobileMenuIcon"
              :nav-info="navRouterNewInfo"
              @nav-click="navItemClick"
            />
            <div v-if="isMobile" class="header-tool">
              <AppLanguage :show="langShow" @language-click="navItemClick" />
              <AppTheme />
            </div>
          </div>
        </div>
        <!-- 搜索 -->
        <HeaderSearch @search-click="searchControl" />
        <!-- 切换语言、网站风格 -->
        <div v-if="!isMobile" class="header-tool">
          <AppLanguage :show="langShow" />
          <AppTheme />
        </div>

        <!-- 登录 -->
        <AppLogin />
      </ClientOnly>
    </div>
  </header>
</template>
<style lang="scss" scoped>
:deep(.el-input__suffix) {
  font-size: var(--e-font-size-h7);
}
:deep(.el-input__clear) {
  font-size: var(--e-font-size-h7);
}
:deep(.el-icon-circle-inner) {
  font-size: var(--e-font-size-h1);
}
.app-header {
  background-color: var(--e-color-bg2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  box-shadow: var(--e-shadow-l1);
  &-body {
    display: flex;
    align-items: center;
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 80px;
    @media (max-width: 1439px) {
      padding: 0 24px;
    }
    @media (max-width: 1100px) {
      padding: 0 16px;
      height: 48px;
      justify-content: space-between;
      position: relative;
    }
  }
}
.logo {
  height: 32px;
  cursor: pointer;
  margin-right: var(--e-spacing-h4);
  @media (max-width: 1100px) {
    height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
    margin-right: 0;
  }
}
.mobile-menu-icon {
  display: none;
  margin-right: var(--e-spacing-h5);
  @media (max-width: 1100px) {
    flex: 1;
    display: block;
  }
  .icon {
    font-size: var(--e-font-size-h6);
    color: var(--e-color-text1);
    cursor: pointer;
  }
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  &.ru {
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }

  .header-nav {
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;
    @media screen and (max-width: 1100px) {
      width: 100%;
      position: fixed;
      left: 0;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      border-top: 1px solid var(--e-color-border2);
      top: 48px;
      height: calc(100% - 48px);
      z-index: 999;
      transform: translateX(-130%);

      transition-duration: 0.333s;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.5, 0, 0.84, 0.25);
      display: block;
    }

    &.active {
      opacity: 1;
      z-index: 1101;
      visibility: visible;
      transform: translateX(0);
    }
  }

  .icon {
    font-size: var(--e-font-size-h6);
    color: var(--e-color-text1);
  }
}
.header-tool {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: var(--e-spacing-h5);
  .lang {
    color: var(--e-color-text1);
    letter-spacing: 0.08em;
    font-size: 16px;
  }
  &-search {
    cursor: pointer;
  }
  &-theme {
    cursor: pointer;
  }
  @media screen and (max-width: 1100px) {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 0;
    height: auto;
    width: 164px;
    padding: 16px;
  }
}
.mobile-menu {
  width: 100%;
  position: fixed;
  left: 0;
  // transition: all 0.3s linear;
  overflow: hidden;
  display: flex;
  opacity: 0;
  visibility: hidden;
  border-top: 1px solid var(--e-color-division);
  background: rgba(0, 0, 0, 0.4);
  top: 48px;
  height: calc(100% - 48px);
  z-index: 999;
  @media screen and (min-width: 1100px) {
    display: none;
  }

  &.active {
    opacity: 1;
    z-index: 1101;
    display: flex;
    visibility: visible;
    @media screen and (min-width: 1100px) {
      opacity: 0;
    }

    .mobile-menu-side {
      left: 0;
      opacity: 1;
      z-index: 9;
    }
  }
  &.cookie {
    height: calc(100% - 108px);
    top: 108px;
  }
  &-side {
    left: -100%;
    background: var(--e-color-bg1);
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    color: var(--e-color-text1);
    min-width: 164px;
    opacity: 0;
    position: relative;
    transition: all 0.3s linear;
    overflow-y: auto;
    justify-content: space-between;
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f1f1f1;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #afbfe8;
    }

    .mobile-nav {
      .link {
        display: block;
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-h3);
        color: var(--e-color-text1);
        padding: 0 var(--e-spacing-h5);
        position: relative;
        cursor: pointer;
        &::after {
          width: 0;
          height: 2px;
          background: transparent;
          content: '';
          position: absolute;
          left: 16px;
          display: block;
          transition: all 0.3s;
          bottom: 0;
        }
        &.active {
          background: var(--e-color-bg2);
          color: var(--e-color-brand1);
          &::after {
            width: 24px;
            background: var(--e-color-brand1);
          }
        }
      }
    }
    .mobile-tools {
      padding: 0 var(--e-spacing-h5);
      margin-bottom: 24px;
    }
  }
  &-content {
    flex: 1;
    background: var(--e-color-bg2);
    position: relative;

    left: 0;
    opacity: 1;
    z-index: 8;
    .mobile-menu-list {
      display: grid;
      padding: 0 16px;

      .link {
        line-height: var(--e-line-height-h3);
        font-size: var(--e-font-size-tip);
        font-weight: normal;
        color: var(--e-color-text4);
        cursor: pointer;
        &:last-child {
          border-bottom: 1px solid var(--e-color-division1);
        }
      }
    }
    &.active {
      left: 0;
      opacity: 1;
      z-index: 8;
    }
  }
}

// transition 动画
.menu-sub-enter-active,
.menu-sub-leave-active {
  transition: 0.5s linear;
  left: -100%;
}
.menu-sub-leave-active {
  transition: 0.3s linear;
}
.menu-sub-enter,
.menu-sub-leave-to {
  opacity: 0;
}
.menu-sub-enter-to {
  opacity: 1;
  left: 0%;
}
.menu-sub-leave {
  opacity: 1;
  left: -100%;
}
</style>

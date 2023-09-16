<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted, watch, nextTick } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';

import useWindowResize from '@/components/hooks/useWindowResize';
import navFilterConfig from '@/data/common/nav-filter';

import HeaderNav from './HeaderNav.vue';
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
const navRouter = computed(() => i18n.value.common.NAV_ROUTER_CONFIG);
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
    handleDefaultSelectedMobile();
  }, 200);
};

const langShow = ref(['zh', 'en', 'ru']);
watch(
  () => router.route.path,
  (val: string) => {
    // TODO:需优化代码复杂度
    routerPath.value = val;
    langShow.value = ['zh', 'en', 'ru'];

    // 首页
    if (val === `/${lang.value}/`) {
      return;
    }

    // 语言过滤
    for (let i = 0; i < navFilterConfig.length; i++) {
      if (/^\/(zh|en)\/(news|blog)\//g.test(routerPath.value)) {
        // 新闻 博客
        langShow.value = [lang.value];
      } else {
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
          console.log(langShow.value);
          langShow.value = navFilterConfig[i].lang;
          break;
        }
      }
    }
  },
  { immediate: true }
);

const toBody = ref(false);
onMounted(() => {
  toBody.value = true;
  handleDefaultSelectedMobile();
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
const handleMenuLayer = (e: any) => {
  if (e.target.className !== 'mobile-menu-side') {
    if (mobileChildMenu.value.length === 0) {
      mobileMenuIcon.value = false;
      document.documentElement.classList.remove('overflow');
    }
  }
};
// 移动端一级导航事件
const goFirstNavMobile = (item: NavItem) => {
  mobileChildMenu.value = [];
  if (Object.prototype.hasOwnProperty.call(item, 'CHILDREN')) {
    mobileChildMenu.value = item.CHILDREN;
  } else {
    mobileMenuIcon.value = false;
    router.go('/' + lang.value + item.PATH);
    document.documentElement.classList.remove('overflow');
  }
  activeNav.value = item.ID;
};

// 移动端二级导航事件
const goSubNavMobile = (item: NavItem) => {
  if (item.PATH.startsWith('https')) {
    window.open(item.PATH);
    return;
  } else if (item.PATH) {
    setTimeout(() => {
      mobileMenuIcon.value = false;
      document.documentElement.classList.remove('overflow');
    }, 200);
    nextTick(() => {
      router.go('/' + lang.value + item.PATH);
    });
  }
};
// 移动端默认选中、二级菜单
const handleDefaultSelectedMobile = () => {
  navRouter.value.forEach((item: any) => {
    item.CLASS.forEach((el: any) => {
      if (routerPath.value.includes(el)) {
        mobileChildMenu.value = item.CHILDREN;
        activeNav.value = item.ID;
      }
    });
  });
};

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
      <img class="logo" alt="openEuler logo" :src="logo" @click="goHome" />
      <ClientOnly>
        <div v-show="!isShowBox" class="header-content" :class="lang">
          <div class="header-nav" :class="{ active: mobileMenuIcon }">
            <template v-if="lang === 'ru'">
              <HeaderNav :nav-items="navRouter" />
            </template>
            <template v-else>
              <HeaderNavNew
                :nav-items="navRouterNew"
                :is-switch="mobileMenuIcon"
                :nav-info="navRouterNewInfo"
                @nav-click="navItemClick"
              />
            </template>
            <div v-if="isMobile" class="header-tool">
              <AppLanguage :show="langShow" @language-click="navItemClick" />
              <AppTheme />
            </div>
          </div>
        </div>
        <div
          v-if="toBody && lang === 'ru' && isMobile"
          class="mobile-menu"
          :class="{ active: mobileMenuIcon }"
          @click="handleMenuLayer($event)"
        >
          <div class="mobile-menu-side">
            <div class="mobile-nav">
              <div
                v-for="item in navRouter"
                :key="item.ID"
                class="link"
                :class="{
                  active: activeNav === item.ID,
                }"
                @click.stop="goFirstNavMobile(item)"
              >
                {{ item.NAME }}
              </div>
            </div>
            <div class="mobile-tools">
              <AppLanguage :show="langShow" @language-click="navItemClick" />
              <AppTheme />
            </div>
          </div>
          <transition name="menu-sub">
            <div v-if="mobileChildMenu.length > 0" class="mobile-menu-content">
              <div class="mobile-menu-list">
                <div
                  v-for="item in mobileChildMenu"
                  :key="item.ID"
                  class="link"
                  @click="goSubNavMobile(item)"
                >
                  {{ item.NAME }}
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- 搜索 -->
        <HeaderSearch @search-click="searchControl" />
        <!-- 切换语言、网站风格 -->
        <div v-if="!isMobile" v-show="!isShowBox" class="header-tool">
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
:deep(.el-input__wrapper) {
  background-color: var(--o-color-bg-secondary) !important;
  box-shadow: none !important;
}
:deep(.el-input__suffix) {
  font-size: var(--o-font-size-h7);
}
:deep(.el-input__clear) {
  font-size: var(--o-font-size-h7);
}
:deep(.el-icon-circle-inner) {
  font-size: var(--o-font-size-h1);
}
.app-header {
  background-color: var(--o-color-bg2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  box-shadow: var(--o-shadow-l1);
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
  margin-right: var(--o-spacing-h4);
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
  margin-right: var(--o-spacing-h5);
  @media (max-width: 1100px) {
    flex: 1;
    display: block;
  }
  .icon {
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
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
      border-top: 1px solid var(--o-color-border2);
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
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
  }
}
.header-tool {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: var(--o-spacing-h5);
  .lang {
    color: var(--o-color-text1);
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
  border-top: 1px solid var(--o-color-division);
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
    background: var(--o-color-bg1);
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    color: var(--o-color-text1);
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
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-h3);
        color: var(--o-color-text1);
        padding: 0 var(--o-spacing-h5);
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
          background: var(--o-color-bg2);
          color: var(--o-color-brand1);
          &::after {
            width: 24px;
            background: var(--o-color-brand1);
          }
        }
      }
    }
    .mobile-tools {
      padding: 0 var(--o-spacing-h5);
      margin-bottom: 24px;
    }
  }
  &-content {
    flex: 1;
    background: var(--o-color-bg2);
    position: relative;

    left: 0;
    opacity: 1;
    z-index: 8;
    .mobile-menu-list {
      display: grid;
      padding: 0 16px;

      .link {
        line-height: var(--o-line-height-h3);
        font-size: var(--o-font-size-tip);
        font-weight: normal;
        color: var(--o-color-text4);
        cursor: pointer;
        &:last-child {
          border-bottom: 1px solid var(--o-color-division1);
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

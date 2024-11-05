<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useData  } from 'vitepress';
import { useI18n } from '~@/i18n';
import { useCommon } from '@/stores/common';
import { debounce } from 'lodash-es';

import NavContent from './NavContent.vue';
import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';
import AppCode from './AppCode.vue';
import AppLogin from './AppLogin.vue';
import HeaderSearch from './HeaderSearch.vue';
import NavLink from './NavLink.vue';

import logo_light from '~@/assets/category/header/logo.svg';
import logo_dark from '~@/assets/category/header/logo_dark.svg';

const router = useRouter();
const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();

const props = defineProps({
  langOptions: {
    type: Array,
    default() {
      return [];
    },
  },
});

// 导航数据
const navData = computed(() => i18n.value.header.NAV_ROUTER);
// 判断主题
const isLight = computed(() => commonStore.theme === 'light');
// Logo主题判断
const logoUrl = computed(() =>
  commonStore.theme === 'light' ? logo_light : logo_dark
);

// nav 鼠标滑过事件
const isShow = ref(false);
const navActive = ref();
const subNavActive = ref();
const subNavContent = ref({});
const toggleDebounced = debounce(
  function (item: any | null) {
    if (item === null) {
      navActive.value = '';
      isShow.value = false;
    } else {
      navActive.value = item.ID;
      isShow.value = true;
      subNavActive.value = item.CHILDREN[0]?.NAME;
      subNavContent.value = item.CHILDREN[0];
    }
  },
  150,
  {
    trailing: true,
  }
);

// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};

const toggleSubDebounced = debounce(
  function (item: any | null) {
    if (item === null) return;
    subNavActive.value = item.NAME;
    subNavContent.value = item;
  },
  150,
  {
    trailing: true,
  }
);

const linkClick = () => {
  navActive.value = '';
  isShow.value = false;
};
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <img class="logo" alt="openEuler logo" :src="logoUrl" @click="goHome" />
      <ClientOnly>
        <div
          class="header-content"
          :class="lang"
        >
          <div class="header-nav">
            <nav class="o-nav">
              <ul class="o-nav-list">
                <li
                  v-for="(item, index) in navData"
                  :key="item.ID"
                  :class="{
                    active: navActive === item.ID,
                  }"
                  @mouseenter="toggleDebounced(item)"
                  @mouseleave="toggleDebounced(null)"
                >
                  <span class="nav-item">{{ item.NAME }}</span>
                  <div v-if="isShow" :class="['nav-dropdown', item.ID]">
                    <div class="nav-drop-content">
                      <div class="nav-sub-background" :class="{ dark: commonStore.theme === 'dark' }"></div>
                      <div class="nav-sub">
                        <div
                          v-for="subItem in item.CHILDREN"
                          :key="subItem.NAME"
                          class="nav-sub-item"
                          :class="{
                            active: subNavActive === subItem.NAME,
                          }"
                          @mouseenter="toggleSubDebounced(subItem)"
                          @mouseleave="toggleSubDebounced(null)"
                        >
                        <span>{{ subItem.NAME }}</span>
                        </div>
                      </div>
                      <div class="nav-sub-content">
                        <div class="content-left">
                          <span class="content-title">{{ subNavContent.NAME }}</span>
                          <OIcon v-if="subNavContent.ICON">
                            <component :is="subNavContent.ICON" class="icon" />
                          </OIcon>
                          <div v-if="subNavContent.HASGROUP">
                            <div class="group" v-for="group in subNavContent.CHILDREN" :key="group.NAME">
                              <p class="group-name">{{ group.NAME }}</p>
                              <NavContent :nav-content="group?.CHILDREN" @link-click="linkClick" />
                            </div>
                          </div>
                          <NavContent v-else :nav-content="subNavContent?.CHILDREN" @link-click="linkClick" />

                        </div>
                        <div class="split-line" v-if="subNavContent.SHORTCUT?.length"></div>
                        <div class="content-right">
                          <div v-if="subNavContent.SHORTCUT?.length">
                            <span class="content-title">{{ $t('header.QUICKLINK') }}</span>
                            <div v-if="!subNavContent.WITH_PICTURE">
                              <div v-for="shortcut in subNavContent?.SHORTCUT" :key="shortcut.NAME"  class="shortcut">
                                <img v-if="isLight" :src="shortcut.TYPE" class="icon">
                                <img v-else :src="shortcut.TYPE_DARK" class="icon">
                                <NavLink :url="shortcut.URL" @link-click="linkClick" class="shortcut-link">{{ shortcut.NAME }}</NavLink>
                              </div>
                            </div>
                            <div v-else>
                              <NavLink v-for="shortcut in subNavContent?.SHORTCUT" :url="shortcut.URL" :key="shortcut.NAME" class="review" @link-click="linkClick">
                                <img :src="shortcut.PICTURE" class="review-picture">
                                <div class="review-content">
                                  <p class="review-title">{{ shortcut.NAME }}</p>
                                  <p class="review-desc" :title="shortcut.DESCRIPTION">{{ shortcut.DESCRIPTION }}</p>
                                  <div class="review-property">
                                    <span>{{ $t('header.DATE') }}：{{ shortcut.DATE }}</span>
                                    <span v-if="shortcut.POSITION"> | {{ $t('header.VENUE') }}：{{ shortcut.POSITION }}</span>
                                  </div>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="header-tool">
          <HeaderSearch />
          <AppCode />
          <AppLanguage :show="langOptions" />
          <AppTheme />
          <AppLogin />
        </div>
      </ClientOnly>
    </div>
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
  .app-header-body {
    display: flex;
    align-items: center;
    max-width: 1416px;
    margin: 0 auto;
    height: 80px;
    @media (max-width: 1439px) {
      padding: 0 var(--o-gap-5);
    }
  }
}

.logo {
  height: 32px;
  width: 136px;
  cursor: pointer;
  margin-right: var(--o-gap-8);
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;

  .header-nav {
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
}

.header-tool {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 20px;
}

.o-nav {
  height: 100%;
  position: relative;

  .o-nav-list {
    height: 100%;
    padding: 0;
    margin: 0;
    > li {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 100%;
      color: var(--o-color-info1);
      @include text1;

      &:hover {
        z-index: 99;
        .nav-dropdown {
          transform: scaleY(1);
          transition-timing-function: cubic-bezier(0.16, 0.75, 0.5, 1);
        }
      }

      &.active {
        color: var(--o-color-primary1);
        z-index: 99;
        &::after {
          content: '';
          position: absolute;
          left: var(--o-gap-4);
          bottom: 0;
          width: calc(100% - var(--o-gap-4) * 2);
          height: 2px;
          border-radius: 1px;
          transition: all 0.1s linear;
          background: var(--o-color-primary1);
        }
      }
      .nav-item {
        display: block;
        padding: var(--o-gap-4);
      }
    }
  }
}

.nav-dropdown {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--o-color-fill2);
  box-shadow: var(--o-shadow-1);
  z-index: 90;
  color: var(--o-color-info1);
  display: flex;

  min-height: 320px;
  justify-content: center;
  transform-origin: top;
  transition: all 0.5s cubic-bezier(0.5, 0, 0.84, 0.25);
  transform: scaleY(0);


  .nav-drop-content {
    width: 1416px;
    display: flex;

    @include respond-to('laptop') {
      margin: 0 var(--o-gap-5);
    }
  }

  .nav-sub-background {
      position: absolute;
      left: 0px;
      top: 0px;
      width: calc((100% - 1416px) / 2 + 188px);
      height: 100%;
      background-image: url('../../assets/category/header/nav_background.png');
      background-size: cover;
      z-index: -1;

      @include respond-to('laptop') {
        width: 212px;
      }

      &.dark {
        background-image: url('../../assets/category/header/nav_background_dark.png');
      }
    }

  .nav-sub {
    width: 172px;
    padding: 32px 16px 0 0;
    padding-top: var(--o-gap-6);
    position: relative;

    .nav-sub-item {
      width: 172px;
      height: 40px;
      border-radius: var(--o-radius-xs);
      display: flex;
      align-items: center;

      > span {
        padding-left: var(--o-gap-2);
      }
    }
    .active {
      background: var(--o-color-control2-light);
      color: var(--o-color-primary1);
      @include text1;
    }
  }

  .nav-sub-content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    position: relative;

    .content-left {
      flex: 1;
      padding: 32px 24px 24px 36px;

      .group {
        & + .group {
          padding-top: var(--o-gap-5);
        }

        .group-name {
          padding-bottom: 12px;
          @include tip1;
        }
      }
      .icon {
        height: 20px;
        width: 20px;
        padding: 8px 0 0 6px;
      }
    }
    .content-right {
      width: 298px;
      padding: 32px 0 24px 23px;

      .shortcut {
        width: 282px;
        min-height: 42px;
        background: var(--o-color-fill1);
        border-radius: var(--o-radius_control-xs);
        padding: 10px 10px 10px 13px;
        display: flex;
        align-items: center;
        gap: var(--o-gap-3);
        cursor: pointer;
        @include tip1;

        & + .shortcut {
          margin-top: var(--o-gap-2);
        }

        .shortcut-link {
          color: var(--o-color-link1);
          &:hover {
            color: var(--o-color-primary2);
          }
        }

        .icon {
          height: 26px;
          width: 26px;
        }
      }

      .review {
        width: 410px;
        height: 90px;
        display: flex;
        align-items: unset;

        @media screen and (max-width: 1780px) {
          width: 270px;
        }

        & + .review {
          margin-top: var(--o-gap-2);
        }
        
        .review-picture {
          max-width: 38%;
          height: auto;
          display: block;
          object-fit: cover;

          @media screen and (max-width: 1780px) {
            max-width: 30%;
          }
        }
        .review-content {
          margin-left: var(--o-gap-4);
          flex: 1;
          max-width: 60%;

          @media screen and (max-width: 1780px) {
            max-width: 68%;
          }

          .review-title {
            @include text1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: var(--o-color-info1);
            font-weight: 500;
            cursor: pointer;

            &:hover {
              color:var(--o-color-primary1);
            }
          }

          .review-desc {
            @include tip2;
            overflow: hidden;
            color: var(--o-color-info2);
            margin-top: var(--o-gap-1);
            margin-bottom: var(--o-gap-2);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .review-property {
            @include tip2;
            color: var(--o-color-info2);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .split-line {
      position: absolute;
      background: var(--o-color-control4);
      width: 1px;
      height: 100%;
      min-height: 320px;
      right: 298px;
    }

    .content-title {
      @include text1;
      display: inline-block;
      margin-bottom: var(--o-gap-4);
      color: var(--o-color-info3);
    }
  }
}
</style>
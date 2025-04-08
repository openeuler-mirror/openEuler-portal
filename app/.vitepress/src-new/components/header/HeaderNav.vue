<script setup lang="ts">
import { ref, computed } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '~@/i18n';
import { useCommon } from '@/stores/common';
import { useDebounceFn } from '@vueuse/core';

import NavContent from './NavContent.vue';
import HeaderTheme from './HeaderTheme.vue';
import HeaderLanguage from './HeaderLanguage.vue';
import HeaderCode from './HeaderCode.vue';
import HeaderLogin from './HeaderLogin.vue';
import HeaderSearch from './HeaderSearch.vue';
import NavLink from './NavLink.vue';
import { oaReport } from '@/shared/analytics';
import { useLocale } from '~@/composables/useLocale';

const { lang } = useData();
const { t } = useLocale();
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
const navData = computed(() => {
  try {
    return i18n.value.header.NAV_ROUTER;
  } catch {
    return i18n.value.header.NAV_ROUTER;
  }
});

class NavAccessAnalyzer {
  hoverTime: number = Date.now();
  stepCount: number = 0;

  end(navPath: string[]) {
    oaReport(
      'click',
      {
        module: 'navigation',
        steps: this.stepCount + 1,
        time_used: Date.now() - this.hoverTime,
        ...navPath.reduce((levels, navName, index) => {
          levels[`level${index + 1}`] = navName;
          return levels;
        }, {} as Record<string, string>),
      },
      'portal'
    );
  }

  stepIncr() {
    this.stepCount++;
  }
}

let navAnalyzer: NavAccessAnalyzer | null = null;

// nav 鼠标滑过事件
const isShow = ref(false);
const navActive = ref();
const subNavContent = ref<any>([]);
const navShortcut = ref<any>([]);
const isPicture = ref(false);
const toggleDebounced = useDebounceFn(function (item: any | null) {
  if (item === null) {
    navAnalyzer = null;
    navActive.value = '';
    isShow.value = false;
    isPicture.value = false;
  } else {
    (navAnalyzer ??= new NavAccessAnalyzer()).stepIncr();
    oaReport('hover', {
      module: 'navigation',
      level1: item.NAME,
    });
    navActive.value = item.ID;
    isShow.value = true;
    subNavContent.value = item.CHILDREN;
    navShortcut.value = item.SHORTCUT;
    isPicture.value = item.WITH_PICTURE;
  }
}, 100);

const linkClick = () => {
  navActive.value = '';
  isShow.value = false;
};

const reportNavClick = (path: string[]) => {
  navAnalyzer?.end(path);
  navAnalyzer = null;
};
</script>

<template>
  <div class="header-content">
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
            <span :id="'tour_headerNav_' + item.ID" class="nav-item">{{
              item.NAME
            }}</span>
            <transition name="transition">
              <div
                v-if="isShow"
                :class="[
                  'nav-dropdown',
                  navActive,
                  commonStore.theme,
                  `${navActive}-${lang}`,
                ]"
              >
                <div class="nav-drop-content">
                  <div class="nav-background-left"></div>
                  <div class="nav-background-right"></div>
                  <div class="nav-sub-content">
                    <div class="content-left">
                      <div
                        class="item-sub"
                        v-for="(sub, s) in subNavContent"
                        :key="s"
                      >
                        <span class="content-title">{{ sub.NAME }}</span>
                        <NavContent
                          :nav-content="sub?.CHILDREN"
                          @link-click="linkClick"
                          @report-nav-click-path="reportNavClick"
                        />
                      </div>
                    </div>
                    <div class="split-line" v-if="navShortcut?.length"></div>
                    <div class="content-right">
                      <div v-if="navShortcut?.length">
                        <span class="content-title">{{
                          $t('header.QUICKLINK')
                        }}</span>
                        <div v-if="!isPicture">
                          <div
                            v-for="shortcut in navShortcut"
                            :key="shortcut.NAME"
                            class="shortcut"
                          >
                            <NavLink
                              :url="shortcut.URL"
                              @link-click="linkClick"
                              class="shortcut-link"
                              @click="reportNavClick(shortcut.NAV_PATH)"
                            >
                              <span>{{ shortcut.NAME }}</span>
                              <OIcon v-if="shortcut.ICON">
                                <component :is="shortcut.ICON" class="icon" />
                              </OIcon>
                            </NavLink>
                          </div>
                        </div>
                        <div v-else>
                          <NavLink
                            v-for="shortcut in navShortcut"
                            :url="shortcut.URL"
                            :key="shortcut.NAME"
                            class="review"
                            @link-click="linkClick"
                            @click="reportNavClick(shortcut.NAV_PATH)"
                          >
                            <img
                              :src="shortcut.PICTURE"
                              class="review-picture"
                            />
                            <div class="review-content">
                              <p class="review-title">
                                {{ shortcut.NAME }}
                              </p>
                              <div class="review-property">
                                <span>{{ shortcut.REMARK }}</span>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="header-tool">
    <HeaderSearch />
    <div id="tour_headerNav_tool" class="header-right">
      <HeaderCode />
      <HeaderLanguage :show="langOptions" />
      <HeaderTheme />
      <HeaderLogin />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  height: calc(100% - 10px);
  margin: 5px 0;
  margin-left: 20px;

  @include respond-to('pad_v-laptop') {
    gap: var(--o-gap-4);
  }
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
      cursor: pointer;
      @include text1;
      transition: all var(--o-duration-s) var(--o-easing-standard);

      @include hover {
        z-index: 99;
      }

      &::after {
        content: '';
        position: absolute;
        left: var(--o-gap-4);
        opacity: 0;
        bottom: 0;
        width: calc(100% - var(--o-gap-4) * 2);
        height: 2px;
        border-radius: 1px;
        background: var(--o-color-primary1);
        transition: all var(--o-duration-s) var(--o-easing-standard);
      }

      &.active {
        color: var(--o-color-primary1);
        z-index: 99;
        font-weight: 500;
        &::after {
          content: '';
          opacity: 1;
        }
      }
      .nav-item {
        display: block;
        padding: 22px var(--o-gap-4);

        @include respond-to('laptop') {
          padding: 22px 14px;
        }
        @include respond-to('pad_h') {
          padding: 22px 10px;
        }
        &.en {
          @media (min-width: 841px) and (max-width: 1000px) {
            padding: var(--o-gap-2);
          }
        }
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
  z-index: 90;
  color: var(--o-color-info1);
  display: flex;
  font-weight: normal;
  cursor: default;
  overflow: hidden;

  min-height: 320px;
  justify-content: center;
  transform-origin: top;

  &.light {
    box-shadow: 0 3px 6px rgba(#001255, 0.08);
  }

  @include respond-to('laptop') {
    min-height: 300px;
  }
  @include respond-to('pad_h') {
    min-height: 260px;
  }

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
  }

  .nav-drop-content {
    max-width: 1416px;
    width: calc(100vw - 2 * var(--layout-content-padding));
    display: flex;
  }

  .nav-background-left {
    position: absolute;
    left: 0;
    top: -87px;
    width: 173px;
    height: 249px;
    background-image: url('~@/assets/category/header/nav_background_left.png');
    background-size: cover;
    z-index: -1;

    @include respond-to('<=laptop') {
      display: none;
    }
  }

  .nav-background-right {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 173px;
    height: 172px;
    background-image: url('~@/assets/category/header/nav_background_right.png');
    background-size: cover;
    z-index: -1;

    @include respond-to('<=laptop') {
      display: none;
    }
  }

  .nav-sub-content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    position: relative;
    width: 100%;

    .content-left {
      flex: 1;
      padding: 32px 24px 40px 0;
      display: flex;

      width: 100%;
      overflow: hidden;
      overflow-x: auto;

      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background-color: var(--e-color-bg2);
      }

      &::-webkit-scrollbar {
        height: 6px;
        background-color: var(--e-color-bg2);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: var(--e-color-division1);
      }

      @include respond-to('laptop') {
        padding: var(--o-gap-5) var(--o-gap-4) var(--o-gap-5) 0;
      }

      @include respond-to('<=pad') {
        padding: var(--o-gap-5) 0;
      }

      .icon {
        height: 16px;
        width: 16px;
        padding-left: 6px;
      }
    }
    .content-right {
      width: 358px;
      padding-top: var(--o-gap-6);
      padding-bottom: var(--o-gap-6);
      padding-left: var(--o-gap-4);

      @include respond-to('laptop') {
        width: 261px;
        padding: var(--o-gap-5) 0 var(--o-gap-5) var(--o-gap-4);
      }

      @include respond-to('pad_h') {
        width: 261px;
      }

      @include respond-to('<=pad_v') {
        display: none;
      }

      .shortcut {
        width: 342px;
        min-height: 42px;
        background: var(--o-color-fill3);
        border-radius: var(--o-radius_control-xs);
        padding: 10px 24px;
        display: flex;
        align-items: center;
        gap: var(--o-gap-3);
        cursor: pointer;
        @include tip1;

        @include respond-to('laptop') {
          width: 245px;
          @include text1;
        }

        @include respond-to('pad_h') {
          width: 245px;
          @include text1;
        }

        & + .shortcut {
          margin-top: var(--o-gap-2);
        }

        .shortcut-link {
          display: flex;
          align-items: center;
          color: var(--o-color-link1);
          word-break: normal;
          @include hover {
            color: var(--o-color-primary2);
          }

          span {
            @include text-truncate(1);
          }

          .icon {
            height: 16px;
            width: 16px;
            margin-left: var(--o-gap-2);
          }
        }
      }

      .review {
        width: 342px;
        display: flex;
        align-items: unset;
        position: relative;

        @include respond-to('pad_h') {
          width: 200px;
          &:not(:last-child) {
            &:after {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              bottom: -8px;
              height: 1px;
              background: var(--o-color-control4);
            }
          }
        }

        & + .review {
          margin-top: var(--o-gap-3);
        }

        .review-picture {
          width: 120px;
          height: auto;
          display: block;
          object-fit: contain;

          @include respond-to('<=laptop') {
            display: none;
          }
        }
        .review-content {
          margin-left: var(--o-gap-2);
          flex: 1;
          max-width: 212px;
          height: 68px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          @include respond-to('<=laptop') {
            margin-left: unset;
            height: auto;
          }

          .review-title {
            @include text1;
            @include text-truncate(2);
            word-break: normal;
            max-height: 48px;
            color: var(--o-color-info1);
            font-weight: 500;
            cursor: pointer;

            @include hover {
              color: var(--o-color-primary1);
            }
            @include respond-to('pad_v-laptop') {
              max-height: 44px;
            }
          }

          .review-property {
            @include tip2;
            color: var(--o-color-info3);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .split-line {
      background: var(--o-color-control4);
      width: 1px;
      height: 100%;
      min-height: 320px;

      @include respond-to('laptop') {
        min-height: 300px;
      }
      @include respond-to('<=pad_v') {
        display: none;
      }
    }

    .content-title {
      @include tip1;
      display: inline-block;
      margin-bottom: var(--o-gap-3);
      color: var(--o-color-info3);

      @include respond-to('laptop') {
        @include text1;
      }
    }
  }

  &.download {
    .item-sub {
      margin-left: 80px;
      &:nth-of-type(1) {
        margin-left: 0;
        .content-container {
          width: 464px;
          :deep(.content-item) {
            margin-left: 64px;
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
            &:nth-of-type(2) {
              margin-top: 0;
            }
          }
        }
      }

      @include respond-to('<=laptop') {
        margin-left: 24px;
        &:nth-of-type(1) {
          .content-container {
            width: 364px;
            :deep(.content-item) {
              margin-left: 24px;
            }
          }
        }
        &:nth-of-type(3) {
          .content-container {
            width: 170px;
          }
        }
      }

      @include respond-to('pad_h') {
        &:nth-of-type(1) {
          .content-container {
            width: 344px;
            :deep(.content-item) {
              margin-left: 60px;
            }
          }
        }
      }
    }
  }

  &.development {
    .item-sub {
      margin-left: 24px;
      &:nth-of-type(1) {
        margin-left: 0;
      }

      @include respond-to('pad_h') {
        width: 132px;

        &:last-of-type {
          width: 288px;
          .content-container {
            :deep(.content-item) {
              margin-right: 24px;
              &:nth-child(2n) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }

  &.document {
    .item-sub {
      &:nth-of-type(1) {
        .content-container {
          :deep(.content-item) {
            margin-right: 64px;
            &:nth-child(-n + 4) {
              margin-top: 0;
            }
            &:nth-of-type(4) {
              margin-right: 0;
            }

            @include respond-to('<=laptop') {
              margin-right: 24px;
            }
          }
          @media (min-width: 1441px) and (max-width: 1505px) {
            :deep(.content-item) {
              margin-right: 40px;
            }
          }
          @include respond-to('laptop') {
            width: 752px;
          }
          @include respond-to('pad_h') {
            width: 610px;
          }
        }
      }
    }
  }

  &.learn {
    .item-sub {
      margin-left: 48px;
      &:nth-of-type(1) {
        margin-left: 0;
      }
      &:nth-of-type(2) {
        .content-container {
          width: 448px;
          :deep(.content-item) {
            margin-left: 48px;
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
            &:nth-of-type(2) {
              margin-top: 0;
            }
          }
        }
      }

      @include respond-to('<=laptop') {
        margin-left: 24px;
        &:nth-of-type(2) {
          .content-container {
            width: 364px;
            :deep(.content-item) {
              margin-left: 24px;
            }
          }
        }
      }

      @include respond-to('pad_h') {
        &:nth-of-type(2) {
          .content-container {
            width: 306px;
          }
        }
      }
    }
  }

  &.approve {
    .item-sub {
      margin-left: 80px;
      &:nth-of-type(1) {
        margin-left: 0;
        .content-container {
          width: 440px;
          :deep(.content-item) {
            margin-left: 40px;
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
            &:nth-of-type(2) {
              margin-top: 0;
            }
          }
        }
      }

      @include respond-to('<=laptop') {
        margin-left: 24px;
        &:nth-of-type(1) {
          .content-container {
            width: 364px;
            :deep(.content-item) {
              margin-left: 24px;
            }
          }
        }
        &:nth-of-type(2),
        &:nth-of-type(3) {
          .content-container {
            width: 170px;
          }
        }
      }

      @include respond-to('pad_h') {
        &:nth-of-type(1) {
          .content-container {
            width: 288px;
          }
        }
        &:nth-of-type(2),
        &:nth-of-type(3) {
          .content-container {
            width: 132px;
          }
        }
      }
    }
  }
  &.approve-en {
    .item-sub {
      &:nth-of-type(1) {
        .content-container {
          width: 200px;
        }
      }

      @include respond-to('<=laptop') {
        &:nth-of-type(1) {
          .content-container {
            width: 170px;
          }
        }
      }

      @include respond-to('pad_h') {
        &:nth-of-type(1) {
          .content-container {
            width: 132px;
          }
        }
      }
    }
  }

  &.community {
    .item-sub {
      margin-left: 48px;
      &:nth-of-type(1) {
        margin-left: 0;
        .content-container {
          width: 696px;
          :deep(.content-item) {
            margin-left: 48px;
            &:nth-child(3n + 1) {
              margin-left: 0;
            }
            &:nth-child(-n + 3) {
              margin-top: 0;
            }
          }
        }
      }

      @include respond-to('<=laptop') {
        margin-left: 24px;
        &:nth-of-type(1) {
          .content-container {
            :deep(.content-item) {
              margin-left: 24px;
            }
          }
        }
      }

      @include respond-to('laptop') {
        &:nth-of-type(1) {
          .content-container {
            width: 558px;
          }
        }
        &:nth-of-type(2) {
          .content-container {
            width: 170px;
          }
        }
      }

      @include respond-to('pad_h') {
        &:nth-of-type(1) {
          .content-container {
            width: 444px;
          }
        }
        &:nth-of-type(2) {
          .content-container {
            width: 132px;
          }
        }
      }
    }
  }

  &.update {
    .item-sub {
      margin-left: 48px;
      .content-container {
        width: 448px;
        :deep(.content-item) {
          margin-left: 48px;
          &:nth-child(2n + 1) {
            margin-left: 0;
          }
          &:nth-child(-n + 2) {
            margin-top: 0;
          }
        }
      }
      &:nth-of-type(1) {
        margin-left: 0;
      }

      @include respond-to('<=laptop') {
        margin-left: 24px;
        .content-container {
          :deep(.content-item) {
            margin-left: 24px;
          }
        }
      }
      @include respond-to('laptop') {
        .content-container {
          width: 364px;
        }
      }

      @include respond-to('pad_h') {
        .content-container {
          width: 288px;
        }
      }
    }
  }
}

html[lang='en'] {
  .nav-item {
    @media (min-width: 841px) and (max-width: 1000px) {
      padding: var(--o-gap-2) !important;
    }
  }
}

.transition-enter-active,
.transition-leave-active {
  transition: opacity var(--o-duration-m3);
}

.transition-enter-from,
.transition-leave-to {
  opacity: 0;
}
</style>

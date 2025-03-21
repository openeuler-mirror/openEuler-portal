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
    let isExtras = false;
    let isShortCuts = false;
    const path: string[] = [];
    return i18n.value.header.NAV_ROUTER.map(function setPath(navItem: any) {
      path.push(navItem.NAME);
      const obj = {
        ...navItem,
        NAV_PATH: !isExtras
          ? isShortCuts
            ? [...path.slice(0, 2), t('header.QUICKLINK'), ...path.slice(2)]
            : [...path.slice(0, 2), ...path.slice(1)]
          : [...path],
      };
      if (Array.isArray(navItem.CHILDREN)) {
        obj.CHILDREN = navItem.CHILDREN.map(setPath);
      }
      if (Array.isArray(navItem.SHORTCUT)) {
        isShortCuts = true;
        obj.SHORTCUT = navItem.SHORTCUT.map(setPath);
        isShortCuts = false;
      }
      if (Array.isArray(navItem.EXTRAS)) {
        isExtras = true;
        obj.EXTRAS = navItem.EXTRAS.map(setPath);
        isExtras = false;
      }
      path.pop();
      return obj;
    });
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
const subNavActive = ref();
const subNavContent = ref<Record<string, any>>({});
const subNav = ref<Record<string, any>>({});
const toggleDebounced = useDebounceFn(function (item: any | null) {
  if (item === null) {
    navAnalyzer = null;
    navActive.value = '';
    isShow.value = false;
  } else {
    (navAnalyzer ??= new NavAccessAnalyzer()).stepIncr();
    oaReport('hover', {
      module: 'navigation',
      level1: item.NAME,
    });
    navActive.value = item.ID;
    isShow.value = true;
    subNavActive.value = item.CHILDREN[0]?.NAME;
    subNav.value = item.CHILDREN;
    subNavContent.value = item.CHILDREN[0];
  }
}, 100);

const changeSubnav = useDebounceFn(function (item: any) {
  if (subNavActive.value !== item.NAME) {
    navAnalyzer?.stepIncr();
    oaReport('click', {
      module: 'navigation',
      level1: item.NAV_PATH[0],
      level2: item.NAME,
    });
    subNavActive.value = item.NAME;
    subNavContent.value = item;
  }
}, 150);

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
                :class="['nav-dropdown', navActive, commonStore.theme]"
              >
                <div class="nav-drop-content">
                  <div class="nav-sub-background">
                    <div class="nav-background-left"></div>
                    <div class="nav-background-right"></div>
                  </div>
                  <div class="nav-sub">
                    <div
                      v-for="subItem in subNav"
                      :key="subItem.NAME"
                      :class="{
                        active: subNavActive === subItem.NAME,
                      }"
                      class="nav-sub-item"
                      @click="changeSubnav(subItem)"
                    >
                      <span>{{ subItem.NAME }}</span>
                    </div>
                  </div>
                  <div class="nav-sub-content">
                    <div class="content-left">
                      <NavLink
                        v-if="subNavContent.URL"
                        class="content-title-url"
                        :url="subNavContent.URL"
                        @link-click="linkClick"
                      >
                        {{ subNavContent.NAME }}
                        <OIcon v-if="subNavContent.ICON">
                          <component :is="subNavContent.ICON" class="icon" />
                        </OIcon>
                      </NavLink>
                      <span v-else class="content-title">{{
                        subNavContent.NAME
                      }}</span>
                      <div v-if="subNavContent.HASGROUP">
                        <div
                          class="group"
                          v-for="group in subNavContent.CHILDREN"
                          :key="group.NAME"
                        >
                          <p class="group-name">{{ group.NAME }}</p>
                          <NavContent
                            :nav-content="group?.CHILDREN"
                            @link-click="linkClick"
                            @report-nav-click-path="reportNavClick"
                          />
                        </div>
                      </div>
                      <NavContent
                        v-else
                        :nav-content="subNavContent?.CHILDREN"
                        @link-click="linkClick"
                        @report-nav-click-path="reportNavClick"
                      />
                      <div v-if="subNavContent.EXTRAS" class="extra">
                        <div
                          v-for="extra in subNavContent.EXTRAS"
                          :key="extra.NAME"
                        >
                          <NavLink
                            class="content-title-url"
                            :url="extra.URL"
                            @link-click="linkClick"
                            @click="reportNavClick(extra.NAV_PATH)"
                          >
                            {{ extra.NAME }}
                            <OIcon>
                              <component :is="extra.ICON" class="icon" />
                            </OIcon>
                          </NavLink>
                          <NavContent
                            :nav-content="extra.CHILDREN"
                            @link-click="linkClick"
                            @report-nav-click-path="reportNavClick"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="split-line"
                      v-if="subNavContent.SHORTCUT?.length"
                    ></div>
                    <div class="content-right">
                      <div v-if="subNavContent.SHORTCUT?.length">
                        <span class="content-title">{{
                          $t('header.QUICKLINK')
                        }}</span>
                        <div v-if="!subNavContent.WITH_PICTURE">
                          <div
                            v-for="shortcut in subNavContent?.SHORTCUT"
                            :key="shortcut.NAME"
                            class="shortcut"
                          >
                            <NavLink
                              :url="shortcut.URL"
                              @link-click="linkClick"
                              class="shortcut-link"
                              @click="reportNavClick(shortcut.NAV_PATH)"
                            >
                              {{ shortcut.NAME }}
                              <OIcon v-if="shortcut.ICON">
                                <component :is="shortcut.ICON" class="icon" />
                              </OIcon>
                            </NavLink>
                          </div>
                        </div>
                        <div v-else>
                          <NavLink
                            v-for="shortcut in subNavContent?.SHORTCUT"
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

  .nav-sub-background {
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc((100% - 1416px) / 2 + 188px);
    height: 100%;

    @include respond-to('laptop') {
      width: 220px;
    }
    @include respond-to('pad_h') {
      width: 182px;
    }

    .nav-background-left {
      position: absolute;
      left: 0;
      top: 0;
      width: 173px;
      height: 169px;
      background-image: url('~@/assets/category/header/nav_background_left.png');
      background-size: cover;
      z-index: -1;

      @include respond-to('laptop') {
        height: 104px;
        width: 102px;
      }
      @include respond-to('pad_h') {
        width: 68px;
        height: 9px;
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

      @include respond-to('pad_v-laptop') {
        width: 124px;
        height: 152px;
      }
    }
  }

  .nav-sub {
    width: 172px;
    margin-right: var(--o-gap-4);
    margin-top: var(--o-gap-6);
    position: relative;

    @include respond-to('pad_h') {
      width: 142px;
      margin-right: var(--o-gap-2);
    }

    .nav-sub-item {
      height: 40px;
      border-radius: var(--o-radius-s);
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all var(--o-duration-s) var(--o-easing-standard);

      > span {
        padding-left: var(--o-gap-2);
      }

      @include hover {
        background: var(--o-color-control2-light);
      }

      & + .nav-sub-item {
        margin-top: 2px;
      }
    }
    .active {
      background: var(--o-color-control3-light) !important;
      color: var(--o-color-primary1);
      font-weight: 500;
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
      padding: 32px 24px 32px 32px;

      @include respond-to('pad_h') {
        padding: var(--o-gap-6) var(--o-gap-4);
      }

      .group {
        & + .group {
          padding-top: var(--o-gap-5);
        }

        .group-name {
          padding-bottom: 12px;
          color: var(--o-color-info3);
          @include tip1;
        }
      }
      .icon {
        height: 16px;
        width: 16px;
        padding-left: 6px;
      }
      .extra {
        margin-top: var(--o-gap-5);
      }
    }
    .content-right {
      width: 358px;
      padding-top: var(--o-gap-6);
      padding-bottom: var(--o-gap-5);
      padding-left: var(--o-gap-4);

      @include respond-to('pad_h') {
        width: 224px;
      }

      .shortcut {
        width: 342px;
        min-height: 42px;
        background: var(--o-color-fill3);
        border-radius: var(--o-radius_control-xs);
        padding: 10px 10px 10px 24px;
        display: flex;
        align-items: center;
        gap: var(--o-gap-3);
        cursor: pointer;
        @include tip1;

        @include respond-to('pad_h') {
          width: 204px;
        }

        & + .shortcut {
          margin-top: var(--o-gap-2);
        }

        .shortcut-link {
          color: var(--o-color-link1);
          @include hover {
            color: var(--o-color-primary2);
          }

          .icon {
            height: 22px;
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

          @include respond-to('pad_h') {
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

          @include respond-to('pad_h') {
            margin-left: unset;
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
            color: var(--o-color-info2);
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
      @include respond-to('pad_h') {
        min-height: 260px;
      }
    }

    .content-title {
      @include text1;
      display: inline-block;
      margin-bottom: var(--o-gap-4);
      color: var(--o-color-info3);
    }

    .content-title-url {
      @include text1;
      margin-bottom: var(--o-gap-4);
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

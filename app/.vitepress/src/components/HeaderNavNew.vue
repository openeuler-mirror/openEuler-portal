<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
import { useRouter, useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';
import { debounce } from 'lodash';
import { useOeep } from '@/stores/oeep';
import { scrollToBottom } from '@/shared/utils';

import IconOutLink from '~icons/app/icon-out-link.svg';
const props = defineProps({
  navItems: {
    type: Object,
    default() {
      return {};
    },
  },
  isSwitch: {
    type: Boolean,
    default() {
      return false;
    },
  },
  navInfo: {
    type: Object,
    default() {
      return {};
    },
  },
});

interface NavItem {
  NAME: string;
  PATH: string;
  ID: string;
  IS_OPEN_WINDOW?: number;
  IS_OPEN_MINISITE_WINDOW?: string;
  CHILDREN?: NavItem;
}

const router = useRouter();
const { lang } = useData();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));

// nav 鼠标滑过事件
const isShow = ref(true);
const navActive = ref('');
const toggleSubDebounced = debounce(
  function (item: any | null) {
    if (isMobile.value) return;
    if (item === null) {
      navActive.value = '';
    } else {
      navActive.value = item.ID;
      isShow.value = true;
    }
  },
  150,
  {
    trailing: true,
  }
);

const handleMobileNavClick = (index: string, item: any) => {
  if (!isMobile.value) return;
  navActive.value = item.ID;
};

const emits = defineEmits(['nav-click']);
const goPath = (item: NavItem, flag: boolean) => {
  if (item.PATH === '') return;
  // 处理下载传参mac不响应问题
  if (!flag || item.PATH.startsWith('/download/')) {
    window.open('/' + lang.value + item.PATH, '_self');
    return;
  }
  // 首页进入联系我们
  if (item.PATH === '/#footer' && router.route.path === `/${lang.value}/`) {
    scrollToBottom();
    emits('nav-click');
    isShow.value = false;
    return;
  }
  if (item.PATH.startsWith('https')) {
    window.open(item.PATH);
    return;
  } else {
    // oEEP页面url不更新特殊处理
    router.go('/' + lang.value + item.PATH);
    if (item.PATH.includes('oEEP')) {
      nextTick(() => {
        useOeep().setMarkDownData();
      });
    }
    navActive.value = '';
  }
  emits('nav-click');
  isShow.value = false;
};

watch(
  () => props.isSwitch,
  (val: boolean) => {
    isShow.value = val;
    navActive.value = 'user';
  }
);
</script>

<template>
  <nav class="o-nav">
    <ul class="o-nav-list">
      <li
        v-for="(item, index) in navItems"
        :key="item.ID"
        :class="{
          active: navActive === item.ID,
        }"
        @mouseenter="toggleSubDebounced(item)"
        @mouseleave="toggleSubDebounced(null)"
      >
        <span class="nav-item" @click="handleMobileNavClick(index, item)">{{
          item.NAME
        }}</span>
        <div v-if="isShow" :class="['nav-dropdown', item.ID]">
          <div class="nav-dropdown-wrapper">
            <div class="nav-dropdown-top">
              <div
                v-for="subitem in item.CHILDREN"
                :key="subitem.NAME"
                class="nav-dropdown-content"
                :class="[subitem.TYPE === 1 && 'type1']"
              >
                <p class="title">{{ subitem.NAME }}</p>
                <div class="nav-dropdown-box">
                  <div
                    v-for="list in subitem.CHILDREN"
                    :key="list.NAME"
                    class="item-box"
                  >
                    <span
                      :class="[{ 'no-link': list.PATH === '' }, 'link']"
                      @click="goPath(list, true)"
                    >
                      {{ list.NAME }}
                      <OIcon v-if="list.OUTLINK" class="icon">
                        <IconOutLink />
                      </OIcon>
                    </span>

                    <p v-if="list.LABEL" class="desc">
                      {{ list.LABEL }}
                    </p>
                    <div v-if="list.CHILDREN" class="version-info">
                      <span
                        v-for="vInfo in list.CHILDREN"
                        :key="vInfo.NAME"
                        class="link"
                        @click="goPath(vInfo, false)"
                        >{{ vInfo.NAME }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.ID !== 'download'" class="nav-dropdown-bottom">
              <div
                v-for="nitem in navInfo"
                :key="nitem.NAME"
                class="nav-bottom-item"
              >
                <p class="title">{{ nitem.NAME }}</p>
                <span
                  v-for="list in nitem.CHILDREN"
                  :key="list.PATH"
                  class="link"
                  @click="goPath(list, true)"
                  >{{ list.NAME }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- 下拉菜单 -->
</template>

<style lang="scss" scoped>
.nav-dropdown {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background-color: var(--o-color-bg2);
  z-index: 90;
  box-shadow: var(--o-shadow-l1);

  max-width: calc(100% + 16px);
  width: calc(100% + 16px);
  padding: 24px calc((100% - 1416px) / 2);
  transform-origin: top;
  transition: all 0.3s cubic-bezier(0.5, 0, 0.84, 0.25);

  transform: scaleY(0);
  @media screen and (max-width: 1100px) {
    border-top: 1px solid var(--o-color-border2);
    top: 0;
    left: 0px;
    padding: 0;
    width: calc(100% - 164px);
    max-width: calc(100% - 164px);
    transform: translateX(164px);
    height: calc(100%);
    z-index: 190;
    box-shadow: none;
    display: none;
  }

  .nav-dropdown-wrapper {
    @media (max-width: 1439px) {
      background: var(--o-color-bg2);
      overflow-y: auto;
      padding: 16px;
      height: 100%;
    }
    .nav-dropdown-top {
      display: flex;
      @media (max-width: 1100px) {
        display: block;
      }
    }
    .nav-dropdown-bottom {
      border-top: 1px solid var(--o-color-border2);
      margin-top: 24px;
      display: flex;
      padding: 16px 0 0;
      @media (max-width: 1439px) {
        margin-top: 16px;
      }
      @media (max-width: 1100px) {
        display: block;
        margin-top: 16px;
      }
      .nav-bottom-item {
        display: flex;
        &:not(:last-child) {
          margin-right: 120px;
        }
        @media (max-width: 1439px) {
          &:not(:last-child) {
            margin-right: 48px;
          }
        }
        @media (max-width: 1100px) {
          display: block;
          margin-right: 0px !important;
        }
        .title {
          font-size: 14px;
          font-weight: 400;
          color: var(--o-color-text4);
          line-height: 24px;
          @media (max-width: 1100px) {
            font-size: 12px;
            margin-bottom: 12px;
          }
        }
        .link {
          font-size: 16px;
          font-weight: 500;
          color: var(--o-color-brand1);
          line-height: 24px;
          display: inline-block;
          cursor: pointer;
          margin-left: 24px;
          &:hover {
            color: var(--o-color-brand2);
          }
          @media (max-width: 1100px) {
            display: block;
            margin-bottom: 12px;
            margin-left: 0;
            line-height: var(--o-line-height-text);
            font-size: var(--o-font-size-text);
          }
        }
      }
    }

    .nav-dropdown-content {
      display: block;
      flex: 1;
      flex: 0 1 auto;
      &:not(:last-child) {
        margin-right: 120px;
      }
      @media (max-width: 1439px) {
        &:not(:last-child) {
          margin-right: 48px;
        }
      }
      @media (max-width: 1100px) {
        &:not(:last-child) {
          margin-right: 0;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--o-color-border2);
          padding-bottom: 12px;
        }
      }
      .nav-dropdown-box {
        display: grid;
        @media (max-width: 1100px) {
          display: block;
        }
        .item-box {
          max-width: 100%;
          &:not(:last-child) {
            margin-bottom: 16px;
            @media (max-width: 1100px) {
              margin-bottom: 12px;
            }
          }
        }
      }
      .version-info {
        margin-top: 8px;
        display: flex;

        @media (max-width: 1100px) {
          flex-wrap: wrap;
        }
        .link {
          margin-right: 12px;
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);

          // & + .link {
          //   margin-left: 12px;
          // }
        }
      }
      .title {
        line-height: var(--o-line-height-text);
        font-size: var(--o-font-size-text);
        font-weight: 400;
        color: var(--o-color-text4);
        margin-bottom: 16px;
        @media (max-width: 1100px) {
          margin-bottom: 16px;
          font-size: 12px;
        }
      }
      .link {
        font-weight: 500;
        color: var(--o-color-brand1);
        line-height: var(--o-line-height-h8);
        font-size: var(--o-font-size-h8);
        cursor: pointer;
        display: flex;

        cursor: pointer;
        @media (max-width: 1100px) {
          line-height: var(--o-line-height-text);
          font-size: var(--o-font-size-text);
        }
        .o-icon {
          display: flex;
          align-items: center;
          height: 24px;
          margin-left: var(--o-spacing-h9);
          color: var(--o-color-text1);
          font-size: 14px;
        }
        &:hover {
          color: var(--o-color-brand2);
        }
        &.no-link {
          color: var(--o-color-text1) !important;
          cursor: default;
        }
      }
      .desc {
        font-size: 12px;
        font-weight: 400;
        color: var(--o-color-text1);
        line-height: 18px;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-top: 4px;
        @media (max-width: 1100px) {
          display: block;
        }
      }
      &.type1 {
        flex-basis: 480px;
        .nav-dropdown-box {
          grid-template-columns: repeat(2, 1fr);
          gap: 0 32px;
        }
      }
    }
  }
}
html[lang='en'] .o-nav .o-nav-list > li {
  .user {
    .nav-dropdown-top {
      .nav-dropdown-content:first-child {
        flex-basis: 190px;
        .nav-dropdown-box {
          grid-template-columns: 1fr;
        }
      }
    }
  }
  .version-info {
    display: block !important;
  }
}

.o-nav {
  height: 100%;
  position: relative;
  @media screen and (max-width: 1100px) {
    width: 164px;
    background: var(--o-color-bg1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .lang-switch {
    padding: 0 16px;
  }
  .o-nav-list {
    height: 100%;
    padding: 0;
    margin: 0;
    @media screen and (max-width: 1100px) {
      height: auto;
    }
    > li {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 100%;

      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
      @media screen and (max-width: 1100px) {
        line-height: var(--o-line-height-h3);
        position: relative;
        display: block;
        height: auto;
        &.active {
          color: var(--o-color-brand1);
          @media (max-width: 1100px) {
            background: var(--o-color-bg2);
          }
          &::after {
            background: var(--o-color-brand1);
          }
        }
      }
      @media screen and (min-width: 1100px) {
        &:hover {
          color: var(--o-color-brand1);
          z-index: 99;
          .nav-dropdown {
            transform: scaleY(1);
            transition-timing-function: cubic-bezier(0.16, 0.75, 0.5, 1);
          }
          &::after {
            background: var(--o-color-brand1);
          }
        }
      }
      &.active {
        color: var(--o-color-brand1);
        z-index: 99;
        .nav-dropdown {
          display: block;
        }
        &::after {
          background: var(--o-color-brand1);
        }
      }
      &::after {
        content: '';
        position: absolute;
        left: var(--o-spacing-h4);
        bottom: 0;
        width: calc(100% - var(--o-spacing-h4) * 2);
        height: 2px;
        border-radius: 1px;
        transition: all 0.1s linear;
        @media (max-width: 1100px) {
          width: 24px;
          left: 16px;
        }
      }
      .nav-item {
        display: block;
        padding: 0 var(--o-spacing-h4);
        @media screen and (max-width: 1100px) {
          padding: 0 var(--o-spacing-h6);
          font-size: var(--o-font-size-text);
        }
      }
    }
  }
}
</style>

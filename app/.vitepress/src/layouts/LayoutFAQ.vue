<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';

import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import tocInfoData from '@/data/faq/faq-toc';

import DocAnchor from '@/components/NewDocAnchor.vue';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/app/icon-expand';

const { lang, frontmatter } = useData();
const commonStore = useCommon();

const router = useRouter();

const i18n = useI18n();

// 构建时页面会携带 .html 需排除构建时的.html 否则迁移首页高亮异常
const activeId = computed(() => {
  const routeList = router.route.path.split('/');
  return routeList[3] && !routeList[3].includes('.html') ? routeList[3] : '';
});

const tocInfo = computed(() => {
  return tocInfoData[lang.value as 'zh' | 'en'];
});

const screenWidth = useWindowResize();

// 控制移动端导航展开收起
const isShowMenu = ref(false);
// 移动端点击控制目录的显示或隐藏
const toggleMenu = (flag: boolean) => {
  isShowMenu.value = flag;
};
const IconMenuShow = computed(() => {
  return commonStore.iconMenuShow;
});
</script>

<template>
  <!-- 内容区域 -->
  <div class="faq-wrapper">
    <!-- 移动端导航栏 -->
    <div v-if="screenWidth < 1100">
      <OIcon v-show="IconMenuShow" class="catalog" @click="toggleMenu(true)"
        ><IconCatalog
      /></OIcon>
    </div>
    <!-- PC侧边导航栏 -->
    <div v-if="screenWidth > 1100" class="left-toc">
      <div class="faq-sidebar-toc">
        <h2 class="faq-title">{{ i18n.faq.faqTitle }}</h2>
        <div class="toc-box">
          <a
            class="toc-item"
            :class="[{ active: item.link === activeId }]"
            :href="`/${lang}/faq/${item.link}${item.link ? '/' : ''}`"
            v-for="(item, index) in tocInfo"
            :key="item.label"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
    <Content class="faq-content" />
    <DocAnchor
      v-if="frontmatter.anchor"
      :class-name="'h3'"
      :anchor-title="i18n.faq.pageContent"
    />
    <ClientOnly>
      <ODrawer
        v-model="isShowMenu"
        direction="ltr"
        size="268px"
        :show-close="false"
      >
        <div class="faq-sidebar-toc mobile-sidebar">
          <h2 class="faq-title">
            <span>{{ i18n.faq.faqTitle }}</span>
            <OIcon @click="toggleMenu(false)"><IconCancel /></OIcon>
          </h2>
          <div class="toc-box">
            <a
              class="toc-item"
              :class="[{ active: item.link === activeId }]"
              :href="`/${lang}/faq/${item.link}${item.link ? '/' : ''}`"
              v-for="(item, index) in tocInfo"
              @click="toggleMenu(false)"
              :key="item.label"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </ODrawer>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.catalog {
position: fixed;
top: 12px;
left: 48px;
z-index: 99;
font-size: 24px;
color: var(--e-color-text1);
cursor: pointer;

  @media (min-width: 841px) and (max-width: 1100px) {
    background-color: var(--o-color-fill2);
    border-radius: 0 100px 100px 0;
    box-shadow: var(--o-shadow-2);
    padding: var(--o-gap-1);
    top: 80px;
    left: 0;
    z-index: 80;
  }
}
.left-toc {
  max-width: 280px;
  width: 100%;
  @media screen and (max-width: 1620px) {
    max-width: 160px;
  }
}
.faq-sidebar-toc {
  position: sticky;
  top: 112px;
  right: 0;
  display: flex;
  flex-direction: column;
  .faq-title {
    line-height: var(--e-line-height-h7);
    font-size: var(--e-font-size-h7);
    font-weight: 500;
    color: var(--e-color-text1);
  }
  .toc-box {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    .toc-item {
      padding: 8px 4px;
      color: rgba(0, 0, 0, 0.8);
      line-height: var(--e-line-height-h8);
      font-size: var(--e-font-size-h8);
      border-radius: 4px;
      &:hover {
        background: #e7edf6;
      }
      @media screen and (max-width: 1100px) {
        line-height: var(--e-line-height-text);
        font-size: var(--e-font-size-text);
      }
    }
    .toc-item + .toc-item {
      margin-top: 2px;
    }
    .active {
      color: var(--e-color-brand1);
      background: #c7d4ed;
      font-weight: 500;
      &:hover {
        background: #c7d4ed;
      }
    }
  }
}

.mobile-sidebar {
  position: fixed;
  padding: 0 24px;
  left: 0;
  top: 0;
  width: 268px;
  height: 100vh;
  background: var(--e-color-bg2);
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .faq-title {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    line-height: var(--e-line-height-h8);
    font-size: var(--e-font-size-h8);
    .o-icon {
      font-size: 24px;
    }
  }
}

.faq-anchor-box {
  position: sticky;
  top: 112px;
  right: 0;
}

.faq-title {
  font-size: var(--e-font-size-h5);
  line-height: var(--e-line-height-h5);
}

.faq-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  @media screen and (max-width: 1100px) {
    padding: 0;
    flex-direction: column;
  }
  .faq-content {
    max-width: 1054px;
    width: 100%;
    @media screen and (max-width: 1100px) {
      margin-bottom: 40px;
      background-color: var(--e-color-bg2);
    }
    :deep(.markdown) {
      margin: 32px;
      width: unset;
      ol li::marker,
      ul li::marker {
        color: inherit;
      }
      a {
        word-wrap: break-word;
        word-break: normal;
      }
      ol {
        list-style-type: decimal;
      }
      ul {
        list-style-type: disc;
      }
      table {
        margin-top: 8px;
      }
      h1 {
        font-size: 32px;
        line-height: 44px;
        margin-bottom: 32px;
        font-weight: 500;
      }
      h2 {
        margin-top: 32px;
        margin-bottom: 24px;
        font-size: var(--e-font-size-h5);
        line-height: var(--e-line-height-h5);
        font-weight: 500;
      }
      h2 + h3 {
        margin-top: 24px;
      }
      h3 {
        margin-top: 32px;
        margin-bottom: 12px;
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
      }
      p,
      li {
        margin: 8px 0 0 0;
        color: rgba(0, 0, 0, 0.8);
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
      code {
        font-size: inherit;
        line-height: inherit;
        padding: 0 4px;
        white-space: inherit;
        background-color: var(--e-color-bg4);
      }
      pre {
        code {
          padding: 0;
          line-height: var(--e-line-height-text);
          font-size: var(--e-font-size-text);
          background-color: transparent;
        }
      }
      @media screen and (max-width: 1100px) {
        box-shadow: none;
        margin: 0;
        padding: 24px;
        width: 100%;
        h1 {
          font-size: 22px;
          line-height: 30px;
          margin-bottom: 24px;
        }
        h2 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-size: 18px;
          line-height: 26px;
        }
        h3 {
          margin-top: 24px;
          margin-bottom: 12px;
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
        }
        h2 + h3 {
          margin-top: 16px;
        }
        p,
        li {
          margin: 8px 0 0 0;
          color: rgba(0, 0, 0, 0.8);
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
    }
  }
}

.dark {
  .faq-sidebar-toc {
    .toc-box {
      .toc-item {
        color: rgba(255, 255, 255, 0.8);
        &:hover {
          background: #2b2b2f;
        }
      }
      .active {
        color: var(--e-color-brand1);
        background: #353539;
        &:hover {
          background: #353539;
        }
      }
    }
  }
  .faq-wrapper {
    .faq-content {
      :deep(.markdown) {
        p,
        li {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
}

.el-overlay {
  top: 60px;
}
</style>

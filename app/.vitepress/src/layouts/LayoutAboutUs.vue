<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useData, useRouter } from 'vitepress';

import TOC_INFO from '@/data/about-us/about-us-toc';
import useWindowResize from '@/components/hooks/useWindowResize';

import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';
import OrgDocAnchor from '@/views/organization/OrgDocAnchor.vue';
import NavTree from '@/components/NavTree.vue';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/mooc/catalog.svg';

import logo_light from '@/assets/common/header/logo.png';
import logo_dark from '@/assets/common/header/logo_dark.png';

import { useCommon } from '@/stores/common';

const screenWidth = useWindowResize();
const router = useRouter();
const { lang, frontmatter } = useData();
const commonStore = useCommon();

const defaultProps = ref({
  children: 'children',
  label: 'label',
});

const tocInfo = computed(() => {
  if (lang.value === 'en') {
    return TOC_INFO.en;
  } else {
    return TOC_INFO.zh;
  }
});

const routeList = router.route.path.split('/');
const activeId = ref(routeList[routeList.length - 2]);

const handleItemClick = (link: string) => {
  router.go(`/${lang.value}/community/${link}/`);
};

watch(
  () => {
    const routeList = router.route.path.split('/');
    return routeList[routeList.length - 2];
  },
  (val) => {
    activeId.value = val;
  }
);

const isCustomLayout = computed(() => {
  return frontmatter.value['custom-layout'];
});

// 控制右侧锚点导航隐藏
const isHidden = computed(() => {
  return frontmatter.value['anchor'];
});

const isIconShown = computed(() => {
  return commonStore.iconMenuShow;
});

const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});

// 控制移动端二级导航展开收起
const isShowMenu = ref(false);
// 移动端点击控制目录的显示或隐藏
const toggleMenu = (flag: boolean) => {
  isShowMenu.value = flag;
};

// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};

const handleNodeClick = (node: any) => {
  if (node.link) {
    router.go(`/${lang.value}/community/${node.link}/`);
    toggleMenu(false);
  }
};
</script>

<template>
  <!-- PC侧边导航栏 -->
  <DocSideBar v-if="screenWidth > 1100">
    <div class="aboout-sidebar-toc">
      <template v-for="item in tocInfo" :key="item.label">
        <DocSideBarMenu
          v-if="item && item.children && item.children.length"
          :info="item"
          :active-id="activeId"
          @item-click="handleItemClick"
        ></DocSideBarMenu>
        <p
          v-else
          class="sidebar-title"
          :class="[{ active: item.link === activeId }]"
          @click="handleItemClick(item.link)"
        >
          {{ item.label }}
        </p>
      </template>
    </div>
  </DocSideBar>

  <!-- 移动端导航栏 -->
  <template v-else>
    <OIcon v-show="isIconShown" class="catalog" @click="toggleMenu(true)"
      ><IconCatalog
    /></OIcon>
    <ClientOnly>
      <ODrawer
        v-model="isShowMenu"
        direction="ltr"
        size="268px"
        :show-close="false"
      >
        <div class="nav-tree">
          <div class="nav-top">
            <img
              class="logo"
              :src="logo"
              alt="openEuler logo"
              @click="goHome"
            />
            <OIcon @click="toggleMenu(false)"><IconCancel /></OIcon>
          </div>
          <NavTree
            ref="tree"
            :node-key="'migration'"
            :data="tocInfo"
            :default-props="defaultProps"
            :current-node-key="activeId"
            @node-click="handleNodeClick"
          />
        </div>
      </ODrawer>
    </ClientOnly>
  </template>

  <!-- 内容区域 -->
  <div class="about-wrapper" :class="{ 'about-markdown': !isCustomLayout }">
    <OrgDocAnchor class="about-anchor" :class="isHidden ? 'is-hidden' : ''" />
    <Content
      class="about-content"
      :class="{ 'custom-layout': isCustomLayout }"
    />
  </div>
</template>

<style lang="scss" scoped>
.nav-tree {
  position: fixed;
  left: 0;
  top: 0;
  width: 268px;
  height: 100vh;
  background: var(--e-color-bg2);
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;
  .nav-top {
    width: 100%;
    background: var(--e-color-bg2);
    font-size: 14px;
    line-height: 22px;
    color: var(--e-color-text1);
    padding: var(--e-spacing-h5);
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 24px;
      cursor: pointer;
    }
    :deep(.o-icon) {
      padding: 12px;
      cursor: pointer;
      font-size: var(--e-font-size-h5);
    }
  }

  :deep(.el-icon.el-tree-node__expand-icon.is-leaf) {
    display: none;
  }
  :deep(.el-tree .el-tree-node__label) {
    font-size: 14px;
    line-height: 16px;
    color: var(--e-color-text1);
  }
}

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
    padding: var(--o-gap-3);
    top: 100px;
    left: 0;
    z-index: 80;
  }
  @include respond-to('pad_v') {
    left: 56px;
  }
}

.about-sidebar-toc {
  height: 100%;
  margin-top: 24px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--e-color-division);
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    box-shadow: none;
    background: var(--e-color-bg1);
  }

  .sidebar-title:first-child {
    &::before {
      display: none;
    }
  }
}

.sidebar-title {
  position: relative;
  padding: 0 40px;
  font-size: var(--e-font-size-text);
  height: 70px;
  line-height: 70px;
  color: var(--e-color-white);
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    width: calc(100% - 80px);
    height: 1px;
    background-color: var(--e-color-neutral11);
    content: '';
    background-color: #ffffff;
    opacity: 0.1;
  }

  &:hover {
    color: #feb32a;
  }

  &.active {
    color: #feb32a;
  }
}

.about-title {
  font-size: var(--e-font-size-h5);
  line-height: var(--e-line-height-h5);
}

.about-wrapper {
  height: 100%;
  padding: 64px 120px;
  margin-left: 300px;
  background-color: var(--e-color-bg1);

  @media screen and (max-width: 1280px) {
    padding: 64px 60px;
  }

  @media screen and (max-width: 1100px) {
    margin-left: 0px;
    padding: 16px 16px 40px 16px;
  }

  @media (max-width: 768px) {
    padding: var(--e-spacing-h5);
    margin-top: var(--e-spacing-h5);
    margin-bottom: var(--e-spacing-h2);
  }

  .about-anchor {
    // right: 120px;
    // @media screen and (max-width: 1280px) {
    //   right: 0;
    // }
  }
  .is-hidden {
    display: none;
  }
  .about-content {
    max-width: 1380px;
    padding-right: 200px;
    margin: 0 auto;

    @media screen and (max-width: 1100px) {
      padding-right: 0;
    }
    @media screen and (max-width: 768px) {
      background-color: var(--e-color-bg2);
      padding: 24px 16px 16px 16px;
      box-shadow: var(--e-shadow-l1);
    }

    &.custom-layout {
      @media screen and (min-width: 1720px) {
        padding-right: 0;
      }

      @media screen and (max-width: 768px) {
        background-color: var(--e-color-bg1);
        box-shadow: var(--e-shadow-l1);
        padding: 0;
        box-shadow: none;
      }
    }
  }
}
</style>

<style lang="scss">
/**
 *  关于我们---md样式
 **/

.about-markdown {
  --e-color-table: var(--e-color-border2); // 表格边框

  ol,
  ul {
    list-style: inherit;
  }
  a {
    word-break: break-all;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--e-color-text1);
    font-weight: bold;

    a {
      display: none;
    }
  }

  h1 {
    margin-top: 0;
    text-align: center;
  }

  hr {
    margin: var(--e-spacing-h1) 0;
    border: none;
    height: 1px;
    background-color: var(--e-color-division1);
    @media screen and (max-width: 768px) {
      margin: var(--e-spacing-h4) 0;
    }
  }

  h1 {
    margin-bottom: var(--e-spacing-h2);
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      margin: 0 0 var(--e-spacing-h4);
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
    }
  }

  h2 {
    margin-top: var(--e-spacing-h2);
    margin-bottom: var(--e-spacing-h3);
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    @media screen and (max-width: 768px) {
      margin: var(--e-spacing-h4) 0 var(--e-spacing-h5);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }

  h3 {
    margin-top: var(--e-spacing-h3);
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    @media screen and (max-width: 768px) {
      margin: var(--e-spacing-h6) 0;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
  }

  h4 {
    margin-top: var(--e-spacing-h4);
    font-size: var(--e-font-size-h8);
    line-height: var(--e-font-size-h8);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h6);
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }

  h5 {
    margin-top: var(--e-spacing-h5);
    font-size: var(--e-font-size-text);
    line-height: var(--e-font-size-text);
  }

  p,
  ul,
  ol {
    margin-top: var(--e-spacing-h8);
    margin-bottom: var(--e-spacing-h8);
    font-size: var(--e-font-size-text);
    font-weight: normal;
    color: var(--e-color-text4);
    line-height: var(--e-line-height-text);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }

  ul,
  ol {
    padding-left: 1em;

    li {
      margin-top: 0.25em;
      &::marker {
        color: var(--e-color-text4);
      }
    }
  }

  table {
    width: 100%;
    font-size: var(--e-font-size-text);
    table-layout: fixed;
    word-break: break-word;
    border-collapse: collapse;
    padding: 0;

    tr {
      height: 36px;
      color: var(--e-color-text4);
      border-bottom: 1px solid var(--e-color-table);

      th {
        font-size: var(--e-font-size-h8);
        background-color: var(--e-color-bg4);
        color: var(--e-color-text1);
      }
    }
  }

  strong {
    color: var(--e-color-text1);
    font-weight: bold;
  }

  img {
    display: inline-block;
    max-width: 100%;
  }

  a[href^='#'] {
    display: none;
  }
  div[class*='language-'] {
    position: relative;
    margin: 8px 0;
    background-color: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      background-color: var(--e-color-bg1);
    }
  }
  [class*='language-'] code,
  [class*='language-'] pre {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: var(--e-color-bg2);
    }

    &::-webkit-scrollbar {
      height: 8px;
      background-color: var(--e-color-bg2);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: var(--e-color-bg4);
    }
  }

  [class*='language-'] pre {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 24px 32px;
    background: 0 0;
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      padding: 12px 24px;
    }
  }

  [class*='language-'] code {
    padding: 0;
    line-height: var(--e-line-height-text);
    font-size: var(--e-font-size-text);
    color: var(--e-color-text1);
  }
}

.about-content {
  & > *:first-child {
    & > *:first-child {
      margin-top: 0 !important;
    }
  }
  .update-time {
    text-align: center;
    margin-top: -40px;
    @media screen and (max-width: 768px) {
      margin-top: -20px;
    }
  }
  .more-info {
    display: block;
    font-weight: normal;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
}

.dark .about-markdown img {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>

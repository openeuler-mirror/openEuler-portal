<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ref, watch, computed } from 'vue';

import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import tocInfoData from '@/data/migration/migration-toc';

import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';
import NavTree from '@/components/NavTree.vue';
import DocAnchor from '@/components/DocAnchor.vue';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/mooc/catalog.svg';

import logo_light from '@/assets/common/header/logo.png';
import logo_dark from '@/assets/common/header/logo_dark.png';

const { lang, frontmatter } = useData();
const commonStore = useCommon();

const router = useRouter();

// 构建时页面会携带 .html 需排除构建时的.html 否则迁移首页高亮异常
const activeId = computed(() => {
  const routeList = router.route.path.split('/');
  return routeList[3] && !routeList[3].includes('.html')
    ? routeList[3]
    : routeList[2];
});

const tocInfo = computed(() => {
  return tocInfoData[lang.value as 'zh' | 'en'];
});

const screenWidth = useWindowResize();

const defaultProps = ref({
  children: 'children',
  label: 'label',
});

const isCustomLayout = computed(() => {
  return frontmatter.value['custom-layout'];
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
const IconMenuShow = computed(() => {
  return commonStore.iconMenuShow;
});
// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};

const handleItemClick = (link: string) => {
  router.go(`/${lang.value}/migration/guidance/${link}/`);
};

const handleTitleClick = (link: string) => {
  link === 'migration'
    ? router.go(`/${lang.value}/migration/`)
    : router.go(`/${lang.value}/migration/${link}/`);
};

const handleNodeClick = (node: any) => {
  node.link === 'migration'
    ? router.go(`/${lang.value}/migration/`)
    : router.go(`/${lang.value}/migration/${node.link}/`);
  toggleMenu(false);
};
</script>

<template>
  <!-- PC侧边导航栏 -->
  <DocSideBar v-if="screenWidth > 1100">
    <div class="migration-sidebar-toc">
      <template v-for="(item, index) in tocInfo" :key="item.label">
        <DocSideBarMenu
          v-if="item && item.children && item.children.length"
          :info="item"
          :active-id="activeId"
          @item-click="handleItemClick"
        ></DocSideBarMenu>
        <p
          v-else
          class="sidebar-title"
          :class="[
            { active: item.link === activeId },
            { 'migration-title': index === 0 },
          ]"
          @click="handleTitleClick(item.link)"
        >
          {{ item.label }}
        </p>
      </template>
    </div>
  </DocSideBar>

  <!-- 移动端导航栏 -->
  <template v-else>
    <OIcon v-show="IconMenuShow" class="catalog" @click="toggleMenu(true)"
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
  <div class="migration-wrapper migration-markdown">
    <Content
      class="migration-content"
      :class="{ 'custom-layout': isCustomLayout }"
    />
    <DocAnchor v-if="frontmatter.anchor" />
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
  :deep(.el-tree-node .el-tree-node__content) {
    justify-content: space-between;
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
}

:deep(.guidance) {
  max-width: calc(100% - 200px);
  @media screen and (max-width: 1100px) {
    max-width: max-content;
  }
  .instruction {
    display: flex;
    background: rgba(254, 229, 184, 0.2);
    border-left: 6px solid #feb32a;
    border-radius: 8px 0px 0px 8px;
    margin-top: 20px;
    margin-bottom: 8px;
    .content {
      padding: 20px;
      @media screen and (max-width: 768px) {
        padding: 12px;
      }
      .title {
        display: flex;
        align-items: center;
        @media screen and (max-width: 768px) {
          margin-bottom: var(--e-spacing-h8);
        }
        .o-icon {
          font-size: 24px;
          margin-right: 6px;
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-h7);
          }
        }
        p {
          font-size: var(--e-font-size-h8);
          color: var(--e-color-text1);
          line-height: var(--e-line-height-h8);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            margin: 0;
          }
        }
      }
    }
    .description {
      font-size: var(--e-font-size-text);
      color: var(--e-color-text4);
      line-height: var(--e-line-height-text);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
  }
  img {
    margin-top: 12px;
    width: 1024px;
  }
}

.migration-sidebar-toc {
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

.migration-title {
  font-size: var(--e-font-size-h5);
  line-height: var(--e-line-height-h5);
}

.migration-wrapper {
  .migration-content {
    max-width: 1380px;
    margin: 0 auto;
    & > :deep(div) > *:first-child {
      margin-top: 0;
    }
    @media screen and (max-width: 768px) {
      background-color: var(--e-color-bg2);
      padding: 24px 16px 16px 16px;
      box-shadow: var(--e-shadow-l1);
    }

    &.custom-layout {
      @media screen and (max-width: 768px) {
        background-color: var(--e-color-bg1);
        box-shadow: var(--e-shadow-l1);
        padding: 0;
        box-shadow: none;
      }
    }
  }

  .migration-markdown {
    margin: 0;
  }
}
</style>

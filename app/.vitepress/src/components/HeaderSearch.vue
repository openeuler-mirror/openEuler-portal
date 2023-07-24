<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import { getPop } from '@/api/api-search';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconSearch from '~icons/app/icon-search.svg';

const { lang } = useData();

const emits = defineEmits(['focus-input', 'search-click']);
const isShowDrawer = ref(false);
const searchInput = ref('');
const i18n = useI18n();

const commonStore = useCommon();

// 搜索事件
function handleSearchEvent() {
  window.open(
    `/${lang.value}/other/search/?search=${encodeURIComponent(searchInput.value)}`,
    '_self'
  );
}
// 点击热搜标签
const onTopSearchItemClick = (val: any) => {
  searchInput.value = val;
  handleSearchEvent();
};
const topSearch = computed(() =>
  lang.value === 'zh' ? '热门搜索' : 'Top search'
);

const searchValue = computed(() => i18n.value.common.SEARCH);
// 显示/移除搜索框
const isShowBox = ref(false);
const showSearchBox = () => {
  commonStore.iconMenuShow = false;
  isShowBox.value = true;
  emits('search-click', isShowBox.value);
};

// // 搜索抽屉
const popList = ref<string[]>([]);
const showDrawer = () => {
  //热搜
  const params = `lang=${lang.value}`;
  getPop(params).then((res) => {
    if (popList.value.length === 0) {
      res.obj.forEach((item: string) => {
        popList.value.push(item);
      });
      isShowDrawer.value = true;
    }
  });
};
// 关闭搜索框
const closeSearchBox = () => {
  isShowBox.value = false;
  searchInput.value = '';
  popList.value = [];
  commonStore.iconMenuShow = true;
  isShowDrawer.value = false;
  emits('search-click', isShowBox.value);
};
</script>
<template>
  <div v-if="isShowBox" class="header-search">
    <div class="header-search-box">
      <OSearch
        v-model="searchInput"
        :placeholder="searchValue.PLEACHOLDER"
        @change="handleSearchEvent"
        @focus="showDrawer"
      >
        <template #suffix>
          <OIcon class="close" @click="closeSearchBox"><IconCancel /></OIcon>
        </template>
      </OSearch>
    </div>
    <div v-show="isShowDrawer" class="drawer">
      <div class="hots">
        <div class="hots-title">
          <p class="hots-text">{{ topSearch }}</p>
        </div>
        <div class="hots-list">
          <OTag
            v-for="item in popList"
            :key="item"
            type="text"
            class="hots-list-item"
            @click="onTopSearchItemClick(item)"
            >{{ item }}</OTag
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else class="header-search-icon">
    <OIcon class="icon" @click="showSearchBox">
      <IconSearch />
    </OIcon>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text1);
}
.header-search-icon {
  cursor: pointer;
}
.header-search {
  position: relative;
  width: 900px;
  margin-left: var(--o-spacing-h2);
  @media (max-width: 1100px) {
    :deep(.o-search) {
      --o-search-height: 28px;
    }
    margin-left: 0;
    z-index: 2;
    position: fixed;
    width: calc(100vw - 32px);
    left: 16px;
    right: 16px;
  }

  &-box {
    .close {
      cursor: pointer;
      color: var(--o-color-text1);
    }
  }
  .drawer {
    position: absolute;
    height: auto;
    width: 100%;
    margin-top: 21px;
    box-shadow: var(--o-shadow-l4);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    padding: var(--o-spacing-h3);

    @media (max-width: 1100px) {
      background: rgba(255, 255, 255, 1);
      backdrop-filter: blur(0px);
      margin-top: 8px;
      left: -16px;
      right: 0;
      width: 100vw;
      padding: var(--o-spacing-h5);
    }
    .hots {
      &-title {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
      }
      &-list {
        &-item {
          margin-top: var(--o-spacing-h5);
          margin-right: var(--o-spacing-h5);
          background-color: var(--o-color-bg4);
          color: var(--o-color-text-secondary);
          cursor: pointer;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }
    }
    @media (max-width: 768px) {
      .hots-list-item {
        margin-right: var(--o-spacing-h8);
      }
    }
  }
}
.dark {
  .drawer {
    background: rgba($color: #2e2e2e, $alpha: 0.9);
    @media screen and (max-width: 1439px) {
      background: rgba($color: #2e2e2e, $alpha: 1);
    }
  }
}
</style>

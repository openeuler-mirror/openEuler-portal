<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';

import type { SearchRecommendT } from '@/shared/@types/type-search';

import { getPop } from '@/api/api-search';
import { getSearchRecommend } from '@/api/api-search';

import useClickOutside from '@/components/hooks/useClickOutside';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconSearch from '~icons/app-new/icon-header-search.svg';

const { lang } = useData();
const searchRef = ref();
const isClickOutside = useClickOutside(searchRef) || false;
const windowWidth = ref(useWindowResize());

const emits = defineEmits(['focus-input', 'search-click']);
const isShowDrawer = ref(false);
const searchInput = ref('');
const i18n = useI18n();

const commonStore = useCommon();

// 搜索事件
function handleSearchEvent() {
  isShowDrawer.value = false;
  handleSearch(searchInput.value);
  window.open(
    `/${lang.value}/other/search/?search=${encodeURIComponent(
      searchInput.value
    )}`,
    '_self'
  );
}
// 点击热搜标签
const onTopSearchItemClick = (val: string) => {
  searchInput.value = val;
  handleSearchEvent();
};

const searchValue = computed(() => i18n.value.common.SEARCH);
// 显示/移除搜索框
const isShowBox = ref(false);
const popList = ref<string[]>([]);
const showDrawer = () => {
  //热搜
  commonStore.iconMenuShow = false;
  isShowBox.value = true;
  emits('search-click', isShowBox.value);
  isShowDrawer.value = true;
  const params = `lang=${lang.value}`;

  if (popList.value.length) {
    return;
  }
  getPop(params).then((res) => {
    popList.value = res.obj;
  });
};
// 关闭搜索框
const closeSearchBox = () => {
  isShowBox.value = false;
  searchInput.value = '';
  commonStore.iconMenuShow = true;
  isShowDrawer.value = false;
  emits('search-click', isShowBox.value);
};

onMounted(() => {
  window.addEventListener('click', () => {
    if (isClickOutside.value && windowWidth.value > 768) {
      closeSearchBox();
    }
  });
});
// ----------------- 联想搜索 -------------------------
const recommendData = ref<SearchRecommendT[]>([]);

const queryGetSearchRecommend = (val: string) => {
  getSearchRecommend({
    query: val,
  }).then((res) => {
    recommendData.value = res.obj.word;
  });
};

watch(
  () => searchInput.value,
  (val: string) => {
    if (val) {
      queryGetSearchRecommend(val);
    } else {
      recommendData.value = [];
    }
  }
);

// ----------------------- 历史搜索记录 -----------------------
const searchHistory = ref<string[]>([]);

const loadSearchHistory = () => {
  // 从 localStorage 加载搜索历史
  const history = localStorage.getItem('searchHistory');
  if (history) {
    searchHistory.value = JSON.parse(history);
  }
};
loadSearchHistory();
const handleSearch = (searchValue: string) => {
  if (searchValue && Array.isArray(searchHistory.value)) {
    // 添加到历史记录并更新 localStorage
    searchHistory.value.unshift(searchValue);
    searchHistory.value = Array.from(new Set(searchHistory.value)); // 去重
    if (searchHistory.value.length > 6) {
      // 最多保持6条搜集记录
      searchHistory.value.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
  }
};
</script>
<template>
  <div
    ref="searchRef"
    class="header-search"
    :class="{ 'input-focus': isShowDrawer }"
  >
    <OInput
      v-model="searchInput"
      :placeholder="
        isShowDrawer ? searchValue.PLEACHOLDER_EXTEND : searchValue.PLEACHOLDER
      "
      @keyup.enter="handleSearchEvent"
      @focus="showDrawer"
    >
      <template #prefix>
        <OIcon class="icon"><IconSearch></IconSearch></OIcon>
      </template>
      <template v-if="isShowDrawer" #suffix>
        <OIcon class="close icon" @click="closeSearchBox"><IconCancel /></OIcon>
      </template>
    </OInput>

    <div v-show="isShowDrawer" class="drawer">
      <div
        v-if="recommendData.length && searchInput"
        class="recommend search-recommend"
      >
        <div
          v-for="item in recommendData"
          class="recommend-item"
          @click="onTopSearchItemClick(item.key)"
          :key="item.key"
        >
          {{ item.key }}
        </div>
      </div>
      <div v-else-if="searchHistory.length" class="recommend">
        <span class="history">{{ searchValue.BROWSEHISTORY }}</span>
        <div
          v-for="item in searchHistory"
          class="recommend-item"
          @click="onTopSearchItemClick(item)"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <div class="hots">
        <div class="hots-title">
          <p class="hots-text">{{ searchValue.TOPSEARCH }}</p>
        </div>
        <div class="hots-list">
          <div
            v-for="item in popList"
            :key="item"
            type="text"
            class="hots-list-item"
            @click="onTopSearchItemClick(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <OIcon @click="showDrawer" class="icon search-icon"
    ><IconSearch></IconSearch
  ></OIcon>
</template>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
  @include h4;
  color: var(--o-color-info1);
}

.search-icon {
  color: var(--o-color-info1);
}

.header-search {
  position: relative;
  margin-left: var(---o-gap-7);
  .o-input {
    width: 160px;
    height: 32px;
    transition: width 0.3s;
    transform: translate(0);
    background-color: var(--o-color-fill2);
    @media (max-width: 1200px) {
      display: none;
    }
  }
  @media (max-width: 1200px) {
    :deep(.o-search) {
      --e-search-height: 28px;
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
      color: var(--o-color-info1);
    }
  }
  .drawer {
    position: absolute;
    left: 0px;
    top: 32px;
    height: auto;
    overflow: hidden;
    width: 100%;

    box-shadow: var(--o-shadow-2);
    backdrop-filter: blur(5px);
    padding: var(--o-gap-5) 0;
    background: var(--o-color-fill2);
    border-radius: 0 0 4px 4px;

    @media (max-width: 1200px) {
      backdrop-filter: blur(0px);
      margin-top: var(--o-gap-2);
      left: -16px;
      right: 0;
      width: 100vw;
      padding: var(--o-gap-4) 0;
    }
    .hots {
      padding: 0 var(--o-gap-6);
      @media (max-width: 1200px) {
        padding: 0 var(--o-gap-4);
      }
      .hots-title {
        @include tip2;
        color: var(--o-color-info1);
      }
      .hots-list {
        display: flex;
        flex-wrap: wrap;
        .hots-list-item {
          margin-top: var(--o-gap-4);
          margin-right: var(--o-gap-4);
          margin-right: var(--o-gap-4);
          color: #707070;
          cursor: pointer;
          &:hover {
            color: var( --o-color-primary1);
          }
          @media (max-width: 1200px) {
            @include tip2;
          }
        }
      }
    }
  }
}

.recommend {
  padding-bottom: var(--o-gap-5);
  & > :first-child {
    margin-top: 0 !important;
  }
  .history {
    display: flex;
    @include tip2;
    color: var(--o-color-info1);
    padding: 0 var(--o-gap-6);
    @media (max-width: 1200px) {
      padding: 0 var(--o-gap-4);
    }
  }
  .recommend-item {
    cursor: pointer;
    margin-top: 8px;
    color: #707070;
    padding: var(--o-gap-1) var(--o-gap-6);
    @include text1;
    @media (max-width: 1200px) {
      padding: 0 var(--o-gap-4);
    }
    &:hover {
      color: var( --o-color-primary1);
      background-color: var(--o-color-fill1);
    }
  }
}
.search-recommend {
  margin-top: -4px;
}
.search-icon {
  display: none;
  @media (max-width: 1200px) {
    display: block;
  }

  &.icon {
    font-size: 20px;
  }
}
.input-focus {
  box-shadow: var(--o-shadow-2);
  .o-input {
    display: flex;
    width: 512px;

    @include respond-to('laptop') {
      width: 450px;
    }

    @media (max-width: 1200px) {
      width: 100%;
      :deep(.el-input__wrapper) {
        width: 100%;
        height: 28px;
      }
    }
  }
}

:deep(.o-input.el-input .el-input__wrapper) {
  border-radius: var(--o-radius-xs);

  &.is-focus {
    border: 1px solid var(--o-color-primary1);
    box-shadow: unset;
  }
}
</style>

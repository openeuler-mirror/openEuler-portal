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
import IconSearch from '~icons/app/icon-search.svg';

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
  font-size: var(--e-font-size-h6);
  color: var(--e-color-text-secondary);
}

.search-icon {
  color: var(--e-color-text1);
}

.header-search {
  position: relative;
  margin-left: var(--e-spacing-h2);
  .o-input {
    width: 160px;
    transition: width 0.3s;
    background-color: var(--e-color-bg1);
    @media (max-width: 1100px) {
      display: none;
    }
  }
  @media (max-width: 1100px) {
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
      color: var(--e-color-text1);
    }
  }
  .drawer {
    position: absolute;
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top: 21px;
    box-shadow: var(--e-shadow-l4);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    padding: 24px 0;

    @media (max-width: 1100px) {
      background: rgba(255, 255, 255, 1);
      backdrop-filter: blur(0px);
      margin-top: 8px;
      left: -16px;
      right: 0;
      width: 100vw;
      padding: var(--e-spacing-h5) 0;
    }
    .hots {
      padding: 0 var(--e-spacing-h3);
      @media (max-width: 1100px) {
        padding: 0 var(--e-spacing-h5);
      }
      .hots-title {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        color: var(--e-color-text1);
      }
      .hots-list {
        display: flex;
        flex-wrap: wrap;
        .hots-list-item {
          margin-top: var(--e-spacing-h5);
          margin-right: var(--e-spacing-h5);
          margin-right: var(--e-spacing-h5);
          color: var(--e-color-text-secondary);
          cursor: pointer;
          &:hover {
            color: var(--e-color-brand1);
          }
          @media (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
      }
    }
    @media (max-width: 768px) {
      .hots-list-item {
        margin-right: var(--e-spacing-h8);
      }
    }
  }
}

.recommend {
  padding-bottom: 24px;
  & > :first-child {
    margin-top: 0 !important;
  }
  .history {
    display: flex;
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    color: var(--e-color-text1);
    padding: 0 var(--e-spacing-h3);
    @media (max-width: 1100px) {
      padding: 0 var(--e-spacing-h5);
    }
  }
  .recommend-item {
    cursor: pointer;
    margin-top: 8px;
    color: var(--e-color-text-secondary);
    font-size: var(--e-font-size-h8);
    padding: 4px var(--e-spacing-h3);
    @media (max-width: 1100px) {
      padding: 0 var(--e-spacing-h5);
    }
    &:hover {
      color: var(--e-color-brand1);
      background-color: var(--e-color-bg1);
    }
  }
}
.search-recommend {
  margin-top: -4px;
}
.search-icon {
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
}
.input-focus {
  .o-input {
    display: flex;
    width: 512px;
    @media (max-width: 1100px) {
      width: 100%;
      :deep(.el-input__wrapper) {
        width: 100%;
        height: 28px;
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

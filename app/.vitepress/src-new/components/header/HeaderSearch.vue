<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '~@/i18n';

import type { SearchRecommendT } from '@/shared/@types/type-search';

import { getPop } from '@/api/api-search';
import { getSearchRecommend } from '@/api/api-search';

import useClickOutside from '@/components/hooks/useClickOutside';
import { useScreen } from '~@/composables/useScreen';

import IconClose from '~icons/app-new/icon-close.svg';
import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconDelete from '~icons/app-new/icon-header-delete.svg';
import IconDeleteAll from '~icons/app-new/icon-delete.svg';
import IconBack from '~icons/app-new/icon-header-back.svg';

const { lang } = useData();
const searchRef = ref();
const isClickOutside = useClickOutside(searchRef) || false;
const { lePadV } = useScreen();

const emits = defineEmits(['focus-input', 'search-click']);
const isShowDrawer = ref(false);
const searchInput = ref('');
const i18n = useI18n();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

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

const searchValue = computed(() => i18n.value.header.SEARCH);
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

  if (popList.value?.length) {
    return;
  }
  getPop(params).then((res) => {
    popList.value = res.obj;
  });
};
// 关闭搜索框
const closeSearchBox = () => {
  searchInput.value = '';
  emits('search-click', isShowBox.value);
  if (!lePadV.value) {
    isShowBox.value = false;
    commonStore.iconMenuShow = true;
    isShowDrawer.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', () => {
    if (isClickOutside.value && !lePadV.value) {
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

const deleteHistory = (data: string) => {
  if (!data) {
    localStorage.removeItem('searchHistory');
    searchHistory.value = [];
  }

  const history = localStorage.getItem('searchHistory');
  if (history) {
    searchHistory.value = JSON.parse(history).filter((s: string) => s !== data);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
  }
};

const closeSearch = () => {
  searchInput.value = '';
  isShowBox.value = false;
  commonStore.iconMenuShow = true;
  isShowDrawer.value = false;
  emits('search-click', isShowBox.value);
};
</script>
<template>
  <div class="search-wrapper">
    <div :class="{ search: !lePadV, focus: isShowDrawer && !lePadV }">
      <div ref="searchRef" class="header-search">
        <div :class="{ 'input-focus': isShowDrawer }">
          <OIcon v-if="lePadV && isShowDrawer" @click.stop="closeSearch"
            ><IconBack></IconBack
          ></OIcon>
          <OInput
            v-model="searchInput"
            :placeholder="
              isShowDrawer
                ? searchValue.PLEACHOLDER_EXTEND
                : searchValue.PLEACHOLDER
            "
            @keyup.enter="handleSearchEvent"
            @focus="showDrawer"
            class="normal"
          >
            <template #prefix>
              <OIcon class="icon"><IconSearch></IconSearch></OIcon>
            </template>
            <template
              v-if="(!lePadV && isShowDrawer) || (lePadV && searchInput)"
              #suffix
            >
              <OIcon class="close icon" @click="closeSearchBox"
                ><IconClose
              /></OIcon>
            </template>
          </OInput>
          <OIcon class="only-icon" @click="showDrawer"
            ><IconSearch></IconSearch
          ></OIcon>
          <span
            v-if="lePadV && isShowDrawer"
            class="search-text"
            @click="handleSearchEvent"
            >{{ searchValue.TEXT }}</span
          >
        </div>

        <div v-show="isShowDrawer" class="drawer">
          <div
            v-if="recommendData.length && searchInput"
            class="search-recommend"
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
          <div v-else-if="searchHistory.length" class="history-container">
            <div class="history-title">
              <span class="title">{{ searchValue.BROWSEHISTORY }}</span>
              <OIcon class="icon" @click.stop="deleteHistory('')">
                <IconDeleteAll></IconDeleteAll>
              </OIcon>
            </div>
            <div class="history">
              <div
                v-for="item in searchHistory"
                class="history-item"
                :class="{ dark: isDark }"
                @click="onTopSearchItemClick(item)"
                :key="item"
              >
                <span class="history-text">{{ item }}</span>
                <OIcon class="icon-container" @click.stop="deleteHistory(item)"
                  ><IconDelete class="icon"></IconDelete
                ></OIcon>
              </div>
            </div>
            <div class="split-line"></div>
          </div>
          <div class="hots">
            <div class="hots-title">
              <p>{{ searchValue.TOPSEARCH }}</p>
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
  @include h4;
  color: var(--o-color-info1);

  &.close {
    @include x-svg-hover;
  }
}

.search-icon {
  color: var(--o-color-info1);
}

.search-wrapper {
  position: relative;

  .search {
    position: absolute;
    right: 0;
    top: -16px;
    background-color: var(--o-color-fill2);
    z-index: 100;

    &.focus {
      top: -32px;
    }
  }
}

.header-search {
  position: relative;
  display: flex;
  .o-input {
    width: 160px;
    height: 32px;
    transition: width 0.3s;
    transform: translate(0);
    @include respond-to('<=laptop') {
      width: 120px;
    }
    @include respond-to('<=pad_v') {
      display: none;
    }
  }
  @include respond-to('<=pad_v') {
    margin-left: 0;
    z-index: 2;
    position: fixed;
    width: calc(100vw - 32px);
    left: 16px;
    right: 16px;
    top: 10px;
  }

  .input-focus {
    padding: var(--o-gap-4);
    border-radius: 4px 4px 0 0;
    display: flex;
    &::after {
      content: '';
      position: absolute;
      height: var(--o-gap-4);
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: var(--o-color-fill2);
      z-index: 200;

      @include respond-to('<=pad_v') {
        display: none;
      }
    }

    .search-text {
      white-space: nowrap;
      @include h3;
    }

    @include respond-to('<=pad_v') {
      padding: 0;
      z-index: 200;
      background-color: var(--o-color-fill2);
      width: 100%;
      gap: var(--o-gap-4);
      align-items: center;
    }

    .normal {
      display: flex !important;
    }
    .only-icon {
      display: none !important;
    }
  }

  .drawer {
    position: absolute;
    left: 0px;
    top: 64px;
    height: auto;
    overflow: hidden;
    width: 100%;

    box-shadow: var(--o-shadow-2);
    backdrop-filter: blur(5px);
    padding: var(--o-gap-5);
    padding-top: var(--o-gap-2);
    background: var(--o-color-fill2);
    border-radius: 0 0 4px 4px;

    @include respond-to('<=pad_v') {
      backdrop-filter: blur(0px);
      left: -16px;
      right: 0;
      width: 100vw;
      height: 100vh;
      padding: var(--o-gap-4);
      border-radius: unset;
      top: 32px;
    }

    .hots {
      .hots-title {
        @include tip2;
        color: var(--o-color-info3);

        @include respond-to('<=pad_v') {
          @include text2;
          color: var(--o-color-info1);
          margin-bottom: var(--o-gap-3);
        }
      }
      .hots-list {
        display: flex;
        flex-wrap: wrap;
        @include tip2;
        .hots-list-item {
          margin-top: var(--o-gap-3);
          margin-right: var(--o-gap-4);
          color: var(--o-color-info1);
          cursor: pointer;
          @include hover {
            color: var(--o-color-primary1);
          }
        }

        @include respond-to('<=pad_v') {
          @include text1;
          display: block;
        }
      }
    }

    @include respond-to('<=pad_v') {
      box-shadow: unset;
      padding-left: var(--o-gap-5);
      padding-right: var(--o-gap-5);
    }
  }
  .normal {
    @media (min-width: 841px) and (max-width: 1000px) {
      display: none;
    }
  }
  .only-icon {
    display: none;

    @media (min-width: 841px) and (max-width: 1000px) {
      display: block;
      font-size: var(--o-icon_size-s);
      padding-top: var(--o-gap-1);
    }
  }
}

.history-container {
  .title {
    @include tip2;
    color: var(--o-color-info3);

    @include respond-to('<=pad_v') {
      @include text2;
      color: var(--o-color-info1);
    }
  }
  .history-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .history {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .history-item {
      cursor: pointer;
      background-color: var(--o-color-fill3);
      border-radius: var(--o-radius-xs);
      margin-top: var(--o-gap-2);
      height: 24px;
      max-width: 224px;
      display: flex;
      align-items: center;
      padding: 0 var(--o-gap-3);
      position: relative;

      .icon-container {
        display: none;
      }

      @include hover {
        background-color: var(--o-color-control2-light);
        color: var(--o-color-primary1);

        .icon-container {
          display: inline-block;
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(var(--o-mixedgray-9));
          right: -8px;
          top: -8px;
        }
      }

      .icon {
        height: 16px;
        width: 16px;
      }

      &.dark {
        @include hover {
          background-color: rgb(var(--o-mixedgray-7));
        }
      }

      .history-text {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @include tip2;

        @include respond-to('<=pad_v') {
          @include text1;
        }
      }

      @include respond-to('<=pad_v') {
        height: 28px;
      }
    }
  }
  .split-line {
    background: var(--o-color-control4);
    width: 100%;
    height: 1px;
    margin: var(--o-gap-4) 0;

    @include respond-to('<=pad_v') {
      display: none;
    }
  }
  @include respond-to('<=pad_v') {
    margin-bottom: var(--o-gap-5);
  }
}
.search-recommend {
  margin-bottom: var(--o-gap-3);

  .recommend-item {
    @include tip2;
    & + .recommend-item {
      margin-top: var(--o-gap-3);
    }

    cursor: pointer;
    @include hover {
      color: var(--o-color-primary1);
    }

    @include respond-to('<=pad_v') {
      @include text1;
    }
  }
}
.search-icon {
  display: none;
  @include respond-to('<=pad_v') {
    display: block;
  }

  &.icon {
    font-size: var(--o-icon_size-m);
  }
}
.input-focus {
  box-shadow: var(--o-shadow-2);
  .o-input {
    display: flex;
    width: 480px;

    @include respond-to('<=laptop') {
      width: 240px;
    }

    @include respond-to('<=pad_v') {
      width: 100%;
      :deep(.el-input__wrapper) {
        width: 100%;
      }
    }
  }
  @include respond-to('<=pad_v') {
    box-shadow: unset;
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

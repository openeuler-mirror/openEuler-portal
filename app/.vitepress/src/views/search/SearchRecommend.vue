<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getSearchRecommend } from '@/api/api-search';
import { useI18n } from '@/i18n';

import type { SearchRecommendT } from '@/shared/@types/type-search';

const props = defineProps({
  val: {
    type: String,
    default: '',
  },
});
const recommendData = ref<SearchRecommendT[]>([]);
const emit = defineEmits(['search-click']);
const i18n = useI18n();

// ----------------------- 联想搜索 -----------------------

const queryGetSearchRecommend = (val: string) => {
  getSearchRecommend({
    query: val,
  }).then((res) => {
    recommendData.value = res?.obj?.word;
  });
};
queryGetSearchRecommend(props.val);

const handleClick = (val: string) => {
  emit('search-click', val);
};
watch(
  () => props.val,
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
defineExpose(handleSearch);
</script>
<template>
  <div v-if="recommendData.length && val" class="recommend">
    <div
      v-for="item in recommendData"
      class="recommend-item"
      @click="handleClick(item.key)"
      :key="item.key"
    >
      {{ item.key }}
    </div>
  </div>
  <div v-else-if="searchHistory.length" class="recommend">
    <span class="history">{{ i18n.common.SEARCH.BROWSEHISTORY }}</span>
    <div
      v-for="item in searchHistory"
      class="recommend-item"
      @click="handleClick(item)"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.recommend {
  padding: 12px 0;
  background-color: var(--e-color-bg2);
  .history {
    display: flex;
    padding: 0 32px 0 32px;
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    color: var(--e-color-text1);
  }
  .recommend-item {
    margin-top: 8px;
    padding: 4px 32px;
    cursor: pointer;
    color: var(--e-color-text-secondary);
    &:hover {
      color: var(--e-color-brand1);
      background-color: var(--e-color-bg1);
    }
  }
}
</style>

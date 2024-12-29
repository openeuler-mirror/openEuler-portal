<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getSearchRecommend } from '@/api/api-search';
import { useI18n } from '@/i18n';

import type { SearchRecommendT } from '@/shared/@types/type-search';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});
const recommendData = ref<SearchRecommendT[]>([]);
const emit = defineEmits(['search-click']);
const i18n = useI18n();

// ----------------------- 联想搜索 -----------------------

const queryGetSearchRecommend = (value: string) => {
  getSearchRecommend({
    query: value,
  }).then((res) => {
    recommendData.value = res?.obj?.word;
  });
};
queryGetSearchRecommend(props.value);

const handleClick = (value: string) => {
  emit('search-click', value);
};
watch(
  () => props.value,
  (value: string) => {
    if (value) {
      queryGetSearchRecommend(value);
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
defineExpose({ handleSearch });
</script>
<template>
  <div v-if="recommendData.length && value" class="recommend">
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
  padding: 16px 24px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);
  .history {
    display: flex;
    margin-bottom: 12px;
    @include tip1;
    color: var(--o-color-info3);
  }
  .recommend-item {
    & + .recommend-item {
      margin-top: 4px;
    }
    padding: 4px 8px;
    cursor: pointer;
    color: var(--o-color-info1);
    border-radius: var(--o-radius-xs);
    @include hover {
      background-color: var(--o-color-control2-light);
    }
  }
}
</style>

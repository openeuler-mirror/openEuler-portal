<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['search-history']);

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

const handleSearchHistory = (val: string) => {
  emit('search-history', val);
};

defineExpose(handleSearch);
</script>
<template>
  <div v-if="searchHistory?.length" class="search-history">
    <p>最近搜索:</p>
    <div class="history-list">
      <OTag
        v-for="item in searchHistory"
        :key="item"
        type="text"
        class="hots-list-item"
        @click="handleSearchHistory(item)"
        >{{ item }}</OTag
      >
    </div>
  </div>
</template>

<style lang="scss">
.search-history {
  margin-top: 40px;
  color: var(--o-color-text1);
  box-shadow: var(--o-shadow-l1);
  background: rgba(255, 255, 255, 0.9);
  padding: var(--o-spacing-h3);
  .history-list {
    margin-top: 24px;
    display: flex;
    gap: 16px 16px;
    background-color: var(--o-cloor-bg1);
    .o-tag {
      background-color: var(--o-color-bg4);
      color: var(--o-color-text-secondary);
      cursor: pointer;
    }
  }
}
</style>

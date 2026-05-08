<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getSearchRecommend } from '@/api/api-search';
import { getOnestepSearch } from '~@/api/api-search';
import { useI18n } from '~@/i18n';
import { useDebounceFn } from '@vueuse/core';

import type { SearchRecommendT } from '@/shared/@types/type-search';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: '',
  },
});
const recommendData = ref<SearchRecommendT[]>([]);
const onestepData = ref<SearchRecommendT[]>([]);
const emit = defineEmits(['search-click', 'onestep-click']);
const i18n = useI18n();

// ----------------------- 搜索直达 & 联想搜索 -----------------------

const querySearchDropdown = useDebounceFn((value: string) => {
  getSearchRecommend({
    query: value,
    lang: props.lang,
  }).then((res) => {
    recommendData.value = res?.obj?.word ?? [];
  });
  getOnestepSearch({
    query: value,
    lang: props.lang,
  }).then((res) => {
    onestepData.value = res?.obj?.word ?? [];
  });
}, 300);

if (props.value) querySearchDropdown(props.value);

const highlightText = (text: string) => {
  const keyword = props.value.trim();
  if (!keyword) return [{ text, match: false }];
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts: { text: string; match: boolean }[] = [];
  let lastIndex = 0;
  const regex = new RegExp(escaped, 'gi');
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push({ text: text.slice(lastIndex, m.index), match: false });
    parts.push({ text: m[0], match: true });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), match: false });
  return parts;
};

const handleOnestepClick = (path: string) => {
  const url = /^https?:\/\//.test(path) ? path : `/${props.lang}${path.startsWith('/') ? '' : '/'}${path}`;
  window.open(url, '_blank');
};

const handleClick = (value: string) => {
  emit('search-click', value);
};

watch(
  () => props.value,
  (value: string) => {
    if (value) {
      querySearchDropdown(value);
    } else {
      recommendData.value = [];
      onestepData.value = [];
    }
  }
);

// ----------------------- 历史搜索记录 -----------------------
const searchHistory = ref<string[]>([]);

const loadSearchHistory = () => {
  const history = localStorage.getItem('search-history');
  if (history) {
    searchHistory.value = JSON.parse(history);
  }
};
loadSearchHistory();
const handleSearch = (searchValue: string) => {
  if (searchValue && Array.isArray(searchHistory.value)) {
    searchHistory.value.unshift(searchValue);
    searchHistory.value = Array.from(new Set(searchHistory.value));
    if (searchHistory.value.length > 6) {
      searchHistory.value.pop();
    }
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value));
  }
};
defineExpose({ handleSearch });
</script>
<template>
  <template v-if="value">
    <div class="recommend">
      <div v-if="onestepData.length">
        <div class="search-onestep">
          <div class="section-title">{{ i18n.header.SEARCH.ONESTEP }}</div>
          <div
            v-for="item in onestepData"
            class="recommend-item"
            @click="handleOnestepClick(item.path as string)"
            :key="item.key"
          >
            <template v-for="part in highlightText(item.key)" :key="part.text + part.match"
              ><span :class="{ 'highlight-keyword': part.match }">{{ part.text }}</span></template
            >
            <div class="onestep-tag">{{ item.type }}</div>
          </div>
        </div>
        <div class="split-line"></div>
      </div>
      <div class="search-suggest">
        <div class="section-title">{{ i18n.header.SEARCH.SUGGEST }}</div>
        <template v-if="recommendData.length">
          <div
            v-for="item in recommendData"
            class="recommend-item"
            @click="handleClick(item.key)"
            :key="item.key"
          >
            <template v-for="part in highlightText(item.key)" :key="part.text + part.match"
              ><span :class="{ 'highlight-keyword': part.match }">{{ part.text }}</span></template
            >
          </div>
        </template>
        <div v-else class="no-data">{{ i18n.header.SEARCH.NO_DATA }}</div>
      </div>
    </div>
  </template>
  <template v-else-if="searchHistory.length">
    <div class="recommend">
      <span class="history">{{ i18n.header.SEARCH.BROWSEHISTORY }}</span>
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
</template>

<style scoped lang="scss">
.recommend {
  padding: var(--o-gap-4);
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);

  .search-onestep {
    & .recommend-item {
      display: flex;
      align-items: center;
      white-space: pre-wrap;
    }
  }

  .history {
    display: flex;
    margin-bottom: 12px;
    color: var(--o-color-info3);
    @include tip1;
  }

  .section-title {
    @include tip1;
    color: var(--o-color-info3);
    font-weight: 400;
    margin-bottom: var(--o-gap-4);
  }

  .recommend-item {
    padding: 4px 8px;
    cursor: pointer;
    color: var(--o-color-info2);
    border-radius: var(--o-radius-xs);
    @include tip1;

    &:hover {
      background-color: var(--o-color-control2-light);
    }

    &:active {
      background-color: var(--o-color-control3-light);
    }

    .onestep-tag {
      @include tip2;
      height: 20px;
      display: inline;
      padding: 1px 8px;
      border-radius: 4px;
      font-weight: 400;
      margin-left: 8px;
      border: 1px solid var(--o-color-control4);
    }

    .highlight-keyword {
      color: var(--o-color-primary1);
      font-weight: 600;
    }
  }

  .no-data {
    @include tip2;
    color: var(--o-color-info3);
    padding: 0 8px;
  }
}

.split-line {
  background: var(--o-color-control4);
  width: 100%;
  height: 1px;
  margin: var(--o-gap-4) 0;
}
</style>

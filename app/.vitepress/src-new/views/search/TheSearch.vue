<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';

import { getSearchData, getSearchCount, getRelevant } from '~@/api/api-search';

import communityVersionData from '~@/data/download/download';

import type { SearchCountResItemT, AppItemT } from '~@/@types/type-search';
import { getSoftwareDocs } from '~@/api/api-search';

import { useSearchValue } from '~@/stores/search';
import { useCookieStore } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import { uniqueId } from '@/shared/utils';
import { oa } from '@/shared/analytics';
import { getUrlParam } from '~@/utils/common';

import SearchBanner from './SearchBanner.vue';
import SearchResult from './SearchResult.vue';

import { moduleMap } from '~@/data/search';

const { locale, t } = useLocale();
// 当前选择类型
const currentTab = ref('all');
// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 搜索内容
const searchValue = ref('');
const currentSearchVal = ref('');

const searchBannerRef = ref();

const { lePadV } = useScreen();

const isPageCountChange = ref(true);

// 接收搜索数量的数据
const searchTypeCount = ref<SearchCountResItemT[]>([]);
const unMatchedCategory = ref([]);

const searchType = ref('');
// 排序方式
const activeSort = ref('');

const sortOptions = computed(() => {
  return [
    {
      value: '',
      label: t('search.sortCorrelation'),
    },
    {
      value: 'desc',
      label: t('search.sortTime'),
    },
  ];
});

// 一级导航变化，高亮到二级导航第一个
watch(
  () => currentTab.value,
  () => {
    let res = '';
    if (moduleMap.get(currentTab.value)?.subModules) {
      res =
        categorizedData.value[currentTab.value].subModules.find(
          (item) => item.doc_count !== 0
        )?.key || currentTab.value;
    } else {
      res = currentTab.value;
    }
    if (res === 'other') {
      res = [...unMatchedCategory.value, 'other'].join(',');
      docParams.value.limit = [
        {
          type: 'packages',
          version: activeVersion.value,
        },
      ];
    }
    searchType.value = res === 'all' ? '' : res;
    // 其他类型处理
    searchAll();
  }
);

// 搜索结果参数
const docParams = computed(() => {
  return {
    keyword: searchValue.value,
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: locale.value,
    type: searchType.value,
    sort: activeSort.value,
    limit: [
      {
        type: currentTab.value || 'docs',
        version: activeVersion.value,
      },
    ],
  };
});

// 获取 type 数量
const countParams = computed(() => {
  return {
    keyword: searchValue.value,
    lang: locale.value,
    docsVersion: activeVersion.value,
    limit: [
      {
        type: 'docs',
        version: activeVersion.value,
      },
      {
        type: 'packages',
        version: activeVersion.value,
      },
    ],
  };
});

const versionList = ref<string[]>([]);

// 接收获取的搜索数据
const searchResultList: any = ref([]);
// 接收软件包数据
const softwareList = ref<AppItemT[]>([]);
// 总数据数量
const total = computed(() => {
  if (categorizedData.value[currentTab.value]?.subModules) {
    return categorizedData.value[currentTab.value]?.subModules.find(
      (item) => item.key === searchType.value
    )?.doc_count;
  }
  return categorizedData.value[currentTab.value].total;
});

// 关联词
const suggestList = ref([]);
//
const activeVersion = ref('');

// cookie
const cookieStore = useCookieStore();

function getVersionTag() {
  versionList.value = communityVersionData[locale.value].COMMUNITY_LIST.reduce(
    (versions, currentValue) => {
      return [...versions, currentValue.VERSION];
    },
    [] as string[]
  );
  activeVersion.value = versionList.value[0];
}

// 点击搜索框的删除图标
function clearSearchInput() {
  searchValue.value = '';
}

function queryGetSoftware() {
  softwareList.value = [];
  getSoftwareDocs({
    keyword: searchValue.value,
    keywordType: 'name',
    pageNum: 1,
    pageSize: 6,
    dataType: 'all',
  }).then((res) => {
    softwareList.value = res?.data?.all;
  });
}
// 获取搜索结果各类型的数量
async function queryGetSearchCount() {
  if (!activeVersion.value) {
    countParams.value.limit = [];
  }
  getSearchCount(countParams.value).then((res) => {
    if (res?.obj?.total && res?.obj?.total[0]) {
      searchTypeCount.value = res.obj.total;
      getSussageData();
    } else {
      searchTypeCount.value = [];
    }
  });
}
// 联想搜索
function getSussageData() {
  getRelevant(docParams.value).then((res) => {
    suggestList.value = res?.obj?.suggestList || [];
  });
}
// 获取搜索结果的数据
const isLoading = ref(true);
// 获取搜索结果
const queryGetSearchData = () => {
  isLoading.value = true;
  // 版本为全部时 limit 不传
  if (!activeVersion.value) {
    docParams.value.limit = [];
  }
  // tab 为全部时加下版本搜索限制
  if (activeVersion.value) {
    if (currentTab.value === 'all') {
      docParams.value.limit = [
        {
          type: 'docs',
          version: activeVersion.value,
        },
        {
          type: 'packages',
          version: activeVersion.value,
        },
      ];
    }
    if (currentTab.value === 'other') {
      docParams.value.limit = [
        {
          type: 'packages',
          version: activeVersion.value,
        },
      ];
    }
  }
  getSearchData(docParams.value)
    .then((res) => {
      if (res.status === 200 && res.obj?.records[0]) {
        if (lePadV.value && isPageCountChange.value) {
          searchResultList.value.push(...res.obj.records);
        } else {
          searchResultList.value = res.obj.records;
        }
      } else {
        searchResultList.value = [];
      }
    })
    .finally(() => {
      isPageCountChange.value = false;
      isLoading.value = false;
    });
};
// 获取搜索结果的所有内容
function searchAll(valueChange?: boolean) {
  if (searchValue.value) {
    currentPage.value = 1;
    if (cookieStore.isAllAgreed) {
      reportSearch(searchValue.value);
    }
    // 是否重置tab
    if (valueChange) {
      currentTab.value = 'all';
    }
    searchBannerRef.value.searchRecommendRef?.handleSearch(searchValue.value);
    queryGetSearchCount();
    queryGetSearchData();
    queryGetSoftware();
    handleSelectChange(searchValue.value);
  } else {
    clearSearchInput();
  }
}
let SEARCH_EVENT_ID = uniqueId();
const reportSearch = (keyword: string) => {
  SEARCH_EVENT_ID = uniqueId();
  oa.report('searchValue', () => {
    return {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
    };
  });
};

function handleSelectChange(val: string) {
  history.pushState(null, '', `?search=${encodeURIComponent(val)}`);
}

onMounted(() => {
  getVersionTag();
  if (getUrlParam('search')) {
    searchValue.value = getUrlParam('search');
    currentSearchVal.value = searchValue.value;
  }
  searchAll();
});

// ------------------------  导航分类 --------------------------
const categorizedData = computed(() => {
  const result = {};
  unMatchedCategory.value = [];

  // 初始化分类
  moduleMap.forEach((rule, category) => {
    result[category] = {
      label: rule.label,
      total: 0,
      value: category,
      ...(rule.subModules ? { subModules: [] } : {}), // 仅在存在 subModules 时添加
    };
  });

  // 遍历数据，归类到对应分类
  searchTypeCount.value.forEach(({ key, doc_count }) => {
    let matchedCategory;
    moduleMap.forEach((rule, category) => {
      if (
        category === key ||
        (rule.subModules && rule.subModules.includes(key))
      ) {
        matchedCategory = category;
      }
    });

    // 如果没有匹配到分类，归入 "others"
    if (!matchedCategory) {
      matchedCategory = 'other';
      unMatchedCategory.value.push(key);
    }

    // 更新分类结果
    result[matchedCategory].total += doc_count;
    if (result[matchedCategory].subModules) {
      result[matchedCategory].subModules.push({ key, doc_count });
    }
  });

  // 对每个分类的 subModules 进行排序
  Object.keys(result).forEach((category) => {
    const rule = moduleMap.get(category);
    if (rule && rule.subModules && result[category].subModules) {
      result[category].subModules.sort((a, b) => {
        return rule.subModules.indexOf(a.key) - rule.subModules.indexOf(b.key);
      });
    }
  });
  return result;
});

const handleSearchTypeChange = () => {
  searchAll();
};
const pageSizeChange = () => {
  currentPage.value = 1;
  searchAll();
};

const searchStore = useSearchValue();

// 移动端导航搜索事件
searchStore.$subscribe((mutation, state) => {
  searchValue.value = state.searchValue;
  searchAll(true);
});

// 移动端翻页
// 移动端滑动加载事件
const getMoreDataMo = () => {
  if (
    lePadV.value &&
    currentPage.value < Math.ceil(total.value / pageSize.value) &&
    !isPageCountChange.value
  ) {
    isPageCountChange.value = true;
    currentPage.value++;
    queryGetSearchData();
  }
};
</script>
<template>
  <div v-scroll-bottom="getMoreDataMo" class="search">
    <SearchBanner
      class="search-banner"
      v-model="searchValue"
      v-model:current-tab="currentTab"
      @search="searchAll"
      ref="searchBannerRef"
      :suggest-list="suggestList"
      :tab-data="categorizedData"
    />
    <SearchResult
      class="search-result"
      v-model:search-type="searchType"
      v-model:active-version="activeVersion"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:active-sort="activeSort"
      @update:page-size="pageSizeChange"
      @update:search-type="handleSearchTypeChange"
      @update:current-page="queryGetSearchData"
      @update:active-sort="queryGetSearchData"
      @update:active-version="searchAll()"
      :search-result-list="searchResultList"
      :search-value="searchValue"
      :sub-modules="categorizedData[currentTab].subModules"
      :search-val="searchValue"
      :version-list="versionList"
      :loading="isLoading"
      :software-list="softwareList"
      :search-type-count="searchTypeCount"
      :total="total"
      :sort-options="sortOptions"
    />
  </div>
</template>
<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - var(--layout-header-height) - 114px);
  background-color: var(--o-color-fill2);
  @include respond-to('<=pad_v') {
    background-color: var(--o-color-fill1);
  }
  .search-banner {
    @include respond-to('<=pad_v') {
      background: var(--o-color-fill2) !important;
      box-shadow: var(--o-shadow-1);
      position: sticky;
      top: 48px;
      z-index: 9;
    }
  }
}
</style>

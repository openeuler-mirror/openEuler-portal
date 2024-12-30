<script setup lang="ts">
import { computed, type PropType, ref, watch } from 'vue';

import { useData } from 'vitepress';
import { oa } from '@/shared/analytics';

import { useVModels } from '@vueuse/core';
import { moduleMap, subModuleMap } from '~@/data/search';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import {
  OIcon,
  ORadio,
  ORadioGroup,
  OToggle,
  OTag,
  ODivider,
  OPagination,
  OSelect,
  OOption,
  useLoading,
} from '@opensig/opendesign';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import SearchFeedback from './SearchFeedback.vue';
import SearchDownloadZone from './SearchDownloadZone.vue';
import SearchSoftwareZone from './SearchSoftwareZone.vue';
import SearchDownloadAggre from './SearchDownloadAggre.vue';

import { getOSType } from '@/shared/download';
import { uniqueId } from '@/shared/utils';
import { SCENARIO_LIST, archMap } from '~@/data/download/download';

import { useCookieStore } from '@/stores/common';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

import NotFound from '@/NotFound.vue';

const props = defineProps({
  searchResultList: {
    type: Object,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
  subModules: {
    type: Object,
    default: () => {},
  },
  searchType: {
    type: String,
    default: '',
  },
  searchVal: {
    type: String,
    default: '',
  },
  total: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 0,
  },
  searchTypeCount: {
    type: Array,
    default: () => {
      return [];
    },
  },
  searchValue: {
    type: String,
    default: '',
  },
  versionList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  softwareList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  activeVersion: {
    type: String,
    default: '',
  },
});

const emits = defineEmits([
  'update:searchType',
  'update:currentPage',
  'update:pageSize',
  'update:activeVersion',
]);

const { searchType, currentPage, pageSize, activeVersion } = useVModels(
  props,
  emits
);

const { site } = useData();
const { locale } = useLocale();
const cookieStore = useCookieStore();
const { lePadV } = useScreen();

const contentRef = ref();

const loadingFn = useLoading(
  {
    mask: false,
  },
  contentRef
);

watch(
  () => props.loading,
  (val: boolean) => {
    loadingFn.toggle(val);
  }
);

function goLink(data: any, index: number) {
  let { path } = data;
  let search_result_url = '/' + path;

  if (data.type === 'docs') {
    // hugo 编译 路由空格会被替换为 -
    path = path.replaceAll(' ', '-');
    search_result_url = site.value.themeConfig.docsUrl + '/' + path + '.html';
  } else if (data.type === 'forum') {
    search_result_url = `${site.value.themeConfig.forumUrl}${path}`;
  } else if (path.startsWith('https')) {
    search_result_url = path;
  } else {
    data.type === 'news' || data.type === 'blog'
      ? (search_result_url = `${search_result_url}.html`)
      : '';
    search_result_url = location.origin + search_result_url;
  }
  if (cookieStore.isAllAgreed) {
    reportSelectSearchResult(data, index, search_result_url, props.searchVal);
  }
  if (cookieStore.isAllAgreed) {
  }
  window.open(search_result_url);
}
//
const downloadZoneData = computed(() => {
  return props.searchResultList.find((item) => item.type === 'release');
});
const downloadAggre = computed(() => {
  return props.searchResultList.find((item) => item.type === 'aggre');
});
//
// ----------------------- 埋点相关 ----------------------------
let SEARCH_EVENT_ID = uniqueId();

const reportSelectSearchResult = (
  data: any,
  index: number,
  path: string,
  keyword: string
) => {
  const searchKeyObj = {
    search_tag: data.type,
    search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
    search_result_total_num: props.total,
    search_result_url: path,
  };

  oa.report('selectSearchResult', () => {
    return {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
      ...(data || {}),
      ...searchKeyObj,
    };
  });
};

const verticalPadding = computed(() => {
  if (lePadV.value) {
    return ['16px', '24px'];
  } else {
    return ['40px', '72px'];
  }
});

const COUNT_PER_PAGE = [12, 18, 24, 36];
</script>
<template>
  <ContentWrapper class="search-result" :vertical-padding="verticalPadding">
    <ORadioGroup v-if="subModules?.length" v-model="searchType">
      <ORadio
        v-for="subModule in subModules"
        :key="subModule.key"
        :value="subModule.key"
      >
        <template #radio="{ checked }">
          <OToggle :checked="checked">
            {{ subModuleMap.get(subModule.key)?.label[locale] }}
          </OToggle>
        </template>
      </ORadio>
    </ORadioGroup>
    <OSelect
      v-if="
        !searchType || searchType === 'docs' || searchType.includes('packages')
      "
      v-model="activeVersion"
      placeholder="Select"
      optionPosition="br"
      optionWrapClass="mirror-select"
    >
      <OOption :label="$t('search.allVersion')" value=""> </OOption>
      <OOption
        v-for="(item, index) in versionList"
        :key="item.key"
        :label="item.key"
        :value="item.key"
      >
      </OOption>
    </OSelect>
    <div class="search-content">
      <!-- 搜索内容列表 -->
      <div ref="contentRef" class="content-box">
        <div v-if="searchResultList.length" class="content-list">
          <div
            v-if="
              (!searchType && currentPage === 1 && softwareList.length) ||
              (!searchType && currentPage === 1 && downloadZoneData) ||
              (!searchType && currentPage === 1 && downloadAggre)
            "
            class="search-zone"
          >
            <SearchSoftwareZone
              v-if="softwareList.length"
              :software-zone="softwareList"
              :search-value="searchValue"
            />
            <SearchDownloadAggre v-if="downloadAggre" />
            <SearchDownloadZone
              v-if="downloadZoneData"
              :download-zone="downloadZoneData"
            />
          </div>
          <template v-for="(item, index) in searchResultList" :key="item.id">
            <div
              v-if="item.type !== 'release' || item.type !== 'aggre'"
              class="search-card"
            >
              <h3
                v-dompurify-html="item.title"
                @click="goLink(item, index)"
              ></h3>
              <p
                v-dompurify-html="
                  item.type === 'service'
                    ? item.secondaryTitle || ''
                    : item.textContent
                "
                class="detail"
                @click="goLink(item, index)"
              ></p>
              <div v-if="item.arch && item.scenario" class="tag-box">
                <OTag>
                  {{ archMap.get(item.arch)?.label || item.arch }}
                </OTag>
                <OTag>
                  {{ SCENARIO_LIST.get(item.scenario)?.label || item.scenario }}
                </OTag>
                <OTag
                  v-if="
                    getOSType(
                      item.path.split('/').at(-1),
                      item.version,
                      item.arch
                    )
                  "
                >
                  {{
                    getOSType(
                      item.path.split('/').at(-1),
                      item.version,
                      item.arch
                    )
                  }}
                </OTag>
              </div>
              <div class="from">
                <span>{{ $t('search.from') }}</span>
                <div class="breadcrumb">
                  <div
                    v-for="(breadCrumb, index) in subModuleMap.has(item.type)
                      ? subModuleMap.get(item.type)?.from[locale]
                      : [moduleMap.get(item.type)?.label[locale] || item.type]"
                    :title="breadCrumb"
                    class="breadcrumb-item-label"
                  >
                    {{ breadCrumb?.replace('{version}', item.version) }}
                    <OIcon
                      v-if="
                        index + 1 !==
                        (subModuleMap.has(item.type)
                          ? subModuleMap.get(item.type)?.from[locale].length
                          : 1)
                      "
                    >
                      <IconChevronRight />
                    </OIcon>
                  </div>
                </div>
              </div>
              <p v-if="item.version" class="from version">
                <span>{{ $t('search.version') }}</span>
                <span>{{ item.version }}</span>
              </p>
            </div>
          </template>
        </div>
        <NotFound
          v-else-if="!loading"
          class="nofound"
          :docs="$t('search.empty')"
        />
        <SearchFeedback
          v-if="!lePadV"
          v-show="!loading"
          size="medium"
          :keyword="searchVal"
        />
        <div
          v-show="total > COUNT_PER_PAGE[0] && !loading && !lePadV"
          class="pagination"
        >
          <OPagination
            v-model:page="currentPage"
            v-model:page-size="pageSize"
            :layout="['total', 'pagesize', 'pager', 'jumper']"
            :total="total"
            :page-sizes="COUNT_PER_PAGE"
            :show-more="true"
          />
        </div>
        <div
          v-if="
            currentPage >= Math.ceil(total / pageSize) && lePadV && !loading
          "
          class="end"
        >
          {{ $t('search.listEnd') }}
        </div>
      </div>
      <ODivider v-if="!lePadV" direction="v" />
      <SearchFeedback v-if="!lePadV" size="small" :keyword="searchVal" />
    </div>
  </ContentWrapper>
</template>
<style lang="scss" scoped>
.search-result {
  position: relative;
  width: 100%;
  .search-pagination {
    width: 100%;
    margin-top: 40px;
    @include respond-to('') {
    }
  }
  .nofound {
    min-height: min-content;
  }

  .pagination-slot {
    @include tip1;
    font-weight: 400;
  }
  .end {
    margin-top: 24px;
    color: var(--o-color-info3);
    @include text1;
    text-align: center;
  }
  .o-radio-group,
  .o-select {
    margin-bottom: 40px;
    @include respond-to('<=pad_v') {
      margin-bottom: 16px;
    }
  }
  .search-content {
    display: flex;
    .o-divider {
      height: auto;
      --o-divider-label-gap: 0 40px;
    }
    .content-box {
      position: relative;
      min-height: 400px;
      width: 100%;
      height: 100%;
      max-width: calc(100% - 2 * 40px - 1px - 300px);
      @include respond-to('<=pad_v') {
        max-width: 100%;
      }
      .content-list {
        & > div {
          & + div {
            margin-top: 40px;
            @include respond-to('<=pad_v') {
              margin-top: 16px;
            }
          }
        }
        .search-zone {
          &:empty {
            display: none;
          }
        }
        .search-card {
          &:empty {
            padding: 0;
          }
          @include respond-to('<=pad_v') {
            border-radius: var(--o-radius-xs);
            padding: 12px 16px;
            background-color: var(--o-color-fill2);
          }
          h3 {
            @include h4;
            cursor: pointer;
            color: var(--o-color-info1);
            font-weight: 500;
            :deep(span) {
              color: var(--o-color-primary1);
            }
          }
          .detail {
            cursor: pointer;
            margin-top: 8px;
            @include text2;
            color: var(--o-color-info1);
            @include text-truncate(2);
            :deep(span) {
              color: var(--o-color-primary1);
            }
          }
          .tag-box {
            .o-tag {
              & + .o-tag {
                margin-left: 8px;
              }
              --tag-bg-color: var(--o-color-fill2);
            }
          }
          .from {
            @include tip2;
            margin-top: 8px;
            display: flex;
            align-items: center;
            color: var(--o-color-info3);
          }
          .version {
            margin-top: 8px;
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 32px;
      }
    }
  }
  .exist-suggest {
    margin-top: 0;
  }
}

:deep(.breadcrumb) {
  display: flex;
  align-items: center;
  @include tip2;
  color: var(--o-color-info3);
  .breadcrumb-item-label {
    display: flex;
    align-items: center;
  }
  .o-icon {
    margin: 0 4px;
  }
}
</style>

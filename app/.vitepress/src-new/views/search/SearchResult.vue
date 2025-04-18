<script setup lang="ts">
import { computed, type PropType, ref, watch } from 'vue';

import { useData } from 'vitepress';
import { oaReport } from '@/shared/analytics';

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
import ExternalLink from '~@/components/ExternalLink.vue';

import { getOSType } from '@/shared/download';
import { uniqueId } from '@/shared/utils';
import { checkOriginLink } from '~@/utils/common';
import { SCENARIO_LIST, archMap } from '~@/data/download/download';

import type { AppItemT } from '~@/@types/type-search';

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
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    },
  },
  softwareList: {
    type: Array as PropType<AppItemT[]>,
    default: () => {
      return [];
    },
  },
  sortOptions: {
    type: Array as PropType<{ value: string; label: string }[]>,
    default: () => {
      return [];
    },
  },
  activeVersion: {
    type: String,
    default: '',
  },
  activeSort: {
    type: String,
    default: '',
  },
});

const emits = defineEmits([
  'update:searchType',
  'update:currentPage',
  'update:pageSize',
  'update:activeVersion',
  'update:activeSort',
]);

const { searchType, currentPage, pageSize, activeVersion, activeSort } =
  useVModels(props, emits);

const { locale } = useLocale();
const cookieStore = useCookieStore();
const { lePadV, lePad } = useScreen();

const contentRef = ref();

const loadingFn = useLoading(
  {
    mask: false,
  },
  contentRef
);

const sortType = ['commercialRelease', 'mail', 'news', 'blog'];

watch(
  () => props.loading,
  (val: boolean) => {
    loadingFn.toggle(val);
  }
);

const getLink = (data: any) => {
  let { path } = data;
  let search_result_url = '/' + path;

  if (data.type === 'docs') {
    // hugo 编译 路由空格会被替换为 -
    path = path.replaceAll(' ', '-');
    search_result_url = `${import.meta.env.VITE_SERVICE_DOCS_URL}/${path}.html`;
  } else if (data.type === 'forum') {
    search_result_url = `${import.meta.env.VITE_SERVICE_FORUM_URL}${path}`;
  } else if (path.startsWith('https')) {
    search_result_url = path;
  } else {
    data.type === 'news' || data.type === 'blog'
      ? (search_result_url = `${search_result_url}.html`)
      : '';
    search_result_url = location.origin + search_result_url;
  }
  return search_result_url;
};

function handleLinkClick(data: any, index: number) {
  if (cookieStore.isAllAgreed) {
    reportSelectSearchResult(data, index, getLink(data), props.searchVal);
  }
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

const reportSelectSearchResult = (data: any, index: number, path: string) => {
  const searchKeyObj = {
    search_tag: data.type,
    search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
    search_result_total_num: props.total,
    search_result_url: path,
  };
  reportSearch({
    search_event_id: SEARCH_EVENT_ID,
    target: data.title.replace(/<.+?>/g, ''),
    ...(data || {}),
    ...searchKeyObj,
    type: 'search_content',
  });
};

const verticalPadding = computed(() => {
  if (lePadV.value) {
    return ['16px', '24px'];
  } else {
    return ['40px', '72px'];
  }
});

// 专区pc 端仅在 全部tab第一页显示，移动端在全部 tab下翻页依然显示
const zoneShownCondition = computed(() => {
  return (
    !props.searchType &&
    (props.currentPage === 1 || lePadV.value) &&
    (props.softwareList.length || downloadZoneData.value || downloadAggre.value)
  );
});

const COUNT_PER_PAGE = [12, 18, 24, 36];
// 移动端搜索反馈出现位置
const MO_FEEDBACK_INDEX = 11;

const showExternalDlg = ref(false);
const externalLink = ref('');
const goSearchDetail = (href: string, index: number) => {
  const link = getLink(href);
  externalLink.value = link;
  handleLinkClick(href, index);

  if (checkOriginLink(link)) {
    window.open(link, '_blank');
  } else {
    showExternalDlg.value = true;
  }
};

const onFilterChange = (val: any) => {
  reportSearch({
    type: 'subtab',
    target: subModuleMap.get(val)?.label?.[locale.value] || val,
  });
};

const reportSearch = (data: Record<string, any>) => {
  oaReport(
    'click',
    {
      module: 'search_result',
      content: props.searchVal,
      ...data,
    },
    'search_portal'
  );
};
</script>
<template>
  <ContentWrapper class="search-result" :vertical-padding="verticalPadding">
    <div class="filter-line">
      <ORadioGroup
        @change="onFilterChange"
        v-if="subModules?.length"
        v-model="searchType"
      >
        <ORadio
          v-for="subModule in subModules"
          :key="subModule.key"
          :value="subModule.key"
        >
          <template #radio="{ checked }">
            <OToggle
              v-if="subModuleMap.get(subModule.key)?.label"
              :checked="checked"
            >
              {{ subModuleMap.get(subModule.key)?.label[locale] }}
            </OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
      <OSelect
        @change="onFilterChange"
        v-if="
          !searchType ||
          searchType === 'docs' ||
          searchType.includes('packages')
        "
        v-model="activeVersion"
        placeholder="Select"
        optionPosition="br"
      >
        <OOption :label="$t('search.allVersion')" value=""> </OOption>
        <OOption
          v-for="item in versionList"
          :key="item"
          :label="item"
          :value="item"
        >
        </OOption>
      </OSelect>
      <OSelect
        @change="onFilterChange"
        v-if="sortType.includes(searchType)"
        v-model="activeSort"
        placeholder="Select"
        class="sort-select"
        optionPosition="br"
      >
        <OOption
          v-for="item in sortOptions"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        >
        </OOption>
      </OSelect>
    </div>
    <div class="search-content">
      <!-- 搜索内容列表 -->
      <div ref="contentRef" class="content-box">
        <div v-if="searchResultList.length" class="content-list">
          <div v-if="zoneShownCondition" class="search-zone">
            <SearchDownloadAggre v-if="downloadAggre && !downloadZoneData" />
            <SearchDownloadZone
              v-if="downloadZoneData"
              :download-zone="downloadZoneData"
            />
            <SearchSoftwareZone
              v-if="softwareList.length"
              :software-zone="softwareList"
              :search-value="searchValue"
            />
          </div>
          <template v-for="(item, index) in searchResultList" :key="item.id">
            <template v-if="index === MO_FEEDBACK_INDEX && lePadV">
              <SearchFeedback
                class="mo-feedback"
                size="medium"
                :keyword="searchValue"
              />
            </template>
            <div
              v-if="
                (item.type !== 'release' || searchType.includes('other')) &&
                item.type !== 'aggre'
              "
              class="search-card"
            >
              <div @click="goSearchDetail(item, index)">
                <h3
                  v-dompurify-html="
                    item.title.replace(
                      '-meetings',
                      ` ${$t('search.sigMeeting')}`
                    )
                  "
                ></h3>
                <p
                  v-dompurify-html="
                    item.type === 'service'
                      ? item.secondaryTitle || ''
                      : item.textContent
                  "
                  class="detail"
                ></p>
              </div>

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
              <p
                v-if="
                  item.version && (searchType === 'docs' || searchType === '')
                "
                class="from version"
              >
                <span>{{ $t('search.version') }}</span>
                <span>{{
                  item.version === 'common'
                    ? $t('search.common')
                    : item.version
                }}</span>
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
          v-if="!lePadV && total >= 10"
          size="medium"
          :keyword="searchVal"
        />
        <div v-show="total > COUNT_PER_PAGE[0] && !lePadV" class="pagination">
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
      <ODivider v-if="!lePad" direction="v" />
      <SearchFeedback
        class="right-feed-back"
        v-if="!lePad"
        size="small"
        :keyword="searchVal"
      />
    </div>

    <!-- 外链弹窗提示 -->
    <ExternalLink
      v-if="showExternalDlg"
      :href="externalLink"
      @change="showExternalDlg = false"
    />
  </ContentWrapper>
</template>
<style lang="scss" scoped>
.search-result {
  position: relative;
  width: 100%;
  --o-divider-label-gap: 40px;
  --feed-back-width: 300px;
  .search-pagination {
    width: 100%;
    margin-top: 40px;
  }
  .nofound {
    min-height: min-content;
  }
  .mo-feedback {
    background-color: var(--o-color-fill2);
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
  .filter-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    max-width: calc(
      100% - 2 * var(--o-divider-label-gap) - 1px - var(--feed-back-width)
    );
    &:empty {
      margin: 0;
    }
    @include respond-to('pad_h') {
      max-width: 100%;
      margin-bottom: 32px;
    }
    @include respond-to('<=pad_v') {
      flex-direction: column;
      max-width: 100%;
      margin-bottom: 16px;
      .o-select {
        margin-top: 16px;
      }
    }
  }
  .o-select {
    width: 180px;
    @include respond-to('<=pad_v') {
      width: 150px;
    }
  }
  .sort-select {
    width: 192px;
    @include respond-to('<=pad_v') {
      width: 150px;
    }
  }
  .o-radio-group {
    @include respond-to('<=pad_v') {
      gap: 8px;
      .o-radio + .o-radio {
        margin-left: 0;
      }
      .o-toggle {
        --toggle-bg-color: var(--o-color-fill2);
        --toggle-bg-color-hover: var(--o-color-fill2);
      }
    }
  }
  .search-content {
    display: flex;
    .o-divider {
      height: auto;
      --o-divider-label-gap: 0 40px;
    }
    .right-feed-back {
      min-width: var(--feed-back-width);
    }
    .content-box {
      position: relative;
      min-height: 400px;
      width: 100%;
      height: 100%;
      max-width: calc(
        100% - 2 * var(--o-divider-label-gap) - 1px - var(--feed-back-width)
      );
      @include respond-to('<=pad') {
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
          display: flex;
          flex-direction: column;
          gap: 16px;
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
            @include text1;
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

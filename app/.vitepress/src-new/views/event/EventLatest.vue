<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed } from 'vue';
import {
  ORadioGroup,
  ORadio,
  OToggle,
  OInput,
  OIcon,
  ORow,
  OCol,
  OCard,
  OPagination,
  OFigure,
  OTag,
  OButton,
  ODivider,
  ODialog,
} from '@opensig/opendesign';
import { useRouter } from 'vitepress';

import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { EventSeries, EventState, MEETUP_DATA } from '~@/data/activity/list';

import { useDebounceSearch } from '~@/composables/useDebounceSearch';

import { changeTimeStamp } from '~@/utils/common';

import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconDeveloperTag from '~icons/event/icon-developer-tag.svg';
import IconFilter from '~icons/app-new/icon-filter.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

interface LabelT {
  zh: string;
  en: string;
}
interface OptionT {
  value: string | number;
  label: LabelT;
}

const { lePadV } = useScreen();
const { t, isZh, locale } = useLocale();
const router = useRouter();

// -------------------- 活动系列 --------------------
const seriesOptions = ref<OptionT[]>([]);
EventSeries.forEach((item) => {
  seriesOptions.value.push({
    value: item.value,
    label: {
      zh: item.label.zh,
      en: item.label.en,
    },
  });
});

const clearCheckedSeries = (checked: boolean) => {
  if (checked) {
    setTimeout(() => {
      params.series = '';
    });
  }
};

// -------------------- 活动状态 --------------------
const stateOptions = ref<OptionT[]>([]);
EventState.forEach((item) => {
  stateOptions.value.push({
    value: item.value,
    label: {
      zh: item.label.zh,
      en: item.label.en,
    },
  });
});

const clearCheckedState = (checked: boolean) => {
  if (checked) {
    setTimeout(() => {
      params.state = 0;
    });
  }
};

// -------------------- 搜索 input字段做防抖处理 -------------------
const updataKeyword = (val: string) => {
  params.keyword = val;
};
const debounceTextFn = useDebounceSearch(updataKeyword, 300);
const debounceSearch = computed({
  get() {
    return params.keyword;
  },
  set(val) {
    debounceTextFn(val as string);
  },
});

// -------------------- 列表数据 -------------------
const params = reactive({
  series: '',
  keyword: '',
  state: 0,
  currentPage: 1,
  pageSize: 12,
});
const total = ref(0);

const COUNT_PER_PAGE = [12, 24, 36, 48];

// 本月及以后最新活动列表
const latestList = ref<any>([]);
const currentList = ref<any>([]);

const activityList = () => {
  latestList.value = MEETUP_DATA[locale.value];
  params.currentPage = 1;
  params.pageSize = 12;
  // 活动系列
  const seriesList = latestList.value.filter((item) => {
    if (params.series) {
      return item.series === params.series;
    }
    return item;
  });
  // 活动状态
  const stateList = seriesList.filter((item) => {
    if (params.state) {
      return item.activity_type === params.state;
    }
    return item;
  });
  // 搜索
  const seachList = stateList.filter(
    (item) =>
      item.title.includes(params.keyword) || item.city.includes(params.keyword)
  );
  currentList.value = seachList;
  total.value = seachList?.length;
};

onMounted(() => {
  activityList();
});
watch(
  () => params,
  () => {
    activityList();
  },
  {
    deep: true,
  }
);

// -------------------- 分页 --------------------
const onPaginationChange = (val: { page: number; pageSize: number }) => {
  // 当 pageSize 变化时将page_num 置为1
  if (val.pageSize !== params.currentPage) {
    params.currentPage = 1;
  } else {
    params.currentPage = val.page;
  }
  params.pageSize = val.pageSize;
  paramsGetSalon();
};

// 精彩回顾下展示列表
const goDetail = (item: {
  id: number;
  windowOpen: string;
  isAdditional: boolean;
}) => {
  if (item.windowOpen) {
    window.open(item.windowOpen);
  } else {
    router.go(
      '/' +
        locale.value +
        `/interaction/event-list/detail/?id=${item.id}&isAdditional=true`
    );
  }
};

// -------------------- 移动端 --------------------
const filterVisible = ref(false);
const seriesValue = ref('');
const stateValue = ref(0);

const handleReset = () => {
  params.series = '';
  params.state = 0;
  filterVisible.value = false;
};
const handleConfirm = () => {
  params.series = seriesValue.value;
  params.state = stateValue.value;
  filterVisible.value = false;
};
</script>

<template>
  <AppSection :title="t('eventOverview.list')">
    <div v-if="!lePadV" class="filter-card">
      <div class="filter">
        <p class="filter-title">{{ t('eventOverview.series') }}</p>
        <ORadioGroup
          v-model="params.series"
          :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
        >
          <ORadio
            v-for="option in seriesOptions"
            :key="option.value"
            :value="option.value"
          >
            <template #radio="{ checked }">
              <OToggle
                @click="clearCheckedSeries(checked)"
                :class="{ active: checked }"
                :checked="checked"
              >
                {{ isZh ? option.label.zh : option.label.en }}
              </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <div class="filter">
        <p class="filter-title">{{ t('eventOverview.state') }}</p>
        <ORadioGroup
          v-model="params.state"
          :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
        >
          <ORadio
            v-for="option in stateOptions"
            :key="option.value"
            :value="option.value"
          >
            <template #radio="{ checked }">
              <OToggle
                @click="clearCheckedState(checked)"
                :class="{ active: checked }"
                :checked="checked"
              >
                {{ isZh ? option.label.zh : option.label.en }}
              </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <div class="search-box">
        <OInput
          v-model="debounceSearch"
          :placeholder="t('eventOverview.search')"
          size="large"
          clearable
          class="input-search"
        >
          <template #prefix>
            <OIcon><IconSearch /></OIcon>
          </template>
        </OInput>
      </div>
    </div>
    <div v-else class="filter-card-mb">
      <OInput
        v-model="debounceSearch"
        :placeholder="t('eventOverview.search')"
        size="large"
        class="input-search"
      >
        <template #prefix>
          <OIcon><IconSearch /></OIcon>
        </template>
      </OInput>
      <div class="filter-btn-mb">
        <OButton
          variant="text"
          color="normal"
          class="filter-btn"
          @click="filterVisible = true"
        >
          <span>{{ t('eventOverview.filter') }}</span>
          <template #suffix>
            <OIcon><IconFilter /></OIcon>
          </template>
        </OButton>
      </div>
    </div>
    <ORow
      v-if="currentList.length"
      :gap="lePadV ? '0 12px' : '32px 32px'"
      wrap="wrap"
    >
      <OCol
        :flex="lePadV ? ' 0 0 100%' : '0 0 25%'"
        v-for="(item, i) in currentList"
        :key="i"
      >
        <OCard class="event-item" @click="goDetail(item)">
          <template #cover>
            <OFigure
              hoverable
              :src="lePadV ? item.posterImgMb : item.posterImg"
            >
              <div class="tags">
                <OTag v-if="item?.series" class="series-tag">
                  <OIcon><IconDeveloperTag /></OIcon>
                  <span class="tag-text">
                    {{ EventSeries.get(item?.series)?.label[locale] }}
                  </span>
                </OTag>

                <OTag
                  v-if="item?.activity_type"
                  :class="{ 'tag-ongoing': item?.activity_type === 2 }"
                >
                  <span class="tag-text">
                    {{ EventState.get(item?.activity_type)?.label[locale] }}
                  </span>
                </OTag>
              </div>
              <div class="card-content">
                <p class="title">{{ item.title }}</p>
                <div class="card-bottom">
                  <p class="date">
                    {{ changeTimeStamp(new Date(item.date).getTime()) }}
                  </p>
                  <ODivider v-if="lePadV" direction="v" class="divider-mb" />
                  <p class="city">{{ item.city }}</p>
                </div>
              </div>
            </OFigure>
          </template>
        </OCard>
      </OCol>
    </ORow>
    <ResultEmpty
      v-else
      class="nofound"
      :description="t('eventOverview.empty')"
    />

    <!-- 分页 -->
    <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
      <OPagination
        :total="total"
        :page="params.currentPage"
        :page-size="params.pageSize"
        :page-sizes="COUNT_PER_PAGE"
        :layout="['total', 'jumper', 'pager', 'pagesize']"
        :show-more="false"
        @change="onPaginationChange"
      ></OPagination>
    </div>
    <ODialog
      v-model:visible="filterVisible"
      size="medium"
      :style="{ '--dlg-radius': '4px' }"
      class="filter-body"
    >
      <template #header>
        <span class="del-title">{{ t('eventOverview.filter') }}</span>
      </template>
      <div class="dlg-body">
        <div class="filter">
          <p class="filter-title">{{ t('eventOverview.series') }}</p>
          <ORadioGroup
            v-model="seriesValue"
            :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
          >
            <ORadio
              v-for="option in seriesOptions"
              :key="option.value"
              :value="option.value"
            >
              <template #radio="{ checked }">
                <OToggle
                  @click="clearCheckedSeries(checked)"
                  :class="{ active: checked }"
                  :checked="checked"
                >
                  {{ isZh ? option.label.zh : option.label.en }}
                </OToggle>
              </template>
            </ORadio>
          </ORadioGroup>
        </div>
        <ODivider class="divider-filter" />
        <div class="filter">
          <p class="filter-title">{{ t('eventOverview.state') }}</p>
          <ORadioGroup
            v-model="stateValue"
            :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
          >
            <ORadio
              v-for="option in stateOptions"
              :key="option.value"
              :value="option.value"
            >
              <template #radio="{ checked }">
                <OToggle
                  @click="clearCheckedState(checked)"
                  :class="{ active: checked }"
                  :checked="checked"
                >
                  {{ isZh ? option.label.zh : option.label.en }}
                </OToggle>
              </template>
            </ORadio>
          </ORadioGroup>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <OButton variant="text" @click="handleReset">{{
            t('eventOverview.reset')
          }}</OButton>
          <ODivider direction="v" class="divider-btn" />
          <OButton variant="text" @click="handleConfirm">{{
            t('eventOverview.confirm')
          }}</OButton>
        </div>
      </template>
    </ODialog>
  </AppSection>
</template>

<style lang="scss" scoped>
.app-section {
  --o-gap-section: 40px;

  @include respond-to('<=laptop') {
    --o-gap-section: 32px;
  }
  @include respond-to('phone') {
    --o-gap-section: 16px;
  }
}
.filter-card {
  background-color: var(--o-color-fill2);
  padding: 24px 32px;
  border-radius: var(--o-radius-xs);
}
.filter {
  display: flex;
  align-items: flex-start;
}
.filter + .filter {
  margin-top: 16px;
}

.filter-title {
  min-width: 64px;
  color: var(--o-color-info1);
  font-weight: 500;
  margin-right: 32px;
  margin-top: 4px;
  @include text1;
}

.o-toggle {
  --toggle-size: 32px;
  --toggle-padding: 3px 15px;
  --toggle-radius: 4px;
  max-height: 32px;
  color: var(--o-color-info1);
  border: 1px solid var(--o-color-control2-light);
  background-color: var(--o-color-control2-light);
  @include text1;
}
.o-radio + .o-radio {
  margin-left: 0;
}

.active {
  background-color: transparent;
  color: var(--o-color-primary1);
  border: 1px solid var(--o-color-primary1);
}

.search-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .input-search {
    :deep(.o_box) {
      width: 320px;
    }
    :deep(.o_input) {
      width: 100%;
    }
  }
}

.o-row {
  margin-top: 32px;
}

.tags {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
  width: calc(100% - 8px);

  .o-tag {
    --tag-bg-color: var(--o-color-mask1);
    --tag-bd-color: var(--o-color-mask1);
    backdrop-filter: blur(6px);
    border: none;
    --tag-color: var(--o-color-white);

    :deep(.o-tag-label) {
      display: flex;
      align-items: center;
      width: 100%;
      white-space: normal;

      .o-icon {
        margin-right: 4px;
        @include text1;
      }
    }
  }
  .tag-ongoing {
    --tag-bg-color: rgba(var(--o-blue-6));
    --tag-bd-color: rgba(var(--o-blue-6));
  }
}

.card-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: var(--o-color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding: 32px;
  .title {
    font-weight: 500;
    height: auto;
    @include h2;
    @include text-truncate(3);
  }
  .date {
    margin-top: 24px;
    @include text1;
  }
  .city {
    @include text1;
  }
}

.o-figure {
  width: 100%;
}

.pagination {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nofound {
  margin-top: 40px;
}

@include respond-to('laptop') {
  .card-content {
    padding: 24px;
  }
}

@include respond-to('pad_h') {
  .tags {
    .o-tag {
      :deep(.o-tag-label) {
        font-size: 10px;
        white-space: nowrap;
      }
    }
    .series-tag {
      --tag-padding: 0;
      width: 104px;
      :deep(.o-tag-label) {
        margin-right: 11px;
      }
    }
  }
  .card-content {
    padding: 40px 16px 24px;
    .title {
      @include text1;
    }
    .date {
      margin-top: 8px;
      @include tip1;
    }
    .city {
      @include tip1;
    }
  }
}

@include respond-to('<=pad_v') {
  .o-input {
    width: 100%;
  }
  :deep(.o_box) {
    width: 100%;
  }
  :deep(.o_input) {
    width: 100%;
  }
  .filter-btn-mb {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
  .o-row {
    margin-top: 12px;
  }
  .card-content {
    .title {
      height: auto;
      padding: 0 32px;
      @include h2;
    }
    .card-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 12px;
    }
    .date {
      margin-top: 0;
      @include tip1;
    }
    .city {
      @include tip1;
    }
    .divider-mb {
      --o-divider-color: var(--o-color-info1-inverse);
      --o-divider-bd-color: var(--o-color-info1-inverse);
    }
  }
  .filter {
    flex-direction: column;
  }
  .filter-title {
    margin: 0 0 8px 0;
  }
  .o-toggle {
    --toggle-size: auto;
    --toggle-padding: 6px 12px;
    max-height: auto;
  }
  .dialog-footer {
    text-align: center;
  }
}

@include respond-to('phone') {
  .card-content {
    padding: 16px 16px 0;
  }
}
</style>
<style lang="scss">
@include respond-to('<=pad_v') {
  .filter-body {
    --layer-align: flex-end;
  }
}
</style>

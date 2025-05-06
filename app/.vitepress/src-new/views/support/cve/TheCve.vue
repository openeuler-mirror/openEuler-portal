<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from 'vue';
import {
  ODivider,
  OButton,
  OInput,
  OIcon,
  OTable,
  OPagination,
  OLink,
  ORow,
  OCol,
  OCard,
  ODialog,
  OTag,
  OPopover,
} from '@opensig/opendesign';

import { useThrottleFn } from '@vueuse/core';

import AppSection from '~@/components/AppSection.vue';
import CveFilter from '~@/components/cve/CveFilter.vue';

import { useDebounceSearch } from '~@/composables/useDebounceSearch';

import IconGlossary from '~icons/security/icon-glossary.svg';
import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconFilter from '~icons/app-new/icon-filter.svg';
import IconSecurityLevel from '~icons/security/icon-security-level.svg';

import { statusMap, REASON, glossaryList } from '~@/data/cve';
import { typeMap, queryYears } from '~@/data/safety-bulletin';

import { getCveList } from '~@/api/api-security';

import { CveListsT, CveQueryT } from '@/shared/@types/type-support';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { changeTimeStamp } from '~@/utils/common';
import { useCommon } from '@/stores/common';

const route = useRoute();
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

interface LabelT {
  zh: string;
  en: string;
}
interface OptionT {
  value: string;
  label: LabelT;
}

const queryData: CveQueryT = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  status: '',
  reason: '',
  year: '',
  score: '',
  noticeType: 'cve',
});

const COUNT_PER_PAGE = [10, 20, 30, 40];

const columns = [
  { label: t('safetyBulletin.cve'), key: 'cveId' },
  { label: t('safetyBulletin.summary'), key: 'summary' },
  { label: t('safetyBulletin.severityLevel'), key: 'cvsssCoreOE' },
  { label: t('cve.status'), key: 'status' },
  { label: t('cve.package'), key: 'packageName' },
  { label: t('safetyBulletin.releaseTime'), key: 'createTime' },
  { label: t('safetyBulletin.updateTime'), key: 'updateTime' },
];

// -------------------- 状态 --------------------
const statusOptions = ref<OptionT[]>([]);
statusMap.forEach((item) => {
  statusOptions.value.push({
    value: item.value,
    label: {
      zh: item.label.zh,
      en: item.label.en,
    },
  });
});

// -------------------- 年份 --------------------
const yearsOptions = ref<OptionT[]>([]);
yearsOptions.value = queryYears.map((item: any) => {
  return {
    value: item,
    label: {
      zh: item ? item : '全部',
      en: item ? item : 'All',
    },
  };
});

// -------------------- 严重级别 --------------------
const levelOptions = ref<OptionT[]>([]);

levelOptions.value.push({
  value: '0.0',
  label: {
    zh: '无',
    en: 'N/A',
  },
});
typeMap.forEach((item) => {
  levelOptions.value.unshift({
    value: item.score,
    label: {
      zh: item.label.zh,
      en: item.label.en,
    },
  });
});
levelOptions.value.unshift({
  value: '',
  label: {
    zh: '全部',
    en: 'All',
  },
});

// 严重级别列表显示
const levelShow = (cvsssCoreOE: string) => {
  const val = parseFloat(cvsssCoreOE);
  if (val >= 9.0) {
    return {
      label: typeMap.get('Critical')?.label[locale.value],
      calss: 'critical',
    };
  } else if (val >= 7.0) {
    return {
      label: typeMap.get('High')?.label[locale.value],
      calss: 'high',
    };
  } else if (val >= 4.0) {
    return {
      label: typeMap.get('Medium')?.label[locale.value],
      calss: 'medium',
    };
  } else if (val > 0) {
    return {
      label: typeMap.get('Low')?.label[locale.value],
      calss: 'low',
    };
  }
  return {
    label: locale.value === 'zh' ? '无' : 'N/A',
    calss: 'norating',
  };
};

// -------------------- CVE 术语说明 --------------------
const glossaryVisible = ref(false);
const columnsGlossary = [
  { label: t('cve.bugStatus'), key: 'status' },
  { label: t('cve.bugDesc'), key: 'description' },
];

// -------------------- 搜索 input字段做防抖处理 -------------------
const updataKeyword = (val: string) => {
  queryData.keyword = val;
};
const debounceTextFn = useDebounceSearch(updataKeyword, 300);
const debounceSearch = computed({
  get() {
    return queryData.keyword;
  },
  set(val) {
    debounceTextFn(val as string);
  },
});

// -------------------- 表格数据 --------------------
const tableData = ref<CveListsT[]>([]);
const tableDataMb = ref<CveListsT[]>([]);
const total = ref(0);
const isLoadingMore = ref(false);

const getCveLists = (data: CveQueryT) => {
  if (isLoadingMore.value) {
    return;
  }
  isLoadingMore.value = true;
  getCveList(data)
    .then((res: any) => {
      tableData.value = res.result.cveDatabaseList;
      total.value = res.result.totalCount || 0;

      if (lePadV.value) {
        tableDataMb.value.push(...res.result.cveDatabaseList);
        queryData.pages.page++;
      }
    })
    .finally(() => {
      isLoadingMore.value = false;
    });
};

// -------------------- 分页 --------------------
const onPaginationChange = (val: { page: number; pageSize: number }) => {
  // 当 pageSize 变化时将page_num 置为1
  if (val.pageSize !== queryData.pages.size) {
    queryData.pages.page = 1;
  } else {
    queryData.pages.page = val.page;
  }
  queryData.pages.size = val.pageSize;
  getCveLists(queryData);
};

// -------------------- 更新数据 --------------------
watch(
  () => [
    queryData.keyword,
    queryData.status,
    queryData.reason,
    queryData.year,
    queryData.score,
  ],
  () => {
    queryData.pages.page = 1;
    queryData.pages.size = 10;
    tableDataMb.value = [];
    getCveLists(queryData);
  },
  { deep: true }
);

// -------------------- 移动端 --------------------
const filterVisible = ref(false);

const footer = ref();
const listenScroll = () => {
  if (!lePadV.value) {
    return;
  }
  nextTick(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    footer.value = document.querySelector('#app > .footer');

    const scroll = scrollTop + clientHeight + footer.value.clientHeight;

    if (scroll >= scrollHeight && tableDataMb.value.length < total.value) {
      getCveLists(queryData);
    }
  });
};

// 使用 lodash 的 throttle 限制滚动事件触发频率
const throttleEvent = useThrottleFn(listenScroll, 300);

onMounted(() => {
  getCveLists(queryData);
  window.addEventListener('scroll', throttleEvent);
});

onUnmounted(() => {
  window.removeEventListener('scroll', throttleEvent);
});
</script>

<template>
  <AppSection v-if="!lePadV" :title="t('safetyBulletin.cve')">
    <div class="filter-card">
      <CveFilter
        v-model="queryData.status"
        :type-title="t('cve.status')"
        :options="statusOptions"
      />
      <CveFilter
        v-model="queryData.reason"
        :type-title="t('cve.reason')"
        :options="REASON"
      />
      <CveFilter
        v-model="queryData.year"
        :type-title="t('cve.year')"
        :options="yearsOptions"
      />
      <CveFilter
        v-model="queryData.score"
        :type-title="t('safetyBulletin.severityLevel')"
        :options="levelOptions"
      />
      <ODivider :style="{ '--o-divider-gap': '16px' }" />
      <div class="search-box">
        <OButton
          variant="outline"
          color="normal"
          size="large"
          class="input-glossary"
          @click="glossaryVisible = true"
        >
          <template #icon>
            <OIcon><IconGlossary /></OIcon>
          </template>
          <span>{{ t('cve.glossary') }}</span>
        </OButton>
        <OInput
          v-model="debounceSearch"
          :placeholder="t('cve.searchCve')"
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
    <OTable :columns="columns" :data="tableData" class="safety-bulletin-table">
      <template #td_cveId="{ row }">
        <OLink
          color="primary"
          variant="text"
          :href="`${route.path}detail/?cveId=${row.cveId}&packageName=${row.packageName}`"
          >{{ row.cveId }}</OLink
        >
      </template>
      <template #td_summary="{ row }">
        <p class="summary">{{ row.summary }}</p>
      </template>
      <template #td_cvsssCoreOE="{ row }">
        <OTag
          class="type-tag"
          :class="[levelShow(row.cvsssCoreOE).calss]"
          :style="{ '--tag-radius': '4px' }"
        >
          <OIcon> <IconSecurityLevel /></OIcon>
          {{ levelShow(row.cvsssCoreOE).label }}
        </OTag>
      </template>
      <template #td_status="{ row }">
        <OPopover position="top" wrap-class="status-popover">
          <template #target>
            <OTag class="status-tag" :style="{ '--tag-radius': '4px' }">
              {{ row.status }}
            </OTag>
          </template>
          <div>
            <p class="tag-title">{{ row.status }}</p>
            <p class="tag-desc">{{ statusMap.get(row.status)?.tag[locale] }}</p>
          </div>
        </OPopover>
      </template>
      <template #td_packageName="{ row }">
        <p class="packageName">{{ row.packageName }}</p>
      </template>
      <template #td_createTime="{ row }">
        <p>{{ changeTimeStamp(new Date(row.createTime).getTime()) }}</p>
      </template>
      <template #td_updateTime="{ row }">
        <p>{{ changeTimeStamp(new Date(row.updateTime).getTime()) }}</p>
      </template>
    </OTable>
    <!-- 分页 -->
    <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
      <OPagination
        :total="total"
        :page="queryData.pages.page"
        :page-size="queryData.pages.size"
        :page-sizes="COUNT_PER_PAGE"
        :layout="['total', 'jumper', 'pager', 'pagesize']"
        :show-more="false"
        @change="onPaginationChange"
      ></OPagination>
    </div>
  </AppSection>
  <AppSection v-else>
    <OInput
      v-model="debounceSearch"
      :placeholder="t('cve.searchCve')"
      size="large"
      class="input-search-mb"
    >
      <template #prefix>
        <OIcon><IconSearch /></OIcon>
      </template>
    </OInput>
    <div class="select-btn-mb">
      <OButton
        variant="solid"
        color="normal"
        class="glossary-btn"
        @click="glossaryVisible = true"
      >
        <template #icon>
          <OIcon><IconGlossary /></OIcon>
        </template>
        <span>{{ t('cve.glossary') }}</span>
      </OButton>
      <OButton
        variant="text"
        color="normal"
        class="select-btn"
        @click="filterVisible = true"
      >
        <span>{{ t('cve.filter') }}</span>
        <template #suffix>
          <OIcon><IconFilter /></OIcon>
        </template>
      </OButton>
    </div>
    <ORow gap="0 16px" wrap="wrap">
      <OCol flex="0 0 100%" v-for="(item, i) in tableDataMb" :key="i">
        <OCard
          :href="`${route.path}detail/?cveId=${item.cveId}&packageName=${item.packageName}`"
          :title="item.cveId"
          class="cve-item"
        >
          <div class="info-item">
            <p class="item-label">{{ t('safetyBulletin.summary') }}</p>
            <p class="summary">{{ item.summary }}</p>
          </div>
          <div class="info-item">
            <p class="item-label">{{ t('safetyBulletin.severityLevel') }}</p>
            <OTag
              class="type-tag"
              :class="[levelShow(item.cvsssCoreOE).calss]"
              :style="{ '--tag-radius': '4px' }"
            >
              <OIcon> <IconSecurityLevel /></OIcon>
              {{ levelShow(item.cvsssCoreOE).label }}
            </OTag>
          </div>
          <div class="info-item">
            <p class="item-label">
              {{ t('cve.status') }}
            </p>
            <p class="summary">{{ item.status }}</p>
          </div>
          <div class="info-item">
            <p class="item-label">
              {{ t('cve.package') }}
            </p>
            <p class="summary">{{ item.packageName }}</p>
          </div>
          <div class="info-item">
            <p class="item-label">{{ t('safetyBulletin.releaseTime') }}</p>
            <p class="summary">
              {{ changeTimeStamp(new Date(item.createTime).getTime()) }}
            </p>
          </div>
          <div class="info-item">
            <p class="item-label">{{ t('safetyBulletin.updateTime') }}</p>
            <p class="summary">
              {{ changeTimeStamp(new Date(item.updateTime).getTime()) }}
            </p>
          </div>
        </OCard>
      </OCol>
    </ORow>
    <p v-if="tableDataMb.length && tableDataMb.length < total" class="loading">
      {{ t('safetyBulletin.loading') }}...
    </p>
    <ODialog
      v-model:visible="filterVisible"
      :phone-half-full="lePadV"
      :scrollbar="{ showType: 'always', size: 'small' }"
      size="medium"
      :style="{ '--dlg-radius': '4px 4px 0 0' }"
      class="filter-body"
    >
      <template #header>
        <span class="del-title">{{ t('cve.filter') }}</span>
      </template>
      <div class="dlg-body">
        <CveFilter
          v-model="queryData.status"
          :type-title="t('cve.status')"
          :options="statusOptions"
        />
        <CveFilter
          v-model="queryData.reason"
          :type-title="t('cve.reason')"
          :options="REASON"
        />
        <CveFilter
          v-model="queryData.year"
          :type-title="t('cve.year')"
          :options="yearsOptions"
        />
        <CveFilter
          v-model="queryData.score"
          :type-title="t('safetyBulletin.severityLevel')"
          :options="levelOptions"
        />
      </div>
    </ODialog>
  </AppSection>
  <ODialog
    v-model:visible="glossaryVisible"
    :phone-half-full="lePadV"
    class="glossary-body"
    :class="isDark ? 'glossary-body-dark' : ''"
    :size="lePadV ? 'medium' : 'large'"
  >
    <template #header>
      <span class="del-title">{{ t('cve.glossary') }}</span>
    </template>
    <div class="dlg-body">
      <OTable
        :columns="columnsGlossary"
        :data="glossaryList"
        border="all"
        class="glossary-table"
      >
        <template #td_description="{ row }">
          <p v-dompurify-html="row.description[locale]"></p>
          <ul v-if="locale === 'zh' && row.listZh">
            <li v-for="(item, i) in row.listZh">{{ item }}</li>
          </ul>
          <ul v-if="locale === 'en' && row.listEn">
            <li v-for="(item, i) in row.listEn">{{ item }}</li>
          </ul>
        </template>
      </OTable>
    </div>
  </ODialog>
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
.cve-filter + .cve-filter {
  margin-top: 16px;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.input-glossary {
  --btn-bd-color: var(--o-color-control1);
  --btn-bg-color-hover: var(--o-color-control2-light);
  --btn-bd-color-hover: var(--o-color-control4);
  --btn-color-hover: var(--o-color-info1);
  --btn-bg-color-active: var(--o-color-control2-light);
  --btn-bd-color-active: var(--o-color-control4);
  --btn-color-active: var(--o-color-info1);
}
.o-btn {
  --btn-radius: var(--o-radius-xs);
}
.o-input {
  margin-left: 24px;
}
.input-search {
  :deep(.o_box) {
    width: 320px;
  }
  :deep(.o_input) {
    width: 100%;
  }
}

.safety-bulletin-table {
  margin-top: 24px;
}
:deep(.o-table) {
  table {
    table-layout: fixed;
    width: 100%;
  }

  th {
    width: 10%;
    &:nth-of-type(1) {
      width: 14%;
    }
    &:nth-of-type(2) {
      width: 35%;
    }
    &:nth-of-type(3) {
      width: 9%;
    }
    &:nth-of-type(4) {
      width: 12%;
    }
    &:nth-of-type(7) {
      width: 11%;
    }
  }
}
.summary {
  @include text-truncate(2);
}
.packageName {
  @include text-truncate(2);
}
.type-tag {
  --tag-bg-color: transparent;
  --tag-padding: 2px 4px;
  :deep(.o-tag-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-right: 4px;
      @include text1;
    }
  }
}
.high {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-warning1);
    }
  }
}
.medium {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-warning2);
    }
  }
}
.critical {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-danger1);
    }
  }
}
.norating {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-info4);
    }
  }
}
.status-tag {
  --tag-bg-color: var(--o-color-control2-light);
  --tag-bd-color: var(--o-color-control3-light);
  cursor: pointer;
}
.pagination {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.input-search-mb {
  width: 100%;
  margin-left: 0;
  :deep(.o_box) {
    width: 100%;
    @include text2;
  }
}
.select-btn-mb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.glossary-btn {
  --btn-padding: 5px 8px;
  --btn-height: 32px;
}
.select-btn {
  --btn-padding: 5px 0;
  --btn-height: 32px;
  --btn-min-width: auto;
}

.glossary-table {
  --table-head-cell-padding: 9px 24px;
  --table-head-cell-height: auto;
  --table-cell-padding: 9px 24px;
  --table-edge-padding: 24px;
  --table-cell-height: auto;
  :deep(th) {
    color: var(--o-color-info1);
    @include tip1;
  }
  :deep(tr) {
    td {
      vertical-align: top;
      @include tip1;
      &:nth-of-type(1) {
        color: var(--o-color-info2);
        padding-left: 32px;
      }
    }
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(8) {
      td {
        color: var(--o-color-info1);
        padding-left: 24px;
        &:nth-of-type(1) {
          font-weight: 500;
        }
      }
    }
  }
  :deep(th) {
    &:nth-of-type(1) {
      width: 30%;
    }
    &:nth-of-type(2) {
      width: 70%;
    }
  }
}
ul {
  list-style-type: disc;
  padding-left: 16px;
}
@include respond-to('<=pad_v') {
  .app-section {
    &:last-child {
      :deep(.section-wrapper) {
        padding-bottom: 24px !important;
      }
    }
  }
  .o-row {
    margin-top: 24px;
  }
  .o-card {
    --card-content-gap: 12px;
    --card-main-padding: 16px;
  }
  :deep(.o-card-header) {
    @include h3;
  }
  .info-item {
    display: flex;
    align-items: flex-start;
    color: var(--o-color-info1);
    margin-top: 4px;
    @include text1;
  }
  .item-label {
    font-weight: 500;
    min-width: 48px;
    margin-right: 16px;
  }
  .type-tag {
    :deep(.o-tag-label) {
      .o-icon {
        @include text2;
      }
    }
  }
  .loading {
    text-align: center;
    margin-top: 16px;
    color: var(--o-color-info3);
    @include text1;
  }

  .glossary-table {
    --table-head-cell-padding: 7px 12px;
    --table-cell-padding: 7px 12px;
    --table-edge-padding: 12px;
    :deep(tr) {
      td {
        &:nth-of-type(1) {
          padding-left: 12px;
        }
      }
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(8) {
        td {
          padding-left: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.status-popover {
  width: 326px;
  .o-popup-body {
    border-radius: var(--o-radius-xs);
    padding: 16px;
  }
  .tag-title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include text1;
  }
  .tag-desc {
    color: var(--o-color-info2);
    margin-top: 4px;
    @include tip1;
  }
}

.glossary-body {
  --dlg-radius: var(--o-radius-xs);
  --dlg-width: 1170px;
}
.glossary-body-dark {
  --dlg-bg-color: #3f3f43;
}
</style>

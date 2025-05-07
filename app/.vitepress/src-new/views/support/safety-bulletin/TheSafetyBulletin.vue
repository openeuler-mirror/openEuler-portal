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
  OInput,
  OIcon,
  OTable,
  OPagination,
  OLink,
  OPopup,
  ODropdown,
  ODropdownItem,
  OCheckbox,
  OCheckboxGroup,
  OScroller,
  ODivider,
  OButton,
  ORadioGroup,
  ORadio,
  ORow,
  OCol,
  OCard,
  OTag,
} from '@opensig/opendesign';

import { useThrottleFn } from '@vueuse/core';

import AppSection from '~@/components/AppSection.vue';

import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconFilter from '~icons/app-new/icon-filter.svg';
import IconSecurityLevel from '~icons/security/icon-security-level.svg';

import {
  getSecurityList,
  getProductList,
  getComponentList,
} from '~@/api/api-security';
import {
  SecurityListsT,
  SafetyBulletinQueryT,
} from '@/shared/@types/type-support';

import { typeMap } from '~@/data/safety-bulletin';

import { useDebounceSearch } from '~@/composables/useDebounceSearch';
import { changeTimeStamp } from '~@/utils/common';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const route = useRoute();
const { t, locale, isZh } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

interface TypeOptionT {
  value: string;
  label: string;
}

const queryData: any = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  type: [],
  date: [],
  affectedProduct: [],
  affectedComponent: '',
  noticeType: 'cve',
});

const COUNT_PER_PAGE = [10, 20, 30, 40];
const total = ref(0);

const columns = [
  { label: t('safetyBulletin.notice'), key: 'securityNoticeNo' },
  { label: t('safetyBulletin.summary'), key: 'summary' },
  { label: t('safetyBulletin.severityLevel'), key: 'type' },
  { label: t('safetyBulletin.affectedProduct'), key: 'affectedProduct' },
  { label: t('safetyBulletin.affectedComponent'), key: 'affectedComponent' },
  { label: t('safetyBulletin.releaseTime'), key: 'announcementTime' },
  { label: t('safetyBulletin.updateTime'), key: 'updateTime' },
];

// -------------------- 表格数据 --------------------
const isLoadingMore = ref(false);
const tableData = ref<SecurityListsT[]>([]);
const tableDataMb = ref<SecurityListsT[]>([]);
const getSecurityLists = (data: SafetyBulletinQueryT) => {
  if (isLoadingMore.value) {
    return;
  }
  isLoadingMore.value = true;
  getSecurityList(data)
    .then((res: any) => {
      tableData.value = res.result.securityNoticeList;
      total.value = res.result.totalCount || 0;

      if (lePadV.value) {
        tableDataMb.value.push(...res.result.securityNoticeList);
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
  getSecurityLists(queryData);
  getAffectedComponentList();
};

// -------------------- 搜索 input字段做防抖处理 -------------------
const updataName = (val: string) => {
  queryData.keyword = val;
};
const debounceTextFn = useDebounceSearch(updataName, 300);
const debounceSearch = computed({
  get() {
    return queryData.keyword;
  },
  set(val) {
    debounceTextFn(val as string);
  },
});

// -------------------- 严重级别 --------------------
const typeList = ref<TypeOptionT[]>([]);

typeMap.forEach((item) => {
  typeList.value.unshift({
    value: item.value,
    label: isZh.value ? item.label.zh : item.label.en,
  });
});
typeList.value.unshift({
  value: '',
  label: t('safetyBulletin.all'),
});

const filterType = (val: string) => {
  queryData.type = val ? [val] : [];
};

// -------------------- 影响产品 --------------------
const productList = ref<string[]>([]);
const getProducts = () => {
  getProductList().then((res: any) => {
    productList.value = res.result;
  });
};

const productRef = ref();
const isProductVisible = ref(false);

const checkboxProduct = ref<Array<string>>([]);

const productReset = () => {
  checkboxProduct.value = [];
  queryData.affectedProduct = [];
  isProductVisible.value = false;
};
const productConfirm = () => {
  queryData.affectedProduct = checkboxProduct.value;
  isProductVisible.value = false;
};

// -------------------- 影响组件 --------------------
const componentList = ref<string[]>([]);
const componentSearchList = ref<string[]>([]);
const getAffectedComponentList = () => {
  getComponentList({
    securityLevel: queryData.type.join(','),
    affectedProduct: queryData.affectedProduct.join(','),
    noticeType: 'cve',
  }).then((res: any) => {
    componentList.value = res.result.filter((item) => item);
    componentSearchList.value = res.result.filter((item) => item);
  });
};

const radioComponent = ref('');
const componentRef = ref();
const isComponentVisible = ref(false);

const searchComponent = (keyword: string, data: string[]) => {
  const regex = new RegExp(keyword, 'i');

  const results = [];
  for (let i = 0; i < data.length; i++) {
    if (regex.test(data[i])) {
      results.push(data[i]);
    }
  }
  componentSearchList.value = results;
};

// 组件搜索
const componentKeyWords = ref('');
const updataComponent = (val: string) => {
  componentKeyWords.value = val;
  searchComponent(val, componentList.value);
};
const debounceComponentFn = useDebounceSearch(updataComponent, 300);
const debounceComponentSearch = computed({
  get() {
    return componentKeyWords.value;
  },
  set(val) {
    debounceComponentFn(val as string);
  },
});

const componentReset = () => {
  radioComponent.value = '';
  queryData.affectedComponent = '';
  isComponentVisible.value = false;
};
const componentConfirm = () => {
  queryData.affectedComponent = radioComponent.value;
  isComponentVisible.value = false;
};

const handlerClick = () => {
  isProductVisible.value = false;
  isComponentVisible.value = false;
};

// -------------------- 初始化 --------------------
onMounted(() => {
  getSecurityLists(queryData);
  getProducts();
  getAffectedComponentList();

  window.addEventListener('click', handlerClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handlerClick);
});

// -------------------- 更新数据 --------------------
watch(
  () => [
    queryData.keyword,
    queryData.type,
    queryData.date,
    queryData.affectedProduct,
    queryData.affectedComponent,
  ],
  () => {
    queryData.pages.page = 1;
    queryData.pages.size = 10;
    tableDataMb.value = [];
    getSecurityLists(queryData);
    getAffectedComponentList();
  },
  { deep: true }
);

const line = (val: string) => {
  return val.split(';');
};

// -------------------- 移动端 --------------------
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
      getSecurityLists(queryData);
    }
  });
};

// 使用 lodash 限制滚动事件触发频率
const throttleEvent = useThrottleFn(listenScroll, 300);

onMounted(() => {
  window.addEventListener('scroll', throttleEvent);
});

onUnmounted(() => {
  window.removeEventListener('scroll', throttleEvent);
});
</script>

<template>
  <AppSection v-if="!lePadV" :title="t('safetyBulletin.securityBulletin')">
    <div class="safety-bulletin">
      <div class="search-box">
        <div class="data-picker">
          <ClientOnly>
            <el-date-picker
              v-model="queryData.date"
              type="daterange"
              :start-placeholder="t('safetyBulletin.startDate')"
              :end-placeholder="t('safetyBulletin.endDate')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :default-time="[new Date(), new Date()]"
              size="small"
            />
          </ClientOnly>
        </div>
        <OInput
          v-model="debounceSearch"
          :placeholder="t('safetyBulletin.searchPlaceholder')"
          size="large"
          clearable
          class="input-search"
        >
          <template #prefix>
            <OIcon><IconSearch /></OIcon>
          </template>
        </OInput>
      </div>
      <OTable
        :columns="columns"
        :data="tableData"
        class="safety-bulletin-table"
      >
        <template #header="{ columns }">
          <th v-for="item in columns" :key="item.key">
            <div v-if="item.key === 'type'" class="filter">
              {{ item.label }}
              <ODropdown
                trigger="click"
                option-position="bottom"
                :option-wrap-class="
                  isDark ? 'type-dropdown-dark' : 'type-dropdown'
                "
              >
                <div class="filter-title">
                  <OIcon><IconFilter /></OIcon>
                </div>
                <template #dropdown>
                  <ODropdownItem
                    v-for="(drop, i) in typeList"
                    :key="i"
                    :label="drop.label"
                    :class="{
                      'type-active':
                        (!drop.value && !queryData.type.length) ||
                        drop.value === queryData.type[0],
                    }"
                    @click="filterType(drop.value)"
                  >
                    {{ drop.label }}
                  </ODropdownItem>
                </template>
              </ODropdown>
            </div>
            <div v-else-if="item.key === 'affectedProduct'" class="filter">
              {{ item.label }}
              <OIcon
                id="productFilter"
                ref="productRef"
                @click.stop="isProductVisible = true"
              >
                <IconFilter />
              </OIcon>
              <OPopup
                v-model:visible="isProductVisible"
                position="bottom"
                :target="productRef"
                wrapper="#productFilter"
                :body-class="isDark ? 'popup-dark' : 'product-popup-body'"
                :offset="24"
                trigger="click"
                :style="{ top: '36px' }"
              >
                <div class="scroller-box">
                  <OScroller
                    class="product-scroller"
                    show-type="hover"
                    size="small"
                    disabled-x
                  >
                    <OCheckboxGroup v-model="checkboxProduct" direction="v">
                      <OCheckbox
                        v-for="product in productList"
                        :key="product"
                        :value="product"
                        >{{ product }}</OCheckbox
                      >
                    </OCheckboxGroup>
                  </OScroller>
                </div>
                <ODivider class="product-divider" />
                <div class="product-btn">
                  <OButton
                    variant="text"
                    color="primary"
                    @click.stop="productReset"
                    >{{ t('safetyBulletin.reset') }}</OButton
                  >
                  <OButton
                    variant="text"
                    color="primary"
                    @click.stop="productConfirm"
                    >{{ t('safetyBulletin.confirm') }}</OButton
                  >
                </div>
              </OPopup>
            </div>
            <div v-else-if="item.key === 'affectedComponent'" class="filter">
              {{ item.label }}
              <OIcon
                id="componentFilter"
                ref="componentRef"
                @click.stop="isComponentVisible = true"
              >
                <IconFilter />
              </OIcon>
              <OPopup
                v-model:visible="isComponentVisible"
                position="bottom"
                :target="componentRef"
                wrapper="#componentFilter"
                :body-class="isDark ? 'popup-dark' : 'component-popup-body'"
                :offset="24"
                trigger="click"
                :style="{ top: '36px' }"
              >
                <OInput
                  v-model="debounceComponentSearch"
                  :placeholder="t('safetyBulletin.search')"
                  size="medium"
                  clearable
                  class="input-component-search"
                >
                  <template #prefix>
                    <OIcon><IconSearch /></OIcon>
                  </template>
                </OInput>
                <div class="scroller-box">
                  <OScroller
                    class="component-scroller"
                    show-type="hover"
                    size="small"
                    disabled-x
                  >
                    <ORadioGroup
                      v-if="componentSearchList.length"
                      v-model="radioComponent"
                      direction="v"
                    >
                      <ORadio
                        v-for="(item, i) in componentSearchList"
                        :key="i"
                        :value="item"
                      >
                        <p class="radio-item">{{ item }}</p>
                      </ORadio>
                    </ORadioGroup>
                    <div v-else class="no-data">No Data</div>
                  </OScroller>
                </div>
                <ODivider class="product-divider" />
                <div class="product-btn">
                  <OButton
                    variant="text"
                    color="primary"
                    @click.stop="componentReset"
                    >{{ t('safetyBulletin.reset') }}</OButton
                  >
                  <OButton
                    variant="text"
                    color="primary"
                    @click.stop="componentConfirm"
                    >{{ t('safetyBulletin.confirm') }}</OButton
                  >
                </div>
              </OPopup>
            </div>
            <div v-else>{{ item.label }}</div>
          </th>
        </template>
        <template #td_securityNoticeNo="{ row }">
          <OLink
            color="primary"
            variant="text"
            :href="`${route.path}detail/?id=${row.securityNoticeNo}`"
            >{{ row.securityNoticeNo }}</OLink
          >
        </template>
        <template #td_type="{ row }">
          <OTag
            class="type-tag"
            :class="[row?.type?.toLocaleLowerCase()]"
            :style="{ '--tag-radius': '4px' }"
          >
            <OIcon> <IconSecurityLevel /></OIcon>
            {{ typeMap.get(row.type)?.label[locale] }}
          </OTag>
        </template>
        <template #td_affectedProduct="{ row }">
          <div>
            <p v-for="(item, i) in line(row.affectedProduct)" :key="i">
              {{ item }}
            </p>
          </div>
        </template>
        <template #td_announcementTime="{ row }">
          <p>{{ changeTimeStamp(new Date(row.announcementTime).getTime()) }}</p>
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
    </div>
  </AppSection>
  <AppSection v-else>
    <div class="safety-bulletin-mb">
      <div class="search-box-mb">
        <OInput
          v-model="debounceSearch"
          :placeholder="t('safetyBulletin.searchPlaceholder')"
          size="large"
          clearable
          class="input-search-mb"
        >
          <template #prefix>
            <OIcon><IconSearch /></OIcon>
          </template>
        </OInput>
        <div class="data-picker-mb">
          <ClientOnly>
            <el-date-picker
              v-model="queryData.date"
              type="daterange"
              :start-placeholder="t('safetyBulletin.startDate')"
              :end-placeholder="t('safetyBulletin.endDate')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :default-time="[new Date(), new Date()]"
              size="small"
            />
          </ClientOnly>
        </div>
      </div>
      <ORow gap="0 16px" wrap="wrap">
        <OCol flex="0 0 100%" v-for="(item, i) in tableDataMb" :key="i">
          <OCard
            :href="`${route.path}detail/?id=${item.securityNoticeNo}`"
            :title="item.securityNoticeNo"
            class="safety-bulletin-item"
          >
            <div class="info-item">
              <p class="item-label">{{ t('safetyBulletin.summary') }}</p>
              <p class="summary">{{ item.summary }}</p>
            </div>
            <div class="info-item">
              <p class="item-label">{{ t('safetyBulletin.severityLevel') }}</p>
              <OTag
                class="type-tag"
                :class="[item?.type?.toLocaleLowerCase()]"
                :style="{ '--tag-radius': '4px' }"
              >
                <OIcon> <IconSecurityLevel /></OIcon>
                {{ typeMap.get(item.type)?.label[locale] }}
              </OTag>
            </div>
            <div class="info-item">
              <p class="item-label">
                {{ t('safetyBulletin.affectedProduct') }}
              </p>
              <p class="summary">{{ item.affectedProduct }}</p>
            </div>
            <div class="info-item">
              <p class="item-label">
                {{ t('safetyBulletin.affectedComponent') }}
              </p>
              <p class="summary">{{ item.affectedComponent }}</p>
            </div>
            <div class="info-item">
              <p class="item-label">{{ t('safetyBulletin.releaseTime') }}</p>
              <p class="summary">
                {{ changeTimeStamp(new Date(item.announcementTime).getTime()) }}
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
      <p
        v-if="tableDataMb.length && tableDataMb.length < total"
        class="loading"
      >
        {{ t('safetyBulletin.loading') }}...
      </p>
    </div>
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

.search-box {
  background-color: var(--o-color-fill2);
  padding: 16px 32px;
  border-radius: var(--o-radius-xs);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
:deep(.el-date-editor) {
  width: 320px;
  &.el-input__wrapper {
    border-radius: var(--o-radius-xs);
    box-shadow: 0 0 0 1px var(--o-color-control1) inset;
    height: 40px;
    line-height: 40px;
  }
  .el-range-input {
    &::-webkit-input-placeholder {
      color: var(--o-color-info4);
    }
  }
}
.input-search {
  width: 320px;
  :deep(.o_box) {
    width: 320px;
  }
  :deep(.o_input) {
    width: 100%;
  }
}

:deep(.o-table) {
  margin-top: 24px;
  --table-head-cell-padding: 12px 16px;
  --table-head-cell-height: auto;
  --table-cell-padding: 16px;
  --table-cell-height: auto;
  th,
  td {
    color: var(--o-color-info1);
    @include text1;
  }

  table {
    table-layout: fixed;
    width: 100%;
  }

  th {
    width: 10%;

    &:nth-of-type(1) {
      width: 19%;
    }
    &:nth-of-type(2) {
      width: 18%;
    }
    &:nth-of-type(4) {
      width: 22%;
    }
    &:nth-of-type(7) {
      width: 11%;
    }
  }
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
.pagination {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.filter {
  display: flex;
  align-items: center;
  .o-icon {
    margin-left: 8px;
    cursor: pointer;
  }
}
.o-dropdown-item {
  --dropdown-item-justify: flex-start;
  --dropdown-item-radius: var(--o-radius-xs);
  --dropdown-item-padding: 8px 16px;
  --dropdown-item-gap: 0;

  min-width: 74px;
  @include tip1;
}
.type-active {
  background-color: var(--o-color-primary1-light);
  color: var(--o-color-primary1);
  font-weight: 500;
}

.filter-title {
  display: flex;
  align-items: center;
  .o-icon {
    margin-left: 8px;
    cursor: pointer;
  }
}

:deep(.product-popup-body) {
  background-color: var(--o-color-fill2);
}
:deep(.popup-dark) {
  background-color: #3f3f43;
}
.scroller-box {
  padding: 4px 4px 0;
}
.product-scroller {
  max-height: 282px;
}
.product-divider {
  --o-divider-gap: 0;
}
.product-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  .o-btn {
    --btn-radius: var(--o-radius-xs);
    --btn-padding: 0 12px;
    --btn-bg-color-hover: none;
    --btn-bg-color-active: none;
  }
}

.o-checkbox-group {
  --checkbox-group-gap: 0;
  align-items: flex-start;
}
.o-checkbox {
  padding: 4px 8px;
  font-weight: normal;
  :deep(.o-checkbox-label) {
    color: var(--o-color-info2);
  }
}
.o-checkbox-checked {
  :deep(.o-checkbox-label) {
    color: var(--o-color-info1);
  }
}
.o-checkbox + .o-checkbox {
  margin-left: 0;
}

:deep(.component-popup-body) {
  background-color: var(--o-color-fill2);
}
.input-component-search {
  padding: 8px;
  width: 100%;
  :deep(.o_box) {
    width: 100%;
  }
}
.component-scroller {
  max-height: 206px;
}
.o-radio-group {
  --radio-group-gap: 0;
  align-items: flex-start;
}
.o-radio {
  padding: 4px 8px;
  :deep(.o-radio-label) {
    color: var(--o-color-info2);
  }
}
.o-radio-checked {
  :deep(.o-radio-label) {
    color: var(--o-color-info1);
  }
}
.o-radio + .o-radio {
  margin-left: 0;
}
.radio-item {
  max-width: 273px;
}

.no-data {
  padding: 8px 12px;
  text-align: center;
  color: var(--o-color-info2);
  @include text1;
}

.input-search-mb {
  width: 100%;
  :deep(.o_box) {
    width: 100%;
    @include text2;
  }
}
.data-picker-mb {
  margin-top: 16px;
}
@include respond-to('<=pad_v') {
  .app-section {
    &:last-child {
      :deep(.section-wrapper) {
        padding-bottom: 24px !important;
      }
    }
  }
  :deep(.el-date-editor) {
    width: 100%;
    &.el-input__wrapper {
      height: 38px;
      line-height: 38px;
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
}
</style>
<style lang="scss">
.type-dropdown-dark {
  --dropdown-list-bg-color: #3f3f43;
  .type-active {
    background-color: #2b2b2f;
  }
}
</style>

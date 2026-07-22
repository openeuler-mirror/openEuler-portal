<script lang="ts" setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from 'vue';
import { OButton, OInput, OIcon, OTable, OPagination, OLink, OTag, ODropdown, ODropdownItem, ORow, OCol, OCard } from '@opensig/opendesign';

import { useThrottleFn } from '@vueuse/core';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import FilterableTableHeader from '~@/components/FilterableTableHeader.vue';
import FilterableMb from '~@/components/security/FilterableMb.vue';

import banner from '~@/assets/category/security/defect-center-banner.jpg'

import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconFilter from '~icons/app-new/icon-filter.svg';
import IconSecurityLevel from '~icons/security/icon-security-level.svg';

import { getSecurityList, getProductList, getComponentList } from '~@/api/api-security';
import { SecurityListsT, SafetyBulletinQueryT } from '~@/@types/type-security';

import { typeMap } from '~@/data/safety-bulletin';

import { useDebounceSearch } from '~@/composables/useDebounceSearch';
import { changeTimeStamp } from '~@/utils/common';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const route = useRoute();
const { locale, t, isZh } = useLocale();
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
  noticeType: 'bug',
});

const searchValue = ref();
const onInputName = useDebounceSearch((value: string) => {
  queryData.keyword = value;
}, 300);

const COUNT_PER_PAGE = [10, 20, 30, 40];
const total = ref(0);

const columns = [
  { label: t('defectCenter.notice'), key: 'securityNoticeNo', style: 'width: 22%'  },
  { label: t('defectCenter.summary'), key: 'summary', style: 'width: 20%' },
  { label: t('defectCenter.severityLevel'), key: 'type', style: 'width: 12%' },
  { label: t('defectCenter.affectedProduct'), key: 'affectedProduct', style: 'width: 22%' },
  { label: t('defectCenter.affectedComponent'), key: 'affectedComponent', style: 'width: 12%' },
  { label: t('defectCenter.releaseTime'), key: 'announcementTime', style: 'width: 12%' },
];

// -------------------- 表格数据 --------------------
const isLoadingMore = ref(false);
const tableData = ref<SecurityListsT[]>([]);
const tableDataMb = ref<SecurityListsT[]>([]);
const getDefectLists = (data: SafetyBulletinQueryT) => {
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
  getDefectLists(queryData);
  getAffectedComponentList();
};

// -------------------- 严重级别 --------------------
const typeList = ref<TypeOptionT[]>([]);

typeMap.forEach((item) => {
  if (item.value !== 'Medium') {
    typeList.value.unshift({
      value: item.value,
      label: isZh.value ? item.label.zh : item.label.en,
    });
  }
});
typeList.value.unshift({
  value: '',
  label: t('defectCenter.all'),
});

const filterType = (val?: string) => {
  queryData.type = val ? [val] : [];
};

const typeValue = ref();
const filterTypeMb = () => {
  queryData.type = typeValue.value ? [typeValue.value] : [];
};

const line = (val: string) => {
  return val.split(';');
};

// -------------------- 影响产品 --------------------
const productValue = ref();
const productList = ref<string[]>([]);
const getProducts = () => {
  getProductList().then((res: any) => {
    productList.value = res.result;
  });
};

const filterProductList = () => {
  queryData.affectedProduct = productValue.value;
};

// -------------------- 影响组件 --------------------
const componentValue = ref();
const componentList = ref<string[]>([]);
  const getAffectedComponentList = () => {
  getComponentList({
    securityLevel: queryData.type.join(','),
    affectedProduct: queryData.affectedProduct.join(','),
    noticeType: 'cve',
  }).then((res: any) => {
    componentList.value = res.result.filter((item) => item);
  });
};

const filterComponentList = () => {
  queryData.affectedComponent = componentValue.value;
};

// -------------------- 初始化 --------------------
onMounted(() => {
  getDefectLists(queryData);
  getProducts();
  getAffectedComponentList();
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
    getDefectLists(queryData);
    getAffectedComponentList();
  },
  { deep: true }
);

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
      getDefectLists(queryData);
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

const dateFocus = ref(false);
const focus = () => {
  dateFocus.value = true;
};
const blur = () => {
  dateFocus.value = false;
};
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="defect-center-banner" :title="t('defectCenter.defectCenter')" :background-image="banner">
    <OButton
      animation
      variant="solid"
      color="primary"
      size="large"
      :href="`/${locale}/security/management/`"
      target="_blank"
    >{{ t('defectCenter.defectBtn') }}</OButton>
  </BannerLevel2>
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('defectCenter.defectCenter') }}</p>
    <OButton
      animation
      variant="solid"
      color="primary"
      size="small"
      :href="`/${locale}/security/management/`"
      target="_blank"
    >{{ t('defectCenter.defectBtn') }}</OButton>
  </div>
  <AppSection v-if="!lePadV">
    <div class="defect-center">
      <div class="search-box">
        <div class="data-picker">
          <span class="time">{{ t('defectCenter.time') }}</span>
          <ClientOnly>
            <el-date-picker
              v-model="queryData.date"
              type="daterange"
              :start-placeholder="t('defectCenter.startDate')"
              :end-placeholder="t('defectCenter.endDate')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :default-time="[new Date(), new Date()]"
              size="small"
              @focus="focus"
              @blur="blur"
              :class="{'date-picker-active': queryData.date?.length}"
            />
          </ClientOnly>
        </div>
        <OInput
          v-model="searchValue"
          :placeholder="t('defectCenter.searchPlaceholder')"
          @input="(e) => onInputName(e.target?.value)"
          size="large"
          clearable
          @clear="onInputName('')"
          class="input-search"
        >
          <template #prefix>
            <OIcon><IconSearch /></OIcon>
          </template>
        </OInput>
      </div>
    </div>
    <OTable :columns="columns" :data="tableData">
      <template #header="{ columns }">
        <tr>
          <th v-for="item in columns" :key="item.key">
            <div v-if="item.key === 'type'" class="filter-type">
              {{ item.label }}
              <ODropdown
                trigger="click"
                option-position="bottom"
                :option-wrap-class="
                  isDark ? 'type-dropdown-dark' : ''
                "
              >
                <div class="filter-title" :class="{'filter-title-active': queryData.type?.length}">
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
            <FilterableTableHeader
              v-else-if="item.key === 'affectedProduct'"
              v-model="productValue"
              @change="filterProductList"
              :options="productList"
              :multi="true"
              :searchable="false"
              :operation="false"
            >
              {{ item.label }}
            </FilterableTableHeader>
            <FilterableTableHeader
              v-else-if="item.key === 'affectedComponent'"
              v-model="componentValue"
              @change="filterComponentList"
              :options="componentList"
              :operation="false"
            >
              {{ item.label }}
            </FilterableTableHeader>
            <div v-else>{{ item.label }}</div>
          </th>
        </tr>
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
    <p class="time">{{ t('defectCenter.search') }}</p>
    <OInput
      v-model="searchValue"
      :placeholder="t('safetyBulletin.searchPlaceholder')"
      size="large"
      @input="(e) => onInputName(e.target?.value)"
      clearable
      @clear="onInputName('')"
      class="input-search-mb"
    >
      <template #prefix>
        <OIcon><IconSearch /></OIcon>
      </template>
    </OInput>
    <div class="data-picker-mb">
      <p class="time">{{ t('defectCenter.time') }}</p>
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
          @focus="focus"
          @blur="blur"
          :class="{'date-picker-active-mb': queryData.date?.length && dateFocus}"
        />
      </ClientOnly>
    </div>
    <div class="filter-mb">
      <FilterableMb
        v-model="typeValue"
        @change="filterTypeMb"
        :options="typeList"
        :searchable="false"
        :operation="false"
        :check-all="false"
        :title="t('defectCenter.severityLevel')"
      ></FilterableMb>
      <div class="filter-mb-item">
        <FilterableMb
          v-model="productValue"
          @change="filterProductList"
          :options="productList"
          :multi="true"
          :searchable="false"
          :operation="false"
          :title="t('defectCenter.affectedProduct')"
        ></FilterableMb>
      </div>
      <div class="filter-mb-item">
        <FilterableMb
          v-model="componentValue"
          @change="filterComponentList"
          :options="componentList"
          :operation="false"
          :title="t('defectCenter.affectedComponent')"
        ></FilterableMb>
      </div>
    </div>
    <ORow v-if="tableDataMb?.length" gap="0 16px" wrap="wrap">
      <OCol flex="0 0 100%" v-for="(item, i) in tableDataMb" :key="i">
        <OCard :href="`${route.path}detail/?id=${item.securityNoticeNo}`" :title="item.securityNoticeNo">
          <div class="info-item">
            <p class="item-label">{{ t('defectCenter.summary') }}</p>
            <p class="summary">{{ item.summary }}</p>
          </div>
          <div class="info-item">
            <p class="item-label">{{ t('defectCenter.severityLevel') }}</p>
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
              {{ t('defectCenter.affectedProduct') }}
            </p>
            <p class="summary">{{ item.affectedProduct }}</p>
          </div>
          <div class="info-item">
            <p class="item-label">
              {{ t('defectCenter.affectedComponent') }}
            </p>
            <p class="summary">{{ item.affectedComponent }}</p>
          </div>
          <div class="info-item">
            <p class="item-label">{{ t('defectCenter.releaseTime') }}</p>
            <p class="summary">
              {{ changeTimeStamp(new Date(item.announcementTime).getTime()) }}
            </p>
          </div>
        </OCard>
      </OCol>
    </ORow>
    <ResultEmpty
      v-else
      :style="{
        'margin-top': '40px',
        '--result-image-width': '140px',
        '--result-image-height': '170px',
      }"
    />
    <p
      v-if="tableDataMb.length && tableDataMb.length < total"
      class="loading"
    >
      {{ t('safetyBulletin.loading') }}...
    </p>
  </AppSection>
</template>

<style scoped lang="scss">
.defect-center-banner {
  background-color: var(--o-color-fill2);
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond('<=pad_v') {
    padding: 16px 24px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
    .o-btn {
      margin-top: 12px;
    }
  }
  @include respond('phone') {
    .mo-title {
      @include display1;
    }
  }
}

.app-section {
  --o-gap-section: 40px;

  @include respond('<=laptop') {
    --o-gap-section: 32px;
  }
  @include respond('phone') {
    --o-gap-section: 0;
    --o-gap-t2c: 0;
  }
}

.search-box {
  background-color: var(--o-color-fill2);
  padding: 16px 32px;
  border-radius: var(--o-radius-xs);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time {
    margin-right: 32px;
    color: var(--o-color-info1);
    @include text1;
  }
}
:deep(.el-date-editor) {
  width: 320px;
  &.el-input__wrapper {
    border-radius: var(--o-radius-xs);
    height: 40px;
    line-height: 40px;
  }
  .el-range-input {
    @include text1;
    &::-webkit-input-placeholder {
      color: var(--o-color-info4);
    }
  }
  .el-range__icon {
    height: 100%;
    order: 1;
    font-size: 24px;
    margin-right: 2px;
    color: var(--o-color-info1);
    background-color: var(--o-color-info2);
    mask: url('~@/assets/svg-icons/icon-calendar.svg') no-repeat center;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center center;
    svg {
      display: none;
    }
    @include respond('phone') {
      mask: url('~@/assets/svg-icons/icon-calendar.svg') no-repeat center / 16px;
    }
  }
  .el-range__close-icon {
    height: 100%;
    order: 1;
    font-size: 24px;
    margin-right: 2px;
    color: var(--o-color-info1);
    background-color: var(--o-color-info2);
    mask: url('~@/assets/svg-icons/icon-close.svg') no-repeat center;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center center;
    svg {
      display: none;
    }
    @include hover {
      @include x-hover;
    }
    @include respond('phone') {
      mask: url('~@/assets/svg-icons/icon-close.svg') no-repeat center/16px;
    }
  }
  &.date-picker-active {
    @include hover {
      .el-range__icon {
        opacity: 0;
        visibility: hidden;
        width: unset;
      }
      .el-range__close-icon {
        width: 24px;
        @include respond('phone') {
          width: 16px;
        }
      }
    }
  }
  &.date-picker-active-mb {
    .el-range__icon {
      opacity: 0;
      visibility: hidden;
      width: unset;
    }
    .el-range__close-icon {
      width: 24px;
      @include respond('phone') {
        width: 16px;
      }
    }
  }
}
.input-search {
  width: 320px;
  :deep(.o_box) {
    width: 320px;
  }
}
.o-input {
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
.moderate {
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

.filter-type {
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
.filter-title-active {
  color: var(--o-color-primary1);
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

@include respond('<=laptop') {
  :deep(.el-date-editor) {
    .el-range-input {
      @include text2;
    }
  }
}
@include respond('<=pad') {
  :deep(.el-date-editor) {
    .el-range-input {
      @include h4;
    }
  }
}
@include respond('<=pad_v') {
  .time {
    color: var(--o-color-info2);
    margin-bottom: 8px;
    @include text2;
  }
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
    .el-range-input {
      @include text2;
    }
  }
  .filter-mb {
    margin-top: 16px;
    display: flex;
    align-items: center;
  }
  .filter-mb-item {
    margin-left: 32px;
  }
  .o-row {
    margin-top: 16px;
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
    min-width: 56px;
    margin-right: 16px;
  }
  .type-tag {
    margin-top: 3px;
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
.el-picker__popper {
  --el-popper-border-radius: var(--o-radius-xs);
}
@include respond('phone') {
  .el-picker__popper {
    width: calc(100% - 48px) !important;
  }
  .el-picker-panel__sidebar {
    width: 100%;
  }
  .el-picker-panel {
    width: 100% !important;
  }
  .el-picker-panel__content {
    width: 100%;
  }
  .el-picker-panel__body {
    margin-left: 0 !important;
    display: flex;
    flex-direction: column;
    min-width: auto !important;
  }
  .el-picker-panel__sidebar {
    position: relative;
  }
  .el-picker-panel__body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

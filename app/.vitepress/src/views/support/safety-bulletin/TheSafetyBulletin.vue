<script lang="ts" setup>
import { reactive, ref, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import {
  getSecurityList,
  getProductList,
  getComponentList,
} from '@/api/api-security';
import {
  SecurityListsT,
  SafetyBulletinQueryT,
} from '@/shared/@types/type-support';

import { queryYears } from '@/data/security';

import type { CheckboxValueType } from 'element-plus';

import AppContent from '@/components/AppContent.vue';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconFilter from '~icons/app/icon-filter.svg';

import ODropdown from 'opendesign/dropdown/ODropdown.vue';
import OIcon from 'opendesign/icon/OIcon.vue';

import useWindowResize from '@/components/hooks/useWindowResize';
import { useDebounceFn } from '@vueuse/core';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const i18n = useI18n();
const router = useRouter();

const inputName = ref('');
const total = ref(0);
const currentPage = ref(1);
const totalPage = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const selectedYear = ref('');
const activeIndex = ref(-1);
const activeIndex1 = ref(0);
const activeNames = ref(['1']);

const tableData = ref<SecurityListsT[]>([]);

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

function getSecurityLists(data: SafetyBulletinQueryT) {
  getSecurityList(data).then((res: any) => {
    tableData.value = res.result.securityNoticeList;

    if (res.result.totalCount) {
      total.value = res.result.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
    } else {
      total.value = 0;
    }
  });
}

const selectTag = (i: number, type: string) => {
  activeIndex.value = i;
  queryData.type = [];
  queryData.type.push(type);
};

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
  currentPage.value = val;
};

function searchValchange() {
  queryData.keyword = inputName.value;
}

function jumpBulletinDetail(val: any) {
  router.go(`${router.route.path}detail/?id=${val}`);
}

const dateList = [
  ['2023-01-01', '2023-12-31'],
  ['2022-01-01', '2022-12-31'],
  ['2021-01-01', '2021-12-31'],
  ['2020-01-01', '2020-12-31'],
];

const selectYear = (i: number, val: string) => {
  selectedYear.value = val;
  activeIndex1.value = i;
  queryData.date = i === 0 ? [] : dateList[i - 1];
  activeNames.value = ['2'];
};

const checkAll = ref(false);
const isIndeterminate = ref(true);
const riskTypes = computed(() => i18n.value.safetyBulletin.SEVERITY_LIST);
// 严重级别
function handleCheckedTypesChange(value: CheckboxValueType[]) {
  checkAll.value = value.length === riskTypes.value.length;

  isIndeterminate.value =
    value.length > 0 && value.length < riskTypes.value.length;
}

function selectRatingChange(val: CheckboxValueType) {
  isIndeterminate.value = false;
  if (val) {
    queryData.type = riskTypes.value.map((item: any) => {
      return item.LABEL;
    });
  } else {
    queryData.type = [];
  }
}

// 影响产品
const isSelectAll = ref(false);
const isUnsure = ref(true);
const affectedProductList = ref<string[]>([]);
function getProducts() {
  getProductList().then((res: any) => {
    affectedProductList.value = res.result;
  });
}

function hanldCheckProductChange(val: CheckboxValueType) {
  if (val) {
    queryData.affectedProduct = affectedProductList.value;
  } else {
    queryData.affectedProduct = [];
  }

  isUnsure.value = false;
}

function handleSelecteProductChange(value: CheckboxValueType[]) {
  isSelectAll.value = value.length === affectedProductList.value.length;

  isUnsure.value =
    value.length > 0 && value.length < affectedProductList.value.length;
}

//影响组件
const affectedComponentList = ref<string[]>([]);
const componentTotalList = ref<string[]>([]);
function getAffectedComponentList() {
  getComponentList({
    securityLevel: queryData.type.join(','),
    affectedProduct: queryData.affectedProduct.join(','),
    noticeType: 'cve',
  }).then((res: any) => {
    componentTotalList.value = res.result;

    affectedComponentList.value = res.result.slice(0, 49);
  });
}

function getNextPage() {
  if (!isSearchList.value) {
    affectedComponentList.value = componentTotalList.value.slice(
      0,
      affectedComponentList.value.length + 50
    );
  } else {
    // 搜索结果的翻页
    searchList.value = searchTotalList.value.slice(
      0,
      searchList.value.length + 50
    );
  }
}

// 搜索组件
function searchComponent(keyword: string, data: string[]) {
  const regex = new RegExp(keyword, 'i');

  const results = [];
  for (let i = 0; i < data.length; i++) {
    if (regex.test(data[i])) {
      results.push(data[i]);
    }
  }
  return results;
}

const isSearchList = ref(false);
const keyWords = ref('');
const searchList = ref<string[]>([]);
const searchTotalList = ref<string[]>([]);
const searchInputComponent = useDebounceFn((val) => {
  searchTotalList.value = searchComponent(val, componentTotalList.value);

  if (keyWords.value) {
    isSearchList.value = true;
    searchList.value = searchTotalList.value.slice(0, 49);
  } else {
    isSearchList.value = false;

    affectedComponentList.value = componentTotalList.value.slice(0, 49);
  }
}, 500);

function handleCommand(val: string) {
  queryData.affectedComponent = val;
}

function handleCancelSelected() {
  queryData.affectedComponent = '';
}

onMounted(() => {
  getSecurityLists(queryData);
  getProducts();
  getAffectedComponentList();
});

watch(queryData, () => {
  getSecurityLists(queryData);
  getAffectedComponentList();
});
</script>

<template>
  <AppContent :mobile-top="16">
    <div class="bulletin-main">
      <div class="input-container">
        <OSearch
          v-model="inputName"
          :placeholder="i18n.safetyBulletin.SEARCH"
          @change="searchValchange"
        ></OSearch>

        <div class="data-picker">
          <p class="data-picker-title">{{ i18n.safetyBulletin.DATE_PICKER }}</p>

          <ClientOnly>
            <el-date-picker
              v-model="queryData.date"
              type="daterange"
              :start-placeholder="i18n.safetyBulletin.START_DATE"
              :end-placeholder="i18n.safetyBulletin.END_DATE"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :default-time="[new Date(), new Date()]"
            />
          </ClientOnly>
        </div>
      </div>

      <div class="filter-mobile">
        <div class="filter">
          <div
            v-for="(item, index) in i18n.safetyBulletin.SEVERITY_LIST"
            :key="item"
            :class="activeIndex === index ? 'selected' : ''"
            class="filter-item"
            @click="selectTag(index, item.LABEL)"
          >
            {{ item.NAME }}
          </div>
        </div>
      </div>
      <div class="calendar-mobile">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template #title>
              <o-icon><icon-calendar></icon-calendar></o-icon>
              <span class="selected-year">{{
                selectedYear === '' ? i18n.safetyBulletin.ALL : selectedYear
              }}</span>
            </template>
            <div class="years">
              <p
                v-for="(item, index) in queryYears"
                :key="item"
                class="years-item"
                :class="selectedYear === item ? 'selected' : ''"
                @click="selectYear(index, item)"
              >
                {{ item === '' ? i18n.safetyBulletin.ALL : item }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <OTable class="pc-list" :data="tableData" style="width: 100%">
        <el-table-column>
          <template #header>
            <span>{{ i18n.safetyBulletin.ADVISORY }}</span>
          </template>
          <template #default="scope">
            <span
              class="detail-page"
              @click="jumpBulletinDetail(scope.row.securityNoticeNo)"
            >
              {{ scope.row.securityNoticeNo }}
            </span>
          </template>
        </el-table-column>
        <OTableColumn
          :label="i18n.safetyBulletin.SYNOPSIS"
          prop="summary"
        ></OTableColumn>

        <el-table-column width="160">
          <template #header>
            <div v-if="queryData.type.length" class="selected-box">
              <span class="selected-content" :title="queryData.type.join(' ')">
                {{ queryData.type.join(' ') }}
              </span>
            </div>

            <span v-else> {{ i18n.safetyBulletin.SEVERITY }}</span>
            <ODropdown :max-height="250" :listener-scorll="true">
              <OIcon class="filter-icon">
                <IconFilter></IconFilter>
              </OIcon>

              <template #dropdown>
                <ClientOnly>
                  <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="selectRatingChange"
                  >
                    {{ i18n.safetyBulletin.SELECT_ALL }}
                  </el-checkbox>

                  <el-checkbox-group
                    v-model="queryData.type"
                    @change="handleCheckedTypesChange"
                  >
                    <el-checkbox
                      v-for="risk in riskTypes"
                      :key="risk.NAME"
                      :label="risk.LABEL"
                      >{{ risk.NAME }}</el-checkbox
                    >
                  </el-checkbox-group>
                </ClientOnly>
              </template>
            </ODropdown>
          </template>
          <template #default="scope">
            <span>
              {{ scope.row.type }}
            </span>
          </template>
        </el-table-column>

        <el-table-column width="400">
          <template #header>
            <div
              v-if="queryData.affectedProduct.length"
              class="selected-box"
              :title="queryData.affectedProduct.join(' ')"
            >
              <span class="product-title">
                {{ queryData.affectedProduct.join(' ') }}
              </span>
            </div>
            <span v-else>{{ i18n.safetyBulletin.AFFECTED_PRODUCTS }}</span>

            <ODropdown :max-height="250" :listener-scorll="true">
              <OIcon class="filter-icon">
                <IconFilter></IconFilter>
              </OIcon>
              <template #dropdown>
                <ClientOnly>
                  <el-checkbox
                    v-model="isSelectAll"
                    :indeterminate="isUnsure"
                    @change="hanldCheckProductChange"
                  >
                    {{ i18n.safetyBulletin.AFFECTED_PRODUCTS }}
                  </el-checkbox>

                  <el-checkbox-group
                    v-model="queryData.affectedProduct"
                    @change="handleSelecteProductChange"
                  >
                    <el-checkbox
                      v-for="product in affectedProductList"
                      :key="product"
                      :label="product"
                      >{{ product }}</el-checkbox
                    >
                  </el-checkbox-group>
                </ClientOnly>
              </template>
            </ODropdown>
          </template>
          <template #default="scope">
            <span>
              {{ scope.row.affectedProduct }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          :label="i18n.safetyBulletin.AFFECTED_COMPONENTS"
          width="160"
        >
          <template #header>
            <span
              v-if="queryData.affectedComponent"
              class="component-title"
              :title="queryData.affectedComponent"
              >{{ queryData.affectedComponent }}</span
            >
            <span v-else>{{ i18n.safetyBulletin.AFFECTED_COMPONENTS }}</span>

            <ODropdown
              :max-height="250"
              :listener-scorll="true"
              popper-class="popper-dropdown"
              @scorll-bottom="getNextPage"
              @command="(val: string) => handleCommand(val)"
            >
              <OIcon class="filter-icon">
                <IconFilter></IconFilter>
              </OIcon>

              <template #dropdown>
                <div class="search-box">
                  <div
                    v-if="queryData.affectedComponent"
                    class="cancel-select"
                    @click="handleCancelSelected"
                  >
                    {{ i18n.safetyBulletin.CANCEL }}
                  </div>
                  <OSearch
                    v-model="keyWords"
                    :placeholder="i18n.safetyBulletin.SEARCH"
                    @input="searchInputComponent"
                  ></OSearch>
                </div>

                <div v-if="!keyWords">
                  <ODropdownItem
                    v-for="component in affectedComponentList"
                    :key="component"
                    :command="component"
                    :class="
                      queryData.affectedComponent === component
                        ? 'is-active'
                        : ''
                    "
                  >
                    {{ component }}
                  </ODropdownItem>
                </div>

                <div v-else>
                  <div v-if="searchList.length">
                    <ODropdownItem
                      v-for="component in searchList"
                      :key="component"
                      :command="component"
                      :class="
                        queryData.affectedComponent === component
                          ? 'is-active'
                          : ''
                      "
                    >
                      {{ component }}
                    </ODropdownItem>
                  </div>

                  <div v-else class="no-data">No Data</div>
                </div>
              </template>
            </ODropdown>
          </template>
          <template #default="scope">
            <span>
              {{ scope.row.affectedComponent }}
            </span>
          </template>
        </el-table-column>
        <OTableColumn
          :label="i18n.safetyBulletin.RELEASE_DATE"
          width="150"
          prop="announcementTime"
        ></OTableColumn>
        <el-table-column width="150" :label="i18n.safetyBulletin.UPDATE_TIME">
          <template #default="scope">
            <span>
              {{ scope.row.updateTime?.split(' ')[0] }}
            </span>
          </template>
        </el-table-column>
      </OTable>

      <ul class="mobile-list">
        <li v-for="item in tableData" :key="item.id" class="item">
          <ul>
            <li @click="jumpBulletinDetail(item.securityNoticeNo)">
              <span>{{ i18n.safetyBulletin.ADVISORY }}:</span
              ><span class="notice">{{ item.securityNoticeNo }}</span>
            </li>
            <li>
              <span>{{ i18n.safetyBulletin.OVERVIEW }}:</span>{{ item.summary }}
            </li>
            <li>
              <span>{{ i18n.safetyBulletin.SEVERITY }}:</span>{{ item.type }}
            </li>
            <li>
              <span>{{ i18n.safetyBulletin.AFFECTED_PRODUCTS }}:</span
              >{{ item.affectedProduct }}
            </li>
            <li>
              <span>{{ i18n.safetyBulletin.AFFECTED_COMPONENTS }}:</span
              >{{ item.affectedComponent }}
            </li>
            <li>
              <span>{{ i18n.safetyBulletin.RELEASE_DATE }}:</span
              >{{ item.announcementTime }}
            </li>
            <li>
              <span>{{ i18n.safetyBulletin.UPDATE_TIME }}:</span
              >{{ item.updateTime?.split(' ')[0] }}
            </li>
          </ul>
        </li>
      </ul>

      <div v-if="total === 0 && isMobile" class="empty-tip">未搜索到数据</div>

      <div class="pagination">
        <ClientOnly>
          <OPagination
            v-model:page-size="queryData.pages.size"
            v-model:current-page="queryData.pages.page"
            :page-sizes="[10, 20, 40, 80]"
            :layout="layout"
            :total="total"
            :background="true"
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @jump-page="handleCurrentChange"
          >
            <span class="slot-content">{{ currentPage }}/{{ totalPage }}</span>
          </OPagination>
        </ClientOnly>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.el-dropdown__popper {
  .el-checkbox {
    margin-right: 0;
    padding: 4px 8px;
    color: var(--e-color-text1);
  }
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
  }
}
.no-data {
  padding: 8px 12px;
  text-align: center;
  color: var(--e-color-text1);
}
.search-box {
  position: sticky;
  top: 0;
  .o-search {
    width: 100%;
  }

  .cancel-select {
    padding: 4px 8px;
    cursor: pointer;
    &:hover {
      color: var(--e-color-brand1);
    }
  }
}

.bulletin-main {
  max-width: 1504px;
  margin: 0 auto;
  .input-container {
    display: flex;
    @media screen and (max-width: 768px) {
      margin-bottom: var(--e-spacing-h5);
    }
    :deep(.o-search) {
      height: 48px;
      @media screen and (max-width: 768px) {
        height: 36px;
      }
    }

    .data-picker {
      display: flex;
      margin-left: 32px;
      @media screen and (max-width: 768px) {
        display: none;
      }
      .data-picker-title {
        width: max-content;
        line-height: 48px;
        margin-right: 12px;
        font-size: 14px;
        color: var(--e-color-text1);
      }
    }
  }
  .calendar-mobile {
    display: none;
    margin: var(--e-spacing-h5) 0;
    width: 100%;
    background-color: var(--e-color-bg2);
    .o-icon {
      color: var(--e-color-text1);
    }
    .selected-year {
      color: var(--e-color-text1);
    }
    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header {
        background-color: var(--e-color-bg2);
        padding: 0 8px;
        border: none;
        height: 36px;
      }
      .el-collapse-item__wrap {
        border: none;
      }
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }

    .selected-year {
      margin-left: 8px;
    }
    .years {
      padding: 0 8px 8px;
      background-color: var(--e-color-bg2);
      color: var(--e-color-text1);
      &-item {
        padding: 2px 0;
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-h8);
      }
      .selected {
        background-color: var(--e-color-bg4);
      }
    }
    @media screen and (max-width: 768px) {
      display: block;
    }
  }

  .filter-mobile {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
    .filter {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: var(--e-spacing-h8);
      .selected {
        background-color: var(--e-color-brand1);
        color: var(--e-color-text2);
      }
      &-item {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: var(--e-spacing-h9);
        font-size: var(--e-font-size-text);
        font-weight: 400;
        color: var(--e-color-brand1);
        line-height: var(--e-line-height-text);
        border: 1px solid var(--e-color-brand1);
        border-right: 0;
        &:last-child {
          border: 1px solid var(--e-color-brand1);
        }
      }
    }
  }
  .pc-list {
    margin-top: var(--e-spacing-h2);
    @media screen and (max-width: 768px) {
      display: none;
    }
    .detail-page {
      color: var(--e-color-link1);
      cursor: pointer;
    }

    .selected-box {
      max-height: 50px;
      overflow: hidden;

      .selected-content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-spacing: 100vw;
        color: var(--e-color-brand1);
        max-width: 56px;
      }
    }

    .filter-icon {
      cursor: pointer;
      flex-shrink: 0;
      margin-left: 5px;
      color: var(--e-color-text1);
    }

    .product-title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-spacing: 100vw;
      max-width: 172px;
      color: var(--e-color-brand1);
    }
    .component-title {
      color: var(--e-color-brand1);
      max-width: 108px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .empty-tip {
    text-align: center;
    font-size: var(--e-font-size-tip);
    color: var(--e-color-text4);
    padding: var(--e-spacing-h2) 0;
  }
  .mobile-list {
    display: none;
    box-shadow: var(--e-shadow1);
    @media screen and (max-width: 768px) {
      display: block;
    }
    .item {
      padding: var(--e-spacing-h5) var(--e-spacing-h5) var(--e-spacing-h8);
      font-size: var(--e-font-size-tip);
      font-weight: 400;
      color: var(--e-color-neutral8);
      line-height: var(--e-line-height-tip);
      background-color: var(--e-color-bg2);
      &:nth-child(odd) {
        background: var(--e-color-bg4);
      }
      & li {
        margin-bottom: var(--e-spacing-h8);
      }
      li:first-child {
        .notice {
          color: var(--e-color-link1);
        }
      }
      li:nth-child(4) {
        display: flex;
        span {
          min-width: 52px;
        }
      }
      span {
        color: var(--e-color-text1);
        margin-right: var(--e-spacing-h8);
      }
    }
  }
  .pagination {
    margin-top: var(--e-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
    .slot-content {
      font-size: var(--e-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-spacing-h4);
    }
  }
  :deep(.el-table th.el-table__cell > .cell) {
    display: flex;
    align-items: center;
  }
}
</style>

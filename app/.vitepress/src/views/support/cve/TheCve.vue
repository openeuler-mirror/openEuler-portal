<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';

import { queryYears } from '@/data/security';
import { getCveList } from '@/api/api-security';
import { CveListsT, CveQueryT } from '@/shared/@types/type-support';

import TagFilter from '@/components/TagFilter.vue';
import AppContent from '@/components/AppContent.vue';

import IconCalendar from '~icons/app/icon-calendar.svg';

const i18n = useI18n();
const router = useRouter();
const currentPage = ref(1);
const totalPage = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const searchContent = ref('');
const activeIndex = ref(0);
const selectedYear = ref('');
const activeScore = ref(0);
const activeYear = ref(0);
const activeNames = ref(['1']);

const tableData = ref<CveListsT[]>([]);

const queryData: CveQueryT = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  status: '',
  year: '',
  score: '',
  noticeType: 'cve',
});

function getCveLists(data: CveQueryT) {
  getCveList(data).then((res: any) => {
    tableData.value = res.result.cveDatabaseList;
    total.value = res.result.totalCount;
    totalPage.value = Math.ceil(total.value / queryData.pages.size);
  });
}

const selectTypetag = (i: number, category: string) => {
  activeIndex.value = i;
  queryData.status = category;
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
  queryData.keyword = searchContent.value;
}

function goCveDetail(id: string, name: string) {
  router.go(`${router.route.path}detail/?cveId=${id}&packageName=${name}`);
}

const selectScore = (i: number, type: string) => {
  activeScore.value = i;
  queryData.score = type;
};

const selectYear = (i: number, type: string) => {
  queryData.year = type;
  activeYear.value = i;
  selectedYear.value = type === '' ? i18n.value.safetyBulletin.ALL : type;
  activeNames.value = ['2'];
};

onMounted(() => {
  getCveLists(queryData);
});

watch(queryData, () => getCveLists(queryData));
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="o-search">
      <OSearch
        v-model="searchContent"
        :placeholder="i18n.cve.INPUT_CVE_ID"
        @change="searchValchange"
      ></OSearch>
    </div>

    <div class="filter-card">
      <TagFilter :label="i18n.cve.STATUS" :show="false">
        <OTag
          v-for="(item, index) in i18n.cve.CATEGORY_LIST"
          :key="'tag' + index"
          checkable
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="selectTypetag(index, item.LABEL)"
        >
          {{ item.NAME }}
        </OTag>
      </TagFilter>

      <TagFilter :show="false" :label="i18n.safetyBulletin.YEAR">
        <OTag
          v-for="(item, index) in queryYears"
          :key="'tag' + index"
          checkable
          :type="activeYear === index ? 'primary' : 'text'"
          @click="selectYear(index, item)"
        >
          {{ item === '' ? i18n.safetyBulletin.ALL : item }}
        </OTag>
      </TagFilter>
      <TagFilter :label="i18n.cve.CVSS_SCORE" :show="false">
        <OTag
          v-for="(item, index) in i18n.cve.CVSS_LIST"
          :key="'tag' + index"
          :title="item.LABEL ? `${i18n.cve.CVSS_SCORE}: ${item.LABEL}` : ''"
          checkable
          :type="activeScore === index ? 'primary' : 'text'"
          @click="selectScore(index, item.LABEL)"
        >
          {{ item.NAME }}
        </OTag>
      </TagFilter>
    </div>
    <ClientOnly>
      <div class="filter-mobile">
        <div class="filter">
          <div
            v-for="(item, index) in i18n.cve.CATEGORY_LIST"
            :key="index"
            :class="activeIndex === index ? 'selected' : ''"
            class="filter-item"
            @click="selectTypetag(index, item.LABEL)"
          >
            {{ item.NAME }}
          </div>
        </div>
        <div class="filter">
          <div
            v-for="(item, index) in i18n.cve.CVSS_LIST"
            :key="item.NAME"
            :class="activeScore === index ? 'selected' : ''"
            class="filter-item"
            @click="selectScore(index, item.LABEL)"
          >
            {{ item.NAME }}
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
                  :key="index"
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
      </div>
      <ul class="mobile-list">
        <li v-for="(item, index) in tableData" :key="index" class="item">
          <ul>
            <li>
              <span>{{ i18n.cve.CVE }}:</span>{{ item.cveId }}
            </li>
            <li>
              <span>{{ i18n.cve.SYNOPSIS }}:</span>{{ item.summary }}
            </li>
            <li>
              <span>{{ i18n.cve.CVSS_SCORE }}:</span>{{ item.cvsssCoreOE }}
            </li>
            <li>
              <span>{{ i18n.cve.RELEASE_DATE }}:</span>{{ item.createTime }}
            </li>
            <li>
              <span>{{ i18n.cve.UPDATE_TIME }}:</span>{{ item.updateTime }}
            </li>
            <li>
              <span>{{ i18n.cve.STATUS }}:</span>{{ item.status }}
            </li>
            <li>
              <span>{{ i18n.cve.OPERATION }}:</span
              ><a
                class="detail-page"
                @click="goCveDetail(item.cveId, item.packageName)"
                >{{ i18n.cve.DETAIL }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </ClientOnly>
    <OTable class="pc-list" :data="tableData" style="width: 100%">
      <el-table-column :label="i18n.cve.CVE" width="160">
        <template #default="scope">
          <span
            class="detail-page"
            @click="goCveDetail(scope.row?.cveId, scope.row?.packageName)"
            >{{ scope.row.cveId }}</span
          >
        </template>
      </el-table-column>

      <OTableColumn :label="i18n.cve.SYNOPSIS" prop="summary"></OTableColumn>
      <OTableColumn
        :label="i18n.cve.CVSS_SCORE"
        prop="cvsssCoreOE"
        width="150"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.cve.RELEASE_DATE"
        prop="createTime"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.cve.UPDATE_TIME"
        prop="updateTime"
      ></OTableColumn>
      <OTableColumn
        width="120"
        :label="i18n.cve.PACKAGE"
        prop="packageName"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.cve.STATUS"
        prop="status"
        width="100"
      ></OTableColumn>
      <el-table-column :label="i18n.cve.OPERATION" width="100">
        <template #default="scope">
          <span
            class="detail-page"
            @click="goCveDetail(scope.row?.cveId, scope.row?.packageName)"
            >{{ i18n.cve?.DETAIL }}</span
          >
        </template>
      </el-table-column>
    </OTable>

    <div v-if="totalPage === 0" class="empty-status">
      {{ i18n.cve.EMPTY_SEARCH_RESULT }}
    </div>

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
          <span class="pagination-slot">
            {{ currentPage }}/{{ totalPage }}</span
          >
        </OPagination>
      </ClientOnly>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  :deep(.el-input .el-input__wrapper) {
    .el-input__inner {
      font-size: var(--e-font-size-tip);
    }
    .el-input__prefix-inner {
      font-size: var(--e-font-size-h8) !important;
    }
  }
}
.o-search {
  height: 48px;
  @media screen and (max-width: 768px) {
    height: 36px;
    margin-bottom: var(--e-spacing-h6);
  }
}
.filter-card {
  margin: var(--e-spacing-h4) 0;
  background-color: var(--e-color-bg2);
  padding: var(--e-spacing-h5) var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    display: none;
  }
  :deep(.tag-filter) {
    .label {
      width: 80px;
    }
  }
}
.filter-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    margin-bottom: var(--e-spacing-h6);
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
      padding: var(--e-spacing-h9) 0;
      font-size: var(--e-font-size-tip);
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
.empty-status {
  display: none;
  text-align: center;
  font-size: var(--e-font-size-tip);
  color: var(--e-color-text4);
  line-height: var(--e-spacing-tip);
  padding: var(--e-spacing-h2) 0 var(--e-spacing-h5);
  @media screen and (max-width: 768px) {
    display: block;
  }
}
.mobile-list {
  display: none;
  box-shadow: var(--e-shadow1);
  @media screen and (max-width: 768px) {
    display: block;
  }
  .item {
    padding: var(--e-spacing-h5);
    font-size: var(--e-font-size-tip);
    font-weight: 400;
    color: #999999;
    line-height: var(--e-line-height-tip);
    background-color: var(--e-color-bg2);
    &:nth-child(odd) {
      background: var(--e-color-bg4);
    }
    & li {
      margin-bottom: var(--e-spacing-h8);
      word-break: break-word;
    }
    li:last-child {
      margin-bottom: 0;
      a {
        color: var(--e-color-link1);
      }
    }
    li:nth-child(2) {
      display: flex;
      span {
        min-width: 30px;
      }
    }
    span {
      color: var(--e-color-text1);
      margin-right: var(--e-spacing-h8);
    }
  }
}
.pc-list {
  .detail-page {
    cursor: pointer;
    color: var(--e-color-link1);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.pagination {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h5);
  }
  .pagination-slot {
    font-size: var(--e-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-spacing-h4);
  }
}
</style>

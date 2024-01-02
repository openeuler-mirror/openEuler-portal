<script lang="ts" setup>
import { reactive, ref, watch, onMounted, computed } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import { OsvQueryT, OsvListT } from '@/shared/@types/type-support';
import { getOsName, getOsType, getOsTableData } from '@/api/api-security';

import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import banner from '@/assets/banner/banner-security.png';
import osv from '@/assets/illustrations/support/osv.png';
import IconUp from '~icons/app/icon-chevron-up.svg';

import useWindowResize from '@/components/hooks/useWindowResize';

const router = useRouter();

const screenWidth = useWindowResize();
const i18n = useI18n();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
const { lang } = useData();
const all = computed(() => {
  if (lang.value === 'en') {
    return 'All';
  } else if (lang.value === 'ru') {
    return 'Bсе';
  } else {
    return '全部';
  }
});

const inputName = ref('');
const osNames = ref([`${all.value}`]);
const osTypes = ref([`${all.value}`]);
const osvList = ref<OsvListT[]>([]);
const activeIndex = ref(0);
const activeIndex1 = ref(0);
const total = ref(0);
const currentPage = ref(1);
const totalPage = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const osName = ref('');
const osType = ref('');

const queryData: OsvQueryT = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  type: '',
  osvName: '',
});

function selectOsName(val: string) {
  queryData.osvName = val === '全部' ? '' : val;
  activeIndex.value = osNames.value.indexOf(val);
}

function selectOsType(val: string) {
  queryData.type = val === '全部' ? '' : val;
  activeIndex1.value = osTypes.value.indexOf(val);
}

const selectTypeTag = (i: number, name: string) => {
  activeIndex.value = i;
  osName.value = name;
  queryData.osvName = name === '全部' ? '' : name;
};

function changeSearchVal() {
  queryData.keyword = inputName.value;
}

const clickTypeTag = (i: number, type: string) => {
  queryData.type = type === '全部' ? '' : type;
  osType.value = type;
  activeIndex1.value = i;
};

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
  currentPage.value = val;
};

const goApproveInfo = (id: number) => {
  router.go(`${router.route.path}approve-info/?id=${JSON.stringify(id)}`);
};

function turnPage(option: string) {
  if (option === 'prev' && queryData.pages.page > 1) {
    queryData.pages.page = queryData.pages.page - 1;
  } else if (option === 'next' && queryData.pages.page < total.value) {
    queryData.pages.page = queryData.pages.page + 1;
  }
}

const getOsTableList = (data: OsvQueryT) => {
  getOsTableData(data).then((res: any) => {
    osvList.value = res.result.osvList;
    total.value = res.result.totalCount;
    totalPage.value = Math.ceil(res.result.totalCount / queryData.pages.size);
  });
};

const goBackPage = () => {
  router.go(`${router.route.path}approve-step/`);
};

onMounted(() => {
  getOsName().then((res: any) => {
    res.result.forEach((item: string) => {
      osNames.value.push(item);
    });
  });

  getOsType().then((res: any) => {
    res.result.forEach((item: string) => {
      osTypes.value.push(item);
    });
  });

  getOsTableList(queryData);
});

watch(queryData, () => getOsTableList(queryData));

const isExpand = ref(false);
const getMoreTags = () => {
  isExpand.value = !isExpand.value;
};
</script>
<template>
  <BannerLevel2
    class="banner-pc"
    :background-image="banner"
    background-text="SUPPORT"
    :title="i18n.approve.TITLE"
    subtitle=""
    :illustration="osv"
  />
  <AppContent :mobile-top="16">
    <div class="approve-desc">
      <p class="approve-desc-container">
        {{ i18n.approve.SUMMARY.CONTENT }}
      </p>
    </div>
    <div class="filter-card-mobile">
      <div class="filter-box">
        <ClientOnly>
          <OSelect
            v-model="osName"
            :placeholder="i18n.approve.SELECT_COMPANY"
            @change="selectOsName"
          >
            <OOption
              v-for="item in osNames"
              :key="item"
              :label="item"
              :value="item"
              >{{ item }}</OOption
            >
          </OSelect>
        </ClientOnly>
        <ClientOnly>
          <OSelect
            v-model="osType"
            :placeholder="i18n.approve.TABLE_COLUMN.TYPE"
            @change="selectOsType"
          >
            <OOption
              v-for="item in osTypes"
              :key="item"
              :label="item"
              :value="item"
              >{{ item }}</OOption
            >
          </OSelect>
        </ClientOnly>
      </div>
    </div>

    <ClientOnly>
      <OSearch
        v-model="inputName"
        class="search"
        :placeholder="i18n.approve.SEARCH_PLACEHOLDER"
        @change="changeSearchVal"
      ></OSearch
    ></ClientOnly>

    <OCard class="filter-card">
      <template #header>
        <div class="card-header">
          <TagFilter :label="i18n.approve.SELECT_COMPANY" :show="false">
            <p class="expand-retract" @click="getMoreTags">
              {{ isExpand ? i18n.approve.RETRACT : i18n.approve.EXPAND }}
              <OIcon class="expand-icon" :class="isExpand ? 'rotated' : ''"
                ><IconUp />
              </OIcon>
            </p>

            <div class="filter-content" :class="isExpand ? 'is-expanded' : ''">
              <OTag
                v-for="(item, index) in osNames"
                :key="'tag' + index"
                checkable
                :type="activeIndex === index ? 'primary' : 'text'"
                @click="selectTypeTag(index, item)"
              >
                {{ item }}
              </OTag>
            </div>
          </TagFilter>
        </div>
      </template>

      <div class="card-body">
        <TagFilter :show="false" :label="i18n.approve.TABLE_COLUMN.TYPE">
          <OTag
            v-for="(item, index) in osTypes"
            :key="'tag' + index"
            checkable
            :type="activeIndex1 === index ? 'primary' : 'text'"
            @click="clickTypeTag(index, item)"
          >
            {{ item }}
          </OTag>
        </TagFilter>
      </div>
    </OCard>

    <OTable class="pc-list" :data="osvList" style="width: 100%">
      <OTableColumn :label="i18n.approve.TABLE_COLUMN.ARCHITECTURE" prop="arch">
      </OTableColumn>
      <OTableColumn :label="i18n.approve.TABLE_COLUMN.COMPANY" prop="osvName">
      </OTableColumn>
      <OTableColumn :label="i18n.approve.TABLE_COLUMN.VERSION" prop="osVersion">
      </OTableColumn>

      <el-table-column :label="i18n.approve.TABLE_COLUMN.DOWNLOAD" width="220">
        <template #default="scope">
          <a
            :href="scope.row.osDownloadLink"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >{{ scope.row.osDownloadLink }}</a
          >
        </template>
      </el-table-column>

      <OTableColumn :label="i18n.approve.TABLE_COLUMN.TYPE" prop="type">
      </OTableColumn>
      <OTableColumn :label="i18n.approve.TABLE_COLUMN.DATE" prop="date">
      </OTableColumn>

      <el-table-column :label="i18n.approve.TABLE_COLUMN.DETAILS" width="140">
        <template #default="scope">
          <span class="link" @click="goApproveInfo(scope.row.id)">{{
            scope.row.details
          }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="i18n.approve.TABLE_COLUMN.DETAILS" width="160">
        <template #default="scope">
          <a
            :href="scope.row.friendlyLink"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >{{ i18n.approve.TABLE_COLUMN.LINK }}</a
          >
        </template>
      </el-table-column>
    </OTable>

    <ul class="mobile-list">
      <li v-for="item in osvList" :key="item.id" class="item">
        <ul>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.ARCHITECTURE }}:</span
            ><span>{{ item.arch }}</span>
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.COMPANY }}:</span
            >{{ item.osvName }}
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.VERSION }}:</span
            >{{ item.osVersion }}
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.DOWNLOAD }}:</span>
            <a
              :href="item.osDownloadLink"
              target="_blank"
              rel="noopener noreferrer"
              >{{ item.osDownloadLink }}</a
            >
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.TYPE }}:</span>{{ item.type }}
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.DATE }}:</span>{{ item.date }}
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.DETAILS }}:</span
            ><span class="link" @click="goApproveInfo(item.id)">{{
              item.details
            }}</span>
          </li>
          <li>
            <span>{{ i18n.approve.TABLE_COLUMN.LINK }}:</span
            ><a
              :href="item.friendlyLink"
              target="_blank"
              rel="noopener noreferrer"
              >{{ item.friendlyLink }}</a
            >
          </li>
        </ul>
      </li>
    </ul>

    <div v-if="total === 0" class="empty-status">
      {{ i18n.compatibility.EMPTY_SEARCH_RESULT }}
    </div>

    <OPagination
      v-if="total > 0"
      v-model:page-size="queryData.pages.size"
      v-model:currentPage="queryData.pages.page"
      :page-sizes="[10, 20, 40, 80]"
      :layout="layout"
      :total="total"
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <span class="slot-content">{{ currentPage }}/{{ totalPage }}</span>
    </OPagination>

    <p class="about">
      {{ i18n.approve.TO_STEP.TEXT_1 }}
      <a href="#" @click="goBackPage">{{ i18n.approve.TO_STEP.LINK_1 }}</a>
    </p>

    <AppPaginationMo
      v-if="Math.ceil(total / 10) > 0 && isMobile"
      :current-page="queryData.pages.page"
      :total-page="Math.ceil(total / 10)"
      @turn-page="turnPage"
    />
  </AppContent>
</template>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  :deep(.el-input .el-input__wrapper) {
    .el-input__inner {
      font-size: var(--o-font-size-tip);
    }
    .el-input__prefix-inner {
      font-size: var(--o-font-size-h8) !important;
    }
  }
}
.approve-desc {
  padding-bottom: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding-bottom: var(--o-spacing-h5);
  }
  &-container {
    max-width: 1504px;
    margin: 0 auto;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    font-size: var(--o-font-size-h7);
    @media screen and (max-width: 768px) {
      line-height: var(--o-line-height-tip);
      font-size: var(--o-font-size-tip);
    }
  }
}
.search {
  height: 48px;
  @media screen and (max-width: 768px) {
    height: 36px;
    margin-bottom: var(--o-spacing-h6);
  }
}
.filter-card-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  .filter-box {
    display: flex;
    flex-direction: column;
    .o-select {
      margin-bottom: var(--o-spacing-h6);
    }
  }
}
.filter-card {
  margin: var(--o-spacing-h4) 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
  :deep(.el-card__body) {
    padding: var(--o-spacing-h8) var(--o-spacing-h2);
    .o-tag {
      margin: var(--o-spacing-h10);
    }
  }
  .category {
    display: inline-block;
    width: 56px;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    margin-right: var(--o-spacing-h4);
  }
  .category-item {
    display: inline-block;
    height: 28px;
    border: none;
    margin-right: var(--o-spacing-h3);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 400;
    color: var(--o-color-text4);
    cursor: pointer;
  }
  .active {
    display: inline-block;
    border: 1px solid var(--o-color-link1);
    color: var(--o-color-link1);
    padding: 0px var(--o-spacing-h6);
  }
  .card-header {
    padding-bottom: var(--o-spacing-h8);
    border-bottom: 1px solid var(--o-color-division1);
  }

  // os厂商筛选标签收起/展开，暂时隐藏
  .expand-retract {
    position: absolute;
    right: 16px;
    top: 18px;
    cursor: pointer;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    display: none;
  }
  .expand-icon {
    position: absolute;
    top: 0px;
    right: -18px;
    transition: all 0.3s linear;
    font-size: var(--o-font-size-h8);
    &.rotated {
      transform: rotateZ(180deg);
    }
  }
  .filter-content {
    // max-height: 106px;
    // overflow: auto;
    // transition: all 0.3s linear;
    &.is-expanded {
      max-height: 1000px;
      overflow: visible;
    }
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: var(--o-color-bg2);
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--o-color-bg2);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: var(--o-color-division1);
    }
  }

  .card-body {
    padding-top: var(--o-spacing-h8);
  }
}
.pc-list {
  margin-bottom: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    display: none;
  }
  .link {
    color: var(--o-color-link1);
    cursor: pointer;
  }
}
.empty-status {
  text-align: center;
  font-size: var(--o-font-size-tip);
  color: var(--o-color-text4);
  line-height: var(--o-spacing-tip);
  padding: var(--o-spacing-h2) 0 var(--o-spacing-h5);
}
.mobile-list {
  display: none;
  margin-bottom: var(--o-spacing-h5);
  box-shadow: var(--o-shadow1);
  @media screen and (max-width: 768px) {
    display: block;
  }
  .item {
    padding: var(--o-spacing-h5) var(--o-spacing-h5) var(--o-spacing-h8);
    font-size: var(--o-font-size-tip);
    font-weight: 400;
    color: var(--o-color-neutral8);
    line-height: var(--o-line-height-tip);
    background-color: var(--o-color-bg2);
    &:nth-child(odd) {
      background: var(--o-color-bg4);
    }
    & li {
      margin-bottom: var(--o-spacing-h8);
    }
    li:last-child {
      margin-bottom: 0;
    }
    li:nth-child(4) {
      display: flex;
      span {
        min-width: 52px;
      }
    }
    span {
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h8);
    }
    .link {
      cursor: pointer;
      color: var(--o-color-link1);
    }
  }
}
.about {
  margin-top: var(--o-spacing-h4);
  font-size: var(--o-font-size-h8);
  font-weight: 400;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h8);
  @media screen and (max-width: 768px) {
    display: none;
  }
  a {
    color: var(--o-color-link1);
  }
}
.slot-content {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--o-color-text1);
  line-height: var(--o-spacing-h4);
}
</style>

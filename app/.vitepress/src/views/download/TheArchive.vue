<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue';
import { useData } from 'vitepress';
import cloneTool from 'lodash';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import type { DownloadCommunityData } from '@/shared/@types/type-download';

import AppContent from '@/components/AppContent.vue';
import TagFilter from '@/components/TagFilter.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

// import IconFilter from '~icons/app/icon-filter.svg';
// import IconCancel from '~icons/app/icon-cancel.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));

//分页与数据项目
const currentPage = ref(1);
const pageSize = ref(10);
const filterList: Ref<DownloadCommunityData[]> = ref([]);
const dataList = computed(() => {
  return filterList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});
const total = computed(() => {
  return filterList.value.length;
});

//数据筛选
const tagScenario = cloneTool.cloneDeep(i18n.value.download.SCENARIO_LIST);
const activeScenario = ref(tagScenario[0].KEY);
const tagArch: Ref<string[]> = ref([]);
const activeArch = ref('');
const activeVersionType = ref(i18n.value.download.VERSION_LIST[0].KEY);
const allList: any = ref(
  cloneTool.cloneDeep(i18n.value.download.COMMUNITY_LIST)
);
const setTagArch = () => {
  allList.value.forEach((item: any) => {
    if (item.DETAILED_LINK) {
      item.DETAILED_LINK.forEach((itemLink: any) => {
        if (!tagArch.value.includes(itemLink.ARCH) && itemLink.ARCH) {
          tagArch.value.push(itemLink.ARCH);
        }
      });
    }
  });
  tagArch.value.unshift(i18n.value.download.ALL_DATA);
  activeArch.value = tagArch.value[0];
};
function onArchTagClick(index: number, item: string) {
  activeArch.value = item;
}
function onScenarioTagClick(index: number, item: string) {
  activeScenario.value = item;
}
function onVersionTypeTagClick(index: number, item: string) {
  activeVersionType.value = item;
}
function getTableData() {
  let temp = [];
  if (activeScenario.value === tagScenario[0].KEY) {
    temp = allList.value;
  } else {
    allList.value.forEach((item: any) => {
      let flag = false;
      if (item.DETAILED_LINK) {
        item.DETAILED_LINK.forEach((itemLink: any) => {
          if (itemLink.SCENARIO === activeScenario.value) {
            flag = true;
          }
        });
      }
      if (flag) {
        temp.push(item);
      }
    });
  }
  let temp1: any = [];
  if (activeArch.value === tagArch.value[0]) {
    temp1 = temp;
  } else {
    temp.forEach((item: any) => {
      let flag = false;
      if (item.DETAILED_LINK) {
        item.DETAILED_LINK.forEach((itemLink: any) => {
          if (itemLink.ARCH === activeArch.value) {
            flag = true;
          }
        });
      }
      if (flag) {
        temp1.push(item);
      }
    });
  }
  let temp2: any = [];
  if (activeVersionType.value === i18n.value.download.VERSION_LIST[0].KEY) {
    temp2 = temp1;
  } else if (
    activeVersionType.value === i18n.value.download.VERSION_LIST[1].KEY
  ) {
    temp1.forEach((item: any) => {
      if (item.LTS) {
        temp2.push(item);
      }
    });
  } else if (
    activeVersionType.value === i18n.value.download.VERSION_LIST[2].KEY
  ) {
    temp1.forEach((item: any) => {
      if (!item.LTS) {
        temp2.push(item);
      }
    });
  }
  filterList.value = temp2;
}
onMounted(() => {
  setTagArch();
  getTableData();
  watch(activeArch, function () {
    getTableData();
  });
  watch(activeScenario, function () {
    getTableData();
  });
  watch(activeVersionType, function () {
    getTableData();
  });
});
// 搜索功能
const searchContent = ref('');
const changeSearchVal = (val: string) => {
  allList.value = cloneTool.cloneDeep(i18n.value.download.COMMUNITY_LIST);
  const searchReg = new RegExp(val, 'gi');
  currentPage.value = 1;
  activeScenario.value = tagScenario[0].KEY;
  activeArch.value = tagArch.value[0];
  allList.value = allList.value.filter((item: any) => {
    return searchReg.test(item.NAME);
  });
  getTableData();
};
// 获取该软件所有支持的架构和应用场景
const getItemList = (type: any, linkList: any) => {
  const itemList: any = [];
  if (type === 'ARCH') {
    linkList.forEach((item: any) => {
      if (!itemList.includes(item.ARCH)) {
        itemList.push(item.ARCH);
      }
    });
  } else if (type === 'SCENARIO') {
    const temp: any = [];
    linkList.forEach((item: any) => {
      if (!temp.includes(item.SCENARIO)) {
        temp.push(item.SCENARIO);
      }
    });
    temp.forEach((item: any) => {
      i18n.value.download.SCENARIO_LIST.forEach((itemText: any) => {
        if (itemText.KEY === item) {
          itemList.push(itemText.VALUE);
        }
      });
    });
  }

  return itemList;
};
// 移动端翻页

const changeCurrentPageMoblie = (val: string) => {
  if (val === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (
    val === 'next' &&
    currentPage.value < Math.ceil(total.value / pageSize.value)
  ) {
    currentPage.value = currentPage.value + 1;
  }
};
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="24">
    <BreadCrumbs
      :bread1="i18n.download.OUTSIDE_TITLE"
      :bread2="i18n.download.HISTORY"
      :link1="'/' + lang + '/download/'"
    />

    <div class="download">
      <p class="detail-last">
        {{ i18n.download.DETAIL3
        }}<a :href="i18n.download.MIRROR_LIST_LINK">{{
          i18n.download.CLICK_LIST
        }}</a>
      </p>
      <OSearch
        v-model="searchContent"
        class="o-search"
        :placeholder="i18n.download.PLACEHOLDER"
        @change="changeSearchVal"
      ></OSearch>
      <!-- PC筛选 -->
      <div class="filter-card">
        <TagFilter
          class="architecture-box"
          :label="i18n.download.ARCHITECTURE2"
          :show="false"
        >
          <OTag
            v-for="(item, index) in tagArch"
            :key="'tag' + index"
            checkable
            :type="activeArch === item ? 'primary' : 'text'"
            @click="onArchTagClick(index, item)"
          >
            {{ item }}
          </OTag>
        </TagFilter>
        <TagFilter
          class="os-box"
          :label="i18n.download.SCENARIO2"
          :show="false"
        >
          <OTag
            v-for="(item, index) in tagScenario"
            :key="item.VALUE + index"
            checkable
            :type="activeScenario === item.KEY ? 'primary' : 'text'"
            @click="onScenarioTagClick(index, item.KEY)"
          >
            {{ item.VALUE }}
          </OTag>
        </TagFilter>
        <TagFilter
          class="version-box"
          :label="i18n.download.VERSION_TYPE"
          :show="false"
        >
          <OTag
            v-for="(item, index) in i18n.download.VERSION_LIST"
            :key="item.VALUE + index"
            checkable
            :type="activeVersionType === item.KEY ? 'primary' : 'text'"
            @click="onVersionTypeTagClick(index, item.KEY)"
          >
            {{ item.VALUE }}
          </OTag>
        </TagFilter>
      </div>
      <!-- 表格 -->
      <div v-if="dataList.length" class="download-list">
        <OTable class="pc-list" :data="dataList">
          <el-table-column
            :label="i18n.download.VERSION"
            :width="screenWidth > 1400 ? '200' : '200'"
          >
            <template #default="scope: any">
              {{ scope.row?.NAME }}
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.download.ARCHITECTURE"
            :width="screenWidth > 1400 ? '300' : ''"
          >
            <template #default="scope: any">
              <div class="arch-box">
                <span
                  v-for="item in getItemList('ARCH', scope.row?.DETAILED_LINK)"
                  :key="item"
                  >{{ item }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.download.SCENARIO"
            :width="screenWidth > 1400 ? '300' : ''"
          >
            <template #default="scope: any">
              <div class="scenario-box">
                <span
                  v-for="item in getItemList(
                    'SCENARIO',
                    scope.row?.DETAILED_LINK
                  )"
                  :key="item"
                  >{{ item }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.download.RELEASE_DATE"
            :width="screenWidth > 1400 ? '200' : '150'"
          >
            <template #default="scope: any">
              {{ scope.row?.PUBLISH_DATE }}
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.download.PLANNEDEOL"
            :width="screenWidth > 1400 ? '200' : '150'"
          >
            <template #default="scope: any">
              {{ scope.row?.PLANNED_EOL }}
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.download.DOWNLOAD_LINK"
            :width="screenWidth > 1400 ? '' : '200'"
          >
            <template #default="scope: any">
              <a
                class="download-detail"
                :href="
                  scope.row.PREVIEW
                    ? scope.row.DOWNLOAD_URL
                    : '/' +
                      lang +
                      '/download/archive/detail/?version=' +
                      scope.row.NAME
                "
                :target="scope.row.PREVIEW ? '_blank' : '_self'"
              >
                <OButton
                  type="text"
                  size="mini"
                  class="download-button"
                  animation
                >
                  <span>{{ i18n.download.DOWNLOADGO }}</span>
                  <template #suffixIcon>
                    <OIcon
                      ><IconArrowRight class="download-button-icon"
                    /></OIcon>
                  </template> </OButton
              ></a>
            </template>
          </el-table-column>
        </OTable>
        <ul v-if="screenWidth < 1100" class="mobile-list">
          <li v-for="item in dataList" :key="item.NAME" class="download-item">
            <p class="item-text">
              <span>{{ i18n.download.VERSION + ':' }}</span
              ><span class="tips-box content-text">{{ item.NAME }} </span>
            </p>
            <p class="item-text">
              <span>{{ i18n.download.ARCHITECTURE + ':' }}</span
              ><span class="arch-box content-text">
                <span
                  v-for="itemArch in getItemList('ARCH', item.DETAILED_LINK)"
                  :key="itemArch"
                  >{{ itemArch }}</span
                >
              </span>
            </p>
            <p class="item-text">
              <span>{{ i18n.download.SCENARIO + ':' }}</span>
              <span class="scenario-box content-text">
                <span
                  v-for="itemScen in getItemList(
                    'SCENARIO',
                    item.DETAILED_LINK
                  )"
                  :key="itemScen"
                  >{{ itemScen }}
                </span>
              </span>
            </p>
            <p class="item-text">
              <span>{{ i18n.download.RELEASE_DATE + ':' }}</span>
              <span class="content-text">{{ item.PUBLISH_DATE }}</span>
            </p>
            <p class="item-text">
              <span>{{ i18n.download.PLANNEDEOL + ':' }}</span>
              <span class="content-text">{{ item.PLANNED_EOL }}</span>
            </p>
            <p class="item-text">
              <span>{{ i18n.download.DOWNLOAD_LINK + ':' }}</span>
              <a
                class="download-detail"
                :href="
                  '/' + lang + '/download/archive/detail/?version=' + item.NAME
                "
              >
                <span>{{ i18n.download.DOWNLOADGO }}</span>
              </a>
            </p>
          </li>
        </ul>
      </div>
      <div v-else class="empty">
        <img
          class="empty-img"
          :src="
            commonStore.theme === 'light' ? notFoundImg_light : notFoundImg_dark
          "
          alt="404"
        />
        <p class="empty-text">
          {{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}
        </p>
      </div>
      <!-- mobild -->

      <!-- 页码 -->
      <div v-if="total" class="page-box">
        <ClientOnly>
          <OPagination
            v-if="!isMobile"
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination"
            :page-sizes="[10, 20, 40]"
            :background="true"
            layout="sizes, prev, pager, next, slot, jumper"
            :total="total"
          >
            <span class="pagination-slot"
              >{{
                pageSize * currentPage < total ? pageSize * currentPage : total
              }}
              / {{ total }}</span
            >
          </OPagination>
          <AppPaginationMo
            v-else
            :current-page="currentPage"
            :total-page="Math.ceil(total / pageSize)"
            @turn-page="changeCurrentPageMoblie"
          />
        </ClientOnly>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.download {
  margin-top: var(--o-spacing-h4);
  .detail-last {
    margin-top: var(--o-spacing-h5);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h6);
    }
  }

  .filter-card {
    margin: var(--o-spacing-h4) 0;
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h5) var(--o-spacing-h2);
    box-shadow: var(--o-shadow-l2);
    @media screen and (max-width: 1100px) {
      padding: 0;
      font-size: var(--o-font-size-tip);
    }
    :deep(.tag-filter) {
      padding: 0;
      @media screen and (max-width: 1100px) {
        padding: 8px;
        display: flex;
        gap: 0;
      }
      .label {
        color: var(--o-color-text1);
        @media screen and (max-width: 1100px) {
          display: block;
          min-width: 60px !important;
          font-size: var(--o-font-size-tip);
        }
      }
      .tag-filter-box {
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
      }
      .o-tag {
        padding: 3px 12px;
        font-size: var(--o-font-size-text);
        height: 28px;
        line-height: 28px;
        display: flex;
        align-items: center;
        @media screen and (max-width: 1100px) {
          padding: 2px 8px;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      &.os-box,
      &.version-box {
        margin-top: var(--o-spacing-h5);
        @media screen and (max-width: 1100px) {
          margin-top: 0;
          padding-top: 0;
        }
      }
    }
    .disable {
      color: var(--o-color-text5);
    }
  }
  :deep(.o-search) {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 1100px) {
      height: 28px;
      font-size: var(--o-font-size-text);
    }
  }
  .download-filter {
    padding: 0 var(--o-spacing-h5);
    margin-top: var(--o-spacing-h2);
    display: flex;
    @media (max-width: 1100px) {
      display: none;
    }
  }

  .download-list {
    .pc-list {
      margin-bottom: var(--o-spacing-h2);
      .detail-page {
        cursor: pointer;
        color: var(--o-color-link1);
      }
      :deep(.cell) {
        padding-left: var(--o-spacing-h2);
      }
      @media screen and (max-width: 1100px) {
        display: none;
      }
      .arch-box,
      .scenario-box {
        span {
          & ~ span::before {
            display: inline;
            content: ',';
          }
        }
      }
      .download-detail {
        display: flex;
        align-items: center;
        :deep(.o-button) {
          font-size: 14px;
          @media (max-width: 1100px) {
            font-size: 12px;
          }
        }
      }
    }
    .mobile-list {
      margin-top: var(--o-spacing-h5);
      .download-item {
        padding: var(--o-spacing-h5);
        &:nth-of-type(2n + 1) {
          background-color: var(--o-color-bg4);
        }
        .item-text {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-font-height-tip);
          color: var(--o-color-text1);
          display: flex;
          & ~ .item-text {
            margin-top: var(--o-spacing-h8);
          }
          span {
            display: inline-block;
            &:nth-of-type(1) {
              min-width: 80px;
            }
            &.content-text {
              width: auto;
              color: var(--o-color-text4);
              span {
                width: auto;
                min-width: auto;
                &::after {
                  display: inline;
                  content: ',';
                }
              }
            }
          }
          .text-size {
            color: var(--o-color-text4);
          }
          .down-copy {
            color: var(--o-color-brand1);
            padding: 0;
            line-height: 0;
          }
          .tips-box {
            display: flex;
            align-items: center;
            position: relative;
            .server-name {
              position: absolute;
              left: 0;
              top: -46px;
              background-color: var(--o-color-bg2);
              padding: var(--o-spacing-h9);
            }
            .server-tips {
              width: var(--o-font-size-tip);
              height: var(--o-font-size-tip);
              color: var(--o-color-text4);
              margin-left: var(--o-spacing-h9);
            }
            .mask-mobile {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              z-index: 99;
            }
          }
          :deep(.el-select) {
            .el-input__wrapper {
              background-color: transparent;
              border: none;
              outline: none;
              box-shadow: none;
              padding: 0;
              input {
                font-size: var(--o-font-size-tip);
                vertical-align: top;
                line-height: auto;
                height: 14px;
              }
            }
          }
          .copy-box {
            :deep(.o-button) {
              font-size: 12px;
            }
            :deep(.suffix-icon) {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
  .empty {
    display: flex;
    padding-top: var(--o-spacing-h1);
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
    .empty-img {
      height: 300px;
    }
    .empty-text {
      margin-top: var(--o-spacing-h5);
    }
    @media screen and (max-width: 1100px) {
      padding-top: var(--o-spacing-h2);
      font-size: var(--o-font-size-text);
      .empty-img {
        max-height: 232px;
      }
      .empty-text {
        margin-top: var(--o-spacing-h6);
        font-size: var(--o-font-size-tip);
      }
    }
  }
  .download-name {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h5);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  .download-desc {
    margin-top: var(--o-spacing-h5);
    font-size: var(--o-font-size-text);
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h10);
    }
  }

  .download-button {
    padding-left: 0;
    .download-button-icon {
      // margin-left: 8px;
      font-size: 14px;
      color: var(--o-color-brand1);
      @media (max-width: 1100px) {
        font-size: 12px;
      }
    }
  }
  .page-box {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    margin-top: var(--o-spacing-h4);
    .pagination-slot {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text1);
      line-height: var(--o-spacing-h4);
    }
    :deep(.o-pagination) {
      display: flex;
      @media (max-width: 1100px) {
        display: none;
      }
    }
    .page-box-divide {
      width: 100%;
      height: 1px;
      margin-top: var(--o-spacing-h5);
      background-color: var(--o-color-bg-secondary);
      .page-box-divide-in {
        height: 100%;
        background-color: var(--o-color-brand1);
      }
    }

    .page-box-button {
      margin-top: var(--o-spacing-h5);
    }
    :deep(.pagination-mobile) {
      display: block;
      @media (max-width: 768px) {
        display: flex;
      }
    }
  }
}
</style>

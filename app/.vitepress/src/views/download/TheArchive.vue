<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue';
import { useData } from 'vitepress';
import cloneTool from 'lodash-es';

import { getVersionInfo } from '@/api/api-mirror';
import { getVersionList } from '@/shared/download';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';
import { archMap } from '@/data/download/download';

import type { VersionInfoT } from '@/shared/@types/type-download';

import AppContent from '@/components/AppContent.vue';
import TagFilter from '@/components/TagFilter.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const screenWidth = useWindowResize();

//分页与数据项目
const currentPage = ref(1);
const pageSize = ref(10);
const filterList = ref<VersionInfoT[]>([]);
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

const activeScenario = ref(tagScenario.get('').value);

const tagArch: Ref<string[]> = ref([]);
const activeArch = ref('');
const activeVersionType = ref(i18n.value.download.VERSION_LIST[0].KEY);
const allList: any = ref();
const loading = ref(true);

const setTagArch = () => {
  const tempArch = new Set<string>();
  versionList.value.forEach((item: any) => {
    item?.Arch?.forEach((arch: any) => {
      tempArch.add(arch);
    });
  });
  // 按照Map顺序排列
  for (const key of archMap.keys()) {
    if (tempArch.has(key)) {
      tagArch.value.push(key);
    }
  }
  // 不在Map中的排最后
  for (const item of tempArch) {
    if (!archMap.has(item)) {
      tagArch.value.push(item);
    }
  }
  tagArch.value.unshift(i18n.value.download.ALL_DATA);
  activeArch.value = tagArch.value[0];
};

const versionList = ref();
const queryGetVersionInfo = () => {
  loading.value = true;
  getVersionInfo()
    .then((res) => {
      versionList.value = getVersionList(res.RepoVersion, i18n);
      allList.value = cloneTool.cloneDeep(versionList.value);
      getTableData();
      setTagArch();
    })
    .finally(() => {
      loading.value = false;
    });
};

// ------------ 筛选逻辑 -------------------
function getTableData() {
  currentPage.value = 1;
  // 根据activeScenario.value筛选数据
  function filterByScenario(list: VersionInfoT[], activeScenario: any) {
    if (activeScenario === tagScenario.get('').value) {
      return list;
    }
    const result: VersionInfoT[] = [];
    list.forEach((item) => {
      const hasMatchingScenario = item.Scenario.some(
        (scenario) => scenario === activeScenario
      );
      if (hasMatchingScenario) {
        result.push(item);
      }
    });
    return result;
  }

  // 根据activeArch.value筛选数据
  function filterByArch(list: VersionInfoT[], activeArch: string) {
    // 全部 直接返回
    if (activeArch === tagArch.value[0]) {
      return list;
    }
    const result: VersionInfoT[] = [];
    list.forEach((item) => {
      const hasMatchingArch = item.Arch.some((arch) => {
        return arch === activeArch;
      });
      if (hasMatchingArch) {
        result.push(item);
      }
    });
    return result;
  }

  // 根据activeVersionType.value筛选数据
  function filterByVersionType(
    list: VersionInfoT[],
    activeVersionType: string,
    i18n: any
  ) {
    if (activeVersionType === i18n.value.download.VERSION_LIST[0].KEY) {
      return list;
    } else if (activeVersionType === i18n.value.download.VERSION_LIST[1].KEY) {
      return list.filter((item) => item.LTS);
    } else if (activeVersionType === i18n.value.download.VERSION_LIST[2].KEY) {
      return list.filter((item) => !item.LTS);
    }
    return list;
  }
  const scenarioFiltered = filterByScenario(
    allList.value,
    activeScenario.value
  );
  const archFiltered = filterByArch(scenarioFiltered, activeArch.value);
  const versionFiltered = filterByVersionType(
    archFiltered,
    activeVersionType.value,
    i18n
  );
  filterList.value = versionFiltered;
}

onMounted(() => {
  queryGetVersionInfo();
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
  allList.value = cloneTool.cloneDeep(versionList.value);
  const searchReg = new RegExp(val, 'i');
  activeScenario.value = tagScenario.get('').value;
  activeArch.value = tagArch.value[0];
  allList.value = allList.value.filter((item: any) => {
    return searchReg.test(item.Version);
  });
  getTableData();
};

// 移动端翻页

const changeCurrentPageMoblie = (val: number) => {
  currentPage.value = val;
};
//
const changeSize = () => {
  currentPage.value = 1;
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
            @click="activeArch = item"
          >
            {{ archMap.get(item)?.label || item }}
          </OTag>
        </TagFilter>
        <TagFilter
          class="os-box"
          :label="i18n.download.SCENARIO2"
          :show="false"
        >
          <OTag
            v-for="item in tagScenario.values()"
            :key="item.value"
            checkable
            :type="activeScenario === item.value ? 'primary' : 'text'"
            @click="activeScenario = item.value"
          >
            {{ item.label }}
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
            @click="activeVersionType = item.KEY"
          >
            {{ item.VALUE }}
          </OTag>
        </TagFilter>
      </div>
      <!-- 表格 -->
      <div
        v-loading="loading"
        element-loading-background="transparent"
        class="download-list"
        :class="{ 'min-height': loading }"
      >
        <template v-if="dataList.length" class="download-list">
          <OTable class="pc-list" :data="dataList">
            <el-table-column
              :label="i18n.download.VERSION"
              :width="screenWidth > 1400 ? '260' : '240'"
            >
              <template #default="scope: any">
                {{ scope.row?.Version }}
              </template>
            </el-table-column>
            <el-table-column
              :label="i18n.download.ARCHITECTURE"
              :width="screenWidth > 1400 ? '300' : ''"
            >
              <template #default="scope: any">
                <div class="arch-box">
                  <span v-for="item in scope.row?.Arch" :key="item">
                    {{ archMap.get(item)?.label || item }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="i18n.download.SCENARIO"
              :width="screenWidth > 1400 ? '300' : ''"
            >
              <template #default="scope: any">
                <div class="scenario-box">
                  <span v-for="scenario in scope.row?.Scenario" :key="scenario">
                    {{ tagScenario.get(scenario).label }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="i18n.download.RELEASE_DATE"
              :width="screenWidth > 1400 ? '' : '150'"
            >
              <template #default="scope: any">
                {{ scope.row?.publishDate }}
              </template>
            </el-table-column>
            <el-table-column
              :label="i18n.download.PLANNEDEOL"
              :width="screenWidth > 1400 ? '' : '150'"
            >
              <template #default="scope: any">
                {{ scope.row?.plannedEol }}
              </template>
            </el-table-column>
            <el-table-column
              :label="i18n.download.DOWNLOAD_LINK"
              :width="screenWidth > 1400 ? '200' : '160'"
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
                        scope.row.Version
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
            <li
              v-for="item in dataList"
              :key="item.Version"
              class="download-item"
            >
              <p class="item-text">
                <span>{{ i18n.download.VERSION + ':' }}</span
                ><span class="tips-box content-text">{{ item.Version }} </span>
              </p>
              <p class="item-text">
                <span>{{ i18n.download.ARCHITECTURE + ':' }}</span
                ><span class="arch-box content-text">
                  <template v-for="itemArch in item.Arch" :key="itemArch">
                    <span v-if="itemArch">{{ itemArch }}</span>
                  </template>
                </span>
              </p>
              <p class="item-text">
                <span>{{ i18n.download.SCENARIO + ':' }}</span>
                <span class="scenario-box content-text">
                  <template v-for="scenario in item.Scenario" :key="scenario">
                    <span v-if="scenario"
                      >{{ tagScenario.get(scenario).label }}
                    </span>
                  </template>
                </span>
              </p>
              <p class="item-text">
                <span>{{ i18n.download.RELEASE_DATE + ':' }}</span>
                <span class="content-text">{{ item.publishDate }}</span>
              </p>
              <p class="item-text">
                <span>{{ i18n.download.PLANNEDEOL + ':' }}</span>
                <span class="content-text">{{ item.plannedEol }}</span>
              </p>
              <p class="item-text">
                <span>{{ i18n.download.DOWNLOAD_LINK + ':' }}</span>
                <a
                  class="download-detail"
                  :href="
                    '/' +
                    lang +
                    '/download/archive/detail/?version=' +
                    item.Version
                  "
                >
                  <span>{{ i18n.download.DOWNLOADGO }}</span>
                </a>
              </p>
            </li>
          </ul>
          <!-- 页码 -->
          <div class="page-box">
            <ClientOnly>
              <OPagination
                v-if="total"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 40]"
                :background="true"
                layout="sizes, prev, pager, next, slot, jumper"
                :total="total"
                @size-change="changeSize"
                @jump-page="changeCurrentPageMoblie"
              >
                <span class="pagination-slot"
                  >{{ currentPage }} / {{ Math.ceil(total / pageSize) }}</span
                >
              </OPagination>
            </ClientOnly>
          </div>
        </template>
        <div v-else-if="!loading" class="empty">
          <img
            class="empty-img"
            :src="
              commonStore.theme === 'light'
                ? notFoundImg_light
                : notFoundImg_dark
            "
            alt="404"
          />
          <p class="empty-text">
            {{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}
          </p>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.download {
  margin-top: var(--e-spacing-h4);
  .detail-last {
    margin-top: var(--e-spacing-h5);
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h6);
    }
  }

  .filter-card {
    margin: var(--e-spacing-h4) 0;
    background-color: var(--e-color-bg2);
    padding: var(--e-spacing-h5) var(--e-spacing-h2);
    box-shadow: var(--e-shadow-l2);
    @media screen and (max-width: 1100px) {
      padding: 0;
      font-size: var(--e-font-size-tip);
    }
    :deep(.tag-filter) {
      padding: 0;
      @media screen and (max-width: 1100px) {
        padding: 8px;
        display: flex;
        gap: 0;
      }
      .label {
        color: var(--e-color-text1);
        @media screen and (max-width: 1100px) {
          display: block;
          min-width: 60px !important;
          font-size: var(--e-font-size-tip);
        }
      }
      .tag-filter-box {
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
      }
      .e-tag {
        padding: 3px 12px;
        font-size: var(--e-font-size-text);
        height: 28px;
        line-height: 28px;
        display: flex;
        align-items: center;
        @media screen and (max-width: 1100px) {
          padding: 2px 8px;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
      &.os-box,
      &.version-box {
        margin-top: var(--e-spacing-h5);
        @media screen and (max-width: 1100px) {
          margin-top: 0;
          padding-top: 0;
        }
      }
    }
    .disable {
      color: var(--e-color-text5);
    }
  }
  :deep(.o-search) {
    margin-top: var(--e-spacing-h4);
    @media (max-width: 1100px) {
      height: 28px;
      font-size: var(--e-font-size-text);
    }
  }
  .download-filter {
    padding: 0 var(--e-spacing-h5);
    margin-top: var(--e-spacing-h2);
    display: flex;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  .min-height {
    min-height: 420px;
  }
  .download-list {
    .pc-list {
      .detail-page {
        cursor: pointer;
        color: var(--e-color-link1);
      }
      :deep(.cell) {
        padding-left: var(--e-spacing-h2);
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
      margin-top: var(--e-spacing-h5);
      .download-item {
        padding: var(--e-spacing-h5);
        &:nth-of-type(2n + 1) {
          background-color: var(--e-color-bg4);
        }
        .item-text {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-font-height-tip);
          color: var(--e-color-text1);
          display: flex;
          & ~ .item-text {
            margin-top: var(--e-spacing-h8);
          }
          span {
            display: inline-block;
            &:nth-of-type(1) {
              min-width: 80px;
            }
            &.content-text {
              width: auto;
              color: var(--e-color-text4);
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
            color: var(--e-color-text4);
          }
          .down-copy {
            color: var(--e-color-brand1);
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
              background-color: var(--e-color-bg2);
              padding: var(--e-spacing-h9);
            }
            .server-tips {
              width: var(--e-font-size-tip);
              height: var(--e-font-size-tip);
              color: var(--e-color-text4);
              margin-left: var(--e-spacing-h9);
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
                font-size: var(--e-font-size-tip);
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
    padding-top: var(--e-spacing-h1);
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    font-size: var(--e-font-size-h6);
    color: var(--e-color-text1);
    .empty-img {
      height: 300px;
    }
    .empty-text {
      margin-top: var(--e-spacing-h5);
    }
    @media screen and (max-width: 1100px) {
      padding-top: var(--e-spacing-h2);
      font-size: var(--e-font-size-text);
      .empty-img {
        max-height: 232px;
      }
      .empty-text {
        margin-top: var(--e-spacing-h6);
        font-size: var(--e-font-size-tip);
      }
    }
  }
  .download-name {
    font-size: var(--e-font-size-h5);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h5);
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
  }

  .download-desc {
    margin-top: var(--e-spacing-h5);
    font-size: var(--e-font-size-text);
    color: var(--e-color-text4);
    line-height: var(--e-line-height-text);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h10);
    }
  }

  .download-button {
    padding-left: 0;
    .download-button-icon {
      // margin-left: 8px;
      font-size: 14px;
      color: var(--e-color-brand1);
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
    margin-top: var(--e-spacing-h2);
    @media (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
    .pagination-slot {
      font-size: var(--e-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-spacing-h4);
    }
  }
}
</style>

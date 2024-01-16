<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useData } from 'vitepress';
import cloneTool from 'lodash';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import type {
  DownloadCommercialDataT,
  DetailedLinkCommercialItemT,
} from '@/shared/@types/type-download';

import AppContent from '@/components/AppContent.vue';
import TagFilter from '@/components/TagFilter.vue';

import IconFilter from '~icons/app/icon-filter.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const screenWidth = useWindowResize();
//打开网页
const handleDownloadUrl = (url: string) => {
  window.open(url);
};

//分页与数据项目
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(i18n.value.download.COMMERCIAL_RELEASE_LIST.length);
const filterList: Ref<DownloadCommercialDataT[]> = ref([]);

const dataList = computed(() => {
  if (screenWidth.value > 768) {
    return filterList.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return filterList.value.slice(0, currentPage.value * pageSize.value);
  }
});

const handleLoadMore = () => {
  if (currentPage.value * pageSize.value < total.value) {
    currentPage.value = currentPage.value + 1;
  }
};

//移动端筛选弹框
const isDrawerOpen = ref(false);
const handleToggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

//数据筛选
const tagManufacturer: Ref<string[]> = ref([]);
const manufacturerAll = ref(true);
const activeManufacturer: Ref<string[]> = ref([]);
const tagArch: Ref<string[]> = ref([]);
const archAll = ref(true);
const activeArch: Ref<string[]> = ref([]);
const allList: DownloadCommercialDataT[] = cloneTool.cloneDeep(
  i18n.value.download.COMMERCIAL_RELEASE_LIST
);
const setTagArch = () => {
  allList.forEach((item: DownloadCommercialDataT) => {
    if (item.DETAILED_LINK) {
      item.DETAILED_LINK.forEach((itemLink: DetailedLinkCommercialItemT) => {
        if (!tagArch.value.includes(itemLink.ARCH)) {
          tagArch.value.push(itemLink.ARCH);
        }
      });
    }
  });
  tagArch.value.unshift(i18n.value.download.ALL_DATA);
};
const setTagManufacturer = () => {
  const temp = [...allList];
  const eulerFac: [string] = [''];
  const manufacturer = temp.map((item) => {
    return item.MANUFACTURER;
  });
  tagManufacturer.value = Array.from(new Set(manufacturer));
  tagManufacturer.value.sort((a, b) => {
    return a.localeCompare(b);
  });
  tagManufacturer.value.unshift(
    i18n.value.download.ALL_DATA,
    ...new Set(eulerFac)
  );
  tagManufacturer.value = tagManufacturer.value.filter((b) => b);
};
const filterTagList = () => {
  let result = [...allList];
  if (!manufacturerAll.value) {
    result = result.filter((item: { MANUFACTURER: string }) => {
      return activeManufacturer.value.indexOf(item.MANUFACTURER) > -1;
    });
  }
  if (!archAll.value) {
    const temp: DownloadCommercialDataT[] = [];
    result.forEach((item) => {
      let flag = false;
      if (item.DETAILED_LINK) {
        item.DETAILED_LINK.forEach((itemLink: DetailedLinkCommercialItemT) => {
          if (activeArch.value.includes(itemLink.ARCH)) {
            flag = true;
          }
        });
      }
      if (flag) {
        temp.push(item);
      }
    });
    result = temp;
  }
  total.value = result.length;

  filterList.value = result;
  currentPage.value = 1;
};
const handleArchClick = (item: string, all: number) => {
  currentPage.value = 1;
  if (all === 0) {
    archAll.value = true;
    activeArch.value = [];
  } else {
    archAll.value = false;
    const index = activeArch.value.indexOf(item);
    if (index > -1) {
      activeArch.value.splice(index, 1);
      if (activeArch.value.length === 0) {
        archAll.value = true;
      }
    } else {
      activeArch.value.push(item);
    }
  }
  filterTagList();
};
const handleManufacturerClick = (item: string, all: number) => {
  currentPage.value = 1;
  if (all === 0) {
    manufacturerAll.value = true;
    activeManufacturer.value = [];
  } else {
    manufacturerAll.value = false;
    const index = activeManufacturer.value.indexOf(item);
    if (index > -1) {
      activeManufacturer.value.splice(index, 1);
      if (activeManufacturer.value.length === 0) {
        manufacturerAll.value = true;
      }
    } else {
      activeManufacturer.value.push(item);
    }
  }
  filterTagList();
};

onMounted(() => {
  setTagManufacturer();
  setTagArch();
  filterTagList();
});
// 搜索功能
const searchContent = ref('');
const changeSearchVal = (val: string) => {
  const searchReg = new RegExp(val, 'gi');
  currentPage.value = 1;
  archAll.value = true;
  activeArch.value = [];
  manufacturerAll.value = true;
  activeManufacturer.value = [];
  filterList.value = allList.filter((item: DownloadCommercialDataT) => {
    return searchReg.test(item.NAME);
  });
};
// 获取该软件所有支持的架构
const getItemArchList = (link: DetailedLinkCommercialItemT[]) => {
  const itemArchList: string[] = [];
  link.forEach((item: DetailedLinkCommercialItemT) => {
    if (!itemArchList.includes(item.ARCH)) {
      itemArchList.push(item.ARCH);
    }
  });
  return itemArchList;
};
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="24">
    <div class="download">
      <OSearch
        v-model="searchContent"
        class="o-search"
        :placeholder="i18n.download.PLACEHOLDER"
        @change="changeSearchVal"
      ></OSearch>
      <!-- PC筛选 -->
      <ClientOnly>
        <OCard class="download-filter">
          <TagFilter
            :label="i18n.download.MANUFACTURER"
            class="download-filter-manufacturer"
          >
            <OTag
              v-for="(item, index) in tagManufacturer"
              :key="item"
              class="download-filter-item"
              checkable
              :checked="index !== 0"
              :type="
                index === 0
                  ? manufacturerAll
                    ? 'primary'
                    : 'text'
                  : activeManufacturer.indexOf(item) > -1
                  ? 'primary'
                  : 'text'
              "
              @click="handleManufacturerClick(item, index)"
            >
              {{ item }}
            </OTag>
          </TagFilter>
          <TagFilter
            :label="i18n.download.ARCHITECTURE"
            class="download-filter-manufacturer"
          >
            <OTag
              v-for="(item, index) in tagArch"
              :key="item"
              checkable
              :checked="index !== 0"
              class="download-filter-item"
              :type="
                index === 0
                  ? archAll
                    ? 'primary'
                    : 'text'
                  : activeArch.indexOf(item) > -1
                  ? 'primary'
                  : 'text'
              "
              @click="handleArchClick(item, index)"
            >
              {{ item }}
            </OTag>
          </TagFilter>
        </OCard>
      </ClientOnly>

      <!-- 移动筛选 -->
      <div class="download-filter-mobile">
        <div class="download-filter-title-mobile" @click="handleToggleDrawer">
          <div class="download-filter-word-mobile">
            {{ i18n.download.SELECT }}
          </div>
          <IconFilter class="download-filter-icon-mobile"></IconFilter>
        </div>
        <div
          v-if="activeManufacturer.length != 0 || activeArch.length != 0"
          class="download-filter-list-mobile"
        >
          <div
            v-for="item in activeManufacturer"
            :key="item"
            class="download-filter-card-mobile"
            @click="handleManufacturerClick(item, 1)"
          >
            {{ item }}
            <IconCancel class="download-filter-card-icon-mobile"></IconCancel>
          </div>
          <div
            v-for="item in activeArch"
            :key="item"
            class="download-filter-card-mobile"
            @click="handleArchClick(item, 1)"
          >
            {{ item
            }}<IconCancel class="download-filter-card-icon-mobile"></IconCancel>
          </div>
        </div>

        <ClientOnly>
          <ODrawer
            v-model="isDrawerOpen"
            :title="i18n.download.SELECT"
            direction="btt"
            :show-close="true"
            custom-class="filter-drawer"
            size="75%"
          >
            <div class="filter-drawer-title">
              {{ i18n.download.MANUFACTURER }}
            </div>
            <OTag
              v-for="(item, index) in tagManufacturer"
              :key="item"
              class="download-filter-item"
              checkable
              :checked="index !== 0"
              :type="
                index === 0
                  ? manufacturerAll
                    ? 'primary'
                    : 'text'
                  : activeManufacturer.indexOf(item) > -1
                  ? 'primary'
                  : 'text'
              "
              @click="handleManufacturerClick(item, index)"
            >
              {{ item }}
            </OTag>
            <div class="filter-drawer-title">
              {{ i18n.download.PUBLISH_DATE }}
            </div>
            <OTag
              v-for="(item, index) in tagArch"
              :key="item"
              class="download-filter-item"
              checkable
              :checked="index !== 0"
              :type="
                index === 0
                  ? archAll
                    ? 'primary'
                    : 'text'
                  : activeArch.indexOf(item) > -1
                  ? 'primary'
                  : 'text'
              "
              @click="handleArchClick(item, index)"
            >
              {{ item }}
            </OTag>
            <div class="filter-drawer-button">
              <OButton
                type="primary"
                class="filter-drawer-button-item"
                @click="handleToggleDrawer"
                >{{ i18n.download.BTNSURE }}</OButton
              >
            </div>
          </ODrawer>
        </ClientOnly>
      </div>
      <!-- 表格 -->
      <div v-if="dataList.length" class="download-list">
        <OCard
          v-for="download in dataList"
          :key="download.NAME"
          class="download-list-item"
          shadow="hover"
        >
          <div class="download-list-content">
            <h5 class="download-name">
              {{ download.NAME }}
            </h5>
            <div class="download-desc" :title="download.DESC">
              {{ download.DESC }}
            </div>
            <div class="url-list">
              <div class="line-class">
                <span class="class-title">{{
                  i18n.download.PUBLISH_FACTURER
                }}</span>
                <div class="facturer-class">
                  {{ download.MANUFACTURER }}
                </div>
              </div>
              <div class="line-class">
                <span class="class-title">{{
                  i18n.download.RELEASE_DATE + '：'
                }}</span>
                <div class="date-class">
                  {{
                    download.PUBLISH_DATE
                      ? download.PUBLISH_DATE
                      : i18n.download.EMPTY_TIP
                  }}
                </div>
              </div>
              <div class="line-class">
                <span class="class-title">{{
                  i18n.download.APPROVE_ARCH
                }}</span>
                <div v-if="download.DETAILED_LINK" class="arch-class">
                  <div
                    v-for="item in getItemArchList(download.DETAILED_LINK)"
                    :key="item"
                  >
                    {{ item }}
                  </div>
                </div>
                <div v-else class="arch-class">
                  <div class="no-data">
                    {{ i18n.download.EMPTY_TIP }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OButton
            type="primary"
            size="mini"
            class="download-button"
            animation
            @click="handleDownloadUrl(download.DOWNLOAD_URL)"
          >
            <span>{{ i18n.download.DOWNLOADGO }}</span>
            <template #suffixIcon>
              <OIcon><IconArrowRight class="download-button-icon" /></OIcon>
            </template>
          </OButton>
        </OCard>
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
      <!-- 页码 -->
      <div v-if="total" class="page-box">
        <div v-if="dataList.length" class="pagination">
          <ClientOnly>
            <OPagination
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[12, 18, 24, 36]"
              :background="true"
              layout="sizes, prev, pager, next, slot, jumper"
              :total="total"
            >
              <span class="pagination-slot"
                >{{
                  pageSize * currentPage < total
                    ? pageSize * currentPage
                    : total
                }}
                / {{ total }}</span
              >
            </OPagination>
          </ClientOnly>
        </div>
        <div v-if="dataList.length" class="page-box-mobile">
          <div>
            {{ i18n.download.PAGINATION[0]
            }}{{
              pageSize * currentPage < total ? pageSize * currentPage : total
            }}{{ i18n.download.PAGINATION[1] }}{{ total
            }}{{ i18n.download.PAGINATION[2] }}
          </div>
          <div class="page-box-divide">
            <div
              class="page-box-divide-in"
              :style="{
                width:
                  ((pageSize * currentPage * 100) / total < 100
                    ? (pageSize * currentPage * 100) / total
                    : '100') + '%',
              }"
            ></div>
          </div>
          <OButton
            v-if="currentPage * pageSize < total"
            class="page-box-button"
            @click="handleLoadMore"
          >
            {{ i18n.download.PAGINATION[3] }}
          </OButton>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.filter-drawer {
  .filter-drawer-title {
    width: 100%;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text1);
    margin-top: var(--o-spacing-h4);
    margin-bottom: var(--o-spacing-h9);
  }

  .filter-drawer-button {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    margin-top: var(--o-spacing-h5);
    .filter-drawer-button-item {
      padding: var(--o-spacing-h10) var(--o-spacing-h3);
      margin: var(--o-spacing-h9);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
.tag-filter :deep(.label) {
  color: var(--o-color-text1);
}
.page-box {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    .pagination {
      display: none;
    }
  }

  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  :deep(.o-pagination) {
    display: flex;
    @media (max-width: 768px) {
      display: none;
    }
  }

  .page-box-mobile {
    width: 100%;
    display: none;
    flex-flow: column;
    justify-content: center;
    color: var(--o-color-text1);
    align-items: center;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    @media (max-width: 768px) {
      display: flex;
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
}
.download {
  .o-search {
    @media (max-width: 768px) {
      margin-bottom: var(--o-spacing-h5);
      height: 28px;
      font-size: var(--o-font-size-text);
    }
  }
  :deep(.o-tag) {
    padding: 3px 12px;
    font-size: var(--o-font-height-tip);
    line-height: var(--o-line-height-tip);
  }
  .download-filter {
    padding: 0 var(--o-spacing-h5);
    margin-top: var(--o-spacing-h4);
    display: flex;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .download-filter-mobile {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      flex-flow: column;
    }

    &:deep(.el-drawer__header) {
      color: var(--o-color-text1);
      margin-bottom: 0px;
      :first-child {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &:deep(.el-drawer) {
      background-color: var(--o-color-bg2);
    }

    &:deep(.o-tag-type-text) {
      color: var(--o-color-text1);
    }
    .download-filter-title-mobile {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      cursor: pointer;
    }
    .download-filter-icon-mobile {
      color: var(--o-color-text4);
      height: var(--o-font-size-tip);
      width: var(--o-font-size-tip);
    }
    .download-filter-word-mobile {
      color: var(--o-color-text4);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-right: var(--o-spacing-h10);
    }

    .download-filter-list-mobile {
      margin-top: var(--o-spacing-h6);
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }

    .download-filter-card-mobile {
      cursor: pointer;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      padding: var(--o-spacing-h10) var(--o-spacing-h9);
      background-color: var(--o-color-bg-secondary);
      color: var(--o-color-text-secondary);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-right: var(--o-spacing-h9);
      margin-top: var(--o-spacing-h10);
      .download-filter-card-icon-mobile {
        font-size: var(--o-color-text1);
        width: var(--o-font-size-tip);
        height: var(--o-font-size-tip);
        margin-left: var(--o-spacing-h9);
      }
    }
  }

  .download-list {
    display: grid;
    margin: var(--o-spacing-h4) auto var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h5);

    @media (max-width: 768px) {
      margin: var(--o-spacing-h5) auto;
    }

    .download-list-content {
      width: 100%;
    }
    .download-list-item {
      width: 100%;
      height: 100%;

      :deep(.el-card__body) {
        padding: var(--o-spacing-h2);
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h6);
        }
      }
    }
    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
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
    @media screen and (max-width: 768px) {
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
    @media (max-width: 768px) {
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
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h10);
    }
  }

  .download-button {
    margin-top: var(--o-spacing-h4);
    color: var(--o-color-white);
    .download-button-icon {
      margin-left: 8px;
    }
  }
}
.download-filter-item {
  margin: var(--o-spacing-h10);
  @media (max-width: 768px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
}
.line-class {
  display: flex;
  .class-title {
    flex-shrink: 0;
  }
  .facturer-class,
  .date-class {
    color: var(--o-color-text4);
  }
  .arch-class {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    div {
      padding: 2px 8px;
      background-color: var(--o-color-bg4);
      color: var(--o-color-text4);
    }
    .no-data {
      background-color: transparent;
      padding: 0;
    }
  }
}
.url-list {
  margin-top: var(--o-spacing-h4);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  font-size: 14px;

  a {
    font-size: var(--o-font-size-text);
    color: var(--o-color-brand1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
</style>

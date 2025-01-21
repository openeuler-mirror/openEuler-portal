<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';

import cloneTool from 'lodash-es';

import { useScreen } from '@/shared/useScreen';

import type {
  DownloadCommercialDataT,
  DetailedLinkCommercialItemT,
} from '@/shared/@types/type-download';

import commercialReleaseData from '~@/data/download/download-commercial-release';
import { COUNT_PER_PAGE } from '~@/shared/config';

import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';
import AppFilterMo from '~@/components/AppFilterMo.vue';

import { useLocale } from '~@/composables/useLocale';
import { getUrlParam } from '~@/utils/common';
import {
  OCard,
  OToggle,
  OTag,
  OIcon,
  OButton,
  OCheckbox,
  OCheckboxGroup,
  ODivider,
  OInput,
  OPagination,
  ODialog,
  DialogActionT,
} from '@opensig/opendesign';

import IconOutLink from '~icons/app-new/icon-outlink.svg';
import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const { t, locale } = useLocale();
const { lePadV, isPadV } = useScreen();

const localeCommercialReleaseData = computed(() => {
  return commercialReleaseData[locale.value].COMMERCIAL_RELEASE_LIST;
});
//分页与数据项目
const currentPage = ref(1);
const pageSize = ref(12);
const total = computed(() => filterList.value.length);

const dataList = computed(() => {
  if (!lePadV.value) {
    return filterList.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return filterList.value.slice(0, currentPage.value * pageSize.value);
  }
});

const dlgAction: DialogActionT[] = [
  {
    id: 'reset',
    label: t('common.reset'),
    variant: 'text',
    size: 'small',
    onClick: () => {
      activeArch.value = [''];
      activeManufacturer.value = [''];
    },
  },
  {
    id: 'confirm',
    variant: 'text',
    label: t('common.confirm'),
    size: 'small',
    onClick: () => {
      handleToggleDrawer();
    },
  },
];

const getMoreData = () => {
  if (lePadV.value && currentPage.value * pageSize.value < total.value) {
    currentPage.value = currentPage.value + 1;
  }
};

//移动端筛选弹框
const isShownDialog = ref(false);
const handleToggleDrawer = () => {
  isShownDialog.value = !isShownDialog.value;
};

//数据筛选
const tagManufacturer: Ref<string[]> = ref([]);
const activeManufacturer: Ref<string[]> = ref(['']);
const tagArch: Ref<string[]> = ref([]);
const activeArch: Ref<string[]> = ref(['']);

const allList: DownloadCommercialDataT[] = cloneTool.cloneDeep(
  localeCommercialReleaseData.value
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
};
const setTagManufacturer = () => {
  const temp = allList;
  const manufacturer = temp.map((item) => {
    return item.MANUFACTURER;
  });
  tagManufacturer.value = Array.from(new Set(manufacturer));
  tagManufacturer.value.sort((a, b) => {
    return a.localeCompare(b);
  });
};

// 计算筛选之后剩下的版本
const filterList = computed(() => {
  // 初始化页数
  currentPage.value = 1;
  return allList.filter((item: DownloadCommercialDataT) => {
    // 按 MANUFACTURER 筛选
    if (
      !activeManufacturer.value.includes('') &&
      !activeManufacturer.value.includes(item.MANUFACTURER)
    ) {
      return false;
    }
    // 按 ARCH 筛选
    if (!activeArch.value.includes('')) {
      const matchArch = item.DETAILED_LINK?.some((link) =>
        activeArch.value.includes(link.ARCH)
      );
      if (!matchArch) return false;
    }
    // 搜索
    if (
      !item.NAME.toLowerCase().includes(searchVal.value.toLowerCase()) &&
      !item.MANUFACTURER.toLowerCase().includes(searchVal.value.toLowerCase())
    ) {
      return false;
    }
    return true; // 满足条件，保留此项
  });
});

onMounted(() => {
  setTagManufacturer();
  setTagArch();
  searchVal.value = decodeURIComponent(getUrlParam('search'));
});
// 搜索功能
const searchVal = ref('');

const changeSearchVal = (val: string) => {
  if (val.trim()) {
    history.replaceState(null, '', `?search=${encodeURIComponent(val)}`);
  } else {
    history.replaceState(null, '', window.location.pathname);
  }
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

//---------------------- 厂商筛选 --------------------
const handleManufacturerChange = (
  val: string,
  e: { target: { value: string } }
) => {
  if (e?.target?.value === '' || activeManufacturer.value.length === 0) {
    // 如果选中“全部”，取消其他选项
    activeManufacturer.value = [''];
  } else {
    // 如果选中其他选项，取消“全部”
    activeManufacturer.value = activeManufacturer.value.filter(
      (option) => option !== ''
    );
  }
};
//---------------------- 架构筛选 --------------------
const handleArchClick = (val: string, e: { target: { value: string } }) => {
  if (e?.target?.value === '' || activeArch.value.length === 0) {
    // 如果选中“全部”，取消其他选项
    activeArch.value = [''];
  } else {
    // 如果选中其他选项，取消“全部”
    activeArch.value = activeArch.value.filter((option) => option !== '');
  }
};
</script>

<template>
  <AppSection :title="$t('download.commercaial')">
    <div class="commercial-release download">
      <!-------------- 筛选 -------------->
      <div class="filter-box">
        <div class="filter-card">
          <div class="label">{{ $t('download.MANUFACTURER') }}</div>
          <OCheckboxGroup
            v-model="activeManufacturer"
            @change="handleManufacturerChange"
          >
            <!-- 第一个选项为“全部” -->
            <OCheckbox value="">
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{
                  $t('download.ALL_DATA')
                }}</OToggle>
              </template>
            </OCheckbox>

            <!-- 动态生成其他选项 -->
            <OCheckbox
              v-for="(option, index) in tagManufacturer"
              :key="option"
              :value="option"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{ option }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>
        <div class="filter-card">
          <div class="label">
            {{ $t('download.ARCHITECTURE') }}
          </div>
          <OCheckboxGroup v-model="activeArch" @change="handleArchClick">
            <OCheckbox value="">
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{
                  $t('download.ALL_DATA')
                }}</OToggle>
              </template>
            </OCheckbox>
            <OCheckbox v-for="option in tagArch" :key="option" :value="option">
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{ option }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>
        <ODivider :style="{ '--o-divider-gap': '16px' }" />
        <div class="serach-box">
          <OInput
            :placeholder="$t('download.PLACEHOLDER')"
            v-model.lazy="searchVal"
            size="large"
            @input="(e) => changeSearchVal(e.target?.value)"
          >
            <template #prefix>
              <OIcon class="icon"><IconSearch></IconSearch></OIcon>
            </template>
          </OInput>
        </div>
      </div>

      <!-- 移动筛选 -->
      <div class="serach-box-mo">
        <OInput
          :placeholder="$t('download.PLACEHOLDER')"
          v-model.lazy="searchVal"
          size="large"
          @input="(e) => changeSearchVal(e.target?.value)"
        >
          <template #prefix>
            <OIcon class="icon"><IconSearch></IconSearch></OIcon>
          </template>
        </OInput>
      </div>
      <AppFilterMo
        class="download-filter-mobile"
        @click="handleToggleDrawer"
        :label="t('download.SELECT')"
      />
      <!-- 卡片 -->
      <div
        v-if="dataList.length"
        v-scroll-bottom="getMoreData"
        class="download-list"
      >
        <OCard
          v-for="download in dataList"
          :key="download.NAME"
          :title-row="2"
          :title="download.NAME"
          :title-max-row="2"
          :detail-max-row="2"
          :detail="download.DESC"
          class="download-list-item"
        >
          <div class="download-list-content">
            <!-- //  厂商，发布时间，架构 -->
            <div class="download-card-list">
              <!-- <div class="title">
                {{ download.NAME }}
              </div> -->
              <div class="download-line">
                <span class="class-title">{{
                  t('download.PUBLISH_FACTURER')
                }}</span>
                <div class="label">
                  {{ download.MANUFACTURER }}
                </div>
              </div>
              <div class="download-line">
                <span class="class-title">{{
                  t('download.PUBLISH_DATE1')
                }}</span>
                <div class="label">
                  {{ download.PUBLISH_DATE || t('download.EMPTY_TIP') }}
                </div>
              </div>
              <div class="download-line">
                <span class="class-title">{{
                  t('download.APPROVE_ARCH')
                }}</span>
                <div v-if="download.DETAILED_LINK" class="arch-class">
                  <OTag
                    v-for="item in getItemArchList(download.DETAILED_LINK)"
                    size="medium"
                    :style="{ '--tag-bg-color': 'var(--o-color-fill3)' }"
                    :key="item"
                  >
                    {{ item }}
                  </OTag>
                </div>
                <div v-else class="label">
                  {{ t('download.EMPTY_TIP') }}
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <ODivider class="footer-divider" />
            <a
              :href="download.DOWNLOAD_URL"
              class="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton variant="outline" color="primary">
                <template #icon>
                  <OIcon><IconOutLink class="download-button-icon" /></OIcon>
                </template>
                <span>{{ t('download.DOWNLOADGO') }}</span>
              </OButton>
              <div class="btn-mo">
                <div class="text">{{ t('download.DOWNLOADGO') }}</div>
                <OIcon>
                  <IconChevronRight />
                </OIcon>
              </div>
            </a>
          </template>
        </OCard>
      </div>
      <ResultEmpty v-else />
      <!-- 页码 -->
      <div v-if="filterList.length > COUNT_PER_PAGE[0]" class="pagination">
        <OPagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :layout="['total', 'pagesize', 'pager', 'jumper']"
          :total="filterList.length"
          :page-sizes="COUNT_PER_PAGE"
          :show-more="true"
        />
      </div>
      <!--移动端筛选-->
      <ClientOnly>
        <ODialog
          v-model:visible="isShownDialog"
          :show-close="true"
          :actions="dlgAction"
          :style="{
            '--dlg-radius': 'var(--o-radius-s)',
          }"
          custom-class="filter-drawer"
          size="medium"
        >
          <template #header>
            {{ $t('common.filter') }}
          </template>
          <div class="filter-drawer-title">
            {{ t('download.MANUFACTURER') }}
          </div>
          <OCheckboxGroup
            v-model="activeManufacturer"
            @change="handleManufacturerChange"
          >
            <!-- 第一个选项为“全部” -->
            <OCheckbox value="">
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{
                  $t('download.ALL_DATA')
                }}</OToggle>
              </template>
            </OCheckbox>

            <!-- 动态生成其他选项 -->
            <OCheckbox
              v-for="(option, index) in tagManufacturer"
              :key="option"
              :value="option"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{ option }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
          <ODivider :style="{ '--o-divider-gap': '12px' }" />
          <div class="filter-drawer-title">
            {{ t('download.ARCHITECTURE') }}
          </div>
          <OCheckboxGroup v-model="activeArch" @change="handleArchClick">
            <OCheckbox value="">
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{
                  $t('download.ALL_DATA')
                }}</OToggle>
              </template>
            </OCheckbox>
            <OCheckbox v-for="option in tagArch" :key="option" :value="option">
              <template #checkbox="{ checked }">
                <OToggle :checked="checked">{{ option }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </ODialog>
      </ClientOnly>
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
.filter-box {
  padding: 24px 32px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    display: none;
  }
  .filter-card {
    display: flex;
    .label {
      display: flex;
      align-items: center;
      height: 32px;
      @include text1;
      color: var(--o-color-info1);
      min-width: 32px;
      margin-right: 32px;
      flex-shrink: 0;
    }
    .o-checkbox-group {
      gap: 16px 8px;
      .o-checkbox {
        margin: 0;
      }
    }
  }
  .filter-card:not(:first-child) {
    margin-top: 16px;
  }
  .serach-box {
    display: flex;
    justify-content: flex-end;

    .o-input {
      max-width: 320px;
      :deep(.o_box-main) {
        .o-icon {
          font-size: var(--o-font_size-h2);
        }
        border-radius: var(--o-radius-xs);
      }
    }
  }
}
html[lang='en'] {
  .filter-box {
    .filter-card {
      .label {
        min-width: 86px;
      }
    }
  }
}
.serach-box-mo {
  display: none;
  @include respond-to('<=pad_v') {
    display: block;
    .o-input {
      width: 100%;
      :deep(.o_box) {
        width: 100%;
      }
      :deep(.o_box-main) {
        .o-icon {
          font-size: var(--o-font_size-text1);
        }
        border-radius: var(--o-radius-xs);
      }
    }
  }
}

.commercial-release {
  .download-filter-mobile {
    display: none;
    @include respond-to('<=pad_v') {
      display: flex;
      margin-top: 12px;
    }
  }

  .download-list {
    display: grid;
    margin-top: 24px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
    @include respond-to('pad_v-laptop') {
      grid-template-columns: repeat(2, 1fr);
    }
    @include respond-to('<=pad_v') {
      margin-top: 12px;
      grid-gap: 16px;
      grid-template-columns: repeat(1, 1fr);
    }
    .o-card {
      --card-main-padding: 24px;
      height: 100%;
      width: 100%;
      :deep(.o-card-header) {
        .o-card-title {
          @include h2;
          font-weight: 500;
          height: fit-content;
        }
      }
      .download-card-list {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        @include text1;
        .download-line {
          display: flex;
          color: var(--o-color-info1);
          .class-title {
            flex-shrink: 0;
            margin-right: 16px;
          }
          .label {
            color: var(--o-color-info2);
          }
          .arch-class {
            display: flex;
            flex-wrap: wrap;
            gap: 4px 8px;
            .o-tag {
              border: none;
            }
          }
        }

        .date-class {
          color: var(--o-color-info2);
        }
      }
      .footer-divider {
        display: none;
        @include respond-to('<=pad_v') {
          display: block;
        }
      }
      .footer-link {
        .o-btn {
          @include respond-to('<=pad_v') {
            display: none;
          }
        }
        .btn-mo {
          display: none;
          @include respond-to('<=pad_v') {
            @include h4;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--o-color-info1);
            .o-icon {
              font-size: var(--o-icon_size-xs);
            }
          }
        }
      }
    }
  }
  .result-empty {
    margin-top: 24px;
  }
  .pagination {
    @include respond-to('<=pad_v') {
      display: none;
    }
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
}

.o-dlg-body-content {
  .filter-drawer-title {
    font-weight: 500;
    @include h4;
  }
  .o-checkbox-group {
    margin-top: 12px;
    .o-checkbox {
      margin: 8px 8px 0 0;
    }
  }
}
</style>

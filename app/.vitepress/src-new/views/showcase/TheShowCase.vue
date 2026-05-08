<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import {
  OLink,
  ORadioGroup,
  ORadio,
  OToggle,
  OInput,
  OIcon,
  ODivider,
  OButton,
  ORow,
  OCol,
  OCard,
  OPagination,
  isNull,
  isUndefined,
  ODialog
} from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import banner from '~@/assets/category/showcase/banner.jpg';

import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconDownload from '~icons/app-new/icon-download.svg';
import IconFilter from '~icons/app-new/icon-filter.svg';

import { getUserCaseData } from '~@/api/api-showcase';
import type { CasesRecordsT } from '~@/@types/type-showcase';

import { typesMapZh, typesMapEn } from '~@/data/showcase';

import { useDebounceSearch } from '~@/composables/useDebounceSearch';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t, isZh } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

// -------------------- 列表数据 -------------------
const params = reactive({
  category: 'showcase',
  industry: t('showcase.all'),
  keyword: '',
  lang: locale.value,
  page: 1,
  pageSize: 12,
});
const loading = ref(false);
const caseData = ref<CasesRecordsT[]>([]);

const typeOptions = {
  zh: [t('showcase.all'), t('showcase.finance'), t('showcase.carrier'), t('showcase.energy'), t('showcase.logistics'), t('showcase.education'), t('showcase.cloudComputing'), t('showcase.other')],
  en: [t('showcase.all'), t('showcase.finance'), t('showcase.carrier'), t('showcase.energy'), t('showcase.logistics'), t('showcase.other')]
};

const clearChecked = (checked: boolean) => {
  if (checked) {
    setTimeout(() => {
      params.industry = t('showcase.all');
    });
  }
};

const searchValue = ref();
const onInputName = useDebounceSearch((value: string) => {
  params.keyword = value;
}, 300);

const pathResolving = (path: string) => {
  path = path.endsWith('index')
    ? '/' + path.replace(/(index)$/g, '')
    : '/' + path + '.html';
  return path;
};

// -------------------- 分页 --------------------
const total = ref(0);
const COUNT_PER_PAGE = [12, 24, 36, 48];

const onPageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
  if (pageSize !== params.pageSize) {
    params.page = 1;
  } else {
    params.page = page;
  }
  params.pageSize = pageSize;
  getCasesData();
};

const filterEmptyParmes = (params: any) => {
  if (params) {
    params.industry =
      params.industry === typeOptions[locale.value][0] ? '' : params.industry;
    Object.keys(params).forEach((key) => {
      if (
        params[key] === '' ||
        isNull(params[key]) ||
        isUndefined(params[key])
      ) {
        delete params[key];
      }
    });
  }
  return params;
};

// -------------------- 案例列表 --------------------
const getCasesData = () => {
  loading.value = true;
  getUserCaseData(filterEmptyParmes(JSON.parse(JSON.stringify(params)))).then(res => {
    if (res?.obj?.records) {
      total.value = res.obj.count;
      if (lePadV.value) {
        caseData.value.push(...res.obj.records);
      } else {
        caseData.value = res.obj.records;
      }
    } else {
      caseData.value = [];
      total.value = 0;
    }
  })
  .finally(() => {
    loading.value = false;
  });
};

// 根据跳转时url携带的参数显示筛选内容
const activeIndex = ref(0);
const getUrlParam = () => {
  const industry = Number(
    decodeURIComponent(window.location.href.split('=')[1])
  );
  if (industry) {
    activeIndex.value = industry * 1;
    params.industry = typeOptions[locale.value][activeIndex.value];
  } else {
    activeIndex.value = 0;
    params.industry = typeOptions[locale.value][0];
  }
}

watch(
  () => [
    params.industry,
    params.keyword
  ],
  () => {
    params.page = 1;
    params.pageSize = 12;
    getCasesData();
  }
);

const getMoreData = () => {
  if (lePadV.value && params.page * params.pageSize < total.value) {
    params.page = params.page + 1;
    getCasesData();
  }
};

onMounted(() => {
  getUrlParam();
  getCasesData();
});

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (leLaptop.value) {
    return '24px 24px';
  }
  return '32px 32px';
});

// -------------------- 移动端 --------------------
const filterVisible = ref(false);
const typeValue = ref(t('showcase.all'));

const handleReset = () => {
  caseData.value = [];
  params.industry = '';
  filterVisible.value = false;
};
const handleConfirm = () => {
  caseData.value = [];
  params.industry = typeValue.value;
  filterVisible.value = false;
};
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="case-banner" :title="t('showcase.title')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('showcase.title') }}</p>
  </div>
  <AppSection class="showcase">
    <div v-if="locale === 'zh'" class="tips">
      <span>{{ t('showcase.tips') }}</span>
      <OLink
        color="primary"
        href="mailto:user@openeuler.sh"
        target="_blank"
      >user@openeuler.sh</OLink>
    </div>
    <div v-if="!lePadV" class="filter-card">
      <div class="filter">
        <p class="filter-title">{{ t('showcase.type') }}</p>
        <ORadioGroup
          v-model="params.industry"
          :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
        >
          <ORadio
            v-for="option in typeOptions[locale]"
            :key="option"
            :value="option"
          >
            <template #radio="{ checked }">
              <OToggle
                @click="clearChecked(checked)"
                :class="{ active: checked }"
                :checked="checked"
              >
                {{ option }}
              </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <ODivider :style="{ '--o-divider-gap': '16px' }" />
      <div class="search-box">
        <OInput
          v-model="searchValue"
          :placeholder="t('showcase.placeholder')"
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
    <div v-else class="filter-card-mb">
      <OInput
        v-model="searchValue"
        :placeholder="t('showcase.placeholder')"
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
      <div class="filter-btn-mb">
        <OButton
          variant="text"
          color="normal"
          class="filter-btn"
          @click="filterVisible = true"
        >
          <span>{{ t('common.filter') }}</span>
          <template #suffix>
            <OIcon><IconFilter /></OIcon>
          </template>
        </OButton>
      </div>
    </div>
    <div v-if="!lePadV" class="case-header">
      <div class="left-total">
        <span>{{ t('showcase.find1') }}</span>
        <span class="total">{{ total }}</span>
        <span>{{ t('showcase.find2') }}</span>
      </div>
      <OButton
        variant="outline"
        color="primary"
        size="large"
        :href="isZh ? '/whitepaper/openEuler%20industry%20user%20case%20collection.pdf' : '/whitepaper/en/OpenAtom%20openEuler%20Use%20Cases%20(Featured%202025).pdf'"
        download
      >
        <OIcon><IconDownload /></OIcon>
        {{ t('showcase.downloadCase') }}
      </OButton>
    </div>
    <ORow v-if="caseData?.length" v-scroll-bottom="getMoreData" :gap="gap" wrap="wrap" class="case-list">
      <OCol v-for="(item, i) in caseData" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
        <OCard hoverable :href="pathResolving(item.path)" target="_blank" :class="{'card-dark': isDark}">
          <template #card>
            <div
              class="card-content"
              :style="{
                backgroundImage: `url(${isZh ? typesMapZh.get(item.industry)?.img[commonStore.theme] : typesMapEn.get(item.industry)?.img[commonStore.theme]})`
              }"
            >
              <div class="title-top">
                <OIcon class="nav-item-icon">
                  <component :is="isZh ? typesMapZh.get(item.industry)?.icon : typesMapEn.get(item.industry)?.icon"> </component>
                </OIcon>
                <span class="title">{{ item.title }}</span>
              </div>
              <p class="summary">{{ item.summary }}</p>
            </div>
          </template>
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
    <OPagination
      v-if="total > 0 && !lePadV"
      :key="total"
      :total="total"
      :page="params.page"
      :page-size="params.pageSize"
      :page-sizes="COUNT_PER_PAGE"
      :layout="['total', 'jumper', 'pager', 'pagesize']"
      :show-more="false"
      @change="onPageChange"
    />
    <ODialog v-model:visible="filterVisible" size="medium" class="filter-body-showcase">
      <template #header>
        <span class="del-title">{{ t('common.filter') }}</span>
      </template>
      <div class="dlg-body">
        <div class="filter">
          <p class="filter-title">{{ t('showcase.type') }}</p>
          <ORadioGroup
            v-model="typeValue"
            :style="{ gap: '8px 8px' }"
          >
            <ORadio
              v-for="option in typeOptions[locale]"
              :key="option"
              :value="option"
            >
              <template #radio="{ checked }">
                <OToggle
                  @click="clearChecked(checked)"
                  :class="{ active: checked }"
                  :checked="checked"
                >
                  {{ option }}
                </OToggle>
              </template>
            </ORadio>
          </ORadioGroup>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <OButton variant="text" @click="handleReset">{{
            t('common.reset')
          }}</OButton>
          <ODivider direction="v" class="divider-btn" />
          <OButton variant="text" @click="handleConfirm">{{
            t('common.confirm')
          }}</OButton>
        </div>
      </template>
    </ODialog>
  </AppSection>
</template>

<style scoped lang="scss">
.case-banner {
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
  @include respond-to('<=pad_v') {
    padding: 24px 24px 0;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
  }
}

.showcase {
  :deep(.section-wrapper) {
    margin-top: 40px !important;
    @include respond-to('<=laptop') {
      margin-top: 32px !important;
    }
    @include respond-to('<=pad_v') {
      margin-top: 24px !important;
    }
  }
}
.tips {
  text-align: center;
  @include text1;
}

.filter-card {
  background-color: var(--o-color-fill2);
  padding: 24px 32px;
  border-radius: var(--o-radius-xs);
  margin-top: 40px;
}
.filter {
  display: flex;
  align-items: center;
}
.filter-title {
  min-width: 64px;
  color: var(--o-color-info1);
  font-weight: 500;
  margin-right: 32px;
  @include text1;
}
.o-toggle {
  --toggle-size: 32px;
  --toggle-padding: 3px 15px;
  --toggle-radius: 4px;
  max-height: 32px;
  color: var(--o-color-info1);
  border: 1px solid var(--o-color-control2-light);
  --toggle-bg-color: var(--o-color-control2-light);
  --toggle-bg-color-hover: var(--o-color-control3-light);
  @include text1;
}
.o-radio + .o-radio {
  margin-left: 0;
}
.active {
  background-color: transparent;
  color: var(--o-color-primary1);
  border: 1px solid var(--o-color-primary1);
}

.search-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .input-search {
    :deep(.o_box) {
      width: 320px;
    }
    :deep(.o_input) {
      width: 100%;
    }
  }
}

.case-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  .left-total {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    @include text1;
  }
  .total {
    margin: 0 4px;
    color: var(--o-color-primary1);
  }
  .o-btn {
    --btn-color-hover: var(--o-color-primary2);
    --btn-color-active: var(--o-color-primary3);
    --btn-bd-color-hover: var(--o-color-primary2);
    --btn-bd-color-active: var(--o-color-primary3);
    --btn-bg-color-hover: transparent;
    --btn-bg-color-active: transparent;
    .o-icon {
      --icon-size: 24px;
      margin-right: 4px;
    }
  }
}

.case-list {
  margin-top: 40px;
}
.o-card {
  background-image: url('~@/assets/category/showcase/light/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
}
.card-dark {
  background-image: url('~@/assets/category/showcase/dark/bg.png');
}
.card-content {
  padding: 24px 32px;
  color: var(--o-color-info1);
  height: 199px;
  background-size: 151px 151px;
  background-repeat: no-repeat;
  background-position: right bottom;
  cursor: pointer;
}
.title-top {
  display: flex;
  align-items: flex-start;
  color: var(--o-color-info1);
  .o-icon {
    --icon-size: 32px;
  }
  .title {
    margin-left: 12px;
    margin-top: 1px;
    font-weight: 600;
    @include text-truncate(1);
    @include h3;
  }
}
.summary {
  color: var(--o-color-info3);
  margin-top: 8px;
  @include text-truncate(2);
  @include text1;
}

.case-list + .o-pagination {
  margin-top: 24px;
  :deep(.o-pagination-wrap) {
    justify-content: flex-end;
  }
}

@include respond-to('<=laptop') {
  .filter-card {
    padding: 24px;
  }
  .filter-title {
    margin-right: 24px;
  }
  .card-content {
    padding: 24px;
  }
  .title-top {
    .title {
      margin-top: 3px;
    }
  }
}
@include respond-to('<=pad') {
  .filter-card {
    padding: 16px;
  }
  .card-content {
    padding: 16px;
    background-size: 120px 120px;
  }
  .title-top {
    .o-icon {
      --icon-size: 24px;
    }
    .title {
      margin-left: 8px;
      margin-top: 0;
    }
  }
}
@include respond-to('<=pad_v') {
  .tips {
    text-align: left;
    @include h4;
  }
  :deep(.o-input) {
    width: 100%;
    margin-top: 24px;
    .o_box {
      width: 100%;
    }
    .o_input {
      width: 100%;
    }
  }
  .filter-btn-mb {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
  .case-list {
    margin-top: 12px;
  }
  .o-card-hoverable {
    box-shadow: none;
  }
  .o-card {
    background-image: url('~@/assets/category/showcase/light/bg-mb.png');
  }
  .card-dark {
    background-image: url('~@/assets/category/showcase/dark/bg-mb.png');
  }
  .card-content {
    padding: 12px;
    height: 100px;
    background-image: none !important;
  }
  .title-top {
    .title {
      margin-left: 12px;
      font-weight: 500;
    }
  }
  .summary {
    @include text2;
  }
  .filter {
    align-items: flex-start;
    flex-direction: column;
  }
  .filter-title {
    margin: 0 0 8px 0;
  }
  .o-toggle {
    --toggle-size: auto;
    --toggle-padding: 4px 11px;
    max-height: auto;
  }
  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    .o-btn {
      flex: 1;
    }
  }
  .divider-btn {
    --o-divider-label-gap: 0 8px;
  }
}
</style>
<style lang="scss">
@include respond-to('<=pad_v') {
  .filter-body-showcase {
    --layer-align: flex-end;
    --dlg-margin: 16px;
    --dlg-radius: 8px;
    --dlg-width: calc(100vw - 32px);
  }
}
</style>

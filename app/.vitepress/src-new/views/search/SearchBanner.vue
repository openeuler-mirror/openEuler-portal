<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue';
import { OInput, OIcon, vOutClick, OTab, OTabPane } from '@opensig/opendesign';

import { useVModels } from '@vueuse/core';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import SearchRecommend from './SearchRecommend.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconSearch from '~icons/app-new/icon-header-search.svg';
import { oaReport } from '@/shared/analytics';

const props = defineProps({
  // 建议搜索词
  suggestList: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    },
  },
  // tab数据
  tabData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // input 框输入数据
  modelValue: {
    type: String,
    default: '',
  },
  currentTab: {
    type: String,
    default: '',
  },
});

const tabDataLabelMap = computed<Map<string, any> | undefined>(() => {
  const tabData = props.tabData;
  if (tabData) {
    return Object.values(tabData).reduce(
      (map, val) => map.set(val.value, val.label),
      new Map()
    );
  }
});

const emits = defineEmits(['search', 'update:modelValue', 'update:currentTab']);

const { modelValue } = useVModels(props, emits);
const isFocus = ref(false);
const searchRecommendRef = ref();

const currentTab = computed({
  get: () => props.currentTab,
  set: (value: string) => {
    if (value !== props.currentTab) {
      //TODO: OTab 组件在此处会执行两次 set
      emits('update:currentTab', value);
    }
  },
});

const onTabChange = (val: any) => {
  reportSearch({
    type: 'tab',
    target: tabDataLabelMap.value?.get(val)?.[locale.value],
  });
};

const { lePadV } = useScreen();
const { locale } = useLocale();

const changeModelValue = () => {
  isFocus.value = false;
  emits('search', modelValue.value);
};

const handleSearchHistory = (val: string) => {
  if (val === modelValue.value) return;
  modelValue.value = val;
  isFocus.value = false;
  emits('search', val);
};
const handleClickSuggest = (val: string) => {
  val = val.replace(/<[^>]+>/g, '');
  modelValue.value = val;
  reportSearch({
    type: 'looking_for',
    target: val,
  });
  emits('search', val);
};

const reportSearch = (data: Record<string, any>) => {
  oaReport(
    'click',
    {
      module: 'search_result',
      content: modelValue.value,
      ...data,
    },
    'search_portal'
  );
};

const handleInput = () => {
  if (!isFocus.value) isFocus.value = true;
};

const verticalPadding = computed(() =>
  lePadV.value ? ['0', '0'] : ['72px', '0']
);

defineExpose({ searchRecommendRef });
</script>
<template>
  <div class="search-banner">
    <ContentWrapper :vertical-padding="verticalPadding">
      <div v-out-click="() => (isFocus = false)" class="search-box">
        <OInput
          :placeholder="$t('common.search')"
          v-model.trim="modelValue"
          ref="inputRef"
          size="large"
          @input="handleInput"
          @focus="() => (isFocus = true)"
          @keyup.enter="changeModelValue"
        >
          <template #prefix>
            <OIcon class="icon"><IconSearch /></OIcon>
          </template>
        </OInput>
        <ClientOnly>
          <SearchRecommend
            class="search-recommend"
            v-show="isFocus"
            ref="searchRecommendRef"
            @search-click="handleSearchHistory"
            :value="modelValue"
          />
        </ClientOnly>
      </div>
      <div v-show="suggestList?.length" class="suggest-list-box">
        <span class="suggest-label">{{ $t('search.suggest') }}</span>
        <ul class="suggest-list">
          <li
            v-for="suggest in suggestList"
            :key="suggest"
            v-dompurify-html="suggest"
            class="suggest"
            @click="handleClickSuggest(suggest)"
          ></li>
        </ul>
      </div>
      <OTab
        v-model="currentTab"
        :style="{
          '--tab-nav-anchor-color': lePadV
            ? 'var(--o-color-primary1)'
            : 'var(--o-color-white)',
        }"
        :line="false"
        @change="onTabChange"
      >
        <template v-for="item in tabData" :key="item.value">
          <OTabPane :value="item.value">
            <template #nav>
              {{ item.label[locale] }}（{{ item.total }}）
            </template>
          </OTabPane>
        </template>
      </OTab>
    </ContentWrapper>
  </div>
</template>

<style scoped lang="scss">
.search-banner {
  background-image: url('~@/assets/category/search/search-banner.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @include respond-to('<=pad_v') {
    background: none;
  }
  .search-box {
    position: relative;
    width: calc(100% - 361px);
    @include respond-to('<=pad_v') {
      display: none;
    }
    .o-input {
      width: 100%;
    }
    :deep(.o_box) {
      width: 100%;
      .o_input {
        width: 100%;
      }
    }
    .search-recommend {
      position: absolute;
      top: 44px;
      width: 100%;
      z-index: 10;
    }
  }
  .suggest-list-box {
    display: flex;
    margin: 8px 0 0;
    color: var(--o-color-white);
    @include h4;
    align-items: center;
    flex-wrap: wrap;
    @include respond-to('<=pad_v') {
      display: none;
    }
    .suggest-label {
      @include tip1;
      color: rgba($color: var(--o-white), $alpha: 0.8);
    }
    .suggest-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      @include tip1;
      .suggest {
        margin-right: 8px;
        cursor: pointer;
        :deep(em) {
          color: var(--o-color-white);
          font-style: normal;
        }
      }
    }
  }
  .o-tab {
    margin-top: 36px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include h4;
    border-bottom: 1px solid var(--o-color-control4);
    @include respond-to('<=pad_v') {
      margin-top: 0;
      border-bottom: inherit;
    }
    :deep(.o-tab-head) {
      @include respond-to('<=pad_v') {
        width: 100%;
      }
    }

    :deep(.o-tab-nav) {
      color: rgba($color: var(--o-white), $alpha: 0.8);
      @include respond-to('<=pad_v') {
        color: var(--tab-icon-color);
      }
      &.o-tab-nav-active {
        color: var(--o-color-white);
        @include respond-to('<=pad_v') {
          color: var(--tab-nav-color-active);
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue';
import { OInput, OIcon, vOutClick, OTab, OTabPane } from '@opensig/opendesign';

import { useVModels } from '@vueuse/core';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import SearchRecommend from './SearchRecommend.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconSearch from '~icons/app-new/icon-header-search.svg';

const props = defineProps({
  suggestList: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    },
  },
  tabData: {
    type: Object,
    default: () => {
      return [];
    },
  },
  modelValue: {
    type: String,
    default: '',
  },
  currentTab: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['search', 'update:modelValue', 'update:currentTab']);

const { modelValue, currentTab } = useVModels(props, emits);

const { lePadV } = useScreen();

const { locale } = useLocale();
// 搜索框是否获取焦点
const isFocus = ref(false);
const searchRecommendRef = ref();

const changeModelValue = (val: string) => {
  changeFocuseState(false);
  emits('search', modelValue.value);
};

const changeFocuseState = (state: boolean) => {
  isFocus.value = state;
};

const handleSearchHistory = (val: string) => {
  if (val === modelValue.value) return false;
  modelValue.value = val;
  changeFocuseState(false);
  emits('search', val);
};
const handleClickSuggest = (val: string) => {
  modelValue.value = val.replace(/<[^>]+>/g, '');
  emits('search', val);
};

const handleInput = () => {
  if (isFocus.value) {
    return;
  }
  changeFocuseState(true);
};

const verticalPadding = computed(() => {
  if (lePadV.value) {
    return ['0', '0'];
  } else {
    return ['72px', '0'];
  }
});

defineExpose({ searchRecommendRef });
</script>
<template>
  <div class="search-banner">
    <ContentWrapper :vertical-padding="verticalPadding">
      <div v-out-click="() => changeFocuseState(false)" class="search-box">
        <OInput
          :placeholder="$t('common.search')"
          v-model.trim="modelValue"
          ref="inputRef"
          size="large"
          @input="handleInput"
          @focus="changeFocuseState(true)"
          @keyup.enter="changeModelValue"
        >
          <template #prefix>
            <OIcon class="icon"><IconSearch></IconSearch></OIcon>
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
      @include h4;
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

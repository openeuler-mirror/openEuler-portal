<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from 'vue';

import { useRouter } from 'vitepress';

import { useLocale } from '~@/composables/useLocale';
import { OInput, OIcon, OButton } from '@opensig/opendesign';
import { getUrlParam } from '~@/utils/common';

import SearchHistoryMo from './SearchHistoryMo.vue';

import IconSearch from '~icons/app-new/icon-search.svg';
import IconArrowLeft from '~icons/app-new/icon-arrow-left.svg';

const { t, isEn } = useLocale();
const router = useRouter();
const searchValue = ref('');

const onClick = () => {
  replaceWinUrl(searchValue.value);
};

const goBack = () => {
  router.go(`${isEn.value ? '/en' : '/'}`);
};

// 搜索框事件
const printEventInput = (v: string) => {
  nextTick(() => {
    replaceWinUrl(v);
  });
};

const replaceWinUrl = (v: string) => {
  document.body.scrollTop = 0;
  //   router.go({
  //     path: `/search/${isEn.value ? 'en/' : ''}`,
  //     query: {
  //       inputValue: encodeURIComponent(v),
  //     },
  //   });
};
onMounted(() => {
  if (getUrlParam('search')) {
    searchValue.value = decodeURIComponent(getUrlParam('search'));
  }
});
watch(
  () => searchValue.value,
  (v: string) => {
    if (v === '') {
      replaceWinUrl(v);
    }
  }
);
</script>

<template>
  <!-- <div class="search-input">
    <OIcon class="back" @click="goBack">
      <IconArrowLeft />
    </OIcon>
    <OInput
      v-model="searchValue"
      :placeholder="t('search.placeholder')"
      round="16px"
      variant="solid"
      class="search-top-input"
      size="medium"
      @focus=""
      @press-enter="(v) => printEventInput(v)"
    >
      <template #prefix>
        <OIcon class="search-icon"><IconSearch /></OIcon>
      </template>
    </OInput>
    <OButton variant="text" class="search-btn" @click="onClick">
      {{ t('search.search') }}
    </OButton>
</div> -->
<SearchHistoryMo />
</template>

<style lang="scss" scoped>
.search-input {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .o-input {
    flex: 1;
    --o-control_size-m: 32px;
    --input-bd-color: var(--o-color-info2);
    --input-bg-color: var(--o-color-fill2);
  }

  :deep(.o_box) {
    width: 100%;
    --box-bg-color: var(--o-color-fill2);
  }
  .o-icon {
    --icon-size: 16px;
  }
  .search-btn {
    --btn-padding: 0;
    --btn-min-width: auto;
    font-size: 16px;
    line-height: 24px;
  }
  .back {
    font-size: 24px;
    color: var(--o-color-info1);
  }
}
</style>

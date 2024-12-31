<script lang="ts" setup>
import { ref, watch, PropType, computed } from 'vue';

import { useData } from 'vitepress';

import { OIcon, OScroller, OLink } from '@opensig/opendesign';

import SearchSoftwareCard from './SearchSoftwareCard.vue';

import { subModuleMap } from '~@/data/search';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import type { AppItemT } from '~@/@types/type-search';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import { getUrlParam } from '~@/utils/common';

const props = defineProps({
  softwareZone: {
    type: Array as PropType<AppItemT[]>,
    default: () => [],
  },
});

const { lePadV } = useScreen();
const { locale } = useLocale();
const { site } = useData();

const searchValue = computed(() => {
  return getUrlParam('search') || '';
});
</script>
<template>
  <div class="search-software-zone">
    <OScroller :show-type="lePadV ? 'never' : 'always'" size="small" disabled-y>
      <div class="software-title">
        <i18n-t keypath="search.softwareZoneTitle" tag="p" class="title">
          <template #searchVal>
            <span class="brand-color">“{{ searchValue }}”-</span>
          </template>
        </i18n-t>
        <OLink
          class="more"
          target="_blank"
          :href="`${site.themeConfig.softwareUrl}/zh/field?name=${searchValue}`"
          >{{ $t('search.more') }}
          <template #suffix>
            <OIcon><IconChevronRight class="download-button-icon" /></OIcon>
          </template>
        </OLink>
      </div>
      <div class="software-card-box">
        <SearchSoftwareCard
          class="software-card"
          v-for="softwareCard in softwareZone"
          :key="softwareCard.name"
          :data="softwareCard"
        />
      </div>
      <div class="from">
        <span>{{ $t('search.from') }}</span>
        <div class="breadcrumb">
          <div
            v-for="(breadCrumb, index) in subModuleMap.get('software')?.from[
              locale
            ]"
            :key="breadCrumb"
            :title="breadCrumb"
            class="breadcrumb-item-label"
          >
            {{ breadCrumb }}
            <OIcon
              v-if="
                index + 1 !==
                subModuleMap.get('communityRelease')?.from[locale].length
              "
            >
              <IconChevronRight />
            </OIcon>
          </div>
        </div>
      </div>
    </OScroller>
  </div>
</template>

<style scoped lang="scss">
.search-software-zone {
  background-image: url(~@/assets/category/search/bg.png);
  background-size: 100% auto;
  padding: 20px 24px 16px;
  background-color: rgba($color: #2e53fa, $alpha: 0.04);
  background-position: center bottom;
  background-repeat: no-repeat;
  .more {
    position: absolute;
    right: 0;
  }
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    padding: 12px 16px;
  }
  .software-card {
    min-width: 348px;
  }
  :deep(.o-scrollbar-container) {
    padding-bottom: 16px;
    @include respond-to('<=pad_v') {
      padding-bottom: 0;
    }
  }
  .software-title {
    display: flex;
    justify-content: space-between;
    @include text2;
    .brand-color {
      color: var(--o-color-primary1);
    }
    .o-link {
      @include tip1;
    }
  }
  .software-card-box {
    margin-top: 24px;
    display: flex;
    gap: 24px;
    @include respond-to('<=pad_v') {
      margin-top: 8px;
      gap: 16px;
    }
  }
  .from {
    @include tip2;
    margin-top: 8px;
    display: flex;
    align-items: center;
    color: var(--o-color-info3);
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    @include tip2;
    color: var(--o-color-info3);
    .breadcrumb-item-label {
      display: flex;
      align-items: center;
    }
    .o-icon {
      margin: 0 4px;
    }
  }
}
</style>

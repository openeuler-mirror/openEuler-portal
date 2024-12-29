<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vitepress';

import { getSearchRecommend } from '@/api/api-search';

import { OIcon, OLink } from '@opensig/opendesign';

import { subModuleMap } from '~@/data/search';

import { useLocale } from '~@/composables/useLocale';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const props = defineProps({
  downloadZone: {
    type: Object,
    default: () => [],
  },
});

const { locale } = useLocale();
const router = useRouter();

const goDetail = (url: string) => {
  router.go(url);
};
</script>
<template>
  <div class="search-download-zone">
    <div class="download-title">
      <i18n-t keypath="search.downloadZoneTitle" tag="p" class="title">
        <template #searchVal>
          <span class="brand-color"
            >“{{ downloadZone?.path?.split('=')[1] }}” -
          </span>
        </template>
      </i18n-t>
      <OLink
        class="more"
        target="_blank"
        :href="`/${locale}/download/#community-releases`"
        >{{ $t('search.more') }}
        <template #suffix>
          <OIcon><IconChevronRight class="download-button-icon" /></OIcon>
        </template>
      </OLink>
    </div>
    <div
      v-dompurify-html="downloadZone.title"
      class="download-version"
      @click="goDetail(downloadZone.path)"
    ></div>
    <div
      v-dompurify-html="downloadZone.textContent"
      @click="goDetail(downloadZone.path)"
      class="download-desc"
    ></div>
    <div class="breadcrumb">
      <div
        v-for="(breadCrumb, index) in subModuleMap.get('communityRelease')
          ?.from[locale]"
        :key="breadCrumb"
        :title="breadCrumb"
        class="breadcrumb-item-label"
      >
        {{ breadCrumb.replace('{version}', downloadZone?.path?.split('=')[1]) }}
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
</template>

<style scoped lang="scss">
.search-download-zone {
  background-image: url(~@/assets/category/search/bg.png);
  background-size: 100% auto;
  padding: 20px 24px 16px;
  background-color: rgba($color: #2e53fa, $alpha: 0.04);
  background-position: center bottom;
  background-repeat: no-repeat;
  border-radius: var(--o-radius-xs);
  .download-title {
    display: flex;
    justify-content: space-between;
    .title {
      @include text2;
      .brand-color {
        color: var(--o-color-primary1);
      }
    }
    .more {
      @include tip1;
    }
  }
  .download-version {
    margin-top: 24px;
  }
  .download-desc {
    margin-top: 8px;
    @include text1;
  }
  .download-version,
  .download-desc {
    cursor: pointer;
    :deep(span) {
      color: var(--o-color-primary1);
    }
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    margin-top: 8px;
    @include tip1;
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

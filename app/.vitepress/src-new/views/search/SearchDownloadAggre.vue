<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vitepress';

import { OIcon, OButton } from '@opensig/opendesign';

import communityVersionData from '~@/data/download/download';

import { useLocale } from '~@/composables/useLocale';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import { oaReport } from '@/shared/analytics';
import { useI18n } from 'vue-i18n';

const { locale } = useLocale();
const { t } = useI18n();
const localeCommunityVersionData = computed(() => {
  return communityVersionData[locale.value].COMMUNITY_LIST;
});
const router = useRouter();

const onClickLink = () => {
  oaReport(
    'click',
    {
      type: 'topic_download',
      module: 'search_result',
      content: new URLSearchParams(location.search).get('search'),
      target: t('search.goDownload'),
    },
    'search_portal'
  );
};
</script>
<template>
  <div class="search-download-zone">
    <div class="download-title">
      <div class="title">{{ $t('search.gaussWant') }}</div>
    </div>
    <div class="download-version">
      {{ $t('search.latest') }}: {{ localeCommunityVersionData[0].NAME }}
    </div>
    <div class="download-desc">
      {{ localeCommunityVersionData[0].DESC }}
    </div>
    <a :href="`/${locale}/download/`">
      <OButton @click="onClickLink" variant="outline" color="primary">
        <span>{{ $t('search.goDownload') }}</span>
        <template #suffix>
          <OIcon><IconChevronRight class="download-button-icon" /></OIcon>
        </template>
      </OButton>
    </a>
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
  @include respond-to('<=pad_v') {
    padding: 12px 16px;
  }
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
  .o-btn {
    margin-top: 8px;
  }
}
</style>

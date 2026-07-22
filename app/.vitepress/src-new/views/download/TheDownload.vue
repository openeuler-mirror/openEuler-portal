<script lang="ts" setup>
import { ref } from 'vue';

import { useIntersectionObserver } from '@vueuse/core';

import { OAnchor, OAnchorItem } from '@opensig/opendesign';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import DownloadCommunity from './DownloadCommunity.vue';
import DownloadGetOs from './DownloadGetOs.vue';
import DownloadGetResource from './DownloadGetResource.vue';
import DownloadSupportService from './DownloadSupportService.vue';

import { anchorList } from '~@/data/download/download';
import { oaReport } from '@opendesign-plus/plugins/analytics';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const target = ref(null);
const showAnchor = ref(false);

useIntersectionObserver(target, ([entry]) => {
  showAnchor.value = !entry?.isIntersecting;
});

const reportDownload = (data: Record<string, any>) => {
  oaReport(
    'click',
    {
      module: t('download.COMMUNITY'),
      ...data,
    },
    'download'
  );
};
</script>
<template>
  <div v-show="showAnchor" class="anchor-header">
    <ContentWrapper
      :style="{
        '--content-wrapper-vertical-paddingTop': '0',
        '--content-wrapper-vertical-paddingBottom': '0',
      }"
    >
      <div class="anchor-container">
        <OAnchor
          container="#app > .o-scroller > .o-scroller-container"
          :targetOffset="160"
        >
          <OAnchorItem
            v-for="anchor in anchorList"
            :key="anchor.id"
            :title="anchor.title"
            :href="`#${anchor.id}`"
          ></OAnchorItem>
        </OAnchor>
      </div>
    </ContentWrapper>
  </div>
  <div ref="target"></div>
  <DownloadCommunity
    @report-download="reportDownload"
    id="community-releases"
  />
  <DownloadGetOs @report-download="reportDownload" id="get-openeuler" />
  <DownloadGetResource
    @report-download="reportDownload"
    id="related-resources"
  />
  <DownloadSupportService
    @report-download="reportDownload"
    id="services-resources"
  />
</template>

<style lang="scss" scoped>
.anchor-header {
    position: fixed;
    top: var(--layout-header-height);
    width: 100%;
    height: 48px;
    backdrop-filter: blur(10px);
    z-index: 10;
    background-color: rgba($color: var(--o-grey-1), $alpha: 0.25);
    @include text1;
    @include respond('<=pad_v') {
      display: none;
    }

    .anchor-container {
      display: flex;
      align-items: center;
      height: 48px;

      :deep(.o-anchor) {
        .o-anchor-line {
          display: none;
        }

        .o-anchor-items {
          display: flex;
          flex-wrap: wrap;
        }

        .o-anchor-item-lines {
          display: none;
        }

        .o-anchor-item {
          --anchor-item-width: auto;
          --anchor-item-min-width: auto;
          --anchor-item-link-gap: 0;
          --anchor-item-link-padding: 0 32px 0 0;
        }
      }
    }
}
.dark {
  background-color: rgba($color: var(--o-grey-4), $alpha: 0.25);
}
</style>

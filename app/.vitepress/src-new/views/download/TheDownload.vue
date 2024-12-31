<script lang="ts" setup>
import { ref } from 'vue';

import { useIntersectionObserver } from '@vueuse/core';

import { OAnchor, OAnchorItem } from '@opensig/opendesign';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import DownloadCommunity from './DownloadCommunity.vue';
import DownloadGetOs from './DownloadGetOs.vue';
import DownlooadGetResource from './DownlooadGetResource.vue';
import DownlooadSupportService from './DownlooadSupportService.vue';

import { anchorList } from '~@/data/download/download';

const target = ref(null);
const showAnchor = ref(false);

useIntersectionObserver(target, ([entry]) => {
  showAnchor.value = !entry?.isIntersecting;
});
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
  <DownloadCommunity id="community-releases" />
  <DownloadGetOs id="get-openeuler" />
  <DownlooadGetResource id="related-resources" />
  <DownlooadSupportService id="services-resources" />
</template>

<style lang="scss" scoped>
.anchor-header {
    position: fixed;
    top: var(--layout-header-height);
    width: 100%;
    height: 48px;
    backdrop-filter: blur(10px);
    z-index: 10;
    background-color: rgba($color: var(--o-mixedgray-1), $alpha: 0.25);
    @include text1;
    @include respond-to('<=pad_v') {
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

        .o-anchor-item {
          --anchor-item-width: auto;
          --anchor-item-min-width: auto;
          --anchor-item-link-bg-color-hover: transparent;
          --anchor-item-link-bg-color-active: transparent;
          --anchor-item-link-color: var(--o-color-info3);
          --anchor-item-link-color-active: var(--o-color-info1);
          --anchor-item-link-color-hover: --anchor-item-link-gap: 0;
          --anchor-item-link-padding: 0 32px 0 0;

          .o-anchor-item-link {
            @include hover {
              &:not(.is-active) {
                color: var(--o-color-info2);
              }
            }
          }
        }
      }
    }
}
.dark {
  background-color: rgba($color: var(--o-mixedgray-4), $alpha: 0.25);
}
</style>

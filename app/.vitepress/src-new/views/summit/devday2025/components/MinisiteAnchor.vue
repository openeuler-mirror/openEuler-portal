<script lang="ts" setup>
import { ref } from 'vue';

import { useIntersectionObserver } from '@vueuse/core';

import { OAnchor, OAnchorItem } from '@opensig/opendesign';
import ContentWrapper from '~@/components/ContentWrapper.vue';

const target = ref(null);
const showAnchor = ref(false);
defineProps({
  anchorData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

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
            v-for="anchor in anchorData"
            :key="anchor.id"
            :title="anchor.title"
            :href="`#${anchor.id}`"
          ></OAnchorItem>
        </OAnchor>
      </div>
    </ContentWrapper>
  </div>
  <div ref="target"></div>
</template>

<style lang="scss" scoped>
.anchor-header {
    position: fixed;
    top: var(--layout-header-height);
    width: 100%;
    height: 68px;
    z-index: 10;
    background-color: var(--o-color-control2-light);
    @include text1;
    @include respond-to('<=pad_v') {
      top: 48px;
      height: 54px;
    }

    .anchor-container {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 920px;
      margin: 0 auto;
      height: 68px;
      @include respond-to('<=pad_v') {
        height: 54px;
      }


      :deep(.o-anchor) {
        width: 100%;
        .o-anchor-line {
          display: none;
        }

        .o-anchor-items {
          display: flex;
          max-width: 920px;
          width: 100%;
          gap: var(--o-gap-4);
          background-color: var(--o-color-control3-light);
          padding: var(--o-gap-1);
          border-radius: var(--o-radius-xs);
        }

        .o-anchor-item {
          flex: 1 1 auto;
          --anchor-item-link-bg-color-hover: transparent;
          --anchor-item-link-color-hover: --anchor-item-link-gap: 0;
          --anchor-item-link-radius: var(--o-radius-xs);
          --anchor-item-min-width: 60px;
          --anchor-item-link-gap: 0px;

          .o-anchor-item-link {
            @include text1;
            --anchor-item-link-bg-color-active: var(--o-color-control5-light);
            --anchor-item-link-color-active: var(--o-color-primary1);
            --anchor-item-link-color-hover: var(--o-color-primary1);
            --anchor-item-link-color: var(--o-color-info2);
            --anchor-item-link-padding: 6px 0;
            font-weight: 500;
            display: block;
            text-align: center;
          }
        }
      }
    }
}
</style>

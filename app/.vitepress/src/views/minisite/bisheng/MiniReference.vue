<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';

import MiniTitle from '../components/MiniTitle.vue';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const router = useRouter();
const { lang } = useData();

defineProps({
  referenceObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const goLink = (path: string) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value}` + path);
  }
};
</script>

<template>
  <div class="reference">
    <MiniTitle
      :inside-title="referenceObj.TITLE_INSIDE"
      :outside-title="referenceObj.TITLE_OUTSIDE"
    />
    <div class="reference-list">
      <OContainer
        v-for="(item, index) in referenceObj.LINK_LIST"
        :key="index"
        :level-index="2"
        class="item"
      >
        <div class="item-link">
          <OButton
            animation
            type="text"
            size="small"
            class="link-button"
            @click="goLink(item.LINK)"
          >
            {{ item.TEXT }}
            <template #suffixIcon>
              <OIcon><IconArrowRight /></OIcon>
            </template>
          </OButton>
        </div>
        <div class="item-img"></div>
      </OContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reference {
  width: 100%;
  &-list {
    margin: 0 auto;
    .item {
      width: 100%;
      height: 96px;
      background-color: var(--e-color-bg2);

      font-size: var(--e-font-size-h7);
      color: var(--e-color-text1);
      line-height: var(--e-height-h6);
      position: relative;
      .item-link {
        z-index: 2;
        position: absolute;
        top: 37px;
        left: 36px;
        bottom: 37px;
        &-button {
          padding: 0 !important;
          margin-right: 10px;
          svg {
            color: var(--e-color-brand1);
          }
        }
      }
      .item-img {
        z-index: 1;
        position: absolute;
        top: -24px;
        bottom: -24px;
        right: 0;
        width: 232px;
        height: 144px;
        background-size: 100%;
      }
    }

    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: var(--e-spacing-h5);
      .item {
        height: 54px;
        .item-link {
          top: 16px;
          left: 8px;
          bottom: 16px;
        }
        .item-img {
          width: 130px;
          height: 81px;
          top: -14px;
          bottom: -19px;
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: var(--e-spacing-h4);
      grid-column-gap: var(--e-spacing-h4);
    }
    @media screen and (min-width: 1080px) {
      max-width: 1416px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-row-gap: var(--e-spacing-h4);
      grid-column-gap: var(--e-spacing-h4);
    }
  }
}
</style>

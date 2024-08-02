<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import MiniTitle from '../components/MiniTitle.vue';

defineProps({
  featuresObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="features-box">
    <!-- 标题 -->
    <MiniTitle
      :inside-title="featuresObj.TITLE_INSIDE"
      :outside-title="featuresObj.TITLE_OUTSIDE"
    />
    <!-- 内容 -->
    <div class="content">
      <div
        v-for="(item, index) in featuresObj.CHARACTER_LIST"
        :key="item.TITLE"
        class="content-item"
        :class="
          index == featuresObj.CHARACTER_LIST.length - 1 ||
          index == featuresObj.CHARACTER_LIST.length - 2
            ? 'content-item'
            : 'content-item content-item-bottom'
        "
      >
        <img v-if="!isDark" :src="item.IMG" alt="" />
        <img v-else :src="item.IMG_DARK" alt="" />
        <div class="item-info">
          <div class="content-item-title">{{ item.TITLE }}</div>
          <div class="content-item-desc">{{ item.DESC }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.features-box {
  width: 100%;
  margin-bottom: var(--o-spacing-h2);
  .content {
    margin: 0 auto;
    background-color: var(--o-color-bg2);
    padding: 0 150px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
    box-shadow: var(--o-shadow-l1);
    &-item {
      max-width: 482px;
      display: flex;
      padding: var(--o-spacing-h2) 0;
      color: var(--o-color-text1);
      img {
        display: block;
        width: 80px;
        height: 80px;
        margin-right: var(--o-spacing-h5);
      }
      &-title {
        margin: var(--o-spacing-h5) 0 var(--o-spacing-h8) 0;
      }
      &-desc {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text4);
      }
      &-bottom {
        border-bottom: 1px solid var(--o-color-text5);
      }
    }
    @media screen and (min-width: 1440px) {
      max-width: 1416px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1439px) {
      padding: 0 auto;
    }
    @media screen and (max-width: 1079px) {
      padding: 0 var(--o-spacing-h2);
    }
    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0 var(--o-spacing-h5);
      &-item {
        margin: 0 auto;
        padding: var(--o-spacing-h5) 0;
        &-title {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          margin: var(--o-spacing-h5) 0 var(--o-spacing-h10) 0;
        }
        &-desc {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
        img {
          margin: auto;
          margin-right: var(--o-spacing-h5);
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .content :nth-child(5) {
      border-bottom: 1px solid var(--o-color-text5);
    }
  }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

defineProps({
  reviewData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="review">
    <div class="title-img">
      {{ reviewData.title }}
      <img
        class="introduction-img"
        :src="isDark ? reviewData.titleImDark : reviewData.titleImg"
        alt=""
      />
    </div>
    <div class="link-box">
      <p v-for="item in reviewData.list" :key="item.link">
        <a :href="item.link" target="_blank" rel="noopener noreferrer">{{
          item.name
        }}</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.review {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: 40px;
  }
}
.link-box {
  margin-top: var(--e-spacing-h2);
  width: 100%;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: var(--e-spacing-h6);
  }
  p {
    & ~ p {
      margin-top: var(--e-spacing-h4);
      @media screen and (max-width: 768px) {
        margin-top: var(--e-spacing-h5);
      }
    }
    a {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
      font-weight: 500;
      display: inline-block;
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
      & + a {
        margin-top: var(--e-spacing-h6);
        @media screen and (max-width: 768px) {
          margin-top: var(--e-spacing-h8);
        }
      }
    }
  }
}
</style>

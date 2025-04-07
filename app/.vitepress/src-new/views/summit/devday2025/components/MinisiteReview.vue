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
      <p class="title-text">{{ reviewData.title }}</p>
      <img :src="isDark ? reviewData.titleImDark : reviewData.titleImg" />
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
  @include respond-to('<=pad_v') {
    margin-top: 40px;
  }
}
.link-box {
  margin-top: var(--o-gap-7);
  width: 100%;
  text-align: center;
  @include respond-to('<=pad_v') {
    width: 100%;
    margin-top: var(--o-gap-3);
  }
  p {
    & ~ p {
      margin-top: var(--o-gap-5);
      @include respond-to('<=pad_v') {
        margin-top: var(--o-gap-4);
      }
    }
    a {
      @include text2;
      font-weight: 500;
      display: inline-block;
      & + a {
        margin-top: var(--o-gap-3);
        @include respond-to('<=pad_v') {
          margin-top: var(--o-gap-2);
        }
      }
    }
  }
}
</style>

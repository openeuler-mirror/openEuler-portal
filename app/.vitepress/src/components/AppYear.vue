<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';

import yearImgZh from '@/assets/category/year/euler-year-zh.png';
import yearImgEn from '@/assets/category/year/euler-year-en.png';

const { lang } = useData();
const EULER_YEAR = 'https://summary.openeuler.org/';

const isShow = ref(true);
function closeYear() {
  isShow.value = false;
}
const yearImg = computed(() => {
  return lang.value === 'zh' ? yearImgZh : yearImgEn;
});
</script>
<template>
  <div v-show="isShow" class="euler-year">
    <div class="close-year" @click="closeYear"></div>
    <a
      class="year-link"
      :href="EULER_YEAR + lang + '/'"
      rel="noopener noreferrer"
      target="_blank"
    ></a>
    <img :src="yearImg" alt="" />
  </div>
</template>
<style lang="scss" scoped>
.euler-year {
  position: fixed;
  left: calc(var(--layout-content-padding) / 2);
  bottom: 164px;
  z-index: 12;

  @include respond-to('<=pad') {
    display: none;
  }

  .year-link {
    position: absolute;
    width: 100%;
    height: calc(100% - 20px);
    bottom: 0;
    @include respond-to('<=pad') {
      height: calc(100% - 16px);
    }
  }
  .close-year {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: -2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @include respond-to('<=pad') {
      width: 16px;
      height: 16px;
      right: 12px;
    }
  }
  img {
    width: 180px;

    @include respond-to('<=pad') {
      width: 120px;
    }
  }
}
</style>

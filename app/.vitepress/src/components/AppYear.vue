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
      :href="EULER_YEAR+lang+'/'"
      rel="noopener noreferrer"
      target="_blank"
    ></a>
    <img :src="yearImg" alt="" />
  </div>
</template>
<style lang="scss" scoped>
.euler-year {
  position: fixed;
  left: 80px;
  bottom: 250px;
  z-index: 12;
  @media (max-width: 1700px) {
    left: 20px;
  }
  @media (max-width: 1560px) {
    left: 2px;
  }
  @media (max-width: 1526px) {
    left: 44px;
  }
  @media (max-width: 1439px) {
    left: 24px;
  }
  @media (max-width: 1100px) {
    left: 16px;
  }
  .year-link {
    position: absolute;
    width: 100%;
    height: calc(100% - 22px);
    bottom: 0;
    @media (max-width: 1100px) {
      height: calc(100% - 16px);
    }
  }
  .close-year {
    cursor: pointer;
    position: absolute;
    right: 4px;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @media (max-width: 1100px) {
      width: 8px;
      height: 8px;
      right: 3px;
      top: 1px;
    }
  }
  img {
    width: 180px;
    @media (max-width: 1100px) {
      width: 80px;
    }
  }
}
</style>

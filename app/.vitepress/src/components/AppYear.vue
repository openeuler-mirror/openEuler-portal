<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { isClient } from '@opensig/opendesign';

import yearImgZh from '@/assets/category/year/openeuler-year-zh.png';
import yearImgEn from '@/assets/category/year/openeuler-year-en.png';
import yearImgZhMb from '@/assets/category/year/openeuler-year-zh-mb.png';
import yearImgEnMb from '@/assets/category/year/openeuler-year-en-mb.png';

import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();
const { lang } = useData();
const EULER_YEAR = 'https://summary.openeuler.org/';

const isShow = ref(false);

onMounted(() => {
  if (isClient) {
    const summaryClose = sessionStorage.getItem('close_summary');
    isShow.value = summaryClose === null;
  }
});

function closeYear() {
  isShow.value = false;
  if (isClient) {
    sessionStorage.setItem('close_summary', '1');
  }
}

const yearImg = computed(() => {
  return lang.value === 'zh'
    ? lePadV.value
      ? yearImgZhMb
      : yearImgZh
    : lePadV.value
    ? yearImgEnMb
    : yearImgEn;
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
    right: 0;
    top: -2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    @include respond-to('pad_v-laptop') {
      width: 18px;
      height: 18px;
      right: -4px;
      top: -4px;
    }

    @include respond-to('<=pad_v') {
      width: 16px;
      height: 16px;
      right: -4px;
      top: -4px;
    }
  }
  img {
    width: 125px;

    @include respond-to('pad_v-laptop') {
      width: 94px;
    }

    @include respond-to('<=pad_v') {
      width: 83px;
    }
  }
}
</style>

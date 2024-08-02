<script setup lang="ts">
import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SigGatheringBanner.vue';
import SigGatheringIntroduce from './components/SigGatheringIntroduce.vue';
import SigGatheringTopic from './components/SigGatheringTopic.vue';
import SigGatheringAgenda from './components/SigGatheringAgenda.vue';
import SigGatheringReview from './components/SigGatheringReview.vue';

import { useData } from 'vitepress';

import data_zh from './data/data_zh';
import data_en from './data/data_en';

const { lang } = useData();

let summitData: any;

if (lang.value === 'zh') {
  summitData = data_zh;
} else {
  summitData = data_en;
}
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
    <SigGatheringIntroduce :introduce-data="summitData.introduce" />
    <SigGatheringTopic :topic-data="summitData.topic" />
    <SigGatheringAgenda :agenda-data="summitData.agenda" />
    <SigGatheringReview v-if="lang === 'zh'" :review-data="summitData.review" />
  </AppContext>
</template>

<style scoped lang="scss">
:deep(.title-img) {
  font-size: var(--e-font-size-h3);
  line-height: var(--e-line-height-h3);
  font-weight: 300;
  color: var(--e-color-text1);
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    margin-bottom: 16px;
  }
  img {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    height: 31px;
    @media screen and (max-width: 768px) {
      height: 18px;
      top: -4px;
    }
  }
}
</style>

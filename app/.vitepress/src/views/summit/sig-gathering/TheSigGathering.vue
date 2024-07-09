<script setup lang="ts">
import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SigGatheringBanner.vue';
import SigGatheringIntroduce from './components/SigGatheringIntroduce.vue';
import SigGatheringTopic from './components/SigGatheringTopic.vue';
import SigGatheringAgenda from './components/SigGatheringAgenda.vue';
import SigGatheringReview from './components/SigGatheringReview.vue';

import data_zh from './data/data_zh';
</script>

<template>
  <SummitBanner :banner-data="data_zh.banner" />
  <AppContext>
    <SigGatheringIntroduce :introduce-data="data_zh.introduce" />
    <SigGatheringTopic :topic-data="data_zh.topic" />
    <SigGatheringAgenda :agenda-data="data_zh.agenda" />
    <SigGatheringReview :review-data="data_zh.review" />
  </AppContext>
</template>

<style scoped lang="scss">
:deep(.title-img) {
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  font-weight: 300;
  color: var(--o-color-text1);
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
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

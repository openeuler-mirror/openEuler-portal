<script setup lang="ts">
import AppContext from '@/components/AppContent.vue';
import MinisiteBanner from './components/MinisiteBanner.vue';
import MinisiteIntroduce from './components/MinisiteIntroduce.vue';
import MinisiteCard from './components/MinisiteCard.vue';
import MinisiteAgenda from './components/MinisiteAgenda.vue';
import MinisiteReview from './components/MinisiteReview.vue';
import MinisiteAnchor from './components/MinisiteAnchor.vue';
import MinisiteGuide from './components/MinisiteGuide.vue';
import data from './data/data_zh';
</script>

<template>
  <MinisiteBanner :banner-data="data.banner" />
  <MinisiteAnchor :anchor-data="data.anchor" />
  <AppContext>
    <MinisiteIntroduce
      :introduce-data="data.introduce"
      id="minisite-introduction"
    />
    <MinisiteCard :topic-data="data.topic" />
    <MinisiteAgenda :agenda-data="data.agenda" id="minisite-agenda" />
    <MinisiteGuide :guide-data="data.guide" id="venue-guide" />
    <MinisiteReview :review-data="data.review" />
  </AppContext>
</template>

<style scoped lang="scss">
:deep(.title-img) {
  font-size: 36px;
  line-height: 48px;
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  @include respond-to('<=pad_v') {
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 16px;
  }
  img {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    height: 31px;
    @include respond-to('<=pad_v') {
      height: 18px;
      top: -4px;
    }
  }
  .title-text {
    z-index: 1;
    position: relative;
  }
}
</style>

<script setup lang="ts">
import ContentWrapper from '~@/components/ContentWrapper.vue';
import MinisiteBanner from './components/MinisiteBanner.vue';
import MinisiteIntroduce from './components/MinisiteIntroduce.vue';
import MinisiteCard from './components/MinisiteCard.vue';
import MinisiteAgenda from './components/MinisiteAgenda.vue';
import MinisiteReview from './components/MinisiteReview.vue';

import data from './data/data_zh';

import { devday2026s } from '#cms'
</script>

<template>
  <MinisiteBanner :banner-data="data.banner" />
  <ContentWrapper v-if="devday2026s" :vertical-padding="['0', '72px']">
    <MinisiteIntroduce :introduce-data="devday2026s[0].floor" />
    <MinisiteCard :card-data="devday2026s[1].floor" />
    <MinisiteAgenda :agenda-data="devday2026s[2].floor" />
    <MinisiteReview :review-data="devday2026s[3].floor" />
  </ContentWrapper>
</template>

<style scoped lang="scss">
:deep(.floor-title) {
  color: var(--o-color-info1);
  font-weight: 500;
  text-align: center;
  margin-top: 72px;
  @include display3;

  @include respond-to('<=laptop') {
    margin-top: 56px;
  }
  @include respond-to('<=pad') {
    margin-top: 40px;
  }
  @include respond-to('<=pad_v') {
    margin-top: 32px;
  }
}

@include respond-to('<=pad_v') {
  .content-wrapper {
    --content-wrapper-vertical-paddingBottom: 40px !important;
  }
}
</style>

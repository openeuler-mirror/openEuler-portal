<script setup lang="ts">
import ContentWrapper from '~@/components/ContentWrapper.vue';
import MinisiteBanner from './components/MinisiteBanner.vue';
import MinisiteIntroduce from './components/MinisiteIntroduce.vue';
import MinisiteCard from './components/MinisiteCard.vue';
import MinisiteCardLong from './components/MinisiteCardLong.vue';
import MinisiteReview from './components/MinisiteReview.vue';

import showcaseQRCode from './img/showcase.png';
import posterQRCode from './img/poster.png';
import partnerQRCode from './img/partner.png';

import data from './data/data_zh';

import devday2026 from '../../../../../../.cms/export/devday2026.json';
</script>

<template>
  <MinisiteBanner :banner-data="data.banner" />
  <ContentWrapper v-if="devday2026" :vertical-padding="['0', '72px']">
    <MinisiteIntroduce :introduce-data="devday2026.data[0].floor[0]" />
    <MinisiteCard :card-data="devday2026.data[0].floor[1]" />
    <MinisiteCardLong :card-data="devday2026.data[0].floor[2]" :img="showcaseQRCode" />
    <MinisiteCardLong :card-data="devday2026.data[0].floor[3]" :img="posterQRCode" />
    <MinisiteCardLong :card-data="devday2026.data[0].floor[4]" :img="partnerQRCode" />
    <MinisiteReview :review-data="devday2026.data[0].floor[5]" />
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

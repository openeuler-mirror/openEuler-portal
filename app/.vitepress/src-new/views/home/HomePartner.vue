<script setup lang="ts">
import HomeSwiper from './HomeSwiper.vue';

import { publisher } from '~@/data/home/publisher';

const publisher1 = publisher.slice(0, 8);
const publisher2 = publisher.slice(8, 16);
const publisher3 = publisher.slice(16);
</script>

<template>
  <div class="home-partner" data-aos="fade-up">
    <p class="title">发行厂商</p>
    <HomeSwiper :data="publisher1" class="partner-swiper"></HomeSwiper>
    <HomeSwiper
      :data="publisher2"
      :reverse-direction="true"
      class="partner-swiper"
    ></HomeSwiper>
    <HomeSwiper :data="publisher3" class="partner-swiper"></HomeSwiper>
    <p class="tips">{{ $t('home.publisherTips') }}</p>
  </div>
</template>

<style lang="scss" scoped>
.home-partner {
  padding-bottom: 72px;
}
.title {
  @include display3;
  color: var(--o-color-info1);
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
}
.partner-swiper {
  margin-top: 24px;
}
.tips {
  @include tip1;
  margin-top: 24px;
  text-align: center;
  color: var(--o-color-info3);
}

@include respond-to('phone') {
  .home-partner {
    padding-bottom: 32px;
  }
  .title {
    margin-bottom: 12px;
  }
  .partner-swiper {
    margin-top: 12px;
  }
}
</style>

<style lang="scss">
[data-o-theme='dark'] {
  .partner-swiper {
    .o-figure img {
      filter: none;
    }
  }
}
</style>

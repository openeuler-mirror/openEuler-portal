<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import HomeSwiper from './HomeSwiper.vue';

import { publisher } from '~@/data/home/publisher';

const publisher1 = [...publisher.slice(0, 8), ...publisher.slice(0, 8)];
const publisher2 = [...publisher.slice(8, 16), ...publisher.slice(8, 16)];
const publisher3 = [...publisher.slice(16), ...publisher.slice(16)];
</script>

<template>
  <AppSection class="home-partner" :title="$t('home.publisher')" :full="true">
    <HomeSwiper :data="publisher1" class="partner-swiper"></HomeSwiper>
    <HomeSwiper
      :data="publisher2"
      :reverse-direction="true"
      class="partner-swiper"
    ></HomeSwiper>
    <HomeSwiper :data="publisher3" class="partner-swiper"></HomeSwiper>
    <template #footer>
      <p class="partner-tips">{{ $t('home.publisherTips') }}</p>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-partner {
  max-width: 1920px;
  margin: 0 auto;
}
.partner-swiper {
  & + .partner-swiper {
    margin-top: 12px;
  }
}

.parterner-tips {
  @include tip1;
  text-align: center;
  color: var(--o-color-info3);
}
</style>

<style lang="scss">
@include in-dark {
  .partner-swiper {
    .o-figure img {
      filter: none;
    }
  }
}
</style>

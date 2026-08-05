<script setup lang="ts">
import { computed } from 'vue';
import AppSection from '~@/components/AppSection.vue';
import HomeSwiper from './HomeSwiper.vue';

import homeContent from '#content/home';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

const publisher1 = computed(() =>
  Array(5).fill(homeContent[locale.value].publisher.slice(0, 8)).flat()
);
const publisher2 = computed(() =>
  Array(8).fill(homeContent[locale.value].publisher.slice(8, 16)).flat()
);
const publisher3 = computed(() =>
  Array(5).fill(homeContent[locale.value].publisher.slice(16)).flat()
);
</script>
</script>

<template>
  <AppSection
    class="home-partner"
    :title="$t('home.publisher')"
    :full="true"
    v-analytics.bubble="{ level1: $t('home.publisher') }"
    :data-v-analytics-title="$t('home.publisher')"
  >
    <OLogoSwiper>
      <OLogoSwiperItems
        v-for="(row, i) in publisherRows"
        :key="i"
        :data="row"
        :reverse="i % 2 === 1"
        :duration="150"
      />
    </OLogoSwiper>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-partner {
  margin: 0 auto;
}
</style>

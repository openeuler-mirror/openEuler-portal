<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { OLogoSwiper, OLogoSwiperItems } from '@opendesign-plus/components';
import type { OLogoSwiperItemT } from '@opendesign-plus/components';

import AppSection from '~@/components/AppSection.vue';
import { publisher } from '~@/data/home/publisher';
import { useCommon } from '@/stores/common';

interface PublisherT {
  logo: { light: string; dark: string };
  href: string;
  href_en?: string;
}

const { theme } = storeToRefs(useCommon());
const isDark = computed(() => theme.value === 'dark');

const mapFunc = (p: PublisherT): OLogoSwiperItemT => ({
  logo: isDark.value ? p.logo.dark : p.logo.light,
  logoDark: p.logo.dark,
  href: p.href,
  hrefEn: p.href_en,
});

const partSize = Math.floor(publisher.length / 3);
const publisherRows = computed(() => [
  publisher.slice(0, partSize).map(mapFunc),
  publisher.slice(partSize, partSize * 2).map(mapFunc),
  publisher.slice(partSize * 2).map(mapFunc),
]);
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

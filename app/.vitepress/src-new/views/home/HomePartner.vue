<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { OLogoSwiper, OLogoSwiperItems } from '@opendesign-plus/components';
import type { OLogoSwiperItemT } from '@opendesign-plus/components';

import AppSection from '~@/components/AppSection.vue';

import homeContent from '#content/home';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';

const { locale } = useLocale();
const { theme } = storeToRefs(useCommon());
const isDark = computed(() => theme.value === 'dark');

const mapFunc = (p: {
  logo_light: string;
  logo_dark: string;
  href: string;
}): OLogoSwiperItemT => ({
  logo: isDark.value ? p.logo_dark : p.logo_light,
  logoDark: p.logo_dark,
  href: p.href,
});

const publisherRows = computed(() => {
  const list = homeContent[locale.value].publisher;
  const size = Math.floor(list.length / 3);
  return [list.slice(0, size), list.slice(size, size * 2), list.slice(size * 2)]
    .filter((row) => row.length)
    .map((row) => row.map(mapFunc));
});
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

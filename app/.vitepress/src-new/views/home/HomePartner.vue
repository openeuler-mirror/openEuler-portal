<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

import { OLogoSwiper, OLogoSwiperItems } from '@opendesign-plus/components';
import type { OLogoSwiperItemT } from '@opendesign-plus/components';

import AppSection from '~@/components/AppSection.vue';
import { publisher } from '~@/data/home/publisher';
import { useCommon } from '@/stores/common';

interface PublisherT {
  logo: { light: string; dark: string };
  href: string;
  href_en?: string;
  validity?: { start?: string; end?: string };
}

const { theme } = storeToRefs(useCommon());
const isDark = computed(() => theme.value === 'dark');

const now = ref(Date.now());
onMounted(() => {
  now.value = Date.now();
});

const isActive = (validity: PublisherT['validity'], current: number): boolean => {
  if (!validity) return true;
  const { start, end } = validity;
  if (start && current < dayjs(start).startOf('day').valueOf()) return false;
  if (end && current > dayjs(end).endOf('day').valueOf()) return false;
  return true;
};

const visiblePublishers = computed(() =>
  publisher.filter((p: PublisherT) => isActive(p.validity, now.value))
);

const mapFunc = (p: PublisherT): OLogoSwiperItemT => ({
  logo: isDark.value ? p.logo.dark : p.logo.light,
  logoDark: p.logo.dark,
  href: p.href,
  hrefEn: p.href_en,
});

const publisherRows = computed(() => {
  const list = visiblePublishers.value;
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

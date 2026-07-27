<script setup lang="ts">
import { computed } from 'vue';
import AppSection from '~@/components/AppSection.vue';
import HomeSwiper from './HomeSwiper.vue';
import homeContent from '#content/home';
import { useLocale } from '~@/composables/useLocale';

const { isZh } = useLocale();

const homeData = computed(() => (isZh.value ? homeContent.zh : homeContent.en));

const publisher = computed(() =>
  homeData.value.publisher.map((item) => ({
    ...item,
    logo: { light: item.logo_light, dark: item.logo_dark },
  }))
);

const publisher1 = computed(() => Array(5).fill(publisher.value.slice(0, 8)).flat());
const publisher2 = computed(() => Array(8).fill(publisher.value.slice(8, 16)).flat());
const publisher3 = computed(() => Array(5).fill(publisher.value.slice(16)).flat());
</script>

<template>
  <AppSection
    class="home-partner"
    :title="$t('home.publisher')"
    :full="true"
    v-analytics.bubble="{ level1: $t('home.publisher') }"
    :data-v-analytics-title="$t('home.publisher')"
  >
    <HomeSwiper :data="publisher1" class="partner-swiper"></HomeSwiper>
    <HomeSwiper
      :data="publisher2"
      :reverse-direction="true"
      class="partner-swiper"
    ></HomeSwiper>
    <HomeSwiper :data="publisher3" class="partner-swiper"></HomeSwiper>
    <template #footer>
      <p>{{ $t('home.publisherTips') }}</p>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-partner {
  margin: 0 auto;
}
.partner-swiper {
  & + .partner-swiper {
    margin-top: 24px;

    @include respond('laptop') {
      margin-top: 20px;
    }

    @include respond('pad_h') {
      margin-top: 16px;
    }

    @include respond('<=pad_v') {
      margin-top: 12px;
    }
  }
}

.parterner-tips {
  text-align: center;
  color: var(--o-color-info3);
  @include tip1;
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

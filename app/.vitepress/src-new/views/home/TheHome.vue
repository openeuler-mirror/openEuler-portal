<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

import AOS from 'aos';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import { getSortData } from '@/api/api-search';
import { getMeetingActivity } from '@/api/api-calendar';

import HomeBanner from './HomeBanner.vue';
import HomeDisplayZone from './HomeDisplayZone.vue';
import HomeIntro from './HomeIntro.vue';
import HomePlayCommunity from './HomePlayCommunity.vue';
import HomeShowCase from './HomeShowCase.vue';
import HomePartner from './HomePartner.vue';
import HomeCalendar from './HomeCalendar.vue';
import HomeTrend from './HomeTrend.vue';

const { isPhone, isPad } = useScreen();

const { locale, isZh } = useLocale();

const calendarData = ref<string[]>([]);

const paramsCase = {
  lang: locale.value,
  page: 1,
  pageSize: 100,
};
getSortData(paramsCase);

const verticalPadding = computed(() => {
  if (isPhone.value) {
    return ['32px', '32px'];
  } else if (isPad.value) {
    return ['0', '40px'];
  } else {
    return ['0', '72px'];
  }
});
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
  getMeetingActivity({
    type: 'all',
  }).then((res) => {
    calendarData.value = res.data;
  });
});
</script>
<template>
  <div class="home">
    <HomeBanner />
    <ContentWrapper :vertical-padding="verticalPadding">
      <HomeDisplayZone class="home-display-zone" />
      <HomeIntro />
      <HomePlayCommunity />
      <HomeCalendar
        v-if="isZh && calendarData?.length"
        :table-data="calendarData"
      />
      <HomeShowCase />
      <HomeTrend />
    </ContentWrapper>
    <HomePartner />
  </div>
</template>

<style scoped lang="scss">
.home-display-zone {
  margin-top: -41px;
  @include respond-to('phone') {
    margin-top: 0;
  }
}
:deep(h3) {
  @include display3;
  font-weight: 500;
  color: var(--o-color-info1);
  text-align: center;
  margin-top: 72px;
  @include respond-to('phone') {
    margin-top: 32px;
  }
}
.home {
  background-image: linear-gradient(
    180deg,
    #f3f3f5 0%,
    #dae1f2 40%,
    #ebeffc 79%,
    #f3f3f5 100%
  );
}
[data-o-theme='dark'] {
  .home {
    background-image: linear-gradient(
      180deg,
      #1a1a1c 0%,
      #0c0f1c 35%,
      #141b2e 52%,
      rgba(26, 26, 28, 0.04) 88%
    );
  }
}
</style>

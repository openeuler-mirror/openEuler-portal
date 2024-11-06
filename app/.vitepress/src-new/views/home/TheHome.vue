<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

import AOS from 'aos';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import { getMeetingActivity } from '@/api/api-calendar';

import HomeBanner from './HomeBanner.vue';
import HomeDisplayZone from './HomeDisplayZone.vue';
import HomeIntro from './HomeIntro.vue';
import HomePlayCommunity from './HomePlayCommunity.vue';
import HomeShowCase from './HomeShowCase.vue';
import HomePartner from './HomePartner.vue';
import HomeCalendar from './HomeCalendar.vue';
import HomeTrend from './HomeTrend.vue';

const { isPhone, isPadV } = useScreen();

const { locale, isZh } = useLocale();

const isResult = ref(false);

const calendarData = ref<string[]>([]);

const verticalPadding = computed(() => {
  if (isPhone.value) {
    return ['32px', '0'];
  } else if (isPadV.value) {
    return ['32px', '0'];
  } else {
    return ['0', '0'];
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
    </ContentWrapper>
    <HomeIntro />
    <ContentWrapper :vertical-padding="['0', '0']">
      <HomePlayCommunity />
      <HomeCalendar
        v-if="isZh && calendarData?.length"
        :table-data="calendarData"
      />
    </ContentWrapper>
    <HomeShowCase @result="isResult = true" />
    <HomeTrend :is-result="isResult" />
    <!-- <HomePartner /> -->
  </div>
</template>

<style scoped lang="scss">
.home-display-zone {
  margin-top: -41px;
  @include respond-to('<=pad_v') {
    margin-top: 0;
  }
}

:deep(h3) {
  @include display3;
  font-weight: 500;
  color: var(--o-color-info1);
  text-align: center;
  margin-top: var(--o-gap-section);
}
.home {
  overflow: hidden;

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

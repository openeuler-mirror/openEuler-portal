<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, ComponentPublicInstance } from 'vue';

import AOS from 'aos';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import { getMeetingActivity } from '@/api/api-calendar';
import { vAnalytics } from '~@/directive/analytics';

import HomeBanner from './HomeBanner.vue';
import HomeDisplayZone from './HomeDisplayZone.vue';
import HomeIntro from './HomeIntro.vue';
import HomePlayCommunity from './HomePlayCommunity.vue';
import HomeShowCase from './HomeShowCase.vue';
import HomePartner from './HomePartner.vue';
import HomeCalendar from './HomeCalendar.vue';
import HomeTrend from './HomeTrend.vue';
import HomeFriendlyCommunity from './HomeFriendlyCommunity.vue';
import { oaReport } from '@/shared/analytics';
import { useEventListener, useIntersectionObserver } from '@vueuse/core';

const { isPhone, isPadV } = useScreen();

const { isZh } = useLocale();

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

// ------------滚动深度埋点------------
// 当前视口内的楼层
const currentActiveSections = new Set<string>();

const introRef = ref<ComponentPublicInstance>();
const playCommunityRef = ref<ComponentPublicInstance>();
const calendarRef = ref<ComponentPublicInstance>();
const showcaseRef = ref<ComponentPublicInstance>();
const trendRef = ref<ComponentPublicInstance>();
const partnerRef = ref<ComponentPublicInstance>();
const friendlyCommunityRef = ref<ComponentPublicInstance>();

useIntersectionObserver(
  [
    introRef,
    playCommunityRef,
    calendarRef,
    showcaseRef,
    trendRef,
    partnerRef,
    friendlyCommunityRef,
  ],
  (entries) => {
    for (const ent of entries) {
      const section = ent.target as HTMLElement;
      const sectionTitle = section.getAttribute('data-v-analytics-title');
      if (sectionTitle) {
        ent.isIntersecting
          ? currentActiveSections.add(sectionTitle)
          : currentActiveSections.delete(sectionTitle);
      }
    }
  },
  {
    threshold: 0.5,
  }
);

const reportScrollDepth = () => {
  oaReport('scroll', {
    module: 'homepage',
    scrollTop: document.documentElement.scrollTop,
    sections: Array.from(currentActiveSections),
    perentage:
      (
        (document.documentElement.scrollTop * 100) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)
      ).toFixed(2) + '%',
  });
};

onUnmounted(() => {
  reportScrollDepth();
  currentActiveSections.clear();
});

if (typeof document !== 'undefined') {
  useEventListener(document, 'visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      reportScrollDepth();
    }
  });
}
</script>
<template>
  <div
    class="home"
    v-analytics.catchBubble="{ properties: { module: 'homepage' } }"
  >
    <HomeBanner />
    <ContentWrapper :vertical-padding="verticalPadding">
      <HomeDisplayZone data-aos="fade-up" class="home-display-zone" />
    </ContentWrapper>
    <HomeIntro ref="introRef" data-aos="fade-up" />
    <ContentWrapper :vertical-padding="['0', '0']">
      <HomePlayCommunity ref="playCommunityRef" data-aos="fade-up" />
    </ContentWrapper>
    <HomeCalendar
      ref="calendarRef"
      data-aos="fade-up"
      v-if="isZh && calendarData.length"
      :table-data="calendarData"
    />
    <HomeShowCase ref="showcaseRef" data-aos="fade-up" />
    <HomeTrend ref="trendRef" data-aos="fade-up" />
    <HomeFriendlyCommunity ref="friendlyCommunityRef" data-aos="fade-up" />
    <ClientOnly>
      <HomePartner ref="partnerRef" />
    </ClientOnly>
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
  background-color: var(--o-color-fill1);

  background-image: linear-gradient(
    180deg,
    #f3f3f5 0%,
    #dae1f2 40%,
    #ebeffc 79%,
    rgb(243, 243, 245) 100%
  );
  background-position: 0 480px;
  background-size: 100% 60%;
  background-repeat: no-repeat;
}
[data-o-theme='dark'] {
  .home {
    background-image: linear-gradient(
      180deg,
      #1a1a1c 0%,
      #0c0f1c 35%,
      #141b2e 52%,
      rgba(26, 26, 28, 0.04) 100%
    );
  }
}
</style>

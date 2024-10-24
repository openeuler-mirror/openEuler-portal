<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import AOS from 'aos';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { scrollToBottom } from '@/shared/utils';
import seoConfig from '@/data/common/seo';

import UserCase from './UserCase.vue';
import HomeTrend from './HomeTrend.vue';
import HomeBanner from './HomeBanner.vue';
import HomeIntro from './HomeIntro.vue';
import HomeDisplayZone from './HomeDisplayZone.vue';
import HomeMedia from './HomeMedia.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppContent from '@/components/AppContent.vue';
import LinkPanel from '@/components/LinkPanel.vue';
import { getMeetingActivity } from '@/api/api-calendar';
import { getSortData } from '@/api/api-search';

import type { SortResponse } from '@/shared/@types/type-search';

const { lang } = useData();
const commonStore = useCommon();

const calendarData = ref<string[]>([]);
const i18n = useI18n();

const caseData = ref<SortResponse>();
const newsData = ref<SortResponse>();
const blogData = ref<SortResponse>();
const paramsCase = {
  category: 'showcase',
  lang: lang.value,
  page: 1,
  pageSize: 100,
};
const paramsNews = {
  category: 'news',
  lang: lang.value,
  page: 1,
  pageSize: 4,
};
const paramsBlog = {
  category: 'blog',
  lang: lang.value,
  page: 1,
  pageSize: 4,
};

onMounted(async () => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
  try {
    // 获取会议活动数据
    await getMeetingActivity({
      type: 'all',
    }).then((res) => {
      calendarData.value = res.data;
    });
    await Promise.all([
      getSortData(paramsCase),
      getSortData(paramsNews),
      getSortData(paramsBlog),
    ]).then((res) => {
      caseData.value = res[0];
      newsData.value = res[1];
      blogData.value = res[2];
    });
    if (window.location.hash === '#footer') {
      scrollToBottom();
    }
  } catch (e: any) {
    console.error(e);
  }
});
</script>

<template>
  <SeoBox :seo-data="seoConfig[lang]?.home" />
  <HomeBanner />
  <AppContent>
    <HomeDisplayZone />
    <HomeIntro />
    <UserCase v-if="caseData?.obj" :case-data="caseData" />
    <HomeTrend />
    <HomeMedia
      v-if="blogData?.obj && newsData?.obj"
      :blog-data="blogData"
      :news-data="newsData"
    />
    <ClientOnly>
      <div v-if="lang === 'zh' && calendarData?.length" class="home-calendar">
        <h3>{{ i18n.home.HOME_CALENDAR }}</h3>
        <AppCalendar
          id="meeting"
          :table-data="calendarData"
          data-aos="fade-up"
        />
      </div>
    </ClientOnly>
    <div class="home-source-publish">
      <h3 class="partner">
        {{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}
      </h3>
      <p class="rank-tip">{{ i18n.home.RANK_TIP }}</p>
      <LinkPanel
        :link-list="i18n.home.HOME_SOURCE_EDITION"
        :theme="commonStore.theme === 'light' ? 'light' : 'dark'"
      ></LinkPanel>
    </div>
    <div class="home-friendship">
      <h3>{{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}</h3>
      <LinkPanel
        :link-list="i18n.home.FRIENDSHIP_LINK_LIST"
        :theme="commonStore.theme === 'light' ? 'light' : 'dark'"
      ></LinkPanel>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.home-nav {
  position: relative;
  z-index: 10;
}
h3 {
  font-size: var(--e-font-size-h3);
  font-weight: 300;
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--e-spacing-h1);
  margin-bottom: var(--e-spacing-h2);
  @media (max-width: 768px) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    margin-top: var(--e-spacing-h2);
    margin-bottom: var(--e-spacing-h5);
  }
}

html[lang='zh'] .partner {
  margin-bottom: 0;
}
.rank-tip {
  margin: var(--e-spacing-h5) 0 var(--e-spacing-h4);
  text-align: center;
  font-size: var(--e-font-size-tip);
  font-weight: 400;
  color: var(--e-color-text1);
  @media screen and (max-width: 768px) {
    margin: var(--e-spacing-h7) 0 var(--e-spacing-h6);
  }
}
</style>

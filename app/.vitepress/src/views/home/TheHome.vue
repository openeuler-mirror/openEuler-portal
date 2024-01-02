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
import HomePlayground from './HomePlayground.vue';
import HomeDisplayZone from './HomeDisplayZone.vue';
import HomeMedia from './HomeMedia.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppContent from '@/components/AppContent.vue';
import LinkPanel from '@/components/LinkPanel.vue';
import { getMeetingData, getActivityData } from '@/api/api-calendar';
import { getSortData } from '@/api/api-search';

import type { TableDataT } from '@/shared/@types/type-calendar';
import type { SortResponse } from '@/shared/@types/type-search';

const { lang } = useData();
const commonStore = useCommon();

const calendarData = ref<TableDataT[]>([]);
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
    // 获取会议、活动数据并合并
    await Promise.all([getActivityData(), getMeetingData()]).then((res) => {
      res[0].tableData.forEach((item: any) => {
        item.timeData.map((item2: any) => {
          item2['startTime'] = item2.start_date;
        });
      });
      calendarData.value = [...res[0].tableData, ...res[1].tableData];
      calendarData.value.reduce((prev: any, current: any) => {
        const item: any = prev.find(
          (sameDate: any) => sameDate.start_date === current.date
        );
        item
          ? (item.timeData = item.timeData.concat(current.timeData))
          : prev.push(current);
        return prev;
      }, []);
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
  font-size: var(--o-font-size-h3);
  font-weight: 300;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--o-spacing-h1);
  margin-bottom: var(--o-spacing-h2);
  @media (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: var(--o-spacing-h2);
    margin-bottom: var(--o-spacing-h5);
  }
}

html[lang='zh'] .partner {
  margin-bottom: 0;
}
.rank-tip {
  margin: var(--o-spacing-h5) 0 var(--o-spacing-h4);
  text-align: center;
  font-size: var(--o-font-size-tip);
  font-weight: 400;
  color: var(--o-color-text1);
  @media screen and (max-width: 768px) {
    margin: var(--o-spacing-h7) 0 var(--o-spacing-h6);
  }
}
</style>

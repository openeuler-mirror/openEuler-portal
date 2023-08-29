<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useCommon } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitPartner from './components/SummitPartner.vue';
import SummitLive from './components/SummitLive.vue';
import SummitGuests from './components/SummitGuests.vue';

import liveLightImg from './img/live.png';
import liveDarkImg from './img/live-dark.png';

import summitData from './data';
import { getEasyeditorInfo } from '@/api/api-easyeditor';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLightImg : liveDarkImg
);

const getData: any = ref({});
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
  const href =
    'https://www.openeuler.org/zh/interaction/summit-list/devday2023/';
  getEasyeditorInfo(href)
    .then((res) => {
      if (res.data && res.data[0]) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].content = JSON.parse(res.data[i].content);
          getData.value[res.data[i].name] = res.data[i];
        }
        agendaData2.value = getData.value.schedule.content.content.slice(0, 1);
      }
    })
    .catch((e) => {
      throw new Error(e);
    });
});
const showIndex = ref(1);
function setShowIndex(index: number) {
  showIndex.value = index;
}
// 控制上下午切换
const tabType = ref(0);
const agendaData2: any = ref([]);
watch(
  tabType,
  () => {
    if (tabType.value === 1 && getData.value.schedule) {
      agendaData2.value = getData.value.schedule.content.content.slice(1);
    } else if (getData.value.schedule) {
      agendaData2.value = getData.value.schedule.content.content.slice(0, 1);
    }
  },
  {
    immediate: true,
  }
);
// 控制直播
const isLiverShow = ref(0);

// 埋点统计
function setAdvertisedData() {
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  const { href } = window.location;
  if (href.includes('?utm_source')) {
    sensors?.setProfile({
      ...(window as any)['sensorsCustomBuriedData'],
      profileType: 'fromAdvertised',
      origin: href,
    });
  }
}
onMounted(() => {
  setTimeout(() => {
    setAdvertisedData();
  }, 300);
});
</script>
<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
    <div class="detail">
      <p v-for="item in summitData.detail" :key="item">{{ item }}</p>
    </div>
    <div class="liver">
      <h3 class="title-bar">{{ summitData.liver.title }}</h3>
      <ClientOnly>
        <SummitLive
          v-if="isLiverShow === 0"
          :live-data="summitData.liver.liveData1"
          class-name="odd2022"
          class="liver-box"
        />
      </ClientOnly>
    </div>
    <div class="agenda" :class="{ 'min-height': showIndex === 1 }">
      <h3>会议日程</h3>
      <div class="date">
        <div
          class="date-item"
          :class="{ active: showIndex === 0 }"
          @click="setShowIndex(0)"
        >
          <p class="date-day">20</p>
          <p class="date-month">APRIL</p>
        </div>
        <div
          class="date-item"
          :class="{ active: showIndex === 1 }"
          @click="setShowIndex(1)"
        >
          <p class="date-day">21</p>
          <p class="date-month">APRIL</p>
        </div>
      </div>
      <template
        v-if="getData['schedule-20'] && getData['schedule-20'].content.content"
      >
        <template
          v-for="item in getData['schedule-20'].content.content"
          :key="item.lable"
        >
          <SummitSchedule v-show="showIndex === 0" :agenda-data="item" />
        </template>
      </template>

      <!-- <template
        v-for="item in summitData.agenda.content.content"
        :key="item.lable"
      >
        <SummitSchedule v-show="showIndex === 0" :agenda-data="item" />
      </template> -->
      <div v-show="showIndex === 1">
        <el-tabs v-model.number="tabType" class="schedule-tabs">
          <el-tab-pane :name="0">
            <template #label>
              <div class="time-tabs">上午</div>
            </template>
          </el-tab-pane>
          <el-tab-pane :name="1">
            <template #label>
              <div class="time-tabs">下午</div>
            </template>
          </el-tab-pane>
        </el-tabs>
        <template v-for="item in agendaData2" :key="item.lable">
          <SummitSchedule :agenda-data="item" />
        </template>
      </div>
    </div>
    <div class="guest">
      <h3 class="guest-title">{{ summitData.guest.title }}</h3>

      <h4>{{ summitData.guest.guestListMain.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListMain.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
      <h3>{{ summitData.guest.guestListKv.title }}</h3>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListKv.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
    </div>
    <SummitPartner />
    <div class="previous" data-aos="fade-up">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.content"
          :key="item.link"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ item.title }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-mo {
    display: none;
    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    color: var(--o-color-text1);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    & + p {
      margin-top: var(--o-spacing-h6);
    }
  }
}
.liver,
.guest {
  margin-top: var(--o-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  h4 {
    margin-top: 20px;
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    font-weight: 400;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-top: var(--o-spacing-h5);
    }
  }
  .liver-box {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--o-spacing-h4);
    }
  }
}
.agenda {
  margin-top: var(--o-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .date {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    .date-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #cbcbcb;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
      transition: all 0.3s ease-out;

      & ~ div {
        margin-left: 40px;
      }
      &.active {
        color: #fff;
        background-color: var(--o-color-brand1);
        border: 1px solid #fff;
      }
      .date-day {
        padding: 13px 17px 3px 15px;
        line-height: 48px;
        font-size: 48px;
        font-weight: 700;
        border-bottom: 1px solid #cbcbcb;
        @media screen and (max-width: 1120px) {
          padding: 6px 16px;
          font-size: 32px;
          line-height: 32px;
        }
      }
      .date-month {
        padding: 6px 0;
        font-size: 24px;
        font-weight: 100;
        line-height: 24px;
        @media screen and (max-width: 1120px) {
          padding: 4px 0;
          font-size: 16px;
        }
      }
    }
  }
  .schedule-tabs {
    position: relative;
    text-align: center;
    margin-top: 24px;
    :deep(.el-tabs__content) {
      overflow: visible;
      .el-button {
        position: absolute;
        left: 0;
        top: -75px;
        z-index: 1;
      }
    }
    :deep(.el-tabs__nav) {
      float: none;
      display: inline-block;
      .el-tabs__active-bar {
        display: none;
      }
      .el-tabs__item {
        padding: 0;
      }
    }
    :deep(.el-tabs__nav-wrap) {
      &::after {
        display: none;
      }
    }
    .time-tabs {
      display: inline-block;
      margin: 0 0 24px;
      cursor: pointer;
      border: 1px solid var(--o-color-border2);
      color: var(--o-color-text1);
      text-align: center;
      background: var(--o-color-bg2);
      font-size: 14px;
      line-height: 38px;
      padding: 0 16px;
      min-width: 160px;
      @media (max-width: 1100px) {
        line-height: 28px;
        font-size: 12px;
        padding: 0 12px;
        min-width: 100px;
      }
    }

    .is-active .time-tabs {
      color: #fff;
      background: var(--o-color-brand1);
      border-color: var(--o-color-brand1);
    }
  }
}
// 日程数据异步加载导致AOS动效位置计算失效
.min-height {
  min-height: 1160px;
  @media screen and (max-width: 1100px) {
    min-height: fit-content;
  }
}
.previous {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--o-spacing-h6);
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      & + a {
        margin-top: var(--o-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
      }
    }
  }
}
.dark .collect-item {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>

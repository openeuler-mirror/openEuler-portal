<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';

import { useCommon } from '@/stores/common';
import { type ScheduleItemT } from './@type';

import { getEasyeditorInfo } from '@/api/api-easyeditor';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitGuest from './components/SummitGuest.vue';
import SummitPartner from './components/SummitPartner.vue';
import SummitAgent from './components/SummitAgent.vue';

import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

import data_zh from './data/data_zh';
import data_en from './data/data_en';
import data from './data';

const { lang } = useData();

const commonStore = useCommon();

const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);

const isLight = computed(() => {
  return commonStore.theme === 'light';
});

//------------------- 峰会日程 --------------------
const summitData = computed(() => {
  return lang.value === 'zh' ? data_zh : data_en;
});

const dateList = [
  { day: 15, month: 'NOV' },
  { day: 16, month: 'NOV' },
];
// 议程日期切换
const dataIndex = ref(0);
// 控制主论坛分论坛切换
const timeTabIndex = ref(0);
function setDataIndex(index: number) {
  dataIndex.value = index;
  timeTabIndex.value = 0;
}
// 切割agent数据获取当前页面渲染数据
const renderData = computed(() => {
  if (timeTabIndex.value === 1) {
    return getData.value?.content.content.slice(1);
  } else if (getData.value) {
    return getData.value?.content.content.slice(0, 1);
  }
});
// 获取议程数据
const agendaData = ref<ScheduleItemT[]>([]);
onMounted(() => {
  const href = `https://www.openeuler.org/${lang.value}/interaction/summit-list/summit2024/`;
  getEasyeditorInfo(href).then((res) => {
    for (let i = 0; i < data?.length; i++) {
      // res.data[i].content = JSON.parse(res.data[i].content);
      data[i].content = JSON.parse(data[i].content);
    }
    allData.value = data;
    console.log(allData.value);
    console.log(summit2024.value);
  });
});

const allData = ref([]);

const summit2024 = computed(() => {
  return allData.value?.find((item) => item.name === 'summit2024');
});
// // ------------------ 嘉宾数据 -----------
const agentData = computed(() => {
  return summit2024.value?.content?.sections.find(
    (item) => item.type === 'AGENDA'
  );
});
// // ------------------ 嘉宾数据 -----------
const guestData = computed(() => {
  return summit2024.value?.content?.sections.find(
    (item) => item.type === 'GUEST'
  );
});
</script>
<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
    <div class="introduce">
      <p>{{ summitData.introduce }}</p>
      <p>{{ summitData.introduce2 }}</p>
      <p v-if="summitData.introduce3">{{ summitData.introduce3 }}</p>
      <ul v-if="summitData.list">
        <li v-for="li in summitData.list">
          {{ li }}
        </li>
      </ul>
      <p v-if="summitData?.introduce4">{{ summitData.introduce4 }}</p>
    </div>
    <!-- <div class="agenda">
      <h3>
        {{ summitData.agenda.title }}
      </h3>
      <div class="date">
        <div
          v-for="(item, index) in dateList"
          :key="item.day"
          class="date-item"
          :class="{ active: dataIndex === index }"
          @click="setDataIndex(index)"
        >
          <p class="date-day">{{ item.day }}</p>
          <p class="date-month">{{ item.month }}</p>
        </div>
      </div>
      <div class="schedule-box">
        <el-tabs v-model.number="timeTabIndex" class="schedule-tabs">
          <el-tab-pane :name="0">
            <template #label>
              <div class="time-tabs">
                {{ summitData.agenda.tabType[0] }}
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane :name="1">
            <template #label>
              <div class="time-tabs">
                {{
                  dataIndex === 0
                    ? summitData.agenda.tabType[1]
                    : summitData.agenda.tabType1[1]
                }}
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
        <template v-if="renderData?.length && timeTabIndex === 0">
          <SummitSchedule
            v-for="item in renderData"
            :key="item.lable"
            :agenda-data="item"
          />
        </template>
        <template v-else-if="renderData?.length">
          <SummitSchedule
            v-for="item in renderData"
            :key="item.lable"
            :agenda-data="item"
          />
        </template>
      </div>
    </div> -->
    <SummitAgent :data="agentData" />

    <SummitGuest v-if="lang === 'zh'" class="guest" :data="guestData" />
    <SummitPartner />
    <!--  只在中文页显示精彩回顾 -->
    <div v-if="lang === 'zh'" class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.list"
          :key="item.link"
          :href="item.link"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.dark .card-bg {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
@mixin mobile {
  @media screen and (max-width: 768px) {
    @content;
  }
}

.introduce {
  font-size: var(--e-font-size-h6);
  line-height: var(--e-line-height-h6);
  color: var(--e-color-text1);
  p {
    margin-top: 24px;
    @include mobile {
      margin-top: 16px;
    }
    &:first-child {
      margin-top: 0;
    }
  }
  ul {
    padding-left: 20px;
    list-style: inherit;
    li {
      margin-top: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
}

:deep(h3) {
  text-align: center;
  font-size: var(--e-font-size-h3);
  line-height: var(--e-line-height-h3);
  color: var(--e-color-text1);
  font-weight: 300;
  @media (max-width: 767px) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
  }
}
.agenda {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
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
        background-color: var(--e-color-brand1);
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
  .schedule-box {
    position: relative;
    .time-tip {
      position: absolute;
      top: 24px;
      font-size: 18px;
      color: var(--e-color-text1);
      @media (max-width: 1100px) {
        top: 46px;
        font-size: 12px;
      }
    }
    .change-tip {
      margin-top: 24px;
      font-size: 18px;
      color: var(--e-color-text1);
      @media (max-width: 1100px) {
        margin-top: 16px;
        font-size: 12px;
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
      border: 1px solid var(--e-color-border2);
      color: var(--e-color-text1);
      text-align: center;
      background: var(--e-color-bg2);
      font-size: 14px;
      line-height: 38px;
      padding: 0 16px;
      min-width: 172px;
      @media (max-width: 1100px) {
        min-width: 160px;
        line-height: 28px;
        font-size: 12px;
        padding: 0 12px;
      }
    }

    .is-active .time-tabs {
      color: #fff;
      background: var(--e-color-brand1);
      border-color: var(--e-color-brand1);
    }
  }
  .summit-subforum {
    margin-top: 24px;
  }
}
.guest {
  margin-top: var(--e-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
}
.previous {
  margin-top: var(--e-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--e-color-text1);
      margin-right: var(--e-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        margin-right: var(--e-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--e-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--e-spacing-h6);
    }
    a {
      font-size: var(--e-font-size-h6);
      line-height: var(--e-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
      & + a {
        margin-top: var(--e-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--e-spacing-h8);
        }
      }
    }
  }
}
</style>

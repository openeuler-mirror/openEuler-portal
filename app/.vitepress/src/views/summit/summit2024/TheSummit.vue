<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';

import { useCommon, useCookieStore } from '@/stores/common';

import { getEasyeditorInfo } from '@/api/api-easyeditor';
import { getUrlParam } from '@/shared/utils';
import { oa } from '@/shared/analytics';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitGuest from './components/SummitGuest.vue';
import SummitPartner from './components/SummitPartner.vue';
import SummitAgent from './components/SummitAgent.vue';
import SummitLive from './components/SummitLive.vue';

import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

import data_zh from './data/data_zh';
import data_en from './data/data_en';

const { lang } = useData();

const commonStore = useCommon();
const cookieStore = useCookieStore();

const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);

//------------------- 峰会日程 --------------------
const summitData = computed(() => {
  return lang.value === 'zh' ? data_zh : data_en;
});

// 获取议程数据
onMounted(() => {
  const href = `https://www.openeuler.org/${lang.value}/interaction/summit-list/summit2024/`;
  getEasyeditorInfo(href).then((res) => {
    for (let i = 0; i < res.data?.length; i++) {
      res.data[i].content = JSON.parse(res.data[i].content);
    }
    const summit2024 = res.data.find((item) => item.name === 'summit2024')
      ?.content?.sections;
    agendaData.value = summit2024.find((item) => item.type === 'AGENDA');
    guestData.value = summit2024.find((item) => item.type === 'GUEST');
    console.log(summit2024);
  });
});

// ------------------ 日程数据 -----------
const agendaData = ref();
// ------------------ 嘉宾数据 -----------
const guestData = ref();
//-------- 直播 --------
const isLiveShown = ref(0);

// 埋点统计投放流量
function collectAdvertisedData() {
  if (cookieStore.isAllAgreed) {
    const params = getUrlParam('utm_source');
    if (!params) {
      return;
    }
    oa.report('fromAdvertised', () => {
      return {
        utm_source: params,
      };
    });
  }
  history.pushState(null, '', location.origin + location.pathname);
}
onMounted(() => {
  setTimeout(() => {
    collectAdvertisedData();
  }, 300);
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
    <div id="live" class="live">
      <h3 class="title-bar">
        {{ lang === 'zh' ? summitData.live.title : summitData.live.titleEn }}
      </h3>
      <div>
        <OTabs v-model="isLiveShown" class="schedule-tabs">
          <el-tab-pane
            v-for="(item, index) in summitData.live.date"
            :key="index"
            :name="index"
          >
            <template #label>
              <div class="time-tabs">
                {{ item }}
              </div>
            </template>
          </el-tab-pane>
        </OTabs>
        <ClientOnly>
          <SummitLive
            v-if="isLiveShown === 0"
            :live-data="summitData.live.liveData1"
            class-name="live-btn1"
            class="live-box"
          />
          <SummitLive
            v-if="isLiveShown === 1"
            :live-data="summitData.live.liveData2"
            class-name="live-btn2"
            class="live-box"
          />
        </ClientOnly>
      </div>
    </div>
    <SummitAgent class="agenda-floor" :data="agendaData" />

    <SummitGuest v-if="guestData" class="guest" :data="guestData" />
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
.live,
.guest {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
  }
  h3 {
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
  h4 {
    margin-top: 20px;
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    color: var(--e-color-text1);
    font-weight: 400;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      margin-top: var(--e-spacing-h5);
    }
  }
  .live-box {
    margin-top: var(--e-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h4);
    }
  }
}
.live {
  .schedule-tabs {
    text-align: center;
    margin-top: 24px;

    :deep(.el-tabs__nav-wrap) {
      display: flex;
      justify-content: center;
      .el-tabs__nav {
        display: inline-flex;
        .el-tabs__active-bar {
          display: none;
        }
        .el-tabs__item {
          padding: 0;
        }
      }
    }
    .time-tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      // margin: 0 0 24px;
      cursor: pointer;
      border: 1px solid var(--e-color-border2);
      color: var(--e-color-text1);
      width: 120px;
      text-align: center;
      background: var(--e-color-bg2);
      font-size: var(--e-font-size-text);
      line-height: 38px;
      padding: 0 var(--e-spacing-h5);
      .o-icon {
        margin-left: 12px;
      }
      @media (max-width: 1100px) {
        width: 80px;
        line-height: 28px;
        font-size: var(--e-font-size-tip);
        padding: 0 var(--e-spacing-h6);
      }
    }

    .is-active .time-tabs {
      color: #fff;
      background: var(--e-color-brand1);
      border-color: var(--e-color-brand2);
    }
    .other-tabs {
      margin-bottom: 24px;
      :deep(.el-tabs__nav) {
        @media (max-width: 1100px) {
          line-height: 44px;
        }
      }
      :deep(.el-tabs__header) {
        text-align: center;
        .el-tabs__item {
          @media (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
      }
    }
  }
  .time-box {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 16px;
    .o-button {
      color: var(--e-color-text1);
      :deep(.suffix-icon) {
        color: var(--e-color-brand1);
      }
    }
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
.agenda-floor {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
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
    :deep(.el-tabs__nav-wrap) {
      display: flex;
      justify-content: center;
    }

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

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCommon, useCookieStatus } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';

import summitData from './data';
import IconRight from '~icons/app/icon-arrow-right.svg';

const cookieStatus = useCookieStatus();

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

// 埋点统计
function setAdvertisedData() {
  if (cookieStatus.isAllAgreed) {
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
}

const onCallLink = (link: string) => {
  window.open(link, '_blank');
};

onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });

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

    <div class="call-for">
      <div
        v-for="item in summitData.callForList"
        :key="item.name"
        class="call-for-item"
        :style="{
          backgroundImage: `url(${isLight ? item.img : item.imgDark})`,
        }"
      >
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p class="desc">{{ item.desc }}</p>
        </div>
        <OButton
          type="text"
          animation
          size="small"
          @click="onCallLink(item.href)"
          class="call-link"
        >
          {{ item.label }}
          <template #suffixIcon>
            <OIcon class="right-icon"><IconRight /></OIcon>
          </template>
        </OButton>
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.call-for {
  margin: 64px 0;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    margin: 48px 0;
    gap: 24px;
  }
  .call-for-item {
    flex: 1;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: no-repeat center/cover;

    h3 {
      font-size: var(--o-font-size-h4);
      line-height: var(--o-line-height-h4);
      color: var(--o-color-text1);
      font-weight: 500;
      @media (max-width: 767px) {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
    }
    .desc {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
      font-weight: 500;
      margin-top: 24px;
      text-align: justify;
      @media (max-width: 767px) {
        margin-top: 12px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .info {
      margin-bottom: 48px;
      @media (max-width: 767px) {
        margin-bottom: 24px;
      }
    }
    .call-link {
      padding: 0;
      svg {
        width: var(--o-font-size-h8);
        height: var(--o-font-size-h8);
        color: var(--o-color-brand1);
      }
    }
  }
}
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
.live,
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
  .live-box {
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

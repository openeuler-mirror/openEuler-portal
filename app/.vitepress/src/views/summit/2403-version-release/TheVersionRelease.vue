<script setup lang="ts">
import { computed } from 'vue';

import VersionReleaseBanner from './components/VersionReleaseBanner.vue';
import AppContext from '@/components/AppContent.vue';
import VersionReleaseLive from './components/VersionReleaseLive.vue';

import IconTime from '~icons/app/icon-time.svg';
import agenda from './img/agenda.png';
import agendaDark from './img/agenda_dark.png';
import introduction from './img/introduction.png';
import introductionDark from './img/introduction_dark.png';
import live from './img/live-broadcast.png';
import liveDark from './img/live-broadcast_dark.png';
import meetDate from './img/meet-date.png';
import meetDateDark from './img/meet-date_dark.png';
import liveLight1 from '@/assets/category/summit/summit2022/live.png';
import liveDark1 from '@/assets/category/summit/summit2022/live-dark.png';

import data_zh from './data/data_zh';

import { useCommon } from '@/stores/common';

const commonStore = useCommon();

const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight1 : liveDark1
);

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>
<template>
  <VersionReleaseBanner />

  <AppContext>
    <div class="introduce">
      <div class="meet-title">
        {{ data_zh.introduceTitle }}
        <img
          class="introduction-img"
          :src="isDark ? introductionDark : introduction"
          alt=""
        />
      </div>

      <p>
        {{ data_zh.introduce }}
      </p>
      <p>
        {{ data_zh.introduce1 }}
      </p>
      <p>
        {{ data_zh.introduce2 }}
      </p>
      <p>
        {{ data_zh.introduce3 }}
      </p>
    </div>

    <div class="live">
      <div class="meet-title">
        {{ data_zh.live }}

        <img class="live-img" :src="isDark ? liveDark : live" alt="" />
      </div>

      <VersionReleaseLive />
    </div>

    <div class="agenda">
      <div class="meet-title">
        {{ data_zh.agenda }}

        <img class="agenda-img" :src="isDark ? agendaDark : agenda" alt="" />
      </div>

      <div class="date">
        <img :src="isDark ? meetDateDark : meetDate" />
      </div>

      <div class="agenda-main">
        <div class="time-line">
          <div class="start-circle"></div>
          <div class="end-circle"></div>
        </div>

        <div class="agenda-content">
          <div
            :class="[
              'morning',
              isDark ? 'morning-bg_dark' : 'morning-bg_light',
            ]"
          >
            {{ data_zh.morning }}
          </div>

          <div class="agenda-lists">
            <div
              :class="[
                'agenda-lists-card',
                isDark ? 'card-bg-dark' : 'card-bg-light',
              ]"
              v-for="item in data_zh.agendaData"
              :key="item.title"
            >
              <div class="card-top">
                <div class="title-before"></div>

                <p>{{ item.title }}</p>
              </div>

              <div class="card-bottom">
                <OIcon><IconTime /></OIcon>

                <span class="meet-date">{{ item.date }}</span>
                <span class="meet-time">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="previous">
      <div class="previous-title">
        <h3>{{ data_zh.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in data_zh.previous.list"
          :key="item.link"
          :href="item.link"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style lang="scss" scoped>
.meet-title {
  font-size: var(--e-font-size-h3);
  line-height: var(--e-line-height-h3);
  font-weight: 300;
  color: var(--e-color-text1);
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    margin-bottom: 16px;
  }
  img {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    height: 31px;
    @media screen and (max-width: 768px) {
      height: 18px;
      top: -4px;
    }
  }
}
.introduce {
  margin-top: 8px;
  p {
    font-size: var(--e-font-size-h6);
    color: var(--e-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text4);
    }

    & + P {
      margin-top: 24px;
      @media screen and (max-width: 768px) {
        margin-top: 16px;
      }
    }
  }
}
.live {
  margin-top: 72px;
  @media screen and (max-width: 768px) {
    margin-top: 44px;
  }
}
.date {
  display: flex;
  justify-content: center;
  img {
    width: 106px;
    height: 123px;
    @media screen and (max-width: 768px) {
      width: 53px;
      height: 62px;
    }
  }
}
.agenda {
  margin-top: 72px;
  @media screen and (max-width: 768px) {
    margin-top: 44px;
  }
}
.agenda-main {
  display: flex;
  margin-top: 24px;
}
.agenda-content {
  flex: 1;
}
.time-line {
  width: 2px;
  min-height: 100%;
  background-color: var(--e-color-brand1);
  margin: 24px 24px 0 8px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 1px;
    margin: 20px 10px 0 4px;
  }
  .start-circle,
  .end-circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--e-color-brand1);
    position: absolute;
    left: -7px;
    @media screen and (max-width: 768px) {
      width: 8px;
      height: 8px;
      left: -3px;
    }
  }
  .start-circle {
    top: -13px;
    @media screen and (max-width: 768px) {
      top: -4px;
    }
  }
  .end-circle {
    bottom: 0;
  }
}
.morning {
  font-size: var(--e-font-size-h6);
  line-height: var(--e-line-height-h6);
  font-weight: 500;
  color: #fff;
  padding: 4px 12px 4px 12px;
  width: 160px;

  @media screen and (max-width: 768px) {
    width: 128px;
    height: 29px;
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
  }
}
.morning-bg_light {
  background-image: linear-gradient(
    270deg,
    rgba(75, 114, 199, 0) 2%,
    #002fa7 100%
  );
}
.morning-bg_dark {
  background-image: linear-gradient(
    270deg,
    rgba(140, 171, 234, 0) 2%,
    #406fe7 100%
  );
}
.agenda-lists {
  margin-top: 16px;
  .agenda-lists-card {
    padding: 24px;
    width: 100%;
    background-color: var(--e-color-bg2);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: right;
    & + .agenda-lists-card {
      margin-top: 16px;
    }

    @media screen and (max-width: 768px) {
      padding: 16px;
      background-size: 200% 100%;
    }
  }
  .card-bg-light {
    background-image: url('./img/meet-card-bg.png');
  }
  .card-bg-dark {
    background-image: url('./img/meet-card-bg_dark.png');
  }

  .card-top {
    display: flex;
    align-items: center;
    .title-before {
      width: 6px;
      height: 22px;
      border-radius: 3px;
      background-color: var(--e-color-brand1);
      margin-right: 8px;
      @media screen and (max-width: 768px) {
        width: 4px;
        height: 15px;
        margin-right: 6px;
        align-self: start;
        margin-top: 4px;
      }
    }
    p {
      font-size: 22px;
      line-height: 30px;
      font-weight: 500;
      color: var(--e-color-text1);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
  }

  .card-bottom {
    margin-top: 24px;
    color: var(--e-color-text1);
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
      margin-top: 34px;
    }
    .o-icon {
      font-size: 24px;
      margin-right: 8px;
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
    .meet-time,
    .meet-date {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      margin-right: 24px;
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
    .meet-date {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
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

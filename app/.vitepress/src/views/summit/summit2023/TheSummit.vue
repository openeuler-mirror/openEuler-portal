<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';

import { useCommon } from '@/stores/common';
import { getUrlParams } from '@/shared/utils';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitGuests from './components/SummitGuests.vue';
import SummitLive from './components/SummitLive.vue';

import useWindowResize from '@/components/hooks/useWindowResize';

import data_zh from './data/data_zh';
import data_en from './data/data_en';

import { getEasyeditorInfo } from '@/api/api-easyeditor';

import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

const { lang } = useData();
const isMobile = computed(() =>
  useWindowResize().value <= 768 ? true : false
);

let summitData: any;

if (lang.value === 'zh') {
  summitData = data_zh;
} else {
  summitData = data_en;
}

const dialogVisible = ref(false);
const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const isLiverShown = ref(0);
const showIndex = ref(0);
// 议程日期切换
function setShowIndex(index: number) {
  showIndex.value = index;
  tabType.value = 0;
}
// 获取议程数据
const agendaData = ref([]);
onMounted(() => {
  const href = `https://www.openeuler.org/${lang.value}/interaction/summit-list/summit2023/`;
  getEasyeditorInfo(href).then((res) => {
    if (res.data && res.data[0]) {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].content = JSON.parse(res.data[i].content);
        agendaData.value = res.data;
      }
    }
  });
});
const getData: any = computed(() => {
  let temp;
  if (showIndex.value === 0) {
    agendaData.value.forEach((item: any) => {
      if (item.name === 'schedule-15') {
        temp = item;
      }
    });
  } else {
    agendaData.value.forEach((item: any) => {
      if (item.name === 'schedule-16') {
        temp = item;
      }
    });
  }
  return temp;
});

// 控制上下午切换
const tabType = ref(0);
const renderData: any = computed(() => {
  if (tabType.value === 1) {
    return getData.value.content.content.slice(1);
  } else if (getData.value) {
    return getData.value.content.content.slice(0, 1);
  }
});
const dateList = [
  { day: 15, month: 'DEC' },
  { day: 16, month: 'DEC' },
];
// 埋点统计投放流量
function collectAdvertisedData() {
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  const { href } = window.location;
  const regex = /[\?&]utm_source=/;
  const containsUtmSource = regex.test(href);
  if (!containsUtmSource) {
    return;
  }
  const paramsArr = getUrlParams(href);
  sensors?.setProfile({
    ...(window as any)['sensorsCustomBuriedData'],
    profileType: 'fromAdvertised',
    origin: href,
    ...paramsArr,
  });
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
      <p v-if="summitData.introduce4">{{ summitData.introduce4 }}</p>
      <ul v-if="summitData.list">
        <li v-for="li in summitData.list">
          {{ li }}
        </li>
      </ul>
      <p v-if="summitData.introduce5">{{ summitData.introduce5 }}</p>
    </div>
    <div class="visa-btn-box">
      <OButton
        v-if="lang === 'en'"
        @click="dialogVisible = true"
        class="visa-btn"
        size="mini"
        type="primary"
        >Visa Letter Request</OButton
      >
    </div>
    <div class="live">
      <h3 class="title-bar">
        {{ lang === 'zh' ? summitData.live.title : summitData.live.titleEn }}
      </h3>
      <div>
        <OTabs v-model="isLiverShown" class="schedule-tabs">
          <el-tab-pane
            v-for="(item, index) in lang === 'zh'
              ? summitData.live.date
              : summitData.live.dateEn"
            :key="index"
            :name="index"
          >
            <template #label>
              <div class="time-tabs">{{ item }}</div>
            </template>
          </el-tab-pane>
        </OTabs>
        <OContainer :level-index="1">
          <ClientOnly>
            <SummitLive
              v-if="isLiverShown === 0"
              :live-data="summitData.live.liveData1"
              class-name="live-btn1"
              class="live-box"
            />
            <SummitLive
              v-if="isLiverShown === 1"
              :live-data="summitData.live.liveData2"
              class-name="live-btn2"
              class="live-box"
            />
          </ClientOnly>
        </OContainer>
      </div>
    </div>
    <div class="agenda">
      <h3>
        {{ summitData.agenda.title }}
      </h3>
      <div class="date">
        <div
          v-for="(item, index) in dateList"
          :key="item.day"
          class="date-item"
          :class="{ active: showIndex === index }"
          @click="setShowIndex(index)"
        >
          <p class="date-day">{{ item.day }}</p>
          <p class="date-month">{{ item.month }}</p>
        </div>
      </div>
      <div class="schedule-box">
        <el-tabs v-model.number="tabType" class="schedule-tabs">
          <el-tab-pane :name="0">
            <template #label>
              <div v-if="lang === 'en'" class="time-tabs">
                {{
                  showIndex === 0
                    ? summitData.agenda.tabType[0]
                    : summitData.agenda.tabType2[0]
                }}
              </div>
              <div v-else class="time-tabs">
                {{ summitData.agenda.tabType[0] }}
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane :name="1">
            <template #label>
              <div v-if="lang === 'en'" class="time-tabs">
                {{
                  showIndex === 0
                    ? summitData.agenda.tabType[1]
                    : summitData.agenda.tabType2[1]
                }}
              </div>
              <div v-else class="time-tabs">
                {{ summitData.agenda.tabType[1] }}
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
        <p v-if="lang === 'en'" class="time-tip">*Time zone: GMT+8</p>
        <template v-for="item in renderData" :key="item.lable">
          <SummitSchedule :agenda-data="item" />
        </template>
        <p class="change-tip">{{ summitData.agenda.changeTip }}</p>
      </div>
    </div>
    <div v-if="lang === 'zh'" class="guest">
      <h3 class="guest-title">{{ summitData.guest.title }}</h3>
      <h4>{{ summitData.guest.guestListOperational.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListOperational.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
      <h4>{{ summitData.guest.guestListMain.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListMain.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
      <h4>{{ summitData.guest.guestListTechnology.title }}</h4>
      <SummitGuests
        :lecturer-list="summitData.guest.guestListTechnology.guestList"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
    </div>
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
  <ClientOnly>
    <ODialog
      v-if="lang === 'en'"
      v-model="dialogVisible"
      :show-close="false"
      class="visa-lette-dialog"
      lock-scroll
      close-on-press-escape
      close-on-click-modal
      destroy-on-close
      :width="isMobile ? '85%' : '74%'"
      center
    >
      <template #header>Visa Letter Request</template>
      <div class="visa-letter-request">
        <ul class="letter-content">
          <li>
            openEuler is an open source platform developed and operated by the
            OpenAtom Foundation. The visa invitation letter will be processed by
            the OpenAtom Foundation.
          </li>
          <li>
            Provision of a visa letter by the OpenAtom Foundation does not
            guarantee visa approval, which is made at the sole discretion of the
            government of the event's host country.
          </li>
          <li>
            Visa letter requests should be made 90 days prior to an event and
            may be submitted no fewer than two weeks prior to the event. The
            OpenAtom Foundation cannot guarantee that letters will be provided
            in response to requests submitted fewer than two weeks prior to an
            event, though we will make every effort to process them.
          </li>
          <li>
            The OpenAtom Foundation processes most visa letter requests in (3)
            business days. Please download and complete the form below as
            accurately as possible. Failure to do so may result in a delay to
            the typical processing time.
          </li>
          <li>
            By completing the form below, you are authorizing the OpenAtom
            Foundation and openEuler to use the details you provided as needed
            to process your invitation request.
          </li>
          <li>
            For questions, please contact <a href="mailto:visa@openeuler.sh"
              >visa@openeuler.sh.</a
            >
          </li>
        </ul>
        <div class="step-1">
          <div class="step-title">Step 1</div>
          <div class="step-content">
            Download the application form by clicking the button below.
          </div>
        </div>
        <div class="step-2">
          <div class="step-title">Step 2</div>
          <div class="step-content">
            Fill out the form and attach it to an email to
            <a href="mailto:visa@openeuler.sh">visa@openeuler.sh.</a>
          </div>
        </div>
        <p class="last-letter-content">
          The OpenAtom Foundation processes most visa letter requests in (3)
          business days and then sends the visa letter to your email.
        </p>
      </div>
      <template #footer>
        <a
          href="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/excel/Visa.xlsx"
        >
          <OButton @click="dialogVisible = true" size="mini" type="primary"
            >Download the Application Form
          </OButton>
        </a>
        <div class="footer-text">
          <p>
            You are responsible for ensuring that any individual whose personal
            data you provide (i) is aware that you have provided
          </p>
          <p>
            such information to us for purposes of registration for this event
            and (ii) agrees to
            <a
              href="/en/other/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              >openEuler’s Privacy Policy.</a
            >
          </p>
        </div>
      </template>
    </ODialog>
  </ClientOnly>
</template>
<style scoped lang="scss">
@mixin mobile {
  @media screen and (max-width: 768px) {
    @content;
  }
}

.o-button.o-button-type-primary {
  font-size: var(--o-font-size-h8);
  color: var(--o-color-white);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
  }
}
.agenda-img {
  margin-top: 40px;
  width: 100%;
  box-shadow: var(--o-shadow-l1);
  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }
}
.visa-letter-request {
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h6);
  font-size: var(--o-font-size-h6);
  word-break: keep-all;
  @include mobile {
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
  }
  .step-1,
  .step-2 {
    margin-top: 16px;
    .step-title {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        height: 2px;
        width: 20px;
        background-color: var(--o-color-brand2);
      }
    }
    .step-content {
      position: relative;
      margin-top: 24px;
      padding: 12px;
      padding-left: 28px;
      line-height: var(--o-line-height-h8);
      font-size: var(--o-font-size-h8);
      background-color: var(--o-color-bg1);
      &::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        left: 16px;
        top: 20px;
        border-radius: 50%;
        background-color: var(--o-color-brand1);
        @media screen and (max-width: 768px) {
          top: 18px;
        }
      }
      @include mobile {
        line-height: var(--o-line-height-tip);
        font-size: var(--o-font-size-tip);
      }
    }
  }
  .letter-content {
    padding-left: 16px;
    list-style-type: disc;
  }
  .last-letter-content {
    margin-top: 24px;
  }
}
.visa-btn-box {
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
}
.visa-btn {
  margin-top: 24px;
  padding-left: 62px;
  padding-right: 62px;
  @media screen and (max-width: 768px) {
    margin-top: 16px;
  }
}
.footer-text {
  margin-top: 24px;
  line-height: var(--o-line-height-text);
  font-size: var(--o-font-size-text);
  @media screen and (max-width: 768px) {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
  }
}
.dark img,
.dark .banner {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
    @media screen and (max-width: 768px) {
      display: none;
    }
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
.introduce {
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h6);
  color: var(--o-color-text1);
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
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
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
  .schedule-box {
    position: relative;
    .time-tip {
      position: absolute;
      top: 24px;
      font-size: 18px;
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        top: 46px;
        font-size: 12px;
      }
    }
    .change-tip {
      margin-top: 24px;
      font-size: 18px;
      color: var(--o-color-text1);
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
      border: 1px solid var(--o-color-border2);
      color: var(--o-color-text1);
      text-align: center;
      background: var(--o-color-bg2);
      font-size: 14px;
      line-height: 38px;
      padding: 0 16px;
      min-width: 172px;
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
.live {
  .schedule-tabs {
    text-align: center;
    margin-top: 24px;
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
    .time-tabs {
      display: inline-block;
      // margin: 0 0 24px;
      cursor: pointer;
      border: 1px solid var(--o-color-border2);
      color: var(--o-color-text1);
      width: 120px;
      text-align: center;
      background: var(--o-color-bg2);
      font-size: var(--o-font-size-text);
      line-height: 38px;
      padding: 0 var(--o-spacing-h5);
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        padding: 0 var(--o-spacing-h6);
      }
    }

    .is-active .time-tabs {
      color: #fff;
      background: var(--o-color-brand1);
      border-color: var(--o-color-brand2);
    }
    .other-tabs {
      margin-bottom: 24px;
      :deep(.el-tabs__nav) {
        float: none;
        display: inline-block;
        @media (max-width: 1100px) {
          line-height: 44px;
        }
      }
      :deep(.el-tabs__header) {
        text-align: center;
        .el-tabs__item {
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }
    }
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
</style>
<style lang="scss">
@media screen and (max-width: 768px) {
  .el-dialog {
    .el-dialog__header {
      padding: 24px 16px;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
    }
    .el-dialog__body {
      padding: 0 16px;
    }
    .el-dialog__footer {
      padding-left: 16px;
      padding-right: 16px;
      @media screen and (max-width: 768px) {
        padding-top: 24px;
        padding-bottom: 24px;
      }
    }
  }
}
</style>

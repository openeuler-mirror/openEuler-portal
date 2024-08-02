<script setup lang="ts">
import { ref, shallowRef, onMounted, computed, onUnmounted, watch } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import _ from 'lodash';
import { getNowFormatDate } from '@/shared/utils';

import AMapLoader from '@amap/amap-jsapi-loader';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';

import type { DetailDateT } from '@/shared/@types/type-salon';
import { getUrlParam, getBetweenDateStr } from '@/shared/utils';

import logo_light from '@/assets/common/header/logo.png';
import logo_dark from '@/assets/common/header/logo_dark.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconTime from '~icons/app/icon-time.svg';

import { getActivityDetail } from '@/api/api-calendar';
import { useCommon } from '@/stores/common';

import useWindowResize from '@/components/hooks/useWindowResize';

const windowWidth = ref(useWindowResize());

const screenWidth = ref(1080);

const isVideoVisible = ref(false);

const map: any = shallowRef(null);
const { lang } = useData();
const i18n = useI18n();

interface flowPathList {
  THEME: string;
  TIME: string;
  SPEAKER: any;
}
const isLatest = computed(() => {
  if (detailObj.value?.date) {
    return (
      new Date(detailObj.value?.date).getTime() >=
      new Date(getNowFormatDate()).getTime()
    );
  } else {
    return true;
  }
});

const detailObj = ref<DetailDateT>();
const flowPathList = ref<any[]>([]);
const tabTitle = ref([
  i18n.value.interaction.MEETUPSLIST.DETAIL_DESC,
  i18n.value.interaction.MEETUPSLIST.DETAIL_FLOW,
  i18n.value.interaction.MEETUPSLIST.DETAIL_MEET,
]);

const anchor = ref(['synopsis', 'agenda', 'meet-message']);
const dayTabIndex = ref(0);
const tabShow = ref(0);
const dayTabShow = ref(0);
const tabIndex = ref(0);
const betweenDate = ref<any>([]);
const commonStore = useCommon();
const activityId = ref('');

const handleScroll = (index: number) => {
  const element = document.getElementById(anchor.value[index]) as HTMLElement;
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});

function getActivitiesData() {
  activityId.value = getUrlParam('id');
  if (getUrlParam('isMini')) {
    try {
      getActivityDetail(activityId.value).then((res: DetailDateT) => {
        //  线上活动不加载地图，不显示tab
        !(res.latitude && res.longitude)
          ? (tabTitle.value = tabTitle.value.splice(0, 2))
          : initMap(res.longitude, res.latitude);

        res[
          'posterImg'
        ] = `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${res.poster}.png`;
        detailObj.value = res;
        const arr: any = [];
        if (res.start && res.end)
          betweenDate.value = getBetweenDateStr(res.start, res.end);
        if (betweenDate.value.length === 0) {
          arr.push([]);
          JSON.parse(res.schedules as string).forEach((item: any) => {
            arr[0].push({
              duration: `${item.start}-${item.end}`,
              title: item.topic,
              speakerList: item.speakerList,
            });
          });
        } else {
          JSON.parse(res.schedules as string).forEach(
            (dayTime: any, index: number) => {
              arr.push([]);
              dayTime.forEach((item: any) => {
                arr[index].push({
                  duration: `${item.start}-${item.end}`,
                  title: item.topic,
                  speakerList: item.speakerList,
                });
              });
            }
          );
        }
        flowPathList.value = arr;
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

function initMap(lng: number, lat: number) {
  AMapLoader.load({
    key: 'c042a36d28964bd1e1e1785849fb335f', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        size: new AMap.Size(30, 35),
        anchor: 'bottom-center',
      });
      map.value = new AMap.Map('container', {
        zoom: 16, //  初始化地图级别
        lang: 'en',
        center: [lng, lat], //  初始化地图中心点位置
      });
      map.value.add(marker);
    })
    .catch((e: any) => {
      throw new Error(e);
    });
}

function clickDayTab(e: any) {
  dayTabIndex.value = e.index;
}

function clickTab(e: any) {
  if (detailObj.value?.live_address && !e.uid) {
    window.open(detailObj.value?.live_address);
    return;
  }
  if (detailObj.value?.videoLink && !e.uid) {
    !detailObj.value.videoLink.endsWith('.mp4')
      ? window.open(detailObj.value.videoLink)
      : (isVideoVisible.value = true);
  } else {
    tabIndex.value = e.index - 0;
    handleScroll(e.index - 0);
  }
}

const scroll = () => {
  if (document.getElementById('tab') && document.getElementById('tab2')) {
    const targetScrollTop =
      screenWidth.value > 768
        ? (
            document.getElementById('tab') as HTMLElement
          ).getBoundingClientRect().top
        : (
            document.getElementById('tab2') as HTMLElement
          ).getBoundingClientRect().top;
    const synopsisScrollTop = (
      document.getElementById('synopsis') as HTMLElement
    ).getBoundingClientRect().top;
    if (targetScrollTop < 0) {
      (document.getElementById('tab') as HTMLElement).style.position = 'fixed';
      (document.getElementById('tab') as HTMLElement).style.maxWidth = '1416px';
      (document.getElementById('tab2') as HTMLElement).style.position = 'fixed';
    }
    if (synopsisScrollTop >= 0) {
      (document.getElementById('tab') as HTMLElement).style.position = 'static';
      (document.getElementById('tab') as HTMLElement).style.width = '100%';
      (document.getElementById('tab2') as HTMLElement).style.position =
        'static';
    }
  }
};

onMounted(() => {
  getActivitiesData();
  const body = window;
  body?.addEventListener('scroll', scroll);
});

onUnmounted(() => {
  const body = window;
  body?.removeEventListener('scroll', scroll);
});

watch(windowWidth, () => {
  screenWidth.value = windowWidth.value;
});
</script>
<template>
  <div v-if="detailObj">
    <div class="top-img-mobile">
      <img :src="detailObj.posterImg" alt="" />
      <h2 class="title" :class="{ 'poster-3': detailObj.poster === 3 }">
        {{ detailObj.title }}
      </h2>
    </div>
    <div id="tab2" class="tab-box-mobile">
      <OTabs v-model="tabShow" @tab-click="clickTab">
        <OTabPane
          v-for="(item, index) in tabTitle"
          :key="index"
          :label="item"
          :name="index"
          @click="handleScroll(index)"
        ></OTabPane>
      </OTabs>
    </div>
    <AppContent :pc-top="40" :mobile-top="12">
      <div class="calendar-detail">
        <BreadCrumbs
          :bread1="i18n.interaction.MEETUPSLIST.MEETUPS"
          :bread2="detailObj?.title"
          :link1="'/' + lang + '/interaction/event-list/latest/'"
          class="bread"
        />

        <div class="top-content">
          <div
            class="top-left"
            :style="{ backgroundImage: `url(${detailObj?.posterImg})` }"
          >
            <h2
              v-if="getUrlParam('isMini')"
              class="title"
              :class="{ 'poster-3': detailObj.poster === 3 }"
            >
              {{ detailObj.title }}
            </h2>
          </div>
          <div class="top-right">
            <div class="top-right-head">
              <h2 class="title">{{ detailObj?.title }}</h2>
              <p class="category">
                {{
                  detailObj?.enterprise || detailObj?.MEETINGS_INFO?.ADDRESS_UP
                }}
              </p>
              <p class="time">
                {{ detailObj.date }}
              </p>
            </div>
            <OButton
              type="primary"
              animation
              target="_blank"
              rel="noopener noreferrer"
              class="btn-detail"
              @click="clickTab({ index: 1 })"
            >
              {{
                isLatest
                  ? i18n.interaction.MEETUPSLIST.LEARN_MORE
                  : i18n.interaction.MEETUPSLIST.EVENT_REVIEW
              }}
              <template #suffixIcon>
                <IconArrowRight class="icon"></IconArrowRight>
              </template>
            </OButton>
          </div>
        </div>

        <div id="tab" class="tab-box">
          <OTabs v-model="tabShow" @tab-click="clickTab">
            <OTabPane
              v-for="(item, index) in tabTitle"
              :key="index"
              :label="item"
              :name="index"
            ></OTabPane>
          </OTabs>
        </div>
        <div class="synopsis detail-card">
          <h1 id="synopsis" class="detail-title">{{ tabTitle[0] }}</h1>
          <template v-if="Array.isArray(detailObj?.synopsis)">
            <p
              v-for="item in detailObj?.synopsis"
              :key="item"
              class="synopsis-body"
            >
              {{ item }}
            </p>
          </template>
          <p v-else class="synopsis-body">{{ detailObj?.synopsis }}</p>
        </div>
        <div v-if="tabTitle.length >= 2" class="agenda detail-card">
          <h1 id="agenda" class="detail-title">{{ tabTitle[1] }}</h1>
          <div v-if="betweenDate.length" class="tab-box-time">
            <OTabs v-model="dayTabShow" @tab-click="clickDayTab">
              <OTabPane
                v-for="(item, index) in betweenDate"
                :key="index"
                :label="item"
                :name="index"
              ></OTabPane>
            </OTabs>
          </div>
          <div class="table">
            <OTable :data="flowPathList[dayTabShow]" :show-header="false">
              <el-table-column prop="TIME" width="220">
                <template #default="scope">
                  <div class="time-box">
                    <icon-time class="icon-time"></icon-time>
                    <span class="agenda-time">{{ scope.row.duration }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="title"> </el-table-column>
              <el-table-column width="500">
                <template #default="scope">
                  <div
                    v-for="item in scope.row.speakerList"
                    :key="item.name"
                    class="speark-item"
                  >
                    <div class="name">{{ item.name }}</div>
                    <div class="position">{{ item.title }}</div>
                  </div>
                </template>
              </el-table-column>
            </OTable>
          </div>
          <div class="time-line">
            <div
              v-for="(item, index) in flowPathList[dayTabShow]"
              :key="item.title"
              class="time-line-content"
            >
              <div class="time-line-left">
                <div class="ponit"></div>
                <div
                  v-if="index !== flowPathList[dayTabShow].length - 1"
                  class="line"
                ></div>
              </div>
              <div class="time-line-right">
                <div class="time-line-duration">
                  {{ item.duration }}
                </div>
                <div class="time-line-title">{{ item.title }}</div>
                <div class="time-line-name">
                  <div
                    v-for="(item2, index2) in item.speakerList"
                    :key="item2.name"
                  >
                    {{
                      item2.name +
                      (index2 === item.speakerList.length - 1 ? '' : ',')
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="detailObj?.activity_type !== 2 && getUrlParam('isMini')"
          class="meet-message detail-card"
        >
          <h1 id="meet-message" class="detail-title">{{ tabTitle[2] }}</h1>
          <div :class="['meet-address']">
            <div class="address-message">
              <img :src="logo" />
            </div>
            <div class="address-text">
              <p>{{ i18n.interaction.MEETUPSLIST.ADDRESS }}</p>
              <p>
                {{ detailObj?.address }}
              </p>
              <p v-if="detailObj?.detail_address?.includes('http')">
                {{ i18n.interaction.MEETUPSLIST.LIVE_ADDRESS }}
              </p>
              <p v-else>
                {{ i18n.interaction.MEETUPSLIST.DETAIL_ADDRESS }}
              </p>
              <p>
                {{ detailObj?.detail_address }}
              </p>
            </div>
            <div class="scan-qrcode">
              <a :href="detailObj.register_url">{{
                i18n.interaction.MEETUPSLIST.DETAIL_QRCODE_TEXT
              }}</a>
              <OIcon>
                <IconArrowRight class="icon"></IconArrowRight>
              </OIcon>
            </div>
          </div>
          <div class="map">
            <div id="container"></div>
          </div>
        </div>
      </div>
      <div class="video-box">
        <ODialog
          v-model="isVideoVisible"
          :show-close="false"
          lock-scroll
          close-on-press-escape
          close-on-click-modal
          destroy-on-close
          width="800px"
        >
          <div class="video-center">
            <video class="exhibition-video" width="100%" controls autoplay>
              <source :src="detailObj?.videoLink" />
            </video>
          </div>
        </ODialog>
      </div>
    </AppContent>
  </div>
</template>
<style lang="scss" scoped>
.video-box {
  :deep(.el-dialog__header) {
    display: none;
  }
  :deep(.el-dialog__body) {
    padding: 0;
  }
  .exhibition-video {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  :deep(.el-dialog) {
    @media screen and (max-width: 875px) {
      width: 90% !important;
    }
  }
}
.time-line {
  display: none;
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h7);
    display: flex;
    flex-flow: column;
  }
  .time-line-left {
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: center;
    margin-right: var(--o-spacing-h8);
  }
  .ponit {
    background-color: var(--o-color-brand1);
    width: 9px;
    height: 9px;
    border-radius: 9px;
    margin-top: var(--o-spacing-h10);
  }

  .line {
    flex: 1;
    width: 1px;
    border-left: 2px var(--o-color-brand1) dashed;
  }

  .time-line-content {
    display: flex;
    flex-flow: row;
  }

  .time-line-right {
    padding-bottom: var(--o-spacing-h5);
  }

  .time-line-duration {
    font-size: 10px;
    color: var(--o-color-brand1);
    line-height: 16px;
    margin-bottom: var(--o-spacing-h8);
  }

  .time-line-title {
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-tip);
    margin-bottom: var(--o-spacing-h8);
  }

  .time-line-name {
    font-size: 10px;
    color: var(--o-color-text4);
    line-height: 16px;
    display: flex;
    flex-flow: row;
  }
}

.tab-box-mobile {
  background-color: var(--o-color-bg2);
  display: none;
  z-index: 2;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  position: static;
  top: 48px;
  @media (max-width: 768px) {
    display: flex;
  }

  :deep(.el-tabs__header) {
    margin: 0px;
  }

  :deep(.el-tabs) {
    --el-tabs-header-height: var(--o-line-height-h3);
    @media (max-width: 768px) {
      --el-tabs-header-height: 34px;
    }
  }

  :deep(.el-tabs__item) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    padding-bottom: var(--o-spacing-h6);
    padding-top: var(--o-spacing-h6);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      padding-bottom: var(--o-spacing-h9);
      padding-top: var(--o-spacing-h9);
    }
  }

  :deep(.is-active) {
    color: var(--o-color-brand1);
  }
}

.top-img-mobile {
  display: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 768px) {
    display: flex;
  }
  img {
    width: 100%;
  }
  h2 {
    position: absolute;
    padding: 0 var(--o-spacing-h2);
    font-size: var(--o-font-size-h6);
    text-align: center;
    color: #ffffff;
  }
}
.bread {
  display: flex;
  padding: 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.calendar-detail {
  background-color: var(--o-color-bg1);
  .top-content {
    display: flex;
    margin: var(--o-spacing-h2) 0;
    padding: 80px;
    background-color: var(--o-color-bg2);
    @media screen and (max-width: 1100px) {
      padding: var(--o-spacing-h1);
      margin-top: var(--o-spacing-h6);
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
    .top-left {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      margin-right: var(--o-spacing-h2);
      text-align: center;
      width: 415px;
      height: 210px;
      background-size: cover;
      background-repeat: no-repeat;
      h2 {
        padding: 0 var(--o-spacing-h2);
        color: #ffffff;
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        font-weight: normal;
      }
      .poster-3 {
        color: #000000;
      }
    }
    .top-right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;
      .top-right-head {
        width: 100%;
      }
      .title {
        margin-bottom: var(--o-spacing-h4);
        font-weight: 400;
        font-size: var(--o-font-size-h3);
        line-height: var(--o-line-height-h3);
        color: var(--o-color-text1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
      }

      .time {
        margin-top: var(--o-spacing-h8);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        color: var(--o-color-text1);
      }

      .category {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        color: var(--o-color-text1);
      }

      .btn-detail {
        cursor: pointer;
        display: flex;
        padding: var(--o-spacing-h10) var(--o-spacing-h5);
        justify-content: center;
        align-items: center;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        width: fit-content;
        color: #ffffff;
        .icon {
          margin-left: var(--o-spacing-h8);
          width: 12px;
          height: 12px;
          color: #ffffff;
        }
      }
    }
    .poster-3 {
      color: #000000;
    }
  }

  .detail-card {
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h2) 80px;
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
      padding: var(--o-spacing-h5);
    }
  }
  .detail-title {
    &::before {
      content: '';
      display: block;
      height: 200px;
      margin-top: -200px;
      visibility: hidden;
      @media screen and (max-width: 768px) {
        height: 120px;
        margin-top: -120px;
      }
    }
    margin-bottom: var(--o-spacing-h4);
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    font-weight: 400;
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .synopsis {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text4);
    margin-bottom: var(--o-spacing-h2);

    .synopsis-body {
      word-break: break-all;
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h8);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
  }
  .tab-box {
    background-color: var(--o-color-bg2);
    display: flex;
    top: 80px;
    width: 100%;
    z-index: 2;
    position: static;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 1px solid var(--o-color-division1);
    @media (max-width: 1100px) {
      top: 48px;
    }
    @media (max-width: 768px) {
      display: none;
    }
    :deep(.el-tabs__header) {
      margin: 0px;
    }

    :deep(.el-tabs) {
      --el-tabs-header-height: var(--o-line-height-h3);
      @media (max-width: 768px) {
        --el-tabs-header-height: 34px;
      }
    }

    :deep(.el-tabs__item) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      padding-bottom: var(--o-spacing-h6);
      padding-top: var(--o-spacing-h6);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        padding-bottom: var(--o-spacing-h10);
        padding-top: var(--o-spacing-h10);
      }
    }

    :deep(.is-active) {
      color: var(--o-color-brand1);
    }
  }
  .agenda {
    margin-bottom: var(--o-spacing-h2);
    .tab-box-time {
      background-color: var(--o-color-bg2);
      display: flex;
      align-items: flex-end;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 768px) {
        margin: var(--o-spacing-h5) 0;
      }
      :deep(.el-tabs__header) {
        margin: 0px;
      }

      :deep(.el-tabs) {
        --el-tabs-header-height: var(--o-line-height-h3);
        @media (max-width: 768px) {
          --el-tabs-header-height: 34px;
        }
      }

      :deep(.el-tabs__item) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        padding-bottom: var(--o-spacing-h6);
        padding-top: var(--o-spacing-h6);
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          padding-bottom: var(--o-spacing-h9);
          padding-top: var(--o-spacing-h9);
        }
      }

      :deep(.is-active) {
        color: var(--o-color-brand1);
      }
    }
    .table {
      @media (max-width: 768px) {
        display: none;
      }

      :deep(.o-table) {
        box-shadow: none;
      }

      :deep(.el-table) .cell {
        padding: 0px;
      }

      :deep(.el-table__cell) {
        border-bottom: 0px;
        padding: var(--o-spacing-h4) 0;
      }

      :deep(.el-table__inner-wrapper::before) {
        height: 0px;
      }

      :deep(.el-table_1_column_2) .cell {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: flex-start;
        color: var(--o-color-text1);
        font-weight: normal;
      }

      :deep(tr) {
        height: 76px;
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        &:hover {
          background-color: var(--o-color-bg2);
        }
        --el-table-row-hover-bg-color: var(--o-color-bg2);
        &:last-child {
          .el-table__cell {
            border-bottom: none;
          }
        }
        .el-table__cell {
          border-bottom: 1px solid var(--o-color-division1);
        }

        .speark-item {
          display: flex;
          .name {
            display: flex;
            align-items: center;
            padding: 0 var(--o-spacing-h6);
            color: var(--o-color-text1);
            min-width: 100px;
          }
          .position {
            font-size: var(--o-font-size-h8);
            text-align: left;
          }
        }
      }
      .icon-time {
        margin-right: var(--o-spacing-h8);
        width: 24px;
        height: 24px;
      }
      .time-box {
        display: flex;
        align-items: center;
      }
    }
  }
  .meet-message {
    .meet-address {
      position: relative;
      padding: var(--o-spacing-h2) 80px;
      margin: 0 auto;
      max-width: 920px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l1);
      border-bottom: 3px solid var(--o-color-brand1);
      z-index: 1;
      @media (max-width: 1080px) {
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-bottom: none;
        box-shadow: none;
        padding: 0px;
        margin: 0;
      }
      .address-message {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        img {
          height: 46px;
          @media (max-width: 768px) {
            margin-top: var(--o-spacing-h4);
            height: 32px;
          }
        }
      }
      .address-text {
        margin-left: 80px;
        position: relative;
        @media (max-width: 1080px) {
          margin-top: var(--o-spacing-h4);
          margin-left: 0px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }
        p {
          font-size: var(--o-font-size-h8);
          max-width: 350px;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h8);
          margin-bottom: var(--o-spacing-h4);
          @media (max-width: 1080px) {
            margin-bottom: var(--o-spacing-h5);
            text-align: center;
            max-width: 100%;
          }
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
          &:nth-of-type(odd) {
            color: var(--o-color-brand1);
            font-size: var(--o-font-size-h6);
            line-height: var(--o-line-height-h6);
            margin-bottom: var(--o-spacing-h5);
            @media (max-width: 1080px) {
              margin-bottom: var(--o-spacing-h8);
            }
            @media (max-width: 768px) {
              font-size: var(--o-font-size-h8);
              line-height: var(--o-line-height-h8);
            }
          }
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .scan-qrcode {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        a {
          width: 100px;
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;
          font-size: var(--o-font-size-h6);
          color: var(--o-color-brand1);
          line-height: var(--o-line-height-h6);
          @media (max-width: 1080px) {
            margin-top: var(--o-spacing-h5);
          }
          @media (max-width: 768px) {
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
          }
        }
        .o-icon {
          color: var(--o-color-brand1);
        }
      }
    }
    .map {
      width: 100%;
      margin: -50px auto 0 auto;
      height: 100%;
      @media (max-width: 768px) {
        display: none;
      }
      #container {
        width: 100%;
        height: 500px;
      }
    }
  }
}
</style>

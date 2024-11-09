<script setup lang="ts">
import { ref, nextTick, onMounted, PropType, watch } from 'vue';

import { isValidKey, isBrowser } from '@/shared/utils';
import { TableDataT, DayDataT } from '@/shared/@types/type-calendar';
import { useCommon } from '@/stores/common';

import { getDaysData } from '@/api/api-calendar';

import {
  OIcon,
  OCollapse,
  OCollapseItem,
  OTab,
  OLink,
  OTabPane,
  ODivider,
  OScroller,
} from '@opensig/opendesign';

import summitData from '~@/data/summit';

import IconLeft from '~icons/app/icon-chevron-left.svg';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconDate from '~icons/home/icon-date.svg';
import IconAll from '~icons/home/icon-all.svg';
import IconEvent from '~icons/home/icon-event.svg';
import IconSummit from '~icons/home/icon-summit.svg';
import IconMeet from '~icons/home/icon-meet.svg';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';
import cubeOne from '~@/assets/category/home/calendar/cube-1.png';
import cubeTow from '~@/assets/category/home/calendar/cube-2.png';
import cubeOneDark from '~@/assets/category/home/calendar/cube-1_dark.png';
import cubeTowDark from '~@/assets/category/home/calendar/cube-2_dark.png';

import AppSection from '~@/components/AppSection.vue';

const props = defineProps({
  tableData: {
    type: Array as PropType<string[]>,
    default: () => {
      return {};
    },
  },
});

const commonStore = useCommon();

const renderData = ref<TableDataT>({
  date: '',
  timeData: [],
});
const currentDay = ref({
  raw: '',
  resolve: '',
});
const activeName = ref<number[]>([]);
const i18n = {
  SIG_GROUP: 'SIG组:',
  NEW_DATE: '最新日程：',
  EMPTY_TEXT: '当日没有活动，敬请期待',
  LEARN_MORE: '查看详情',
};
// 日历展示时间限制
const limitTime = '2021 年 1 月';
const detailItem = [
  { text: '会议详情', key: 'detail' },
  { text: '发起人', key: 'creator' },
  { text: '会议日期', key: 'date' },
  { text: '会议时间', key: 'duration_time' },
  { text: '会议平台', key: 'platform' },
  { text: '会议ID', key: 'meeting_id' },
  { text: '会议链接', key: 'join_url' },
  { text: 'Etherpad链接', key: 'etherpad' },
  { text: '活动介绍', key: 'synopsis' },
  { text: '起始日期', key: 'start_date' },
  { text: '结束日期', key: 'end_date' },
  { text: '线上链接', key: 'online_url' },
  { text: '报名链接', key: 'register_url' },
  { text: '活动地点', key: 'address' },
  { text: '回放链接', key: 'replay_url' },
  { text: '回放链接', key: 'video_url' },
];
const activityType = ['线下', '线上', '线上 + 线下'];
const titleList = [
  {
    label: '全部',
    value: 'all',
    icon: IconAll,
  },
  {
    label: '会议',
    value: 'meetings',
    icon: IconMeet,
  },
  {
    label: '活动',
    value: 'activity',
    icon: IconEvent,
  },
  {
    label: '峰会',
    value: 'summit',
    icon: IconSummit,
  },
];
const tabType = ref(titleList[0].value);
const calendar = ref();
const calendarHeight = ref<string>('407px');
const isLimit = ref(false);

// 活动会议筛选
function selectTab() {
  nextTick(() => {
    paramGetDaysData({
      date: currentDay.value.raw,
      type: tabType.value,
    });
  });
}

function setMeetingDay(day: string, event: Event) {
  if (new Date(day.replace(/-/g, '/')).getTime() / 1000 < 1610380800) {
    event.stopPropagation();
    return;
  }
  if (day === currentDay.value.raw) {
    return false;
  }
  if (props.tableData?.includes(day) || getSummitHighlight(day)) {
    activeName.value = [];
    paramGetDaysData({
      date: day,
      type: tabType.value,
    });
  } else {
    renderData.value.timeData = [];
  }
  currentDay.value.raw = day;
  currentDay.value.resolve = resolveDate(day);
}

function paramGetDaysData(params: { date: string; type: string }) {
  getDaysData(params).then((res) => {
    renderData.value = res.data;
    if (
      (params.type === 'all' || params.type === 'summit') &&
      getSummitHighlight(params.date)
    ) {
      renderData.value.timeData.push(getSummitHighlight(params.date));
    }
    // 当天只有一个日程，直接展开，多个日程，全部折叠
    if (renderData.value.timeData.length === 1) {
      activeName.value = [0];
    } else {
      // 会议时间排序
      activeName.value = [];
      renderData.value.timeData.sort((a: DayDataT, b: DayDataT) => {
        return (
          parseInt(a.startTime?.replace(':', '')) -
          parseInt(b.startTime?.replace(':', ''))
        );
      });
      renderData.value.timeData.map((item2) => {
        if (item2?.etherpad) {
          item2['duration_time'] = `${item2.startTime}-${item2.endTime}`;
        }
        if (item2?.activity_type && !item2.dates) {
          item2.activity_type = activityType[Number(item2.activity_type) - 1];
        }
      });
    }
  });
}

const selectDate = (val: string, date: string) => {
  if (date === limitTime && val === 'prev-month') {
    isLimit.value = true;
    return;
  }
  isLimit.value = false;
  calendar.value.selectDate(val);
};

const goDetail = (index: number) => {
  window.open(
    `/zh/interaction/event-list/detail/?id=${renderData.value.timeData[index].id}&isMini=1`
  );
};

const transformKey = (key: string) => {
  switch (key) {
    case 'welink':
      return 'WeLink';
    case 'zoom':
      return 'Zoom';
    case 'tencent':
      return '腾讯会议';
    default:
      return key;
  }
};
const removeLeadingZero = (str: string) => {
  // 使用正则表达式匹配以 0 开头的字符串，然后去除开头的 0
  return str.replace(/^0+(?=\d)/, '');
};

const watchChange = (element: HTMLElement) => {
  const observe = new MutationObserver(function () {
    calendarHeight.value = `${element.offsetHeight - 2}px`;
  });
  observe.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
};
const resolveDate = (date: string) => {
  return date.replaceAll('-', '/');
};
const getSummitHighlight = (date: string) => {
  return summitData.find((item) => {
    return item.dates?.includes(date);
  });
};
onMounted(() => {
  // 设置右侧 日程列表高度
  const tbody = document.querySelector(
    '.calendar-body .el-calendar__body'
  ) as HTMLElement;
  if (tbody) {
    watchChange(tbody);
    calendarHeight.value = `${tbody.offsetHeight - 2}px`;
  }
});
const watchData = watch(
  () => props.tableData.length,
  () => {
    if (isBrowser()) {
      nextTick(() => {
        const activeBoxs = document.querySelector(
          '.is-today .out-box'
        ) as HTMLElement;
        if (activeBoxs) {
          activeBoxs.click();
          watchData();
        }
      });
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="home-calendar">
    <h3>openEuler开发者日历</h3>
    <div class="calendar-body">
      <el-calendar ref="calendar" class="calender">
        <template #header="{ date }">
          <div class="left-title">
            <div class="current-date">
              <OIcon>
                <IconDate></IconDate>
              </OIcon>
              <span class="date">
                {{ removeLeadingZero(currentDay.raw.split('-').at(-1) || '') }}
              </span>
            </div>
            <OIcon @click="selectDate('prev-month', date)">
              <IconLeft :class="{ disable: isLimit }"></IconLeft>
            </OIcon>
            <span class="month-date">{{ date }}</span>
            <OIcon @click="selectDate('next-month', date)">
              <IconRight></IconRight>
            </OIcon>
          </div>
          <div class="right-title">
            {{ i18n.NEW_DATE }}
            <span>{{ currentDay.resolve }}</span>
          </div>
        </template>
        <template #dateCell="{ data }">
          <div
            class="out-box"
            :class="{ 'has-calender': tableData.includes(data.day) }"
            @click="setMeetingDay(data.day, $event)"
          >
            <div class="day-box">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                class="date-calender"
              >
                {{ removeLeadingZero(data.day.split('-').at(-1) || '') }}
              </p>
              <div class="icon-box">
                <OIcon
                  class="meeting"
                  v-if="
                    (tabType === 'all' || tabType === 'meetings') &&
                    tableData.includes(data.day)
                  "
                >
                  <IconMeet></IconMeet>
                </OIcon>
                <OIcon
                  class="summit"
                  v-if="
                    (tabType === 'all' || tabType === 'summit') &&
                    getSummitHighlight(data.day)
                  "
                >
                  <IconSummit></IconSummit>
                </OIcon>
              </div>
            </div>
          </div>
        </template>
      </el-calendar>
      <div class="detail-list">
        <div class="current-day">
          {{ i18n.NEW_DATE }}
          <span>{{ currentDay.resolve }}</span>
        </div>
        <div class="right-title">
          <div class="title-list">
            <OTab v-model="tabType" @change="selectTab" :line="false">
              <OTabPane
                v-for="item in titleList"
                :key="item.value"
                :value="item.value"
              >
                <template #nav>
                  <OIcon>
                    <component :is="item.icon"></component>
                  </OIcon>
                  {{ item.label }}
                </template>
              </OTabPane>
            </OTab>
          </div>
        </div>

        <div>
          <OScroller class="meeting-list" show-type="hover" size="small">
            <OCollapse
              v-if="renderData.timeData.length"
              v-model="activeName"
              accordion
              :style="{ '--collapse-padding': '0' }"
            >
              <OCollapseItem
                v-for="(item, index) in renderData.timeData"
                :key="index"
                :value="index"
              >
                <template #title>
                  <div class="meet-title" :title="item.name || item.title">
                    <OIcon :class="item.type || 'meeting'">
                      <IconSummit v-if="item.type === 'summit'"></IconSummit>
                      <IconMeet v-else></IconMeet>
                    </OIcon>
                    <div class="text">
                      {{ item.name || item.title }}
                    </div>
                  </div>
                  <div class="meet-info">
                    <span class="start-time"
                      ><span v-if="!item.start_date"
                        >{{ item.startTime }} - {{ item.endTime }}</span
                      >
                      <span v-else
                        >{{ resolveDate(item.start_date) }}-{{
                          resolveDate(item.end_date || '')
                        }}</span
                      ></span
                    >
                    <ODivider direction="v" />
                    <div v-if="item.group_name">
                      {{ i18n.SIG_GROUP }} {{ item.group_name }}
                    </div>
                    <div v-if="item.activity_type">
                      {{ item.activity_type }}
                    </div>
                  </div>
                  <OLink v-if="item.type" :href="item.url" target="_blank">
                    {{ i18n.LEARN_MORE }}
                    <template #suffix>
                      <OIcon><IconChevronRight /> </OIcon>
                    </template>
                  </OLink>
                </template>
                <div class="calendar-info">
                  <template v-for="keys in detailItem" :key="keys.key">
                    <div
                      v-if="isValidKey(keys.key, item) && item[keys.key]"
                      class="info-item"
                    >
                      <div class="item-title">{{ keys.text }}:</div>
                      <a
                        v-if="
                            typeof item[keys.key] === 'string' &&
                            (item[keys.key] as string).startsWith('http')
                          "
                        :href="item[keys.key]"
                        target="_blank"
                        >{{ item[keys.key] }}</a
                      >
                      <p v-else>
                        {{
                          keys.key === 'platform'
                            ? transformKey(item[keys.key])
                            : item[keys.key]
                        }}
                      </p>
                    </div>
                  </template>
                </div>
              </OCollapseItem>
            </OCollapse>
            <div v-else class="empty">
              <img
                v-if="commonStore.theme === 'light'"
                :src="notFoundImg_light"
                alt=""
              />
              <img v-else :src="notFoundImg_dark" alt="" />
              <p>{{ i18n.EMPTY_TEXT }}</p>
            </div>
          </OScroller>
        </div>
      </div>
    </div>
    <img
      class="cube-1"
      :src="commonStore.theme === 'light' ? cubeOne : cubeOneDark"
      alt=""
    />
    <img
      class="cube-2"
      :src="commonStore.theme === 'light' ? cubeTow : cubeTowDark"
    />
  </div>
</template>
<style lang="scss" scoped>
.meeting {
  background-color: #007af0;
  z-index: 3;
}
.summit {
  background-color: #3422ff;
  z-index: 2;
}
.event {
  background-color: #ffa122;
  z-index: 1;
}
.o-link {
  --link-icon-size: 16px;
}
.home-calendar {
  position: relative;
  width: 100%;
  z-index: 1;
  .calendar-body {
    display: flex;
    margin-top: 40px;
    border-radius: var(--o-radius-xs);
    background-color: var(--o-color-fill2);
    overflow: hidden;
    @include respond-to('<=pad_v') {
      margin-top: 12px;
      background-color: transparent;
      flex-direction: column;
    }
    :deep(.calender) {
      width: 56%;
      --el-calendar-borde: none;
      --el-calendar-selected-bg-color: none;
      @include respond-to('<=pad_v') {
        width: 100%;
        flex-direction: column;
        background-color: var(--o-color-fill2);
        border-radius: var(--o-radius-xs);
      }
      .el-calendar__header {
        height: 60px;
        padding: 14px 24px;
        border-bottom: 1px solid var(--o-color-control4);
        @include respond-to('<=pad_v') {
          justify-content: center;
          padding: 16px 16px 12px;
          height: auto;
          border-bottom: none;
        }
        td {
          border: none;
        }
        .left-title {
          display: flex;
          align-items: center;
          @include text2;
          .o-icon {
            cursor: pointer;
            font-size: 24px;
          }
          .month-date {
            font-weight: 500;
            margin: 0 4px;
          }
          .current-date {
            display: flex;
            align-items: center;
            border-radius: var(--o-radius-xs);
            padding: 1px 16px;
            border: 1px solid var(--o-color-control4);
            @include h4;
            margin-right: 24px;
            @include respond-to('pad') {
              margin-right: 8px;
            }
            @include respond-to('<=pad_v') {
              display: none;
            }
          }
          .date {
            color: var(--o-color-primary1);
          }
          .o-icon {
            font-size: 24px;
            margin-right: 8px;
          }
        }
        .right-title {
          display: flex;
          align-items: center;
          @include text2;
          color: var(--o-color-info2);
          @include respond-to('<=pad_v') {
            display: none;
          }
        }
      }
      .el-calendar__body {
        padding: 12px 24px 32px;
        border-right: 1px solid var(--o-color-control4);
        td:first-child {
          .el-calendar-day {
            margin-left: 0 !important;
          }
        }
        tr:last-child {
          .el-calendar-day {
            margin-bottom: 0 !important;
          }
        }
        @include respond-to('<=pad_v') {
          border: none;
          padding: 0 16px 16px;
          thead {
            background-color: var(--o-color-control4-light);
            overflow: hidden;
            th {
              padding: 9px 0;
            }
            th:first-child {
              border-top-left-radius: var(--o-radius-xs);
              border-bottom-left-radius: var(--o-radius-xs);
            }
            th:last-child {
              border-top-right-radius: var(--o-radius-xs);
              border-bottom-right-radius: var(--o-radius-xs);
            }
          }
          tr:last-child {
            .out-box {
              margin-bottom: 0 !important;
            }
          }
        }
      }
      td {
        border: none;
      }
      .el-calendar-day {
        padding: 0;
        margin-left: 8px;
        margin-bottom: 8px;
        max-width: 100px;
        height: 64px;
        color: var(--o-color-info1);
        @include respond-to('<=pad_v') {
          display: flex;
          justify-content: center;
          padding: 0;
          height: fit-content;
        }

        .out-box {
          position: relative;
          border-radius: var(--o-radius-xs);
          padding: 8px 12px;
          width: 100%;
          height: 100%;
          background-color: var(--o-color-control2-light);
          border: 1px solid transparent;
          @include tip1;
          @include hover {
            background-color: var(--o-color-control3-light);
            @include respond-to('<=pad_v') {
              @include hover {
                background-color: inherit;
                border: 1px solid transparent;
              }
            }
          }
          .icon-box {
            margin-top: 4px;
            color: var(--o-color-white);
            height: 20px;
            .o-icon {
              position: relative;
              border-radius: 50%;
              padding: 1px;
              margin-left: -4px;
              @include respond-to('<=pad_v') {
                margin-left: -2px;
              }
              &:first-child {
                margin: 0;
              }
            }
          }
          @include respond-to('<=pad_v') {
            background-color: transparent;
            padding: 0;
            margin: 6px 8px;
            text-align: center;
            width: 24px;
            height: 24px;
            .day-box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              line-height: 22px;
            }
            .icon-box {
              display: flex;
              justify-content: center;
              margin-top: 0;
              position: absolute;
              left: 50%;
              bottom: -2px;
              height: 6px;
              transform: translate(-50%, 100%);
            }
            .o-icon {
              width: 6px;
              height: 6px;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .is-selected {
        .out-box {
          background-color: var(--o-color-control3-light);
          border: 1px solid var(--o-color-primary1);
          @include respond-to('<=pad_v') {
            background-color: transparent;
            border: 1px solid transparent;
            .date-calender {
              position: relative;
              color: var(--o-color-white);
              z-index: 1;
              &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 24px;
                width: 40px;
                background-color: var(--o-color-primary1);
                border-radius: var(--o-radius-l);
                z-index: -1;
              }
            }
          }
        }
      }
      .is-today {
        .date-calender {
          $size: 24px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          z-index: 1;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: $size;
            height: $size;
            background-color: var(--o-color-control3-light);
            border-radius: 50%;
            z-index: -1;
          }
          @include respond-to('<=pad_v') {
            height: auto;
            width: auto;
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              height: 24px;
              width: 40px;
              background-color: var(--o-color-control1-light);
              border-radius: var(--o-radius-l);
              z-index: -1;
            }
          }
        }
      }
    }
    .detail-list {
      width: 44%;
      @include respond-to('<=pad_v') {
        margin-top: 12px;
        background-color: var(--o-color-fill2);
        width: 100%;
        border-radius: var(--o-radius-xs);
      }
      @include respond-to('>pad_v') {
        .current-day {
          display: none;
        }
      }
      @include respond-to('<=pad_v') {
        .current-day {
          @include text2;
          display: flex;
          margin: 16px 16px 12px;
          padding: 7px 12px;
          justify-content: center;
          border-radius: var(--o-radius-s);
          background-color: var(--o-color-control4-light);
        }
      }
      .o-tab {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 60px;
        border-bottom: 1px solid var(--o-color-control4);
        margin-bottom: 0;
        @include respond-to('<=pad_v') {
          height: auto;
          .o-icon {
            display: none;
          }
        }
      }
      $icon-size: 24px;
      @include respond-to('<=pad_v') {
        $icon-size: 20px;
      }
      .meet-title {
        display: flex;
        align-items: center;
        color: var(--o-color-info1);
        @include text2;
        .o-icon {
          flex-shrink: 0;
          padding: 1px;
          border-radius: 50%;
          overflow: hidden;
          color: var(--o-color-white);
          margin-right: 12px;
          width: $icon-size;
          height: $icon-size;
        }
        .text {
          @include text-truncate(1);
          display: block;
          width: 100%;
        }
      }
      .meet-info {
        margin-left: calc($icon-size + 12px);
        margin-top: 8px;
        display: flex;
        align-items: center;
        @include tip1;
        color: var(--o-color-info3);
        text-decoration: none;
        .o-divider {
          @include tip1;
        }
      }
      .o-link {
        font-size: var(--o-font_size-tip1);
        line-height: var(--o-line_height-tip1);
        margin-left: calc($icon-size + 12px);
      }
    }
    .meeting-list {
      height: v-bind('calendarHeight');
      // @include scrollbar;
      // overflow: auto;
      @include respond-to('<=pad_v') {
        height: auto;
      }
      .empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 32px;
        img {
          max-width: 165px;
        }
        p {
          @include text1;
          color: var(--o-color-info3);
          margin-top: 16px;
        }
      }
    }
    :deep(.o-collapse) {
      .o-collapse-item {
        position: relative;
        border-top: none;
        &::after {
          position: absolute;
          content: '';
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2 * 24px);
          height: 1px;
          background-color: var(--collapse-division-color);
        }
        @include hover {
          .text {
            color: var(--o-color-primary1);
          }
        }
        @include respond-to('<=pad_v') {
          &::after {
            width: calc(100% - 2 * 16px);
          }
          &:last-child {
            &::after {
              display: none;
            }
          }
        }
      }
      .o-collapse-item-icon {
        height: min-content;
      }
      .o-collapse-item-header {
        align-items: center;
        padding: 16px 24px;
        @include respond-to('<=pad_v') {
          padding: 12px 16px;
        }
      }
      .o-collapse-item-body {
        padding: 16px 60px;
        background-color: var(--o-color-control2-light);
        margin-bottom: 0;
        @include respond-to('<=pad_v') {
          padding: 12px 16px;
        }
        a {
          word-break: break-all;
        }
      }
    }

    .calendar-info {
      display: flex;
      @include tip1;
      color: var(--o-color-info3);
      flex-direction: column;
      .info-item {
        display: flex;
        margin-top: 8px;
        .item-title {
          min-width: 110px;
        }
      }
      .info-item:first-child {
        margin-top: 0;
      }
    }
  }
}
.cube-1,
.cube-2 {
  position: absolute;
  top: -14px;
  left: -140px;
  width: 320px;
  z-index: -1;
  @include respond-to('laptop') {
    width: 327px;
    top: -84px;
    left: -210px;
  }
  @include respond-to('pad_h') {
  }
  @include respond-to('<=pad_v') {
    width: 84px;
    top: -14px;
    left: -30px;
  }
  @include respond-to('phone') {
    width: 54px;
    top: 4px;
    left: -16px;
  }
}
.cube-2 {
  left: inherit;
  top: inherit;
  width: 325px;
  bottom: -160px;
  right: -252px;
  @include respond-to('laptop') {
    width: 400px;
    bottom: -190px;
    right: -250px;
  }
  @include respond-to('<=pad_v') {
    width: 71px;
    bottom: -40px;
    right: -30px;
  }
}
</style>

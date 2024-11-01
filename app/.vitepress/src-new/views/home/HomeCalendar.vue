<script setup lang="ts">
import { ref, nextTick, onMounted, PropType, watch } from 'vue';

import { isValidKey, getNowFormatDate, isBrowser } from '@/shared/utils';
import { TableDataT, DayDataT } from '@/shared/@types/type-calendar';
import { useCommon } from '@/stores/common';

import { getDaysData } from '@/api/api-calendar';

import {
  OIcon,
  OCollapse,
  OCollapseItem,
  OTab,
  OTabPane,
} from '@opensig/opendesign';

import IconLeft from '~icons/app/icon-chevron-left.svg';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconDown from '~icons/app/icon-chevron-down.svg';
import IconCalendar from '~icons/app/icon-calendar.svg';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import useWindowResize from '@/components/hooks/useWindowResize';

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
const isCollapse = ref(false);
const i18n = {
  SIG_GROUP: 'SIG组:',
  NEW_DATE: '最新日程：',
  EMPTY_TEXT: '当日没有活动，敬请期待',
  LEARN_MORE: '了解更多',
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
  { text: '活动形式', key: 'activity_type' },
  { text: '线上链接', key: 'online_url' },
  { text: '报名链接', key: 'register_url' },
  { text: '活动地点', key: 'address' },
  { text: '回放链接', key: 'replay_url' },
  { text: '回放链接', key: 'video_url' },
];
const activityType = ['线下', '线上', '线上 + 线下'];
const titleList = [
  {
    name: '全部',
    value: 'all',
  },
  {
    name: '会议',
    value: 'meetings',
  },
  {
    name: '活动',
    value: 'activity',
  },
  {
    name: '峰会',
    value: 'summit',
  },
];
const tabType = ref(titleList[0].value);
const calendar = ref();
const calendarHeight = ref<number | string>(335);
const isLimit = ref(false);
const windowWidth = ref(useWindowResize());

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
  console.log(day);
  if (new Date(day.replace(/-/g, '/')).getTime() / 1000 < 1610380800) {
    event.stopPropagation();
    return;
  }
  console.log(day);
  if (day === currentDay.value.raw) {
    return false;
  }
  console.log(day);
  if (props.tableData.includes(day)) {
    paramGetDaysData({
      date: day,
      type: tabType.value,
    });
  } else {
    renderData.value.timeData = [];
  }
  console.log(day);
  currentDay.value.raw = day;
  currentDay.value.resolve = resolveDate(day);
}

function paramGetDaysData(params: { date: string; type: string }) {
  getDaysData(params).then((res) => {
    renderData.value = res.data;
    if (renderData.value.timeData.length === 1) {
      activeName.value = [0];
      nextTick(() => {
        if (document.querySelector('.meet-item')) {
          (document.querySelector('.meet-item') as HTMLElement).click();
        }
      });
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
        if (item2.etherpad) {
          item2['duration_time'] = `${item2.startTime}-${item2.endTime}`;
        }
        if (item2.activity_type) {
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

function goDetail(index: number) {
  window.open(
    `/zh/interaction/event-list/detail/?id=${renderData.value.timeData[index].id}&isMini=1`
  );
}

function changeCollapse() {
  isCollapse.value = !isCollapse.value;
}

function transformKey(key: string) {
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
}
const removeLeadingZero = (str: string) => {
  // 使用正则表达式匹配以 0 开头的字符串，然后去除开头的 0
  return str.replace(/^0+(?=\d)/, '');
};

function watchChange(element: HTMLElement) {
  const observe = new MutationObserver(function () {
    calendarHeight.value = `${element.offsetHeight - 2}px`;
  });
  observe.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
const resolveDate = (date: string) => {
  const reg = /(\d{4})\-(\d{2})\-(\d{2})/;
  date = date.replace(reg, '$1年$2月$3日');
  if (date.charAt(5) === '0') {
    date = date.substring(6);
  } else {
    date = date.substring(5);
  }
  return date;
};
onMounted(() => {
  const tbody = document.querySelector('.calendar-body tbody') as HTMLElement;
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
              {{ removeLeadingZero(currentDay.raw.split('-').at(-1) || '') }}
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
            :class="{ 'be-active': tableData.includes(data.day) }"
            @click="setMeetingDay(data.day, $event)"
          >
            <div class="day-box">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                class="date-calender"
              >
                {{ removeLeadingZero(data.day.split('-').at(-1) || '') }}
              </p>
            </div>
          </div>
        </template>
      </el-calendar>
      <div class="detail-list">
        <div class="right-title">
          <div class="title-list">
            <OTab v-model="tabType" @tab-click="selectTab">
              <OTabPane
                v-for="item in titleList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></OTabPane>
            </OTab>
          </div>
        </div>

        <div ref="meetingListRef" class="meeting-list">
          <div
            v-if="
              (renderData.timeData.length && renderData.date) ||
              (renderData.timeData.length && renderData.start_date)
            "
          >
            <OCollapse
              v-model="activeName"
              accordion
              @change="changeCollapse()"
              :style="{'--collapse-padding':'14px 24px'}"
            >
              <OCollapseItem
                v-for="(item, index) in renderData.timeData"
                :key="item.id"
                :value="index"
              >
                <template #title>
                  <div class="meet-item">
                    <div class="meet-left">
                      <div class="left-top">
                        <p class="meet-name">{{ item.name || item.title }}</p>
                      </div>
                      <div
                        v-if="item.group_name"
                        class="group-name more-detail"
                      >
                        {{ i18n.SIG_GROUP }} {{ item.group_name }}
                      </div>
                      <div v-else class="group-name more-detail">openEuler</div>
                    </div>
                    <div class="item-right">
                      <OButton
                        v-if="item.schedules"
                        animation
                        type="text"
                        @click.stop="goDetail(index)"
                      >
                        {{ i18n.LEARN_MORE }}
                        <template #suffixIcon>
                          <OIcon><icon-arrow-right></icon-arrow-right></OIcon>
                        </template>
                      </OButton>
                      <div class="detail-time">
                        <span class="start-time"
                          ><i v-if="!item.schedules">{{ item.startTime }}</i>
                          <i v-else>{{ item.schedules[0].start }}</i></span
                        >
                        <span v-if="windowWidth < 768">-</span>
                        <span class="end-time">
                          <i v-if="!item.schedules">{{ item.endTime }}</i>
                          <i v-else>{{
                            item.schedules[item.schedules.length - 1].end
                          }}</i>
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="meet-detail">
                  <template v-for="keys in detailItem" :key="keys.key">
                    <div
                      v-if="isValidKey(keys.key, item) && item[keys.key]"
                      class="meeting-item"
                    >
                      <div class="item-title">{{ keys.text }}:</div>
                      <a
                        v-if="
                            typeof item[keys.key] === 'string' &&
                            (item[keys.key] as string).startsWith('http')
                          "
                        :href="item[keys.key]"
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
                  <div v-if="item.schedules" class="mo-learn-more">
                    <OButton
                      animation
                      size="mini"
                      type="outline"
                      @click.stop="goDetail(index)"
                    >
                      {{ i18n.LEARN_MORE }}
                      <template #suffixIcon>
                        <OIcon><icon-arrow-right></icon-arrow-right></OIcon>
                      </template>
                    </OButton>
                  </div>
                </div>
              </OCollapseItem>
            </OCollapse>
          </div>
          <div v-else class="empty">
            <img
              v-if="commonStore.theme === 'light'"
              :src="notFoundImg_light"
              alt=""
            />
            <img v-else :src="notFoundImg_dark" alt="" />
            <p>{{ i18n.EMPTY_TEXT }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.calendar-body {
  display: flex;
  margin-top: 40px;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  overflow: hidden;
  :deep(.calender) {
    width: 56%;
    --el-calendar-borde: none;
    --el-calendar-selected-bg-color: none;
    .el-calendar__header {
      padding: 14px 24px;
      align-items: center;
      td {
        border: none;
      }
      .left-title {
        display: flex;
        align-items: center;
        .current-date {
          border-radius: var(--o-radius-xs);
          padding: 4px 16px;
          border: 1px solid var(--o-color-control4);
        }
      }
      .right-title {
        @include text2;
        color: var(--o-color-info2);
      }
    }
    td {
      border: none;
    }
    .el-calendar-day {
      padding: 0;
      padding-left: 8px;
      padding-bottom: 8px;
      max-width: 100px;
      height: 64px;

      .out-box {
        overflow: hidden;
        border-radius: var(--o-radius-xs);
        padding: 8px;
        width: 100%;
        height: 100%;
        background-color: var(--o-color-primary4-light);
        border: 1px solid transparent;
        @include hover {
          background-color: var(--o-color-primary1-light);
          border: 1px solid var(--o-color-primary1);
        }
      }
    }
    .is-selected {
      .out-box {
        background-color: var(--o-color-primary1-light);
        border: 1px solid var(--o-color-primary1);
      }
    }
  }
  .detail-list {
    width: 44%;
    .o-tab-navs {
      padding-top: 14px;
      .meet-item {
        
      }
    }
  }
}
</style>

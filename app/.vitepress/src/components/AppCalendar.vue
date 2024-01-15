<script setup lang="ts">
import { ref, nextTick, onMounted, PropType, watch } from 'vue';

import { isValidKey, getNowFormatDate, isBrowser } from '@/shared/utils';
import { TableDataT, DayDataT } from '@/shared/@types/type-calendar';
import { useCommon } from '@/stores/common';

import { getDaysData } from '@/api/api-calendar';

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
const loading = ref(false);
const currentDay = ref({
  raw: '',
  resolve: '',
});
const activeName = ref('');
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
  if (new Date(day.replace(/-/g, '/')).getTime() / 1000 < 1610380800) {
    event.stopPropagation();
    return;
  }
  if (day === currentDay.value.raw) {
    return false;
  }
  if (props.tableData.includes(day)) {
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
  loading.value = true;
  getDaysData(params)
    .then((res) => {
      renderData.value = res.data;
      if (renderData.value.timeData.length === 1) {
        activeName.value = '0';
        nextTick(() => {
          if (document.querySelector('.meet-item')) {
            (document.querySelector('.meet-item') as HTMLElement).click();
          }
        });
      } else {
        // 会议时间排序
        activeName.value = '';
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
    })
    .finally(() => {
      loading.value = false;
    });
}

function selectDate(val: string, date: string) {
  if (date === limitTime && val === 'prev-month') {
    isLimit.value = true;
    return;
  }
  isLimit.value = false;
  calendar.value.selectDate(val);
}

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
  const tbody = document.querySelector('.main-body tbody') as HTMLElement;
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
  <div class="main-body">
    <div class="calendar">
      <el-calendar v-if="windowWidth > 768" ref="calendar" class="calender">
        <template #header="{ date }">
          <div class="left-title">
            <OIcon @click="selectDate('prev-month', date)">
              <icon-left :class="{ disable: isLimit }"></icon-left>
            </OIcon>
            <span class="month-date">{{ date }}</span>
            <OIcon @click="selectDate('next-month', date)">
              <icon-right></icon-right>
            </OIcon>
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
                {{ data.day.split('-').slice(2)[0] }}
              </p>
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
    <div class="detail-list">
      <div class="right-title">
        <div class="title-list">
          <OTabs v-model="tabType" @tab-click="selectTab">
            <OTab-pane
              v-for="item in titleList"
              :key="item.value"
              :label="item.name"
              :name="item.value"
            ></OTab-pane>
          </OTabs>
        </div>
      </div>
      <el-collapse v-if="windowWidth < 768" class="calendar calendar-mo">
        <div class="collapse-box-mo">
          <OCollapse-item>
            <template #title>
              <div class="mo-collapse">
                <OIcon>
                  <icon-calendar></icon-calendar>
                </OIcon>
                <span class="month-date">
                  {{ getNowFormatDate() }}
                </span>
              </div>
            </template>
            <div class="meet-detail">
              <el-calendar ref="calendar" class="calendar-mo calender">
                <template #header="{ date }">
                  <div class="left-title">
                    <OIcon @click="selectDate('prev-month', date)">
                      <icon-left :class="{ disable: isLimit }"></icon-left>
                    </OIcon>
                    <span class="month-date">{{ date }}</span>
                    <OIcon @click="selectDate('next-month', date)">
                      <icon-right></icon-right>
                    </OIcon>
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
                        {{ data.day.split('-').slice(2)[0] }}
                      </p>
                    </div>
                  </div>
                </template>
              </el-calendar>
            </div>
          </OCollapse-item>
        </div>
      </el-collapse>
      <div class="detail-head">
        {{ i18n.NEW_DATE }}
        <span>{{ currentDay.resolve }}</span>
      </div>
      <div ref="meetingListRef" class="meeting-list">
        <div
          v-if="
            (renderData.timeData.length && renderData.date) ||
            (renderData.timeData.length && renderData.start_date)
          "
          v-loading="loading"
          class="demo-collapse"
        >
          <o-collapse v-model="activeName" accordion @change="changeCollapse()">
            <div
              v-for="(item, index) in renderData.timeData"
              :key="item.id"
              class="collapse-box"
            >
              <o-collapse-item :name="index">
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
                      <div class="extend">
                        <OIcon
                          :class="{
                            reversal:
                              isCollapse && activeName == index.toString(),
                          }"
                        >
                          <icon-down></icon-down>
                        </OIcon>
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
              </o-collapse-item>
            </div>
          </o-collapse>
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
</template>
<style lang="scss" scoped>
.calendar-title {
  text-align: center;
  font-size: var(--o-font-size-h3);
  font-weight: 400;
}
.left-title {
  display: flex;
  margin-bottom: var(--o-spacing-h2);
  align-items: center;
  height: 40px;
  font-size: var(--o-font-size-h8);
  .disable {
    cursor: not-allowed;
    color: var(--o-color-text5);
    &:hover {
      color: var(--o-color-text5);
    }
  }
  .o-icon {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
  }
}
.month-date {
  color: var(--o-color-text1);
  padding: 0 var(--o-spacing-h8);
}
@media screen and (max-width: 768px) {
  .month-date {
    font-size: var(--o-font-size-tip);
  }
  .left-title {
    display: none;
  }
}
:deep(.title-list) {
  display: flex;
  .el-tabs__nav-scroll {
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
    }
  }
  .el-tabs__item {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .title-item {
    cursor: pointer;
    padding: 12px;
    &:hover {
      color: var(--o-color-brand1);
    }
  }
  .active {
    background-color: var(--o-color-brand1);
    color: var(--o-color-text2) !important;
  }
}
.o-icon {
  cursor: pointer;
  font-size: var(--o-font-size-h7);
  transition: color 0.2s;
  &:hover {
    color: var(--o-color-brand1);
    svg {
      color: var(--o-color-brand2);
      fill: var(--o-color-brand2);
    }
  }
}
.main-body {
  display: flex;
  :deep(.el-calendar) {
    --el-calendar-border: 1px solid var(--o-color-border2);
    background-color: var(--o-color-bg1);
    .el-collapse-item__content {
      padding: 0;
      background-color: transparent;
    }
    .el-calendar__header {
      display: block;
      padding: 0;
      border: none;
      @media screen and (max-width: 768px) {
        background-color: var(--o-color-bg2);
        .left-title {
          margin: 0;
        }
      }
    }
    .el-calendar__body {
      background-color: var(--o-color-bg2);
      th {
        color: var(--o-color-text4);
      }
    }
  }

  .collapse-box-mo {
    .left-title {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .collapse-box-mo {
      margin: var(--o-spacing-h6) 0;
      :deep(.el-collapse-item) {
        background-color: var(--o-color-bg2);
        padding: 0 var(--o-spacing-h8);
        .el-icon {
          font-size: var(--o-font-size-text);
          font-weight: 700;
          transform: rotate(90deg);
          color: var(--o-color-text1);
        }
        .el-icon.is-active {
          transform: rotate(270deg);
        }
        .el-collapse-item__header {
          height: 34px;
          border: none;
          background-color: var(--o-color-bg2);
        }
        .el-collapse-item__wrap {
          border: 0;
          .el-collapse-item__content {
            padding: 0;
          }
        }
        .meet-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .left-title {
            display: flex;
            padding: var(--o-spacing-h8) var(--o-spacing-h1);
            align-items: center;
            justify-content: space-between;
            svg {
              cursor: pointer;
              width: 16px;
            }
          }
        }
      }
      .mo-collapse {
        display: flex;
        align-items: center;
        width: 100%;
        .o-icon {
          color: inherit;
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h8);
        }
        .month-date {
          padding-left: 8px;
          font-size: var(--o-font-size-tip);
          line-height: 16px;
        }
      }
    }
  }
  :deep(.calendar) {
    width: 100%;
    max-width: 500px;
    flex-shrink: 0;
    text-align: center;
    thead {
      th {
        text-align: center;
      }
      background-color: var(--o-color-bg4);
    }
    @media screen and (max-width: 1100px) {
      max-width: 400px;
    }
    @media screen and (max-width: 768px) {
      max-width: 100%;
      display: none;
    }

    .is-today {
      .el-calendar-day {
        .day-box {
          color: var(--o-color-text4);
          background-color: var(--o-color-bg4);
        }
      }
    }

    .el-calendar__body {
      padding: 0;
      thead {
        height: 44px;
      }
      tbody {
        box-shadow: var(--o-shadow-l2);
      }
      .el-calendar-table__row {
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
        font-size: var(--o-font-size-tip);
        .is-selected {
          background-color: transparent;
          .el-calendar-day {
            .day-box {
              background-color: var(--o-color-brand1);
              .date-calender {
                color: var(--o-color-text2);
              }
            }
          }
        }

        .el-calendar-day {
          display: flex;
          justify-content: center;
          padding: 0;
          height: 66px;
          &:hover {
            background-color: var(--o-color-bg1);
          }
          @media screen and (max-width: 768px) {
            background-color: inherit !important;
          }
          .out-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          .be-active {
            position: relative;
            overflow: hidden;
          }
          .be-active::after {
            position: absolute;
            top: -6px;
            right: -6px;
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 0 0 0 20px;
            background-color: var(--o-color-brand2);
            @media screen and (max-width: 768px) {
              width: 12px;
              height: 12px;
              top: -4px;
              right: -4px;
              border-radius: 0 0 0 12px;
            }
          }
          .day-box {
            display: flex;
            box-sizing: border-box;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            align-items: center;
            .date-calender {
              line-height: var(--o-line-height-text);
              font-size: var(--o-font-size-h8);
              color: var(--o-color-text1);
            }
          }
        }
        @media screen and (max-width: 768px) {
          .el-calendar-day {
            height: 100%;
            .day-box {
              .date-calender {
                font-size: var(--o-font-size-tip);
              }
            }
          }
          .el-calendar-day::after {
            display: block;
            padding-top: 100%;
            content: '';
          }
        }
      }
    }
  }
  :deep(.calendar-mo) {
    display: none;
    @media screen and (max-width: 768px) {
      border: none;
      display: block;
      width: 100%;
      thead {
        th {
          padding: var(--o-spacing-h8) 0;
          font-size: var(--o-font-size-tip);
        }
      }
      tbody {
        width: 300px;
      }
      tr {
        td {
          border: none;
          justify-content: center;
        }
      }
      .current {
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  :deep(.detail-list) {
    width: 100%;
    background-color: var(--o-color-bg1);
    .right-title {
      display: flex;
      height: 40px;
      margin-bottom: var(--o-spacing-h2);
      justify-content: flex-end;
      @media screen and (max-width: 768px) {
        margin-bottom: 0;
        padding-bottom: var(--o-spacing-h5);
        justify-content: center;
        background-color: var(--o-color-bg1);
      }
      .el-tabs__header {
        margin: 0;
      }
    }
    .detail-head {
      line-height: 21px;
      padding: var(--o-spacing-h6);
      text-align: center;
      color: var(--o-color-text4);
      background-color: var(--o-color-bg4);
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h8) 0;
        font-size: var(--o-font-size-tip);
      }
    }

    .meeting-list {
      padding: var(--o-spacing-h8) 0 0 var(--o-spacing-h8);
      height: v-bind('calendarHeight');
      background-color: var(--o-color-bg2);
      overflow-y: scroll;
      box-shadow: var(--o-shadow-l2);
      .el-collapse {
        border: none;
        --el-collapse-header-height: 96px;
        .collapse-box:last-child {
          .el-collapse-item {
            margin-bottom: 0;
          }
        }
        .el-collapse-item {
          margin-bottom: var(--o-spacing-h8);
          .el-collapse-item__header {
            padding-left: 0;
            border: none;
            height: 100%;
          }
        }
        .el-collapse-item__wrap {
          border: none;
          padding: var(--o-spacing-h6) var(--o-spacing-h5);
          background-color: var(--o-collapse-color-bg2);
          @media screen and (max-width: 768px) {
            padding: var(--o-spacing-h6);
            background-color: var(--o-color-bg1);
            .el-collapse-item__content {
              background-color: var(--o-color-bg1);
            }
          }
        }
      }
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h8);
        height: fit-content;
        overflow: auto;
      }
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background-color: var(--o-color-bg2);
      }

      &::-webkit-scrollbar {
        width: 6px;
        background-color: var(--o-color-bg2);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: var(--o-color-division1);
      }
      .el-collapse-item__arrow {
        display: none;
      }
      .el-collapse-item__content {
        padding: 0;
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
        }
      }
      .meet-item {
        display: flex;
        justify-content: space-between;
        padding: var(--o-spacing-h5);
        width: 100%;
        height: 100%;
        background-color: var(--o-color-bg3);
        border: 1px solid var(--o-color-bg3);
        border-left: 2px solid var(--o-color-brand1);
        .meet-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          .left-top {
            display: flex;
            align-items: center;
            .meet-name {
              margin-right: var(--o-spacing-h5);
              max-width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: var(--o-font-size-h7);
              color: var(--o-color-text1);
              line-height: var(--o-line-height-h7);
            }
            .el-collapse-item__content {
              padding: 0 20px;
            }
            p {
              margin: 0;
              height: fit-content;
              justify-content: center;
              align-items: center;
              line-height: normal;
            }
          }
          .more-detail {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            width: fit-content;
            height: 24px;
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
            @media screen and (max-width: 768px) {
              font-size: var(--o-font-size-text);
            }
            .o-icon {
              margin: 0 5px;
              color: var(--o-color-brand1);
              font-size: var(--o-font-size-h5);
              transition: all 0.3s;
              svg {
                color: var(--o-color-brand1);
              }
            }
            &:hover {
              .o-icon {
                transform: translateX(5px);
              }
            }
          }
        }
        .item-right {
          display: flex;
          font-size: var(--o-font-size-text);
          .o-button {
            flex-shrink: 0;
            padding: 0;
            .o-icon {
              color: var(--o-color-brand1);
              font-size: var(--o-font-size-h5);
            }
            &:hover {
              color: var(--o-color-brand1);
            }
            @media screen and (max-width: 768px) {
              display: none;
            }
          }

          .detail-time {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 var(--o-spacing-h5);
            font-weight: normal;
            text-align: center;
            font-size: var(--o-font-size-h8);
            span {
              line-height: var(--o-line-height-h8);
              i {
                font-style: normal;
              }
            }
          }
          .extend {
            display: flex;
            align-items: center;
            width: 24px;
            .o-icon {
              font-size: var(--o-font-size-h5);
              color: var(--o-color-text1);
              transition: all 0.3s;
            }
            .reversal {
              transform: rotate(180deg);
            }
          }
        }
        @media screen and (max-width: 768px) {
          background-color: var(--o-color-bg2);
          padding: var(--o-spacing-h6);
          border: 1px solid var(--o-color-division1);
          border-left: 2px solid var(--o-color-brand1);
          .meet-left {
            max-width: 200px;
            .left-top {
              .meet-name {
                font-size: var(--o-font-size-text);
                font-weight: 700;
              }
            }
            .group-name {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: var(--o-font-size-tip);
              color: var(--o-color-text4);
            }
          }
          .item-right {
            .detail-time {
              flex-direction: row;
              align-items: flex-end;
              padding: 0 var(--o-spacing-h8);
              font-size: var(--o-font-size-tip);
            }
            .extend {
              align-items: flex-end;
              .o-icon {
                display: inline-block;
                height: var(--o-line-height-h8);
                line-height: var(--o-line-height-h8);
                font-size: var(--o-font-size-h8);
                svg {
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
      .meet-detail {
        color: var(--o-color-text4);
        .meeting-item {
          display: flex;
          padding-bottom: var(--o-spacing-h8);
          line-height: var(--o-line-height-tip);
          word-break: break-all;
          .item-title {
            flex-shrink: 0;
            width: 90px;
          }
          .creator {
            display: flex;
            align-items: center;
            .head-logo {
              width: 60px;
              border-radius: 50%;
              overflow: hidden;
            }
            .creator-name {
              padding-left: var(--o-spacing-h5);
              font-size: var(--o-font-size-text);
            }
          }
        }
        .mo-learn-more {
          display: none;
          @media screen and (max-width: 768px) {
            display: flex;
            justify-content: center;
            padding-top: var(--o-spacing-h8);
            border-top: 1px solid var(--o-color-division1);
            padding: var(--o-spacing-h5) 0 var(--o-spacing-h10);
            .o-button {
              padding: 3px var(--o-spacing-h6);
              .o-icon {
                font-size: var(--o-font-size-tip);
              }
            }
          }
        }
      }
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h8);
      img {
        height: 216px;
      }
      p {
        margin-top: var(--o-spacing-h5);
      }
      @media screen and (max-width: 768px) {
        img {
          margin-top: var(--o-spacing-h5);
        }
        p {
          padding-bottom: var(--o-spacing-h5);
          font-size: var(--o-font-size-tip);
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .head-title {
    flex-direction: column;
    padding: 0;
  }
  .main-body {
    margin: 0 auto;
    align-items: center;
    flex-direction: column;
    background-color: var(--o-color-bg2);
  }
}
</style>

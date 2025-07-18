<script setup lang="ts">
import {
  ref,
  nextTick,
  onMounted,
  reactive,
  PropType,
  watch,
  computed,
} from 'vue';

import { isValidKey, isBrowser } from '@/shared/utils';
import { TableDataT, DayDataT } from '@/shared/@types/type-calendar';
import { useCommon } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';
import { useData } from 'vitepress';

import {
  OPopover,
  OScroller,
  OCollapse,
  OCollapseItem,
  OIcon,
  OTag,
  OSelect,
  OOption,
  ODivider,
  OTab,
  OTabPane,
  OLink,
} from '@opensig/opendesign';

import activityData from '~@/data/activity';

import { type CalendarValueT } from '~@/@type/type-home';

import IconTips from '~icons/app-new/icon-help.svg';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';
import IconMeet from '~icons/home/icon-meet.svg';
import IconAll from '~icons/home/icon-all.svg';
import IconEvent from '~icons/home/icon-event.svg';
import IconArrowLeft from '~icons/app-new/icon-arrow-left.svg';
import IconArrowRight from '~icons/app-new/icon-arrow-right.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const { params } = useData();

const props = defineProps({
  meetingData: {
    type: Array as PropType<TableDataT[]>,
    default: () => {
      return [];
    },
  },
  meetingDetail: {
    type: String,
    default: '',
  },
  mail: {
    type: String,
    default: '',
  },
});

const commonStore = useCommon();
let currentMeet = reactive<TableDataT>({
  date: '',
  timeData: [],
});

const { lePadV } = useScreen();

const renderData = ref<TableDataT>({
  date: '',
  timeData: [],
});

const currentPage = ref(1);
const splitArray = (arr, size) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
};
const nextPage = () => {
  if (currentPage.value < meetingDays.value?.length) {
    currentPage.value++
  }
};

// 过滤当前sig组的活动
const sigActivityData = (data: CalendarValueT) => {
  return data.filter(
    (item) => {
      return item.group_name === params.value?.sig;
    });
};

// 会议日期数据
const meetingDays = ref();
const latestDate = ref();

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
];

const tabType = ref(titleList[0].value);

// 构造日期数据
const transformDateArrayToMap = computed(() => {
  const resultMap = new Map<number, Array<string>>();
  props?.meetingData?.forEach((item) => {
    const dateParts = item.date.split('-');
    const year = parseInt(dateParts[0]);
    if (!resultMap.has(year)) {
      resultMap.set(year, []);
    }
    resultMap.get(year)?.push(item.date);
  });
  return resultMap;
});

const activeDay = ref('');

const detailItem = [
  { text: '会议详情', key: 'detail' },
  { text: '发起人', key: 'creator' },
  { text: '会议日期', key: 'date' },
  { text: '会议时间', key: 'duration_time' },
  { text: '会议ID', key: 'meeting_id' },
  { text: '会议链接', key: 'join_url' },
  { text: 'SIG组会议纪要', key: 'etherpad' },
  { text: '活动介绍', key: 'synopsis' },
  { text: '起始日期', key: 'start_date' },
  { text: '结束日期', key: 'end_date' },
  { text: '活动形式', key: 'activity_type' },
  { text: '线上链接', key: 'online_url' },
  { text: '回放链接', key: 'replay_url' },
  { text: '回放链接', key: 'video_url' },
];

const getSummitHighlight = (date: string, data: CalendarValueT[]) => {
  return data.find((item) => {
    return item.dates?.includes(date);
  });
};

const getMeetingHighlight = (date: string) => {
  return props.meetingData.find((item) => {
    return item.date?.includes(date);
  });
};

const activeName = ref<number[]>([0]);

const paramGetDaysData = (params: { date: string; type: string }) => {
  renderData.value.timeData = [];
  const dataMap = {
    all: [...props.meetingData, ...sigActivityData(activityData)],
    meetings: props.meetingData,
    activity: sigActivityData(activityData),
  };
  const data = dataMap[params.type];

  const meetingData = data.filter((item) => {
    return item?.date?.includes(params.date);
  });
  const activeData = data.filter((item) => {
    return item?.dates?.includes(params.date);
  });

  let arr = [];
  meetingData.forEach((item) => {
    arr.push(...item.timeData);
  });

  activeDay.value = params.date?.toString();

  renderData.value.timeData = [...arr, ...activeData];

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
};

const setMeetingDay = (date: string) => {
  tabType.value = 'all';
  paramGetDaysData({
    date: date,
    type: tabType.value,
  });
};
// 判断会议时间修改提示
const isActive = ref(false);
const getTimeTip = (item: DayDataT) => {
  const startTime = new Date(
    item.type === 'activity' ? item.start_date : (currentMeet?.date + ' ' + item.startTime + ':00')
  ).getTime();
  const endTime = new Date(
    item.type === 'activity' ? item.end_date : (currentMeet?.date + ' ' + item.endTime + ':00')
  ).getTime();
  const newDate = new Date().getTime();
  if (newDate > startTime && newDate < endTime) {
    isActive.value = true;
    return '正在进行';
  } else if (newDate < startTime) {
    isActive.value = true;
    return '即将开始';
  } else {
    isActive.value = false;
    return '精彩回顾';
  }
};

const dateOption = ref([])
// 获取会议日期数据
const getMeetingData = () => {
  const dataList = new Map();
  const meetingArr = [...props.meetingData, ...sigActivityData(activityData)];
  meetingArr.forEach((item) => {
    const itemJson = JSON.parse(JSON.stringify(item));
    const dateParts = itemJson?.date ? itemJson?.date?.split('-') : itemJson?.dates[0].split('-');
    const month = `${dateParts[0]}/${dateParts[1]}`;
    const day = parseInt(dateParts[2]);

    // 初始化月份数据
    if (!dataList.has(month)) {
      dataList.set(month, []);
    }

    // 检查是否已经存在相同日期的会议
    const existingDay = dataList.get(month).find((d) => d.day === day);
    if (!existingDay) {
      dataList.get(month).push({ day, date: itemJson.date || itemJson.dates[0] });
    }

    // 距离当前时间最近的日期
    const timestamp = new Date().getTime() - 24 * 60 * 60 * 1000;
    const date = itemJson?.date || itemJson?.dates[0];
    const dateStamp = new Date(date).getTime()
    item.timeInterval = dateStamp - timestamp;
  });
  meetingDays.value = splitArray(Array.from(dataList).sort((a, b) => b[0].localeCompare(a[0])), 3);

  const arr = meetingArr.sort((a, b) => b.timeInterval - a.timeInterval);
  arr.forEach((item) => {
    const itemJson = JSON.parse(JSON.stringify(item));
    const date = itemJson?.date || itemJson?.dates[0];
    dateOption.value.push({
      date: date,
      value: date,
    })
  })

  const dataMeetingLaster = meetingArr.filter(item => item.timeInterval > 0).sort((a, b) => a.timeInterval - b.timeInterval)[0];
  const dataMeetingFirst = meetingArr.filter(item => item.timeInterval < 0).sort((a, b) => b.timeInterval - a.timeInterval)[0];
  latestDate.value = dataMeetingLaster?.date || dataMeetingLaster?.dates[0] || dataMeetingFirst?.date || dataMeetingFirst?.dates[0];

  setMeetingDay(latestDate.value);
};

watch(
  () => props.meetingData,
  () => {
    getMeetingData();
  },
  { immediate: true }
);

const i18n = {
  SIG_GROUP: 'SIG组:',
  NEW_DATE: '最新日程：',
  EMPTY_TEXT: '当日没有活动，敬请期待',
  LEARN_MORE: '查看详情',
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

// 活动会议筛选
const selectTab = () => {
  nextTick(() => {
    paramGetDaysData({
      date: activeDay.value,
      type: tabType.value,
    });
  });
};
</script>
<template>
  <div v-if="!lePadV" class="sig-meeting-pc">
    <div class="left-date">
      <div class="card-title">
        <p>
          {{
            $t('sig.latestMeeting', { date: latestDate?.replaceAll('-', '/') })
          }}
        </p>
        <OPopover position="top" trigger="hover" wrap-class="popup-tip">
          <template #target>
            <OIcon class="server-tips">
              <IconTips />
            </OIcon>
          </template>
          <p class="tips-text">
            {{ $t('sig.sigMeetingTip') }}
          </p>
        </OPopover>
      </div>
      <ODivider :style="{ '--o-divider-gap': '0' }" />
      <div class="date-content">
        <OScroller class="content-box" show-type="hover" size="small">
          <div
            v-for="[month, days] in meetingDays[currentPage - 1]"
            :key="month"
            class="meeting-days"
          >
            <p class="month">{{ month }}</p>
            <div class="meeting-days-box">
              <div
                v-for="d in days"
                :key="d.day"
                class="day"
                @click="setMeetingDay(d.date)"
                :class="activeDay === d.date ? 'active' : ''"
              >
                <p>{{ d.day }}</p>
                <div class="icon-box">
                  <OIcon class="meeting" v-if="getMeetingHighlight(d.date)">
                    <IconMeet></IconMeet>
                  </OIcon>
                  <OIcon
                    class="activity"
                    v-if="getSummitHighlight(d.date, sigActivityData(activityData))"
                  >
                    <IconEvent></IconEvent>
                  </OIcon>
                </div>
              </div>
            </div>
          </div>
        </OScroller>
        <div v-if="meetingDays.length > 1" class="page">
          <OIcon
            :class="{ 'icon-disable': currentPage === 1 }"
            @click="prevPage"
          >
            <IconArrowLeft></IconArrowLeft>
          </OIcon>
          <OIcon
            :class="{ 'icon-disable': currentPage === meetingDays?.length }"
            @click="nextPage"
          >
            <IconArrowRight></IconArrowRight>
          </OIcon>
        </div>
      </div>
    </div>
    <div class="right-meeting">
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
      <ODivider :style="{ '--o-divider-gap': '0' }" />
      <div class="card-body-info">
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
                <OIcon :class="item.type || 'meeting'" class="icon-type">
                  <IconEvent v-if="item.type === 'activity'"></IconEvent>
                  <IconMeet v-else></IconMeet>
                </OIcon>
                <div class="meet-title" :title="item.name || item.title">
                  <div class="top-line">
                    <div class="text">
                      {{ item.name || item.title }}
                    </div>
                    <OTag>
                      {{ getTimeTip(item) }}
                    </OTag>
                  </div>
                  <div class="sig-name">
                    {{ $t('sig.sigName', { sig: item.group_name }) }}
                  </div>
                  <OLink v-if="item.type" :href="item.url" target="_blank">
                    {{ i18n.LEARN_MORE }}
                    <template #suffix>
                      <OIcon><IconChevronRight /> </OIcon>
                    </template>
                  </OLink>
                </div>
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
                            ((item[keys.key] as string).startsWith('http') || (item[keys.key] as string).startsWith('/'))
                          "
                      :href="item[keys.key]"
                      target="_blank"
                      >{{ item.type === 'activity' ? '查看详情' : item[keys.key] }}</a
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
  <div v-else class="sig-meeting">
    <div class="card-title">
      <OSelect v-model="activeDay" @change="(val) => setMeetingDay(val)">
        <OOption
          v-for="item in dateOption"
          :key="item.date"
          :value="item.date"
        />
      </OSelect>
    </div>
    <div class="card-body">
      <div class="card-body-info">
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
                <OIcon :class="item.type || 'meeting'" class="icon-type">
                  <IconEvent v-if="item.type === 'activity'"></IconEvent>
                  <IconMeet v-else></IconMeet>
                </OIcon>
                <div class="meet-title" :title="item.name || item.title">
                  <div class="top-line">
                    <div class="text">
                      {{ item.name || item.title }}
                    </div>
                    <OTag>
                      {{ getTimeTip(item) }}
                    </OTag>
                  </div>
                  <div class="sig-name">
                    {{ $t('sig.sigName', { sig: item.group_name }) }}
                  </div>
                  <OLink v-if="item.type" :href="item.url" target="_blank">
                    {{ i18n.LEARN_MORE }}
                    <template #suffix>
                      <OIcon><IconChevronRight /> </OIcon>
                    </template>
                  </OLink>
                </div>
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
                            ((item[keys.key] as string).startsWith('http') || (item[keys.key] as string).startsWith('/'))
                          "
                      :href="item[keys.key]"
                      target="_blank"
                      >{{ item.type === 'activity' ? '查看详情' : item[keys.key] }}</a
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
</template>
<style lang="scss" scoped>
.meeting {
  background-color: #007af0;
  z-index: 3;
}
.activity {
  background-color: #ffa122;
  z-index: 1;
}
.sig-meeting-pc {
  width: 100%;
  display: flex;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  .left-date {
    width: 28%;
    .card-title {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      font-weight: 500;
      @include text1;

      .o-icon {
        cursor: pointer;
        margin-left: 8px;
        color: var(--o-color-control3);
        font-size: var(--o-icon_size-xs);
      }
    }
  }
  .date-content {
    padding: 16px 16px 10px 24px;
  }
  .content-box {
    height: 312px;
  }
  .meeting-days {
    + .meeting-days {
      margin-top: 12px;
    }
    .month {
      @include tip1;
      color: var(--o-color-info3);
      margin-bottom: 8px;
    }
    .meeting-days-box {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(2, 1fr);
      .day {
        @include text1;
        color: var(--o-color-info1);
        border-radius: var(--o-radius-xs);
        padding: 8px 12px;
        background: var(--o-color-control2-light);
        border: 1px solid var(--o-color-control2-light);
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          background: var(--o-color-control3-light);
          border-color: var(--o-color-primary1);
        }
      }
    }
  }
  .icon-box {
    display: flex;
    margin-top: 4px;
    color: var(--o-color-white);
    height: 20px;
    .o-icon {
      flex-shrink: 0;
      position: relative;
      border-radius: 50%;
      padding: 2px;
      width: 20px;
      height: 20px;
      font-size: 20px;
      margin-left: -6px;
      &:first-child {
        margin: 0;
      }
    }
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .o-icon {
      color: var(--o-color-primary1);
      --icon-size: 24px;
      cursor: pointer;
    }
    .o-icon + .o-icon {
      margin-left: 140px;
    }
    .icon-disable {
      color: var(--o-color-primary4);
    }
  }
  .right-meeting {
    width: 72%;
  }
  .title-list {
    width: 100%;
  }
  .o-tab {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 56px;
    @include respond-to('pad_v-laptop') {
      --tab-nav-padding: 0 0 14px;
    }
  }

  :deep(.o-collapse) {
    .o-collapse-item {
      position: relative;
      border-top: none;
      @include hover {
        .text {
          color: var(--o-color-primary1);
        }
      }

      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 24px;
        width: calc(100% - 24px);
        height: 1px;
        background-color: var(--collapse-division-color);
      }
    }

    .o-collapse-item-icon {
      height: min-content;
    }

    .o-collapse-item-header {
      align-items: center;
      padding: 16px 24px;
    }

    .o-collapse-item-body {
      background-color: #f7f9fd;
      margin-bottom: 0;

      a {
        word-break: break-all;
      }
    }
  }
  .card-body-info {
    width: 100%;
    border-left: 1px solid var(--o-color-control4);
    .meeting-list {
      height: 366px;
    }
  }

  :deep(.o-collapse-item-title) {
    display: flex;
  }

  .icon-type {
    flex-shrink: 0;
    padding: 2px;
    border-radius: 50%;
    overflow: hidden;
    color: var(--o-color-white);
    margin-right: 12px;
    width: 24px;
    height: 24px;
    font-size: 24px;
  }

  .meet-title {
    display: flex;
    flex-direction: column;
    color: var(--o-color-info1);
    @include text2;

    .top-line {
      display: flex;
    }

    .sig-name {
      margin-top: 8px;
      color: var(--o-color-info3);
      @include tip1;

      @include respond-to('<=pad_v') {
        @include text1;
      }
    }

    .text {
      @include text-truncate(1);

      display: block;
      width: 100%;
      margin-right: 8px;
    }
  }
  .o-link {
    font-weight: 400;
    padding: 0;
    margin-top: 8px;
    @include tip1;
  }
  .calendar-info {
    display: flex;
    color: var(--o-color-info3);
    flex-direction: column;
    padding: 16px 60px;
    @include tip1;

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

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    @include text1;
    color: var(--o-color-info1);
    padding: 24px;
    img {
      height: 180px;
    }
    p {
      margin-top: 16px;
    }
  }
}
.sig-meeting {
  display: flex;
  flex-direction: column;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  height: fit-content;
  margin-top: 24px;

  .card-title {
    padding: 16px 12px;

    .o-select {
      width: 100%;
    }
  }

  .card-body {
    $icon-size: 24px;

    display: flex;
    width: 100%;
    height: 100%;
    max-height: calc(400px - 54px);
    border-top: 1px solid var(--o-color-control4);
    flex-direction: column;

    :deep(.o-collapse) {
      .o-collapse-item {
        position: relative;
        border-top: none;
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
      }

      .o-collapse-item-icon {
        height: min-content;
      }

      .o-collapse-item-header {
        align-items: center;
        padding: 12px 16px;
      }

      .o-collapse-item-body {
        background-color: #f7f9fd;
        margin-bottom: 0;

        a {
          word-break: break-all;
        }
      }
    }

    .card-body-info {
      width: 100%;
      .meeting-list {
        height: 100%;
      }
    }

    :deep(.o-collapse-item-title) {
      display: flex;
    }

    .icon-type {
      flex-shrink: 0;
      padding: 2px;
      border-radius: 50%;
      overflow: hidden;
      color: var(--o-color-white);
      margin-right: 12px;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .meet-title {
      display: flex;
      flex-direction: column;
      color: var(--o-color-info1);
      width: calc(100% - 32px);
      @include text2;

      .top-line {
        display: flex;
      }

      .sig-name {
        margin-top: 8px;
        color: var(--o-color-info3);
        @include tip1;

        @include respond-to('<=pad_v') {
          @include text1;
        }
      }

      .o-link {
        font-weight: 400;
        padding: 0;
        margin-top: 8px;
        @include tip1;
        @include respond-to('<=pad_v') {
          @include text1;
        }
      }

      .text {
        @include text-truncate(1);

        display: block;
        width: 100%;
        margin-right: 8px;
      }
    }

    .meet-info {
      margin-left: 32px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      color: var(--o-color-info3);
      text-decoration: none;
      @include tip1;
    }

    .calendar-info {
      display: flex;
      color: var(--o-color-info3);
      flex-direction: column;
      padding: 12px 16px;
      @include tip1;

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

      @include respond-to('<=pad_v') {
        @include text1;
      }
    }
  }
}

@include in-dark {
  .sig-meeting-pc {
    :deep(.o-collapse) {
      .o-collapse-item-body {
        background-color: #2b2b2f;
      }
    }
  }
  .sig-meeting {
    .card-body {
      :deep(.o-collapse) {
        .o-collapse-item-body {
          background-color: #2b2b2f;
        }
      }
    }
  }
}
</style>

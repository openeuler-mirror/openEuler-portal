<script setup lang="ts">
import { ref, onMounted, watch, computed, shallowRef } from 'vue';

import { isValidKey } from '@/shared/utils';
import { useCommon } from '@/stores/common';

import {
  OIcon,
  OCollapse,
  OCollapseItem,
  OTab,
  OLink,
  OTabPane,
  ODivider,
  OScroller,
  OButton,
  useMessage,
  OTag,
  ODialog,
} from '@opensig/opendesign';

import summitData from '~@/data/summit';
import activityData from '~@/data/activity';
import { type CalendarValueT } from '~@/@type/type-home';

import dayjs from 'dayjs';

import IconLeft from '~icons/app-new/icon-chevron-left.svg';
import IconRight from '~icons/app-new/icon-chevron-right.svg';
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
import { oaReport } from '@/shared/analytics';
import { vAnalytics } from '~@/directive/analytics';
import useInViewDuration from '~@/composables/useInViewDuration';

import { getMeetingDateListApi, getMeetingListApi, getGroupInfosApi } from '~@/api/api-meeting';
import { showGuard, getUserAuth } from '@/shared/login';
import { useLocale } from '~@/composables/useLocale';
import { formatDate } from '~@/utils/common';
import { getPointStr } from '~@/utils/meeting';
import { INTERVAL_DAY, INTERVAL_WEEK, INTERVAL_MONTH } from '~@/config/meeting';

import { useIdentities } from '~@/stores/common';

const props = defineProps({
  shownIcon: {
    type: Boolean,
    default: true,
  },
});

const commonStore = useCommon();
const message = useMessage();
const { t, locale } = useLocale();
const identitiesStore = useIdentities();

const TODAY = dayjs(new Date()).format('YYYY-MM-DD');

const recentMeetingDates = ref([] as string[]);

const activeName = ref<number[]>([]);

// 日历展示时间限制
const limitTime = '2021 年 1 月';
// 会议详情配置
const meetingItem = [
  { text: t('home.meetingDetail'), key: 'agenda' },
  { text: t('home.meetingCreator'), key: 'sponsor' },
  { text: t('home.meetingDate'), key: 'timeRange' },
  { text: t('home.meetingPlatform'), key: 'platform' },
  { text: t('home.meetingId'), key: 'mid' },
  { text: t('home.meetingLink'), key: 'join_url' },
  { text: t('home.meetingEtherpad'), key: 'etherpad' },
  { text: t('home.meetingRecord'), key: 'replay_url' },
  { text: t('home.meetingRecord'), key: 'video_url' },
];
// 活动、峰会详情配置
const activityItem = [
  { text: t('home.startDate'), key: 'start_date' },
  { text: t('home.endDate'), key: 'end_date' },
  { text: t('home.activityAddress'), key: 'address' },
];

const activityType = ['线下', '线上', '线上 + 线下'];
const titleList = [
  {
    label: t('home.meetingTypeAll'),
    value: 'all',
    icon: IconAll,
  },
  {
    label: t('home.meetingTypeMeet'),
    value: 'meeting',
    icon: IconMeet,
  },
  {
    label: t('home.meetingTypeActivity'),
    value: 'activity',
    icon: IconEvent,
  },
  {
    label: t('home.meetingTypeSummit'),
    value: 'summit',
    icon: IconSummit,
  },
];
const tabType = ref(titleList[0].value);
const calendar = ref();
const calendarHeight = ref<string>('407px');
const isLimit = ref(false);

// 当前选择日期的会议事件
const currentCalendarData = shallowRef<Record<string, any>[]>([]);

const selectedDate = ref();
// 当前选择日期字符串
const selectedDateStr = computed(() => dayjs(selectedDate.value).format('YYYY-MM-DD'));

const updateCurrentDayMeetings = async (date: string) => {
  const currentDate = dayjs(date);
  if (
    !recentMeetingDates.value.length ||
    dayjs(recentMeetingDates.value[0]).isAfter(currentDate) ||
    dayjs(recentMeetingDates.value[recentMeetingDates.value.length - 1]).isBefore(currentDate)
  ) {
    await getRecentMeetingDates();
  }
  
  if (recentMeetingDates.value.includes(date) || getSummitHighlight(date, activityData) || getSummitHighlight(date, summitData)) {
    queryMeetingDates(date, '');
  } else {
    currentCalendarData.value = [];
  }
};

// 计算最新日程
const latestSchedule = computed(() => {
  const now = dayjs();
  const todayStr = now.format('YYYY-MM-DD');
  const nowTimestamp = now.unix();

  // 检查今天是否有活动
  let latest = recentMeetingDates.value.find((v) => v === todayStr);

  if (!latest) {
    let minUpcomingDate = null;
    let minTimestamp = Infinity;

    for (const date of recentMeetingDates.value) {
      const timestamp = dayjs(date).unix();
      if (timestamp >= nowTimestamp && timestamp < minTimestamp) {
        minUpcomingDate = date;
        minTimestamp = timestamp;
      }
    }

    // 如果有即将发生的活动就返回，否则返回第一个日期
    latest = minUpcomingDate || recentMeetingDates.value[0] || TODAY;
  }

  return latest;
});

// 查询指定日期的会议事件
const queryMeetingDates = async (date: string, group_name: string) => {
  const res = await getMeetingListApi(date, group_name);

  currentCalendarData.value = [];

  if (Array.isArray(res)) {
    currentCalendarData.value = res.map((item) => ({ ...item, type: 'meeting', d: item.mid }));
  }

  if (getSummitHighlight(selectedDateStr.value, activityData)) {
    currentCalendarData.value.push(getSummitHighlight(selectedDateStr.value, activityData));
  }

  if (getSummitHighlight(selectedDateStr.value, summitData)) {
    currentCalendarData.value.push(getSummitHighlight(selectedDateStr.value, summitData));
  }

  activeName.value = currentCalendarData.value.length === 1 ? [currentCalendarData.value[0].id] : [];
};

const calendarData = computed(() => {
  if (tabType.value === 'all') return currentCalendarData.value;
  return currentCalendarData.value.filter((item) => tabType.value === item.type);
});

const displayCalendarData = computed(() => {
  return calendarData.value.map((v) => {
    const { is_cycle, date, start, end, cycle_start_date, cycle_end_date, cycle_start, cycle_end, cycle_type, cycle_interval, cycle_point, type } = v;
    let dateRange = `${formatDate(date)} ${start} - ${end}`;
    if (['activity', 'summit'].includes(type)) {
      dateRange = `${formatDate(v.start_date, 'YYYY/MM/DD HH:mm')} - ${formatDate(v.end_date, 'YYYY/MM/DD HH:mm')}`;
    }
    if (is_cycle) {
      dateRange = `${formatDate(cycle_start_date)} - ${formatDate(cycle_end_date)}`;
    }

    let timeRange = `${start} - ${end}`;
    let replay_url = null;
    let hasObsData = false;
    const obsData = v.obs_data?.filter((v) => v.text_video_url) || [];

    if (is_cycle) {
      let cycleType = '';
      if (cycle_type === INTERVAL_DAY) {
        cycleType = t('home.cycleDay');
      }
      if (cycle_type === INTERVAL_WEEK) {
        if (cycle_interval > 1) {
          cycleType = t('home.cycleWeek.other', [getPointStr(cycle_type, cycle_point), cycle_interval]);
        } else {
          cycleType = t('home.cycleWeek.one', [getPointStr(cycle_type, cycle_point)]);
        }
      }
      if (cycle_type === INTERVAL_MONTH) {
        cycleType = t('home.cycleMonth', [getPointStr(cycle_type, cycle_point)]);
      }
      timeRange = t('home.cycleMeetingText2', {
        startDate: cycle_start_date,
        endDate: cycle_end_date,
        startTime: cycle_start,
        endTime: cycle_end,
        cycleType,
      });
      hasObsData = obsData.some((t) => t.sub_id === v.cycle_sub.find((z) => z.date === selectedDateStr.value)?.sub_id);
    } else {
      hasObsData = obsData.length > 0;
    }

    if (hasObsData) {
      replay_url = `${location.origin}/${locale.value}/video/${v.group_name}/${v.mid}/${selectedDateStr.value}`;
    } else if (v?.video_url) {
      replay_url = v?.video_url;
    }

    return {
      ...v,
      dateRange,
      timeRange,
      replay_url,
    };
  });
});

watch(selectedDateStr, updateCurrentDayMeetings);

watch(
  () => displayCalendarData.value.length,
  (length) => {
    if (length === 1) {
      activeName.value = [displayCalendarData.value[0].id];
      return;
    }
    activeName.value = [];
  },
  { immediate: true, flush: 'post' }
);

const selectDate = (val: string, date: string) => {
  if (date === limitTime && val === 'prev-month') {
    isLimit.value = true;
    return;
  }
  isLimit.value = false;
  calendar.value.selectDate(val);
};

// --------------------获取会议平台名称-----------------------------
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

// --------------------监听日历高度变化-----------------------------
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
const getSummitHighlight = (date: string, data: CalendarValueT[]) => {
  return data.find((item) => {
    return item.dates?.includes(date);
  });
};

// --------------------获取近期有会议的日期-----------------------------
const getRecentMeetingDates = async () => {
  const res = await getMeetingDateListApi(selectedDateStr.value);
  recentMeetingDates.value = (res || []).sort((a, b) => dayjs(a).unix() - dayjs(b).unix());
};

// -------------------- 获取会议权限 --------------------
const hasPermMeeting = ref(false);
const getPermissionMeeting = () => {
  getGroupInfosApi()
    .then((res) => {
      hasPermMeeting.value = res.some((item) => item.group_name);
    })
    .catch(() => {
      hasPermMeeting.value = false;
    });
};

onMounted(async () => {
  selectedDate.value = new Date();
  getPermissionMeeting();
  // 设置右侧 日程列表高度
  const tbody = document.querySelector(
    '.calendar-body .el-calendar__body'
  ) as HTMLElement;
  if (tbody) {
    watchChange(tbody);
    calendarHeight.value = `${tbody.offsetHeight - 2}px`;
  }
  // 获取近期有会议的日期
  await getRecentMeetingDates();

  if (
    recentMeetingDates.value.includes(selectedDateStr.value) ||
    getSummitHighlight(selectedDateStr.value, activityData) ||
    getSummitHighlight(selectedDateStr.value, summitData)
  ) {
    queryMeetingDates(selectedDateStr.value, '');
  }
});

// ------------埋点------------
const onClickDate = (e: Event, day: string) => {
  if (!e.isTrusted) return;
  return {
    target: day,
  };
};

const container = ref();

// 元素可视停留时间
useInViewDuration(container, (duration) => {
  oaReport('ElementExposure', {
    module: 'homepage',
    level1: t('home.calendar'),
    duration,
  });
});

watch(
  () => tabType.value,
  (val) => {
    oaReport('click', {
      module: 'homepage',
      level1: t('home.calendar'),
      level2: titleList.find((item) => item.value === val)?.label || '',
      type: 'tab',
    });
  }
);

const bindVisible = ref(false);
const toCreateMeeting = () => {
  const identitiesVisible = identitiesStore.identities?.some(item => item.identity === 'gitee' || item.identity === 'gitcode');

  const { token } = getUserAuth();
  if (!token) {
    showGuard();
  } else if (!identitiesVisible) {
    bindVisible.value = true;
  } else if (!hasPermMeeting.value) {
    return message.warning({
      content: t('home.meetingDesc'),
    });
  } else {
    window.open(`/${locale.value}/my/create-meeting`)
  }
};

const jumpDetail = (url: string) => {
  window.open(url, '_blank');
};

const toBind = () => {
  window.open(`/${locale.value}/my/settings`, '_blank');
  bindVisible.value = false;
};
const cancel = () => {
  bindVisible.value = false;
};
</script>
<template>
  <AppSection
    :title="t('home.calendar')"
    class="home-calendar"
    ref="container"
    v-analytics.bubble.noTrigger="{ level1: t('home.calendar') }"
  >
    <div class="calendar-header">
      <span>{{ t('home.meetingDesc') }}</span>
      <OButton color="primary" variant="solid" size="large" @click="toCreateMeeting">
        {{ t('home.meetingBook') }}
      </OButton>
    </div>
    <div class="calendar-body">
      <el-calendar v-if="selectedDate" ref="calendar" class="calender" v-model="selectedDate">
        <template #header="{ date }">
          <div class="left-title">
            <OIcon @click="selectDate('prev-month', date)" v-analytics.bubble="{ target: date, type: 'prev-month' }">
              <IconLeft :class="{ disable: isLimit }"></IconLeft>
            </OIcon>
            <span class="month-date">{{ date }}</span>
            <OIcon @click="selectDate('next-month', date)" v-analytics.bubble="{ target: date, type: 'next-month' }">
              <IconRight></IconRight>
            </OIcon>
          </div>
          <div class="right-title">
            {{ t('home.latestMeeting') }}
            <span>{{ latestSchedule }}</span>
          </div>
        </template>
        <template #date-cell="{ data }">
          <div
            class="out-box"
            :class="{ 'has-calender': recentMeetingDates.includes(data.day) }"
            v-analytics.bubble="(ev) => onClickDate(ev, data.day)"
          >
            <div class="day-box">
              <p class="date-calender">
                {{ removeLeadingZero(data.day.split('-').at(-1) || '') }}
              </p>
              <div class="icon-box">
                <OIcon
                  class="meeting"
                  v-if="
                    (tabType === 'all' || tabType === 'meeting') &&
                    recentMeetingDates.includes(data.day)
                  "
                >
                  <IconMeet></IconMeet>
                </OIcon>
                <OIcon
                  class="summit"
                  v-if="
                    (tabType === 'all' || tabType === 'summit') &&
                    getSummitHighlight(data.day, summitData)
                  "
                >
                  <IconSummit></IconSummit>
                </OIcon>
                <OIcon
                  class="activity"
                  v-if="
                    (tabType === 'all' || tabType === 'activity') &&
                    getSummitHighlight(data.day, activityData)
                  "
                >
                  <IconEvent></IconEvent>
                </OIcon>
              </div>
            </div>
          </div>
        </template>
      </el-calendar>
      <div class="detail-list">
        <div class="current-day">
          {{ t('home.latestMeeting') }}
          <span>{{ latestSchedule }}</span>
        </div>
        <div class="right-title">
          <div class="title-list">
            <OTab v-model="tabType" :line="false">
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
              v-if="displayCalendarData.length"
              v-model="activeName"
              accordion
              :style="{ '--collapse-padding': '0' }"
            >
              <OCollapseItem
                v-for="(item, index) in displayCalendarData"
                :key="index"
                :value="item.id"
              >
                <template #title>
                  <div class="meet-title" :title="item.name || item.title || item.topic">
                    <OIcon :class="item.type || 'meeting'">
                      <IconSummit v-if="item.type === 'summit'"></IconSummit>
                      <IconEvent
                        v-else-if="item.type === 'activity'"
                      ></IconEvent>
                      <IconMeet v-else></IconMeet>
                    </OIcon>
                    <div class="text">
                      {{ item.name || item.title || item.topic }}
                    </div>
                    <div class="tag-wrapper" v-if="item.is_cycle">
                      <OTag color="primary" variant="outline">{{ t('home.cycle') }}</OTag>
                    </div>
                  </div>
                  <div class="meet-info">
                    <span class="start-time">
                      <span>{{ item.dateRange }}</span>
                    </span>
                    <ODivider direction="v" />
                    <div v-if="item.group_name">
                      {{ t('home.sigs') }} {{ item.group_name }}
                    </div>
                    <div v-if="item.activity_type">
                      {{ item.activity_type }}
                    </div>
                  </div>
                  <OLink
                    v-if="item.type !== 'meeting' && (item.url || item.content_url)"
                    color="normal"
                    class="jump-detail-link"
                    @click.stop="jumpDetail(item.url || item.content_url)"
                  >
                    {{ t('home.viewDetail') }}
                    <template #suffix>
                      <OIcon><IconChevronRight /> </OIcon>
                    </template>
                  </OLink>
                </template>
                <div class="calendar-info">
                  <template v-for="keys in item.type === 'meeting' ? meetingItem : activityItem" :key="keys.key">
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
                        v-analytics.bubble="{
                          level2: tabType,
                          level3: item.name || item.title || item.topic,
                          level4: item.group_name,
                          target: item[keys.key],
                        }"
                        >{{ item[keys.key] }}</a
                      >
                      <p v-else>
                        {{
                          keys.key === 'platform'
                            ? transformKey(item[keys.key]?.toLowerCase())
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
              <p>{{ t('home.meetingEmptyText') }}</p>
            </div>
          </OScroller>
        </div>
      </div>
    </div>
    <img
      v-if="shownIcon"
      class="cube-1"
      :src="commonStore.theme === 'light' ? cubeOne : cubeOneDark"
      alt=""
    />
    <img
      v-if="shownIcon"
      class="cube-2"
      :src="commonStore.theme === 'light' ? cubeTow : cubeTowDark"
    />
    <ODialog
      v-model:visible="bindVisible"
      :style="{
        '--dlg-width': '450px',
        '--dlg-radius': 'var(--o-radius-xs)',
      }"
    >
      <template #header>{{ t('home.permTitle') }}</template>
      <div class="dialog-content">{{ t('home.permDesc') }}</div>
      <template #footer>
        <div class="dialog-footer blue-theme">
          <OButton color="primary" variant="solid" size="large" @click="toBind">{{ t('home.toBind') }}</OButton>
          <OButton color="primary" variant="outline" size="large" @click="cancel">{{ t('home.cancel') }}</OButton>
        </div>
      </template>
    </ODialog>
  </AppSection>
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
.activity {
  background-color: #ffa122;
  z-index: 1;
}
.o-link {
  --link-icon-size: 16px;
}

.calendar-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--o-color-info2);
  column-gap: var(--o-gap-5);
  margin-top: var(--o-gap-t2c);
  @include respond-to('<=pad_v') {
    margin-top: 12px;
  }
}

.home-calendar {
  :deep(.section-body) {
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .calendar-body {
    display: flex;
    margin-top: 24px;
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
        thead {
          th {
            padding: 12px 0 16px 20px;
            text-align: left;
            color: var(--o-color-info3);
            @include text1;
            @include respond-to('<=pad_v') {
              padding: 0;
              text-align: center;
            }
          }
        }
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
        @include respond-to('<=pad') {
          height: fit-content;
        }
        @include respond-to('<=pad_v') {
          display: flex;
          justify-content: center;
          padding: 0;
          height: fit-content;
        }

        .out-box {
          position: relative;
          border-radius: var(--o-radius-xs);
          padding: 6px 12px;
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
          .day-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
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
              @include respond-to('<=pad_v') {
                height: 6px;
                width: 6px;
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
          $size: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: 24px;
          line-height: 24px;
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
        @include respond-to('pad_v-laptop') {
          --tab-nav-padding: 0 0 14px;
        }
        @include respond-to('<=pad_v') {
          height: auto;
          .o-icon {
            display: none;
          }
        }
      }
      $icon-size: 24px;

      .meet-title {
        display: flex;
        align-items: center;
        color: var(--o-color-info1);
        @include text2;
        .tag-wrapper {
          margin-left: var(--o-gap-2);
          .o-tag {
            background-color: rgba(235, 241, 250);;
            border: none;
          }
        }
        .o-icon {
          flex-shrink: 0;
          padding: 2px;
          border-radius: 50%;
          overflow: hidden;
          color: var(--o-color-white);
          margin-right: 12px;
          width: 24px;
          height: 24px;
          font-size: 24px;
          @include respond-to('<=pad_v') {
            font-size: 20px;
            width: 20px;
            height: 20px;
          }
        }
        .text {
          @include text-truncate(1);
          display: block;
        }
      }
      .meet-info {
        margin-left: 36px;
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: var(--o-color-info3);
        text-decoration: none;
        @include tip1;
        @include respond-to('<=pad_v') {
          margin-left: 32px;
        }

        .o-divider {
          @include tip1;
        }

        &.hidden-divider {
          .start-time {
            padding-right: 24px;
          }
          .o-divider {
            display: none;
          }
        }
      }
      .jump-detail-link {
        padding-left: 36px;
        color: var(--o-color-info1);
        @include tip1;
        @include hover {
          color: var(--o-color-primary1);
        }
      }
    }
    .meeting-list {
      height: v-bind('calendarHeight');
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
        background-color: #f7f9fd;
        margin-bottom: 0;
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
      padding: 16px 60px;
      @include respond-to('<=pad_v') {
        padding: 12px 16px;
      }
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

@include in-dark {
  .home-calendar {
    .calendar-body {
      :deep(.o-collapse) {
        .o-collapse-item-body {
          background-color: #2b2b2f;
        }
      }
    }
  }
}

.cube-1,
.cube-2 {
  position: absolute;
  top: -104px;
  left: -110px;
  width: 320px;
  z-index: -1;
  @include respond-to('laptop') {
    width: 327px;
    top: -180px;
    left: -210px;
  }
  @include respond-to('pad_h') {
  }
  @include respond-to('<=pad_v') {
    width: 84px;
    top: -50px;
    left: -4px;
  }
  @include respond-to('phone') {
    width: 54px;
    top: -32px;
    left: 3px;
  }
}
.cube-2 {
  left: inherit;
  top: inherit;
  width: 380px;
  bottom: -181px;
  right: -220px;
  @include respond-to('laptop') {
    width: 400px;
    bottom: -200px;
    right: -240px;
  }
  @include respond-to('pad_h') {
    right: -140px;
    bottom: -150px;
  }
  @include respond-to('<=pad_v') {
    width: 71px;
    bottom: -40px;
    right: -8px;
  }
}

.dialog-content {
  color: var(--o-color-info1);
  @include text1;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  .o-btn + .o-btn {
    margin-left: 16px;
  }
}
</style>

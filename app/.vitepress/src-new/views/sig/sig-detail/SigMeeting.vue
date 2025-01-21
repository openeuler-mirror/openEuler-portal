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
import { useData } from 'vitepress';

import {
  OPopover,
  OScroller,
  OCollapse,
  OCollapseItem,
  OIcon,
  OTag,
  OLink,
} from '@opensig/opendesign';

import IconTips from '~icons/app-new/icon-help.svg';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';
import IconMeet from '~icons/home/icon-meet.svg';

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

const renderData = ref<TableDataT>({
  date: '',
  timeData: [],
});

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

function setMeetingDay(select: string) {
  const meetingData = JSON.parse(JSON.stringify(props.meetingData));
  currentMeet = meetingData.find((item: TableDataT) => {
    return item.date === select;
  });
  // 会议时间
  if (currentMeet?.date) {
    renderData.value = currentMeet;
    activeDay.value = select;
  }
}
// 判断会议时间修改提示
const isActive = ref(false);
const getTimeTip = (item: DayDataT) => {
  const startTime = new Date(
    currentMeet?.date + ' ' + item.startTime + ':00'
  ).getTime();
  const endTime = new Date(
    currentMeet?.date + ' ' + item.endTime + ':00'
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
onMounted(() => {
  setMeetingDay(props.meetingData[0].date);
});
// 切换会议日期
function handleCommand(date: string) {
  setMeetingDay(date);
}
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
const activeName = ref<number[]>([0]);
</script>
<template>
  <div class="sig-meeting">
    <div class="meeting-title">
      {{ $t('sig.sigMeeting') }}
    </div>
    <div class="meeting-title-intro">
      {{ $t('sig.sigMeetingIntro') }}
    </div>
    <div class="sig-meeting-card">
      <div class="card-title">
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
        {{ $t('sig.latestMeeting', { date: activeDay.replaceAll('-', '/') }) }}
      </div>
      <div class="card-body">
        <OScroller class="date-list" show-type="hover" size="small">
          <div class="card-body-date">
            <div
              v-for="([year, dates], index) in transformDateArrayToMap"
              :key="index"
              class="year-date"
            >
              <div class="year">
                {{ year }}
              </div>
              <div
                v-for="(date, dateIndex) in dates"
                :key="dateIndex"
                class="month"
                :class="{ active: date === activeDay }"
                @click="handleCommand(date)"
              >
                {{ date.split('-')[1] + '/' + date.split('-')[2] }}
              </div>
            </div>
          </div>
        </OScroller>
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
                  <OIcon :class="item.type || 'meeting'">
                    <IconMeet></IconMeet>
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
  </div>
</template>
<style lang="scss" scoped>
.sig-meeting {
  .meeting-title {
    @include h4;
    font-weight: 500;
  }
  .meeting-title-intro {
    margin-top: 8px;
    @include text1;
  }
  .sig-meeting-card {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: var(--o-radius-xs);
    background-color: var(--o-color-fill2);
    height: 400px;
    .card-title {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      font-weight: 500;
      @include text1;
      .o-icon {
        cursor: pointer;
        margin-right: 8px;
        color: var(--o-color-control3);
        font-size: var(--o-icon_size-xs);
      }
    }
    .card-body {
      display: flex;
      width: 100%;
      max-height: calc(400px - 54px);
      border-top: 1px solid var(--o-color-control4);
      .date-list {
        padding: 24px;
        flex-shrink: 0;
        border-right: 1px solid var(--o-color-control4);
      }
      .card-body-date {
        .year-date {
          font-weight: 500;
          @include tip1;
          &:not(:first-child) {
            margin-top: 12px;
          }
          & > div:not(:first-child) {
            margin-top: 8px;
          }
          .month {
            cursor: pointer;
            padding: 8px 24px;
            border: 1px solid var(--o-color-control4);
            border-radius: var(--o-radius-xs);
            width: fit-content;
          }
          .active {
            border-color: var(--o-color-primary1);
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
      .card-body-info {
        width: 100%;
      }
      $icon-size: 24px;
      :deep(.o-collapse-item-title) {
        display: flex;
      }
      .meeting {
        background-color: #007af0;
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
          @include tip1;
          color: var(--o-color-info3);
        }

        .text {
          @include text-truncate(1);
          display: block;
          width: 100%;
          margin-right: 8px;
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
        @include respond-to('<=pad_v') {
          margin-left: 32px;
        }
        .o-divider {
          @include tip1;
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
}
</style>

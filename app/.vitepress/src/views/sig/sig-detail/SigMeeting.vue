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
import { useI18n } from '@/i18n';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconDown from '~icons/app/icon-chevron-down.svg';
import IconTip from '~icons/app/icon-tip.svg';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import useWindowResize from '@/components/hooks/useWindowResize';

const props = defineProps({
  tableData: {
    type: Array as PropType<TableDataT[]>,
    default: () => {
      return {};
    },
  },
  meetingDetail: {
    type: String,
    default: '',
  },
  oldEmail: {
    type: String,
    default: '',
  },
});
const commonStore = useCommon();
let currentMeet = reactive<TableDataT>({
  date: '',
  timeData: [],
});

const meetRef = ref();

const renderData = ref<TableDataT>({
  date: '',
  timeData: [],
});

const currentDay = ref('');
const activeName = ref('');
const isCollapse = ref(false);
const i18n = useI18n();
const activeDay = ref('');
const sigData = computed(() => {
  return i18n.value.sig.SIG_DETAIL;
});

const detailItem = [
  { text: '会议详情', key: 'detail', isLink: false },
  { text: '发起人', key: 'creator', isLink: false },
  { text: '会议日期', key: 'date', isLink: false },
  { text: '会议时间', key: 'duration_time', isLink: false },
  { text: '会议ID', key: 'meeting_id', isLink: false },
  { text: '会议链接', key: 'join_url', isLink: true },
  { text: 'Etherpad链接', key: 'etherpad', isLink: true },
  { text: '活动介绍', key: 'synopsis', isLink: false },
  { text: '起始日期', key: 'start_date', isLink: false },
  { text: '结束日期', key: 'end_date', isLink: false },
  { text: '活动形式', key: 'activity_type', isLink: false },
  { text: '线上链接', key: 'online_url', isLink: true },
  { text: '报名链接', key: 'register_url', isLink: true },
  { text: '活动地点', key: 'address', isLink: false },
  { text: '回放链接', key: 'replay_url', isLink: true },
  { text: '回放链接', key: 'video_url', isLink: true },
];
const activityType = ['线下', '线上', '线上 + 线下'];
const meetingTip = ref(
  'SIG 版本规划工作会议遵循开源、开放原则，议题收集、技术讨论、会议纪要等各讨论过程均对外开放。'
);
const windowWidth = ref(useWindowResize());

let meetingData = reactive<TableDataT[]>([]);

function setMeetingDay(select?: string) {
  const meetingData = JSON.parse(JSON.stringify(props.tableData));
  if (select) {
    currentMeet = meetingData.find((item: TableDataT) => {
      return item.date === select;
    });
  } else {
    // 获取距离今日最近的一条数据 优先展示未开的会议
    currentMeet = meetingData.find((item: TableDataT) => {
      const startTime = new Date(
        `${item.date} ${item.timeData[0].endTime?.replace('-', ':')}`
      ).getTime();
      const newDate = new Date().getTime();
      return newDate < startTime;
    });
    if (!currentMeet) {
      currentMeet = meetingData.pop();
    }
    currentDay.value = currentMeet?.date;
    activeDay.value = currentMeet?.date;
  }
  // 会议时间
  if (currentMeet?.date) {
    renderData.value = currentMeet;
    nextTick(() => {
      if (meetRef.value?.length && !select) {
        meetRef.value[0].click();
      }
    });
  }
}
// 判断会议时间修改提示
const isActive = ref(false);
function handleTimeTip(item: DayDataT) {
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
}
onMounted(() => {
  setMeetingDay();
});
function goDetail(index: number) {
  window.open(
    `/zh/interaction/event-list/detail/?id=${renderData.value.timeData[index].id}&isMini=1`
  );
}
function changeCollapse() {
  isCollapse.value = !isCollapse.value;
}

const resolveDate = (date: string) => {
  if (!date) return;
  const reg = /(\d{4})\-(\d{2})\-(\d{2})/;
  date = date.replace(reg, '$1年$2月$3日');
  return date;
};
const sigDetailName = ref('');

function getUrlParam(paraName: any) {
  const searchList = location.search.split('?');
  if (searchList.length > 1) {
    const paraList = searchList[1].split('&');
    let arr;
    for (let i = 0; i < paraList.length; i++) {
      arr = paraList[i].split('=');
      if (arr !== null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}
const meetingSummaryLink = computed(() => {
  return `https://etherpad.openeuler.org/p/${sigDetailName.value}-meetings`;
});
onMounted(() => {
  sigDetailName.value = getUrlParam('name');
});
const watchData = watch(
  () => props.tableData.length,
  () => {
    if (isBrowser()) {
      meetingData = JSON.parse(JSON.stringify(props.tableData));
      meetingData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
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
function handleClickBtn(link = '') {
  window.open(link, '_blank');
}
function handleCommand(date: string) {
  activeDay.value = date;
  setMeetingDay(date);
}
</script>
<template>
  <div class="main-body">
    <div class="communication-info">
      <div class="info-head">{{ sigData.COMMUNICATION_INFO }}</div>
      <div class="info-body">
        <h5>{{ sigData.MAIL_LIST }}</h5>
        <p class="email">
          <a
            :href="oldEmail ? `mailto:${oldEmail}` : `mailto:dev@openeuler.org`"
            >{{ oldEmail || 'dev@openeuler.org' }}</a
          >
          <a
            v-if="
              (oldEmail?.split('@').length &&
                oldEmail?.split('@')[1] === 'openeuler.org') ||
              !oldEmail
            "
            :href="`https://mailweb.openeuler.org/postorius/lists/${
              oldEmail || 'dev@openeuler.org'
            }/`"
            target="_blank"
            rel="noopener noreferrer"
            class="subscribe"
            >{{ i18n.mailing.MAILING_LIST.SUBSCRIBE.BUTTON }}</a
          >
        </p>
        <h5 class="meeting-title">{{ sigData.MEETING_TITLE }}</h5>
        <p
          v-dompurify-html="meetingDetail ? meetingDetail : meetingTip"
          class="meeting-tip"
        ></p>
        <OButton
          type="text"
          class="meeting-bth"
          @click="handleClickBtn(meetingSummaryLink)"
          >{{ sigData.MEETING_SUMMARY }}

          <template #suffixIcon>
            <OIcon><IconArrowRight /></OIcon>
          </template>
        </OButton>
      </div>
    </div>
    <div class="detail-list">
      <div class="detail-head">
        <div v-if="currentDay">
          <span v-show="activeDay === currentDay">{{
            sigData.LATEST_MEETING + '：'
          }}</span>
          <span class="current-day">{{ resolveDate(activeDay) }}</span>
          <ClientOnly>
            <ODropdown
              v-if="currentDay"
              :max-height="200"
              trigger="click"
              @command="(val: string) => handleCommand(val)"
            >
              <span class="el-dropdown-link">
                <OIcon>
                  <icon-down></icon-down>
                </OIcon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <ODropdownItem
                    v-for="item in meetingData"
                    :key="item.date"
                    :class="{ active: item.date === activeDay }"
                    :command="item.date"
                    >{{ resolveDate(item.date) }}</ODropdownItem
                  >
                </el-dropdown-menu>
              </template>
            </ODropdown>
          </ClientOnly>
          <OIcon class="tip">
            <icon-tip></icon-tip>
            <div class="tip-text">会议系统当前仅保留最近半年会议记录</div>
          </OIcon>
        </div>
      </div>
      <div class="meeting-list">
        <div
          v-if="
            (renderData.timeData.length && renderData.date) ||
            renderData.timeData.length
          "
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
                  <div ref="meetRef" class="meet-item">
                    <div class="meet-left">
                      <div class="left-top">
                        <p class="meet-name">{{ item.name || item.title }}</p>
                        <p class="time-tip" :class="{ 'active-tip': isActive }">
                          {{ handleTimeTip(item) }}
                        </p>
                      </div>
                      <div
                        v-if="item.group_name"
                        class="group-name more-detail"
                      >
                        {{ sigData.SIG_GROUP }} {{ item.group_name }}
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
                        {{ sigData.LEARN_MORE }}
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
                      <p
                        v-if="
                          !keys.isLink &&
                          keys.key !== 'activity_type' &&
                          keys.key !== 'date'
                        "
                      >
                        {{ item[keys.key] }}
                      </p>
                      <p
                        v-else-if="
                            keys.isLink &&
                            item[keys.key] &&
                            !(item[keys.key] as string).startsWith('http')
                          "
                      >
                        {{ item[keys.key] }}
                      </p>
                      <a
                        v-else-if="keys.isLink"
                        :href="item[keys.key]"
                        target="_blank"
                        rel="noopener noreferrer"
                        >{{ item[keys.key] }}</a
                      >
                      <p
                        v-else-if="
                          keys.key === 'activity_type' && item.activity_type
                        "
                      >
                        {{ activityType[item.activity_type - 1] }}
                      </p>
                      <p v-else>{{ currentDay }}</p>
                    </div>
                  </template>
                  <div v-if="item.schedules" class="mo-learn-more">
                    <OButton
                      animation
                      size="mini"
                      type="outline"
                      @click.stop="goDetail(index)"
                    >
                      {{ sigData.LEARN_MORE }}
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
          <p>{{ sigData.EMPTY_TEXT }}</p>
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
      color: var(--o-color-brand1);
      fill: var(--o-color-brand1);
    }
  }
}
.main-body {
  display: flex;
  box-shadow: var(--o-shadow-l2);
  .communication-info {
    max-width: 456px;
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
    .info-head {
      line-height: 22px;
      padding: var(--o-spacing-h6);
      text-align: center;
      color: var(--o-color-text4);
      background-color: var(--o-color-bg4);
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h8) 0;
        font-size: var(--o-font-size-tip);
      }
    }
    .info-body {
      padding: var(--o-spacing-h4) var(--o-spacing-h2);
      background-color: var(--o-color-bg2);
      overflow-y: hidden;
      height: 274px;
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h5);
        font-size: var(--o-font-size-tip);
        height: auto;
      }
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        font-weight: 400;
        color: var(--o-color-text1);
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .email {
        display: flex;
        align-items: center;
        .subscribe {
          cursor: pointer;
          color: var(--o-color-brand1);
          padding: 2px 11px;
          margin-left: 8px;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          border: 1px solid var(--o-color-brand1);
          &:hover {
            border: 1px solid var(--o-color-brand2);
          }
        }
      }

      p {
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text4);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      .meeting-title {
        margin-top: var(--o-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h6);
        }
      }
      .meeting-tip {
        max-height: 60px;
        overflow: auto;
        scroll-behavior: smooth;
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: var(--o-color-bg4);
        }
        &::-webkit-scrollbar {
          width: 4px;
        }
        &::-webkit-scrollbar-track {
          border-radius: 0;
          background: var(--o-color-bg2);
        }
        @media screen and (max-width: 768px) {
          max-height: 100%;
        }
      }
      .meeting-bth {
        padding: 0;
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-text);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h6);
          font-size: var(--o-font-size-tip);
        }
        &:hover {
          :deep(.suffix-icon) {
            transform: translateX(3px);
            @media screen and (max-width: 768px) {
              transform: translateX(0);
            }
          }
        }
        :deep(.suffix-icon) {
          color: var(--o-color-brand1);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-text);
          }
        }
      }
    }
  }
  .collapse-box-mo {
    .left-title {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    display: block;
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
  :deep(.detail-list) {
    flex: 1;
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
      position: relative;
      display: flex;
      min-height: 46px;
      align-items: center;
      justify-content: center;
      line-height: 22px;
      text-align: center;
      color: var(--o-color-text4);
      background-color: var(--o-color-bg4);
      .el-dropdown {
        color: var(--o-color-text4);
        font-size: var(--o-font-size-h8);
        .el-dropdown-link {
          display: flex;
          align-items: center;
        }
        .o-icon {
          margin-left: 8px;
          font-size: var(--o-font-size-h5);
        }
      }
      .tip {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 24px;
        font-size: var(--o-font-size-h5);
        &:hover {
          .tip-text {
            display: block;
          }
        }
        .tip-text {
          display: none;
          position: absolute;
          width: max-content;
          font-size: 12px;
          top: -40px;
          right: -24px;
          padding: 8px 16px;
          color: var(--o-color-text4);
          background-color: var(--o-color-bg2);
          border: 1px solid var(--o-color-brand1);
          &::after {
            content: ' ';
            position: absolute;
            border-top: 8px solid var(--o-color-brand1);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -8px;
            right: 27px;
          }
          &::before {
            content: ' ';
            position: absolute;
            border-top: 8px solid var(--o-color-brand1);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid var(--o-color-bg2);
            right: 27px;
            bottom: -7px;
            z-index: 1;
          }
        }
      }
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h8) 0;
        font-size: var(--o-font-size-tip);
      }
    }

    .meeting-list {
      padding: var(--o-spacing-h8) 0 0 var(--o-spacing-h8);
      height: 274px;
      background-color: var(--o-color-bg2);
      overflow-y: scroll;
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
            .time-tip {
              background-color: var(--o-color-neutral9);
              color: var(--o-color-black);
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              white-space: nowrap;
              padding: 0 8px;
              &.active-tip {
                background-color: var(--o-color-yellow5);
              }
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
        height: 186px;
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

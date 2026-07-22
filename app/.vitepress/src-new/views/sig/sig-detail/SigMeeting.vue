<script setup lang="ts">
import { ref, PropType, watch } from 'vue';

import { OMeetingSigCalendar } from '@opendesign-plus/components';

import { TableDataT } from '@/shared/@types/type-calendar';;
import { useData } from 'vitepress';

import activityContent from '#content/activity';
import { foldI18n } from '~@/shared/content';

import { type CalendarValueT } from '~@/@type/type-home';

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
  sigName: {
    type: String,
    default: '',
  }
});

const { lang } = useData();

const expandDates = (start: string, end: string): string[] => {
  if (!start || !end) return [];
  const dates: string[] = [];
  const s = new Date(start.split(' ')[0]);
  const e = new Date(end.split(' ')[0]);
  const cur = new Date(s);
  while (cur <= e) {
    dates.push(cur.toISOString().split('T')[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
};

const FORMAT_LABEL: Record<string, string> = { offline: '线下', online: '线上', hybrid: '线上 + 线下' };

const activityData = foldI18n(activityContent.events, (lang.value as string).includes('en') ? 'en' : 'zh').map((ev) => ({
  ...ev,
  name: ev.title,
  dates: expandDates(ev.start_date, ev.end_date),
  address: ev.address,
  type: 'activity',
  activity_type: FORMAT_LABEL[ev.format] || '',
  url: (ev.poster_image || ev.agenda_image) ? `/${lang.value}/interaction/event-list/detail/?id=${ev.id}` : '',
})) as CalendarValueT[];

// 过滤当前sig组的活动
const sigActivityData = (data: CalendarValueT) => {
  return data.filter(
    (item) => {
      return item.group_name === params.value?.sig;
    });
};

const dateList = ref([]);

// 获取会议日期数据
const getMeetingData = () => {
  props.meetingData.forEach((item) => {
    const itemJson = JSON.parse(JSON.stringify(item));
    dateList.value.push(itemJson?.date ? itemJson?.date : itemJson?.dates[0])
  });
};

watch(
  () => props.meetingData,
  () => {
    getMeetingData();
  },
  { immediate: true }
);


const getMeetingListRequest = async (date: string) => {
  return props.meetingData.filter((v: any) => v.date === date || v.cycle_sub?.some((v: any) => v.date === date));
};
const getEventsListRequest = async (date: string) => {
  return sigActivityData(activityData).filter((v: any) => v?.dates?.includes(date));
};
const getDateListRequest = async () => {
  return dateList.value;
};
</script>
<template>
  <OMeetingSigCalendar :sigName="sigName" :getMeetingListRequest="getMeetingListRequest" :getEventsListRequest="getEventsListRequest" :getDateListRequest="getDateListRequest"></OMeetingSigCalendar>
</template>
<style lang="scss" scoped></style>

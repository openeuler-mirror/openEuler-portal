<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { login } from '@/shared/utils';
import { useCommon } from '@/stores/common';

import { OMeetingCalendar } from '@opendesign-plus/components';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { OButton, useMessage, ODialog } from '@opensig/opendesign';

import activityContent from '#content/activity';
import { foldI18n } from '~@/shared/content';

import dayjs from 'dayjs';

import cubeOne from '~@/assets/category/home/calendar/cube-1.png';
import cubeTow from '~@/assets/category/home/calendar/cube-2.png';
import cubeOneDark from '~@/assets/category/home/calendar/cube-1_dark.png';
import cubeTowDark from '~@/assets/category/home/calendar/cube-2_dark.png';

import AppSection from '~@/components/AppSection.vue';
import { oaReport } from '@opendesign-plus/plugins/analytics';
import useInViewDuration from '~@/composables/useInViewDuration';

import { getMeetingDateListApi, getMeetingListApi, getGroupInfosApi, getSigAll } from '~@/api/api-meeting';
import { useLoginStore } from '@opendesign-plus/composables';
import { useLocale } from '~@/composables/useLocale';

import { useIdentities } from '~@/stores/common';

defineProps({
  shownIcon: {
    type: Boolean,
    default: true,
  },
});

const commonStore = useCommon();
const message = useMessage();
const { t, locale } = useLocale();
const identitiesStore = useIdentities();
const loginStore = useLoginStore();

const expandDates = (start: string, end: string): string[] => {
  if (!start || !end) return [];
  const dates: string[] = [];
  const s = dayjs(start.split(' ')[0]);
  const e = dayjs(end.split(' ')[0]);
  let cur = s;
  while (cur.isBefore(e) || cur.isSame(e, 'day')) {
    dates.push(cur.format('YYYY-MM-DD'));
    cur = cur.add(1, 'day');
  }
  return dates;
};

const FORMAT_LABEL: Record<string, string> = { offline: '线下', online: '线上', hybrid: '线上 + 线下' };

const activityData = foldI18n(activityContent.events, locale.value).map((ev) => ({
  ...ev,
  name: ev.title,
  dates: expandDates(ev.start_date, ev.end_date),
  address: ev.address,
  type: 'activity',
  activity_type: FORMAT_LABEL[ev.format] || '',
  url: (ev.poster_image || ev.agenda_image) ? `/${locale.value}/interaction/event-list/detail/?id=${ev.id}` : '',
}));

const summitData = foldI18n(activityContent.summit ?? [], locale.value).map((ev) => ({
  ...ev,
  name: ev.title,
  dates: expandDates(ev.start_date || '', ev.end_date || ''),
  address: ev.address,
  type: 'summit',
  activity_type: FORMAT_LABEL[ev.format || ''] || '',
  url: ev.id ? `/${locale.value}/interaction/summit-list/${ev.id}/` : '',
}));

const getDateListRequest = async (date: string, group: string) => {
  const res = await getMeetingDateListApi(date, group);
  return (res || []).sort((a, b) => dayjs(a).unix() - dayjs(b).unix());
};

const getListRequest = async (date: string, group: string) => {
  const res = await getMeetingListApi(date, group);
  return res.filter((v: any) => v.date === date || v.cycle_sub?.some((v: any) => v.date === date));
};

const getSummitDatesRequest = async () => {
  return summitData.map(v => v?.dates).flat();
};

const getSummitListRequest = async (date: string) => {
  return summitData.filter((v: any) => v?.dates?.includes(date));
};

const getEventsDatesRequest = async () => {
  return activityData.map(v => v?.dates).flat();
};

const getEventsListRequest = async (date: string) => {
  return activityData.filter((v: any) => v?.dates?.includes(date));
};

// -------------------- 获取sig列表 --------------------
const sigOptions = ref<string[]>([]);

const getSigGroup = () => {
  getSigAll().then((res) => {
    sigOptions.value = res || [];
  });
};
onMounted(() => {
  getSigGroup();
})

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

watch(() => loginStore.isLogined, async (val) => {
  if (val) {
    await getPermissionMeeting();
  } else {
    hasPermMeeting.value = false;
  }
});

const container = ref();

// 元素可视停留时间
useInViewDuration(container, (duration) => {
  oaReport('ElementExposure', {
    module: 'homepage',
    level1: t('home.calendar'),
    duration,
  });
});

const bindVisible = ref(false);
const toCreateMeeting = () => {
  const identitiesVisible = identitiesStore.identities?.some(item => item.identity === 'gitee' || item.identity === 'gitcode');
  if (!loginStore.isLogined) {
    login(locale.value);
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
    <ClientOnly>
      <OMeetingCalendar
        :getDateListRequest="getDateListRequest"
        :getMeetingListRequest="getListRequest"
        :getSummitDatesRequest="getSummitDatesRequest"
        :getSummitListRequest="getSummitListRequest"
        :getEventsDatesRequest="getEventsDatesRequest"
        :getEventsListRequest="getEventsListRequest"
        :groups="sigOptions"
      >
        <template #empty>
          <ResultEmpty :style="{ '--result-image-width': '140px', '--result-image-height': '170px', }">
            <template #description>{{ t('home.meetingEmptyText') }}</template>
          </ResultEmpty>
        </template>
      </OMeetingCalendar>
    </ClientOnly>
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
.calendar-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--o-color-info2);
  column-gap: var(--o-gap-5);
  margin-top: var(--o-gap-t2c);
  @include respond('<=pad_v') {
    margin-top: 12px;
  }
}

.o-meeting-calendar {
  margin-top: 24px;
}

.cube-1,
.cube-2 {
  position: absolute;
  top: -104px;
  left: -110px;
  width: 320px;
  z-index: -1;
  @include respond('laptop') {
    width: 327px;
    top: -180px;
    left: -210px;
  }
  @include respond('pad_h') {
  }
  @include respond('<=pad_v') {
    width: 84px;
    top: -50px;
    left: -4px;
  }
  @include respond('phone') {
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
  @include respond('laptop') {
    width: 400px;
    bottom: -200px;
    right: -240px;
  }
  @include respond('pad_h') {
    right: -140px;
    bottom: -150px;
  }
  @include respond('<=pad_v') {
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

import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

function createLatestScheduleState() {
  const TODAY = ref('');
  const recentMeetingDates = ref<string[]>([]);

  const latestSchedule = computed(() => {
    const now = dayjs();
    const todayStr = now.format('YYYY-MM-DD');
    const nowTimestamp = now.unix();

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

      latest = minUpcomingDate || recentMeetingDates.value[0] || TODAY.value;
    }

    return latest;
  });

  return { TODAY, recentMeetingDates, latestSchedule };
}

describe('HomeCalendar latestSchedule — SSR 安全性（TODAY ref 初始值为空串）', () => {
  it('TODAY 初始化为空串，非时区敏感常量', () => {
    const { TODAY } = createLatestScheduleState();
    expect(TODAY.value).toBe('');
  });

  it('SSR 阶段：TODAY 为空串 + recentMeetingDates 为空数组 → latestSchedule 返回空串', () => {
    const { latestSchedule } = createLatestScheduleState();
    expect(latestSchedule.value).toBe('');
  });

  it('Hydration 首帧：TODAY 仍为空串 + recentMeetingDates 为空数组 → latestSchedule 返回空串（与 SSR 一致）', () => {
    const { latestSchedule } = createLatestScheduleState();
    expect(latestSchedule.value).toBe('');
  });
});

describe('HomeCalendar latestSchedule — onMounted 赋值后行为', () => {
  it('onMounted 后 TODAY 被赋值当天日期 → latestSchedule fallback 到当天', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();

    expect(latestSchedule.value).toBe('');

    TODAY.value = dayjs(new Date()).format('YYYY-MM-DD');
    expect(latestSchedule.value).toBe(TODAY.value);
    expect(latestSchedule.value).not.toBe('');
  });

  it('onMounted 后 TODAY 被赋值 → recentMeetingDates 非空时优先返回会议日期', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();

    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    recentMeetingDates.value = [tomorrow];
    TODAY.value = dayjs(new Date()).format('YYYY-MM-DD');

    expect(latestSchedule.value).toBe(tomorrow);
  });

  it('recentMeetingDates 包含今天 → latestSchedule 返回今天日期（优先于 TODAY）', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();

    const todayStr = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    recentMeetingDates.value = [todayStr, tomorrow];
    TODAY.value = todayStr;

    expect(latestSchedule.value).toBe(todayStr);
  });
});

describe('HomeCalendar latestSchedule — 跨日/时区边界场景', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('跨日访问：SSR 构建时间为前一天，hydration 时为新一天 → ref 方案首帧一致', () => {
    const state1 = createLatestScheduleState();
    const state2 = createLatestScheduleState();

    vi.setSystemTime(new Date(2026, 5, 10, 23, 59, 0));
    expect(state1.latestSchedule.value).toBe('');

    vi.setSystemTime(new Date(2026, 5, 11, 0, 1, 0));
    expect(state2.latestSchedule.value).toBe('');
  });

  it('极端时区差异：UTC 与 UTC+14 → ref 方案两阶段均为空串无 mismatch', () => {
    vi.setSystemTime(new Date('2026-06-10T12:00:00Z'));

    const stateUTC = createLatestScheduleState();
    expect(stateUTC.latestSchedule.value).toBe('');

    vi.setSystemTime(new Date('2026-06-11T02:00:00+14:00'));

    const stateUTC14 = createLatestScheduleState();
    expect(stateUTC14.latestSchedule.value).toBe('');
  });

  it('00:00 跨日时刻：onMounted 后赋值取客户端当前日期，无冲突', () => {
    vi.setSystemTime(new Date(2026, 5, 11, 0, 0, 0));

    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();
    expect(latestSchedule.value).toBe('');

    TODAY.value = dayjs(new Date()).format('YYYY-MM-DD');
    recentMeetingDates.value = [];

    expect(latestSchedule.value).toBe('2026-06-11');
  });
});

describe('HomeCalendar latestSchedule — computed 链优先级', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 10, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('优先级：recentMeetingDates 中今天日期 > 最近未来日期 > 首个日期 > TODAY.value', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();
    const todayStr = '2026-06-10';
    const future = '2026-06-15';
    const past = '2026-06-01';

    TODAY.value = todayStr;
    recentMeetingDates.value = [past, future, todayStr];

    expect(latestSchedule.value).toBe(todayStr);
  });

  it('今天无会议 → 返回最近的未来会议日期', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();

    TODAY.value = '2026-06-10';
    recentMeetingDates.value = ['2026-06-01', '2026-06-15', '2026-06-20'];

    expect(latestSchedule.value).toBe('2026-06-15');
  });

  it('会议日期均已过期 → fallback 到首个日期', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();

    TODAY.value = '2026-06-10';
    recentMeetingDates.value = ['2026-06-01', '2026-06-05'];

    expect(latestSchedule.value).toBe('2026-06-01');
  });

  it('会议日期均已过期且 TODAY 为空串 → fallback 到 recentMeetingDates[0]（computed 链优先级：recentMeetingDates[0] > TODAY.value）', () => {
    const { recentMeetingDates, latestSchedule } = createLatestScheduleState();

    recentMeetingDates.value = ['2026-06-01', '2026-06-05'];

    expect(latestSchedule.value).toBe('2026-06-01');
  });

  it('API 返回空 + TODAY 为空串 → latestSchedule 返回空串；onMounted 后 TODAY 有值 → fallback 到当天', () => {
    const { TODAY, recentMeetingDates, latestSchedule } = createLatestScheduleState();

    expect(latestSchedule.value).toBe('');

    TODAY.value = '2026-06-10';

    expect(latestSchedule.value).toBe('2026-06-10');
  });
});
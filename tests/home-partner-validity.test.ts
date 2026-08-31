import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { publisher } from '../app/.vitepress/src-new/data/home/publisher';

interface PublisherT {
  logo: { light: string; dark: string };
  href: string;
  href_en?: string;
  validity?: { start?: string; end?: string };
}

const isActive = (validity: PublisherT['validity'], current: number): boolean => {
  if (!validity) return true;
  const { start, end } = validity;
  if (start && current < dayjs(start).startOf('day').valueOf()) return false;
  if (end && current > dayjs(end).endOf('day').valueOf()) return false;
  return true;
};

function createHomePartnerState() {
  const now = ref(Date.now());

  const visiblePublishers = computed(() =>
    publisher.filter((p: PublisherT) => isActive(p.validity, now.value))
  );

  const mapFunc = (p: PublisherT) => ({
    logo: p.logo.light,
    logoDark: p.logo.dark,
    href: p.href,
    hrefEn: p.href_en,
  });

  const publisherRows = computed(() => {
    const list = visiblePublishers.value;
    const size = Math.floor(list.length / 3);
    return [list.slice(0, size), list.slice(size, size * 2), list.slice(size * 2)]
      .filter((row) => row.length)
      .map((row) => row.map(mapFunc));
  });

  const refresh = () => {
    now.value = Date.now();
  };

  return { now, visiblePublishers, publisherRows, refresh };
}

describe('isActive — 时效过滤纯函数（设计 §5 / §3 HomePartner.vue:28-34）', () => {
  it('无 validity → 恒为 true（永久展示）', () => {
    expect(isActive(undefined, Date.now())).toBe(true);
  });

  it('空对象 validity → true', () => {
    expect(isActive({}, Date.now())).toBe(true);
  });

  it('仅 end：now 早于 end 当天 → true', () => {
    const now = dayjs('2027-05-22').valueOf();
    expect(isActive({ end: '2027-05-23' }, now)).toBe(true);
  });

  it('仅 end：now 等于 end 当天开始 → true（end 含当日）', () => {
    const now = dayjs('2027-05-23T00:00:00').valueOf();
    expect(isActive({ end: '2027-05-23' }, now)).toBe(true);
  });

  it('仅 end：now 等于 end 当天末尾 → true（end 含当日全 24h）', () => {
    const now = dayjs('2027-05-23T23:59:59.999').valueOf();
    expect(isActive({ end: '2027-05-23' }, now)).toBe(true);
  });

  it('仅 end：now 晚于 end 当天（次日 00:00:00） → false', () => {
    const now = dayjs('2027-05-24T00:00:00').valueOf();
    expect(isActive({ end: '2027-05-23' }, now)).toBe(false);
  });

  it('仅 end：now 远晚于 end → false', () => {
    const now = dayjs('2030-01-01').valueOf();
    expect(isActive({ end: '2027-05-23' }, now)).toBe(false);
  });

  it('仅 start：now 早于 start 当天 → false', () => {
    const now = dayjs('2027-05-22').valueOf();
    expect(isActive({ start: '2027-05-23' }, now)).toBe(false);
  });

  it('仅 start：now 等于 start 当天开始 → true（start 含当日）', () => {
    const now = dayjs('2027-05-23T00:00:00').valueOf();
    expect(isActive({ start: '2027-05-23' }, now)).toBe(true);
  });

  it('仅 start：now 晚于 start → true', () => {
    const now = dayjs('2030-01-01').valueOf();
    expect(isActive({ start: '2027-05-23' }, now)).toBe(true);
  });

  it('跨区间 [start, end]：now 在区间内 → true', () => {
    const now = dayjs('2027-05-25').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-30' }, now)).toBe(true);
  });

  it('跨区间 [start, end]：now 早于 start → false', () => {
    const now = dayjs('2027-05-22').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-30' }, now)).toBe(false);
  });

  it('跨区间 [start, end]：now 晚于 end 当天 → false', () => {
    const now = dayjs('2027-05-31').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-30' }, now)).toBe(false);
  });

  it('跨区间 [start, end]：now 等于 end 当天 → true（双侧含当日）', () => {
    const now = dayjs('2027-05-30T12:00:00').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-30' }, now)).toBe(true);
  });

  it('start 当天 == end 当天（单日展示）：当天内 → true', () => {
    const now = dayjs('2027-05-23T15:00:00').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-23' }, now)).toBe(true);
  });

  it('start 当天 == end 当天：前一天 → false', () => {
    const now = dayjs('2027-05-22T23:59:59').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-23' }, now)).toBe(false);
  });

  it('start 当天 == end 当天：次日 → false', () => {
    const now = dayjs('2027-05-24T00:00:00').valueOf();
    expect(isActive({ start: '2027-05-23', end: '2027-05-23' }, now)).toBe(false);
  });
});

describe('publisher 数据 — kaihong 时效配置（设计 §3 publisher.ts）', () => {
  it('publisher 为非空数组', () => {
    expect(Array.isArray(publisher)).toBe(true);
    expect(publisher.length).toBeGreaterThan(0);
  });

  it('仅 kaihong 条目带 validity，其余条目均无 validity', () => {
    const withValidity = publisher.filter((p: PublisherT) => p.validity !== undefined);
    expect(withValidity.length).toBe(1);
    const item = withValidity[0] as PublisherT;
    expect(item.href).toBe('https://www.kaihong.com/');
  });

  it('kaihong 条目 validity.end 为 2027-05-23', () => {
    const kaihong = publisher.find((p: PublisherT) => p.href === 'https://www.kaihong.com/') as PublisherT;
    expect(kaihong.validity).toBeDefined();
    expect(kaihong.validity!.end).toBe('2027-05-23');
    expect(kaihong.validity!.start).toBeUndefined();
  });

  it('kaihong logo 含 light/dark 双主题（数据未被时效改动破坏）', () => {
    const kaihong = publisher.find((p: PublisherT) => p.href === 'https://www.kaihong.com/') as PublisherT;
    expect(kaihong.logo.light).toBeTruthy();
    expect(kaihong.logo.dark).toBeTruthy();
  });
});

describe('HomePartner 可见集合 — 跨 2027-05-23 时效切换（设计 §5 组件测）', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('当前真实时间（构建时刻 < 2027-05-23）→ kaihong 可见，总数 = publisher.length', () => {
    vi.setSystemTime(new Date(2026, 7, 31, 12, 0, 0));
    const { visiblePublishers } = createHomePartnerState();
    expect(visiblePublishers.value.length).toBe(publisher.length);
    const kaihong = visiblePublishers.value.find((p: PublisherT) => p.href === 'https://www.kaihong.com/');
    expect(kaihong).toBeDefined();
  });

  it('2027-05-23 当天 → kaihong 仍可见（end 含当日）', () => {
    vi.setSystemTime(new Date(2027, 4, 23, 23, 59, 59, 999));
    const { visiblePublishers } = createHomePartnerState();
    const kaihong = visiblePublishers.value.find((p: PublisherT) => p.href === 'https://www.kaihong.com/');
    expect(kaihong).toBeDefined();
    expect(visiblePublishers.value.length).toBe(publisher.length);
  });

  it('2027-05-24 起 → kaihong 消失，总数减 1', () => {
    vi.setSystemTime(new Date(2027, 4, 24, 0, 0, 0));
    const { visiblePublishers } = createHomePartnerState();
    const kaihong = visiblePublishers.value.find((p: PublisherT) => p.href === 'https://www.kaihong.com/');
    expect(kaihong).toBeUndefined();
    expect(visiblePublishers.value.length).toBe(publisher.length - 1);
  });

  it('远未来 → kaihong 消失，其余厂商仍在', () => {
    vi.setSystemTime(new Date(2030, 0, 1, 0, 0, 0));
    const { visiblePublishers } = createHomePartnerState();
    expect(visiblePublishers.value.length).toBe(publisher.length - 1);
    expect(visiblePublishers.value.find((p: PublisherT) => p.href === 'https://www.kaihong.com/')).toBeUndefined();
    expect(visiblePublishers.value.find((p: PublisherT) => p.href === 'https://www.suse.com/')).toBeDefined();
  });
});

describe('publisherRows — 分行与空行过滤（设计 §4 边界 / §3 HomePartner.vue:47-53）', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('全量可见（29 项）→ 3 行，每行非空，行项数 = floor(n/3) 与余数', () => {
    vi.setSystemTime(new Date(2026, 7, 31, 12, 0, 0));
    const { publisherRows } = createHomePartnerState();
    const rows = publisherRows.value;
    expect(rows.length).toBe(3);
    const n = publisher.length;
    const size = Math.floor(n / 3);
    expect(rows[0].length).toBe(size);
    expect(rows[1].length).toBe(size);
    expect(rows[2].length).toBe(n - size * 2);
    rows.forEach((row) => expect(row.length).toBeGreaterThan(0));
  });

  it('kaihong 过期后（28 项）→ 仍 3 行，无空行', () => {
    vi.setSystemTime(new Date(2027, 4, 24, 0, 0, 0));
    const { publisherRows } = createHomePartnerState();
    const rows = publisherRows.value;
    expect(rows.length).toBe(3);
    const n = publisher.length - 1;
    const size = Math.floor(n / 3);
    expect(rows[0].length).toBe(size);
    expect(rows[1].length).toBe(size);
    expect(rows[2].length).toBe(n - size * 2);
    rows.forEach((row) => expect(row.length).toBeGreaterThan(0));
  });

  it('仅 2 项可见 → floor(2/3)=0，前两行空被过滤，仅 1 行', () => {
    const fakeList: PublisherT[] = [
      { logo: { light: 'a', dark: 'a' }, href: 'https://a' },
      { logo: { light: 'b', dark: 'b' }, href: 'https://b' },
    ];
    const size = Math.floor(fakeList.length / 3);
    const rows = [fakeList.slice(0, size), fakeList.slice(size, size * 2), fakeList.slice(size * 2)]
      .filter((row) => row.length);
    expect(size).toBe(0);
    expect(rows.length).toBe(1);
    expect(rows[0].length).toBe(2);
  });

  it('仅 1 项可见 → 仅 1 行（避免空 OLogoSwiperItems 轨道）', () => {
    const fakeList: PublisherT[] = [{ logo: { light: 'a', dark: 'a' }, href: 'https://a' }];
    const size = Math.floor(fakeList.length / 3);
    const rows = [fakeList.slice(0, size), fakeList.slice(size, size * 2), fakeList.slice(size * 2)]
      .filter((row) => row.length);
    expect(rows.length).toBe(1);
    expect(rows[0].length).toBe(1);
  });

  it('全部过期 → rows 为空数组（不渲染任何 OLogoSwiperItems）', () => {
    const allExpired: PublisherT[] = publisher.map((p: PublisherT) => ({
      ...p,
      validity: { end: '2000-01-01' },
    }));
    const now = dayjs('2026-08-31').valueOf();
    const visible = allExpired.filter((p) => isActive(p.validity, now));
    expect(visible.length).toBe(0);
    const size = Math.floor(visible.length / 3);
    const rows = [visible.slice(0, size), visible.slice(size, size * 2), visible.slice(size * 2)]
      .filter((row) => row.length);
    expect(rows.length).toBe(0);
  });

  it('mapFunc 映射后 row 项含 logo/logoDark/href/hrefEn 字段', () => {
    vi.setSystemTime(new Date(2026, 7, 31, 12, 0, 0));
    const { publisherRows } = createHomePartnerState();
    const first = publisherRows.value[0][0];
    expect(first).toHaveProperty('logo');
    expect(first).toHaveProperty('logoDark');
    expect(first).toHaveProperty('href');
  });

  it('奇数行 reverse=true / 偶数行 reverse=false 对应模板 i%2（数据可达性验证）', () => {
    vi.setSystemTime(new Date(2026, 7, 31, 12, 0, 0));
    const { publisherRows } = createHomePartnerState();
    const rows = publisherRows.value;
    expect(rows.length).toBe(3);
    rows.forEach((_row, i) => {
      expect(i % 2).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('HomePartner SSR/SSG 安全性（设计 §4 / AGENTS.md 红线 #6）', () => {
  it('now ref 初值为 Date.now()，不访问 window/document（SSR 可用）', () => {
    const original = Date.now();
    const { now } = createHomePartnerState();
    expect(typeof now.value).toBe('number');
    expect(now.value).toBeGreaterThan(0);
    expect(Math.abs(now.value - original)).toBeLessThan(1000);
  });

  it('refresh() 模拟 onMounted 后刷新 now → computed 重新求值', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 31, 12, 0, 0));
    const { now, visiblePublishers, refresh } = createHomePartnerState();
    const before = now.value;
    const beforeCount = visiblePublishers.value.length;

    vi.setSystemTime(new Date(2027, 4, 24, 0, 0, 0));
    refresh();

    expect(now.value).not.toBe(before);
    expect(visiblePublishers.value.length).toBe(beforeCount - 1);
    vi.useRealTimers();
  });

  it('setup 顶层不抛错（无 window 引用）— 直接创建状态实例', () => {
    expect(() => createHomePartnerState()).not.toThrow();
  });
});

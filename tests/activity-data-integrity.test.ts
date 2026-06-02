import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();
const ACTIVITY_DIR = path.join(PROJECT_ROOT, '.content/activity');
const IMAGES_DIR = path.join(ACTIVITY_DIR, 'images');

interface MeetupItem {
  id: number;
  title: string;
  date: string;
  activity_type: number;
  synopsis: string;
  address: string;
  city: string;
  isAdditional: boolean;
  posterImg: string;
  posterImgMb: string;
  series: string;
  detail_img: string;
  signup_url?: string;
  signup_url_mb?: string;
  new_url?: string;
}

interface MeetupsData {
  zh: MeetupItem[];
  en: MeetupItem[];
}

interface CalendarItem {
  name: string;
  url?: string;
  dates: string[];
  start_date: string;
  end_date: string;
  activity_type: string;
  type: string;
  address?: string;
  group_name?: string;
}

interface ActiveItem {
  activeName: string;
  location?: string;
  href?: string;
  activelink?: string;
}

interface MonthEntry {
  month: string;
  actives?: ActiveItem[];
}

interface CategoryData {
  title: string;
  id: string;
  icon: string;
  desc?: string;
  email?: string;
  events: MonthEntry[];
}

interface CollegeActive {
  activeName: string;
  startTime: number;
  duration: number;
  activelink?: string;
}

interface CollegeData {
  title: string;
  id: string;
  icon: string;
  actives: CollegeActive[];
}

interface PlanData {
  months: string[];
  year_plan: {
    zh: Record<string, CategoryData | CollegeData>;
    en: Record<string, CategoryData | CollegeData>;
  };
}

function loadYaml(filename: string): any {
  const fp = path.join(ACTIVITY_DIR, filename);
  return yaml.load(fs.readFileSync(fp, 'utf8'));
}

const meetupsData = loadYaml('meetups.yaml') as MeetupsData;
const calendarData = loadYaml('calendar.yaml') as CalendarItem[];
const planData = loadYaml('plan.yaml') as PlanData;
const filtersData = loadYaml('filters.yaml') as {
  series: Array<{ value: string; label: string; label_en: string }>;
  state: Array<{ value: number; label: string; label_en: string }>;
};

const newMeetupIds = [14, 15, 16];

describe('meetups.yaml — 新增活动条目完整性', () => {
  const zhMeetups = meetupsData.zh;

  it('3 条新 meetup(id=14/15/16)存在', () => {
    for (const id of newMeetupIds) {
      const found = zhMeetups.find((m) => m.id === id);
      expect(found, `meetups.yaml zh 中未找到 id=${id}`).toBeDefined();
    }
  });

  it('新 meetup 的 series 值为 "3"(Call for X 开发者活动)', () => {
    for (const id of newMeetupIds) {
      const m = zhMeetups.find((m) => m.id === id)!;
      expect(m.series, `id=${id} series 应为 '3'`).toBe('3');
    }
  });

  it('series "3" 在 filters.yaml 中有对应枚举', () => {
    const series3 = filtersData.series.find((s) => s.value === '3');
    expect(series3, 'filters.yaml 中不存在 series value="3"').toBeDefined();
    expect(series3!.label).toBe('Call for X 开发者活动');
  });

  it('新 meetup 的 activity_type 为 2(进行中)', () => {
    for (const id of newMeetupIds) {
      const m = zhMeetups.find((m) => m.id === id)!;
      expect(m.activity_type, `id=${id} activity_type 应为 2`).toBe(2);
    }
  });

  it('activity_type 2 在 filters.yaml state 中对应"进行中"', () => {
    const state2 = filtersData.state.find((s) => s.value === 2);
    expect(state2, 'filters.yaml state 中不存在 value=2').toBeDefined();
    expect(state2!.label).toBe('进行中');
  });

  it('新 meetup 必填字段齐全(title/date/synopsis/address/city/isAdditional/posterImg/posterImgMb/series/detail_img)', () => {
    const requiredFields = ['title', 'date', 'synopsis', 'address', 'city', 'isAdditional', 'posterImg', 'posterImgMb', 'series', 'detail_img'];
    for (const id of newMeetupIds) {
      const m = zhMeetups.find((m) => m.id === id)!;
      for (const field of requiredFields) {
        expect(m[field as keyof MeetupItem], `id=${id} 缺少必填字段 ${field}`).toBeDefined();
      }
    }
  });

  it('新 meetup 的 isAdditional 为 true', () => {
    for (const id of newMeetupIds) {
      const m = zhMeetups.find((m) => m.id === id)!;
      expect(m.isAdditional, `id=${id} isAdditional 应为 true`).toBe(true);
    }
  });

  it('新 meetup 排在列表顶部(最新在前)', () => {
    const topIds = zhMeetups.slice(0, 3).map((m) => m.id);
    expect(topIds).toEqual(newMeetupIds);
  });

  it('en meetup 列表仍为空数组(本次改动不影响 en)', () => {
    expect(meetupsData.en).toEqual([]);
  });

  it('id=14 成都站 — title 含成都, city 为成都市', () => {
    const m = zhMeetups.find((m) => m.id === 14)!;
    expect(m.title).toContain('成都');
    expect(m.city).toBe('成都市');
  });

  it('id=15 山东站 — title 含山东, city 为青岛市', () => {
    const m = zhMeetups.find((m) => m.id === 15)!;
    expect(m.title).toContain('山东');
    expect(m.city).toBe('青岛市');
  });

  it('id=15 山东站 posterImg 使用 default-one 兜底(无 qingdao 城市海报)', () => {
    const m = zhMeetups.find((m) => m.id === 15)!;
    expect(m.posterImg).toContain('default-one');
    expect(m.posterImgMb).toContain('default-one-mb');
  });

  it('id=16 北京站 — title 含北京, city 为北京市', () => {
    const m = zhMeetups.find((m) => m.id === 16)!;
    expect(m.title).toContain('北京');
    expect(m.city).toBe('北京市');
  });

  it('id=14/15 detail_img 引用 4 月议程图(2604xx), id=16 引用 5 月议程图(2605xx)', () => {
    const m14 = zhMeetups.find((m) => m.id === 14)!;
    const m15 = zhMeetups.find((m) => m.id === 15)!;
    const m16 = zhMeetups.find((m) => m.id === 16)!;
    expect(m14.detail_img).toMatch(/^\.\/images\/detail-2604/);
    expect(m15.detail_img).toMatch(/^\.\/images\/detail-2604/);
    expect(m16.detail_img).toMatch(/^\.\/images\/detail-2605/);
  });
});

describe('meetups.yaml — 所有条目字段枚举映射校验', () => {
  it('每个 zh meetup 的 series 值都在 filters.yaml series 中有定义', () => {
    const validSeries = filtersData.series.map((s) => String(s.value));
    for (const m of meetupsData.zh) {
      expect(validSeries, `meetup id=${m.id} series="${m.series}" 不在 filters.yaml 中`).toContain(String(m.series));
    }
  });

  it('每个 zh meetup 的 activity_type 值都在 filters.yaml state 中有定义', () => {
    const validState = filtersData.state.map((s) => s.value);
    for (const m of meetupsData.zh) {
      expect(validState, `meetup id=${m.id} activity_type=${m.activity_type} 不在 filters.yaml 中`).toContain(m.activity_type);
    }
  });
});

describe('calendar.yaml — 新增日历条目完整性', () => {
  it('3 条含 url 的日历条目(id=14/15/16)存在', () => {
    for (const id of newMeetupIds) {
      const found = calendarData.find((c) => c.url?.includes(`id=${id}`));
      expect(found, `calendar.yaml 中未找到 id=${id} 的条目`).toBeDefined();
    }
  });

  it('2 条不含 url 的日历条目(西安/新加坡)存在', () => {
    const xian = calendarData.find((c) => c.name.includes('西安') && !c.url);
    expect(xian, 'calendar.yaml 中未找到西安站无 url 条目').toBeDefined();

    const singapore = calendarData.find((c) => c.name.includes('新加坡') && !c.url);
    expect(singapore, 'calendar.yaml 中未找到新加坡站无 url 条目').toBeDefined();
  });

  it('含 url 条目的 url 格式正确(/zh/interaction/event-list/detail/?id=X&isAdditional=true)', () => {
    for (const id of newMeetupIds) {
      const item = calendarData.find((c) => c.url?.includes(`id=${id}`))!;
      expect(item.url).toMatch(/^\/zh\/interaction\/event-list\/detail\/\?id=\d+&isAdditional=true$/);
    }
  });

  it('日历条目的 dates 数组非空', () => {
    for (const item of calendarData) {
      expect(item.dates.length, `条目 "${item.name}" dates 为空`).toBeGreaterThan(0);
    }
  });

  it('日历条目的 start_date 和 end_date 格式为 YYYY-MM-DD HH:mm', () => {
    for (const item of calendarData) {
      expect(item.start_date).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
      expect(item.end_date).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    }
  });

  it('新活动条目的 activity_type 为 "线下"', () => {
    const newCalendarItems = calendarData.filter((c) => newMeetupIds.some((id) => c.url?.includes(`id=${id}`)));
    for (const item of newCalendarItems) {
      expect(item.activity_type).toBe('线下');
    }
  });

  it('新活动条目的 type 为 "activity"', () => {
    const newCalendarItems = calendarData.filter((c) => newMeetupIds.some((id) => c.url?.includes(`id=${id}`)));
    for (const item of newCalendarItems) {
      expect(item.type).toBe('activity');
    }
  });

  it('日历条目与 meetup id 交叉引用:含 url 的条目 id 必须在 meetups.yaml zh 中存在', () => {
    const allMeetupIds = meetupsData.zh.map((m) => m.id);
    for (const item of calendarData) {
      if (!item.url) continue;
      const idMatch = item.url.match(/id=(\d+)/);
      if (!idMatch) continue;
      const id = Number(idMatch[1]);
      expect(allMeetupIds, `calendar 条目 "${item.name}" 引用 id=${id} 但 meetups.yaml zh 中不存在`).toContain(id);
    }
  });
});

describe('calendar.yaml — 西安/新加坡无 url 条目(仅日历高亮)', () => {
  it('西安站条目不含 url 字段(2026 年新增西安站)', () => {
    const xian = calendarData.find((c) => c.name === 'openEuler Meetup 西安站');
    expect(xian!.url).toBeUndefined();
  });

  it('新加坡站条目不含 url 字段', () => {
    const sg = calendarData.find((c) => c.name.includes('新加坡'));
    expect(sg!.url).toBeUndefined();
  });

  it('西安站和新加坡站 dates 在 6 月', () => {
    const xian = calendarData.find((c) => c.name === 'openEuler Meetup 西安站')!;
    const sg = calendarData.find((c) => c.name.includes('新加坡'))!;
    for (const d of xian.dates) {
      expect(d).toMatch(/^2026-06-/);
    }
    for (const d of sg.dates) {
      expect(d).toMatch(/^2026-06-/);
    }
  });
});

describe('plan.yaml — zh.opensource 年度规划修改', () => {
  const zhOs = planData.year_plan.zh.opensource as CategoryData;

  it('May(month 5) 无 actives(Linaro Connect 2025 已删除)', () => {
    const may = zhOs.events.find((e) => e.month === '5')!;
    expect(may.actives).toBeUndefined();
  });

  it('June(month 6) 开放原子开源生态大会地址为"中国 北京"', () => {
    const jun = zhOs.events.find((e) => e.month === '6')!;
    expect(jun.actives).toBeDefined();
    expect(jun.actives!.length).toBeGreaterThanOrEqual(1);
    const openAtom = jun.actives!.find((a) => a.activeName.includes('开放原子'));
    expect(openAtom, 'June 中未找到开放原子开源生态大会').toBeDefined();
    expect(openAtom!.location).toBe('中国 北京');
  });
});

describe('plan.yaml — zh.developer 年度规划新增', () => {
  const zhDev = planData.year_plan.zh.developer as CategoryData;

  it('May(month 5) 有北京站活动(openEuler AI与操作系统融合创新 Meetup)', () => {
    const may = zhDev.events.find((e) => e.month === '5')!;
    expect(may.actives).toBeDefined();
    const bj = may.actives!.find((a) => a.activeName.includes('AI与操作系统融合创新'));
    expect(bj, 'developer May 中未找到北京站 AI Meetup').toBeDefined();
    expect(bj!.location).toBe('中国 北京');
  });

  it('June(month 6) 有西安站和新加坡站', () => {
    const jun = zhDev.events.find((e) => e.month === '6')!;
    expect(jun.actives).toBeDefined();
    const xian = jun.actives!.find((a) => a.activeName.includes('西安'));
    expect(xian, 'developer June 中未找到西安站').toBeDefined();
    expect(xian!.location).toBe('中国 西安');

    const sg = jun.actives!.find((a) => a.activeName.includes('新加坡'));
    expect(sg, 'developer June 中未找到新加坡站').toBeDefined();
    expect(sg!.location).toBe('新加坡');
  });

  it('April(month 4) 有成都站 SIG-Sbom 和山东站云原生和新加坡站 Meetup', () => {
    const apr = zhDev.events.find((e) => e.month === '4')!;
    expect(apr.actives).toBeDefined();
    const chengdu = apr.actives!.find((a) => a.activeName.includes('SIG-Sbom'));
    expect(chengdu, 'developer April 中未找到成都站 SIG-Sbom').toBeDefined();
    expect(chengdu!.location).toBe('中国 成都');

    const qingdao = apr.actives!.find((a) => a.activeName.includes('云原生'));
    expect(qingdao, 'developer April 中未找到山东站云原生').toBeDefined();
    expect(qingdao!.location).toBe('中国 青岛');
  });
});

describe('plan.yaml — en.opensource 年度规划修改', () => {
  const enOs = planData.year_plan.en.opensource as CategoryData;

  it('May(month 5) 无 actives(Linaro Connect 2025 已删除)', () => {
    const may = enOs.events.find((e) => e.month === '5')!;
    expect(may.actives).toBeUndefined();
  });

  it('June(month 6) 2026 OpenAtom 地址为 "Beijing, China"', () => {
    const jun = enOs.events.find((e) => e.month === '6')!;
    expect(jun.actives).toBeDefined();
    const openAtom = jun.actives!.find((a) => a.activeName.includes('OpenAtom') || a.activeName.includes('ECO'));
    expect(openAtom, 'en June 中未找到 2026 OpenAtom').toBeDefined();
    expect(openAtom!.location).toBe('Beijing, China');
  });
});

describe('plan.yaml — en.developer 不存在(本轮不新增)', () => {
  it('en 版年度规划中不存在 developer 类别', () => {
    expect(planData.year_plan.en.developer).toBeUndefined();
  });
});

describe('activity images — 议程图存在性', () => {
  it('新 meetup 的 detail_img 对应的图片文件在 images/ 目录下存在', () => {
    const missing: string[] = [];
    for (const m of meetupsData.zh) {
      const imgPath = m.detail_img.replace(/^\.\//, '');
      const fp = path.join(ACTIVITY_DIR, imgPath);
      if (!fs.existsSync(fp)) {
        missing.push(`id=${m.id} -> ${m.detail_img} (looked at ${fp})`);
      }
    }
    expect(missing, `缺失议程图:\n${missing.join('\n')}`).toEqual([]);
  });

  it('id=14 成都站 detail-260417.jpg 存在', () => {
    expect(fs.existsSync(path.join(IMAGES_DIR, 'detail-260417.jpg'))).toBe(true);
  });

  it('id=15 山东站 detail-260428.jpg 存在', () => {
    expect(fs.existsSync(path.join(IMAGES_DIR, 'detail-260428.jpg'))).toBe(true);
  });

  it('id=16 北京站 detail-260530.jpg 存在', () => {
    expect(fs.existsSync(path.join(IMAGES_DIR, 'detail-260530.jpg'))).toBe(true);
  });
});

describe('海报图资产 — default-one 兜底资产存在性', () => {
  const ASSETS_DIR = path.join(PROJECT_ROOT, 'app/.vitepress/src-new/assets');

  it('default-one.jpg(PC 端兜底海报)存在于 assets/category/user-group/city/', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/user-group/city/default-one.jpg'))).toBe(true);
  });

  it('default-one-mb.jpg(移动端兜底海报)存在于 assets/category/event/city/', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/event/city/default-one-mb.jpg'))).toBe(true);
  });

  it('id=14 成都站使用 chengdu.jpg 海报(已有资产)', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/user-group/city/chengdu.jpg'))).toBe(true);
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/event/city/chengdu-mb.jpg'))).toBe(true);
  });

  it('id=16 北京站使用 beijing.jpg 海报(已有资产)', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/user-group/city/beijing.jpg'))).toBe(true);
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/event/city/beijing-mb.jpg'))).toBe(true);
  });
});

describe('meetups.yaml — 筛选逻辑模拟(series="3" 过滤)', () => {
  it('按 series="3" 过滤 zh meetup 应包含 id=14/15/16', () => {
    const filtered = meetupsData.zh.filter((m) => m.series === '3');
    const filteredIds = filtered.map((m) => m.id);
    for (const id of newMeetupIds) {
      expect(filteredIds, `series="3" 过滤后未包含 id=${id}`).toContain(id);
    }
  });

  it('按 series="3" 过滤返回所有 Call for X 开发者活动(含历史条目)', () => {
    const filtered = meetupsData.zh.filter((m) => m.series === '3');
    expect(filtered.length, 'series="3" 应匹配所有 zh meetup(全为系列3)').toBe(meetupsData.zh.length);
  });

  it('按 activity_type=2(进行中)过滤应包含 id=14/15/16', () => {
    const filtered = meetupsData.zh.filter((m) => m.activity_type === 2);
    const filteredIds = filtered.map((m) => m.id);
    for (const id of newMeetupIds) {
      expect(filteredIds, `activity_type=2 过滤后未包含 id=${id}`).toContain(id);
    }
  });

  it('按 series="3" + activity_type=2 联合过滤应仅返回 id=14/15/16', () => {
    const filtered = meetupsData.zh.filter((m) => m.series === '3' && m.activity_type === 2);
    const filteredIds = filtered.map((m) => m.id);
    expect(filteredIds).toEqual(newMeetupIds);
  });

  it('搜索关键词"成都"应匹配 id=14', () => {
    const results = meetupsData.zh.filter((m) => m.title.includes('成都') || m.city.includes('成都'));
    expect(results.map((m) => m.id)).toContain(14);
  });

  it('搜索关键词"北京"应匹配 id=16(及历史 id=9/6/5)', () => {
    const results = meetupsData.zh.filter((m) => m.title.includes('北京') || m.city.includes('北京'));
    expect(results.map((m) => m.id)).toContain(16);
  });
});

describe('meetups.yaml — id 唯一性', () => {
  it('所有 zh meetup id 互不重复', () => {
    const ids = meetupsData.zh.map((m) => m.id);
    const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dups, `重复 meetup id: ${dups.join(', ')}`).toEqual([]);
  });
});

describe('集成: vite-plugin-content-yaml 加载 activity YAML', () => {
  it('activityContent 目录 import 包含 calendar/meetups/plan/filters 4 个 key', async () => {
    const activityContent = await import('#content/activity') as any;
    const keys = Object.keys(activityContent.default);
    expect(keys).toContain('calendar');
    expect(keys).toContain('meetups');
    expect(keys).toContain('plan');
    expect(keys).toContain('filters');
  });

  it('meetups.zh 数组长度与原始 YAML 一致(17 条,含 id=1000)', async () => {
    const activityContent = await import('#content/activity') as any;
    expect(activityContent.default.meetups.zh.length).toBe(meetupsData.zh.length);
  });

  it('calendar 数组长度与原始 YAML 一致', async () => {
    const activityContent = await import('#content/activity') as any;
    expect(activityContent.default.calendar.length).toBe(calendarData.length);
  });
});
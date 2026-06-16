import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();
const ACTIVITY_DIR = path.join(PROJECT_ROOT, '.content/activity');
const IMAGES_DIR = path.join(ACTIVITY_DIR, 'images');

interface EventItem {
  id: number;
  title_zh: string;
  title_en: string;
  start_date: string;
  end_date: string;
  address_zh?: string;
  address_en?: string;
  city_zh?: string;
  city_en?: string;
  synopsis_zh?: string;
  synopsis_en?: string;
  status: 'ended' | 'ongoing';
  format: 'offline' | 'online' | 'hybrid';
  series: string;
  group_name?: string;
  poster_image?: string;
  poster_image_mb?: string;
  agenda_image?: string;
  signup_url?: string;
  signup_url_mb?: string;
  review_url?: string;
}

interface SummitItem {
  id: string;
  title_zh: string;
  title_en: string;
  start_date?: string;
  end_date?: string;
  address_zh?: string;
  address_en?: string;
  format?: string;
}

interface PlanEvent {
  name_zh: string;
  name_en: string;
  location_zh?: string;
  location_en?: string;
  month?: number;
  start_month?: number;
  duration?: number;
  link?: string;
  deadline?: string;
}

interface PlanCategory {
  id: string;
  title_zh: string;
  title_en: string;
  icon: string;
  desc_zh?: string;
  desc_en?: string;
  email?: string;
  events: PlanEvent[];
}

function loadYaml(filename: string): any {
  const fp = path.join(ACTIVITY_DIR, filename);
  return yaml.load(fs.readFileSync(fp, 'utf8'));
}

const eventsData = loadYaml('events.yaml') as EventItem[];
const summitData = loadYaml('summit.yaml') as SummitItem[];
const planData = loadYaml('plan.yaml') as PlanCategory[];

describe('events.yaml — id 唯一性', () => {
  it('所有 event id 互不重复', () => {
    const ids = eventsData.map((e) => e.id);
    const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dups, `重复 event id: ${dups.join(', ')}`).toEqual([]);
  });
});

describe('events.yaml — 必填字段校验', () => {
  const requiredFields: (keyof EventItem)[] = [
    'id', 'title_zh', 'title_en', 'start_date', 'end_date', 'status', 'format', 'series',
  ];

  it('每条 event 必填字段齐全', () => {
    for (const ev of eventsData) {
      for (const field of requiredFields) {
        expect(ev[field], `id=${ev.id} 缺少必填字段 ${field}`).toBeDefined();
      }
    }
  });

  it('status 值仅为 ended 或 ongoing', () => {
    for (const ev of eventsData) {
      expect(['ended', 'ongoing'], `id=${ev.id} status="${ev.status}" 不合法`).toContain(ev.status);
    }
  });

  it('format 值仅为 offline / online / hybrid', () => {
    for (const ev of eventsData) {
      expect(['offline', 'online', 'hybrid'], `id=${ev.id} format="${ev.format}" 不合法`).toContain(ev.format);
    }
  });

  it('start_date 和 end_date 格式为 YYYY-MM-DD HH:mm', () => {
    for (const ev of eventsData) {
      expect(ev.start_date, `id=${ev.id} start_date 格式错误`).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
      expect(ev.end_date, `id=${ev.id} end_date 格式错误`).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    }
  });
});

describe('events.yaml — 含图片的条目资源存在性', () => {
  it('agenda_image 对应的图片文件存在', () => {
    const missing: string[] = [];
    for (const ev of eventsData) {
      if (!ev.agenda_image) continue;
      const imgPath = ev.agenda_image.replace(/^\.\//, '');
      const fp = path.join(ACTIVITY_DIR, imgPath);
      if (!fs.existsSync(fp)) {
        missing.push(`id=${ev.id} -> ${ev.agenda_image}`);
      }
    }
    expect(missing, `缺失议程图:\n${missing.join('\n')}`).toEqual([]);
  });
});

describe('events.yaml — 条目内容校验', () => {
  it('id=14 成都站 — title_zh 含成都, city_zh 为成都市', () => {
    const ev = eventsData.find((e) => e.id === 14)!;
    expect(ev).toBeDefined();
    expect(ev.title_zh).toContain('成都');
    expect(ev.city_zh).toBe('成都市');
  });

  it('id=16 北京站 — title_zh 含北京, city_zh 为北京市', () => {
    const ev = eventsData.find((e) => e.id === 16)!;
    expect(ev).toBeDefined();
    expect(ev.title_zh).toContain('北京');
    expect(ev.city_zh).toBe('北京市');
  });

  it('含 group_name 的条目 group_name 非空', () => {
    for (const ev of eventsData) {
      if (ev.group_name !== undefined) {
        expect(ev.group_name, `id=${ev.id} group_name 不应为空`).toBeTruthy();
      }
    }
  });
});

describe('summit.yaml — 基础校验', () => {
  it('所有 summit id 互不重复', () => {
    const ids = summitData.map((s) => s.id);
    const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dups, `重复 summit id: ${dups.join(', ')}`).toEqual([]);
  });

  it('每条 summit 必填字段齐全(id/title_zh/title_en)', () => {
    for (const s of summitData) {
      expect(s.id).toBeDefined();
      expect(s.title_zh).toBeDefined();
      expect(s.title_en).toBeDefined();
    }
  });

  it('含日期的 summit start_date 格式正确', () => {
    for (const s of summitData) {
      if (s.start_date) {
        expect(s.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
});

describe('plan.yaml — 结构校验', () => {
  it('包含 5 个类别', () => {
    expect(planData.length).toBe(5);
  });

  it('类别 id 包含 opensource/ecology/developer/college/release', () => {
    const ids = planData.map((c) => c.id);
    expect(ids).toContain('opensource');
    expect(ids).toContain('ecology');
    expect(ids).toContain('developer');
    expect(ids).toContain('college');
    expect(ids).toContain('release');
  });

  it('每个类别有 title_zh 和 title_en', () => {
    for (const cat of planData) {
      expect(cat.title_zh, `类别 ${cat.id} 缺少 title_zh`).toBeDefined();
      expect(cat.title_en, `类别 ${cat.id} 缺少 title_en`).toBeDefined();
    }
  });

  it('每个类别的 events 数组非空', () => {
    for (const cat of planData) {
      expect(cat.events.length, `类别 ${cat.id} events 为空`).toBeGreaterThan(0);
    }
  });

  it('非 college 类别的 event 有 month 字段', () => {
    for (const cat of planData) {
      if (cat.id === 'college') continue;
      for (const ev of cat.events) {
        expect(ev.month, `类别 ${cat.id} event "${ev.name_zh}" 缺少 month`).toBeDefined();
      }
    }
  });

  it('college 类别的 event 有 start_month 和 duration', () => {
    const college = planData.find((c) => c.id === 'college')!;
    for (const ev of college.events) {
      expect(ev.start_month, `college event "${ev.name_zh}" 缺少 start_month`).toBeDefined();
      expect(ev.duration, `college event "${ev.name_zh}" 缺少 duration`).toBeDefined();
    }
  });

  it('每个 event 有 name_zh 和 name_en', () => {
    for (const cat of planData) {
      for (const ev of cat.events) {
        expect(ev.name_zh, `类别 ${cat.id} event 缺少 name_zh`).toBeDefined();
        expect(ev.name_en, `类别 ${cat.id} event 缺少 name_en`).toBeDefined();
      }
    }
  });

  it('opensource 类别 June(month=6) 有开放原子开源生态大会', () => {
    const os = planData.find((c) => c.id === 'opensource')!;
    const junEvents = os.events.filter((e) => e.month === 6);
    const openAtom = junEvents.find((e) => e.name_zh.includes('开放原子'));
    expect(openAtom).toBeDefined();
    expect(openAtom!.location_zh).toBe('中国 北京');
  });
});

describe('海报图资产 — default-one 兜底资产存在性', () => {
  const ASSETS_DIR = path.join(PROJECT_ROOT, 'app/.vitepress/src-new/assets');

  it('default-one.jpg(PC 端兜底海报)存在于 assets/category/event/city/', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/event/city/default-one.jpg'))).toBe(true);
  });

  it('default-one-mb.jpg(移动端兜底海报)存在于 assets/category/event/city/', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'category/event/city/default-one-mb.jpg'))).toBe(true);
  });
});

describe('集成: vite-plugin-content-yaml 加载 activity YAML', () => {
  it('activityContent 目录 import 包含 events/summit/plan 3 个 key', async () => {
    const activityContent = await import('#content/activity') as any;
    const keys = Object.keys(activityContent.default);
    expect(keys).toContain('events');
    expect(keys).toContain('summit');
    expect(keys).toContain('plan');
  });

  it('events 数组长度与原始 YAML 一致', async () => {
    const activityContent = await import('#content/activity') as any;
    expect(activityContent.default.events.length).toBe(eventsData.length);
  });

  it('summit 数组长度与原始 YAML 一致', async () => {
    const activityContent = await import('#content/activity') as any;
    expect(activityContent.default.summit.length).toBe(summitData.length);
  });
});

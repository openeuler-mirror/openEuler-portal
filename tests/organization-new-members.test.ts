import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/community/organization');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');
const GEO_DIR = path.join(PROJECT_ROOT, '.geo');

interface MemberLike {
  name?: string;
  image?: string;
  position?: string | string[];
  email?: string;
}

// 缓存读 yaml,避免每个测试都重读整个文件。
const _cache: Record<string, any> = {};
function loadLocale(lang: 'zh' | 'en'): Record<string, any> {
  if (!_cache[lang]) {
    const fp = path.join(CONTENT_DIR, `${lang}.yaml`);
    _cache[lang] = yaml.load(fs.readFileSync(fp, 'utf8'));
  }
  return _cache[lang];
}

function loadSection(slug: string, lang: 'zh' | 'en'): any {
  return loadLocale(lang)[slug];
}

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = path.join(GEO_DIR, 'jsonld', locale, pagePath, 'index.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function collectMembers(sec: any): MemberLike[] {
  if (sec.members) return sec.members;
  if (sec.groups) return sec.groups.flatMap((g: any) => g.members ?? []);
  if (sec.rows) return sec.rows.flat();
  return [];
}

describe('品牌委员会 — 李明新增成员数据完整性', () => {
  const marketingZh = loadSection('marketing', 'zh');
  const marketingEn = loadSection('marketing', 'en');

  it('marketing 品牌委员会成员总数为 10(梁冰主席 + 8 委员 + 李明) — zh/en 一致', () => {
    expect(marketingZh.members).toHaveLength(10);
    expect(marketingEn.members).toHaveLength(10);
  });

  it('李明条目存在且字段完整(zh 看中文字段,en 看英文字段)', () => {
    const limingZh = marketingZh.members.find((m: any) => m.name === '李明');
    const limingEn = marketingEn.members.find((m: any) => m.name === 'Li Ming');
    expect(limingZh).toBeDefined();
    expect(limingEn).toBeDefined();
    expect(limingZh.name).toBe('李明');
    expect(limingEn.name).toBe('Li Ming');
    expect(limingZh.image).toBe('./images/liming-marketing.png');
    expect(limingEn.image).toBe('./images/liming-marketing.png');
    expect(limingZh.position).toBe('委员');
    expect(limingEn.position).toBe('Committee member');
    expect(limingZh.email).toBe('liming107@huawei.com');
  });

  it('李明 image 引用 liming-marketing.png(非 liming.png,避免与刘敏冲突)', () => {
    const limingZh = marketingZh.members.find((m: any) => m.name === '李明');
    expect(limingZh.image).toBe('./images/liming-marketing.png');
    expect(limingZh.image).not.toBe('./images/liming.png');
  });

  it('李明 position 在 zh/en 双语同步(zh 中文、en 英文)', () => {
    const limingZh = marketingZh.members.find((m: any) => m.name === '李明');
    const limingEn = marketingEn.members.find((m: any) => m.name === 'Li Ming');
    expect(limingZh.position).toBeTypeOf('string');
    expect(limingEn.position).toBeTypeOf('string');
    expect(limingZh.position.length).toBeGreaterThan(0);
    expect(limingEn.position.length).toBeGreaterThan(0);
  });

  it('李明 email 格式合法', () => {
    const limingZh = marketingZh.members.find((m: any) => m.name === '李明');
    expect(limingZh.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('zh locale 下李明显示中文名', () => {
    const liming = marketingZh.members.find((m: any) => m.name === '李明');
    expect(liming).toBeDefined();
    expect(liming.name).toBe('李明');
    expect(liming.position).toBe('委员');
  });

  it('en locale 下李明显示英文名', () => {
    const liming = marketingEn.members.find((m: any) => m.name === 'Li Ming');
    expect(liming).toBeDefined();
    expect(liming.name).toBe('Li Ming');
    expect(liming.position).toBe('Committee member');
  });
});

describe('用户委员会 — 冯伟新增成员数据完整性', () => {
  const userZh = loadSection('user', 'zh');
  const userEn = loadSection('user', 'en');

  it('user 用户委员会成员总数为 19(王军主席 + 17 委员 + 冯伟) — zh/en 一致', () => {
    expect(userZh.members).toHaveLength(19);
    expect(userEn.members).toHaveLength(19);
  });

  it('冯伟条目存在且字段完整', () => {
    const fengweiZh = userZh.members.find((m: any) => m.name === '冯伟');
    const fengweiEn = userEn.members.find((m: any) => m.name === 'Feng Wei');
    expect(fengweiZh).toBeDefined();
    expect(fengweiEn).toBeDefined();
    expect(fengweiZh.name).toBe('冯伟');
    expect(fengweiEn.name).toBe('Feng Wei');
    expect(fengweiZh.image).toBe('./images/fengwei.png');
    expect(fengweiEn.image).toBe('./images/fengwei.png');
    expect(fengweiZh.position).toBe('委员');
    expect(fengweiEn.position).toBe('Committee member');
    expect(fengweiZh.email).toBe('f.fengwei@huawei.com');
  });

  it('冯伟 position 在 zh/en 双语同步', () => {
    const fengweiZh = userZh.members.find((m: any) => m.name === '冯伟');
    const fengweiEn = userEn.members.find((m: any) => m.name === 'Feng Wei');
    expect(fengweiZh.position).toBeTypeOf('string');
    expect(fengweiEn.position).toBeTypeOf('string');
    expect(fengweiZh.position.length).toBeGreaterThan(0);
    expect(fengweiEn.position.length).toBeGreaterThan(0);
  });

  it('冯伟 email 格式合法', () => {
    const fengweiZh = userZh.members.find((m: any) => m.name === '冯伟');
    expect(fengweiZh.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('zh locale 下冯伟显示中文名', () => {
    const fengwei = userZh.members.find((m: any) => m.name === '冯伟');
    expect(fengwei).toBeDefined();
    expect(fengwei.name).toBe('冯伟');
    expect(fengwei.position).toBe('委员');
  });

  it('en locale 下冯伟显示英文名', () => {
    const fengwei = userEn.members.find((m: any) => m.name === 'Feng Wei');
    expect(fengwei).toBeDefined();
    expect(fengwei.name).toBe('Feng Wei');
    expect(fengwei.position).toBe('Committee member');
  });
});

describe('新增成员图片资产存在性', () => {
  it('liming-marketing.png 文件存在于 images 目录', () => {
    const fp = path.join(IMAGES_DIR, 'liming-marketing.png');
    expect(fs.existsSync(fp), 'liming-marketing.png 应存在').toBe(true);
    const stat = fs.statSync(fp);
    expect(stat.size, 'liming-marketing.png 文件大小应大于 0').toBeGreaterThan(0);
  });

  it('fengwei.png 文件存在于 images 目录', () => {
    const fp = path.join(IMAGES_DIR, 'fengwei.png');
    expect(fs.existsSync(fp), 'fengwei.png 应存在').toBe(true);
    const stat = fs.statSync(fp);
    expect(stat.size, 'fengwei.png 文件大小应大于 0').toBeGreaterThan(0);
  });

  it('liming-marketing.png 与 liming.png 是不同文件(避免刘敏头像误用)', () => {
    const fpMarketing = path.join(IMAGES_DIR, 'liming-marketing.png');
    const fpLiming = path.join(IMAGES_DIR, 'liming.png');
    expect(fs.existsSync(fpMarketing)).toBe(true);
    expect(fs.existsSync(fpLiming)).toBe(true);
    expect(fpMarketing).not.toBe(fpLiming);
  });
});

describe('organization JSON-LD — zh 新增 Person 条目', () => {
  const jsonLd = readJsonLdJson('zh', 'community/organization');
  const org = jsonLd.find((item: any) => item['@type'] === 'Organization');

  it('品牌委员会 member 数组包含李明 Person 条目', () => {
    const marketingOrg = org.subOrganization.find((s: any) =>
      s.name === 'openEuler 品牌委员会'
    );
    expect(marketingOrg).toBeDefined();
    const liming = marketingOrg.member.find((m: any) => m.name === '李明');
    expect(liming).toBeDefined();
    expect(liming['@type']).toBe('Person');
    expect(liming.jobTitle).toBe('委员');
  });

  it('用户委员会 member 数组包含冯伟 Person 条目', () => {
    const userOrg = org.subOrganization.find((s: any) =>
      s.name === 'openEuler 用户委员会'
    );
    expect(userOrg).toBeDefined();
    const fengwei = userOrg.member.find((m: any) => m.name === '冯伟');
    expect(fengwei).toBeDefined();
    expect(fengwei['@type']).toBe('Person');
    expect(fengwei.jobTitle).toBe('委员');
  });
});

describe('organization JSON-LD — en 新增 Person 条目', () => {
  const jsonLd = readJsonLdJson('en', 'community/organization');
  const org = jsonLd.find((item: any) => item['@type'] === 'Organization');

  it('Marketing Committee member 数组包含 Li Ming Person 条目', () => {
    const marketingOrg = org.subOrganization.find((s: any) =>
      s.name === 'openEuler Marketing Committee'
    );
    expect(marketingOrg).toBeDefined();
    const liMing = marketingOrg.member.find((m: any) => m.name === 'Li Ming');
    expect(liMing).toBeDefined();
    expect(liMing['@type']).toBe('Person');
    expect(liMing.jobTitle).toBe('Committee Member');
  });

  it('User Committee member 数组包含 Feng Wei Person 条目', () => {
    const userOrg = org.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    expect(userOrg).toBeDefined();
    const fengWei = userOrg.member.find((m: any) => m.name === 'Feng Wei');
    expect(fengWei).toBeDefined();
    expect(fengWei['@type']).toBe('Person');
    expect(fengWei.jobTitle).toBe('Committee Member');
  });
});

describe('YAML 与 JSON-LD 新增成员交叉验证', () => {
  const marketingZh = loadSection('marketing', 'zh');
  const marketingEn = loadSection('marketing', 'en');
  const userZh = loadSection('user', 'zh');
  const userEn = loadSection('user', 'en');

  const zhJsonLd = readJsonLdJson('zh', 'community/organization');
  const zhOrg = zhJsonLd.find((item: any) => item['@type'] === 'Organization');

  const enJsonLd = readJsonLdJson('en', 'community/organization');
  const enOrg = enJsonLd.find((item: any) => item['@type'] === 'Organization');

  it('zh 品牌委员会 JSON-LD 包含李明(YAML 新增成员)', () => {
    const marketingOrg = zhOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler 品牌委员会'
    );
    const liming = marketingOrg.member.find((m: any) => m.name === '李明');
    expect(liming).toBeDefined();
  });

  it('zh 用户委员会 JSON-LD 包含冯伟(YAML 新增成员)', () => {
    const userOrg = zhOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler 用户委员会'
    );
    const fengwei = userOrg.member.find((m: any) => m.name === '冯伟');
    expect(fengwei).toBeDefined();
  });

  it('en Marketing Committee JSON-LD 包含 Li Ming(YAML 新增成员)', () => {
    const marketingOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler Marketing Committee'
    );
    const liMing = marketingOrg.member.find((m: any) => m.name === 'Li Ming');
    expect(liMing).toBeDefined();
  });

  it('en User Committee JSON-LD 包含 Feng Wei(YAML 新增成员)', () => {
    const userOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    const fengWei = userOrg.member.find((m: any) => m.name === 'Feng Wei');
    expect(fengWei).toBeDefined();
  });

  it('en Marketing Committee JSON-LD member 数与 YAML members 数一致(10)', () => {
    const marketingOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler Marketing Committee'
    );
    expect(marketingOrg.member.length).toBe(marketingEn.members.length);
  });

  it('en User Committee JSON-LD member 数与 YAML members 数一致(18)', () => {
    const userOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    expect(userOrg.member.length).toBe(userEn.members.length);
  });
});

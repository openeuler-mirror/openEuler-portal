import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/organization');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');
const GEO_DIR = path.join(PROJECT_ROOT, '.geo');

interface MemberLike {
  name?: string;
  name_en?: string;
  image?: string;
  position?: string;
  position_en?: string;
  email?: string;
}

function loadYaml(slug: string) {
  return yaml.load(
    fs.readFileSync(path.join(CONTENT_DIR, `${slug}.yaml`), 'utf8')
  ) as any;
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
  const marketing = loadYaml('marketing');

  it('marketing.yaml 品牌委员会成员总数为 10(梁冰主席 + 8 委员 + 李明)', () => {
    expect(marketing.members).toHaveLength(10);
  });

  it('李明条目存在且字段完整', () => {
    const liming = marketing.members.find((m: any) => m.name === '李明');
    expect(liming).toBeDefined();
    expect(liming.name).toBe('李明');
    expect(liming.name_en).toBe('Li Ming');
    expect(liming.image).toBe('./images/liming-marketing.png');
    expect(liming.position).toBe('委员');
    expect(liming.position_en).toBe('Committee member');
    expect(liming.email).toBe('liming107@huawei.com');
  });

  it('李明 image 引用 liming-marketing.png(非 liming.png,避免与刘敏冲突)', () => {
    const liming = marketing.members.find((m: any) => m.name === '李明');
    expect(liming.image).toBe('./images/liming-marketing.png');
    expect(liming.image).not.toBe('./images/liming.png');
  });

  it('李明 position/position_en 双语同步存在', () => {
    const liming = marketing.members.find((m: any) => m.name === '李明');
    expect(liming.position).toBeTypeOf('string');
    expect(liming.position_en).toBeTypeOf('string');
    expect(liming.position.length).toBeGreaterThan(0);
    expect(liming.position_en.length).toBeGreaterThan(0);
  });

  it('李明 email 格式合法', () => {
    const liming = marketing.members.find((m: any) => m.name === '李明');
    expect(liming.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('foldI18n zh 模式下李明显示中文名', () => {
    const resolved = foldI18n(marketing, 'zh') as any;
    const liming = resolved.members.find((m: any) => m.name === '李明');
    expect(liming).toBeDefined();
    expect(liming.name).toBe('李明');
    expect(liming.position).toBe('委员');
  });

  it('foldI18n en 模式下李明显示英文名', () => {
    const resolved = foldI18n(marketing, 'en') as any;
    const liming = resolved.members.find((m: any) => m.name === 'Li Ming');
    expect(liming).toBeDefined();
    expect(liming.name).toBe('Li Ming');
    expect(liming.position).toBe('Committee member');
  });
});

describe('用户委员会 — 冯伟新增成员数据完整性', () => {
  const user = loadYaml('user');

  it('user.yaml 用户委员会成员总数为 18(王军主席 + 16 委员 + 冯伟)', () => {
    expect(user.members).toHaveLength(18);
  });

  it('冯伟条目存在且字段完整', () => {
    const fengwei = user.members.find((m: any) => m.name === '冯伟');
    expect(fengwei).toBeDefined();
    expect(fengwei.name).toBe('冯伟');
    expect(fengwei.name_en).toBe('Feng Wei');
    expect(fengwei.image).toBe('./images/fengwei.png');
    expect(fengwei.position).toBe('委员');
    expect(fengwei.position_en).toBe('Committee member');
    expect(fengwei.email).toBe('f.fengwei@huawei.com');
  });

  it('冯伟 position/position_en 双语同步存在', () => {
    const fengwei = user.members.find((m: any) => m.name === '冯伟');
    expect(fengwei.position).toBeTypeOf('string');
    expect(fengwei.position_en).toBeTypeOf('string');
    expect(fengwei.position.length).toBeGreaterThan(0);
    expect(fengwei.position_en.length).toBeGreaterThan(0);
  });

  it('冯伟 email 格式合法', () => {
    const fengwei = user.members.find((m: any) => m.name === '冯伟');
    expect(fengwei.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('foldI18n zh 模式下冯伟显示中文名', () => {
    const resolved = foldI18n(user, 'zh') as any;
    const fengwei = resolved.members.find((m: any) => m.name === '冯伟');
    expect(fengwei).toBeDefined();
    expect(fengwei.name).toBe('冯伟');
    expect(fengwei.position).toBe('委员');
  });

  it('foldI18n en 模式下冯伟显示英文名', () => {
    const resolved = foldI18n(user, 'en') as any;
    const fengwei = resolved.members.find((m: any) => m.name === 'Feng Wei');
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
  const marketing = loadYaml('marketing');
  const user = loadYaml('user');

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
    expect(marketingOrg.member.length).toBe(marketing.members.length);
  });

  it('en User Committee JSON-LD member 数与 YAML members 数一致(18)', () => {
    const userOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    expect(userOrg.member.length).toBe(user.members.length);
  });
});

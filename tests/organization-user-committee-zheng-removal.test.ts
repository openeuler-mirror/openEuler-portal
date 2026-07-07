import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/organization');
const GEO_DIR = path.join(PROJECT_ROOT, '.geo');
const ORG_JSON_PATH = path.join(PROJECT_ROOT, 'app/.vitepress/public/data/portal/organization.json');

function loadYaml(slug: string) {
  return yaml.load(
    fs.readFileSync(path.join(CONTENT_DIR, `${slug}.yaml`), 'utf8')
  ) as any;
}

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = path.join(GEO_DIR, 'jsonld', locale, pagePath, 'index.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('用户委员会 — 郑振宇移除验证', () => {
  const user = loadYaml('user');

  it('user.yaml 用户委员会成员总数为 18(王军主席 + 16 委员 + 冯伟)', () => {
    expect(user.members).toHaveLength(18);
  });

  it('user.yaml 中不包含郑振宇', () => {
    const zheng = user.members.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeUndefined();
  });

  it('user.yaml 中不包含 Zheng Zhenyu(name_en)', () => {
    const zheng = user.members.find((m: any) => m.name_en === 'Zheng Zhenyu');
    expect(zheng).toBeUndefined();
  });

  it('foldI18n zh 模式下用户委员会不显示郑振宇', () => {
    const resolved = foldI18n(user, 'zh') as any;
    const zheng = resolved.members.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeUndefined();
  });

  it('foldI18n en 模式下 User Committee 不显示 Zheng Zhenyu', () => {
    const resolved = foldI18n(user, 'en') as any;
    const zheng = resolved.members.find((m: any) => m.name === 'Zheng Zhenyu');
    expect(zheng).toBeUndefined();
  });
});

describe('社区运营工作组 — 郑振宇仍保留为组长', () => {
  const operations = loadYaml('operations');

  it('operations.yaml 中郑振宇仍存在且职位为组长', () => {
    const zheng = operations.members.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeDefined();
    expect(zheng.position).toBe('组长');
    expect(zheng.position_en).toBe('Lead');
  });

  it('foldI18n zh 模式下社区运营工作组仍显示郑振宇为组长', () => {
    const resolved = foldI18n(operations, 'zh') as any;
    const zheng = resolved.members.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeDefined();
    expect(zheng.position).toBe('组长');
  });

  it('foldI18n en 模式下 Operations Working Group 仍显示 Zheng Zhenyu 为 Lead', () => {
    const resolved = foldI18n(operations, 'en') as any;
    const zheng = resolved.members.find((m: any) => m.name === 'Zheng Zhenyu');
    expect(zheng).toBeDefined();
    expect(zheng.position).toBe('Lead');
  });
});

describe('JSON-LD — 郑振宇移除与保留验证', () => {
  const zhJsonLd = readJsonLdJson('zh', 'community/organization');
  const zhOrg = zhJsonLd.find((item: any) => item['@type'] === 'Organization');

  it('zh 用户委员会 JSON-LD 不包含郑振宇 Person 条目', () => {
    const userOrg = zhOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler 用户委员会'
    );
    expect(userOrg).toBeDefined();
    const zheng = userOrg.member.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeUndefined();
  });

  it('zh 社区运营工作组 JSON-LD 仍包含郑振宇为组长', () => {
    const opsOrg = zhOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler 社区运营工作组'
    );
    expect(opsOrg).toBeDefined();
    const zheng = opsOrg.member.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeDefined();
    expect(zheng['@type']).toBe('Person');
    expect(zheng.jobTitle).toBe('组长');
  });

  it('en User Committee JSON-LD 不包含 Zheng Zhenyu Person 条目', () => {
    const enJsonLd = readJsonLdJson('en', 'community/organization');
    const enOrg = enJsonLd.find((item: any) => item['@type'] === 'Organization');
    const userOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    expect(userOrg).toBeDefined();
    const zheng = userOrg.member.find((m: any) => m.name === 'Zheng Zhenyu');
    expect(zheng).toBeUndefined();
  });
});

describe('organization.json — 郑振宇移除与保留验证', () => {
  const orgJson = JSON.parse(fs.readFileSync(ORG_JSON_PATH, 'utf-8'));

  it('zh 用户委员会 section 不包含郑振宇', () => {
    const zhSections = orgJson.zh.memberList;
    const userSection = zhSections.find((s: any) => s.title === 'openEuler 用户委员会');
    expect(userSection).toBeDefined();
    const zheng = userSection.list.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeUndefined();
  });

  it('en User Committee section 不包含 Zheng Zhenyu', () => {
    const enSections = orgJson.en.memberList;
    const userSection = enSections.find((s: any) => s.title === 'openEuler User Committee');
    expect(userSection).toBeDefined();
    const zheng = userSection.list.find((m: any) => m.name === 'Zheng Zhenyu');
    expect(zheng).toBeUndefined();
  });

  it('zh 社区运营工作组 section 仍包含郑振宇为组长', () => {
    const zhSections = orgJson.zh.memberList;
    const opsSection = zhSections.find((s: any) => s.title === 'openEuler 社区运营工作组');
    expect(opsSection).toBeDefined();
    const zheng = opsSection.list.find((m: any) => m.name === '郑振宇');
    expect(zheng).toBeDefined();
    expect(zheng.position).toContain('组长');
  });
});

describe('YAML 与 JSON-LD 用户委员会郑振宇交叉验证', () => {
  const user = loadYaml('user');
  const zhJsonLd = readJsonLdJson('zh', 'community/organization');
  const zhOrg = zhJsonLd.find((item: any) => item['@type'] === 'Organization');
  const enJsonLd = readJsonLdJson('en', 'community/organization');
  const enOrg = enJsonLd.find((item: any) => item['@type'] === 'Organization');

  it('zh 用户委员会 JSON-LD 与 YAML 均不含郑振宇', () => {
    const yamlZheng = user.members.find((m: any) => m.name === '郑振宇');
    expect(yamlZheng).toBeUndefined();

    const userOrg = zhOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler 用户委员会'
    );
    const jsonLdZheng = userOrg.member.find((m: any) => m.name === '郑振宇');
    expect(jsonLdZheng).toBeUndefined();
  });

  it('en User Committee JSON-LD 与 YAML 均不含 Zheng Zhenyu', () => {
    const yamlZheng = user.members.find((m: any) => m.name_en === 'Zheng Zhenyu');
    expect(yamlZheng).toBeUndefined();

    const userOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    const jsonLdZheng = userOrg.member.find((m: any) => m.name === 'Zheng Zhenyu');
    expect(jsonLdZheng).toBeUndefined();
  });

  it('en User Committee JSON-LD member 数与 YAML members 数一致(18)', () => {
    const userOrg = enOrg.subOrganization.find((s: any) =>
      s.name === 'openEuler User Committee'
    );
    expect(userOrg.member.length).toBe(user.members.length);
  });
});

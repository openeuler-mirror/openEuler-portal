// Issue #272: 白银捐赠人列表移除"奥思维科技"。
//
// 数据层已从 app/.vitepress/src/data/about-us/member-data.ts 迁移到
// .content/community/member/{zh,en}.yaml(TheMember.vue 经 #content/community/member 消费),
// 本测试同步改为对 yaml 数据源的回归守卫。
//
// 验证点:
//   1. Silver-Donors.logo_list 不再含 alt 含"奥思维"的项(核心回归,zh/en 双源)
//   2. 数组首元素删除后,AMD 升为 Silver-Donors 首项(顺序正确)
//   3. 其余 11 条白银捐赠人不变
//   4. 死资产 aosiwei_{light,dark}.png 已从 member/ 目录清理
//   5. 边界:荣誉页 2025 的 aosiwei 资产(不同目录、不同文件名)未受影响

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const MEMBER_ZH_PATH = path.join(PROJECT_ROOT, '.content/community/member/zh.yaml');
const MEMBER_EN_PATH = path.join(PROJECT_ROOT, '.content/community/member/en.yaml');
const MEMBER_ASSETS_DIR = path.join(PROJECT_ROOT, '.content/community/member/images');
const HONOR_2025_ASSETS_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/assets/category/honor/company/2025'
);
const HONOR_2025_DATA_PATH = path.join(
  PROJECT_ROOT,
  '.content/community/honor/2025.yaml'
);

function readSection(yamlPath: string, sectionId: string): string {
  const src = fs.readFileSync(yamlPath, 'utf8');
  const marker = `- id: ${sectionId}`;
  const start = src.indexOf(marker);
  expect(start, `${yamlPath} 应含 section ${sectionId}`).toBeGreaterThanOrEqual(0);
  const next = src.indexOf('\n  - id: ', start + marker.length);
  return next === -1 ? src.slice(start) : src.slice(start, next);
}

function countEntries(section: string): number {
  return (section.match(/- img_light:/g) ?? []).length;
}

const silverZh = readSection(MEMBER_ZH_PATH, 'Silver-Donors');
const silverEn = readSection(MEMBER_EN_PATH, 'Silver-Donors');

describe('奥思维移除 — Silver-Donors 数据层(yaml)', () => {
  it('zh.yaml Silver-Donors 不含 alt 含"奥思维"的项(核心回归)', () => {
    expect(silverZh, '奥思维应已被移除,但仍存在').not.toContain('奥思维');
  });

  it('en.yaml Silver-Donors 不含 alt 含"奥思维"的项(核心回归)', () => {
    expect(silverEn, '奥思维应已被移除,但仍存在').not.toContain('奥思维');
  });

  it('zh/en 均不含 aosiwei 资产引用(import/路径回归守卫)', () => {
    expect(silverZh).not.toContain('aosiwei');
    expect(silverEn).not.toContain('aosiwei');
  });

  it('zh.yaml Silver-Donors 首项为 AMD(数组首元素删除后顺序正确)', () => {
    const first = silverZh.slice(silverZh.indexOf('- img_light:')).match(/alt: (.+)/);
    expect(first?.[1]?.trim(), '首项应为 AMD').toBe('AMD');
  });

  it('Silver-Donors 仍有 11 条(其余捐赠人不变,zh/en 一致)', () => {
    expect(countEntries(silverZh), `zh 应为 11 条,实际 ${countEntries(silverZh)}`).toBe(11);
    expect(countEntries(silverEn), `en 应为 11 条,实际 ${countEntries(silverEn)}`).toBe(11);
  });
});

describe('奥思维移除 — 死资产清理', () => {
  it('aosiwei_light.png 已从 member/images 目录删除', () => {
    const fp = path.join(MEMBER_ASSETS_DIR, 'aosiwei_light.png');
    expect(fs.existsSync(fp), `死资产应已删除,但仍存在: ${fp}`).toBe(false);
  });

  it('aosiwei_dark.png 已从 member/images 目录删除', () => {
    const fp = path.join(MEMBER_ASSETS_DIR, 'aosiwei_dark.png');
    expect(fs.existsSync(fp), `死资产应已删除,但仍存在: ${fp}`).toBe(false);
  });
});

describe('边界 — 荣誉页 2025 aosiwei 资产未受影响', () => {
  it('honor/company/2025/aosiwei.png 仍存在(不同目录、不同文件名,不应被联动删除)', () => {
    const fp = path.join(HONOR_2025_ASSETS_DIR, 'aosiwei.png');
    expect(fs.existsSync(fp), `荣誉页资产应存在: ${fp}`).toBe(true);
  });

  it('honor/company/2025/aosiwei-dark.png 仍存在', () => {
    const fp = path.join(HONOR_2025_ASSETS_DIR, 'aosiwei-dark.png');
    expect(fs.existsSync(fp), `荣誉页资产应存在: ${fp}`).toBe(true);
  });

  it('2025.yaml 仍引用 honor 路径下的 aosiwei(源码引用未受影响)', () => {
    const src = fs.readFileSync(HONOR_2025_DATA_PATH, 'utf8');
    expect(src).toContain("./images/company/2025/aosiwei.png");
    expect(src).toContain("./images/company/2025/aosiwei-dark.png");
  });
});

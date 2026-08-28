// Issue #272: 白银捐赠人列表移除"奥思维科技"。
//
// 验证点(对齐设计 §3 / §4 / §5):
//   1. Silver-Donors.logoList 不再含 alt 含"奥思维"的项(核心回归)
//   2. 数组首元素删除后,AMD 升为 Silver-Donors 首项(顺序正确)
//   3. 其余 11 条白银捐赠人不变(design §4 边界)
//   4. 死资产 aosiwei_{light,dark}.png 已从 member/ 目录清理
//   5. 边界:荣誉页 2025 的 aosiwei 资产(不同目录、不同文件名)未受影响
//   6. member-data.ts 源码不再 import aosiwei_*(import 行清理回归守卫)
//   7. 数据完整性:全部 logoList 条目字段齐全 + img_light 互不重复(v-for :key 安全)
//   8. 双语一致性:donorTitle 含 zh/en(数据单源,zh/en 共享,改一处双语生效)
//
// 写法仿 organization-user-committee-zheng-removal.test.ts(removal 类回归)
// + community-ai-coding-assistants.test.ts(直接 import TS 数据模块)。

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import memberData from '../app/.vitepress/src/data/about-us/member-data';

const PROJECT_ROOT = process.cwd();
const MEMBER_DATA_PATH = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/data/about-us/member-data.ts'
);
const MEMBER_ASSETS_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/assets/category/member'
);
const HONOR_2025_ASSETS_DIR = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/assets/category/honor/company/2025'
);
const HONOR_2025_DATA_PATH = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/data/honor/2025.ts'
);

interface DonorLogo {
  img_light: string;
  img_dark: string;
  alt: string;
  noIcon?: boolean;
}

interface DonorSection {
  donorTitle: { zh: string; en: string };
  ID: string;
  logoList: DonorLogo[];
}

const sections = memberData as DonorSection[];
const silver = sections.find((s) => s.ID === 'Silver-Donors');

describe('奥思维移除 — Silver-Donors 数据层', () => {
  it('Silver-Donors section 存在', () => {
    expect(silver, '应有 ID=Silver-Donors 的 section').toBeDefined();
  });

  it('Silver-Donors.logoList 不含 alt 含"奥思维"的项(核心回归)', () => {
    const aosiwei = silver!.logoList.find((l) => l.alt.includes('奥思维'));
    expect(aosiwei, '奥思维应已被移除,但仍存在').toBeUndefined();
  });

  it('Silver-Donors 首项为 AMD(数组首元素删除后顺序正确)', () => {
    expect(silver!.logoList[0].alt, `首项 alt 应为 AMD,实际为 ${silver!.logoList[0].alt}`).toBe('AMD');
  });

  it('Silver-Donors 仍有 11 条(其余捐赠人不变)', () => {
    expect(silver!.logoList, `应为 11 条,实际 ${silver!.logoList.length}`).toHaveLength(11);
  });

  it('Silver-Donors 不含 alt 含"奥思维科技"全称的项(原 alt 精确值回归)', () => {
    const exact = silver!.logoList.find((l) => l.alt === '奥思维科技');
    expect(exact, '原 alt="奥思维科技" 应已删除').toBeUndefined();
  });
});

describe('奥思维移除 — 全部等级数据完整性', () => {
  it('6 个捐赠人等级均存在(Strategic/Platinum/Gold/Silver/Bronze/Academic)', () => {
    const ids = sections.map((s) => s.ID);
    expect(ids).toContain('Strategic-Donors');
    expect(ids).toContain('Platinum-Donors');
    expect(ids).toContain('Gold-Donors');
    expect(ids).toContain('Silver-Donors');
    expect(ids).toContain('Bronze-Donors');
    expect(ids).toContain('Academic-Institutions');
    expect(sections).toHaveLength(6);
  });

  it('每个 section 的 donorTitle 含 zh/en 双语字段(双语一致性)', () => {
    for (const s of sections) {
      expect(s.donorTitle.zh, `${s.ID}: donorTitle.zh 缺失`).toBeTypeOf('string');
      expect(s.donorTitle.zh.length, `${s.ID}: donorTitle.zh 不应为空`).toBeGreaterThan(0);
      expect(s.donorTitle.en, `${s.ID}: donorTitle.en 缺失`).toBeTypeOf('string');
      expect(s.donorTitle.en.length, `${s.ID}: donorTitle.en 不应为空`).toBeGreaterThan(0);
    }
  });

  it('每个 logoList 条目 img_light/img_dark/alt 字段齐全(无破损条目)', () => {
    for (const s of sections) {
      for (const logo of s.logoList) {
        const ctx = `${s.ID} alt="${logo.alt}"`;
        expect(logo.img_light, `${ctx}: 缺 img_light`).toBeTypeOf('string');
        expect(logo.img_light.length, `${ctx}: img_light 不应为空`).toBeGreaterThan(0);
        expect(logo.img_dark, `${ctx}: 缺 img_dark`).toBeTypeOf('string');
        expect(logo.img_dark.length, `${ctx}: img_dark 不应为空`).toBeGreaterThan(0);
        expect(logo.alt, `${ctx}: 缺 alt`).toBeTypeOf('string');
        expect(logo.alt.length, `${ctx}: alt 不应为空`).toBeGreaterThan(0);
      }
    }
  });

  it('全部 logoList 的 img_light 互不重复(v-for :key=img_light 安全)', () => {
    const allLights = sections.flatMap((s) => s.logoList.map((l) => l.img_light));
    const dups = allLights.filter((url, i) => allLights.indexOf(url) !== i);
    expect(dups, `img_light 重复: ${dups.join(', ')}(TheMember.vue 用 :key=img_light)`).toEqual([]);
  });
});

describe('奥思维移除 — member-data.ts 源码 import 行清理', () => {
  it('源码不再 import aosiwei_light(import 行回归守卫)', () => {
    const src = fs.readFileSync(MEMBER_DATA_PATH, 'utf8');
    expect(src, '源码不应再含 aosiwei_light import').not.toMatch(
      /import\s+aosiwei_light\s+from/
    );
  });

  it('源码不再 import aosiwei_dark(import 行回归守卫)', () => {
    const src = fs.readFileSync(MEMBER_DATA_PATH, 'utf8');
    expect(src, '源码不应再含 aosiwei_dark import').not.toMatch(
      /import\s+aosiwei_dark\s+from/
    );
  });

  it('源码不再引用 aosiwei 标识符(防 dangling reference)', () => {
    const src = fs.readFileSync(MEMBER_DATA_PATH, 'utf8');
    expect(src, '源码不应再含 aosiwei 标识符').not.toMatch(/\baosiwei\b/);
  });
});

describe('奥思维移除 — 死资产清理', () => {
  it('aosiwei_light.png 已从 member/ 目录删除', () => {
    const fp = path.join(MEMBER_ASSETS_DIR, 'aosiwei_light.png');
    expect(fs.existsSync(fp), `死资产应已删除,但仍存在: ${fp}`).toBe(false);
  });

  it('aosiwei_dark.png 已从 member/ 目录删除', () => {
    const fp = path.join(MEMBER_ASSETS_DIR, 'aosiwei_dark.png');
    expect(fs.existsSync(fp), `死资产应已删除,但仍存在: ${fp}`).toBe(false);
  });
});

describe('边界 — 荣誉页 2025 aosiwei 资产未受影响(design §4)', () => {
  it('honor/company/2025/aosiwei.png 仍存在(不同目录、不同文件名,不应被联动删除)', () => {
    const fp = path.join(HONOR_2025_ASSETS_DIR, 'aosiwei.png');
    expect(fs.existsSync(fp), `荣誉页资产应存在: ${fp}`).toBe(true);
  });

  it('honor/company/2025/aosiwei-dark.png 仍存在', () => {
    const fp = path.join(HONOR_2025_ASSETS_DIR, 'aosiwei-dark.png');
    expect(fs.existsSync(fp), `荣誉页资产应存在: ${fp}`).toBe(true);
  });

  it('2025.ts 仍引用 honor 路径下的 aosiwei(源码引用未受影响)', () => {
    const src = fs.readFileSync(HONOR_2025_DATA_PATH, 'utf8');
    expect(src).toContain("assets/category/honor/company/2025/aosiwei.png");
    expect(src).toContain("assets/category/honor/company/2025/aosiwei-dark.png");
  });

  it('member 与 honor 的 aosiwei 资产是不同文件(不同路径)', () => {
    const memberLight = path.join(MEMBER_ASSETS_DIR, 'aosiwei_light.png');
    const honorLight = path.join(HONOR_2025_ASSETS_DIR, 'aosiwei.png');
    expect(memberLight).not.toBe(honorLight);
    // member 的已删,只有 honor 的还在——文件名也不同(_light 后缀 vs 无后缀)
    expect(fs.existsSync(memberLight)).toBe(false);
    expect(fs.existsSync(honorLight)).toBe(true);
  });
});

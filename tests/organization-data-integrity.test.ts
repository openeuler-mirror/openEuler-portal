// `.content/community/organization/{zh,en}.yaml` 的端到端数据完整性检查。
//
// 加载 zh.yaml 和 en.yaml,跑一遍 Vue 组件那条管线(deriveAnchor),
// 然后断言一组不变式,用于拦截数据迁移期间出过的那类 bug:姓名 typo、
// 图片缺失、anchor 派生跑偏、zh/en 数据不同步、image 路径越出
// `.content/community/organization/images/` 等。
//
// 这些检查不走 Vite 插件:直接 fs + js-yaml 读原始 YAML,因为我们关心的是
// 数据本身,而不是 vite-plugin-content-yaml 在 transform 阶段如何处理 image。

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// 本地副本(与 TheOrganization.vue 内联的实现保持一致)。
// 用于校验 yaml 里的 anchor 是否已是规范形式。
function deriveAnchor(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// vitest 默认从项目根目录跑(vitest.config.js 就在根目录)。
const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/community/organization');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');

// SECTIONS 必须与 TheOrganization.vue 一致(产品决策的渲染顺序)。
const SECTIONS = [
  'advisory', 'committee', 'technical', 'marketing',
  'user', 'business', 'operations', 'education',
  'legal', 'ai', 'globalization',
] as const;

interface MemberLike {
  name?: string;
  image?: string;
  position?: string | string[];
  post?: string;
  email?: string;
  gitee?: string;
}

interface GroupLike {
  title?: string;
  members: MemberLike[];
}

interface SectionLike {
  title?: string;
  anchor?: string;
  members?: MemberLike[];
  groups?: GroupLike[];
  rows?: MemberLike[][];
}

function loadLocale(lang: 'zh' | 'en'): Record<string, SectionLike> {
  const fp = path.join(CONTENT_DIR, `${lang}.yaml`);
  return yaml.load(fs.readFileSync(fp, 'utf8')) as Record<string, SectionLike>;
}

const zhData = loadLocale('zh');
const enData = loadLocale('en');

function collectMembers(sec: SectionLike | undefined): MemberLike[] {
  if (!sec) return [];
  if (sec.members) return sec.members;
  if (sec.groups) return sec.groups.flatMap((g) => g.members);
  if (sec.rows) return sec.rows.flat();
  return [];
}

// image 字段在 YAML 里是 `./images/<name>` 形式(给 vite-plugin-content-yaml 用),
// 这里剥掉前缀拿回相对 images/ 目录的文件名,用于存在性检查。
function stripImagePrefix(p: string): string {
  return p.replace(/^\.\/images\//, '');
}

describe('organization YAML — 文件完整性', () => {
  it('zh.yaml 和 en.yaml 都存在', () => {
    expect(fs.existsSync(path.join(CONTENT_DIR, 'zh.yaml')), '缺失 zh.yaml').toBe(true);
    expect(fs.existsSync(path.join(CONTENT_DIR, 'en.yaml')), '缺失 en.yaml').toBe(true);
  });

  it('zh/en 两个 locale 都包含全部 11 个 SECTIONS slug', () => {
    for (const slug of SECTIONS) {
      expect(zhData[slug], `zh.yaml 缺 section: ${slug}`).toBeDefined();
      expect(enData[slug], `en.yaml 缺 section: ${slug}`).toBeDefined();
    }
    expect(Object.keys(zhData).length, 'zh.yaml section 数应为 11').toBe(11);
    expect(Object.keys(enData).length, 'en.yaml section 数应为 11').toBe(11);
  });

  it('每个 section 都有 title + anchor + 三种数据形态之一(members/groups/rows)', () => {
    for (const slug of SECTIONS) {
      const zh = zhData[slug];
      const en = enData[slug];
      expect(zh.title, `${slug}.zh 缺 title`).toBeTypeOf('string');
      expect(en.title, `${slug}.en 缺 title`).toBeTypeOf('string');
      expect(zh.anchor, `${slug}.zh 缺 anchor`).toBeTypeOf('string');
      expect(en.anchor, `${slug}.en 缺 anchor`).toBeTypeOf('string');
      const zhFormCount = [zh.members, zh.groups, zh.rows].filter(Boolean).length;
      const enFormCount = [en.members, en.groups, en.rows].filter(Boolean).length;
      expect(zhFormCount, `${slug}.zh 必须有且仅有一种数据形态`).toBe(1);
      expect(enFormCount, `${slug}.en 必须有且仅有一种数据形态`).toBe(1);
      // zh/en 必须用同一种形态
      const zhForm = ['members', 'groups', 'rows'].find((k) => zh[k as keyof SectionLike]);
      const enForm = ['members', 'groups', 'rows'].find((k) => en[k as keyof SectionLike]);
      expect(zhForm, `${slug}: zh/en 形态不一致`).toBe(enForm);
    }
  });
});

describe('organization YAML — 成员字段约束', () => {
  it('每个成员的 name / image 必填(zh/en 都要)', () => {
    for (const slug of SECTIONS) {
      const zhMembers = collectMembers(zhData[slug]);
      const enMembers = collectMembers(enData[slug]);
      expect(zhMembers.length, `${slug}.zh 成员数与 en 不一致`).toBe(enMembers.length);
      for (const m of zhMembers) {
        const ctx = `${slug}.zh member ${m.name ?? '<unnamed>'}`;
        expect(m.name, `${ctx}: 缺 name`).toBeTypeOf('string');
        expect(m.image, `${ctx}: 缺 image`).toBeTypeOf('string');
      }
      for (const m of enMembers) {
        const ctx = `${slug}.en member ${m.name ?? '<unnamed>'}`;
        expect(m.name, `${ctx}: 缺 name`).toBeTypeOf('string');
        expect(m.image, `${ctx}: 缺 image`).toBeTypeOf('string');
      }
    }
  });

  it('image 字段都以 ./images/ 前缀开头(vite-plugin-content-yaml 的约定)', () => {
    for (const slug of SECTIONS) {
      const members = collectMembers(zhData[slug]);
      for (const m of members) {
        expect(m.image, `${slug}.yaml ${m.name}: image 必须以 ./images/ 开头`)
          .toMatch(/^\.\/images\//);
      }
    }
  });

  it('zh 的 name 是中文字符 (Andrew Wafaa / Fred Huang 这类外国人例外)', () => {
    const knownEnglishOnlyNames = new Set(['Andrew Wafaa', 'Fred Huang']);
    for (const slug of SECTIONS) {
      const zhMembers = collectMembers(zhData[slug]);
      const enMembers = collectMembers(enData[slug]);
      zhMembers.forEach((m, i) => {
        const enName = enMembers[i]?.name ?? '';
        if (knownEnglishOnlyNames.has(enName)) return;
        // 中文姓名应至少包含一个中文字符
        const hasChinese = /[一-鿿]/.test(m.name!);
        expect(hasChinese, `${slug}.zh: name "${m.name}" 应含中文字符 (en: ${enName})`).toBe(true);
      });
    }
  });

  it('en 的 name 是 ASCII (空格分隔的姓名)', () => {
    for (const slug of SECTIONS) {
      const enMembers = collectMembers(enData[slug]);
      for (const m of enMembers) {
        const isAscii = /^[\x00-\x7F]+$/.test(m.name!);
        expect(isAscii, `${slug}.en: name "${m.name}" 应是纯 ASCII`).toBe(true);
      }
    }
  });

  it('email 字段格式合法', () => {
    for (const slug of SECTIONS) {
      const members = collectMembers(zhData[slug]);
      for (const m of members) {
        if (m.email === undefined) continue;
        expect(m.email, `${slug}.yaml member ${m.name}: email "${m.email}" 格式非法`)
          .toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      }
    }
  });
});

describe('organization YAML — 图片存在性', () => {
  it('每个 image 字段指向的文件都在 .content/community/organization/images/ 下存在', () => {
    const missing: string[] = [];
    for (const slug of SECTIONS) {
      const members = collectMembers(zhData[slug]);
      for (const m of members) {
        const fp = path.join(IMAGES_DIR, stripImagePrefix(m.image!));
        if (!fs.existsSync(fp)) {
          missing.push(`${slug}.yaml ${m.name} -> ${m.image} (looked at ${fp})`);
        }
      }
    }
    expect(missing, `缺失图片:\n${missing.join('\n')}`).toEqual([]);
  });
});

describe('organization YAML — anchor 字段', () => {
  it('每个 section 都有非空 anchor 字段(仅小写字母/数字/连字符)', () => {
    for (const slug of SECTIONS) {
      const anchor = enData[slug].anchor!;
      expect(anchor, `${slug}: 缺 anchor 字段`).toBeTypeOf('string');
      expect(anchor.length, `${slug}: anchor 为空`).toBeGreaterThan(0);
      expect(anchor, `${slug}: anchor 含非法字符`).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('yaml 里的 anchor 已是规范形式(deriveAnchor(anchor) === anchor,避免运营误写大写/空格/特殊字符)', () => {
    for (const slug of SECTIONS) {
      const anchor = enData[slug].anchor!;
      const normalized = deriveAnchor(anchor);
      expect(normalized, `${slug}: anchor "${anchor}" 不是规范形式,经 deriveAnchor 后变为 "${normalized}",请修正 yaml`).toBe(anchor);
    }
  });

  it('所有 section 的 anchor 互不重复', () => {
    const anchors = SECTIONS.map((slug) => enData[slug].anchor!);
    const dups = anchors.filter((a, i) => anchors.indexOf(a) !== i);
    expect(dups, `重复 anchor: ${dups.join(', ')}`).toEqual([]);
  });

  it('zh/en 的 anchor 字段一致(zh/en 共用同一英文 anchor)', () => {
    for (const slug of SECTIONS) {
      expect(zhData[slug].anchor, `${slug}: zh/en anchor 不一致`).toBe(enData[slug].anchor);
    }
  });
});

describe('organization YAML — zh/en 同步性', () => {
  it('每个 section 的 zh/en 成员数一致', () => {
    for (const slug of SECTIONS) {
      const zhMembers = collectMembers(zhData[slug]);
      const enMembers = collectMembers(enData[slug]);
      expect(zhMembers.length, `${slug}: zh/en 成员数不一致`).toBe(enMembers.length);
    }
  });

  it('每个成员的 image 在 zh/en 之间一致(zh/en 共用同一张头像)', () => {
    for (const slug of SECTIONS) {
      const zhMembers = collectMembers(zhData[slug]);
      const enMembers = collectMembers(enData[slug]);
      zhMembers.forEach((m, i) => {
        expect(enMembers[i].image, `${slug} member ${i}: zh/en image 不一致`).toBe(m.image);
      });
    }
  });

  it('数据已按 locale 拆分,无 _en 兄弟字段', () => {
    for (const slug of SECTIONS) {
      const zhLeftover = Object.keys(zhData[slug]).filter((k) => k.endsWith('_en'));
      expect(zhLeftover, `${slug}.zh 残留 _en 字段: ${zhLeftover.join(', ')}`).toEqual([]);
      const enLeftover = Object.keys(enData[slug]).filter((k) => k.endsWith('_en'));
      expect(enLeftover, `${slug}.en 残留 _en 字段: ${enLeftover.join(', ')}`).toEqual([]);
    }
  });
});

describe('organization YAML — 已知 typo 与回归用例', () => {
  it('技术委员会的"马全一"必须有"马"字 (历史 typo: "全一")', () => {
    const technical = zhData.technical;
    const enTechnical = enData.technical;
    const zhMembers = collectMembers(technical);
    const enMembers = collectMembers(enTechnical);
    const idx = enMembers.findIndex((m) => m.name === 'Ma Quanyi');
    expect(idx, 'technical 没有 Ma Quanyi').toBeGreaterThanOrEqual(0);
    expect(zhMembers[idx].name, '中文名应是"马全一"不是"全一"').toBe('马全一');
  });

  it('社区运营工作组的"胡骁杰"必须有"胡"字 (历史 typo: "骁杰")', () => {
    const operations = zhData.operations;
    const enOperations = enData.operations;
    const zhMembers = collectMembers(operations);
    const enMembers = collectMembers(enOperations);
    const idx = enMembers.findIndex((m) => m.name === 'Hu Xiaojie');
    expect(idx, 'operations 没有 Hu Xiaojie').toBeGreaterThanOrEqual(0);
    expect(zhMembers[idx].name, '中文名应是"胡骁杰"不是"骁杰"').toBe('胡骁杰');
  });

  it('技术委员会的 Chen Yaqiang 修正了原 ts 的 "Chenn Yaqiang" typo', () => {
    const technical = zhData.technical;
    const enTechnical = enData.technical;
    const zhMembers = collectMembers(technical);
    const enMembers = collectMembers(enTechnical);
    const idx = zhMembers.findIndex((m) => m.name === '陈亚强');
    expect(idx, 'technical 没有陈亚强').toBeGreaterThanOrEqual(0);
    expect(enMembers[idx].name, '英文名应是 "Chen Yaqiang"(原 ts 的 "Chenn" 是 typo)').toBe('Chen Yaqiang');
  });
});

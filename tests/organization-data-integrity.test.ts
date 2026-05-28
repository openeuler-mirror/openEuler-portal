// `.content/organization/*.yaml` 的端到端数据完整性检查。
//
// 加载所有 YAML,跑一遍 Vue 组件那条管线(deriveAnchor + foldI18n),
// 然后断言一组不变式,用于拦截数据迁移期间出过的那类 bug:姓名 typo、
// 图片缺失、anchor 派生跑偏、i18n 解析后字段消失、image 路径越出
// `.content/organization/images/` 等。
//
// 这些检查不走 Vite 插件:直接 fs + js-yaml 读原始 YAML,因为我们关心的是
// 数据本身,而不是 vite-plugin-content-yaml 在 transform 阶段如何处理 image。

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

// 本地副本(与 TheOrganization.vue 内的实现保持一致)。
function deriveAnchor(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// vitest 默认从项目根目录跑(vitest.config.js 就在根目录)。
const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/organization');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');

interface MemberLike {
  name?: string;
  name_en?: string;
  image?: string;
  position?: string | string[];
  position_en?: string | string[];
  post?: string;
  post_en?: string;
  email?: string;
  gitee?: string;
}

interface SectionLike {
  title?: string;
  title_en?: string;
  members?: MemberLike[];
  groups?: Array<{ title?: string; title_en?: string; members: MemberLike[] }>;
  rows?: MemberLike[][];
}

function loadAllSections(): Array<{ slug: string; raw: SectionLike }> {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => {
      const slug = f.replace(/\.(yaml|yml)$/, '');
      const raw = yaml.load(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8')) as SectionLike;
      return { slug, raw };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function collectMembers(sec: SectionLike): MemberLike[] {
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

const sections = loadAllSections();

describe('organization YAML — 文件完整性', () => {
  it('共有 11 个 section YAML 文件(扫描 .content/organization/)', () => {
    expect(sections).toHaveLength(11);
  });

  it('每个 SECTION slug 都有对应 YAML 文件', () => {
    for (const { slug } of sections) {
      const fp = path.join(CONTENT_DIR, `${slug}.yaml`);
      expect(fs.existsSync(fp), `缺失文件: ${fp}`).toBe(true);
    }
  });

  it('每个 YAML 都有 title + title_en + 三种数据形态之一', () => {
    for (const { slug, raw } of sections) {
      expect(raw.title, `${slug}.yaml 缺 title`).toBeTypeOf('string');
      expect(raw.title_en, `${slug}.yaml 缺 title_en`).toBeTypeOf('string');
      const formCount = [raw.members, raw.groups, raw.rows].filter(Boolean).length;
      expect(formCount, `${slug}.yaml 必须有且仅有一种数据形态(members/groups/rows)`).toBe(1);
    }
  });

  it('id / id_en 字段已经从 YAML 移除(改为从 title_en 派生 anchor)', () => {
    for (const { slug, raw } of sections) {
      const r = raw as Record<string, unknown>;
      expect(r.id, `${slug}.yaml 不应再有 id 字段`).toBeUndefined();
      expect(r.id_en, `${slug}.yaml 不应再有 id_en 字段`).toBeUndefined();
      expect(r.id_zh, `${slug}.yaml 不应再有 id_zh 字段`).toBeUndefined();
    }
  });
});

describe('organization YAML — 成员字段约束', () => {
  it('每个成员的 name / name_en / image 必填', () => {
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
      for (const m of members) {
        const ctx = `${slug}.yaml member ${m.name ?? m.name_en ?? '<unnamed>'}`;
        expect(m.name, `${ctx}: 缺 name`).toBeTypeOf('string');
        expect(m.name_en, `${ctx}: 缺 name_en`).toBeTypeOf('string');
        expect(m.image, `${ctx}: 缺 image`).toBeTypeOf('string');
      }
    }
  });

  it('image 字段都以 ./images/ 前缀开头(vite-plugin-content-yaml 的约定)', () => {
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
      for (const m of members) {
        expect(m.image, `${slug}.yaml ${m.name}: image 必须以 ./images/ 开头`)
          .toMatch(/^\.\/images\//);
      }
    }
  });

  it('中文 name 是中文字符 (Andrew Wafaa / Fred Huang 这类外国人例外)', () => {
    const knownEnglishOnlyNames = new Set(['Andrew Wafaa', 'Fred Huang']);
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
      for (const m of members) {
        if (knownEnglishOnlyNames.has(m.name_en!)) continue;
        // 中文姓名应至少包含一个中文字符
        const hasChinese = /[一-鿿]/.test(m.name!);
        expect(hasChinese, `${slug}.yaml: 中文 name "${m.name}" 应含中文字符 (en: ${m.name_en})`).toBe(true);
      }
    }
  });

  it('英文 name_en 是 ASCII (空格分隔的姓名)', () => {
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
      for (const m of members) {
        const isAscii = /^[\x00-\x7F]+$/.test(m.name_en!);
        expect(isAscii, `${slug}.yaml: name_en "${m.name_en}" 应是纯 ASCII`).toBe(true);
      }
    }
  });

  it('email 字段格式合法', () => {
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
      for (const m of members) {
        if (m.email === undefined) continue;
        expect(m.email, `${slug}.yaml member ${m.name}: email "${m.email}" 格式非法`)
          .toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      }
    }
  });

  it('position / position_en 同时存在或同时缺失;post / post_en 同样', () => {
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
      for (const m of members) {
        const ctx = `${slug}.yaml ${m.name}`;
        if (m.position !== undefined || m.position_en !== undefined) {
          expect(m.position, `${ctx}: position 和 position_en 必须同时存在`).toBeDefined();
          expect(m.position_en, `${ctx}: position 和 position_en 必须同时存在`).toBeDefined();
        }
        if (m.post !== undefined || m.post_en !== undefined) {
          expect(m.post, `${ctx}: post 和 post_en 必须同时存在`).toBeDefined();
          expect(m.post_en, `${ctx}: post 和 post_en 必须同时存在`).toBeDefined();
        }
      }
    }
  });
});

describe('organization YAML — 图片存在性', () => {
  it('每个 image 字段指向的文件都在 .content/organization/images/ 下存在', () => {
    const missing: string[] = [];
    for (const { slug, raw } of sections) {
      const members = collectMembers(raw);
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

describe('organization YAML — anchor 派生', () => {
  it('每个 section 的 title_en 都能派生出非空 anchor', () => {
    for (const { slug, raw } of sections) {
      const anchor = deriveAnchor(raw.title_en!);
      expect(anchor.length, `${slug}.yaml: anchor 为空`).toBeGreaterThan(0);
      expect(anchor, `${slug}.yaml: anchor 含非法字符`).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('所有 section 的 anchor 互不重复', () => {
    const anchors = sections.map(({ raw }) => deriveAnchor(raw.title_en!));
    const dups = anchors.filter((a, i) => anchors.indexOf(a) !== i);
    expect(dups, `重复 anchor: ${dups.join(', ')}`).toEqual([]);
  });
});

describe('organization YAML — foldI18n 后渲染数据', () => {
  it('zh 模式下,每个 section 的 title 含中文', () => {
    for (const { slug, raw } of sections) {
      const resolved = foldI18n(raw, 'zh') as SectionLike;
      expect(/[一-鿿]/.test(resolved.title!), `${slug}.yaml zh title 不含中文: "${resolved.title}"`).toBe(true);
    }
  });

  it('en 模式下,每个 section 的 title 是 ASCII', () => {
    for (const { slug, raw } of sections) {
      const resolved = foldI18n(raw, 'en') as SectionLike;
      expect(/^[\x00-\x7F]+$/.test(resolved.title!), `${slug}.yaml en title 不是 ASCII: "${resolved.title}"`).toBe(true);
    }
  });

  it('foldI18n 后所有 _en 字段都消失', () => {
    for (const lang of ['zh', 'en'] as const) {
      for (const { slug, raw } of sections) {
        const resolved = foldI18n(raw, lang) as Record<string, unknown>;
        const leftover = Object.keys(resolved).filter((k) => k.endsWith('_en'));
        expect(leftover, `${slug}.yaml lang=${lang} 残留 _en 字段: ${leftover.join(', ')}`).toEqual([]);
      }
    }
  });

  it('foldI18n 后 members/groups/rows 中的成员也无 _en 字段', () => {
    for (const lang of ['zh', 'en'] as const) {
      for (const { slug, raw } of sections) {
        const resolved = foldI18n(raw, lang) as SectionLike;
        const members = collectMembers(resolved);
        for (const m of members) {
          const leftover = Object.keys(m).filter((k) => k.endsWith('_en'));
          expect(leftover, `${slug}.yaml lang=${lang} ${m.name}: 残留 _en 字段: ${leftover.join(', ')}`).toEqual([]);
        }
      }
    }
  });
});

describe('organization YAML — 已知 typo 与回归用例', () => {
  it('技术委员会的"马全一"必须有"马"字 (历史 typo: "全一")', () => {
    const technical = sections.find((s) => s.slug === 'technical')!;
    const members = collectMembers(technical.raw);
    const maquanyi = members.find((m) => m.name_en === 'Ma Quanyi');
    expect(maquanyi, 'technical.yaml 没有 Ma Quanyi').toBeDefined();
    expect(maquanyi!.name, '中文名应是"马全一"不是"全一"').toBe('马全一');
  });

  it('社区运营工作组的"胡骁杰"必须有"胡"字 (历史 typo: "骁杰")', () => {
    const operations = sections.find((s) => s.slug === 'operations')!;
    const members = collectMembers(operations.raw);
    const huxiaojie = members.find((m) => m.name_en === 'Hu Xiaojie');
    expect(huxiaojie, 'operations.yaml 没有 Hu Xiaojie').toBeDefined();
    expect(huxiaojie!.name, '中文名应是"胡骁杰"不是"骁杰"').toBe('胡骁杰');
  });

  it('技术委员会的 Chen Yaqiang 修正了原 ts 的 "Chenn Yaqiang" typo', () => {
    const technical = sections.find((s) => s.slug === 'technical')!;
    const members = collectMembers(technical.raw);
    const chen = members.find((m) => m.name === '陈亚强');
    expect(chen, 'technical.yaml 没有陈亚强').toBeDefined();
    expect(chen!.name_en, '英文名应是 "Chen Yaqiang"(原 ts 的 "Chenn" 是 typo)').toBe('Chen Yaqiang');
  });
});

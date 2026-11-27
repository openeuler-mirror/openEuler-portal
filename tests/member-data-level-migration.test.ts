// Issue #380: 成员单位页捐赠人级别归属调整 + 新增光亚鸿道。
//
// 数据源: .content/community/member/{zh,en}.yaml (TheMember.vue 经
// #content/community/member 消费, 本测试不依赖虚拟模块, 直接读 yaml 文本)。
//
// 改动要点 (设计 architecture-design.md §3):
//   - 白金: 移出 tongxin(统信); 从白银移入 ningsi(宁思科技) 并删除其 no_icon(显星号)
//   - 黄金: 移出 intel(英特尔)
//   - 白银: 移除 baiduyun/boyun/langchaoyun(百度/博云/浪潮); 移出 ningsi; 从白金移入 tongxin(保留 no_icon:true); 从黄金移入 intel(保留 no_icon:true)
//   - 青铜: 末尾新增 guangyahongdao(光亚鸿道, no_icon:true, 新 logo)
//   - zh/en 数据改动逐条一致 (AGENTS.md §5 红线.7 i18n 双语同步)
//
// 验收只校验等级归属与星号, 不校验名称显示(alt 仅作无障碍文本, 页面不渲染名称标签)。

// @vitest-environment node

import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const MEMBER_DIR = path.join(PROJECT_ROOT, '.content/community/member');
const MEMBER_ZH_PATH = path.join(MEMBER_DIR, 'zh.yaml');
const MEMBER_EN_PATH = path.join(MEMBER_DIR, 'en.yaml');
const IMAGES_DIR = path.join(MEMBER_DIR, 'images');

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

// 把一个 section 切成逐条 logo 块(每块含 `- img_light:`)。
// yaml 里条目前有缩进空格, 不能用 `^` 行首锚点, 改用零宽前瞻在 `- img_light:` 前切分。
function entryBlocks(section: string): string[] {
  return section.split(/(?=- img_light:)/).filter((b) => b.includes('- img_light:'));
}

// 取某条目(按 img 文件名关键字定位, 如 'ningsi')的块文本。
function entryOf(section: string, imgKey: string): string {
  const block = entryBlocks(section).find((b) => b.includes(`${imgKey}_light.png`));
  expect(block, `section 应含 ${imgKey} 条目`).toBeDefined();
  return block ?? '';
}

function hasNoIcon(entry: string): boolean {
  return /no_icon:\s*true/.test(entry);
}

function altOf(entry: string): string {
  const m = entry.match(/alt:\s*(.+)/);
  return m ? m[1].trim() : '';
}

const zhSrc = () => fs.readFileSync(MEMBER_ZH_PATH, 'utf8');
const enSrc = () => fs.readFileSync(MEMBER_EN_PATH, 'utf8');

const platinumZh = readSection(MEMBER_ZH_PATH, 'Platinum-Donors');
const platinumEn = readSection(MEMBER_EN_PATH, 'Platinum-Donors');
const goldZh = readSection(MEMBER_ZH_PATH, 'Gold-Donors');
const goldEn = readSection(MEMBER_EN_PATH, 'Gold-Donors');
const silverZh = readSection(MEMBER_ZH_PATH, 'Silver-Donors');
const silverEn = readSection(MEMBER_EN_PATH, 'Silver-Donors');
const bronzeZh = readSection(MEMBER_ZH_PATH, 'Bronze-Donors');
const bronzeEn = readSection(MEMBER_EN_PATH, 'Bronze-Donors');

describe('Issue #380 — 白金级(Platinum-Donors)', () => {
  it('zh/en 均不再含 tongxin(统信移出白金)', () => {
    expect(platinumZh).not.toContain('tongxin');
    expect(platinumEn).not.toContain('tongxin');
  });

  it('zh/en 均含 ningsi(宁思科技移入白金)', () => {
    expect(platinumZh, 'zh 白金应含 ningsi').toContain('ningsi_light.png');
    expect(platinumEn, 'en 白金应含 ningsi').toContain('ningsi_light.png');
  });

  it('ningsi 条目省略 no_icon → 显示星号角标(zh/en 一致)', () => {
    const zhEntry = entryOf(platinumZh, 'ningsi');
    const enEntry = entryOf(platinumEn, 'ningsi');
    expect(hasNoIcon(zhEntry), 'zh ningsi 应省略 no_icon: true').toBe(false);
    expect(hasNoIcon(enEntry), 'en ningsi 应省略 no_icon: true').toBe(false);
  });

  it('白金级共 3 条(qilin / qilin-soft / ningsi, zh/en 一致)', () => {
    expect(countEntries(platinumZh)).toBe(3);
    expect(countEntries(platinumEn)).toBe(3);
  });
});

describe('Issue #380 — 黄金级(Gold-Donors)', () => {
  it('zh/en 均不再含 intel(英特尔移出黄金)', () => {
    expect(goldZh).not.toContain('intel');
    expect(goldEn).not.toContain('intel');
  });

  it('zh/en 均不含 tongxin / ningsi(未滞留)', () => {
    expect(goldZh).not.toContain('tongxin');
    expect(goldZh).not.toContain('ningsi');
    expect(goldEn).not.toContain('tongxin');
    expect(goldEn).not.toContain('ningsi');
  });

  it('黄金级共 7 条(zh/en 一致)', () => {
    expect(countEntries(goldZh)).toBe(7);
    expect(countEntries(goldEn)).toBe(7);
  });

  it('天翼云/联通/移动省略 no_icon → 显星号(未误改, zh/en 一致)', () => {
    for (const key of ['dianxing', 'liantong', 'yidong']) {
      expect(hasNoIcon(entryOf(goldZh, key)), `${key} 应省略 no_icon`).toBe(false);
      expect(hasNoIcon(entryOf(goldEn, key)), `${key} 应省略 no_icon`).toBe(false);
    }
  });
});

describe('Issue #380 — 白银级(Silver-Donors)', () => {
  it('zh/en 均不再含 baiduyun/boyun/langchaoyun(百度/博云/浪潮移除)', () => {
    expect(silverZh).not.toContain('baiduyun');
    expect(silverZh).not.toContain('boyun');
    expect(silverZh).not.toContain('langchaoyun');
    expect(silverEn).not.toContain('baiduyun');
    expect(silverEn).not.toContain('boyun');
    expect(silverEn).not.toContain('langchaoyun');
  });

  it('zh/en 均不再含 ningsi(已移入白金)', () => {
    expect(silverZh).not.toContain('ningsi');
    expect(silverEn).not.toContain('ningsi');
  });

  it('tongxin(统信)在白银且保留 no_icon:true(zh/en 一致)', () => {
    const zhEntry = entryOf(silverZh, 'tongxin');
    const enEntry = entryOf(silverEn, 'tongxin');
    expect(hasNoIcon(zhEntry), 'zh tongxin 应有 no_icon: true').toBe(true);
    expect(hasNoIcon(enEntry), 'en tongxin 应有 no_icon: true').toBe(true);
  });

  it('intel(英特尔)在白银且保留 no_icon:true(zh/en 一致)', () => {
    const zhEntry = entryOf(silverZh, 'intel');
    const enEntry = entryOf(silverEn, 'intel');
    expect(hasNoIcon(zhEntry), 'zh intel 应有 no_icon: true').toBe(true);
    expect(hasNoIcon(enEntry), 'en intel 应有 no_icon: true').toBe(true);
  });

  it('白银级共 9 条(zh/en 一致)', () => {
    expect(countEntries(silverZh)).toBe(9);
    expect(countEntries(silverEn)).toBe(9);
  });
});

describe('Issue #380 — 青铜级(Bronze-Donors) 新增光亚鸿道', () => {
  it('zh/en 均含 guangyahongdao(光亚鸿道新增)', () => {
    expect(bronzeZh, 'zh 青铜应含 guangyahongdao').toContain('guangyahongdao_light.png');
    expect(bronzeEn, 'en 青铜应含 guangyahongdao').toContain('guangyahongdao_light.png');
  });

  it('guangyahongdao 为青铜末项(数组顺序)', () => {
    const blocks = entryBlocks(bronzeZh);
    expect(blocks[blocks.length - 1]).toContain('guangyahongdao_light.png');
    const blocksEn = entryBlocks(bronzeEn);
    expect(blocksEn[blocksEn.length - 1]).toContain('guangyahongdao_light.png');
  });

  it('guangyahongdao 条目 no_icon:true(zh/en 一致)', () => {
    expect(hasNoIcon(entryOf(bronzeZh, 'guangyahongdao'))).toBe(true);
    expect(hasNoIcon(entryOf(bronzeEn, 'guangyahongdao'))).toBe(true);
  });

  it('青铜级共 5 条(zh/en 一致)', () => {
    expect(countEntries(bronzeZh)).toBe(5);
    expect(countEntries(bronzeEn)).toBe(5);
  });
});

describe('Issue #380 — zh/en 双语数据一致性', () => {
  const ids = ['Strategic-Donors', 'Platinum-Donors', 'Gold-Donors', 'Silver-Donors', 'Bronze-Donors', 'Academic-Institutions'];

  it.each(ids)('zh/en 的 %s logo 条目数一致', (id) => {
    const zh = readSection(MEMBER_ZH_PATH, id);
    const en = readSection(MEMBER_EN_PATH, id);
    expect(countEntries(en), `${id} en 条目数应等于 zh`).toBe(countEntries(zh));
  });

  it('zh/en 各级 alt 文本集合一致(logo 共用同一套)', () => {
    for (const id of ids) {
      const zhAlts = entryBlocks(readSection(MEMBER_ZH_PATH, id)).map(altOf).sort();
      const enAlts = entryBlocks(readSection(MEMBER_EN_PATH, id)).map(altOf).sort();
      expect(enAlts, `${id} zh/en alt 集合应一致`).toEqual(zhAlts);
    }
  });

  it('zh/en 全文均不含"科银/keyin"(无既有科银条目, 移除科银按字面 no-op)', () => {
    expect(zhSrc()).not.toContain('科银');
    expect(zhSrc()).not.toContain('keyin');
    expect(enSrc()).not.toContain('科银');
    expect(enSrc()).not.toContain('keyin');
  });
});

describe('Issue #380 — 光亚鸿道 logo 资产落地', () => {
  it('guangyahongdao_light.png 存在且非空', () => {
    const fp = path.join(IMAGES_DIR, 'guangyahongdao_light.png');
    expect(fs.existsSync(fp), `应存在: ${fp}`).toBe(true);
    expect(fs.statSync(fp).size, '不应为 0 字节').toBeGreaterThan(0);
  });

  it('guangyahongdao_dark.png 存在且非空', () => {
    const fp = path.join(IMAGES_DIR, 'guangyahongdao_dark.png');
    expect(fs.existsSync(fp), `应存在: ${fp}`).toBe(true);
    expect(fs.statSync(fp).size, '不应为 0 字节').toBeGreaterThan(0);
  });

  it('zh/en 引用的 logo 路径与实际资产文件名一致', () => {
    expect(zhSrc()).toContain('./images/guangyahongdao_light.png');
    expect(zhSrc()).toContain('./images/guangyahongdao_dark.png');
    expect(enSrc()).toContain('./images/guangyahongdao_light.png');
    expect(enSrc()).toContain('./images/guangyahongdao_dark.png');
  });
});

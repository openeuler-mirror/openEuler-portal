import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const PROJECT_ROOT = resolve(__dirname, '..');
const dataFile = join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/data/download/download.ts'
);

describe('download.ts — 24.03 LTS SP4 英文 DESC 术语更正（NPU slicing → NPU partitioning）', () => {
  let source: string;

  it('数据文件 download.ts 存在', () => {
    source = readFileSync(dataFile, 'utf-8');
    expect(source.length).toBeGreaterThan(0);
  });

  it('数据文件导出 zh 与 en 两套 COMMUNITY_LIST', () => {
    source = readFileSync(dataFile, 'utf-8');
    expect(source).toContain('export default');
    expect(source).toContain('zh:');
    expect(source).toContain('en:');
    expect(source).toContain('COMMUNITY_LIST');
  });

  it('en SP4 条目 DESC 含 "NPU partitioning"（更正后术语）', () => {
    source = readFileSync(dataFile, 'utf-8');
    const enSection = source.substring(source.indexOf('en:'));
    const sp4EntryMatch = enSection.match(
      /\{[^}]*NAME:\s*'openEuler 24\.03 LTS SP4'[^}]*\}/s
    );
    expect(sp4EntryMatch).not.toBeNull();
    const sp4Entry = sp4EntryMatch![0];
    expect(sp4Entry).toContain('NPU partitioning');
  });

  it('en SP4 条目 DESC 不再含 "NPU slicing"（旧术语已移除）', () => {
    source = readFileSync(dataFile, 'utf-8');
    const enSection = source.substring(source.indexOf('en:'));
    const sp4EntryMatch = enSection.match(
      /\{[^}]*NAME:\s*'openEuler 24\.03 LTS SP4'[^}]*\}/s
    );
    expect(sp4EntryMatch).not.toBeNull();
    const sp4Entry = sp4EntryMatch![0];
    expect(sp4Entry).not.toContain('NPU slicing');
  });

  it('en SP4 DESC 中 "NPU partitioning" 前后文保持原样（含 rapid recovery）', () => {
    source = readFileSync(dataFile, 'utf-8');
    const enSection = source.substring(source.indexOf('en:'));
    const sp4EntryMatch = enSection.match(
      /\{[^}]*NAME:\s*'openEuler 24\.03 LTS SP4'[^}]*\}/s
    );
    const sp4Entry = sp4EntryMatch![0];
    expect(sp4Entry).toContain(
      'UnifiedBus SuperPoD reliability & usability, NPU partitioning, rapid recovery for inference services'
    );
  });

  it('全文件不再出现 "NPU slicing"（仅本次唯一命中点已替换）', () => {
    source = readFileSync(dataFile, 'utf-8');
    expect(source).not.toContain('NPU slicing');
  });

  it('zh SP4 DESC 保持中文术语 "NPU算力切分" 不变（需求限定不联动中文）', () => {
    source = readFileSync(dataFile, 'utf-8');
    const zhSection = source.substring(0, source.indexOf('en:'));
    const sp4EntryMatch = zhSection.match(
      /\{[^}]*NAME:\s*'openEuler 24\.03 LTS SP4'[^}]*\}/s
    );
    expect(sp4EntryMatch).not.toBeNull();
    const sp4Entry = sp4EntryMatch![0];
    expect(sp4Entry).toContain('NPU算力切分');
    expect(sp4Entry).not.toContain('NPU slicing');
    expect(sp4Entry).not.toContain('NPU partitioning');
  });

  it('en SP4 DESC 其余描述字符未被改动（含 UnifiedBus SuperPoD / E2B / CVMs）', () => {
    source = readFileSync(dataFile, 'utf-8');
    const enSection = source.substring(source.indexOf('en:'));
    const sp4EntryMatch = enSection.match(
      /\{[^}]*NAME:\s*'openEuler 24\.03 LTS SP4'[^}]*\}/s
    );
    const sp4Entry = sp4EntryMatch![0];
    expect(sp4Entry).toContain('UnifiedBus SuperPoD reliability & usability');
    expect(sp4Entry).toContain('E2B sandboxes');
    expect(sp4Entry).toContain('confidential virtual machines (CVMs)');
    expect(sp4Entry).toContain('built on kernel 6.6');
  });

  it('改动是单点替换：en SP4 DESC 仅含一处 "NPU partitioning"', () => {
    source = readFileSync(dataFile, 'utf-8');
    const enSection = source.substring(source.indexOf('en:'));
    const sp4EntryMatch = enSection.match(
      /\{[^}]*NAME:\s*'openEuler 24\.03 LTS SP4'[^}]*\}/s
    );
    const sp4Entry = sp4EntryMatch![0];
    const occurrences = (
      sp4Entry.match(/NPU partitioning/g) || []
    ).length;
    expect(occurrences).toBe(1);
  });
});

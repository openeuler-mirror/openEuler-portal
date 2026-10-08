import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();
const MIRROR_DIR = path.join(PROJECT_ROOT, '.content/mirror/list');

interface RepoSizeItem {
  release: string;
  size: string;
}

interface MirrorListData {
  area_arr: unknown[];
  rsync_code: string;
  repo_size: RepoSizeItem[];
}

function loadYaml(filename: string): MirrorListData {
  const fp = path.join(MIRROR_DIR, filename);
  return yaml.load(fs.readFileSync(fp, 'utf8')) as MirrorListData;
}

const zhData = loadYaml('zh.yaml');
const enData = loadYaml('en.yaml');

const zhRepoSize = zhData.repo_size;
const enRepoSize = enData.repo_size;

describe('mirror repo_size — 条目数（设计 §3 / §4，维护者反馈保留 Total）', () => {
  it('zh.yaml repo_size 条目数为 33（32 版本/特殊条目 + Total，设计以 32 版本为准）', () => {
    expect(zhRepoSize.length).toBe(33);
  });

  it('en.yaml repo_size 条目数为 33', () => {
    expect(enRepoSize.length).toBe(33);
  });
});

describe('mirror repo_size — zh/en 逐条相等（AGENTS.md §5 红线#7）', () => {
  it('zh 与 en 的 repo_size 数组长度相等', () => {
    expect(zhRepoSize.length).toBe(enRepoSize.length);
  });

  it('zh 与 en 的 repo_size 逐条 release + size 完全相同', () => {
    for (let i = 0; i < zhRepoSize.length; i++) {
      expect(
        zhRepoSize[i],
        `第 ${i + 1} 条不一致：zh=${JSON.stringify(zhRepoSize[i])} en=${JSON.stringify(enRepoSize[i])}`
      ).toEqual(enRepoSize[i]);
    }
  });
});

describe('mirror repo_size — Total 行保留（维护者反馈：Total 值更新为 13 TB）', () => {
  it('zh.yaml 末行为 Total 且 size 为 13 TB', () => {
    const totalRow = zhRepoSize.find((item) => /Total/i.test(item.release));
    expect(totalRow).toBeDefined();
    expect(totalRow!.size).toBe('13 TB');
  });

  it('en.yaml 末行为 Total 且 size 为 13 TB', () => {
    const totalRow = enRepoSize.find((item) => /Total/i.test(item.release));
    expect(totalRow).toBeDefined();
    expect(totalRow!.size).toBe('13 TB');
  });

  it('zh.yaml 不残留旧值 10 TB', () => {
    const tenTb = zhRepoSize.find((item) => /10\s*TB/i.test(item.size));
    expect(tenTb).toBeUndefined();
  });
});

describe('mirror repo_size — 三条新增条目（设计 §3）', () => {
  it('含 openEuler 24.03 LTS SP4，size 为 687 GB', () => {
    const item = zhRepoSize.find((r) => r.release === 'openEuler 24.03 LTS SP4');
    expect(item).toBeDefined();
    expect(item!.size).toBe('687 GB');
  });

  it('含 openEuler 26.09，size 为 485 GB', () => {
    const item = zhRepoSize.find((r) => r.release === 'openEuler 26.09');
    expect(item).toBeDefined();
    expect(item!.size).toBe('485 GB');
  });

  it('含 openEuler Embedded 26.03，size 为 18 GB', () => {
    const item = zhRepoSize.find((r) => r.release === 'openEuler Embedded 26.03');
    expect(item).toBeDefined();
    expect(item!.size).toBe('18 GB');
  });
});

describe('mirror repo_size — 验收关键值逐字命中（设计 §4 / §6 预览清单）', () => {
  it('openEuler 24.03 LTS SP3 的 size 含 1.11 TB', () => {
    const item = zhRepoSize.find((r) => r.release === 'openEuler 24.03 LTS SP3');
    expect(item).toBeDefined();
    expect(item!.size).toBe('1.11 TB');
  });

  it('openEuler 22.03 LTS SP4 的 size 含 791 GB', () => {
    const item = zhRepoSize.find((r) => r.release === 'openEuler 22.03 LTS SP4');
    expect(item).toBeDefined();
    expect(item!.size).toBe('791 GB');
  });

  it('bugFix 的 size 含 1.2 MB', () => {
    const item = zhRepoSize.find((r) => r.release === 'bugFix');
    expect(item).toBeDefined();
    expect(item!.size).toBe('1.2 MB');
  });
});

describe('mirror repo_size — 结构完整性（设计 §3，维护者反馈单位格式不变）', () => {
  it('每条数据均含 release 与 size 字段', () => {
    for (const item of zhRepoSize) {
      expect(item.release, `条目缺 release: ${JSON.stringify(item)}`).toBeDefined();
      expect(item.size, `条目缺 size: ${JSON.stringify(item)}`).toBeDefined();
    }
  });

  it('size 均为带空格全单位（维护者反馈：保持 xxx GB / xxx TB 格式）', () => {
    const unitPattern = /^\d+(\.\d+)?\s(GB|MB|KB|TB)$/;
    for (const item of zhRepoSize) {
      expect(
        item.size,
        `size="${item.size}" 不符合带空格全单位约定（应为 xxx GB/MB/KB/TB）`
      ).toMatch(unitPattern);
    }
  });

  it('release 均为非空字符串', () => {
    for (const item of zhRepoSize) {
      expect(item.release.length, `release 为空: ${JSON.stringify(item)}`).toBeGreaterThan(0);
    }
  });
});

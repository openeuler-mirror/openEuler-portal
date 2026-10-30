import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { globSync } from 'glob';

const PROJECT_ROOT = process.cwd();
const geoDir = resolve(PROJECT_ROOT, '.geo');

/** 递归读 .geo/jsonld 下全部 .json 文件路径。 */
function listJsonLdFiles(): string[] {
  return globSync(resolve(geoDir, 'jsonld/**/*.json'));
}

/** 把任意结构(单对象 / 数组 / 嵌套数组 [[...]])扁平化为一维对象数组。 */
function flatObjects(data: unknown): any[] {
  if (Array.isArray(data)) return (data as unknown[]).flat(Infinity).filter(Boolean) as any[];
  return data == null ? [] : [data];
}

function readJson(file: string): any {
  return JSON.parse(readFileSync(file, 'utf-8'));
}

// ── 方向①:全量 .geo/jsonld parse + 扁平化后 @context 断言(防回归) ──────────────
describe('.geo/jsonld 全量 JSON 语法有效(45 个坏文件修复后回归守卫)', () => {
  const files = listJsonLdFiles();
  it(`应扫描到全部 714 个 jsonld 文件`, () => {
    expect(files.length).toBe(714);
  });

  it('全部文件 JSON.parse 通过(0 失败)', () => {
    const bad: string[] = [];
    for (const f of files) {
      try {
        JSON.parse(readFileSync(f, 'utf-8'));
      } catch {
        bad.push(f);
      }
    }
    expect(bad, `仍存在坏 JSON 文件: ${bad.slice(0, 5).join(', ')}`).toEqual([]);
  });
});

describe('.geo/jsonld 扁平化后所有带 @type 对象的 @context === "https://schema.org"', () => {
  const files = listJsonLdFiles();
  const offenders: string[] = [];

  for (const f of files) {
    const objs = flatObjects(readJson(f));
    for (const o of objs) {
      if (o && typeof o === 'object' && '@type' in o) {
        if (o['@context'] !== 'https://schema.org') {
          offenders.push(`${f} [@type=${o['@type']}] @context=${o['@context']}`);
        }
      }
    }
  }

  it('无任何带 @type 对象的 @context 异常', () => {
    expect(offenders, `@context 异常对象(前 5): ${offenders.slice(0, 5).join('\n')}`).toEqual([]);
  });
});

// ── 方向②:全量顶层元素非数组(防双重嵌套 [[...]] 复发) ─────────────────────────
describe('.geo/jsonld 顶层元素非数组(防双重嵌套 [[...]] 复发)', () => {
  const files = listJsonLdFiles();
  const offenders: string[] = [];

  for (const f of files) {
    const data = readJson(f);
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (Array.isArray(data[i])) {
          offenders.push(`${f} [elem ${i}] is array (double-nesting)`);
        }
      }
    }
  }

  it('无任何文件存在顶层嵌套数组', () => {
    expect(offenders, `双重嵌套残留(前 5): ${offenders.slice(0, 5).join('\n')}`).toEqual([]);
  });
});

// ── 方向③:去重文件扁平化后无 @type+url 语义重复 ──────────────────────────────
const DEDUP_FILES = [
  'zh/other/projects/stratovirt',
  'zh/other/projects/secgear',
  'zh/other/projects/bishengjdk',
  'zh/other/projects/atune',
  'zh/universities',
  'zh/talent-assessment',
  'zh/nestos',
  'zh/learn/mooc/detail',
  'zh/internship',
  'en/talent-assessment',
];

describe('去重文件扁平化后无完全重复对象(JSON 内容全等)', () => {
  for (const key of DEDUP_FILES) {
    it(`${key}:扁平化后无 JSON.stringify 全等重复对象`, () => {
      const f = join(geoDir, 'jsonld', key, 'index.json');
      expect(existsSync(f), `文件应存在: ${f}`).toBe(true);
      const objs = flatObjects(readJson(f));
      const seen = new Set<string>();
      let dup = 0;
      for (const o of objs) {
        if (o && typeof o === 'object') {
          const k = JSON.stringify(o);
          if (seen.has(k)) dup++;
          else seen.add(k);
        }
      }
      expect(dup, `${key} 仍存在 ${dup} 个完全重复对象`).toBe(0);
    });
  }
});

// ── 方向④:zh/talent-assessment 对象集合完整性(防数据丢失回归) ─────────────────
describe('zh/talent-assessment 对象集合完整性(EducationalOrganization 存在、FAQPage 不重复)', () => {
  const f = join(geoDir, 'jsonld/zh/talent-assessment/index.json');
  const objs = flatObjects(readJson(f));
  const types = objs.map((o: any) => o?.['@type']).filter(Boolean);

  it('包含 EducationalOrganization 对象(上轮丢失,防回归)', () => {
    expect(types).toContain('EducationalOrganization');
  });

  it('FAQPage 仅出现一次(上轮重复,防回归)', () => {
    const faqCount = types.filter((t: string) => t === 'FAQPage').length;
    expect(faqCount).toBe(1);
  });

  it('扁平化后对象集合与 origin/master 去重后一致(6 个唯一对象)', () => {
    expect(objs.length).toBe(6);
  });
});

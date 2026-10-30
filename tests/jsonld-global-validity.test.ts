import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'glob';

const PROJECT_ROOT = process.cwd();
const geoDir = resolve(PROJECT_ROOT, '.geo');
const jsonldDir = resolve(geoDir, 'jsonld');

/** 列出 .geo/jsonld 下全部 index.json。 */
function listJsonLdFiles(): string[] {
  return globSync(resolve(jsonldDir, '**/*.json'));
}

/** 读取并解析单个 jsonld 文件。 */
function readJson(file: string): unknown {
  return JSON.parse(readFileSync(file, 'utf-8'));
}

/**
 * 取"顶层对象"集合：
 * - 文件内容为数组时，每个元素即一个顶层对象；
 * - 文件内容为单个对象时，该对象本身即顶层对象；
 * - 顶层元素若仍是数组（双重嵌套 [[...]]），单独标记不入对象集。
 * 返回 { objects, nestedArrays }。
 */
function topLevelObjects(data: unknown): { objects: Record<string, unknown>[]; nestedArrays: string[] } {
  const objects: Record<string, unknown>[] = [];
  const nestedArrays: string[] = [];
  const tops = Array.isArray(data) ? data : [data];
  tops.forEach((el, i) => {
    if (Array.isArray(el)) {
      nestedArrays.push(`elem ${i}`);
    } else if (el && typeof el === 'object') {
      objects.push(el as Record<string, unknown>);
    }
  });
  return { objects, nestedArrays };
}

// ── ① 全量 JSON.parse 通过（45 个语法坏文件修复后的回归守卫） ─────────────────
describe('① .geo/jsonld 全量文件 JSON.parse 通过', () => {
  const files = listJsonLdFiles();

  it(`应扫描到全部 jsonld 文件（≥700）`, () => {
    expect(files.length).toBeGreaterThanOrEqual(700);
  });

  it('全部文件 JSON.parse 通过，0 失败', () => {
    const bad: string[] = [];
    for (const f of files) {
      try {
        JSON.parse(readFileSync(f, 'utf-8'));
      } catch {
        bad.push(f);
      }
    }
    expect(bad, `仍存在 JSON 语法错误文件（前 5）: ${bad.slice(0, 5).join('\n')}`).toEqual([]);
  });
});

// ── ② 每个顶层对象 @context === "https://schema.org"（@context 异常防复发） ──
describe('② 每个顶层对象 @context === "https://schema.org"', () => {
  const files = listJsonLdFiles();
  const missing: string[] = [];
  const wrong: string[] = [];

  for (const f of files) {
    const { objects } = topLevelObjects(readJson(f));
    for (const o of objects) {
      if (!('@context' in o)) {
        missing.push(f);
      } else if (o['@context'] !== 'https://schema.org') {
        wrong.push(`${f} @context=${o['@context']}`);
      }
    }
  }

  it('无顶层对象缺 @context', () => {
    expect(missing, `缺 @context 的文件（前 5）: ${missing.slice(0, 5).join('\n')}`).toEqual([]);
  });

  it('无顶层对象 @context 取值异常', () => {
    expect(wrong, `@context 异常对象（前 5）: ${wrong.slice(0, 5).join('\n')}`).toEqual([]);
  });
});

// ── ③ 顶层元素非数组（防双重嵌套 [[...]] 复发） ──────────────────────────────
describe('③ 顶层元素非数组（防双重嵌套 [[...]] 复发）', () => {
  const files = listJsonLdFiles();
  const offenders: string[] = [];

  for (const f of files) {
    const { nestedArrays } = topLevelObjects(readJson(f));
    for (const pos of nestedArrays) {
      offenders.push(`${f} ${pos}`);
    }
  }

  it('无任何文件存在顶层嵌套数组', () => {
    expect(offenders, `双重嵌套残留（前 5）: ${offenders.slice(0, 5).join('\n')}`).toEqual([]);
  });
});

// ── ④ 抽验 issue 三示例页（修复前分别为 A①未转义引号 / A②控制字符 / A①未转义引号） ─
describe('④ issue 三示例页修复后有效', () => {
  describe('zh/community/program（原 A① 未转义引号）', () => {
    const file = resolve(jsonldDir, 'zh/community/program/index.json');
    const data = readJson(file) as Record<string, unknown>[];

    it('JSON.parse 通过且为顶层数组', () => {
      expect(Array.isArray(data)).toBe(true);
    });

    it('每个顶层对象 @context === "https://schema.org"', () => {
      for (const o of data) {
        expect(o['@context']).toBe('https://schema.org');
      }
    });

    it('description 内层引号已转义，短语完整保留为单条字符串', () => {
      const webPage = data.find((o) => o['@type'] === 'WebPage');
      const desc = webPage!['description'] as string;
      // 修复前内层 " 断串致 parse 失败；修复后引号转义，短语应作为完整子串存在
      expect(desc).toContain('openEuler Call for X 计划');
    });
  });

  describe('en/faq/application-development（原 A② 控制字符）', () => {
    const file = resolve(jsonldDir, 'en/faq/application-development/index.json');
    const raw = readFileSync(file, 'utf-8');
    const data = readJson(file) as Record<string, unknown>[];

    it('JSON.parse 通过', () => {
      expect(Array.isArray(data)).toBe(true);
    });

    it('每个顶层对象 @context === "https://schema.org"', () => {
      for (const o of data) {
        expect(o['@context']).toBe('https://schema.org');
      }
    });

    it('源文本无裸控制字符（仅允许 \\n \\t \\r）', () => {
      // 修复前串内含控制字符致 parse 失败；修复后应无非法控制字符
      const hasBadCtrl = Array.from(raw).some((ch) => {
        const code = ch.charCodeAt(0);
        return code < 0x20 && ch !== '\n' && ch !== '\t' && ch !== '\r';
      });
      expect(hasBadCtrl, '源文本仍含裸控制字符').toBe(false);
    });
  });

  describe('en/faq/cloud-native（原 A① 未转义引号）', () => {
    const file = resolve(jsonldDir, 'en/faq/cloud-native/index.json');
    const data = readJson(file) as Record<string, unknown>[];

    it('JSON.parse 通过', () => {
      expect(Array.isArray(data)).toBe(true);
    });

    it('每个顶层对象 @context === "https://schema.org"', () => {
      for (const o of data) {
        expect(o['@context']).toBe('https://schema.org');
      }
    });

    it('FAQPage mainEntity 问题文本含引号短语且解析正常', () => {
      const faq = data.find((o) => o['@type'] === 'FAQPage');
      const questions = faq!['mainEntity'] as Record<string, unknown>[];
      expect(questions.length).toBeGreaterThan(0);
      // 第一问 name 含双引号短语，修复后应作为完整字符串解析
      const firstQ = questions[0]['name'] as string;
      expect(firstQ).toContain('"failed to initialize engine or runtime"');
    });
  });
});

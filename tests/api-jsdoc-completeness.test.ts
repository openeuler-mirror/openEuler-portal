import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');
const API_DIR = 'app/.vitepress/src-new/api';

function readApiFile(fileName: string): string {
  return readFileSync(resolve(ROOT, API_DIR, fileName), 'utf-8');
}

/**
 * 读取文件所有行(保留行号,1-based 索引通过 lines[i-1] 访问)。
 */
function readLines(fileName: string): string[] {
  return readApiFile(fileName).split('\n');
}

/**
 * 找到首个匹配 `export function|const <name>` 的行号(1-based)。
 * 用startsWith 做匹配,可适配 `export const getRoles = ` 与 `export function getSigLandscape(`。
 */
function findExportLine(lines: string[], funcName: string): number {
  const idx = lines.findIndex((line) => {
    const trimmed = line.trim();
    return (
      (trimmed.startsWith('export function ') || trimmed.startsWith('export const ')) &&
      trimmed.includes(funcName)
    );
  });
  return idx + 1;
}

describe('api-news.ts — getTagsData 注释补全', () => {
  const lines = readLines('api-news.ts');
  const exportLine = findExportLine(lines, 'getTagsData');

  it('getTagsData 的 export 紧邻前一行是 JSDoc 结束符 */(无空行脱节)', () => {
    expect(exportLine).toBeGreaterThan(1);
    expect(lines[exportLine - 2].trim()).toBe('*/');
  });

  it('JSDoc 描述行含业务用途关键词"分类筛选标签"', () => {
    const content = readApiFile('api-news.ts');
    expect(content).toContain('分类筛选标签');
  });

  it('JSDoc 描述行不止复述函数名(含"新闻/博客")', () => {
    const content = readApiFile('api-news.ts');
    expect(content).toContain('新闻/博客列表的分类筛选标签');
  });
});

describe('api-meeting.ts — getRoles 注释补全', () => {
  const lines = readLines('api-meeting.ts');
  const exportLine = findExportLine(lines, 'getRoles');

  it('getRoles 的 export 紧邻前一行是 JSDoc 结束符 */(无空行脱节)', () => {
    expect(exportLine).toBeGreaterThan(1);
    expect(lines[exportLine - 2].trim()).toBe('*/');
  });

  it('JSDoc 描述行含业务用途"当前登录用户...角色"', () => {
    const content = readApiFile('api-meeting.ts');
    expect(content).toContain('当前登录用户在指定社区的角色');
  });

  it('JSDoc 描述行含未登录语义"未登录返回空对象"', () => {
    const content = readApiFile('api-meeting.ts');
    expect(content).toContain('未登录返回空对象');
  });
});

describe('api-sig.ts — getSigLandscape 注释补全', () => {
  const lines = readLines('api-sig.ts');
  const exportLine = findExportLine(lines, 'getSigLandscape');

  it('getSigLandscape 的 export 紧邻前一行是 JSDoc 结束符 */(无空行脱节)', () => {
    expect(exportLine).toBeGreaterThan(1);
    expect(lines[exportLine - 2].trim()).toBe('*/');
  });

  it('JSDoc 描述行含业务用途"社区 SIG 全景/评分概览"', () => {
    const content = readApiFile('api-sig.ts');
    expect(content).toContain('社区 SIG 全景/评分概览');
  });

  it('JSDoc 描述行不止复述函数名(含 scoreAll 释义)', () => {
    const content = readApiFile('api-sig.ts');
    expect(content).toContain('scoreAll');
  });
});

describe('api-feedback.ts — getSearchFeedback 注释补全', () => {
  const lines = readLines('api-feedback.ts');
  const exportLine = findExportLine(lines, 'getSearchFeedback');

  it('getSearchFeedback 的 export 紧邻前一行是 JSDoc 结束符 */(空行脱节已修复)', () => {
    expect(exportLine).toBeGreaterThan(1);
    const prevLine = lines[exportLine - 2].trim();
    expect(prevLine).toBe('*/');
    expect(prevLine).not.toBe('');
  });

  it('JSDoc 描述行含业务用途"提交用户搜索结果反馈"', () => {
    const content = readApiFile('api-feedback.ts');
    expect(content).toContain('提交用户搜索结果反馈');
  });

  it('保留原有 @name FeedbackParamsT 标签(不丢失原有信息)', () => {
    const content = readApiFile('api-feedback.ts');
    expect(content).toContain('@name FeedbackParamsT');
  });

  it('保留原有 @param searchFlag 标签', () => {
    const content = readApiFile('api-feedback.ts');
    expect(content).toContain('@param {boolean} params.searchFlag');
  });

  it('保留原有 @param keyword 标签', () => {
    const content = readApiFile('api-feedback.ts');
    expect(content).toContain('@param {string} params.keyword');
  });

  it('保留原有 @param feedbackText 标签', () => {
    const content = readApiFile('api-feedback.ts');
    expect(content).toContain('@param {string} params.feedbackText');
  });
});

describe('本次改动的 4 个 api 文件 — 每个 export 紧邻前一行均为 JSDoc 结束符 */(验收 grep #4)', () => {
  const changedFiles = ['api-feedback.ts', 'api-meeting.ts', 'api-news.ts', 'api-sig.ts'];

  for (const file of changedFiles) {
    it(`${file} 每个 export 紧邻前一行均为 JSDoc 结束符 */`, () => {
      const lines = readLines(file);
      let exportCount = 0;
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        const isExport =
          trimmed.startsWith('export function ') || trimmed.startsWith('export const ');
        if (!isExport) continue;
        exportCount++;
        expect(i).toBeGreaterThan(0);
        expect(lines[i - 1].trim()).toBe('*/');
      }
      expect(exportCount).toBeGreaterThan(0);
    });
  }
});

describe('未改动 api 文件的既有注释状态(记录,非本次范围)', () => {
  it.skip('api-search.ts 的 getPop / getSearchRecommend 既有缺失 JSDoc(本次不改,建议另开 issue)', () => {
    const lines = readLines('api-search.ts');
    const getPopLine = findExportLine(lines, 'getPop');
    const getSearchRecommendLine = findExportLine(lines, 'getSearchRecommend');
    expect(lines[getPopLine - 2].trim()).toBe('*/');
    expect(lines[getSearchRecommendLine - 2].trim()).toBe('*/');
  });
});

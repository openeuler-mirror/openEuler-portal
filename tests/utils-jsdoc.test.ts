import { expect, describe, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findLabelFromOptions } from '../app/.vitepress/src-new/utils/common';

// meeting.ts 依赖 ~@/config/meeting（其内部走 ~@/i18n -> vitepress，单测环境无法注入），
// 故将 config/meeting 整体 mock 为可控常量，以隔离测试 getPointStr / speakerNum 的纯逻辑。
// 使用 vi.hoisted 保证 mock 工厂与断言共用同一组常量（vi.mock 会被提升，不能引用外层普通变量）。
const MOCK = vi.hoisted(() => ({
  INTERVAL_WEEK: 1,
  INTERVAL_MONTH: 2,
  // 与真实 getWeekOptions 同构：数组下标 0..5 对应周一..周六，下标 6 对应周日（value=0）
  // sort 依赖 findIndex 返回的数组下标，故数组顺序必须与真实实现一致
  INTERVAL_WEEK_OPTIONS: [
    { value: 1, label: '周一' },
    { value: 2, label: '周二' },
    { value: 3, label: '周三' },
    { value: 4, label: '周四' },
    { value: 5, label: '周五' },
    { value: 6, label: '周六' },
    { value: 0, label: '周日' },
  ],
}));

vi.mock('~@/config/meeting', () => ({
  INTERVAL_WEEK: MOCK.INTERVAL_WEEK,
  INTERVAL_MONTH: MOCK.INTERVAL_MONTH,
  INTERVAL_WEEK_OPTIONS: MOCK.INTERVAL_WEEK_OPTIONS,
}));

const { getPointStr, speakerNum } = await import(
  '../app/.vitepress/src-new/utils/meeting'
);

describe('测试 findLabelFromOptions — JSDoc @returns「匹配到的标签；无匹配返回 value 原值」', () => {
  const options = [
    { label: '禁用', value: 0 },
    { label: '启用', value: 1 },
    { label: '归档', value: 2 },
  ];

  it('匹配到 value 时返回对应 label', () => {
    expect(findLabelFromOptions(2, options)).toBe('归档');
    expect(findLabelFromOptions(0, options)).toBe('禁用');
  });

  it('value 为字符串且匹配时返回 label', () => {
    const opts = [{ label: '已启用', value: 'active' }];
    expect(findLabelFromOptions('active', opts)).toBe('已启用');
  });

  it('未匹配时回退原 value（number 原样返回）', () => {
    expect(findLabelFromOptions(99, options)).toBe(99);
  });

  it('未匹配时回退原 value（string 原样返回）', () => {
    expect(findLabelFromOptions('unknown', options)).toBe('unknown');
  });

  it('空 options 数组时回退原 value', () => {
    expect(findLabelFromOptions(1, [])).toBe(1);
  });

  it('支持自定义 labelKey / valueKey', () => {
    const opts = [
      { name: '英文', key: 'en' },
      { name: '中文', key: 'zh' },
    ];
    expect(findLabelFromOptions('en', opts, 'name', 'key')).toBe('英文');
    expect(findLabelFromOptions('fr', opts, 'name', 'key')).toBe('fr');
  });
});

describe('测试 getPointStr — JSDoc @returns「可读串；周期类型不匹配返回空串」', () => {
  it('周期为周：按周日历顺序排序并拼接 label', () => {
    // 传入 [3,1]（周三、周一），应按周日历顺序排序为 [1,3] -> 周一、周三
    expect(getPointStr(MOCK.INTERVAL_WEEK, [3, 1])).toBe('周一、周三');
  });

  it('周期为周：单点', () => {
    expect(getPointStr(MOCK.INTERVAL_WEEK, [2])).toBe('周二');
  });

  it('周期为周：周日(value=0)按周日历排在最后', () => {
    // 传入 [0,1]（周日、周一），周日历顺序 [1,0] -> 周一、周日
    expect(getPointStr(MOCK.INTERVAL_WEEK, [0, 1])).toBe('周一、周日');
  });

  it('周期为周：乱序多点按周日历顺序输出', () => {
    expect(getPointStr(MOCK.INTERVAL_WEEK, [6, 0, 1])).toBe('周一、周六、周日');
  });

  it('周期为月：拼接"号"后缀', () => {
    expect(getPointStr(MOCK.INTERVAL_MONTH, [1, 15])).toBe('1、15号');
  });

  it('周期为月：单点', () => {
    expect(getPointStr(MOCK.INTERVAL_MONTH, [20])).toBe('20号');
  });

  it('周期类型不匹配返回空串', () => {
    expect(getPointStr(999, [1, 2])).toBe('');
    expect(getPointStr(0, [1])).toBe('');
  });
});

describe('测试 speakerNum — JSDoc @returns「提取的序号；无数字匹配时为 NaN」', () => {
  it('从字符串中提取首位连续数字', () => {
    expect(speakerNum('speaker3')).toBe(3);
  });

  it('提取多位数字（取第一个匹配）', () => {
    expect(speakerNum('user12and34')).toBe(12);
  });

  it('数字在字符串开头', () => {
    expect(speakerNum('5abc')).toBe(5);
  });

  it('字符串无数字时返回 NaN', () => {
    expect(Number.isNaN(speakerNum('no-number'))).toBe(true);
  });

  it('空字符串返回 NaN', () => {
    expect(Number.isNaN(speakerNum(''))).toBe(true);
  });
});

describe('JSDoc 补充验证 — 三个函数上方均存在带 @returns 的 JSDoc 块', () => {
  const utilsDir = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    'app',
    '.vitepress',
    'src-new',
    'utils'
  );
  const readUtils = (file: string) => readFileSync(resolve(utilsDir, file), 'utf-8');

  it('common.ts: findLabelFromOptions 上方有 JSDoc 且含 @returns', () => {
    const src = readUtils('common.ts');
    const idx = src.indexOf('export const findLabelFromOptions');
    const above = src.slice(0, idx);
    // JSDoc 块 /** 在前、*/ 在后：lastIndexOf('/**') 必须小于 lastIndexOf('*/')
    expect(above.lastIndexOf('/**')).toBeLessThan(above.lastIndexOf('*/'));
    expect(above).toContain('@returns');
    expect(above).toContain('@param');
  });

  it('meeting.ts: getPointStr 上方有 JSDoc 且含 @returns', () => {
    const src = readUtils('meeting.ts');
    const idx = src.indexOf('export const getPointStr');
    const above = src.slice(0, idx);
    expect(above.lastIndexOf('/**')).toBeLessThan(above.lastIndexOf('*/'));
    expect(above).toContain('@returns');
  });

  it('meeting.ts: speakerNum 上方有 JSDoc 且含 @returns', () => {
    const src = readUtils('meeting.ts');
    const idx = src.indexOf('export const speakerNum');
    const above = src.slice(0, idx);
    expect(above.lastIndexOf('/**')).toBeLessThan(above.lastIndexOf('*/'));
    expect(above).toContain('@returns');
  });

  it('meeting.ts: speakerNum 旧的 `// 处理发言人的序号` 单行注释已被移除', () => {
    const src = readUtils('meeting.ts');
    expect(src).not.toContain('// 处理发言人的序号');
  });
});

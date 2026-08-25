import { INTERVAL_MONTH, INTERVAL_WEEK, INTERVAL_WEEK_OPTIONS } from '~@/config/meeting';
import { findLabelFromOptions } from '~@/utils/common';

/**
 * 将周期时间点数组转为可读串（周→"周一、周二"；月→"1号、15号"）
 * @param {number} cycle_type 周期类型（周/月）
 * @param {number[]} points 时间点数组
 * @returns {string} 可读串；周期类型不匹配返回空串
 */
export const getPointStr = (cycle_type: number, points: number[]) => {
  if (cycle_type === INTERVAL_WEEK) {
    return points
      .sort((a, b) => {
        const aIdx = INTERVAL_WEEK_OPTIONS.findIndex((v) => v.value === a);
        const bIdx = INTERVAL_WEEK_OPTIONS.findIndex((v) => v.value === b);
        return aIdx - bIdx;
      })
      .map((point) => findLabelFromOptions(parseInt(point), INTERVAL_WEEK_OPTIONS))
      .join('、');
  }
  if (cycle_type === INTERVAL_MONTH) {
    return points.join('、') + '号';
  }
  return '';
};

/**
 * 从字符串中提取发言人序号
 * @param {string} val 含数字的字符串
 * @returns {number} 提取的序号；无数字匹配时为 NaN
 */
export const speakerNum = (val: string) => {
  const regex = /\d+/g;
  const match = val.match(regex) || '';

  return parseInt(match[0]);
};

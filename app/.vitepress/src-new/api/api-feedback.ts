import { request } from '~@/shared/axios';

import { FeedbackParamsT } from '~@/@types/type-search';
/**
 * 搜索反馈
 * @name FeedbackParamsT
 * @param {boolean} params.searchFlag - 是否搜到
 * @param {string} params.keyword - 搜索关键字
 * @param {string} params.feedbackText - 反馈内容
 */

export function getSearchFeedback(params: FeedbackParamsT): Promise<{
  status: number;
  obj: string[];
  msg: string;
}> {
  const url = `/api-feedback/query/search/issue?community=openeuler`;
  return request.post(url, params).then((res) => res.data);
}

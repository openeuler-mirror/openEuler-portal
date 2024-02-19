import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type { TableDataT } from '@/shared/@types/type-calendar';

import type { DetailDateT } from '@/shared/@types/type-salon';

/**
 * 获取活动会议数据列表
 * @name getMeetingActivity
 * @return {Object} 活动会议
 */
export function getMeetingActivity(params: { type: string }): Promise<{
  code: number;
  data: string[];
  msg: string;
}> {
  const url = '/api-meeting/meeting_activity_date/';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取某日的活动和会议
 * @name getDaysData
 * @param {string} params.date 具体日期
 * @param {string} params.type 查询类型 meeting | activity
 * @return {Object} 活动会议
 */
export function getDaysData(params: { date: string; type: string }): Promise<{
  code: number;
  data: TableDataT;
  msg: string;
}> {
  const url = '/api-meeting/meeting_activity_data/';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 获取活动详情数据
 * @param {string} id 活动id
 * @return {Promise<DetailDateT>} 活动数据
 */
export function getActivityDetail(id: string): Promise<DetailDateT> {
  const url = `/api-meeting/activity/${id}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

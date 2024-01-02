import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type { TableDataObjT } from '@/shared/@types/type-calendar';
import type { DetailDateT } from '@/shared/@types/type-salon';

/**
 * 获取会议数据
 * @return {Promise<TableDataObjT>}
 */
export function getMeetingData(): Promise<TableDataObjT> {
  const url = '/api-meeting/meetingsdata/';
  return request
    .get(url, {
      $ignoreLoading: true,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 获取活动数据
 * @return {Promise<TableDataObjT>} 活动数据
 */
export function getActivityData(): Promise<TableDataObjT> {
  const url = '/api-meeting/activitiesdata/';
  return request
    .get(url, {
      $ignoreLoading: true,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 获取活动详情数据
 * @param {string} id 活动id
 * @return {Promise<DetailDateT>} 活动数据
 */
export function getActivityDetail(id: string): Promise<DetailDateT> {
  const url = `/api-meeting/activity/${id}/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
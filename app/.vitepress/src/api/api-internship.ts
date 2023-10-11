import { request, AxiosResponse } from '@/shared/axios';

/**
 * 获取开源实习页面积分排名
 * @name getRank
 */
const url = '/api/osi-task-manager/intern/points/lists';
export function getRank(params: object) {
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}

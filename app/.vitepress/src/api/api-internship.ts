import { request, AxiosResponse } from '@/shared/axios';
interface GetRankResT {
  GiteeId: string;
  giteeRoom: string;
  integralValue: number;
  rank: string;
  userId: number
}
/**
 * 获取开源实习页面积分排名
 * @param {Object} params 请求参数
 * @param {string} params.sort
 * @param {string} params.pageSize
 * @return {Object}
 */
const url = '/api/osi-task-manager/intern/points/lists';
export function getRank(params: object): Promise<{
  UserPoints: GetRankResT[],
  code: number,
  message: string,
  totalCount: number
}> {
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}


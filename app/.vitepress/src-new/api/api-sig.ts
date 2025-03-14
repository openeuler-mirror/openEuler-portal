import { request, type AxiosResponse } from '~@/shared/axios';

import {
  FeatureInfoT,
  GroupInfoT,
  SigCompleteListT,
  SigContributeArrT,
  SigDetailT,
  SigCompleteItemT,
  SigRepoT,
} from '@/shared/@types/type-sig';
/**
 * 获取sig landscape
 * @returns {Promise<GroupInfoT[]>}
 */
export function getSigLandscape(): Promise<{
  data: GroupInfoT[];
}> {
  const url = '/api-dsapi/query/sig/scoreAll?community=openeuler';
  return request.get(url).then((res: AxiosResponse) => {
    return res?.data;
  });
}

/**
 * 获取仓库列表
 * @returns {Object}
 */
export function getRepoList(params): Promise<{
  code: number;
  data: string[];
  msg: string;
  update_at: string;
}> {
  const url = `/api-dsapi/query/sig/repo`;
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
/**
 * 获取仓库信息列表
 * @returns {Object}
 */
export function getSigList(): Promise<SigCompleteListT> {
  const url = '/api-dsapi/query/sig/info?community=openeuler&search=fuzzy';
  return request.post(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取sig详情交流会议
 * @param {string} sigName sig名称
 * @returns {Promise<SigDetailT>}
 */
export function getSigMeeting(
  sigName: string,
  params: { size: number; page: number }
): Promise<SigDetailT> {
  const url = `/api-meeting/sigmeetingsdata/${sigName}/`;
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
/**
 * 获取sig详情仓库列表
 * @param params
 * @returns {Object}
 */
export function getSigRepositoryList(params: object): Promise<{
  code: number;
  data: SigRepoT;
  msg: string;
  update_at: string;
}> {
  const url = '/api-dsapi/query/sig/repo/committers';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}

/**
 * 获取sig用户的个人贡献
 * @param {Object} params 请求参数
 * @param {string} params.contributeType 度量指标
 * @param {string} params.timeRange 统计周期
 * @param {string} params.community 社区名称
 * @param {string} params.sig sig名称
 * @return {Object}
 */
export function querySigUserContribute(params: object): Promise<{
  code: number;
  data: SigContributeArrT[];
  msg: string;
  update_at: string;
}> {
  const url = '/api-dsapi/query/sig/usercontribute';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}

/**
 * 获取sig详情
 * @param {Object} params
 * @param {string} community 社区名称openeuler
 * @param {string} sig sig名称
 * @returns {Object}
 */
export function getSigDetail(params: object): Promise<{
    code: number;
    data: SigCompleteItemT[];
    msg: string;
    update_at: string;
  }> {
    const url = '/api-dsapi/query/sig/info';
    return request.get(url, { params }).then((res: AxiosResponse) => res.data);
  }
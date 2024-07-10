import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';
import {
  FeatureInfoT,
  GroupInfoT,
  SigContributeArrT,
  SigDetailT,
  SigCompleteItemT,
  SigRepoT,
} from '@/shared/@types/type-sig';
interface LIST_PARAMS {
  page: number;
  pageSize: number;
}
export function getSigDetailInfo(params: string) {
  const url = `/api-easyeditor/api/publish/latest?path=${params}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取Sig列表
 * @returns {Promise<SigListT[]>}
 */
export function getCompleteList(params?: LIST_PARAMS) {
  const url = `/api-dsapi/query/sig/info?community=openeuler&page=${params?.page}&pageSize=${params?.pageSize}&search=fuzzy`;
  return request.post(url).then((res: AxiosResponse) => res.data);
}
/**
 * 获取仓库列表
 * @returns {Object}
 */
export function getRepoList(): Promise<{
  code: number;
  data: string[];
  msg: string;
  update_at: string;
}> {
  const url = `/api-dsapi/query/sig/repo?community=openeuler&search=fuzzy`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
/**
 * 获取仓库信息列表
 * @returns {Object}
 */
export function getAllList(): Promise<{
  code: number;
  data: [];
  msg: string;
}> {
  const url = '/api-dsapi/query/sig/info?community=openeuler&search=fuzzy';
  return request.post(url).then((res: AxiosResponse) => res.data);
}
/**
 * 获取sig详情交流会议
 * @param {string} sigName sig名称
 * @returns {Promise<SigDetailT>}
 */
export function getSigDetail(
  sigName: string,
  params: { size: number; page: number }
): Promise<SigDetailT> {
  const url = `/api-meeting/sigmeetingsdata/${sigName}/`;
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
/**
 * 获取sig详情核心成员信息
 * @param {Object} params
 * @param {string} community 社区名称openeuler
 * @param {string} sig sig名称
 * @returns {Object}
 */
export function getSigMember(params: object): Promise<{
  code: number;
  data: SigCompleteItemT[];
  msg: string;
  update_at: string;
}> {
  const url = '/api-dsapi/query/sig/info';
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
export function getSalon(params: {
  size: number;
  page: number;
  activity: string;
}) {
  const url = '/api-meeting/activities/';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data);
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
 * 获取sig landscape
 * @param {string} lang 语言
 * @returns {Promise<GroupInfoT[]>}
 */
export function getSigLandscape(lang: string): Promise<GroupInfoT[]> {
  const url = '/api-dsapi/query/sig/scoreAll?community=openeuler';
  return request.get(url).then((res: AxiosResponse) => {
    const data = res.data?.data;
    const info: GroupInfoT[] = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];

      lang === 'zh'
        ? ''
        : ((item.group = item.en_group), (item.feature = item.en_feature));
      if (item.group === '' && item.feature === '') {
        continue;
      }

      if (
        !info.find((group: GroupInfoT) => {
          return group.groupName === item.group;
        })
      ) {
        info.push({
          groupName: item.group,
          features: [],
        });
      }

      const groupInfo: GroupInfoT | undefined = info.find(
        (group: GroupInfoT) => {
          return group.groupName === item.group;
        }
      );

      if (
        !groupInfo?.features.find((feature: any) => {
          return feature.featureName === item.feature;
        })
      ) {
        groupInfo?.features.push({
          featureName: item.feature,
          sigs: [],
        });
      }

      const featureInfo: FeatureInfoT | undefined = groupInfo?.features.find(
        (feature: FeatureInfoT) => {
          return feature.featureName === item.feature;
        }
      );
      featureInfo?.sigs.push(item.sig_names);
    }
    info.sort((b: GroupInfoT, a: GroupInfoT) => {
      return a.features.length - b.features.length;
    });
    info.forEach((group: GroupInfoT) => {
      group.features.sort((b: FeatureInfoT, a: FeatureInfoT) => {
        return a.sigs.length - b.sigs.length;
      });
      group.features.forEach((feature: FeatureInfoT) => {
        feature.sigs.sort((b: string, a: string) => {
          return b.toLowerCase().localeCompare(a);
        });
      });
    });
    return info;
  });
}

/**
 * 获取sig group name list
 * @returns {Object}
 */
export function querySigGroup(): Promise<{
  code: number;
  data: { openeuler: string[] };
  msg: string;
  update_at: string;
}> {
  const url = '/api-dsapi/query/sig/name?community=openeuler';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取sig gathering 报名
 * @returns {Object}
 */
export function applySigGathering(params: any): Promise<{
  code: number;
  data: { openeuler: string[] };
  msg: string;
  update_at: string;
}> {
  const { token } = getUserAuth();
  const url = '/api-dsapi/query/sigGathering?community=openeuler';
  return request
    .post(url, params, {
      showLoading: true,
      showError: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res?.data);
}

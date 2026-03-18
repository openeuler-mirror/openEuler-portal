import { request } from '@/shared/axios';

import type { CasesQueryT } from '~@/@typestype-showcase';

/**
 * 获取用户案例
 * @param {CasesQueryT} params 案例列表请求参数
 * @return {Promise<Object>}
 */
export const getUserCaseData = (params: CasesQueryT) => {
  const url = '/api-search/search/sort/showcase';
  return request.post(url, params).then((res) => {
    return res.data
  });
}

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type { CasesResponseT, CasesQueryT } from '@/shared/@types/type-showcase'

/**
 * 获取用户案例
 * @param {CasesQueryT} params 案例列表请求参数
 * @return {Promise<Object>}
 */
export function getUserCaseData(params: CasesQueryT): Promise<{
  msg: string,
  obj: CasesResponseT,
  status: number
}> {
  const url = '/api-search/search/sort/showcase';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

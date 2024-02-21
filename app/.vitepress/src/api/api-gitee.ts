import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
/**
 * 获取gitee 上oEEP markdown内容
 * @param {GiteeParamsT} params 请求参数
 * @return {Promise<Object>}
 */
interface GiteeParamsT {
  owner: string;
  path: string;
}
export function getGiteeContent(params: GiteeParamsT): Promise<{
  code: number;
  data: string;
  msg: string;
  update_at: string;
}> {
  const url = `/api-dsapi/query/repo/readme?community=${params.owner}&name=${params.path}`;
  return request
    .get(url, { showLoading: true })
    .then((res: AxiosResponse) => res.data);
}

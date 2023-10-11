import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
/**
 * 获取gitee 上oEEP markdown内容
 * @name getGiteeContent
 */
interface GiteeParamsT {
  owner: string;
  path: string;
}
export function getGiteeContent(params: GiteeParamsT) {
  const url = `/api-dsapi/query/repo/readme?community=${params.owner}&name=${params.path}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

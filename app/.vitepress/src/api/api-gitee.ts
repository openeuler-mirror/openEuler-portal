import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function getGiteeContent(params: any) {
  const url = `/api-dsapi/query/repo/readme?community=${params.owner}&name=${params.path}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

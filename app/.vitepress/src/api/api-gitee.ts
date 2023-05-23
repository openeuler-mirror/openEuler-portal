import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function getGiteeContent(params: any) {
  const url = `/api-dsapi/query/repo/readme?community=${params.owner}&name=${params.path}`;
  // const url = `/api-gitee/openeuler/TC/raw/7292e1e25ee762630be82142adc136ce4da17ac1/oEEP/oEEP-0001%20通过%20oEEP%20规范化社区演进的技术决策流程.md`;

  return request.get(url).then((res: AxiosResponse) => res.data);
}

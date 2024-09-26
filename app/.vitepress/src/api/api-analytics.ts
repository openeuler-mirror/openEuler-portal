import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function reporAnalytics(params: any) {
  const url = '/api-dsapi/query/track/openeuler';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

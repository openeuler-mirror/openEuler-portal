import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';


export function postFeedback(params:any) {
  const url = '/api-dsapi/query/nps?community=openeuler';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

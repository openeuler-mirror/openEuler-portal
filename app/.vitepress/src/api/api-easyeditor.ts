import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取easyeditor数据
 * @name getEasyeditorInfo
 */
export function getEasyeditorInfo(params: string) {
  const url = `/api-easyeditor/api/publish/latest?path=${params}`;
  return request
    .get(url, { $ignoreLoading: true })
    .then((res: AxiosResponse) => res.data);
}

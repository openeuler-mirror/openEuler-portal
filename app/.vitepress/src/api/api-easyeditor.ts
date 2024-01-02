import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

interface EasyeditorT {
  content: string,
  content_type: string,
  description: string,
  name: string,
  title: string,
}
/**
 * 获取easyeditor数据
 * @return {Object}
 */
export function getEasyeditorInfo(params: string): Promise<{
  data: Array<EasyeditorT>,
  message: string,
  statusCode: number
}> {
  const url = `/api-easyeditor/api/publish/latest?path=${params}`;
  return request
    .get(url, { $ignoreLoading: true })
    .then((res: AxiosResponse) => res.data);
}


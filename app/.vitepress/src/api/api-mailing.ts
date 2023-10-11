import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 调用接口获取邮件列表
 * @name getAllMailing
 * @return {Array} 邮件列表
 */

export function getAllMailing() {
  const url = '/api-mail/postorius/all_lists/';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

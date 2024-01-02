import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
interface MailingMsgT {
  description?: string;
  display_name?: string;
  fqdn_listname?: string;
  http_etag?: string;
  list_id?: string;
  list_name?: string;
  mail_host?: string;
  member_count?: number;
  self_link?: string;
  volume?: number;
}
/**
 * 获取邮件列表
 * @return {Promise<MailingMsgT[]>} 邮件列表
 */
export function getAllMailing(): Promise<MailingMsgT[]> {
  const url = '/api-mail/postorius/all_lists/';
  return request.get(url).then((res: AxiosResponse) => res.data);
}
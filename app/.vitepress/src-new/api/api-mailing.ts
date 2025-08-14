import { request } from '~@/shared/axios';

import type { MailingDataT } from '~@/@types/type-mailing';

/**
 * 获取邮件列表
 * @return {Promise<MailingDataT[]>} 邮件列表
 */
export function getAllMailing(): Promise<MailingDataT[]> {
  const url = '/api-mail/postorius/all_lists/';
  return request.get(url).then((res) => {
    return res.data;
  });
}

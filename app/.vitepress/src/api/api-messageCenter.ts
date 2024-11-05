import { request } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';

/**
 * 获取消息中心未读消息数量
 */
export function getUnreadMsgCount(): Promise<
  {
    source: string;
    count: number;
  }[]
> {
  const { token } = getUserAuth();
  return request
    .get<{ count: { source: string; count: number }[] }>(
      '/api-message/inner/count',
      {
        headers: { token },
      }
    )
    .then((res) => res.data.count)
    .catch(() => []);
}

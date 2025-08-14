import { request } from '@/shared/axios';

/**
 * 获取活动会议数据列表
 * @return {Promise<ResponseT>} 活动会议
 */
export function getMeetingActivity(params: { type: string }) {
  const url = '/api-meeting/meeting_activity_date/';
  return request.get(url, { params }).then((res) => {
    return res.data;
  });
}

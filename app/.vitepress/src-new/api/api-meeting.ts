import { request } from '~@/shared/axios';

import { getUserAuth } from '@/shared/login';

/**
 * 获取某天的前后存在会议的日期
 * @param {string} date 该天的日期
 * @returns {Promise<string[]>} 会议日期列表
 */
export const getMeetingDateListApi = async (date: string, group_name?: string, is_record?: string): Promise<string[]> => {
  const { token } = getUserAuth();
  const res = await request.get(
    `/api-meeting-v2/meeting/meeting_date/?date=${date}${group_name ? `&group_name=${group_name}` : ''}${is_record ? `&is_record=${is_record}` : ''}`,
    { headers: { token } }
  );
  return res.data.data;
};

/**
 * 获取某天的会议列表
 * @param {string} date 该天的日期
 * @returns {Promise<ResponseT>} 会议列表
 */
export const getMeetingListApi = async (date: string, group_name: string) => {
  const { token } = getUserAuth();
  const res = await request.get(`/api-meeting-v2/meeting/meeting/?date=${date}&group_name=${group_name}`, { headers: { token } });
  return res.data.data;
};

/**
 * 获取角色
 * @param {string} community 请求参数
 * @return { Promise<ResponseT> }
 */
export const getRoles = async (community: string) => {
  const { token } = getUserAuth();
  if (!token) return {};
  const url = `/api-workspace/oneid-workbench/profile/getRoles?community=${community}`;
  const res = await request.get(url, { global: true, showError: false, headers: { token } });
  return res.data;
};

/**
 * 获取某天的会议列表
 * @param {string} date 该天的日期
 * @returns {Promise<ResponseT>} 会议列表
 */
export const getSigmeetings = async (group_name: string) => {
  const { token } = getUserAuth();
  const res = await request.get(`/api-meeting-v2/meeting/sigmeetings/${group_name}/`, { headers: { token } });
  return res.data.data;
};

/**
 * 获取sig组信息
 * @returns {Promise<GroupItemT[]>} sig组信息列表
 */
export const getGroupInfosApi = async () => {
  const { token } = getUserAuth();
  if (!token) return [];
  const url = '/api-meeting-v2/meeting/web/group_info/';
  const res = await request.get(url, { global: true, showError: false, headers: { token } });
  return res.data?.data || [];
};

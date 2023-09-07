/**
 * @file  登录接口配置文件
 * */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';
import { ElMessage } from 'element-plus';

/**
 * 获取授权的相关回调链接
 */
type queryPermissionParams = {
  community: string;
};
export function queryPermission(params: queryPermissionParams) {
  const url = '/api-omapi/oneid/user/permission';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      global: true,
      $doException: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      const message = err?.response?.data?.message || '';
      if (message && message !== 'token expires') {
        ElMessage({
          type: 'error',
          message: err.message,
        });
      }
    });
}

/**
 * 获取idtoken用于退出
 */
export function queryIDToken() {
  const url = '/api-omapi/oneid/logout';
  const { token } = getUserAuth();
  return request
    .get(url, {
      $doException: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      const message = err?.response?.data?.message || '';
      if (message && message !== 'token expires') {
        ElMessage({
          type: 'error',
          message: err.message,
        });
      }
    });
}

/**
 * 修改用户信息
 */
 export function modifyUser(body: any) {
  const url = '/api-omapi/oneid/update/baseInfo';
  const { token } = getUserAuth();
  return request
    .post(url, body, {
      global: true,
      $doException: true,
      headers: {
        token,
      },
     })
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      const message = err?.response?.data?.message || '';
      if (message && message !== 'token expires') {
        ElMessage({
          type: 'error',
          message: err.message,
        });
      }
    });
}

/**
 * 调用接口获取镜像列表
 * @name getAllMirror
 * @param {boolean} mirrorstats 镜像状态 true-运行的镜像
 * @return {Array} 镜像列表
 */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function getAllMirror() {
  const url = '/api/mirrors/?mirrorstats=true';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取优选镜像列表
 * @name getAllMirror
 * @param {string} version 镜像版本
 * @return {Array} 镜像列表
 */

export const selectMirror = (version: string) => {
  // 本地使用代理解决跨域问题
  // 线上环境不使用代理，使用代理会导致 ip地址不准确
  const url =
    window.location.host !== 'www.openeuler.org'
      ? `/api/mirrors/openEuler-${version}/ISO/`
      : `https://api.openeuler.org/mirrors/openEuler-${version}/ISO/`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res?.data)
    .catch((err) => {
      console.error(err);
    });
};

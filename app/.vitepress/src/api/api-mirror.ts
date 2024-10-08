import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type {
  MirrorLsitT,
  selectMirrorListT,
} from '@/shared/@types/type-mirror';
import type { VersionInfoT } from '@/shared/@types/type-download';

/**
 * 获取镜像列表
 * @name getAllMirror
 * @param {boolean} mirrorstats 镜像状态 true-运行的镜像
 * @return {Promise<MirrorLsitT[]>} 镜像列表
 */
export function getAllMirror(): Promise<MirrorLsitT[]> {
  const url = '/api/mirrors/?mirrorstats=true';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取repo 仓下载目录
 * @name getDownloadLink
 * @param {version}  iso 版本
 * @return {Promise<selectMirrorListT[]>} 版本信息
 */
export function getDownloadLink(version: string): Promise<selectMirrorListT> {
  const url = `/api/mirrors/${version}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取repo 仓下载目录
 * @name getDownloadLink
 * @param {version}  iso 版本
 * @return {Promise<selectMirrorListT[]>} 版本信息
 */
export function getVersionInfo(): Promise<{ RepoVersion: VersionInfoT[] }> {
  const url = `/api/mirrors/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

import { request } from '~@/shared/axios';
import {
  SafetyBulletinQueryT,
  ComponentQueryT,
  CveQueryT,
} from '@/shared/@types/type-support';

/**
 * 获取安全公告列表
 * @param { SafetyBulletinQueryT } 列表请求参数
 * @returns {Promise<ResponseT>} 安全公告列表
 */
export function getSecurityList(params: SafetyBulletinQueryT) {
  const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
  return request.post(url, params).then((res) => {
    return res?.data;
  });
}

/**
 * 获取影响产品-下拉列表
 * @returns { Promise<ResponseT> } 影响产品数据
 */
export function getProductList() {
  const url =
    '/api-cve/cve-security-notice-server/securitynotice/getAffectedProduct';
  return request.get(url).then((res) => {
    return res?.data;
  });
}

/**
 * 获取影响组件-下拉列表
 * @param { ComponentQueryT } 请求参数
 * @returns { Promise<ResponseT> } 影响组件数据
 */
export function getComponentList(params: ComponentQueryT) {
  Object.keys(params).forEach((key) => {
    if (!params[key as keyof ComponentQueryT]) {
      delete params[key as keyof ComponentQueryT];
    }
  });
  const url =
    '/api-cve/cve-security-notice-server/securitynotice/getAffectedComponent';
  return request.get(url, { params }).then((res) => {
    return res?.data;
  });
}

/**
 * 获取安全公告详情
 * @param { string } securityNoticeNo 公告名称
 * @returns { Promise<ResponseT> } 安全公告详情
 */
export function getSecurityDetail(securityNoticeNo: string) {
  const url = `/api-cve/cve-security-notice-server/securitynotice/getBySecurityNoticeNo?securityNoticeNo=${securityNoticeNo}`;
  return request.get(url).then((res) => {
    return res?.data.result;
  });
}

/**
 * 获取Cve列表
 * @param { CveQueryT } 请求参数
 * @returns { Promise<ResponseT> } CVE列表
 */
export function getCveList(params: CveQueryT) {
  const url = '/api-cve/cve-security-notice-server/cvedatabase/findAll';
  return request.post(url, params).then((res) => {
    return res?.data;
  });
}

/**
 * 获取Cve详情信息
 * @param { string } id cveId
 * @param { string } name packageName
 * @return { Promise<ResponseT> } cve详情信息
 */
export function getCveDetail(id: string, name: string) {
  const url = `/api-cve/cve-security-notice-server/cvedatabase/getByCveIdAndPackageName?cveId=${id}&packageName=${name}`;
  return request.get(url).then((res) => {
    return res?.data;
  });
}

/**
 * 获取Cve详情-影响产品信息
 * @param { string } id cveId
 * @param { string } name packageName
 * @return { Promise<ResponseT> } cve详情 - 影响产品列表
 */
export function getAffectedProduct(id: string, name: string) {
  const url = `/api-cve/cve-security-notice-server/cvedatabase/getCVEProductPackageList?cveId=${id}&packageName=${name}`;
  return request.get(url).then((res) => {
    return res?.data;
  });
}

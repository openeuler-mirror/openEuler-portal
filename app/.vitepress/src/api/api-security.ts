import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import {
  SelectParamsT,
  CveQueryT,
  CompatibilityQueryT,
  SafetyBulletinQueryT,
  OsvQueryT,
  ComponentQueryT,
  SecurityDetailT,
  TotalDataT,
  CveDetailT,
  AffectProductT,
  CompatibilityListT,
  ConfigurationInfoT,
  AdapterListT,
  DriverListT,
  SoftwareListT,
  BussinessSoftT,
  SofoFilterT,
  TestOrganizationsT,
  OsvDataT,
  OsvListT
} from '@/shared/@types/type-support';

/**
 * 获取安全公告列表
 * @param {SafetyBulletinQueryT} params 列表请求参数
 * @return {Promise<TotalDataT>} 安全公告列表
 */
export function getSecurityList(params: SafetyBulletinQueryT): Promise<TotalDataT> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/securitynotice/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取安全公告详情
 * @param {string} securityNoticeNo 公告名称 
 * @return {Promise<SecurityDetailT>} 安全公告详情
 */
export function getSecurityDetail(securityNoticeNo: string): Promise<SecurityDetailT> {
  const url = `/api-euler/api-cve/cve-security-notice-server/securitynotice/getBySecurityNoticeNo?securityNoticeNo=${securityNoticeNo}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data.result)
}

/**
 * 获取Cve列表
 * @param {CveQueryT} params Cve列表请求参数
 * @return {Promise<TotalDataT>} CVE列表
 */
export function getCveList(params: CveQueryT): Promise<TotalDataT> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/cvedatabase/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)

}

/**
 * 获取Cve详情信息
 * @param {string} id cveId
 * @param {string} name packageName
 * @return {Promise<CveDetailT>} cve详情信息
 */
export function getCveDetail(id: string, name: string): Promise<CveDetailT> {
  const url = `/api-euler/api-cve/cve-security-notice-server/cvedatabase/getByCveIdAndPackageName?cveId=${id}&packageName=${name}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取Cve详情-影响产品信息
 * @param {string} id cveId
 * @param {string} name packageName
 * @return {Promise<AffectProductT[]>} cve详情 - 影响产品列表
 */
export function getAffectedProduct(id: string, name: string): Promise<AffectProductT[]> {
  const url = `/api-euler/api-cve/cve-security-notice-server/cvedatabase/getCVEProductPackageList?cveId=${id}&packageName=${name}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取架构分类
 * @return {Promise<string[]>} 架构分类数据
 */
export function getDriverArchitecture(): Promise<string[]> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getArchitecture';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取操作系统分类
 * @return {Promise<string[]>} 操作系统分类数据
 */
export function getDriverOSOptions(): Promise<string[]> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getOS';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取整机列表
 * @param {CompatibilityQueryT} params 整机列表请求参数
 * @return {Promise<CompatibilityListT[]>} 整机列表
 */
export function getCompatibilityList(params: CompatibilityQueryT): Promise<CompatibilityListT[]> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取整机-兼容性配置 详情信息
 * @param {string} id 参数-兼容性列表id
 * @return {Promise<ConfigurationInfoT>} 详情信息
 */
export function getConfigurationInfo(id: string): Promise<ConfigurationInfoT> {
  const url = ` /api-euler/api-cve/cve-security-notice-server/hardwarecomp/getOne?id=${id}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取整机->兼容性配置 详情信息->Adapter and Drivers列表
 * @param {string} id 兼容性列表单条数据id
 * @return {Promise<AdapterListT[]>} Adapter and Drivers列表
 */
export function getdetailAapterList(id: string): Promise<AdapterListT[]> {
  const url = ` /api-euler/api-cve/cve-security-notice-server/hardwarecomp/getAdapterList?hardwareId=${id}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取板卡列表
 * @param {CompatibilityQueryT} params 获取板卡列表请求参数
 * @return {Promise<DriverListT[]>} {totalCount:number,driverCompList:[]} 板卡列表
 */
export function getDriverList(params: CompatibilityQueryT): Promise<DriverListT[]> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/drivercomp/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取开源软件列表
 * @param {CompatibilityQueryT} params 获取开源软件列表请求参数
 * @return {Promise<SoftwareListT>} 开源软件列表
 */
export function getSoftwareList(params: CompatibilityQueryT): Promise<SoftwareListT> {
  const os = params.os ? `&os=${params.os}` : '';
  const architecture = params.architecture
    ? `&arch=${params.architecture}`
    : '';
  const type = params.type ? `&type=${params.type}` : '';
  const keyword = params.keyword ? `&keyword=${params.keyword}` : '';
  const url = `/compatibility/api/web_backend/compat_software_info?page_size=${params.pages.size}&page_num=${params.pages.page}${keyword}${architecture}${os}${type}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取商业软件列表
 * @param {CompatibilityQueryT} params 商业软件列表请求参数
 * @return {Promise<BussinessSoftT>} {totalNum:number, data:[]} 商业软件数据
 */
export function getBusinessSoftwareList(params: CompatibilityQueryT): Promise<BussinessSoftT> {
  const queryData = {
    pageSize: params['pages'].size,
    pageNo: params['pages'].page,
    testOrganization: params.testOrganization,
    osName: params.os,
    keyword: params.keyword,
    dataSource: new Array(params.dataSource),
    productType: new Array('软件'),
  };
  const url = `/certification/software/communityChecklist`;
  return request
    .post(url, queryData)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取板卡类型-筛选条件
 * @param {string} lang 语言
 * @return {Promise<string[]>} 板卡类型数据
 */
export function getDriveTypes(lang: string): Promise<string[]> {
  const url = `/api-euler/api-cve/cve-security-notice-server/drivercomp/getType?lang=${lang}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取软件类型-筛选条件
 * @return {Promise<SofoFilterT>} {Arch:[], Os:[], Type:[]} Type软件类型
 */
export function getSoftFilter(): Promise<SofoFilterT> {
  const url = '/compatibility/api/web_backend/query_compat_software';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取测试机构-筛选条件
 * @return {Promise<TestOrganizationsT>} 测试机构
 */
export function getTestOrganizations(): Promise<TestOrganizationsT> {
  const url = '/certification/software/filterCriteria';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取CPU-筛选条件
 * @param {object} params 筛选条件请求参数
 * @param {string} lang 语言
 * @return {Promise<string[]>} CPU数据
 */
export function getCpu(params: SelectParamsT): Promise<string[]> {
  const url = `/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getCpu?lang=${params.lang}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取OSV技术评测列表-os厂商（筛选项）
 * @return {Promise<string[]>} os厂商数据
 */
export function getOsName(): Promise<string[]> {
  const url = '/api-euler/api-cve/cve-security-notice-server/osv/getOsName';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取OSV技术评测列表-分类（筛选项）
 * @return {Promise<string[]>} 分类列表['嵌入式','服务器']
 */
export function getOsType(): Promise<string[]> {
  const url = '/api-euler/api-cve/cve-security-notice-server/osv/getType';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取OSV技术评测列表
 * @param {OsvQueryT} params osv技术测评列表请求参数
 * @return {Promise<OsvDataT>} {OsvListT: [], totalCount: number}
 */
export function getOsTableData(params: OsvQueryT): Promise<OsvDataT> {
  const url = '/api-euler/api-cve/cve-security-notice-server/osv/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取OSV技术评测详细信息
 * @param {string} id osv列表单条数据id
 * @return {Promise<OsvListT>} osv详情信息
 */
export function getOsvOne(id: string): Promise<OsvListT> {
  const url = `/api-euler/api-cve/cve-security-notice-server/osv/getOne?id=${id}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取影响产品-下拉列表
 * @return {Promise<string[]>} 影响产品数据
 */
export function getProductList(): Promise<string[]> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/securitynotice/getAffectedProduct';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取影响组件-下拉列表
 * @param {ComponentQueryT} params 请求参数
 * @return {Promise<string[]>} 影响组件数据
 */
export function getComponentList(params: ComponentQueryT): Promise<string[]> {
  Object.keys(params).forEach((key) => {
    if (!params[key as keyof ComponentQueryT]) {
      delete params[key as keyof ComponentQueryT];
    }
  });
  const url =
    '/api-euler/api-cve/cve-security-notice-server/securitynotice/getAffectedComponent';
  return request
    .get(url, { params })
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取解决方案列表
 * @param {} params 请求参数
 * @return {Object} 
 */
export function getSolutionList(params: CompatibilityQueryT): Promise<{
  code: number,
  msg: string,
  result: TotalDataT,
  success: boolean,
}> {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/solutioncomp/findAll';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取解决方案数据
 * @returns {Object}
 */
export function getSolution(): Promise<{
  code: number,
  msg: string,
  result: string[],
  success: boolean
}> {
  const url = '/api-euler/api-cve/cve-security-notice-server/solutioncomp/getSolution?lang=zh';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}

/**
 * 获取认证类型数据
 * @returns {Object}
 */
export function getCertificationType(): Promise<{
  code: number,
  msg: string,
  result: string[],
  success: boolean
}> {
  const url = '/api-euler/api-cve/cve-security-notice-server/solutioncomp/getCertificationType?lang=zh';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
}
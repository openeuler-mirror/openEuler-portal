export interface BaseQuery {
  page: number;
  size: number;
}
export interface CveQuery {
  pages: BaseQuery;
  keyword?: string;
  status?: string;
  type?: string;
  year?: string;
  architecture?: string;
  cpu?: string;
  score?: string;
  os?: string;
  lang?: string;
  testOrganization?: string;
  osvName?: string;
  cardType?: string;
  dataSource?: string;
}
export interface DetailParams {
  securityNoticeNo: string;
}
export interface SecurityLists {
  affectedComponent: string;
  affectedProduct: string;
  announcementTime: string;
  securityNoticeNo: string;
  summary: string;
  type: string;
  id: number;
}
export interface CveLists {
  createTime: string;
  cveId: string;
  cvsssCoreOE: string;
  status: string;
  summary: string;
  updateTime: string;
  packageName: string;
}
export interface CompatibilityList {
  architecture: string;
  biosUefi?: string;
  boardCards?: [];
  certificationAddr?: string;
  certificationTime?: string;
  commitID?: string;
  compatibilityConfiguration?: null;
  computerType?: string;
  cpu?: string;
  date?: string;
  friendlyLink?: string;
  hardDiskDrive?: string;
  hardwareFactory?: string;
  hardwareModel?: string;
  hostBusAdapter?: string;
  id?: number;
  lang?: string;
  mainboardModel?: string;
  osVersion?: string;
  portsBusTypes?: string;
  productInformation?: string;
  ram?: string;
  updateTime?: string;
  videoAdapter?: string;
}
export interface BoardCardList {
  architecture: string;
  boardModel: string;
  chipModel: string;
  chipVendor: string;
  deviceID?: string;
  downloadLink?: string;
  driverDate: string;
  driverName: string;
  driverSize?: string;
  id?: number;
  item?: string;
  lang?: string;
  os: string;
  sha256?: string;
  ssID?: string;
  svID?: string;
  type: string;
  updateTime?: string;
  vendorID?: string;
  version: string;
}
export interface SoftWareQuery {
  page_size: number;
  page_num: number;
}
export interface SelectParams {
  lang: string;
}
export interface SoftWareList {
  arch: string;
  bin: string;
  category: string;
  downloadLink: string;
  group: string;
  install: string;
  libs: string;
  license: string;
  os: string;
  property: string;
  result_root: string;
  result_url: string;
  softwareName: string;
  src_location: string;
  type: string;
  uninstall: string;
  version: string;
}
export interface PlatFormAndServerModel {
  platformName: string;
  serverProvider: string;
  serverTypes: string[];
}
export interface BusinessSoftWareList {
  authenticateLink?: null;
  certId?: number;
  companyName: string;
  osName: string;
  osVersion: string;
  platformTypeAndServerModel: PlatFormAndServerModel[];
  productName: string;
  productVersion: string;
  testOrganization: string;
  type: string;
}

export interface BusinessSoftWareQuery {
  pageSize: number;
  pageNo: number;
}
export interface FilterList {
  select: string[];
  title: string;
}

export interface ConfigurationInfo {
  architecture: string;
  biosUefi: string;
  certificationAddr: string;
  certificationTime: string;
  commitID: string;
  compatibilityConfiguration: null;
  computerType: string;
  cpu: string;
  date: string;
  friendlyLink: string;
  hardDiskDrive: string;
  hardwareFactory: string;
  hardwareModel: string;
  hostBusAdapter: string;
  id: number;
  lang: string;
  mainboardModel: string;
  osVersion: string;
  portsBusTypes: string;
  productInformation: string;
  ram: string;
  updateTime: string;
  videoAdapter: string;
}
export interface CveDetailCvss {
  affectedProduct: string;
  announcementTime: string;
  attackComplexityNVD: string;
  attackComplexityOE: string;
  attackVectorNVD: string;
  attackVectorOE: string;
  availabilityNVD: string;
  availabilityOE: string;
  confidentialityNVD: string;
  confidentialityOE: string;
  cveId: string;
  cvrf: null;
  cvsssCoreNVD: string;
  cvsssCoreOE: string;
  id: number;
  integrityNVD: string;
  integrityOE: string;
  nationalCyberAwarenessSystem: string;
  packageList: null;
  packageName: string;
  parserBean: null;
  privilegesRequiredNVD: string;
  privilegesRequiredOE: string;
  scopeNVD: string;
  scopeOE: string;
  securityNoticeNo: string;
  status: string;
  summary: string;
  updateTime: string;
  userInteractionNVD: string;
  userInteractionOE: string;
}
export interface AffectProduct {
  cveId: string;
  id: number;
  packageName: string;
  productName: string;
  releaseTime: string;
  securityNoticeNo: string;
  status: string;
  updateTime: string;
}
export interface DetailQuery {
  id: string;
}

export interface OsvList {
  arch: string;
  baseOpeneulerVersion?: string;
  checksum?: string;
  date: string;
  details: string;
  friendlyLink: string;
  id: number;
  osDownloadLink: string;
  osVersion: string;
  osvName: string;
  platformResult?: object[];
  toolsResult?: object[];
  totalResult?: string;
  type: string;
  updateTime?: string;
}

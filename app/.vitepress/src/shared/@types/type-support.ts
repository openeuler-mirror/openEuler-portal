export interface BaseQueryT {
  page: number;
  size: number;
}
export interface CveQueryT {
  pages: BaseQueryT;
  keyword?: string;
  status?: string;
  year?: string;
  score?: string;
  noticeType: string;
}
export interface OsvQueryT {
  pages: BaseQueryT;
  keyword: string;
  type: string;
  osvName: string;
}
export interface SafetyBulletinQueryT {
  pages: BaseQueryT;
  keyword: string;
  type: [];
  date: [];
  affectedProduct: [];
  affectedComponent: string;
  noticeType: string;
}
export interface SecurityDetailT {
  affectedComponent: string;
  affectedProduct: string;
  announcementTime: string;
  cveId: string;
  cveList: [];
  cvrf?: null;
  description: string;
  id: number;
  introduction: string;
  notice_type: string;
  packageHelperList: [];
  packageHotpatchList?: null;
  packageList: [];
  packageName: string;
  referenceDocuments: string;
  referenceList: [];
  revisionHistory: string;
  securityNoticeNo: string;
  subject: string;
  summary: string;
  type: string;
  updateTime: string;
}
export interface CveDetailT {
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
  createTime: string;
  cveId: string;
  cvrf?: null;
  cvsssCoreNVD: string;
  cvsssCoreOE: string;
  id: number;
  integrityNVD: string;
  integrityOE: string;
  nationalCyberAwarenessSystem: string;
  packageList?: null;
  packageName: string;
  parserBean?: null;
  privilegesRequiredNVD: string;
  privilegesRequiredOE: string;
  scopeNVD: string;
  scopeOE: string;
  securityNoticeNo: string;
  status: string;
  summary: string;
  type: string;
  updateTime: string;
  userInteractionNVD: string;
  userInteractionOE: string;
}
export interface AffectProductT {
  createTime?: string;
  cveId: string;
  id: number;
  packageName: string;
  productName: string;
  releaseTime: string;
  securityNoticeNo: string;
  status: string;
  updateTime: string;
}

export interface ConfigurationInfoT {
  architecture: string;
  biosUefi: string;
  boardCards: [];
  certificationAddr: string;
  certificationTime: string;
  commitID: string;
  compatibilityConfiguration?: null;
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
export interface AdapterListT {
  architecture: string;
  boardModel: string;
  chipModel: string;
  chipVendor: string;
  date: string;
  deviceID: string;
  downloadLink: string;
  driverName: string;
  driverSize: string;
  hardwareId: number;
  id: number;
  item: string;
  lang: string;
  os: string;
  sha256: string;
  ssID: string;
  svID: string;
  type: string;
  updateTime: string;
  vendorID: string;
  version: string;
}
export interface ResultT {
  name: string;
  percent: string;
  result: string;
}
export interface ComponentQueryT {
  securityLevel?: string;
  affectedProduct?: string;
  noticeType: string;
}
export interface CompatibilityQueryT {
  pages: BaseQueryT;
  architecture: string;
  keyword: string;
  cpu: string;
  os: string;
  testOrganization: string;
  type: string;
  cardType: string;
  lang: string;
  dataSource: string;
  solution: string;
  certificationType: string;
}
export interface OsvListT {
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
export interface OsvDataT {
  osvList: OsvListT[];
  totalCount: number;
}
export interface PackageInfoT {
  productName: string;
  packageName: string;
  sha256: string;
  url?: string;
  isEpol: boolean;
  child: PackageInfoT[];
}
export interface PackageT {
  packageName: string[];
  packageType: string;
  url?: string;
}
export interface HotPatchT {
  productName: string;
  child: PackageT[];
}
export interface SecurityListsT {
  affectedComponent: string;
  affectedProduct: string;
  announcementTime: string;
  cveId?: string;
  cveList?: string;
  cvrf?: null;
  description?: string;
  id: number;
  introduction?: string;
  notice_type?: string;
  packageHelperList?: [];
  packageHotpatchList?: null;
  packageList?: [];
  packageName: string;
  referenceDocuments: string;
  referenceList?: string;
  revisionHistory?: string;
  securityNoticeNo: string;
  subject?: string;
  summary: string;
  type: string;
  updateTime: string;
}
export interface CveListsT {
  affectedProduct?: string;
  announcementTime?: string;
  attackComplexityNVD?: string;
  attackComplexityOE?: string;
  attackVectorNVD?: string;
  attackVectorOE?: string;
  availabilityNVD?: string;
  availabilityOE?: string;
  confidentialityNVD?: string;
  confidentialityOE?: string;
  createTime: string;
  cveId: string;
  cvrf?: null;
  cvsssCoreNVD?: string;
  cvsssCoreOE: string;
  id?: number;
  integrityNVD?: string;
  integrityOE?: string;
  nationalCyberAwarenessSystem?: string;
  packageList?: null;
  packageName: string;
  parserBean?: null;
  privilegesRequiredNVD?: string;
  privilegesRequiredOE?: string;
  scopeNVD?: string;
  scopeOE?: string;
  securityNoticeNo?: string;
  status: string;
  summary: string;
  type?: string;
  updateTime: string;
  userInteractionNVD?: string;
  userInteractionOE?: string;
}
export interface CompatibilityListT {
  id: number;
  architecture: string;
  biosUefi?: string;
  certificationAddr?: string;
  certificationTime?: string;
  commitID?: string;
  computerType?: string;
  cpu: string;
  date: string;
  friendlyLink: string;
  hardDiskDrive?: string;
  hardwareFactory: string;
  hardwareModel: string;
  hostBusAdapter?: string;
  lang?: string;
  mainboardModel?: string;
  osVersion: string;
  portsBusTypes?: string;
  productInformation?: string;
  ram?: string;
  videoAdapter?: string;
  updateTime?: string;
  compatibilityConfiguration?: null;
  boardCards?: [];
}
export interface DriverListT {
  architecture: string;
  boardModel: string;
  chipModel: string;
  chipVendor: string;
  deviceID: string;
  downloadLink: string;
  driverDate: string;
  driverName: string;
  driverSize: string;
  id: number;
  item: string;
  lang: string;
  os: string;
  sha256: string;
  ssID: string;
  svID: string;
  type: string;
  updateTime: string;
  vendorID: string;
  version: string;
}
export interface TotalDataT {
  applicationCompList?: [];
  cveDatabaseList?: CveListsT[];
  driverCompList?: DriverListT[];
  hardwareCompList?: CompatibilityListT[];
  securityNoticeList?: SecurityListsT[];
  solutionCompList: SolutionDataT[];
  totalCount: number;
}
export interface SolutionDataT {
  OVSVersion: string;
  architecture: string;
  biosUefi: string;
  certificationType: string;
  cpu: string;
  date: string;
  driver: string;
  hardDiskDrive: string;
  id: number;
  introduceLink: string;
  lang: string;
  libvirtVersion: string;
  networkCard: string;
  os: string;
  product: string;
  qemuVersion: string;
  raid: string;
  ram: string;
  serverModel: string;
  serverVendor: string;
  solution: string;
  stratovirtVersion: string;
  updateTime: string;
}
export interface SolutionDataT {
  OVSVersion: string;
  architecture: string;
  biosUefi: string;
  certificationType: string;
  cpu: string;
  date: string;
  driver: string;
  hardDiskDrive: string;
  id: number;
  introduceLink: string;
  lang: string;
  libvirtVersion: string;
  networkCard: string;
  os: string;
  product: string;
  qemuVersion: string;
  raid: string;
  ram: string;
  serverModel: string;
  serverVendor: string;
  solution: string;
  stratovirtVersion: string;
  updateTime: string;
}
export interface SoftwareListItemT {
  arch: string;
  bin: string;
  category: string;
  cmds: object;
  downloadLink: string;
  group: string;
  install: string;
  libs: string;
  license: string;
  os: string;
  property: string;
  result_root: string;
  result_url: string;
  src_location: string;
  type: string;
  uninstall: string;
  version: string;
}
export interface SoftwareListT {
  total: number;
  info: SoftwareListItemT[];
}
export interface BussinessSoftItemT {
  authenticateLink?: null;
  certId: number;
  companyName: string;
  dataId?: null;
  osName: string;
  osVersion: string;
  platformTypeAndServerModel?: [];
  productName: string;
  productVersion: string;
  region?: null;
  testOrganization: string;
  type: string;
}
export interface BussinessSoftT {
  data: BussinessSoftItemT[];
  totalNum: number;
}
export interface SofoFilterT {
  Arch: string[];
  OS: string[];
  Type: string[];
}
export interface TestOrganizationsT {
  osNames: string[];
  testOrganizations: string[];
}
export interface SelectParamsT {
  lang: string;
}
export interface FilterListT {
  select: string[];
  title: string;
}
export interface CveDetailCvssT {
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
  createTime: string;
  summary: string;
  updateTime: string;
  userInteractionNVD: string;
  userInteractionOE: string;
}

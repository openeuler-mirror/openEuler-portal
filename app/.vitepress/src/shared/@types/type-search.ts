export interface SortParams {
  category: string;
  lang: string;
  page: number;
  pageSize: number;
}

export interface SortResponse {
  msg: string;
  obj: any;
  status: number;
}

export interface SortObjRecordsT {
  articleName: string;
  banner: string;
  category: string;
  company: string;
  img: string;
  industry: string;
  lang: string;
  path: string;
  summary: string;
  textContent: string;
  title: string;
  type: string;
}
export interface SortObjT {
  count: number;
  page: number;
  pageSize: number;
  records: SortObjRecordsT[];
}
export interface TimeTagItemT {
  count: number;
  key: string;
}
export interface TimeTagsT {
  totalNum: TimeTagItemT[];
}
export interface SearchDrowdownArrT {
  eulerForumId: number;
  lang: string;
  path: string;
  textContent: string;
  title: string;
  type: string;
}
export interface SearchDrowdownT {
  records: SearchDrowdownArrT[];
  keyword: string;
  page: number;
  pageSize: number;
}

export interface LimitArrItemT {
  type: string;
  version: string;
}
export interface SearchCountQueryT {
  docsVersion: string;
  keyword: string;
  lang: string;
  limit: LimitArrItemT[];
}
export interface SearchCountResItemT {
  doc_count: number;
  key: string;
}
export interface SearchCountResT {
  total: SearchCountResItemT[];
}
export interface RamRecordsT {
  filename: string;
  path: string;
  version: string;
}
export interface SearchRamDataT {
  totalNum: number;
  records: RamRecordsT[];
}
export interface RelevantQueryT {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
  limit: LimitArrItemT[];
}
export interface StatisticT {
  businessosv: number;
  comments: number;
  communitymembers: number;
  contributors: number;
  downloads: number;
  downloaduser: number;
  issues: number;
  modulenums: number;
  noticeusers: number;
  partners: number;
  prs: number;
  repos: number;
  sigs: number;
  users: number;
}
export interface MeetupDataT {
  topic: string;
  company: string;
  date: string;
  duration: string;
  city: string;
  meetupSize: string;
  principalUser: string;
  principalCompany: string;
  principalPhone: string;
  principalEmail: string;
  meetupFormat: string;
  supports: [];
  details: string;
}

export interface SearchRecommendT {
  key: string;
  count: number;
}

export interface ShowcaseDataT {
  summary: string; // 简要说明
  path: string; // 页面路径
  img: string; // 图片路径
  articleName: string;
  banner: string; // 详情页横幅图片路径
  textContent: string; // 文章内容
  industry: string; // 行业类别
  company: string; // 公司/机构名称
  lang: string; // 语言
  type: string; // 类型
  title: string; // 标题
  category: string; // 类别
}

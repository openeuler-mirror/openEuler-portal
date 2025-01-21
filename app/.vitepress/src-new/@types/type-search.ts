export interface SoftwareParamsT {
  dataType: string;
  keyword: string;
  pageNum: number;
  pageSize: number;
  keywordType: string;
}

export interface FeedbackParamsT {
  searchFlag: boolean;
  keyword: string;
  feedbackText: string;
  keywordType: string;
}

export type PkgTypeT = 'RPM' | 'IMAGE' | 'EPKG' | 'OEPKG';

export interface AppItemT {
  category: string | null;
  description: string | null;
  iconUrl: string | null;
  name: string;
  tags: PkgTypeT[];
  pkgIds: PkgIdsT;
  maintainers?: PkgIdsT;
  arch?: string;
  os?: string;
}

export interface PkgIdsT {
  RPM: string;
  IMAGE: string;
  EPKG: string;
  OEPKG: string;
}

export interface SearchCountResItemT {
  doc_count: number;
  key: string;
}
// 搜索页，搜索结果
export interface SearchDocsT {
  records: SearchDocsTArrT[];
  keyword: string; // 搜索词
  page: number;
  pageSize: number;
}

export interface SearchDocsTArrT {
  eulerForumId: number;
  lang: string;
  path: string;
  textContent: string;
  title: string;
  type: string;
}

// 搜索数量参数
export interface SearchCountQueryT {
  docsVersion: string;
  keyword: string;
  lang: string;
  limit: LimitArrItemT[]; // 限制条件
}

export interface LimitArrItemT {
  type: string;
  version: string;
}

export interface SearchCountResItemT {
  doc_count: number;
  key: string;
}

export interface SearchCountResT {
  total: SearchCountResItemT[];
}
// 关联搜索参数
export interface RelevantQueryT {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
  limit: LimitArrItemT[];
}

// 搜索 docs 参数
export interface SearchDocsQueryT {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
  limit: LimitArrItemT[];
}
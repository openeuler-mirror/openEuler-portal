// 社区活力数据
export interface VitalityValueT {
  comments: number;
  communitymembers: number;
  issues: number;
  isv: number;
  users: number;
  prs: number;
  partners: number;
  businessosv: number;
  repos: number;
  sigs: number;
  modulenums: number;
  contributors: number;
}

// 案例参数
export interface CaseT {
  category?: string;
  lang?: string;
  page?: number;
  pageSize?: number;
}

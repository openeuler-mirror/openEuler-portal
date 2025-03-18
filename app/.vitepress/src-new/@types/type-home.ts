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

export interface CalendarValueT {
  name: string;
  url: string;
  dates: string[];
  address: string;
  start_date: string;
  end_date: string;
  activity_type: string;
  type: string;
}

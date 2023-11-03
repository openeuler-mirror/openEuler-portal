export interface NewsData {
  articleName: string;
  author: any;
  banner: string;
  category: string;
  date: string;
  deleteType: string;
  lang: string;
  path: string;
  summary: string;
  tags: string[];
  textContent: string;
  title: string;
  type: string;
}

export interface ParamsType {
  page: number;
  pageSize: number;
  lang: string;
  category: string;
  archives?: string;
  author?: string;
  tags?: string;
}

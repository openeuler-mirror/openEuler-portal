export interface GroupInfoT {
  sig_names: string;
  en_feature: string;
  feature: string;
  created_at?: string;
  en_group: string;
  group: string;
  rank: number;
  score: number;
}

export interface SigCompleteItemT {
  committer_info: [];
  committers: string[];
  created_at: string;
  description: string;
  is_sig_original: number;
  mailing_list: string;
  maintainer_info: [];
  maintainers: string[];
  repos: string[];
  sig_name: string;
}

export interface SigCompleteListT {
  data: SigCompleteItemT[];
  total: number;
}

export interface sigMaintainerT {
  gitee_id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface SigContributeArrT {
  contribute: number;
  gitee_id: string;
  usertype: string;
  rank?: number;
}

export interface TimeDataT {
  creator: string;
  detail: string;
  duration_time: string;
  endTime: string;
  etherpad: string;
  group_name: string;
  id: number;
  join_url: string;
  meeting_id: string;
  platform: string;
  name: string;
  startTime: string;
  video_url: string;
}

export interface SigDetailItemT {
  date: string;
  timeData: TimeDataT[];
}

export interface SigDetailT {
  tableData: SigDetailItemT[];
}

export interface committerDetailT {
  gitee_id: string[];
  repo: string;
}

export interface SigRepoT {
  committerDetails: committerDetailT[];
  committers: string[];
  maintainers: string[];
}

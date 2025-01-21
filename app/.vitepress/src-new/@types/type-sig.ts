export interface GroupInfoT {
  sig_names: string;
  en_feature: string;
  feature: string;
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

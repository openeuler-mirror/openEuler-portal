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

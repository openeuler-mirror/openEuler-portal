export interface FeatureInfo {
  featureName: string;
  sigs: string[];
}

export interface GroupInfo {
  groupName: string;
  features: FeatureInfo[];
}

export interface SigList {
  group_name: string;
  maillist: string;
}

export interface InfoItem {
  content: string;
  content_type: string;
  description: string;
  name: string;
  title: string;
}
export interface EasyeditorInfoDataItem {
  content: string;
  content_type: string;
  description: string;
  name: string;
  title: string;
  items?: InfoItem[];
}

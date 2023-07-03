export interface DownloadCommunityData {
  CLOUD_IMAGE: string;
  DESC: string;
  DOWNLOAD_URL: string;
  EDGE_IMAGE: string;
  EMBEDDEN_IMAGE: string;
  GET_ISO_URL: string;
  INSTALL_GUIDENCE_URL: string;
  LIFE_CYCLE_URL: string;
  LTS: boolean;
  MANUFACTURER: string;
  NAME: string;
  PUBLISH_DATE: string;
  RELEASE_DESC_URL: string;
  SEEK_HELP_URL: string;
  WEBSITE_SELECT: string;
  WHITE_PAPER: string;
  SERVER_IMAGE?: string;
  VERSION: string;
  PLANNED_EOL: string;
  DETAILED_LINK: DetailedLinkItem[];
}
export interface DownloadCommercialData {
  CLOUD_IMAGE: string;
  DESC: string;
  DOWNLOAD_URL: string;
  EDGE_IMAGE: string;
  EMBEDDEN_IMAGE: string;
  GET_ISO_URL: string;
  INSTALL_GUIDENCE_URL: string;
  LIFE_CYCLE_URL: string;
  LTS: boolean;
  MANUFACTURER: string;
  NAME: string;
  PUBLISH_DATE: string;
  RELEASE_DESC_URL: string;
  SEEK_HELP_URL: string;
  WEBSITE_SELECT: string;
  WHITE_PAPER: string;
  SERVER_IMAGE?: string;
  VERSION: string;
  PLANNED_EOL: string;
  DETAILED_LINK: DetailedLinkCommercialItem[];
}
export interface MirrorData {
  Name: string;
  NetworkBandwidth: string;
  [key: string]: string;
}
export interface LinkListItem {
  TYPE: string;
  SIZE: string;
  SHACODE: string;
  DOWNLOAD_LINK: string;
  TIPS: string;
  IS_FOLDER?: boolean;
}
export interface DetailedLinkItem {
  LINK_LIST: LinkListItem[];
  ARCH: string;
  SCENARIO: string;
}
export interface DetailedLinkCommercialItem {
  LINK: string;
  ARCH: string;
  SCENARIO: string;
}
export interface Scenario {
  KEY: string;
  VALUE: string;
}

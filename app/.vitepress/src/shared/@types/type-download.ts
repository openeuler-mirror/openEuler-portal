export interface DownloadCommunityDataT {
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
  DETAILED_LINK: DetailedLinkItemT[];
}
export interface DownloadCommercialDataT {
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
  DETAILED_LINK: DetailedLinkCommercialItemT[];
}
export interface MirrorDataT {
  Name: string;
  NetworkBandwidth: string;
  [key: string]: string;
}
export interface LinkListItemT {
  TYPE: string;
  SIZE: string;
  SHACODE: string;
  DOWNLOAD_LINK: string;
  TIPS: string;
  IS_FOLDER?: boolean;
}
export interface DetailedLinkItemT {
  LINK_LIST: LinkListItemT[];
  ARCH: string;
  SCENARIO: string;
}
export interface DetailedLinkCommercialItemT {
  LINK: string;
  ARCH: string;
  SCENARIO: string;
}
export interface ScenarioT {
  KEY: string;
  VALUE: string;
}

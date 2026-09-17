declare module '#content/download' {
  // get_os: 获取操作系统配置
  interface DownloadGetOsLinkT {
    href: string;
    label: string;
    introduce: string;
  }
  interface DownloadGetOsItemT {
    id: string;
    bg_light: string;
    bg_dark: string;
    bg_mo_light: string;
    bg_mo_dark: string;
    title: string;
    intro: string;
    intro1?: string;
    intro_link?: string;
    repeat?: number;
    links: DownloadGetOsLinkT[];
  }

  // get_resource: 相关资源
  interface DownloadGetResourceItemT {
    icon_light: string;
    title: string;
    label: string;
    href: string;
  }

  // support_service: 支持与服务
  interface DownloadSupportServiceItemT {
    icon_light: string;
    title: string;
    label: string;
    href: string;
  }

  interface DownloadContentT {
    community_versions: string[];
    get_os: DownloadGetOsItemT[];
    get_resource: DownloadGetResourceItemT[];
    support_service: DownloadSupportServiceItemT[];
  }

  const data: { zh: DownloadContentT; en: DownloadContentT };
  export default data;
}

declare module '#content/download/commercial-release' {
  // commercial_release: 商业发行版
  interface CommercialReleaseDetailedLinkT {
    LINK?: string;
    ARCH: string;
  }
  interface CommercialReleaseItemT {
    NAME: string;
    DOWNLOAD_URL: string;
    DESC?: string;
    MANUFACTURER: string;
    PUBLISH_DATE: string;
    DETAILED_LINK?: CommercialReleaseDetailedLinkT[];
    LTS?: boolean;
  }

  interface CommercialReleaseContentT {
    commercial_release: CommercialReleaseItemT[];
  }

  const data: { zh: CommercialReleaseContentT; en: CommercialReleaseContentT };
  export default data;
}

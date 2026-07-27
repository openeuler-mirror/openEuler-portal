// `#content/download/commercial-release` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/download/commercial-release/zh.yaml` + `.content/download/commercial-release/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 CommercialReleaseDataT 结构。

declare module '#content/download/commercial-release' {
  interface DetailedLinkItemT {
    link?: string;
    arch: string;
  }

  interface CommercialReleaseItemT {
    name: string;
    download_url: string;
    desc?: string;
    manufacturer: string;
    publish_date: string;
    lts?: boolean;
    detailed_link?: DetailedLinkItemT[];
  }

  interface CommercialReleaseDataT {
    commercial_release_list: CommercialReleaseItemT[];
  }

  const data: { zh: CommercialReleaseDataT; en: CommercialReleaseDataT };
  export default data;
}

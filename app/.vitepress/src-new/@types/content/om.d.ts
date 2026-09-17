declare module '#content/om' {
  // qr_codes: 二维码配置
  interface OmQrCodeItemT {
    value: string;
    label: string;
  }

  // om_set: 运维全集卡片
  interface OmCardItemT {
    title: string;
    width: number;
    items: string[];
  }

  interface OmSetItemT {
    title: string;
    height: number;
    card_list: OmCardItemT[];
  }

  // tools_url: 工具下载链接
  interface OmToolItemT {
    name: string;
    url: string;
  }

  interface OmToolsUrlT {
    base: OmToolItemT[];
    feature: OmToolItemT[];
  }

  interface OmContentT {
    help_contents: string[];
    qr_codes: OmQrCodeItemT[];
    om_set: OmSetItemT[];
    features_download_url: string;
    guide_download_url: string;
    tools_url: OmToolsUrlT;
  }

  const data: { zh: OmContentT };
  export default data;
}

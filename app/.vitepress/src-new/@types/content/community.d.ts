declare module '#content/community/contribution' {
  // link_list: 贡献地图热点链接
  interface ContributionLinkItemT {
    url: string;
    blank: boolean;
  }

  interface ContributionContentT {
    background_img_light: string;
    background_img_dark: string;
    background_img_h5_light: string;
    background_img_h5_dark: string;
    download_pdf_url: string;
    link_list: ContributionLinkItemT[];
  }

  const data: { zh: ContributionContentT; en: ContributionContentT };
  export default data;
}

// `#content/community/member` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/community/member/zh.yaml` + `.content/community/member/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 MemberDataT 结构。

declare module '#content/community/member' {
  interface MemberLogoItemT {
    img_light: string;
    img_dark: string;
    alt: string;
    no_icon?: boolean;
  }

  interface MemberDonorLevelT {
    id: string;
    donor_title: string;
    logo_list: MemberLogoItemT[];
  }

  interface MemberDataT {
    donor_levels: MemberDonorLevelT[];
  }

  const data: { zh: MemberDataT; en: MemberDataT };
  export default data;
}

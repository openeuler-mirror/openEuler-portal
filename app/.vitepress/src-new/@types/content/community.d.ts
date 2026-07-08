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

// `#content/community/organization` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/community/organization/zh.yaml` + `.content/community/organization/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下按委员会/工作组 slug 索引。
// 渲染顺序由 TheOrganization.vue 的 SECTIONS 数组决定（产品决策，写在视图代码里）。

declare module '#content/community/organization' {
  interface OrgMemberItemT {
    name: string;
    image: string;
    position?: string | string[];
    post?: string;
    email?: string;
    gitee?: string;
  }

  interface OrgGroupItemT {
    title: string;
    members: OrgMemberItemT[];
  }

  interface OrgSectionT {
    title: string;
    anchor: string;
    members?: OrgMemberItemT[];
    groups?: OrgGroupItemT[];
    rows?: OrgMemberItemT[][];
  }

  // 顶层按 slug 索引（advisory / committee / technical / marketing / user /
  // business / operations / education / legal / ai / globalization）。
  // 用 index signature 而非显式字段，便于运营新增 committee 时无需改类型声明，
  // 仅需在 zh.yaml/en.yaml 加 section + 在 TheOrganization.vue 的 SECTIONS 加 slug。
  interface OrgDataT {
    [slug: string]: OrgSectionT;
  }

  const data: { zh: OrgDataT; en: OrgDataT };
  export default data;
}

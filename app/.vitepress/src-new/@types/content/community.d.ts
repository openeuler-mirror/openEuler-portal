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

declare module '#content/community/member' {
  // logo_list[]: 成员单位 logo 项
  interface MemberLogoItemT {
    img_light: string;
    img_dark: string;
    alt: string;
    no_icon?: boolean;
  }

  // donor_levels[]: 捐赠人级别项
  interface MemberDonorLevelT {
    id: string;
    donor_title: string;
    logo_list: MemberLogoItemT[];
  }

  interface MemberContentT {
    donor_levels: MemberDonorLevelT[];
    tips: string[];
    contact?: string[];
  }

  const data: { zh: MemberContentT; en: MemberContentT };
  export default data;
}

declare module '#content/community/honor' {
  // news[]: 新闻项
  interface HonorNewsItemT {
    name: string;
    link: string;
    certificate?: string;
  }

  // company.list[]: 公司 logo 项
  interface HonorCompanyLogoT {
    light: string;
    dark: string;
  }

  // company: 突出贡献单位
  interface HonorCompanyT {
    title: string[];
    list: HonorCompanyLogoT[];
    tips: string;
  }

  // contribution.personal[].list[]: 个人奖卡片
  interface HonorPersonalCardT {
    name: string;
    post: string[];
    img: string;
    detail: string[];
  }

  // contribution.personal[]: 个人奖分组
  interface HonorPersonalGroupT {
    title: string;
    list: HonorPersonalCardT[];
  }

  // contribution.team.list[]: 团队奖卡片
  interface HonorTeamItemT {
    name: string;
    detail: string[];
    link: string;
  }

  // contribution.team: 团队奖
  interface HonorTeamT {
    title: string;
    list: HonorTeamItemT[];
  }

  // contribution: 贡献奖
  interface HonorContributionT {
    title: string[];
    personal?: HonorPersonalGroupT[];
    team?: HonorTeamT;
  }

  // project.list[].list[]: 项目卡片
  interface HonorProjectItemT {
    name: string;
    detail: string[];
    link: string;
    link1?: string;
  }

  // project.list[]: 项目分组
  interface HonorProjectGroupT {
    title: string;
    bg: string;
    bg_dark: string;
    list: HonorProjectItemT[];
  }

  // project: 年度优秀项目
  interface HonorProjectT {
    title: string[];
    list: HonorProjectGroupT[];
  }

  // nomination.list[]: 提名者项
  interface HonorNominationItemT {
    name: string;
  }

  // nomination: 提名者
  interface HonorNominationT {
    title: string;
    list: HonorNominationItemT[];
  }

  // 年度数据（板块可选，不是每年都有全部板块）
  interface HonorYearDataT {
    news?: HonorNewsItemT[];
    company?: HonorCompanyT;
    contribution?: HonorContributionT;
    project?: HonorProjectT;
    nomination?: HonorNominationT;
    notice?: string;
  }

  const data: Record<string, HonorYearDataT>;
  export default data;
}

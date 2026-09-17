declare module '#content/universities' {
  // content_list: 技术小组内容卡片
  interface UniversityContentItemT {
    title: string;
    description: string;
  }

  // group_list: 高校技术小组
  interface UniversityGroupItemT {
    logo: string;
    name: string;
    description: string;
    content_list: UniversityContentItemT[];
  }

  // technical_group: 高校技术小组板块
  interface UniversityTechnicalGroupT {
    title: string;
    description: {
      text: string;
      link_text: string;
    };
    group_list: UniversityGroupItemT[];
  }

  // activity_list: 活动与大赛列表项
  interface UniversityActivityItemT {
    title: string;
    bg_img_pc: string;
    bg_img_mb?: string;
    bg_inset?: string;
    id?: string;
    detail: string;
    link_text: string;
    link_href: string;
  }

  // activity_game: 活动与大赛板块
  interface UniversityActivityGameT {
    title: string;
    activity_list: UniversityActivityItemT[];
  }

  // university_content_list: 高校贡献卡片
  interface UniversityContributionItemT {
    logo: string;
    name: string;
    detail: string;
    contribution_name: string;
    contribution_tag_list: string[];
    contribution_detail: string;
    contribution_detail_link: string;
    official_website: string;
    official_website_link: string;
  }

  // university_list: 其他参与高校
  interface UniversityListItemT {
    logo: string;
    name: string;
  }

  // university_contribution: 高校贡献板块
  interface UniversityContributionT {
    title: string;
    university_content_list: UniversityContributionItemT[];
    university_list: UniversityListItemT[];
    more: string;
  }

  interface UniversityContentT {
    title: string;
    technical_group: UniversityTechnicalGroupT;
    activity_game: UniversityActivityGameT;
    university_contribution: UniversityContributionT;
    university_mooc: string;
  }

  const data: { zh: UniversityContentT };
  export default data;
}

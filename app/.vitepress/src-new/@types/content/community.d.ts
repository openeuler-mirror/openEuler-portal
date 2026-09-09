declare module '#content/community' {
  // toc: 社区页侧边导航（树形结构，顶层为数组）
  //   label: 节点显示文案
  //   link: 节点链接路径段（拼接在 /{locale}/community/ 之后，空字符串表示纯分组标题）
  //   children: 子节点数组（可选，结构与父节点相同）
  interface CommunityTocItemT {
    label: string;
    link: string;
    children?: CommunityTocItemT[];
  }

  const data: {
    zh: CommunityTocItemT[];
    en: CommunityTocItemT[];
  };

  export default data;
}

declare module '#content/community/program/infrastructure' {
  // infrastructure: 基础设施合作伙伴 logo（zh 专属）
  //   img_light: 亮色主题 logo
  //   img_dark: 暗色主题 logo
  interface InfraItemT {
    img_light: string;
    img_dark: string;
  }

  const data: { zh: InfraItemT[] };
  export default data;
}

declare module '#content/community/program/technical-tutorial' {
  // technical_tutorial: 技术教程视频列表
  //   title: 视频标题
  //   url: 视频链接
  //   img: 视频封面图
  interface TutorialItemT {
    title: string;
    url: string;
    img: string;
  }

  const data: { zh: TutorialItemT[]; en: TutorialItemT[] };
  export default data;
}

declare module '#content/community/program/site-resources' {
  // site_resources: 站点资源（会议室）列表（zh 专属）
  //   img: 图片
  //   company: 单位名称
  //   type: 房间类型
  //   base: 所在城市
  //   scale: 容纳人数
  interface SiteResourceItemT {
    img: string;
    company: string;
    type: string;
    base: string;
    scale: string;
  }

  const data: { zh: SiteResourceItemT[] };
  export default data;
}

declare module '#content/community/program/join-oEVP' {
  // oevp: OEVP 专家列表
  //   avator: 头像图片
  //   name: 姓名
  //   company: 公司
  //   labels: 专业领域标签数组
  //   base: 所在地
  interface OevpItemT {
    avator: string;
    name: string;
    company: string;
    labels: string[];
    base: string;
  }

  const data: { zh: OevpItemT[]; en: OevpItemT[] };
  export default data;
}

declare module '#content/community/user-group/detail' {
  // guide: 用户组引导信息
  // question: 如何成为 Organizer/Ambassador
  // detail: 详情页 banner 图片
  // link: 相关链接
  // cities: 城市列表
  //   name: 城市名
  //   img: 城市图片
  //   data: 城市数据（title/organizational/organizer[]/ambassador[]/news[]/salon[]/showcase[]）
  //     ambassador/organizer: name/position/technology[]/home_page/email/avatar/avatar_dark/contribution
  //     news: summary/banner/title/path
  //     showcase: summary/path/industry/title

  interface UserGroupMemberT {
    name: string;
    position: string;
    technology?: string[];
    home_page?: string;
    email?: string;
    forum?: string;
    avatar: string;
    avatar_dark: string;
    contribution?: string;
  }

  interface UserGroupNewsT {
    summary: string;
    banner: string;
    title: string;
    path: string;
  }

  interface UserGroupShowcaseT {
    summary: string;
    path: string;
    industry: string;
    title: string;
  }

  interface UserGroupCityDataT {
    title: string;
    organizational: string;
    organizer: UserGroupMemberT[];
    ambassador: UserGroupMemberT[];
    news?: UserGroupNewsT[];
    salon?: any[];
    showcase?: UserGroupShowcaseT[];
  }

  interface UserGroupCityT {
    name: string;
    img: string;
    data: UserGroupCityDataT;
  }

  interface UserGroupDetailContentT {
    guide: Record<string, any>;
    question: Record<string, any>;
    detail: {
      banner: string;
      banner_dark: string;
      banner_mb: string;
      banner_mb_dark: string;
    };
    link: {
      apply_event: string;
      provide_case: string;
    };
    cities: UserGroupCityT[];
  }

  const data: { zh: UserGroupDetailContentT };
  export default data;
}

declare module '#content/projects' {
  // project_data: 项目卡片
  interface ProjectDataItemT {
    title: string;
    desc: string;
    icon: string;
    url: string;
    atomgit_url?: string;
    gitee_url?: string;
    tag?: string;
  }

  interface ProjectsContentT {
    project_data: ProjectDataItemT[];
  }

  const data: { zh: ProjectsContentT; en: ProjectsContentT };
  export default data;
}

declare module '#content/projects/ub-os-component' {
  interface UbOsRepoItemT {
    name?: string;
    module?: string;
    function?: string;
    desc?: string;
    repo_link?: string | string[];
    repo?: string | string[];
    row_key?: string;
    children?: UbOsRepoItemT[];
  }

  interface UbOsRelatedLinkT {
    icon: string;
    title: string;
    desc: string;
    href: string;
    is_outlink?: boolean;
  }

  interface UbOsComponentContentT {
    repo_list: UbOsRepoItemT[];
    related_links: UbOsRelatedLinkT[];
  }

  const data: {
    zh: UbOsComponentContentT;
    en: UbOsComponentContentT;
  };
  export default data;
}

declare module '#content/projects/intelligence' {
  // deploy: 部署场景列表（顶层为数组，zh 专属）
  //   id: 场景标识
  //   title: 场景标题
  //   img: 亮色主题背景图
  //   img_dark: 暗色主题背景图
  //   list: 文档链接列表
  //     text: 链接文案
  //     href: 链接地址
  interface DeployListItemT {
    text: string;
    href: string;
  }

  interface DeployItemT {
    id: string;
    title: string;
    img: string;
    img_dark: string;
    list: DeployListItemT[];
  }

  const data: { zh: DeployItemT[] };
  export default data;
}

declare module '#content/projects/yuanrong' {
  // entrance_list: 入口卡片列表
  //   icon: 入口图标（SVG，inline 消费，路径带 ?raw）
  //   title: 卡片标题
  //   desc: 卡片描述
  //   href: 链接地址
  //   is_outlink: 是否为外部链接（可选）
  interface YuanrongEntranceItemT {
    icon: string;
    title: string;
    desc: string;
    href: string;
    is_outlink?: boolean;
  }

  interface YuanrongContentT {
    entrance_list: YuanrongEntranceItemT[];
  }

  const data: { zh: YuanrongContentT; en: YuanrongContentT };
  export default data;
}

declare module '#content/projects/ub-service-core' {
  // entrance_list: 入口卡片列表（结构同 yuanrong）
  // whitepaper: 白皮书链接
  //   zh: 中文白皮书路径
  //   en: 英文白皮书路径
  interface UbEntranceItemT {
    icon: string;
    title: string;
    desc: string;
    href: string;
    is_outlink?: boolean;
  }

  interface UbContentT {
    entrance_list: UbEntranceItemT[];
    whitepaper: {
      zh: string;
      en: string;
    };
  }

  const data: { zh: UbContentT; en: UbContentT };
  export default data;
}

declare module '#content/projects/intelligence-boom' {
  // members: 成员 logo 列表（非语言相关，来自 members.yaml）
  //   light: 亮色主题 logo
  //   dark: 暗色主题 logo
  interface BoomMemberItemT {
    light: string;
    dark: string;
  }

  // vision: 愿景列表
  //   title: 愿景标题
  //   desc: 愿景描述
  interface BoomVisionItemT {
    title: string;
    desc: string;
  }

  // version_info: 版本信息
  //   first/second: 版本
  //     name: 版本名称
  //     desc: 版本描述
  //     url: 版本链接
  //     picture: 版本图片
  //     feature: 特性列表
  //       title: 特性分类标题
  //       desc: 特性项列表
  //         name: 特性项名称
  //         desc: 特性项描述
  interface BoomFeatureItemT {
    name: string;
    desc: string;
  }
  interface BoomFeatureGroupT {
    title: string;
    desc: BoomFeatureItemT[];
  }
  interface BoomVersionT {
    name: string;
    desc: string;
    url: string;
    picture: string;
    feature: BoomFeatureGroupT[];
  }
  interface BoomVersionInfoT {
    first: BoomVersionT;
    second: BoomVersionT;
  }

  interface BoomContentT {
    vision: BoomVisionItemT[];
    version_info: BoomVersionInfoT;
  }

  const data: {
    members: BoomMemberItemT[];
    zh: BoomContentT;
    en: BoomContentT;
  };
  export default data;
}

declare module '#content/common' {
  // category: 全站分类标识列表（来自 category.yaml）
  // 用于 frontmatter category 字段合法值校验

  // nav_filter: 导航语言过滤配置（来自 nav_filter.yaml）
  //   name: 导航路径标识（支持 name/** 通配子路径）
  //   lang: 允许显示的语言列表
  interface NavFilterItemT {
    name: string;
    lang: string[];
  }

  // nss: 隐藏 NSS 浮动按钮的路由列表（来自 nss.yaml）
  // 顶层为字符串数组

  // seo: SEO 关键词配置（来自 zh.yaml，zh 专属）
  //   level: 关键词层级（1/2/3）
  //   key_words: 关键词文本
  interface SeoKeywordItemT {
    level: number;
    key_words: string;
  }

  type SeoConfigT = Record<string, SeoKeywordItemT[]>;

  interface TourStepT {
    bg: string | { light: string; dark: string };
    target: string;
    color: string;
    placement: string;
    href: string;
    title: string;
    desc: string[];
    extra: string[];
  }

  interface TourContentT {
    first_tour_steps: TourStepT[];
    new_change_data: {
      title: string;
      icon: string;
      desc: string;
      list: string[];
    };
    new_change_tour_steps: TourStepT[];
    new_guide_tour_steps: TourStepT[];
  }

  const data: {
    category: string[];
    nav_filter: NavFilterItemT[];
    nss: string[];
    zh: SeoConfigT;
    tour: TourContentT;
  };

  export default data;
}

declare module '#content/home' {
  // banner: 首页轮播图（来自 banner.yaml，用 _zh/_en 后缀 + foldI18n 模式）
  interface HomeBannerItemT {
    bg_pc?: string;
    bg_pad?: string;
    bg_mb?: string;
    bg_mb_zh?: string;
    bg_mb_en?: string;
    bg_theme?: string;
    text_theme?: string;
    title_zh?: string | string[];
    title_en?: string | string[];
    subtitle_zh?: string;
    subtitle_en?: string;
    btn_zh?: string;
    btn_en?: string;
    href_zh?: string;
    href_en?: string;
    is_blank?: boolean;
    attach?: string;
    locale?: string;
    pad_offset?: string;
    light?: Record<string, unknown>;
    dark?: Record<string, unknown>;
    [key: string]: unknown;
  }

  // display_zone: 首页快捷入口
  interface HomeDisplayZoneItemT {
    title: string;
    icon_light: string;
    icon_dark: string;
    description: string;
    link: string;
  }

  // intro: openEuler 介绍三步曲
  interface HomeIntroItemT {
    title: string;
    img_pc: string;
    img_mo: string;
    icon_light: string;
    icon_dark: string;
    description: string;
  }

  // play_community: 玩转社区卡片
  interface HomePlayCommunityBtnT {
    label: string;
    link: string;
  }
  interface HomePlayCommunityItemT {
    title: string;
    bg: string;
    intro: string;
    btn: HomePlayCommunityBtnT;
    textBtn?: HomePlayCommunityBtnT;
  }

  // vitality: 社区活力数据配置
  interface HomeVitalityItemT {
    vitalityValue: number;
    vitalityKey: string;
    vitalityLabel: string;
  }

  // case: 案例展示行业分类
  interface HomeCaseItemT {
    label: string;
    icon: string;
    img: string;
  }

  // friendly_community: 友情社区
  interface HomeFriendlyCommunityItemT {
    logo_light: string;
    logo_dark: string;
    url: string;
    desc?: string;
  }

  // publisher: 合作伙伴
  interface HomePublisherItemT {
    logo_light: string;
    logo_dark: string;
    href: string;
    validity?: { start?: string; end?: string };
  }

  interface HomeContentT {
    display_zone: HomeDisplayZoneItemT[];
    intro: HomeIntroItemT[];
    play_community: HomePlayCommunityItemT[];
    vitality: HomeVitalityItemT[];
    case: HomeCaseItemT[];
    friendly_community: HomeFriendlyCommunityItemT[];
    publisher: HomePublisherItemT[];
  }

  const data: {
    banner: HomeBannerItemT[];
    zh: HomeContentT;
    en: HomeContentT;
  };
  export default data;
}

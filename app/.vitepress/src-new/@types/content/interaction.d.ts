declare module '#content/interaction/event-list' {
  // list_data[]: 材料列表项
  interface ApplyStepListItemT {
    title: string;
    desc?: string;
    href?: string;
  }

  // apply_steps[]: 活动申请步骤项
  interface ApplyStepItemT {
    img?: string;
    title: string;
    desc?: string;
    href?: string;
    btn?: string;
    material1?: string;
    material2?: string;
    list_data?: ApplyStepListItemT[];
  }

  // event_series / event_status: 筛选选项
  interface EventFilterOptionT {
    value: string;
    label: string;
  }

  interface EventListContentT {
    apply_steps: ApplyStepItemT[];
    event_series: EventFilterOptionT[];
    event_status: EventFilterOptionT[];
  }

  const data: { zh: EventListContentT; en: EventListContentT };
  export default data;
}

declare module '#content/interaction/summit-list/devday2026' {
  // banner: 顶部 banner
  interface Devday2026BannerT {
    bg: string;
    bg_mb: string;
    text_img: string;
    btn: string;
    href: string;
  }

  // live: 直播配置
  interface Devday2026LiveT {
    title: string;
    url: string;
  }

  interface Devday2026ContentT {
    banner: Devday2026BannerT;
    live: Devday2026LiveT;
  }

  const data: { zh: Devday2026ContentT };
  export default data;
}

declare module '#content/interaction/summit-list/summit2026' {
  // banner: 顶部 banner（背景图 PC / pad / 移动端 + 文字图 + 报名入口，含亮暗双主题）
  // 移动端（<=840px）背景图与文字图分离：渲染移动端文字图与报名按钮，仅按钮可跳转
  interface Summit2026ThemeImgT {
    light: string;
    dark: string;
  }
  interface Summit2026BannerT {
    bg_pc: Summit2026ThemeImgT;
    bg_pad: Summit2026ThemeImgT;
    bg_mb: Summit2026ThemeImgT;
    text_img: Summit2026ThemeImgT;
    text_img_mb: Summit2026ThemeImgT;
    text_img_alt: string;
    button_text: string;
    button_link: string;
    button_link_mb: string;
  }

  // introduce: 大会简介
  interface Summit2026IntroduceT {
    desc: string[];
    tips: string;
    list: string[];
    slogan: string[];
  }

  // callfor: Call for 征集卡片（背景图各端共用一份）
  interface Summit2026CallForItemT {
    title: string;
    sub: string;
    link: string;
  }
  // bg_pc: >840px 方形卡片背景图；bg_mb: <=840px 移动端矩形卡片背景图
  interface Summit2026CallForT {
    bg_pc: Summit2026ThemeImgT;
    bg_mb: Summit2026ThemeImgT;
    list: Summit2026CallForItemT[];
  }

  // previous: 精彩回顾
  interface Summit2026PreviousItemT {
    name: string;
    link: string;
  }
  interface Summit2026PreviousT {
    title: string;
    list: Summit2026PreviousItemT[];
  }

  interface Summit2026ContentT {
    banner: Summit2026BannerT;
    introduce: Summit2026IntroduceT;
    callfor: Summit2026CallForT;
    previous: Summit2026PreviousT;
  }

  const data: { zh: Summit2026ContentT; en: Summit2026ContentT };
  export default data;
}

declare module '#content/interaction/summit-list/summit2025' {
  // banner: 顶部 banner
  interface Summit2025BannerT {
    bg: { light: string; dark: string };
    bg_mb: { light: string; dark: string };
    text_img: { light: string; dark: string };
    text_img_mb: { light: string; dark: string };
    sign_up_title: string;
    watch_replay: string;
    replay_link: string;
    link: { pc: string; mo: string };
  }

  // introduce: 大会介绍
  interface Summit2025IntroduceT {
    desc: string[];
    tips: string;
    list: string[];
    slogan: string[];
  }

  // live: 活动直播
  interface Summit2025LiveItemT {
    live_id: number;
    live_test_id: number;
    id?: number;
    name: string;
  }
  interface Summit2025LiveGroupT {
    time: string;
    lives: Summit2025LiveItemT[];
  }
  interface Summit2025LiveT {
    title: string;
    list: Summit2025LiveGroupT[];
  }

  // agent: 活动日程
  interface Summit2025AgentGuestT {
    name: string;
    post: string;
  }
  interface Summit2025AgentContentT {
    title: string;
    name?: string;
    post?: string;
    guest?: Summit2025AgentGuestT[];
  }
  interface Summit2025AgentAgendaT {
    time: string;
    content: Summit2025AgentContentT[];
  }
  interface Summit2025AgentSubForumT {
    label: string;
    time: string;
    address: string;
    children: Summit2025AgentAgendaT[];
  }
  interface Summit2025AgentForumT {
    title: string;
    children: Summit2025AgentAgendaT[];
    tab: Summit2025AgentSubForumT[];
  }
  interface Summit2025AgentDateT {
    date: string;
    children: Summit2025AgentForumT[];
  }
  interface Summit2025AgentT {
    title: string;
    tips: string;
    text: string;
    list: Summit2025AgentDateT[];
  }

  // guest: 活动嘉宾
  interface Summit2025GuestItemT {
    name: string;
    img: string;
    title: string;
  }
  interface Summit2025GuestGroupT {
    title: string;
    children: Summit2025GuestItemT[];
  }
  interface Summit2025GuestT {
    title: string;
    list: Summit2025GuestGroupT[];
  }

  // partner: 共建单位
  interface Summit2025PartnerLogoT {
    light: string;
    dark: string;
  }
  interface Summit2025PartnerGroupT {
    title: string;
    logos: Summit2025PartnerLogoT[];
  }
  interface Summit2025PartnerT {
    title: string;
    list: Summit2025PartnerGroupT[];
  }

  // previous: 精彩回顾
  interface Summit2025PreviousItemT {
    name: string;
    link: string;
  }
  interface Summit2025PreviousT {
    title: string;
    list: Summit2025PreviousItemT[];
  }

  interface Summit2025ContentT {
    banner: Summit2025BannerT;
    introduce: Summit2025IntroduceT;
    live: Summit2025LiveT;
    agent: Summit2025AgentT;
    guest: Summit2025GuestT;
    partner: Summit2025PartnerT;
    previous: Summit2025PreviousT;
  }

  const data: { zh: Summit2025ContentT; en: Summit2025ContentT };
  export default data;
}

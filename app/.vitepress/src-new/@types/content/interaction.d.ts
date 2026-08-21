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

  interface EventListContentT {
    apply_steps: ApplyStepItemT[];
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

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

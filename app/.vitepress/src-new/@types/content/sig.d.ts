// `#content/sig/sig-list` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/sig/sig-list/zh.yaml` + `.content/sig/sig-list/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 SigListDataT 结构。
//
// icon 字段为 SVG 路径带 `?raw` 后缀（`./images/xxx.svg?raw`），vite-plugin-content-yaml
// 透传 `?raw` 由 Vite 返回 SVG 字符串，组件用 InlineSvg 渲染成 inline SVG（支持 currentColor/暗黑切换）。

declare module '#content/sig/sig-list' {
  interface SigBannerT {
    bg: string;
  }

  interface WelcomeJoinItemT {
    icon: string;
    title: string;
    subtitle: string;
  }

  interface AboutSigItemT {
    icon: string;
    icon_dark: string;
    title: string;
    subtitle: string;
    path: string;
    background: string;
  }

  interface ApplicationProcessItemT {
    icon: string;
    process: string;
    detail: string;
  }

  interface SigListDataT {
    banner: SigBannerT;
    welcome_join: WelcomeJoinItemT[];
    about_sig: AboutSigItemT[];
    application_process: ApplicationProcessItemT[];
  }

  const data: { zh: SigListDataT; en: SigListDataT };
  export default data;
}

// `#content/sig/role-description` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/sig/role-description/zh.yaml` + `.content/sig/role-description/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 RoleDescriptionDataT 结构。
//
// icon 字段为 SVG 路径带 `?raw` 后缀（`./images/xxx.svg?raw`），由 Vite 返回 SVG
// 字符串，组件用 InlineSvg 渲染成 inline SVG（支持 currentColor/暗黑切换）。
declare module '#content/sig/role-description' {
  interface CommunityMemberTypeT {
    bg: string;
    bg_mb: string;
    name: string;
    responsibilitiy: string;
    requirement?: string;
    href: string;
  }

  interface CommunityMemberCardT {
    icon: string;
    name: string;
    desc: string;
  }

  interface CommunityMemberT {
    title: string;
    subtitle: string;
    view_detail: string;
    types: CommunityMemberTypeT[];
    cards: CommunityMemberCardT[];
  }

  interface RoleCardT {
    bg_light: string;
    bg_dark: string;
    bg_mb_light: string;
    bg_mb_dark: string;
    title: string;
    desc: string;
    notice?: string;
    points: string[];
  }

  interface RoleSectionT {
    id: string;
    title: string;
    subtitle: string[];
    card_point_bg: string;
    cards: RoleCardT[];
  }

  interface RoleDescriptionDataT {
    community_member: CommunityMemberT;
    contributor: RoleSectionT;
    committer: RoleSectionT;
    maintainer: RoleSectionT;
  }

  const roleDescriptionData: {
    zh: RoleDescriptionDataT;
    en: RoleDescriptionDataT;
  };
  export default roleDescriptionData;
}

// `#content/sig/meeting-guide` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/sig/meeting-guide/zh.yaml`（仅中文，无对应 en 页面）。
// 顶层按 slug 索引（zh），每个 slug 下为 MeetingGuideDataT 结构。
//
// icon 字段为 SVG 路径带 `?raw` 后缀（`./images/xxx.svg?raw`），由 Vite 返回 SVG
// 字符串，组件用 createIcon 包裹为组件后传给 OCard :icon prop。
declare module '#content/sig/meeting-guide' {
  interface MeetingTypeItemT {
    title: string;
    icon: string;
    intro: string;
  }

  interface MeetingGuideDataT {
    meeting_type: MeetingTypeItemT[];
  }

  const meetingGuideData: {
    zh: MeetingGuideDataT;
  };
  export default meetingGuideData;
}

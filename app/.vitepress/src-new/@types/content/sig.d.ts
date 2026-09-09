declare module '#content/sig/sig-list' {
  // welcome_join: 欢迎加入 SIG
  interface SigWelcomeJoinItemT {
    icon: string;
    title: string;
    subtitle: string;
  }

  // about_sig: 关于 SIG
  interface SigAboutItemT {
    icon: string;
    title: string;
    subtitle: string;
    path: string;
    backgroud: string;
  }

  // application_process: 成立 SIG 申请流程
  interface SigApplicationProcessItemT {
    icon: string;
    process: string;
    detail: string;
  }

  interface SigListContentT {
    welcome_join: SigWelcomeJoinItemT[];
    about_sig: SigAboutItemT[];
    application_process: SigApplicationProcessItemT[];
  }

  const data: { zh: SigListContentT; en: SigListContentT };
  export default data;
}

declare module '#content/sig/meeting-guide' {
  interface SigMeetingItemT {
    title: string;
    icon: string;
    intro: string;
  }

  const data: { zh: { type_of_meeting: SigMeetingItemT[] } };
  export default data;
}

declare module '#content/sig/role-description' {
  interface SigRoleTypeT {
    bg: string;
    bg_mb: string;
    name: string;
    responsibilitiy: string;
    requirement?: string;
    href: string;
  }

  interface SigRoleCardT {
    icon: string;
    name: string;
    desc: string;
  }

  interface SigRoleSectionCardT {
    bg: string;
    bg_dark: string;
    bg_mb: string;
    bg_mb_dark: string;
    title: string;
    desc: string;
    points: string[];
    notice?: string;
  }

  interface SigRoleSectionT {
    id: string;
    title: string;
    subtitle: string[];
    card_point_bg: string;
    cards: SigRoleSectionCardT[];
  }

  interface SigRoleContentT {
    community_member: {
      title: string;
      subtitle: string;
      view_detail: string;
      types: SigRoleTypeT[];
      cards: SigRoleCardT[];
    };
    contributor: SigRoleSectionT;
    committer: SigRoleSectionT;
    maintainer: SigRoleSectionT;
  }

  const data: { zh: SigRoleContentT; en: SigRoleContentT };
  export default data;
}

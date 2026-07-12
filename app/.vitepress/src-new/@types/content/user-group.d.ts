interface IntroItemT {
  title: { name: string; desc: string }[];
  background: string;
  logo: string;
  rights: (string | { text: string; operation: string; url: string })[];
  obligation: (string | { text: string; operation: string; url: string })[];
}

interface UserGroupMainT {
  banner: {
    bg_pc: string;
    title: string;
    desc: string;
    btn: string;
    href: string;
  };
  guide: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    desc1: string;
    desc2: string;
    desc3: string;
    tip1: string;
    tip2: string;
    link1: string;
    link2: string;
    mail: string;
    wechat: string;
  };
  intro: {
    title: string;
    desc: string;
    introList: IntroItemT[];
  };
  question: {
    title: string;
    desc1: string;
    desc2: string;
    mail: string;
    subtitle1: string;
    intro1: string;
    subtitle2: string;
    intro2: string;
    tip: string[];
  };
  cityList: {
    name: string;
    img: string;
  }[];
}

declare module '#content/community/user-group' {
  const data: { zh: UserGroupMainT };
  export default data;
}

// ── 详情页 #content/community/user-group/detail ──

interface PersonItemT {
  name: string;
  position?: string;
  technology?: string[];
  homePage?: string;
  forum?: string;
  email?: string;
  avatar: string;
  avatarDark?: string;
  contribution?: string;
}

interface CityDetailT {
  title: string;
  organizational: string;
  organizer: PersonItemT[];
  ambassador: PersonItemT[];
  member?: PersonItemT[];
  salon?: { id: number; date: string; posterIm?: string; title: string; synopsis?: string; address?: string; windowOpen?: string; [propName: string]: unknown }[];
  news?: { summary: string; banner: string; title: string; path: string }[];
  showcase?: { summary: string; path: string; industry: string; title: string }[];
}

interface UserGroupDetailT {
  detail: {
    banner: string;
    banner_dark: string;
    banner_mb: string;
    banner_mb_dark: string;
  };
  link: {
    applyEvent: string;
    provideCase: string;
  };
  question: {
    title: string;
    desc1: string;
    desc2: string;
    mail: string;
    subtitle1: string;
    intro1: string;
    subtitle2: string;
    intro2: string;
    tip: string[];
  };
  guide: {
    link1: string;
    link2: string;
    wechat: string;
  };
  cities: {
    name: string;
    img: string;
    data: CityDetailT;
  }[];
}

declare module '#content/community/user-group/detail' {
  const data: { zh: UserGroupDetailT };
  export default data;
}

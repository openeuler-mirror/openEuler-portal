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

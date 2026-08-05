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

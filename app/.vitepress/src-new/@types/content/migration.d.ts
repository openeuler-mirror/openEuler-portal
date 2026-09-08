declare module '#content/migration' {
  interface MigrationAdvantageCardT {
    url: string;
    title_01: string;
    title_02: string;
    description: string;
  }

  interface MigrationBenefitItemT {
    icon: string;
    title: string;
    link: string;
  }

  interface MigrationAdvantageT {
    title: string;
    description: string;
    card_top_left: MigrationAdvantageCardT;
    transition_right: string;
    transition_down: string;
    card_top_right: MigrationAdvantageCardT;
    benefit: {
      light: MigrationBenefitItemT[];
      dark: MigrationBenefitItemT[];
    };
  }

  interface MigrationDownloadSoftLinkT {
    name: string;
    link: string;
  }

  interface MigrationDownloadBtnT {
    name: string;
    link?: string;
    soft_links?: MigrationDownloadSoftLinkT[];
  }

  interface MigrationDownloadT {
    title: string;
    description: string;
    left: {
      img_light: string;
      img_dark: string;
      name: string;
      version: string;
    };
    btns: MigrationDownloadBtnT[];
    bg_url: string;
  }

  interface MigrationInstructionItemT {
    title: string;
    content: string;
    sogan: string;
  }

  interface MigrationInstructionBgT {
    url_1_light: string;
    url_2_light: string;
    url_mo_1_light: string;
    url_mo_2_light: string;
    url_mo_3_light: string;
    url_1_dark: string;
    url_2_dark: string;
    url_mo_1_dark: string;
    url_mo_2_dark: string;
    url_mo_3_dark: string;
  }

  interface MigrationInstructionT {
    title: string;
    description: string;
    list: MigrationInstructionItemT[];
    bg: MigrationInstructionBgT;
  }

  interface MigrationPathMoItemT {
    title: string;
    description: string;
    img: string;
  }

  interface MigrationPathT {
    title: string;
    description: string;
    img_light: string;
    img_dark: string;
    img_mo: {
      top: MigrationPathMoItemT;
      bottom: MigrationPathMoItemT;
    };
  }

  interface MigrationCaseItemT {
    name: string;
    description: string;
    link: string;
  }

  interface MigrationCaseT {
    title: string;
    description: string;
    list: MigrationCaseItemT[];
    btn: {
      text: string;
      link: string;
    };
  }

  interface MigrationGuideItemT {
    label: string;
    link: string;
  }

  interface MigrationGuideT {
    title: string;
    description: string;
    list: MigrationGuideItemT[];
    btn: {
      text: string;
      link: string;
    };
  }

  interface MigrationHelpTipT {
    text_left: string;
    link_text: string;
    text_right: string;
    link: string;
  }

  interface MigrationHelpT {
    title: string;
    description: string;
    tips: MigrationHelpTipT[];
    offical_qr: {
      img: string;
      text: string;
    };
    assistant_qr: {
      img: string;
      text: string;
    };
  }

  interface MigrationTocItemT {
    label: string;
    link: string;
    is_leaf?: boolean;
  }

  interface MigrationContentT {
    advantage: MigrationAdvantageT;
    download: MigrationDownloadT;
    instruction: MigrationInstructionT;
    path: MigrationPathT;
    case: MigrationCaseT;
    guide: MigrationGuideT;
    help: MigrationHelpT;
    toc: MigrationTocItemT[];
  }

  const data: {
    zh: MigrationContentT;
    en: MigrationContentT;
  };
  export default data;
}

declare module '#content/migration/download' {
  // source_links[].soft_links[]: 软件包链接项（下拉选项）
  interface MigrationDownloadPageSoftLinkT {
    name: string;
    link: string;
  }

  // source_links[]: 按钮项（link 与 soft_links 二选一）
  interface MigrationDownloadPageSourceLinkT {
    name: string;
    link?: string;
    soft_links?: MigrationDownloadPageSoftLinkT[];
  }

  // version_list[]: 版本项
  interface MigrationDownloadPageVersionT {
    version: string;
    source_links: MigrationDownloadPageSourceLinkT[];
  }

  interface MigrationDownloadPageContentT {
    name: string;
    description: string;
    version_list: MigrationDownloadPageVersionT[];
  }

  const data: {
    zh: MigrationDownloadPageContentT;
    en: MigrationDownloadPageContentT;
  };
  export default data;
}

declare module '#content/migration/user-cases' {
  // cases[]: 案例项
  interface MigrationUserCaseItemT {
    path: string;
    title: string;
    summary: string;
    industry: string;
    img: string;
  }

  interface MigrationUserCaseContentT {
    button: string;
    cases: MigrationUserCaseItemT[];
  }

  const data: {
    zh: MigrationUserCaseContentT;
    en: MigrationUserCaseContentT;
  };
  export default data;
}

declare module '#content/migration/advantage' {
  // advantage: 迁移优势子页面数据
  //   description: 板块描述
  //   cards: 优势卡片数组（text + url 图片）
  //   tips: 联系我们提示文案
  interface MigrationAdvantageCardItemT {
    text: string;
    url: string;
  }
  interface MigrationAdvantageTipsT {
    text_1: string;
    text_2: string;
    text_3: string;
    link: string;
  }
  interface MigrationAdvantagePageContentT {
    description: string;
    cards: MigrationAdvantageCardItemT[];
    tips: MigrationAdvantageTipsT;
  }
  const data: {
    zh: MigrationAdvantagePageContentT;
    en: MigrationAdvantagePageContentT;
  };
  export default data;
}

declare module '#content/migration/transplantation-cases' {
  // transplantation_cases: 移植案例列表（顶层为数组）
  //   label: 案例标题
  //   link: 案例链接
  interface MigrationCaseItemT {
    label: string;
    link: string;
  }
  const data: {
    zh: MigrationCaseItemT[];
    en: MigrationCaseItemT[];
  };
  export default data;
}

declare module '#content/migration/faq' {
  // faq: 迁移 FAQ
  //   instruction: 说明（可选）
  //   chats: 问答列表
  //     question: 问题
  //     answers: 回答片段数组
  //       text: 文本
  //       is_link: 是否为链接
  //       link: 链接地址
  interface MigrationFaqAnswerT {
    text: string;
    is_link: boolean;
    link: string;
  }
  interface MigrationFaqChatT {
    question: string;
    answers: MigrationFaqAnswerT[];
  }
  interface MigrationFaqInstructionT {
    title: string;
    text_1: string;
    link_text: string;
    link: string;
    text_2: string;
  }
  interface MigrationFaqContentT {
    instruction?: MigrationFaqInstructionT;
    chats: MigrationFaqChatT[];
  }
  const data: {
    zh: MigrationFaqContentT;
    en: MigrationFaqContentT;
  };
  export default data;
}

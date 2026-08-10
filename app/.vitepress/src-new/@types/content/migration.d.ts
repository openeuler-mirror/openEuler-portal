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

  interface MigrationContentT {
    advantage: MigrationAdvantageT;
    download: MigrationDownloadT;
    instruction: MigrationInstructionT;
    path: MigrationPathT;
    case: MigrationCaseT;
    guide: MigrationGuideT;
    help: MigrationHelpT;
  }

  const data: {
    zh: MigrationContentT;
    en: MigrationContentT;
  };
  export default data;
}

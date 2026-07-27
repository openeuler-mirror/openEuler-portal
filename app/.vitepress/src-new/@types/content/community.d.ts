declare module '#content/community/honor' {
  interface HonorNewsItemT {
    name: string;
    link: string;
    certificate?: string;
  }
  interface HonorCompanyLogoT {
    light: string;
    dark: string;
  }
  interface HonorCompanyT {
    title: string[];
    list: HonorCompanyLogoT[];
    tips?: string;
  }
  interface HonorPersonalCardT {
    name: string;
    post: string[];
    img: string;
    detail: string[];
  }
  interface HonorPersonalGroupT {
    title?: string;
    list: HonorPersonalCardT[];
  }
  interface HonorTeamItemT {
    name: string;
    detail: string[];
    link: string;
  }
  interface HonorTeamT {
    title: string;
    list: HonorTeamItemT[];
  }
  interface HonorContributionT {
    title: string[];
    personal: HonorPersonalGroupT[];
    team?: HonorTeamT;
    notice?: string;
  }
  interface HonorProjectItemT {
    name: string;
    detail: string[];
    link: string;
    link1?: string;
  }
  interface HonorProjectGroupT {
    title: string;
    bg: string;
    bgDark: string;
    list: HonorProjectItemT[];
  }
  interface HonorProjectT {
    title: string[];
    list: HonorProjectGroupT[];
  }
  interface HonorNominationT {
    title: string;
    list: { name: string }[];
  }
  interface HonorYearDataT {
    news?: HonorNewsItemT[];
    company?: HonorCompanyT;
    contribution?: HonorContributionT;
    project?: HonorProjectT;
    nomination?: HonorNominationT;
    notice?: string;
  }
  interface HonorImagesT {
    banner: string;
    new_card_bg_light: string;
    new_card_bg_dark: string;
    personal_card_bg_light: string;
    personal_card_bg_dark: string;
  }
  interface HonorUiT {
    title: string;
    view_news: string;
    view_certificate: string;
    project_address: string;
    project_address_1: string;
    project_address_2: string;
  }
  interface HonorDataT {
    ui: HonorUiT;
    images: HonorImagesT;
    years: Record<string, HonorYearDataT>;
  }
  const data: {
    zh: HonorDataT;
    en?: HonorDataT;
  };
  export default data;
}

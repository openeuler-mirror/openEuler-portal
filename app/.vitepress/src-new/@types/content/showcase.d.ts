declare module '#content/showcase/technical-white-paper' {
  // white_paper: 技术白皮书
  interface TechnicalWhitePaperItemT {
    path: string;
    summary: string;
  }

  interface TechnicalWhitePaperContentT {
    white_paper: TechnicalWhitePaperItemT[];
  }

  const data: {
    zh: TechnicalWhitePaperContentT;
    en: TechnicalWhitePaperContentT;
  };
  export default data;
}

declare module '#content/showcase' {
  // type_map: 行业分类图标映射项
  interface ShowcaseTypeMapItemT {
    icon: string;
    img_light: string;
    img_dark: string;
  }

  interface ShowcaseContentT {
    type_map: Record<string, ShowcaseTypeMapItemT>;
  }

  const data: { zh: ShowcaseContentT; en: ShowcaseContentT };
  export default data;
}

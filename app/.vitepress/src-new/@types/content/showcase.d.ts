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

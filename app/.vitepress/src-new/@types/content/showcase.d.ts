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

declare module '#content/showcase/market-report' {
  // market_report[]: 市场研究报告项
  interface MarketReportItemT {
    path: string;
    summary: string;
  }

  interface MarketReportContentT {
    market_report: MarketReportItemT[];
  }

  const data: { zh: MarketReportContentT };
  export default data;
}

declare module '#content/showcase/industry-white-paper' {
  // industry_white_paper: 行业白皮书列表（顶层为数组）
  //   banner: 卡片背景图路径（公开资源 URL）
  //   path: PDF 下载链接
  //   summary: 白皮书摘要
  interface IndustryWhitePaperItemT {
    banner: string;
    path: string;
    summary: string;
  }

  const data: {
    zh: IndustryWhitePaperItemT[];
    en: IndustryWhitePaperItemT[];
  };
  export default data;
}

// `#content/showcase/market-report` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/showcase/market-report/zh.yaml`

declare module '#content/showcase/market-report' {
  interface MarketReportItemT {
    path: string;
    summary: string;
  }

  interface MarketReportDataT {
    market_reports: MarketReportItemT[];
  }

  const data: {
    zh: MarketReportDataT;
  };
  export default data;
}

// `#content/showcase/technical-white-paper` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/showcase/technical-white-paper/zh.yaml` + `.content/showcase/technical-white-paper/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 TechnicalWhitePaperDataT 结构。

declare module '#content/showcase/technical-white-paper' {
  interface TechnicalWhitePaperItemT {
    path: string;
    summary: string;
  }

  interface TechnicalWhitePaperDataT {
    white_papers: TechnicalWhitePaperItemT[];
  }

  const data: {
    zh: TechnicalWhitePaperDataT;
    en: TechnicalWhitePaperDataT;
  };
  export default data;
}

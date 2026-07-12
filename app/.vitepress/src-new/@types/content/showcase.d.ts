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

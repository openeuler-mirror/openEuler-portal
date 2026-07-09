// `#content/sig/sig-list` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/sig/sig-list/zh.yaml` + `.content/sig/sig-list/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 SigListDataT 结构。
//
// icon 字段为 SVG 路径带 `?raw` 后缀（`./images/xxx.svg?raw`），vite-plugin-content-yaml
// 透传 `?raw` 由 Vite 返回 SVG 字符串，组件用 InlineSvg 渲染成 inline SVG（支持 currentColor/暗黑切换）。

declare module '#content/sig/sig-list' {
  interface SigBannerT {
    bg: string;
  }

  interface WelcomeJoinItemT {
    icon: string;
    title: string;
    subtitle: string;
  }

  interface AboutSigItemT {
    icon: string;
    icon_dark: string;
    title: string;
    subtitle: string;
    path: string;
    background: string;
  }

  interface ApplicationProcessItemT {
    icon: string;
    process: string;
    detail: string;
  }

  interface SigListDataT {
    banner: SigBannerT;
    welcome_join: WelcomeJoinItemT[];
    about_sig: AboutSigItemT[];
    application_process: ApplicationProcessItemT[];
  }

  const data: { zh: SigListDataT; en: SigListDataT };
  export default data;
}

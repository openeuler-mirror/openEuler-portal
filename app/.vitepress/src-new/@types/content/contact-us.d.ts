// `#content/contact-us` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/contact-us/zh.yaml` + `.content/contact-us/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 ContactUsDataT 结构。

declare module '#content/contact-us' {
  interface ContactDataItemT {
    title: string;
    email: string;
    icon: string;
  }

  interface FooterCodeItemT {
    code: string;
    label: string;
  }

  interface FollowLinkItemT {
    icon: string;
    icon_dark: string;
    icon_primary: string;
    href: string;
    label: string;
  }

  interface HandyMaterialItemT {
    title: string;
    desc: string;
    href: string;
    icon: string;
  }

  interface ContactUsDataT {
    contact_data: ContactDataItemT[];
    footer_codes: FooterCodeItemT[];
    follow_links: FollowLinkItemT[];
    handy_materials: HandyMaterialItemT[];
  }

  const data: {
    zh: ContactUsDataT;
    en: ContactUsDataT;
  };
  export default data;
}

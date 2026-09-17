declare module '#content/contact-us' {
  // contact_items[]: 联系项
  interface ContactItemT {
    title: string;
    email: string;
    icon: string;
  }

  // follow_us.footer_codes[]: 二维码
  interface FooterCodeItemT {
    code: string;
    label: string;
  }

  // follow_us.follow_links[]: 社交媒体链接
  interface FollowLinkItemT {
    icon: string;
    icon_dark: string;
    icon_primary: string;
    href: string;
    label: string;
  }

  // handy_materials.list[]: 资源推荐项
  interface HandyMaterialItemT {
    title: string;
    desc: string;
    href: string;
    icon: string;
  }

  // banner: 顶部 banner
  interface ContactBannerT {
    title: string;
  }

  // community_contact: 社区联系板块
  interface CommunityContactT {
    title: string;
    desc: string;
  }

  // follow_us: 关注我们板块
  interface FollowUsT {
    title: string;
    desc: string;
    cover: string;
    footer_codes: FooterCodeItemT[];
    follow_links: FollowLinkItemT[];
  }

  // handy_materials: 资源推荐板块
  interface HandyMaterialsT {
    title: string;
    list: HandyMaterialItemT[];
  }

  // 顶层
  interface ContactUsContentT {
    banner: ContactBannerT;
    community_contact: CommunityContactT;
    contact_items: ContactItemT[];
    follow_us: FollowUsT;
    handy_materials: HandyMaterialsT;
  }

  const data: { zh: ContactUsContentT; en: ContactUsContentT };
  export default data;
}

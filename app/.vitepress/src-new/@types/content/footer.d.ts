declare module '#content/footer' {
  // friendship_links: 友情链接
  interface FriendshipLinkItemT {
    link: string;
    title: string;
  }

  // filing: 备案信息
  interface FilingT {
    link: string;
    icon: string;
  }

  interface FooterContentT {
    friendship_links: FriendshipLinkItemT[];
    filing: FilingT;
  }

  const data: {
    zh: FooterContentT;
    en: FooterContentT;
  };

  export default data;
}

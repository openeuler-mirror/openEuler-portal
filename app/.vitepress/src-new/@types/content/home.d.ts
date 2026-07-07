// `#content/home` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/home/zh.yaml` + `.content/home/en.yaml`
// 顶层按 locale 索引（zh / en），每个 locale 下为 HomeDataT 结构。

declare module '#content/home' {
  interface BannerItemT {
    bg_pc: string;
    bg_pad: string;
    bg_mb?: string;
    bg_theme: 'light' | 'dark';
    text_theme?: 'dark' | 'light';
    title: string | string[];
    subtitle?: string;
    btn?: string;
    href: string;
    is_blank?: boolean;
    attach?: string;
    locale?: string;
    light?: Partial<BannerItemT>;
    dark?: Partial<BannerItemT>;
  }

  interface DisplayZoneItemT {
    title: string;
    icon_light: string;
    icon_dark: string;
    description: string;
    link: string;
  }

  interface IntroItemT {
    title: string;
    img_pc: string;
    img_mo: string;
    icon_light: string;
    icon_dark: string;
    description: string;
  }

  interface PlayCommunityBtnT {
    label: string;
    link: string;
  }

  interface PlayCommunityCardT {
    title: string;
    bg: string;
    intro: string;
    btn: PlayCommunityBtnT;
    textBtn?: PlayCommunityBtnT;
  }

  interface PublisherItemT {
    logo_light: string;
    logo_dark: string;
    href: string;
  }

  interface FriendlyCommunityItemT {
    logo_light: string;
    logo_dark: string;
    url: string;
    desc?: string;
  }

  interface HomeDataT {
    banner: BannerItemT[];
    display_zone: DisplayZoneItemT[];
    intro: IntroItemT[];
    play_community: PlayCommunityCardT[];
    publisher: PublisherItemT[];
    friendly_community: FriendlyCommunityItemT[];
  }

  const data: { zh: HomeDataT; en: HomeDataT };
  export default data;
}

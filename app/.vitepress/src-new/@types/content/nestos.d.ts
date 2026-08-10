declare module '#content/nestos' {
  // features: 功能特性卡片
  interface NestOSFeatureItemT {
    title_key: string;
    desc_key: string;
    slug: string;
  }

  // partners: 合作伙伴
  interface NestOSPartnerItemT {
    name: string;
    logo: string;
    href: string;
  }

  // performance: 性能对比图表
  interface NestOSPerformanceLineStyleT {
    type: string;
  }
  interface NestOSPerformanceYItemT {
    name: string;
    type: string;
    data: number[];
    line_style?: NestOSPerformanceLineStyleT;
  }

  // mirror_versions: 镜像下载版本
  interface NestOSPkgItemT {
    name: string;
    path: string;
  }
  interface NestOSVersionGroupT {
    date_title: string;
    x86_list: NestOSPkgItemT[];
    arm_list: NestOSPkgItemT[];
  }

  // doc_links / other_links: 文档与其他链接
  interface NestOSLinkItemT {
    title_key: string;
    href: string;
  }

  // feature_map: 功能详情页内容
  interface NestOSSectionT {
    type: 'text' | 'heading' | 'list' | 'code' | 'image' | 'link';
    content?: string;
    items?: string[];
    src?: string;
    href?: string;
    children?: NestOSSectionT[];
  }
  interface NestOSFeatureDetailItemT {
    title_key: string;
    desc_key: string;
    sections: NestOSSectionT[];
  }

  interface NestOSContentT {
    features: NestOSFeatureItemT[];
    partners: NestOSPartnerItemT[];
    performance_x_list: string[];
    performance_y_list: NestOSPerformanceYItemT[];
    performance_comparison_url: string;
    mirror_versions: NestOSVersionGroupT[];
    doc_links: NestOSLinkItemT[];
    other_links: NestOSLinkItemT[];
    feature_map: Record<string, NestOSFeatureDetailItemT>;
  }

  const data: { zh: NestOSContentT };
  export default data;
}

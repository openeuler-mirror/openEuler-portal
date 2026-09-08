declare module '#content/other/lifecycle' {
  interface LifecycleContentT {
    banner: string;
    overall: string;
    img1: string;
    lts: string;
    img2: string;
  }

  const data: { zh: LifecycleContentT; en: LifecycleContentT };
  export default data;
}

declare module '#content/other/brand' {
  interface BrandDownloadItemT {
    title: string;
    img: string;
    list: { title: string; url: string }[];
  }

  interface BrandPptItemT {
    title: string;
    img: string;
    url: string;
  }

  interface BrandContentT {
    banner: string;
    logo: string;
    logo_dark: string;
    strato_virt_logo: string;
    strato_virt_logo_dark: string;
    guide: string;
    logo_download: BrandDownloadItemT[];
    innovation_logo_download: BrandDownloadItemT[];
    ppt_list: BrandPptItemT[];
    ppt_list_en: BrandPptItemT[];
  }

  const data: { zh: BrandContentT; en: BrandContentT };
  export default data;
}

declare module '#content/other/brand/specification' {
  interface BrandSpecificationSectionT {
    title: string;
    desc: string[];
    img: string;
    img2?: string;
  }

  interface BrandSpecificationContentT {
    banner: string;
    sections: BrandSpecificationSectionT[];
  }

  const data: {
    zh: BrandSpecificationContentT;
    en: BrandSpecificationContentT;
  };
  export default data;
}

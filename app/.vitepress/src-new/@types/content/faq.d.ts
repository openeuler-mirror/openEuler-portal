declare module '#content/faq' {
  // toc[]: 侧边栏目录项
  interface FaqTocItemT {
    label: string;
    link: string;
  }

  interface FaqContentT {
    faq_title: string;
    page_content: string;
    toc: FaqTocItemT[];
  }

  const data: {
    zh: FaqContentT;
    en: FaqContentT;
  };
  export default data;
}

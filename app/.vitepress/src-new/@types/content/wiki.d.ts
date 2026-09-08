declare module '#content/wiki' {
  interface WikiTocItemT {
    label: string;
    link?: string;
    children?: WikiTocItemT[];
  }

  interface WikiContentT {
    toc: WikiTocItemT[];
  }

  const data: {
    zh: WikiContentT;
    en: WikiContentT;
  };

  export default data;
}

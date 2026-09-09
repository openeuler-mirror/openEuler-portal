declare module '#content/header' {
  // ar_list: 阿拉伯语路由路径列表
  // ar_url: 阿拉伯语站点 URL
  interface HeaderContentT {
    ar_list: string[];
    ar_url: string;
  }

  const data: {
    zh: HeaderContentT;
    en: HeaderContentT;
  };

  export default data;
}

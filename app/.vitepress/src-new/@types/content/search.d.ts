declare module '#content/search' {
  // module_map: 模块分类映射（从 Map 转为数组，消费时重建 Map）
  //   key: 模块键名
  //   label: 模块标签
  //   sub_modules: 子模块列表（可选，非语言相关）
  interface SearchModuleMapItemT {
    key: string;
    label: string;
    sub_modules?: string[];
  }

  // sub_module_map: 子模块映射（从 Map 转为数组，消费时重建 Map）
  //   key: 子模块键名
  //   label: 子模块标签（可选）
  //   from: 面包屑路径数组
  interface SearchSubModuleMapItemT {
    key: string;
    label?: string;
    from: string[];
  }

  interface SearchContentT {
    module_map: SearchModuleMapItemT[];
    sub_module_map: SearchSubModuleMapItemT[];
  }

  // maintainer: 维护者默认信息（非语言相关，来自 maintainer.yaml）
  interface SearchMaintainerT {
    name: string;
    email: string;
    gitee_id: string;
  }

  const data: {
    zh: SearchContentT;
    en: SearchContentT;
    maintainer: SearchMaintainerT;
  };

  export default data;
}

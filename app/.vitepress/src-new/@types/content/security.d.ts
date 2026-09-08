declare module '#content/security/cve' {
  // status_map: 状态映射（从 Map 转为数组，消费时重建 Map）
  interface CveStatusMapItemT {
    key: string;
    value: string;
    label: string;
    tag: string;
  }

  // reason: 修复原因筛选选项
  interface CveReasonItemT {
    value: string;
    label: string;
  }

  // glossary: 术语表
  interface CveGlossaryItemT {
    status: string;
    description: string;
    list?: string[];
  }

  interface CveContentT {
    status_map: CveStatusMapItemT[];
    reason: CveReasonItemT[];
    glossary: CveGlossaryItemT[];
  }

  const data: {
    zh: CveContentT;
    en: CveContentT;
  };

  export default data;
}

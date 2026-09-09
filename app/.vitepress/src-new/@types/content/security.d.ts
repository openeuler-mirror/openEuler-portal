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

declare module '#content/security/safety-bulletin' {
  // type_map: 严重等级映射（从 Map 转为数组，消费时重建 Map）
  //   key: 等级键名
  //   value: 等级值
  //   label: 等级标签
  //   score: 分数范围
  interface SafetyTypeMapItemT {
    key: string;
    value: string;
    label: string;
    score: string;
  }

  interface SafetyBulletinContentT {
    type_map: SafetyTypeMapItemT[];
    security_notice_nos: string[];
  }

  const data: {
    zh: SafetyBulletinContentT;
    en: SafetyBulletinContentT;
  };

  export default data;
}

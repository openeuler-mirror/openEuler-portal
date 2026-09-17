declare module '#content/approve/approve-step' {
  // process.steps: 测评流程步骤项
  interface ApproveStepItemT {
    id: string;
    title: string;
    text_1: string;
    link_1?: string;
    link_text?: string;
    text_2?: string;
    text_3?: string;
    link_2?: string;
    text_lits?: string[];
    text_4?: string;
  }

  // breadcrumb: 面包屑返回文案
  interface ApproveStepBreadcrumbT {
    text: string;
  }

  // banner: 页面顶部 banner
  interface ApproveStepBannerT {
    title: string;
  }

  // process: 测评流程板块
  interface ApproveStepProcessT {
    title: string;
    steps: ApproveStepItemT[];
  }

  interface ApproveStepContentT {
    breadcrumb: ApproveStepBreadcrumbT;
    banner: ApproveStepBannerT;
    process: ApproveStepProcessT;
  }

  const data: { zh: ApproveStepContentT };
  export default data;
}

declare module '#content/approve/approve-info' {
  // template / flushbonading: OSV 测评模板
  //   title: 板块标题
  //   lists: 检测项数组
  //     name: 检测项名称
  //     desc: 检测项描述
  //     result: 检测结果
  interface OsvCheckItemT {
    name: string;
    desc: string;
    result: string;
  }
  interface OsvCheckGroupT {
    title: string;
    lists: OsvCheckItemT[];
  }
  interface OsvContentT {
    template: OsvCheckGroupT[];
    flushbonading: OsvCheckGroupT[];
  }

  const data: { zh: OsvContentT };
  export default data;
}

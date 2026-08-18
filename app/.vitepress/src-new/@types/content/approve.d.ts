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

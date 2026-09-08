declare module '#content/experts' {
  // experts: 社区顾问专家列表（zh 专属）
  //   avator: 头像图片
  //   name: 姓名
  //   detail: 职务描述数组
  interface ExpertItemT {
    avator: string;
    name: string;
    detail: string[];
  }

  const data: { zh: ExpertItemT[] };
  export default data;
}

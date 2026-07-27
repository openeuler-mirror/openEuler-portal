// `#content/learn/mooc/detail` 虚拟模块由 vite-plugin-content-yaml 合成。
// 数据源：`.content/learn/mooc/detail/zh.yaml`
// 顶层按 locale 索引（zh），en 为可选（当前页面只有中文版本）。
//
// teacher.img 为 PNG 图片路径（`./images/xxx.png`），由 vite-plugin-content-yaml
// 重写为 import，Vite 输出带 hash 的真实 URL。

declare module '#content/learn/mooc/detail' {
  interface MoocTeacherT {
    img: string;
    position: string;
    name: string;
  }

  interface MoocNavNodeT {
    label: string;
    key?: string;
    introduction?: string[];
    teacher?: MoocTeacherT[];
    desc?: string;
    video_link?: string;
    ppt_link?: string;
    children?: MoocNavNodeT[];
  }

  interface MoocCourseT {
    id: number;
    course_h1: string;
    welcome: string;
    nav_data: MoocNavNodeT[];
  }

  interface MoocUiT {
    mooc: string;
    mooc_course_title: string;
    mooc_catalog: string;
    course_download: string;
    teacher_team: string;
    prev_text: string;
    next_text: string;
  }

  interface MoocDetailDataT {
    ui: MoocUiT;
    course_list: MoocCourseT[];
  }

  const data: { zh: MoocDetailDataT; en?: MoocDetailDataT };
  export default data;
}

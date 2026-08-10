declare module '#content/learn/mooc' {
  // mooc_course: 课程列表
  interface MoocChildItemT {
    name: string;
    path: string;
  }
  interface MoocCourseItemT {
    id: string;
    img: string;
    title: string;
    desc: string;
    apply_link?: string;
    children: MoocChildItemT[];
  }

  interface LearnMoocContentT {
    mooc_course: MoocCourseItemT[];
  }

  const data: { zh: LearnMoocContentT; en: LearnMoocContentT };
  export default data;
}

declare module '#content/learn/mooc/detail' {
  // course_list: 课程详情列表
  // nav_data 为递归嵌套树结构
  interface MoocDetailTeacherT {
    img: string;
    position: string;
    name: string;
  }
  interface MoocDetailNavDataNodeT {
    label: string;
    key?: string;
    introduction?: string[];
    teacher?: MoocDetailTeacherT[];
    desc?: string;
    video_link?: string;
    ppt_link?: string;
    children?: MoocDetailNavDataNodeT[];
  }
  interface MoocDetailCourseListItemT {
    id: number;
    course_h1: string;
    welcome: string;
    nav_data: MoocDetailNavDataNodeT[];
  }
  interface LearnMoocDetailContentT {
    course_list: MoocDetailCourseListItemT[];
  }

  const data: { zh: LearnMoocDetailContentT };
  export default data;
}

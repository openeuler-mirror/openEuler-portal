declare module '#content/projects' {
  // project_data: 项目卡片
  interface ProjectDataItemT {
    title: string;
    desc: string;
    icon: string;
    url: string;
    atomgit_url?: string;
    gitee_url?: string;
    tag?: string;
  }

  interface ProjectsContentT {
    project_data: ProjectDataItemT[];
  }

  const data: { zh: ProjectsContentT; en: ProjectsContentT };
  export default data;
}

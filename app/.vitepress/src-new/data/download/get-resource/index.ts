import docsIcon from '~icons/download/docs_light.svg';
import mirrorIcon from '~icons/download/mirror_light.svg';

export default [
  {
    icon: {
      dark: '',
      light: mirrorIcon,
    },
    zh: {
      title: '镜像仓列表',
      label: '查询openEuler所有镜像站点，欢迎新站点的加入',
      href: '/zh/mirror/list/',
    },
    en: {
      title: 'Mirrors',
      label: 'All mirrors of openEuler',
      href: '/en/mirror/list/',
    },
  },
  {
    icon: {
      dark: '',
      light: docsIcon,
    },
    zh: {
      title: 'openEuler社区文档',
      label:
        '帮助开发者快速了解openEuler，包括发行说明、系统安装、管理员指南、虚拟化和容器等各类项目说明与使用指导',
      href: 'https://docs.openeuler.org/zh/',
    },
    en: {
      title: 'Documentation',
      label:
        "Explore openEuler's release notes, installation guide, administrator guide, projectusage guides, and more",
      href: 'https://docs.openeuler.org/en/',
    },
  },
];

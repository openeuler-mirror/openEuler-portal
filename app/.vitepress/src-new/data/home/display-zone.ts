import event_dark from '~@/assets/category/home/display-zone/event_dark.svg';
import event_light from '~@/assets/category/home/display-zone/event_light.svg';
import migration_dark from '~@/assets/category/home/display-zone/migration_dark.svg';
import migration_light from '~@/assets/category/home/display-zone/migration_light.svg';
import security_dark from '~@/assets/category/home/display-zone/security_dark.svg';
import security_light from '~@/assets/category/home/display-zone/security_light.svg';
import whitePaper_dark from '~@/assets/category/home/display-zone/white-paper_dark.svg';
import whitePaper_light from '~@/assets/category/home/display-zone/white-paper_light.svg';

export default [
  {
    title: {
      zh: '技术白皮书',
      en: 'Technical White Papers',
    },
    icon: {
      dark: whitePaper_dark,
      light: whitePaper_light,
    },
    description: {
      zh: '了解openEuler各版本的技术详情',
      en: 'Learn the tech details of each openEuler version.',
    },
    link: {
      zh: '/zh/showcase/technical-white-paper/',
      en: '/en/showcase/technical-white-paper/',
    },
  },
  {
    title: {
      zh: '安全中心',
      en: 'Security Center',
    },
    icon: {
      dark: security_dark,
      light: security_light,
    },
    description: {
      zh: '查看安全公告等安全问题',
      en: 'View security advisories and other security information.', 
    },
    link: {
      zh: '/zh/security/security-bulletins/',
      en: '/en/security/security-bulletins/',
    },
  },
  {
    title: {
      zh: '迁移专区',
      en: 'Migration Center',
    },
    icon: {
      dark: migration_dark,
      light: migration_light,
    },
    description: {
      zh: '教你替换操作系统成openEuler',
      en: 'Learn how to migrate to openEuler.',
    },
    link: {
      zh: '/zh/migration/',
      en: '/en/migration/',
    },
  },
  {
    title: {
      zh: '活动专区',
      en: 'Events Center',
    },
    icon: {
      dark: event_dark,
      light: event_light,
    },
    description: {
      zh: '了解openEuler最新活动',
      en: 'Stay updated on the latest openEuler events.',
    },
    link: {
      zh: '/zh/interaction/event-list/',
      en: '/en/interaction/event-list/',
    },
  },
];

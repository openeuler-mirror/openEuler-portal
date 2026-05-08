export const moduleMap = new Map([
  [
    'all',
    {
      label: {
        zh: '全部',
        en: 'All',
      },
    },
  ],
  [
    'download',
    {
      label: {
        zh: '下载',
        en: 'Download',
      },
      subModules: ['communityRelease', 'commercialRelease'],
    },
  ],
  [
    'develop',
    {
      label: {
        zh: '开发',
        en: 'Develop',
      },
      subModules: ['sig', 'etherpad'],
    },
  ],
  [
    'docs',
    {
      label: {
        zh: '文档',
        en: 'Docs',
      },
    },
  ],
  [
    'migration',
    {
      label: {
        zh: '迁移',
        en: 'Migration',
      },
    },
  ],
  [
    'community',
    {
      label: {
        zh: '社区',
        en: 'Community',
      },
      subModules: ['whitepaper', 'showcase', 'mail', 'forum'],
    },
  ],
  [
    'update',
    {
      label: {
        zh: '动态',
        en: 'Stay Uodated',
      },
      subModules: ['news', 'blog'],
    },
  ],
  [
    'gitee',
    {
      label: {
        zh: '代码仓',
        en: 'AtomGit',
      },
    },
  ],
  [
    'other',
    {
      label: {
        zh: '其他',
        en: 'Others',
      },
    },
  ],
]);

export const subModuleMap = new Map([
  [
    'release',
    {
      label: {
        zh: '社区发行版',
        en: 'Community Releases',
      },
      from: {
        zh: ['下载', '社区发行版', '{version}'],
        en: ['Download', 'Community Releases', '{version}'],
      },
    },
  ],
  [
    'communityRelease',
    {
      label: {
        zh: '社区发行版',
        en: 'Community Releases',
      },
      from: {
        zh: ['下载', '社区发行版', '{version}'],
        en: ['Download', 'Community Releases', '{version}'],
      },
    },
  ],
  [
    'commercialRelease',
    {
      label: {
        zh: '商业发行版',
        en: 'Commercial Releases',
      },
      from: {
        zh: ['下载', '其他版本', '商业发行版'],
        en: ['Download', 'Other Releases', 'Commercial Releases'],
      },
    },
  ],
  [
    'docs',
    {
      from: {
        zh: ['文档', '文档中心'],
        en: ['Document', 'Documentation'],
      },
    },
  ],
  [
    'software',
    {
      from: {
        zh: ['下载', '下载资源', '软件中心'],
        en: ['Download', 'Install', 'EasySoftWare'],
      },
    },
  ],
  [
    'whitepaper',
    {
      label: {
        zh: '白皮书',
        en: 'White Papers',
      },
      from: {
        zh: ['社区', '关于社区', '白皮书'],
        en: ['Community', 'About', 'White Papers'],
      },
    },
  ],
  [
    'showcase',
    {
      label: {
        zh: '用户案例',
        en: 'Success Stories',
      },
      from: {
        zh: ['社区', '关于社区', '用户案例'],
        en: ['Community', 'About', 'Success Stories'],
      },
    },
  ],
  [
    'sig',
    {
      label: {
        zh: 'SIG中心',
        en: 'SIG',
      },
      from: {
        zh: ['开发', '贡献', 'SIG中心'],
        en: ['Develop', 'Contribute', 'SIG'],
      },
    },
  ],
  [
    'etherpad',
    {
      label: {
        zh: 'SIG组会议纪要',
        en: '',
      },
      from: {
        zh: ['开发', '贡献', 'SIG中心'],
        en: ['Develop', 'Contribute', 'SIG'],
      },
    },
  ],
  [
    'mail',
    {
      label: {
        zh: '邮件列表',
        en: 'Mailing Lists',
      },
      from: {
        zh: ['社区', '社区交流', '邮件列表'],
        en: ['Community', 'Engage with Us', 'Mailing Lists'],
      },
    },
  ],
  [
    'forum',
    {
      label: {
        zh: '论坛',
        en: 'Forum',
      },
      from: {
        zh: ['社区', '社区交流', '论坛'],
        en: ['Community', 'Engage with Us', 'Forum'],
      },
    },
  ],
  [
    'news',
    {
      label: {
        zh: '新闻',
        en: 'News',
      },
      from: {
        zh: ['动态', '资讯', '新闻'],
        en: ['Stay Updated', 'News & Blogs', 'News'],
      },
    },
  ],
  [
    'blog',
    {
      label: {
        zh: '博客',
        en: 'Blogs',
      },
      from: {
        zh: ['动态', '资讯', '博客'],
        en: ['Stay Updated', 'News & Blogs', 'Blogs'],
      },
    },
  ],
  [
    'service',
    {
      from: {
        zh: ['服务'],
        en: ['Service'],
      },
    },
  ],
  [
    'migration',
    {
      label: {
        zh: '迁移',
        en: 'Migration',
      },
      from: {
        zh: ['支持', '迁移与运维', '迁移专区'],
        en: ['Support', 'Migration', 'Migrate to openEuler'],
      },
    },
  ],
  [
    'packages',
    {
      from: {
        zh: ['开发', '分析', 'Pkgship'],
        en: ['Develop', 'Analyze', 'Pkgship'],
      },
    },
  ],
  [
    'witty',
    {
      from: {
        zh: ['Witty智能运维案例库'],
        en: ['Witty Ops Cases'],
      },
    },
  ],
]);

// maintainer
export const maintainerDefaults = {
  name: 'George.Cao',
  email: 'caozhi1214@qq.com',
  gitee_id: 'georgecao',
};

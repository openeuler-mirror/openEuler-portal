export const tagList = {
  all: '全部',
  docs: '文档',
  gitee: '代码仓库',
  mail: '邮件列表',
  migration: '迁移',
  service: '服务',
  updates: {
    val: '动态',
    tags: {
      blog: '博客',
      news: '新闻',
      forum: '论坛',
    },
  },
  more: {
    val: '更多',
    tags: {
      showcase: '案例',
      other: '其他',
      whitepaper: '白皮书',
      packages: '软件包',
    },
  },
};

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
        en: 'All',
      },
      subModules: ['communityRelease', 'commercialRelease'],
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
    'learn',
    {
      label: {
        zh: '学习',
        en: 'Learn',
      },
      subModules: ['whitepaper', 'showcase'],
    },
  ],
  [
    'community',
    {
      label: {
        zh: '社区',
        en: 'Community',
      },
      subModules: ['sig', 'etherpad', 'mail', 'forum'],
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
        en: 'GITEE',
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
        zh: ['学习', '下载中心'],
        en: ['Learn', 'Download Center'],
      },
    },
  ],
  [
    'software',
    {
      from: {
        zh: ['下载', '下载资源', '软件中心'],
        en: ['Download'],
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
        zh: ['学习', '技术展示', '白皮书'],
        en: ['Learn', 'Tech Highlights', 'White Papers'],
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
        zh: ['学习', '技术展示', '用户案例'],
        en: ['Learn', 'Tech Highlights', 'Success Stories'],
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
        zh: ['社区', '贡献与成长', 'SIG中心'],
        en: ['Community', 'Contribute', 'SIG'],
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
        zh: ['社区', '社区交流', 'SIG组会议纪要'],
        en: [''],
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
    'migration',
    {
      from: {
        zh: ['学习', '迁移与运维', '迁移专区'],
        en: ['Learn', 'Migration', 'Migrate to openEuler'],
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
      from: {
        zh: ['学习', '迁移与运维', '迁移专区'],
        en: ['Learn', 'Migration', 'Migrate to openEuler'],
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
]);

// maintainer
export const maintainerDefaults = {
  name: 'George.Cao',
  email: 'caozhi1214@qq.com',
  gitee_id: 'georgecao',
};

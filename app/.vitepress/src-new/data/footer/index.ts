// 隐私链接
// 注意：linksData（孤儿）、friendshipLinks、filingData 已提取到 .content/footer/ yaml，
// linksData2 和 quickNav 因依赖 import.meta.env 环境变量保留在此文件中。
export const linksData2 = {
  zh: [
    {
      NAME: '品牌',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/brand/`,
    },
    {
      NAME: '隐私声明',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/privacy/`,
    },
    {
      NAME: '法律声明',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/legal/`,
    },
    {
      NAME: '关于cookies',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/cookies/`,
    },
  ],
  en: [
    {
      NAME: 'Trademark',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/brand/`,
    },
    {
      NAME: 'Privacy Statement',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/privacy/`,
    },
    {
      NAME: 'Legal Notice',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/legal/`,
    },
    {
      NAME: 'About Cookies',
      URL: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/cookies/`,
    },
  ],
};
// 底部导航数据
export const quickNav = {
  zh: [
    {
      title: '关于openEuler',
      list: [
        {
          title: '成员单位',
          link: '/zh/community/member/',
        },
        {
          title: '组织架构',
          link: '/zh/community/organization/',
        },
        {
          title: '社区章程',
          link: '/zh/community/charter/',
        },
        {
          title: '贡献看板',
          link: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/zh/overview`,
        },
        {
          title: '社区介绍',
          link: '/whitepaper/openEuler%20%E5%BC%80%E6%BA%90%E7%A4%BE%E5%8C%BA%E4%BB%8B%E7%BB%8D.pdf',
        },
      ],
    },
    {
      title: '新闻与资讯',
      list: [
        {
          title: '新闻',
          link: '/zh/interaction/news-list/',
        },
        {
          title: '博客',
          link: '/zh/interaction/blog-list/',
        },
        {
          title: '白皮书',
          link: '/zh/showcase/technical-white-paper/',
        },
      ],
    },
    {
      title: '获取与下载',
      list: [
        {
          title: '获取openEuler操作系统',
          link: '/zh/download/#get-openeuler',
        },
        {
          title: '最新社区发行版',
          link: '/zh/download/',
        },
        {
          title: '商业发行版',
          link: '/zh/download/commercial-release/',
        },
        {
          title: '软件中心',
          link: `${import.meta.env.VITE_SERVICE_SOFTWARE_URL}/zh`,
        },
      ],
    },
    {
      title: '支持与服务',
      list: [
        {
          title: '文档',
          link: `${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/`,
        },
        {
          title: 'FAQ',
          link: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/faq/`,
        },
        {
          title: '联系我们',
          link: '/zh/contact-us/',
        },
        // {
        //   title: '反馈问题',
        //   link: '',
        // },
      ],
    },
    {
      title: '互动与交流',
      list: [
        {
          title: '邮件列表',
          link: '/zh/community/mailing-list/',
        },
        {
          title: '活动',
          link: '/zh/interaction/event-list/',
        },
        {
          title: '论坛',
          link: import.meta.env.VITE_SERVICE_FORUM_URL,
        },
      ],
    },
    {
      title: '贡献与成长',
      list: [
        {
          title: 'SIG中心',
          link: '/zh/sig/sig-list/',
        },
        {
          title: '贡献攻略',
          link: '/zh/community/contribution/',
        },
        {
          title: '课程中心',
          link: '/zh/learn/mooc/',
        },
      ],
    },
  ],
  en: [
    {
      title: 'About openEuler',
      list: [
        {
          title: 'Members',
          link: '/en/community/member/',
        },
        {
          title: 'Governance',
          link: '/en/community/organization/',
        },
        {
          title: 'Code of Conduct',
          link: '/en/community/conduct/',
        },
        {
          title: 'Statistics',
          link: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/en/overview`,
        },
      ],
    },
    {
      title: 'News & Blogs',
      list: [
        {
          title: 'News',
          link: '/en/interaction/news-list/',
        },
        {
          title: 'Blogs',
          link: '/en/interaction/blog-list/',
        },
        {
          title: 'White Papers',
          link: '/en/showcase/technical-white-paper/',
        },
      ],
    },
    {
      title: 'Access',
      list: [
        {
          title: 'openEuler Is Everywhere',
          link: '/en/download/#get-openeuler',
        },
        {
          title: 'Latest Community Releases',
          link: '/en/download/',
        },
        {
          title: 'Commercial Releases',
          link: '/en/download/commercial-release/',
        },
        // {
        //   title: '软件中心',
        //   link: `${import.meta.env.VITE_SERVICE_SOFTWARE_URL}/en`,
        // },
      ],
    },
    {
      title: 'Services & Resources',
      list: [
        {
          title: 'Documentation',
          link: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/`,
        },
        {
          title: 'FAQ',
          link: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/faq/`,
        },
        {
          title: 'Contact Us',
          link: '/en/contact-us/',
        },
        // {
        //   title: '反馈问题',
        //   link: '',
        // },
      ],
    },
    {
      title: 'Communicate',
      list: [
        {
          title: 'Mailing Lists',
          link: '/en/community/mailing-list/',
        },
        {
          title: 'Activities',
          link: '/en/interaction/event-list/',
        },
        {
          title: 'Forum',
          link: import.meta.env.VITE_SERVICE_FORUM_URL,
        },
      ],
    },
    {
      title: 'Contribute',
      list: [
        {
          title: 'SIGs',
          link: '/en/sig/sig-list/',
        },
        {
          title: 'Contribution Guide',
          link: '/en/community/contribution/',
        },
        {
          title: 'Training',
          link: '/en/learn/mooc/',
        },
      ],
    },
  ],
};

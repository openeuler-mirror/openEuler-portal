// 隐私链接
// 注意：friendshipLinks、filingData 已提取到 .content/footer/ yaml，
// linksData（原 linksData2）和 quickNav 因依赖 import.meta.env 环境变量保留在此文件中。
export const linksData = {
  zh: [
    {
      title: '品牌',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/brand/`,
    },
    {
      title: '隐私声明',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/privacy/`,
    },
    {
      title: '法律声明',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/legal/`,
    },
    {
      title: '关于cookies',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/other/cookies/`,
    },
  ],
  en: [
    {
      title: 'Trademark',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/brand/`,
    },
    {
      title: 'Privacy Statement',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/privacy/`,
    },
    {
      title: 'Legal Notice',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/legal/`,
    },
    {
      title: 'About Cookies',
      href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/other/cookies/`,
    },
  ],
};
// 底部导航数据
export const quickNav = {
  zh: [
    {
      title: '关于openEuler',
      children: [
        {
          title: '成员单位',
          href: '/zh/community/member/',
        },
        {
          title: '组织架构',
          href: '/zh/community/organization/',
        },
        {
          title: '社区章程',
          href: '/zh/community/charter/',
        },
        {
          title: '贡献看板',
          href: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/zh/overview`,
        },
        {
          title: '社区介绍',
          href: '/whitepaper/openEuler%20%E5%BC%80%E6%BA%90%E7%A4%BE%E5%8C%BA%E4%BB%8B%E7%BB%8D.pdf',
        },
      ],
    },
    {
      title: '新闻与资讯',
      children: [
        {
          title: '新闻',
          href: '/zh/interaction/news-list/',
        },
        {
          title: '博客',
          href: '/zh/interaction/blog-list/',
        },
        {
          title: '白皮书',
          href: '/zh/showcase/technical-white-paper/',
        },
      ],
    },
    {
      title: '获取与下载',
      children: [
        {
          title: '获取openEuler操作系统',
          href: '/zh/download/#get-openeuler',
        },
        {
          title: '最新社区发行版',
          href: '/zh/download/',
        },
        {
          title: '商业发行版',
          href: '/zh/download/commercial-release/',
        },
        {
          title: '软件中心',
          href: `${import.meta.env.VITE_SERVICE_SOFTWARE_URL}/zh`,
        },
      ],
    },
    {
      title: '支持与服务',
      children: [
        {
          title: '文档',
          href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/`,
        },
        {
          title: 'FAQ',
          href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/zh/faq/`,
        },
        {
          title: '联系我们',
          href: '/zh/contact-us/',
        },
        // {
        //   title: '反馈问题',
        //   link: '',
        // },
      ],
    },
    {
      title: '互动与交流',
      children: [
        {
          title: '邮件列表',
          href: '/zh/community/mailing-list/',
        },
        {
          title: '活动',
          href: '/zh/interaction/event-list/',
        },
        {
          title: '论坛',
          href: import.meta.env.VITE_SERVICE_FORUM_URL,
        },
      ],
    },
    {
      title: '贡献与成长',
      children: [
        {
          title: 'SIG中心',
          href: '/zh/sig/sig-list/',
        },
        {
          title: '贡献攻略',
          href: '/zh/community/contribution/',
        },
        {
          title: '课程中心',
          href: '/zh/learn/mooc/',
        },
      ],
    },
  ],
  en: [
    {
      title: 'About openEuler',
      children: [
        {
          title: 'Members',
          href: '/en/community/member/',
        },
        {
          title: 'Governance',
          href: '/en/community/organization/',
        },
        {
          title: 'Code of Conduct',
          href: '/en/community/conduct/',
        },
        {
          title: 'Statistics',
          href: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/en/overview`,
        },
      ],
    },
    {
      title: 'News & Blogs',
      children: [
        {
          title: 'News',
          href: '/en/interaction/news-list/',
        },
        {
          title: 'Blogs',
          href: '/en/interaction/blog-list/',
        },
        {
          title: 'White Papers',
          href: '/en/showcase/technical-white-paper/',
        },
      ],
    },
    {
      title: 'Access',
      children: [
        {
          title: 'openEuler Is Everywhere',
          href: '/en/download/#get-openeuler',
        },
        {
          title: 'Latest Community Releases',
          href: '/en/download/',
        },
        {
          title: 'Commercial Releases',
          href: '/en/download/commercial-release/',
        },
        // {
        //   title: '软件中心',
        //   link: `${import.meta.env.VITE_SERVICE_SOFTWARE_URL}/en`,
        // },
      ],
    },
    {
      title: 'Services & Resources',
      children: [
        {
          title: 'Documentation',
          href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/`,
        },
        {
          title: 'FAQ',
          href: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/en/faq/`,
        },
        {
          title: 'Contact Us',
          href: '/en/contact-us/',
        },
        // {
        //   title: '反馈问题',
        //   link: '',
        // },
      ],
    },
    {
      title: 'Communicate',
      children: [
        {
          title: 'Mailing Lists',
          href: '/en/community/mailing-list/',
        },
        {
          title: 'Activities',
          href: '/en/interaction/event-list/',
        },
        {
          title: 'Forum',
          href: import.meta.env.VITE_SERVICE_FORUM_URL,
        },
      ],
    },
    {
      title: 'Contribute',
      children: [
        {
          title: 'SIGs',
          href: '/en/sig/sig-list/',
        },
        {
          title: 'Contribution Guide',
          href: '/en/community/contribution/',
        },
        {
          title: 'Training',
          href: '/en/learn/mooc/',
        },
      ],
    },
  ],
};

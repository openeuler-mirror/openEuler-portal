import police from '~@/assets/category/footer/police.png';

// 隐私链接
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

export const friendshipLinks = {
  zh: [
    {
      href: 'https://portal.mulanos.cn/',
      title: '木兰开源社区',
    },
    {
      href: 'https://www.hikunpeng.com/zh/',
      title: '鲲鹏社区',
    },
    {
      href: 'https://pcl.ac.cn/',
      title: '鹏城实验室',
    },
    {
      href: 'https://www.infoq.cn/?utm_source=openeuler&utm_medium=youlian',
      title: 'InfoQ',
    },
    {
      href: 'https://kaiyuanshe.cn/',
      title: '开源社',
    },
    {
      href: 'http://www.vulab.com.cn/',
      title: '中科微澜',
    },
    {
      href: 'https://www.authing.cn/',
      title: 'Authing',
    },
    {
      href: 'https://www.opengauss.org/zh/',
      title: 'openGauss',
    },
    {
      href: 'https://www.mindspore.cn/',
      title: '昇思MindSpore',
    },
    {
      href: 'https://www.openubmc.cn/',
      title: 'openUBMC',
    },
    {
      href: 'https://www.openfuyao.cn/',
      title: 'openFuyao',
    },
    {
      href: 'http://www.ebaina.com/',
      title: 'Ebaina',
    },
  ],
  en: [
    {
      href: 'https://www.infoq.cn/?utm_source=openeuler&utm_medium=youlian',
      title: 'InfoQ',
    },
    {
      href: 'https://www.authing.cn/',
      title: 'Authing',
    },
    {
      href: 'https://www.opengauss.org/en/',
      title: 'openGauss',
    },
    {
      href: 'https://www.mindspore.cn/en/',
      title: 'MindSpore',
    },
    {
      href: 'https://www.openubmc.cn/en/',
      title: 'openUBMC',
    },
    {
      href: 'https://www.openfuyao.cn/en/',
      title: 'openFuyao',
    },
    {
      href: 'http://www.ebaina.com/',
      title: 'Ebaina',
    },
  ],
};

export const filingData = {
  link: 'https://beian.miit.gov.cn/#/Integrated/index',
  icon: police,
};

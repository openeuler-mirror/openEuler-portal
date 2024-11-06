// 中文友情链接
import LogoBilibili from '~@/assets/category/footer/bilibili.png';
import LogoToutiao from '~@/assets/category/footer/toutiao.png';
import LogoJuejin from '~@/assets/category/footer/juejin.png';
import LogoOschina from '~@/assets/category/footer/oschina.png';
import LogoCsdn from '~@/assets/category/footer/csdn.png';

// 英文友情链接
import LogoRedditSquare from '~@/assets/category/footer/reddit-square.png';
import LogoLinkedin from '~@/assets/category/footer/linkdin.png';
import LogoYoutube from '~@/assets/category/footer/youtube.png';
import LogoTwitter from '~@/assets/category/footer/x.png';

// 友情链接
export const linksData = {
  zh: [
    {
      path: 'https://my.oschina.net/openeuler',
      logo: LogoOschina,
      id: 'oschina',
      height: 14,
    },
    {
      path: 'https://blog.csdn.net/openEuler_?spm=1000.2115.3001.5343',
      logo: LogoCsdn,
      id: 'csdn',
      height: 11,
    },
    {
      path: 'https://juejin.cn/user/3183782863845454',
      logo: LogoJuejin,
      id: 'juejin',
      height: 11,
    },
    {
      path: 'https://space.bilibili.com/527064077/channel/series',
      logo: LogoBilibili,
      id: 'bilibili',
      height: 13,
    },
    {
      path: 'https://www.toutiao.com/c/user/token/MS4wLjABAAAAZivzVkJzMyQ44GzmX1i_ON0bgxL3E8ybHC-P9HMqZiqUgpYVnjCjynDt-SebKN7r',
      logo: LogoToutiao,
      id: 'toutiao',
      height: 13,
    },
  ],
  en: [
    {
      path: 'https://www.linkedin.com/company/openeuler',
      logo: LogoLinkedin,
      id: 'linkedin',
      height: 24,
    },
    {
      path: 'https://x.com/openEuler',
      logo: LogoTwitter,
      id: 'twitter',
      height: 24,
    },
    {
      path: 'https://www.youtube.com/channel/UCPzSqXqCgmJmdIicbY7GAeA',
      logo: LogoYoutube,
      id: 'youtube',
      height: 18,
    },
    {
      path: 'https://www.reddit.com/r/openEuler/',
      logo: LogoRedditSquare,
      id: 'reddit-square',
      height: 24,
    },
  ],
};
// 隐私链接
export const linksData2 = {
  zh: [
    {
      NAME: '品牌',
      URL: 'https://www.openeuler.org/zh/other/brand/',
    },
    {
      NAME: '隐私政策',
      URL: 'https://www.openeuler.org/zh/other/privacy/',
    },
    {
      NAME: '法律声明',
      URL: 'https://www.openeuler.org/zh/other/legal/',
    },
    {
      NAME: '关于cookies',
      URL: 'https://www.openeuler.org/zh/other/cookies/',
    },
  ],
  en: [
    {
      NAME: 'Trademark',
      URL: 'https://www.openeuler.org/en/other/brand/',
    },
    {
      NAME: 'Privacy Policy',
      URL: 'https://www.openeuler.org/en/other/privacy/',
    },
    {
      NAME: 'Legal Notice',
      URL: 'https://www.openeuler.org/en/other/legal/',
    },
    {
      NAME: 'About Cookies',
      URL: 'https://www.openeuler.org/en/other/cookies/',
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
          link: '',
        },
        {
          title: '组织架构',
          link: '',
        },
        {
          title: '社区章程',
          link: '',
        },
        {
          title: '贡献看板',
          link: '',
        },
        {
          title: '社区介绍',
          link: '',
        },
      ],
    },
    {
      title: '新闻与资讯',
      list: [
        {
          title: '新闻',
          link: '',
        },
        {
          title: '博客',
          link: '',
        },
        {
          title: '白皮书',
          link: '',
        },
      ],
    },
    {
      title: '获取与下载',
      list: [
        {
          title: '获取openEuler操作系统',
          link: '',
        },
        {
          title: '最新社区发行版',
          link: '',
        },
        {
          title: '商业发行版',
          link: '',
        },
        {
          title: '软件中心',
          link: '',
        },
      ],
    },
    {
      title: '支持与服务',
      list: [
        {
          title: '文档',
          link: '',
        },
        {
          title: 'FAQ',
          link: '',
        },
        {
          title: '联系我们',
          link: '',
        },
        {
          title: '反馈问题',
          link: '',
        },
      ],
    },
    {
      title: '互动与交流',
      list: [
        {
          title: '邮件列表',
          link: '',
        },
        {
          title: '活动',
          link: '',
        },
        {
          title: '论坛',
          link: '',
        },
      ],
    },
    {
      title: '贡献与成长',
      list: [
        {
          title: 'SIG中心',
          link: '',
        },
        {
          title: '贡献攻略',
          link: '',
        },
        {
          title: '课程中心',
          link: '',
        },
      ],
    },
  ],
};

export const friendshipLinks = {
  zh: [
    {
      link: 'http://www.mulanos.cn/',
      title: '木兰开源社区',
    },
    {
      link: 'https://www.hikunpeng.com/zh/',
      title: '鲲鹏社区',
    },
    {
      link: 'http://ic-openlabs.huawei.com/chat/#/',
      title: '鲲鹏小智',
    },
    {
      link: 'https://dw.pcl.ac.cn/',
      title: '鹏城实验室',
    },
    {
      link: 'https://www.infoq.cn/?utm_source=openeuler&utm_medium=youlian',
      title: 'infoQ',
    },
    {
      link: 'https://kaiyuanshe.cn/',
      title: '开源社',
    },
    {
      link: 'http://www.vulab.com.cn/',
      title: '中科微澜',
    },
    {
      link: 'https://www.authing.cn/',
      title: 'Authing',
    },
    {
      link: 'https://www.opengauss.org/zh/',
      title: 'openGauss',
    },
    {
      link: 'https://www.mindspore.cn/',
      title: '昇思mindSpore',
    },
    {
      link: 'http://www.ebaina.com/',
      title: 'Ebaina',
    },
  ],
};

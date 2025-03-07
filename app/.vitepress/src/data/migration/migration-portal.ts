import imgAdvantageLeft from '@/assets/category/migration/portal/portal-advantage-left.png';
import imgAdvantageRight from '@/assets/category/migration/portal/portal-advantage-right.png';
import imgTransitionRight from '@/assets/category/migration/portal/portal-advantage-transition-1.png';
import imgTransitionDown from '@/assets/category/migration/portal/portal-advantage-transition-2.png';
import imgDownloadLeft_light from '@/assets/category/migration/portal/portal-download-1.png';
import imgDownloadLeft_dark from '@/assets/category/migration/portal/portal-download-dark-1.png';
import imgDownloadBG_dark from '@/assets/category/migration/portal/portal-download-bg-dark.png';
import imgPathContent_light from '@/assets/category/migration/portal/portal-path-content.png';
import imgPathContent_dark from '@/assets/category/migration/portal/portal-path-content-dark.png';
import imgPathContent_en from '@/assets/category/migration/portal/implementation.png';
import imgPathCoontentTop from '@/assets/category/migration/portal/portal-path-mo-top.png';
import imgPathCoontentBottom from '@/assets/category/migration/portal/portal-path-mo-bottom.png';
import imgOffical from '@/assets/category/migration/portal/portal-help-official.png';
import imgAssistant from '@/assets/category/migration/portal/portal-help-assistant.png';

import iconAdvantage01_light from '@/assets/category/migration/portal/portal-advantage-icon-1.png';
import iconAdvantage02_light from '@/assets/category/migration/portal/portal-advantage-icon-2.png';
import iconAdvantage03_light from '@/assets/category/migration/portal/portal-advantage-icon-3.png';
import iconAdvantage04_light from '@/assets/category/migration/portal/portal-advantage-icon-4.png';
import iconAdvantage01_dark from '@/assets/category/migration/portal/portal-advantage-icon-dark-1.svg';
import iconAdvantage02_dark from '@/assets/category/migration/portal/portal-advantage-icon-dark-2.svg';
import iconAdvantage03_dark from '@/assets/category/migration/portal/portal-advantage-icon-dark-3.svg';
import iconAdvantage04_dark from '@/assets/category/migration/portal/portal-advantage-icon-dark-4.svg';

export default {
  zh: {
    advantage: {
      title: '我们的优势',
      dexcription: 'openEuler 助力企业简单、平稳、高效进行操作系统迁移。',
      cardTopLeft: {
        url: imgAdvantageLeft,
        title01: '原操作系统EOM',
        title02: '数字化改造',
        description: '',
      },
      transitionRight: imgTransitionRight,
      transitionDown: imgTransitionDown,
      cardTopRight: {
        url: imgAdvantageRight,
        title01: 'openEuler',
        title02: '',
        description:
          '面向数字基础设施的开源操作系统\n聚焦内核能力，释放多样性算力，引领操作系统创新\n创新架构，全栈优化，打造全场景协同的数字基础设施操作系统',
      },
      benefit: {
        light: [
          {
            icon: iconAdvantage01_light,
            title: '端到端的迁移方案',
            link: '/migration/guidance/',
          },
          {
            icon: iconAdvantage02_light,
            title: '简单好用的迁移工具',
            link: '/migration/download/',
          },
          {
            icon: iconAdvantage03_light,
            title: '支持到位，快速响应',
            link: '/migration/contact/',
          },
          {
            icon: iconAdvantage04_light,
            title: '政企迁移案例实践',
            link: '/migration/user-cases/',
          },
        ],
        dark: [
          {
            icon: iconAdvantage01_dark,
            title: '端到端的迁移方案',
            link: '/migration/guidance/',
          },
          {
            icon: iconAdvantage02_dark,
            title: '简单好用的迁移工具',
            link: '/migration/download/',
          },
          {
            icon: iconAdvantage03_dark,
            title: '支持到位，快速响应',
            link: '/migration/contact/',
          },
          {
            icon: iconAdvantage04_dark,
            title: '政企迁移案例实践',
            link: '/migration/user-cases/',
          },
        ],
      },
    },
    download: {
      title: '快速下载',
      dexcription:
        'x2openEuler工具是一款将源操作系统升级为目标操作系统的搬迁工具套件',
      left: {
        img: {
          light: imgDownloadLeft_light,
          dark: imgDownloadLeft_dark,
        },
        name: 'x2openEuler',
        version: '3.0.0-2024930',
      },
      btns: [
        {
          name: '软件下载',
          softLinks: [
            {
              name: 'x86_64 ',
              link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/x86_64/Packages/x2openEuler-core-3.0.0-20241022.x86_64.rpm',
            },
            {
              name: 'aarch64 ',
              link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/aarch64/Packages/x2openEuler-core-3.0.0-20241022.aarch64.rpm',
            },
          ],
        },
        {
          name: '特性说明',
          link: '/zh/migration/download/characteristic-description-3.0.0/',
        },
        {
          name: '补丁说明',
          link: '/zh/migration/download/patch_description-3.0.0/',
        },
        {
          name: '使用指南',
          link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduction.html',
        },
        {
          name: '视频实操',
          link: 'https://www.bilibili.com/video/BV1yR4y1b76k/?spm_id_from=333.999.0.0&vd_source=0aa547ea87e7a7505cf544eacc2236ac',
        },
      ],
      bgUrl: imgDownloadBG_dark,
    },
    instruction: {
      title: '轻松上手',
      dexcription:
        '提供用户迁移旅程中的准备、实施、测试上线等各环节的方法及工具，方便开发者快速完成迁移',
      list: [
        {
          title: '了解',
          content: '迁移背景\n迁移概述\nopenEuler迁移方案',
          sogan: '六步法端到端迁移无忧',
        },
        {
          title: '迁移准备',
          content: '成立保障组织\n迁移分析\n方案设计\n迁移适配',
          sogan: '工具助力，化繁为简',
        },
        {
          title: '迁移实施',
          content: '原地升级\n适配升级',
          sogan: '一键迁移，高效可靠',
        },
        {
          title: '测试与上线',
          content: '业务监控\n业务巡检\n安全漏洞更新',
          sogan: '安全放心，智能运维',
        },
      ],
    },
    path: {
      title: '迁移路径',
      dexcription: '',
      img: {
        light: imgPathContent_light,
        dark: imgPathContent_dark,
      },
      imgMo: {
        top: {
          title: '原地升级（1h）',
          dexcription: '在原有的系统上一键升级',
          img: imgPathCoontentTop,
        },
        bottom: {
          title: '适配迁移（4h）',
          dexcription: '自动安装操作系统和同步配置\n安装应用',
          img: imgPathCoontentBottom,
        },
      },
    },
    case: {
      title: '政企案例',
      dexcription: '',
      list: [
        {
          name: '浙江移动',
          dexcription: '浙江移动完成了openEuler的大规模迁移部署',
          link: '/zh/showcase/provider/003p49ce-8355-d114154aa417/',
        },
        {
          name: '天翼云',
          dexcription:
            '天翼云全场景业务无缝迁移至基于openEuler的自研操作系统CTyunOS',
          link: '/zh/showcase/provider/tianyiyun0330/',
        },
      ],
      btn: {
        text: '了解详情',
        link: '/migration/user-cases/',
      },
    },
    guide: {
      title: '移植指南',
      dexcription: '',
      list: [
        {
          label: 'MySQL 5.7.21 移植指南',
          link: '/zh/blog/randy1568/MySQL 5-7-21-migrate-guide.html',
        },
        {
          label: 'Apache 2.4.39 移植指南',
          link: '/zh/blog/randy1568/Apache 2-4-39-porting-guide.html',
        },
        {
          label: 'Nginx 1.14.2 移植指南',
          link: '/zh/blog/randy1568/Nginx 1-14-2-porting-guide.html',
        },
      ],
      btn: {
        text: '查看更多',
        link: '/migration/transplantation-cases/',
      },
    },
    help: {
      title: '帮助咨询',
      dexcription: '',
      tips: [
        {
          textLeft: '如有疑问可前往',
          linkText: 'FAQ',
          textRight: '查找对应解答',
          link: '/zh/migration/faq/',
        },
        {
          textLeft: '也可扫描二维码，我们会有专人为您解答',
          linkText: '',
          textRight: '',
          link: '',
        },
        {
          textLeft: 'openEuler公众号进入迁移专区，点击“加群”，进入技术交流群',
          linkText: '',
          textRight: '',
          link: '',
        },
        {
          textLeft: 'openEuler小助手，备注“迁移”，进入技术交流群',
          linkText: '',
          textRight: '',
          link: '',
        },
      ],
      officalQR: {
        img: imgOffical,
        text: 'openEuler公众号',
      },
      assistantQR: {
        img: imgAssistant,
        text: 'openEuler小助手',
      },
    },
  },
  en: {
    advantage: {
      title: 'Advantages',

      dexcription: 'Easy, stable, and efficient OS migration',

      cardTopLeft: {
        url: imgAdvantageLeft,

        title01: 'Digital transformation',

        title02: 'for OSs that reach EOM',

        description: '',
      },

      transitionRight: imgTransitionRight,

      transitionDown: imgTransitionDown,

      cardTopRight: {
        url: imgAdvantageRight,

        title01: 'openEuler',

        title02: '',

        description:
          'An open source OS designed for digital infrastructure\nKey kernel innovation to fuel multi-architecture computing\nFull-stack optimization for diverse scenarios',
      },

      benefit: {
        light: [
          {
            icon: iconAdvantage01_light,

            title: 'End-to-End Solution',

            link: '/migration/guidance/',
          },

          {
            icon: iconAdvantage02_light,

            title: 'Easy-to-Use Tool',

            link: '/migration/download/',
          },

          {
            icon: iconAdvantage03_light,

            title: 'Comprehensive and Responsive Support',

            link: '/migration/contact/',
          },

          {
            icon: iconAdvantage04_light,

            title: 'Best Practices',

            link: '/migration/user-cases/',
          },
        ],

        dark: [
          {
            icon: iconAdvantage01_dark,

            title: 'End-to-End Solution',

            link: '/migration/guidance/',
          },

          {
            icon: iconAdvantage02_dark,

            title: 'Easy-to-Use Tool',

            link: '/migration/download/',
          },

          {
            icon: iconAdvantage03_dark,

            title: 'Comprehensive and Responsive Support',

            link: '/migration/contact/',
          },

          {
            icon: iconAdvantage04_dark,

            title: 'Best Practices',

            link: '/migration/user-cases/',
          },
        ],
      },
    },

    download: {
      title: 'Download',

      dexcription:
        'Get the x2openEuler migration tool suite and upgrade your OS today',

      left: {
        img: {
          light: imgDownloadLeft_light,

          dark: imgDownloadLeft_dark,
        },

        name: 'x2openEuler',

        version: '3.0.0-2024930',
      },

      btns: [
        {
          name: 'Download Software',

          softLinks: [
            {
              name: 'x86_64 ',

              link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/x86_64/Packages/x2openEuler-core-3.0.0-20241022.x86_64.rpm',
            },

            {
              name: 'AArch64',

              link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/aarch64/Packages/x2openEuler-core-3.0.0-20241022.aarch64.rpm',
            },
          ],
        },

        {
          name: 'Feature Description',

          link: '/en/migration/download/characteristic-description-3.0.0/',
        },

        {
          name: 'Patch Description',

          link: '/en/migration/download/patch_description-3.0.0/',
        },

        {
          name: 'User Guide',

          link: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduction.html',
        },
      ],

      bgUrl: imgDownloadBG_dark,
    },

    instruction: {
      title: 'Getting Started',

      dexcription:
        'Find the tool to help you prepare, perform, and test your migration and services',

      list: [
        {
          title: 'Learn',

          content:
            'Migration background\nMigration overview\nopenEuler migration solution',

          sogan: 'Six Steps to Migrate to openEuler',
        },

        {
          title: 'Prepare',

          content:
            'Create a support team\nAnalyze the project\nDesign a migration plan\nPort software before migration',

          sogan: 'Powerful Tool',
        },

        {
          title: 'Implement',

          content: 'In-place upgrade\nMigration after adaptation',

          sogan: 'Streamlined and Reliable Migration',
        },

        {
          title: 'Test and Roll Out',

          content:
            'System monitoring\nInspection and detection\nSecurity vulnerability updates',

          sogan: 'Secure and Intelligent O&M',
        },
      ],
    },

    path: {
      title: 'Migration Paths',

      dexcription: '',

      img: {
        light: imgPathContent_en,
        dark: imgPathContent_dark,
      },

      imgMo: {
        top: {
          title: 'In-place Upgrade (1h)',

          dexcription: 'Upgrade the source OS.',

          img: imgPathCoontentTop,
        },

        bottom: {
          title: 'Migration After Adaptation (4h)',

          dexcription:
            'Automatically install the OS and synchronize configurations.\nInstall applications.',

          img: imgPathCoontentBottom,
        },
      },
    },

    case: {
      title: 'Best Practices',

      dexcription: '',

      list: [
        {
          name: 'China Mobile (Zhejiang)',

          dexcription: 'Smooth OS Porting and More Stable Core Systems',

          link: '/en/showcase/provider/003p49ce-8355-d114154aa417/',
        },

        {
          name: 'China Telecom',

          dexcription: 'Seamless OS Migration to CTyunOS',

          link: '/en/showcase/provider/tianyiyun0330/',
        },
      ],

      btn: {
        text: 'Learn More',

        link: '/migration/user-cases/',
      },
    },

    guide: {
      title: 'Porting Guides',

      dexcription: '',

      list: [
        {
          label: 'MySQL 5.7.21 Porting Guide',

          link: '/en/blog/randy1568/MySQL 5-7-21-migrate-guide.html',
        },

        {
          label: 'Apache 2.4.39 Porting Guide',

          link: '/en/blog/randy1568/Apache 2-4-39-porting-guide.html',
        },

        {
          label: 'Nginx 1.14.2 Porting Guide',

          link: '/en/blog/randy1568/Nginx 1-14-2-porting-guide.html',
        },
      ],

      btn: {
        text: 'View More',

        link: '/migration/transplantation-cases/',
      },
    },

    help: {
      title: 'Contact',

      dexcription: '',

      tips: [
        {
          textLeft: 'If you have questions, our ',

          linkText: 'FAQs',

          textRight: ' may have the answer.',

          link: '/en/migration/faq/',
        },
        {
          textLeft:
            'If you have any issues or requirements relating to system migration, submit them through ',
          linkText: 'QuickIssue',
          textRight: '.',
          link: 'https://quickissue.openeuler.org/en/new-issues/',
        },
        {
          textLeft:
            'Want to connect with the community or share experiences? Join our ',

          linkText: 'Discord group',

          textRight: ' where our team and other users can help you out.',

          link: 'https://discord.gg/aTWFCCgsGB',
        },
        {
          textLeft: 'Looking for more video tutorials? Check out our ',
          linkText: 'migration playlist',
          textRight:
            ' on the openEuler YouTube channel for detailed guides and tutorials.',
          link: 'https://www.youtube.com/@openeuler/playlists',
        },
      ],
      officalQR: {
        img: '',

        text: 'openEuler official WeChat account',
      },

      assistantQR: {
        img: '',

        text: 'openEuler assistant',
      },
    },
  },
};

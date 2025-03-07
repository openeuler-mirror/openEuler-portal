export default {
  MEETINGS_TIME: '会议时间：',
  MEETINGS_REPLAY: '回放链接',
  SEARCH_PLACE_HOLDER: '输入内容',
  COOKIE_LEGAL_TEXT: '本站点使用Cookies，继续浏览表示您同意我们使用Cookies。',
  COOKIE_LEGAL_LINK_TEXT: 'Cookies和隐私政策。',
  NAV_ROUTER: {
    DOWNLOAD: '下载',
    ISO: 'ISO',
    MIRRORLIST: '镜像仓列表',
    LEARNING: '学习',
    DOCS: '文档',
    MOOC: '慕课',
    INTERNSHIP: '实习',
    CONNECT: '互动',
    NEWS: '新闻',
    BLOG: '博客',
    LIVE: '直播',
    SALON: '活动',
    SUMMIT: '峰会',
    COMMUNITY: '社区',
    CONTRIBUTION: '贡献攻略',
    CONVENTION: '行为准则',
    MAILINGLIST: '邮件列表',
    CERTIFICATION: '个人认证',
    TALENT: '人才评测',
    STATISTICS: '贡献看板',
    SIG: 'SIG',
    SIGLIST: '查看SIG',
    APPLICATION: '申请流程',
    ROLES: '角色说明',
    MEETINGGUIDE: '会议指南',
    DISCOVERY: '探索',
    ATUNE: 'A-Tune',
    BISHENGJDK: 'BiSheng JDK',
    ISULA: 'iSula',
    SECGEAR: 'secGear',
    STRATOVIRT: 'StratoVirt',
    COMPASSCI: 'Compass-CI',
    COMPLIANCE: 'Compliance',
    PKGSHIP: 'Pkgship',
    SUPPORT: '支持',
    VULNERABILITY: '漏洞管理',
    SAFETY: '安全公告',
    CVE: 'CVE',
    COMPATIBILITY_EVALUATION: '兼容性技术测评',
    APPROVE: 'OSV技术测评列表',
    COMPATIBILITY: '兼容性列表',
    MIGRATION: '迁移专区',
  },
  NAV_ROUTER_INFO: [
    {
      NAME: '动态',
      CHILDREN: [
        {
          NAME: '新闻',
          LABEL: '',
          PATH: '/interaction/news-list/',
        },
        {
          NAME: '博客',
          LABEL: '',
          PATH: '/interaction/blog-list/',
        },
        {
          NAME: '活动',
          LABEL: '',
          PATH: '/interaction/event-list/',
        },
        {
          NAME: '峰会',
          LABEL: '',
          PATH: '/interaction/summit-list/summit2024/',
        },
        {
          NAME: '月刊',
          LABEL: '',
          PATH: '/monthly-summary/',
        },
      ],
    },
    {
      NAME: '交流',
      CHILDREN: [
        {
          NAME: '论坛',
          LABEL: '',
          PATH: 'https://forum.openeuler.org/',
        },
        {
          NAME: '邮件列表',
          LABEL: '',
          PATH: '/community/mailing-list/',
        },
        {
          NAME: '线上会议',
          LABEL: '',
          PATH: '/meeting/',
        },
        {
          NAME: '社交媒体',
          LABEL: '',
          PATH: '/#footer',
        },
        {
          NAME: 'FAQs',
          LABEL: '',
          PATH: '/faq/',
          SHOW_IN_MOBILE_ONLY: true,
        },
      ],
    },
  ],
  NAV_ROUTER_CONFIG_NEW: [
    {
      NAME: '用户',
      ID: 'user',
      CHILDREN: [
        {
          NAME: '技术展示',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: '用户案例',
              LABEL: '了解openEuler在各行业的最佳案例',
              PATH: '/showcase/',
            },
            {
              NAME: '行业白皮书',
              LABEL: '了解openEuler在行业的生态现状、业务场景的应用',
              PATH: '/showcase/white-paper/',
            },
            {
              NAME: '技术白皮书',
              LABEL: '了解openEuler各版本的技术详情',
              PATH: '/showcase/technical-white-paper/',
            },
            {
              NAME: '市场研究报告',
              LABEL: '了解openEuler在行业的市场研究情况',
              PATH: '/showcase/market-report/',
            },
          ],
        },
        {
          NAME: '使用指南',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '文档',
              LABEL: '',
              PATH: 'https://docs.openeuler.org/zh/',
            },
            {
              NAME: 'Man Pages',
              LABEL: '提供命令、函数、系统调用等的帮助手册',
              PATH: 'https://man.openeuler.org',
            },
            {
              NAME: '课程中心',
              LABEL: '',
              PATH: '/learn/mooc/',
            },
            {
              NAME: '迁移中心',
              LABEL: '助力企业进行操作系统迁移的指南文档',
              PATH: '/migration/',
            },
            {
              NAME: '运维专区',
              PATH: '/om/',
            },
          ],
        },
        {
          NAME: '支持与服务',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: '软件中心',
              LABEL: '简易便捷地查询openEuler社区软件包',
              PATH: 'https://easysoftware.openeuler.org/',
            },
            {
              NAME: 'OSV技术测评',
              LABEL: '查看OSV技术测评结果',
              PATH: '/approve/',
            },
            {
              NAME: '兼容性技术测评',
              LABEL: '帮助企业快速申请兼容性技术测评',
              PATH: 'https://certification.openeuler.org/',
            },
            {
              NAME: '兼容性列表',
              LABEL: '查看openEuler兼容性列表',
              PATH: '/compatibility/',
            },
            {
              NAME: '社区公告',
              LABEL: '查看漏洞管理、安全公告等安全问题',
              PATH: '',
              CHILDREN: [
                {
                  NAME: '安全中心',
                  LABEL: '',
                  PATH: '/security/security-bulletins/',
                },
                {
                  NAME: '缺陷中心',
                  LABEL: '',
                  PATH: '/security/bug-bulletins/',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      NAME: '开发者',
      ID: 'developer',
      CHILDREN: [
        {
          NAME: '学习与贡献',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '文档',
              LABEL: '',
              PATH: 'https://docs.openeuler.org/zh/',
            },
            {
              NAME: '课程中心',
              LABEL: '',
              PATH: '/learn/mooc/',
            },
            {
              NAME: '贡献攻略',
              LABEL: '',
              PATH: '/community/contribution/',
            },
            {
              NAME: 'SIG中心',
              LABEL: '',
              PATH: '/sig/sig-list/',
            },
            {
              NAME: '开源实习',
              LABEL: '',
              PATH: '/internship/',
            },
            {
              NAME: 'CLA签署',
              LABEL: '',
              PATH: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
              OUTLINK: true,
            },
          ],
        },
        {
          NAME: '开发openEuler',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'QuickIssue',
              LABEL: '简易快捷地查询、提交社区Issues',
              PATH: 'https://quickissue.openeuler.org/zh/',
            },
            {
              NAME: 'Pkgship',
              LABEL: '管理操作系统软件包信息和依赖项的查询工具',
              PATH: 'https://pkgmanage.openeuler.org',
            },
            {
              NAME: '软件包贡献',
              LABEL: '简单高效地贡献软件包',
              PATH: 'https://software-pkg.openeuler.org/zh/package',
            },
            {
              NAME: 'License工具门户',
              LABEL: '帮助快速检索License权利、义务、限制',
              PATH: 'https://compliance.openeuler.org/',
              OUTLINK: true,
            },
            {
              NAME: 'EulerTest',
              LABEL: '基于openEuler环境开发的测试管理平台',
              PATH: 'https://radiatest.openeuler.org',
            },
            {
              NAME: 'x2openEuler',
              LABEL: '将原有业务迁移到openEuler的工具套件',
              PATH: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduction.html',
            },
            {
              NAME: 'Compass-CI',
              LABEL: '开放式测试服务平台',
              PATH: 'https://compass-ci.openeuler.org/',
            },
            {
              NAME: 'OEPKGS',
              LABEL: 'OEPKGS软件包服务',
              PATH: 'https://oepkgs.net/',
              OUTLINK: true,
            },
            {
              NAME: 'EulerMaker',
              LABEL: '开放式统一构建服务',
              PATH: 'https://eulermaker.compass-ci.openeuler.openatom.cn/',
            },
            {
              NAME: 'oecp',
              LABEL: '操作系统差异比较分析工具',
              PATH: 'https://gitee.com/openeuler/oecp',
              OUTLINK: true,
            },
          ],
        },
        {
          NAME: '在openEuler上开发',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'EulerLauncher',
              LABEL: '跨平台openEuler虚拟机管理工具',
              PATH: 'https://gitee.com/openeuler/eulerlauncher',
              OUTLINK: true,
            },
            {
              NAME: '用户软件仓(EUR)',
              LABEL: '开发者易用的软件包托管分发平台',
              PATH: 'https://eur.openeuler.openatom.cn/coprs/',
            },
          ],
        },
        {
          NAME: '源码',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '代码仓',
              LABEL: '',
              PATH: 'https://gitee.com/openeuler',
              OUTLINK: true,
            },
            {
              NAME: '软件包仓',
              LABEL: '',
              PATH: 'https://gitee.com/src-openeuler',
              OUTLINK: true,
            },
            {
              NAME: 'Github镜像仓',
              LABEL: '',
              PATH: 'https://github.com/openeuler-mirror',
              OUTLINK: true,
            },
          ],
        },
      ],
    },
    {
      NAME: '社区',
      ID: 'community',
      CHILDREN: [
        {
          NAME: '关于社区',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: '组织架构',
              LABEL: '了解openEuler的委员会成员',
              PATH: '/community/organization/',
            },
            {
              NAME: '成员单位',
              LABEL: '了解openEuler的捐赠单位',
              PATH: '/community/member/',
            },
            {
              NAME: '社区章程',
              LABEL: '了解openEuler的章程、条例、行为准则、License策略',
              PATH: '/community/charter/',
            },
            {
              NAME: '社区荣誉',
              LABEL: '了解openEuler的荣誉奖项',
              PATH: '/community/honor/',
            },
            {
              NAME: 'oEEP',
              LABEL: '查看openEuler社区的演进提案',
              PATH: '/oEEP/?name=oEEP-0000 oEEP  索引',
            },
            {
              NAME: 'openEuler Call for X 计划',
              LABEL: '共享openEuler Call for X计划多元化资源',
              PATH: '/community/program/',
            },
            {
              NAME: '城市用户组',
              LABEL: '区域用户交流圈',
              PATH: '/community/user-group/',
            },
            {
              NAME: '贡献看板',
              LABEL: '查看openEuler社区数据',
              PATH: 'https://datastat.openeuler.org/zh/overview',
            },
          ],
        },
        {
          NAME: '学习与贡献',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '文档',
              LABEL: '',
              PATH: 'https://docs.openeuler.org/zh/',
            },
            {
              NAME: '高校',
              LABEL: '了解高校技术小组与实习赛事资讯',
              PATH: '/universities/',
            },
            {
              NAME: '课程中心',
              LABEL: '',
              PATH: '/learn/mooc/',
            },
            {
              NAME: '贡献攻略',
              LABEL: '',
              PATH: '/community/contribution/',
            },
            {
              NAME: 'SIG中心',
              LABEL: '',
              PATH: '/sig/sig-list/',
            },
            {
              //培训认证
              NAME: '人才培养',
              LABEL: '',
              PATH: '/talent-assessment/',
            },
          ],
        },
        {
          NAME: '项目',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'A-Tune',
              LABEL: '一款基于AI开发的智能优化引擎',
              PATH: '/other/projects/atune/',
            },
            {
              NAME: 'BiSheng JDK',
              LABEL: 'ARM上最好用的JDK',
              PATH: '/other/projects/bishengjdk/',
            },
            {
              NAME: 'iSula',
              LABEL: '容器技术方案',
              PATH: '/other/projects/isula/',
            },
            {
              NAME: 'secGear',
              LABEL: '供开发者开发安全应用的机密计算框架',
              PATH: '/other/projects/secgear/',
            },
            {
              NAME: 'StratoVirt',
              LABEL: '面向云数据中心的企业级虚拟化VMM',
              PATH: '/other/projects/stratovirt/',
            },
            {
              NAME: 'NestOS',
              LABEL: '基于欧拉开源操作系统的云底座操作系统',
              PATH: '/nestos',
              OUTLINK: true,
            },
          ],
        },
      ],
    },
    {
      NAME: '下载',
      ID: 'download',
      CHILDREN: [
        {
          NAME: '获取方式',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '获取openEuler操作系统',
              PATH: '/download/get-os/',
            },
          ],
        },
        {
          NAME: '最新版本',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'openEuler 24.03 LTS',
              ADD_TITLE: true,
              LABEL:
                'openEuler 24.03 LTS 是基于6.6内核的长周期版本，面向服务器、云、边缘计算、AI和嵌入式场景，提供更多新特性和功能，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
              PATH: '/download/?version=openEuler 24.03 LTS',
              CHILDREN: [
                {
                  NAME: '服务器',
                  PATH: '/download/?version=openEuler 24.03 LTS&scenario=ISO',
                },
                {
                  NAME: '边缘计算',
                  PATH: '/download/?version=openEuler 24.03 LTS&scenario=edge_img',
                },
                {
                  NAME: '云计算',
                  PATH: '/download/?version=openEuler 24.03 LTS&scenario=virtual_machine_img',
                },
                {
                  NAME: '嵌入式',
                  PATH: '/download/?version=openEuler 24.03 LTS&scenario=embedded_img',
                },
              ],
            },
            {
              NAME: 'openEuler 24.09',
              ADD_TITLE: true,
              LABEL:
                'openEuler 24.09 是基于6.6内核的创新版本，面向服务器、云、边缘计算、AI和嵌入式场景，提供更多新特性和功能，给开发者和用户带来更新的体验。',
              PATH: '/download/?version=openEuler 24.09',
              CHILDREN: [
                {
                  NAME: '服务器',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 24.09&scenario=ISO',
                },
                {
                  NAME: '边缘计算',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 24.09&scenario=edge_img',
                },
                {
                  NAME: '云计算',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 24.09&scenario=virtual_machine_img',
                },
                {
                  NAME: '嵌入式',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 24.09&scenario=embedded_img',
                },
              ],
            },
          ],
        },
        {
          NAME: '其他版本',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '社区发行版',
              PATH: '/download/archive/',
            },
            {
              NAME: '商业发行版',
              PATH: '/download/commercial-release/',
            },
          ],
        },
        {
          NAME: '下载服务',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '镜像仓列表',
              PATH: '/mirror/list/',
            },
          ],
        },
      ],
    },
  ],
  LANG: '中文',
  LANG_LIST: ['中文', 'English', 'Русский'],
  USER_CENTER: '个人中心',
  MESSAGE_CENTER: '消息中心',
  LOGOUT: '退出登录',
  PLEASE: '请先',
  LOGIN: '登录',
  GITTE: '源码',
  CODE: '代码',
  FOOTER: {
    ATOM_TEXT:
      'openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源项目',
    ATOM_PC: '/atom-pc.png',
    ATOM_MO: '/atom-mo.png',
    MAIL: 'contact@openeuler.io',
    COPY_RIGHT: '版权所有 © 2025 openEuler 保留一切权利',
    LICENSED_1: '遵循',
    LICENSED_2: '木兰宽松许可证第2版（MulanPSL2）',
    RIGHT_LIST: [
      {
        NAME: '品牌',
        URL: '/other/brand/',
      },
      {
        NAME: '隐私政策',
        URL: '/other/privacy/',
      },
      {
        NAME: '法律声明',
        URL: '/other/legal/',
      },
      {
        NAME: '关于cookies',
        URL: '/other/cookies/',
      },
    ],
    LINKS: [],
    QR_CODE: 'openEuler公众号',
    QR_ASSISTANT: 'openEuler小助手',
  },
  BUILDING: {
    BUILDING: '建设中',
    BUILDINGMES: '敬请期待...',
  },
  SEARCH: {
    BROWSEHISTORY: '历史记录',
    CLEAN: '清除',
    TOPSEARCH: '热门搜索',
    CHANGE: '换一批',
    PLEACHOLDER: '请输入内容',
    PLEACHOLDER_EXTEND: '请输入内容',
  },
  PREV: '上一页',
  NEXT: '下一页',
  EXPAND: '展开',
  RETRACT: '收起',
};

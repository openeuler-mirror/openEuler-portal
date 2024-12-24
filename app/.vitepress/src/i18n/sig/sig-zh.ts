export default {
  GUIDANCE_LIST: {
    GUIDE: {
      MOBILE_TITLE: 'SIG申请流程',
      TITLE: '申请流程',
      LINE_CONTENT: [
        {
          LEFT: {
            LEFT_INFO:
              '个人或公司在openEuler社区中寻找2 - 3个具有共同目标的人讨论决定成立SIG组，维护openEuler社区中的某一个技术方向软件包或发起孵化项目。',
            LEFT_CIRCLE: '寻人',
            LEFT_IMG: '/img/sig/sig1.png',
          },
          RIGHT: {
            RIGHT_INFO:
              "按照成立 SIG 组的<a target='_blank' href='https://gitee.com/openeuler/community/blob/master/zh/technical-committee/governance/README.md'>成立流程</a>，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。",
            RIGHT_CIRCLE: '申请',
            LEFT_IMG: '/img/sig/sig2.png',
          },
        },
        {
          LEFT: {
            LEFT_INFO:
              '在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致。',
            LEFT_CIRCLE: '沟通',
            LEFT_IMG: '/img/sig/sig3.png',
          },
          RIGHT: {
            RIGHT_INFO:
              '技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库。',
            RIGHT_CIRCLE: '获批',
            LEFT_IMG: '/img/sig/sig4.png',
          },
        },
        {
          LEFT: {
            LEFT_INFO:
              'SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作。',
            LEFT_CIRCLE: '运作',
            LEFT_IMG: '/img/sig/sig5.png',
          },
          RIGHT: {
            RIGHT_INFO: '技术委员会周期 Review SIG 的运作情况，给出指导意见。',
            RIGHT_CIRCLE: '改进',
            LEFT_IMG: '/img/sig/sig6.png',
          },
        },
      ],
    },
  },
  SIG_ALL: '全部',
  SIG_LIST: {
    HOME_PAGE: '前往gitee首页',
    SIG: 'SIG',
    REPOSITORY: '仓库名称',
    MAINTAINER: 'Maintainer',
    MAIL: '邮件',
    IRC: 'IRC频道',
    MANAGER: '管理员',
    NAME: 'SIG名称',
    GITEE_PAGE: 'Gitee主页',
    TIPS: '注：仓库Committer请点击SIG名称，在仓库列表查询',
  },
  SIG_DESCRIPTION: {
    MEANING:
      'SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织，以便于更好的管理和改善工作流程。SIG 组均是开放的，欢迎任何人来参与。',
    P1: 'SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织，以便于更好的管理和改善工作流程。',
    P2: 'SIG 组均是开放的，欢迎任何人来参与。',
    LI1: '每一个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个Repository，SIG的交付成果会保存在这些Repository内。您可以在SIG对应的Repository内提交Issue、针对特定问题参与讨论，提交和解决问题，参与评审等。',
    LI2: 'SIG都是针对特定的一个或多个技术主题而成立的。SIG的核心成员主导SIG的治理，SIG内的成员推动交付成果输出，并争取让交付成果成为openEuler社区发行的一部分。',
    LI3: '在SIG团队项目的gitee首页README.md文件中，可以找到该项目所属的SIG信息、交流方式、成员和联系方式等，欢迎通过邮件列表、公开例会及对应的README.md 文件中提到的联系方式积极参与进SIG内的交流。',
  },
  SIG_LANDSCAPE: [
    {
      CATEGORY_NAME: '代码仓管理/技术创新',
      SUB_LIST: [
        {
          SUB_CATEGORY_NAME: '行业解决方案/应用',
          COLOR: '#7f6ffe',
          LIST: [
            {
              NAME: 'sig-bio',
            },
            {
              NAME: 'sig-ROS',
            },
            {
              NAME: 'sig-android-middleware',
            },
            {
              NAME: 'Application',
            },
            {
              NAME: 'sig-industrial-control',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '通用中间组件',
          COLOR: '#db7c61',
          LIST: [
            {
              NAME: 'sig-embedded',
            },
            {
              NAME: 'sig-OpenResty',
            },
            {
              NAME: 'sig-cms',
            },
            {
              NAME: 'DB',
            },
            {
              NAME: 'sig-Ha',
            },
            {
              NAME: 'sig-ai-bigdata',
            },
            {
              NAME: 'sig-compat-winapp',
            },
            {
              NAME: 'sig-ceph',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '工具链/语言/运行',
          COLOR: '#505d75',
          LIST: [
            {
              NAME: 'sig-Rust',
            },
            {
              NAME: 'sig-perl-modules',
            },
            {
              NAME: 'sig-python-modules',
            },
            {
              NAME: 'sig-Java',
            },
            {
              NAME: 'sig-nodejs',
            },
            {
              NAME: 'dev-utils',
            },
            {
              NAME: 'Runtime',
            },
            {
              NAME: 'sig-libboundscheck',
            },
            {
              NAME: 'System-tool',
            },
            {
              NAME: 'sig-golang',
            },
            {
              NAME: 'sig-ruby',
            },
            {
              NAME: 'Compiler',
            },
            {
              NAME: 'Programming-language',
              IS_WIDER: 1,
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '架构/处理器/内核/驱动',
          COLOR: '#fec456',
          LIST: [
            {
              NAME: 'sig-SBC',
            },
            {
              NAME: 'sig-RISC-V',
            },
            {
              NAME: 'sig-aarch32',
            },
            {
              NAME: 'Kernel',
            },
            {
              NAME: 'sig-WayCa',
            },
            {
              NAME: 'sig-DyscheOS',
            },
            {
              NAME: 'sig-REDF',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '云原生基础设施',
          COLOR: '#4d7dff',
          LIST: [
            {
              NAME: 'sig-CloudNative',
            },
            {
              NAME: 'sig-ONL',
            },
            {
              NAME: 'sig-openstack',
            },
            {
              NAME: 'sig-OKD',
            },
            {
              NAME: 'Virt',
            },
            {
              NAME: 'iSulad',
            },
            {
              NAME: 'oVirt',
            },
            {
              NAME: 'sig-KubeSphere',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '桌面/图形系统',
          COLOR: '#8e9aaf',
          LIST: [
            {
              NAME: 'sig-mate-desktop',
            },
            {
              NAME: 'sig-desktop-apps',
            },
            {
              NAME: 'Desktop',
            },
            {
              NAME: 'GNOME',
            },
            {
              NAME: 'sig-KDE',
            },
            {
              NAME: 'xfce',
            },
            {
              NAME: 'sig-DDE',
            },
            {
              NAME: 'sig-UKUI',
            },
            {
              NAME: 'sig-KIRAN-DESKTOP',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '基础功能/特性/工具',
          COLOR: '#2a9d8f',
          LIST: [
            {
              NAME: 'A-Tune',
            },
            {
              NAME: 'Storage',
            },
            {
              NAME: 'Base-service',
            },
            {
              NAME: 'Computing',
            },
            {
              NAME: 'sig-ops',
            },
            {
              NAME: 'sig-bootstrap',
            },
            {
              NAME: 'Networking',
            },
            {
              NAME: 'sig-security-facility',
            },
            {
              NAME: 'sig-high-performance-network',
              IS_WIDER: 1,
            },
            {
              NAME: 'sig-confidential-computing',
              IS_WIDER: 1,
            },
          ],
        },
      ],
    },
    {
      CATEGORY_NAME: '社区治理运营',
      SUB_LIST: [
        {
          SUB_CATEGORY_NAME: '社区生态进展',
          COLOR: '#8e583d',
          LIST: [
            {
              NAME: 'Marketing',
            },
            {
              NAME: 'sig-minzuchess',
            },
            {
              NAME: 'sig-Compatibility-Infra',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '版本发行相关',
          COLOR: '#cec79a',
          LIST: [
            {
              NAME: 'sig-QA',
            },
            {
              NAME: 'doc',
            },
            {
              NAME: 'sig-release-management',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '构建系统/工具/依赖',
          COLOR: '#19647e',
          LIST: [
            {
              NAME: 'sig-OS-Builder',
            },
            {
              NAME: 'sig-Ostree-Assembly',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '安全委员会/技术委员会/社区秘书处',
          COLOR: '#73c0de',
          LIST: [
            {
              NAME: 'TC',
            },
            {
              NAME: 'sig-Community',
            },
            {
              NAME: 'security-committee',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '软件包管理相关',
          COLOR: '#4c3e72',
          LIST: [
            {
              NAME: 'Packaging',
            },
            {
              NAME: 'sig-recycle',
            },
            {
              NAME: 'sig-EasyLife',
            },
          ],
        },
        {
          SUB_CATEGORY_NAME: '社区基础设施',
          COLOR: '#c44e4e',
          LIST: [
            {
              NAME: 'Infrastructure',
            },
            {
              NAME: 'sig-CICD',
            },
            {
              NAME: 'sig-Gatekeeper',
            },
            {
              NAME: 'security-committee',
            },
          ],
        },
      ],
    },
  ],
  SIG_DETAIL: {
    VIDEO: '视频',
    NEWS: '新闻',
    MORE: '更多',
    BLOG: '博客',
    LATEST_DYNAMIC: '最新动态',
    SIG_EMPTY_TEXT1: '这里空空如也，快给你的SIG',
    SIG_EMPTY_TEXT2: '添加简介',
    SIG_EMPTY_TEXT3: '吧!',
    INTRODUCTION: '简介',
    NO_MEETINGS: '暂无会议',
    ORGANIZING_MEETINGS: '交流会议',
    SIG_GROUP: 'SIG组',
    LEARN_MORE: '了解更多',
    LATEST_MEETING: '最近会议',
    WONDERFUL_REVIEW: '精彩回顾',
    EMPTY_TEXT: '最近没有会议，敬请期待',
    MEMBERS: 'SIG成员',
    MAINTAINER: '核心成员',
    MAINTAINER_EN: 'Maintainer',
    REPOSITORY_LIST: '仓库列表',
    REPOSITORY_LIST_BG: 'REPOSITORIES',
    REPOSITORY_NAME: '仓库名称',
    CONTACT: '联系方式',
    COMMUNICATION_INFO: '交流信息',
    MAIL_LIST: '邮件列表',
    MEETING_TITLE: 'SIG会议',
    MEETING_SUMMARY: '查看历史会议纪要',
    EXPAND: '展开全部',
    RETRACT: '收起全部',
    BLOG_EMPTY1: '我看你骨骼惊奇，必是写文好手。这里有一本',
    BLOG_EMPTY2: '发博客攻略',
    BLOG_EMPTY3: '，赶紧拿回去看看吧。',
    NEWS_EMPTY: '不想当裁缝的厨子不是好司机，不发新闻的博客不是好视频。',
    NEWS_EMPTY2: '',
    NEWS_EMPTY3: '点击',
    NEWS_EMPTY4: '发送SIG的第一篇新闻。',
    VIDEO_EMPTY: '我都把最好的位置留给你啦，你愿意投递一个视频吗？',
    CONTRIBUTION: '贡献展示',
    USER_CONTRIBUTOR: '个人会员贡献',
    METRIC: '度量指标',
    TIMERANGE: '统计周期',
    PRS: '合并请求 PR',
    ISSUES: '需求&问题 Issue',
    COMMENTS: '评审 Comment',
    LAST_ONE_MONTH: '最近一个月内',
    LAST_HALF_YEAR: '最近半年内',
    LAST_YEAR: '最近一年内',
    ALL: '全部',
    ENTER_GITEE: '请输入Gitee ID搜索',
    NUMBER: '序号',
  },
  ROLE_DESCRIPTION: {
    ROLE_DESCRIPTION: '角色说明',
    TABLE_TITLE: '社区成员',
    TABLE_DESCRIPTION:
      '本文简要描述了openEuler社区中贡献者角色的各种职责。大部分角色的职责限于这些SIG(Special Interest Group)内：',
    TABLE_THEAD: ['角色', '职责范围（简要描述）', '要求', '定义的文件'],
    TABLE_TBODY: [
      {
        ROLE: 'Contributor',
        RESPONSIBILITIES: '项目的贡献者',
        REQUIREMENT: '',
        DEFINED_DOCUMENT: 'Gitee注册成员',
      },
      {
        ROLE: 'Committer',
        RESPONSIBILITIES: '审核其他成员的贡献',
        REQUIREMENT: 'SIG的积极贡献者，经验丰富，愿意投入精力参与到审核工作',
        DEFINED_DOCUMENT:
          'openEuler SIG拥有的存储库中OWNERS文件中的Committer条目。',
      },
      {
        ROLE: 'Maintainer',
        RESPONSIBILITIES: '项目Owner',
        REQUIREMENT: '经验丰富，富有责任心、出色的技术能力和管理能力',
        DEFINED_DOCUMENT:
          'openEuler SIG拥有的存储库中OWNERS文件中的Maintainer条目。',
      },
    ],
  },
  SIG_CENTER: 'SIG中心',
  SIG_CENTER_LIST: [
    {
      NAME: 'SIG申请流程',
      PATH: '/sig/sig-guidance/',
    },
    {
      NAME: 'SIG角色说明',
      PATH: '/sig/role-description/',
    },
    {
      NAME: 'SIG会议指南',
      PATH: '/sig/meeting-guide/',
    },
  ],
};

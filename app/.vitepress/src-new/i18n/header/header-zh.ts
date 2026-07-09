import { markRaw } from 'vue';

import Summit from '~@/assets/category/header/summit.jpg';
import SummitDark from '~@/assets/category/header/summit-dark.jpg';

import Odd from '~@/assets/category/header/odd.jpg';

import IconOutLink from '~icons/app/icon-out-link.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const TAG_TYPE = {
  HOT: 'HOT',
  NEW: 'NEW',
};

const OutLink = markRaw(IconOutLink);

export default {
  NAV_ROUTER: [
    {
      label: '下载',
      id: 'download',
      children: [
        {
          label: '获取openEuler',
          children: [
            {
              label: 'openEuler 24.03 LTS SP4',
              description:
                'openEuler 24.03 LTS SP4是基于6.6内核的24.03-LTS版本增强扩展版本，面向服务器、云、AI场景，持续提供更多新特性和功能扩展，包括内核优化、灵衢超节点可靠性&易用性、NPU算力切分、推理服务快恢、E2B沙箱、智能诊断&调优&运维、编译器、机密虚机等，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
              tag: TAG_TYPE.NEW,
              href: '/zh/download/#openEuler 24.03 LTS SP4',
            },
            {
              label: 'openEuler 24.03 LTS SP3',
              description:
                'openEuler首个支持超节点的版本正式发布。新版本openEuler 24.03 LTS SP3是基于6.6内核的24.03-LTS版本增强扩展版本，面向服务器、云、AI场景，持续提供更多新特性和功能扩展，包括内核优化、异构协同推理、智能诊断、机密虚机、编译器、RISC-V架构优化、智能开发者桌面、安全加固、灵衢超节点、身份认证、虚拟化等，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
              tag: null,
              href: '/zh/download/#openEuler 24.03 LTS SP3',
            },
            {
              label: 'openEuler 24.03 LTS SP1',
              description:
                '基于6.6内核的24.03 LTS版本增强扩展版本，面向服务器、云、边缘计算和嵌入式场景，持续提供更多新特性和功能扩展，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
              tag: null,
              href: '/zh/download/#openEuler 24.03 LTS SP1',
            },
            {
              label: '其他获取方式',
              description: '通过公有云、容器镜像等方式获取openEuler版本',
              tag: null,
              href: '/zh/download/#get-openeuler',
            },
          ],
        },
        {
          label: '其他版本',
          children: [
            {
              label: '商业发行版',
              description:
                '基于openEuler发布的商业发行版。x86、AArch、LoongArch、sw 、RISC-V',
              href: '/zh/download/commercial-release/',
            },
          ],
        },
        {
          label: '获取其他资源',
          children: [
            {
              label: '软件中心',
              description: '查询openEuler社区软件包',
              href: `${import.meta.env.VITE_SERVICE_SOFTWARE_URL}/zh`,
            },
            {
              label: '镜像仓列表',
              description: '查询openEuler所有镜像站点',
              href: '/zh/mirror/list/',
            },
            {
              label: 'Repo源',
              description: '提供openEuler社区版本的repo文件',
              href: 'https://repo.openeuler.openatom.cn/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: '查询所有版本',
          href: '/zh/download?archive=true',
        },
        {
          label: '版本生命周期',
          href: '/zh/other/lifecycle/',
          isBlank: true,
        },
        {
          label: '24.03 LTS SP3安装指南',
          href: `${
            import.meta.env.VITE_SERVICE_DOCS_URL
          }/zh/docs/24.03_LTS_SP4/server/installation_upgrade/installation/installation_preparations.html`,
        },
        {
          label: '25.09安装指南',
          href: `${
            import.meta.env.VITE_SERVICE_DOCS_URL
          }/zh/docs/25.09/server/installation_upgrade/installation/installation_preparations.html`,
        },
        {
          label: '技术白皮书',
          href: '/zh/showcase/technical-white-paper/',
        },
      ],
    },
    {
      label: '开发',
      id: 'development',
      children: [
        {
          label: '贡献',
          children: [
            {
              label: 'SIG中心',
              description: '查询openEuler社区SIG组',
              href: '/zh/sig/sig-list/',
            },
            {
              label: 'CLA签署',
              description: '参与贡献前，需签署贡献者许可协议（CLA）',
              href: 'https://clasign.osinfra.cn/sign/6983225bdcbb19710248ccf0',
              icon: OutLink,
            },
            {
              label: '贡献攻略',
              description: '参与社区贡献的方式',
              href: '/zh/community/contribution/',
            },
            {
              label: 'oEEP',
              description: '查看openEuler社区的演进提案',
              href: '/zh/oEEP/?name=oEEP-0000 oEEP  索引',
            },
          ],
        },
        {
          label: '构建',
          children: [
            {
              label: 'EulerMaker',
              description: '开放式统一构建服务',
              href: 'https://eulermaker.openeuler.openatom.cn/',
              analyticsName: 'eulermaker',
            },
            {
              label: '用户软件仓(EUR)',
              description: '开发者易用的软件包托管分发平台',
              href: 'https://eur.openeuler.openatom.cn/coprs/',
            },
            {
              label: '软件包贡献',
              description: '简单高效地贡献软件包',
              href: `${
                import.meta.env.VITE_SERVICE_SOFTWARE_PKG_URL
              }/zh/package`,
            },
            {
              label: 'License工具门户',
              description: '检测License权利、义务、限制',
              href: import.meta.env.VITE_SERVICE_COMPLIANCE_URL,
              icon: OutLink,
              analyticsName: 'license',
            },
          ],
        },
        {
          label: '发布',
          children: [
            {
              label: 'EulerPublisher',
              description: 'openEuler云原生发布工具',
              href: 'https://atomgit.com/openeuler/eulerpublisher',
              icon: OutLink,
            },
            {
              label: 'EulerLauncher',
              description: '跨平台openEuler虚拟机管理工具',
              href: 'https://atomgit.com/openeuler/eulerlauncher',
              icon: OutLink,
            },
            {
              label: 'OEPKGS',
              description: 'OEPKGS软件托管平台',
              href: 'https://oepkgs.net/zh-CN',
              icon: OutLink,
            },
          ],
        },
        {
          label: '分析',
          children: [
            {
              label: 'oecp',
              description: '操作系统差异比较分析工具',
              href: 'https://atomgit.com/openeuler/oecp',
              icon: OutLink,
            },
            {
              label: 'Pkgship',
              description: '管理操作系统软件包信息和依赖项的查询工具',
              href: import.meta.env.VITE_SERVICE_PKGMANAGE_URL,
              analyticsName: 'pkgship',
            },
          ],
        },
        {
          label: '项目',
          children: [
            {
              label: 'A-Tune',
              description: '基于AI开发的智能优化引擎',
              href: '/zh/other/projects/atune/',
            },
            {
              label: 'iSula',
              description: '容器技术方案',
              href: '/zh/other/projects/isula/',
            },
            {
              label: 'secGear',
              description: '开发安全应用的机密计算框架',
              href: '/zh/other/projects/secgear/',
            },
            {
              label: 'NestOS',
              description: '基于欧拉开源操作系统的云底座操作系统',
              href: '/zh/nestos',
            },
            {
              label: '全部项目',
              description: '',
              href: '/zh/projects',
              icon: IconChevronRight,
            },
          ],
        },
      ],
      shortcut: [
        {
          label: '企业签署CLA流程',
          href: '/zh/blog/2022-11-25-cla/CLA%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B.html',
        },
        {
          label: 'CLA-FAQ',
          icon: OutLink,
          href: 'https://atomgit.com/openeuler/infrastructure/blob/master/docs/cla-guide/faq/faq.md',
        },
        {
          label: '开发者日历',
          href: '/zh/meeting/#calendar',
        }
      ],
    },
    {
      label: '文档',
      id: 'document',
      children: [
        {
          label: '文档',
          children: [
            {
              label: '文档中心',
              description: '提供各业务场景及工具使用所需的文档手册',
              tag: TAG_TYPE.HOT,
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/`,
            },
            {
              label: '新手入门',
              description: '10分钟玩转社区，快速构建与成长',
              tag: TAG_TYPE.HOT,
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/docs/24.03_LTS_SP3/server/quickstart/quickstart/quick_start.html`,
            },
            {
              label: '安装指南',
              description: '指导用户顺利完成 openEuler 操作系统安装',
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/docs/24.03_LTS_SP3/server/installation_upgrade/installation/installation_preparations.html`,
            },
            {
              label: '常见问题',
              description: '常见问题解决方法',
              href: `${
                import.meta.env.VITE_SERVICE_DOCS_URL
              }/zh/docs/common/faq/general/general_faq.html`,
            },
            {
              label: '文档开发指南',
              description: '参与文档开发的方式',
              href: `${
                import.meta.env.VITE_SERVICE_DOCS_URL
              }/zh/docs/common/contribute/directory_structure_introductory.html`,
            },
          ],
        },
      ],
      shortcut: [],
    },
    {
      label: '学习',
      id: 'learn',
      children: [
        {
          label: '课程',
          children: [
            {
              label: '课程中心',
              description: '汇聚openEuler各类课程资源',
              href: '/zh/learn/mooc/',
            },
          ],
        },
        {
          label: '开发者成长',
          children: [
            {
              label: '高校',
              description: '了解高校技术小组与实习赛事资讯',
              href: '/zh/universities/',
            },
            {
              label: '人才培养',
              description: '帮助企业快速培养openEuler专业生态人才',
              href: '/zh/talent-assessment/',
            },
            {
              label: '开源实习',
              description:
                '帮助在校学生在项目实践中提升能力，成为优秀的开源人才',
              href: '/zh/internship/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: '学习HCIA-openEuler 认证培训课程',
          href: '/zh/learn/mooc/detail/',
        },
        {
          label: 'openEuler精品课程',
          href: 'https://c0605e03bb6b40dca9cd34ab5b3fb1f8.shixizhi.huawei.com/portal/1643780836745113602?pageId=1644269448177651714&activeIndex=-1&sxz-lang=zh_CN',
          icon: OutLink,
        },
        {
          label: '学习openEuler安全知识',
          href: 'https://space.bilibili.com/527064077/lists/2726214',
          icon: OutLink,
        },
        {
          label: '从入门到精通-openEuler操作系统迁移专题',
          href: 'https://c0605e03bb6b40dca9cd34ab5b3fb1f8.shixizhi.huawei.com/community/community.htm?communityId=1748285175854272513&schoolId=1643780836745113602&activeIndex=-1&subIndex=undefined&subIndex=undefined&sxz-lang=zh_CN',
        },
        {
          label: '活动与大赛',
          href: '/zh/universities/#%E6%B4%BB%E5%8A%A8%E4%B8%8E%E5%A4%A7%E8%B5%9B',
        },
        {
          label: '高校技术小组',
          href: '/zh/universities/#%E9%AB%98%E6%A0%A1%E6%8A%80%E6%9C%AF%E5%B0%8F%E7%BB%84',
        },
      ],
    },
    {
      label: '支持',
      id: 'approve',
      children: [
        {
          label: '兼容性专区',
          children: [
            {
              label: '兼容性列表',
              description: '查看openEuler兼容性列表',
              href: '/zh/compatibility/',
            },
            {
              label: '兼容性技术测评',
              description: '帮助企业快速申请兼容性技术测评',
              href: `${import.meta.env.VITE_SERVICE_CERTIFICATION_URL}/#/`,
            },
            {
              label: 'OSV技术测评',
              description: '查看OSV技术测评结果',
              href: '/zh/approve/',
            },
          ],
        },
        {
          label: '迁移与运维',
          children: [
            {
              label: '迁移专区',
              description: '进行操作系统迁移的指南文档',
              href: '/zh/migration/',
            },
            {
              label: '运维专区',
              description: 'openEuler运维全集和工具',
              href: '/zh/om/',
            },
          ],
        },
        {
          label: '安全公告',
          children: [
            {
              label: '安全中心',
              description: '查看漏洞管理、安全公告等安全问题',
              href: '/zh/security/security-bulletins/',
            },
            {
              label: '缺陷中心',
              description: '查看缺陷相关安全问题',
              href: '/zh/security/bug-bulletins/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'openEuler 硬件兼容性测试整体介绍',
          href: '/zh/compatibility/hardware/',
        },
        {
          label: 'OSV技术测评整体介绍',
          href: '/zh/approve/approve-step/',
        },
        {
          label: '迁移工具x2openEuler',
          href: '/zh/migration/download/',
        },
        {
          label: '迁移实践',
          href: '/zh/migration/user-cases/',
        },
        {
          label: 'FAQ',
          href: '/zh/faq/',
        },
      ],
    },
    {
      label: '社区',
      id: 'community',
      children: [
        {
          label: '关于社区',
          children: [
            {
              label: '组织架构',
              description: '了解openEuler的委员会成员',
              href: '/zh/community/organization/',
            },
            {
              label: '社区章程',
              description: '了解openEuler的章程、条例、行为准则、License策略',
              href: '/zh/community/charter/',
            },
            {
              label: '成员单位',
              description: '了解openEuler的捐赠单位',
              href: '/zh/community/member/',
            },
            {
              label: '社区荣誉',
              description: '了解openEuler的荣誉奖项',
              href: '/zh/community/honor/',
            },
            {
              label: '城市用户组',
              description: '区域用户交流圈',
              href: '/zh/community/user-group/',
            },
            {
              label: '贡献看板',
              description: '查看openEuler社区数据',
              href: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/zh/overview`,
            },
            {
              label: '联系我们',
              description: '社区联系方式',
              href: '/zh/contact-us/',
            },
            {
              label: '用户案例',
              description: '了解openEuler在各行业的最佳案例',
              href: '/zh/showcase/',
            },
            {
              label: '白皮书',
              description:
                '了解openEuler各版本的技术详情及在行业的生态现状、业务场景的应用',
              href: '/zh/showcase/technical-white-paper/',
            },
            {
              label: '市场研究报告',
              description: '了解openEuler在行业的市场研究情况',
              href: '/zh/showcase/market-report/',
            },
          ],
        },
        {
          label: '社区交流',
          children: [
            {
              label: '论坛',
              description: '与开发者讨论openEuler',
              href: `${import.meta.env.VITE_SERVICE_FORUM_URL}/?locale=zh_CN`,
            },
            {
              label: '邮件列表',
              description: '订阅邮件列表，与SIG成员讨论openEuler的技术与进展',
              href: '/zh/community/mailing-list/',
            },
            {
              label: '线上会议',
              description: '查询并参与SIG组例会',
              href: '/zh/meeting/',
            },
            {
              label: 'QuickIssue',
              description: '简易快捷地查询、提交社区Issues',
              href: `${import.meta.env.VITE_SERVICE_QUICKISSUE_URL}/zh/issues/`,
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'openEuler社区介绍PDF',
          href: `${
            import.meta.env.VITE_MAIN_DOMAIN_URL
          }/whitepaper/openEuler %E5%BC%80%E6%BA%90%E7%A4%BE%E5%8C%BA%E4%BB%8B%E7%BB%8D.pdf`,
        },
        {
          label: '《Linux Magazine》权威解读：openEuler 焦点指南',
          href: `${
            import.meta.env.VITE_MAIN_DOMAIN_URL
          }/category/technology/Linux Magazine Focus Guide-openEuler.pdf`,
        },
      ],
    },
    {
      label: '动态',
      id: 'update',
      withPicture: true,
      children: [
        {
          label: '活动',
          children: [
            {
              label: '活动日历',
              description: '了解openEuler社区全年活动',
              href: '/zh/interaction/event-list/',
            },
            {
              label: '峰会',
              description: '查看openEuler年度大会详情',
              href: '/zh/interaction/summit-list/devday2026/',
            },
            {
              label: 'openEuler Call for X计划',
              description: '共享openEuler Call for X计划多元化资源',
              href: '/zh/community/program/',
            },
          ],
        },
        {
          label: '资讯',
          children: [
            {
              label: '新闻',
              description: '查看openEuler社区动态',
              href: '/zh/interaction/news-list/',
            },
            {
              label: '博客',
              description: '查看openEuler技术文章分享',
              href: '/zh/interaction/blog-list/',
            },
            {
              label: '月刊与年报',
              description: '查看openEuler社区运作报告',
              href: '/zh/monthly-bulletins/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'openEuler Developer Day 2026',
          picture: Odd,
          description:
            'openEuler Developer Day 2026 （简称 ODD 2026）是开放原子开源基金会孵化及运营的 openEuler 社区发起的开发者大会。',
          remark: '时间：2026/04/25 | 长沙',
          type: 'PICTURE',
          href: '/zh/interaction/summit-list/devday2026/',
        },
        {
          label: '操作系统大会 & openEuler Summit 2025',
          picture: Summit,
          picturePark: SummitDark,
          description:
            '随着AI技术从技术探索迈向场景深耕，操作系统作为AI核心生产力的使能平台，承担着释放大规模AI算力的重要责任。openEuler 开源六年，在商业、技术及生态上全面发展，覆盖服务器、云原生、边缘计算和嵌入式等全场景，服务全球多个国家和地区，在关键行业实现规模化应用，引领基础软件根技术持续创新。',
          remark: '时间：2025/11/14 - 2025/11/15 | 北京',
          type: 'PICTURE',
          href: '/zh/interaction/summit-list/summit2025/',
        },
      ],
    },
  ],
  USER_CENTER: '个人中心',
  MESSAGE_CENTER: '消息中心',
  LOGOUT: '退出登录',
  CODE: '源码',
  QUICKLINK: '快捷链接',
  SEARCH: {
    BROWSEHISTORY: '历史记录',
    CLEAN: '清除',
    TOPSEARCH: '热门搜索',
    CHANGE: '换一批',
    ONESTEP: '导航搜索直达',
    SUGGEST: '搜索建议',
    NO_DATA: '暂无数据',
    PLEACHOLDER: '搜索',
    PLEACHOLDER_EXTEND: '按下回车立即搜索，或补充更多信息进行搜索',
    PLEACHOLDER_IMAGE: '输入文字搜索，支持粘贴或上传报错截图',
    UPLOAD_TOOLTIP: '报错截图搜索，支持jpg、png、jpeg等，最大10M',
    UPLOAD_FAILED: '图片上传失败，请检查网络后重试',
    TEXT: '搜索',
  },
  SOURCE_CODE: '源码',
  CODE_REPOSITORY: '代码仓',
  SOFTWARE_REPOSITORY: '软件包仓',
  GITHUB_MIRROR: 'Github镜像仓',
  LFS_FILE_MANAGEMENT: 'LFS文件管理',
};

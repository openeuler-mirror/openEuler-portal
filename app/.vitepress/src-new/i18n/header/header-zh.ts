import { markRaw } from 'vue';

import Summit from '~@/assets/category/header/summit.png';
import Odd from '~@/assets/category/header/odd.png';
import Report from '~@/assets/category/header/report.png';
import annualReport2024 from '~@/assets/category/header/annual-report-2024.jpg';

import IconOutLink from '~icons/app/icon-out-link.svg';
import IconArrowRight from '~icons/app-new/icon-header-next.svg';

const TAG_TYPE = {
  HOT: 'HOT',
  NEW: 'NEW',
};

const OutLink = markRaw(IconOutLink);
const ArrowRight = markRaw(IconArrowRight);

export default {
  NAV_ROUTER: [
    {
      NAME: '下载',
      ID: 'download',
      CHILDREN: [
        {
          NAME: '社区发行版',
          CHILDREN: [
            {
              NAME: 'openEuler 24.03 LTS SP1',
              DESCRIPTION:
                'openEuler 24.03 LTS SP1 是基于6.6内核的24.03 LTS版本增强扩展版本，面向服务器、云、边缘计算和嵌入式场景，持续提供更多新特性和功能扩展，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#openEuler 24.03 LTS SP1',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: '服务器',
                  URL: '/download/?scenario=ISO#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: '边缘计算',
                  URL: '/download/?scenario=edge_img#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: '云计算',
                  URL: '/download/?scenario=virtual_machine_img#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: '嵌入式',
                  URL: '/download/?scenario=embedded_img#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: 'DevStation',
                  URL: '/download/?scenario=DevStation#openEuler 24.03 LTS SP1',
                },
              ],
            },
            {
              NAME: 'openEuler 24.09',
              DESCRIPTION:
                'openEuler 24.09 是基于Linux 6.6内核的创新版本，面向服务器、云、边缘计算和嵌入式场景，提供更多新特性和功能',
              TAG: null,
              URL: '/download/#openEuler 24.09',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: '服务器',
                  URL: '/download/?scenario=ISO#openEuler 24.09',
                },
                {
                  NAME: '边缘计算',
                  URL: '/download/?scenario=edge_img#openEuler 24.09',
                },
                {
                  NAME: '云计算',
                  URL: '/download/?scenario=virtual_machine_img#openEuler 24.09',
                },
                {
                  NAME: '嵌入式',
                  URL: '/download/?scenario=embedded_img#openEuler 24.09',
                },
                {
                  NAME: 'DevStation',
                  URL: '/download/?scenario=DevStation#openEuler 24.09',
                },
              ],
            },
            {
              NAME: 'openEuler 22.03 LTS SP4',
              DESCRIPTION:
                'openEuler 22.03 LTS SP4 是openEuler 22.03 LTS的补丁版本，生命周期与LTS版本相同',
              TAG: null,
              URL: '/download/#openEuler 22.03 LTS SP4',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: '服务器',
                  URL: '/download/?scenario=ISO#openEuler 22.03 LTS SP4',
                },
                {
                  NAME: '边缘计算',
                  URL: '/download/?scenario=edge_img#openEuler 22.03 LTS SP4',
                },
                {
                  NAME: '云计算',
                  URL: '/download/?scenario=virtual_machine_img#openEuler 22.03 LTS SP4',
                },
                {
                  NAME: '嵌入式',
                  URL: '/download/?scenario=embedded_img#openEuler 22.03 LTS SP4',
                },
              ],
            },
          ],
          SHORTCUT: [
            {
              NAME: '技术白皮书',
              URL: '/showcase/technical-white-paper/',
            },
            {
              NAME: '24.03 LTS SP1安装指南',
              URL: 'https://docs.openeuler.org/zh/docs/24.03_LTS_SP1/docs/Installation/installation.html',
            },
            {
              NAME: '24.09安装指南',
              URL: 'https://docs.openeuler.org/zh/docs/24.09/docs/Installation/installation.html',
            },
            {
              NAME: '版本生命周期',
              URL: '/other/lifecycle/',
            },
            {
              NAME: '查询所有版本',
              URL: '/download?archive=true',
            },
          ],
          EXTRAS: [
            {
              NAME: '其他获取方式',
              URL: '/download/#get-openeuler',
              ICON: ArrowRight,
              CHILDREN: [
                {
                  NAME: '公有云',
                  DESCRIPTION: 'openEuler官方镜像在以下主流平台正式发布',
                  URL: '/download/#cloud',
                },
                {
                  NAME: '容器镜像',
                  DESCRIPTION: 'openEuler提供官方容器镜像',
                  URL: '/download/#container',
                },
                {
                  NAME: 'Windows',
                  DESCRIPTION: '在Windows上运行openEuler',
                  URL: '/download/#windows',
                },
                {
                  NAME: 'MacOS',
                  DESCRIPTION: '在MacOS上运行openEuler',
                  URL: '/download/#macos',
                },
                {
                  NAME: '虚拟化',
                  DESCRIPTION: '在虚拟机上运行openEuler',
                  URL: '/download/#virtualization',
                },
                {
                  NAME: '树莓派',
                  DESCRIPTION: '在树莓派上安装openEuler',
                  URL: '/download/#raspberrypi',
                },
              ],
            },
          ],
        },
        {
          NAME: '其他版本',
          CHILDREN: [
            {
              NAME: '商业发行版',
              DESCRIPTION:
                '基于openEuler发布的商业发行版。x86、AArch、LoongArch、sw 、RISC-V',
              URL: '/download/commercial-release/',
            },
          ],
          SHORTCUT: [],
        },
        {
          NAME: '下载资源',
          CHILDREN: [
            {
              NAME: '软件中心',
              DESCRIPTION: '简易便捷地查询openEuler社区软件包',
              TAG: TAG_TYPE.NEW,
              URL: 'https://easysoftware.openeuler.org/zh',
            },
            {
              NAME: '镜像仓列表',
              DESCRIPTION: '查询openEuler所有镜像站点，欢迎新站点的加入',
              URL: '/mirror/list/',
            },
            {
              NAME: 'Repo源',
              DESCRIPTION: '提供openEuler社区版本的repo文件',
              URL: 'https://repo.openeuler.openatom.cn/',
            },
          ],
          SHORTCUT: [],
        },
      ],
    },
    {
      NAME: '学习',
      ID: 'learn',
      CHILDREN: [
        {
          NAME: '文档中心',
          ICON: ArrowRight,
          URL: 'https://docs.openeuler.org/zh/',
          CHILDREN: [
            {
              NAME: '热门文档',
              DESCRIPTION: '当下最受关注的各类文档',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/zh/#hot',
            },
            {
              NAME: '开发教程',
              DESCRIPTION: '基于openEuler进行应用程序开发的指南文档',
              URL: 'https://docs.openeuler.org/zh/docs/24.03_LTS/docs/ApplicationDev/application-development.html',
            },
            {
              NAME: '流程规范',
              DESCRIPTION: '社区文档贡献的具体流程与规范要求',
              URL: 'https://docs.openeuler.org/zh/#process',
            },
            {
              NAME: '工具查询',
              DESCRIPTION: '常用工具的使用指南',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/zh/#tool',
            },
          ],
          SHORTCUT: [
            {
              NAME: '24.03LTS文档',
              URL: 'https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Releasenotes/法律声明.html',
            },
            {
              NAME: '安装升级',
              URL: 'https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/installation.html',
            },
            {
              NAME: '文档撰写指南',
              ICON: OutLink,
              URL: 'https://gitee.com/openeuler/docs/blob/master/contribute/写作规范.md',
            },
          ],
        },
        {
          NAME: '课程中心',
          ICON: ArrowRight,
          URL: '/learn/mooc/',
          CHILDREN: [
            {
              NAME: 'HCIA-openEuler 认证培训课程',
              DESCRIPTION: '学习HCIA-openEuler华为认证openEuler工程师在线课程',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: '开始学习',
                  URL: '/learn/mooc/detail/',
                },
                {
                  NAME: '报名考试',
                  URL: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0',
                  ICON: OutLink,
                },
              ],
            },
            {
              NAME: 'openEuler精品课程',
              DESCRIPTION: 'openEuler从入门到实践系列课程',
              URL: 'https://c0605e03bb6b40dca9cd34ab5b3fb1f8.shixizhi.huawei.com/portal/1643780836745113602?pageId=1644269448177651714&activeIndex=-1&sxz-lang=zh_CN',
              ICON: OutLink,
            },
            {
              NAME: 'openEuler安全知识培训',
              DESCRIPTION: 'openEuler基础安全意识与能力培训',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: '开始学习',
                  URL: 'https://space.bilibili.com/527064077/channel/collectiondetail?sid=2726214',
                  ICON: OutLink,
                },
                {
                  NAME: '报名考试',
                  URL: '/blog/openeuler/20240428-security.html',
                },
              ],
            },
            {
              NAME: 'Tutorials',
              DESCRIPTION: 'openEuler官方出品的迷你视频课程',
              URL: 'https://space.bilibili.com/527064077/channel/collectiondetail?sid=1229363',
              ICON: OutLink,
            },
            {
              NAME: 'openEuler直播',
              DESCRIPTION: '众多大咖精彩课程直播',
              URL: '/interaction/live-list/',
            },
          ],
          SHORTCUT: [
            {
              NAME: '从入门到精通-openEuler操作系统迁移专题',
              URL: 'https://c0605e03bb6b40dca9cd34ab5b3fb1f8.shixizhi.huawei.com/community/community.htm?communityId=1748285175854272513&schoolId=1643780836745113602&activeIndex=-1&subIndex=undefined&subIndex=undefined&sxz-lang=zh_CN',
            },
          ],
        },
        {
          NAME: '迁移与运维',
          CHILDREN: [
            {
              NAME: '迁移专区',
              DESCRIPTION: '助力企业进行操作系统迁移的指南文档',
              URL: '/migration/',
            },
            {
              NAME: '运维专区',
              DESCRIPTION: 'openEuler运维全集和工具',
              URL: '/om/',
            },
          ],
          SHORTCUT: [
            {
              NAME: '迁移工具x2openEuler',
              URL: '/migration/download/',
            },
            {
              NAME: '迁移实践',
              URL: '/migration/user-cases/',
            },
          ],
        },
        {
          NAME: '技术展示',
          CHILDREN: [
            {
              NAME: '用户案例',
              DESCRIPTION: '了解openEuler在各行业的最佳案例',
              URL: '/showcase/',
            },
            {
              NAME: '白皮书',
              DESCRIPTION:
                '了解openEuler各版本的技术详情及在行业的生态现状、业务场景的应用',
              URL: '/showcase/technical-white-paper/',
            },
            {
              NAME: '市场研究报告',
              DESCRIPTION: '了解openEuler在行业的市场研究情况',
              URL: '/showcase/market-report/',
            },
          ],
          SHORTCUT: [],
        },
      ],
    },
    {
      NAME: '开发',
      ID: 'development',
      CHILDREN: [
        {
          NAME: '构建',
          CHILDREN: [
            {
              NAME: 'EulerMaker',
              DESCRIPTION: '开放式统一构建服务',
              URL: 'https://eulermaker.compass-ci.openeuler.openatom.cn/',
              ANALYTICSNAME: 'eulermaker',
            },
            {
              NAME: '用户软件仓(EUR)',
              DESCRIPTION: '开发者易用的软件包托管分发平台',
              URL: 'https://eur.openeuler.openatom.cn/coprs/',
            },
            {
              NAME: '软件包贡献',
              DESCRIPTION: '简单高效地贡献软件包',
              URL: 'https://software-pkg.openeuler.org/zh/package',
            },
            {
              NAME: 'License工具门户',
              DESCRIPTION: '帮助快速检测License权利、义务、限制',
              URL: 'https://compliance.openeuler.org/',
              ICON: OutLink,
              ANALYTICSNAME: 'license',
            },
          ],
        },
        {
          NAME: '发布',
          CHILDREN: [
            {
              NAME: 'EulerPublisher',
              DESCRIPTION: 'openEuler云原生发布工具',
              URL: 'https://gitee.com/openeuler/eulerpublisher',
              ICON: OutLink,
            },
            {
              NAME: 'EulerLauncher',
              DESCRIPTION: '跨平台openEuler虚拟机管理工具',
              URL: 'https://gitee.com/openeuler/eulerlauncher',
              ICON: OutLink,
            },
            {
              NAME: 'OEPKGS',
              DESCRIPTION: 'OEPKGS软件托管平台',
              URL: 'https://oepkgs.net/zh-CN',
              ICON: OutLink,
            },
          ],
        },
        {
          NAME: '分析',
          CHILDREN: [
            {
              NAME: 'oecp',
              DESCRIPTION: '操作系统差异比较分析工具',
              URL: 'https://gitee.com/openeuler/oecp',
              ICON: OutLink,
            },
            {
              NAME: 'Pkgship',
              DESCRIPTION: '管理操作系统软件包信息和依赖项的查询工具',
              URL: 'https://pkgmanage.openeuler.org/',
              ANALYTICSNAME: 'pkgship',
            },
          ],
        },
        {
          NAME: '问题反馈',
          CHILDREN: [
            {
              NAME: 'QuickIssue',
              DESCRIPTION: '简易快捷地查询、提交社区Issues',
              URL: 'https://quickissue.openeuler.org/zh/issues/',
            },
          ],
        },
      ],
    },
    {
      NAME: '支持',
      ID: 'approve',
      CHILDREN: [
        {
          NAME: '兼容性专区',
          CHILDREN: [
            {
              NAME: '兼容性列表',
              DESCRIPTION: '查看openEuler兼容性列表',
              URL: '/compatibility/',
            },
            {
              NAME: '兼容性技术测评',
              DESCRIPTION: '帮助企业快速申请兼容性技术测评',
              URL: 'https://certification.openeuler.org/#/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'openEuler 硬件兼容性测试整体介绍',
              URL: '/compatibility/hardware/',
            },
          ],
        },
        {
          NAME: '支持与服务',
          CHILDREN: [
            {
              NAME: 'x2openEuler',
              DESCRIPTION: '将原有业务迁移到openEuler的工具套件',
              URL: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduction.html',
            },
            {
              NAME: 'OSV技术测评',
              DESCRIPTION: '查看OSV技术测评结果',
              URL: '/approve/',
            },
            {
              NAME: '社区公告',
              DESCRIPTION: '查看漏洞管理、安全公告等安全问题',
              URL: '',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: '安全中心',
                  URL: '/security/security-bulletins/',
                },
                {
                  NAME: '缺陷中心',
                  URL: '/security/bug-bulletins/',
                },
              ],
            },
            {
              NAME: 'FAQ常见问题',
              DESCRIPTION: '查看openEuler常见问题',
              URL: '/faq/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'OSV技术测评整体介绍',
              URL: '/approve/approve-step/',
            },
            {
              NAME: 'QuickIssue ',
              URL: 'https://quickissue.openeuler.org/zh/issues/',
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
          CHILDREN: [
            {
              NAME: '组织架构',
              DESCRIPTION: '了解openEuler的委员会成员',
              URL: '/community/organization/',
            },
            {
              NAME: '社区章程',
              DESCRIPTION: '了解openEuler的章程、条例、行为准则、License策略',
              URL: '/community/charter/',
            },
            {
              NAME: '成员单位',
              DESCRIPTION: '了解openEuler的捐赠单位',
              URL: '/community/member/',
            },
            {
              NAME: '社区荣誉',
              DESCRIPTION: '了解openEuler的荣誉奖项',
              URL: '/community/honor/',
            },
            {
              NAME: 'oEEP',
              DESCRIPTION: '查看openEuler社区的演进提案',
              URL: '/oEEP/?name=oEEP-0000 oEEP  索引',
            },
            {
              NAME: '城市用户组',
              DESCRIPTION: '区域用户交流圈',
              URL: '/community/user-group/',
            },
            {
              NAME: '贡献看板',
              DESCRIPTION: '查看openEuler社区数据',
              URL: 'https://datastat.openeuler.org/zh/overview',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'openEuler社区介绍PDF',
              URL: 'https://www.openeuler.org/whitepaper/openEuler %E5%BC%80%E6%BA%90%E7%A4%BE%E5%8C%BA%E4%BB%8B%E7%BB%8D.pdf',
            },
          ],
        },
        {
          NAME: '贡献与成长',
          HASGROUP: true,
          CHILDREN: [
            {
              NAME: '开发者贡献',
              CHILDREN: [
                {
                  NAME: 'SIG中心',
                  DESCRIPTION: '查询openEuler社区SIG组(Special Interest Group)',
                  URL: '/sig/sig-list/',
                },
                {
                  NAME: '贡献攻略',
                  DESCRIPTION: '参与社区贡献的方式',
                  URL: '/community/contribution/',
                },
                {
                  NAME: 'CLA签署',
                  DESCRIPTION:
                    '参与贡献前，需签署贡献者许可协议（CLA）\n个人CLA、企业CLA、员工CLA',
                  URL: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
                  ICON: OutLink,
                },
              ],
            },
            {
              NAME: '开发者成长',
              CHILDREN: [
                {
                  NAME: '高校',
                  DESCRIPTION: '了解高校技术小组与实习赛事资讯',
                  URL: '/universities/',
                },
                {
                  NAME: '人才培养',
                  DESCRIPTION: '旨在帮助企业快速培养openEuler专业生态人才',
                  URL: '/talent-assessment/',
                },
                {
                  NAME: '开源实习',
                  DESCRIPTION:
                    '旨在帮助在校学生在项目实践中提升能力，成为优秀的开源人才',
                  URL: '/internship/',
                },
              ],
            },
          ],
          SHORTCUT: [
            {
              NAME: '企业签署CLA流程',
              URL: '/blog/2022-11-25-cla/CLA%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B.html',
            },
            {
              NAME: 'CLA-FAQ',
              ICON: OutLink,
              URL: 'https://gitee.com/openeuler/infrastructure/blob/master/docs/cla-guide/faq/faq.md',
            },
            {
              NAME: '开发者日历',
              URL: '/meeting/#calendar',
            },
            {
              NAME: '活动与大赛',
              URL: '/universities/#%E6%B4%BB%E5%8A%A8%E4%B8%8E%E5%A4%A7%E8%B5%9B',
            },
            {
              NAME: '高校技术小组',
              URL: '/universities/#%E9%AB%98%E6%A0%A1%E6%8A%80%E6%9C%AF%E5%B0%8F%E7%BB%84',
            },
          ],
        },
        {
          NAME: '项目',
          CHILDREN: [
            {
              NAME: 'A-Tune',
              DESCRIPTION: '一款基于AI开发的智能优化引擎',
              URL: '/other/projects/atune/',
            },
            {
              NAME: 'iSula',
              DESCRIPTION: '容器技术方案',
              URL: '/other/projects/isula/',
            },
            {
              NAME: 'StratoVirt',
              DESCRIPTION: '面向云数据中心的企业级虚拟化VMM',
              URL: '/other/projects/stratovirt/',
            },
            {
              NAME: 'BiSheng JDK',
              DESCRIPTION: '一款高性能Java虚拟机',
              URL: '/other/projects/bishengjdk/',
            },
            {
              NAME: 'secGear',
              DESCRIPTION: '供开发者开发安全应用的机密计算框架',
              URL: '/other/projects/secgear/',
            },
            {
              NAME: 'NestOS',
              DESCRIPTION: '基于欧拉开源操作系统的云底座操作系统',
              URL: '/nestos',
            },
          ],
          SHORTCUT: [],
        },
        {
          NAME: '社区交流',
          CHILDREN: [
            {
              NAME: '论坛',
              DESCRIPTION: '与开发者讨论openEuler',
              URL: 'https://forum.openeuler.org/?locale=zh_CN',
            },
            {
              NAME: '邮件列表',
              DESCRIPTION: '订阅邮件列表，与SIG成员讨论openEuler的技术与进展',
              URL: '/community/mailing-list/',
            },
            {
              NAME: '线上会议',
              DESCRIPTION: '查询并参与SIG组例会',
              URL: '/meeting/',
            },
            {
              NAME: '联系我们',
              DESCRIPTION: '',
              URL: '/contact-us/',
              TAG: TAG_TYPE.NEW,
            },
          ],
          SHORTCUT: [],
        },
      ],
    },

    {
      NAME: '动态',
      ID: 'update',
      CHILDREN: [
        {
          NAME: '社区活动',
          WITH_PICTURE: true,
          CHILDREN: [
            {
              NAME: '活动日历',
              DESCRIPTION: '了解openEuler社区全年活动',
              URL: '/interaction/event-list/',
            },
            {
              NAME: '峰会',
              DESCRIPTION: '查看openEuler年度大会详情',
              URL: '/interaction/summit-list/devday2025/',
            },
            {
              NAME: 'openEuler Call for X计划',
              DESCRIPTION: '共享openEuler Call for X计划多元化资源',
              URL: '/community/program/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'openEuler Developer Day 2025',
              PICTURE: Odd,
              DESCRIPTION:
                'openEuler Developer Day 2025 （简称 ODD 2025）是开放原子开源基金会孵化及运营的 openEuler 社区发起的开发者大会。',
              REMARK: '时间：2025/04/11 | 杭州',
              TYPE: 'PICTURE',
              URL: '/interaction/summit-list/devday2025/',
            },
            {
              NAME: '操作系统大会 & openEuler Summit 2024',
              PICTURE: Summit,
              DESCRIPTION:
                '操作系统是产业数字化、智能化发展的坚实底座。openEuler作为数智基础设施的开源操作系统，开源5年，产业共建、生态繁荣；openEuler系市场份额屡攀新高；技术不断创新，使能AI，加速OS智能化，让数智无所不能；源于中国，贡献全球，已成长为企业级全球开源操作系统社区的重要一员。',
              REMARK: '时间：2024/11/15 - 2024/11/16 | 北京',
              TYPE: 'PICTURE',
              URL: '/interaction/summit-list/summit2024/',
            },
          ],
        },
        {
          NAME: '资讯',
          WITH_PICTURE: true,
          CHILDREN: [
            {
              NAME: '新闻',
              DESCRIPTION: '查看openEuler社区动态',
              URL: '/interaction/news-list/',
            },
            {
              NAME: '博客',
              DESCRIPTION: '查看openEuler技术文章分享',
              URL: '/interaction/blog-list/',
            },
            {
              NAME: '月刊与年报',
              DESCRIPTION: '查看openEuler社区运作报告',
              URL: '/monthly-bulletins/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'openEuler 2024 社区年报',
              PICTURE: annualReport2024,
              REMARK: '发布时间：2025/01/24',
              TYPE: 'PICTURE',
              URL: '/annual-report/openEuler-annual-report-2024/',
            },
            {
              NAME: 'openEuler 2023 社区年报',
              PICTURE: Report,
              REMARK: '发布时间：2024/01/01',
              TYPE: 'PICTURE',
              URL: '/news/openEuler/20240223-nianbao/Untitled-1.html',
            },
          ],
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
    PLEACHOLDER: '搜索',
    PLEACHOLDER_EXTEND: '请输入搜索内容',
    TEXT: '搜索',
  },
  SOURCE_CODE: [
    {
      NAME: '代码仓',
      PATH: 'https://gitee.com/openeuler',
    },
    {
      NAME: '软件包仓',
      PATH: 'https://gitee.com/src-openeuler',
    },
    {
      NAME: 'Github镜像仓',
      PATH: 'https://github.com/openeuler-mirror',
    },
  ],
};

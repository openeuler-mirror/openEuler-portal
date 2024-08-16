const tdks: {
  [path: string]: { title: string; description: string; keywords: string };
} = {
  'zh/migration/transplantation-cases': {
    title: 'openEuler迁移案例 | 移植指南',
    description:
      'openEuler助力企业简单、平稳、高效进行操作系统升级。移植案例移植指南专区涵盖MySQL移植案例、Apache移植指南、Nginx移植指南、Dubbo移植指南。想要了解更多系统迁移案例及移植指南相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler移植案例,linux系统移植,mysql移植方案,apache移植方案,nginx移植方案,mysql数据迁移工具',
  },
  'zh/migration/user-cases': {
    title: 'openEuler迁移实践 | 迁移专区',
    description:
      '目前 openEuler 提供主流场景的迁移实践，包含大数据、分布式存储、虚拟化、容器、数据库软件，已经成功支撑多个行业用户完成迁移工作。各场景的迁移实践可联系我们获取。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      '资料搬迁,迁移无中断,替换操作系统,云服务器迁移,服务器迁移工具,云服务器迁移方案',
  },
  'zh/migration/download': {
    title: 'openEuler迁移下载 | 迁移专区',
    description:
      'x2openEuler工具是社区提供的一款将源操作系统迁移到目标操作系统的迁移工具套件，用户能够批量添加待升级节点进行迁移分析，设计迁移方案并对兼容性问题进行迁移适配，最后对已适配的待升级节点批量升级，实现端到端的无感迁移。',
    keywords:
      'openEuler迁移,Linux迁移,Linux服务器迁移,系统迁移工具,服务器迁移方案,CentOS迁移',
  },
  'zh/migration/guidance': {
    title: 'openEuler迁移方案 | 服务器系统迁移',
    description:
      'openEuler 提供端到端的迁移方案，包括成立迁移保障组织、迁移分析、方案设计、移植适配、迁移实施和测试上线六个阶段，同时通过 x2openEuler 工具的迁移评估和原地升级技术，实现了全场景业务的“简单、平稳、高效”的迁移。',
    keywords:
      'CentOS迁移工具,操作系统迁移,操作系统替换,服务器系统迁移软件,服务器系统迁移工具,Centos系统迁移',
  },
  'zh/migration/background': {
    title: 'openEuler移植案例 | 迁移专区',
    description:
      'openEuler 提供端到端的迁移方案，包括成立迁移保障组织、迁移分析、方案设计、移植适配、迁移实施和测试上线六个阶段，同时通过 x2openEuler 工具的迁移评估和原地升级技术，实现了全场景业务的“简单、平稳、高效”的迁移。',
    keywords:
      'openEuler迁移背景,开源服务器操作系统,Centos系统迁移,服务器系统迁移,Linux迁移,服务器安装linux系统',
  },
  'zh/migration/advantage': {
    title: 'openEuler移植案例 | 迁移专区',
    description:
      'openEuler助力企业简单、平稳、高效进行操作系统升级。移植案例移植指南专区涵盖MySQL移植案例、Apache移植指南、Nginx移植指南、Dubbo移植指南。想要了解更多系统迁移案例及移植指南相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler移植案例,linux系统移植,mysql移植方案,apache移植方案,nginx移植方案,mysql数据迁移工具',
  },
  'zh': {
    title: 'openEuler | 开源社区',
    description:
      'openEuler是一个开源、免费的 Linux 发行版平台，通过开放的形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。openEuler是一个创新的平台，鼓励任何人在这里提出新想法、开拓新思路、实践新方案。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,开源Linux系统,linux开源社区,开源社区,Linux迁移,openEuler社区官网',
  },
  'zh/showcase': {
    title: 'openEuler解决方案 | 用户案例',
    description:
      '汇聚openEuler在各行业的精品案例与解决方案，展示各行业用户在自身业务场景中使用openEuler操作系统和openEuler社区中各技术项目的案例以及所带来的积极效果。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler,用户案例,用户实践,解决方案,开源实践,openEuler社区官网',
  },
  'zh/showcase/technical-white-paper': {
    title: 'openEuler技术白皮书 | openEuler白皮书',
    description:
      '汇聚openEuler各个版本的的技术详情和创新项目介绍，展示openEuler领先的技术创新能力。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler,openEuler创新项目,技术白皮书,openEuler社区官网',
  },
  'zh/showcase/white-paper': {
    title: 'openEuler行业白皮书 | openEuler白皮书',
    description:
      '了解openEuler在行业的生态现状、业务场景的应用。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler,openEuler操作系统,行业白皮书,白皮书,openEuler社区官网',
  },
  'zh/showcase/market-report': {
    title: 'openEuler市场研究报告 | openEuler市场研究报告',
    description:
      '了解openEuler在行业的市场研究情况。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler操作系统,行业研究报告,开源社区,openEuler社区官网',
  },
  'zh/learn/mooc': {
    title: 'openEuler课程中心',
    description:
      '提供openEuler社区各类学习资源。帮助开发者更好地了解openEuler，学习开源操作系统知识，提升自身技能。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler,慕课,课程中心,开源学习,openEuler社区官网',
  },
  'zh/migration': {
    title: 'openEuler迁移方案 | openEuler迁移中心',
    description:
      'openEuler 助力企业简单、平稳、高效进行操作系统迁移。为用户提供x2openEuler工具的迁移评估和原地升级技术， 实现了全场景业务的“简单、平稳、高效”的迁移。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler迁移案例,迁移工具,迁移方案,开源服务器操作系统,Centos系统迁移,服务器系统迁移,Linux迁移,服务器安装linux系统,openEuler社区官网',
  },
  'zh/om': {
    title: 'openEuler运维工具 | openEuler运维专区',
    description:
      'openEuler开源社区及伙伴构建了一系列专、精的运维组件，以及各种统一运维工具，协助用户更好地使用openEuler操作系统。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler运维全集,开源社区运维,操作系统运维,运维工具,openEuler社区官网',
  },
  'zh/security/security-bulletins': {
    title: 'openEuler安全公告 | openEuler安全中心',
    description:
      'openEuler社区针对在维版本例行修复漏洞，发布安全补丁。建议关注openEuler官网安全公告，及时安装漏洞补丁进行防护。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler安全,安全公告,CVE,漏洞响应,漏洞管理,openEuler社区官网',
  },
  'zh/security/vulnerability-reporting': {
    title: 'openEuler漏洞管理 | openEuler安全中心',
    description:
      'openEuler安全委员会负责接收、调查和披露社区的安全漏洞。我们鼓励漏洞研究人员和行业组织主动将openEuler社区的疑似安全漏洞报告给安全委员会。我们会快速的响应、分析和解决上报的安全问题或安全漏洞。欢迎访问openEuler官网。',
    keywords:
      'openEuler安全,安全公告,CVE,漏洞管理,openEuler漏洞,openEuler社区官网',
  },
  'zh/security/management': {
    title: 'openEuler缺陷管理 | openEuler缺陷中心',
    description:
      'openEuler 欢迎和鼓励社区开发者能主动识别或修复CVE， 不断提升openEuler 社区的软件使用体验，基于社区反馈我们会快速的响应、分析和解决上报的缺陷并及时发布。欢迎访问openEuler官网。',
    keywords:
      'openEuler版本,openEuler Release,openEuler安全,openEuler漏洞,openEuler社区官网',
  },
  'zh/approve': {
    title: 'openEulerOSV技术测评列表 ',
    description:
      'openEuler提供了完整的测试流程和工具，检测伙伴二次发行版生态核心特性不丢失，关键配置不更改，帮助牵引实现扩展仓库openEuler系共享、共用，主流行业应用在openEuler系不同的OSV生态复用度。欢迎访问openEuler官网。',
    keywords:
      'OSV技术测评,openEuler兼容性测评,openEulerOSV技术测评,openEuler社区官网',
  },
  'zh/approve/approve-step': {
    title:
      'openEuler OSV技术测评 | openEuler OSV技术测评列表 ',
    description:
      'openEuler提供了完整的测试流程和工具，检测伙伴二次发行版生态核心特性不丢失，关键配置不更改，帮助牵引实现扩展仓库openEuler系共享、共用，主流行业应用在openEuler系不同的OSV生态复用度。欢迎访问openEuler官网。',
    keywords:
      'OSV技术测评,openEuler兼容性测评,openEulerOSV技术测评,openEuler社区官网',
  },
  'zh/compatibility': {
    title: 'openEuler兼容性列表 ',
    description:
      'openEuler为用户测试openEuler与硬件的兼容性提供了两条路径，分别是社区认证和创新中心认证。社区认证能使用户在短期内完成兼容性测试并将测试结果展示于兼容性列表上。欢迎访问openEuler官网。',
    keywords: 'openEuler兼容性列表,openEuler兼容性测评,openEuler社区官网',
  },
  'zh/compatibility/hardware': {
    title: 'openEuler兼容性测评 | openEuler兼容性列表  ',
    description:
      'openEuler为用户测试openEuler与硬件的兼容性提供了两条路径，分别是社区认证和创新中心认证。社区认证能使用户在短期内完成兼容性测试并将测试结果展示于兼容性列表上。欢迎访问openEuler官网。',
    keywords: 'openEuler兼容性列表,openEuler兼容性测评,openEuler社区官网',
  },
  'zh/community/contribution': {
    title: 'openEuler贡献攻略地图 | openEuler贡献攻略',
    description:
      '阅读这篇完整指南，快速了解参与openEuler社区贡献全流程。我们将介绍关于社区贡献的完整流程，包括签署CLA、项目体验、提交issue、提交pr、代码贡献、活动申请、开源成长等等。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler开源贡献,openEuler社区贡献,贡献攻略,开源成长,开源学习,openEuler社区官网',
  },
  'zh/community/contribution/detail.html': {
    title: 'openEuler贡献攻略文字版 | openEuler贡献攻略',
    description:
      '阅读这篇完整指南，快速了解参与openEuler社区贡献全流程。我们将介绍关于社区贡献的完整流程，包括签署CLA、项目体验、提交issue、提交pr、代码贡献、活动申请、开源成长等等。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler开源贡献,openEuler社区贡献,贡献攻略,开源成长,开源学习,openEuler社区官网',
  },
  'zh/sig/sig-list': {
    title: 'openEuler SIG组 | openEuler SIG中心',
    description:
      '本篇提供openEuler社区完整的SIG组列表及其成员、仓库查询、SIG组申请、SIG组会议等，任何人均可参与。openEuler 社区按照不同的 SIG 来组织，以便于更好的管理和改善工作流程。欢迎访问openEuler官网。',
    keywords:
      'openEuler SIG组介绍,openEuler SIG申请流程,开源社区SIG组,openEuler社区官网',
  },
  'zh/internship': {
    title: '线上实习 | openEuler开源实习',
    description:
      'openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力，在社区中成长为优秀的开源人才。欢迎访问openEuler官网。',
    keywords: 'openEuler开源实习,开源社区实习,开源项目实习,openEuler社区官网',
  },
  'zh/community/organization': {
    title: 'openEuler组织架构',
    description:
      '了解openEuler的委员会成员。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler组织架构,openEuler社区官网',
  },
  'zh/community/member': {
    title: 'openEuler成员单位',
    description:
      '了解openEuler的捐赠单位。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler成员单位,openEuler社区官网',
  },
  'zh/community/charter': {
    title: 'openEuler社区章程',
    description:
      '了解openEuler的章程、条例、行为准则、License策略。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler社区章程条例,openEuler社区官网',
  },
  'zh/community/honor': {
    title: 'openEuler社区荣誉墙',
    description:
      '了解与openEuler相关的荣誉奖项。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: 'openEuler社区奖项,openEuler社区贡献之星,openEuler社区官网',
  },
  'zh/community/program': {
    title: 'openEuler Call for X 计划',
    description:
      '“openEuler Call for X 计划”是一个开放的社区项目，鼓励所有社区成员以及开源爱好者积极贡献、乐于分享、热衷实践，希望通过多元化的贡献一起丰富社区生态。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      '开发者活动,技术教程贡献,基础设施资源,场地资源,openEuler专家代表,openEuler社区官网',
  },
  'zh/universities': {
    title: 'openEuler高校技术小组',
    description:
      'openEuler高校技术小组是在高校内围绕openEuler进行学习、科研及参与社区贡献的组织，欢迎加入。想要了解更多信息，欢迎访问openEuler官网。',
    keywords: '高校技术小组,openEuler高校活动,openEuler社区,openEuler社区官网',
  },
  'zh/other/projects/atune': {
    title: 'A-Tune | AI智能优化引擎',
    description:
      'A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,A-Tune,AI智能优化引擎,linux开源社区,开源社区,iSula,openEuler社区官网',
  },
  'zh/other/projects/isula': {
    title: 'iSulad | 通用容器引擎',
    description:
      'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,iSulad,通用容器引擎,linux开源社区,开源社区,iSula,openEuler社区官网',
  },
  'zh/other/projects/stratovirt': {
    title: 'StratoVirt | 数据中心企业级虚拟化',
    description:
      'StratoVirt是面向云数据中心的企业级虚拟化VMM (Virtual Machine Monitor)，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'StratoVirt,数据中心企业级虚拟化,openEuler,linux开源社区,开源社区,openEuler社区官网',
  },
  'zh/other/projects/bishengjdk': {
    title: '毕昇JDK | OpenJDK',
    description:
      '毕昇JDK是基于OpenJDK定制的Huawei JDK的开源版本。研发团队积累了丰富的开发经验，解决了业务实际运行中遇到的多个疑难问题。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      ' 毕昇JDK,OpenJDK,Huawei JDK,openEuler,linux开源社区,开源社区,openEuler社区官网',
  },
  'zh/other/projects/secgear': {
    title: 'secGear | 机密计算框架',
    description:
      'secGear是面向计算产业的机密计算安全应用开发套件，旨在方便开发者在不同的硬件设备上提供统一开发框架，目前secGear支持Intel SGX硬件和ARM Trustzone(安全os支持iTrustee)。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'secGear,机密计算框架,openEuler,linux开源社区,开源社区,openEuler社区官网',
  },
  'zh/download/get-os': {
    title: '获取openEuler操作系统 | openEuler下载',
    description:
      'openEuler是面向数字基础设施的操作系统,支持服务器、云计算、边缘计算、嵌入式等应用场景,支持多样性计算,致力于提供安全、稳定、易用的开源服务器Linux操作系统。欢迎访问openEuler官网，下载使用。',
    keywords:
      'openEuler下载,openEuler镜像下载,openEuler ISO镜像,openEuler社区官网,openEuler镜像,开源Linux系统,开源社区',
  },
  'zh/download': {
    title: 'openEuler下载 | openEuler ISO镜像',
    description:
      'openEuler是面向数字基础设施的操作系统,支持服务器、云计算、边缘计算、嵌入式等应用场景,支持多样性计算,致力于提供安全、稳定、易用的开源服务器Linux操作系统。欢迎访问openEuler官网，下载使用。',
    keywords:
      'openEuler下载,openEuler镜像下载,openEuler ISO镜像,openEuler社区官网,openEuler镜像,开源Linux系统,开源社区',
  },
  'zh/download/archive': {
    title: 'openEuler社区发行版 | openEuler下载',
    description:
      'openEuler是面向数字基础设施的操作系统,支持服务器、云计算、边缘计算、嵌入式等应用场景,支持多样性计算,致力于提供安全、稳定、易用的开源服务器Linux操作系统。欢迎访问openEuler官网，下载使用。',
    keywords:
      'openEuler下载,openEuler镜像下载,openEuler ISO镜像,openEuler社区官网,openEuler镜像,开源Linux系统,开源社区',
  },
  'zh/download/commercial-release': {
    title: 'openEuler商业发行版 | openEuler下载',
    description:
      'openEuler是面向数字基础设施的操作系统,支持服务器、云计算、边缘计算、嵌入式等应用场景,支持多样性计算,致力于提供安全、稳定、易用的开源服务器Linux操作系统。欢迎访问openEuler官网，下载使用。',
    keywords:
      'openEuler下载,openEuler镜像下载,openEuler ISO镜像,openEuler社区官网,openEuler镜像,开源Linux系统,开源社区',
  },
  'zh/mirror/list': {
    title: 'openEuler镜像仓列表 | openEuler下载',
    description:
      'openEuler是面向数字基础设施的操作系统,支持服务器、云计算、边缘计算、嵌入式等应用场景,支持多样性计算,致力于提供安全、稳定、易用的开源服务器Linux操作系统。欢迎访问openEuler官网，下载使用。',
    keywords:
      'openEuler下载,openEuler镜像下载,openEuler ISO镜像,openEuler社区官网,openEuler镜像,开源Linux系统',
  },
  'zh/interaction/news-list': {
    title: 'openEuler新闻资讯',
    description:
      'openEuler新闻资讯，为您提供关于openEuler官方发布的第一手资讯。想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler新闻,openEuler社区,开源Linux系统,linux开源社区,开源社区',
  },
  'zh/interaction/blog-list': {
    title: '开发者博客 | openEuler博客文档',
    description:
      'openEuler开发者博客是面向开发者的知识分享平台，涵盖服务器操作系统安装、迁移、创新项目实践、开发者贡献经验等内容，便于开发者之间的知识交流。 想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler博客,开发者博客,开发者文档,迁移指南,openEuler社区,开源Linux系统,linux开源社区,开源社区',
  },
  'zh/interaction/event-list': {
    title: '年度规划 | 开发者活动',
    description:
      'openEuler社区活动，为您提供关于openEuler官方发布的第一手开发者活动信息。想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler活动,Meetup,开发者竞赛,开源黑客松,开发者沙龙,开源社区,openEuler社区,linux开源社区',
  },
  'zh/monthly-summary': {
    title: 'openEuler月刊 | 社区运作报告',
    description:
      'openEuler月刊是面向社区所有开发者展现社区运作情况，包括社区治理、技术、生态、活动等方方面面的发展情况。月刊每月发布一次。 想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler月刊,社区运作,社区运作报告,社区年报,openEuler社区,开源Linux系统,linux开源社区,开源社区',
  },
  'zh/community/mailing-list': {
    title: 'openEuler邮件列表',
    description:
      '邮件列表是开源社区最重要的基本交流工具之一，欢迎订阅openEuler邮件列表，即可通过邮件与我们交流。 想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler邮件列表,订阅openEuler邮件列表,openEuler社区,开源Linux系统,linux开源社区,开源社区',
  },
  'zh/meeting': {
    title: 'openEuler线上会议 | openEuler开发者日历',
    description:
      'openEuler线上会议，为您提供关于openEuler社区SIG会议、SIG工作会议、社区直播等openEuler线上活动消息。想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler线上活动,线上会议,SIG会议,SIG工作会议,直播,openEuler直播,openEuler社区,开源Linux系统,linux开源社区,开源社区',
  },
};

export default tdks;

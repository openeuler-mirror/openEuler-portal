const tdks: {
  [path: string]: { title: string; description: string; keywords?: string };
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
  zh: {
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
    title: 'openEuler OSV技术测评 | openEuler OSV技术测评列表 ',
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
  'zh/monthly-bulletins': {
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
  'zh/approve/approve-info': {
    title: 'OSV技术测评报告 | OSV技术测评',
    description:
      '本页面提供openEuler的OSV技术测评报告，包括适用范围、申请流程等详细内容。',
    keywords: 'openEuler, OSV技术测评',
  },
  'zh/community/charter/v1.0': {
    title: '社区章程 | 社区规范',
    description: '查看openEuler社区的章程版本，了解社区成员的权利和义务。',
    keywords: 'openEuler, 社区章程, 社区规范',
  },
  'zh/community/conduct': {
    title: '社区行为准则 | 社区规范',
    description: '查看openEuler社区的行为准则，促进良好互动与合作。',
    keywords: 'openEuler, 社区行为准则, 社区规范',
  },
  'zh/community/meeting-system': {
    title: 'openEuler委员会会议运作制度 | 社区规范',
    description: '了解openEuler委员会会议运作制度。',
    keywords: 'openEuler, openEuler委员会',
  },
  'zh/community/program/infrastructure': {
    title: '基础设施资源贡献 | 社区贡献',
    description:
      '获取关于openEuler基础设施计划的信息，参与提升社区基础设施建设。',
    keywords: 'openEuler, 基础设施, 社区贡献',
  },
  'zh/community/program/join-oEVP': {
    title: '加入oEVP计划 | 社区贡献',
    description: '加入openEuler的oEVP计划，共同推动社区的发展与创新。',
    keywords: 'openEuler, oEVP计划, 社区项目',
  },
  'zh/community/program/oEVP-application-form': {
    title: 'oEVP申请表 | 社区贡献',
    description: '下载和填写openEuler oEVP计划申请表，参与社区项目的申请流程。',
    keywords: 'openEuler, oEVP, 申请表',
  },
  'zh/community/program/site-resources-contribution': {
    title: '场地资源贡献表 | 社区贡献',
    description: '了解如何为openEuler贡献场地资源，支持开源社区的成长。',
    keywords: 'openEuler, 场地资源, 贡献',
  },
  'zh/community/program/site-resources': {
    title: '活动场地 | 社区贡献',
    description:
      '欢迎查看、贡献活动场地资源，帮助开发者更好地组织openEuler活动。',
    keywords: 'openEuler, 活动场地, Meetup, 社区活动',
  },
  'zh/community/program/technical-tutorial': {
    title: '技术教程 | 课程中心',
    description: '提供多种技术教程，帮助开发者和用户更好地使用openEuler。',
    keywords: 'openEuler, 技术教程, 社区项目',
  },
  'zh/community/user-group/detail': {
    title: '用户组详情 | 社区活动',
    description: '探索openEuler的用户组详情，参与用户组的活动和讨论。',
    keywords: 'openEuler, 用户组, 社区活动',
  },
  'zh/community/vote': {
    title: '选举管理条例 | 社区规范',
    description: '了解openEuler项目群选举管理条例。',
    keywords: 'openEuler, 社区投票, 社区活动',
  },
  'zh/community/user-group': {
    title: 'openEuler用户组 | 社区活动',
    description: '查看openEuler社区的用户组信息，加入不同的用户组进行交流。',
    keywords: 'openEuler, 用户组, 社区活动',
  },
  'zh/compatibility/software': {
    title: 'openEuler软件兼容性测试介绍 | 兼容性中心',
    description: '了解openEuler支持的软件兼容性信息，确保您的应用正常运行。',
    keywords: 'openEuler, 软件兼容性, 兼容性中心',
  },
  'zh/compatibility/software-info': {
    title: 'openEuler软件兼容性信息 | 兼容性中心',
    description: '获取openEuler各类软件的兼容性信息，支持软件运行的稳定性。',
    keywords: 'openEuler, 软件兼容性, 信息',
  },
  'zh/download/archive/detail': {
    title: 'openEuler所有版本下载 | 下载中心',
    description: '访问查看openEuler的历史版本及资源。',
    keywords: 'openEuler, 下载, 归档',
  },
  'zh/experts': {
    title: 'openEuler 委员会顾问专家委员会 | 组织架构',
    description: '了解openEuler的顾问专家委员会，获取专业建议与支持。',
    keywords: 'openEuler, 顾问专家, 社区资源',
  },
  'zh/faq/application-development': {
    title: '应用开发常见问题 | FAQ',
    description:
      '查阅openEuler应用开发的常见问题解答，快速解决开发过程中的疑惑。',
    keywords: 'openEuler, FAQ, 应用开发',
  },
  'zh/faq/cloud-native': {
    title: '云原生常见问题 | FAQ',
    description: '获取openEuler云原生相关的常见问题解答，提升您的使用体验。',
    keywords: 'openEuler, FAQ, 云原生',
  },
  'zh/faq': {
    title: '常见问题 | FAQ',
    description: '查阅openEuler的FAQ，快速获取您关心的问题的解答。',
    keywords: 'openEuler, FAQ, 常见问题',
  },
  'zh/faq/migration': {
    title: '迁移常见问题 | FAQ',
    description: '了解openEuler迁移相关的常见问题，顺利进行系统迁移。',
    keywords: 'openEuler, FAQ, 迁移',
  },
  'zh/faq/system-management': {
    title: '系统管理常见问题 | FAQ',
    description: '查阅openEuler在系统管理方面的常见问题解答，提升管理效率。',
    keywords: 'openEuler, FAQ, 系统管理',
  },
  'zh/faq/virtualization': {
    title: '虚拟化常见问题 | FAQ',
    description:
      '获取openEuler虚拟化相关的常见问题及解决方案，助您更好使用虚拟化技术。',
    keywords: 'openEuler, FAQ, 虚拟化',
  },
  'zh/interaction/event-list/detail': {
    title: '活动详情 | 社区活动',
    description: '查看openEuler社区活动的详细信息，及时参与感兴趣的活动。',
    keywords: 'openEuler, 活动, 互动中心',
  },
  'zh/interaction/event-list/latest': {
    title: '最新活动 | 社区活动',
    description: '浏览openEuler社区的最新活动信息，及时参与感兴趣的活动。',
    keywords: 'openEuler, 最新活动, 互动中心',
  },
  'zh/interaction/event-list/collect': {
    title: '活动收集 | 社区活动',
    description: '收集openEuler社区的各类活动信息，获取更多参与机会。',
    keywords: 'openEuler, 活动收集, 互动中心',
  },
  'zh/interaction/event-list/meetup-form': {
    title: 'Meetup申请 | 社区活动',
    description: '填写Meetup的申请表，参与组织openEuler社区聚会。',
    keywords: 'openEuler, Meetup申请',
  },
  'zh/interaction/event-list/review': {
    title: '活动反馈 | 社区活动',
    description: '提交您对openEuler社区活动的反馈，帮助我们改进。',
    keywords: 'openEuler, 活动反馈, 互动中心',
  },
  'zh/interaction/live-list': {
    title: '直播列表 | 社区活动',
    description: '浏览openEuler社区的直播活动列表，参与实时互动。',
    keywords: 'openEuler, 直播, 互动中心',
  },
  'zh/interaction/post-blog/blog_example/20220901-sample-post.html': {
    title: '博客编写示例 | 博客',
    description: '访问openEuler社区的编写示例，了解社区博客分享。',
    keywords: 'openEuler, 博客, 示例文章',
  },
  'zh/interaction/post-blog': {
    title: '博客 | 互动中心',
    description: '探索openEuler社区的博客文章，获取最新资讯与技术分享。',
    keywords: 'openEuler, 博客, 互动中心',
  },
  'zh/interaction/post-news': {
    title: '新闻发布 | 互动中心',
    description: '查阅openEuler社区的新闻发布，获取最新资讯与技术分享。',
    keywords: 'openEuler, 新闻, 互动中心',
  },
  'zh/interaction/summit-list/2403-version-release': {
    title: 'openEuler 24.03 LTS版本发布会 | 峰会活动',
    description:
      '了解openEuler 24.03 LTS版本发布的相关信息，参与社区的讨论和反馈。',
    keywords: 'openEuler, 版本发布, 峰会活动',
  },
  'zh/interaction/summit-list/devday2023': {
    title: 'openEuler Developer Day 2023 | 峰会活动',
    description: '参加openEuler Developer Day 2023活动，交流技术经验与资源。',
    keywords: 'openEuler, 开发者日, 峰会活动',
  },
  'zh/interaction/summit-list/sig-gathering-2024/apply': {
    title: 'openEuler SIG Gathering 2024 | 峰会活动',
    description: '申请参加openEuler SIG Gathering 2024，分享您的观点与想法。',
    keywords: 'openEuler, 特殊兴趣小组, 申请',
  },
  'zh/interaction/summit-list/sig-gathering-2024/register': {
    title: 'openEuler SIG Gathering 2024 | 峰会活动',
    description:
      '注册参加openEuler SIG Gathering 2024活动，与志同道合的人沟通交流。',
    keywords: 'openEuler, 特殊兴趣小组, 注册',
  },
  'zh/interaction/summit-list/sig-gathering-2024': {
    title: 'openEuler SIG Gathering 2024  | 峰会活动',
    description:
      '查看 openEuler SIG Gathering 2024 信息，包括时间、地点和议程，欢迎参与。',
    keywords: 'openEuler, 特殊兴趣小组, 峰会活动',
  },
  'zh/interaction/summit-list/summit2023': {
    title: 'openEuler Summit 2023 | 峰会活动',
    description:
      '了解openEuler Summit 2023的最新信息，包括时间、地点和议程，欢迎参与。',
    keywords: 'openEuler, 峰会, 2023, 会议, 开源',
  },
  'zh/learn/mooc/detail': {
    title: 'openEuler MOOC 详情 | 学习专区',
    description:
      '深入了解openEuler的MOOC课程，掌握必要的技能和知识，提升您的技术能力。',
    keywords: 'openEuler, MOOC, 在线学习, 教育, 技术课程',
  },
  'zh/interaction/summit-list/summit2022': {
    title: 'openEuler 2022 峰会 | 峰会活动',
    description: '回顾openEuler 2022年峰会的精彩瞬间，获取活动回顾和资料下载。',
    keywords: 'openEuler, 峰会, 2022, 活动回顾, 开源',
  },
  'zh/interaction/summit-list/summit2022-changsha': {
    title: 'openEuler 2022 长沙峰会 | 峰会活动',
    description: '了解openEuler 2022年长沙峰会的具体信息，查看议题和演讲嘉宾。',
    keywords: 'openEuler, 长沙, 峰会, 2022, 会议议程',
  },
  'zh/interaction/summit-list/summit2024': {
    title: 'openEuler 2024 峰会 | 峰会活动',
    description: '查看openEuler 2024年峰会的相关信息，参与开源交流盛会。',
    keywords: 'openEuler, 峰会, 2024, 开源交流, 会议',
  },
  'zh/migration/contact': {
    title: 'openEuler 联系方式 | 迁移专区',
    description: '获取openEuler迁移的联系方式，如有疑问，请随时联系我们。',
    keywords: 'openEuler, 迁移, 联系方式, 支持',
  },
  'zh/migration/contribution': {
    title: 'openEuler 迁移指南 | 迁移专区',
    description: '了解如何将您的系统平滑迁移至openEuler。',
    keywords: 'openEuler, 迁移, 贡献, 开源, 指南',
  },
  'zh/migration/download/patch_description-3.0.0': {
    title: 'openEuler 3.0.0 补丁说明 | 迁移专区',
    description: '下载openEuler 3.0.0版本的补丁说明，确保系统的安全与稳定。',
    keywords: 'openEuler, 补丁说明, 下载, 安全',
  },
  'zh/migration/download/characteristic-description-3.0.0': {
    title: 'openEuler 3.0.0 特性说明 | 迁移专区',
    description: '深入了解openEuler 3.0.0版本的新特性及功能，掌握使用要点。',
    keywords: 'openEuler, 特性说明, 下载, 功能',
  },
  'zh/migration/faq': {
    title: 'openEuler 迁移常见问题 | 迁移专区',
    description: '查看openEuler迁移过程中常见问题的解答，助您顺利完成迁移。',
    keywords: 'openEuler, 迁移, 常见问题, FAQ, 支持',
  },
  'zh/oEEP': {
    title: 'openEuler  oEEP ',
    description: '查看openEuler 社区的演进提案。',
    keywords: 'openEuler, oEEP, 技术演进',
  },
  'zh/other/brand': {
    title: 'openEuler 品牌介绍 | 其他信息',
    description: '了解openEuler的品牌价值及推广策略，成为开源运动的一部分。',
    keywords: 'openEuler, 品牌, 介绍, 推广, 开源',
  },
  'zh/other/legal': {
    title: 'openEuler 法律声明 | 其他信息',
    description: '阅读openEuler的法律声明及相关政策，确保合法合规使用资源。',
    keywords: 'openEuler, 法律, 声明, 政策, 合规',
  },
  'zh/other/cookies': {
    title: 'openEuler Cookie政策 | 其他信息',
    description: '了解openEuler网站的Cookie政策，保护您的隐私权。',
    keywords: 'openEuler, Cookie, 政策, 隐私, 信息',
  },
  'zh/other/lifecycle': {
    title: 'openEuler 生命周期管理 | 其他信息',
    description:
      '探索openEuler软件的生命周期管理，确保高效的版本管理和技术支持。',
    keywords: 'openEuler, 生命周期, 管理, 版本, 支持',
  },
  'zh/other/brand/specification': {
    title: 'openEuler 品牌规范 | 其他信息',
    description: '查阅openEuler的品牌规范，确保正确使用品牌元素。',
    keywords: 'openEuler, 品牌, 规范, 使用, 元素',
  },
  'zh/other/projects/bishengjdk/tck-affidavit': {
    title: 'openEuler BiSheng JDK TCK 宣誓书 | 其他信息',
    description:
      '查看openEuler BiSheng JDK TCK的正式宣誓书，了解相关认证信息。',
    keywords: 'openEuler, BiSheng JDK, TCK, 宣誓书, 认证',
  },
  'zh/other/privacy': {
    title: 'openEuler 隐私声明 | 其他信息',
    description: '了解openEuler的隐私声明，保护您的个人信息和数据。',
    keywords: 'openEuler, 隐私, 政策, 个人信息, 数据保护',
  },
  'zh/security/bug-bulletins/detail': {
    title: 'openEuler 安全漏洞公告详情 | 安全信息',
    description: '获取openEuler安全漏洞公告的详细信息。',
    keywords: 'openEuler, 安全漏洞, 公告, 详情, 威胁',
  },
  'zh/other/search': {
    title: 'openEuler 网站搜索 | 其他信息',
    description: '使用openEuler网站搜索功能，快速找到您需要的信息和资源。',
    keywords: 'openEuler, 搜索, 网站, 信息, 资源',
  },
  'zh/security/bug-bulletins': {
    title: 'openEuler 安全漏洞公告 | 安全信息',
    description: '了解openEuler发布的安全漏洞公告，确保您及时获取安全更新。',
    keywords: 'openEuler, 安全, 漏洞公告, 更新, 安全信息',
  },
  'zh/security/cve': {
    title: 'openEuler CVE 安全漏洞列表 | 安全信息',
    description: '查看openEuler的CVE安全漏洞列表，及时更新，确保系统的安全。',
    keywords: 'openEuler, CVE, 漏洞, 安全, 更新',
  },
  'zh/security/certificate-center': {
    title: 'openEuler 证书中心 | 安全信息',
    description: '访问openEuler证书中心，获取相关安全证书和认证信息。',
    keywords: 'openEuler, 证书, 安全中心, 认证信息, 资源',
  },
  'zh/security/cve/detail': {
    title: 'openEuler CVE 漏洞详情 | 安全信息',
    description: '获取openEuler CVE漏洞的详细信息，了解漏洞影响及修复方案。',
    keywords: 'openEuler, CVE, 漏洞, 详情, 修复',
  },
  'zh/security/security-bulletins/detail': {
    title: 'openEuler 安全公告详情 | 安全信息',
    description: '查看openEuler安全公告的详细内容，确保系统的安全防护。',
    keywords: 'openEuler, 安全公告, 详情, 系统, 安全',
  },
  'zh/sig/meeting-guide': {
    title: 'openEuler 特别兴趣组会议指南 | SIG专区',
    description:
      '深入了解openEuler特别兴趣组的会议安排和参与指南，积极参与社区活动。',
    keywords: 'openEuler, 特别兴趣组, 会议, 指南, 社区, openEuler sig',
  },
  'zh/sig/sig-detail': {
    title: 'openEuler 特别兴趣组详情 | SIG专区',
    description: '浏览openEuler特别兴趣组的相关信息，参与到各项活动中。',
    keywords: 'openEuler, 特别兴趣组, 详情, 活动, 社区, openEuler sig',
  },
  'zh/sig/role-description': {
    title: 'openEuler 特别兴趣组角色描述 | SIG专区',
    description:
      '了解openEuler特别兴趣组（sig组）中各角色的职责和工作内容，参与共建。',
    keywords: 'openEuler, 特别兴趣组, 角色, 描述, 共建, openEuler sig',
  },
  'zh/wiki/about/introduce': {
    title: 'openEuler 项目介绍 | Wiki',
    description: '了解openEuler项目的整体介绍与背景，获取基本信息。',
    keywords: 'openEuler, 项目, 介绍, 背景, 开源',
  },
  'zh/sig/sig-guidance': {
    title: 'openEuler 特别兴趣组指导原则 | SIG专区',
    description:
      '查阅openEuler特别兴趣组（sig组）的指导原则，了解参与和贡献的方式。',
    keywords: 'openEuler, 特别兴趣组, 指导, 原则, 贡献, openEuler sig',
  },
  'zh/wiki/contribution': {
    title: 'openEuler 贡献指南 | Wiki',
    description: '学习如何参与openEuler社区贡献，参与到开源社区建设中。',
    keywords: 'openEuler, 贡献, 指南, 开源, 社区',
  },
  'zh/wiki/install/cloud': {
    title: 'openEuler 云安装指南 | Wiki',
    description: '查阅openEuler在云环境中的安装指南，保障快速上手。',
    keywords: 'openEuler, 云, 安装, 指南, 快速上手',
  },
  'zh/wiki/about/quick-start': {
    title: 'openEuler 快速开始指南 | Wiki',
    description: '获取openEuler的快速开始指南，帮助用户迅速上手使用。',
    keywords: 'openEuler, 快速开始, 指南, 用户, 使用, 安装',
  },
  'zh/wiki/install/virtualization': {
    title: 'openEuler 虚拟化安装指南 | Wiki',
    description: '深入了解如何在openEuler中进行虚拟化安装，提升系统效率。',
    keywords: 'openEuler, 虚拟化, 安装, 指南, 系统',
  },
  'zh/wiki/install/wsl': {
    title: 'openEuler WSL 安装指南 | Wiki',
    description: '学习如何在Windows子系统Linux（WSL）上安装openEuler。',
    keywords: 'openEuler, WSL, 安装, 指南, 用户',
  },
  'zh/wiki/install/image': {
    title: 'openEuler 镜像安装指南 | Wiki',
    description: '查阅openEuler镜像的安装方法，确保高效部署。',
    keywords: 'openEuler, 镜像, 安装, 指南, 部署',
  },
  // TODO: update
  'zh/nestos': {
    title: 'openEuler 镜像安装指南 | Wiki',
    description: '查阅openEuler镜像的安装方法，确保高效部署。',
    keywords: 'openEuler, 镜像, 安装, 指南, 部署',
  },
  'zh/talent-assessment': {
    title: 'openEuler 人才认证与生态就业',
    description: 'openEuler 人才认证由开放原子开源基金会与 openEuler 社区教育工作组联合运营，提供 OECA/OECP 等级认证。同时汇聚麒麟信安、凝思软件等生态伙伴的 Linux/操作系统岗位需求，助力开发者职业发展。',
    keywords: 'openEuler,人才认证,OECA,OECP,Linux操作系统,生态就业,开源社区,操作系统开发,信创,职业发展',
  },
  'zh/sig/xfce.html': {
    title: 'XFCE SIG 兴趣小组',
    description: 'XFCE SIG 负责在 openEuler 社区中集成和维护 XFCE 轻量级桌面系统，涵盖相关软件包的规划、升级与维护工作，并积极响应用户反馈、解决问题。XFCE 以快速启动、低资源占用著称，是 openEuler 桌面环境的重要组成部分。',
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  'zh/sig/Virt.html': {
    title: 'Virt SIG 兴趣小组',
    description: 'Virt SIG 致力于打造面向全场景、支撑多样性算力的虚拟化解决方案，负责 openEuler 虚拟化相关组件的社区技术发展与决策，承担虚拟化软件包的规划、升级与维护工作，并积极响应用户反馈、解决虚拟化相关问题。',
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  'zh/sig/user-committee.html': {
    title: 'User committee SIG 兴趣小组',
    description: 'user-committee SIG 面向 openEuler 操作系统及其开源平台的最终用户，通过社区活动和用户访谈收集需求与反馈，与各 SIG 组沟通协作，推动用户需求在社区中被接纳和实现，是连接终端用户与开发者社区的重要桥梁。',
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  'zh/sig/TC.html': {
    title: 'TC SIG 兴趣小组',
    description: 'openEuler技术委员会（TC）是社区最高技术决策机构，由19位委员组成，负责制定技术发展方向、协调SIG组间合作、审议SIG的成立与撤销，并定期召开公开例会，推动社区技术治理与资源协调。',
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  'zh/sig/System-tool.html': {
    title: 'System tool SIG 兴趣小组',
    description: 'System-Tool SIG 负责将系统管理工具引入 openEuler 社区，提升操作系统管理效率，推动系统相关软件在多种架构上稳定运行，开展流程优化与质量改进工作，并将社区成果持续回馈上游开源社区，及时响应用户反馈，解决问题。',
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Storage.html": {
    title: "Storage SIG 兴趣小组 | openEuler社区",
    description: "openEuler Storage SIG 负责维护存储相关组件，处理存储领域的 issue，持续探索构建存储生态与竞争力。涵盖 mdadm、btrfs-progs、fuse、parted、ndctl 等核心存储工具的维护与开发，致力于提升 openEuler 在存储领域的技术能力。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Zephyr.html": {
    title: "Zephyr SIG 兴趣小组 | openEuler社区",
    description: "Zephyr SIG 致力于在 openEuler 社区推广面向物联网的嵌入式软件平台 Zephyr，连接 openEuler 与 Zephyr 两大社区。负责在国内推广 Zephyr、促进开发者交流，并将这一 Linux 基金会旗下的嵌入式实时平台引入 openEuler 生态，与各 Linux 版本形成良好互补。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-YuanRong.html": {
    title: "sig-YuanRong SIG 兴趣小组 | openEuler社区",
    description: "sig-YuanRong 负责灵衢 Serverless 分布式计算引擎在 openEuler 社区的演进与维护，致力于构筑函数分布式极简编程和高效分布式运行调度能力，充分发挥灵衢硬件优势，降低开发者使用门槛，联合社区力量推动 Serverless 分布式计算引擎技术演进及全栈应用生态构建。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-WayCa.html": {
    title: "WayCa SIG 兴趣小组 | openEuler社区",
    description: "WayCa SIG 是 openEuler 社区鲲鹏生态的硬件使能层核心小组，负责鲲鹏高速网络、加速器、调测工具、高性能调度、故障处理、能耗管理、虚拟化及基础 IO 等功能的使能与推广，致力于联合开发者共同构建鲲鹏与 openEuler 生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-UnifiedBus.html": {
    title: "sig-UnifiedBus SIG 兴趣小组 | openEuler社区",
    description: "sig-UnifiedBus 负责 openEuler 操作系统灵衢组件的演进与维护，涵盖架构看护、新特性设计评审、代码审核，协同 sig-Kernel、sig-Virt、sig-Long 推动灵衢组件持续演进，承担组件开发、测试、漏洞修复与版本发布工作，并提供灵衢相关技术赋能培训。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-UKUI.html": {
    title: "UKUI SIG 兴趣小组 | openEuler社区",
    description: "UKUI是麒麟软件开发的轻量级Linux桌面环境，专为有Windows使用习惯的用户设计，采用Qt开发，秉承\"友好易用，简单轻松\"理念。UKUI SIG负责在openEuler社区中添加对UKUI的支持，维护相关软件包的规划与升级，并及时响应用户反馈。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-UB-ServiceCore.html": {
    title: "sig-UB-ServiceCore SIG 兴趣小组 | openEuler社区",
    description: "sig-UB-ServiceCore是openEuler社区负责UB灵衢超节点高阶服务的SIG组，承担ServiceCore组件架构看护、新特性评审与代码审核，协同开展超节点协同架构探索，负责开发、测试、漏洞修复与发布，并持续开放对外API规范，赋能开发者共建灵衢技术生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Talent-and-Service.html": {
    title: "sig-Talent-and-Service SIG 兴趣小组 | openEuler社区",
    description: "openEuler人才与服务SIG专注于社区人才培养与服务能力建设，负责制定人才能力标准、推动服务能力参考体系落地。小组定期举办双周远程会议，维护人才能力与服务能力参考项目，汇聚华为等企业核心贡献者，共同推进openEuler生态的人才发展与服务质量提升。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-sw-arch.html": {
    title: "sw-arch SIG 兴趣小组 | openEuler社区",
    description: "sw-arch SIG 致力于在 openEuler 社区中添加对申威（SW）架构的支持，负责实施 openEuler 在申威架构平台下的移植、适配与性能优化工作，同时承担申威架构相关软件包的规划、维护和版本升级，推动申威架构与 openEuler 生态的深度融合。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Space.html": {
    title: "sig-Space SIG 兴趣小组 | openEuler社区",
    description: "sig-Space SIG 面向商业航天与低空经济场景，致力于构建高可靠、强实时、智能化的空间计算基础软件生态。覆盖内核实时性优化、多平台硬件抽象层、空间级可靠性服务、协议中间件及嵌入式AI使能层，推动星载、机载与地面站异构平台的统一开发与协同计算。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-security-facility.html": {
    title: "sig-security-facility SIG 兴趣小组 | openEuler社区",
    description: "sig-security-facility SIG 专注于 openEuler 社区的系统安全建设，负责使能主流 Linux 安全特性，提供 SELinux、AppArmor、TPM、OpenSSL、加密策略等安全工具与基础库，提升系统整体安全性，改善安全技术应用体验，并持续规划 openEuler 未来安全技术方向。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-SDS.html": {
    title: "sig-SDS SIG 兴趣小组 | openEuler社区",
    description: "sig-SDS 专注于 openEuler 分布式存储组件的开发与维护，涵盖 Ceph、Lustre、OpenZFS 等主流存储项目，坚持\"upstream first\"原则，针对 ARM 架构深度优化，打造高质量、高性能、高可靠性的存储生态，构建丰富的南北向生态圈。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-sbom.html": {
    title: "SBOM SIG 兴趣小组 | openEuler社区",
    description: "openEuler SBOM SIG致力于孵化SBOM相关技术，形成社区统一技术路线，赋能合作伙伴快速构建软件物料清单披露能力，积极参与中国SBOM披露标准建设，围绕SBOM构建openEuler软件供应链安全体系，打造开源合规的根社区。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-SBC.html": {
    title: "SBC SIG 兴趣小组 | openEuler社区",
    description: "openEuler SBC SIG 致力于适配 openEuler 运行在 RaspberryPi、Rockchip 等各类单板计算机上，负责维护内测镜像构建、内核源码及构建脚本，维护支持设备列表与适配状态，推动内核补丁合入社区主线，并推动符合要求的镜像成为社区正式发布版本。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-ruby.html": {
    title: "Ruby SIG 兴趣小组 | openEuler社区",
    description: "openEuler Ruby SIG 负责在社区中添加并维护 Ruby 语言支持，涵盖 Ruby 相关软件包的规划、引入、维护与升级，开发 rubygems 转 RPM 的转换工具，推动 Ruby 生态在 openEuler 上持续丰富，并将成果回馈上游社区，及时响应用户反馈与问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-ROS.html": {
    title: "ROS SIG 兴趣小组 | openEuler社区",
    description: "openEuler ROS SIG 致力于在 openEuler 社区中添加对 ROS 和 ROS2 机器人操作系统的支持，持续完成各组件的移植与适配，提供完善的使用文档，并积极响应用户反馈，解决相关问题，推动机器人开发生态在 openEuler 平台上的建设与发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-RISC-V.html": {
    title: "RISC-V SIG 兴趣小组 | openEuler社区",
    description: "openEuler RISC-V SIG 致力于提供 openEuler RISC-V 移植版本，涵盖软件包构建、系统构建等全流程指导，帮助开发者快速上手 RISC-V 开源系统开发。SIG 组每双周举办线上技术交流会议，欢迎对 RISC-V 感兴趣的开发者参与共同建设 openEuler RISC-V 生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-release-management.html": {
    title: "sig-release-management SIG 兴趣小组 | openEuler社区",
    description: "sig-release-management 是 openEuler 发布管理兴趣小组，负责制定开发周期计划、审批各 SIG 技术集成、协调版本变更，并管控向用户发布的软件内容。每两周召开例会，欢迎订阅邮件列表参与讨论，共同推动 openEuler 版本的高质量发布。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-recycle.html": {
    title: "sig-recycle SIG 兴趣小组 | openEuler社区",
    description: "sig-recycle 是 openEuler 社区的回收站 SIG，作为所有未被其他 SIG 维护的软件包的临时占位仓库。技术委员会（TC）将定期评审该 SIG 下软件包的维护状态，并决定后续处置方向。如有相关疑问，请联系技术委员会处理。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-QT.html": {
    title: "QT SIG 兴趣小组 | openEuler社区",
    description: "openEuler QT SIG 负责将 Qt6 各组件持续移植至 openEuler，承担 Qt 相关软件包的规划、维护与版本升级工作，并及时响应用户反馈、解决相关问题。SIG 维护了 qt6-qtbase、qt6-qtmultimedia 等数十个核心组件仓库，每周三定期召开公开会议，欢迎开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-QA.html": {
    title: "QA SIG 兴趣小组 | openEuler社区",
    description: "openEuler QA SIG 专注社区质量保障，涵盖版本测试、测试工具开发、发布标准制定与维护，以及测试开放日活动运营。团队开源测试能力，助力社区开发者提升代码开发与测试验证效率，持续推动 openEuler 社区整体质量提升。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-python-modules.html": {
    title: "sig-python-modules SIG 兴趣小组 | openEuler社区",
    description: "sig-python-modules 是 openEuler 社区专注于 Python 模块维护的 SIG 兴趣小组，负责通过自动化工具创建和管理各类 Python 模块软件包，涵盖 pysaml2、python-invoke、python-Flask-Limiter 等多个项目，致力于为 openEuler 生态提供丰富、稳定的 Python 组件支持。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-power-efficient.html": {
    title: "sig-power-efficient SIG 兴趣小组 | openEuler社区",
    description: "sig-power-efficient SIG 致力于通过操作系统调节提升服务器能效，响应绿色能源与碳减排需求。主要工作包括：为应用层提供统一的 powerapi 进行能效管理，以及提供节点级自动调节能力，涵盖基于能效的 CPU 调频、CPU 核隔离、磁盘与网卡能效管理等方案。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-porting-platform-winapp.html": {
    title: "Porting Platform WinApp SIG 兴趣小组 | openEuler社区",
    description: "Porting Platform WinApp SIG 专注于 openEuler 社区中 Windows 应用迁移的软件开发与维护工作，助力开发者将 Windows 应用高效迁移至 openEuler 平台。维护 vs2qt 等迁移工具项目，每两周定期召开会议，欢迎开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-perl-modules.html": {
    title: "sig-perl-modules SIG 兴趣小组 | openEuler社区",
    description: "sig-perl-modules 是 openEuler 社区负责管理自动化工具生成的 Perl 模块的 SIG 小组，提供 SPEC 模板与常用宏支持，致力于推动 Perl 模块在 openEuler 系统中的集成与维护，欢迎开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-OSCourse.html": {
    title: "sig-OSCourse SIG 兴趣小组 | openEuler社区",
    description: "sig-OSCourse 是 openEuler 社区的操作系统课程兴趣组，致力于基于新兴硬件与最新内核技术提供开源操作系统教材、课件及实训内容，面向科研机构、高校及学生免费开放，同时鼓励社区贡献者共同维护和拓展课程资源，助力国内操作系统基础教育发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-OS-Builder.html": {
    title: "sig-OS-Builder SIG 兴趣小组 | openEuler社区",
    description: "sig-OS-Builder 负责 openEuler 操作系统的构建、安装与升级核心能力，维护 grub2、anaconda、dnf、lorax 等关键软件包，提供便捷的 ISO 构建与换标方案，支持网络安装、双区升级等多种安装升级方式，助力厂商与开发者高效实现自定义构建与部署。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-ops.html": {
    title: "sig-Ops SIG 兴趣小组 | openEuler社区",
    description: "sig-Ops 专注于系统运维的可视化、自动化与智能化，致力于构建高可靠、高性能、不间断的基础设施。提供热补丁、热替换软件技术，支持问题诊断、性能分析与系统监控，推动全栈操作系统的运维创新与开源生态发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-openstack.html": {
    title: "OpenStack SIG 兴趣小组 | openEuler社区",
    description: "OpenStack SIG 负责在 openEuler 社区中维护和推进 OpenStack 云计算平台的集成与适配工作，致力于为用户提供稳定、高性能的 OpenStack 发行版，促进 OpenStack 与 openEuler 操作系统的深度融合，推动开源云基础设施生态的持续发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-OpenDesign.html": {
    title: "OpenDesign SIG 兴趣小组 | openEuler社区",
    description: "OpenDesign SIG 致力于为 openEuler 及开源社区提供设计语言与规范，开发并维护组件库、模版及前端开发方案，覆盖社区网站、小程序等场景，降低开发者贡献门槛，构建高质量的交互体验设计与开发工具集。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-OceanBase.html": {
    title: "OceanBase SIG 兴趣小组 | openEuler社区",
    description: "OceanBase SIG 负责将 OceanBase 分布式关系型数据库适配并维护于 openEuler 平台。OceanBase 由蚂蚁集团自主研发，基于 Paxos 协议与分布式架构，具备高可用与线性扩展能力，于2021年正式开源。本 SIG 维护 oceanbase-ce 软件包，推动其在 openEuler 生态中的集成与持续发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-nodejs.html": {
    title: "Node.js SIG 兴趣小组 | openEuler社区",
    description: "Node.js SIG 负责在 openEuler 社区中添加和维护 Node.js 及其相关软件包，涵盖软件规划、版本升级、npm 转 rpm 工具开发，致力于丰富 Node.js 生态并将成果回馈上游社区，同时及时响应用户反馈、解决相关问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-minzuchess.html": {
    title: "民族棋盟 SIG 兴趣小组 | openEuler社区",
    description: "民族棋盟 SIG 致力于以数字化手段研究和保护非遗文化项目\"民族棋类\"，按各民族地区分工搜集整理棋类样本，推动民族棋的保护与传承。现已发布多依布AI等项目，持续孵化更多民族棋类数字化成果。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Migration.html": {
    title: "Migration SIG 兴趣小组 | openEuler社区",
    description: "openEuler Migration SIG 致力于为社区提供系统迁移兼容性辅助工具与解决方案，降低客户迁移至国产操作系统和国产硬件的门槛。核心项目 migration-assistant 助力企业平滑完成迁移，欢迎开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-message-middleware.html": {
    title: "消息中间件 SIG 兴趣小组 | openEuler社区",
    description: "openEuler 消息中间件 SIG 负责维护 Apache RocketMQ、Kafka、RabbitMQ、Pulsar 等上游开源消息中间件软件包，孵化移动云、华为云等自研消息中间件，提供基于欧拉系统的消息中间件解决方案，并探索欧拉平台上的消息中间件加速方案，定期举办双周例会与 Meetup 技术研讨活动。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-memsafety.html": {
    title: "sig-memsafety SIG 兴趣小组 | openEuler社区",
    description: "sig-memsafety 是 openEuler 社区专注内存安全的兴趣小组，致力于将 Rust 语言的内存安全特性应用于系统组件改写，现维护 utsudo、utshell、curl-rust、libxml2-rust 等多个 Rust 重写项目，助力构建更安全可靠的开源操作系统生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-MCP-Tools-Ecosystem.html": {
    title: "MCP Tools Ecosystem SIG 兴趣小组 | openEuler社区",
    description: "MCP Tools Ecosystem SIG 致力于推动系统命令工具现代化与服务化演进，探索命令向智能接口转型，联动系统管理、云原生、包管理等工具生态，具备 AI 理解与消费能力，助力 openEuler 实现运维自动化、云原生适配与多环境协同。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-mate-desktop.html": {
    title: "mate-desktop SIG 兴趣小组 | openEuler社区",
    description: "mate-desktop SIG 负责在 openEuler 中维护和集成 MATE 桌面环境，该环境是 GNOME2 的延续，包含 42 个组件，支持 GTK3 并与 GNOME3 兼容共存。SIG 致力于为 openEuler 提供直观、轻量的传统桌面体验，同时跟进上游社区修复漏洞，持续增加对新技术的支持。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-LoongArch.html": {
    title: "LoongArch SIG 兴趣小组 | openEuler社区",
    description: "LoongArch SIG 致力于推动 openEuler 对 LoongArch 架构的全面支持，协调工具链、内核、基础库、虚拟机及 API 环境等基础软件生态建设，促进 LoongArch 架构与 openEuler 社区主线版本同步，推动产业链协同创新。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Long.html": {
    title: "异构融合 SIG 兴趣小组 | openEuler社区",
    description: "异构融合SIG（sig-Long）致力于融合异构算力，构建计算基础设施框架，实现统一算力接入、异构融合内存与虚拟化、算力切分、资源优先级配置及弹性迁移等关键能力，降低开发门槛，助力openEuler生态发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-KIRAN-DESKTOP.html": {
    title: "KIRAN-DESKTOP SIG 兴趣小组 | openEuler社区",
    description: "KIRAN-DESKTOP SIG 负责维护 openEuler 社区中 Kiran 桌面环境的相关项目，致力于打造美观、易用、高效的 Linux 桌面操作系统，使其成为 openEuler 官方支持的服务器桌面环境。项目涵盖主题、图标、菜单、屏保、日历、控制面板等多个组件，欢迎社区开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-KDE.html": {
    title: "sig-KDE SIG 兴趣小组 | openEuler社区",
    description: "sig-KDE 是 openEuler 社区负责 KDE 桌面环境的兴趣小组，致力于在 Linux、FreeBSD、Unix 平台上移植和维护 KDE 自由图形桌面环境。小组维护 KDE Frameworks 5（kf5）系列组件及相关工具，包括 extra-cmake-modules、kf5-karchive、kf5-kauth 等核心软件包，欢迎开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-K8sDistro.html": {
    title: "sig-K8sDistro SIG 兴趣小组 | openEuler社区",
    description: "sig-K8sDistro 致力于在 openEuler 社区中适配、维护和创新以 Kubernetes 为核心的云原生发行版，涵盖 KubeSphere、OKD、NestOS、NKD 和 CCPS 等项目，降低用户安装与使用门槛，探索 Kubernetes 发行版在 openEuler 生态中的创新应用，让云原生技术赋能更多用户。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Java.html": {
    title: "sig-Java SIG 兴趣小组 | openEuler社区",
    description: "openEuler Java SIG 致力于将 Java 生态中的高质量开源应用、组件与基础库引入 openEuler 社区，提供 maven、ant、gradle 等构建工具支持，定义打包宏与自动化工具，引入 tomcat、jetty 等重要软件包，并提供完善的构建环境与指引文档，欢迎开发者共同参与。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-intelligence.html": {
    title: "sig-intelligence SIG 兴趣小组 | openEuler社区",
    description: "sig-intelligence 是 openEuler 社区专注于孵化智能体应用及工具链的兴趣小组，致力于结合智能化操作系统加速人工智能技术的推广与应用探索。小组成员来自华为、科大讯飞、麒麟软件、中国移动等企业，双周定期召开例会，共同推动 AI 技术与操作系统的深度融合与创新实践。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Intel-Arch.html": {
    title: "Intel Arch SIG 兴趣小组 | openEuler社区",
    description: "Intel Arch SIG 致力于在 openEuler 上支持 Intel 新硬件特性与平台，加速 Intel 软件垂直栈的交付与优化，协调 Intel 平台发布路线图，推动内核、虚拟化、工具链、基础库及用户态应用等层面的创新，并持续改进 openEuler 在各类 Intel 硬件上的兼容性。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-industrial-control.html": {
    title: "Industrial-Control SIG 兴趣小组 | openEuler社区",
    description: "Industrial-Control SIG致力于将openEuler打造为适用于工业控制与嵌入式领域的实时操作系统，负责Xenomai实时方案维护、Modbus/CANopen/EtherCAT等工业现场总线适配、Preempt_RT内核维护，以及Zephyr、FreeRTOS等RTOS虚拟化移植，推动openEuler在工业控制领域的落地应用。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-IDE.html": {
    title: "sig-IDE SIG 兴趣小组 | openEuler社区",
    description: "sig-IDE 致力于打造专业、易用、高效的嵌入式集成开发环境，支持不同开发场景下的 IDE 定制化需求，提供丰富的开发工具与调试功能，帮助开发者高效完成嵌入式系统的开发、调试与维护工作，助力开发者提升嵌入式软件开发效率。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Hygon.html": {
    title: "Hygon SIG 兴趣小组 | openEuler社区",
    description: "Hygon SIG 专注于 openEuler 对海光（Hygon）硬件平台的全面支持，涵盖内核、虚拟化、工具链、AI 框架及安全可信栈（国密、可信计算、机密计算）等软件栈的落地与优化，协调硬件发布路线图，推动代码上游化，增强兼容性测试，促进 CPU 与整机厂商同 openEuler 社区的技术协作与创新演进。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-HPC.html": {
    title: "sig-HPC SIG 兴趣小组 | openEuler社区",
    description: "openEuler HPC SIG 专注于高性能计算领域，深度优化气象、制造、分子动力学等行业的顶级应用，提升性能与精度。致力于汇聚HPC开发者与用户，推动开源软件在openEuler上的迁移与调优，吸引高校、政府及企业共建HPC软件生态，繁荣HPC+openEuler生态体系。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-high-performance-network.html": {
    title: "sig-high-performance-network SIG 兴趣小组 | openEuler社区",
    description: "sig-high-performance-network 是 openEuler 高性能网络 SIG，负责维护和开发 DPDK、RDMA、XDP 等网络加速技术相关软件包，涵盖基础库、驱动、工具及应用软件。同时推进 UMDK 分布式通信软件栈建设，提升 HPC、大数据及数据库等场景网络性能，打造易用、高性能的 openEuler 网络加速技术生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-haskell.html": {
    title: "Haskell SIG 兴趣小组 | openEuler社区",
    description: "openEuler Haskell SIG 致力于将 Haskell 函数式编程语言的工具链及软件组件生态引入 openEuler 平台，维护 GHC 编译器、Pandoc 文档工具、Alex 词法分析器及 Happy 语法解析器等核心项目，推动 Haskell 生态在国产操作系统上的应用与发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Ha.html": {
    title: "Ha SIG 兴趣小组 | openEuler社区",
    description: "Ha SIG 负责在 openEuler 社区中推进 Ha 高可用相关支持，涵盖 ARM64 平台下的移植、适配与优化，相关软件包的规划、维护和升级，以及多语言文档处理。同时积极将成果回馈上游社区，并及时响应用户反馈，解决实际问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-golang.html": {
    title: "sig-golang SIG 兴趣小组 | openEuler社区",
    description: "openEuler Golang SIG 负责维护 openEuler 社区中 Go 语言相关软件包的开发与适配工作，目前维护 golang 核心仓库。SIG 例会与 CloudNative SIG 合并，每双周周二下午举行，通过邮件申报议题。欢迎开发者通过邮件列表 cloudnative@openeuler.org 参与交流与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Gatekeeper.html": {
    title: "sig-Gatekeeper SIG 兴趣小组 | openEuler社区",
    description: "sig-Gatekeeper 负责维护和改进 openEuler 社区的 CI 自动化门禁体系，涵盖 CI 机器人（辅助 PR 合入）、Jenkins 门禁任务及 OBS 包构建服务，持续优化任务运行效率与用户体验，为开发者提供流畅的自动化工作流程与 CI 问题反馈解决平台。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-FangTian.html": {
    title: "FangTian SIG 兴趣小组 | openEuler社区",
    description: "FangTian是openEuler社区专注视窗引擎技术的SIG组，围绕视窗显示与视窗管理持续构建核心技术，依托创新架构实现多生态高质量兼容，为用户提供高性能、低能耗的流畅操控体验，致力于打造完整繁荣的视窗引擎生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-epol.html": {
    title: "sig-epol SIG 兴趣小组 | openEuler社区",
    description: "sig-epol（Extra Packages for openEuler Linux）是openEuler社区的扩展软件包兴趣小组，作为LTS和创新版本仓库的补充，负责扩展软件生态、制定运作规范、审核软件包合入请求，确保符合安全、隐私、法务及质量要求，孵化优质软件进入基础仓，并培养开发者成为独立SIG maintainer。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-epkg.html": {
    title: "epkg SIG 兴趣小组 | openEuler社区",
    description: "epkg SIG 致力于打造新型包管理体系，支持多版本多环境、原子升级与安全回退、一次适配处处运行。涵盖 epkg 包管理器、二进制格式转换、openEuler 迁移、ISO 安装、嵌入式及云原生场景，为开发者提供便捷的软件发行、安装与环境管理能力。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-embedded.html": {
    title: "Embedded SIG 兴趣小组 | openEuler社区",
    description: "Embedded SIG 致力于 openEuler Embedded 版本的开发与维护，推动 openEuler 在嵌入式设备领域的广泛应用。每双周定期举办开放会议，汇聚社区开发者共同推进嵌入式系统技术创新与版本迭代。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Edge.html": {
    title: "sig-Edge SIG 兴趣小组 | openEuler社区",
    description: "sig-Edge SIG 专注于以openEuler为底座，面向边缘计算领域提供中间件与解决方案，支持Intel、ARM、RISC-V等多芯片平台。致力于将成熟Edge组件移植到openEuler，探索边缘计算新场景，并通过定期Meetup促进技术交流与方案分享，构建开放的边缘计算生态社区。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-ebpf.html": {
    title: "eBPF SIG 兴趣小组 | openEuler社区",
    description: "openEuler eBPF SIG 致力于构建完备的 eBPF 技术生态，聚焦内核可编程基础框架与业务场景两大方向，涵盖 eBPF 运行时创新、云原生网络安全存储、内核可观测性及 eBPF+AI 等前沿领域，联合华为、天翼云、高校及科研机构共同推动 eBPF 技术在 openEuler 社区的创新与上游贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-EasyLife.html": {
    title: "EasyLife SIG 兴趣小组 | openEuler社区",
    description: "EasyLife SIG 致力于实现 src-openeuler 软件包维护的自动化，分三阶段推进：自动化洞察开源软件健康状况、自动提醒软件包更新、实现半自动化更新。帮助 openEuler 社区维护人员高效跟进上游版本，提升软件包维护效率，释放更多精力用于创新与引入新软件包。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-DPU.html": {
    title: "DPU SIG 兴趣小组 | openEuler社区",
    description: "openEuler DPU SIG 致力于推动数据处理单元（DPU）在数据中心的应用，联合NVIDIA、华为等厂商，为各类DPU及智能网卡提供定制化openEuler操作系统支持，探索网络、存储、安全等功能的硬件卸载加速方案，并构建统一的用户编程框架，释放CPU算力，提升数据中心整体性能与效率。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-distributed-middleware.html": {
    title: "sig-distributed-middleware SIG 兴趣小组 | openEuler社区",
    description: "openEuler distributed-middleware SIG 致力于在openEuler操作系统上引入分布式协同能力，支持原生分布式文件系统、数据管理系统及设备发现连接，依托分布式软总线技术实现服务器、智能终端与嵌入式设备生态互通，构建统一分布式接口，简化应用开发，拓展服务器与边缘计算领域生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-DevStation.html": {
    title: "sig-DevStation SIG 兴趣小组 | openEuler社区",
    description: "openEuler DevStation SIG 致力于打造易用的开发者生态，推出集成AI能力的智能开发者工作站 DevStation，帮助开发者通过大模型能力高效完成操作系统交互与控制，远期目标是构建 Agentic OS，持续完善 DevStore 软件商店等配套项目。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-desktop-apps.html": {
    title: "desktop-apps SIG 兴趣小组 | openEuler社区",
    description: "openEuler desktop-apps SIG 致力于为个人桌面用户提供丰富的应用软件，涵盖多媒体、音乐、小游戏、程序员 IDE、金融工具等，满足桌面基本使用诉求。依托社区协作，推动 openEuler 桌面生态建设，打造安全稳定、高性能的 Linux 桌面应用环境。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-DDE.html": {
    title: "sig-DDE SIG 兴趣小组 | openEuler社区",
    description: "sig-DDE 是 openEuler 社区专注于桌面系统的兴趣小组，负责构建和维护完整的 DDE 桌面环境，涵盖控制中心、文件管理器、任务栏、启动器、日历、剪贴板等核心组件，同时开展桌面领域前沿技术探索与研究，推动 openEuler 在桌面场景的生态发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-confidential-computing.html": {
    title: "机密计算 SIG 兴趣小组 | openEuler社区",
    description: "openEuler 机密计算 SIG 致力于基于硬件可信执行环境（TEE）提供简单易用的机密计算软件栈与解决方案，保护使用中的数据安全。SIG 坚持安全、易用、开放三大原则，屏蔽底层硬件差异，兼容上层应用，推动机密计算生态发展，降低机密计算使用门槛。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-compliance.html": {
    title: "合规 SIG 兴趣小组 | openEuler社区",
    description: "openEuler合规SIG专注于解决开源组件的license合规问题，建立合规体系与规范，制定合规流程，开发合规工具，并为社区组织和个人提供合规解决方案与服务。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Compatibility-Infra.html": {
    title: "sig-Compatibility-Infra SIG 兴趣小组 | openEuler社区",
    description: "sig-Compatibility-Infra 是 openEuler 社区专注于兼容性基础设施的 SIG 组，负责探索服务器、主板与操作系统的硬件兼容性测试，研究操作系统与应用程序的兼容性策略及白名单机制，并审查 POSIX/LSB 等标准的规范满足度，提供服务器兼容性检查工具。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-compat-winapp.html": {
    title: "sig-compat-winapp SIG 兴趣小组 | openEuler社区",
    description: "sig-compat-winapp SIG 组致力于将 X86 平台下的海量 Windows 应用移植至 X86/ARM 等架构的 openEuler 系统，提供完善的构建解决方案与指引文档，降低应用迁移门槛，欢迎开发者共同参与 Windows 应用兼容生态建设。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-CloudNative.html": {
    title: "CloudNative SIG 兴趣小组 | openEuler社区",
    description: "CloudNative SIG 致力于为用户、开发者和爱好者提供便捷易用的云原生基础设施，打造高效的云原生应用开发托管环境，共建云原生生态。负责社区云原生相关技术决策、软件包规划与维护升级，及时响应用户反馈并解决问题，每双周召开例会推进工作。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-cinnamon.html": {
    title: "sig-cinnamon SIG 兴趣小组 | openEuler社区",
    description: "sig-cinnamon 是 openEuler 社区负责维护 Cinnamon 桌面环境相关项目的兴趣小组。该 SIG 致力于将 Cinnamon 打造为美观、易用、高效的 Linux 桌面环境，并推动其成为 openEuler 官方支持的服务器桌面环境之一，维护包括 cinnamon-desktop、nemo、muffin 等核心组件在内的多个项目。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-CICD.html": {
    title: "sig-CICD SIG 兴趣小组 | openEuler社区",
    description: "openEuler CICD SIG 负责开发和维护持续集成与持续交付工具 compass-ci，推动其在 openEuler 各项目中的广泛应用，提升社区软件构建、测试与发布的自动化水平，助力 openEuler 生态的高效协同开发。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-BMC.html": {
    title: "sig-BMC SIG 兴趣小组 | openEuler社区",
    description: "SIG-BMC专注于算力基础设施管理面（BMC，即Baseboard Management Controller）的自主可控方案，依托openEuler社区孵化平台，支持X86、ARM、RISC-V等多样性算力架构，推动国产BMC芯片与软件生态建设，致力于解决BMC芯片、驱动层与应用层的兼容性问题，促进开放技术交流与合作。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-bio.html": {
    title: "sig-bio SIG 兴趣小组 | openEuler社区",
    description: "SIG-BIO 专注于推动生物信息学软件在 openEuler 上的适配与发展，提供安装简便、兼容性好的生信开源软件包，构建官方生物信息学软件仓库，覆盖主流生信应用场景，并连接 OS 用户与上游开源社区，推动软件持续演进。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-Arm.html": {
    title: "sig-Arm SIG 兴趣小组 | openEuler社区",
    description: "openEuler sig-Arm 兴趣小组致力于助力鹏腾（鲲鹏、飞腾）及 Arm 架构生态落地，加快架构共性问题在上游社区的解决，收集用户生态需求以支撑 Kernel SIG，并推动迁移工具、优化工具的联合分享与合作开发，促进 Arm 架构在通用计算产业的发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/sig-AccLib.html": {
    title: "sig-AccLib SIG 兴趣小组 | openEuler社区",
    description: "sig-AccLib SIG专注于Accelerator硬件引擎与加速指令的社区化开发，涵盖加解密、数据压缩、网络通信及视频转码等场景的高性能加速，负责UADK等加速库组件在openEuler的使能、维护与演进，推动加速业务生态扩展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/security-committee.html": {
    title: "security-committee SIG 兴趣小组 | openEuler社区",
    description: "openEuler安全委员会（SC）负责接收和响应产品安全问题报告，协助漏洞修复，响应并披露安全问题，推广安全编码规则，参与代码审核，致力于为openEuler用户提供最安全的产品和开发环境。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Runtime.html": {
    title: "Runtime SIG 兴趣小组 | openEuler社区",
    description: "Runtime SIG 是 openEuler 社区专注于运行时环境的兴趣小组，负责维护和优化操作系统运行时库、组件及相关基础设施，推动运行时技术在 openEuler 平台上的研发与落地，欢迎开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Programming-language.html": {
    title: "Programming-language SIG 兴趣小组 | openEuler社区",
    description: "Programming-language SIG 致力于将开发环境相关组件引入 openEuler 社区，提升开发效率，推动相关软件包在不同架构上稳定运行，持续开展流程优化和质量提升工作，并积极将社区成果回馈上游，及时响应用户反馈，解决开发环境相关问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Packaging.html": {
    title: "Packaging SIG 兴趣小组 | openEuler社区",
    description: "openEuler Packaging SIG负责制定和维护社区软件包打包规范与依赖规范，执行包引入和退出机制，管理公共软件包，协调各SIG组的软件包划分与依赖冲突，并协同发布经理和QA团队支撑社区版本发布，同时建立包管理工具框架以实现自动化和可溯源。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/oVirt.html": {
    title: "oVirt SIG 兴趣小组 | openEuler社区",
    description: "oVirt SIG 负责在 openEuler 社区中添加和维护 oVirt 支持，承担 ARM64 平台下的移植、适配与优化工作，管理相关软件包的规划与升级，处理多语言文档，并积极将成果回馈上游社区，同时及时响应用户反馈，解决问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Others.html": {
    title: "Others SIG 兴趣小组 | openEuler社区",
    description: "Others SIG 是 openEuler 社区的特别兴趣小组，负责管理和维护暂未归类到其他 SIG 的项目与仓库。小组通过定期会议协作推进相关工作，欢迎社区成员通过邮件列表或即时通讯参与贡献，共同推动 openEuler 开源生态发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Networking.html": {
    title: "Networking SIG 兴趣小组 | openEuler社区",
    description: "Networking SIG 负责在 openEuler 社区中推进网络相关功能支持，承担网络软件包的规划、选型与维护工作，积极将社区成果回馈上游社区，并及时响应用户反馈、解决网络领域相关问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Marketing.html": {
    title: "Marketing SIG 兴趣小组 | openEuler社区",
    description: "Marketing SIG 负责组织 openEuler 社区活动，包括 Meetup、Summit、在线直播等多种形式，协调社区成员参与并开展广泛宣传推广工作。同时与其他社区和组织机构联合举办活动，通过定期 SIG 会议沟通活动机会、协调组织工作，推动 openEuler 社区持续发展壮大。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Kernel.html": {
    title: "Kernel SIG 兴趣小组 | openEuler社区",
    description: "Kernel SIG 负责维护 openEuler 社区的 Linux 内核，基于上游内核融合新特性、硬件支持、性能优化与安全增强，为 openEuler 及下游发行版提供稳定可靠的内核基座。内核分创新版本和 LTS 长期维护版本，LTS 版本至少维护4年，保障系统安全稳定。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/iSulad.html": {
    title: "iSulad SIG 兴趣小组 | openEuler社区",
    description: "iSulad SIG 负责 openEuler 社区中 iSulad 轻量级容器引擎的技术决策、软件包规划与维护升级，及时响应用户反馈并解决问题。维护 iSulad、lcr、clibcni、isula-build 等核心项目，每双周召开例会，欢迎通过邮件列表 isulad@openeuler.org 参与交流。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Infrastructure.html": {
    title: "Infrastructure SIG 兴趣小组 | openEuler社区",
    description: "Infrastructure SIG 负责 openEuler 社区基础设施的系统功能开发与维护，涵盖代码托管（Gitee）、CI 构建、社区门户及邮件系统等核心服务，确保社区平台稳定高效运行。每月定期召开例会，欢迎开发者参与共建。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/GNOME.html": {
    title: "GNOME SIG 兴趣小组 | openEuler社区",
    description: "GNOME SIG 负责在 openEuler 社区中集成和维护 GNOME 图形桌面环境，涵盖相关软件包的规划、升级与日常维护，致力于为 Unix/类 Unix 系统提供功能完善、操作简便的桌面体验，并及时响应用户反馈、解决社区相关问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/G11N.html": {
    title: "G11N SIG 兴趣小组 | openEuler社区",
    description: "G11N（全球化）SIG负责openEuler的国际化（I18N）与本地化（L10N），为全球开发者提供专业语言服务平台，支持多语种翻译团队，推广翻译最佳实践与本地化流程，分享开源行业洞察，致力于跨越语言与文化障碍，壮大openEuler全球社区。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/ecopkg.html": {
    title: "ecopkg SIG 兴趣小组 | openEuler社区",
    description: "ecopkg SIG 是 openEuler 社区负责管理生态软件包的兴趣小组，专注于统一维护暂未归属其他 SIG 组的各类生态软件包。小组汇聚了来自华为、麒麟、Intel、统信等多家企业的资深 Maintainer，协同推动 openEuler 生态软件包的规范管理与持续完善。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/doc.html": {
    title: "doc SIG 兴趣小组 | openEuler社区",
    description: "openEuler文档兴趣小组（doc SIG）专注于openEuler版本文档的构建与发布，负责文档规划、问题检查与修改、多语言翻译校对，并积极响应用户反馈。该小组欢迎开发者参与文档贡献，共同提升openEuler项目的文档质量与用户体验。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/dev-utils.html": {
    title: "dev-utils SIG 兴趣小组 | openEuler社区",
    description: "dev-utils SIG 专注于为开发者提供实用工具、SDK 及开发库，涵盖性能分析、网络监控、系统诊断等方向，维护 htop、netperf、iftop、nmon 等多款开源工具，助力开发者提升效率。每两周定期召开会议，欢迎社区开发者参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Desktop.html": {
    title: "Desktop SIG 兴趣小组 | openEuler社区",
    description: "Desktop SIG 负责将桌面和图形相关公共组件引入 openEuler 社区，支持第三方桌面应用平稳运行，推动桌面与图形库在多架构上兼容运行，引入易用桌面工具提升开发效率，持续优化相关流程质量，并将社区成果回馈上游，及时响应用户反馈与问题。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/DB.html": {
    title: "DB SIG 兴趣小组 | openEuler社区",
    description: "DB SIG 负责维护 openEuler 社区的数据库开源软件包，涵盖 MySQL、MariaDB、PostgreSQL 和 openGauss 等主流数据库，致力于引入更多 OLTP 数据库及生态工具，推动数据库产品软件生态的完善与发展，欢迎全球开发者共同参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Computing.html": {
    title: "Computing SIG 兴趣小组 | openEuler社区",
    description: "Computing SIG 是 openEuler 操作系统泛计算领域兴趣小组，负责基础功能软件包、C/C++ lib库、设备管理及多媒体等底层库的维护与升级，同时探索计算领域新技术，并提名优秀贡献者为 Committer，推动社区持续发展。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Compiler.html": {
    title: "Compiler SIG 兴趣小组 | openEuler社区",
    description: "openEuler Compiler SIG 专注于编译器技术的交流与共享，涵盖 GCC、LLVM、OpenJDK 及程序优化技术，汇聚学术界与产业界专家共同推动编译技术发展。SIG 每两周举办一次线上技术会议，并定期组织线下沙龙，探讨编译领域前沿话题，欢迎对编译技术感兴趣的开发者加入。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/bigdata.html": {
    title: "大数据 SIG 兴趣小组 | openEuler社区",
    description: "openEuler 大数据SIG负责构建openEuler平台上的大数据处理能力，涵盖数据采集、传输、存储、分析与可视化等基础运行能力，提供集成化大数据平台，并持续优化Hadoop、Spark、Zookeeper等主流组件的性能，同时支持新芯片与软件的大数据能力集成。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Base-service.html": {
    title: "Base-Service SIG 兴趣小组 | openEuler社区",
    description: "Base-Service SIG 负责维护 openEuler 系统的基础构建工具（如 gcc、make、git）、基础运行环境库（如 dbus、systemd、cronie）及常见应用（如 vim、zip）。小组通过邮件列表协作，致力于为 openEuler 提供稳定、可靠的底层软件基础，欢迎开发者通过 dev@openeuler.org 参与贡献。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/Application.html": {
    title: "Application SIG 兴趣小组 | openEuler社区",
    description: "Application SIG 专注于将服务器领域常用应用软件引入 openEuler 社区，推动应用程序在多架构上稳定运行，开展应用优化与质量提升工作，并将成果回馈上游社区。小组以软件移植为核心，通过邮件讨论协作，及时响应用户反馈，持续完善社区应用生态。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/ai.html": {
    title: "AI SIG 兴趣小组 | openEuler社区",
    description: "openEuler AI SIG 负责构建AI基础设施框架，支持CPU/GPU/NPU等XPU的统一接入，提供异构融合内存、虚拟化及算力切分能力，助力训推加速与训推混部场景，维护TensorFlow、PyTorch等主流AI项目在openEuler上的适配与优化。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/sig/A-Tune.html": {
    title: "A-Tune SIG 兴趣小组 | openEuler社区",
    description: "A-Tune SIG 专注于系统调优领域的技术探索与AI辅助性能分析，致力于通过智能化手段提升系统运行效率。旗下维护 A-Tune、A-Tune-UI、A-Tune-Collector、EulerCopilot 等多个开源项目，为 openEuler 操作系统提供全方位的性能调优解决方案。",
    keywords: 'openEuler,SIG,兴趣小组,开源社区,Linux,开源操作系统,社区贡献,开源协作',
  },
  "zh/projects": {
    title: "openEuler社区创新开源项目全览：AI、容器、虚拟化与安全 | openEuler社区",
    description: "探索openEuler社区孵化的创新开源项目，涵盖Intelligence BooM大模型全栈解决方案、iSula容器引擎、StratoVirt虚拟化、secGear机密计算、A-Tune智能调优、毕昇JDK等20+核心组件，助力开发者构建高性能、安全可靠的基础软件生态。",
    keywords: 'openEuler,开源项目,Intelligence BooM,iSula,StratoVirt,secGear,A-Tune,毕昇JDK,容器引擎,虚拟化,机密计算,AI开源',
  },
  "zh/personal-data-collection-overview": {
    title: "openEuler社区个人信息收集清单：账号、论坛、邮件等场景说明 | openEuler社区",
    description: "本页面详细列明openEuler社区在账号服务、论坛服务、邮件列表、内容发布、Meetup申请等场景下收集的个人信息类型、字段及方式，帮助用户了解个人数据的收集目的与范围，保障您的隐私权益。",
    keywords: 'openEuler,个人信息收集,隐私保护,账号服务,论坛服务,邮件列表,个人数据,开源社区,信息安全,Meetup申请',
  },
  "zh/data-sharing-with-third-parties": {
    title: "openEuler社区第三方共享信息清单：合作伙伴数据使用说明 | openEuler社区",
    description: "本页面列出openEuler社区（开放原子开源基金会）与第三方合作伙伴共享用户信息的完整清单，包括百度统计SDK采集的设备与访问数据，以及Authing账号系统所处理的用户身份信息，明确说明各方数据使用目的、共享方式及个人信息处理规则，保障用户知情权。",
    keywords: 'openEuler,第三方共享信息,数据隐私,百度统计SDK,Authing账号,用户信息保护,个人信息处理,开放原子开源基金会,数据共享合作伙伴,隐私政策',
  },
  "zh/contact-us": {
    title: "联系openEuler社区：邮件、微信及活动合作渠道一览 | openEuler社区",
    description: "openEuler社区提供多种联系方式，包括资金捐赠、社区活动、品牌合作等专属邮箱，以及开发者邮件列表 dev@openeuler.org。您还可通过微信号 openeuler123 联系社区小助手，或关注微信公众号、X、LinkedIn、YouTube、Bilibili 等平台，随时获取最新动态与技术支持。",
    keywords: 'openEuler,联系我们,社区联系,邮件列表,微信公众号,品牌合作,社区活动,开源社区,技术支持,开发者社区',
  },
  "zh/showcase/industry-white-paper": {
    title: "openEuler行业白皮书下载 | 电力金融等领域操作系统应用与生态 | openEuler社区",
    description: "openEuler社区发布多份行业白皮书，涵盖电力行业和金融行业操作系统的应用实践与生态发展。深入解析openEuler在关键行业的技术落地路径、生态建设成果及未来发展趋势，助力企业数字化转型与信创建设。",
    keywords: 'openEuler,行业白皮书,电力行业,金融行业,操作系统,开源操作系统,信创,数字化转型,生态发展,Linux',
  },
  "zh/projects/yuanrong": {
    title: "openYuanrong Serverless分布式计算引擎，简化AI与大数据应用开发 | openEuler社区",
    description: "openYuanrong是openEuler社区的Serverless分布式计算引擎，提供多语言函数编程接口，以单机编程体验实现分布式高性能运行。支持Python、Java、C++，涵盖分布式动态调度、异构多级缓存与数据共享，助力AI、大数据、微服务应用高效开发与部署。",
    keywords: 'openYuanrong,openEuler,Serverless分布式计算引擎,分布式动态调度,多语言函数编程,AI大数据开发,异构多级缓存,数据共享,微服务,开源',
  },
  "zh/projects/ub-service-core": {
    title: "UB Service Core灵衢超节点集群服务，加速应用性能30~50% | openEuler社区",
    description: "UB Service Core构筑5大集群级系统服务，涵盖内存、IO、通信、虚拟化与计算引擎，支持不同OS并全面开源至openEuler社区。释放灵衢超节点平等互联架构优势，全面使能应用加速30~50%，助力构建灵衢系统软件生态。",
    keywords: 'UB Service Core,openEuler,灵衢超节点,集群服务,应用加速,开源,内存池化,虚拟化,高性能通信,Scale-Up',
  },
  "zh/projects/ub-os-component": {
    title: "UB OS Component 操作系统灵衢组件——异构硬件统一抽象与高性能通信 | openEuler社区",
    description: "UB OS Component（操作系统灵衢组件）在OS原有内存管理、通信、设备管理和虚拟化框架上扩展支持灵衢，实现异构硬件统一抽象解耦、统一内存地址空间，支持资源全局调度、计算资源动态组合扩展及设备间高性能通信，充分释放灵衢硬件能力。欢迎访问 sig-UnifiedBus 了解更多详情。",
    keywords: 'openEuler,UB OS Component,操作系统灵衢组件,异构硬件,统一抽象,高性能通信,内存管理,虚拟化,sig-UnifiedBus,开源操作系统',
  },
  "zh/projects/intelligence-boom": {
    title: "Intelligence BooM 大模型全栈开源推理解决方案 | openEuler社区",
    description: "Intelligence BooM 是 openEuler 社区联合多方打造的大模型全栈开源 AI 软件栈，涵盖异构融合、任务管理、运行加速等7大平台与20+开源组件，支持 NPU/GPU/CPU 协同推理，提供一键部署与智能体开发能力，助力企业快速落地 AI 应用。",
    keywords: 'Intelligence BooM,openEuler,大模型推理,全栈开源,AI软件栈,异构融合,NPU推理,智能体开发,一键部署,开源AI',
  },
  "zh/projects/intelligence": {
    title: "openEuler 智能化解决方案：低代码构建 Agent 与知识问答应用 | openEuler社区",
    description: "openEuler 智能化解决方案是搭载在 openEuler 上的大模型平台，支持 RAG 知识问答、工作流应用、Agent 智能体及智能调优运维。低代码可视化编排，兼容主流 AI 软件栈，助力企业和开发者 1 天构建专属 AI 应用。",
    keywords: 'openEuler,智能化解决方案,大模型平台,RAG知识问答,Agent智能体,低代码,工作流应用,MCP服务,智能调优,智能运维',
  },
  "zh/projects/docs/UB-Service-Core-SW-Arch-RD-2.0-zh.html": {
    title: "UB Service Core软件架构需求设计文档2.0 | openEuler社区",
    description: "本文档为openEuler社区UB Service Core模块的软件架构需求设计规范（版本2.0），详细描述核心服务组件的架构设计思路、模块划分与接口规范，为开发者理解和参与UB Service Core相关开发提供重要参考依据。",
    keywords: 'openEuler,UB Service Core,软件架构设计,架构需求文档,核心服务组件,模块划分,接口规范,开源社区,Linux,软件开发规范',
  },
  "zh/wiki/install/raspberry-pi": {
    title: "在树莓派上安装 openEuler 24.03 LTS 完整教程 | openEuler社区",
    description: "本文详细介绍在树莓派 3B/3B+/4B 上安装 openEuler 24.03 LTS 的完整流程，包括树莓派镜像的下载获取、SHA256 完整性校验步骤、硬件兼容性要求及最小配置说明。按照本指南，您可以快速完成 openEuler 在树莓派上的部署，开启嵌入式 Linux 开发之旅。",
    keywords: 'openEuler,树莓派,Raspberry Pi,openEuler 24.03 LTS,树莓派镜像,aarch64,SHA256校验,嵌入式Linux,openEuler安装教程,Linux操作系统',
  },
  "zh/wiki/install/macos": {
    title: "在 Mac 上通过 OrbStack 安装并运行 openEuler 虚拟机 | openEuler社区",
    description: "介绍如何在 macOS 平台使用轻量级虚拟机工具 OrbStack 快速获取并运行 openEuler 系统。下载 OrbStack 后，只需点击创建虚拟机并选择 openEuler 版本，即可在命令行中流畅使用 openEuler，操作简单高效，适合开发者快速上手体验。",
    keywords: 'openEuler,OrbStack,macOS虚拟机,Linux虚拟机,openEuler安装,Mac开发环境,轻量级虚拟机,开源操作系统,虚拟机工具',
  },
  "zh/annual-report/openEuler-annual-report-2025": {
    title: "openEuler 2025 社区年报：技术创新与生态发展全景回顾 | openEuler社区",
    description: "openEuler 2025 社区年报全面呈现过去一年的技术突破、生态建设与社区发展成果。涵盖版本发布、贡献者增长、合作伙伴拓展及开源项目进展，见证 openEuler 在操作系统领域的持续创新与全球影响力提升。"
  },
  "zh/annual-report/openEuler-annual-report-2024": {
    title: "openEuler 2024 社区年报：技术突破、生态繁荣与全球协作成果总览 | openEuler社区",
    description: "openEuler 2024 社区年报全面回顾了过去一年社区在技术创新、版本发布、生态建设与全球合作方面取得的重要成果。涵盖贡献者增长、SIG 组活跃度、商业落地进展及开源社区治理亮点，见证 openEuler 迈向新高度的每一步。"
  },
  "zh/interaction/summit-list/summit2025": {
    title: "操作系统大会 & openEuler Summit 2025：AI驱动开源操作系统变革峰会 | openEuler社区",
    description: "操作系统大会 & openEuler Summit 2025 将于2025年11月14-15日在北京中关村国际创新中心举办。大会聚焦 AI For OS、OS For AI 战略，发布 openEuler 在 AI 领域的重磅技术版本，汇聚全球顶尖嘉宾与合作伙伴，共同开启 openEuler 下一个五年新篇章。",
    keywords: 'openEuler Summit 2025,操作系统大会,AI驱动开源操作系统,openEuler,开源操作系统,AI For OS,OS For AI,中关村国际创新中心,操作系统峰会,开放原子开源基金会',
  },
  "zh/interaction/summit-list/devday2025": {
    title: "openEuler Developer Day 2025 开发者大会 | 内核、AI、云原生专题齐聚 | openEuler社区",
    description: "openEuler Developer Day 2025（ODD 2025）是openEuler社区年度开发者大会，聚焦25.03创新版本特性发布，设内核开发、AI生态支持、云与云原生、RISC-V等八大SIG Gathering专题研讨，汇聚开发者共同推动操作系统与基础软件创新突破，欢迎报名参与。",
    keywords: 'openEuler Developer Day 2025,ODD 2025,openEuler开发者大会,内核开发,AI生态支持,云原生,RISC-V,开源操作系统,SIG Gathering,openEuler社区',
  },
  "zh/wiki/install/cloud/introduction": {
    title: "公有云上openEuler镜像使用指南与获取方式 | openEuler社区",
    description: "openEuler已将多个版本的云镜像发布至各大公有云厂商，开发者可通过openEuler官网下载页或各大公有云平台获取最新镜像，快速在云端部署和使用openEuler操作系统，助力云上业务高效运行。",
    keywords: 'openEuler,公有云,云镜像,操作系统,Linux,开源,云端部署,镜像获取,云计算,openEuler社区',
  },
};

export default tdks;

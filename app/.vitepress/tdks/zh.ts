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
  'zh/celebrating': {
    title: 'openEuler 三周年活动 | 社区活动',
    description:
      '了解openEuler 3周年的庆祝活动和社区庆典信息，加入我们一起庆祝。',
    keywords: 'openEuler, 庆祝活动, 社区活动',
  },
  'zh/community/certification-services/down.html': {
    title: '认证服务下载 | 社区服务',
    description:
      '提供openEuler认证服务相关的下载链接和资源，方便社区成员使用。',
    keywords: 'openEuler, 认证服务, 下载',
  },
  'zh/community/certification-services/search.html': {
    title: '认证服务查询 | 社区服务',
    description: '通过本页面查询openEuler认证服务信息，获取所需的认证支持。',
    keywords: 'openEuler, 认证服务, 查询',
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
    title: 'openEuler全部版本下载 | 下载中心',
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
  'zh/interaction/event-list/meetup-feedback': {
    title: 'Meetup反馈 | 社区活动',
    description: '提交您在openEuler Meetup上的体验总结，分享反馈信息。',
    keywords: 'openEuler, Meetup, 反馈, 总结',
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
    title: 'openEuler 隐私政策 | 其他信息',
    description: '了解openEuler的隐私政策，保护您的个人信息和数据。',
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
};

export default tdks;

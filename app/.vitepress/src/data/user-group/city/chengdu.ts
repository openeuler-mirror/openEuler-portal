import 曾强 from '@/assets/category/user-group/chengdu/曾强.png';
import 刘鑫 from '@/assets/category/user-group/chengdu/刘鑫.png';
import 向超 from '@/assets/category/user-group/chengdu/向超.png';
import 吴培泽 from '@/assets/category/user-group/chengdu/吴培泽.png';
import 王伟 from '@/assets/category/user-group/chengdu/王伟.png';

import 曾强Dark from '@/assets/category/user-group/chengdu/曾强-dark.png';
import 刘鑫Dark from '@/assets/category/user-group/chengdu/刘鑫-dark.png';
import 王伟Dark from '@/assets/category/user-group/chengdu/王伟-dark.png';

export default {
  title: '成都用户组',
  organizational: '四川欧拉生态创新中心',
  organizer: [
    {
      name: '曾强',
      position: '四川欧拉生态创新中心',
      technology: [],
      homePage: '',
      avatar: 曾强,
      avatarDark: 曾强Dark,
      email: 'zengqiang50@huawei.com',
      contribution: '',
    },
  ],
  ambassador: [
    {
      name: '王伟',
      position: '成都菁蓉联创科技有限公司',
      technology: ['嵌入式', '边缘云', '混合部署'],
      homePage: 'https://gitee.com/wangwei622_admin',
      avatar: 王伟,
      avatarDark: 王伟Dark,
      contribution:
        '作为一名专注于openEuler的开发者，在openEuler embedded sig组参与BSP建设以及海鸥派的OS、AI建设；在openEuler Industrial Control SIG 组参与混合部署虚拟化建设；',
    },
    {
      name: '刘鑫',
      position: '中国科学院软件研究所',
      technology: ['RISC-V'],
      homePage: 'https://forum.openeuler.org/u/misaka00251',
      avatar: 刘鑫,
      avatarDark: 刘鑫Dark,
      contribution:
        'openEuler RISC-V sig maintainer，参与 openEuler RISC-V 的各项工作。',
    },
  ],
  member: [
    {
      name: '吴培泽',
      position: '数有云（成都）科技有限公司',
      technology: [],
      homePage: '',
      avatar: 吴培泽,
      contribution: '',
    },
    {
      name: '向超',
      position: '四川讯方信息技术有限公司',
      technology: [],
      homePage: '',
      avatar: 向超,
      contribution: '',
    },
  ],
  news: [
    {
      date: '2023-11-25',
      summary:
        'openEuler成都用户组以及电子科技大学 openEuler技术小组，为四川区域用户和高校学生构建持续学习交流openEuler的平台。',
      archives: '2023-11',
      articleName: '20231127-cs.md',
      author: ['openEuler'],
      banner: 'img/banners/1127-cs.jpeg',
      type: 'news',
      title:
        '活动回顾 | openEuler Meetup 成都站，产学研共建 openEuler 用户生态',
      tags: ['openEuler'],
      path: 'zh/news/20231127-cs/20231127-cs',
      lang: 'zh',
      category: 'news',
    },
  ],
  showcase: [
    {
      summary:
        '性能卓越，稳定可靠，环境级高可用， 智能运维，安全性，自主可控，可移植、易操作',
      path: 'zh/showcase/others/starvcenter/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '用户背景 四川中电启明星信息技术有限公司成立于1999年，本部设在成都，主要服务于能源企业和大中型集团。公司以云网大数据为依托，全面支撑新型电力系统建设，致力于成为国内领先的智慧能源平台型互联网企业。 应用场景 StarVCenter是基于openEuler定制的自主创新云平台，帮助企业自建私有云，提供云主机、云网络等基础设施服务，兼容鲲鹏、飞腾、海光、兆芯等芯片服务器，满足企业对异构算力的需求。在StarVCenter上，企业可灵活搭建PaaS和SaaS应用。StarVCenter已在电力、医药、IDC、科研院所、教育、医疗等多领域销售，累计发行50多个版本，入池节点超过20000台，稳定运行虚拟机超过30万台。 业务挑战 目前市面上主流云平台都是基于X86架构构建，对于ARM架构的支持仍然存在不足，包括配套云组件缺失、性能不足等问题，缺少一款适配ARM架构全套能力的云平台来满足企业用户对异构算力的多样化需求。 解决方案 超融合I/O性能 CEPH超融合场景，给合openEuler全局缓存、KAEzip块压缩，I/O综合性能提升20%。 存储读性能 CEPH超融合场景，采用Nvme SSD+智能预取组件 资源利用率 低负载场景，采用虚拟机V-Turbo、资源超分，CPU与内存利用率提升100%。 虚拟机能效 得益于鲲鹏处理器的高效能和BoostKit套件对KVM的深度优化，虚拟机能效提升80%。 虚拟机网络性能 结合SR-IOV与OVS流表网卡加速，对虚拟机业务网络综合性能提升200%。 容器性能 基于openEuler的轻量级容器iSula 定制应用部署，开销更小，容器调用性能提升260%。 客户价值 StarVCenter能为客户搭建高可用、高安全、高效能的云底座，满足企业等保三级要求 整合客户现场复杂的软硬件环境，提供完备的云主机、云存储、云网络、云容器等虚拟化服务 给合openEuler和全局缓存组合、KAEzip块压缩，I/O综合性能提升20%。 基于openEuler的轻量级容器iSula 定制应用部署，开销更小，容器调用性能提升260%。 伙伴',
      industry: '其他',
      company: '四川中电启明星技术有限公司',
      lang: 'zh',
      type: 'showcase',
      title: '四川中电启明星技术有限公司（StarVCenter云平台）',
      category: 'showcase',
    },
    {
      summary: 'IT 基础设施建设创新，引领信创云标准',
      path: 'zh/showcase/others/cdu/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 成都城安院作为全国首家集“立”、“学”、“研”为一体的城市安全与应急管理研究院。在产业自主创新大趋势背景下,提前融合新技术，布局网信产业，提高城安院的信息化自主创新能力是非常现实的需求。面对日益庞大的业务系统管理和运维需求，城安院采用信创云作为全院系统，从底层达到自主创新的标准建设。 解决方案 服务器:飞腾 S2500 产品类型: 银河麒麟高级服务器操作系统 V10、银河麒麟云平台软件 V5.2 业务系统:城安院核心生产系统 客户价值 项目意义:省内第一个网信云项目，麒麟云做国内自主创新的云平台在技术上获得了客户认可，同时也为网信云平台制y定了技术规范。 规模化推广:验证了麒麟云在应急管理方面的生产业务场景下稳定运行，并可以快速实现规模化推广，同时为推广银沪麒麟云平台，以及网信云平台的推广积累了宝贵经验。 合作伙伴',
      industry: '其他',
      company: '成都城安院应急管理信创云平台建设项目',
      lang: 'zh',
      type: 'showcase',
      title: '成都城安院应急管理信创云平台建设项目',
      category: 'showcase',
    },
    {
      summary: '利用openEule操作系统构建商业卫星数智基座',
      path: 'zh/showcase/others/jingrong2/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 随着通信、网络、航天技术的不断发展，卫星的功能越来越强，对有效载荷控制的星载计算机提出了更高的要求。星载计算机软硬件系统日趋复杂，传统的星载计算机软硬件设计方法，已逐渐不适应这种要求。基于宇航级智能化实时操作系统的基础底座构建，有效解决上述问题，支持航天国产化芯片，人工智能框架构建，协议中间件兼容、以及星务软件部署等技术，并在卫星上实现产业化，推动航天产业的高速发展。 业务挑战 随着卫星性能的提升，卫星载荷嵌入式操作系统针对实时性、安全性、可靠性以及易用性都需要针对性的研发，航天数智基座的建设迫在眉睫。 解决方案 基于openEuler主要技术创新，包含： 在实时性方面，卫星载荷要求的中断延迟与任务调度延迟越来越苛刻，需要嵌入式操作系统提升内核的硬实时响应能力。如：任务切换时间小于10us，中断响应小于10us。 在安全性方面，已形成星载载荷安全技术的操作系统研究方法，提供全方位的安全控制策略。通过内核空间内存和用户空间内存资源隔离，防止内核数据被非法传递到用户空间内存。操作系统同时支持异常信息采集并回传地面实时安全态势感知 在高可靠方面，内核分区设计实现单粒子防护，提供自动恢复错误分区的功能。充分考虑系统尺寸的精简性和系统资源利用的有效性，基于内核中断和异常机制，设计星载黑匣子功能，实现星载实时监控。 在高易用性方面，菁蓉联创欧拉版基础软件平台包括嵌入式操作系统内核、板级支持包、基础库函数、遥测遥控等，并实现对应用软件进行安装、运行、卸载、状态监控等在轨功能。 客户价值 统型的卫星载荷嵌入式操作系统平台 满足“通导遥”等不同类型商业卫星的基础库支持 支持多种卫星载荷特色功能 方便快速产业化，加速卫星制造',
      industry: '其他',
      company: '成都菁蓉联创科技有限公司',
      lang: 'zh',
      type: 'showcase',
      title: '成都菁蓉联创科技有限公司（卫星载荷欧拉嵌入式操作系统产品）',
      category: 'showcase',
    },
    {
      summary:
        '可弹性伸缩、资源动态调度、高可用、便于快速开发持续交付的PaaS云平台',
      path: 'zh/showcase/others/zhongdian/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '用户背景 四川中电启明星信息技术有限公司成立于1999年，本部设在成都，注册资金3.7亿元，人员规模1000余人，是国家规划布局内的重点软件企业。主要服务于能源企业和大中型集团。公司以云网大数据为依托，全面支撑新型电力系统建设，致力于成为国内领先的智慧能源平台型互联网企业 应用场景 云原生技术自2015年正式诞生以来，以种势不可挡的趋势迅速席卷全球的科技产业，并同时在互联网、金融、制造、零售等各行业遍地开花，推动了企业在数字化时代,实现以应用为中心的业务变革启明星容器云平台通过多年的建设,目前已在多个大型项目成功使用，拥有大量的成功案例。如国家电网中电启明星公司星云平台、国网中电启明星低代码平台、一体化统一权限平台、国网信产集团“思极云”等 解决方案 启明星容器云平台运行于openEuler操作系统之上，集成了isula或Docker容器运行时，并与Kubernetes无缝结合，构建了一个面向租户的serverless应用管理平台。借助DevOps和其他云原生技术，平台实现了资源的弹性伸缩、动态调度与高可用性，为用户提供了便捷的PaaS云服务。此外，平台自带的企业级应用商店开箱即用，大大减少了开发和部署的复杂性，从而提高了效率。为增强可观测性，平台还内置了多维度监控和统一日志管理功能，全面支持应用的生命周期管理。 客户价值 分布式调度： 提供完整分布式调度能力，支持跨地域的多个资源池的统一调度和管理 弹性伸缩： 可实时监控容器的关键性能指标，并根据调度策略进行实时运算，针对已过载的容器进行动态扩容 安全可控： 支持创建并使用用户私有镜像，同时确保镜像的分享安全，团队的协作便利 性能优化： 使得基于欧拉生态的容器云产品能够为客户提供更高效的运行环境，帮助客户提升业务处理能力，同时降低能源消耗，有助于降低运营成本 安全可控： 使得基于欧拉生态的容器云产品能够为客户提供更高效的运行环境，帮助客户提升业务处理能力，同时降低能源消耗，有助于降低运营成本 生态协同： 结合欧拉生态丰富软件资源和BoostKit应用使能，容器云产品能够为各类应用提供全面的支持。客户可以在同一生态中获取到所需的各类服务和支持，大大简化了IT开发和运维的复杂性。 创新驱动： 信创和欧拉生态都是创新驱动的，持续推出新的技术和产品。客户可以通过使用容器云产品，获取到最新的技术成果，提升业务的竞争力。 伙伴',
      industry: '其他',
      company: '四川中电启明星技术有限公司',
      lang: 'zh',
      type: 'showcase',
      title: '四川中电启明星技术有限公司（SKE容器云平台）',
      category: 'showcase',
    },
    {
      summary:
        '结合openEuler，KubeEdge及iSulad技术，打造出无人装备统一操作系统。',
      path: 'zh/showcase/others/jingrong1/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 随着智能化等前沿科技快速发展，无人装备在军事、应急、交通等领域的应用越来越广泛，应用场景也越来越复杂，包括无人设备之间的协同作业、交通管理、急救响应等多种情况，对操作系统提出了更高的要求，无人装备统一操作系统，采用新型边端协同计算架构，能够实现无人机和无人车、机器狗等无人装备的存储、计算等能力和资源在系统中的合理分配，不同的无人装备子系统之间通过关键任务分布式通信中间件高效协同，为复杂的无人装备协调操作场景铺平道路。 业务挑战 实现有人/无人装备协调、无人装备协同以及云边协同的业务挑战主要集中在几个关键领域： 首先，协同效能问题，需要考虑无人装备和有人装备间接口的兼容性和通信的有效性，适应并优化驱动设备的性能。 其次，是实时性问题，确保无人装备之间、有人与无人装备之间的数据传输和响应能够满足实时需求。 第三，是云边协同中的安全与隐私保护，需要实现在传输和存储过程中数据的安全，包括有效的加密和访问控制等措施。 第四，是处理技术更新与设备升级的挑战，需要考虑如何高效、安全地进行OTA升级，并实现平滑的过渡。最后，是对于无人装备协同中资源的合理管理和调度，以达成任务需求和提升系统操作效率。 解决方案 基于openEuler主要技术创新，包含： 1、基于Jailhouse实现openEuler与UniProton双系统混合部署，openEuler域主要处理与云端的通信以及边缘计算任务，如无人装备间协同、有人无人装备协同、数据分析与处理、设备状态监控与报告、远程设备管理以及提供OTA服务。UniProton系统主要负责无人装备的实时性任务，包括设备间的协同控制。双系统紧密协同，保障系统高效与安全运行，在满足多样化需求的同时，未来有望通过这种混合部署的方式更好地推动有人/无人装备协同和云端/边缘协同的发展。 2、基于openEuler构建关键任务分布式通信中间件优化有人无人及无人装备间的协同通信。以其实时性和高效性满足了设备间互动的实时需求，以及响应的高速性需要。通过采用发布-订阅模型，不仅减轻了通信的复杂度，也提升了数据传输效率，同时它的支持多种通信模式，为不同需求的设备协同工作提供了全面的解决方案。在设备数量增加或者网络环境发生变化的情况下，都能确保系统的稳定运行和数据的完整性，提高了有人无人、无人装备协同的运算效率和安全性。 客户价值 基于openEuler的统型的无人装备操作系统平台， 能有效地连接有人、无人装备，能够满足包括全面感知无人环境、实时可靠的数据和命令传输、无人设备间的协同互动、智能化数据处理及保证数据隐私的行业需求。',
      industry: '其他',
      company: '成都菁蓉联创',
      lang: 'zh',
      type: 'showcase',
      title: '成都菁蓉联创（无人装备统一操作系统）',
      category: 'showcase',
    },
  ],
};

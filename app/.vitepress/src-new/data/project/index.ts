import aTune from '~@/assets/category/projects/a-tune.png';
import iSula from '~@/assets/category/projects/iSula.png';
import secGear from '~@/assets/category/projects/secGear.png';
import stratoVirt from '~@/assets/category/projects/stratoVirt.png';
import intelligence from '~@/assets/category/projects/intelligence.png';
import yuanrong from '~@/assets/category/projects/yuanrong.png';

import IconCodeRepo from '~icons/yuanrong/icon-code-repo.svg';
import IconDocument from '~icons/yuanrong/icon-document.svg';
import IconWhitePaper from '~icons/yuanrong/icon-white-paper.svg';

export * from './intelligence-boom';

export const projectData = {
  zh: [
    {
      title: 'Intelligence BooM',
      desc: 'Intelligence BooM AI开源基础软件栈是联合多家社区、伙伴成员一起打造的大模型全栈开源解决方案，包含异构融合平台、任务管理平台、数据管理平台、运行加速平台、智能应用平台及全栈安全平台等7大平台，20+开源组件。',
      icon: '',
      url: '/projects/intelligence-boom',
      giteeUrl: '',
      tag: 'NEW',
    },
    {
      title: 'UB Service Core',
      desc: 'UB Service Core构筑5大集群级系统服务，支持不同OS并全面开源至openEuler社区，释放超节点平等互联架构优势，全面使能应用加速30~50%，促进灵衢系统软件生态构筑。',
      icon: '',
      url: '/projects/ub-service-core',
      atomgitUrl: '',
      tag: 'NEW',
    },
    {
      title: 'UB OS Component',
      desc: '操作系统灵衢组件（UB OS Component）是在OS原有内存管理、通信、设备管理和虚拟化框架上扩展支持灵衢，实现异构硬件统一抽象解耦、统一内存地址空间，支持资源全局调度、计算资源动态组合扩展、设备间高性能通信，释放灵衢硬件能力',
      icon: '',
      url: '/projects/ub-os-component',
      atomgitUrl: '',
      tag: 'NEW',
    },
    {
      title: 'A-Tune',
      desc: 'A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态',
      icon: aTune,
      url: '/other/projects/atune/',
      atomgitUrl: 'https://atomgit.com/openeuler/A-Tune',
    },
    {
      title: 'iSula',
      desc: 'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求',
      icon: iSula,
      url: '/other/projects/isula/',
      atomgitUrl: 'https://atomgit.com/openeuler/iSulad',
    },
    {
      title: 'secGear',
      desc: 'secGear是面向计算产业的机密计算安全应用开发套件，旨在方便开发者在不同的硬件设备上提供统一开发框架，让用户不感知底层各种机密计算架构和接口的差异，目前secGear支持Intel SGX硬件和ARM Trustzone(安全os支持iTrustee)',
      icon: secGear,
      url: '/other/projects/secgear/',
      atomgitUrl: 'https://atomgit.com/openeuler/secGear',
    },
    {
      title: 'NestOS',
      desc: 'NestOS正式推出双模式版本， 该版本整合了NestOS For Container 和 NestOS For Virt这两个模式到一个ISO镜像中， 旨在满足云场景中容器化和虚拟化两种主要场景下用户的多样需求，专注于提供最佳的容器主机和虚拟化解决方案',
      icon: '',
      url: '/nestos',
      atomgitUrl: 'https://atomgit.com/openeuler/NestOS',
    },
    {
      title: 'StratoVirt',
      desc: 'StratoVirt是面向云数据中心的企业级虚拟化VMM (Virtual Machine Monitor)，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。',
      icon: stratoVirt,
      url: '/other/projects/stratovirt/',
      atomgitUrl: 'https://atomgit.com/openeuler/stratovirt',
    },
    {
      title: 'BiSheng JDK',
      desc: '毕昇JDK作为OpenJDK的下游，是一款高性能、可用于生产环境的OpenJDK发行版。毕昇JDK对华为内部应用场景中遇到的一些性能问题和稳定性问题进行了修复，并在ARM架构上进行了性能优化和稳定性增强，在ARM架构上更稳定，在大数据等场景下可以获得更好的性能。',
      icon: '',
      url: '/other/projects/bishengjdk/',
      atomgitUrl: 'https://atomgit.com/openeuler/bishengjdk-8',
    },
    {
      title: 'openEuler 智能化解决方案',
      desc: 'openEuler 智能化解决方案是搭载在 openEuler 上的大模型平台，具有对接支持 openAI 大模型、构建本地知识库的基础功能；也具备注册语义接口和mcp服务、构建Agent和工作流应用等功能。支持web和客户端两种形式，为开发者和企业的使用提供了巨大的便利',
      icon: intelligence,
      url: '/projects/intelligence/',
      atomgitUrl: 'https://atomgit.com/openeuler/euler-copilot-framework',
    },
    {
      title: 'openYuanrong',
      desc: 'openYuanrong是一个Serverless分布式计算引擎，致力于以一套统一Serverless结构支持AI、大数据、微服务等各类分布式应用。它提供多语言函数编程接口，以单机编程体验简化分布式应用开发；提供分布式动态调度和数据共享能力，实现分布式应用的高性能运行和集群的高校资源利用',
      icon: yuanrong,
      url: '/projects/yuanrong',
      atomgitUrl: '',
    },
  ],
  en: [
    {
      title: 'Intelligence BooM',
      desc: 'Intelligence BooM is an open source AI foundational software solution, the result of a joint effort by community members and partners. It comprises over 20 open source components and the 7 major platforms: heterogeneous convergence, task management, data management, runtime acceleration, domain model platform, intelligent application platform, and full-stack security. ',
      icon: '',
      url: '/projects/intelligence-boom',
      giteeUrl: '',
      tag: 'NEW',
    },
    {
      title: 'UB Service Core',
      desc: 'Fully open sourced to the openEuler community with multi-OS support, UB Service Core delivers five essential cluster-level system services. By leveraging a peer-to-peer interconnect architecture, it boosts application performance by 30%-50%, fostering a robust software ecosystem for UnifiedBus.',
      icon: '',
      url: '/projects/ub-service-core',
      atomgitUrl: '',
      tag: 'NEW',
    },
    {
      title: 'UB OS Component',
      desc: 'UB OS Component extends the OS framework to better support UB. It abstracts and decouples heterogeneous hardware, and creates a unified memory address space. This enables global resource scheduling, dynamic combination and scaling of computing resources, and efficient communication across devices, thereby unlocking the full potential of UnifiedBus hardware.',
      icon: '',
      url: '/projects/ub-os-component',
      atomgitUrl: '',
      tag: 'NEW',
    },
    {
      title: 'A-Tune',
      desc: 'A-Tune is an automatic and intelligent performance tuning engine developed based on openEuler. It adopts AI technologies to ensure the optimal service running. A-Tune builds precise models for services running on the operating system, understands service features dynamically to infer specific applications. And it adjusts the parameters based on service loads to provide the optimal parameter configurations.',
      icon: aTune,
      url: '/other/projects/atune/',
      atomgitUrl: 'https://atomgit.com/openeuler/A-Tune',
    },
    {
      title: 'iSula',
      desc: 'iSulad provides a unified architecture for different CT and IT requirements.',
      icon: iSula,
      url: '/other/projects/isula/',
      atomgitUrl: 'https://atomgit.com/openeuler/iSulad',
    },
    {
      title: 'secGear',
      desc: 'secGear is a confidential computing development suite used to develop secure applications in the computing industry. It aims to provide a unified development framework for different hardware devices, shielding the differences between underlying confidential computing architectures and APIs. Currently, secGear supports Intel® SGX hardware and Arm TrustZone (iTrustee supported).',
      icon: secGear,
      url: '/other/projects/secgear/',
      atomgitUrl: 'https://atomgit.com/openeuler/secGear',
    },
    {
      title: 'StratoVirt',
      desc:
        'StratoVirt is an enterprise-grade virtualization cloud platform that uses a single architecture to support VM, containers, and serverless data center scenarios. StratoVirt has competitive advantages in key technologies such as lightweight and low noise, software and hardware collaboration, as well as premium security using Rust language.',
      icon: stratoVirt,
      url: '/other/projects/stratovirt/',
      atomgitUrl: 'https://atomgit.com/openeuler/stratovirt',
    },
    {
      title: 'BiSheng JDK',
      desc: 'As a downstream product of OpenJDK, BiSheng JDK is a high-performance OpenJDK distribution that can be used in production environments. BiSheng JDK fixes some performance and stability issues encountered in Huawei internal applications, optimizes performance and enhances stability on the ARM architecture, and delivers improved performance in big data scenarios.',
      icon: '',
      url: '/other/projects/bishengjdk/',
      atomgitUrl: 'https://atomgit.com/openeuler/bishengjdk-8',
    },
    {
      title: 'openEuler Intelligence',
      desc: 'openEuler Intelligence is a comprehensive large language model (LLM) platform built on openEuler. It offers fundamental capabilities for integrating with OpenAI APIs and creating custom local knowledge bases. The platform also enables users to register semantic interfaces and Model Context Protocol (MCP) services, and develop Agent-based applications and workflows. Available in both web and client versions, it delivers exceptional convenience for developers and enterprises alike.',
      icon: intelligence,
      url: '/projects/intelligence/',
      atomgitUrl: 'https://atomgit.com/openeuler/euler-copilot-framework',
    },
    {
      title: 'openYuanrong',
      desc: 'openYuanrong is a Serverless distributed compute engine that unifies diverse applications, from AI and big data to microservices, on a single, streamlined architecture. It provides multi-language function interfaces that simplify the development of complex distributed applications to feel just like writing a local program. Powered by dynamic scheduling and efficient data sharing, openYuanrong ensures high-performance execution and maximum cluster resource utilization.',
      icon: yuanrong,
      url: '/projects/yuanrong',
      atomgitUrl: '',
    },
  ],
};

export const entranceList = {
  zh: [
    {
      icon: IconCodeRepo,
      title: '代码仓列表',
      desc: '查看 openYuanrong 代码仓、联系方式等信息',
      href: '/zh/sig/sig-YuanRong#repositories',
    },
    {
      icon: IconDocument,
      title: '查看文档',
      desc: '了解如何使用 openYuanrong 开发分布式应用',
      href: 'http://docs.openyuanrong.org/zh-cn/latest/index.html',
      isOutlink: true,
    },
  ],
  en: [
    {
      icon: IconCodeRepo,
      title: 'Repositories',
      desc: 'Get immediate access to the openYuanrong repository, contact details, and more.',
      href: '/en/sig/sig-YuanRong#repositories',
    },
    {
      icon: IconDocument,
      title: 'Documentation',
      desc: 'Quickly build and effortlessly deploy scalable distributed applications with openYuanrong.',
      href: 'https://docs.openyuanrong.org/en/latest/index.html',
      isOutlink: true,
    },
  ]
}

export const ubEntranceList = {
  zh: [
    {
      icon: IconWhitePaper,
      title: '白皮书',
      desc: '了解 UB Service Core，使用、开发、管理和维护灵衢产品',
      href: '/projects/ub-service-core/white-paper/灵衢系统高阶服务软件架构参考设计.pdf',
    },
    {
      icon: IconCodeRepo,
      title: '代码仓列表',
      desc: '查看 UB Service Core 代码仓、联系方式等信息',
      href: '/zh/sig/sig-UB-ServiceCore#repositories',
    },
    {
      icon: IconDocument,
      title: '相关文档',
      desc: '了解如何开发，使用 UB Service Core',
      href: 'https://atomgit.com/openeuler/community/tree/master/sig/sig-UB-ServiceCore ',
      isOutlink: true,
    },
  ],
  en: [
    {
      icon: IconWhitePaper,
      title: 'White Paper',
      desc: 'Deploy, build, and scale with UB Service Core.',
      href: '/projects/ub-service-core/white-paper/灵衢系统高阶服务软件架构参考设计.pdf',
    },
    {
      icon: IconCodeRepo,
      title: 'Repositories',
      desc: 'View code and connect with us.',
      href: '/en/sig/sig-UB-ServiceCore#repositories',
    },
    {
      icon: IconDocument,
      title: 'Documentation',
      desc: 'Learn how to build and use UB Service Core.',
      href: 'https://atomgit.com/openeuler/community/tree/master/sig/sig-UB-ServiceCore ',
      isOutlink: true,
    },
  ]
};

export const ubServiceCoreUrl = {
  whitepaper_en: '/en/projects/docs/UB-Service-Core-SW-Arch-RD-2.0-en',
  whitepaper_zh: '/zh/projects/docs/UB-Service-Core-SW-Arch-RD-2.0-zh',
}

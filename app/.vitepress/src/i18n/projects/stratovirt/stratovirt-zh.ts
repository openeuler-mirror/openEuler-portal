export default {
  SVIRT_BANNER_TEXT: ['StratoVirt', '面向云数据中心的企业级虚拟化VMM'],
  SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
  SVIRT_DESC: [
    'StratoVirt是面向云数据中心的企业级虚拟化VMM (Virtual Machine Monitor)，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。',
    'StratoVirt在架构设计上预留了组件化拼装的能力和接口，可以按需灵活组装高级特性直至演化到支持标准虚拟化，在特性需求、应用场景和轻快灵巧之间找到最佳的平衡点。',
  ],
  SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
  SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
  SVIRT_NAV_TEXT: [
    {
      key: '#character',
      name: '特征',
    },
    {
      key: '#framework',
      name: '架构',
    },
    {
      key: '#document',
      name: '文档',
    },
  ],

  SVIRT_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      TITLE: '开启毕昇JDK之旅',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      TITLE: '相对stratovirt说',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt/issues'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-tv.png',
      TITLE: '加入StratoVirt大家庭',
      LINK_LIST: ['https://gitee.com/openeuler/community/tree/master/sig/Virt'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/stratovirt/stratovirt-logo.png',
      TITLE: 'StratoVirt Logo',
      LINK_LIST: ['/other/projects/stratovirt/'],
      SHOW: false,
    },
  ],
  SVIRT_CHARACTER: {
    TITLE_OUTSIDE: '特征',
    TITLE_INSIDE: 'FEATURE',
    CHARACTER_TEXT:
      'StratoVirt是openEuler最稳定、最坚固的保护层。它重构了openEuler虚拟化底座，具有以下六大技术特点。',
    CHARACTER_LIST: [
      {
        IMG: '/img/projects/stratovirt/illustration-safety.png',
        TITLE: '强安全性',
        DESC: '采用Rust语言，支持seccomp，实现多租户安全隔离',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-low-noise.png',
        TITLE: '轻量低噪',
        DESC: '采用极简设备模型时，启动时间<50ms，内存底噪<4M，支持Serverless负载',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-flex.png',
        TITLE: '极速伸缩',
        DESC: '毫秒级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-with.png',
        TITLE: '软硬协同',
        DESC: '同时支持x86的VT和鲲鹏的Kunpeng-V，实现多体系硬件加速',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-extend.png',
        TITLE: '高扩展性',
        DESC: '设备模型可扩展，支持PCI等复杂设备规范，实现标准虚拟机',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-strengthen.png',
        TITLE: '异构增强',
        DESC: '除支持常用的硬件SR-IOV直通方案，结合昇腾软件定义能力，实现更灵活异构算力分配',
      },
    ],
  },
  SVIRT_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE',
    FRAMEWORK_IMG: '/img/projects/stratovirt/framework-hight-en.png',
    FRAMEWORK_IMG_DARK: '/img/projects/stratovirt/framework-dark-en.png',
    DESC_LIST: [
      'StratoVirt核心架构自顶向下分为三层：',
      'OCI兼容接口：兼容QMP（QEMU Machine Protocol）协议，具有完备的OCI兼容能力。',
      'BootLoader：抛弃传统BIOS+GRUB的启动模式，实现了更轻更快的启动流程。',
      'MicroVM：虚拟化层，充分利用软硬协同能力，精简化设备模型；低时延资源伸缩能力。',
    ],
    DESC_BACKGROUND: '/img/projects/share/card-shading.png',
  },
  SVIRT_DOCUMENT: {
    TITLE_OUTSIDE: '文档',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        THEME: 'StratoVirt介绍',
        DESC: '学习StratoVirt介绍',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: '安装StratoVirt',
        DESC: '学习安装StratoVirt',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https:/gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: '准备使用环境',
        DESC: '阅读准备使用环境文档',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: '虚拟机配置',
        DESC: '查看虚拟机配置',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: '管理虚拟机生命周期',
        DESC: '学习如何管理虚拟机生命周期',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: '管理虚拟机资源',
        DESC: '学习如何管理虚拟机资源',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: '对接iSula安全容器',
        DESC: '查看对接iSula安全容器文档',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
    ],
  },
};

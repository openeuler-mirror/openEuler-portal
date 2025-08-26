import logo from '@/assets/category/minisite/stratovirt/logo.png';
import logo_dark from '@/assets/category/minisite/stratovirt/logo_dark.png';

import frameImg_light_en from '@/assets/category/minisite/stratovirt/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/stratovirt/frame_dark_en.png';

import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import tvImg from '@/assets/category/minisite/shared/cards-tv.png';
import shadingImg from '@/assets/category/minisite/shared/cards-shading.png';

import safetyIcon from '@/assets/category/minisite/stratovirt/icon-safety.png';
import lowNoiseIcon from '@/assets/category/minisite/stratovirt/icon-low-noise.png';
import flexIcon from '@/assets/category/minisite/stratovirt/icon-flex.png';
import withIcon from '@/assets/category/minisite/stratovirt/icon-with.png';
import extendIcon from '@/assets/category/minisite/stratovirt/icon-extend.png';
import strengthenIcon from '@/assets/category/minisite/stratovirt/icon-strengthen.png';
import safetyIconDark from '@/assets/category/minisite/stratovirt/icon-safety_dark.png';
import lowNoiseIconDark from '@/assets/category/minisite/stratovirt/icon-low-noise_dark.png';
import flexIconDark from '@/assets/category/minisite/stratovirt/icon-flex_dark.png';
import withIconDark from '@/assets/category/minisite/stratovirt/icon-with_dark.png';
import extendIconDark from '@/assets/category/minisite/stratovirt/icon-extend_dark.png';
import strengthenIconDark from '@/assets/category/minisite/stratovirt/icon-strengthen_dark.png';

import grainImg from '@/assets/category/minisite/stratovirt/stratovirt-grain.png';

export default {
  SVIRT_BANNER_TEXT: ['StratoVirt', '面向云数据中心的企业级虚拟化VMM'],
  SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
  SVIRT_DESC: [
    'StratoVirt是面向云数据中心的企业级虚拟化VMM (Virtual Machine Monitor)，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。',
    'StratoVirt在架构设计上预留了组件化拼装的能力和接口，可以按需灵活组装高级特性直至演化到支持标准虚拟化，在特性需求、应用场景和轻快灵巧之间找到最佳的平衡点。',
  ],
  SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
  SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
  SVIRT_ANCHOR_DATA: [
    { id: 'feature', name: '特征' },
    { id: 'architecture', name: '架构' },
    { id: 'docs', name: '文档' },
  ],
  SVIRT_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: '开启StratoVirt之旅',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt'],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: '想对StratoVirt说',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt/issues'],
      SHOW: false,
    },
    {
      IMG: tvImg,
      DARK_IMG: tvImg,
      TITLE: '加入StratoVirt大家庭',
      LINK_LIST: ['https://gitee.com/openeuler/community/tree/master/sig/Virt'],
      SHOW: false,
    },
    {
      IMG: logo,
      DARK_IMG: logo_dark,
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
        IMG: safetyIcon,
        IMG_DARK: safetyIconDark,
        TITLE: '强安全性',
        DESC: '采用Rust语言，支持seccomp，实现多租户安全隔离',
      },
      {
        IMG: lowNoiseIcon,
        IMG_DARK: lowNoiseIconDark,
        TITLE: '轻量低噪',
        DESC: '采用极简设备模型时，启动时间<50ms，内存底噪<4M，支持Serverless负载',
      },
      {
        IMG: flexIcon,
        IMG_DARK: flexIconDark,
        TITLE: '极速伸缩',
        DESC: '毫秒级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力',
      },
      {
        IMG: withIcon,
        IMG_DARK: withIconDark,
        TITLE: '软硬协同',
        DESC: '同时支持x86的VT和鲲鹏的Kunpeng-V，实现多体系硬件加速',
      },
      {
        IMG: extendIcon,
        IMG_DARK: extendIconDark,
        TITLE: '高扩展性',
        DESC: '设备模型可扩展，支持PCI等复杂设备规范，实现标准虚拟机',
      },
      {
        IMG: strengthenIcon,
        IMG_DARK: strengthenIconDark,
        TITLE: '异构增强',
        DESC: '除支持常用的硬件SR-IOV直通方案，结合昇腾软件定义能力，实现更灵活异构算力分配',
      },
    ],
  },
  SVIRT_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE',
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
    DESC_LIST: [
      'StratoVirt核心架构自顶向下分为三层：',
      'OCI兼容接口：兼容QMP（QEMU Machine Protocol）协议，具有完备的OCI兼容能力。',
      'BootLoader：抛弃传统BIOS+GRUB的启动模式，实现了更轻更快的启动流程。',
      'MicroVM：虚拟化层，充分利用软硬协同能力，精简化设备模型；低时延资源伸缩能力。',
    ],
    DESC_BACKGROUND: shadingImg,
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
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/zh/virtualization_platform/stratovirt/stratovirt_introduction.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: '安装StratoVirt',
        DESC: '学习安装StratoVirt',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/zh/virtualization_platform/stratovirt/install_stratovirt.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: '准备使用环境',
        DESC: '阅读准备使用环境文档',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/zh/virtualization_platform/stratovirt/prepare_env.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: '虚拟机配置',
        DESC: '查看虚拟机配置',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/zh/virtualization_platform/stratovirt/vm_configuration.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: '管理虚拟机',
        DESC: '学习如何管理虚拟机',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/zh/virtualization_platform/stratovirt/vm_management.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: '对接iSula安全容器',
        DESC: '查看对接iSula安全容器文档',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/zh/virtualization_platform/stratovirt/interconnect_isula.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
    ],
  },
};

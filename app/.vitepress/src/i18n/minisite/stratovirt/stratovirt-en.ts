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
  SVIRT_BANNER_TEXT: [
    'StratoVirt',
    'Virtualization platform for cloud data centers',
  ],
  SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
  SVIRT_DESC: [
    'StratoVirt is an enterprise-grade virtualization cloud platform that uses a single architecture to support VM, containers, and serverless data center scenarios. StratoVirt has competitive advantages in key technologies such as lightweight and low noise, software and hardware collaboration, as well as premium security using Rust language.',
    'StratoVirt reserves component-based assembling capabilities and interfaces in the architecture design, that is, premium features can be flexibly assembled and evolve to support standard virtualization. In this way, StratoVirt strikes a perfect balance between feature requirements, application scenarios, and flexibility.',
  ],
  SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
  SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
  SVIRT_ANCHOR_DATA: [
    { id: 'feature', name: 'Feature' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'docs', name: 'Documentation' },
  ],
  SVIRT_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'Try Now',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt'],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: 'Feedback',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt/issues'],
      SHOW: false,
    },
    {
      IMG: tvImg,
      DARK_IMG: tvImg,
      TITLE: 'Join Us',
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
    TITLE_OUTSIDE: 'Feature',
    TITLE_INSIDE: 'FEATURE',
    CHARACTER_TEXT:
      'StratoVirt is a stable protective layer of openEuler. It reconstructs the openEuler virtualization base and has the following technical features:',
    CHARACTER_LIST: [
      {
        IMG: safetyIcon,
        IMG_DARK: safetyIconDark,
        TITLE: 'Enhanced Security',
        DESC: 'StratoVirt uses the Rust language and supports seccomp to implement security isolation between multiple tenants.',
      },
      {
        IMG: lowNoiseIcon,
        IMG_DARK: lowNoiseIconDark,
        TITLE: 'Lightweight and Low Noise',
        DESC: 'The simplified device model offers a startup time of under 50 ms, and a memory noise floor less than 4 MB. Serverless load is supported.',
      },
      {
        IMG: flexIcon,
        IMG_DARK: flexIconDark,
        TITLE: 'Fast Scaling',
        DESC: 'StratoVirt supports device scaling within milliseconds, providing flexible resource scaling capabilities for lightweight loads.',
      },
      {
        IMG: withIcon,
        IMG_DARK: withIconDark,
        TITLE: 'Software and Hardware Collaboration',
        DESC: 'StratoVirt supports x86 VT and Kunpeng-V to implement multi-system hardware acceleration.',
      },
      {
        IMG: extendIcon,
        IMG_DARK: extendIconDark,
        TITLE: 'High Scalability',
        DESC: 'The device model can be extended to support complex device specifications such as PCI and implement standard VMs.',
      },
      {
        IMG: strengthenIcon,
        IMG_DARK: strengthenIconDark,
        TITLE: 'Enhanced Heterogeneity',
        DESC: 'In addition to the common hardware SR-IOV passthrough solution, the Ascend software definition capability is used to implement more flexible allocation of heterogeneous computing power.',
      },
    ],
  },
  SVIRT_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
    DESC_LIST: [
      'The StratoVirt core architecture comprises three layers from top to bottom:',
      'OCI compatibility interface: StratoVirt is compatible with the QEMU Machine Protocol (QMP) and inherits OCI capabilities.',
      'BootLoader: StratoVirt abandons the conventional BIOS + GRUB boot mode and implements a lighter and faster boot operation.',
      'MicroVM: This is the virtualization layer that leverages software and hardware collaboration to simplify the device management and support low-latency resource scaling.',
    ],
    DESC_BACKGROUND: shadingImg,
  },
  SVIRT_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        THEME: 'Introduction to StratoVirt',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/en/virtualization_platform/stratovirt/stratovirt_introduction.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Installing StratoVirt',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/en/virtualization_platform/stratovirt/install_stratovirt.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Preparing the Environment',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/en/virtualization_platform/stratovirt/prepare_env.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Configuring VMs',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/en/virtualization_platform/stratovirt/vm_configuration.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Managing VM Lifecycle',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/en/virtualization_platform/stratovirt/vm_management.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Connecting to iSula Security Containers',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/Virt-docs/blob/master/docs/en/virtualization_platform/stratovirt/interconnect_isula.md',
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

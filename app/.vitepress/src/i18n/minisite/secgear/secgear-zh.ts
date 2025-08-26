import shadingImg from '@/assets/category/minisite/shared/cards-shading.png';

import frameImg_light_en from '@/assets/category/minisite/secgear/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/secgear/frame_dark_en.png';

import arrowBg from '@/assets/category/minisite/shared/bg-arrow.png';
import docBg from '@/assets/category/minisite/shared/bg-doc.png';

import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import glassIllustration from '@/assets/category/minisite/shared/illustration-glass.png';
import newspapperIllustration from '@/assets/category/minisite/shared/illustration-newspapper.png';
import scenarioIllustration from '@/assets/category/minisite/shared/illustration-scenario.png';

export default {
  SECGEAR_BANNER_TEXT: [
    'secGear',
    'secGear是一款供开发者开发安全应用的机密计算框架',
  ],
  SECGEAR_DESC: [
    'secGear是面向计算产业的机密计算安全应用开发套件，旨在方便开发者在不同的硬件设备上提供统一开发框架，让用户不感知底层各种机密计算架构和接口的差异，目前secGear支持Intel SGX硬件和ARM Trustzone(安全os支持iTrustee)。',
    'secGear同时在中间件层和服务层提供丰富的扩展能力，让开发者能够方便得调用安全组件，乃至直接使用机密计算安全服务。',
  ],
  SECGEAR_ANCHOR_DATA: [
    { id: 'architecture', name: '架构' },
    { id: 'docs', name: '文档' },
  ],
  SECGEAR_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE ',
    DESC_LIST: [
      '如图所示，secGear 主题包含三个层级：',
      '服务层：提供完整的基于机密计算的安全服务，用户直接使用相关服务，享受机密计算带来的安全性。',
      '中间件层：提供常见的安全协议组件以及各种安全函数库，用户可以直接在安全及非安全侧调用相关接口，不必从头造轮子。',
      '基础层：提供丰富的 enclave 开发接口或工具，包含代码生成工具和enclave声明周期管理等接口，并且在安全侧支持POSIX APIs 和标准 OpenSSL 接口，用户基于这些接口可以自由开发安全应用程序 。',
    ],
    DESC_BACKGROUND: shadingImg,
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
  },
  SECGEAR_DOCUMENT: {
    TITLE_OUTSIDE: '文档',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: arrowBg,
        THEME: '整体介绍',
        DESC: '查看secGear整体介绍',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/introduction_to_secgear.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: fileIllustration,
        THEME: '安装',
        DESC: '学习如何安装secGear',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/secgear_installation.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: bookIllustration,
        THEME: '开发指南',
        DESC: 'secGear的开发指南',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/developer_guide.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: glassIllustration,
        THEME: '工具使用文档',
        DESC: '学习secGear的工具使用',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/using_secgear_tools.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: newspapperIllustration,
        THEME: 'API接口文档',
        DESC: '查看secGear API接口文档',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/api_reference.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: scenarioIllustration,
        THEME: '应用场景',
        DESC: '介绍secGear的典型场景机密计算解决方案。',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/application_scenarios.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
    ],
  },
};

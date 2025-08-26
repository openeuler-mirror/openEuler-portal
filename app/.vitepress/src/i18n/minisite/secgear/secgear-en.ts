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
    'Confidential computing framework for developing secure applications',
  ],
  SECGEAR_DESC: [
    'secGear is a confidential computing development suite used to develop secure applications in the computing industry. It aims to provide a unified development framework for different hardware devices, shielding the differences between underlying confidential computing architectures and APIs. Currently, secGear supports Intel® SGX hardware and Arm TrustZone (iTrustee supported).',
    'secGear provides rich extensibility capabilities at both the middleware layer and service layer, allowing developers to easily call security components and even directly use the confidential computing services.',
  ],
  SECGEAR_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'docs', name: 'Documentation' },
  ],
  SECGEAR_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'As shown in the figure, secGear consists of three layers. Currently, only the base layer is open source. The service layer and middleware layer will be gradually brought to open source.',
      'The service layer provides complete security services based on confidential computing. You can directly use related services to enjoy the security brought by confidential computing.',
      'The middleware layer provides common security protocol components and various security function libraries. You can directly call related APIs on the secure and non-secure sides without creating them by yourself. Currently, PKCS11 and PAKE are being built.',
      'The base layer provides rich enclave development APIs or tools, including code generation tools and enclave life cycle management APIs. POSIX APIs and standard OpenSSL APIs are supported on the secure side. You can develop secure applications based on these APIs.',
    ],
    DESC_BACKGROUND: shadingImg,
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
  },
  SECGEAR_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: arrowBg,
        THEME: 'Overview',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/introduction_to_secgear.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: fileIllustration,
        THEME: 'Installation',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/secgear_installation.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: bookIllustration,
        THEME: 'Developer Guide',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/developer_guide.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: glassIllustration,
        THEME: 'Tools Use Document',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/using_secgear_tools.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: newspapperIllustration,
        THEME: 'API Reference',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/api_reference.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: scenarioIllustration,
        THEME: 'Scenarios',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/application_scenarios.md',
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

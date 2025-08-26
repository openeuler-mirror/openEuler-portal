import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import tvImg from '@/assets/category/minisite/shared/cards-tv.png';

import frameImg_light_en from '@/assets/category/minisite/atune/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/atune/frame_dark_en.png';

import arrowBg from '@/assets/category/minisite/shared/bg-arrow.png';
import docBg from '@/assets/category/minisite/shared/bg-doc.png';

import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import glassIllustration from '@/assets/category/minisite/shared/illustration-glass.png';

export default {
  ATUNE_BANNER_TEXT: ['A-Tune', 'AI-based Tuning Engine'],
  ATUNE_DESC: [
    'A-Tune is an automatic and intelligent performance tuning engine developed based on openEuler. It adopts AI technologies to ensure the optimal service running. A-Tune builds precise models for services running on the operating system, understands service features dynamically to infer specific applications. And it adjusts the parameters based on service loads to provide the optimal parameter configurations.',
  ],
  ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
  ATUNE_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'docs', name: 'Documentation' },
  ],
  ATUNE_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'Try Now',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune'],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: 'Feedback',
      LINK_LIST: ['mail to:a-tune@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: tvImg,
      DARK_IMG: tvImg,
      TITLE: 'Web UI',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune-UI'],
      SHOW: false,
    },
  ],
  ATUNE_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'A-Tune provides two core capabilities: online static tuning and offline dynamic tuning. The overall architecture consists of three layers: intelligent decision-making, system profiling, and interaction system.',
      'The intelligent decision-making layer consists of the sensing and decision-making subsystems, which implement intelligent sensing of applications and decision-making of system tuning, respectively.',
      'The system profiling layer includes the automatic feature engineering and the two-layer classification model. The automatic feature engineering is used for automatic selection of service features, and the two-layer classification model helps learn and classify service models.',
      'The interaction system layer monitors and configures various system resources. The tuning policies are executed at this layer.',
      'The tuning model library contains the tuning configurations for 20+ application scenarios of 10 categories.',
    ],
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
  },
  ATUNE_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: arrowBg,
        THEME: 'About A-Tune',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/en/server/performance/system_optimization/atune/getting_to_know_a_tune.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: fileIllustration,
        THEME: 'Installation and Deployment',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/en/server/performance/system_optimization/atune/installation_and_deployment.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: bookIllustration,
        THEME: 'How to Use',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/en/server/performance/system_optimization/atune/usage_instructions.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: glassIllustration,
        THEME: 'FAQs',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read more',
            LINK: 'https://gitee.com/openeuler/docs/blob/stable-common/docs/en/faq/server/atune_faqs.md',
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

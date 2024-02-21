import logo from '@/assets/category/minisite/isula/isula-logo.png';

import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import newspapperIllustration from '@/assets/category/minisite/shared/illustration-newspapper.png';

import frameImg_light_en from '@/assets/category/minisite/isula/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/isula/frame_dark_en.png';
import frameBuildImg_light_en from '@/assets/category/minisite/isula/frame-build_light_en.png';
import frameBuildImg_dark_en from '@/assets/category/minisite/isula/frame-build_dark_en.png';
import frameTransformImg_light_en from '@/assets/category/minisite/isula/frame-transform_light_en.png';
import frameTransformImg_dark_en from '@/assets/category/minisite/isula/frame-transform_light_en.png';

import arrowBg from '@/assets/category/minisite/shared/bg-arrow.png';
import docBg from '@/assets/category/minisite/shared/bg-doc.png';

export default {
  ISULA_BANNER_TEXT: ['iSula', 'Packs a huge punch in a small size'],
  ISULA_LOGO: logo,
  ISULA_DESC_UP: [
    'iSula is the brand of Huawei container solution. It derives its name from a species of ant, one of the most powerful insects in the world despite its small size. This combination of ultimate power and minimal size is the perfect description of the iSula container technology solution.',
  ],
  ISULA_DESC_DOWN: [
    'Currently, the iSula family includes the following components:',
    'iSulad: iSulad is the universal container engine that provides full lifecycle management. It is compatible with the Container Runtime Interface (CRI) of Kubernetes in the northbound direction as well as the OCI ecosystem in the southbound direction.',
    'isula-build: isula-build is the container image building tool that helps you quickly build container images.',
    'isula-transform: isula-transform is the container migration tool that enables the cold migration of Docker containers to iSulad.',
  ],
  ISULA_MAIL: 'mail to:isulad@openeuler.org',
  ISULA_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'docs', name: 'Documentation' },
  ],
  ISULA_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'Try Now',
      LINK_LIST: [
        'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
      ],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: 'Feedback',
      LINK_LIST: ['mail to:isulad@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: logo,
      DARK_IMG: logo,
      TITLE: 'iSula logo',
      LINK_LIST: ['/other/projects/isula/'],
      SHOW: false,
    },
  ],
  ISULA_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    TAB: [
      {
        KEY: 'ISULAD',
        VALUE: 'iSulad',
      },
      {
        KEY: 'ISULAD_BUILD',
        VALUE: 'isula-build',
      },
      {
        KEY: 'ISULAD_TRANSFORM',
        VALUE: 'isula-transform',
      },
    ],
    ISULAD: {
      DESC_LIST: [
        'iSulad provides a unified architecture for different CT and IT requirements. It features a lightweight, fast, and flexible design, unlocking great power like the small isula ant.',
        'iSulad boasts the following features:',
        'Multiple languages: supports C/C++and will support Rust in the future.',
        'Northbound interface: provides the CRI that connects to Kubernets, as well as easy-to-use command lines.',
        'Southbound interface: supports OCI runtime and image specifications for smooth replacement.',
        'Container forms: supports multiple container forms, such as system and VM.',
        'Scalability: provides a plug-in architecture that allows you to develop custom plug-ins.',
        'iSulad is not restricted by hardware specifications and architectures. It features minimal background noise, making it a perfect option for many fields.',
      ],
      FRAMEWORK_TITLE: 'The architecture of iSulad is as follows:',
      FRAMEWORK_IMG: frameImg_light_en,
      FRAMEWORK_IMG_DARK: frameImg_dark_en,
    },
    ISULAD_BUILD: {
      DESC_LIST: [
        'isula-build usually runs in the build environment and provides template container images for the runtime system.',
        'During the build operation, isula-build reads Dockerfile as the input to quickly build container images that comply with the Docker and OCI image specifications. Then, isula-build distributes the images to the iSulad/Docker on the same node, local TAR packages, or remote container image repositories.',
      ],
      FRAMEWORK_TITLE: 'The architecture of isula-build is as follows:',
      FRAMEWORK_IMG: frameBuildImg_light_en,
      FRAMEWORK_IMG_DARK: frameBuildImg_dark_en,
    },
    ISULAD_TRANSFORM: {
      DESC_LIST: [
        'isula-transform was released together with iSulad 2.0 to convert containers managed by the Docker container engine and migrate them to the iSulad engine. After the migration, iSulad allows you to effortlessly manage the lifecycle of containers.',
      ],
      FRAMEWORK_IMG: frameTransformImg_light_en,
      FRAMEWORK_IMG_DARK: frameTransformImg_dark_en,
    },
  },
  ISULA_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    TAB: [
      {
        KEY: 'ISULAD',
        VALUE: 'iSulad',
      },
      {
        KEY: 'ISULAD_BUILD',
        VALUE: 'isula-build',
      },
      {
        KEY: 'ISULAD_TRANSFORM',
        VALUE: 'isula-transform',
      },
    ],
    ISULAD: {
      DATA_LIST: [
        {
          IMG: arrowBg,
          THEME: 'README',
          DESC: '',
          LINK: [
            {
              TEXT: 'Read more',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/README.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
        {
          IMG: fileIllustration,
          THEME: 'Architecture',
          DESC: '',
          LINK: [
            {
              TEXT: 'Read more',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/design/architecture.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
        {
          IMG: bookIllustration,
          THEME: 'Build Guide for RISC-V Integration',
          DESC: '',
          LINK: [
            {
              TEXT: 'Read more',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_docs/guide/build_guide.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_BUILD: {
      DATA_LIST: [
        {
          IMG: arrowBg,
          THEME: 'README',
          DESC: '',
          LINK: [
            {
              TEXT: 'Read more',
              LINK: 'https://gitee.com/openeuler/isula-build/blob/master/README.zh.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
        {
          IMG: newspapperIllustration,
          THEME: 'Manual',
          DESC: '',
          LINK: [
            {
              TEXT: 'Read more',
              LINK: 'https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_TRANSFORM: {
      DATA_LIST: [
        {
          IMG: arrowBg,
          THEME: 'README',
          DESC: '',
          LINK: [
            {
              TEXT: 'Read more',
              LINK: 'https://gitee.com/openeuler/isula-transform/blob/master/README.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
      ],
    },
  },
};

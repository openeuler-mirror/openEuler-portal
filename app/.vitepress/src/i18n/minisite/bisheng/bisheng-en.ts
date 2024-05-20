import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import reportImg from '@/assets/category/minisite/shared/cards-report.png';
import uploadImg from '@/assets/category/minisite/shared/cards-upload.png';
import tckImg from '@/assets/category/minisite/shared/cards-tck.png';

import frameImg_light_en from '@/assets/category/minisite/bisheng/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/bisheng/frame_dark_en.png';

import docBg from '@/assets/category/minisite/shared/bg-doc.png';

import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import newspapperIllustration from '@/assets/category/minisite/shared/illustration-newspapper.png';

export default {
  BISHENG_BANNER_TEXT: ['BiSheng JDK', 'Top-notch JDK on ARM'],
  BISHENG_DESC: [
    'BiSheng JDK is an open source version of Huawei JDK customized based on OpenJDK. Huawei JDK runs on more than 500 Huawei products. The R&D team has accumulated rich development experience and resolved the problems that arose during service running.',
    'As a downstream product of OpenJDK, BiSheng JDK is a high-performance OpenJDK distribution that can be used in production environments. BiSheng JDK fixes some performance and stability issues encountered in Huawei internal applications, optimizes performance and enhances stability on the ARM architecture, and delivers improved performance in big data scenarios.',
    'BiSheng JDK is committed to providing Java developers with a stable, reliable, high-performance, and easy-to-debug JDK. It is also a better choice on the ARM architecture.',
  ],
  BISHENG_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'learn', name: 'Learning' },
    { id: 'link', name: 'Links' },
  ],
  BISHENG_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'Start with BiSheng JDK',
      LINK_LIST: [
        {
          TEXT: 'BiSheng JDK 8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8',
        },
        {
          TEXT: 'BiSheng JDK 11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11',
        },
        {
          TEXT: 'BiSheng JDK 17',
          LINK: 'https://gitee.com/openeuler/bishengjdk-17',
        },
        {
          TEXT: 'BiSheng JDK 21',
          LINK: 'https://gitee.com/openeuler/bishengjdk-21',
        },
      ],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: 'Word to BiSheng JDK',
      LINK_LIST: [
        {
          TEXT: 'BiSheng JDK 8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/issues',
        },
        {
          TEXT: 'BiSheng JDK 11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11/issues',
        },
        {
          TEXT: 'BiSheng JDK 17',
          LINK: 'https://gitee.com/openeuler/bishengjdk-17/issues',
        },
        {
          TEXT: 'BiSheng JDK 21',
          LINK: 'https://gitee.com/openeuler/bishengjdk-21/issues',
        },
      ],
      SHOW: false,
    },
    {
      IMG: reportImg,
      DARK_IMG: reportImg,
      TITLE: 'Compiler SIG Meetings',
      LINK_LIST: [
        {
          TEXT: '2021',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
        },
        {
          TEXT: '2022 and later',
          LINK: 'https://etherpad.openeuler.org/p/Compiler-meetings',
        },
      ],
      SHOW: false,
    },
    {
      IMG: uploadImg,
      DARK_IMG: uploadImg,
      TITLE: 'Roadmap',
      LINK_LIST: [
        'https://gitee.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245',
      ],
      SHOW: false,
    },
    {
      IMG: tckImg,
      DARK_IMG: tckImg,
      TITLE: 'TCK Affidavit of BiSheng JDK 8',
      LINK_LIST: ['/other/projects/bishengjdk/tck-affidavit/'],
      SHOW: false,
    },
  ],
  BISHENG_MORE: 'More information:',
  BISHENG_INFO: [
    {
      THEME: 'License: ',
      BODY: 'The GPLv2 with Classpath Exception protocol is used.',
    },
    {
      THEME: 'Supported Java versions: ',
      BODY: 'Supported Java versions: Currently, BiSheng JDK supports Java 8 (LTS), 11 (LTS), 17 (LTS) and 21 (LTS).',
    },
    {
      THEME: 'Supported architectures: ',
      BODY: 'Linux/AArch64 and Linux/x86_64.',
    },
    {
      THEME: 'Supported OSs: ',
      BODY: 'Almost all mainstream Linux OSs are supported. The glibc version must be 2.18 or later. BiSheng JDK has passed the stability verification on all openEuler OSs, CentOS 7.6, Ubuntu 20.04, Ubuntu 22.04, Kylin V10, and UOS 20 before the release.',
    },
  ],
  BISHENG_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'The following figure shows the overall architecture of the JDK. JRE is short for Java Runtime Environment, including the Java Virtual Machine (JVM) and libraries. JDK is a superset of JRE, and therefore includes all JRE content as well as the compilers and debuggers such as javac and JDB required by developers. JRE provides only runtime libraries, JVMs, and other components required to run Java applications.',
    ],
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
  },
  BISHENG_LEARN: {
    TITLE_OUTSIDE: 'Learning',
    TITLE_INSIDE: 'LEARNING',
    DATA_LIST: [
      {
        IMG: bookIllustration,
        DESC: '',
        THEME: 'Documentation',
        LINK: [
          {
            TEXT: 'BiSheng JDK 8',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Home',
          },
          {
            TEXT: 'BiSheng JDK 11',
            LINK: 'https://gitee.com/openeuler/bishengjdk-11/wikis/Home',
          },
          {
            TEXT: 'BiSheng JDK 17',
            LINK: 'https://gitee.com/openeuler/bishengjdk-17/wikis/Home',
          },
          {
            TEXT: 'BiSheng JDK 21',
            LINK: 'https://gitee.com/openeuler/bishengjdk-21/wikis/Home',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: newspapperIllustration,
        DESC: '',
        THEME: 'Learn and Practice',
        LINK: [
          {
            TEXT: 'Using BiSheng JDK',
            LINK: 'https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: fileIllustration,
        DESC: '',
        THEME: 'Download',
        LINK: [
          {
            TEXT: 'Earlier Versions',
            LINK: 'https://www.hikunpeng.com/en/developer/devkit/compiler/jdk',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
    ],
  },
  BISHENG_REFERENCE: {
    TITLE_OUTSIDE: 'Links',
    TITLE_INSIDE: 'LINKS',
    LINK_LIST: [
      {
        TEXT: 'BiSheng JDK (Kunpeng Community)',
        LINK: 'https://www.hikunpeng.com/en/developer/devkit/compiler/jdk',
      },
      {
        TEXT: 'BiSheng Compiler (Kunpeng Community)',
        LINK: 'https://www.hikunpeng.com/en/developer/devkit/compiler/bisheng',
      },
      {
        TEXT: 'BiSheng Compiler (Kunpeng Community)',
        LINK: 'https://www.hikunpeng.com/en/developer/devkit/compiler/gcc',
      },
    ],
  },
};

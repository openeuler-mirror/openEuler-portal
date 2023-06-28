import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import reportImg from '@/assets/category/minisite/shared/cards-report.png';
import uploadImg from '@/assets/category/minisite/shared/cards-upload.png';
import tckImg from '@/assets/category/minisite/shared/cards-tck.png';

import frameImg_light_zh from '@/assets/category/minisite/bisheng/frame_light_zh.png';
import frameImg_dark_zh from '@/assets/category/minisite/bisheng/frame_dark_zh.png';

import docBg from '@/assets/category/minisite/shared/bg-doc.png';

import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import newspapperIllustration from '@/assets/category/minisite/shared/illustration-newspapper.png';

export default {
  BISHENG_BANNER_TEXT: ['毕昇JDK', 'ARM上最好用的JDK'],
  BISHENG_DESC: [
    '毕昇JDK是华为内部基于OpenJDK定制的Huawei JDK的开源版本。Huawei JDK运行在华为内部500多个产品上，研发团队积累了丰富的开发经验，解决了业务实际运行中遇到的多个疑难问题。',
    '毕昇JDK作为OpenJDK的下游，是一款高性能、可用于生产环境的OpenJDK发行版。毕昇JDK对华为内部应用场景中遇到的一些性能问题和稳定性问题进行了修复，并在ARM架构上进行了性能优化和稳定性增强，在ARM架构上更稳定，在大数据等场景下可以获得更好的性能。',
    '毕昇JDK致力于为JAVA开发者提供一款稳定可靠、高性能、易调测的JDK，也为用户在ARM架构上提供一个更好的选择。',
  ],
  BISHENG_ANCHOR_DATA: [
    { id: 'architecture', name: '架构' },
    { id: 'learn', name: '学习' },
    { id: 'link', name: '友情链接' },
  ],
  BISHENG_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: '开启毕昇JDK之旅',
      LINK_LIST: [
        {
          TEXT: '毕昇JDK8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8',
        },
        {
          TEXT: '毕昇JDK11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11',
        },
        {
          TEXT: '毕昇JDK 17',
          LINK: 'https://gitee.com/openeuler/bishengjdk-17',
        },
      ],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: '想对毕昇JDK说',
      LINK_LIST: [
        {
          TEXT: '毕昇JDK8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/issues',
        },
        {
          TEXT: '毕昇JDK11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11/issues',
        },
        {
          TEXT: '毕昇JDK 17',
          LINK: 'https://gitee.com/openeuler/bishengjdk-17/issues',
        },
      ],
      SHOW: false,
    },
    {
      IMG: reportImg,
      DARK_IMG: reportImg,
      TITLE: 'SIG例会信息',
      LINK_LIST: [
        {
          TEXT: '2021',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
        },
        {
          TEXT: '2022',
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
  BISHENG_MORE: '更多信息：',
  BISHENG_INFO: [
    {
      THEME: 'License: ',
      BODY: '采用GPLv2 with Classpath Exception协议。',
    },
    {
      THEME: '支持Java版本: ',
      BODY: '目前毕昇JDK支持8、11、17三个LTS版本。',
    },
    {
      THEME: '支持架构: ',
      BODY: '支持Linux/AArch64、Linux/x86_64架构。',
    },
    {
      THEME: '支持操作系统: ',
      BODY: '目前仅支持Linux版本，对操作系统的要求glibc版本不低于2.17，基本覆盖所有主流操作系统，发布前经过稳定性验证的操作系统有openEuler 全系列操作系统和CentOS 7.6。',
    },
  ],
  BISHENG_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'JDK整体架构如下图所示，其中JRE指的是Java Runtime Environment，包括了Java运行时的虚拟机JVM（Java Virtual Machine）、Libraries等。而JDK是JRE的超集，包括了JRE的所有内容，并包含javac、jdb等开发者必须的编译器和调试器。JRE仅提供运行时库、Java虚拟机和其他一些运行Java应用程序所必须的组件。',
    ],
    FRAMEWORK_IMG: frameImg_light_zh,
    FRAMEWORK_IMG_DARK: frameImg_dark_zh,
  },
  BISHENG_LEARN: {
    TITLE_OUTSIDE: '学习',
    TITLE_INSIDE: 'LEARNING',
    DATA_LIST: [
      {
        IMG: bookIllustration,
        DESC: '查看毕昇文档了解详情',
        THEME: '文档',
        LINK: [
          {
            TEXT: '毕昇JDK 8',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Home',
          },
          {
            TEXT: '毕昇JDK 11',
            LINK: 'https://gitee.com/openeuler/bishengjdk-11/wikis/Home',
          },
          {
            TEXT: '毕昇JDK 17',
            LINK: 'https://gitee.com/openeuler/bishengjdk-17/wikis/Home',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: newspapperIllustration,
        DESC: '学习毕昇JDK的使用',
        THEME: '课程',
        LINK: [
          {
            TEXT: '毕昇JDK使用',
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
        DESC: '毕昇JDK历史版本',
        THEME: '下载',
        LINK: [
          {
            TEXT: '毕昇JDK历史版本',
            LINK: 'https://www.hikunpeng.com/zh/developer/devkit/compiler/jdk',
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
    TITLE_OUTSIDE: '友情链接',
    TITLE_INSIDE: 'LINKS',
    LINK_LIST: [
      {
        TEXT: '毕昇JDK（鲲鹏社区） ',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/jdk',
      },
      {
        TEXT: '毕昇编译器（鲲鹏社区）',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/bisheng',
      },
      {
        TEXT: 'GCC for openEuler（鲲鹏社区）',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/gcc',
      },
    ],
  },
};

import { markRaw } from 'vue';

import DocumentLight from '~@/assets/category/header/document-light.svg';
import IntroductionLight from '~@/assets/category/header/introduction-light.svg';
import DownloadLight from '~@/assets/category/header/download-light.svg';
import ToolLight from '~@/assets/category/header/tool-light.svg';
import HeartLight from '~@/assets/category/header/heart-light.svg';
import Summit from '~@/assets/category/header/summit.png';

import DocumentDark from '~@/assets/category/header/document-dark.svg';
import IntroductionDark from '~@/assets/category/header/introduction-dark.svg';
import DownloadDark from '~@/assets/category/header/download-dark.svg';
import ToolDark from '~@/assets/category/header/tool-dark.svg';
import HeartDark from '~@/assets/category/header/heart-dark.svg';

import IconOutLink from '~icons/app/icon-out-link.svg';
import IconArrowRight from '~icons/app-new/icon-header-next.svg';

const TAG_TYPE = {
  HOT: 'HOT',
  NEW: 'NEW',
}

const OutLink = markRaw(IconOutLink);
const ArrowRight = markRaw(IconArrowRight);

export default {
  NAV_ROUTER: [
    {
      NAME: 'Download',
      ID: 'download',
      CHILDREN: [
        {
          NAME: 'Get openEuler OS',
          CHILDREN: [
            {
              NAME: 'openEuler Is Everywhere',
              DESCRIPTION: 'Get openEuler for public clouds, containers, and Windows.',
              TAG: TAG_TYPE.HOT,
              URL: '/download/get-os/',
              MOBILE_SHOW_CHILD: false,
              CHILDREN: [
                {
                  NAME: 'Cloud Images',
                  URL: '/wiki/install/cloud/',
                },
                {
                  NAME: 'Container Images',
                  URL: '/wiki/install/image/',
                },
                {
                  NAME: 'Windows',
                  URL: '/wiki/install/wsl/',
                },
                {
                  NAME: 'Virtualization',
                  URL: '/wiki/install/virtualization/',
                },
                {
                  NAME: 'Raspberry Pi',
                  URL: 'https://gitee.com/openeuler/raspberrypi/blob/master/README.md',
                },
              ],
            }
          ], 
          SHORTCUT: [
            {
              NAME: 'openEuler 24.03 LTS',
              TYPE: DownloadLight,
              TYPE_DARK: DownloadDark,
              URL: '/download/?version=openEuler 24.03 LTS',
            },
            {
              NAME: 'openEuler repo',
              TYPE: DownloadLight,
              TYPE_DARK: DownloadDark,
              URL: 'https://repo.openeuler.openatom.cn/',
            },
            {
              NAME: 'Mirrors',
              TYPE: DownloadLight,
              TYPE_DARK: DownloadDark,
              URL: '/mirror/list/',
            },
          ],
        }, 
        {
          NAME: 'Community Releases', 
          CHILDREN: [
            {
              NAME: 'openEuler 24.03 LTS',
              DESCRIPTION: 'The latest LTS version built on Linux kernel 6.6, suited for server, cloud, edge, AI, and embedded deployments.',
              TAG: TAG_TYPE.NEW,
              URL: '/download/?version=openEuler 24.03 LTS',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Server',
                  URL: '/download/?version=openEuler 24.03 LTS&scenario=ISO',
                },
                {
                  NAME: 'Edge Cloud',
                  URL: '/download/?version=openEuler 24.03 LTS&scenario=edge_img',
                },
                {
                  NAME: 'Cloud Computing',
                  URL: '/download/?version=openEuler 24.03 LTS&scenario=virtual_machine_img',
                },
                {
                  NAME: 'Embedded',
                  URL: '/download/?version=openEuler 24.03 LTS&scenario=embedded_img',
                },
              ],
            },
            {
              NAME: 'openEuler 24.09',
              DESCRIPTION: 'The latest innovation version built on Linux kernel 6.6, with new features and faster updates.',
              TAG: null,
              URL: '/download/?version=openEuler 24.09',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Server',
                  URL: '/download/?version=openEuler 24.09&scenario=ISO',
                },
                {
                  NAME: 'Edge Cloud',
                  URL: '/download/?version=openEuler 24.09&scenario=edge_img',
                },
                {
                  NAME: 'Cloud Computing',
                  URL: '/download/?version=openEuler 24.09&scenario=virtual_machine_img',
                },
                {
                  NAME: 'Embedded',
                  URL: '/download/?version=openEuler 24.09&scenario=embedded_img',
                },
              ],
            },
            { 
              NAME: 'openEuler 22.03 LTS SP4',
              DESCRIPTION: 'A patch version of openEuler 22.03 LTS. Both versions share the same lifecycle.',
              TAG: null,
              URL: '/download/archive/detail/?version=openEuler 22.03 LTS SP4',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Server',
                  URL: '/download/archive/detail/?version=openEuler 22.03 LTS SP4',
                },
                {
                  NAME: 'Edge Cloud',
                  URL: '/download/archive/detail/?version=openEuler 22.03 LTS SP4',
                },
                {
                  NAME: 'Cloud Computing',
                  URL: '/download/archive/detail/?version=openEuler 22.03 LTS SP4',
                },
                {
                  NAME: 'Embedded',
                  URL: '/download/archive/detail/?version=openEuler 22.03 LTS SP4',
                },
              ],
            },
          ],
          SHORTCUT: [
            {
              NAME: 'Technical White Papers',
              TYPE: IntroductionLight,
              TYPE_DARK: IntroductionDark,
              URL: '/showcase/technical-white-paper/',
            },
            {
              NAME: 'openEuler 24.03 LTS Installation Guide',
              TYPE: IntroductionLight,
              TYPE_DARK: IntroductionDark,
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Installation/Installation.html',
            },
            {
              NAME: 'openEuler 24.09 Installation Guide',
              TYPE: IntroductionLight,
              TYPE_DARK: IntroductionDark,
              URL: 'https://docs.openeuler.org/en/docs/24.09/docs/Installation/Installation.html',
            },
            {
              NAME: 'openEuler Lifecycle',
              TYPE: DownloadLight,
              TYPE_DARK: DownloadDark,
              URL: '/other/lifecycle/',
            },
            {
              NAME: 'Historical Releases',
              TYPE: DownloadLight,
              TYPE_DARK: DownloadDark,
              URL: '/download/archive/',
            },
          ], 
        },
        {
          NAME: 'Other Releases',
          CHILDREN: [
            {
              NAME: 'Commercial Releases',
              DESCRIPTION: 'Commercial releases for x86, Arm, and RISC-V.',
              URL: '/download/commercial-release/',
            }
          ],
          SHORTCUT: [],
        },
        {
          NAME: 'Install',
          CHILDREN: [
            {
              NAME: 'Mirrors',
              DESCRIPTION: 'All mirrors of openEuler.',
              URL: '/mirror/list/',
            },
            {
              NAME: 'Repo',
              DESCRIPTION: "Repo of openEuler's community releases.",
              URL: 'https://repo.openeuler.openatom.cn/',
            },
          ],
          SHORTCUT: [],
        },
      ],
    },
    {
      NAME: 'Learn',
      ID: 'learn',
      CHILDREN: [
        {
          NAME: 'Documentation',
          ICON: ArrowRight,
          URL: 'https://docs.openeuler.org/en/',
          CHILDREN: [
            {
              NAME: 'Trending Docs',
              DESCRIPTION: 'The most viewed documents.',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/en/#hot',
            },
            {
              NAME: 'Create Apps',
              DESCRIPTION: 'Guides for application development on openEuler.',
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS/docs/ApplicationDev/application-development.html',
            },
            {
              NAME: 'Getting Started',
              DESCRIPTION: 'Documentation guides to help you get started with openEuler.',
              URL: 'https://docs.openeuler.org/en/#process',
            },
            {
              NAME: 'Tools',
              DESCRIPTION: 'Resources for using and accessing commonly used tools.',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/en/#tool',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'openEuler 24.03 LTS Documentation',
              TYPE: IntroductionLight,
              TYPE_DARK: IntroductionDark,
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Releasenotes/terms-of-use.html',
            },
            {
              NAME: 'Installation and Upgrade',
              TYPE: IntroductionLight,
              TYPE_DARK: IntroductionDark,
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Installation/Installation.html',
            },
          ]
        },
        {
          NAME: 'Training',
          ICON: ArrowRight,
          URL: '/learn/mooc/',
          CHILDREN: [
            {
              NAME: 'Tutorials',
              DESCRIPTION: 'Mini video courses presented by openEuler.',
              URL: 'https://www.youtube.com/playlist?list=PLtDfk9jvMAziPyVaA-DOkXx0GgIUjXc0_',
              ICON: OutLink,
            },
          ],
          SHORTCUT: []
        },
        {
          NAME: 'Migration',
          CHILDREN: [
            {
              NAME: 'Migrate to openEuler',
              DESCRIPTION: 'Guides for migrating to openEuler.',
              URL: '/migration/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'Get x2openEuler',
              TYPE: ToolLight,
              TYPE_DARK: ToolDark,
              URL: '/migration/download/',
            },
            {
              NAME: 'Migration Practices',
              TYPE: DocumentLight,
              TYPE_DARK: DocumentDark,
              URL: '/migration/user-cases/',
            },
          ]
        },
        {
          NAME: 'Tech Highlights',
          CHILDREN: [
            {
              NAME: 'Success Stories',
              DESCRIPTION: 'Explore how openEuler is used across various industries.',
              URL: '/showcase/',
            },
            {
              NAME: 'White Papers',
              DESCRIPTION: 'Insights into the tech details and applications of each release.',
              URL: '/showcase/technical-white-paper/',
            },
          ],
          SHORTCUT: [],
        },
      ],
    },
    {
      NAME: 'Develop',
      ID: 'development',
      CHILDREN: [
        {
          NAME: 'Build',
          CHILDREN: [
            {
              NAME: 'EulerMaker',
              DESCRIPTION: 'An open, unified build service for streamlined development.',
              URL: 'https://eulermaker.compass-ci.openeuler.openatom.cn/',
            },
            {
              NAME: 'Compass-CI',
              DESCRIPTION: 'An open platform for reliable, comprehensive testing.',
              URL: 'https://compass-ci.openeuler.org/',
            },
            {
              NAME: 'openEuler User Repo',
              DESCRIPTION: 'An easy-to-use package hosting and distribution platform.',
              URL: 'https://eur.openeuler.openatom.cn/coprs/',
            },
            {
              NAME: 'Submit Package',
              DESCRIPTION: 'Contribute software packages efficiently to the community.',
              URL: 'https://software-pkg.openeuler.org/en/package',
            },
          ],
        },
        {
          NAME: 'Release',
          CHILDREN: [
            {
              NAME: 'OEPKGS',
              DESCRIPTION: 'A third-party extension repository for openEuler.',
              URL: 'https://oepkgs.net/en-CN',
              ICON: OutLink
            },
          ],
        },
        {
          NAME: 'Analyze',
          CHILDREN: [
            {
              NAME: 'Pkgship',
              DESCRIPTION: 'A tool to query OS package information and dependencies with ease.',
              URL: 'https://pkgmanage.openeuler.org/',
            },
          ],
        },
        {
          NAME: 'Submit Issue',
          CHILDREN: [
            {
              NAME: 'QuickIssue',
              DESCRIPTION: 'Submit and track community issues quickly and easily.',
              URL: 'https://quickissue.openeuler.org/en/issues/',
            },
          ],
        },
      ],
    },
    {
      NAME: 'Support',
      ID: 'approve',
      CHILDREN: [
        {
          NAME: 'Compatibility',
          CHILDREN: [
            {
              NAME: 'Compatibility List',
              DESCRIPTION: 'Check hardware and software compatibility with openEuler.',
              URL: '/compatibility/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'Overall Introduction to the openEuler Hardware Compatibility Test',
              TYPE: HeartLight,
              TYPE_DARK: HeartDark,
              URL: '/compatibility/hardware/',
            },
          ]
        },
        {
          NAME: 'Services & Resources',
          CHILDREN: [
            {
              NAME: 'x2openEuler',
              DESCRIPTION: 'A user-friendly tool to seamlessly migrate your OS to openEuler.',
              URL: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
            },
            {
              NAME: 'Security Center',
              DESCRIPTION: 'Track the latest vulnerabilities, security advisories, and more.',
              URL: '',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'security center',
                  URL: '/security/security-bulletins/',
                },
                {
                  NAME: 'bug center',
                  URL: '/security/bug-bulletins/',
                },
              ],
            },
            {
              NAME: 'FAQs',
              DESCRIPTION: 'Find the answers to common questions about openEuler.',
              URL: '/faq/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'QuickIssue ',
              TYPE: ToolLight,
              TYPE_DARK: ToolDark,
              URL: 'https://quickissue.openeuler.org/en/issues/',
            },
          ]
        },
      ],
    },
    {
      NAME: 'Community',
      ID: 'community',
      CHILDREN: [
        {
          NAME: 'About',
          CHILDREN: [
            {
              NAME: 'Governance',
              DESCRIPTION: 'Members of openEuler committees.',
              URL: '/community/organization/',
            },
            {
              NAME: 'Code of Conduct',
              DESCRIPTION: "openEuler's code of conduct.",
              URL: '/community/conduct/',
            },
            {
              NAME: 'Members',
              DESCRIPTION: 'Companies and organizations contributing to openEuler.',
              URL: '/community/member/',
            },
            {
              NAME: 'Statistics',
              DESCRIPTION: 'Find stats and see how the openEuler community thrives.',
              URL: 'https://datastat.openeuler.org/en/overview',
            },
          ],
          SHORTCUT: []
        },
        {
          NAME: 'Contribute',
          CHILDREN: [
            {
              NAME: 'SIGs',
              DESCRIPTION: 'Explore diverse SIGs.',
              URL: '/sig/sig-list/',
            },
            {
              NAME: 'Contribution Guide',
              DESCRIPTION: 'See how to get involved and make an impact in our community.',
              URL: '/community/contribution/',
            },
            {
              NAME: 'CLA',
              DESCRIPTION: 'Sign the CLA to protect your work—multiple options available!',
              URL: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
              ICON: OutLink,
            },
          ],
          SHORTCUT: []
        },
        {
          NAME: 'Projects',
          CHILDREN: [
            {
              NAME: 'A-Tune',
              DESCRIPTION: 'An AI-powered intelligent tuning engine.',
              URL: '/other/projects/atune/',
            },
            {
              NAME: 'iSula',
              DESCRIPTION: 'A container solution.',
              URL: '/other/projects/isula/',
            },
            {
              NAME: 'StratoVirt',
              DESCRIPTION: 'An enterprise-grade virtual machine monitor for cloud data centers.',
              URL: '/other/projects/stratovirt/',
            },
            {
              NAME: 'BiSheng JDK',
              DESCRIPTION: 'A high-performance JDK for Arm.',
              URL: '/other/projects/bishengjdk/',
            },
            {
              NAME: 'secGear',
              DESCRIPTION: 'A confidential computing framework for building secure applications.',
              URL: '/other/projects/secgear/',
            },
          ],
          SHORTCUT: [],
        },
        {
          NAME: 'Engage with Us',
          CHILDREN: [
            {
              NAME: 'Mailing Lists',
              DESCRIPTION: 'Discuss openEuler tech and progress on our mailing lists.',
              URL: '/community/mailing-list/',
            },
            {
              NAME: 'Contact Us',
              DESCRIPTION: '',
              URL: '',
              TAG: TAG_TYPE.NEW, 
            },
          ],
          SHORTCUT: [],
        },
      ],
    },

    {
      NAME: 'Stay Updated',
      ID: 'update',
      CHILDREN:  [
        {
          NAME: 'Activities',
          CHILDREN: [
            {
              NAME: 'Community Calendar',
              DESCRIPTION: "Stay informed with openEuler's key events, conferences, and releases.",
              URL: '/interaction/event-list/',
            },
            {
              NAME: 'Events',
              DESCRIPTION: 'Meet openEuler and connect with the community at every key event.',
              URL: '/interaction/summit-list/summit2024/',
            },
            {
              NAME: 'Call for X Program',
              DESCRIPTION: 'Become openEuler Valuable Professionals or contribute tech tutorials!',
              URL: '/community/program/',
            },
          ],
          WITH_PICTURE: true,
          SHORTCUT: [
            {
              NAME: 'Operating System Confenrence & openEuler Summit 2024',
              PICTURE: Summit,
              DESCRIPTION: 'Operating systems form the backbone of digital and intelligent industry transformation. openEuler, an open source operating system born in China for digital infrastructure, has emerged as a key player in the global open source landscape. Over the past five years, its market presence was steadily increasing. And openEuler has been continuously driving innovations in OS for AI and AI for OS, accelerating digital transformation, and fostering a thriving ecosystem though industry-wide collaboration.',
              REMARK: 'November 15-16, 2024 | Beijing',
              TYPE: 'PICTURE',
              URL: '/interaction/summit-list/summit2024/',
            },
          ]
        },
        {
          NAME: 'News & Blogs',
          CHILDREN: [
            {
              NAME: 'News',
              DESCRIPTION: 'Follow the latest developments, releases, and community updates.',
              URL: '/interaction/news-list/',
            },
            {
              NAME: 'Blogs',
              DESCRIPTION: 'Gain in-depth knowledge and fresh perspectives on openEuler.',
              URL: '/interaction/blog-list/',
            },
          ],
          SHORTCUT: []
        },
      ],
    },
  ],
  USER_CENTER: 'User Center',
  MESSAGE_CENTER: 'Message Center',
  LOGOUT: 'Logout',
  CODE: 'Code', 
  QUICKLINK: 'Quick Link',
  SEARCH: {
    BROWSEHISTORY: 'History',
    CLEAN: 'Clean up',
    TOPSEARCH: 'Top search',
    CHANGE: 'Change',
    PLEACHOLDER: 'Please enter...',
    PLEACHOLDER_EXTEND: 'Please enter the content',
    TEXT: 'Search',
  },
  SOURCE_CODE: [
    {
      NAME: 'Code Sources',
      PATH: 'https://gitee.com/openeuler',
    },
    {
      NAME: 'Package Sources',
      PATH: 'https://gitee.com/src-openeuler',
    },
    {
      NAME: 'GitHub Mirror',
      PATH: 'https://github.com/openeuler-mirror',
    },
  ],
};

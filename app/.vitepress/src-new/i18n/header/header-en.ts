import { markRaw } from 'vue';

import Summit from '~@/assets/category/header/summit.png';
import IconOutLink from '~icons/app/icon-out-link.svg';
import IconArrowRight from '~icons/app-new/icon-header-next.svg';

const TAG_TYPE = {
  HOT: 'HOT',
  NEW: 'NEW',
};

const OutLink = markRaw(IconOutLink);
const ArrowRight = markRaw(IconArrowRight);

export default {
  NAV_ROUTER: [
    {
      NAME: 'Download',
      ID: 'download',
      CHILDREN: [
        {
          NAME: 'Community Releases',
          CHILDREN: [
            {
              NAME: 'openEuler 24.03 LTS SP1',
              DESCRIPTION:
                'openEuler 24.03 LTS SP1, an enhanced version of the 24.03 LTS release based on the 6.6 kernel, is designed for server, cloud, edge computing, and embedded deployments, offering new features and functionality for developers and users across diverse domains.',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#openEuler 24.03 LTS SP1',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Server',
                  URL: '/download/?scenario=ISO#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: 'Edge Cloud',
                  URL: '/download/?scenario=edge_img#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: 'Cloud Computing',
                  URL: '/download/?scenario=virtual_machine_img#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: 'Embedded',
                  URL: '/download/?scenario=embedded_img#openEuler 24.03 LTS SP1',
                },
                {
                  NAME: 'DevStation',
                  URL: '/download/?scenario=DevStation#openEuler 24.03 LTS SP1',
                },
              ],
            },
            {
              NAME: 'openEuler 24.09',
              DESCRIPTION:
                'The latest innovation version built on Linux kernel 6.6, with new features and faster updates.',
              TAG: null,
              URL: '/download/#openEuler 24.09',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Server',
                  URL: '/download/?scenario=ISO#openEuler 24.09',
                },
                {
                  NAME: 'Edge Cloud',
                  URL: '/download/?scenario=edge_img#openEuler 24.09',
                },
                {
                  NAME: 'Cloud Computing',
                  URL: '/download/?scenario=virtual_machine_img#openEuler 24.09',
                },
                {
                  NAME: 'Embedded',
                  URL: '/download/?scenario=embedded_img#openEuler 24.09',
                },
                {
                  NAME: 'DevStation',
                  URL: '/download/?scenario=DevStation#openEuler 24.09',
                },
              ],
            },
            {
              NAME: 'openEuler 22.03 LTS SP4',
              DESCRIPTION:
                'A patch version of openEuler 22.03 LTS. Both versions share the same lifecycle.',
              TAG: null,
              URL: '/download/#openEuler 22.03 LTS SP4',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Server',
                  URL: '/download/?scenario=ISO#openEuler 22.03 LTS SP4',
                },
                {
                  NAME: 'Edge Cloud',
                  URL: '/download/?scenario=edge_img#openEuler 22.03 LTS SP4',
                },
                {
                  NAME: 'Cloud Computing',
                  URL: '/download/?scenario=virtual_machine_img#openEuler 22.03 LTS SP4',
                },
                {
                  NAME: 'Embedded',
                  URL: '/download/?scenario=embedded_img#openEuler 22.03 LTS SP4',
                },
              ],
            },
          ],
          SHORTCUT: [
            {
              NAME: 'Technical White Papers',
              URL: '/showcase/technical-white-paper/',
            },
            {
              NAME: 'openEuler 24.03 LTS SP1 Installation Guide',
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS_SP1/docs/Installation/Installation.html',
            },
            {
              NAME: 'openEuler 24.09 Installation Guide',
              URL: 'https://docs.openeuler.org/en/docs/24.09/docs/Installation/Installation.html',
            },
            {
              NAME: 'openEuler Lifecycle',
              URL: '/other/lifecycle/',
            },
            {
              NAME: 'Historical Releases',
              URL: '/download/archive/',
            },
          ],
          EXTRAS: [
            {
              NAME: 'Get openEuler',
              URL: '/download/#get-openeuler',
              ICON: ArrowRight,
              CHILDREN: [
                {
                  NAME: 'Cloud Images',
                  DESCRIPTION:
                    'openEuler has released official images on mainstream public cloud platforms',
                  URL: '/download/#cloud',
                },
                {
                  NAME: 'Container Images',
                  DESCRIPTION: 'openEuler provides official container images',
                  URL: '/download/#container',
                },
                {
                  NAME: 'Windows',
                  DESCRIPTION: 'Running openEuler on Windows',
                  URL: '/download/#windows',
                },
                {
                  NAME: 'MacOs',
                  DESCRIPTION: 'Running openEuler on MacOs',
                  URL: '/download/#macos',
                },
                {
                  NAME: 'Virtualization',
                  DESCRIPTION: 'Running openEuler on VMs',
                  URL: '/download/#virtualization',
                },
                {
                  NAME: 'Raspberry Pi',
                  DESCRIPTION: 'Installing openEuler on Raspberry Pi',
                  URL: '/download/#raspberrypi',
                },
              ],
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
            },
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
              DESCRIPTION:
                'Documentation guides to help you get started with openEuler.',
              URL: 'https://docs.openeuler.org/en/#process',
            },
            {
              NAME: 'Tools',
              DESCRIPTION:
                'Resources for using and accessing commonly used tools.',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/en/#tool',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'openEuler 24.03 LTS Documentation',
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Releasenotes/terms-of-use.html',
            },
            {
              NAME: 'Installation and Upgrade',
              URL: 'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Installation/Installation.html',
            },
          ],
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
          SHORTCUT: [],
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
              URL: '/migration/download/',
            },
            {
              NAME: 'Migration Practices',
              URL: '/migration/user-cases/',
            },
          ],
        },
        {
          NAME: 'Tech Highlights',
          CHILDREN: [
            {
              NAME: 'Success Stories',
              DESCRIPTION:
                'Explore how openEuler is used across various industries.',
              URL: '/showcase/',
            },
            {
              NAME: 'White Papers',
              DESCRIPTION:
                'Insights into the tech details and applications of each release.',
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
              DESCRIPTION:
                'An open, unified build service for streamlined development.',
              URL: 'https://eulermaker.compass-ci.openeuler.openatom.cn/',
            },
            {
              NAME: 'Compass-CI',
              DESCRIPTION:
                'An open platform for reliable, comprehensive testing.',
              URL: 'https://compass-ci.openeuler.org/',
            },
            {
              NAME: 'openEuler User Repo',
              DESCRIPTION:
                'An easy-to-use package hosting and distribution platform.',
              URL: 'https://eur.openeuler.openatom.cn/coprs/',
            },
            {
              NAME: 'Submit Package',
              DESCRIPTION:
                'Contribute software packages efficiently to the community.',
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
              ICON: OutLink,
            },
          ],
        },
        {
          NAME: 'Analyze',
          CHILDREN: [
            {
              NAME: 'Pkgship',
              DESCRIPTION:
                'A tool to query OS package information and dependencies with ease.',
              URL: 'https://pkgmanage.openeuler.org/',
            },
          ],
        },
        {
          NAME: 'Submit Issue',
          CHILDREN: [
            {
              NAME: 'QuickIssue',
              DESCRIPTION:
                'Submit and track community issues quickly and easily.',
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
              DESCRIPTION:
                'Check hardware and software compatibility with openEuler.',
              URL: '/compatibility/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'Overall Introduction to the openEuler Hardware Compatibility Test',
              URL: '/compatibility/hardware/',
            },
          ],
        },
        {
          NAME: 'Services & Resources',
          CHILDREN: [
            {
              NAME: 'x2openEuler',
              DESCRIPTION:
                'A user-friendly tool to seamlessly migrate your OS to openEuler.',
              URL: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduction.html',
            },
            {
              NAME: 'Security Center',
              DESCRIPTION:
                'Track the latest vulnerabilities, security advisories, and more.',
              URL: '',
              MOBILE_SHOW_CHILD: true,
              CHILDREN: [
                {
                  NAME: 'Security Center',
                  URL: '/security/security-bulletins/',
                },
                {
                  NAME: 'Bug Center',
                  URL: '/security/bug-bulletins/',
                },
              ],
            },
            {
              NAME: 'FAQs',
              DESCRIPTION:
                'Find the answers to common questions about openEuler.',
              URL: '/faq/',
            },
          ],
          SHORTCUT: [
            {
              NAME: 'QuickIssue ',
              URL: 'https://quickissue.openeuler.org/en/issues/',
            },
          ],
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
              DESCRIPTION:
                'Companies and organizations contributing to openEuler.',
              URL: '/community/member/',
            },
            {
              NAME: 'Statistics',
              DESCRIPTION:
                'Find stats and see how the openEuler community thrives.',
              URL: 'https://datastat.openeuler.org/en/overview',
            },
          ],
          SHORTCUT: [],
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
              DESCRIPTION:
                'See how to get involved and make an impact in our community.',
              URL: '/community/contribution/',
            },
            {
              NAME: 'CLA',
              DESCRIPTION:
                'Sign the CLA to protect your work—multiple options available!',
              URL: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
              ICON: OutLink,
            },
          ],
          SHORTCUT: [],
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
              DESCRIPTION:
                'An enterprise-grade virtual machine monitor for cloud data centers.',
              URL: '/other/projects/stratovirt/',
            },
            {
              NAME: 'BiSheng JDK',
              DESCRIPTION: 'A high-performance JDK for Arm.',
              URL: '/other/projects/bishengjdk/',
            },
            {
              NAME: 'secGear',
              DESCRIPTION:
                'A confidential computing framework for building secure applications.',
              URL: '/other/projects/secgear/',
            },
          ],
          SHORTCUT: [],
        },
        {
          NAME: 'Engage with Us',
          CHILDREN: [
            {
              NAME: 'Forum',
              DESCRIPTION: 'Share knowledge, ask anything, and solve together.',
              URL: 'https://forum.openeuler.org/?locale=en',
            },
            {
              NAME: 'Mailing Lists',
              DESCRIPTION:
                'Discuss openEuler tech and progress on our mailing lists.',
              URL: '/community/mailing-list/',
            },
            {
              NAME: 'Contact Us',
              DESCRIPTION: '',
              URL: '/contact-us/',
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
      CHILDREN: [
        {
          NAME: 'Activities',
          CHILDREN: [
            {
              NAME: 'Community Calendar',
              DESCRIPTION:
                "Stay informed with openEuler's key events, conferences, and releases.",
              URL: '/interaction/event-list/',
            },
            {
              NAME: 'Events',
              DESCRIPTION:
                'Meet openEuler and connect with the community at every key event.',
              URL: '/interaction/summit-list/summit2024/',
            },
            {
              NAME: 'Call for X Program',
              DESCRIPTION:
                'Become openEuler Valuable Professionals or contribute tech tutorials!',
              URL: '/community/program/',
            },
          ],
          WITH_PICTURE: true,
          SHORTCUT: [
            {
              NAME: 'Operating System Confenrence & openEuler Summit 2024',
              PICTURE: Summit,
              DESCRIPTION:
                'Operating systems form the backbone of digital and intelligent industry transformation. openEuler, an open source operating system born in China for digital infrastructure, has emerged as a key player in the global open source landscape. Over the past five years, its market presence was steadily increasing. And openEuler has been continuously driving innovations in OS for AI and AI for OS, accelerating digital transformation, and fostering a thriving ecosystem though industry-wide collaboration.',
              REMARK: 'November 15-16, 2024 | Beijing',
              TYPE: 'PICTURE',
              URL: '/interaction/summit-list/summit2024/',
            },
          ],
        },
        {
          NAME: 'News & Blogs',
          CHILDREN: [
            {
              NAME: 'News',
              DESCRIPTION:
                'Follow the latest developments, releases, and community updates.',
              URL: '/interaction/news-list/',
            },
            {
              NAME: 'Blogs',
              DESCRIPTION:
                'Gain in-depth knowledge and fresh perspectives on openEuler.',
              URL: '/interaction/blog-list/',
            },
            {
              NAME: 'Monthly Bulletins',
              DESCRIPTION: "What's new in the openEuler community.",
              URL: '/monthly-bulletins/',
            },
          ],
          SHORTCUT: [],
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

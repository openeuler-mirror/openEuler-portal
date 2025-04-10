import { markRaw } from 'vue';

import Summit from '~@/assets/category/header/summit.png';
import IconOutLink from '~icons/app/icon-out-link.svg';
import IconArrowRight from '~icons/app-new/icon-header-next.svg';

import annualReport2024 from '~@/assets/category/header/annual-report-2024.jpg';

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
          NAME: 'Get openEuler',
          CHILDREN: [
            {
              NAME: 'openEuler 25.03',
              DESCRIPTION:
                'Experience server, cloud, edge, embedded innovations based on Linux kernel 6.6.',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#openEuler 25.03',
            },
            {
              NAME: 'openEuler 24.03 LTS SP1',
              DESCRIPTION:
                'Enhanced 24.03 LTS SP1 on kernel 6.6. Better experience for users and devs.',
              TAG: null,
              URL: '/download/#openEuler 24.03 LTS SP1',
            },
            {
              NAME: 'openEuler 22.03 LTS SP4',
              DESCRIPTION:
                'A patch version of openEuler 22.03 LTS. Both versions share the same lifecycle.',
              TAG: null,
              URL: '/download/#openEuler 22.03 LTS SP4',
            },
            {
              NAME: 'More',
              DESCRIPTION:
                'Get openEuler from public clouds or container images.',
              TAG: null,
              URL: '/download/#get-openeuler',
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
        },
        {
          NAME: 'Related Resources',
          CHILDREN: [
            {
              NAME: 'Mirrors',
              DESCRIPTION: 'All mirror sites of openEuler.',
              URL: '/mirror/list/',
            },
            {
              NAME: 'Repo',
              DESCRIPTION: "Repo of openEuler's community releases.",
              URL: 'https://repo.openeuler.openatom.cn/',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: 'Historical Releases',
          URL: '/download/archive/',
        },
        {
          NAME: 'openEuler Lifecycle',
          URL: '/other/lifecycle/',
        },
        {
          NAME: 'openEuler 25.03 Installation Guide',
          URL: 'https://docs.openeuler.org/en/docs/25.03/server/installation_upgrade/installation/installation-preparations.html',
        },
        {
          NAME: 'openEuler 24.03 LTS SP1 Installation Guide',
          URL: 'https://docs.openeuler.org/en/docs/24.03_LTS_SP1/docs/Installation/Installation.html',
        },
        {
          NAME: 'Technical White Papers',
          URL: '/showcase/technical-white-paper/',
        },
      ],
    },
    {
      NAME: 'Develop',
      ID: 'development',
      CHILDREN: [
        {
          NAME: 'Contribute',
          CHILDREN: [
            {
              NAME: 'SIGs',
              DESCRIPTION: 'Explore diverse SIGs.',
              URL: '/sig/sig-list/',
            },
            {
              NAME: 'CLA',
              DESCRIPTION:
                'Sign the CLA to protect your work—multiple options available!',
              URL: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
              ICON: OutLink,
            },
            {
              NAME: 'Contribution Guide',
              DESCRIPTION:
                'See how to get involved and make an impact in our community.',
              URL: '/community/contribution/',
            },
          ],
        },
        {
          NAME: 'Build',
          CHILDREN: [
            {
              NAME: 'EulerMaker',
              DESCRIPTION:
                'An open, unified build service for streamlined development.',
              URL: 'https://eulermaker.compass-ci.openeuler.openatom.cn/',
              ANALYTICSNAME: 'eulermaker',
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
              ANALYTICSNAME: 'pkgship',
            },
          ],
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
              NAME: 'secGear',
              DESCRIPTION:
                'A confidential computing framework for building secure applications.',
              URL: '/other/projects/secgear/',
            },
            {
              NAME: 'StratoVirt',
              DESCRIPTION:
                'An enterprise-grade virtual machine monitor for cloud data centers.',
              URL: '/other/projects/stratovirt/',
            },
            {
              NAME: 'BiSheng JDK',
              DESCRIPTION: 'A high-performance Java Virtual Machine.',
              URL: '/other/projects/bishengjdk/',
            },
          ],
        },
      ],
      SHORTCUT: [],
    },
    {
      NAME: 'Document',
      ID: 'document',
      CHILDREN: [
        {
          NAME: 'Document',
          CHILDREN: [
            {
              NAME: 'Document Center',
              DESCRIPTION:
                'Your go-to resource for different service scenarios and tool usage.',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/en/',
            },
            {
              NAME: 'Quick Start',
              DESCRIPTION:
                'Learn the community essentials in 10 minutes, build and grow quickly.',
              TAG: TAG_TYPE.HOT,
              URL: 'https://docs.openeuler.org/en/docs/25.03/server/quickstart/quickstart/quick-start.html',
            },
            {
              NAME: 'Installation Guide',
              DESCRIPTION:
                'Step-by-step instructions for installing openEuler.',
              URL: 'https://docs.openeuler.org/en/docs/25.03/server/installation_upgrade/installation/installation-preparations.html',
            },
          ],
        },
      ],
      SHORTCUT: [],
    },
    {
      NAME: 'Learn',
      ID: 'learn',
      CHILDREN: [
        {
          NAME: 'Training',
          CHILDREN: [
            {
              NAME: 'Tutorials',
              DESCRIPTION:
                'Series of openEuler video tutorials to help you get started.',
              URL: '/learn/mooc/',
            },
          ],
        },
      ],
      SHORTCUT: [],
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
        },
        {
          NAME: 'Security',
          CHILDREN: [
            {
              NAME: 'Security Center',
              DESCRIPTION:
                'Track the latest vulnerabilities, security advisories, and more.',
              URL: '/security/security-bulletins/',
            },
            {
              NAME: 'Bug Center',
              DESCRIPTION: 'Discover bug fixes.',
              URL: '/security/bug-bulletins/',
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: 'Overall Introduction to the openEuler Hardware Compatibility Test',
          URL: '/compatibility/hardware/',
        },
        {
          NAME: 'Get x2openEuler',
          URL: '/migration/download/',
        },
        {
          NAME: 'Migration Practices',
          URL: '/migration/user-cases/',
        },
        {
          NAME: 'FAQs',
          URL: '/faq/',
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
            {
              NAME: 'Contact Us',
              DESCRIPTION: 'Email us or follow us on social media.',
              URL: '/contact-us/',
            },
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
              NAME: 'QuickIssue',
              DESCRIPTION:
                'Submit and track community issues quickly and easily.',
              URL: 'https://quickissue.openeuler.org/en/issues/',
            },
          ],
        },
      ],
      SHORTCUT: [],
    },
    {
      NAME: 'Stay Updated',
      ID: 'update',
      WITH_PICTURE: true,
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
        },
      ],
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
      ICON: OutLink,
    },
    {
      NAME: 'Package Sources',
      PATH: 'https://gitee.com/src-openeuler',
      ICON: OutLink,
    },
    {
      NAME: 'GitHub Mirror',
      PATH: 'https://github.com/openeuler-mirror',
      ICON: OutLink,
    },
  ],
};

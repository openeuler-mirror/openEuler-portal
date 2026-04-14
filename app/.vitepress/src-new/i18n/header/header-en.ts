import { markRaw } from 'vue';

import Summit from '~@/assets/category/header/summit.jpg';
import SummitDark from '~@/assets/category/header/summit-dark.jpg';

import IconOutLink from '~icons/app/icon-out-link.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const TAG_TYPE = {
  HOT: 'HOT',
  NEW: 'NEW',
};

const OutLink = markRaw(IconOutLink);

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
              NAME: 'openEuler 24.03 LTS SP3',
              DESCRIPTION:
                'Explore the UnifiedBus SuperPoD architecture on openEuler.',
              TAG: TAG_TYPE.NEW,
              URL: '/download/#openEuler 24.03 LTS SP3',
            },
            {
              NAME: 'openEuler 24.03 LTS SP2',
              DESCRIPTION:
                'Enhanced 24.03 LTS SP2 on kernel 6.6. Better experience for users and devs.',
              TAG: null,
              URL: '/download/#openEuler 24.03 LTS SP2',
            },
            {
              NAME: 'openEuler 24.03 LTS SP1',
              DESCRIPTION:
                'Enhanced 24.03 LTS SP1 on kernel 6.6. Better experience for users and devs.',
              TAG: null,
              URL: '/download/#openEuler 24.03 LTS SP1',
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
          URL: '/en/other/lifecycle/',
          isBlank: true,
        },
        {
          NAME: 'openEuler 24.03 LTS SP3 Installation Guide',
          URL: `${
            import.meta.env.VITE_SERVICE_DOCS_URL
          }/en/docs/24.03_LTS_SP3/server/installation_upgrade/installation/installation_preparations.html`,
        },
        {
          NAME: 'openEuler 25.09 Installation Guide',
          URL: `${
            import.meta.env.VITE_SERVICE_DOCS_URL
          }/en/docs/25.09/server/installation_upgrade/installation/installation_preparations.html`,
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
              URL: 'https://clasign.osinfra.cn/sign/6983225bdcbb19710248ccf0',
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
              URL: 'https://eulermaker.openeuler.openatom.cn/',
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
              URL: `${
                import.meta.env.VITE_SERVICE_SOFTWARE_PKG_URL
              }/en/package`,
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
              URL: import.meta.env.VITE_SERVICE_PKGMANAGE_URL,
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
              NAME: 'All projects',
              DESCRIPTION: '',
              URL: '/projects',
              ICON: IconChevronRight,
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
              URL: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/`,
            },
            {
              NAME: 'Quick Start',
              DESCRIPTION:
                'Learn the community essentials in 10 minutes, build and grow quickly.',
              TAG: TAG_TYPE.HOT,
              URL: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/24.03_LTS_SP3/server/quickstart/quickstart/quick_start.html`,
            },
            {
              NAME: 'Installation Guide',
              DESCRIPTION:
                'Step-by-step instructions for installing openEuler.',
              URL: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/24.03_LTS_SP3/server/installation_upgrade/installation/installation_preparations.html`,
            },
            {
              NAME: 'Frequently Asked Questions',
              DESCRIPTION: 'Get answers to common questions and troubleshooting tips.',
              URL: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/common/faq/general/general_faq.html`,
            },
            {
              NAME: 'Documentation Development Guide',
              DESCRIPTION: 'Discover how you can contribute to document development.',
              URL: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/common/contribute/directory_structure_introductory.html`,
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
              URL: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/en/overview`,
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
              URL: `${import.meta.env.VITE_SERVICE_FORUM_URL}/?locale=en`,
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
              URL: `${import.meta.env.VITE_SERVICE_QUICKISSUE_URL}/en/issues/`,
            },
          ],
        },
      ],
      SHORTCUT: [
        {
          NAME: 'Featured in Linux Magazine: A Comprehensive Focus Guide on openEuler',
          URL: `${
            import.meta.env.VITE_MAIN_DOMAIN_URL
          }/category/technology/Linux Magazine Focus Guide-openEuler.pdf`,
        },
      ],
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
              URL: '/interaction/summit-list/summit2025/',
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
          NAME: 'Operating System Confenrence & openEuler Summit 2025',
          PICTURE: Summit,
          PICTURE_PARK: SummitDark,
          DESCRIPTION:
            'As AI transitions from exploration to real-world implementation, operating systems are crucial for unleashing massive AI computing power. Celebrating six years of open source excellence, openEuler has achieved holistic growth in business, technology, and its ecosystem. It now powers a diverse range of scenarios—from servers and cloud-native to edge computing and embedded systems—serving users across the globe and driving foundational software innovation.',
          REMARK: 'November 14-15, 2025 | Beijing',
          TYPE: 'PICTURE',
          URL: '/interaction/summit-list/summit2025/',
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
    PLEACHOLDER_EXTEND: 'Press Enter to start, or refine your search with more info',
    PLEACHOLDER_IMAGE: 'Search by text or image',
    UPLOAD_TOOLTIP: 'JPG, PNG, JPEG supported (max 10 MB)',
    UPLOAD_FAILED: 'Upload failed. Check connection and try again.',
    TEXT: 'Search',
  },
  SOURCE_CODE: [
    {
      NAME: 'Code Sources',
      PATH: 'https://atomgit.com/openeuler',
      ICON: OutLink,
    },
    {
      NAME: 'Package Sources',
      PATH: 'https://atomgit.com/src-openeuler',
      ICON: OutLink,
    },
    {
      NAME: 'GitHub Mirror',
      PATH: 'https://github.com/openeuler-mirror',
      ICON: OutLink,
    },
  ],
};

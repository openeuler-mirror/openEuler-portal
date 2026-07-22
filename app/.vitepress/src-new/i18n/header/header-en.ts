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
      label: 'Download',
      id: 'download',
      children: [
        {
          label: 'Get openEuler',
          children: [
            {
              label: 'openEuler 24.03 LTS SP4',
              description:
                'Enhance server, cloud, and AI workloads with upgraded reliability, inference, O&M, and security.',
              tag: TAG_TYPE.NEW,
              href: '/en/download/#openEuler 24.03 LTS SP4',
            },
            {
              label: 'openEuler 24.03 LTS SP3',
              description:
                'Explore the UnifiedBus SuperPoD architecture on openEuler.',
              tag: null,
              URL: '/en/download/#openEuler 24.03 LTS SP3',
            },
            {
              label: 'openEuler 24.03 LTS SP1',
              description:
                'Enhanced 24.03 LTS SP1 on kernel 6.6. Better experience for users and devs.',
              tag: null,
              href: '/en/download/#openEuler 24.03 LTS SP1',
            },
            {
              label: 'More',
              description:
                'Get openEuler from public clouds or container images.',
              tag: null,
              href: '/en/download/#get-openeuler',
            },
          ],
        },
        {
          label: 'Other Releases',
          children: [
            {
              label: 'Commercial Releases',
              description: 'Commercial releases for x86, Arm, and RISC-V.',
              href: '/en/download/commercial-release/',
            },
          ],
        },
        {
          label: 'Related Resources',
          children: [
            {
              label: 'Mirrors',
              description: 'All mirror sites of openEuler.',
              href: '/en/mirror/list/',
            },
            {
              label: 'Repo',
              description: "Repo of openEuler's community releases.",
              href: 'https://repo.openeuler.openatom.cn/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'Historical Releases',
          href: '/en/download/archive/',
        },
        {
          label: 'openEuler Lifecycle',
          href: '/en/other/lifecycle/',
          isBlank: true,
        },
        {
          label: 'openEuler 24.03 LTS SP3 Installation Guide',
          href: `${
            import.meta.env.VITE_SERVICE_DOCS_URL
          }/en/docs/24.03_LTS_SP4/server/installation_upgrade/installation/installation_preparations.html`,
        },
        {
          label: 'openEuler 25.09 Installation Guide',
          href: `${
            import.meta.env.VITE_SERVICE_DOCS_URL
          }/en/docs/25.09/server/installation_upgrade/installation/installation_preparations.html`,
        },
        {
          label: 'Technical White Papers',
          href: '/en/showcase/technical-white-paper/',
        },
      ],
    },
    {
      label: 'Develop',
      id: 'development',
      children: [
        {
          label: 'Contribute',
          children: [
            {
              label: 'SIGs',
              description: 'Explore diverse SIGs.',
              href: '/en/sig/sig-list/',
            },
            {
              label: 'CLA',
              description:
                'Sign the CLA to protect your work—multiple options available!',
              href: 'https://clasign.osinfra.cn/sign/6983225bdcbb19710248ccf0',
              icon: OutLink,
            },
            {
              label: 'Contribution Guide',
              description:
                'See how to get involved and make an impact in our community.',
              href: '/en/community/contribution/',
            },
          ],
        },
        {
          label: 'Build',
          children: [
            {
              label: 'EulerMaker',
              description:
                'An open, unified build service for streamlined development.',
              href: 'https://eulermaker.openeuler.openatom.cn/',
              analyticsName: 'eulermaker',
            },
            {
              label: 'openEuler User Repo',
              description:
                'An easy-to-use package hosting and distribution platform.',
              href: 'https://eur.openeuler.openatom.cn/coprs/',
            },
            {
              label: 'Submit Package',
              description:
                'Contribute software packages efficiently to the community.',
              href: `${
                import.meta.env.VITE_SERVICE_SOFTWARE_PKG_URL
              }/en/package`,
            },
          ],
        },
        {
          label: 'Release',
          children: [
            {
              label: 'OEPKGS',
              description: 'A third-party extension repository for openEuler.',
              href: 'https://oepkgs.net/en-CN',
              icon: OutLink,
            },
          ],
        },
        {
          label: 'Analyze',
          children: [
            {
              label: 'Pkgship',
              description:
                'A tool to query OS package information and dependencies with ease.',
              href: import.meta.env.VITE_SERVICE_PKGMANAGE_URL,
              analyticsName: 'pkgship',
            },
          ],
        },
        {
          label: 'Projects',
          children: [
            {
              label: 'A-Tune',
              description: 'An AI-powered intelligent tuning engine.',
              href: '/en/other/projects/atune/',
            },
            {
              label: 'iSula',
              description: 'A container solution.',
              href: '/en/other/projects/isula/',
            },
            {
              label: 'secGear',
              description:
                'A confidential computing framework for building secure applications.',
              href: '/en/other/projects/secgear/',
            },
            {
              label: 'All projects',
              description: '',
              href: '/en/projects',
              icon: IconChevronRight,
            },
          ],
        },
      ],
      shortcut: [],
    },
    {
      label: 'Document',
      id: 'document',
      children: [
        {
          label: 'Document',
          children: [
            {
              label: 'Document Center',
              description:
                'Your go-to resource for different service scenarios and tool usage.',
              tag: TAG_TYPE.HOT,
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/`,
            },
            {
              label: 'Quick Start',
              description:
                'Learn the community essentials in 10 minutes, build and grow quickly.',
              tag: TAG_TYPE.HOT,
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/24.03_LTS_SP3/server/quickstart/quickstart/quick_start.html`,
            },
            {
              label: 'Installation Guide',
              description:
                'Step-by-step instructions for installing openEuler.',
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/24.03_LTS_SP3/server/installation_upgrade/installation/installation_preparations.html`,
            },
            {
              label: 'Frequently Asked Questions',
              description: 'Get answers to common questions and troubleshooting tips.',
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/common/faq/general/general_faq.html`,
            },
            {
              label: 'Documentation Development Guide',
              description: 'Discover how you can contribute to document development.',
              href: `${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/common/contribute/directory_structure_introductory.html`,
            },
          ],
        },
      ],
      shortcut: [],
    },
    {
      label: 'Learn',
      id: 'learn',
      children: [
        {
          label: 'Training',
          children: [
            {
              label: 'Tutorials',
              description:
                'Series of openEuler video tutorials to help you get started.',
              href: '/en/learn/mooc/',
            },
          ],
        },
      ],
      shortcut: [],
    },
    {
      label: 'Support',
      id: 'approve',
      children: [
        {
          label: 'Compatibility',
          children: [
            {
              label: 'Compatibility List',
              description:
                'Check hardware and software compatibility with openEuler.',
              href: '/en/compatibility/',
            },
          ],
        },
        {
          label: 'Migration',
          children: [
            {
              label: 'Migrate to openEuler',
              description: 'Guides for migrating to openEuler.',
              href: '/en/migration/',
            },
          ],
        },
        {
          label: 'Security',
          children: [
            {
              label: 'Security Center',
              description:
                'Track the latest vulnerabilities, security advisories, and more.',
              href: '/en/security/security-bulletins/',
            },
            {
              label: 'Bug Center',
              description: 'Discover bug fixes.',
              href: '/en/security/bug-bulletins/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'Overall Introduction to the openEuler Hardware Compatibility Test',
          href: '/en/compatibility/hardware/',
        },
        {
          label: 'Get x2openEuler',
          href: '/en/migration/download/',
        },
        {
          label: 'Migration Practices',
          href: '/en/migration/user-cases/',
        },
        {
          label: 'FAQs',
          href: '/en/faq/',
        },
      ],
    },
    {
      label: 'Community',
      id: 'community',
      children: [
        {
          label: 'About',
          children: [
            {
              label: 'Governance',
              description: 'Members of openEuler committees.',
              href: '/en/community/organization/',
            },
            {
              label: 'Code of Conduct',
              description: "openEuler's code of conduct.",
              href: '/en/community/conduct/',
            },
            {
              label: 'Members',
              description:
                'Companies and organizations contributing to openEuler.',
              href: '/en/community/member/',
            },
            {
              label: 'Statistics',
              description:
                'Find stats and see how the openEuler community thrives.',
              href: `${import.meta.env.VITE_SERVICE_DATASTAT_URL}/en/overview`,
            },
            {
              label: 'Contact Us',
              description: 'Email us or follow us on social media.',
              href: '/en/contact-us/',
            },
            {
              label: 'Success Stories',
              description:
                'Explore how openEuler is used across various industries.',
              href: '/en/showcase/',
            },
            {
              label: 'White Papers',
              description:
                'Insights into the tech details and applications of each release.',
              href: '/en/showcase/technical-white-paper/',
            },
          ],
        },
        {
          label: 'Engage with Us',
          children: [
            {
              label: 'Forum',
              description: 'Share knowledge, ask anything, and solve together.',
              href: `${import.meta.env.VITE_SERVICE_FORUM_URL}/?locale=en`,
            },
            {
              label: 'Mailing Lists',
              description:
                'Discuss openEuler tech and progress on our mailing lists.',
              href: '/en/community/mailing-list/',
            },
            {
              label: 'QuickIssue',
              description:
                'Submit and track community issues quickly and easily.',
              href: `${import.meta.env.VITE_SERVICE_QUICKISSUE_URL}/en/issues/`,
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'Featured in Linux Magazine: A Comprehensive Focus Guide on openEuler',
          href: `${
            import.meta.env.VITE_MAIN_DOMAIN_URL
          }/category/technology/Linux Magazine Focus Guide-openEuler.pdf`,
        },
      ],
    },
    {
      label: 'Stay Updated',
      id: 'update',
      withPicture: true,
      children: [
        {
          label: 'Activities',
          children: [
            {
              label: 'Community Calendar',
              description:
                "Stay informed with openEuler's key events, conferences, and releases.",
              href: '/en/interaction/event-list/',
            },
            {
              label: 'Events',
              description:
                'Meet openEuler and connect with the community at every key event.',
              href: '/en/interaction/summit-list/summit2025/',
            },
            {
              label: 'Call for X Program',
              description:
                'Become openEuler Valuable Professionals or contribute tech tutorials!',
              href: '/en/community/program/',
            },
          ],
        },
        {
          label: 'News & Blogs',
          children: [
            {
              label: 'News',
              description:
                'Follow the latest developments, releases, and community updates.',
              href: '/en/interaction/news-list/',
            },
            {
              label: 'Blogs',
              description:
                'Gain in-depth knowledge and fresh perspectives on openEuler.',
              href: '/en/interaction/blog-list/',
            },
            {
              label: 'Monthly Bulletins',
              description: "What's new in the openEuler community.",
              href: '/en/monthly-bulletins/',
            },
          ],
        },
      ],
      shortcut: [
        {
          label: 'Operating System Confenrence & openEuler Summit 2025',
          picture: Summit,
          picturePark: SummitDark,
          description:
            'As AI transitions from exploration to real-world implementation, operating systems are crucial for unleashing massive AI computing power. Celebrating six years of open source excellence, openEuler has achieved holistic growth in business, technology, and its ecosystem. It now powers a diverse range of scenarios—from servers and cloud-native to edge computing and embedded systems—serving users across the globe and driving foundational software innovation.',
          remark: 'November 14-15, 2025 | Beijing',
          type: 'PICTURE',
          href: '/en/interaction/summit-list/summit2025/',
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
    BROWSEHISTORY: 'Recent',
    CLEAN: 'Clean up',
    TOPSEARCH: 'Popular',
    CHANGE: 'Change',
    ONESTEP: 'Quick Navigation',
    SUGGEST: 'Suggestions',
    NO_DATA: 'No data',
    PLEACHOLDER: 'Please enter...',
    PLEACHOLDER_EXTEND: 'Press Enter to start, or refine your search with more info',
    PLEACHOLDER_IMAGE: 'Search by text or upload image of any error',
    UPLOAD_TOOLTIP: 'JPG, PNG, JPEG supported (max 10 MB)',
    UPLOAD_FAILED: 'Upload failed. Check connection and try again.',
    TEXT: 'Search',
  },
  SOURCE_CODE: 'Code',
  CODE_REPOSITORY: 'Code Sources',
  SOFTWARE_REPOSITORY: 'Package Sources',
  GITHUB_MIRROR: 'GitHub Mirror',
  LFS_FILE_MANAGEMENT: 'LFS File Management',
};

export default {
  MEETINGS_TIME: 'Time: ',
  MEETINGS_REPLAY: 'Replay',
  SEARCH_PLACE_HOLDER: 'Input content',
  COOKIE_LEGAL_TEXT:
    'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.',
  COOKIE_LEGAL_LINK_TEXT: ' Read our privacy policy.',
  NAV_ROUTER: {
    DOWNLOAD: 'Download',
    ISO: 'Software Packages',
    MIRRORLIST: 'Mirrors',
    LEARNING: 'Learning',
    DOCS: 'Documentation',
    MOOC: 'MOOC',
    INTERNSHIP: 'Internship',
    CONNECT: 'Connect',
    NEWS: 'News',
    BLOG: 'Blog',
    LIVE: 'Live',
    SALON: 'Meetups',
    SUMMIT: 'Summit',
    COMMUNITY: 'Community',
    CONTRIBUTION: 'Contribution',
    CONVENTION: 'Convention',
    MAILINGLIST: 'Mailing Lists',
    CERTIFICATION: 'Certification',
    TALENT: 'Talent',
    STATISTICS: 'Statistics',
    SIG: 'SIG',
    SIGLIST: 'SIG Lists',
    APPLICATION: 'Application',
    ROLES: 'Roles',
    MEETINGGUIDE: 'Meeting-Guide',
    DISCOVERY: 'Discovery',
    ATUNE: 'A-Tune',
    BISHENGJDK: 'BiSheng JDK',
    ISULA: 'iSula',
    SECGEAR: 'secGear',
    STRATOVIRT: 'StratoVirt',
    COMPASSCI: 'Compass-CI',
    COMPLIANCE: 'Compliance',
    PKGSHIP: 'Pkgship',
    SUPPORT: 'Support',
    VULNERABILITY: 'Vulnerability Management',
    SAFETY: 'Security Advisories',
    CVE: 'CVE',
    COMPATIBILITY_EVALUATION: 'Compatibility Technology Evaluation',
    APPROVE: 'Approve',
    COMPATIBILITY: 'Compatibility List',
    MIGRATION: 'Migration',
  },
  NAV_ROUTER_CONFIG: [
    {
      PATH: '',
      NAME: 'Download',
      ID: 'download',
      CHILDREN: [
        {
          NAME: 'Software Packages',
          ID: 'iso',
          PATH: '/download/',
        },
        {
          NAME: 'Mirrors',
          ID: 'mirror-list',
          PATH: '/mirror/list/',
        },
      ],
      CLASS: ['download', 'mirror'],
    },
    {
      NAME: 'Learning',
      ID: 'learning',
      CHILDREN: [
        {
          NAME: 'Documentation',
          ID: 'docs',
          PATH: '/en/',
          IS_OPEN_WINDOW: 1,
        },
      ],
      CLASS: ['learning', 'learn'],
    },
    {
      PATH: '',
      NAME: 'Connect',
      ID: 'connect',
      CHILDREN: [
        {
          NAME: 'News',
          ID: 'news',
          PATH: '/interaction/news-list/',
        },
        {
          NAME: 'Blog',
          ID: 'blog',
          PATH: '/interaction/blog-list/',
        },
        {
          NAME: 'QuickIssue',
          ID: 'QuickIssue',
          PATH: 'https://quickissue.openeuler.org/en/issues/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: ['news', 'blog'],
    },
    {
      PATH: '',
      NAME: 'Community',
      ID: 'community',
      CHILDREN: [
        {
          NAME: 'About Us',
          ID: 'about-us',
          PATH: '/community/organization/',
        },
        {
          NAME: 'Contribution',
          ID: 'contribution',
          PATH: '/community/contribution/',
        },
        {
          NAME: 'Mailing Lists',
          ID: 'mailing-list',
          PATH: '/community/mailing-list/',
        },
        {
          NAME: 'Certification',
          ID: 'certification',
          PATH: '/community/certification-services/',
          // IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Statistics',
          ID: 'statistics',
          PATH: 'https://datastat.openeuler.org/en/overview',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: [
        'contribution',
        'conduct',
        'mailing-list',
        'certification-services',
      ],
    },
    {
      PATH: '',
      NAME: 'SIG',
      ID: 'sig',
      CHILDREN: [
        {
          NAME: 'SIG Lists',
          ID: 'sig-list',
          PATH: '/sig/sig-list/',
        },
        {
          NAME: 'Set Up',
          ID: 'application',
          PATH: '/sig/sig-guidance/',
        },
        {
          NAME: 'Roles',
          ID: 'roles',
          PATH: '/sig/role-description/',
        },
      ],
      CLASS: ['sig-list', 'sig-guidance', 'role-description'],
    },
    {
      PATH: '',
      NAME: 'Discovery',
      ID: 'discovery',
      CHILDREN: [
        {
          NAME: 'A-Tune',
          ID: 'atune',
          PATH: '/other/projects/atune/',
        },
        {
          NAME: 'BiSheng JDK',
          ID: 'bishengjdk',
          PATH: '/other/projects/bishengjdk/',
        },
        {
          NAME: 'iSula',
          ID: 'isula',
          PATH: '/other/projects/isula/',
        },
        {
          NAME: 'secGear',
          ID: 'secgear',
          PATH: '/other/projects/secgear/',
        },
        {
          NAME: 'StratoVirt',
          ID: 'stratovirt',
          PATH: '/other/projects/stratovirt/',
        },
        {
          NAME: 'Compass-CI',
          ID: 'compass-ci',
          PATH: 'https://compass-ci.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Compliance',
          ID: 'compliance',
          PATH: 'https://compliance.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Pkgship',
          ID: 'pkgship',
          PATH: 'https://pkgmanage.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'radiaTest',
          ID: 'radiaTest',
          PATH: 'https://radiatest.openeuler.org',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'NestOS',
          ID: 'NestOS',
          PATH: 'https://nestos.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: ['atune', 'bishengjdk', 'isula', 'secgear', 'stratovirt'],
    },
    {
      PATH: '',
      NAME: 'Support',
      ID: 'support',
      CHILDREN: [
        {
          NAME: 'Vulnerability Management',
          ID: 'vulnerability-reporting',
          PATH: '/security/vulnerability-reporting/',
        },
        {
          NAME: 'Security Advisories',
          ID: 'security-bulletins',
          PATH: '/security/security-bulletins/',
        },
        {
          NAME: 'CVE',
          ID: 'cve',
          PATH: '/security/cve/',
        },
        {
          NAME: 'Compatibility List',
          ID: 'compatibility',
          PATH: '/compatibility/',
        },
      ],
      CLASS: [
        'vulnerability-reporting',
        'safety-bulletin',
        'cve',
        'compatibility',
      ],
    },
    {
      PATH: '',
      NAME: 'CODE',
      ID: 'code',
      CHILDREN: [
        {
          NAME: 'Code Sources',
          PATH: 'https://gitee.com/openeuler',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Package Sources',
          PATH: 'https://gitee.com/src-openeuler',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'GitHub Mirror',
          PATH: 'https://github.com/openeuler-mirror',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: ['code'],
    },
  ],
  NAV_ROUTER_INFO: [
    {
      NAME: 'Updates',
      CHILDREN: [
        {
          NAME: 'News',
          LABEL: '',
          PATH: '/interaction/news-list/',
        },
        {
          NAME: 'Blogs',
          LABEL: '',
          PATH: '/interaction/blog-list/',
        },
      ],
    },
    {
      NAME: 'Connects',
      CHILDREN: [
        {
          NAME: 'Mailing Lists',
          LABEL: '',
          PATH: '/community/mailing-list/',
        },
      ],
    },
  ],
  NAV_ROUTER_CONFIG_NEW: [
    {
      NAME: 'Users',
      ID: 'user',
      CHILDREN: [
        {
          NAME: 'Technology Highlights',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'Success Stories',
              LABEL:
                'Best practices of openEuler for different industry projects',
              PATH: '/showcase/',
            },
          ],
        },
        {
          NAME: 'Usage Guides',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'Documentation',
              LABEL: '',
              PATH: 'https://docs.openeuler.org/en/',
            },
          ],
        },
        {
          NAME: 'Support & Services',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'Compatibility List',
              LABEL: 'openEuler compatibility list',
              PATH: '/compatibility/',
            },
            {
              NAME: 'Security Center',
              LABEL: 'Vulnerability management and security advisories',
              PATH: '',
              CHILDREN: [
                {
                  NAME: 'Vulnerability Management',
                  LABEL: '',
                  PATH: '/security/vulnerability-reporting/',
                },
                {
                  NAME: 'Security Advisories',
                  LABEL: '',
                  PATH: '/security/security-bulletins/',
                },
                {
                  NAME: 'CVE',
                  LABEL: '',
                  PATH: '/security/cve/',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      NAME: 'Developers',
      ID: 'developer',
      CHILDREN: [
        {
          NAME: 'Learning & Contribution',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'Documentation',
              LABEL: '',
              PATH: 'https://docs.openeuler.org/en/',
            },
            {
              NAME: 'Contribution Guide',
              LABEL: '',
              PATH: '/community/contribution/',
            },
            {
              NAME: 'SIG Center',
              LABEL: '',
              PATH: '/sig/sig-list/',
            },
            {
              NAME: 'CLA',
              LABEL: '',
              PATH: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
            },
          ],
        },
        {
          NAME: 'Develop openEuler',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'QuickIssue',
              LABEL: 'Query and submit issues',
              PATH: 'https://quickissue.openeuler.org/en/issues/',
            },
            {
              NAME: 'Pkgship',
              LABEL: 'Query software packages and dependencies',
              PATH: 'https://pkgmanage.openeuler.org',
            },
            {
              NAME: 'Contribute Software Package',
              LABEL:
                'Contribute software packages in a simple and efficient manner',
              PATH: 'https://software-pkg.openeuler.org/en/package',
            },
            {
              NAME: 'Compliance',
              LABEL: 'Detect license compatibility and compliance',
              PATH: 'https://compliance.openeuler.org/',
            },

            {
              NAME: 'EulerTest',
              LABEL: 'Testing management platform developed based on openEuler',
              PATH: 'https://radiatest.openeuler.org',
            },
            {
              NAME: 'Compass-CI',
              LABEL: 'Open test service platform',
              PATH: 'https://compass-ci.openeuler.org/',
            },
          ],
        },
        {
          NAME: 'Develop on openEuler',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'openEuler User Repo',
              LABEL:
                'Easy-to-use software package hosting and distribution platform',
              PATH: 'https://eur.openeuler.openatom.cn/coprs/',
            },
          ],
        },
        {
          NAME: 'Code',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'Code Sources',
              LABEL: '',
              PATH: 'https://gitee.com/openeuler',
            },
            {
              NAME: 'Package Sources',
              LABEL: '',
              PATH: 'https://gitee.com/src-openeuler',
            },
            {
              NAME: 'GitHub Mirror',
              LABEL: '',
              PATH: 'https://github.com/openeuler-mirror',
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
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'Organizational Structure',
              LABEL: 'Committee members',
              PATH: '/community/organization/',
            },
            {
              NAME: 'Donors',
              LABEL: "openEuler's donors",
              PATH: '/community/member/',
            },
            // {
            //   NAME: 'Policies',
            //   LABEL:
            //     'Charter, regulations, code of conduct, and license policies',
            //   PATH: '/community/charter/',
            // },
            {
              NAME: 'Statistics',
              LABEL: 'Community statistics',
              PATH: 'https://datastat.openeuler.org/en/overview',
            },
          ],
        },
        {
          NAME: 'Learning & Contribution',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'Documentation',
              LABEL: '',
              PATH: 'https://docs.openeuler.org/en/',
            },
            {
              NAME: 'Contribution Guide',
              LABEL: '',
              PATH: '/community/contribution/',
            },
            {
              NAME: 'SIG Center',
              LABEL: '',
              PATH: '/sig/sig-list/',
            },
            {
              //培训认证
              NAME: 'Certification',
              LABEL: '',
              PATH: 'https://talent-assessment.openeuler.org/',
            },
          ],
        },
        {
          NAME: 'Projects',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'A-Tune',
              LABEL: 'AI-powered tuning engine',
              PATH: '/other/projects/atune/',
            },
            {
              NAME: 'BiSheng JDK',
              LABEL: 'Optimal JDK on Arm',
              PATH: '/other/projects/bishengjdk/',
            },
            {
              NAME: 'iSula',
              LABEL: 'Container solution',
              PATH: '/other/projects/isula/',
            },
            {
              NAME: 'secGear',
              LABEL:
                'Confidential computing framework for secure application development',
              PATH: '/other/projects/secgear/',
            },
            {
              NAME: 'StratoVirt',
              LABEL: 'Enterprise-level VMM intended for cloud data centers',
              PATH: '/other/projects/stratovirt/',
            },
          ],
        },
      ],
    },
    {
      NAME: 'Downloads',
      ID: 'download',
      CHILDREN: [
        {
          NAME: 'Latest',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'openEuler 22.03 LTS SP2',
              LABEL:
                'openEuler openEuler 22.03 LTS SP2 is the patch version of openEuler 22.03 LTS, and both versions have the same lifecycle.',
              PATH: '/download/?version=openEuler 22.03 LTS SP2',
              CHILDREN: [
                {
                  NAME: 'Server',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 22.03 LTS SP2&scenario=SERVER',
                },
                {
                  NAME: 'Edge Cloud',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 22.03 LTS SP2&scenario=EDGE_CLOUD',
                },
                {
                  NAME: 'Cloud Computing',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 22.03 LTS SP2&scenario=CLOUD_COMPUTING',
                },
                {
                  NAME: 'Embedded',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 22.03 LTS SP2&scenario=EMBEDDED',
                },
              ],
            },
            {
              NAME: 'openEuler 23.03',
              LABEL:
                'openEuler 23.03 uses Linux Kernel 6.1 to explore technologies, adapt hardware, and innovate basic technologies and upper-layer applications for future openEuler LTS versions built on Linux Kernel 6.x.',
              PATH: '/download/?version=openEuler 23.03',
              CHILDREN: [
                {
                  NAME: 'Server',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 23.03&scenario=SERVER',
                },
                {
                  NAME: 'Edge Cloud',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 23.03&scenario=EDGE_CLOUD',
                },
                {
                  NAME: 'Cloud Computing',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 23.03&scenario=CLOUD_COMPUTING',
                },
                {
                  NAME: 'Embedded',
                  LABEL: '',
                  PATH: '/download/?version=openEuler 23.03&scenario=EMBEDDED',
                },
              ],
            },
          ],
        },
        {
          NAME: 'Archives',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'Community Editions',
              LABEL: '',
              PATH: '/download/archive/',
            },
            {
              NAME: 'Commercial Editions',
              LABEL: '',
              PATH: '/download/commercial-release/',
            },
          ],
        },
        {
          NAME: 'Others',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'Mirrors',
              PATH: '/mirror/list/',
            },
          ],
        },
      ],
    },
  ],
  LANG: 'English',
  LANG_LIST: ['中文', 'English', 'Русский'],
  USER_CENTER: 'User Center',
  LOGOUT: 'Logout',
  PLEASE: 'Please',
  LOGIN: 'login',
  GITTE: 'Source code',
  CODE: 'CODE',
  FOOTER: {
    ATOM_TEXT:
      'openEuler is an open source project incubated and operated by the OpenAtom Foundation.',
    ATOM_PC: '/atom-pc.png',
    ATOM_MO: '/atom-mo.png',
    MAIL: 'contact@openeuler.io',
    COPY_RIGHT: 'Copyright © 2023 openEuler. All rights reserved.',
    LICENSED_1: 'Licensed under',
    LICENSED_2: 'the MulanPSL2',
    RIGHT_LIST: [
      {
        NAME: 'Trademark',
        URL: '/other/brand/',
      },
      {
        NAME: 'Privacy Policy',
        URL: '/other/privacy/',
      },
      {
        NAME: 'Legal Notice',
        URL: '/other/legal/',
      },
      {
        NAME: 'Service Status',
        URL: 'https://status.openeuler.org/',
      },
    ],
    QR_CODE: 'WeChat Subscription',
    QR_ASSISTANT: 'WeChat Assistant',
  },
  BUILDING: {
    BUILDING: 'Building',
    BUILDINGMES: 'Coming soon…',
  },
  SEARCH: {
    BROWSEHISTORY: 'History',
    CLEAN: 'Clean up',
    TOPSEARCH: 'Top search',
    CHANGE: 'Change',
    PLEACHOLDER: 'Please enter the content',
  },
  PREV: 'pre',
  NEXT: 'next',
};

import data from '../../data/download/download';
import commercialReleaseData from '../../data/download/download-commercial-release';
export default {
  COPY_SUCCESS: 'copied successfully.',
  RELEASE_DESC: 'Release Notes',
  SERVER_IMAGE: 'Server Image',
  CLOUD_IMAGE: 'Cloud Image',
  EDGE_IMAGE: 'Edge Image',
  EMBEDDEN_IMAGE: 'Embedded Image',
  INSTALL_GUIDENCE: 'Installation Guide',
  SEEK_HELP: 'Seek Help',
  GET_ISO: 'Get ISO',
  SELECT: 'Filter',
  // 新增 start
  COMMUNITY: 'Community Releases',
  BUSINESS: 'Commercial Releases',
  DETAIL1:
    'openEuler 24.09 is the latest version that was released in Sept, 2024. Download and try for yourself here.',
  DETAIL2: '',
  CLICK_VIEW: 'Browse Earlier Versions.',
  ARCHIVE_LINK: '/en/download/archive/',
  DETAIL3:
    'The recommended mirror sites are based on your IP address. You can find a specific mirror site or create a public mirror site for the openEuler community',
  CLICK_LIST: ' here.',
  MIRROR_LIST_LINK: '/en/mirror/list/',
  HISTORY: 'Archive',
  ARCHITECTURE2: 'Architecture',
  SCENARIO2: 'Scenario',
  ARCHITECTUREList: ['x86_64', 'AArch64', 'ARM32'],
  SCENARIOS: ['Server', 'Edge Cloud', 'Cloud Computing', 'Embedded'],
  VERSION_TYPE: 'Version',
  OFFLINE_STANDARD:
    'Base installation ISO file of the {arch} architecture, including the core components for running the minimum system.',
  OFFLINE_EVERYTHING:
    'Full installation ISO file of the {arch} architecture, including all components for running the entire system.',
  EDGE_OFFLINE_STANDARD:
    'Base installation ISO file of the {arch} architecture, including the core components for running the minimum system.',
  VIRTUAL_MACHINE: 'VM image of openEuler in the {arch} architecture.',
  GLIBC: 'Development and compilation toolchain in the ARM architecture.',
  QEMU: 'File system that supports QEMU in the ARM architecture.',
  zImage: 'Kernel image that supports QEMU in the ARM architecture.',
  VERSION_LIST: [
    {
      KEY: 'ALL',
      VALUE: 'All',
    },
    {
      KEY: 'LTS',
      VALUE: 'LTS',
    },
    {
      KEY: 'NEW',
      VALUE: 'New',
    },
  ],
  PLANNEDEOL: 'Planned EOL',
  DOWNLOADGO: 'Download',
  CLICK_DOWNLOAD: 'Download',
  PUBLISH_FACTURER: 'Vendor:',
  APPROVE_ARCH: 'Architecture：',
  PLACEHOLDER: 'Version',
  TABLE_HEAD: ['Type', 'Size', 'Mirror Site', 'Integrity Check', 'Download'],
  APPROVE_MIRROR: 'Recommended',
  MORE_MIRROR: 'Other',
  ALL_MIRROR: 'View All',
  EMPTY_TIP: 'NotFound',
  // 新增 end

  ALL_DATA: 'All',
  VERSION: 'Version',
  ARCHITECTURE: 'Architecture',
  LIFE_CYCLE: 'Lifecycle',
  DOWNLOAD_BTN_NAME: 'Download',
  OUTSIDE_TITLE: 'Download',
  SCENARIO: 'Scenario',
  RELEASE_DATE: 'Release Date',
  DOWNLOAD_LINK: 'Download',
  MANUFACTURER: 'Vendor',
  WHITE_PAPER: 'White Paper',
  DOWNLOAD_CLASS: 'Images：',
  DOCS_CLASS: 'Documentation：',
  GUIDANCE_CLASS: 'Community Guides：',
  PUBLISH_DATE: 'Date of Release',
  WEBSITE_SELECT: 'Selected Mirrors',
  COPY_SUCCESSFULLY: 'copied successfully.',
  BTNSURE: 'Confirm',
  PAGINATION: ['已显示', '条记录/共', '条', '加载更多'],
  BTNRESET: 'Reset',
  COMMUNITY_LIST: data.en.COMMUNITY_LIST,
  SCENARIO_LIST: data.en.SCENARIO_LIST,
  COMMERCIAL_RELEASE_LIST: commercialReleaseData.en.COMMERCIAL_RELEASE_LIST,
  MIRROR_SELECT: {
    TITLE: 'Get ISO',
    RANK: 'Rank',
    NAME: 'Mirror Name',
    URL: 'URL',
    COUNTRY: 'Area',
    CONTINENT: 'Continent',
    DISTANCE: 'Distance(KM)',
    CONTENT: [
      'You are connecting from IP address: ',
      ', which belongs to ',
      '. We believe you are somewhere in ',
      ' and have selected the applicable mirrors.',
    ],
  },
  GET_IMAGES: 'Mirrors',
  GET_IMAGES_LINK: '/en/mirror/list/',
  GET_OPENEULER_OS1: 'Get openEuler OS',
  GET_OPENEULER_OS2: 'Get openEuler OS',
  GET_OPENEULER_OS_DOC: 'View the openEuler documentation',
  GET_OPENEULER_OS_DOC_LINK: 'https://docs.openeuler.org/en/',
  MIRROR_ALL: {
    TITLE: 'Mirrors',
    NAME: 'Site',
    LOCATION: 'Location',
    SPONSOR: 'Sponsor',
    HTTPS: 'Http(s)',
    RSNC: 'RSYNC',
    FTP: 'FTP',
    Mbs: 'NetworkBandwidth(Mb/s)',
    TIME: 'Last Sync time',
    RELEASE: 'Release',
    SIZE: 'Size',
    CONTENT: [
      'openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to',
      'contact us',
      'To synchronize openEuler images, run the following command:',
    ],
  },
};

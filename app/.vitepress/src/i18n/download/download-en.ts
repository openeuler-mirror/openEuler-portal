import data from './download';
export default {
  RELEASE_DESC: 'Release Description',
  SERVER_IMAGE: 'Server Image',
  CLOUD_IMAGE: 'Cloud Image',
  EDGE_IMAGE: 'Edeg Image',
  EMBEDDEN_IMAGE: 'Embedded Image',
  INSTALL_GUIDENCE: 'Installation Guide',
  SEEK_HELP: 'Seek Help',
  GET_ISO: 'Get Iso',
  SELECT: 'Filter',
  ALL_DATA: 'all',
  LIFE_CYCLE: 'Lifecycle',
  DOWNLOAD_BTN_NAME: 'Download',
  OUTSIDE_TITLE: 'ISO',
  MANUFACTURER: 'Manufacturer',
  WHITE_PAPER: 'White Paper',
  PUBLISH_DATE: 'Date of Release',
  WEBSITE_SELECT: 'Select Mirror',
  COPY_SUCCESSFULLY: 'copied successfully.',
  BTNSURE: 'Confirm',
  BTNRESET: 'Reset',
  DOWNLOAD_LIST: data.en.DOWNLOAD_LIST,
  MIRROR_SELECT: {
    TITLE: 'Selected Mirrors',
    RANK: 'Rank：',
    NAME: 'Mirror Name：',
    URL: 'URL：',
    COUNTRY: 'Area：',
    CONTINENT: 'Continent：',
    DISTANCE: 'Distance(KM)：',
    CONTENT: [
      'You are connecting from IP address: ',
      ', which belongs to ',
      '. We believe you are somewhere in ',
      ' and have selected the applicable mirrors.',
    ],
  },
  MIRROR_ALL: {
    TITLE: 'Mirrors',
    NAME: 'Mirror Name：',
    LOCATION: 'Location：',
    SPONSOR: 'Sponsor：',
    HTTPS: 'Http(s)：',
    RSNC: 'RSYNC：',
    FTP: 'FTP：',
    Mbs: 'NetworkBandwidth(Mb/s)：',
    TIME: 'Last Sync time：',
    CONTENT: [
      'openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to',
      'contact us',
    ],
  },
};

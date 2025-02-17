export default {
  COMPATIBILITY: 'Compatibility List',
  COMPATIBILITY_TITLE: 'Overview of OpenEuler Hardware Compatibility Testing',
  COMPATIBILITY_HARDWARE: `Hardware Compatibility Testing for openEuler Operating System (Whole System) and "Intel® Platform Advanced Technology Validation" 
  Process and Guidelines`,
  HARDWARE: 'Server',
  DRIVE: 'Card',
  CPU: 'CPU',
  SOFTWARE: 'Open Source Software',
  BUSINESS_SOFTWARE: 'Commercial Software',
  SOLUTION: 'Solution',
  AUTHENTICATION: 'Authentication Type',
  SOFTWARETYPE: 'Type',
  VIRTUAL_INFO: 'Virtualization Information',
  SERVICE_INFO: 'Server Information',
  DRIVETYPE: 'Type',
  ADAPTIVE: 'OS',
  OS: 'OS',
  ARCHITECTURE: 'Architecture',
  SELECT_PLACEHOLDER: 'Select',
  SEARCH_ALL: 'All',
  SEARCH_LABEL: 'Search',
  HARDWARE_SEARCH_PLACEHOLDER: 'Vendor, model, CPU, or OS',
  SOFTWARE_SEARCH_PLACEHOLDER: 'Software name',
  DRIVE_SEARCH_PLACEHOLDER:
    'Driver name, card model, chip vendor, or chip model',
  SOLUTION_SEARCH_PLACEHOLDER: 'Vendor, model, or OS',
  LINK: 'Link',
  BUSINESS_TESTING_ORGANIZATION: 'Test Organization',
  EMPTY_SEARCH_RESULT: 'No result found.',
  DATA_SOURCE: 'Data Source',
  VIRTUAL_LABELS: [
    'OS Version',
    'OVS Version',
    'StratoVirt Version',
    'libvirt Version',
    'QEMU Version',
  ],
  SEVICE_LABELS: [
    'Vendor',
    'RAM',
    'Product',
    'Network interface card',
    'BIOS/UEFI',
    'Driver',
    'CPU',
    'Storage drive',
    'Architecture',
    'RAID',
  ],
  HARDWARE_TABLE_COLUMN: {
    VENDOR: 'Vendor',
    MODEL: 'Model',
    OS: 'OS',
    DATE: 'Date',
    COMPATIBILITY_CONFIGURATION: 'Compatible Configuration',
    COMPATIBILITY_CONFIGURATION2: 'Configuration',
    REFERRENCE: 'Reference',
  },
  DRIVE_TABLE_COLUMN: {
    ARCHITECTURE: 'Architecture',
    DRIVE_NAME: 'Driver',
    DRIVE_OS: 'OS',
    VERSION: 'Version',
    TYPE: 'Type',
    DRIVE_DATE: 'Date',
    SHA_256_DRIVER: 'SHA 256 Driver',
    SIZE: 'Size (Bytes)',
    DRIVER_DATE: 'Driver Date',
    CHIP_VENDOR: 'Chip Vendor',
    BOARD_MODEL: 'Card Model',
    CHIP_MODEL: 'Chip Model',
  },
  BUSINESS_SOFTWARE_TABLE_COLUMN: {
    ARCHITECTURE: 'Architecture',
    SOFTWARENAME: 'Name',
    SOFTWARETYPE: 'Type',
    VERSION: 'Version',
    VENDOR: 'Vendor',
    SYSTEM: 'OS',
    SERVER_NAME: 'Hardware Model',
    TESTING_ORGANIZATION: 'Test Organization',
    CERTIFICATE: 'Certificate',
  },
  SOFTWARE_TABLE_COLUMN: {
    ARCHITECTURE: 'Architecture',
    SOFTWARETYPE: 'Type',
    SOFTWARENAME: 'Name',
    VERSION: 'Version',
    PROPERTIES: 'Attribute',
    DOWNLOADLINK: 'Download',
    SYSTEM: 'OS',
    PUBLICKLICENSE: 'License',
  },
  SOLUTION_TABLE_COLUMN: {
    SOLUTION: 'Solution',
    TYPE: 'Type',
    VENDOR: 'Vendor',
    ARCHITECTURE: 'Architecture',
    MODEL: 'Model',
    SYSTEM: 'OS',
    DATE: 'Date',
    INTRO: 'Introduction',
    LINK: 'Link',
  },
  HARDWARE_DETAIL: {
    TITLE_1: 'Product Information',
    TITLE_2: 'Configuration',
    TITLE_3: 'Adapter and Drivers',
    TIP_LABEL:
      'This configuration has been verified for compatibility. For details about different configurations, see',
    TIP_LINK: 'openEuler Compatibility Policies',
    LABELS: {
      OS: 'OS Version',
      VENDOR: 'Vendor',
      TEST_TIME: 'Date',
      COMMIT_ID: 'Commit ID',
      ARCHITECTURE: 'Architecture',
      MOTHER_BOARD_REVISION: 'Mainboard Model',
      BIOS_UEFI: 'BIOS/UEFI',
      CPU: 'CPU',
      RAM: 'RAM',
      PORTS_AND_BUS_TYPES: 'Ports and Bus Types',
      VIDEO_ADAPTER: 'Video Adapter',
      HOST_BUS_ADAPTER: 'Host Bus Adapter',
      HARD_DISK_DRIVE: 'Storage Drive',
    },
    TABLE_CULUMN: {
      DRIVE_NAME: 'Driver',
      VERSION: 'Version',
      TYPE: 'Type',
      DRIVE_DATE: 'Date',
      DRIVE_CHIP_VENDOR: 'Chip Vendor',
      DRIVE_BOARD_MODEL: 'Board Model',
      DRIVE_CHIP_MODEL: 'Chip Model',
    },
  },
  HARDWARE_OEC_DETAIL: {
    TEXT: 'openEuler provides a complete process and tools for hardware compatibility test. For details, see the',
    TITLE: 'Overall Introduction to the openEuler Hardware Compatibility Test',
    DISCRIPTION_TITLE: 'Introduction',
    DISCRIPTION_CONTENT:
      'openEuler provides a series of tools, documents, and operation procedures to help you test the compatibility between openEuler and hardware. If you need to perform compatibility tests on hardware such as servers, perform the following process:',
    PROCESS_TITLE: 'Compatibility Test Process',
    ITEM_ARR: [
      {
        ID: '01',
        TITLE: 'Apply to join the openEuler community (0.5 days).',
        DESCRIPTION_1:
          'You need to apply to join the openEuler community on the Gitee platform to become a member of the organization. Application address:',
        A_TEXT:
          'https://gitee.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ-en.md',
        DESCRIPTION_2: '.',
      },
      {
        ID: '02',
        TITLE: 'Apply for a compatibility test (0.5 days).',
        DESCRIPTION_1:
          'Send a compatibility test application to the public mailbox (',
        A_TEXT: 'oecompatibility@openeuler.org',
        DESCRIPTION_2:
          '). The email subject must contain "Apply for a Hardware Compatibility Test". After receiving the email, the SIG will contact you and sign an agreement with you.',
        DESCRIPTION_3: 'Before submit an application, sign the CLA first:',
        A_TEXT2:
          'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
      },
      {
        ID: '03',
        TITLE: 'Understand the compatibility policies. (0.5 days)',
        DESCRIPTION_1:
          'Before performing the compatibility test, understand the openEuler hardware compatibility policies.',
        A_TEXT: 'Click here to obtain the document.',
        A_HREF:
          '/category/support/compatibility/openEuler-compatibility-en.pdf',
        DOWNLOAD_NAME: 'openEuler Compatibility Policies.pdf',
      },
      {
        ID: '04',
        TITLE: 'Create an issue (0.5 days).',
        DESCRIPTION_1:
          'After signing the agreement, create an issue under the oec-hardware project (',
        A_TEXT: 'https://gitee.com/openeuler/oec-hardware',
        DESCRIPTION_2:
          ') in the openEuler community and specify the hardware information in the issue. The SIG will give feedback on the issue in a timely manner.',
      },
      {
        ID: '05',
        TITLE: 'Perform the compatibility test (10 days).',
        DESCRIPTION_1:
          'After the issue is created, perform the compatibility test. openEuler provides the compatibility test framework and user guide to help you complete the test.',
        A_TEXT: 'Click here to obtain oec-hardware.',
        A_TEXT_2: 'Click here to obtain the user guide.',
        DESCRIPTION_2: '.',
        A_HREF: 'https://gitee.com/src-openeuler/oec-hardware/releases',
        A_HREF_2: 'https://gitee.com/openeuler/oec-hardware',
        DOWNLOAD_NAME: 'oec-hardware User Guide',
      },
      {
        ID: '06',
        TITLE: 'Submit the result for review (2 days).',
        DESCRIPTION_1:
          'After the compatibility test is completed and passed, update the test result to the issue. Send the test result to the public mailbox as instructed by the user guide. Send the application for reviewing the compatibility result to',
        A_TEXT2: '',
        DESCRIPTION_3: '',
        A_TEXT: 'oecompatibility@openeuler.org',
        DESCRIPTION_2:
          '. The email subject must contain "xxx Hardware Compatibility Test Result", where xxx indicates the community issue ID.',
      },
      {
        ID: '07',
        TITLE: 'Release the result (2 days).',
        DESCRIPTION_1:
          'The SIG will review the submitted result and add the hardware to the',
        A_TEXT: 'Compatibility List',
        DESCRIPTION_2: 'after it is approved.',
      },
    ],
  },
  SOFTWARE_OEC_DETAIL: {
    TEXT: 'openEuler provides a complete process and tools for software compatibility test. For details, see the',
    TITLE:
      'Overall Introduction to the openEuler Compatibility Technical Assessment',
    DISCRIPTION_TITLE: 'Introduction',
    DISCRIPTION_CONTENT:
      'openEuler provides a series of tools, documents, and operation procedures to help you test the compatibility between openEuler and software. If you need to perform compatibility tests on software, perform the following process:',
    PROCESS_TITLE: 'Compatibility Test Process',
    ITEM_ARR: [
      {
        ID: '01',
        TITLE: 'Create an issue.',
        DESCRIPTION_1: 'Create an issue under the oec-application project (',
        A_TEXT: 'https://gitee.com/openeuler/oec-application',
        DESCRIPTION_2:
          ') in the openEuler community and specify the software information in the issue. The SIG will give feedback on the issue in a timely manner.',
      },
      {
        ID: '02',
        TITLE: 'Perform the compatibility test.',
        DESCRIPTION_1:
          'After the issue is created, perform the compatibility test. openEuler provides the',
        A_TEXT: 'Compass-CI',
        A_HREF: 'https://gitee.com/openeuler/compass-ci',
        DESCRIPTION_2:
          'automated testing platform and user guide to help you complete the test.',
      },
      {
        ID: '03',
        TITLE: 'Submit the result for review.',
        DESCRIPTION_1:
          'After the compatibility test is completed and passed, update the test result to the issue. Include group_id in the issue.',
      },
      {
        ID: '04',
        TITLE: 'Release the result.',
        DESCRIPTION_1:
          'The SIG will review the submitted result and add the software to the',
        A_TEXT: 'Compatibility List',
        DESCRIPTION_2: 'after it is approved.',
      },
    ],
  },
  BUSINESS_SOFTWARE_OEC_DETAIL: {
    TEXT: 'openEuler provides a complete process and tools for commercial software compatibility test. For details, see the',
    TITLE: 'Overall Introduction to the openEuler Software Compatibility Test',
    DISCRIPTION_TITLE: 'Introduction',
    DISCRIPTION_CONTENT:
      'openEuler provides a series of tools, documents, and operation procedures to help you assess the software compatibility. If you need to assess the compatibility of software, see the following document.',
    PROCESS_TITLE: 'Compatibility Technical Assessment Process',
    TEXT_2:
      'The software compatibility data of commercial OSs is provided by the OS vendors. The openEuler community only displays the data. For details, contact the OS vendors.',
  },
};

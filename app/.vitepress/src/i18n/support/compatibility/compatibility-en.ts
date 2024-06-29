export default {
  COMPATIBILITY: 'Compatibility List',
  HARDWARE: 'Server',
  DRIVE: 'Card',
  SOFTWARE: '开源软件',
  BUSINESS_SOFTWARE: '商业软件',
  SOFTWARETYPE: '软件类型',
  // DRIVETYPE: '板卡类型',
  DRIVETYPE: 'Type',
  ADAPTIVE: '操作系统',
  CPU: 'CPU',
  OS: 'OS',
  ARCHITECTURE: 'Architecture',
  SELECT_PLACEHOLDER: 'Select',
  SEARCH_ALL: 'ALL',
  SEARCH_LABEL: 'Search',
  HARDWARE_SEARCH_PLACEHOLDER: 'Vendor, CPU, Model or OS',
  SOFTWARE_SEARCH_PLACEHOLDER: '软件名称',
  DRIVE_SEARCH_PLACEHOLDER: 'Driver Name, Card Model, or Chip Vendor',
  LINK: 'link',
  BUSINESS_TESTING_ORGANIZATION: '测试机构',
  EMPTY_SEARCH_RESULT: 'No Data',
  HARDWARE_TABLE_COLUMN: {
    VENDOR: 'Vendor',
    MODEL: 'Model',
    OS: 'OS',
    DATE: 'Date',
    COMPATIBILITY_CONFIGURATION: 'Compatibility Configuration',
    COMPATIBILITY_CONFIGURATION2: 'Compatibility Configuration',
    REFERRENCE: 'Reference',
  },
  DRIVE_TABLE_COLUMN: {
    ARCHITECTURE: 'Architecture',
    DRIVE_NAME: 'Driver Name',
    DRIVE_OS: 'OS',
    VERSION: 'Version',
    TYPE: 'Type',
    DRIVE_DATE: 'Date',
    SHA_256_DRIVER: 'SHA 256 Driver',
    SIZE: 'Size (Byte)',
    DRIVER_DATE: 'Driver Date',
    CHIP_VENDOR: 'Chip Vendor',
    BOARD_MODEL: 'Plug-in Card Model',
    CHIP_MODEL: 'Chip Model',
  },
  BUSINESS_SOFTWARE_TABLE_COLUMN: {
    ARCHITECTURE: 'Architecture',
    SOFTWARENAME: '软件名称',
    VERSION: 'Version',
    VENDOR: '厂家名称',
    SYSTEM: 'OS',
    SERVER_NAME: '服务器型号',
    TESTING_ORGANIZATION: '测试机构',
    CERTIFICATE: '证书',
  },
  SOFTWARE_TABLE_COLUMN: {
    ARCHITECTURE: 'Architecture',
    SOFTWARETYPE: '软件类型',
    SOFTWARENAME: '软件名称',
    VERSION: 'Version',
    PROPERTIES: '软件属性',
    DOWNLOADLINK: '下载地址',
    SYSTEM: 'OS',
    PUBLICKLICENSE: '开源协议',
  },
  HARDWARE_DETAIL: {
    TITLE_1: 'Product Information',
    TITLE_2: 'Configuration',
    TITLE_3: 'Adapter and Drivers',
    TIP_LABEL:
      'This configuration is used during the compatibility test. For details about the configuration differences and the compatibility, see the ',
    TIP_LINK: 'openEuler Compatibility Policy',
    LABELS: {
      OS: 'OS/OS Version',
      VENDOR: 'Vendor',
      TEST_TIME: 'Test Time',
      COMMIT_ID: 'Commit ID',
      ARCHITECTURE: 'Architecture',
      MOTHER_BOARD_REVISION: 'Mainboard Model',
      BIOS_UEFI: 'BIOS/UEFI',
      CPU: 'CPU',
      RAM: 'RAM',
      PORTS_AND_BUS_TYPES: 'Ports and Bus Types',
      VIDEO_ADAPTER: 'Video Adapter',
      HOST_BUS_ADAPTER: 'Host Bus Adapter',
      HARD_DISK_DRIVE: 'Hard Disk Drive',
    },
    TABLE_CULUMN: {
      DRIVE_NAME: 'Driver Name',
      VERSION: 'Version',
      TYPE: 'Type',
      DRIVE_DATE: 'Date',
      DRIVE_CHIP_VENDOR: 'Chip Vendor',
      DRIVE_BOARD_MODEL: 'Board Model',
      DRIVE_CHIP_MODEL: 'Chip Model',
    },
  },
  HARDWARE_OEC_DETAIL: {
    TEXT: 'openEuler provides a complete process and tools for hardware compatibility test. For details, see the ',
    TITLE: 'Overall Introduction to the openEuler Hardware Compatibility Test',
    DISCRIPTION_TITLE: 'Introduction',
    DISCRIPTION_CONTENT:
      'openEuler provides a series of tools, documents and operation procedures to help you test the compatibility between openEuler and hardware. If you need to perform compatibility tests on hardware such as servers, perform the following process:',
    PROCESS_TITLE: 'Compatibility Test Process',
    ITEM_ARR: [
      {
        ID: '01',
        TITLE: 'Apply to join the openEuler community (0.5 days).',
        DESCRIPTION_1:
          'You need to apply to join the openEuler community on the Gitee platform to become a member of the organization. Application address:',
        A_TEXT:
          'https://gitee.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ.md',
        DESCRIPTION_2: '。',
      },
      {
        ID: '02',
        TITLE: 'Apply for a compatibility test.',
        DESCRIPTION_1:
          'Send a compatibility test application to the public mailbox (',
        A_TEXT: 'oecompatibility@openeuler.org',
        DESCRIPTION_2:
          '). The email subject must contain "Apply for a Hardware Compatibility Test". After receiving the email, the sig team of openEuler will contact you and sign an agreement with you offline.',
        // DESCRIPTION_3: 'tips：如果没有签署CLA，请先签署：',
        // A_TEXT2: 'https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340',
      },
      {
        ID: '03',
        TITLE: 'Learn about the compatibility test policies.',
        DESCRIPTION_1:
          'Before performing the compatibility test, learn about the openEuler hardware compatibility policies.',
        A_TEXT: 'Click here to obtain the document.',
        A_HREF: '/category/support/compatibility/openEuler-compatibility-en.pdf',
        DOWNLOAD_NAME: 'openEuler Compatibility Policies.pdf',
      },
      {
        ID: '04',
        TITLE: 'Create an issue (0.5 days).',
        DESCRIPTION_1:
          'After signing the agreement, create an issue under the oec-hardware project in the openEuler community (',
        A_TEXT: 'https://gitee.com/openeuler/oec-hardware',
        DESCRIPTION_2:
          ') and specify the hardware information in the issue. The openEuler team will give feedback on the issue in a timely manner.',
      },
      {
        ID: '05',
        TITLE: 'Perform the compatibility test (10 days).',
        DESCRIPTION_1:
          'After the issue is created, you can perform the compatibility test. The openEuler team provides the compatibility test framework and user guide that help you complete the test.',
        A_TEXT_2: 'Click here to obtain the user guide.',
        A_HREF: 'https://gitee.com/src-openeuler/oec-hardware/releases',
        // A_HREF_2:
        //   '/category/support/compatibility/openEuler硬件兼容性测试工具使用指南.pdf',
        // DOWNLOAD_NAME: 'openEuler硬件兼容性测试工具使用指南.pdf',
      },
      {
        ID: '06',
        TITLE: 'Submit the result for review (2 days).',
        DESCRIPTION_1:
          'After the compatibility test is completed and passed, update the test result to the issue. Send the test result to the public mailbox as instructed by the user guide. Send the application for reviewing the compatibility result to ',
        A_TEXT2: '',
        DESCRIPTION_3: '',
        A_TEXT: 'oecompatibility@openeuler.org.',
        DESCRIPTION_2:
          ' The email subject must contain "xxx Hardware Compatibility Test Result", where xxx indicates the community issue ID.',
      },
      {
        ID: '07',
        TITLE: 'Release the result (2 days).',
        DESCRIPTION_1:
          'The openEuler team will review the submitted result and add the hardware to the ',
        A_TEXT: 'Compatibility List',
        DESCRIPTION_2: ' after it is approved.',
      },
    ],
  },
  SOFTWARE_OEC_DETAIL: {
    TEXT: '关于软件兼容性测试，openEuler提供了完整的测试流程和工具，详见',
    TITLE: 'openEuler 软件兼容性测试整体介绍',
    DISCRIPTION_TITLE: '简介',
    DISCRIPTION_CONTENT:
      'openEuler提供了一系列的工具、文档和操作流程帮助用户测试openEuler与软件的兼容性。如果您需要对某款软件展开兼容性测试，可参考下文进行。',
    PROCESS_TITLE: '兼容性测试流程',
    ITEM_ARR: [
      {
        ID: '01',
        TITLE: '创建issue.',
        DESCRIPTION_1: '您需要在openEuler社区（',
        A_TEXT: 'https://gitee.com/openeuler/oec-application',
        DESCRIPTION_2:
          '）的oec-application项目下创建issue，将所需认证的软件信息在issue中明确。openEuler团队会及时了解issue信息，并给出建议。',
      },
      {
        ID: '02',
        TITLE: '兼容性测试',
        DESCRIPTION_1:
          '完成issue创建后，即可开展兼容性测试。openEuler团队提供了',
        A_TEXT: '自动化测试平台 compass-ci',
        A_HREF: 'https://gitee.com/openeuler/compass-ci',
        DESCRIPTION_2: '以及使用指南，根据使用指南自助完成兼容性测试。',
      },
      {
        ID: '03',
        TITLE: '提交结果审核',
        DESCRIPTION_1:
          '完成兼容性测试并通过后，需要您把测试结果更新到issue中。issue中需要给出 group_id。',
      },
      {
        ID: '04',
        TITLE: '结果发布',
        DESCRIPTION_1:
          'openEuler团队会针对提交结果进行审核，如果通过，会将软件添加到',
        A_TEXT: '兼容性列表',
        DESCRIPTION_2: '中。',
      },
    ],
  },
  BUSINESS_SOFTWARE_OEC_DETAIL: {
    TEXT: '关于商业软件兼容性技术测评，openEuler提供了完整的测试流程和工具，详见',
    TITLE: 'openEuler兼容性技术测评整体介绍',
    DISCRIPTION_TITLE: '简介',
    DISCRIPTION_CONTENT:
      'openEuler提供了一系列的工具、文档和操作流程帮助用户进行软件的兼容性技术测评。如果您需要对某款软件展开兼容性测评，可参考下文进行。',
    PROCESS_TITLE: '兼容性技术测评流程',
  },
};

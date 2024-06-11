export default {
  zh: {
    instruction: {
      title: '说明',
      text_1: '您可以通过',
      link_text: '欧拉小智',
      link: 'https://qa-robot.openeuler.org/',
      text_2:
        '获取更多FAQ，此处仅列出部分供参考。如果没有相关问题，您可在欧拉小智中输入“提问”反馈问题。',
    },
    chats: [
      {
        question: 'Q：如何获取原地升级的教程或者文档？',
        answers: [
          {
            text: 'A：我们提供了视频或文档，方便您学习。请参见',
            isLink: false,
            link: '',
          },
          {
            text: 'x2openEuler工具使用视频',
            isLink: true,
            link: 'https://www.bilibili.com/video/BV1TR4y1o7cX/?is_story_h5=false&p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=2d0cb5be-8f2d-4271-b749-5f37452ec983&share_source=COPY&share_tag=s_i&timestamp=1665209080&unique_k=622RHPA',
          },
          {
            text: '，获取教程；请参见',
            isLink: false,
            link: '',
          },
          {
            text: 'x2openEuler用户指南',
            isLink: true,
            link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },
          {
            text: '，获取官方指导文档。',
            isLink: false,
            link: '',
          },
        ],
      },
      {
        question: 'Q：x2openEuler是否支持虚拟机升级？',
        answers: [
          {
            text: 'A：x2openEuler支持虚拟机升级，同时也支持物理机升级。',
            isLink: false,
            link: '',
          },
        ],
      },
      {
        question: 'Q：x2openEuler支持哪些操作系统原地升级？',
        answers: [
          {
            text: 'A：我们将逐步支持更多的OS，具体支持的OS请参考',
            isLink: false,
            link: '',
          },
          {
            text: 'x2openEuler用户指南。',
            isLink: true,
            link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },
        ],
      },
      {
        question: 'Q：如何处理升级过程中出现的异常？',
        answers: [
          {
            text: 'A：升级过程中若出现异常，可先在',
            isLink: false,
            link: '',
          },
          {
            text: 'x2openEuler用户指南',
            isLink: true,
            link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },
          {
            text: '的FAQ中进行查找；如果没有同类问题，可在社区提',
            isLink: false,
            link: '',
          },
          {
            text: 'issue',
            isLink: true,
            link: 'https://gitee.com/openeuler/oec-application/issues',
          },
          {
            text: '来跟踪解决。',
            isLink: false,
            link: '',
          },
        ],
      },
      {
        question: 'Q：原地升级迁移过程中出现异常导致迁移失败，是否支持回滚？',
        answers: [
          {
            text: 'A：原地升级迁移过程中出现异常导致迁移失败时，支持回滚。x2openEuler的备份回滚操作，请参考',
            isLink: false,
            link: '',
          },
          {
            text: 'x2openEuler用户指南。',
            isLink: true,
            link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },
        ],
      },
      {
        question:
          'Q：openEuler 如何和硬件厂商的兼容性测试？兼容性测试是否需要额外的费用？',
        answers: [
          {
            text: '可参考',
            isLink: false,
            link: '',
          },
          {
            text: 'openEuler硬件兼容性测试整体介绍',
            isLink: true,
            link: 'https://www.openeuler.org/zh/compatibility/hardware/',
          },
          {
            text: '，加入openEuler社区兼容性SIG组，或openEuler创新中心，可进行兼容性测试。兼容性测试不需要额外支付费用。目前openEuler社区硬件兼容性测试已与创新中心对接，用户可以通过社区的',
            isLink: false,
            link: '',
          },
          {
            text: '兼容性测评平台',
            isLink: true,
            link: 'https://gitee.com/openeuler/technical-certification',
          },
          {
            text: '进行认证，并获取认证证书，同时会同步发布',
            isLink: false,
            link: '',
          },
          {
            text: '社区兼容性列表。',
            isLink: true,
            link: 'https://www.openeuler.org/zh/compatibility/',
          },
        ],
      },
    ],
  },
  en: {
    instruction: {
      title: 'Note',
      text_1: 'If you have any issues or requirements, submit them through ',
      link_text: 'QuickIssue',
      link: 'https://quickissue.openeuler.org/en/issues/',
      text_2: '.',
    },
    chats: [
      {
        question:
          'Q: Where can I find tutorials or documents for in-place upgrade?',

        answers: [
          {
            text: 'A: We offer learning materials in the form of documents.',

            isLink: false,

            link: '',
          },

          {
            text: ' Refer to the',

            isLink: false,

            link: '',
          },

          {
            text: 'x2openEuler User Guide',

            isLink: true,

            link: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },

          {
            text: ' for details.',

            isLink: false,

            link: '',
          },
        ],
      },

      {
        question: 'Q: Does x2openEuler support VM upgrade?',

        answers: [
          {
            text: 'A: Yes, x2openEuler supports upgrades for both VMs and physical machines.',

            isLink: false,

            link: '',
          },
        ],
      },

      {
        question:
          'Q: Which OSs are supported by x2openEuler in-place upgrades?',

        answers: [
          {
            text: 'A: For details, see the',

            isLink: false,

            link: '',
          },

          {
            text: 'x2openEuler User Guide.',

            isLink: true,

            link: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },
        ],
      },

      {
        question:
          'Q: How do I handle exceptions that occur during the upgrade?',

        answers: [
          {
            text: 'A: Exceptions can occur during in-place upgrades. For specific troubleshooting operations, refer to FAQs in the',

            isLink: false,

            link: '',
          },

          {
            text: 'x2openEuler User Guide',

            isLink: true,

            link: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },

          {
            text: '. If there are no details related to your system, you can submit an issue through',

            isLink: false,

            link: '',
          },

          {
            text: 'QuickIssue',

            isLink: true,

            link: 'https://quickissue.openeuler.org/en/new-issues/',
          },

          {
            text: ' to ask for support and track the resolution.',

            isLink: false,

            link: '',
          },
        ],
      },

      {
        question:
          'Q: Can I roll back the migration if an exception causes an upgrade operation to fail?',

        answers: [
          {
            text: 'A: Yes, you can roll back the migration using x2openEuler. For details, see the',
            isLink: false,
            link: '',
          },
          {
            text: 'x2openEuler User Guide.',

            isLink: true,

            link: 'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html',
          },
        ],
      },

      {
        question:
          'Q: How does openEuler do compatibility tests with hardware vendors? Do compatibility tests incur additional charges?',

        answers: [
          {
            text: 'A: These tests are free for community members. Details can be found in the',

            isLink: false,

            link: '',
          },

          {
            text: 'Overall Introduction to the openEuler Hardware Compatibility Test',

            isLink: true,

            link: 'https://www.openeuler.org/en/compatibility/hardware/',
          },

          {
            text: ', and you can also join the compatibility SIG or the openEuler innovation center.',

            isLink: false,

            link: '',
          },

          {
            text: ' For further details, see the',

            isLink: false,

            link: '',
          },

          {
            text: 'Compatibility List.',

            isLink: true,

            link: 'https://www.openeuler.org/en/compatibility/',
          },
        ],
      },
    ],
  },
};

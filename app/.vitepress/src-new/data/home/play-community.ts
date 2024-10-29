import card1 from '~@/assets/category/home/play-community/card-1.png';
import card2 from '~@/assets/category/home/play-community/card-2.png';
export const vitalityData = [
  {
    vitalityValue: 0,
    vitalityKey: 'contributors',
    vitalityLabel: {
      zh: '贡献者',
      en: 'Contributors',
    },
  },
  {
    vitalityValue: 0,
    vitalityKey: 'repos',
    vitalityLabel: {
      zh: '代码仓库',
      en: 'Repositories',
    },
  },
  {
    vitalityValue: 0,
    vitalityKey: 'sigs',
    vitalityLabel: {
      zh: '特别兴趣小组',
      en: 'SIGs',
    },
  },
  {
    vitalityValue: 0,
    vitalityKey: 'users',
    vitalityLabel: {
      zh: '社区用户',
      en: 'Users',
    },
  },
  {
    vitalityValue: 0,
    vitalityKey: 'businessosv',
    vitalityLabel: {
      zh: '商用OSV',
      en: 'OS Vendors',
    },
  },
];

export const playCommunity = {
  zh: [
    {
      title: '成为社区贡献者',
      bg: card1,
      intro:
        'openEuler 欢迎大家以各种形式参与社区贡献，包括但不限于提交issue、参与讨论、代码贡献、文档捉虫等。一起加入openEuler参与贡献吧',
      btn: {
        label: '贡献攻略',
        link: '/zh/community/contribution/detail.html',
      },
      textBtn: {
        label: '进入SIG中心',
        link: '/zh/sig/sig-list/',
      },
    },
    {
      title: '成为项目群捐赠人',
      bg: card2,
      intro:
        'openEuler项目群，是由开放原子开源基金会孵化及运营的开源项目群。欢迎各企业参与共建，成为项目群成员。资金捐赠请联系 liyang@openatom.org',
      btn: {
        label: '成员单位',
        link: '/zh/community/member/',
      },
      textBtn: {
        label: '查看捐赠权益',
        link: '', //TODO:''
      },
    },
  ],
};

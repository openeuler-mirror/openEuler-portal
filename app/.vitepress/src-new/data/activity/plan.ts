import apply from '~@/assets/category/event/overview/apply.png';
import appapplicationReviewly from '~@/assets/category/event/overview/application-review.png';
import hold from '~@/assets/category/event/overview/hold.png';
import material1 from '~@/assets/category/event/overview/material1.jpg';
import material2 from '~@/assets/category/event/overview/material2.jpg';

import applyDark from '~@/assets/category/event/overview/apply-dark.png';
import appapplicationReviewlyDark from '~@/assets/category/event/overview/application-review-dark.png';
import holdDark from '~@/assets/category/event/overview/hold-dark.png';

import IconOpensource from '~icons/event/icon-opensource.svg';
import IconDeveloper from '~icons/event/icon-developer.svg';
import IconCollege from '~icons/event/icon-college.svg';
import IconRelease from '~icons/event/icon-release.svg';

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const yearPlanData = {
  zh: {
    opensource: {
      title: '国际开源会议',
      id: 'opensource',
      icon: IconOpensource,
      desc: '对开源会议有任何疑问或建议，请联系：',
      email: 'marketing@openeuler.org',
      events: [
        { month: '1' },
        {
          month: '2' },
        { 
          month: '3',
          actives: [
            {
              location: '泰国 曼谷',
              activeName: 'FOSSASIA Summit 2026',
              href: '',
            },
          ],
        },
        { 
          month: '4',
        },
        {
          month: '5',
          actives: [
            {
              location: 'TBD',
              activeName: 'Linaro Connect 2025',
            },
          ],
        },
        {
          month: '6',
          actives: [
            {
              location: 'TBD',
              activeName: '开放原子开源生态大会2026',
            },
          ],
        },
        {
          month: '7',
          actives: [
            {
              location: '中国 香港',
              activeName: '2026亚洲香港科技及信息技术展',
            },
          ],
        },
        { month: '8' },
        { 
          month: '9',
          actives: [
            {
              location: '中国 上海',
              activeName: 'KubeCON + CloudNativeCon China',
            },
            {
              location: '新加坡',
              activeName: 'Data Centre World Asia',
            },
          ],
        },
        { 
          month: '10',
          actives: [
            {
              location: '捷克 布拉格',
              activeName: 'Open Source Summit Europe 2026',
            },
          ],
        },
        {
          month: '11',
          actives: [
            {
              location: 'TBD',
              activeName: '操作系统大会 & openEuler Summit 2026',
            },
          ],
        },
        {
          month: '12',
          actives: [
            {
              location: 'TBD',
              activeName: 'GITEX Global',
            },
            {
              location: 'TBD',
              activeName: '开放原子开源开发者大会 2026',
            },
          ],
        },
      ],
    },
    ecology: {
      title: '生态技术会议',
      id: 'ecology',
      icon: IconOpensource,
      events: [
        { month: '1' },
        { month: '2' },
        {
          month: '3',
          actives: [
            {
              location: '中国 北京',
              activeName: 'KCD Beijing 2026',
            },
          ],
        },
        { 
          month: '4',
          actives: [
            {
              location: '中国 长沙',
              activeName: 'openEuler Developer Day 2026',
            },
          ],
        },
        { month: '5' },
        { month: '6' },
        { month: '7' },
        { month: '8' },
        { month: '9' },
        {
          month: '10',
          actives: [
            {
              location: '中国 深圳',
              activeName: 'GOSIM China 2026',
            }
          ],
        },
        { 
          month: '11',
          actives: [
            {
              location: 'TBD',
              activeName: 'CLK 2026',
            },
          ],
        },
        { month: '12' },
      ],
    },
    developer: {
      title: 'Call for X 开发者活动',
      id: 'developer',
      icon: IconDeveloper,
      desc: '如果您想组织社区活动，参与议题分享，请联系：',
      email: 'events@openeuler.sh',
      events: [
        { 
          month: '1',
          actives: [
            {
              location: 'Online',
              activeName: '灵衢互联工作会议Online',
            },
          ],
        },
        { month: '2' },
        { month: '3' },
        { 
          month: '4',
          actives: [
            {
              location: '中国 成都',
              activeName: 'openEuler SIG-Sbom Meetup',
            },
            {
              location: '中国 青岛',
              activeName: 'openEuler 云原生 Meetup',
            },
            {
              location: '新加坡',
              activeName: 'Free and Open Source Singapore & openEuler Meetup',
            },
          ],
        },
        { month: '5' },
        { month: '6' },
        { month: '7' },
        { month: '8' },
        { month: '9' },
        { month: '10' },
        { month: '11' },
        { month: '12' },
      ],
    },
    college: {
      title: '赛事 & 高校',
      id: 'college',
      icon: IconCollege,
      actives: [
        {
          activeName: '全年 开源实习',
          startTime: 1,
          duration: 12,
          activelink: '/zh/internship/',
        },
        {
          activeName: '全年 开放原子校源行',
          startTime: 1,
          duration: 12,
          activelink: 'https://xiaoyuanxing.openatom.cn/#/dashboard',
        },
        {
          activeName: '4月 - 11月 第六届开源之夏',
          activelink: 'https://summer-ospp.ac.cn/',
          startTime: 4,
          duration: 8,
        },
        {
          activeName: '8月 - 10月 2026年度Hackthon软件难题挑战赛',
          startTime: 8,
          duration: 3,
        },
      ],
    },
    release: {
      title: '版本发布计划',
      id: 'release',
      icon: IconRelease,
      events: [
        { month: '1' },
        { month: '2' },
        { month: '3' },
        { month: '4' },
        { month: '5' },
        { 
          month: '6',
          actives: [
            {
              location: '6.30',
              activeName: '24.03 LTS SP4',
            },
          ], 
        },
        { month: '7' },
        { month: '8' },
        {
          month: '9',
          actives: [
            {
              location: '9.30',
              activeName: '26.09',
            },
          ],
        },
        { month: '10' },
        { month: '11' },
        { 
          month: '12',
          actives: [
            {
              location: '12.30',
              activeName: '24.03 LTS SP5',
            },
          ], 
        },
      ],
    },
  },
  en: {
    opensource: {
      title: 'Open Source Summits',
      id: 'opensource',
      icon: IconOpensource,
      events: [
        { month: '1' },
        { month: '2' },
        { 
          month: '3',
          actives: [
            {
              location: 'Bangkok, Thailand',
              activeName: 'FOSSASIA Summit 2026',
            },
          ],
        },
        { month: '4' },
        {
          month: '5',
          actives: [
            {
              location: 'TBD',
              activeName: 'Linaro Connect 2025',
            },
          ],
        },
        {
          month: '6',
          actives: [
            {
              location: 'TBD',
              activeName: '2026 OpenAtom open source ECO-Conference',
            },
          ],
        },
        { 
          month: '7',
          actives: [
            {
              location: 'Hong Kong, China',
              activeName: 'LEAP EAST 2026',
            },
          ],
        },
        { month: '8' },
        {
          month: '9',
          actives: [
            {
              location: 'Shanghai, China',
              activeName: 'KubeCON + CloudNativeCon China',
            },
            {
              location: 'Singapore',
              activeName: 'Data Centre World Asia',
            },
          ],
        },
        { 
          month: '10',
          actives: [
            {
              location: 'Prague, Czech Republic',
              activeName: 'Open Source Summit Europe 2026',
            },
          ],
        },
        {
          month: '11',
          actives: [
            {
              location: 'TBD',
              activeName: 'Operating System Conference &openEuler Summit 2026',
            },
          ],
        },
        {
          month: '12',
          actives: [
            {
              location: 'TBD',
              activeName: 'GITEX Global',
            },
            {
              location: 'TBD',
              activeName: 'The 2026 OpenAtom Developer Conference',
            },
          ],
        },
      ],
    },
    ecology: {
      title: 'Ecosystem Tech Conferences',
      id: 'ecology',
      icon: IconOpensource,
      events: [
        { month: '1' },
        { month: '2' },
        {
          month: '3',
          actives: [
            {
              location: 'Beijing, China',
              activeName: 'KCD Beijing 2026',
            },
          ],
        },
        { 
          month: '4',
          actives: [
            {
              location: 'Changsha, China',
              activeName: 'openEuler Developer Day 2026',
            },
          ],
        },
        { month: '5' },
        { month: '6' },
        { month: '7' },
        { month: '8' },
        { month: '9' },
        {
          month: '10',
          actives: [
            {
              location: 'Shenzhen,China',
              activeName: 'GOSIM China 2026',
            }
          ],
        },
        { 
          month: '11',
          actives: [
            {
              location: 'TBD',
              activeName: 'CLK 2026',
            },
          ],
        },
        { month: '12' },
      ],
    },
  },
};

export const applyData = {
  zh: [
    {
      img: apply,
      imgDark: applyDark,
      title: '如何申请',
      desc: '如果您有兴趣在所在城市举办 openEuler Meetup，为了保证活动顺利进行，在举办社区开发者活动前，您需要',
      href: '/zh/interaction/event-list/meetup-form/',
      btn: '申请活动',
    },
    {
      img: appapplicationReviewly,
      imgDark: appapplicationReviewlyDark,
      title: '申办审核',
      emailtext1:
        '如果您的申请符合上述申办要求，我们会在 5 个工作日内审核并通过电子邮件',
      emailtext2:
        '与您联系，以便提供 openEuler Meetup 赋能支持并与 openEuler 社区冠名联合主办单位；即便申请不合适，我们仍会通过电子邮件通知您，请确保申办表信息无误',
      email: 'events@openeuler.sh',
    },
    {
      material1: material1,
      material2: material2,
      title: '我们可以获得哪些赋能支持？',
      desc: '审核通过后，您将获得：',
      list: [
        {
          title: '《openEuler社区介绍》',
          href: '/whitepaper/openEuler%20开源社区介绍.pdf',
        },
        {
          title: '品牌物料包',
          text: '易拉宝/海报/KV等设计源文件',
        },
        {
          title: '社媒矩阵传播',
          text: '官网/公众号/B站/社群同步宣传',
        },
        {
          title: '直播资源',
          text: '可选openEuler官方直播间资源',
        },
        {
          title: '社区限定周边',
          text: '按实际参与人数配发，上限100份',
        },
      ],
    },
    {
      img: hold,
      imgDark: holdDark,
      title: '活动举办',
      desc: '联合主办方的组织者需主导活动策划与执行，使用社区统一品牌规范和隐私声明，保证活动的顺利进行',
    },
    {
      title: '活动成果反馈',
      emailtext1:
        '可以更好地了解活动的情况和效果，不断提升 openEuler Meetup 活动的质量和影响力，联合主办方的组织者在活动结束后 3 个工作日内需向社区邮箱',
      emailtext2: '提供活动总结资料',
      email: 'events@openeuler.sh',
    },
  ],
  en: [],
};

import beijing from '~@/assets/category/event/list/beijing.jpg';
import beijingMb from '~@/assets/category/event/list/beijing-mb.jpg';
import beijingDetail from '~@/assets/category/event/list/beijing-detail.jpg';

import tianjin from '~@/assets/category/event/list/tianjin.jpg';
import tianjinMb from '~@/assets/category/event/list/tianjin-mb.jpg';
import detail_250524 from '~@/assets/category/event/list/250524.jpg';
import chengdu from '~@/assets/category/event/list/chengdu.jpg';
import chengduMb from '~@/assets/category/event/list/chengdu-mb.jpg';
import detail_250527 from '~@/assets/category/event/list/250527.jpg';

export const EventSeries = new Map([
  [
    'all',
    {
      value: '',
      label: {
        zh: '全部',
        en: 'All',
      },
    },
  ],
  [
    '1',
    {
      value: '1',
      label: {
        zh: '国际开源会议',
        en: 'Open Source Summits',
      },
    },
  ],
  [
    '2',
    {
      value: '2',
      label: {
        zh: '生态技术会议',
        en: 'Ecosystem Tech Conferences',
      },
    },
  ],
  [
    '3',
    {
      value: '3',
      label: {
        zh: 'Call for X 开发者活动',
        en: 'Call for X 开发者活动',
      },
    },
  ],
  [
    '4',
    {
      value: '4',
      label: {
        zh: '赛事 & 高校',
        en: '赛事 & 高校',
      },
    },
  ],
  [
    '5',
    {
      value: '5',
      label: {
        zh: '版本发布计划',
        en: 'Release Plan',
      },
    },
  ],
  [
    '6',
    {
      value: '6',
      label: {
        zh: '其他',
        en: 'Other',
      },
    },
  ],
]);

export const EventState = new Map([
  [
    0,
    {
      value: 0,
      label: {
        zh: '全部',
        en: 'All',
      },
    },
  ],
  [
    2,
    {
      value: 2,
      label: {
        zh: '进行中',
        en: 'Ongoing',
      },
    },
  ],
  [
    1,
    {
      value: 1,
      label: {
        zh: '已结束',
        en: 'Completed',
      },
    },
  ],
]);

export const MEETUP_DATA = {
  zh: [
    {
      id: 2,
      title: 'openEuler云原生开源中间件Meetup天津站',
      date: '2025-05-27 14:00-17:30',
      activity_type: 1,
      synopsis:
        '由openEuler社区、东方通、天津职业技术师范大学联合举办的“轻舟泛海，云翼冲天·openEuler云原生开源中间件”为主题的Meetup将在天津职业技术师范大学举办。此次交流活动特邀多位业内专家，分享实战案例与前沿技术解析，为技术爱好者、行业从业者、高校学生等加油充电，深化技术交流与学习，同时还将进行实习宣讲互动，为高校学生解读东方通开源实习项目，提供更多宝贵的实践机会。',
      address: '天津职业技术师范大学（天津市津南区）',
      city: '天津市',
      isAdditional: true,
      posterImg: tianjin,
      posterImgMb: tianjinMb,
      series: '3',
      detail_img: detail_250527,
      new_url: '/zh/news/20250530-dft/20250530-dft.html',
    },
    {
      id: 1,
      title: 'openEuler & deepin Meetup成都站',
      date: '2025-05-24 14:00-17:30',
      activity_type: 1,
      synopsis:
        '在开源技术领域，开源生态建设一直是众多从业者共同关注的话题。为了深入探讨开源生态的发展之道，一场聚焦「开源生态共建」的技术聚会将在成都・菁蓉汇启幕 ──  由  openEuler 社区和deepin（深度） 社区与联合主办，如意玲珑社区承办的openEuler & deepin Meetup成都站 ，邀你成为开源生态版图的「共建者」，无论你是刚踏入开源的「萌新」，还是深耕技术的「老炮」，希望本次活动都能为你带来新的技术视角与灵感。',
      address: '四川省成都市原岛酒店（环球中心新会展店）5楼3号会议室',
      city: '成都市',
      isAdditional: true,
      posterImg: chengdu,
      posterImgMb: chengduMb,
      series: '3',
      detail_img: detail_250524,
      new_url: '/zh/news/20250530-deepin1/20250530-deepin1.html',
      signup_url:
        'https://openatomcon.openatom.cn/registration/?activityNo=HD20250513141929',
      signup_url_mb:
        'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20250513141929',
    },
    {
      id: 1000,
      title: 'openEuler on RISC-V & deepin Meetup-北京站',
      date: '2025-03-22 14:00-17:00',
      activity_type: 1,
      synopsis:
        'openEuler与deepin双社区联合打造AI×RISC-V深度探索之旅！你是否想了解 RISC-V架构的最新进展？是否想探索Linux桌面应用的新体验？是否对AI与操作系统的融合充满好奇？3月22日，OpenAtom openEuler（简称"openEuler"）社区与deepin（深度）社区将联合联合打造AI×RISC-V深度探索之旅！本次活动聚焦AI、RISC-V等前沿技术，邀请多位行业专家现场分享实践经验，无论你是RISC-V爱好者、AI技术探索者，还是Linux 开源社区参与者，都将为你带来新的技术视角与灵感。',
      address: '北京市海淀区中国科学院软件研究所5号楼四层大报告厅',
      city: '北京市',
      isAdditional: true,
      posterImg: beijing,
      posterImgMb: beijingMb,
      series: '3',
      detail_img: beijingDetail,
      new_url: '/zh/news/openEuler/20250308-ddepin3/20250308-ddepin3.html',
    },
  ],
  en: [],
};

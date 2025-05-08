import beijing from '~@/assets/category/event/list/beijing.jpg';
import beijingMb from '~@/assets/category/event/list/beijing-mb.jpg';
import beijingDetail from '~@/assets/category/event/list/beijing-detail.jpg';

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
      id: 1000,
      title: 'openEuler on RISC-V & deepin Meetup-北京站',
      date: '2025-03-22 14:00-17:00',
      activity_type: 1,
      synopsis:
        'openEuler与deepin双社区联合打造AI×RISC-V深度探索之旅！你是否想了解 RISC-V架构的最新进展？是否想探索Linux桌面应用的新体验？是否对AI与操作系统的融合充满好奇？3月22日，OpenAtom openEuler（简称"openEuler"）社区与deepin（深度）社区将联合联合打造AI×RISC-V深度探索之旅！本次活动聚焦AI、RISC-V等前沿技术，邀请多位行业专家现场分享实践经验，无论你是RISC-V爱好者、AI技术探索者，还是Linux 开源社区参与者，都将为你带来新的技术视角与灵感。',
      live_address: null,
      address: '北京市海淀区中国科学院软件研究所5号楼四层大报告厅',
      detail_address: '北京市海淀区中国科学院软件研究所5号楼四层大报告厅',
      city: '北京市',
      poster: 1,
      start: null,
      end: null,
      join_url: null,
      replay_url: null,
      register_url: 'https://mp.weixin.qq.com/s/uWj0RrPxylfBu3IkyuFVvQ',
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

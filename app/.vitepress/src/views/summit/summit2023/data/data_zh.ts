import banner_pc from '../img/banner_pc.jpg';
import banner_mo from '../img/banner_mo.png';
import textImg from '../img/text.png';
import guestData from './guest-data';
import liveData from './live-data';

export default {
  banner: {
    pcBanner: banner_pc,
    moBanner: banner_mo,
    link: 'https://e-campaign.huawei.com/events3/UniversalForm/register/200908020/register.html?site=cn&formId=6155&way=onsite',
    id: '',
    img: textImg,
    title: [''],
    desc: [''],
    btn: '立即报名',
    targetTap: '_blank',
  },
  introduce:
    '数字化、智能化浪潮正奔涌而来。操作系统作为数字基础设施的底座，已经成为推动产业数字化、智能化发展的核心力量，操作系统的发展为数智未来提供了无限可能。',
  introduce2:
    '2023年12月15日-16日，我们将在北京国家会议中心举办操作系统大会＆openEuler Summit 2023，大会旨在汇聚全球产业界创新力量，构筑坚实的基础软件根基，推动基础软件技术持续创新，共建全球开源新生态。',
  introduce3:
    '大会将搭建开放、合作、共享的平台，携手产业组织、全球开源基金会、学术领袖、领先的行业用户、生态伙伴以及开发者等，共同探讨操作系统产业发展方向和未来机遇，联合伙伴展示最新合作成果，分享数字化转型实践，共建和谐共赢的产业生态。大会十余场分论坛、三十余场社区专题会议以及近百个展位期待您的莅临！',
  introduce4: '在这里，您将有机会看到：',
  list: [
    '技术创新：培育创新力量，引领基础软件智能化',
    '商业应用：深入行业场景，助力行业加速数字化',
    '社区共建：汇聚全球生态，打造操作系统根社区',
    '人才发展：深化产教融合，培养学术和科研人才',
  ],
  introduce5: '汇聚开源，贡献智慧，共建数智时代的操作系统，共促数字经济腾飞。',
  agenda: {
    title: '会议日程',
    tabType: ['上午：主论坛','下午：分论坛'],
    changeTip:'注：最终日程安排以会议当天实际议程为准。'
  },
  live: liveData,
  guest: guestData,
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: 'openEuler Developer Day 2023',
        link: '/zh/interaction/summit-list/devday2023/',
      },
      {
        name: 'openEuler Summit 2022',
        link: '/zh/interaction/summit-list/summit2022/',
      },
      {
        name: '湖南欧拉操作系统生态大会',
        link: '/zh/interaction/summit-list/summit2022-changsha/',
      },
      {
        name: 'openEuler Developer Day 2022',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2022/',
      },
      {
        name: 'openEuler Summit 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/summit2021/',
      },
      {
        name: 'openEuler Developer Day 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2021/',
      },
      {
        name: 'openEuler Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/',
      },
      {
        name: 'openEuler Virtual Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/list/',
      },
    ],
  },
};

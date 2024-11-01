import callForPc from '../img/call-for_light.jpg';
import callFor_dark from '../img/call-for_dark.jpg';
import textLight from '../img/wenzi_light.png';
import textDark from '../img/wenzi_dark.png';

export default {
  banner: {
    btn: '立即报名',
    pcTextImgLight: textLight,
    pcTextImgDark: textDark,
    link: {
      pc: 'https://openatomcon.openatom.cn/registration/?activityNo=HD20241010150325',
      mo: 'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20241010150325',
    },
  },
  introduce:
    '操作系统是产业数字化、智能化发展的坚实底座。openEuler作为数智基础设施的开源操作系统，开源5年，产业共建、生态繁荣；openEuler系市场份额屡攀新高；技术不断创新，使能AI，加速OS智能化，让数智无所不能；源于中国，贡献全球，已成长为企业级全球开源操作系统社区的重要一员。',
  introduce2:
    '2024年11月15日-16日，我们将在北京中关村国际创新中心举办 操作系统大会＆openEuler Summit 2024，本次大会旨在汇聚全球产业发展力量，邀请思想引领者、商业精英、技术专家、合作伙伴以及全球开源基金会等业界同仁，共同探讨操作系统产业发展方向和未来机遇，联合伙伴展示最新合作成果，分享数字化转型实践，以技术驱动创新不断激发新质生产力。',
  introduce3: '在这里，您将有机会看到：',
  list: [
    '在30+场主题演讲、论坛、圆桌会议中，聆听和分享前沿观点',
    '参观100+创新展点，体验openEuler最新的解决方案，以及与伙伴的联合创新',
    '与技术专家面对面交流，了解最新的开发工具并动手实践',
    '共商智能化、数字化的关键举措，为全球开源新生态的建设贡献力量',
  ],
  introduce4: '汇聚开源，贡献智慧，崛起数字时代，引领数智未来。',
  contentList: [
    {
      name: '议题征集',
      name_en: 'CALL FOR SPEAKER',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/4mD9PWslzXzUBVfV/fill',
    },
    {
      name: 'SIG征集',
      name_en: 'CALL FOR SIG',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/juGrDffhD8br7Lch/fill',
    },
    {
      name: 'DEMO征集',
      name_en: 'CALL FOR DEMO',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/nuezgDhi3irgyLIf/fill',
    },
    {
      name: 'POSTER征集',
      name_en: 'CALL FOR POSTER',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/gYEhLZitK1EqWYEM/fill',
    },
  ],
  agenda: {
    title: '活动日程',
    tabType: ['主论坛', '分论坛'],
    tabType1: ['主论坛', '分论坛/SIG工作会议'],
    changeTip: '注：最终日程安排以会议当天实际议程为准。',
  },
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: 'openEuler Summit 2023',
        link: '/zh/interaction/summit-list/summit2023/',
      },
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

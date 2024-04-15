import bannerDevdayMo from '../img/banner-devday_mo.png';
import bannerDevdayPc from '../img/banner-devday_pc.jpg';

import Demo from '../img/Demo.png';
import DemoDark from '../img/Demo-dark.png';
import SIG from '../img/SIG.png';
import SIGDark from '../img/SIG-dark.png';
import Speaker from '../img/Speaker.png';
import SpeakerDark from '../img/Speaker-dark.png';

export default {
  banner: {
    img_pc: bannerDevdayPc,
    img_mo: bannerDevdayMo,
    img_text_pc: '',
    img_text_mo: '',
    suptitle: '开放原子开源基金会',
    title: 'openEuler Developer Day 2024',
    subtitle: '6月 中国-深圳',
  },
  detail: [
    'openEuler Developer Day 2024（简称 ODD 2024）—— openEuler 社区年度顶级开发者活动，是开放原子开源基金会旗下 openEuler 社区发起的开发者大会。 旨在持续推动操作系统乃至基础软件的创新和突破。本次 ODD 2024 将发布openEuler 24.03 LTS 版本、多样性计算和全场景协同的技术成果、分享各行各业基于 openEuler 的商业实践、展示 openEuler 与国际开源社区和高校的合作以及研究进展。同时 ODD 也是社区的年度大型工作会议，协同讨论版本路线以及联合创新。openEuler 始终与开发者在一起，用 openEuler 构筑坚实的软件根基，成就属于每位开发者的 openEuler 时代。',
  ],
  callForList: [
    {
      name: 'Call for Speaker',
      desc: 'openEuler Developer Day 2024将于6月在深圳举行。大会是开放原子开源基金会旗下 openEuler 社区发起的开发者大会。openEuler 是面向数字基础设施的开源操作系统，本次大会旨在推动 openEuler 在多样性计算、云计算、边缘计算、嵌入式等技术方向的持续探索和创新。大会设置了8个技术分论坛，欢迎大家提交符合各技术方向的议题。 ',
      label: '提交演讲议题',
      href: 'https://shimo.im/forms/Kq05OamoUFtQYsVQ/fill',
      img: Speaker,
      imgDark: SpeakerDark,
    },
    {
      name: 'Call for Demo',
      desc: '本次大会皆在推动openEuler在AI、多样性计算、云计算、嵌入式等方向的持续探索和创新。现场设置了openEuler Demo体验互动区，用于展示openEuler新特性、落地场景、客户体验、开发体验流程。您可以通过Demo和开发者进行交流互动，欢迎提交您的Demo创意。',
      label: '提交演示议题',
      href: 'https://shimo.im/forms/FhqNSKFI3QHhbGrR/fill',
      img: Demo,
      imgDark: DemoDark,
    },
    {
      name: 'Call for SIG',
      desc: '作为大会的重要环节，SIG组开放工作会议将汇聚 openEuler 社区的开发者，以单个 SIG 组或跨 SIG 组的形式，线下面对面交流，分享最新的技术进展，探讨大家的需求与问题，创新与合作；并规划未来 6 个月的技术方向、SIG工作任务与分工、优先级等等，为openEuler 下个版本的发布作准备。',
      label: '申报现场会议',
      href: 'https://shimo.im/forms/1d3aMll0axhmWj3g/fill',
      img: SIG,
      imgDark: SIGDark,
    },
  ],
  previous: {
    title: '精彩回顾',
    content: [
      {
        title: 'openEuler Summit 2022',
        link: '/zh/interaction/summit-list/summit2022/',
      },
      {
        title: '湖南 openEuler 操作系统生态大会',
        link: '/zh/interaction/summit-list/summit2022-changsha/',
      },
      {
        title: 'openEuler Developer Day 2022',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2022/',
      },
      {
        title: 'openEuler Summit 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/summit2021/',
      },
      {
        title: 'openEuler Developer Day 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2021/',
      },
      {
        title: 'openEuler Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/',
      },
      {
        title: 'openEuler Virtual Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/list/',
      },
    ],
  },
};

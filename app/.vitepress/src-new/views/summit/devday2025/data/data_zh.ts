import banner_pc from '../img/banner-pc.jpg';
import banner_mo from '../img/banner-mo.jpg';
import banner_pc_dark from '../img/banner-pc-dark.jpg';
import banner_mo_dark from '../img/banner-mo-dark.jpg';
import banner_text from '../img/banner-text.png';
import introduce_light from '../img/introduce-light.png';
import introduce_Dark from '../img/introduce-dark.png';
import call_light from '../img/call-light.png';
import call_Dark from '../img/call-dark.png';
import call1 from '../img/call1.png';
import call2 from '../img/call2.png';
import topic_light from '../img/topic-light.png';
import topic_Dark from '../img/topic-dark.png';
import topic1 from '../img/topic1.png';
import topic2 from '../img/topic2.png';
import topic3 from '../img/topic3.png';
import topic4 from '../img/topic4.png';
import topic5 from '../img/topic5.png';
import topic6 from '../img/topic6.png';
import agenda_light from '../img/agenda-light.png';
import agenda_Dark from '../img/agenda-dark.png';
import agenda1 from '../img/agenda1.png';
import agenda2 from '../img/agenda2.png';
import agenda_mo1 from '../img/agenda-mo1.png';
import agenda_mo2 from '../img/agenda-mo2.png';
import review_light from '../img/review-light.png';
import review_Dark from '../img/review-dark.png';
import guide_pc from '../img/guide-pc.jpg';
import guide_mo from '../img/guide-mo.jpg';
import guide_light from '../img/guide-light.png';
import guide_dark from '../img/guide-dark.png';
import live_light from '../img/live-light.png';
import live_dark from '../img/live-dark.png';

export default {
  banner: {
    bgPc: banner_pc,
    bgMo: banner_mo,
    bgPcDark: banner_pc_dark,
    bgText: banner_text,
    signUpHrefPc:
      'https://openatomcon.openatom.cn/registration/?activityNo=HD20250305105858',
    signUpHrefMo:
      'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20250305105858',
    signUpTitle: '立即报名',
  },
  introduce: {
    titleImg: introduce_light,
    titleImDark: introduce_Dark,
    title: '活动简介',
    list: [
      'openEuler Developer Day 2025 （简称 ODD 2025）是开放原子开源基金会孵化及运营的 openEuler 社区发起的开发者大会。旨在持续推动操作系统乃至基础软件的创新和突破。本次 ODD 2025 将全面展示全新发布的25.03创新版本特性、展示内核开发、多样性计算和全场景协同的技术成果、分享各行各业基于 openEuler 的商业实践。同时 ODD 也是社区的年度大型工作会议，协同讨论版本路线以及联合创新。openEuler 始终与开发者在一起，用 openEuler 构筑坚实的软件根基，成就属于每位开发者的 openEuler 时代。',
      '我参与，我做主。开源是一种态度，分享是一种精神。欢迎申报SIG Gathering 环节相关议题。',
    ],
  },
  topic: {
    titleImg: topic_light,
    titleImDark: topic_Dark,
    title: 'SIG Gathering',
    text: '查看议题',
    desc: '本次ODD大会的SIG Gathering环节将设立八大专题研讨，方向为：内核开发、AI生态支持、上游生态支持、openEuler高效开发、用户体验设计、云与云原生、全场景应用、RISC-V。欢迎各SIG组选择您感兴趣的的专题链接，填写您的需求，一起线下共同探讨，寻求解决方案。',
    list: [
      {
        title: '内核开发',
        desc: [
          '本专题将与开发者一起探讨openEuler内核那些事儿：如何提升openEuler内核竞争力、给上游社区做贡献、内核CVE感知和修复、以及多样性算力平台支持等，提升openEuler内核竞争力和健壮性',
        ],
        bg: topic1,
        href: 'https://etherpad.openeuler.org/p/%E5%86%85%E6%A0%B8%E5%BC%80%E5%8F%91',
        position: 'B1层 龙井厅',
        time: '全天',
      },
      {
        title: '全场景应用',
        desc: [
          '本专题将与开发者一起探讨openEuler在多场景的应用及未来发展方向，一套架构搞定服务器、云计算、边缘计算和嵌入式等全场景应用',
        ],
        bg: topic2,
        href: 'https://etherpad.openeuler.org/p/%E5%85%A8%E5%9C%BA%E6%99%AF%E5%BA%94%E7%94%A82025',
        position: '3F层 永兴厅',
        time: '全天',
      },
      {
        title: 'AI原生支持',
        desc: [
          '本专题将与开发者一起探讨openEuler的多样化三层AI使能架构：',
          '1. 基于LLM的智能交互平台，颠覆传统shell命令交付的模式，改进传统学习，开发，调优，运维体验，智能新语义支持应用智能化升级，共建AI生态',
          '2. CPU/GPU/NPU算力融合，面向训练高可用/推理低成本方向，降本增效',
          '3. AI 主流软件栈4层栈全栈兼容及封装，主流推理框架加速，开箱即用',
        ],
        href: 'https://etherpad.openeuler.org/p/AI%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81%EF%BC%882025%EF%BC%89',
        position: 'B1层 虎跑厅',
        time: '全天',
      },
      {
        title: 'openEuler高效开发',
        desc: [
          '本专题将与开发者一起聊聊怎么在openEuler上更好地开发。从openEuler本地开发环境、加包与更新维护、社区开发与协作基础设施等多个角度，打造更便利的“openEuler高效开发”的开发者体验',
        ],
        bg: topic3,
        href: 'https://etherpad.openeuler.org/p/%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91',
        position: 'B1层 秋月厅',
        time: '下午',
      },
      {
        title: '上游生态支持',
        desc: [
          'openEuler始终遵循“上游优先”的策略，帮助开源软件上游天然支持openEuler，让用户可以在开发、集成、使用这些软件时获得便利',
          '本方向主要涉及：openEuler上游支持技术讨论及进展同步，讨论如何做好从上游支持到openEuler集成发布的关键环节，包含上游协同，监测，维护管理等',
        ],
        bg: topic4,
        href: 'https://etherpad.openeuler.org/p/%E4%B8%8A%E6%B8%B8%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81%EF%BC%882025%EF%BC%89',
        position: 'B1层 桂雨厅',
        time: '上午',
      },
      {
        title: '用户体验设计',
        desc: [
          '本专题将与开发者一起聊聊openEuler用户体验设计的“大动作”：',
          '1. 深化知识共享：提供高质量的中英文文档，与协作机制，作为知识共享的基石',
          '2. 推动技术融合：通过软硬件兼容性测试与认证，促进openEuler生态的健康发展',
          '3. 人才培养与发展：通过设计和实施有效的人才认证和培养计划，为人才提供成长和发展的机会',
          '4. 设计语言的统一与创新：通过构建一致性的设计语言，定义社区视觉规范',
        ],
        bg: topic5,
        href: 'https://etherpad.openeuler.org/p/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E8%AE%BE%E8%AE%A1',
        position: 'B1层 秋月厅',
        time: '上午',
      },
      {
        title: 'RISC-V',
        desc: [
          '探讨openEuler在RISC-V架构上的最新进展、应用案例和发展方向，提升openEuler多样性算力支持的能力',
        ],
        href: 'https://etherpad.openeuler.org/p/RISC_V',
        position: 'B1层 玉皇厅',
        time: '全天',
      },
      {
        title: '云&云原生',
        desc: [
          '探讨openEuler在云计算与云原生领域的技术生态满足度提升、技术创新、领域Top开源社区集成和联合创新等相关内容，为云与云原生领域开发者和用户提供极致体验',
        ],
        bg: topic6,
        href: 'https://etherpad.openeuler.org/p/%E4%BA%91%E4%B8%8E%E4%BA%91%E5%8E%9F%E7%94%9F',
        position: 'B1层 桂雨厅',
        time: '下午',
      },
    ],
  },
  agenda: {
    titleImg: agenda_light,
    titleImDark: agenda_Dark,
    title: '活动日程',
    date: 'April 11',
    list: [
      {
        time: '04月11日',
        id: 'main',
        list: [
          {
            type: '上午',
            children: [
              {
                title: '开场致辞',
                date: '2025/04/11',
                time: '9:00-9:05',
                attendee: '李博',
                ldentity: '开放原子开源基金会秘书长助理',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: '智汇百川，轻启新程',
                date: '2025/04/11',
                time: '9:05-9:15',
                attendee: '胡正策',
                ldentity: 'OpenAtom openEuler 社区委员会执行总监',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
              {
                title: 'openEuler 25.03 特性解读',
                date: '2025/04/11',
                time: '9:15-9:45',
                attendee: '胡欣蔚',
                ldentity: 'OpenAtom openEuler 社区技术委员会主席',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: 'SIG Gathering 整体介绍',
                date: '2025/04/11',
                time: '9:45-9:50',
                attendee: '郑振宇',
                ldentity: 'OpenAtom openEuler 社区运营组组长',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
              {
                title: 'SIG Gathering 专题研讨',
                date: '2025/04/11',
                time: '09:50-12:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
            ],
          },
          {
            type: '下午',
            children: [
              {
                title: '醒脑活动',
                date: '2025/04/11',
                time: '13:30-14:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: 'SIG Gathering 专题研讨',
                date: '2025/04/11',
                time: '14:00-16:30',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
              {
                title: 'Poster Session 现场交流',
                date: '2025/04/11',
                time: '16:30-17:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: 'SIG Gathering 总结与分享',
                date: '2025/04/11',
                time: '17:00-18:00',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
            ],
          },
          {
            type: '晚上',
            children: [
              {
                title: '开发者之夜',
                date: '2025/04/11',
                time: '18:00-20:30',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
            ],
          },
        ],
      },
    ],
  },
  review: {
    titleImg: review_light,
    titleImDark: review_Dark,
    title: '精彩回顾',
    list: [
      {
        name: '操作系统大会 & openEuler Summit 2024',
        link: '/zh/interaction/summit-list/summit2024/',
      },
      {
        name: 'openEuler SIG Gathering 2024',
        link: '/zh/interaction/summit-list/sig-gathering-2024/',
      },
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
    ],
  },
  anchor: [
    { title: '活动简介', id: 'minisite-introduction' },
    { title: '活动日程', id: 'minisite-agenda' },
    { title: '会场导览', id: 'venue-guide' },
  ],
  live: {
    titleImg: live_light,
    titleImDark: live_dark,
    title: '大会直播',
    liveId: 15354,
    liveTestId: 15354,
    liveDate: '2025-04-10T23:59:59',
  },
  guide: {
    titleImg: guide_light,
    titleImDark: guide_dark,
    title: '会场导览',
    imageMo: guide_mo,
    imagePc: guide_pc,
  },
};

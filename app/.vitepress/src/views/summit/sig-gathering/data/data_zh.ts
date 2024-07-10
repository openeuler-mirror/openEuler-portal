import banner_pc from '../img/banner-pc.jpg';
import banner_mo from '../img/banner-mo.jpg';
import introduce_light from '../img/introduce-light.png';
import introduce_Dark from '../img/introduce-dark.png';
import topic_light from '../img/topic-dark.png';
import topic_Dark from '../img/topic-dark.png';
import topic1 from '../img/topic1.png';
import topic2 from '../img/topic2.png';
import topic3 from '../img/topic3.png';
import topic4 from '../img/topic4.png';
import topic_dark1 from '../img/topic-dark1.png';
import topic_dark2 from '../img/topic-dark2.png';
import topic_dark3 from '../img/topic-dark3.png';
import topic_dark4 from '../img/topic-dark4.png';
import agenda_light from '../img/agenda-light.png';
import agenda_Dark from '../img/agenda-dark.png';
import agenda1 from '../img/agenda1.png';
import agenda2 from '../img/agenda2.png';
import agenda_mo1 from '../img/agenda-mo1.png';
import agenda_mo2 from '../img/agenda-mo2.png';
import review_light from '../img/review-light.png';
import review_Dark from '../img/review-dark.png';

export default {
  banner: {
    bgPc: banner_pc,
    bgMo: banner_mo,
    slogan: 'openEuler',
    title: 'SIG Gathering 2024',
    subtitle: '2024.07.26  | 北京香格里拉饭店',
    subtitleMo: '2024.07.26  | BEIJING',
    signUpHref: '/zh/interaction/summit-list/sig-gathering/form/',
    signUpTitle: '立即报名',
  },
  introduce: {
    titleImg: introduce_light,
    titleImDark: introduce_Dark,
    title: '活动简介',
    list: [
      'openEuler SIG Gathering 2024将于7月26日在北京香格里拉饭店举行。本次活动面向社区108个SIG组，诚邀社区开发者齐聚现场，通过全天线下会议，聚焦openEuler 24.03 LTS 版本后续重要规划和各SIG2024年下半年重要技术方案以及开发计划。',
      '“我参与，我做主”，本次SIG组工作会议将设立六大专题研讨，方向为：多样性算力、全场景应用、AI原生支持、openEuler原生开发、上游原生支持、用户体验研究。欢迎各SIG组选择您感兴趣的的专题链接，填写您的需求，一起线下共同探讨，寻求解决方案。'
    ]
  },
  topic: {
    titleImg: topic_light,
    titleImDark: topic_Dark,
    title: '专题分类',
    text: '提交议题',
    list: [
      {
        title: '多样性算力',
        desc: [
          '多样性算力支持是openEuler领先性的核心竞争力之一。openEuler不仅吸引了国际上类似于Intel，AMD，ARM和Linaro等主流平台厂商的深度参与，也为国内众多架构体系和厂商如LongArch，申威和华为等众多ARM或者RISC-v厂商的生态发展汇聚了大量的开发资源和软硬件生态。openEuler的多样性发展策略必将为操作系统全架构基础底座奠定最坚实的基础。本专题将以多样性算力为主题，探讨异构计算架构、多平台支持、CPU/GPU/NPU/加速器协同等话题，并共同协商和规划openEuler的全架构发展计划'
        ],
        bg: topic1,
        bgDark: topic_dark1,
        href: 'https://etherpad.openeuler.org/p/%E5%A4%9A%E6%A0%B7%E6%80%A7%E7%AE%97%E5%8A%9B',
      },
      {
        title: '全场景应用',
        desc: [
          'openEuler自开源之初就以支撑全场景应用为核心特点，解决不同场景的软烟囱问题。openEuler的最新版本中在性能、可靠性、安全性、易用性等方面有了进一步提升，以支持服务器、云计算、边缘计算和嵌入式等场景的全面应用和创新，本专题将结合技术演进和实际案例探讨openEuler在全场景应用方面的发展和规划以及面向AI生态的结合'
        ],
        bg: topic2,
        bgDark: topic_dark2,
        href: 'https://etherpad.openeuler.org/p/%E5%85%A8%E5%9C%BA%E6%99%AF%E5%BA%94%E7%94%A8',
      },
      {
        title: 'AI原生支持',
        desc: [
          'openEuler在2023年提出了“AI for openEuler, openEuler For AI”的发展方向，在2024年发布了首个AI原生LTS版本24.03 LTS，通过各类创新技术实现了openEuler从通用算力的多样化，到智能算力的多样化三层AI使能架构，本专题将围绕AI原生支持对以下具体方向展开讨论：',
          '1、基于LLM的智能交互平台，颠覆传统shell 命令交付的模式，改进传统学习，开发，调优，运维体验，智能新语义支持应用智能化升级，共建AI生态。',
          '2、CPU/GPU/NPU 算力融合，面向训练高可用/推理低成本方向，降本增效。',
          '3、AI 主流软件栈4层栈全栈兼容及封装，主流推理框架加速，开箱即用。',
          '4、云原生智能容器探讨'
        ],
        href: 'https://etherpad.openeuler.org/p/AI%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81',
      },
      {
        title: 'openEuler原生开发',
        desc: [
          '操作系统作为应用与技术创新的底座，其软件生态和原生开发体验是对于应用和创新效率提升至关重要的关键因素，目前openEuler已有超过680万装机量，社区汇聚近2万名开发者，如何使能这些开发者更好的基于openEuler进行原生开发，进一步提升开发效率是openEuler社区的关键工作之一，本专题将对以下方面进行讨论：',
          'openEuler本地开发环境、加包与更新维护、社区开发与协作基础设施、社区构建测试服务'
        ],
        bg: topic3,
        bgDark: topic_dark3,
        href: 'https://etherpad.openeuler.org/p/openEulerAI%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91',
      },
      {
        title: '上游原生支持',
        desc: [
          'openEuler始终遵循“上游优先”的策略，帮助上游开源软件原生支持openEuler，让用户可以在开发、集成、使用这些软件时获得便利。',
          '本方向主要涉及：openEuler上游原生支持技术讨论及进展同步，讨论如何做好从上游原生支持到openEuler原生发布的关键环节，包含上游协同，监测，维护管理等'
        ],
        bg: topic4,
        bgDark: topic_dark4,
        href: 'https://etherpad.openeuler.org/p/%E4%B8%8A%E6%B8%B8%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81',
      },
      {
        title: '用户体验研究',
        desc: [
          '1.深化知识共享：提供高质量的中英文文档，作为知识共享的基石。',
          '2.推动技术融合：通过软硬件兼容性测试与认证，促进openEuler生态的健康发展。',
          '3.人才培养与发展：通过设计和实施有效的人才认证和培养计划，为人才提供成长和发展的机会。',
          '4.设计语言的统一与创新：通过构建一致性的设计语言，定义社区视觉规范'
        ],
        href: 'https://etherpad.openeuler.org/p/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E7%A0%94%E7%A9%B6',
      }
    ]
  },
  agenda: {
    titleImg: agenda_light,
    titleImDark: agenda_Dark,
    title: '活动日程',
    date: 'July 26',
    list: [
      {
        time: '07月26日',
        id: 'main',
        list: [
          {
            type: '上午',
            children: [
              {
                title: '开场致辞',
                date: '2024/07/26',
                time: '10:00-10:10',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: '专题研讨',
                date: '2024/07/26',
                time: '10:10-12:00',
                bg: agenda2,
                bgMo: agenda_mo2,
              }
            ]
          },
          {
            type: '下午',
            children: [
              {
                title: '午餐',
                date: '2024/07/26',
                time: '12:00-13:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: '轻松健身操 ',
                date: '2024/07/26',
                time: '13:30-13:50',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
              {
                title: '专题探讨',
                date: '2024/07/26',
                time: '13:50-16:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: '快闪总结',
                date: '2024/07/26',
                time: '16:00-18:00',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
              {
                title: 'SIG Gathering 大合照',
                date: '2024/07/26',
                time: '18:00-18:05',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: '开发者之夜',
                date: '2024/07/26',
                time: '18:30-20:30',
                bg: agenda2,
                bgMo: agenda_mo2,
              }
            ]
          }
        ]
      }
    ]
  },
  review: {
    titleImg: review_light,
    titleImDark: review_Dark,
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
}

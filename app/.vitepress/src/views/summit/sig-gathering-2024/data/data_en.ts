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

export default {
  banner: {
    bgPc: banner_pc,
    bgMo: banner_mo,
    slogan: 'openEuler',
    title: 'SIG Gathering 2024',
    subtitle: 'July 26, 2024 | Shangri-La Hotel, Beijing',
    subtitleMo: '2024.07.26  | BEIJING',
    signUpHref: '',
    signUpTitle: '',
  },
  introduce: {
    titleImg: introduce_light,
    titleImDark: introduce_Dark,
    title: 'Introduction',
    list: [
      'This year\'s gathering will bring together developers from all 108 SIGs in our community, with a focus on the future development of openEuler in the wake of the release of openEuler 24.03 LTS.',
      'The event will consist of six intriguing tracks: diversified computing power, all-scenario applications, AI-native support, native development with openEuler, upstream-native support, and user experience advancement. Join us and pick the track that sparks your interest. You\'ll be free to share ideas, brainstorm, and collaborate within a nurturing and innovative community of like-minded developers.'
    ]
  },
  topic: {
    titleImg: topic_light,
    titleImDark: topic_Dark,
    title: 'Topics',
    text: 'Submit your proposal',
    list: [
      {
        title: 'Diversified Computing',
        desc: [
          'This topic explores heterogeneous computing architectures, multi-architecture support, and collaborative CPU/GPU/NPU/accelerator technologies, addressing openEuler\'s strategy for diversified computing power.',
        ],
        bg: topic1,
        bgDark: topic_dark1,
        href: 'https://etherpad.openeuler.org/p/%E5%A4%9A%E6%A0%B7%E6%80%A7%E7%AE%97%E5%8A%9B',
      },
      {
        title: 'All-scenario Applications',
        desc: [
          'This topic explores openEuler\'s capability to support the comprehensive applications across servers, cloud, edge computing, and embedded systems, with a focus on performance, reliability, security, and usability enhancements',
        ],
        bg: topic2,
        bgDark: topic_dark2,
        href: 'https://etherpad.openeuler.org/p/%E5%85%A8%E5%9C%BA%E6%99%AF%E5%BA%94%E7%94%A8',
      },
      {
        title: 'AI-Native Support',
        desc: [
          'This topic delves into openEuler\'s AI-driven innovations, covering AI-native support, intelligent interactive platforms, integrated CPU/GPU/NPU capabilities, and comprehensive AI software stacks.',
        ],
        href: 'https://etherpad.openeuler.org/p/AI%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81',
      },
      {
        title: 'Native Development with openEuler',
        desc: [
          'This topic centers on the native development experience, discussing local development environments, package updates, community collaboration, and testing services.',
        ],
        bg: topic3,
        bgDark: topic_dark3,
        href: 'https://etherpad.openeuler.org/p/openEulerAI%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91',
      },
      {
        title: 'Upstream-Native Support',
        desc: [
          'This topic focuses on ensuring that upstream open-source software supports openEuler natively, including working with upstream communities, staying updated on upstream code changes, and maintaining software repositories.',
        ],
        bg: topic4,
        bgDark: topic_dark4,
        href: 'https://etherpad.openeuler.org/p/%E4%B8%8A%E6%B8%B8%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81',
      },
      {
        title: 'User Experience Boost',
        desc: [
          'This topic aims at',
          '(1) Enhancing knowledge sharing: delivering high-quality documentation in both Chinese and English to foster knowledge dissemination.',
          '(2) Promoting technology integration: supporting the healthy growth of the openEuler ecosystem through comprehensive software and hardware compatibility testing and certification.',
          '(3) Boosting service efficiency: improving problem-solving efficiency with multi-channel service support and a rich repository of common case studies.',
          '(4) Strengthening system development: enhancing design systems and infrastructure to create a superior user experience.'
        ],
        href: 'https://etherpad.openeuler.org/p/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E7%A0%94%E7%A9%B6',
      }
    ]
  },
  agenda: {
    titleImg: agenda_light,
    titleImDark: agenda_Dark,
    title: 'Agenda (GMT+8)',
    date: 'July 26',
    list: [
      {
        time: '2024/7/26',
        id: 'main',
        list: [
          {
            type: 'Morning',
            children: [
              {
                title: 'Welcome & Overview',
                date: '2024/07/26',
                time: '10:00-10:10',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: 'SIG Meetings',
                date: '2024/07/26',
                time: '10:10-12:00',
                bg: agenda2,
                bgMo: agenda_mo2,
              }
            ]
          },
          {
            type: 'Afternoon',
            children: [
              {
                title: 'Lunch Break',
                date: '2024/07/26',
                time: '12:00-13:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: 'Fun Fitness',
                date: '2024/07/26',
                time: '13:30-13:50',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
              {
                title: 'SIG Meetings',
                date: '2024/07/26',
                time: '13:50-16:00',
                bg: agenda1,
                bgMo: agenda_mo1,
              },
              {
                title: 'Summary & Sharing',
                date: '2024/07/26',
                time: '16:00-18:00',
                bg: agenda2,
                bgMo: agenda_mo2,
              },
            ]
          },
          {
            type: 'Evening',
            children: [
              {
                title: 'Evening Reception',
                date: '2024/07/26',
                time: '18:30-20:30',
                bg: agenda1,
                bgMo: agenda_mo1,
              }
            ]
          }
        ]
      }
    ]
  },
}

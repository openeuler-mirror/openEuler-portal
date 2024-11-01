import callForPc from '../img/call-for_light.jpg';
import callFor_dark from '../img/call-for_dark.jpg';
import textLight from '../img/wenzi_light.png';
import textDark from '../img/wenzi_dark.png';

export default {
  banner: {
    btn: 'Register',
    pcTextImgLight: textLight,
    pcTextImgDark: textDark,
    link: {
      pc: 'https://openatomcon.openatom.cn/registration/?activityNo=HD20241010150325',
      mo: 'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20241010150325',
    },
  },
  introduce:
    'Operating systems form the backbone of digital and intelligent industry transformation. openEuler, an open source operating system born in China for digital infrastructure, has emerged as a key player in the global open source landscape. Over the past five years, its market presence was steadily increasing. And openEuler has been continuously driving innovations in OS for AI and AI for OS, accelerating digital transformation, and fostering a thriving ecosystem though industry-wide collaboration.',
  introduce2:
    'On November 15–16, 2024, we invite you to join us at the Operating System Conference & openEuler Summit 2024 at the ZhongGuanCun International Innovation Center in Beijing. This event will bring together global leaders, visionaries, business executives, tech experts, partners, and open source foundations to explore the future of the OS industry and uncover new opportunities. We will showcase collaborative achievements, share insights into digital transformation, and demonstrate how technology drives innovation and next-gen productivity.',
  introduce3: "What to expect:",
  list: [
    '30+ keynotes, forums, and panel discussions offering cutting-edge perspectives',
    '100+ exhibition booths showcasing the latest openEuler solutions and joint innovations.',
    'Direct engagement with experts, hands-on experience with the latest development tools.',
    'Collaboration on key initiatives shaping the future of intelligent and digital transformation, contributing to the global open source ecosystem.',
  ],
  contentList: [
    {
      name: 'CALL FOR SPEAKER',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/4mD9PWslzXzUBVfV/fill',
    },
    {
      name: 'CALL FOR SIG',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/juGrDffhD8br7Lch/fill',
    },
    {
      name: 'CALL FOR DEMO',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/nuezgDhi3irgyLIf/fill',
    },
    {
      name: 'CALL FOR POSTER',
      img: callForPc,
      img_dark: callFor_dark,
      link: 'https://shimo.im/forms/gYEhLZitK1EqWYEM/fill',
    },
  ],
  agenda: {
    title: 'Agenda',
    tabType: ['Keynote', 'Subforums'],
    tabType1: ['Keynote', 'Subforums/SIG Meetings'],
    changeTip: '*The agenda is subject to change.',
  },
  previous: {
    title: '',
    list: [],
  },
};

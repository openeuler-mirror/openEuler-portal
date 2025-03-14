import opensource from '@/assets/category/year-plan/opensource.png';
import opensoucrceTitle from '@/assets/category/year-plan/opensource-title.png';
import ecology from '@/assets/category/year-plan/ecology.png';
import ecologyTitle from '@/assets/category/year-plan/ecology-title.png';
import developer from '@/assets/category/year-plan/developer.png';
import developerTitle from '@/assets/category/year-plan/developer-title.png';
import college from '@/assets/category/year-plan/college.png';
import collegeTitle from '@/assets/category/year-plan/college-title.png';
import edition from '@/assets/category/year-plan/edition.png';
import editionTitle from '@/assets/category/year-plan/edition-title.png';

export const yearPlanData = {
  zh: {
    opensource: {
      title: '国际开源会议',
      contentBg: opensource,
      titleBg: opensoucrceTitle,
      id: 'opensource',
      events: [
        {
          month: '2',
          actives: [
            {
              location: '比利时 布鲁塞尔',
              activeName: 'FOSDEM 2025',
              href: 'https://fosdem.org/2025/',
            },
          ],
        },
        {
          month: '5',
          actives: [
            {
              location: '法国 巴黎',
              activeName: 'RISC-V Summit Europe',
              href: 'https://riscv-europe.org/summit/2025/',
            },
            {
              location: '葡萄牙 里斯本',
              activeName: 'Linaro Connect 2025',
              href: 'https://www.linaro.org/connect/',
            },
          ],
        },
        {
          month: '6',
          actives: [
            {
              location: '中国 香港',
              activeName: 'KubeCon + CloudNativeCon China',
              href: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-china/',
            },
          ],
        },
        {
          month: '8',
          actives: [
            {
              location: '荷兰 阿姆斯特丹',
              activeName: 'Open Source Summit Europe',
              href: 'https://events.linuxfoundation.org/open-source-summit-europe/',
            },
            {
              location: '荷兰 阿姆斯特丹',
              activeName: 'AI_dev: Open Source GenAI & ML Summit Europe',
              href: 'https://events.linuxfoundation.org/ai-dev-europe/',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: '中国 TBD',
              activeName: '开放原子开源生态大会2025',
            },
            {
              location: '意大利 米兰',
              activeName: 'KVM Forum 2025',
              href: 'https://kvm-forum.qemu.org/2025/',
            },
          ],
        },
        {
          month: '11',
          actives: [
            {
              location: '中国 TBD',
              activeName: '操作系统大会&openEuler Summit 2025',
            },
          ],
        },
        {
          month: '12',
          actives: [
            {
              location: '日本 东京',
              activeName: 'OSS & AI_Dev Japan',
              href: 'https://events.linuxfoundation.org/ai-dev-japan-2025/',
            },
          ],
        },
      ],
    },
    ecology: {
      title: '生态技术会议',
      contentBg: ecology,
      titleBg: ecologyTitle,
      id: 'ecology',
      events: [
        {
          month: '3',
          actives: [
            {
              location: '中国 北京',
              activeName: 'KCD Beijing 2025',
              href: 'https://community.cncf.io/events/details/cncf-kcd-beijing-presents-kcd-beijing-2025/',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: '中国 杭州',
              activeName: 'openEuler Developer Day 2025',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: '中国 TBD',
              activeName: 'CID 2025',
            },
          ],
        },
        {
          month: '10',
          actives: [
            {
              location: '中国 长沙',
              activeName: '1024程序员节',
            },
            {
              location: '中国 TBD',
              activeName: 'CLK 2025',
            },
          ],
        },
      ],
    },
    developer: {
      title: 'Call for X 开发者活动',
      contentBg: developer,
      titleBg: developerTitle,
      id: 'developer',
      events: [
        {
          month: '3',
          actives: [
            {
              location: '中国 北京',
              activeName: 'openEuler on RISC-V & deepin Meetup',
            },
          ],
        },
      ],
    },
    college: {
      title: '赛事 & 高校',
      contentBg: college,
      titleBg: collegeTitle,
      id: 'college',
      actives: [
        {
          activeName: '全年 开源实习',
          startTime: 1,
          endTime: 12,
          activelink: '/zh/internship/',
        },
        {
          activeName: '全年 开放原子校源行',
          startTime: 1,
          endTime: 12,
          activelink: 'https://xiaoyuanxing.openatom.cn/#/dashboard',
        },
        {
          activeName: '1月 - 2月 第二届开放原子大赛',
          startTime: 1,
          endTime: 2,
          activelink: 'https://competition.atomgit.com/competition',
        },
        {
          activeName: '4月 - 11月 第五届开源之夏',
          activelink: 'https://summer-ospp.ac.cn/',
          startTime: 4,
          endTime: 11,
        },
        {
          activeName: '3月 - 9月 中国研究生操作系统开源大会',
          startTime: 3,
          endTime: 9,
        },
        {
          activeName: '6月 - 9月 第八届CCF开源创新大赛',
          activelink: 'https://gitlink.org.cn/competitions',
          startTime: 6,
          endTime: 9,
        },
        {
          activeName: '8月 - 10月 2025年度Hackthon软件难题挑战赛',
          startTime: 8,
          endTime: 10,
        },
        {
          activeName: '5月 - 10月 中国国际大学生创新大赛（2025）',
          startTime: 5,
          endTime: 10,
        },
      ],
    },
  },
  en: {
    opensource: {
      title: 'Open Source Summits',
      contentBg: opensource,
      titleBg: opensoucrceTitle,
      id: 'opensource',
      events: [
        {
          month: '2',
          actives: [
            {
              location: 'Brussels,Belgium',
              activeName: 'FOSDEM',
              href: 'https://fosdem.org/2025/',
            },
          ],
        },
        {
          month: '5',
          actives: [
            {
              location: 'Paris, France',
              activeName: 'RISC-V Summit Europe',
              href: 'https://riscv-europe.org/summit/2025/',
            },
            {
              location: 'Lisbon, Portugal',
              activeName: 'Linaro Connect 2025',
              href: 'https://www.linaro.org/connect/',
            },
          ],
        },
        {
          month: '6',
          actives: [
            {
              location: 'Hong Kong, China',
              activeName: 'KubeCon + CloudNativeCon China',
              href: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-china/',
            },
          ],
        },
        {
          month: '8',
          actives: [
            {
              location: 'Amsterdam, Netherlands',
              activeName: 'Open Source Summit Europe',
              href: 'https://events.linuxfoundation.org/open-source-summit-europe/',
            },
            {
              location: 'Amsterdam, Netherlands',
              activeName: 'AI_dev: Open Source GenAI & ML Summit Europe',
              href: 'https://events.linuxfoundation.org/ai-dev-europe/',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: 'China',
              activeName: 'OpenAtom Open Source Eco-Conference 2025',
            },
            {
              location: 'Milan,Italy',
              activeName: 'KVM Forum',
              href: 'https://kvm-forum.qemu.org/2025/',
            },
          ],
        },
        {
          month: '11',
          actives: [
            {
              location: 'China',
              activeName: 'Operating System Conference &openEuler Summit 2025',
            },
          ],
        },
        {
          month: '12',
          actives: [
            {
              location: 'Tokyo, Japan',
              activeName: 'OSS & AI_Dev Japan',
              href: 'https://events.linuxfoundation.org/ai-dev-japan-2025/',
            },
          ],
        },
      ],
    },
    ecology: {
      title: 'Ecosystem Tech Conferences',
      contentBg: ecology,
      titleBg: ecologyTitle,
      id: 'ecology',
      events: [
        {
          month: '3',
          actives: [
            {
              location: 'Beijing, China',
              activeName: 'KCD Beijing 2025',
              href: 'https://community.cncf.io/events/details/cncf-kcd-beijing-presents-kcd-beijing-2025/',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: 'Hangzhou, China',
              activeName: 'openEuler Developer Day 2025',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: 'China',
              activeName: 'CID 2025',
            },
          ],
        },
        {
          month: '10',
          actives: [
            {
              location: 'Changsha, China',
              activeName: "1024 Programmers' Day",
            },
            {
              location: 'China',
              activeName: 'CLK 2025',
            },
          ],
        },
      ],
    },
  },
} as any;
export const editionData = {
  title: {
    zh: '版本发布计划',
    en: 'Release Plan',
  },
  contentBg: edition,
  titleBg: editionTitle,
  id: 'edition',
  actives: [
    {
      time: '3.30',
      content: '25.03',
      month: 3,
    },
    {
      time: '6.30',
      content: '24.03 LTS SP2',
      month: 6,
    },
    {
      time: '9.30',
      content: '25.09',
      month: 9,
    },
    {
      time: '12.31',
      content: '24.03 LTS SP3',
      month: 12,
    },
  ],
};
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

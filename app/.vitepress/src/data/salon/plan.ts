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
      title: '开源顶会',
      contentBg: opensource,
      titleBg: opensoucrceTitle,
      id: 'opensource',
      events: [
        {
          month: '2',
          actives: [
            {
              location: '西班牙，巴塞罗那',
              activeName: 'MWC 2024',
              href: '/zh/news/openEuler/20240306-gjh/20240306-gjh.html',
            },
          ],
        },
        {
          month: '3',
          actives: [
            {
              location: '法国，巴黎',
              activeName: 'KubeCon EU',
            },
            {
              location: '中国，上海',
              activeName: 'GDC',
              href: '/zh/news/openEuler/20240330-GDC/20240330-GDC.html',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: '越南，河内',
              activeName: 'FOSSASIA 2024',
              href: '/zh/news/20240426-fassasia/20240426-fassasia.html',
            },
          ],
        },
        {
          month: '5',
          actives: [
            {
              location: '西班牙，马德里',
              activeName: 'Linaro Connect',
            },
          ],
        },
        {
          month: '6',
          actives: [],
        },
        {
          month: '7',
          actives: [],
        },
        {
          month: '8',
          actives: [
            {
              location: '中国，上海',
              activeName: 'GOTC',
              href: 'https://gotc.oschina.net/?from=wap',
            },
            {
              location: '杭州',
              activeName: 'RISC-V Day',
            },
            {
              location: '中国，香港',
              activeName: 'KubeCon China',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: '韩国，水原',
              activeName: 'OpenInfra Summit Asia ',
            },
            {
              location: '奥地利，维也纳',
              activeName: 'OSS EU',
            },
            {
              location: '中国，北京',
              activeName: '2024 开放原子开源生态大会',
            },
          ],
        },
        {
          month: '11',
          actives: [
            {
              location: '中国，北京',
              activeName: '2024开放原子开发者大会',
            },
            {
              location: '中国，北京',
              activeName: '操作系统大会&openEuler Summit 2024',
              href: '/zh/interaction/summit-list/summit2024/',
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
              location: '日本，东京',
              activeName: 'OpenChain X openEuler 东京研讨会',
              href: '/zh/news/openEuler/20240330-openchain/20240330-openchain.html',
            },
            {
              location: '中国，上海',
              activeName: 'KCD',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: '中国，西安',
              activeName: 'eBPF 开发者大会',
            },
          ],
        },
        {
          month: '7',
          actives: [
            {
              location: '中国，北京',
              activeName: 'openEuler SIG Gathering 2024',
              href: '/zh/interaction/summit-list/sig-gathering-2024/',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: '中国，上海',
              activeName: 'HC 2024',
            },
          ],
        },
        {
          month: '10',
          actives: [
            {
              location: '中国，长沙',
              activeName: '1024程序员节',
            },
            {
              location: '中国，北京',
              activeName: '2024 CID',
            },
          ],
        },
        {
          month: '12',
          actives: [
            {
              location: '中国，上海',
              activeName: 'Intel On',
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
          month: '1',
          actives: [
            {
              location: '北京',
              activeName: 'openEuler&互联网企业研讨会',
            },
          ],
        },
        {
          month: '3',
          actives: [
            {
              location: '武汉',
              activeName: '武汉用户组 Meetup',
              href: '/zh/news/openEuler/20240330-yhz/20240330-yhz.html',
            },
            {
              location: '成都',
              activeName: 'G11N&Docs Meetup',
              href: '/zh/news/openEuler/20240330-G11N/20240330-G11N.html',
            },
            {
              location: '南京',
              activeName: 'Embedded Meetup',
              href: '/zh/news/20240412-nanjing/20240412-nanjing.html',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: '上海',
              activeName: 'RISC-V & Compiler MeetUp',
              href: '/zh/news/20240426-sh/20240426-sh.html',
            },
            {
              location: '北京',
              activeName: 'RISC-V MeetUp',
            },
          ],
        },
        {
          month: '6',
          actives: [
            {
              location: '北京',
              activeName: 'openEuler 24.03 LTS版本发布会',
              href: '/zh/news/openEuler/20240612-24fb/20240612-24fb.html',
            },
            {
              location: '线上',
              activeName: 'UXL Meetup',
            },
            {
              location: '北京',
              activeName: 'Arm Meetup',
              href: '/zh/news/openEuler/20240628-Arm/20240628-Arm.html',
            },
            {
              location: '南京',
              activeName: '24.03 LTS 版本与社区创新Meetup',
              href: '/zh/news/openEuler/20240625-nanjing/20240625-nanjing.html',
            },
            {
              location: '长沙',
              activeName: 'openEuler 24.03 LTS Meetup',
              href: '/zh/news/openEuler/20240628-changsha/20240628-changsha.html',
            },
            {
              location: '西安',
              activeName: 'openEuler 24.03 LTS & Embedded Meetup',
              href: '/zh/news/openEuler/20240705-xian/20240705-xian.html',
            },
          ],
        },
        {
          month: '7',
          actives: [
            {
              location: '北京',
              activeName: 'openEuler Embedded Meetup',
            },
            {
              location: '北京',
              activeName: 'openEuler DB SIG Meetup',
            },
            {
              location: '北京',
              activeName: 'openEuler Backup Meetup',
            },
            {
              location: '东莞',
              activeName: '人才与服务 Meetup',
            },
            {
              location: '线上',
              activeName: 'BigData & Arm Meetup',
            },
          ],
        },
        {
          month: '8',
          actives: [
            {
              location: '杭州',
              activeName: 'openEuler RISC-V SIG开发者日与杭州Meetup',
            },
            {
              location: '苏州',
              activeName: 'openEuler DPU Meetup',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: '广州',
              activeName: 'openEuler Embedded Meetup',
            },
          ],
        },
        {
          month: '10',
          actives: [
            {
              location: '杭州',
              activeName: 'openEuler 操作系统安全 Meetup',
            },
            {
              location: '北京',
              activeName: 'openEuler SDS Meetup',
            },
          ],
        },
      ],
    },
    college: {
      title: '社区&高校',
      contentBg: college,
      titleBg: collegeTitle,
      id: 'college',
      actives: [
        {
          activeName: ' 全年 开源实习',
          startTime: 1,
          endTime: 12,
          activelink: '/zh/internship/',
        },
        {
          activeName: ' 1月-3月 FOSSASIA CodeHeat',
          startTime: 1,
          endTime: 3,
          activelink: 'https://codeheat.org/',
        },
        {
          activeName: ' 1月 - 7月  开放原子开源大赛',
          startTime: 1,
          endTime: 7,
          activelink: 'https://competition.atomgit.com/competition',
        },
        {
          activeName: ' 6月 - 10月 第四届开源之夏',
          activelink: 'https://summer-ospp.ac.cn/',
          startTime: 6,
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
              location: 'Barcelona, Spain',
              activeName:
                '2024 openEuler Global Ecosystem Collaboration Workshop',
              href: 'https://www.youtube.com/watch?v=DFQ1-u11uqg&list=PLtDfk9jvMAzgu0w75z2k2u-n9XkrWCDVC',
            },
          ],
        },
        {
          month: '3',
          actives: [
            {
              location: 'Paris, France',
              activeName: 'KubeCon EU',
              href: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: 'Hanoi, Vietnam',
              activeName: 'FOSSASIA 2024',
              href: 'https://www.youtube.com/playlist?list=PLtDfk9jvMAzjaWscsLJaO-jxRmAVwVGTh',
            },
          ],
        },
        {
          month: '5',
          actives: [
            {
              location: 'Madrid, Spain',
              activeName: 'Linaro Connect',
              href: 'https://youtu.be/1bRrCsrPKbk?si=gFM5JPnRH5oaIxym',
            },
          ],
        },
        {
          month: '6',
          actives: [],
        },
        {
          month: '7',
          actives: [],
        },
        {
          month: '8',
          actives: [
            {
              location: 'Shanghai, China',
              activeName: 'GOTC',
              href: 'https://gotc.oschina.net/?from=wap',
            },
            {
              location: 'Hangzhou, China',
              activeName: 'RISC-V Day',
              href: 'https://riscv.org/event/risc-v-china-summit/',
            },
            {
              location: 'Hong Kong, China',
              activeName: 'KubeCon China',
              href: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-open-source-summit-ai-dev-china/',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: 'Suwon, South Korea',
              activeName: 'OpenInfra Summit Asia',
              href: 'https://2024.openinfraasia.org/',
            },
            {
              location: 'Vienna, Austria',
              activeName: 'OSS EU',
              href: 'https://events.linuxfoundation.org/open-source-summit-europe/',
            },
          ],
        },
        {
          month: '11',
          actives: [
            {
              location: 'Beijing, China',
              activeName: 'Operating System Conference & openEuler Summit 2024',
              href: '/en/interaction/summit-list/summit2024/',
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
              location: 'Tokyo, Japan',
              activeName: 'OpenChain X openEuler Workshop',
              href: 'https://www.youtube.com/playlist?list=PLtDfk9jvMAzjYGqaeMYFUufxnnCdCibni',
            },
            {
              location: 'Shanghai, China',
              activeName: 'KCD',
              href: 'https://community.cncf.io/events/details/cncf-kcd-shanghai-presents-kcd-shanghai-2024/',
            },
          ],
        },
        {
          month: '4',
          actives: [
            {
              location: "Xi'an, China",
              activeName: 'eBPF Developer Conference',
            },
          ],
        },
        {
          month: '7',
          actives: [
            {
              location: 'Beijing, China',
              activeName: 'openEuler SIG Gathering 2024',
              href: '/en/interaction/summit-list/sig-gathering-2024/',
            },
          ],
        },
        {
          month: '9',
          actives: [
            {
              location: 'Shanghai, China',
              activeName: 'HC 2024',
            },
          ],
        },
        {
          month: '10',
          actives: [
            {
              location: 'Changsha, China',
              activeName: "1024 Programmer's Day",
            },
            {
              location: 'TBD',
              activeName: 'CLK/CID',
            },
          ],
        },
        {
          month: '12',
          actives: [],
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
      time: '5.30',
      content: '24.03 LTS',
      href: '/download/?version=openEuler%2024.03%20LTS',
      month: 5,
    },
    {
      time: '6.30',
      content: '22.03 LTS SP4',
      month: 6,
      href: '/download/?version=openEuler%2022.03%20LTS%20SP4',
    },
    {
      time: '9.30',
      content: '24.09',
      month: 9,
    },
    {
      time: '12.30',
      content: '24.03 LTS SP1',
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

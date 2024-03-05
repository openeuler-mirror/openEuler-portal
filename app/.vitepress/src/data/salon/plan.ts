import opensoucrce from '@/assets/category/year-plan/opensoucrce.png';
import opensoucrceTitle from '@/assets/category/year-plan/opensoucrce-title.png';
import ecology from '@/assets/category/year-plan/ecology.png';
import ecologyTitle from '@/assets/category/year-plan/ecology-title.png';
import developer from '@/assets/category/year-plan/developer.png';
import developerTitle from '@/assets/category/year-plan/developer-title.png';
import college from '@/assets/category/year-plan/college.png';
import collegeTitle from '@/assets/category/year-plan/college-title.png';
import edition from '@/assets/category/year-plan/edition.png';
import editionTitle from '@/assets/category/year-plan/edition-title.png';

export const yearPlan = {
  opensoucrce: {
    title: '开源顶会',
    contentBg: opensoucrce,
    titleBg: opensoucrceTitle,
    id: 'opensoucrce',
    events: [
      {
        month: '2',
        actives: [
          {
            location: '法国',
            activeName: 'MWC Barcelona',
          },
        ],
      },
      {
        month: '3',
        actives: [
          {
            location: '法国',
            activeName: 'KubeCon EU',
          },
        ],
      },
      {
        month: '4',
        actives: [
          {
            location: '越南',
            activeName: 'FOSSASIA 2024',
          },
        ],
      },
      {
        month: '5',
        actives: [
          {
            location: '西班牙',
            activeName: 'Linaro connect',
          },
          {
            location: '深圳',
            activeName: '开放原子开发者大会 openEuler Developer Day',
          },
        ],
      },
      {
        month: '6',
        actives: [
          {
            location: '上海',
            activeName: 'GOTC',
          },
          {
            location: '香港',
            activeName: 'KubeCon China',
          },
        ],
      },
      {
        month: '8',
        actives: [
          {
            location: 'TBD',
            activeName: 'RISC-V Summit China',
          },
        ],
      },
      {
        month: '9',
        actives: [
          {
            location: '韩国',
            activeName: 'OpenInfra Summit Asia ',
          },
          {
            location: '奥地利',
            activeName: 'OSS EU',
          },
        ],
      },
      {
        month: '11',
        actives: [
          {
            location: '北京',
            activeName: '开放原子开源峰会',
          },
        ],
      },
      {
        month: '12',
        actives: [
          {
            location: 'TBD',
            activeName: 'OpenInfra Day ',
          },
          {
            location: '北京',
            activeName: '操作系统峰会 openEuler Summit',
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
            location: '日本',
            activeName: 'Workshop',
          },
        ],
      },
      {
        month: '4',
        actives: [
          {
            location: '上海',
            activeName: 'KCD',
          },
          {
            location: '西安',
            activeName: '第二届 eBPF 开发者大会',
          },
        ],
      },
      {
        month: '9',
        actives: [
          {
            location: '上海',
            activeName: 'HC 2024',
          },
        ],
      },
      {
        month: '10',
        actives: [
          {
            location: '长沙',
            activeName: '1024',
          },
          {
            location: 'TBD',
            activeName: 'CLK/CID',
          },
        ],
      },
      {
        month: '12',
        actives: [
          {
            location: '上海',
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
          },
          {
            location: '成都',
            activeName: 'G11N&Docs Meetup',
          },
          {
            location: '线上',
            activeName: '天翼云创新项目',
          },
          {
            location: '线上',
            activeName: '基于ebpf的应用层网络管控',
          },
        ],
      },
      {
        month: '4',
        actives: [
          {
            location: '线上',
            activeName: 'UniProton on RISCV',
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
        activeName: ' 5月 - 10月 “互联网 +”鲲鹏应用创新大赛',
        startTime: 5,
        endTime: 10,
        activelink:
          'https://www.hikunpeng.com/developer/contests/kunpeng-competition2023',
      },
      {
        activeName: ' 1月 - 7月 开放原子大赛',
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
} as any;
export const editionData = {
  title: '版本发布计划',
  contentBg: edition,
  titleBg: editionTitle,
  id: 'edition',
  actives: [
    {
      time: '5.30',
      content: '24.03 LTS',
      month: 5,
    },
    {
      time: '6.30',
      content: '22.03 LTS SP4',
      month: 6,
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

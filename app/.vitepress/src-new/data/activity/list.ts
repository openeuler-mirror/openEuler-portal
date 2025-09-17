import beijing from '~@/assets/category/user-group/city/beijing.jpg';
import beijingMb from '~@/assets/category/event/city/beijing-mb.jpg';
import beijingDetail from '~@/assets/category/event/list/beijing-detail.jpg';

import tianjin from '~@/assets/category/user-group/city/tianjin.jpg';
import tianjinMb from '~@/assets/category/event/city/tianjin-mb.jpg';
import detail_250524 from '~@/assets/category/event/list/250524.jpg';

import chengdu from '~@/assets/category/user-group/city/chengdu.jpg';
import chengduMb from '~@/assets/category/event/city/chengdu-mb.jpg';
import detail_250527 from '~@/assets/category/event/list/250527.jpg';

import shenzhen from '~@/assets/category/user-group/city/shenzhen.jpg';
import shenzhenMb from '~@/assets/category/event/city/shenzhen-mb.jpg';
import detail_250612 from '~@/assets/category/event/list/250612.jpg';

import xianggang from '~@/assets/category/user-group/city/xianggang.jpg';
import xianggangMb from '~@/assets/category/event/city/xianggang-mb.jpg';
import detail_250718 from '~@/assets/category/event/list/250718.jpg';

import detail_250822 from '~@/assets/category/event/list/250822.jpg';
import detail_250905 from '~@/assets/category/event/list/250905.jpg';

import wuhan from '~@/assets/category/user-group/city/wuhan.jpg';
import wuhanMb from '~@/assets/category/event/city/wuhan-mb.jpg';
import detail_250925 from '~@/assets/category/event/list/250925.jpg';

import xian from '~@/assets/category/user-group/city/xian.jpg';
import xianMb from '~@/assets/category/event/city/xian-mb.jpg';
import detail_250926 from '~@/assets/category/event/list/250926.jpg';

export const EventSeries = new Map([
  [
    'all',
    {
      value: '',
      label: {
        zh: '全部',
        en: 'All',
      },
    },
  ],
  [
    '1',
    {
      value: '1',
      label: {
        zh: '国际开源会议',
        en: 'Open Source Summits',
      },
    },
  ],
  [
    '2',
    {
      value: '2',
      label: {
        zh: '生态技术会议',
        en: 'Ecosystem Tech Conferences',
      },
    },
  ],
  [
    '3',
    {
      value: '3',
      label: {
        zh: 'Call for X 开发者活动',
        en: 'Call for X 开发者活动',
      },
    },
  ],
  [
    '4',
    {
      value: '4',
      label: {
        zh: '赛事 & 高校',
        en: '赛事 & 高校',
      },
    },
  ],
  [
    '5',
    {
      value: '5',
      label: {
        zh: '版本发布计划',
        en: 'Release Plan',
      },
    },
  ],
  [
    '6',
    {
      value: '6',
      label: {
        zh: '其他',
        en: 'Other',
      },
    },
  ],
]);

export const EventState = new Map([
  [
    0,
    {
      value: 0,
      label: {
        zh: '全部',
        en: 'All',
      },
    },
  ],
  [
    2,
    {
      value: 2,
      label: {
        zh: '进行中',
        en: 'Ongoing',
      },
    },
  ],
  [
    1,
    {
      value: 1,
      label: {
        zh: '已结束',
        en: 'Completed',
      },
    },
  ],
]);

export const MEETUP_DATA = {
  zh: [
    {
      id: 8,
      title: 'openEuler Meetup X openGauss Meetup \n西安站',
      date: '2025-09-26 14:00-17:30',
      activity_type: 2,
      synopsis:
        'openEuler开源社区与openGauss开源社区携手陕西鲲鹏创新中心、西北工业大学，将于西安举办Meetup。本次活动聚焦操作系统与数据库两大核心领域，围绕openEuler与openGauss的最新技术进展、内核优化实践、AI融合创新以及鲲鹏生态赋能等热点话题，邀请资深技术专家与开发者进行深度分享与交流。',
      address: '西安软件新城二期C2座3F陕西华为联合学院多功能厅',
      city: '西安市',
      isAdditional: true,
      posterImg: xian,
      posterImgMb: xianMb,
      series: '3',
      detail_img: detail_250926,
      signup_url: 'https://openatomcon.openatom.cn/registration/?activityNo=HD20250915103542',
      signup_url_mb: 'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20250915103542',
    },
    {
      id: 7,
      title: 'openEuler云原生开源中间件Meetup 武汉站',
      date: '2025-09-25 13:45-17:00',
      activity_type: 2,
      synopsis:
        '9月25日，openEuler社区联合东方通、武汉职业技术大学联合将在武汉职业技术大学举办以“轻舟泛海，云翼冲天”为主题的Meetup。此次交流活动特邀多位业内专家，分享实战案例与前沿技术解析，为技术爱好者、行业从业者、高校学生等加油充电，深化技术交流与学习，同时还将进行实习宣讲互动，为高校学生解读东方通开源实习项目，提供更多宝贵的实践机会。',
      address: '武汉职业技术大学关山校区-凌峰楼C11',
      city: '武汉市',
      isAdditional: true,
      posterImg: wuhan,
      posterImgMb: wuhanMb,
      series: '3',
      detail_img: detail_250925,
      signup_url: 'https://openatomcon.openatom.cn/registration/?activityNo=HD20250909090628',
      signup_url_mb: 'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20250909090628',
    },
    {
      id: 6,
      title: 'openEuler 多样性算力Meetup北京站',
      date: '2025-09-06 13:00-17:00',
      activity_type: 1,
      synopsis:
        'openEuler多样性算力 Meetup 将在北京举办，诚邀开发者、企业技术专家及开源爱好者共同参与！openEuler 社区长期致力于推动开源操作系统的发展，构建繁荣的软件生态体系。本次 Meetup 北京站将进一步聚焦多样性算力，汇聚各方力量，深入交流创新实践与技术成果，携手推动多样性算力的落地与生态繁荣。',
      address: '北京海淀区中关村北理工亚朵S酒店3楼精工厅',
      city: '北京市',
      isAdditional: true,
      posterImg: beijing,
      posterImgMb: beijingMb,
      series: '3',
      detail_img: detail_250905,
      new_url: 'https://www.openeuler.org/zh/news/20250909-multi-computing-meetup-review/20250909-multi-computing-meetup-review.html',
    },
    {
      id: 5,
      title: 'openEuler SIG-Long 异构融合技术Meetup北京站',
      date: '2025-08-22 14:00-17:30',
      activity_type: 1,
      synopsis:
        '本次活动以异构融合技术为核心，特邀多位来自北京大学、北京航空航天大学、京东、Intel、华为的技术专家，深入探讨异构融合技术的发展与落地。openEuler sig-Long 致力于构建异构融合计算基础设施框架，实现算力统一接入、异构融合内存、异构融合虚拟化、算力切分、资源优先级配置、弹性迁移等关键能力。',
      address: '北京中关村皇冠假日酒店四层会议室8',
      city: '北京市',
      isAdditional: true,
      posterImg: beijing,
      posterImgMb: beijingMb,
      series: '3',
      detail_img: detail_250822,
      new_url: 'https://www.openeuler.org/zh/news/20250826-sig-long-review/20250826-sig-long-review.html',
    },
    {
      id: 4,
      title: 'openEuler SIG-ARM Meetup 深圳站',
      date: '2025-07-18 14:00-17:30',
      activity_type: 1,
      synopsis:
        '本场Meetup是openEuler Arm SIG 年度技术聚会。我们将汇聚Arm生态头部芯片厂商与软件巨头嘉宾，深度剖析openEuler在Arm架构的最新性能优化与创新实践，并带来云原生/AI等关键负载在Arm服务器上的迁移、部署与调优实战指南。活动聚焦核心挑战，分享数据库、中间件等关键基础软件栈的Arm适配经验与解决方案，并探讨Arm服务器生态的未来趋势与标准化进展。',
      address: '南山区海天一路软件产业基地4栋B座1楼 禾木HOMEY SPACE（雅禾厅）',
      city: '深圳市',
      isAdditional: true,
      posterImg: shenzhen,
      posterImgMb: shenzhenMb,
      series: '3',
      detail_img: detail_250718,
      signup_url: 'https://openatomcon.openatom.cn/registration/?activityNo=HD20250701103704',
      signup_url_mb: 'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20250701103704',
    },
    {
      id: 3,
      title: 'openEuler Meetup 香港站',
      date: '2025-06-12 14:00-17:00',
      activity_type: 1,
      synopsis:
        'openEuler首次香港线下meetup，该活动由香港开源高校联盟OSCA-HK协办，邀请来自openEule社区运营组组长、SIG maintainer、RustSBI Maintainer以及香港城市大学数据科学系博士后为大家带来openEuler开源社区进展与香港高校科研进展等。',
      address: '香港城市大学杨建文学术楼G4702',
      city: '中国 香港',
      isAdditional: true,
      posterImg: xianggang,
      posterImgMb: xianggangMb,
      series: '3',
      detail_img: detail_250612,
    },
    {
      id: 2,
      title: 'openEuler云原生开源中间件Meetup天津站',
      date: '2025-05-27 14:00-17:30',
      activity_type: 1,
      synopsis:
        '由openEuler社区、东方通、天津职业技术师范大学联合举办的“轻舟泛海，云翼冲天·openEuler云原生开源中间件”为主题的Meetup将在天津职业技术师范大学举办。此次交流活动特邀多位业内专家，分享实战案例与前沿技术解析，为技术爱好者、行业从业者、高校学生等加油充电，深化技术交流与学习，同时还将进行实习宣讲互动，为高校学生解读东方通开源实习项目，提供更多宝贵的实践机会。',
      address: '天津职业技术师范大学（天津市津南区）',
      city: '天津市',
      isAdditional: true,
      posterImg: tianjin,
      posterImgMb: tianjinMb,
      series: '3',
      detail_img: detail_250527,
      new_url: '/zh/news/20250530-dft/20250530-dft.html',
    },
    {
      id: 1,
      title: 'openEuler & deepin Meetup成都站',
      date: '2025-05-24 14:00-17:30',
      activity_type: 1,
      synopsis:
        '在开源技术领域，开源生态建设一直是众多从业者共同关注的话题。为了深入探讨开源生态的发展之道，一场聚焦「开源生态共建」的技术聚会将在成都・菁蓉汇启幕 ──  由  openEuler 社区和deepin（深度） 社区与联合主办，如意玲珑社区承办的openEuler & deepin Meetup成都站 ，邀你成为开源生态版图的「共建者」，无论你是刚踏入开源的「萌新」，还是深耕技术的「老炮」，希望本次活动都能为你带来新的技术视角与灵感。',
      address: '四川省成都市原岛酒店（环球中心新会展店）5楼3号会议室',
      city: '成都市',
      isAdditional: true,
      posterImg: chengdu,
      posterImgMb: chengduMb,
      series: '3',
      detail_img: detail_250524,
      new_url: '/zh/news/20250530-deepin1/20250530-deepin1.html',
      signup_url:
        'https://openatomcon.openatom.cn/registration/?activityNo=HD20250513141929',
      signup_url_mb:
        'https://openatomcon.openatom.cn/registration_mobile/?activityNo=HD20250513141929',
    },
    {
      id: 1000,
      title: 'openEuler on RISC-V & deepin Meetup-北京站',
      date: '2025-03-22 14:00-17:00',
      activity_type: 1,
      synopsis:
        'openEuler与deepin双社区联合打造AI×RISC-V深度探索之旅！你是否想了解 RISC-V架构的最新进展？是否想探索Linux桌面应用的新体验？是否对AI与操作系统的融合充满好奇？3月22日，OpenAtom openEuler（简称"openEuler"）社区与deepin（深度）社区将联合联合打造AI×RISC-V深度探索之旅！本次活动聚焦AI、RISC-V等前沿技术，邀请多位行业专家现场分享实践经验，无论你是RISC-V爱好者、AI技术探索者，还是Linux 开源社区参与者，都将为你带来新的技术视角与灵感。',
      address: '北京市海淀区中国科学院软件研究所5号楼四层大报告厅',
      city: '北京市',
      isAdditional: true,
      posterImg: beijing,
      posterImgMb: beijingMb,
      series: '3',
      detail_img: beijingDetail,
      new_url: '/zh/news/openEuler/20250308-ddepin3/20250308-ddepin3.html',
    },
  ],
  en: [],
};

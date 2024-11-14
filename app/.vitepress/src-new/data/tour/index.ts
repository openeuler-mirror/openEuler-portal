import stepHomeImg from '~@/assets/category/tour/step-home.png';

import stepQuickEntranceImg from '~@/assets/category/tour/light/step-quick-entrance.png';
import stepPlayCommunityImg from '~@/assets/category/tour/light/step-play-community.png';
import stepDeveloperCalendarImg from '~@/assets/category/tour/light/step-developer-calendar.png';
import stepUserCaseImg from '~@/assets/category/tour/light/step-user-case.png';
import stepDynamicImg from '~@/assets/category/tour/light/step-dynamic.png';

import stepQuickEntranceImgDark from '~@/assets/category/tour/dark/step-quick-entrance.png';
import stepPlayCommunityImgDark from '~@/assets/category/tour/dark/step-play-community.png';
import stepDeveloperCalendarImgDark from '~@/assets/category/tour/dark/step-developer-calendar.png';
import stepUserCaseImgDark from '~@/assets/category/tour/dark/step-user-case.png';
import stepDynamicImgDark from '~@/assets/category/tour/dark/step-dynamic.png';

import stepIcon from '~@/assets/category/tour/step-logo.png';

import stepDownloadImg from '~@/assets/category/tour/step-download.png';
import stepLearnImg from '~@/assets/category/tour/step-learn.png';
import stepDevelopmentImg from '~@/assets/category/tour/step-development.png';
import stepApproveImg from '~@/assets/category/tour/step-approve.png';
import stepCommunityImg from '~@/assets/category/tour/step-community.png';
import stepUpdateImg from '~@/assets/category/tour/step-update.png';
import stepToolImg from '~@/assets/category/tour/step-tool.png';
import stepFooterImg from '~@/assets/category/tour/step-footer.png';
import stepFeedbackImg from '~@/assets/category/tour/step-feedback.png';

import i18n from '~@/i18n';

const { t } = i18n.global;

export const FIRST_TOUR_STEPS = [
  {
    bg: stepHomeImg,
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: 'Hi，朋友们，欢迎访问openEuler官网！',
    desc: [
      'openEuler是面向数字基础设施的开源操作系统。openEuler网站作为社区对外展示的重要窗口，一直致力于为开发者提供一个易于分享、交流、查询社区各类资源的平台，包括但不限于版本信息、软件包、工具、文档、活动、技术博客等',
    ],
    extra: [
      '结合年度用户满意度调查，我们对openEuler网站进行升级，以期待提升朋友们的使用体验',
    ],
  },
];

export const NEW_CHANGE_DATA = {
  title: '欢迎使用',
  icon: stepIcon,
  desc: '首先，让我们来看看网站首页上都有哪些变化？',
  list: ['快速入口', '玩转社区', '开发者日历', '用户案例', '社区动态'],
};

export const NEW_CHANGE_TOUR_STEPS = [
  {
    bg: {
      light: stepQuickEntranceImg,
      dark: stepQuickEntranceImgDark,
    },
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: '看这里，看这里~',
    desc: ['您可以快速找到技术白皮书、安全中心、迁移运营、活动等关键信息'],
    extra: [],
  },
  {
    bg: {
      light: stepPlayCommunityImg,
      dark: stepPlayCommunityImgDark,
    },
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: '新增“玩转社区”的楼层，帮助您快速获取openEuler、参与社区贡献！',
    desc: [],
    extra: [],
  },
  {
    bg: {
      light: stepDeveloperCalendarImg,
      dark: stepDeveloperCalendarImgDark,
    },
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: '通过开发者日历，您可以快速找到并参加感兴趣的SIG例会、Meetup等活动',
    desc: [],
    extra: [],
  },
  {
    bg: {
      light: stepUserCaseImg,
      dark: stepUserCaseImgDark,
    },
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: '在这里，您可以找到openEuler在不同行业的解决方案、用户案例',
    desc: [
      '我们也非常欢迎您分享使用openEuler的案例故事，为更多有需要的朋友提供参考。联系：user@openeuler.sh',
    ],
    extra: [],
  },
  {
    bg: {
      light: stepDynamicImg,
      dark: stepDynamicImgDark,
    },
    target: '',
    color: '',
    placement: '',
    href: '/',
    title: 'openEuler的动态和博客搬到这里了',
    desc: ['我们也十分欢迎开发者展示您的实践经验，帮助更多有需要的朋友'],
    extra: [],
  },
];

export const NEW_GUIDE_TOUR_STEPS = [
  {
    bg: stepDownloadImg,
    target: '#tour_headerNav_download',
    color: '#7596FE',
    placement: 'bottom',
    href: '/',
    title: '下载',
    desc: [
      '您可以找到openEuler发布的最新版本，并根据您的场景需求，选择对应的方式获取openEuler操作系统，软件中心、镜像仓列表等资源，也能在这里找到',
    ],
    extra: [],
  },
  {
    bg: stepLearnImg,
    target: '#tour_headerNav_learn',
    color: '#7798FE',
    placement: 'bottom',
    href: '/',
    title: '学习',
    desc: ['展示文档中心、课程、迁移与运维、技术展示等资源'],
    extra: [],
  },
  {
    bg: stepDevelopmentImg,
    target: '#tour_headerNav_development',
    color: '#7798FE',
    placement: 'bottom',
    href: '/',
    title: '开发',
    desc: ['提供构建、测试、发布等一系列开发者所需要的工具'],
    extra: [],
  },
  {
    bg: stepApproveImg,
    target: '#tour_headerNav_approve',
    color: '#7798FE',
    placement: 'bottom',
    href: '/',
    title: '支持',
    desc: ['提供兼容性测评、OSV技术测评、安全公告等资源'],
    extra: [],
  },
  {
    bg: stepCommunityImg,
    target: '#tour_headerNav_community',
    color: '#7798FE',
    placement: 'bottom',
    href: '/',
    title: '社区',
    desc: ['展示社区组织、社区章程、贡献、人才评定、社区交流方式等资源'],
    extra: [],
  },
  {
    bg: stepUpdateImg,
    target: '#tour_headerNav_update',
    color: '#7798FE',
    placement: 'bottom',
    href: '/',
    title: '动态',
    desc: ['查看社区新闻与技术博客等'],
    extra: [],
  },
  {
    bg: stepToolImg,
    target: '#tour_headerNav_tool',
    color: '#7798FE',
    placement: 'bottom',
    href: '/',
    title: '个人中心',
    desc: ['代码仓、语言和个人之中心入口在这里~'],
    extra: [],
  },
  {
    bg: stepFooterImg,
    target: '#tour_footer',
    color: 'var(--o-color-fill2)',
    placement: 'top',
    href: '/',
    title: 'Footer',
    desc: ['我们在Footer这里提供了一些快捷链接，方便朋友们的检索'],
    extra: [],
  },
  {
    bg: stepFeedbackImg,
    target: '#tour_feedback',
    color: 'var(--o-color-fill2)',
    placement: 'left',
    href: '/',
    title: '这里也可以查找社区交流方式',
    desc: ['点评一下，让我们知道', '如果您任何优化建议或疑问，欢迎联系我们'],
    extra: [],
  },
];

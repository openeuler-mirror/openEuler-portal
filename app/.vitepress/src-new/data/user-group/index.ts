import newyear_pc from '~@/assets/category/home/banner/new-year/pc.jpg';
import wechat from '~@/assets/category/user-group/common/wechat.png';
import member from '~@/assets/category/user-group/common/member.png';
import ambassador from '~@/assets/category/user-group/common/ambassador.png';
import coorganizer from '~@/assets/category/user-group/common/co-organizer.png';
import memberLogo from '~@/assets/category/user-group/common/member-logo.png';
import ambassadorLogo from '~@/assets/category/user-group/common/ambassador-logo.png';
import coorganizerLogo from '~@/assets/category/user-group/common/organizer-logo.png';

import detail_banner from '~@/assets/category/user-group/common/detail-banner.jpg';
import detail_banner_dark from '~@/assets/category/user-group/common/detail-banner-dark.jpg';
import detail_banner_mb from '~@/assets/category/user-group/common/detail-banner-mb.jpg';
import detail_banner_mb_dark from '~@/assets/category/user-group/common/detail-banner-mb-dark.jpg';

export const bannerData = {
  bg_pc: newyear_pc,
  title: 'openEuler 用户组',
  desc: '订阅 openEuler 用户组邮件列表，接收社区技术进展、用户组活动信息，参与用户组讨论',
  btn: '订阅邮件',
  href: 'https://mailweb.openeuler.org/postorius/lists/user-group@openeuler.org/',
};

export const guideData = {
  title: '欢迎来到 openEuler 用户组',
  subtitle1: '什么是用户组？',
  subtitle2: '加入用户组',
  desc1:
    'openEuler 用户组（openEuler User Group，简称oEUG）旨在为各区域openEuler用户、开发者构建一个开放多元的本地化交流圈子，在这里用户组成员可以基于openEuler的技术特性、使用经验、实践案例、社区贡献、开源文化等方面有更多集中的交流机会，共建openEuler区域用户生态。',
  desc2: '关注用户组邮件列表',
  desc3: '加入微信群',
  tip1: '添加openEuler小助手微信',
  tip2: '备注"xx用户组进群"',
  link1: 'user-group@openeuler.org',
  link2:
    'https://mailweb.openeuler.org/postorius/lists/user-group@openeuler.org/',
  mail: '订阅邮件',
  wechat: wechat,
};

export const introData = {
  title: '用户组成员角色、权益与义务',
  desc: '申请加入用户组审核通过后即为用户组Member角色，通过在用户组积极活跃与贡献，可晋升为Ambassador、 Co-organizer、 Organizer、OEVP等荣誉角色，并颁发相关证书',
  introList: [
    {
      title: [
        {
          name: 'Member',
          desc: '会员，参与组内交流分享，参与活动，输出使用经验，提交用户反馈。',
        },
      ],
      background: member,
      logo: memberLogo,
      rights: [
        '获得openEuler相关赋能培训、学习资料',
        '用户诉求直接反馈到社区',
        '用户组活动参与机会',
      ],
      obligation: [
        '积极参加用户组活动',
        '体验或使用openEuler',
        {
          text: '输出用户案例',
          operation: '投递案例',
          url: 'https://gitee.com/openeuler/community/blob/master/zh/contributors/user-story-guideline.md',
        },
        {
          text: '反馈用户诉求',
          operation: '参与反馈',
          url: 'https://forum.openeuler.org/c/feedback/4',
        },
      ],
    },
    {
      title: [
        {
          name: 'Ambassador',
          desc: '传播大使，在公开活动或 线上平台分享 openEuler 内容，解答用户问题，利用自身影响力在行业中进行布道。',
        },
      ],
      background: ambassador,
      logo: ambassadorLogo,
      rights: [
        '以大使荣誉身份在官网展示、颁发证书',
        '获得社区纪念品',
        {
          text: '晋升社区',
          operation: 'oEVP',
          url: '/zh/community/program/join-oEVP/',
        },
      ],
      obligation: [
        '线下活动分享openEuler相关议题',
        '线上输出openEuler相关经验文章',
        '线上线下解答用户问题',
      ],
    },
    {
      title: [
        {
          name: 'Organizer',
          desc: '组织者，整体统筹和规划该城市用户组发展计划，引导策划运营活动，统筹日常运营工作。',
        },
        {
          name: 'Co-organizer',
          desc: '协助组织者角色。协助发展用户组成员，发起组织活动。',
        },
      ],
      background: coorganizer,
      logo: coorganizerLogo,
      rights: ['以组织者荣誉身份在官网展示、颁发证书', '获得社区纪念品'],
      obligation: [
        '制定用户组运营发展规划',
        '拓展用户组成员',
        {
          text: '一年至少发起组织一次用户组活动',
          operation: '举办活动',
          url: '/zh/interaction/event-list/collect/',
        },
      ],
    },
  ],
};

export const questionData = {
  title: '如何成为 openEuler 用户组Organizer、Ambassador？',
  desc1:
    '如您想申请成为某城市组的 Organizer 或 Ambassador，请将满足以上贡献要求或其他类型深度社区贡献的说明和举证材料（如照片、截图、链接等）发送至邮箱',
  desc2: '进行申请，社区运营工作组进行评审',
  mail: 'user@openeuler.sh',
  subtitle1: 'Organizer',
  intro1:
    'Organizer 是 openEuler 用户组的组织者和管理者，需要规划用户组发展、组织用户组活动。成为Organizer，需要是 openEuler 社区活跃的贡献者或用户，在所申请的城市有连接用户的资源，组织过至少一次 openEuler 相关的线下活动。',
  subtitle2: 'Ambassador',
  intro2:
    'Ambassador 是 openEuler 用户组内传播大使的角色，需要帮助解答用户疑问，分享传播 openEuler 的技术和实践经验。成为Ambassador，需要积极参与 openEuler 社区贡献和传播，包括但不限于以下任一贡献：',
  tip: [
    '在openEuler用户组社群、openEuler交流社群、openEuler论坛、邮件列表等交流渠道有效解答用户问题20次以上',
    '至少1次在公开的Meetup或峰会上分享openEuler相关议题',
    '在高校内讲openEuler相关课程',
    '在openEuler社区有代码贡献，提交过至少5个以上的PR并被社区合入',
  ],
};

export const detailData = {
  banner: detail_banner,
  banner_dark: detail_banner_dark,
  banner_mb: detail_banner_mb,
  banner_mb_dark: detail_banner_mb_dark,
};

export const linkData = {
  applyEvent: '/zh/interaction/event-list/collect/',
  provideCase:
    'https://gitee.com/openeuler/community/blob/master/zh/contributors/user-story-guideline.md',
};

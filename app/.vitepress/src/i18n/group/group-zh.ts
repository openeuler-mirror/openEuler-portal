import organizerImg from '@/assets/category/user-group/organizer.png';
import memberImg from '@/assets/category/user-group/member.png';
import ambassadorImg from '@/assets/category/user-group/ambassador.png';

export default {
  BANNER_TITLE: '城市用户组',
  BANNER_INTRODUCTION: '热衷实践 乐于分享 多元贡献',
  INTRODUCE:
    'openEuler用户组（openEuler User Group），简称oEUG，是为方便openEuler各区域用户及开发者交流openEuler技术、应用经验，拓展openEuler用户生态而成立的地域性组织。',
  LINK: 'http://wj.qq.com/s2/11736320/5eef/',
  LINK_TEXT: '申请加入',
  ROLE: '用户组角色',
  CARD_DATA: [
    {
      TITLE: 'Organizer',
      DESC: '组织者，整体统筹和规划该城市用户组发展计划，引导策划运营活动，统筹日常运营工作。',
      IMG: organizerImg,
    },
    {
      TITLE: 'Ambassador',
      DESC: '传播大使，在公开活动或 线上平台分享 openEuler 内容，解答用户问题，利用自身影响力在行业中进行布道。',
      IMG: ambassadorImg,
    },
    {
      TITLE: 'Member',
      DESC: '会员，参与组内交流分享，参与活动，输出使用经验，提交用户反馈。',
      IMG: memberImg,
    },
  ],
  RIGHT: '用户组成员权利和义务',
  RIGHT_DATA: [
    {
      TITLE: '加入用户组可以获得什么？',
      LIST: [
        '本地用户交流圈子',
        '区域活动参与机会',
        '个人/企业在区域的影响力',
        '入会证书&openEuler官网展示',
        '优秀成员年度社区礼包',
        '与社区专家连接的机会',
        '晋升为社区 oEVP 通道',
      ],
    },
    {
      TITLE: '加入用户组可以干什么？',
      LIST: [
        '参与当地用户组活动，或发起组织活动',
        '输出用户案例',
        '参与用户组社群内讨论交流，或在论坛帮助其他用户解决问题',
        '输出openEuler相关技术文章、使用经验帖子',
        '反馈用户需求',
        '参与社区贡献',
      ],
    },
  ],
  CERTIFIED: '认证成员',
  CERTIFIED_INTRODUCTION:
    'openEuler用户组成员申请加入后有两种状态，一种是申请通过社区审核后，即为用户组普通成员，可进入用户组社群；一种是认证成员，需要满足相应的认证条件，认证成员将会获得成员证书以及在官网用户组页面展示。',
  CERTIFIED_TEXT: '成为认证成员',
  ACTIVITY: '用户组活动',
};

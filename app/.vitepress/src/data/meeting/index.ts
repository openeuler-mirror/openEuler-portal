import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconWechat from '~icons/app/icon-wechat.svg';

export default [
  {
    title: 'SIG 组版本工作会议',
    des: '当一个版本发布完成后，openEuler 社区会召开关于下一个版本的开发规划会议，会议以 SIG 组为单位，集中探讨未来6个月的技术发展规划、工作事项、优先级等。该会议遵循开源开放原则，任何人均可申报需求，参与讨论。',
    btn: [
      {
        type: 'outline',
        postion: 'suffixIcon',
        text: '查看详情',
        icon: IconArrowRight,
        animation: true,
        url: '/zh/sig/meeting-guide/',
      },
    ],
  },
  {
    title: 'SIG 例会',
    des: 'openEuler SIG 组会定期组织线上会议，以便SIG成员了解各项目的进展与状态，推动交付成果输出，让其成为openEuler 发行的一部分或 openEuler 扩展包的一部分。',
    btn: [
      {
        type: 'outline',
        postion: 'suffixIcon',
        text: '查看预定方式',
        icon: IconArrowRight,
        animation: true,
        url: '/zh/blog/liuqi/2022-07-15-openeuler-miniprogram-guide.html',
      },
    ],
  },
  {
    title: '技术直播',
    des: 'openEuler 社区B站直播开放预约中，如果您想分享您的技术实践、项目成果、开源经验等，欢迎联系社区小助手（微信号：openeuler123）预定。',
    btn: [
      {
        type: 'text',
        postion: 'prefixIcon',
        icon: IconWechat,
        text: '社区小助手：openeuler123',
        animation: false,
        url: '',
      },
    ],
  },
  {
    title: '订阅邮件列表',
    des: '开发者可前往 SIG 中心 查看感兴趣的 SIG，订阅 SIG 邮件列表，随时获取各SIG组的会议动态。',
    btn: [
      {
        type: 'outline',
        postion: 'suffixIcon',
        text: '前往 SIG 中心',
        icon: IconArrowRight,
        animation: true,
        url: '/zh/sig/sig-list/',
      },
      {
        type: 'outline',
        postion: 'suffixIcon',
        text: 'SIG 邮件列表',
        animation: true,
        icon: IconArrowRight,
        url: '/zh/community/mailing-list/',
      },
    ],
  },
];

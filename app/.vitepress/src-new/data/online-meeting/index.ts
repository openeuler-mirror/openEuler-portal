import iconMeetingGuide from '~icons/online-meeting/icon-meeting-guide.svg';
import iconSigMeeting from '~icons/online-meeting/icon-sig-meeting.svg';
import iconLive from '~icons/online-meeting/icon-live.svg';
import iconMail from '~icons/online-meeting/icon-mail.svg';

export const participate = [
  {
    icon: iconMeetingGuide,
    title: '会议指南',
    desc: '当一个版本发布完成后，openEuler 社区会召开关于下一个版本的开发规划会议，会议以 SIG 组为单位，集中探讨未来6个月的技术发展规划、工作事项、优先级等。该会议遵循开源开放原则，任何人均可申报需求，参与讨论。',
    btn: [
      {
        text: '查看详情',
        url: '/zh/sig/meeting-guide/',
      },
    ],
  },
  {
    icon: iconSigMeeting,
    title: 'SIG 例会',
    desc: 'openEuler SIG 组会定期组织线上会议，以便SIG成员了解各项目的进展与状态，推动交付成果输出，让其成为openEuler 发行的一部分或 openEuler 扩展包的一部分。',
    btn: [
      {
        text: '查看预定方式',
        url: '/zh/blog/liuqi/2022-07-15-openeuler-miniprogram-guide.html',
      }
    ]
  },
  {
    icon: iconLive,
    title: '技术直播',
    desc: 'openEuler 社区B站直播开放预约中，如果您想分享您的技术实践、项目成果、开源经验等，欢迎联系社区小助手（微信号：openeuler123）预定。',
    text: '社区小助手：openeuler123',
    WeChat: true,
  },
  {
    icon: iconMail,
    title: '订阅邮件列表',
    desc: '开发者可前往 SIG 中心 查看感兴趣的 SIG，订阅 SIG 邮件列表，随时获取各SIG组的会议动态。',
    btn: [
      {
        text: '前往 SIG 中心',
        url: '/zh/sig/sig-list/',
      },
      {
        text: 'SIG 邮件列表',
        url: '/zh/community/mailing-list/',
      },
    ],
  },
];

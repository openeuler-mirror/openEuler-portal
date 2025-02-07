import iconMoreSig from '~icons/sig/more-sig.svg';
import iconOneSig from '~icons/sig/one-sig.svg';

export const typeOfMeeting = [
  {
    title: {
      zh: '单 SIG 组工作会议',
      en: 'Community Member',
    },
    icon: iconOneSig,
    intro: {
      zh: '单一 SIG 组内的工作会议，由该 SIG 组 Maintainer 进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等',
      en: '单一 SIG 组内的工作会议，由该 SIG 组 Maintainer 进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等',
    },
  },
  {
    title: {
      zh: '跨 SIG 组工作会议',
      en: 'Community Member',
    },
    icon: iconMoreSig,
    intro: {
      zh: '跨 SIG 组之间的协作工作会议，需要各相关 SIG 组 Maintainer 提前通过邮件或其他方式与版本规划会议组织者联系并沟通场地安排并由各相关 SIG 组 Maintainer 负责进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等',
      en: '单一 SIG 组内的工作会议，由该 SIG 组 Maintainer 进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等',
    },
  },
];

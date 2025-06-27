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
      zh: 'Working Group 工作会议',
      en: 'Community Member',
    },
    icon: iconMoreSig,
    intro: {
      zh: 'Working Group（跨 SIG 组）的协作工作会议，如有两个及以上的SIG组计划一起组织工作会议，需要各相关 SIG 组 Maintainer 提前沟通，确定一名组织者统筹该工作会议，包括但不限于议题收集、议程安排、主持讨论、会议纪要输出等',
      en: '单一 SIG 组内的工作会议，由该 SIG 组 Maintainer 进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等',
    },
  },
];

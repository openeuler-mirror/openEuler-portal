import roleDescCommitter from '~@/assets/category/sig/role-desc-committer.png';
import roledescContributor from '~@/assets/category/sig/role-desc-contributor.png';
import roleDescMaintainer from '~@/assets/category/sig/role-desc-maintainer.png';
import iconContributor from '~icons/sig/icon-contributor.svg';
import iconHadContributor from '~icons/sig/icon-had-contributor.svg';

import contributorPoint from '~@/assets/category/sig/contributor-point.png';
import contributorLight from '~@/assets/category/sig/contributor-light.png';
import contributorMbLight from '~@/assets/category/sig/contributor-mb-light.png';
import contributorDark from '~@/assets/category/sig/contributor-dark.png';
import contributorMbDark from '~@/assets/category/sig/contributor-mb-dark.png';

import committerPoint from '~@/assets/category/sig/committer-point.png';
import committeLight1 from '~@/assets/category/sig/committer-light1.png';
import committerDark1 from '~@/assets/category/sig/committer-dark1.png';
import committerMbLight1 from '~@/assets/category/sig/committer-mb-light1.png';
import committerMbDark1 from '~@/assets/category/sig/committer-mb-dark1.png';
import committerLight2 from '~@/assets/category/sig/committer-light2.png';
import committerDark2 from '~@/assets/category/sig/committer-dark2.png';
import committerMbLight2 from '~@/assets/category/sig/committer-mb-light2.png';
import committerMbDark2 from '~@/assets/category/sig/committer-mb-dark2.png';

import maintainerPoint from '~@/assets/category/sig/maintainer-point.png';
import maintainerLight from '~@/assets/category/sig/maintainer-light.png';
import maintainerDark from '~@/assets/category/sig/maintainer-dark.png';
import maintainerMbLight1 from '~@/assets/category/sig/maintainer-mb-light1.png';
import maintainerMbDark1 from '~@/assets/category/sig/maintainer-mb-dark1.png';
import maintainerMbLight2 from '~@/assets/category/sig/maintainer-mb-light2.png';
import maintainerMbDark2 from '~@/assets/category/sig/maintainer-mb-dark2.png';

export const communityMember = {
  title: {
    zh: '社区成员',
    en: 'Community Member',
  },
  subtitle: {
    zh: '大部分角色的职责限于这些 SIG(Special Interest Group)内；Maintainer 和 Committer 在 Gitee 的权限上不做区分，两者的区分主要是集中在 SIG 治理的管理范围上。\n详细可见下面的描述',
    en: 'The responsibilities of most contributor are limited to SIG (Special Interest groups). The permissions of Maintainer and Committer are the same on Gitee, and the difference lies in the scope of SIG governance. The detailed informationes are described below.',
  },
  viewDetail: {
    zh: '查看详情',
    en: 'Learn More',
  },
  types: [
    {
      bg: roledescContributor,
      name: {
        zh: '贡献者',
        en: 'Contributor',
      },
      responsibilitiy: {
        zh: '职责范围：项目的贡献者',
        en: 'Responsibilities: Contributors of the project',
      },
      href:'contributor'
    },
    {
      bg: roleDescCommitter,
      name: {
        zh: '审核者',
        en: 'Committer',
      },
      responsibilitiy: {
        zh: '职责范围：审核其他成员的贡献',
        en: 'Responsibilities: Review and approve the contributions submitted',
      },
      requirement: {
        zh: '要求：SIG 的积极贡献者，经验丰富，愿意投入精力参与到审核工作',
        en: 'Requirement: Frequently contributing to SIG, experienced,and willing to undertake review work',
      },
      href:'committer'
    },
    {
      bg: roleDescMaintainer,
      name: {
        zh: '维护者',
        en: 'Maintainer',
      },
      responsibilitiy: {
        zh: '职责范围：项目 Owner',
        en: 'Responsibilities: Owner of the project',
      },
      requirement: {
        zh: '要求：经验丰富，富有责任心、出色的技术能力和管理能力',
        en: 'Requirement：Experienced, responsible, outstanding technologies and management skills',
      },
      href:'maintainer'
    },
  ],
  cards: [
    {
      icon: iconContributor,
      name: {
        zh: '新的贡献者',
        en: 'New Contributor',
      },
      desc: {
        zh: '欢迎新成员加入社区。我们有关于如何开始贡献的指导文档请参考：<a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" target="_blank" rel="noopener noreferrer">openEuler 贡献</a>',
        en: 'Welcome to join the community. Start contributing by referring to: <a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" target="_blank" rel="noopener noreferrer">contribution guidience</a>',
      },
    },
    {
      icon: iconHadContributor,
      name: {
        zh: '既有社区成员',
        en: 'Existing Community Member',
      },
      desc: {
        zh: '既有的社区成员应证明能够遵守本文中的原则，熟悉 SIG 的组织、角色、政策、软件、约定等，以及相关的技术和/或写作能力。社区成员角色的期望、职责和要求，请参考下面的内容',
        en: `Existing community members should follow the principles in this article and be familiar with SIG's organization, roles, policies, software, and etc. At the same time, they should have corresponding technical and writing skills. The detailed informatione of responsibilities and requirements of the community member are described below.`,
      },
    },
  ],
};

export const contributor = {
  id: 'contributor',
  title: {
    zh: '贡献者 Contributor',
    en: 'Contributor',
  },
  subtitle: {
    zh: '贡献者是社区中持续活跃的贡献者，他们可以认领问题和 PR，可以参与 SIG 组活动，并且可以为 PR 提交前完成测试',
    en: 'Contributors are people who frequently contribute to the community. They take part in SIG group activities, resolve questions, review PR, and complete tests before submitting the PR.',
  },
  cardPointBg: contributorPoint,
  cards: [
    {
      bg: contributorLight,
      bgDark: contributorDark,
      bgMb: contributorMbLight,
      bgMbDark: contributorMbDark,
      title: {
        zh: '加入要求',
        en: 'Requirement',
      },
      desc: {
        zh: '贡献者 Contributor加入条件',
        en: '',
      },
      points: {
        zh: [
          'Gitee 上的注册会员',
          '为 SIG 或社区做出多方面贡献，包括不限于：在 Gitee 上提交或审核 PR；在 Gitee 上对问题进行归档或评论；参与 SIG 或社区讨论',
          '已阅读 <a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" target="_blank" rel="noopener noreferrer">贡献者指南</a>',
          '积极参与 1 个或多个 SIG',
        ],
        en: [
          'Registered member on Gitee',
          'Contribute to SIG or community in many ways, including but not limited to: Submitting or reviewing PR(Pull Request) on Gitee; Documenting or commenting issues on Gitee; Participating in SIG or community discussions.',
          'Read <a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" target="_blank" rel="noopener noreferrer">Contribution Guideline</a>',
          'Join one or more SIGs',
        ],
      },
    },
    {
      bg: contributorLight,
      bgDark: contributorDark,
      bgMb: contributorMbLight,
      bgMbDark: contributorMbDark,
      title: {
        zh: '责任与权益',
        en: 'Responsibility and Powers',
      },
      desc: {
        zh: '贡献者 Contributor的责任与权益',
        en: '',
      },
      notice: {
        zh: '注意：经常贡献代码的成员应积极的参与代码审查，并努力成为 SIG 的审核者 Committer',
        en: `Note: Contributors should actively take part in code review and if they'd like to help more, strive to be a Committer of SIG.`,
      },
      points: {
        zh: [
          '响应被分配的问题和 PR',
          '贡献的代码应该：经过良好的测试；能够让测试用例始终通过；解决后继发生的错误或问题',
          '可以分配问题或 PR',
        ],
        en: [
          'Respond to assigned issues and PR(Pull Request)',
          'Contributed code should satisfy the criteria described below: Well tested; Passing the test correctly and completely; Resolving subsequent errors or problems.',
          `Agree PR by executing '/ lgtm'`,
          'Assign issue or PR, ask members to comment by execting/assign @username',
          'Run PR test automatically. /ok-to-test is not necessary',
          'Operate the PR with needs-ok-to-test label by execting /ok-to-test and close PR by execting /close.',
        ],
      },
    },
  ],
};

export const committer = {
  id: 'committer',
  title: {
    zh: '审核者 Committer',
    en: 'Committer',
  },
  subtitle: {
    zh: '审核者能够在 SIG 或 SIG 的某些部分中审核代码的质量和正确性。审核者对代码库和软件工程原理非常了解\n定义：openEuler SIG 拥有的存储库中 sig-info.yaml 文件中的 Committer 条目',
    en: 'Committers can review the quality and correctness of code in SIG or some parts of SIG. Committers should have a good knowledge of code repository and software engineering principles.\nDefinition：developer entry in the OWNERS file owned by each SIG',
  },
  cardPointBg: committerPoint,
  cards: [
    {
      bg: committeLight1,
      bgDark: committerDark1,
      bgMb: committerMbLight1,
      bgMbDark: committerMbDark1,
      title: {
        zh: '加入要求',
        en: 'Requirement',
      },
      desc: {
        zh: '审核者 Committer加入条件',
        en: '',
      },
      points: {
        zh: [
          '作为贡献者至少 3 个月',
          '作为主要审阅者至少参与了 6 次 PR 的审阅',
          '审阅或合并至少 20 个基本 PR 到代码库',
          '熟悉代码库',
          '可以自我提名，或由该 SIG 的审核者或维护者提名',
        ],
        en: [
          'Have worked in openEuler for At least 3 months as contributors',
          'Participated in at least 6 PR reviews as the main reviewer',
          'Review or merge at least 30 PR into the code repo',
          'Being Familiar with code repo',
          'Can be self-nominated or nominated by the committers or maintainer of the SIG',
        ],
      },
    },
    {
      bg: committerLight2,
      bgDark: committerDark2,
      bgMb: committerMbLight2,
      bgMbDark: committerMbDark2,
      title: {
        zh: '责任与权益',
        en: 'Responsibility and Privilege',
      },
      desc: {
        zh: '审核者 Committer的责任与权益',
        en: '',
      },
      points: {
        zh: [
          '评审 PR：对 Contributor 提交的 PR 完成评审，评审可以参考社区的<a href="https://www.openeuler.org/zh/sig/role-description/">编程建议</a>和<a href="https://gitee.com/openeuler/security-committee/blob/master/guide/SecureCoding.md"  target="_blank" rel="noopener noreferrer">安全编程规范</a>。',
          '分发处理问题:请参考“<a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/issue-submit.md" target="_blank" rel="noopener noreferrer">问题处理流程</a>”',
          '跟踪依赖性问题：在开发分支中，其他 SIG 组的软件包的更新可能会到导致破坏本 SIG 内软件包的依赖关系。此时 Committer 会收到告警提示，Committer 应尽力重建软件包。依赖关系出错可能会使最终用户无法更新系统，打包团队也会介入并重建存在依赖性问题的软件包，但 Committer 不应依赖这些重建',
          '如有接口变更，通知可能会影响到的 SIG：其他 SIG 或项目会依赖本 SIG 的软件包，对软件包接口的变更可能会对他们造成影响。Committer 应了解并评审&决策变更造成的依赖影响，并公告和发送 API 或 ABI 变更的告警邮件。这类公告应在变更发生至少一周前完成，并应通知到所有可能受影响的 SIG。具体请参考<a href="https://www.openeuler.org/zh/sig/role-description/">接口变更通知流程</a>',
          '更新和维护软件包版本：遵守社区的<a href="https://www.openeuler.org/zh/sig/role-description/">软件包更新质量控制策略</a>完成软件包的更新',
          '和上游社区合作，包括：将所有变更推送到上游社区；参与上游社区邮件列表；获取上游社区的 bug 跟踪器的账户，并跟踪上游社区的重要 bug；将严重的错误转发给上游社区以寻求帮助，更多信息请参考“<a href="https://www.openeuler.org/zh/sig/role-description/">上游社区软件包管理建议</a>”',
          '和测试团队合作，包括：在提交软件包时，向质量检查人员提供如何调试/分类软件包的信息，以供问题的分类；提供基本功能的测试用例，用于测试回归；提交软件包更新时，提供有关更新中已经修复问题的测试用例，以供质量检查人员使用',
        ],
        en: [
          'Review PR：Review the PR submitted by contributor. The review can refer to community coding suggestions and <a href="https://gitee.com/openeuler/security-committee/blob/master/guide/SecureCoding_en.md" target="_blank" rel="noopener noreferrer">openEuler Secure Coding Guide</a>.',
          'Distribute and deal with problems:Please refer to <a href="https://gitee.com/openeuler/community/blob/master/en/contributors/issue-submit.md" target="_blank" rel="noopener noreferrer">Issue Submission and Handling Guide</a>.',
          `Tracking dependency issues：In the development branch, software package's dependencies in the SIG may be broken due to the software package updates in other SIG. At this time, the Committer will receive an alert. Then, the committer should try to rebuild the software package. Because dependency problem may prevent users from updating the system, the build team will also participates in rebuilding packages that have dependency issues, but the Maintainer should not rely on these works.`,
          'Notify SIG that may be affected due to interface changes：Because other SIGs or projects rely on software package of this SIG, changes to the package interface may affect them. Maintainer should review the dependency impact caused by decision changes. Then Maintainer should announce and send alert emails of API or ABI changes. Those work should be completed at least one week before the change occurs, and all SIGs that may be affected should be notified. For detailed informationes please refer to <a href="https://www.openeuler.org/en/sig/role-description/">API Change Notification Process</a>.',
          'Update and maintain package version：Follow the startegy of <a href="https://www.openeuler.org/en/sig/role-description/">Software Package Update Quality Control Policies</a> and complete the package update.',
          'Collaborate with upstream community, including: Push all changes to upstream community; Participate in upstream community mailing list; Get the account of the Bug Tracker of the upstream community, and track the important bugs of the upstream community; Push serious errors to upstream community for help For further information, please refer to <a href="https://www.openeuler.org/en/sig/role-description/">Upstream Software Package Management Suggestions</a>',
          'Collaborate with test team including: When you submit the software packages, the information how to debug and classify the packages should be provided to QA for problem classification; Provide basic functional test cases for regression testing; When you update the software package, the test cases related to fixed problems in the update package should be provided to QA',
        ],
      },
    },
  ],
};

export const maintainer = {
  id: 'maintainer',
  title: {
    zh: '维护者 Maintainer',
    en: 'Maintainer',
  },
  subtitle: {
    zh: '维护者是 SIG 组的组长或者管理委员会成员，也是软件包的维护者，能够像 Committer 一样审查和批准代码贡献。代码审查的重点是代码质量和正确性，而批准的重点是对贡献的整体接受度。所有 Committer 的责任与权力，Maintainer 均具有。除此之外，Maintainer 还承担了团队的技术路线、内外协调等工作\n定义：openEuler SIG 拥有的存储库中 sig-info.yaml 文件中的 Maintainer 条目',
    en: 'Maintainer is the leader of SIG group or member of management Committee, and also the maintainer of software package. They can review and approve code like committers. The key of code review is the code quality and correctness, while the approvals focus on overall acceptance of contributions. Maintainer has all the responsibility and privilege of Committer . In addition, Maintainer is also need to work out technical roadmap and undertake coordination within and outside the team.\nDefinition：developer entry in the OWNERS file owned by openEuler SIG.',
  },
  cardPointBg: maintainerPoint,
  cards: [
    {
      bg: maintainerLight,
      bgDark: maintainerDark,
      bgMb: maintainerMbLight1,
      bgMbDark: maintainerMbDark1,
      title: {
        zh: '加入要求',
        en: 'Requirement',
      },
      desc: {
        zh: '维护者 Maintainer加入条件',
        en: '',
      },
      points: {
        zh: [
          '作为审核者至少 3 个月',
          '作为主要审阅者至少参与了 12 次 PR 的审阅',
          '审阅或合并至少 30 个基本 PR 到代码库',
          '熟悉代码库',
          '可以自我提名，也可以由子项目 Maintainer 提名，并且没有其他子项目 Maintainer 的反对',
        ],
        en: [
          'At least 3 months as committer',
          'Participated in at least 12 PR reviews as the main reviewer',
          'Review or merge at least 30 basic PR into the code repo',
          'Being familiar with code repo',
          'Could be self-nominated or nominated by sub-project Maintainer, and there is no objection from other sub-project Maintainers.',
        ],
      },
    },
    {
      bg: maintainerLight,
      bgDark: maintainerDark,
      bgMb: maintainerMbLight2,
      bgMbDark: maintainerMbDark2,
      title: {
        zh: '责任与权益',
        en: 'Responsibility and Powers',
      },
      desc: {
        zh: '维护者 Maintainer的责任与权益',
        en: '',
      },
      points: {
        zh: [
          '确定 SIG 所负责项目的技术路线：包括规划和决策 SIG 技术方向、路标规划、架构演进。',
          '制定 SIG 所负责项目的发布计划：确定 SIG 的关键需求和发布计划；参与社区的 PM 活动，并协调 SIG 计划和社区版本的里程碑时间表匹配。',
          '参与社区协调活动：作为 SIG 的代表参与 openEuler 技术委员会或理事会组织的活动和特定会议等。',
          '召集 SIG 组会议：定期召集 SIG 会议，决策 SIG 内上升的争议',
        ],
        en: [
          'Work out technical roadmap for SIG project：Including planning the SIG technical direction, roadmap, solution of software architecture evolution',
          'Prepare release plan for SIG project: Make key requirements and release plans for project;Participate in community PM activities and coordinate SIG initiatives to match community release milestone schedules',
          'Participate in community coordination activities：As a representative of SIG, Maintainer should attend the meetings and activites organized by Technical committee or the Community Council',
          'Organize SIG meetings：Regularly organize SIG meetings and make decisions on contentious issues within SIG',
        ],
      },
    },
  ],
};

import exchangeSigIcon from '~icons/sig/exchange-sig.svg';
import joinSigIcon from '~icons/sig/join-sig.svg';
import operateSigIcon from '~icons/sig/operate-sig.svg';

import lookingSomeoneIcon from '~icons/sig/looking-someone.svg';
import applyForIcon from '~icons/sig/apply-for.svg';
import communicateIcon from '~icons/sig/communicate.svg';
import approvedIcon from '~icons/sig/approved.svg';
import improveIcon from '~icons/sig/improve.svg';
import operateIcon from '~icons/sig/operate.svg';
import meetingGuide from '~icons/sig/sig-meeting.svg';
import roleDescription from '~icons/sig/role-description.svg';

import meetingGuide_bg from '~@/assets/category/sig/meeting-guide_bg.png';
import roleDescription_bg from '~@/assets/category/sig/role-description_bg.png';

import architecturesProcessorsKernelDrivers from '~icons/sig/architectures-processors-kernel-drivers.svg';
import basicFunctionsFeaturesTools from '~icons/sig/basic-functions-features-tools.svg';
import buildSystemsToolsDependencies from '~icons/sig/build-systems-tools-dependencies.svg';
import cloudNativeInfrastructure from '~icons/sig/cloud-native-infrastructure.svg';
import communityEcosystemDevelopment from '~icons/sig/community-ecosystem-development.svg';
import communityFunctionalOrganizations from '~icons/sig/community-functional-organizations.svg';
import communityInfrastructure from '~icons/sig/community-infrastructure.svg';
import desktopEnvironments from '~icons/sig/desktop-environments.svg';
import industrySolutionsApplications from '~icons/sig/industry-solutions-applications.svg';
import softwarePackageManagement from '~icons/sig/software-package-management.svg';
import toolchainsLanguagesRuntimes from '~icons/sig/toolchains-languages-runtimes.svg';
import universalMiddleware from '~icons/sig/universal-middleware.svg';
import versionRelease from '~icons/sig/version-release.svg';

export const welcomeJoin = [
  {
    icon: operateSigIcon,
    title: {
      zh: '了解SIG运转',
      en: 'SIG Operations',
    },
    subtitle: {
      zh: 'SIG都是针对特定的一个或多个技术主题而成立的。SIG的核心成员主导SIG的治理，SIG内的成员推动交付成果输出，并争取让交付成果成为openEuler社区发行的一部分',
      en: 'An SIG is established for one or more specific technical topics. Core members of an SIG can manage each group, while SIG members collaborate to drive deliverable outcomes for the openEuler community.',
    },
  },
  {
    icon: exchangeSigIcon,
    title: {
      zh: '进行SIG交流',
      en: 'SIG Communication',
    },
    subtitle: {
      zh: '在SIG团队项目代码仓的README.md文件中，可以找到该项目所属的SIG信息和联系方式，欢迎通过邮件列表、公开例会及README.md 文件中提到的联系方式积极参与SIG交流',
      en: "You can find SIG information and contact details for any project in the README.md file of the SIG's code repository. We encourage active participation in SIG communications through mailing lists, public meetings, and other contact methods specified in README.md.",
    },
  },
  {
    icon: joinSigIcon,
    title: {
      zh: '参与SIG贡献',
      en: 'Contributing to SIGs',
    },
    subtitle: {
      zh: '每一个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个Repository，SIG的交付成果会保存在这些Repository内。您可以通过提交Issue或PR、会议讨论、检视代码等参与SIG贡献，详情请查看贡献指南',
      en: 'Each SIG maintains one or more projects on Gitee, with each project containing one or more repositories where SIG deliverables are stored. You can contribute to SIGs by submitting issues or pull requests, participating in discussions, conducting code reviews, and more. Refer to the contribution guide for details.',
    },
  },
];

export const aboutSig = [
  {
    icon: roleDescription,
    title: {
      zh: 'SIG角色说明',
      en: 'SIG Member Roles',
    },
    subtitle: {
      zh: '了解openEuler 社区贡献者的角色及其职责',
      en: 'Each contributor assumes distinct roles and responsibilities within the openEuler community.',
    },
    path: {
      zh: '/zh/sig/role-description/',
      en: '/en/sig/role-description/',
    },
    backgroud: roleDescription_bg,
  },
  {
    icon: meetingGuide,
    title: {
      zh: 'SIG会议指南',
      en: '',
    },
    subtitle: {
      zh: 'openEuler SIG工作会议是SIG成员根据SIG的规划发展定期召开的会议， 用于讨论技术方案、开发进度、问题解决及未来规划等，推动相关模块的持续发展和社区写作',
      en: '',
    },
    path: {
      zh: '/zh/sig/meeting-guide/',
      en: '',
    },
    backgroud: meetingGuide_bg,
  },
];

export const applicationProcess = [
  {
    icon: lookingSomeoneIcon,
    process: {
      zh: '寻人',
      en: 'Find',
    },
    detail: {
      zh: '个人或公司在openEuler社区中寻找2 - 3个具有共同目标的人讨论决定成立SIG组，维护openEuler社区中的某一个技术方向软件包或发起孵化项目',
      en: 'Find two or three people with shared goals in the openEuler community, whether as an individual or company, to discuss and set up a SIG that will maintain software packages in a specific technical area within the openEuler community or launch incubation projects.',
    },
  },
  {
    icon: applyForIcon,
    process: {
      zh: '申请',
      en: 'Apply',
    },
    detail: {
      zh: '按照成立 SIG 组的成立流程，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。',
      en: 'Create an application file on Gitee and initiate a pull request (PR) according to the procedure for setting up a SIG. Make an appointment for attending the Technical Committee (TC) meeting.',
    },
  },
  {
    icon: communicateIcon,
    process: {
      zh: '沟通',
      en: 'Discuss',
    },
    detail: {
      zh: '在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致。',
      en: 'At the regular TC meeting, discuss and reach an agreement on the technical scope and maintenance objectives of the SIG.',
    },
  },
  {
    icon: approvedIcon,
    process: {
      zh: '获批',
      en: 'Approve',
    },
    detail: {
      zh: '技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库。',
      en: 'The TC approves the establishment of the SIG. The corresponding PR is merged into the code repository, and the infrastructure automatically establishes the corresponding repository.',
    },
  },
  {
    icon: operateIcon,
    process: {
      zh: '运作',
      en: 'Operate',
    },
    detail: {
      zh: 'SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作。',
      en: 'The SIG starts to operate. Members use the mailing list and regular meetings for discussion and operation.',
    },
  },
  {
    icon: improveIcon,
    process: {
      zh: '改进',
      en: 'Improve',
    },
    detail: {
      zh: '技术委员会周期 Review SIG 的运作情况，给出指导意见。',
      en: 'The TC periodically reviews the SIG operation and provides guidance.',
    },
  },
];

export const landscapeIconMap = new Map([
  [
    'Basic Functions/Features/Tools',
    {
      icon: basicFunctionsFeaturesTools,
      color: {
        light: '#009ce5',
        dark: '#2fb2ea',
      },
    },
  ],
  [
    'Architectures/Processors/Kernel/Drivers',
    {
      icon: architecturesProcessorsKernelDrivers,
      color: {
        light: '#A129C',
        dark: '#BB55D1',
      },
    },
  ],
  [
    'buildSystemsToolsDependencies',
    {
      icon: buildSystemsToolsDependencies,
      color: {
        light: '#fa7305',
        dark: '#fb8f2b',
      },
    },
  ],
  [
    'Cloud Native Infrastructure',
    {
      icon: cloudNativeInfrastructure,
      color: {
        light: '#00b385',
        dark: '#27c298',
      },
    },
  ],
  [
    'Community Ecosystem Development',
    {
      icon: communityEcosystemDevelopment,
      color: {
        light: '#007af0',
        dark: '#3197f3',
      },
    },
  ],
  [
    'Community Functional Organizations',
    {
      icon: communityFunctionalOrganizations,
      color: {
        light: '#3d14bf',
        dark: '#7c64d9',
      },
    },
  ],
  [
    'Community Infrastructure',
    {
      icon: communityInfrastructure,
      color: {
        light: '#1f3fb3',
        dark: '#6183d1',
      },
    },
  ],
  [
    'Desktop Environments',
    {
      icon: desktopEnvironments,
      color: {
        light: '#A7C900',
        dark: '#B1d42a',
      },
    },
  ],
  [
    'Industry Solutions/Applications',
    {
      icon: industrySolutionsApplications,
      color: {
        light: '#e00070',
        dark: '#e62e84',
      },
    },
  ],
  [
    'Software Package Management',
    {
      icon: softwarePackageManagement,
      color: {
        light: '#70b31b',
        dark: '#8ac23e',
      },
    },
  ],
  [
    'Toolchains/Languages/Runtimes',
    {
      icon: toolchainsLanguagesRuntimes,
      color: {
        light: '#00A7B3',
        dark: '#27BAC2',
      },
    },
  ],
  [
    'Universal Middleware',
    {
      icon: universalMiddleware,
      color: {
        light: '#f0bc00',
        dark: '#f5ca50',
      },
    },
  ],
  [
    'Version Release',
    {
      icon: versionRelease,
      color: {
        light: '#e78900',
        dark: '#eca52f',
      },
    },
  ],
]);

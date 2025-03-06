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
    icon: exchangeSigIcon,
    title: {
      zh: '进行SIG交流',
      en: 'Engage in SIG Discussions',
    },
    subtitle: {
      zh: '在SIG团队项目的gitee首页README.md文件中，可以找到该项目所属的SIG信息、交流方式、成员和联系方式等，欢迎通过邮件列表、公开例会及对应的README.md 文件中提到的联系方式积极参与进SIG内的交流',
      en: 'In the README.md file on the project Gitee page, you can find project SIG information, members, and contact information. You can join specific SIGs by mailing the listed email addresses. Also, you can attend public meetings, join discussions or forums, or participate in other activities listed in the corresponding README.md file.',
    },
  },
  {
    icon: joinSigIcon,
    title: {
      zh: '参与SIG贡献',
      en: 'Contribute to SIGs',
    },
    subtitle: {
      zh: '每一个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个Repository，SIG的交付成果会保存在这些Repository内。您可以在SIG对应的Repository内提交Issue、针对特定问题参与讨论，提交和解决问题，参与评审等',
      en: 'Each SIG comprises one or more projects on Gitee, and each project has repositories that store SIG deliverables. Registering with an SIG enables you to submit, discuss, and resolve issues with other members, as well as participate in reviews in an SIG repository.',
    },
  },
  {
    icon: operateSigIcon,
    title: {
      zh: '推动SIG运转',
      en: 'Drive SIG Operations',
    },
    subtitle: {
      zh: 'SIG都是针对特定的一个或多个技术主题而成立的。SIG的核心成员主导SIG的治理，SIG内的成员推动交付成果输出，并争取让交付成果成为openEuler社区发行的一部分',
      en: 'An SIG is established for one or more specific technical topics. Core members of an SIG can manage each group, and members can contribute to the quality and the output of deliverables for the openEuler community.',
    },
  },
];

export const aboutSig = [
  {
    icon: roleDescription,
    title: {
      zh: 'SIG角色说明',
      en: 'SIG Community Member ',
    },
    subtitle: {
      zh: '了解openEuler 社区中贡献者角色的各种职责',
      en: 'Understand the various roles and responsibilities of contributors in the openEuler community.',
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
      zh: 'openEuler 开源社区按照不同的 SIG(Special Interests Group) 来组织开发及版本发布工作，openEuler 开源社区的主要技术产品通过 openEuler 开源操作系统承载，它在每年的 3 月和 9 月发布两个版本。当一个版本',
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
      en: 'Individuals or companies find two or three persons with common goals in the openEuler community to discuss and set up a SIG, which aims to maintain a specific type of software package in the openEuler community or to initiate an incubation project.',
    },
  },
  {
    icon: applyForIcon,
    process: {
      zh: '申请',
      en: 'Apply',
    },
    detail: {
      zh: '按照成立 SIG 组的{成立流程 process}，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。',
      en: 'Create an application file on Gitee and initiate a pull request (PR) according to the procedure for setting up a SIG. Make an appointment for attending the Technical Committee meeting.',
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
      en: 'At the regular Technical Committee (TC) meeting, discuss and reach an agreement on the technical scope and maintenance objectives of the SIG.',
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
      en: 'The TC approves the establishment of the SIG. The corresponding PR is integrated into the code repository, and the infrastructure automatically establishes the corresponding repository.',
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

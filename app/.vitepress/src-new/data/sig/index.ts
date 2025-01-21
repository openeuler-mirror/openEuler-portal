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
import sigGuidance from '~icons/sig/sig-guidance.svg';

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
      en: '',
    },
    subtitle: {
      zh: '在SIG团队项目的gitee首页README.md文件中，可以找到该项目所属的SIG信息、交流方式、成员和联系方式等，欢迎通过邮件列表、公开例会及对应的README.md 文件中提到的联系方式积极参与进SIG内的交流',
      en: '',
    },
  },
  {
    icon: joinSigIcon,
    title: {
      zh: '参与SIG贡献',
      en: '',
    },
    subtitle: {
      zh: '每一个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个Repository，SIG的交付成果会保存在这些Repository内。您可以在SIG对应的Repository内提交Issue、针对特定问题参与讨论，提交和解决问题，参与评审等',
      en: '',
    },
  },
  {
    icon: operateSigIcon,
    title: {
      zh: '推动SIG运转',
      en: '',
    },
    subtitle: {
      zh: 'SIG都是针对特定的一个或多个技术主题而成立的。SIG的核心成员主导SIG的治理，SIG内的成员推动交付成果输出，并争取让交付成果成为openEuler社区发行的一部分',
      en: '',
    },
  },
];

export const aboutSig = [
  {
    icon: roleDescription,
    title: {
      zh: 'SIG角色说明',
      en: '',
    },
    subtitle: {
      zh: '了解openEuler 社区中贡献者角色的各种职责',
      en: '',
    },
    path: {
      zh: '/zh/sig/role-description/',
      en: '/en/sig/role-description/',
    },
    backgroud: meetingGuide_bg,
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
    backgroud: roleDescription_bg,
  },
];

export const applicationProcess = [
  {
    icon: lookingSomeoneIcon,
    process: {
      zh: '寻人',
      en: '',
    },
    detail: {
      zh: '个人或公司在openEuler社区中寻找2 - 3个具有共同目标的人讨论决定成立SIG组，维护openEuler社区中的某一个技术方向软件包或发起孵化项目',
      en: '',
    },
  },
  {
    icon: applyForIcon,
    process: {
      zh: '申请',
      en: '',
    },
    detail: {
      zh: '按照成立 SIG 组的{成立流程 process}，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。',
      en: '',
    },
  },
  {
    icon: communicateIcon,
    process: {
      zh: '沟通',
      en: '',
    },
    detail: {
      zh: '在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致。',
      en: '',
    },
  },
  {
    icon: approvedIcon,
    process: {
      zh: '获批',
      en: '',
    },
    detail: {
      zh: '技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库。',
      en: '',
    },
  },
  {
    icon: operateIcon,
    process: {
      zh: '运作',
      en: '',
    },
    detail: {
      zh: 'SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作。',
      en: '',
    },
  },
  {
    icon: improveIcon,
    process: {
      zh: '改进',
      en: '',
    },
    detail: {
      zh: '技术委员会周期 Review SIG 的运作情况，给出指导意见。',
      en: '',
    },
  },
];

export const landscapeIconMap = new Map([
  ['Basic Functions/Features/Tools', basicFunctionsFeaturesTools],
  [
    'Architectures/Processors/Kernel/Drivers',
    architecturesProcessorsKernelDrivers,
  ],
  ['buildSystemsToolsDependencies', buildSystemsToolsDependencies],
  ['Cloud Native Infrastructure', cloudNativeInfrastructure],
  ['Community Ecosystem Development', communityEcosystemDevelopment],
  ['Community Functional Organizations', communityFunctionalOrganizations],
  ['Community Infrastructure', communityInfrastructure],
  ['Desktop Environments', desktopEnvironments],
  ['Industry Solutions/Applications', industrySolutionsApplications],
  ['Software Package Management', softwarePackageManagement],
  ['Toolchains/Languages/Runtimes', toolchainsLanguagesRuntimes],
  ['Universal Middleware', universalMiddleware],
  ['Version Release', versionRelease],
]);

export default {
  title: 'NestOS',
  subtitle: 'A cloud-foundation operating system based on openEuler',
  buttonTitle: 'Start NestOS',

  // Banner buttons
  downloadTitle: 'Get NestOS Resources',
  issueTitle: 'Feedback to NestOS',

  // Introduction
  introTitle: 'Introduction',
  introDesc1:
    'In the ever-evolving cloud-native world, containerization and virtualization technologies have become key components of modern application delivery and management. To meet this growing demand, NestOS officially launches a dual-mode version that integrates NestOS For Container and NestOS For Virt into a single ISO image, designed to meet the diverse needs of users in container and virtualization scenarios in cloud environments, focusing on delivering the best container host and virtualization solutions.',
  introDesc2:
    'NestOS-24.03-LTS has been released. Welcome to download and experience it, or submit an Issue to share your feedback with the NestOS community.',
  introDesc2Pre: 'NestOS-24.03-LTS has been released. Welcome to ',
  introDesc2Link1: 'download and try it',
  introDesc2Mid: '. If you have any feedback for NestOS, feel free to ',
  introDesc2Link2: 'submit an Issue',
  introDesc2Post: '.',
  moreInfo: 'More information:',
  infoLicense: 'License: Mulan PSL v2.',
  infoArch: 'Supported architectures: x86_64, aarch64.',
  infoOS: 'Based on: openEuler 22.03-LTS, 24.03-LTS series.',

  // Architecture
  archTitle: 'Architecture',

  // Version Introduction
  versionTitle: 'Version Introduction',
  nfcTitle: 'NestOS For Container',
  nfcSubtitle: 'Container-optimized edition',
  nfcDesc:
    'NestOS For Container (NFC, a variant of Fedora CoreOS in the openEuler community) integrates rpm-ostree support, ignition configuration and other technologies, adopts dual root filesystem and atomic update design, and uses nestos-assembler for quick integrated builds. It adapts to K8S, openStack and other platforms to optimize container operation noise, making cluster formation easy and enabling large-scale containerized workloads to run more securely.',
  nfvTitle: 'NestOS For Virt',
  nfvSubtitle: 'Virtualization-optimized edition',
  nfvDesc:
    'NestOS For Virt (NFV) is a version designed specifically for virtualization scenarios with pre-installed key virtualization components. It enables users to easily create and manage virtual machines with excellent virtualization performance across development, testing and production environments, while supporting various workloads on high-performance VMs with resource isolation and security.',

  // Key Features
  featuresTitle: 'Key Features',
  feature1Title: 'Kernel Enhancement',
  feature1Desc:
    'Independently maintaining the NestOS kernel branch with further feature enhancements for cloud scenarios based on the openEuler mainline version.',
  feature2Title: 'PilotGo Plugin-based O&M Platform',
  feature2Desc:
    'Provides customized O&M management functions and new architecture-aware plugin features specially designed for NestOS.',
  feature3Title: 'Cloud-native Integrated O&M Tool',
  feature3Desc:
    'nestos-kubernetes-deployer (NKD) is a solution for deploying and operating Kubernetes clusters based on NestOS.',
  feature4Title: 'Rubik Online-Offline Colocation',
  feature4Desc:
    'NestOS For Container pre-enables the Rubik online-offline colocation kernel features, supporting the overall solution based on the Rubik container colocation engine.',
  feature5Title: 'Easy System Image Customization',
  feature5Desc:
    'Supports easy customization of container image format system images by writing Dockerfile.',
  feature6Title: 'Immutable Mode Conversion Tool',
  feature6Desc:
    'Provides x2NestOS tool to convert NestOS For Virt or other general-purpose OS to immutable mode.',

  // Performance Comparison
  performanceTitle: 'Performance Comparison',
  performanceLinkText: 'View Performance Test Details',
  performanceTips: '*Docker、podman的测试数据详见>> ',
  performanceTipsText: '[ 性能对比 ]',

  // Resources
  resourcesTitle: 'Resources',
  mirrorTab: 'Mirror',
  documentTab: 'Document',
  otherTab: 'Other',
  archX86: 'x86_64',
  archArm: 'AArch64',
  downloadBtn: 'Download',
  immediateDownload: 'Download',
  viewDoc: 'View Document',
  nestosDoc: 'NestOS Documentation',
  nestosDocDesc: 'Official NestOS documentation with complete guides for installation, configuration, and operations.',
  ignitionFile: 'NestOS Ignition File',
  ignitionFileDesc: 'NestOS ignition file usage examples for automated system initialization and configuration.',
  docLink: 'https://nestos.org.cn/',
  ignitionLink: 'https://gitee.com/openeuler/NestOS/blob/master/docs/use_sample/ignition/',
  mirrorPackage: 'Package',
  mirrorRepo: 'Mirror',
  mirrorDownloadCol: 'Download',

  // Partners
  partnersTitle: 'Partners',

  // Common
  viewDetails: 'View Details',
  learnMore: 'Learn More',
};

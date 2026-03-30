export default {
  title: 'NestOS',
  subtitle: '基于欧拉开源操作系统的云底座操作系统',
  buttonTitle: '开始NestOS之旅',

  // Banner 操作按钮
  downloadTitle: '获取 NestOS 资源',
  issueTitle: '我想对 NestOS 说',

  // 简介
  introTitle: '简介',
  introDesc1:
    '在不断演进的云原生世界中，容器化和虚拟化技术已经成为了现代应用程序交付和管理的关键组成部分。为满足这个不断增长的需求，NestOS 正式推出双模式版本，该版本整合了 NestOS For Container 和 NestOS For Virt 这两个模式到一个 ISO 镜像中，旨在满足云场景中容器化和虚拟化两种主要场景下用户的多样需求，专注于提供最佳的容器主机和虚拟化解决方案。',
  introDesc2:
    '目前 NestOS-24.03-LTS 版本已发布，欢迎大家下载体验，或者有什么想对 NestOS 说的，可以提 Issue 反馈。',
  introDesc2Pre: '目前 NestOS-24.03-LTS 版本已发布，欢迎大家',
  introDesc2Link1: '下载体验',
  introDesc2Mid: '，或者有什么',
  introDesc2Link2: '说给NestOS听',
  introDesc2Post: '。',
  moreInfo: '更多信息：',
  infoLicense: 'License：采用 Mulan PSL v2 协议。',
  infoArch: '支持架构：支持 x86_64、aarch64 架构。',
  infoOS: '基于操作系统：openEuler 22.03-LTS、24.03-LTS 系列版本。',

  // 架构
  archTitle: '架构',

  // 版本介绍
  versionTitle: '版本介绍',
  nfcTitle: 'NestOS For Container',
  nfcSubtitle: '容器场景专属版本',
  nfcDesc:
    'NestOS For Container（以下简称 NFC，是 Fedora CoreOS 在 openEuler 社区的 variant 版本）集成了 rpm-ostree 支持、ignition 配置等技术，采用双根文件系统，原子化更新的设计思路，使用 nestos-assembler 快速集成构建。并针对 K8S、openStack 等平台进行适配，优化容器运行底噪，使系统具备十分便捷的集群组建能力，可以更安全地运行大规模的容器化工作负载。',
  nfvTitle: 'NestOS For Virt',
  nfvSubtitle: '虚拟化场景专属版本',
  nfvDesc:
    'NestOS For Virt（以下简称 NFV）是一个专为虚拟化场景而设计的版本，预安装了虚拟化关键组件，其目标是用户可以轻松创建和管理虚拟机，无论是在开发、测试还是生产环境中工作，都能够提供卓越的虚拟化性能，同时可以在高性能的虚拟机上运行各种工作负载，实现资源隔离和安全性。',

  // 功能特色
  featuresTitle: '功能特色',
  feature1Title: '内核特性增强',
  feature1Desc:
    '独立维护 NestOS 内核分支，基于 openEuler 主线版本针对云场景进一步特性增强。',
  feature2Title: 'PilotGo 插件式运维管理平台',
  feature2Desc:
    '专为 NestOS 提供的定制化运维管理功能以及全新的架构感知插件特性。',
  feature3Title: '云原生一体化运维工具',
  feature3Desc:
    'nestos-kubernetes-deployer 简称 NKD，是基于 NestOS 部署 Kubernetes 集群运维而准备的解决方案。',
  feature4Title: '支持 Rubik 在离线混部',
  feature4Desc:
    'NestOS For Container 版本已预开启 Rubik 在离线混部相关内核特性，支持基于 Rubik 容器混部引擎的整体解决方案。',
  feature5Title: '轻松定制系统镜像',
  feature5Desc:
    '支持以编写 Dockerfile 形式轻松定制容器镜像格式的系统镜像。',
  feature6Title: '不可变模式转换工具',
  feature6Desc:
    '提供 x2NestOS 工具，支持将 NestOS For Virt 或其他通用形态 OS 转换为不可变模式。',

  // 性能对比
  performanceTitle: '性能对比',
  performanceLinkText: '查看性能测试详情',
  performanceTips: '*Docker、podman的测试数据详见>>',
  performanceTipsText: '[ 性能对比 ]',

  // 资源下载
  resourcesTitle: '资源',
  mirrorTab: '镜像',
  documentTab: '文档',
  otherTab: '其他',
  archX86: 'x86_64',
  archArm: 'AArch64',
  downloadBtn: '下载',
  immediateDownload: '立即下载',
  viewDoc: '查看文档',
  nestosDoc: 'NestOS 使用文档',
  nestosDocDesc: 'NestOS 官方使用文档，提供安装、配置、运维等完整使用指南。',
  ignitionFile: 'NestOS 点火文件',
  ignitionFileDesc: 'NestOS 点火文件使用样例，用于系统初始化自动化配置。',
  docLink: 'https://nestos.org.cn/',
  ignitionLink: 'https://gitee.com/openeuler/NestOS/blob/master/docs/use_sample/ignition/',
  mirrorPackage: '软件包',
  mirrorRepo: '镜像仓库',
  mirrorDownloadCol: '软件包下载',

  // 下游伙伴
  partnersTitle: '下游伙伴',

  // 通用
  viewDetails: '查看详情',
  learnMore: '了解更多',
};

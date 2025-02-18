export default {
  banner: {
    title: 'NestOS',
    backgroundText: 'DISCOVERY',
    subtitle: '基于欧拉开源操作系统的云底座操作系统',
  },
  card: {
    nestosTitle: '开启NestOS之旅',
    downloadTitle: '获取NestOS资源',
    issueTitle: '我想对NestOS说',
    description1:
      '在不断演进的云原生世界中，容器化和虚拟化技术已经成为了现代应用程序交付和管理的关键组成部分。为满足这个不断增长的需求，NestOS正式推出双模式版本，',
    description2:
      '该版本整合了NestOS For Container 和 NestOS For Virt这两个模式到一个ISO镜像中，',
    description3:
      '旨在满足云场景中容器化和虚拟化两种主要场景下用户的多样需求，专注于提供最佳的容器主机和虚拟化解决方案。',
    mainDesc1: '目前NestOS-24.03-LTS版本已发布，欢迎大家',
    mainDesc2: '，或者有什么',
    dltext: '下载体验',
    linksText: '说给NestOS听',
  },
  minititle: {
    //planIn: '年度规划',
    //planOut: 'PROGRAMME',
    archIn: '功能特色',
    archOut: 'CHARACTERISTIC',
    comIn: '性能对比',
    comOut: 'COMPARISION',
    docIn: '文档',
    docOut: 'DOCUMENTATION',
    resourceIn: '资源',
    resourceOut: 'RESOURCE',
    versionIn: '版本介绍',
    versionOut: 'VERSION',
    partnerIn: '下游伙伴',
    partnerOut: 'PARTNER',
  },
  arch: {
    title1: '内核特性增强',
    title2: 'PilotGo插件式运维管理平台',
    title3: '云原生一体化运维工具',
    title4: '支持Rubik在离线混部',
    title5: '轻松定制系统镜像',
    title6: '不可变模式转换工具',
    desc1:
      '独立维护NestOS内核分支，基于openeuler主线版本针对云场景进一步特性增强',
    desc2: '专为NestOS提供的定制化运维管理功能以及全新的架构感知插件特性。',
    desc3:
      'nestos-kubernetes-deployer简称NKD，是基于NestOS部署kubernetes集群运维而准备的解决方案。',
    desc4:
      'NestOS For Container版本已预开启Rubik在离线混部相关内核特性，支持基于Rubik容器混部引擎的整体解决方案',
    desc5: '支持以编写Dockerfile形式轻松定制容器镜像格式的系统镜像。',
    desc6:
      '提供x2NestOS工具，支持将NestOS For Virt或其他通用形态OS转换为不可变模式',
  },
  version: {
    conTitle: 'NestOS For Container 介绍',
    conDesc:
      'NestOS For Container（以下简称NFC,是Fedora CoreOS 在 openEuler 社区的variant版本）集成了rpm-ostree支持、ignition配置等技术，采用双根文件系统，原子化更新的设计思路，使用nestos-assembler快速集成构建。并针对K8S、openStack等平台进行适配，优化容器运行底噪，使系统具备十分便捷的集群组建能力，可以更安全的运行大规模的容器化工作负载。',
    virtTitle: 'NestOS For Virt 介绍',
    virtDesc: `NestOS For Virt（以下简称NFV）是一个专为虚拟化场景而设计的版本，预安装了虚拟化关键组件，其目标是用户可以轻松创建和管理虚拟机，无论是在开发、测试还是生产环境中工作，都能够提供卓越的虚拟化性能，同时可以在高性能的虚拟机上运行各种工作负载，实现资源隔离和安全性。

    无论是运行云原生应用程序、虚拟化环境，还是两者兼顾，NestOS For Container 和 NestOS For Virt 都是理想之选。它们提供了稳定性、性能和安全性，以满足现代数据中心和云环境的要求。`,
  },

  compare: {
    desc: '使用 NestOS beta 版本横向对比 openEuler21.09、openEuler20.03LTS、Centos8 系统运行 iSulad2.0.10 容器引擎性能。',
    iSulad_x86: 'iSulad（x86_64）测试结果如下：',
    iSulad_arch: 'iSulad（aarch64）测试结果如下：',
    detail: '*Docker、podman的测试数据详见>> ',
    url_text: '[ 性能对比 ]',
  },
  resource: {
    mirror: '镜像',
    document: '文档',
    other: '其他',
    file: {
      doc: 'NestOS使用文档',
      other1: 'NestOS点火文件',
      other2: '点火文件2解释内容',
      other3: '点火文件3解释内容',
    },
  },
  footer: {
    atom_description:
      'openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源项目',
    copyright: '版权所有 © 2024 openEuler 保留一切权利',
    Trademark: '品牌',
    Policy: '隐私政策',
    Legal: '法律说明',
    Service: '服务状态',
  },
};

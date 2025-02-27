export default {
  banner: {
    title: 'NestOS',
    backgroundText: 'DISCOVERY',
    subtitle:
      'A cloudFoundation operating system based on Euler open source operating system',
  },
  card: {
    nestosTitle: 'Start NestOS',
    downloadTitle: 'Download NestOS',
    issueTitle: 'NestOS Issue',
    description:
      'NestOS cloud base operating system integrates RPM-Ostree support, IGNITION configuration and other technologies, adopts the design idea of dual root filesystem partitioning and atomization update, and uses Nestos-Assembler to quickly integrate and build. It also ADAPTS to K8S, openStack, OKD and other platforms to optimize the bottom noise of container operation. Compared with CENTOS8, the startup speed of container is increased by 30% and the creation speed of container is increased by 60%, which is suitable for the basic operation environment of cloud scenarios mainly based on containerized applications.',
    mainDesc:
      'At present, NestOS has released 22.03 and 22.09 versions. Welcome to click [Get NestOS Resources] to download.',
  },
  minititle: {
    planIn: 'programme',
    planOut: 'PROGRAMME',
    archIn: 'characteristic',
    archOut: 'CHARACTERISTIC',
    comIn: 'comparision',
    comOut: 'COMPARISION',
    docIn: 'DOCUMENTATION',
    docOut: 'DOCUMENTATION',
    resourceIn: 'RESOURCE',
    resourceOut: 'RESOURCE',
  },
  arch: {
    title1: 'Out of the box container platform',
    title2: 'Easy to use installation and configuration process',
    title3: 'Secure and reliable package management',
    title4: 'Friendly and controllable automatic update mechanism',
    title5: 'Closely matched dual root filesystem',
    character1:
      'container technology overcomes the user to modify the system configuration, user service system components to rely on conflicts lead to massive cluster service operations difficult problem, at the same time can be quickly installed deployment, according to the service load and convenient real-time extension contraction and node when the operational service smooth migration, is the basis of the most important core cloud native times. Current mainstream general server operating systems need to be installed and deployed before adjusting cloud scenario adaptation. NestOS integrates with mainstream container engines such as iSulad, Docker, Podman, and CLI-O, which can provide users with a lightweight and customized cloud scenario operating system out of the box.',
    character2:
      'NestOS uses Ignition technology, which can easily complete the installation and configuration of a large number of cluster nodes with the same configuration. Ignition is a distribution-neutral configuration utility for installing and configuring systems and initializing NestOS. The Ignition profile can include configuration for networking, storage, file systems, SystemD units, and user authentication and rights management. During the installation phase, you can manually run the nestos-installer command after booting up the installation image, load the Ignition configuration file, and complete the local installation of NestOS. You can also add the remote Ignition configuration access address to the boot parameters through PXE to realize the network boot installation of a large number of cluster nodes.',
    character3:
      'NestOS uses RPM-Ostree for package management. Rpm-ostree can be regarded as the combination of RPM and Ostree. On the one hand, Rpm- Ostree provides a way to install and manage software packages based on Rpm, and on the other hand, it provides an update and upgrade of operating system based on Ostree. Each user updates the system as if RPM-ostree commits a "Transaction," ensuring that all updates succeed or fail, and allowing rollback to the pre-update state if the update system encounters an exception.',
    character4:
      'NestOS provides automatic update service. As a client of remote update service and RPM-Ostree, NestOS is responsible for detecting whether there is an updated version in the update server and realizing automatic update and reboot of nodes. The service support automatic update agent, user-defined configuration files, and a variety of update strategy, whether the user can automatically update, automatic update strategy options such as configuration, also can be combined with the upper cluster service, will serve the current node load migration after any update, realize the cluster nodes and orderly, ensure the cluster service is not interrupted by the nodes to upgrade. When cluster nodes need to modify their configurations or update the basic environment, release the verified version to the update server. The cluster nodes will be upgraded through the automatic update mechanism.',
    character5:
      'NestOS uses a dual root filesystem partition design, with the two partitions set to active and passive modes, respectively, and each performing its duties during system operation. The active partition is responsible for system operation and the passive partition is responsible for system upgrade. Meanwhile, the active partition is set to read-only state during system operation to ensure the integrity and security during NestOS operation. When a new version release of the operating system, a complete file system will be downloaded to passive partition, and restart the system boot from the new version of partition starts, the original passive partition will switch to active partitions, while the active partition before be switch to a passive partitions, the role of two partitions will switch to each other, waiting for the next update system.',
  },
  compare: {
    desc: '使用 NestOS beta 版本横向对比 openEuler21.09、openEuler20.03LTS、Centos8 系统运行 iSulad2.0.10 容器引擎性能。',
    iSulad_x86: 'iSulad（x86_64）测试结果如下：',
    iSulad_arch: 'iSulad（aarch64）测试结果如下：',
    detail: 'Docker、podman的测试数据详见>> ',
    url_text: '[ 性能对比 ]',
  },
  resource: {
    mirror: 'Mirror',
    document: 'Document',
    other: 'Other',
    file: {
      doc: 'NestOS Documentation',
      other1: 'NestOS Ignition File',
      other2: '点火文件2解释内容',
      other3: '点火文件3解释内容',
    },
  },
  footer: {
    atom_description:
      'openEuler is an open source project incubated and operated by the OpenAtom Foundation.',
    copyright: 'Copyright © 2024 openEuler. All rights reserved.',
    Trademark: 'Trademark',
    Policy: 'Privacy Policy',
    Legal: 'Legal Notice',
    Service: 'Service Status',
  },
};

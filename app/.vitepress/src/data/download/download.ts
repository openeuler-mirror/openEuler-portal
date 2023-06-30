export default {
  zh: {
    COMMUNITY_LIST: [
      {
        NAME: 'openEuler 22.03 LTS SP2',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/',
        DESC: 'openEuler 22.03 LTS SP2 是openEuler 22.03 LTS的补丁版本，生命周期与LTS版本相同。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP2/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP2/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler 22.03 LTS SP2技术白皮书.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.03-LTS-SP2',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/embedded_img/',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2023/06',
        LTS: true,
        VERSION: '22.03-LTS-SP2',
        DETAILED_LINK: [
          // x86
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  '69ea8e0faa1b45cf4a63bc1c3584834fcebaf292a38e4391607e61ad6047c2b2',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/x86_64/openEuler-22.03-LTS-SP2-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '16.9 GiB',
                SHACODE:
                  '8f00c6251c944330fc0bedbcc1085ab029cd1e49aadd14c236658fa7ac0a8b2c',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/x86_64/openEuler-22.03-LTS-SP2-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '738.0 MiB',
                SHACODE:
                  'e7186579da6d16430bb8577e2989761e726af8166a08f7e02cde55a614b42d66',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/x86_64/openEuler-22.03-LTS-SP2-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          // aarch64
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.1 GiB',
                SHACODE:
                  '2c984a51342a0cd26802e64913486ed600479a69a68f25bcad99cc0a88405316',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/aarch64/openEuler-22.03-LTS-SP2-aarch64-dvd.iso',
                TIPS: 'AArch64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '	16.5 GiB',
                SHACODE:
                  '7e270556361c38bd66565921be5f2327d611d6d8aef5a299d029abc0f7d9a07e',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/aarch64/openEuler-22.03-LTS-SP2-everything-aarch64-dvd.iso',
                TIPS: 'AArch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '698.7 MiB',
                SHACODE:
                  'a406d2adae7ba26c0420da3ebfa7031dc09110da04b39120d055092c585eca76',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/aarch64/openEuler-22.03-LTS-SP2-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          //EDGE_CLOUD x86_64
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  'ae0a31cf4c9d24fd42d7e24b4e50b03ab464fa4e52c0301099a8d3ed950cc797',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/edge_img/x86_64/openEuler-22.03-LTS-SP2-edge-x86_64-dvd.iso',
                TIPS: 'x86_64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          // EDGE_CLOUD AArch64
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.3 GiB',
                SHACODE:
                  '1a7aa792a4247e5d0f69ddd2aa43569eafaed25ae8a15c55d22285c698e4b1ba',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/edge_img/aarch64/openEuler-22.03-LTS-SP2-edge-aarch64-dvd.iso',
                TIPS: 'AArch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          // CLOUD_COMPUTING x86_64
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '379.5 MiB',
                SHACODE:
                  '84705761686f7e72c545c0f28fb25d045021f930a9f39ff3f28e354fd476f9cd',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/virtual_machine_img/x86_64/openEuler-22.03-LTS-SP2-x86_64.qcow2.xz',
                TIPS: 'x86_64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          // CLOUD_COMPUTING AArch64
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '354.8 MiB',
                SHACODE:
                  '5c06e8e3737d9eabd693df287d50449548427946622ea393092b22be58f6252a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/virtual_machine_img/aarch64/openEuler-22.03-LTS-SP2-aarch64.qcow2.xz',
                TIPS: 'aarch64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          // TODO:
        ],
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 23.03',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-23.03/',
        DESC: 'openEuler 23.03采用 Linux Kernel 6.1 内核，为未来 openEuler 长生命周期版本采用 6.x内核提前进行技术探索、硬件适配、基础技术创新和上层应用创新。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/23.03/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/23.03/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler-whitepaper-2303.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=23.03',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-23.03/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-23.03/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-23.03/embedded_img/',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2023/03',
        LTS: false,
        /* VERSION参数是为了获取推荐镜像，根据上面的WEBSITE_SELECT的version填写*/
        VERSION: '23.03',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.7 GiB',
                SHACODE:
                  'ed48a94d38dca4aec18954a6f40e48b568a5a17ce4b836b0bae6c6a0739809f0',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/x86_64/openEuler-23.03-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '18.7 GiB',
                SHACODE:
                  '8d8d6dc6b5fbfcdfa9fa66e91871b464781322283d131172bdd374e7378db4f5',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/x86_64/openEuler-23.03-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '779.0 MiB',
                SHACODE:
                  'bd98088d6ad08535a037cf10734c7594bdd3b3974ecb58913d2f3381f883c084',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/x86_64/openEuler-23.03-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.4 GiB',
                SHACODE:
                  '850dd9ef5364866eb556f232db06bc9913a10b8cfe25113261a9be1712d206bf',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/aarch64/openEuler-23.03-aarch64-dvd.iso',
                TIPS: 'AArch64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '18.2 GiB',
                SHACODE:
                  '31fdda1971aaf077218cf574ca07fc3a3ab78a40fa437fc7a44abe41aa11bbc7',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/aarch64/openEuler-23.03-everything-aarch64-dvd.iso',
                TIPS: 'AArch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '734.4 MiB',
                SHACODE:
                  'f671b995935f0362222eb76f8ed97541007ea5b3fc230c10029e094bd11aeaac',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/aarch64/openEuler-23.03-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.6 GiB',
                SHACODE:
                  '1b99e475c8ab8ec241ad6b543387bf9dd7137846fef908f814d73be63536e00d',
                DOWNLOAD_LINK:
                  'openEuler-23.03/edge_img/x86_64/openEuler-23.03-edge-x86_64-dvd.iso',
                TIPS: 'x86_64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  '65a48b1e60f68b857ec86ff0bc1216c2d8f45eebec78fb9f452ce7c50f11a516',
                DOWNLOAD_LINK:
                  'openEuler-23.03/edge_img/aarch64/openEuler-23.03-edge-aarch64-dvd.iso',
                TIPS: 'AArch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '405.1 MiB',
                SHACODE:
                  '036cdfe6d2ae2dae45eba493f6507edb25e5b50475c208f4310dd559136bc486',
                DOWNLOAD_LINK:
                  'openEuler-23.03/virtual_machine_img/x86_64/openEuler-23.03-x86_64.qcow2.xz',
                TIPS: 'x86_64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '375.7 MiB',
                SHACODE:
                  '62435736a03a7fcbf13b5b81982dd4b7178de5d22f5c6008aface81dbb8e72e3',
                DOWNLOAD_LINK:
                  'openEuler-23.03/virtual_machine_img/aarch64/openEuler-23.03-aarch64.qcow2.xz',
                TIPS: 'aarch64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.2 MiB',
                SHACODE:
                  'c596b9b15e3cf360337bfe85358e19dee37e1ab1a1034afa3612aa2b3d347beb',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '101.3 MiB',
                SHACODE:
                  '767c9e98a559e9f77fed61684f94f6286711b8f16eec1371ebfeec829a8d037c',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-23.03.sh',
                TIPS: 'aarch64架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '48.8 MiB',
                SHACODE:
                  'c4537fd6cde6d1e944465b3c02190587b8656fd40bb9e80e7408bff8a3be671f',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20230329193643.rootfs.cpio.gz',
                TIPS: 'aarch64架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '154.9 MiB',
                SHACODE:
                  '9cb9bd2f733e2f5a48ddc396c0715b59077927ea04580dc0394393e7cfd88df1',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.9 MiB',
                SHACODE:
                  'a86563a107c4f4b0bf91c319b9be753a3b7cc21b862a0004f348e41a490594f5',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'aarch64架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  'd044cc405c78e51d2e4381dc30fa5fe9d444e87cff4d8cbd792e482fd40f995f',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/Image-5.10.0',
                TIPS: 'arm架构下支持qemu的内核镜像',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '92.3 MiB',
                SHACODE:
                  '75d161bfbbc30510fbc7db8650aa9afe0d9277b439560b3b78e1a9d285aea034',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-23.03.sh',
                TIPS: 'arm架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '44.8 MiB',
                SHACODE:
                  'fbf700dde6db257212bdb1f5dbe06b086b1a476f69f063211f945bf070db125e',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20230329220826.rootfs.cpio.gz',
                TIPS: 'arm架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '111.9 MiB',
                SHACODE:
                  'e75fb3e294fdd562f29ac91af53a216eccacf9310a749bed2e61c98d00b37c2c',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  '6d4b0287f34d599c785d56e96f993c52df5a81721e7ac02f41c9ffa089ab1eab',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/zImage',
                TIPS: 'arm架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2023/09',
      },
      {
        NAME: 'openEuler 22.03 LTS SP1',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/',
        DESC: 'openEuler 22.03 LTS SP1 是openEuler 22.03 LTS的补丁版本，生命周期与LTS版本相同。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP1/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP1/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler-whitepaper-2203-SP1.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.03-LTS-SP1',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/embedded_img/',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2022/12',
        LTS: true,

        VERSION: '22.03-LTS-SP1',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  'bdebae1d0b95fc92269ce96da3c57339b9c571a02e11fb7d3d0b336e520072e9',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/x86_64/openEuler-22.03-LTS-SP1-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '16.5 GiB',
                SHACODE:
                  '599339f6f4cc7c7ad0e9ca2539d4d23ef4d7e22267a53ef6c9bfbfc6db6604f5',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/x86_64/openEuler-22.03-LTS-SP1-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '746.0 MiB',
                SHACODE:
                  '0c712b47da13960efffe9a50161337359e2227dc5fabe05158a17997f8ab7354',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/x86_64/openEuler-22.03-LTS-SP1-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.1 GiB',
                SHACODE:
                  'a273238dd0e15fa603a60441c5348c74ba1b6ee31e4c7243d2d5dd782c94280c',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/aarch64/openEuler-22.03-LTS-SP1-aarch64-dvd.iso',
                TIPS: 'AArch64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '	16.1 GiB',
                SHACODE:
                  'c5197831bd5d10fdbec6427be88375ead00f7fe962b6e634f7e00823e4a5316a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/aarch64/openEuler-22.03-LTS-SP1-everything-aarch64-dvd.iso',
                TIPS: 'AArch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '707.6 MiB',
                SHACODE:
                  '3a964b264d0d57c3cf2e5bad9f591716fb745c7c27d20f39fb44f3aa83c36dc8',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/aarch64/openEuler-22.03-LTS-SP1-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.5 GiB',
                SHACODE:
                  'c52b7eec9962e84010a21cd55a46ebd339d49d654307c4c735380ac1288d2a74',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/edge_img/x86_64/openEuler-22.03-LTS-SP1-edge-x86_64-dvd.iso',
                TIPS: 'x86_64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  '23007471274039cfc9555c19ae5555328bc2313b03935ce51c2b7fb260834c85',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/edge_img/aarch64/openEuler-22.03-LTS-SP1-edge-aarch64-dvd.iso',
                TIPS: 'AArch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '389.4 MiB',
                SHACODE:
                  '3d1abe15417403dd77f1675c2d738c23495ce94c3b1cf97b77b4f37853237538',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/virtual_machine_img/x86_64/openEuler-22.03-LTS-SP1-x86_64.qcow2.xz',
                TIPS: 'x86_64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '389.4 MiB',
                SHACODE:
                  '15558c50f2cc1103405550434b04f0a1e2904d782c4bc772c277589bacdd5abb',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/virtual_machine_img/aarch64/openEuler-22.03-LTS-SP1-aarch64.qcow2.xz',
                TIPS: 'aarch64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '	9.2 MiB',
                SHACODE:
                  'c2739c1aedd08bfc8ce9b80ab8b31eef344e248b7909aaba4967f6a7e01cd028',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '101.1 MiB',
                SHACODE:
                  '5088614dfa67ecc445465f269a3c7257348482310e0995f33637d616d1f6d98e',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-22.03.sh',
                TIPS: 'aarch64架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '	41.8 MiB',
                SHACODE:
                  'f691787e4656daef17dc2bfb306ea2be13915d6c085114d79fb6a561ae42b11e',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20221228125551.rootfs.cpio.gz',
                TIPS: 'aarch64架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '154.6 MiB',
                SHACODE:
                  '05d19b5a16ef8c19b7da84db642c27b16769f2f2d5971e6dbf01f0dd7bc996de',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.9 MiB',
                SHACODE:
                  '52721a7967c01573108ac4f92301643ab9146080fa7491fb6f223d2e0f203634',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'aarch64架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  '782faecd9018f26013efb57457f3523be47bbc57c841f384e5ad1e05faccb624',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '91.0 MiB',
                SHACODE:
                  '152f41a87f54c46f892c4b4114f739dc7afd951e52e93674e87027a771fe125f',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-22.03.sh',
                TIPS: 'arm架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '34.6 MiB',
                SHACODE:
                  'b85b6117121db0e0d9a85ae3c76658828d6da6f827564a38b2857637d323f23d',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20221228125551.rootfs.cpio.gz',
                TIPS: 'arm架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '111.7 MiB',
                SHACODE:
                  'f0f21dfd90e84ea5ae1513108a4520df96a2d7da0a2d2e9691122522b4cd4d84',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  'ad9e3e6290fde6edfe8f8863cf78fb87b48bd070b07d306548f234279406ff71',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/zImage',
                TIPS: 'arm架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2024/12',
      },
      {
        NAME: 'openEuler 22.09',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.09/',
        DESC: 'openEuler 22.09 充分释放多样性算力，持续深化全场景创新，打造极致迁移能力，实现欧拉鸿蒙互联互通。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/22.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/22.09/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/openEuler-22.09/ISO/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler-whitepaper-2209.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.09',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.09/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-22.09/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.09/embedded_img/',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2022/09',
        LTS: false,
        VERSION: '22.09',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  'ce38bd727b240cf869cf8fdd79c5084601c1ce67fcdc6b1cfc01d4c792e7f093',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/x86_64/openEuler-22.09-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '17.3 GiB',
                SHACODE:
                  'ea6116a645580cae87ecc061c0a821941fc1cb70edce86257e8da0e2925a91ce',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/x86_64/openEuler-22.09-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '724.0 MiB',
                SHACODE:
                  '0f1c770c5e75568522d0414cfef9d3ed9e87ec456213456d96e2fd24ed50905c',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/x86_64/openEuler-22.09-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.1 GiB',
                SHACODE:
                  '061a15878a8a49ed7071663bb5095a9304d3d4c5ef25c302e2fba478ae929cd2',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/aarch64/openEuler-22.09-aarch64-dvd.iso',
                TIPS: 'AArch64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '16.9 GiB',
                SHACODE:
                  'b9e3add41b428c31f11157c0564e84773ac70e0f329787a2b5845df39e7a14ed',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/aarch64/openEuler-22.09-everything-aarch64-dvd.iso',
                TIPS: 'AArch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '686.6 MiB',
                SHACODE:
                  'bde8b6eaf3ee38ffbf1531d940599095a0529f3d62bc15ce0af395cf119a113e',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/aarch64/openEuler-22.09-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'riscv64',
                SIZE: '',
                SHACODE: '',
                DOWNLOAD_LINK:
                  'openEuler-preview/RISC-V/openEuler-22.09-riscv64/',
                TIPS: '',
              },
            ],
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  'd7ebccc72c121a166be1709b845f830bbc63aba6185c2ce82b87ab63e68447d2',
                DOWNLOAD_LINK:
                  'openEuler-22.09/edge_img/x86_64/openEuler-22.09-edge-x86_64-dvd.iso',
                TIPS: 'x86_64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.3 GiB',
                SHACODE:
                  'c150be00a17d61425dea8b62d0891ed4f114aa6e2418f73e04640b1bc907638d',
                DOWNLOAD_LINK:
                  'openEuler-22.09/edge_img/aarch64/openEuler-22.09-edge-aarch64-dvd.iso',
                TIPS: 'AArch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '386.7 MiB',
                SHACODE:
                  'f748f6340588c417742c928adec36e2e65d1d298263014f719ce4913e854f3d1',
                DOWNLOAD_LINK:
                  'openEuler-22.09/virtual_machine_img/x86_64/openEuler-22.09-x86_64.qcow2.xz',
                TIPS: 'x86_64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '361.6 MiB',
                SHACODE:
                  '1c12f1952f2f391f9a0302dbe7de01b7aefed8015e7243c9d16ec118948a05d9',
                DOWNLOAD_LINK:
                  'openEuler-22.09/virtual_machine_img/aarch64/openEuler-22.09-aarch64.qcow2.xz',
                TIPS: 'aarch64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.2 MiB',
                SHACODE:
                  'f42cc47bcdea971f74525100ceff606e2e0cf4a182b697319cfde1080aac7ad9',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '99.3 MiB',
                SHACODE:
                  '31bea37536083471b8ec6758382b37ce73067b3df73a8503ade6053ed97b9c27',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-22.09.sh',
                TIPS: 'aarch64架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '41.7 MiB',
                SHACODE:
                  '167de49c135cd2039694ba46ed43ffa72f65002064b752b4787767b4905fe140',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20220929163137.rootfs.cpio.gz',
                TIPS: 'aarch64架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '154.8 MiB',
                SHACODE:
                  '7aa64b6b2f0da091f460244335085839c7b533ba3b84432273a31eb2a1a2e703',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.9 MiB',
                SHACODE:
                  '689da4deda8b4ad5e39acdb6453d45ddef0186568cad179570460db060b6fd34',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'aarch64架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  'b4ba1ba36b7cd9f97487e1411cfe1abd3af40a9cb5e7da382df8736cc75df779',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '	86.7 MiB',
                SHACODE:
                  '017c3d46873ec6cf4c16dc3fca9f2fb088cb255050c5425a442becdb9808dab2',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-22.09.sh',
                TIPS: 'arm架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '34.4 MiB',
                SHACODE:
                  '4e1bde7e7b22efe3dc3ca69c35e6ff5c4525e1703b975ad59dffef4aa1c73dff',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20220929163137.rootfs.cpio.gz',
                TIPS: 'arm架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '111.7 MiB',
                SHACODE:
                  'f9d44fdaaffef4eb08de8bf8c371f412334f4f2861e1f839d5520d40563a3384',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  '2491af5477c165cc27ad8728a339ea59ab937cc22bee94a60be5bc596841008a',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/zImage',
                TIPS: 'arm架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2023/03',
      },
      {
        NAME: 'openEuler 22.03 LTS',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS/',
        DESC: 'openEuler 22.03-LTS 是基于5.10内核构建，实现了服务器、云、边缘和嵌入式的全场景支持',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler-whitepaper-2203.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.03-LTS',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-22.03-LTS/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS/embedded_img/',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2022/03',
        LTS: true,
        VERSION: '22.03-LTS',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.4 GiB',
                SHACODE:
                  'a07952feb2f9f0239143daf6cc061a396e09bbb3e26d8fbf38eeb21d0251bde0',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/x86_64/openEuler-22.03-LTS-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.6 GiB',
                SHACODE:
                  'ad36b1feadcc96996e7fb5fefdf46cd07c56941dba93c5a8ebe6985d0c891813',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/x86_64/openEuler-22.03-LTS-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '721.0 MiB',
                SHACODE:
                  '8f754e5c165bba4bf7f6000bf2277a43f5927b58b8ab6a431f8197ba525ae972',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/x86_64/openEuler-22.03-LTS-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.0 GiB',
                SHACODE:
                  '8ee6e6ea6fe3af075846efb28196aac6edd50c99b663b0fc4651fa71195a68e6',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/aarch64/openEuler-22.03-LTS-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.3 GiB',
                SHACODE:
                  'a6e7770d43c733fc51b29b2bf68360928dbd67df5144f408a0d4ada6037c8d6a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/aarch64/openEuler-22.03-LTS-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '	679.8 MiB',
                SHACODE:
                  'd66b8b3eb89d2f361747622e16922fce601b8a0dbe43f6790d5dd94a447c7177',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/aarch64/openEuler-22.03-LTS-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'riscv64',
                SIZE: '',
                SHACODE: '',
                DOWNLOAD_LINK:
                  'openEuler-preview/RISC-V/openEuler-22.03-V1-riscv64/',
                TIPS: '',
              },
            ],
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'loongarch',
                SIZE: '2.1 GiB',
                SHACODE: '29eaf6db6702c1ce91b9ee73c58e7543',
                DOWNLOAD_LINK:
                  'openEuler-preview/loongarch/ISO/openEuler-22.03-LTS-loongarch64-dvd-beta4.iso',
                TIPS: '',
              },
            ],
            ARCH: 'LoongArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'preview-ppc',
                SIZE: '4.4 GiB',
                SHACODE: '2322c5dc76238ecaa97014843e3e4ef5',
                DOWNLOAD_LINK:
                  'openEuler-preview/power/ISO/openEuler-22-03-LTS-ppc64le-dvd-alpha.iso',
                TIPS: '',
              },
            ],
            ARCH: 'Power',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'OS-isoe',
                SIZE: '2.8 GiB',
                SHACODE:
                  'a0e5e38f9100e52bb89e24a0b0d4640e77ed64f898d526b288bff11c6877bf5a',
                DOWNLOAD_LINK:
                  'openEuler-preview/sw_arch/openEuler-22.03-LTS/ISO/openEuler-Server-OS-isoe-sw_64-20220927.iso',
                TIPS: '',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.6 GiB',
                SHACODE:
                  '0b4da0698fbe96525e761ab3fc82cfa5420dc27fa7260c084afefae9630a0b02',
                DOWNLOAD_LINK:
                  'openEuler-preview/sw_arch/openEuler-22.03-LTS/ISO/openEuler-Server-OS-isoe-sw_64-20220927-everything.iso',
                TIPS: 'SW64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'OS-isoe',
                SIZE: '3.6 GiB',
                SHACODE: 'b2ed6c518cf8637e84bd3e019d4200c4',
                DOWNLOAD_LINK:
                  'openEuler-preview/sw_arch/openEuler-22.03-LTS/ISO/openEuler-Server-OS-isoe-sw_64-20221227.iso',
                TIPS: '',
              },
            ],
            ARCH: 'SW64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.5 GiB',
                SHACODE:
                  'd678e81f90b4642c6e3236c5a03372601a529838d842f5e1a2c3baaee079eb5a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/edge_img/x86_64/openEuler-22.03-LTS-edge-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  '393e7a310518fde73c3af7a89094d0bab98f430f6a0cb7bce546ff00851fe4d9',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/edge_img/aarch64/openEuler-22.03-LTS-edge-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '385.9 MiB',
                SHACODE:
                  '5859a5dddd64571e983b001ee8c72a7b211b21ed215dbe00ae9ab3d9d8bdf2b2',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/virtual_machine_img/x86_64/openEuler-22.03-LTS-x86_64.qcow2.xz',
                TIPS: 'x86_64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '364.1 MiB',
                SHACODE:
                  '2405854a017f5b4e00459a8030b78f00770450044d7454abb7db23e7f29b1a6b',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/virtual_machine_img/aarch64/openEuler-22.03-LTS-aarch64.qcow2.xz',
                TIPS: 'aarch64架构下openEuler虚拟机镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '8.3 MiB',
                SHACODE:
                  'bbf002146d86e73dba3e85874af4fbf4dc9a3e74ed0de503944a5bd388f08415',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '163.7 MiB',
                SHACODE:
                  '0c052ec474da6794ed53c9de3f0b24fcb3a5d904cbce86fbc8e74e1e4419028b',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-22.03.sh',
                TIPS: 'AArch64架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '	33.4 MiB',
                SHACODE:
                  '2a136d0f3a7e56595adb85d82ec87460cdb856e8913462dd419f847890ac925c',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20220331025547.rootfs.cpio.gz',
                TIPS: 'aarch64架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '143.5 MiB',
                SHACODE:
                  '2e7c6d3cbb172f9af2852f00eb3ad5d13131971e084be02919a3b4fab639f805',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.6 MiB',
                SHACODE:
                  'd3d571bb45c87e8a5353cf8e98f06cc25c09b02209ef3e40b8423f1b7b59e8cb',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'aarch64架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  '1fe7147ae1db0a711ef38ac8bda64de0d422fd8c78b5751e5784b48a30c79cd1',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/Image-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '	150.5 MiB',
                SHACODE:
                  '5c69c4cbeed0797d325b3ac93fa46fcbfeaaecaba5c236f20e35952527bfa750',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-22.03.sh',
                TIPS: 'arm架构下对应的开发编译链',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '30.4 MiB',
                SHACODE:
                  '53481a51808b0e92bb8f76fd8c449cb21dcd524ece735e149ccd80b37764a590',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20220331025547.rootfs.cpio.gz',
                TIPS: 'arm架构下支持qemu的文件系统',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '110.9 MiB',
                SHACODE:
                  'd7fff2f1e4e280bc7316ef714d7fbf2ea6b39c5074c5012b03063fe4027f8aa6',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/vmlinux-5.10.0',
                TIPS: '',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  'ae81e0ee5c1449f0251a38fb8be5e7a804cf44e822b9b1ee770abae0cac8bfa7',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/zImage',
                TIPS: 'arm架构下支持qemu的内核镜像',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 20.03 LTS SP3',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP3/',
        DESC: 'openEuler 20.03 LTS SP3 是openEuler 20.03 LTS的补丁版本，生命周期与LTS版本相同',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP3/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP3/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.03-LTS-SP3',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2021/12',
        LTS: true,
        VERSION: '20.03-LTS-SP3',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.1 GiB',
                SHACODE:
                  'a359c4a31e3550d548537084bbf1cad9a4c035b7b75fde304bd8bf4b23fa0719',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.7 GiB',
                SHACODE:
                  'f70396215a0eb175778eb43e494730de1a1c983062bd29848d8ce20f70021d42',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '826.9 MiB',
                SHACODE:
                  'e5f45b93df03dea414490adc584dfdb01b1176ea1b1eb50a95f065e4e189e1b4',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.7 GiB',
                SHACODE:
                  'fac6be30bcbf276c08bd1ebea1ae319406d1f2e99ceb73e041fe01a91451bb0f',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/aarch64/openEuler-20.03-LTS-SP3-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.3 GiB',
                SHACODE:
                  '895f718d0e345d23decf2c7ea82d9ba272e63932c30799fd2f7fd333e72ba110',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/aarch64/openEuler-20.03-LTS-SP3-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '799.6 MiB',
                SHACODE:
                  '27f58c46e59ff2579d3c8cddb6b2f178d9663d59b4cad1826a0106baeb0960a0',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/aarch64/openEuler-20.03-LTS-SP3-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2025/12',
      },
      {
        NAME: 'openEuler 21.09',
        DOWNLOAD_URL: 'https://archives.openeuler.openatom.cn/openEuler-21.09/',
        DESC: 'openEuler 21.09创新版是欧拉全新发布后的第一个社区版本，实现了全场景支持。增强服务器和云计算的特性，发布面向云原生的业务混部CPU调度算法、容器化操作系统KubeOS等关键技术；同时发布边缘和嵌入式版本。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/21.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/21.09/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://archives.openeuler.openatom.cn/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER:
          'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/pdf/openEuler%2021.09%20%E6%8A%80%E6%9C%AF%E7%99%BD%E7%9A%AE%E4%B9%A6.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=21.09',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2021/09',
        LTS: false,
        VERSION: '21.09',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.6 GiB',
                SHACODE:
                  '49153a5a58e2958ba33597061f48da34c6e14f1aa19422fc375a7f89598cde41',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/x86_64/openEuler-21.09-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.4 GiB',
                SHACODE:
                  'e30801511dd38da4700741be53b2e8528b8c48feebcb8f6f483e11c59139eecb',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/x86_64/openEuler-21.09-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '871.7 MiB',
                SHACODE:
                  '5eddbd90cd328b25d48f413738270ccbd0f82d9a4b287d7b9b3b7cb2b7e0fbf7',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/x86_64/openEuler-21.09-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.2 GiB',
                SHACODE:
                  '7c82cb690310469ce64849a2a1b99521a34dc74589664969aff6199eecaca5f3',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/aarch64/openEuler-21.09-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.0 GiB',
                SHACODE:
                  '35f6a4c1505b2063aede36e2a4055a05c4cbae1b4a9d274c949f72605f93a483',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/aarch64/openEuler-21.09-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '828.8 MiB',
                SHACODE:
                  '2f705f7a9989bf155e275d0f540368bf84f47fba28f0a857902f7bd857355c8a',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/aarch64/openEuler-21.09-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/03',
      },
      {
        NAME: 'openEuler 20.03 LTS SP2',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP2/',
        DESC: 'openEuler 20.03 LTS SP2 是openEuler 20.03 LTS的补丁版本，生命周期与LTS版本相同',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP2/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP2/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.03-LTS-SP2',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2021/07',
        LTS: true,
        VERSION: '20.03-LTS-SP2',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.0 GiB',
                SHACODE:
                  '3786eaf360b2f394e61a37ffd2552758f8d15d2a2b0696ef1cae60dd555237b7',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/x86_64/openEuler-20.03-LTS-SP2-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.5 GiB',
                SHACODE:
                  '64ecf9585802a949d37d18021ec5ff05bf1b4dad1f0493424d8f95e0e511b3c1',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/x86_64/openEuler-20.03-LTS-SP2-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '836.3 MiB',
                SHACODE:
                  '4622c0bd83c516aa732c4c10c968a35df57fa0f1e249fe307d569b832b085d35',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/x86_64/openEuler-20.03-LTS-SP2-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.7 GiB',
                SHACODE:
                  'b2f24e352e42bded60710efee58e98d977e336c8c942c98318256cc8a5df78ee',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/aarch64/openEuler-20.03-LTS-SP2-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.1 GiB',
                SHACODE:
                  'e1f895055c2476c0ab1e83b705a723c315c38d2eb21278754f072090326d93f8',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/aarch64/openEuler-20.03-LTS-SP2-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '807.9 MiB',
                SHACODE:
                  'ce82ca10e1a4aee48e16b054fbab1457dac9c4e52e2ebbf46d35563e8bdba84b',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/aarch64/openEuler-20.03-LTS-SP2-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/04',
      },
      {
        NAME: 'openEuler 21.03',
        DOWNLOAD_URL: 'https://archives.openeuler.openatom.cn/openEuler-21.03/',
        DESC: 'openEuler 21.03 版本是满足开放场景的创新发行版，生命周期六个月。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/21.03/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/21.03/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://archives.openeuler.openatom.cn/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler-whitepaper-2103.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=21.03',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2021/03',
        LTS: false,
        VERSION: '21.03',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.6 GiB',
                SHACODE:
                  '968eb63d87af06ea623fedec93d5198930ca358e98e3b60c9225b0ab2311dc86',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/x86_64/openEuler-21.03-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '14.0 GiB',
                SHACODE:
                  'cabc72b9a7fd772d85974376cc4c306dea8bd92c9e0a0a0260b8bcca0f0decda',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/x86_64/openEuler-21.03-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '882.2 MiB',
                SHACODE:
                  'a6b81481f59bf3a8af3fe548ef01216d57a7313700b24111160bf751267f5d08',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/x86_64/openEuler-21.03-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.2 GiB',
                SHACODE:
                  'e723ba1ada8fbf07c398af00dcda2efa2d89d7abfe4e598aeabc0dccc2c86c45',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/aarch64/openEuler-21.03-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '13.6 GiB',
                SHACODE:
                  '98ea4db2d61ea0b9fffaeda322058b67085c691416e11d153dc3b9827ee407f7',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/aarch64/openEuler-21.03-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '843.0 MiB',
                SHACODE:
                  '8bdd9ea2bd00ab9aed3dafd04960c605bba50ccdeda2501a67f7126d2d4b6005',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/aarch64/openEuler-21.03-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2021/09',
      },
      {
        NAME: 'openEuler 20.03 LTS SP1',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP1/',
        DESC: 'openEuler 20.03 LTS SP1 是openEuler 20.03 LTS的补丁版本，生命周期与LTS版本相同',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.03-LTS-SP1',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2020/12',
        LTS: true,
        VERSION: '20.03-LTS-SP1',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.1 GiB',
                SHACODE:
                  '340c510c90150b448a2b8f5a0b04d5d2fef5b4d50abb941790d340b6df3e8d56',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/x86_64/openEuler-20.03-LTS-SP1-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '12.9 GiB',
                SHACODE:
                  '1f865da8660a05f64ef9f670a0a6f6e3151d52e2caddeff84bbbc09a1038562c',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/x86_64/openEuler-20.03-LTS-SP1-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '893.8 MiB',
                SHACODE:
                  'bd79e15f110381b1c88d6ad32c5d255e0b142da91171c3f83de9a5d4e25a6d50',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/x86_64/openEuler-20.03-LTS-SP1-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.8 GiB',
                SHACODE:
                  'e671fd9ab62384991d2e335ffe1ea068c51361cda929e7b1e1a82a53b584e867',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/aarch64/openEuler-20.03-LTS-SP1-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '12.6 GiB',
                SHACODE:
                  '138304abb9543d346308a94f937e00b2a3131a7aea993b72f7eb240f0b8f5c4f',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/aarch64/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '858.9 MiB',
                SHACODE:
                  '6c2e1e602f0083235a080e6fe71f9f00e019284b3d6a8de6c38dd1d813f0f250',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/aarch64/openEuler-20.03-LTS-SP1-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/12',
      },
      {
        NAME: 'openEuler 20.09',
        DOWNLOAD_URL: 'https://archives.openeuler.openatom.cn/openEuler-20.09/',
        DESC: 'openEuler 20.09 版本是满足开放场景的创新发行版，生命周期六个月。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/20.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/20.09/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://archives.openeuler.openatom.cn/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler-whitepaper-2009.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.09',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2020/09',
        LTS: false,
        VERSION: '20.09',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  'f747340863be3e1805e1dd8e2527a0b8a2b28f46528e538b54d78f16feee7af5',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/x86_64/openEuler-20.09-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '13.1 GiB',
                SHACODE:
                  'e750d4994016198b33d4e8525ee31486e212e899643b5de257a84761fe33c21b',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/x86_64/openEuler-20.09-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.4 GiB',
                SHACODE:
                  'b5a4729aaa24d1cab22ab247dd788d84dda20ddba99dda007035580b7b719083',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/aarch64/openEuler-20.09-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '12.6 GiB',
                SHACODE:
                  '8fbcb81b6b76edf516de62cd04a8286d45b333a9244682b61e0beca8276fb560',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/aarch64/openEuler-20.09-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2021/03',
      },
      {
        NAME: 'openEuler 20.03 LTS',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS/',
        DESC: 'openEuler 20.03 LTS 版本是满足开放场景的标准发行版，生命周期四年。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.03-LTS',
        MANUFACTURER: 'openEuler社区',
        PUBLISH_DATE: '2020/03',
        LTS: true,
        VERSION: '20.03-LTS',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.2 GiB',
                SHACODE:
                  '419592be9cba55a2b800e761d865550f28133875920e7bb9c2d5cdaad90a9cbf',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-x86_64-dvd.iso',
                TIPS: 'x86_64架构的基础安装ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '11.2 GiB',
                SHACODE:
                  '71d1d8e1c7e33af54f3af1915556cd21b62d591c067170040bd9e7371ec21506',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-everything-x86_64-dvd.iso',
                TIPS: 'x86_64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '	4.3 GiB',
                SHACODE:
                  '3e7cb72d746c5385b02b7a4bf18360925145d13f06bbd41c1a137e545b651d40',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/aarch64/openEuler-20.03-LTS-aarch64-dvd.iso',
                TIPS: 'aarch64架构的边缘ISO，包含了运行最小系统的核心组件',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '10.9 GiB',
                SHACODE:
                  '459e2309f47bab9ef2f71aaf5dc1788307eabb589719b9880cc1c76acfea7735',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/aarch64/openEuler-20.03-LTS-everything-aarch64-dvd.iso',
                TIPS: 'aarch64架构的全量安装ISO，包含了运行完整系统所需的全部组件',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2',
                SIZE: '433.4 MiB',
                SHACODE: '',
                DOWNLOAD_LINK:
                  'openEuler-preview/RISC-V/openEuler-20.03-riscv64/Image/openEuler-preview.riscv64.qcow2',
                TIPS: '',
              },
            ],
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/03',
      },
      {
        NAME: 'openEuler Preview',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-preview/',
        DESC: 'openEuler Preview 为社区制作的尝鲜版，旨在对于新技术的探索，当前包含了对于RISC-V架构的支持。',
        INSTALL_GUIDENCE_URL:
          'https://gitee.com/openeuler/RISC-V/blob/master/documents/Installing.md',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/RISC-V/issues',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        MANUFACTURER: 'openEuler RISC-V SIG组',
        PUBLISH_DATE: '2020/09',
        LTS: false,
        VERSION: '20.03-LTS',
        PREVIEW: true,
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'openEuler Preview',
                SIZE: '',
                SHACODE: '',
                DOWNLOAD_LINK: 'https://repo.openeuler.org/openEuler-preview/',
                TIPS: 'unknown',
              },
            ],
            ARCH: '',
            SCENARIO: 'unknown',
          },
        ],
      },
    ],
    COMMERCIAL_RELEASE_LIST: [
      {
        NAME: '恒生HUNDSUN LightOS操作系统V1.0',
        DOWNLOAD_URL: 'https://uplus.hundsun.com/LightOS/LightOS1.0/index.html',
        DESC: '恒生LightOS操作系统是基于国内openEuler开源社区构建的企业级操作系统，具备高效、稳定、安全的特性，致力于为企业级的数据库、大数据、云计算、人工智能平台提供安全稳定的运行基础。',
        MANUFACTURER: '恒生电子股份有限公司',
        PUBLISH_DATE: '2023/05',
        DETAILED_LINK: [
          {
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '超聚变服务器操作系统 FusionOS 22 （免费使用授权）',
        DOWNLOAD_URL:
          'https://eco.xfusion.com/solutions/market/application/419662379870064640',
        DESC: 'FusionOS 22是一款基于openEuler操作系统，面向运营商、金融、政企等行业关键业务设计开发的企业级服务器操作系统。为了让广大的用户能更便捷、更低成本地获得FusionOS 22的极致业务体验，超聚变提供了超聚变服务器操作系统FusionOS 22（免费使用授权）。',
        MANUFACTURER: '超聚变数字技术有限公司',
        PUBLISH_DATE: '2023/03',
        DETAILED_LINK: [
          {
            LINK: 'https://eco.xfusion.com/solutions/market/application/419662379870064640',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://eco.xfusion.com/solutions/market/application/419662379870064640',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '天鹤操作系统 ISSEOS V22',
        DOWNLOAD_URL:
          'https://www.isscloud.com/template/pc/system/isseOS.html#',
        DESC: '天鹤操作系统（简称 ISSEOS）是软通动力基于 openEuler 自主研发、自主可控的企业级 Linux 操作系统，支持鲲鹏、海光、飞腾等多种处理器，同时也支持 SM2、SM3、SM4 等多种国密算法，具备高性能、高运维、高兼容以及高可靠等增强特性，适用于数据库、大数据、云计算、人工智能等应用场景，可以为各行业的客户提供高效、稳定、专业的技术支持和服务。',
        MANUFACTURER: '软通动力信息技术（集团）股份有限公司',
        PUBLISH_DATE: '2022/12',
        DETAILED_LINK: [
          {
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '凝思安全操作系统V6.0',
        DOWNLOAD_URL: 'https://www.linx-info.com/download/os/el/',
        DESC: '凝思安全操作系统V6.0基于openEuler 20.03 LTS SP3 开发，内置凝思固域安全子系统，具有高可靠、高安全、高性能和高兼容等特性，能够保障生产系统和关键业务系统的安全稳定运行。',
        MANUFACTURER: '北京凝思软件股份有限公司',
        PUBLISH_DATE: '2022/08',
        DETAILED_LINK: [
          {
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '拓林思企业级服务器操作系统',
        DOWNLOAD_URL: 'http://download.turbolinux.com.cn:8013/',
        DESC: '拓林思企业级服务器操作系统是一款基于openEuler操作系统打造的针对x86_64、AArch64处理器架构的操作系统发行版，适用于数据库、云计算、大数据、分布式计算等多种应用场景，为客户提供安全、可靠的解决系统方案，为各类应用提供标准、稳定的运行环境。',
        MANUFACTURER: '北京拓林思软件有限公司',
        PUBLISH_DATE: '2022/06',
        DETAILED_LINK: [
          {
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '统信服务器操作系统V20',
        DOWNLOAD_URL: ' https://www.chinauos.com/resource/download-server',
        DESC: '统信服务器操作系统（UnionTech OS Server）是统信操作系统（统信UOS）产品家族中面向服务器端运行环境的版本，是一款用于构建信息化基础设施环境的平台级软件。该操作系统基于Linux 稳定内核研发，集成了资源管理、运维管理、和 DDE 桌面环境等标准系统组件，服务管理、中间件、WEB 服务、办公服务等应用服务组件，国密算法、安全审计等安全服务组件，虚拟化、容器、云平台、人工智能、大数据、可视化运维、集群运维、智能调优、和迁移助手等高级服务组件。产品主要面向于我国党政军、企事业单位、教育机构，以及普通的企业型用户，着重解决客户在信息化基础建设过程中，服务端基础设施的安装部署、运行维护、应用支撑等需求。',
        MANUFACTURER: '统信软件技术有限公司',
        PUBLISH_DATE: '2022/03',
        DETAILED_LINK: [
          {
            LINK: 'https://www.chinauos.com/resource/download-server',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://www.chinauos.com/resource/download-server',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://www.chinauos.com/resource/download-server',
            ARCH: 'LoongArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'BCLinux for Euler V21.10',
        DOWNLOAD_URL: 'https://mirrors.cmecloud.cn/bclinux/oe21.10/',
        DESC: 'BC-Linux for Euler 是中国移动自主研发，以openEuler社区操作系统为基础，借助开源社区的开放优势，通过定制化手段研发的企业级Linux操作系统，具备专业化、本地化的Linux开发和运维服务能力，能充分满足顾客对于云计算和大数据通用场景、边缘计算、虚拟化及容器和PaaS业务场景需求。',
        RELEASE_DESC_URL:
          'https://ecloud.10086.cn/op-help-center/doc/article/41432',
        INSTALL_GUIDENCE_URL:
          'https://ecloud.10086.cn/op-help-center/doc/article/54482',
        SEEK_HELP_URL: 'https://ecloud.10086.cn/home/about/contact',
        GET_ISO_URL: 'https://mirrors.cmecloud.cn/bclinux/oe21.10/ISO/',
        MANUFACTURER: '中国移动云能中心',
        PUBLISH_DATE: '2021/10',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://mirrors.cmecloud.cn/bclinux/oe21.10/ISO/x86_64/release/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://mirrors.cmecloud.cn/bclinux/oe21.10/ISO/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '红旗Asianux服务器操作系统V8.1',
        DOWNLOAD_URL: 'http://pan.chinaredflag.cn/d/d3041d958a8d4da1881d/',
        DESC: '红旗Asianux服务器操作系统（欧拉版）是基于openEuler20.03 LTS SP1进行二次开发的商业发行版，目前内核版本为4.19。',
        RELEASE_DESC_URL: 'http://www.linuxsir.cn/?product.htm&pid=2',
        INSTALL_GUIDENCE_URL: 'http://www.linuxsir.cn/?product.htm&pid=2',
        SEEK_HELP_URL: '',
        GET_ISO_URL: 'http://pan.chinaredflag.cn/d/d3041d958a8d4da1881d/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '中科红旗（北京）信息科技有限公司',
        PUBLISH_DATE: '2021/03',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'http://pan.chinaredflag.cn/d/d3041d958a8d4da1881d/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'HopeStage',
        DOWNLOAD_URL: 'http://webapp.hoperun.com:8007/HopeStage/',
        DESC: '企业级通用操作系统HopeStage是基于openEuler构建的企业级Linux操作系统，具备高效、稳定、安全的特性，致力于为企业级的数据库、大数据、云计算、人工智能平台提供安全稳定的运行基础。',
        RELEASE_DESC_URL:
          'http://webapp.hoperun.com:8007/HopeStage/HopeStage-Enterprise-Linux_ReleaseNotes.pdf',
        INSTALL_GUIDENCE_URL:
          'http://webapp.hoperun.com:8007/HopeStage/HopeStage-Enterprise-Linux_Installation_Guide.pdf',
        SEEK_HELP_URL: 'http://www.hopeinfra.com/contactus.html',
        GET_ISO_URL: 'http://webapp.hoperun.com:8007/HopeStage/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '江苏润和',
        PUBLISH_DATE: '2020/09',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '银河麒麟高级服务器操作系统V10',
        DOWNLOAD_URL: 'https://kylinos.cn/scheme/server/1.html',
        DESC: '银河麒麟高级服务器操作系统V10是针对企业级关键业务，适应虚拟化、云计算、大数据、工业互联网时代对主机系统可靠性、安全性、性能、扩展性和实时性等需求，依据CMMI5级标准研制的提供内生本质安全、云原生支持、自主平台深入优化、 高性能、易管理的新一代自主服务器操作系统，同源支持飞腾、鲲鹏、龙芯、申威、海光、兆芯等自主平台；应用于政府、金融、教育、财税、公安、审计、交通、医疗、制造等领域。基于银河麒麟高级服务器操作系统，用户可轻松构建数据中心、高可用集群和负载均衡集群、虚拟化应用服务、分布式文件系统等，并实现对虚拟数据中心的跨物理系统、虚拟机集群进行统一的监控和管理。 银河麒麟高级服务器操作系统支持云原生应用，满足企业当前数据中心及下一代的虚拟化(含Docker容器)、大数据、云服务的需求，为用户提供融合、统一、自主创新的基础软件平台及灵活的管理服务。',
        INSTALL_GUIDENCE_URL: 'https://kylinos.cn/scheme/server/1.html',
        GET_ISO_URL: 'https://kylinos.cn/scheme/server/1.html',
        MANUFACTURER: '麒麟软件有限公司',
        PUBLISH_DATE: '2020/07',
        LTS: false,
      },
      {
        NAME: '麒麟信安 Kylinsec V3.5.1',
        DOWNLOAD_URL: 'https://mirrors.kylinsec.com.cn/V3.5-1/',
        DESC: '麒麟信安操作系统基于Linux内核开发，以openEuler LTS为基础，具备高安全、高可靠、强实时、可定制等特性，与国内主要软硬件厂商共建生态体系。该系统连续七次通过公安部四级测评，承担多项国家级重大专项任务，为国防、政务、能源、交通等领域提供行业级操作系统解决方案。',
        RELEASE_DESC_URL:
          'http://kylinsec.com.cn/Uploads/Pdf/2022-11-18/kylinsecpages3.5.1.pdf',
        INSTALL_GUIDENCE_URL:
          'http://kylinsec.com.cn/Uploads/Pdf/2022-11-18/KYJS-KY3.5.1-Server-SUM-V1.0.pdf',
        SEEK_HELP_URL: '',
        GET_ISO_URL: 'https://mirrors.kylinsec.com.cn/V3.5-1/isos/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '麒麟信安 Kylinsec',
        PUBLISH_DATE: '',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.5-1/isos/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.5-1/isos/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '麒麟信安 Kylinsec V3.4-5',
        DOWNLOAD_URL: 'https://mirrors.kylinsec.com.cn/V3.4-5/',
        DESC: '麒麟信安操作系统基于Linux内核开发，以openEuler LTS为基础，具备高安全、高可靠、强实时、可定制等特性，与国内主要软硬件厂商共建生态体系。该系统连续七次通过公安部四级测评，承担多项国家级重大专项任务，为国防、政务、能源、交通等领域提供行业级操作系统解决方案。',
        RELEASE_DESC_URL:
          'http://kylinsec.com.cn/Uploads/Pdf/2022-11-18/kylinsecpages-3.4-5.pdf',
        INSTALL_GUIDENCE_URL:
          'http://kylinsec.com.cn/Uploads/Pdf/2022-11-18/KYJS-KY3.4-5-SUM-V1.0.pdf',
        SEEK_HELP_URL: '',
        GET_ISO_URL: 'https://mirrors.kylinsec.com.cn/V3.4-5/isos/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '麒麟信安 Kylinsec',
        PUBLISH_DATE: '',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.4-5/isos/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.4-5/isos/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '麒麟信安 Kylinsec V3.4-4',
        DOWNLOAD_URL: 'https://mirrors.kylinsec.com.cn/V3.4-4/',
        DESC: '麒麟信安操作系统基于Linux内核开发，以openEuler LTS为基础，具备高安全、高可靠、强实时、可定制等特性，与国内主要软硬件厂商共建生态体系。该系统连续七次通过公安部四级测评，承担多项国家级重大专项任务，为国防、政务、能源、交通等领域提供行业级操作系统解决方案。',
        RELEASE_DESC_URL:
          'http://www.kylinsec.com.cn/Uploads/Download/2020-09-21/5f6846656373a.pdf',
        INSTALL_GUIDENCE_URL:
          'http://www.kylinsec.com.cn/Uploads/Download/2020-09-21/5f6846807a00f.pdf',
        SEEK_HELP_URL: '',
        GET_ISO_URL: 'https://mirrors.kylinsec.com.cn/V3.4-4/isos/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '麒麟信安 Kylinsec',
        PUBLISH_DATE: '',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.4-4/isos/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.4-4/isos/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'HopeEdge',
        DOWNLOAD_URL: 'http://webapp.hoperun.com:8007/HopeEdge/',
        DESC: '物联网边缘计算操作系统HopeEdge是基于openEuler构建的、面向IoT场景的边缘计算操作系统，具备轻量安全、自主创新、高效互联、快速部署四大关键特性；提供设备管理、数据采集、云边协同、人工智能等功能。',
        RELEASE_DESC_URL:
          'http://webapp.hoperun.com:8007/HopeEdge/HopeEdgeOS_ReleaseNote.pdf',
        INSTALL_GUIDENCE_URL:
          'http://webapp.hoperun.com:8007/HopeEdge/HopeEdgeOS_Installation_Guide.pdf',
        SEEK_HELP_URL: 'http://www.hopeinfra.com/contactus.html',
        GET_ISO_URL: 'http://webapp.hoperun.com:8007/HopeEdge/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '江苏润和',
        PUBLISH_DATE: '2020/07',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '中科傲来服务器操作系统',
        DOWNLOAD_URL: 'https://eulixos.com/#/download',
        DESC: '中科傲来服务器操作系统是一款基于openEuler操作系统打造的服务器操作系统发行版，支持X86_64、AArch64、RISC-V等多种处理器架构，适用于数据库、云计算、大数据、人工智能、分布式计算等多种应用场景，具备高安全、高可靠、高性能、跨平台等特点，旨在为各类应用及解决方案提供标准、安全、可靠的操作系统及服务。',
        RELEASE_DESC_URL:
          'https://eulixos.com/userguide/%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E/%E7%89%88%E6%9C%AC%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E.html',
        INSTALL_GUIDENCE_URL:
          'https://eulixos.com/userguide/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97/%E5%89%8D%E8%A8%80.html',
        SEEK_HELP_URL: 'https://eulixos.com/#/feedback',
        GET_ISO_URL: 'https://eulixos.com/#/download',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '中科院软件所',
        PUBLISH_DATE: '2020/05',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://eulixos.com/#/download',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://eulixos.com/#/download',
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '普华服务器操作系统v5.1',
        DOWNLOAD_URL: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
        DESC: '暂无描述',
        RELEASE_DESC_URL: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
        INSTALL_GUIDENCE_URL: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
        SEEK_HELP_URL:
          'https://p.qiao.baidu.com/cps4/chatIndex?siteToken=9a45f9cee67affa160b6addd06e07a8d&speedLogId=160067949693727da_1600679496937_87121&eid=30746007&reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22-1%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2215215804%22%2C%22userId%22%3A%2230746007%22%2C%22pageId%22%3A0%7D ',
        GET_ISO_URL: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: '普华软件',
        PUBLISH_DATE: '',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: '同源OS 8.1欧拉发行版',
        DOWNLOAD_URL: 'http://repo.tongyuanos.com/TongyuanOS8.1-euler/',
        DESC: '内核源码来自于欧拉开源社区中，其它软件包来自于CentOS8.1的aarch64版，完全兼容CentOS8.1，产品发布物为标准启动安装ISO。',
        INSTALL_GUIDENCE_URL: 'http://repo.tongyuanos.com/TongyuanOS8.1-euler/',
        SEEK_HELP_URL: 'mailto:youliang.wu@tongyuanos.com',
        GET_ISO_URL: 'http://repo.tongyuanos.com/TongyuanOS8.1-euler/',
        MANUFACTURER: '同源OS',
        PUBLISH_DATE: '2020/04',
        LIFE_CYCLE_URL: '',
        RELEASE_DESC_URL: 'http://repo.tongyuanos.com/TongyuanOS8.1-euler/',
        LTS: false,
      },
    ],
    SCENARIO_LIST: [
      { KEY: '', VALUE: '全部' },
      { KEY: 'SERVER', VALUE: '服务器' },
      { KEY: 'EDGE_CLOUD', VALUE: '边缘计算' },
      { KEY: 'CLOUD_COMPUTING', VALUE: '云计算' },
      { KEY: 'EMBEDDED', VALUE: '嵌入式' },
    ],
  },
  en: {
    COMMUNITY_LIST: [
      {
        NAME: 'openEuler 22.03 LTS SP2',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/',
        DESC: 'openEuler openEuler 22.03 LTS SP2 is the patch version of openEuler 22.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP2/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP2/docs/Releasenotes/installing-the-os.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=22.03-LTS-SP2',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/embedded_img/',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2023/06',
        LTS: true,
        VERSION: '22.03-LTS-SP2',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  '69ea8e0faa1b45cf4a63bc1c3584834fcebaf292a38e4391607e61ad6047c2b2',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/x86_64/openEuler-22.03-LTS-SP2-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '16.9 GiB',
                SHACODE:
                  '8f00c6251c944330fc0bedbcc1085ab029cd1e49aadd14c236658fa7ac0a8b2c',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/x86_64/openEuler-22.03-LTS-SP2-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '738.0 MiB',
                SHACODE:
                  'e7186579da6d16430bb8577e2989761e726af8166a08f7e02cde55a614b42d66',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/x86_64/openEuler-22.03-LTS-SP2-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.1 GiB',
                SHACODE:
                  '2c984a51342a0cd26802e64913486ed600479a69a68f25bcad99cc0a88405316',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/aarch64/openEuler-22.03-LTS-SP2-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '	16.5 GiB',
                SHACODE:
                  '7e270556361c38bd66565921be5f2327d611d6d8aef5a299d029abc0f7d9a07e',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/aarch64/openEuler-22.03-LTS-SP2-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '698.7 MiB',
                SHACODE:
                  'a406d2adae7ba26c0420da3ebfa7031dc09110da04b39120d055092c585eca76',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/ISO/aarch64/openEuler-22.03-LTS-SP2-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  'ae0a31cf4c9d24fd42d7e24b4e50b03ab464fa4e52c0301099a8d3ed950cc797',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/edge_img/x86_64/openEuler-22.03-LTS-SP2-edge-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.3 GiB',
                SHACODE:
                  '1a7aa792a4247e5d0f69ddd2aa43569eafaed25ae8a15c55d22285c698e4b1ba',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/edge_img/aarch64/openEuler-22.03-LTS-SP2-edge-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '379.5 MiB',
                SHACODE:
                  '84705761686f7e72c545c0f28fb25d045021f930a9f39ff3f28e354fd476f9cd',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/virtual_machine_img/x86_64/openEuler-22.03-LTS-SP2-x86_64.qcow2.xz',
                TIPS: 'VM image of openEuler in the x86_64 architecture.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '354.8 MiB',
                SHACODE:
                  '5c06e8e3737d9eabd693df287d50449548427946622ea393092b22be58f6252a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP2/virtual_machine_img/aarch64/openEuler-22.03-LTS-SP2-aarch64.qcow2.xz',
                TIPS: 'VM image of openEuler in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          // TODO:
        ],
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 23.03',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-23.03/',
        DESC: 'openEuler 23.03 uses Linux Kernel 6.1 to explore technologies, adapt hardware, and innovate basic technologies and upper-layer applications for future openEuler LTS versions built on Linux Kernel 6.x.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/23.03/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/23.03/docs/Releasenotes/installing-the-os.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/en/openEuler 23.03 Technical White Paper.pdf',
        WEBSITE_SELECT: '/en/mirror/select/?version=23.03',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-23.03/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-23.03/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-23.03/embedded_img/',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2023/03',
        LTS: false,
        VERSION: '23.03',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.7 GiB',
                SHACODE:
                  'ed48a94d38dca4aec18954a6f40e48b568a5a17ce4b836b0bae6c6a0739809f0',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/x86_64/openEuler-23.03-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '18.7 GiB',
                SHACODE:
                  '8d8d6dc6b5fbfcdfa9fa66e91871b464781322283d131172bdd374e7378db4f5',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/x86_64/openEuler-23.03-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '779.0 MiB',
                SHACODE:
                  'bd98088d6ad08535a037cf10734c7594bdd3b3974ecb58913d2f3381f883c084',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/x86_64/openEuler-23.03-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.4 GiB',
                SHACODE:
                  '850dd9ef5364866eb556f232db06bc9913a10b8cfe25113261a9be1712d206bf',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/aarch64/openEuler-23.03-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '18.2 GiB',
                SHACODE:
                  '31fdda1971aaf077218cf574ca07fc3a3ab78a40fa437fc7a44abe41aa11bbc7',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/aarch64/openEuler-23.03-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '734.4 MiB',
                SHACODE:
                  'f671b995935f0362222eb76f8ed97541007ea5b3fc230c10029e094bd11aeaac',
                DOWNLOAD_LINK:
                  'openEuler-23.03/ISO/aarch64/openEuler-23.03-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.6 GiB',
                SHACODE:
                  '1b99e475c8ab8ec241ad6b543387bf9dd7137846fef908f814d73be63536e00d',
                DOWNLOAD_LINK:
                  'openEuler-23.03/edge_img/x86_64/openEuler-23.03-edge-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  '65a48b1e60f68b857ec86ff0bc1216c2d8f45eebec78fb9f452ce7c50f11a516',
                DOWNLOAD_LINK:
                  'openEuler-23.03/edge_img/aarch64/openEuler-23.03-edge-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '405.1 MiB',
                SHACODE:
                  '036cdfe6d2ae2dae45eba493f6507edb25e5b50475c208f4310dd559136bc486',
                DOWNLOAD_LINK:
                  'openEuler-23.03/virtual_machine_img/x86_64/openEuler-23.03-x86_64.qcow2.xz',
                TIPS: 'VM image of openEuler in the x86_64 architecture.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '375.7 MiB',
                SHACODE:
                  '62435736a03a7fcbf13b5b81982dd4b7178de5d22f5c6008aface81dbb8e72e3',
                DOWNLOAD_LINK:
                  'openEuler-23.03/virtual_machine_img/aarch64/openEuler-23.03-aarch64.qcow2.xz',
                TIPS: 'VM image of openEuler in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.2 MiB',
                SHACODE:
                  'c596b9b15e3cf360337bfe85358e19dee37e1ab1a1034afa3612aa2b3d347beb',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '101.3 MiB',
                SHACODE:
                  '767c9e98a559e9f77fed61684f94f6286711b8f16eec1371ebfeec829a8d037c',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-23.03.sh',
                TIPS: 'Development and compilation toolchain in the AArch64 architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '48.8 MiB',
                SHACODE:
                  'c4537fd6cde6d1e944465b3c02190587b8656fd40bb9e80e7408bff8a3be671f',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20230329193643.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the AArch64 architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '154.9 MiB',
                SHACODE:
                  '9cb9bd2f733e2f5a48ddc396c0715b59077927ea04580dc0394393e7cfd88df1',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.9 MiB',
                SHACODE:
                  'a86563a107c4f4b0bf91c319b9be753a3b7cc21b862a0004f348e41a490594f5',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  'd044cc405c78e51d2e4381dc30fa5fe9d444e87cff4d8cbd792e482fd40f995f',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '92.3 MiB',
                SHACODE:
                  '75d161bfbbc30510fbc7db8650aa9afe0d9277b439560b3b78e1a9d285aea034',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-23.03.sh',
                TIPS: 'Development and compilation toolchain in the ARM architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '44.8 MiB',
                SHACODE:
                  'fbf700dde6db257212bdb1f5dbe06b086b1a476f69f063211f945bf070db125e',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20230329220826.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the arm architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '111.9 MiB',
                SHACODE:
                  'e75fb3e294fdd562f29ac91af53a216eccacf9310a749bed2e61c98d00b37c2c',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  '6d4b0287f34d599c785d56e96f993c52df5a81721e7ac02f41c9ffa089ab1eab',
                DOWNLOAD_LINK:
                  'openEuler-23.03/embedded_img/arm32/arm-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the ARM architecture.',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],

        PLANNED_EOL: '2023/09',
      },
      {
        NAME: 'openEuler 22.03 LTS SP1',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/',
        DESC: 'openEuler openEuler 22.03 LTS SP1 is the patch version of openEuler 22.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP1/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP1/docs/Releasenotes/installing-the-os.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=22.03-LTS-SP1',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP1/embedded_img/',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2022/12',
        LTS: true,
        VERSION: '22.03-LTS-SP1',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  'bdebae1d0b95fc92269ce96da3c57339b9c571a02e11fb7d3d0b336e520072e9',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/x86_64/openEuler-22.03-LTS-SP1-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '16.5 GiB',
                SHACODE:
                  '599339f6f4cc7c7ad0e9ca2539d4d23ef4d7e22267a53ef6c9bfbfc6db6604f5',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/x86_64/openEuler-22.03-LTS-SP1-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '746.0 MiB',
                SHACODE:
                  '0c712b47da13960efffe9a50161337359e2227dc5fabe05158a17997f8ab7354',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/x86_64/openEuler-22.03-LTS-SP1-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.1 GiB',
                SHACODE:
                  'a273238dd0e15fa603a60441c5348c74ba1b6ee31e4c7243d2d5dd782c94280c',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/aarch64/openEuler-22.03-LTS-SP1-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '	16.1 GiB',
                SHACODE:
                  'c5197831bd5d10fdbec6427be88375ead00f7fe962b6e634f7e00823e4a5316a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/aarch64/openEuler-22.03-LTS-SP1-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '707.6 MiB',
                SHACODE:
                  '3a964b264d0d57c3cf2e5bad9f591716fb745c7c27d20f39fb44f3aa83c36dc8',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/ISO/aarch64/openEuler-22.03-LTS-SP1-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.5 GiB',
                SHACODE:
                  'c52b7eec9962e84010a21cd55a46ebd339d49d654307c4c735380ac1288d2a74',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/edge_img/x86_64/openEuler-22.03-LTS-SP1-edge-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  '23007471274039cfc9555c19ae5555328bc2313b03935ce51c2b7fb260834c85',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/edge_img/aarch64/openEuler-22.03-LTS-SP1-edge-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '389.4 MiB',
                SHACODE:
                  '3d1abe15417403dd77f1675c2d738c23495ce94c3b1cf97b77b4f37853237538',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/virtual_machine_img/x86_64/openEuler-22.03-LTS-SP1-x86_64.qcow2.xz',
                TIPS: 'VM image of openEuler in the x86_64 architecture.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '389.4 MiB',
                SHACODE:
                  '15558c50f2cc1103405550434b04f0a1e2904d782c4bc772c277589bacdd5abb',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/virtual_machine_img/aarch64/openEuler-22.03-LTS-SP1-aarch64.qcow2.xz',
                TIPS: 'VM image of openEuler in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '	9.2 MiB',
                SHACODE:
                  'c2739c1aedd08bfc8ce9b80ab8b31eef344e248b7909aaba4967f6a7e01cd028',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '101.1 MiB',
                SHACODE:
                  '5088614dfa67ecc445465f269a3c7257348482310e0995f33637d616d1f6d98e',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-22.03.sh',
                TIPS: 'Development and compilation toolchain in the AArch64 architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '	41.8 MiB',
                SHACODE:
                  'f691787e4656daef17dc2bfb306ea2be13915d6c085114d79fb6a561ae42b11e',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20221228125551.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the AArch64 architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '154.6 MiB',
                SHACODE:
                  '05d19b5a16ef8c19b7da84db642c27b16769f2f2d5971e6dbf01f0dd7bc996de',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.9 MiB',
                SHACODE:
                  '52721a7967c01573108ac4f92301643ab9146080fa7491fb6f223d2e0f203634',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  '782faecd9018f26013efb57457f3523be47bbc57c841f384e5ad1e05faccb624',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '91.0 MiB',
                SHACODE:
                  '152f41a87f54c46f892c4b4114f739dc7afd951e52e93674e87027a771fe125f',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-22.03.sh',
                TIPS: 'Development and compilation toolchain in the ARM architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '34.6 MiB',
                SHACODE:
                  'b85b6117121db0e0d9a85ae3c76658828d6da6f827564a38b2857637d323f23d',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20221228125551.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the ARM architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '111.7 MiB',
                SHACODE:
                  'f0f21dfd90e84ea5ae1513108a4520df96a2d7da0a2d2e9691122522b4cd4d84',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  'ad9e3e6290fde6edfe8f8863cf78fb87b48bd070b07d306548f234279406ff71',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS-SP1/embedded_img/arm32/arm-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the ARM architecture.',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2024/12',
      },
      {
        NAME: 'openEuler 22.09',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.09/',
        DESC: 'Unleashing diversified computing power, openEuler 22.09 innovates versatile scenarios, builds optimal porting capability, and interconnects with OpenHarmony.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.09/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=22.09',
        SERVER_IMAGE: 'https://repo.openeuler.org/openEuler-22.09/ISO/',
        WHITE_PAPER: '/whitepaper/en/openEuler-22.09 Technical White Paper.pdf',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.09/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-22.09/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.09/embedded_img/',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2022/09',
        LTS: false,
        VERSION: '22.09',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  'ce38bd727b240cf869cf8fdd79c5084601c1ce67fcdc6b1cfc01d4c792e7f093',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/x86_64/openEuler-22.09-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '17.3 GiB',
                SHACODE:
                  'ea6116a645580cae87ecc061c0a821941fc1cb70edce86257e8da0e2925a91ce',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/x86_64/openEuler-22.09-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '724.0 MiB',
                SHACODE:
                  '0f1c770c5e75568522d0414cfef9d3ed9e87ec456213456d96e2fd24ed50905c',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/x86_64/openEuler-22.09-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.1 GiB',
                SHACODE:
                  '061a15878a8a49ed7071663bb5095a9304d3d4c5ef25c302e2fba478ae929cd2',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/aarch64/openEuler-22.09-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '16.9 GiB',
                SHACODE:
                  'b9e3add41b428c31f11157c0564e84773ac70e0f329787a2b5845df39e7a14ed',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/aarch64/openEuler-22.09-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '686.6 MiB',
                SHACODE:
                  'bde8b6eaf3ee38ffbf1531d940599095a0529f3d62bc15ce0af395cf119a113e',
                DOWNLOAD_LINK:
                  'openEuler-22.09/ISO/aarch64/openEuler-22.09-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'riscv64',
                SIZE: '',
                SHACODE: '',
                DOWNLOAD_LINK:
                  'openEuler-preview/RISC-V/openEuler-22.09-riscv64/',
              },
            ],
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  'd7ebccc72c121a166be1709b845f830bbc63aba6185c2ce82b87ab63e68447d2',
                DOWNLOAD_LINK:
                  'openEuler-22.09/edge_img/x86_64/openEuler-22.09-edge-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.3 GiB',
                SHACODE:
                  'c150be00a17d61425dea8b62d0891ed4f114aa6e2418f73e04640b1bc907638d',
                DOWNLOAD_LINK:
                  'openEuler-22.09/edge_img/aarch64/openEuler-22.09-edge-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '386.7 MiB',
                SHACODE:
                  'f748f6340588c417742c928adec36e2e65d1d298263014f719ce4913e854f3d1',
                DOWNLOAD_LINK:
                  'openEuler-22.09/virtual_machine_img/x86_64/openEuler-22.09-x86_64.qcow2.xz',
                TIPS: 'VM image of openEuler in the x86_64 architecture.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '361.6 MiB',
                SHACODE:
                  '1c12f1952f2f391f9a0302dbe7de01b7aefed8015e7243c9d16ec118948a05d9',
                DOWNLOAD_LINK:
                  'openEuler-22.09/virtual_machine_img/aarch64/openEuler-22.09-aarch64.qcow2.xz',
                TIPS: 'VM image of openEuler in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.2 MiB',
                SHACODE:
                  'f42cc47bcdea971f74525100ceff606e2e0cf4a182b697319cfde1080aac7ad9',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '99.3 MiB',
                SHACODE:
                  '31bea37536083471b8ec6758382b37ce73067b3df73a8503ade6053ed97b9c27',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-22.09.sh',
                TIPS: 'Development and compilation toolchain in the AArch64 architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '41.7 MiB',
                SHACODE:
                  '167de49c135cd2039694ba46ed43ffa72f65002064b752b4787767b4905fe140',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20220929163137.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the AArch64 architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '154.8 MiB',
                SHACODE:
                  '7aa64b6b2f0da091f460244335085839c7b533ba3b84432273a31eb2a1a2e703',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.9 MiB',
                SHACODE:
                  '689da4deda8b4ad5e39acdb6453d45ddef0186568cad179570460db060b6fd34',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  'b4ba1ba36b7cd9f97487e1411cfe1abd3af40a9cb5e7da382df8736cc75df779',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '	86.7 MiB',
                SHACODE:
                  '017c3d46873ec6cf4c16dc3fca9f2fb088cb255050c5425a442becdb9808dab2',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-22.09.sh',
                TIPS: 'Development and compilation toolchain in the ARM architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '34.4 MiB',
                SHACODE:
                  '4e1bde7e7b22efe3dc3ca69c35e6ff5c4525e1703b975ad59dffef4aa1c73dff',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20220929163137.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the ARM architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '111.7 MiB',
                SHACODE:
                  'f9d44fdaaffef4eb08de8bf8c371f412334f4f2861e1f839d5520d40563a3384',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  '2491af5477c165cc27ad8728a339ea59ab937cc22bee94a60be5bc596841008a',
                DOWNLOAD_LINK:
                  'openEuler-22.09/embedded_img/arm32/arm-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the ARM architecture.',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2023/03',
      },
      {
        NAME: 'openEuler 22.03 LTS',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS/',
        DESC: 'openEuler 22.03-LTS is based on the 5.10 kernel and supports all scenarios of server, cloud, edge and embedded',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS/docs/Installation/installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=22.03-LTS',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-22.03-LTS/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS/embedded_img/',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2022/03',
        LTS: true,
        VERSION: '22.03-LTS',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.4 GiB',
                SHACODE:
                  'a07952feb2f9f0239143daf6cc061a396e09bbb3e26d8fbf38eeb21d0251bde0',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/x86_64/openEuler-22.03-LTS-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.6 GiB',
                SHACODE:
                  'ad36b1feadcc96996e7fb5fefdf46cd07c56941dba93c5a8ebe6985d0c891813',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/x86_64/openEuler-22.03-LTS-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '721.0 MiB',
                SHACODE:
                  '8f754e5c165bba4bf7f6000bf2277a43f5927b58b8ab6a431f8197ba525ae972',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/x86_64/openEuler-22.03-LTS-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.0 GiB',
                SHACODE:
                  '8ee6e6ea6fe3af075846efb28196aac6edd50c99b663b0fc4651fa71195a68e6',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/aarch64/openEuler-22.03-LTS-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.3 GiB',
                SHACODE:
                  'a6e7770d43c733fc51b29b2bf68360928dbd67df5144f408a0d4ada6037c8d6a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/aarch64/openEuler-22.03-LTS-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '	679.8 MiB',
                SHACODE:
                  'd66b8b3eb89d2f361747622e16922fce601b8a0dbe43f6790d5dd94a447c7177',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/ISO/aarch64/openEuler-22.03-LTS-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'riscv64',
                SIZE: '',
                SHACODE: '',
                DOWNLOAD_LINK:
                  'openEuler-preview/RISC-V/openEuler-22.03-V1-riscv64/',
              },
            ],
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'loongarch',
                SIZE: '2.1 GiB',
                SHACODE: '29eaf6db6702c1ce91b9ee73c58e7543',
                DOWNLOAD_LINK:
                  'openEuler-preview/loongarch/ISO/openEuler-22.03-LTS-loongarch64-dvd-beta4.iso',
              },
            ],
            ARCH: 'LoongArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'preview-ppc',
                SIZE: '4.4 GiB',
                SHACODE: '2322c5dc76238ecaa97014843e3e4ef5',
                DOWNLOAD_LINK:
                  'openEuler-preview/power/ISO/openEuler-22-03-LTS-ppc64le-dvd-alpha.iso',
              },
            ],
            ARCH: 'Power',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'OS-isoe',
                SIZE: '2.8 GiB',
                SHACODE:
                  'a0e5e38f9100e52bb89e24a0b0d4640e77ed64f898d526b288bff11c6877bf5a',
                DOWNLOAD_LINK:
                  'openEuler-preview/sw_arch/openEuler-22.03-LTS/ISO/openEuler-Server-OS-isoe-sw_64-20220927.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.6 GiB',
                SHACODE:
                  '0b4da0698fbe96525e761ab3fc82cfa5420dc27fa7260c084afefae9630a0b02',
                DOWNLOAD_LINK:
                  'openEuler-preview/sw_arch/openEuler-22.03-LTS/ISO/openEuler-Server-OS-isoe-sw_64-20220927-everything.iso',
                TIPS: 'Full installation ISO file of the sw_arch architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'OS-isoe',
                SIZE: '3.6 GiB',
                SHACODE: 'b2ed6c518cf8637e84bd3e019d4200c4',
                DOWNLOAD_LINK:
                  'openEuler-preview/sw_arch/openEuler-22.03-LTS/ISO/openEuler-Server-OS-isoe-sw_64-20221227.iso',
              },
            ],
            ARCH: 'SW64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.5 GiB',
                SHACODE:
                  'd678e81f90b4642c6e3236c5a03372601a529838d842f5e1a2c3baaee079eb5a',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/edge_img/x86_64/openEuler-22.03-LTS-edge-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '1.4 GiB',
                SHACODE:
                  '393e7a310518fde73c3af7a89094d0bab98f430f6a0cb7bce546ff00851fe4d9',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/edge_img/aarch64/openEuler-22.03-LTS-edge-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EDGE_CLOUD',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '385.9 MiB',
                SHACODE:
                  '5859a5dddd64571e983b001ee8c72a7b211b21ed215dbe00ae9ab3d9d8bdf2b2',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/virtual_machine_img/x86_64/openEuler-22.03-LTS-x86_64.qcow2.xz',
                TIPS: 'VM image of openEuler in the x86_64 architecture.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2.xz',
                SIZE: '364.1 MiB',
                SHACODE:
                  '2405854a017f5b4e00459a8030b78f00770450044d7454abb7db23e7f29b1a6b',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/virtual_machine_img/aarch64/openEuler-22.03-LTS-aarch64.qcow2.xz',
                TIPS: 'VM image of openEuler in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'CLOUD_COMPUTING',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '8.3 MiB',
                SHACODE:
                  'bbf002146d86e73dba3e85874af4fbf4dc9a3e74ed0de503944a5bd388f08415',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '163.7 MiB',
                SHACODE:
                  '0c052ec474da6794ed53c9de3f0b24fcb3a5d904cbce86fbc8e74e1e4419028b',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/openeuler-glibc-x86_64-openeuler-image-aarch64-qemu-aarch64-toolchain-22.03.sh',
                TIPS: 'Development and compilation toolchain in the AArch64 architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '	33.4 MiB',
                SHACODE:
                  '2a136d0f3a7e56595adb85d82ec87460cdb856e8913462dd419f847890ac925c',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/openeuler-image-qemu-aarch64-20220331025547.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the AArch64 architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '143.5 MiB',
                SHACODE:
                  '2e7c6d3cbb172f9af2852f00eb3ad5d13131971e084be02919a3b4fab639f805',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.6 MiB',
                SHACODE:
                  'd3d571bb45c87e8a5353cf8e98f06cc25c09b02209ef3e40b8423f1b7b59e8cb',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm64/aarch64-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the AArch64 architecture.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'EMBEDDED',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Image',
                SIZE: '9.4 MiB',
                SHACODE:
                  '1fe7147ae1db0a711ef38ac8bda64de0d422fd8c78b5751e5784b48a30c79cd1',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/Image-5.10.0',
              },
              {
                TYPE: 'openEuler glibc',
                SIZE: '	150.5 MiB',
                SHACODE:
                  '5c69c4cbeed0797d325b3ac93fa46fcbfeaaecaba5c236f20e35952527bfa750',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/openeuler-glibc-x86_64-openeuler-image-armv7a-qemu-arm-toolchain-22.03.sh',
                TIPS: 'Development and compilation toolchain in the ARM architecture.',
              },
              {
                TYPE: 'openEuler Image qemu',
                SIZE: '30.4 MiB',
                SHACODE:
                  '53481a51808b0e92bb8f76fd8c449cb21dcd524ece735e149ccd80b37764a590',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/openeuler-image-qemu-arm-20220331025547.rootfs.cpio.gz',
                TIPS: 'File system that supports QEMU in the ARM architecture.',
              },
              {
                TYPE: 'vmlinux',
                SIZE: '110.9 MiB',
                SHACODE:
                  'd7fff2f1e4e280bc7316ef714d7fbf2ea6b39c5074c5012b03063fe4027f8aa6',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/vmlinux-5.10.0',
              },
              {
                TYPE: 'zImage',
                SIZE: '2.3 MiB',
                SHACODE:
                  'ae81e0ee5c1449f0251a38fb8be5e7a804cf44e822b9b1ee770abae0cac8bfa7',
                DOWNLOAD_LINK:
                  'openEuler-22.03-LTS/embedded_img/arm32/arm-std/zImage',
                TIPS: 'Kernel image that supports QEMU in the ARM architecture.',
              },
            ],
            ARCH: 'ARM32',
            SCENARIO: 'EMBEDDED',
          },
        ],
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 20.03 LTS SP3',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP3/',
        DESC: 'openEuler 20.03 LTS SP3 is the patch version of openEuler 20.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP3/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP3/docs/Installation/Installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=20.03-LTS-SP3',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2021/12',
        LTS: true,
        VERSION: '20.03-LTS-SP3',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.1 GiB',
                SHACODE:
                  'a359c4a31e3550d548537084bbf1cad9a4c035b7b75fde304bd8bf4b23fa0719',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.7 GiB',
                SHACODE:
                  'f70396215a0eb175778eb43e494730de1a1c983062bd29848d8ce20f70021d42',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '826.9 MiB',
                SHACODE:
                  'e5f45b93df03dea414490adc584dfdb01b1176ea1b1eb50a95f065e4e189e1b4',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-netinst-x86_64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.7 GiB',
                SHACODE:
                  'fac6be30bcbf276c08bd1ebea1ae319406d1f2e99ceb73e041fe01a91451bb0f',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/aarch64/openEuler-20.03-LTS-SP3-aarch64-dvd.iso',
                TIPS: 'Base installation ISO file of the aarch64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.3 GiB',
                SHACODE:
                  '895f718d0e345d23decf2c7ea82d9ba272e63932c30799fd2f7fd333e72ba110',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/aarch64/openEuler-20.03-LTS-SP3-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '799.6 MiB',
                SHACODE:
                  '27f58c46e59ff2579d3c8cddb6b2f178d9663d59b4cad1826a0106baeb0960a0',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP3/ISO/aarch64/openEuler-20.03-LTS-SP3-netinst-aarch64-dvd.iso',
                TIPS: '',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2025/12',
      },
      {
        NAME: 'openEuler 21.09',
        DOWNLOAD_URL: 'https://archives.openeuler.openatom.cn/openEuler-21.09/',
        DESC: 'openEuler 21.09 is an innovative version for all scenarios, including edge and embedded devices. It enhances server and cloud computing features, and incorporates key technologies including cloud-native scheduling algorithms for hybrid service deployments and the container operating system KubeOS.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/21.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/21.09/docs/Installation/installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://archives.openeuler.openatom.cn/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WHITE_PAPER:
          'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/pdf/openEuler%2021.09%20%E6%8A%80%E6%9C%AF%E7%99%BD%E7%9A%AE%E4%B9%A6-en.pdf',
        WEBSITE_SELECT: '/en/mirror/select/?version=21.09',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2021/09',
        LTS: false,
        VERSION: '21.09',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.6 GiB',
                SHACODE:
                  '49153a5a58e2958ba33597061f48da34c6e14f1aa19422fc375a7f89598cde41',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/x86_64/openEuler-21.09-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.4 GiB',
                SHACODE:
                  'e30801511dd38da4700741be53b2e8528b8c48feebcb8f6f483e11c59139eecb',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/x86_64/openEuler-21.09-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '871.7 MiB',
                SHACODE:
                  '5eddbd90cd328b25d48f413738270ccbd0f82d9a4b287d7b9b3b7cb2b7e0fbf7',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/x86_64/openEuler-21.09-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.2 GiB',
                SHACODE:
                  '7c82cb690310469ce64849a2a1b99521a34dc74589664969aff6199eecaca5f3',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/aarch64/openEuler-21.09-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.0 GiB',
                SHACODE:
                  '35f6a4c1505b2063aede36e2a4055a05c4cbae1b4a9d274c949f72605f93a483',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/aarch64/openEuler-21.09-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '828.8 MiB',
                SHACODE:
                  '2f705f7a9989bf155e275d0f540368bf84f47fba28f0a857902f7bd857355c8a',
                DOWNLOAD_LINK:
                  'openEuler-21.09/ISO/aarch64/openEuler-21.09-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/03',
      },
      {
        NAME: 'openEuler 20.03 LTS SP2',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP2/',
        DESC: 'openEuler 20.03 LTS SP2 is the patch version of openEuler 20.03 LTS,and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP2/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP2/docs/Installation/Installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=20.03-LTS-SP2',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2021/07',
        LTS: true,
        VERSION: '20.03-LTS-SP2',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.0 GiB',
                SHACODE:
                  '3786eaf360b2f394e61a37ffd2552758f8d15d2a2b0696ef1cae60dd555237b7',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/x86_64/openEuler-20.03-LTS-SP2-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.5 GiB',
                SHACODE:
                  '64ecf9585802a949d37d18021ec5ff05bf1b4dad1f0493424d8f95e0e511b3c1',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/x86_64/openEuler-20.03-LTS-SP2-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '836.3 MiB',
                SHACODE:
                  '4622c0bd83c516aa732c4c10c968a35df57fa0f1e249fe307d569b832b085d35',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/x86_64/openEuler-20.03-LTS-SP2-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.7 GiB',
                SHACODE:
                  'b2f24e352e42bded60710efee58e98d977e336c8c942c98318256cc8a5df78ee',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/aarch64/openEuler-20.03-LTS-SP2-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '15.1 GiB',
                SHACODE:
                  'e1f895055c2476c0ab1e83b705a723c315c38d2eb21278754f072090326d93f8',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/aarch64/openEuler-20.03-LTS-SP2-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '807.9 MiB',
                SHACODE:
                  'ce82ca10e1a4aee48e16b054fbab1457dac9c4e52e2ebbf46d35563e8bdba84b',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP2/ISO/aarch64/openEuler-20.03-LTS-SP2-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/04',
      },
      {
        NAME: 'openEuler 21.03',
        DOWNLOAD_URL: 'https://archives.openeuler.openatom.cn/openEuler-21.03/',
        DESC: 'The openEuler 21.03 version is an innovative release for open scenarios,with a lifecycle of six months.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/21.03/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/21.03/docs/Installation/Installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://archives.openeuler.openatom.cn/',
        WHITE_PAPER: '/whitepaper/en/openEuler-21.03-Technical-White-Paper.pdf',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=21.03',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2021/03',
        LTS: false,
        VERSION: '21.03',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.6 GiB',
                SHACODE:
                  '968eb63d87af06ea623fedec93d5198930ca358e98e3b60c9225b0ab2311dc86',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/x86_64/openEuler-21.03-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '14.0 GiB',
                SHACODE:
                  'cabc72b9a7fd772d85974376cc4c306dea8bd92c9e0a0a0260b8bcca0f0decda',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/x86_64/openEuler-21.03-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '882.2 MiB',
                SHACODE:
                  'a6b81481f59bf3a8af3fe548ef01216d57a7313700b24111160bf751267f5d08',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/x86_64/openEuler-21.03-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.2 GiB',
                SHACODE:
                  'e723ba1ada8fbf07c398af00dcda2efa2d89d7abfe4e598aeabc0dccc2c86c45',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/aarch64/openEuler-21.03-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '13.6 GiB',
                SHACODE:
                  '98ea4db2d61ea0b9fffaeda322058b67085c691416e11d153dc3b9827ee407f7',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/aarch64/openEuler-21.03-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '843.0 MiB',
                SHACODE:
                  '8bdd9ea2bd00ab9aed3dafd04960c605bba50ccdeda2501a67f7126d2d4b6005',
                DOWNLOAD_LINK:
                  'openEuler-21.03/ISO/aarch64/openEuler-21.03-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2021/09',
      },
      {
        NAME: 'openEuler 20.03 LTS SP1',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP1/',
        DESC: 'openEuler 20.03 LTS SP1 is the patch version of openEuler 20.03 LTS,and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/Installation/Installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=20.03-LTS-SP1',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2020/12',
        LTS: true,
        VERSION: '20.03-LTS-SP1',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.1 GiB',
                SHACODE:
                  '340c510c90150b448a2b8f5a0b04d5d2fef5b4d50abb941790d340b6df3e8d56',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/x86_64/openEuler-20.03-LTS-SP1-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '12.9 GiB',
                SHACODE:
                  '1f865da8660a05f64ef9f670a0a6f6e3151d52e2caddeff84bbbc09a1038562c',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/x86_64/openEuler-20.03-LTS-SP1-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '893.8 MiB',
                SHACODE:
                  'bd79e15f110381b1c88d6ad32c5d255e0b142da91171c3f83de9a5d4e25a6d50',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/x86_64/openEuler-20.03-LTS-SP1-netinst-x86_64-dvd.iso',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.8 GiB',
                SHACODE:
                  'e671fd9ab62384991d2e335ffe1ea068c51361cda929e7b1e1a82a53b584e867',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/aarch64/openEuler-20.03-LTS-SP1-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '12.6 GiB',
                SHACODE:
                  '138304abb9543d346308a94f937e00b2a3131a7aea993b72f7eb240f0b8f5c4f',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/aarch64/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
              {
                TYPE: 'Network Install ISO',
                SIZE: '858.9 MiB',
                SHACODE:
                  '6c2e1e602f0083235a080e6fe71f9f00e019284b3d6a8de6c38dd1d813f0f250',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS-SP1/ISO/aarch64/openEuler-20.03-LTS-SP1-netinst-aarch64-dvd.iso',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/12',
      },
      {
        NAME: 'openEuler 20.09',
        DOWNLOAD_URL: 'https://archives.openeuler.openatom.cn/openEuler-20.09/',
        DESC: 'The openEuler 20.09 LTS version is an innovative release for open scenarios,with a lifecycle of six months.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/20.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/20.09/docs/Installation/Installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://archives.openeuler.openatom.cn/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=20.09',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2020/09',
        LTS: false,
        VERSION: '20.09',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.5 GiB',
                SHACODE:
                  'f747340863be3e1805e1dd8e2527a0b8a2b28f46528e538b54d78f16feee7af5',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/x86_64/openEuler-20.09-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '13.1 GiB',
                SHACODE:
                  'e750d4994016198b33d4e8525ee31486e212e899643b5de257a84761fe33c21b',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/x86_64/openEuler-20.09-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '3.4 GiB',
                SHACODE:
                  'b5a4729aaa24d1cab22ab247dd788d84dda20ddba99dda007035580b7b719083',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/aarch64/openEuler-20.09-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '12.6 GiB',
                SHACODE:
                  '8fbcb81b6b76edf516de62cd04a8286d45b333a9244682b61e0beca8276fb560',
                DOWNLOAD_LINK:
                  'openEuler-20.09/ISO/aarch64/openEuler-20.09-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2021/03',
      },
      {
        NAME: 'openEuler 20.03 LTS',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS/',
        DESC: 'The openEuler 20.03 LTS edition, with a four-year lifecycle, is a standard distribution that meets open scenario requirements, which has a lifecycle of four years.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS/docs/Installation/Installation.html',
        SEEK_HELP_URL:
          'https://gitee.com/openeuler/community-issue/blob/master/README.md',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=20.03-LTS',
        MANUFACTURER: 'openEuler community',
        PUBLISH_DATE: '2020/03',
        LTS: true,
        VERSION: '20.03-LTS',
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '4.2 GiB',
                SHACODE:
                  '419592be9cba55a2b800e761d865550f28133875920e7bb9c2d5cdaad90a9cbf',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-x86_64-dvd.iso',
                TIPS: 'Base installation ISO file of the x86_64 architecture, including the core components for running the minimum system.',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '11.2 GiB',
                SHACODE:
                  '71d1d8e1c7e33af54f3af1915556cd21b62d591c067170040bd9e7371ec21506',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-everything-x86_64-dvd.iso',
                TIPS: 'Full installation ISO file of the x86_64 architecture, including all components for running the entire system.',
              },
            ],
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'Offline Standard ISO',
                SIZE: '	4.3 GiB',
                SHACODE:
                  '3e7cb72d746c5385b02b7a4bf18360925145d13f06bbd41c1a137e545b651d40',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/aarch64/openEuler-20.03-LTS-aarch64-dvd.iso',
              },
              {
                TYPE: 'Offline Everything ISO',
                SIZE: '10.9 GiB',
                SHACODE:
                  '459e2309f47bab9ef2f71aaf5dc1788307eabb589719b9880cc1c76acfea7735',
                DOWNLOAD_LINK:
                  'openEuler-20.03-LTS/ISO/aarch64/openEuler-20.03-LTS-everything-aarch64-dvd.iso',
                TIPS: 'Full installation ISO file of the aarch64 architecture, including all components for running the entire system.',
              },
            ],
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK_LIST: [
              {
                TYPE: 'qcow2',
                SIZE: '1.3 GiB',
                SHACODE: '',
                DOWNLOAD_LINK:
                  'openEuler-preview/RISC-V/openEuler-20.03-riscv64/Image/openEuler-preview.riscv64.qcow2',
              },
            ],
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
        ],
        PLANNED_EOL: '2022/03',
      },
      {
        NAME: 'openEuler Preview',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-preview/',
        DESC: 'openEuler Preview is a trial version of the community designed to explore new technologies and currently includes support for the RISC-V architecture.',
        INSTALL_GUIDENCE_URL:
          'https://gitee.com/openeuler/RISC-V/blob/master/documents/Installing.md',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/RISC-V/issues',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        MANUFACTURER: 'openEuler RISC-V SIG group',
        PUBLISH_DATE: '2020/09',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK_LIST: [
              {
                TYPE: 'openEuler Preview',
                SIZE: '',
                SHACODE: '',
                DOWNLOAD_LINK: 'https://repo.openeuler.org/openEuler-preview/',
                TIPS: 'unknown',
              },
            ],
            ARCH: '',
            SCENARIO: 'unknown',
          },
        ],
        PLANNED_EOL: '',
      },
    ],
    COMMERCIAL_RELEASE_LIST: [
      {
        NAME: 'TurboLinux Enterprise server v15',
        DOWNLOAD_URL: 'http://download.turbolinux.com.cn:8013/',
        DESC: 'Turbolinux Enterprise Server 15 (TLES15) is the enterprise commercial Linux distribution based on the openEuler community, designed for the x86_64 and AArch64 processor architecture.',

        MANUFACTURER: 'TurboLinux',
        PUBLISH_DATE: '2022/06',
        LIFE_CYCLE_URL:
          'http://download.turbolinux.com.cn:8011/docs/TLES-OS-PLANNING.pdf',
        RELEASE_DESC_URL:
          'http://www.turbolinux.com.cn/index.php/pages/cat_id/2.html',
        LTS: false,
        DETAILED_LINK: [
          {
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'RedFlag Asianux Server - 8.1',
        DOWNLOAD_URL: 'http://pan.chinaredflag.cn/d/d3041d958a8d4da1881d/',
        DESC: 'Red Flag Asianux Server OS (openEuler) is a commercial release based on the secondary development of openEuler 20.03 LTS SP1. The current kernel version is 4.19.',
        RELEASE_DESC_URL: 'http://www.linuxsir.cn/?product.htm&pid=2',
        INSTALL_GUIDENCE_URL: 'http://www.linuxsir.cn/?product.htm&pid=2',
        SEEK_HELP_URL: '',
        GET_ISO_URL: 'http://pan.chinaredflag.cn/d/d3041d958a8d4da1881d/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: 'Red Flag Asianux Server',
        PUBLISH_DATE: '2021/03',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'http://pan.chinaredflag.cn/d/d3041d958a8d4da1881d/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'HopeStage',
        DOWNLOAD_URL: 'http://webapp.hoperun.com:8007/HopeStage/',
        DESC: 'HopeStage Enterprise Linux is an enterprise-level Linux operating system based on openEuler, which has the advantages of high efficiency, stability and security. HopeStage is committed to providing a safe and stable operating basis for enterprise-level databases, big data, cloud computing and artificial intelligence platforms.',
        RELEASE_DESC_URL:
          'http://webapp.hoperun.com:8007/HopeStage/HopeStage-Enterprise-Linux_ReleaseNotes.pdf',
        INSTALL_GUIDENCE_URL:
          'http://webapp.hoperun.com:8007/HopeStage/HopeStage-Enterprise-Linux_Installation_Guide.pdf',
        SEEK_HELP_URL: 'http://www.hopeinfra.com/contactus.html',
        GET_ISO_URL: 'http://webapp.hoperun.com:8007/HopeStage/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: 'HOPERUN',
        PUBLISH_DATE: '2020/09',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'Kylinsec',
        DOWNLOAD_URL: 'https://mirrors.kylinsec.com.cn/V3.4-4/',
        GET_ISO_URL: 'https://mirrors.kylinsec.com.cn/V3.4-4/isos/',
        DESC: 'No description available',
        RELEASE_DESC_URL:
          'http://www.kylinsec.com.cn/Uploads/Download/2020-09-21/5f6846656373a.pdf',
        INSTALL_GUIDENCE_URL:
          'http://www.kylinsec.com.cn/Uploads/Download/2020-09-21/5f6846807a00f.pdf',
        SEEK_HELP_URL: '',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: 'Kylinsec',
        PUBLISH_DATE: '',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.4-4/isos/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://mirrors.kylinsec.com.cn/V3.4-4/isos/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'HopeEdge',
        DESC: 'HopeEdge Linux for Edge Computing is an edge computing operating system based on openEuler, which is oriented to IoT scenarios. It has four key characteristics: lightweight security, independent innovation, efficient interconnection and rapid deployment. HopeEdge also provides equipment management, data acquisition, cloud-edge collaboration, artificial intelligence and other characteristics.',
        DOWNLOAD_URL: 'http://webapp.hoperun.com:8007/',
        RELEASE_DESC_URL:
          'http://webapp.hoperun.com:8007/HopeEdge/HopeEdgeOS_ReleaseNote.pdf',
        INSTALL_GUIDENCE_URL:
          'http://webapp.hoperun.com:8007/HopeEdge/HopeEdgeOS_Installation_Guide.pdf',
        SEEK_HELP_URL: 'http://www.hopeinfra.com/contactus.html',
        GET_ISO_URL: 'http://webapp.hoperun.com:8007/HopeEdge/',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: 'HOPERUN',
        PUBLISH_DATE: '2020/07',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/x86_64/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'http://webapp.hoperun.com:8007/HopeStage/aarch64/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'iSoftServerOS-Kunpeng-5.1',
        DOWNLOAD_URL: 'http://www.i-soft.com.cn/type/4/714.jhtml',
        DESC: 'No description available',
        RELEASE_DESC_URL: 'http://www.i-soft.com.cn/type/4/716.jhtml',
        INSTALL_GUIDENCE_URL: 'http://www.i-soft.com.cn/type/4/716.jhtml ',
        SEEK_HELP_URL:
          'https://p.qiao.baidu.com/cps4/chatIndex?siteToken=9a45f9cee67affa160b6addd06e07a8d&speedLogId=160067949693727da_1600679496937_87121&eid=30746007&reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22-1%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2215215804%22%2C%22userId%22%3A%2230746007%22%2C%22pageId%22%3A0%7D ',
        GET_ISO_URL: 'http://www.i-soft.com.cn/type/4/714.jhtml ',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: 'iSoft',
        PUBLISH_DATE: '',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
            ARCH: 'x86_64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://www.i-soft.com.cn/type/4/714.jhtml/',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
        ],
      },
      {
        NAME: 'EulixOS Server',
        DOWNLOAD_URL: 'https://eulixos.com/#/download',
        DESC: 'The EulixOS is a server OS distribution based on the openEuler OS. The EulixOS supports multiple processor architectures, such as x86_64, AArch64, and RISC-V, and is ideal for various application scenarios, including databases, cloud computing, big data, AI, and distributed computing. It combines high security and reliability with the ultimate performance across platforms, aiming to provide a standard, secure, and reliable operating system and quality services for diverse applications and solutions.',
        RELEASE_DESC_URL:
          'https://eulixos.com/userguide/%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E/%E7%89%88%E6%9C%AC%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E.html',
        INSTALL_GUIDENCE_URL:
          'https://eulixos.com/userguide/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97/%E5%89%8D%E8%A8%80.html',
        SEEK_HELP_URL: 'https://eulixos.com/#/feedback',
        GET_ISO_URL: 'https://eulixos.com/#/download',
        LIFE_CYCLE_URL: '',
        MANUFACTURER: 'ISCAS',
        PUBLISH_DATE: '2020/05',
        LTS: false,
        DETAILED_LINK: [
          {
            LINK: 'https://eulixos.com/#/download',
            ARCH: 'AArch64',
            SCENARIO: 'SERVER',
          },
          {
            LINK: 'https://eulixos.com/#/download',
            ARCH: 'RISC-V',
            SCENARIO: 'SERVER',
          },
        ],
      },
    ],
    SCENARIO_LIST: [
      { KEY: '', VALUE: 'All' },
      { KEY: 'SERVER', VALUE: 'Server' },
      { KEY: 'EDGE_CLOUD', VALUE: 'Edge Cloud' },
      { KEY: 'CLOUD_COMPUTING', VALUE: 'Cloud Computing' },
      { KEY: 'EMBEDDED', VALUE: 'Embedded' },
    ],
  },
};

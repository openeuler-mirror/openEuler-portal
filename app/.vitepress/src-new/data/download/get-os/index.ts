import windowsImg from '~@/assets/category/download/windows.png';
import cloudImg from '~@/assets/category/download/public.png';
import containerImg from '~@/assets/category/download/docker.png';
import virtualizationImg from '~@/assets/category/download/virtualization.png';
import raspberryPiImg from '~@/assets/category/download/raspberry-pi.png';
import macOsImg from '~@/assets/category/download/macos_light.png';

import windowsImgDark from '~@/assets/category/download/windows_dark.png';
import cloudImgDark from '~@/assets/category/download/public_dark.png';
import containerImgDark from '~@/assets/category/download/docker_dark.png';
import virtualizationImgDark from '~@/assets/category/download/virtualization_dark.png';
import raspberryPiImgDark from '~@/assets/category/download/raspberry-pi_dark.png';
import macOsImgDark from '~@/assets/category/download/macos_dark.png';

import windowsImgMo from '~@/assets/category/download/windows_mo.png';
import cloudImgMo from '~@/assets/category/download/public_mo.png';
import containerImgMo from '~@/assets/category/download/docker_mo.png';
import virtualizationImgMo from '~@/assets/category/download/virtualization_mo.png';
import raspberryPiImgMo from '~@/assets/category/download/raspberry-pi_mo.png';
import macOsImgMo from '~@/assets/category/download/macos_mo_light.png';

import windowsImgDarkMo from '~@/assets/category/download/windows_mo_dark.png';
import cloudImgDarkMo from '~@/assets/category/download/public_mo_dark.png';
import containerImgDarkMo from '~@/assets/category/download/docker_mo_dark.png';
import virtualizationImgDarkMo from '~@/assets/category/download/virtualization_mo_dark.png';
import raspberryPiImgDarkMo from '~@/assets/category/download/raspberry-pi_mo_dark.png';
import macOsImgDarkMo from '~@/assets/category/download/macos_mo_dark.png';

export default {
  zh: [
    {
      id: 'cloud',
      bg: {
        light: cloudImg,
        dark: cloudImgDark,
      },
      bgMo: {
        light: cloudImgMo,
        dark: cloudImgDarkMo,
      },
      title: '公有云',
      intro: 'openEuler 官方镜像在以下主流平台正式发布',
      intro1: '安装指引',
      introLink: '/zh/wiki/install/cloud/',
      links: [
        {
          href: '/zh/wiki/install/cloud/#在aws获取openeuler镜像',
          label: 'Amazon AWS',
          introduce:
            'Amazon Web Services(AWS)是全球最全面、应用最广泛的云服务平台。AWS Marketplace中提供了多个版本的openEuler云镜像',
        },
        {
          href: '/zh/wiki/install/cloud/#azure获取openeuler共享镜像',
          label: 'Azure',
          introduce:
            'Microsoft Azure是微软的公用云服务平台，提供行业领先的AI和云服务。Azure community images中可以找到openEuler云镜像，用户可以利用这些镜像在Azure上部署openEuler操作系统',
        },
        {
          href: '/zh/wiki/install/cloud/#在阿里云获取openeuler镜像',
          label: '阿里云',
          introduce:
            '阿里云是阿里巴巴推出的云计算服务，涉及云计算的产品与服务。用户可以在云市场找到多版本的openEuler云镜像',
        },
        {
          href: '/zh/wiki/install/cloud/#在华为云获取openeuler镜像',
          label: '华为云',
          introduce:
            '华为云提供包括弹性云服务器、对象存储服务等在内的云计算服务。openEuler社区已经将多版本的openEuler云镜像发布到华为云市场',
        },
        {
          href: '/zh/wiki/install/cloud/#在腾讯云获取openeuler镜像',
          label: '腾讯云',
          introduce:
            '腾讯云是腾讯推出的云计算服务，构建覆盖全球的数据中心节点。openEuler社区积极拓展与腾讯云的合作，为用户提供更多版本的openEuler云镜像',
        },
      ],
    },
    {
      id: 'container',
      bg: {
        light: containerImg,
        dark: containerImgDark,
      },
      bgMo: {
        light: containerImgMo,
        dark: containerImgDarkMo,
      },
      title: '容器镜像',
      intro: 'openEuler 提供官方容器镜像',
      intro1: '安装指引',
      introLink: '/zh/wiki/install/image/',
      links: [
        {
          href: 'https://hub.docker.com/r/openeuler/openeuler',
          label: 'Docker Hub',
          introduce:
            'Docker Hub是Docker提供的一项服务，是世界上最大的容器镜像存储库。openEuler社区将持续更新基础容器镜像和应用容器镜像至Docker Hub，以便开发者下载使用',
        },
        {
          href: 'https://quay.io/search?q=openeuler',
          label: 'Quay.io',
          introduce:
            'Quay.io是容器化生态系统中的领先平台之一。openEuler社区在Quay.io上提供了基础容器镜像和应用容器镜像，用户可以在这里找到相应镜像的使用和介绍',
        },
        {
          href: 'https://hub.oepkgs.net/account/sign-in?globalSearch=openeuler',
          label: '中科院软件所',
          introduce:
            'oepkgs全称开放软件包服务，是一个为openEuler以及其他Linux发行版提供软件包服务和容器镜像服务的第三方社区。目前oepkgs镜像源中已有2w+款软件包。oepkgs社区会对软件包进行构建测试，兼容性测试，并对oepkgs上软件包的源码仓进行生命周期管理',
        },
        {
          href: 'https://images.linuxcontainers.org/',
          label: 'Linux Container',
          introduce:
            'Linux Container是一个为用户提供操作系统级虚拟化的工具集，它允许用户在同一台物理服务器上运行多个隔离的Linux容器。这些容器共享宿主机的内核，但在其他方面相互独立，类似于虚拟机但更加轻量级和高效',
        },
      ],
    },
    {
      id: 'windows',
      bg: {
        light: windowsImg,
        dark: windowsImgDark,
      },
      bgMo: {
        light: windowsImgMo,
        dark: windowsImgDarkMo,
      },
      title: 'Windows',
      intro: '在 Windows 上运行 openEuler',
      repeat: 1,
      links: [
        {
          href: '/zh/wiki/install/wsl/',
          label: 'WSL(Windows Subsystem For Linux)',
          introduce:
            'Windows Subsystem For Linux (WSL) 是微软发布的让用户能够在Windows上使用Linux环境的技术。通过使用openEuler发布的WSL应用，可以让大家在Windows中体验原汁原味的openEuler开发环境。目前openEuler已经将多个版本WSL镜像相继上架到了微软应用商店，欢迎大家下载试用',
        },
      ],
    },
    {
      id: 'macos',
      bg: {
        light: macOsImg,
        dark: macOsImgDark,
      },
      bgMo: {
        light: macOsImgMo,
        dark: macOsImgDarkMo,
      },
      title: 'MacOS',
      intro: '在 MacOS 上运行 openEuler',
      repeat: 1,
      links: [
        {
          href: '/zh/wiki/install/macos/',
          label: 'OrbStack',
          introduce:
            'OrbStack是一个为macOS设计的快速、轻量级且简单的虚拟机平台，用于运行Docker容器和Linux虚拟机。用户可以在OrbStack上充分利用openEuler社区提供的容器镜像',
        },
      ],
    },
    {
      id: 'virtualization',
      bg: {
        light: virtualizationImg,
        dark: virtualizationImgDark,
      },
      bgMo: {
        light: virtualizationImgMo,
        dark: virtualizationImgDarkMo,
      },
      title: '虚拟化',
      intro: '在虚拟机上运行 openEuler',
      repeat: 1,
      links: [
        {
          href: '/zh/wiki/install/virtualization/',
          label: '在VirtualBox中安装openEuler',
          introduce:
            'Oracle VirtualBox是由InnoTek软件公司出品的虚拟机软件，现由Oracle进行开发，是Oracle公司xVM虚拟化平台技术的一部分。用户可以在openEuler官方软件仓下载openEuler的虚拟机镜像，使用VirtualBox安装openEuler虚拟机',
        },
      ],
    },
    {
      id: 'raspberrypi',
      bg: {
        light: raspberryPiImg,
        dark: raspberryPiImgDark,
      },
      bgMo: {
        light: raspberryPiImgMo,
        dark: raspberryPiImgDarkMo,
      },
      title: '树莓派',
      intro: '在树莓派上安装 openEuler',
      repeat: 1,
      links: [
        {
          href: '/zh/wiki/install/raspberry-pi/',
          label: '在树莓派中安装openEuler',
          introduce:
            '树莓派是一款由英国树莓派基金会开发的小型单板计算机，因其低成本、易于编程和灵活性而广受欢迎。用户可以在openEuler官方软件仓下载openEuler的树莓派镜像，在这款流行的硬件平台上体验openEuler操作系统',
        },
      ],
    },
  ],
  en: [
    {
      id: 'cloud',
      bg: {
        light: cloudImg,
        dark: cloudImgDark,
      },
      bgMo: {
        light: cloudImgMo,
        dark: cloudImgDarkMo,
      },
      title: 'Cloud Images',
      intro:
        'openEuler has released official images on mainstream public cloud platforms. ',
      intro1: 'Installation Guide',
      introLink: '/en/wiki/install/cloud/',
      links: [
        {
          href: 'https://aws.amazon.com/marketplace/pp/prodview-cgu5xymg7qnqg?sr=0-4&ref_=beagle&applicationId=AWSMPContessa',
          label: 'AWS',
          introduce:
            'Amazon Web Services (AWS) is the largest cloud service provider in the world. AWS Marketplace now offers openEuler cloud images in multiple versions. Deploy your openEuler-based environments on AWS today!',
        },
        {
          href: '/en/wiki/install/cloud/#obtaining-the-openeuler-shared-image-on-azure',
          label: 'Azure',
          introduce:
            "Microsoft Azure—Microsoft's public cloud service platform—has earned a reputation for cutting-edge and powerful AI services. Get started with openEuler cloud images in Azure Community Images and deploy on Azure now!",
        },
        {
          href: '/en/wiki/install/cloud/#obtaining-the-openeuler-image-on-alibaba-cloud',
          label: 'Alibaba Cloud',
          introduce:
            "Alibaba Cloud, Alibaba's cloud computing platform, offers a wide range of products and services. openEuler cloud images are now available in Alibaba Cloud Marketplace, giving unexceptional performance and scalability in your cloud environment.",
        },
        {
          href: 'https://marketplace.huaweicloud.com/contents/b295de63-8718-4477-961a-46fdffaad701#productid=OFFI1004941126717046784',
          label: 'Huawei Cloud',
          introduce:
            'Huawei Cloud offers an extensive suite of cloud computing services, including Elastic Cloud Server (ECS) and Object Storage Service (OBS). Find openEuler cloud images in Huawei Cloud Marketplace and unlock the power of this open source OS!',
        },
      ],
    },
    {
      id: 'container',
      bg: {
        light: containerImg,
        dark: containerImgDark,
      },
      bgMo: {
        light: containerImgMo,
        dark: containerImgDarkMo,
      },
      title: 'Container Images',
      intro: 'openEuler provides official container images. ',
      intro1: 'Installation Guide',
      introLink: '/en/wiki/install/image/',
      links: [
        {
          href: 'https://hub.docker.com/r/openeuler/openeuler',
          label: 'Docker Hub',
          introduce:
            "Docker Hub boasts the world's largest container image repository. Discover regularly updated base and application container images of openEuler on Docker Hub and unleash the potential of this open source OS!",
        },
        {
          href: 'https://quay.io/search?q=openeuler',
          label: 'Quay.io',
          introduce:
            'Quay.io is one of the leading registries for building, storage, and distributing container images. Get base and application container images on Quay.io with detailed usage instructions. Start deploying openEuler now!',
        },
        {
          href: 'https://hub.oepkgs.net/account/sign-in?globalSearch=openeuler',
          label: 'ISCAS',
          introduce:
            'oepkgs is a public platform providing software packages and container images for openEuler and other Linux distributions. oepkgs now offers over 20,000 software packages across its mirror sites. The oepkgs community builds and tests package compatibility, and manages source code repositories across the lifecycle for all available packages.',
        },
        {
          href: 'https://images.linuxcontainers.org/',
          label: 'Linux Container',
          introduce:
            "Linux Container is a toolset that provides OS-level virtualization, enabling multiple isolated Linux containers to run on the same physical server while sharing the host machine's kernel. This approach is similar to deploying VMs but promises greater efficiency and lower overheads.",
        },
      ],
    },
    {
      id: 'windows',
      bg: {
        light: windowsImg,
        dark: windowsImgDark,
      },
      bgMo: {
        light: windowsImgMo,
        dark: windowsImgDarkMo,
      },
      title: 'Windows',
      intro: 'Running openEuler on Windows',
      repeat: 1,
      links: [
        {
          href: '/en/wiki/install/wsl/',
          label: 'Windows Subsystem for Linux (WSL)',
          introduce:
            'Windows Subsystem for Linux (WSL) is a Microsoft offering that enables Linux environments to directly run on Windows. Download the openEuler application for WSL on Microsoft Store to enjoy an openEuler development environment without leaving your Windows setup.Windows Subsystem for Linux (WSL) is a Microsoft offering that enables Linux environments to directly run on Windows. Download the openEuler application for WSL on Microsoft Store to enjoy an openEuler development environment without leaving your Windows setup.',
        },
      ],
    },
    {
      id: 'macos',
      bg: {
        light: macOsImg,
        dark: macOsImgDark,
      },
      bgMo: {
        light: macOsImgMo,
        dark: macOsImgDarkMo,
      },
      title: 'MacOs',
      intro: 'Running openEuler on MacOs',
      repeat: 1,
      links: [
        {
          href: '/en/wiki/install/macos/',
          label: 'OrbStack',
          introduce:
            'OrbStack is a fast and lightweight VM platform designed to run Docker containers and Linux VMs on macOS. Find the container images by the openEuler community on OrbStack here.',
        },
      ],
    },
    {
      id: 'virtualization',
      bg: {
        light: virtualizationImg,
        dark: virtualizationImgDark,
      },
      bgMo: {
        light: virtualizationImgMo,
        dark: virtualizationImgDarkMo,
      },
      title: 'Virtualization',
      intro: 'Running openEuler on VMs',
      repeat: 1,
      links: [
        {
          href: '/en/wiki/install/virtualization/',
          label: 'Installing openEuler in VirtualBox',
          introduce:
            'Oracle VirtualBox is a virtualization software originally developed by InnoTek Software and now maintained by Oracle as part of the Oracle xVM platform. To use openEuler VMs on VirtualBox, simply download and install openEuler VM images from the official openEuler software repository.',
        },
      ],
    },
    {
      id: 'raspberrypi',
      bg: {
        light: raspberryPiImg,
        dark: raspberryPiImgDark,
      },
      bgMo: {
        light: raspberryPiImgMo,
        dark: raspberryPiImgDarkMo,
      },
      title: 'Raspberry Pi',
      intro: 'Installing openEuler on Raspberry Pi',
      repeat: 1,
      links: [
        {
          href: '/en/wiki/install/raspberry-pi/',
          label: 'Raspberry Pi ',
          introduce:
            'Raspberry Pi is a compact single-board computer developed by the Raspberry Pi Foundation. Praised for its affordability and flexibility, Raspberry Pi images are now available on the official openEuler software repository.',
        },
      ],
    },
  ],
};

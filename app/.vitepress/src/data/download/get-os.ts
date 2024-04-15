import osImg from '@/assets/category/download/iso.png';
import windowsImg from '@/assets/category/download/windows.png';
import cloudImg from '@/assets/category/download/cloud.png';
import containerImg from '@/assets/category/download/container.png';
import virtualizationImg from '@/assets/category/download/virtualization.png';
import raspberryPiImg from '@/assets/category/download/raspberry-pi.png';

import osImgDark from '@/assets/category/download/iso_dark.png';
import windowsImgDark from '@/assets/category/download/windows_dark.png';
import cloudImgDark from '@/assets/category/download/cloud_dark.png';
import containerImgDark from '@/assets/category/download/container_dark.png';
import virtualizationImgDark from '@/assets/category/download/virtualization_dark.png';
import raspberryPiImgDark from '@/assets/category/download/raspberry-pi_dark.png';

export default {
  zh: [
    {
      icon: osImg,
      iconDark: osImgDark,
      title: 'ISO',
      repeat: 1,
      intro:
        'openEuler 社区版分为长期支持版本（LTS）和创新版本，支持X86、AArch、Arm、RISC-V等架构。',
      links: [
        {
          href: '/zh/download/?version=openEuler%2022.03%20LTS%20SP3',
          label: '下载 openEuler',
        },
      ],
    },
    {
      icon: cloudImg,
      iconDark: cloudImgDark,
      title: '公有云',
      repeat: 2,
      intro:
        'openEuler 在AWS、华为云、腾讯云等主流公有云平台上发布了官方镜像：',
      links: [
        {
          href: 'https://aws.amazon.com/marketplace/pp/prodview-cgu5xymg7qnqg?sr=0-4&ref_=beagle&applicationId=AWSMPContessa',
          label: 'Amazon AWS',
        },
        {
          href: 'https://www.huaweicloud.com/product/hce.html',
          label: '华为云',
        },
        {
          href: 'https://market.cloud.tencent.com/products/39669',
          label: '腾讯云',
        },
      ],
    },
    {
      icon: containerImg,
      iconDark: containerImgDark,
      title: '容器镜像',
      intro: 'openEuler 提供官方容器镜像：',
      repeat: 2,
      links: [
        {
          href: 'https://hub.docker.com/r/openeuler/openeuler',
          label: 'Docker Hub',
        },
        {
          href: '/zh/blog/20230530-OrbStack/Orbstack%E6%94%AF%E6%8C%81openEuler%E5%8F%91%E8%A1%8C%E7%89%88.html',
          label: 'OrbStack',
        },
        {
          href: 'https://search.oepkgs.net/zh-CN',
          label: '中科院软件所',
        },
      ],
    },
    {
      icon: windowsImg,
      iconDark: windowsImgDark,
      title: 'Windows',
      intro: '在 Windows 上运行 openEuler：',
      repeat: 1,
      links: [
        {
          href: '/zh/blog/waaagh/openEuler-DE-in-WSL.html',
          label: 'WSL(Windows Subsystem For Linux)',
        },
      ],
    },
    {
      icon: virtualizationImg,
      iconDark: virtualizationImgDark,
      title: 'Virtualization',
      intro: '在虚拟机上运行 openEuler：',
      repeat: 1,
      links: [
        {
          href: '/zh/blog/traffic_millions/2020-03-27-VirtualBox.html',
          label: '在 VirtualBox 中安装openEuler',
        },
      ],
    },
    {
      icon: raspberryPiImg,
      iconDark: raspberryPiImgDark,
      title: 'Raspberry Pi',
      intro: '在树莓派上安装 openEuler：',
      repeat: 1,
      links: [
        {
          href: 'https://gitee.com/openeuler/raspberrypi/blob/master/README.md',
          label: '树莓派',
        },
      ],
    },
  ],
  en: [
    {
      icon: osImg,
      iconDark: osImgDark,
      title: 'ISO Images',
      repeat: 1,
      intro:
        'openEuler community versions are classified into Long Term Support (LTS) versions and innovation versions. openEuler supports the x86, AArch, Arm, and RISC-V architectures.',
      links: [
        {
          href: '/en/download/?version=openEuler%2022.03%20LTS%20SP3',
          label: 'Down load openEuler',
        },
      ],
    },
    {
      icon: cloudImg,
      iconDark: cloudImgDark,
      title: 'Cloud Images',
      repeat: 2,
      intro:
        'openEuler has released official images on mainstream public cloud platforms such as AWS, HUAWEI CLOUD, and Tencent Cloud:',
      links: [
        {
          href: 'https://aws.amazon.com/marketplace/pp/prodview-cgu5xymg7qnqg?sr=0-4&ref_=beagle&applicationId=AWSMPContessa',
          label: 'Amazon AWS',
        },
        {
          href: 'https://www.huaweicloud.com/product/hce.html',
          label: 'Huawei Cloud',
        },
        {
          href: 'https://market.cloud.tencent.com/products/39669',
          label: 'Tencent Cloud',
        },
      ],
    },
    {
      icon: containerImg,
      iconDark: containerImgDark,
      title: 'Container image',
      intro: 'openEuler provides official container images:',
      repeat: 2,
      links: [
        {
          href: 'https://hub.docker.com/r/openeuler/openeuler',
          label: 'Docker Hub',
        },
        {
          href: '/en/blog/20230530-OrbStack/Orbstack%E6%94%AF%E6%8C%81openEuler%E5%8F%91%E8%A1%8C%E7%89%88.html',
          label: 'OrbStack',
        },
        {
          href: 'https://search.oepkgs.net/en-US',
          label: 'ISCAS',
        },
      ],
    },
    {
      icon: windowsImg,
      iconDark: windowsImgDark,
      title: 'Windows',
      intro: 'Running the openEuler Environment on Windows:',
      repeat: 1,
      links: [
        {
          href: '/en/blog/20230811-waaagh/openEuler-DE-in-WSL.html',
          label: 'WSL(Windows Subsystem For Linux)',
        },
      ],
    },
    {
      icon: virtualizationImg,
      iconDark: virtualizationImgDark,
      title: 'Virtualization',
      intro: 'Running openEuler on a VM:',
      repeat: 1,
      links: [
        {
          href: '/en/blog/traffic_millions/2020-03-27-VirtualBox.html',
          label: 'Installing openEuler in VirtualBox',
        },
      ],
    },
    {
      icon: raspberryPiImg,
      iconDark: raspberryPiImgDark,
      title: 'Raspberry Pi',
      intro: 'Installing openEuler on Raspberry Pi:',
      repeat: 1,
      links: [
        {
          href: 'https://gitee.com/openeuler/raspberrypi/blob/master/README.en.md',
          label: 'Raspberry Pi ',
        },
      ],
    },
  ],
};

import { computed } from 'vue';
import i18n from '~@/i18n';
import getOs from './get-os';

export default {
  zh: {
    COMMUNITY_LIST: [
      {
        NAME: 'openEuler 24.03 LTS SP1',
        DOWNLOAD_URL: 'https://repo.openeuler.org/24.03 LTS SP1/',
        DESC: 'openEuler 24.03 LTS SP1 是基于6.6内核的24.03 LTS版本增强扩展版本，面向服务器、云、边缘计算和嵌入式场景，持续提供更多新特性和功能扩展，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/24.03_LTS_SP1/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/24.03_LTS_SP1/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        WHITE_PAPER: '/whitepaper/openEuler 24.03 LTS SP1 技术白皮书.pdf',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        PUBLISH_DATE: '2024/12',
        LTS: true,
        VERSION: '24.03 LTS SP1',
        PLANNED_EOL: '2026/12',
      },
      {
        NAME: 'openEuler 24.09',
        DOWNLOAD_URL: 'https://repo.openeuler.org/24.09/',
        DESC: 'openEuler 24.09 是基于6.6内核的创新版本，面向服务器、云、边缘计算、AI和嵌入式场景，提供更多新特性和功能，给开发者和用户带来更新的体验。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/24.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/24.09/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        WHITE_PAPER: '/whitepaper/openEuler 24.09 技术白皮书.pdf',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=24.09',
        PUBLISH_DATE: '2024/09',
        LTS: false,
        VERSION: '24.09',
        PLANNED_EOL: '2025/03',
      },
      {
        NAME: 'openEuler 22.03 LTS SP4',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP4/',
        DESC: 'openEuler 22.03 LTS SP4 是openEuler 22.03 LTS的补丁版本，生命周期与LTS版本相同。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP4/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        WHITE_PAPER: '/whitepaper/openEuler 22.03 LTS SP4 技术白皮书.pdf',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.03-LTS-SP4',
        PUBLISH_DATE: '2024/06',
        LTS: true,
        VERSION: '22.03-LTS-SP4',
        PLANNED_EOL: '2026/06',
      },
      {
        NAME: 'openEuler 24.03 LTS',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-24.03-LTS/',
        DESC: 'openEuler 24.03 LTS 是基于6.6内核的长周期版本，面向服务器、云、边缘计算、AI和嵌入式场景，提供更多新特性和功能，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        WHITE_PAPER: '/whitepaper/openEuler 24.03 LTS 技术白皮书.pdf',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=24.03-LTS',
        PUBLISH_DATE: '2024/05',
        LTS: true,
        VERSION: '24.03-LTS',
        PLANNED_EOL: '2026/05',
      },
      {
        NAME: 'openEuler 22.03 LTS SP3',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/',
        DESC: 'openEuler 22.03 LTS SP3 是openEuler 22.03 LTS的补丁版本，生命周期与LTS版本相同。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP3/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/22.03_LTS_SP3/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler 22.03 LTS SP3 技术白皮书.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.03-LTS-SP3',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/embedded_img/',
        PUBLISH_DATE: '2023/12',
        LTS: true,
        VERSION: '22.03-LTS-SP3',
        PLANNED_EOL: '2025/12',
      },
      {
        NAME: 'openEuler 23.09',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-23.09/',
        DESC: 'openEuler 23.09 是基于6.4内核的创新版本，面向服务器、云、边缘计算和嵌入式场景，提供更多新特性和功能，给开发者和用户带来全新的体验，服务更多的领域和更多的用户。',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/23.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/23.09/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/openEuler 23.09 技术白皮书.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=23.09',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-23.09/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-23.09/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-23.09/embedded_img/',
        PUBLISH_DATE: '2023/09',
        LTS: false,
        VERSION: '23.09',
        PLANNED_EOL: '2024/03',
      },
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
        WHITE_PAPER: '/whitepaper/openEuler 22.03 LTS SP2 技术白皮书.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=22.03-LTS-SP2',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/embedded_img/',
        PUBLISH_DATE: '2023/06',
        LTS: true,
        VERSION: '22.03-LTS-SP2',
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
        PUBLISH_DATE: '2023/03',
        LTS: false,
        VERSION: '23.03',
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
        PUBLISH_DATE: '2022/12',
        LTS: true,
        VERSION: '22.03-LTS-SP1',
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
        PUBLISH_DATE: '2022/09',
        LTS: false,
        VERSION: '22.09',
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
        PUBLISH_DATE: '2022/03',
        LTS: true,
        VERSION: '22.03-LTS',
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 20.03 LTS SP4',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP4/',
        DESC: 'openEuler 20.03 LTS SP4 是openEuler 20.03 LTS的补丁版本，生命周期与LTS版本相同',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP4/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/zh/docs/20.03_LTS_SP4/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.03-LTS-SP4',
        PUBLISH_DATE: '2023/12',
        LTS: true,
        VERSION: '20.03-LTS-SP4',
        PLANNED_EOL: '2025/11',
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
        PUBLISH_DATE: '2021/12',
        LTS: true,
        VERSION: '20.03-LTS-SP3',
        PLANNED_EOL: '2023/12',
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
          '/whitepaper/openEuler%2021.09%20%E6%8A%80%E6%9C%AF%E7%99%BD%E7%9A%AE%E4%B9%A6.pdf',
        WEBSITE_SELECT: '/zh/mirror/select/?version=21.09',
        PUBLISH_DATE: '2021/09',
        LTS: false,
        VERSION: '21.09',
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
        PUBLISH_DATE: '2021/07',
        LTS: true,
        VERSION: '20.03-LTS-SP2',
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
        PUBLISH_DATE: '2021/03',
        LTS: false,
        VERSION: '21.03',
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
        PUBLISH_DATE: '2020/12',
        LTS: true,
        VERSION: '20.03-LTS-SP1',
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
        PUBLISH_DATE: '2020/09',
        LTS: false,
        VERSION: '20.09',
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
        PUBLISH_DATE: '2020/03',
        LTS: true,
        VERSION: '20.03-LTS',
        PLANNED_EOL: '2021/03',
      },
    ],
  },
  en: {
    COMMUNITY_LIST: [
      {
        NAME: 'openEuler 24.03 LTS SP1',
        DOWNLOAD_URL: 'https://repo.openeuler.org/24.03 LTS SP1/',
        DESC: 'openEuler 24.03 LTS SP1, an enhanced version of the 24.03 LTS release based on the 6.6 kernel, is designed for server, cloud, edge computing, and embedded deployments, offering new features and functionality for developers and users across diverse domains.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/24.03_LTS_SP1/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/24.03_LTS_SP1/docs/Installation/Installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        PUBLISH_DATE: '2024/12',
        LTS: true,
        VERSION: '24.03 LTS SP1',
        PLANNED_EOL: '2026/12',
      },
      {
        NAME: 'openEuler 24.09',
        DOWNLOAD_URL: 'https://repo.openeuler.org/24.09/',
        WHITE_PAPER: '/whitepaper/en/openEuler 24.09 Technical White Paper.pdf',
        DESC: 'openEuler 24.09, built on Linux kernel 6.6, is suited for server, cloud, edge, AI, and embedded deployments. With best-in-class features, it delivers brand-new experience to developers and users spanning diverse industries.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/24.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/24.09/docs/Installation/Installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=24.09',
        PUBLISH_DATE: '2024/09',
        LTS: false,
        VERSION: '24.09',
        PLANNED_EOL: '2025/03',
      },
      {
        NAME: 'openEuler 22.03 LTS SP4',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP4/',
        DESC: 'openEuler openEuler 22.03 LTS SP4 is the patch version of openEuler 22.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP4/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP4/docs/Installation/Installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WHITE_PAPER:
          '/whitepaper/en/openEuler 22.03 LTS SP4 Technical White Paper.pdf',
        WEBSITE_SELECT: '/en/mirror/select/?version=22.03-LTS-SP4',
        PUBLISH_DATE: '2024/06',
        LTS: true,
        VERSION: '22.03-LTS-SP4',
        PLANNED_EOL: '2026/06',
      },
      {
        NAME: 'openEuler 24.03 LTS',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-24.03-LTS/',
        DESC: 'openEuler 24.03 LTS, built on Linux kernel 6.6, is suited for server, cloud, edge, AI, and embedded deployments. With best-in-class features, it delivers brand-new experience to developers and users spanning diverse industries.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/24.03_LTS/docs/Installation/Installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        WHITE_PAPER:
          '/whitepaper/en/openEuler 24.03 LTS Technical White Paper.pdf',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WEBSITE_SELECT: '/en/mirror/select/?version=24.03-LTS',
        PUBLISH_DATE: '2024/05',
        LTS: true,
        VERSION: '24.03-LTS',
        PLANNED_EOL: '2026/05',
      },
      {
        NAME: 'openEuler 22.03 LTS SP3',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/',
        DESC: 'openEuler openEuler 22.03 LTS SP3 is the patch version of openEuler 22.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP3/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP3/docs/Installation/installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WHITE_PAPER:
          '/whitepaper/en/openEuler 22.03 LTS SP3 Technical White Paper.pdf',
        WEBSITE_SELECT: '/en/mirror/select/?version=22.03-LTS-SP3',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/virtual_machine_img/',
        EDGE_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-22.03-LTS-SP3/embedded_img/',
        PUBLISH_DATE: '2023/12',
        LTS: true,
        VERSION: '22.03-LTS-SP3',
        PLANNED_EOL: '2025/12',
      },
      {
        NAME: 'openEuler 23.09',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-23.09/',
        DESC: 'openEuler 23.09 is an innovation version designed based on Linux kernel 6.4 and is suited for server, cloud, edge, and embedded scenarios. It provides a variety of new features and functions and brings brand-new experience to developers and users in diverse industries.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/23.09/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/23.09/docs/Installation/Installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/en/other/lifecycle/',
        WHITE_PAPER: '/whitepaper/en/openEuler 23.09 Technical White Paper.pdf',
        WEBSITE_SELECT: '/en/mirror/select/?version=23.09',
        CLOUD_IMAGE:
          'https://repo.openeuler.org/openEuler-23.09/virtual_machine_img/',
        EDGE_IMAGE: 'https://repo.openeuler.org/openEuler-23.09/edge_img/',
        EMBEDDEN_IMAGE:
          'https://repo.openeuler.org/openEuler-23.09/embedded_img/',
        PUBLISH_DATE: '2023/09',
        LTS: false,
        VERSION: '23.09',
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 22.03 LTS SP2',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-22.03-LTS-SP2/',
        DESC: 'openEuler openEuler 22.03 LTS SP2 is the patch version of openEuler 22.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP2/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/22.03_LTS_SP2/docs/Releasenotes/installing-the-os.html',
        WHITE_PAPER:
          '/whitepaper/en/openEuler 22.03 LTS SP2 Technical White Paper.pdf',
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
        PUBLISH_DATE: '2023/06',
        LTS: true,
        VERSION: '22.03-LTS-SP2',
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
        PUBLISH_DATE: '2023/03',
        LTS: false,
        VERSION: '23.03',
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
        PUBLISH_DATE: '2022/12',
        LTS: true,
        VERSION: '22.03-LTS-SP1',
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
        PUBLISH_DATE: '2022/09',
        LTS: false,
        VERSION: '22.09',
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
        PUBLISH_DATE: '2022/03',
        LTS: true,
        VERSION: '22.03-LTS',
        PLANNED_EOL: '2024/03',
      },
      {
        NAME: 'openEuler 20.03 LTS SP4',
        DOWNLOAD_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS-SP4/',
        DESC: 'openEuler 20.03 LTS SP3 is the patch version of openEuler 20.03 LTS, and both versions have the same lifecycle.',
        RELEASE_DESC_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP4/docs/Releasenotes/release_notes.html',
        INSTALL_GUIDENCE_URL:
          'https://docs.openeuler.org/en/docs/20.03_LTS_SP4/docs/Installation/Installation.html',
        SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
        GET_ISO_URL: 'https://repo.openeuler.org/',
        LIFE_CYCLE_URL: '/zh/other/lifecycle/',
        WEBSITE_SELECT: '/zh/mirror/select/?version=20.03-LTS-SP4',
        PUBLISH_DATE: '2023/12',
        LTS: true,
        VERSION: '20.03-LTS-SP4',
        PLANNED_EOL: '2025/11',
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
        PUBLISH_DATE: '2021/12',
        LTS: true,
        VERSION: '20.03-LTS-SP3',
        PLANNED_EOL: '2023/12',
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
          '/whitepaper/en/openEuler%2021.09%20%E6%8A%80%E6%9C%AF%E7%99%BD%E7%9A%AE%E4%B9%A6-en.pdf',
        WEBSITE_SELECT: '/en/mirror/select/?version=21.09',
        PUBLISH_DATE: '2021/09',
        LTS: false,
        VERSION: '21.09',
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
        PUBLISH_DATE: '2021/07',
        LTS: true,
        VERSION: '20.03-LTS-SP2',
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
        PUBLISH_DATE: '2021/03',
        LTS: false,
        VERSION: '21.03',
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
        PUBLISH_DATE: '2020/12',
        LTS: true,
        VERSION: '20.03-LTS-SP1',
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
        PUBLISH_DATE: '2020/09',
        LTS: false,
        VERSION: '20.09',
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
        PUBLISH_DATE: '2020/03',
        LTS: true,
        VERSION: '20.03-LTS',
        PLANNED_EOL: '2021/03',
      },
    ],
  },
};

export const SCENARIO_LIST = new Map(
  [
    { key: '', value: '', labelKey: 'download.all' },
    { key: 'ISO', value: 'ISO', labelKey: 'download.SCENARIOS_ISO' },
    { key: 'edge_img', value: 'edge_img', labelKey: 'download.SCENARIOS_EDGE' },
    {
      key: 'virtual_machine_img',
      value: 'virtual_machine_img',
      labelKey: 'download.SCENARIOS_VIRTUAL',
    },
    {
      key: 'embedded_img',
      value: 'embedded_img',
      labelKey: 'download.SCENARIOS_EMBEDDED',
    },
    {
      key: 'DevStation',
      value: 'DevStation',
      labelKey: 'download.SCENARIOS_DEVSTATION',
    },
    // fix 字符串切换响应式丢失问题
  ].map((item) => [
    item.key,
    {
      value: item.value,
      label: computed(() => i18n.global.t(item.labelKey)),
    },
  ])
);

// 历史版本版本类型筛选
export const VERSION_LIST = [
  { value: 'ALL', labelKey: 'download.all' },
  { value: 'LTS', labelKey: 'download.filterLts' },
  { value: 'NEW', labelKey: 'download.filterInnovation' },
  //切换响应式丢失问题
].map((item) => {
  return {
    value: item.value,
    label: computed(() => i18n.global.t(item.labelKey)),
  };
});

export const archMap = new Map([
  [
    'x86_64',
    {
      value: 'x86_64',
      label: 'x86_64',
    },
  ],
  [
    'aarch64',
    {
      value: 'aarch64',
      label: 'aarch64',
    },
  ],
  [
    'arm32',
    {
      value: 'arm32',
      label: 'ARM32',
    },
  ],
  [
    'loongarch64',
    {
      value: 'loongarch64',
      label: 'LoongArch64',
    },
  ],
  [
    'riscv64',
    {
      value: 'riscv64',
      label: 'RISC-V',
    },
  ],
  [
    'power',
    {
      value: 'power',
      label: 'Power',
    },
  ],
  [
    'sw64',
    {
      value: 'sw64',
      label: 'SW64',
    },
  ],
]);

const anchorList = computed(() => {
  return [
    { title: i18n.global.t('download.community'), id: 'community-releases' },
    ...getOs[i18n.global.locale.value].map((item) => ({
      title: item.title,
      id: item.id,
    })),
    { title: i18n.global.t('download.getResource'), id: 'related-resources' },
    { title: i18n.global.t('download.support'), id: 'services-resources' },
  ];
});
export { anchorList };

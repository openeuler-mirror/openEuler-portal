import img_01 from '@/assets/illustrations/migration/advantage-1.png';
import img_02 from '@/assets/illustrations/migration/advantage-2.png';
import img_03 from '@/assets/illustrations/migration/advantage-3.png';
export default {
  zh: {
    description:
      '随着数字化转型深入，操作系统正在向支持多样性计算、支持全场景的方向发展。在数字化转型的过程中，企业面临迁移操作系统的刚性需求，由于不同操作系统之间存在差异，企业在迁移操作系统时面临三个问题：如何处理软硬件兼容性问题？如何快速恢复系统环境？如何发挥系统的极致性能？openEuler 作为一款面向数字基础设施的开源操作系统，支持多样性计算，满足服务器、云、边缘和嵌入式全场景。基于openEuler 的迁移方案，包括成立迁移保障组织、迁移分析、方案设计、移植适配、迁移实施和测试上线六个阶段，同时借助x2openEuler工具的迁移评估和原地升级技术， 实现了全场景业务的“简单、平稳、高效”的迁移。',
    cards: [
      {
        text: '通过x2openEuler迁移评估技术，对软件、硬件、配置的兼容性情况给出全方位的分析。具体包括OS迁移前后，上层业务软件接口上的变化、依赖软件包版本的变化，操作系统配置参数的变化等，保证业务的平滑迁移。',
        url: img_01,
      },
      {
        text: 'openEuler为用户提供原地升级和适配迁移两种迁移路径，覆盖所有迁移场景，简化迁移流程。',
        url: img_02,
      },
      {
        text: '通过x2openEuler的原地升级技术，一键式将存量OS升级到openEuler，升级前后上层业务无需重新部署，参数无需重新配置，大大降低了升级时长。同时整个升级过程可以直接使用原有服务器资源，无需额外准备备用机，大大节省了迁移成本。原地升级技术将单节点的升级时长控制在1小时以内，最大程度的减少升级对业务的影响。',
        url: img_03,
      },
    ],
    tips: {
      text_1: '如果您有操作系统迁移意向，欢迎',
      text_2: '联系我们',
      text_3: '，openEuler工作人员将免费为您提供操作系统迁移咨询服务。',
      link: '',
    },
  },
  en: {
    description:
      "Today's digital world requires operating systems (OSs) to accommodate more computing architectures. For enterprise digital transformation, migrating OSs is a common operation, but this can often lead to like performance, compatibility, system environment restoration issues. openEuler is an open source OS that streamlines the differences between various computing architectures across servers, clouds, edges, and embedded systems. To make OS migration simple, reliable, and efficient, the openEuler migration solution comprises just six steps: create a migration support team, analyze migration needs, design a plan, adapt software, perform migration, and conduct testing and rollout. That brings us to x2openEuler, an openEuler tool designed for migration assessment and in-place upgrades.",
    cards: [
      {
        text: 'To ensure a seamless transition of services, x2openEuler performs thorough analysis of hardware, software, and configurations, including changes in upper-layer software interfaces, dependency versions, and post-migration OS configurations.',

        url: img_01,
      },
      {
        text: 'x2openEuler supports two migration paths: in-place upgrade and migration after adaptation.',

        url: img_02,
      },
      {
        text: 'x2openEuler in-place upgrade migrates existing OSs to openEuler within one hour, without requiring services to be redeployed or parameters reconfigured, significantly cutting down on time and effort. This cost-effective option enables the direct use of original server resources to remove the need for backup servers.',
        url: img_03,
      },
    ],
    tips: {
      text_1: 'For OS migration assistance, feel free to ',
      text_2: 'reach out to us',
      text_3:
        '. openEuler offers complimentary OS migration consultations for community members.',

      link: '',
    },
  },
};

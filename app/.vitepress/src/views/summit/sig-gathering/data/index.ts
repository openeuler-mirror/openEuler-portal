import banner_pc from '../img/banner-pc.jpg';
import banner_mo from '../img/banner-mo.jpg';
import introduce_light from '../img/introduce-light.png';
import introduce_Dark from '../img/introduce-dark.png';
import topic_light from '../img/topic-dark.png';
import topic_Dark from '../img/topic-dark.png';
import topic1 from '../img/topic1.png';
import topic2 from '../img/topic2.png';
import topic3 from '../img/topic3.png';
import topic4 from '../img/topic4.png';
import topic_dark1 from '../img/topic-dark1.png';
import topic_dark2 from '../img/topic-dark2.png';
import topic_dark3 from '../img/topic-dark3.png';
import topic_dark4 from '../img/topic-dark4.png';

export default {
  banner: {
    bgPc: banner_pc,
    bgMo: banner_mo,
    slogan: 'openEuler',
    title: 'SIG Gathering 2024',
    subtitle: '2024.07.26  | 北京香格里拉饭店',
    signUpHref: '/zh/interaction/summit-list/sig-gathering/form/',
    signUpTitle: '立即报名',
  },
  introduce: {
    titleImg: introduce_light,
    titleImDark: introduce_Dark,
    title: '活动简介',
    list: [
      'openEuler SIG Gathering 2024将于7月26日在北京香格里拉饭店举行。本次活动面向社区107个SIG组，诚邀社区开发者齐聚现场，通过全天线下会议，聚焦openEuler 24.03 LTS 版本后续重要规划和各SIG2024年下半年重要技术方案以及开发计划。',
      '“我参与，我做主”，本次SIG组工作会议将设立六大专题研讨，方向为：多样性算力、全场景应用、AI原生支持、openEuler原生开发、上游原生支持、用户体验研究。欢迎各SIG组选择您感兴趣的的专题链接，填写您的需求，一起线下共同探讨，寻求解决方案。'
    ]
  },
  topic: {
    titleImg: topic_light,
    titleImDark: topic_Dark,
    title: '专题分类',
    text: '提交演讲议题',
    list: [
      {
        title: '多样性算力',
        desc: [
          '体现社区南向支持，x86、ARM、RISC-V、龙芯等主流处理器架构全支持'
        ],
        bg: topic1,
        bgDark: topic_dark1,
        href: 'https://etherpad.openeuler.org/p/%E5%A4%9A%E6%A0%B7%E6%80%A7%E7%AE%97%E5%8A%9B',
      },
      {
        title: '全场景应用',
        desc: [
          '一套架构对服务器、云计算、边缘计算和嵌入式'
        ],
        bg: topic2,
        bgDark: topic_dark2,
        href: 'https://etherpad.openeuler.org/p/%E5%85%A8%E5%9C%BA%E6%99%AF%E5%BA%94%E7%94%A8',
      },
      {
        title: 'AI原生支持',
        desc: [
          'openEuler从通用算力的多样化，到智能算力的多样化三层AI使能架构：',
          '1、基于LLM的智能交互平台，颠覆传统shell 命令交付的模式，改进传统学习，开发，调优，运维体验，智能新语义支持应用智能化升级，共建AI生态',
          '2、CPU/GPU/NPU 算力融合，面向训练高可用/推理低成本方向，降本增效',
          '3、AI 主流软件栈4层栈全栈兼容及封装，主流推理框架加速，开箱即用'
        ],
        href: 'https://etherpad.openeuler.org/p/AI%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81',
      },
      {
        title: 'openEuler原生开发',
        desc: [
          'openEuler本地开发环境、加包与更新维护、社区开发与协作基础设施、社区构建测试服务'
        ],
        bg: topic3,
        bgDark: topic_dark3,
        href: 'https://etherpad.openeuler.org/p/openEulerAI%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91',
      },
      {
        title: '上游原生支持',
        desc: [
          '本方向主要涉及：openEuler上游原生支持技术讨论及进展同步，讨论如何做好从上游原生支持到openEuler原生发布的关键环节，包含上游协同，监测，维护管理等'
        ],
        bg: topic4,
        bgDark: topic_dark4,
        href: 'https://etherpad.openeuler.org/p/%E4%B8%8A%E6%B8%B8%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81',
      },
      {
        title: '用户体验研究',
        desc: [
          '1.深化知识共享：提供高质量的中英文文档，作为知识共享的基石',
          '2.推动技术融合：通过软硬件兼容性测试与认证，促进openEuler生态的健康发展',
          '3.人才培养与发展：通过设计和实施有效的人才认证和培养计划，为人才提供成长和发展的机会',
          '4.设计语言的统一与创新：通过构建一致性的设计语言，定义社区视觉规范'
        ],
        href: 'https://etherpad.openeuler.org/p/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E7%A0%94%E7%A9%B6',
      }
    ]
  },
  agenda: {
    title: '活动日程',
  }
}

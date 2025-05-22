import quickStartBg from '~@/assets/category/intelligence/quick-start-bg.png';
import advancedMasterBg from '~@/assets/category/intelligence/advanced-master-bg.png';
import aiMasterBg from '~@/assets/category/intelligence/ai-master-bg.png';
import moreResourcesBg from '~@/assets/category/intelligence/more-resources-bg.png';

import quickStartBgDark from '~@/assets/category/intelligence/quick-start-bg-dark.png';
import advancedMasterBgDark from '~@/assets/category/intelligence/advanced-master-bg-dark.png';
import aiMasterBgDark from '~@/assets/category/intelligence/ai-master-bg-dark.png';
import moreResourcesBgDark from '~@/assets/category/intelligence/more-resources-bg.png';

export const deployList = [
  {
    id: 'quick-start',
    title: {
      zh: '快速入门',
      en: 'Quick start',
    },
    img: quickStartBg,
    imgDark: quickStartBgDark,
    list: [
      {
        text: '玩转AI - 一键部署openEuler智能化解决方案',
        href: 'https://docs.openeuler.org/zh/docs/25.03/tools/ai/euler-copilot-framework/openEuler_intelligence/intelligent_assistant/quick_start/smart_web/deploy_guide/online.html',
      },
      {
        text: '构建知识库 - 构建本地问答助手',
        href: 'https://docs.openeuler.org/zh/docs/25.03/tools/ai/euler-copilot-framework/openEuler_intelligence/intelligent_assistant/advance/knowledge_base/deploy_guide/witChainD_deployment.html',
      },
    ],
  },
  {
    id: 'advanced-master',
    title: {
      zh: '高手进阶',
      en: 'Advanced techniques',
    },
    img: advancedMasterBg,
    imgDark: advancedMasterBgDark,
    list: [
      {
        text: '工作流编排 - 个人/企业接入本地服务并构建工作流应用',
        href: 'https://docs.openeuler.org/zh/docs/25.03/tools/ai/euler-copilot-framework/openEuler_intelligence/intelligent_assistant/advance/work_flow/deploy_guide/workflow_deployment.html',
      },
      {
        text: 'MCP精通 - openEuler智能化解决方案注册MCP服务，编排agent应用',
        href: 'https://docs.openeuler.org/zh/docs/25.03/tools/ai/euler-copilot-framework/openEuler_intelligence/mcp_agent/mcp_guide.html',
      },
    ],
  },
  {
    id: 'ai-master',
    title: {
      zh: 'AI 大师',
      en: 'AI mastery path',
    },
    img: aiMasterBg,
    imgDark: aiMasterBgDark,
    list: [
      {
        text: 'openEuler智能化解决方案+syshax+openEuler本地轻量化部署openEuler智能化解决方案',
        href: 'https://docs.openeuler.org/zh/docs/25.03/tools/ai/euler-copilot-framework/intelligent_foundation/sysHAX/deploy_guide/sysHax-deployment-guide.html',
      },
    ],
  },
  {
    id: 'more-resources',
    title: {
      zh: '更多资源',
      en: 'More resources',
    },
    img: moreResourcesBg,
    imgDark: moreResourcesBgDark,
    list: [
      {
        text: '版本与兼容性信息',
        href: 'https://gitee.com/openeuler/euler-copilot-framework/blob/master/docs/user-guide/%E7%89%88%E6%9C%AC%E5%8F%8A%E5%85%BC%E5%AE%B9%E6%80%A7%E8%AF%B4%E6%98%8E.md',
      },
    ],
  },
];

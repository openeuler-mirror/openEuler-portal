import CPU from '~icons/app-new/icon-CPU.svg';
import GPU from '~icons/app-new/icon-GPU.svg';
import NPU from '~icons/app-new/icon-NPU.svg';

// 注意：INTELLIGENCE_BOOM_MEMBERS、VISION_DATA、VERSION_INFO 已提取到
// .content/projects/intelligence-boom/ yaml 中。
// ARCHITECTURE_DATA 因复杂树形结构（name_zh/name_en 与 name 共存）保留在此文件中。

export const ARCHITECTURE_DATA = {
  leftSidebar: {
    name_zh: '全栈安全平台',
    name_en: 'Full-stack security platform',
  },
  layers: [
    {
      name_zh: '智能应用平台',
      name_en: 'Intelligent application platform',
      version: ['first', 'second'],
      children: [
        {
          name: 'openEuler Intelligence',
          url: 'https://gitcode.com/openeuler/euler-copilot-framework',
          version: ['first', 'second'],
          labelPosition: 'center',
          children: [
            { name_zh: '智能调优', name_en: 'Intelligent tuning', color: 'dark', url: 'https://gitcode.com/openeuler/euler-copilot-framework', version: ['first', 'second'] },
            { name_zh: '智能运维', name_en: 'Intelligent O&M', color: 'dark', url: 'https://gitcode.com/openeuler/euler-copilot-framework', version: ['first', 'second'] },
            { name_zh: '智能问答', name_en: 'Intelligent question answering', color: 'dark', url: 'https://gitcode.com/openeuler/euler-copilot-framework', version: ['first', 'second'] },
            { name_zh: '深度研究', name_en: 'Deep research', color: 'dark', url: 'https://gitcode.com/openeuler/deepInsight', version: ['first', 'second'] }
          ]
        },
        {
          version: ['second'],
          children: [
            { name: 'Dify', color: 'light', version: ['second'] },
            { name: 'Langchain', color: 'light', version: ['second'] },
            { name: '...', color: 'light', version: ['second'] }
          ]
        }
      ]
    },
    {
      name_zh: '领域模型平台',
      name_en: 'Domain model platform',
      version: ['second'],
      children: [
        {
          children: [
            { name: 'openEuler OS Model', color: 'dark', url: 'https://gitcode.com/openeuler/euler-copilot-framework', version: ['second'] },
            { name: '...', color: 'light', version: ['second'] }
          ]
        }
      ]
    },
    {
      name_zh: '运行加速平台',
      name_en: 'Runtime acceleration platform',
      version: ['first', 'second'],
      children: [
        {
          version: ['first', 'second'],
          children: [
            { name: 'vLLM', color: 'light', version: ['first', 'second'] },
            { name: 'SGLang', color: 'light', version: ['first', 'second'] },
            { name: 'LLaMA Factory', color: 'light', version: ['first', 'second'] },
            { name: '...', color: 'light', version: ['first', 'second'] }
          ]
        },
        {
          version: ['first', 'second'],
          children: [
            { name: 'sysHAX', color: 'dark', url: 'https://gitcode.com/openeuler/sysHAX', version: ['first', 'second'] },
            { name: 'Expert-Kit', color: 'dark', url: 'https://gitcode.com/openeuler/expert-kit', version: ['first', 'second'] },
            { name: 'LMCache', color: 'dark', url: 'https://gitcode.com/GitHub_Trending/lm/LMCache', version: ['second'] },
            { name: '...', color: 'light', version: ['first', 'second'] }
          ]
        },
        {
          version: ['first', 'second'],
          children: [
            { name: 'MindSpore', color: 'dark', url:'https://gitcode.com/mindspore', version: ['first', 'second'] },
            { name: 'PyTorch', color: 'light', version: ['first', 'second'] },
            { name: '...', color: 'light', version: ['first', 'second'] }
          ]
        },
        {
          version: ['second'],
          children: [
            { name: 'MS-InferRT', color: 'light', version: ['second'] }
          ]
        }
      ]
    },
    {
      name_zh: '数据管理平台',
      name_en: 'Data management platform',
      version: ['first', 'second'],
      children: [
        {
          children: [
            { name: 'openGauss', color: 'dark', url: 'https://gitcode.com/opengauss', version: ['first', 'second'] }
          ]
        }
      ]
    },
    {
      name_zh: '任务管理平台',
      name_en: 'Task management platform',
      version: ['first', 'second'],
      children: [
        {
          children: [
            { name: 'openYuanrong', color: 'dark', url: 'https://gitcode.com/openeuler/yuanrong', version: ['second'] },
            { name: 'RAY', color: 'light', version: ['first', 'second'] }
          ]
        },
        {
          version: ['first', 'second'],
          children: [
            { name: 'openFuyao', color: 'dark', url: 'https://gitcode.com/openFuyao', version: ['first', 'second'] },
            { name: 'K8S', color: 'light', version: ['first', 'second'] },
            { name: 'oeDeploy', color: 'dark', url: 'https://gitcode.com/openeuler/oeDeploy', version: ['first', 'second'] },
            { name: '...', color: 'light', version: ['first', 'second'] }
          ]
        }
      ]
    },
    {
      name_zh: '异构融合平台',
      name_en: 'Heterogeneous convergence platform',
      version: ['first', 'second'],
      children: [
        {
          name_zh: '异构融合编译',
          name_en: 'Heterogeneous Convergence Compilation',
          version: ['first', 'second'],
          labelPosition: 'left',
          children: [
            { name: 'AscendNPUIR', color: 'dark', url: 'https://gitcode.com/ascend/ascendnpu-ir', version: ['first', 'second'] },
            { name: 'AKG', color: 'dark', url: 'https://gitcode.com/mindspore/akg', version: ['second'] }
          ]
        },
        {
          name_zh: '异构融合操作系统内核',
          name_en: 'Heterogeneous Fusion Operating System Kernel',
          version: ['first', 'second'],
          labelPosition: 'left',
          children: [
            { name: 'FalconFS', color: 'dark', url: 'https://gitcode.com/openeuler/FalconFS', version: ['first', 'second'] },
            { name: 'GMEM', color: 'dark', url: 'https://gitcode.com/openeuler/kernel/tree/OLK-6.6/mm', version: ['first', 'second'] },
            {
              version: ['second'],
              children: [
                { name_zh: 'Xsched(用户态)', name_en: ['Xsched', '(user-space)'], color: 'dark', url: 'https://gitcode.com/openeuler/xsched', version: ['second'] },
                { name_zh: 'Xsched(内核态)', name_en: ['Xsched', '(kernel-space)'], color: 'dark', url: 'https://gitcode.com/openeuler/kernel/tree/OLK-6.6', version: ['second'] },
              ]
            },
            { name: 'ModelFS', color: 'dark', url: 'https://gitcode.com/openeuler/kernel/tree/OLK-6.6/fs/mfs', version: ['second'] },
            { name: 'xMig', color: 'dark', url: 'https://gitcode.com/openeuler/xmig', version: ['second'] },
            { name: 'LMCache', color: 'dark', url: 'https://gitcode.com/GitHub_Trending/lm/LMCache', version: ['first'] },
          ]
        }
      ]
    }
  ],
  bottomBar: [
    { name: 'CPU', icon: CPU },
    { name: 'NPU', icon: NPU },
    { name: 'GPU', icon: GPU },
  ]
};

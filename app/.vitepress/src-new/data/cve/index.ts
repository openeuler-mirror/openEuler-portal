export const statusMap = new Map([
  [
    'all',
    {
      value: '',
      label: {
        zh: '全部',
        en: 'All',
      },
      tag: {
        zh: '',
        en: '',
      },
    },
  ],
  [
    'Fixed',
    {
      value: 'Fixed',
      label: {
        zh: 'Fixed',
        en: 'Fixed',
      },
      tag: {
        zh: '该漏洞影响到了openEuler产品，相应的修复已经发布更新',
        en: 'This vulnerability affects openEuler releases, and a fix has been released.',
      },
    },
  ],
  [
    'Unaffected',
    {
      value: 'Unaffected',
      label: {
        zh: 'Unaffected',
        en: 'Unaffected',
      },
      tag: {
        zh: '该漏洞不影响openEuler产品，无需修复更新',
        en: 'This vulnerability does not affect openEuler releases and does not need to be fixed or updated.',
      },
    },
  ],
  [
    'Affected',
    {
      value: 'Affected',
      label: {
        zh: 'Affected',
        en: 'Affected',
      },
      tag: {
        zh: '该漏洞影响到了openEuler产品，正在努力准备相应的修复更新',
        en: 'This vulnerability affects openEuler releases, and a fix is being prepared.',
      },
    },
  ],
  [
    'Under Investigation',
    {
      value: 'Under Investigation',
      label: {
        zh: 'Under Investigation',
        en: 'Under Investigation',
      },
      tag: {
        zh: 'openEuler安全小组正在努力分析评估该漏洞对openEuler产品的影响，暂时还没有确认该漏洞是否影响到了openEuler相关产品。',
        en: 'The openEuler security team is analyzing and evaluating the impact of this vulnerability on openEuler releases and has not yet confirmed if openEuler releases are affected.',
      },
    },
  ],
]);

export const REASON = [
  {
    value: '',
    label: {
      zh: '全部',
      en: 'All',
    },
  },
  {
    value: 'will fix',
    label: {
      zh: 'Will fix',
      en: 'Will fix',
    },
  },
  {
    value: 'none_available-Vulnerabilities are still analyzing',
    label: {
      zh: 'Vulnerabilities are still analyzing',
      en: 'Vulnerabilities are still analyzing',
    },
  },
  {
    value: 'none_available-No solution or patch',
    label: {
      zh: 'No solution or patch',
      en: 'No solution or patch',
    },
  },
  {
    value: 'none_available-To be fixed through an upgraded version',
    label: {
      zh: 'To be fixed through upgraded',
      en: 'To be fixed through upgraded',
    },
  },
  {
    value: 'no_fix_planned-Out of support scope',
    label: {
      zh: 'Out of support scope',
      en: 'Out of support scope',
    },
  },
  {
    value: 'no_fix_planned-Will not fix',
    label: {
      zh: 'Will not fix',
      en: 'Will not fix',
    },
  },
  {
    value: 'component_not_present',
    label: {
      zh: 'Component not present',
      en: 'Component not present',
    },
  },
  {
    value: 'inline_mitigations_already_exist',
    label: {
      zh: 'Inline mitigations already exist',
      en: 'Inline mitigations already exist',
    },
  },
  {
    value: 'vulnerable_code_cannot_be_controlled_by_adversary',
    label: {
      zh: 'Vulnerable code cannot be controlled',
      en: 'Vulnerable code cannot be controlled',
    },
  },
  {
    value: 'vulnerable_code_not_in_execute_path',
    label: {
      zh: 'Vulnerable code not in execute path',
      en: 'Vulnerable code not in execute path',
    },
  },
  {
    value: 'vulnerable_code_not_present',
    label: {
      zh: 'Vulnerable code not present',
      en: 'Vulnerable code not present',
    },
  },
];

export const glossaryList = [
  {
    status: 'Fixed',
    description: {
      zh: '该漏洞影响到了openEuler产品，相应的修复已经发布更新',
      en: 'This vulnerability affects openEuler releases, and a fix has been released.',
    },
  },
  {
    status: 'Affected',
    description: {
      zh: '该漏洞影响到了openEuler产品，正在努力准备相应的修复更新',
      en: 'This vulnerability affects openEuler releases, and a fix is being prepared.',
    },
  },
  {
    status: 'Vulnerabilities are still analyzing',
    description: {
      zh: '正在努力准备相应的修复方案',
      en: 'A fix is being prepared.',
    },
  },
  {
    status: 'No solution or patch',
    description: {
      zh: '目前暂时没有相应的修复方案或补丁',
      en: 'No fix or patch is available.',
    },
  },
  {
    status: 'To be fixed through an upgraded version',
    description: {
      zh: '目前等待版本升级后修复',
      en: 'A fix for this vulnerability will be included in a future version update.',
    },
  },
  {
    status: 'Out of support scope',
    description: {
      zh: '该漏洞涉及的软件包或对应的影响的版本不在openEuler产品服务支持范围。建议依据openEuler对该漏洞的影响评估，采用可能的缓解方案或升级到有支持的软件包或版本。',
      en: 'The packages or versions affected by this vulnerability are not within the support scope of openEuler. You are advised to adopt available mitigations or upgrade to supported packages or versions based on the impact scope evaluated by openEuler.',
    },
  },
  {
    status: 'Will not fix',
    description: {
      zh: '虽然该漏洞影响到了openEuler产品，但经openEuler安全小组分析评估后，决定暂不修复该漏洞。\n我们建议：',
      en: 'Although this vulnerability affects openEuler releases, the openEuler security team has decided not to fix it at this time after analysis and evaluation.\nSuggestions:',
    },
    listZh: [
      '优先考虑升级你的产品；升级到已经包括该漏洞修复的，或者不受该漏洞影响的openEuler产品。',
      '如果该漏洞有缓解方案，可以尝试使用缓解方案。',
      '向我们反馈你的诉求，请说明需要修复的理由。',
    ],
    listEn: [
      'Upgrade your OS to an openEuler release that includes a fix for this vulnerability or is not affected by it.',
      'If a mitigation is available for this vulnerability, consider applying it.',
      'Provide feedback to us outlining why a fix is necessary.',
    ],
  },
  {
    status: 'Unaffected',
    description: {
      zh: '该漏洞不影响openEuler产品，无需修复更新',
      en: 'This vulnerability does not affect openEuler releases and does not need to be fixed or updated.',
    },
  },
  {
    status: 'Component_not_present',
    description: {
      zh: 'openEuler相关产品中不存在漏洞影响的相关组件',
      en: 'openEuler releases do not include components affected by this vulnerability.',
    },
  },
  {
    status: 'Inline_mitigations_already_exist',
    description: {
      zh: 'openEuler相关产品中已有内置的内联控制或缓解措施',
      en: 'openEuler releases have incorporated control or mitigations.',
    },
  },
  {
    status: 'Vulnerable code cannot be controlled',
    description: {
      zh: 'openEuler相关产品中漏洞代码不能被攻击者触发',
      en: 'Attackers cannot successfully exploit the vulnerable code in openEuler releases.',
    },
  },
  {
    status: 'Vulnerable code not in execute path',
    description: {
      zh: 'openEuler相关产品中漏洞代码不在执行路径',
      en: 'Vulnerable code in openEuler releases is not on the execution path.',
    },
  },
  {
    status: 'Vulnerable code not present',
    description: {
      zh: 'openEuler相关产品中漏洞代码不存在',
      en: 'openEuler releases do not contain the vulnerable code',
    },
  },
  {
    status: 'Under Investigation',
    description: {
      zh: 'openEuler安全小组正在努力分析评估该漏洞对openEuler产品的影响，暂时还没有确认该漏洞是否影响到了openEuler相关产品。',
      en: 'The openEuler security team is analyzing and evaluating the impact of this vulnerability on openEuler releases and has not yet confirmed if openEuler releases are affected.',
    },
  },
];

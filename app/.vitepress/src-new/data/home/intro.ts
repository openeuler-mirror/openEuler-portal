import computingArch_zh_pc from '~@/assets/category/home/intro/computing-arch_zh_pc.jpg';
import coverAll_zh_pc from '~@/assets/category/home/intro/cover-all_zh_pc.jpg';
import developmentTool_zh_pc from '~@/assets/category/home/intro/development-tool_zh_pc.jpg';

import computingArch_zh_mo from '~@/assets/category/home/intro/computing-arch_zh_mo.png';
import coverAll_zh_mo from '~@/assets/category/home/intro/cover-all_zh_mo.png';
import developmentTool_zh_mo from '~@/assets/category/home/intro/development-tool_zh_mo.png';

import computingArch_en_pc from '~@/assets/category/home/intro/computing-arch_en_pc.jpg';
import coverAll_en_pc from '~@/assets/category/home/intro/cover-all_en_pc.jpg';
import developmentTool_en_pc from '~@/assets/category/home/intro/development-tool_en_pc.jpg';

import computingArch_en_mo from '~@/assets/category/home/intro/computing-arch_en_mo.png';
import coverAll_en_mo from '~@/assets/category/home/intro/cover-all_en_mo.png';
import developmentTool_en_mo from '~@/assets/category/home/intro/development-tool_en_mo.png';

// 左侧icon
import computingArch_icon_light from '~@/assets/category/home/intro/computing-arch_light.png';
import coverAll_icon_light from '~@/assets/category/home/intro/cover-all_light.png';
import developmentTool_icon_light from '~@/assets/category/home/intro/development-tool_light.png';

import computingArch_icon_dark from '~@/assets/category/home/intro/computing-arch_dark.png';
import coverAll_icon_dark from '~@/assets/category/home/intro/cover-all_dark.png';
import developmentTool_icon_dark from '~@/assets/category/home/intro/development-tool_dark.png';
export default [
  {
    title: {
      zh: '支持多样性设备',
      en: 'Various Devices',
    },
    img: {
      zh: {
        pc: computingArch_zh_pc,
        mo: computingArch_zh_mo,
      },
      en: {
        pc: computingArch_en_pc,
        mo: computingArch_en_mo,
      },
    },
    icon: {
      light: computingArch_icon_light,
      dark: computingArch_icon_dark,
    },
    description: '全量组件原子化，构建服务自助化',
  },
  {
    title: {
      zh: '覆盖全场景应用',
      en: 'All-Scenario Applications',
    },
    img: {
      zh: {
        pc: coverAll_zh_pc,
        mo: coverAll_zh_mo,
      },
      en: {
        pc: coverAll_en_pc,
        mo: coverAll_en_mo,
      },
    },
    icon: {
      light: coverAll_icon_light,
      dark: coverAll_icon_dark,
    },
    description: '一次开发，覆盖数字基础设施全场景',
  },
  {
    title: {
      zh: '完整开发工具链',
      en: 'Development Tool Chain',
    },
    img: {
      zh: {
        pc: developmentTool_zh_pc,
        mo: developmentTool_zh_mo,
      },
      en: {
        pc: developmentTool_en_pc,
        mo: developmentTool_en_mo,
      },
    },
    icon: {
      light: developmentTool_icon_light,
      dark: developmentTool_icon_dark,
    },
    description: '统一API跨多设备调用',
  },
];

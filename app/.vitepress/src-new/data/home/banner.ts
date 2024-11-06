import summit2024_pc_light from '~@/assets/category/home/banner/summit2024/summit2024_pc_light.jpg';
import summit2024_pc_dark from '~@/assets/category/home/banner/summit2024/summit2024_pc_dark.jpg';
import summit2024_pad_light from '~@/assets/category/home/banner/summit2024/summit2024_pad_light.jpg';
import summit2024_pad_dark from '~@/assets/category/home/banner/summit2024/summit2024_pad_dark.jpg';
import summit2024_mb_light from '~@/assets/category/home/banner/summit2024/summit2024_mb_light.jpg';
import summit2024_mb_dark from '~@/assets/category/home/banner/summit2024/summit2024_mb_dark.jpg';
import summit2024_attach_light from '~@/assets/category/home/banner/summit2024/summit2024_attach_light.png';
import summit2024_attach_dark from '~@/assets/category/home/banner/summit2024/summit2024_attach_dark.png';

import ossummit_pc from '~@/assets/category/home/banner/ossummit/ossummit_pc.jpg';
import ossummit_pad from '~@/assets/category/home/banner/ossummit/ossummit_pad.jpg';
import ossummit_mb from '~@/assets/category/home/banner/ossummit/ossummit_mb.jpg';

import annual2023_pc from '~@/assets/category/home/banner/annual2023/annual2023_pc.jpg';
import annual2023_pad from '~@/assets/category/home/banner/annual2023/annual2023_pad.jpg';
import annual2023_mb from '~@/assets/category/home/banner/annual2023/annual2023_mb.jpg';

import innovation_pc from '~@/assets/category/home/banner/innovation/innovation_pc.jpg';
import innovation_pad from '~@/assets/category/home/banner/innovation/innovation_pad.jpg';
import innovation_mb from '~@/assets/category/home/banner/innovation/innovation_mb.jpg';

export default {
  zh: [
    {
      light: {
        bg_pc: summit2024_pc_light,
        bg_pad: summit2024_pad_light,
        bg_mb: summit2024_mb_light,
        attach: summit2024_attach_light,
        bg_theme: 'light',
      },
      dark: {
        bg_pc: summit2024_pc_dark,
        bg_pad: summit2024_pad_dark,
        bg_mb: summit2024_mb_dark,
        attach: summit2024_attach_dark,
        bg_theme: 'dark',
      },
      href: '/zh/interaction/summit-list/summit2024/',
      isBlank: true,
    },
    {
      bg_pc: ossummit_pc,
      bg_pad: ossummit_pad,
      bg_mb: ossummit_mb,
      bg_theme: 'dark',
      href: 'https://osseu2024.sched.com/event/1iWLB',
      isBlank: true,
    },
    {
      bg_pc: annual2023_pc,
      bg_pad: annual2023_pad,
      bg_mb: annual2023_mb,
      href: '/zh/news/openEuler/20240223-nianbao/Untitled-1.html',
      isBlank: true,
      title: ['openEuler 2023 社区年报'],
      btn: '查看详情',
      bg_theme: 'dark',
    },
    {
      bg_pc: innovation_pc,
      bg_pad: innovation_pad,
      bg_mb: innovation_mb,
      bg_theme: 'dark',
      href: '/whitepaper/openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%EF%BC%88%E5%88%9B%E6%96%B0%E9%A1%B9%E7%9B%AE%E6%80%BB%E8%A7%88%EF%BC%89.pdf',
      isBlank: true,
      title: ['《openEuler操作系统（创新项目总览）》'],
      btn: '查看详情',
    },
  ],
  en: [
    {
      light: {
        bg_pc: summit2024_pc_light,
        bg_pad: summit2024_pad_light,
        bg_mb: summit2024_mb_light,
        attach: summit2024_attach_light,
        bg_theme: 'light',
      },
      dark: {
        bg_pc: summit2024_pc_dark,
        bg_pad: summit2024_pad_dark,
        bg_mb: summit2024_mb_dark,
        attach: summit2024_attach_dark,
        bg_theme: 'dark',
      },
      href: '/zh/interaction/summit-list/summit2024/',
      isBlank: true,
    },
    {
      bg_pc: ossummit_pc,
      bg_pad: ossummit_pad,
      bg_mb: ossummit_mb,
      bg_theme: 'dark',
      href: 'https://osseu2024.sched.com/event/1iWLB',
      isBlank: true,
    },
    {
      bg_pc: innovation_pc,
      bg_pad: innovation_pad,
      bg_mb: innovation_mb,
      bg_theme: 'dark',
      link: '/whitepaper/en/openEuler%20OS%20Technical%20Whitepaper_Innovation%20Projects_EN.pdf',
      isBlank: true,
      title: ['openEuler OS Technical Whitepaper', 'Innovation Projects'],
      btn: 'Download',
    },
  ],
};

export const a = {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        // pcBanner: {
        //   light: osSummit_pc_light,
        //   dark: osSummit_pc_dark,
        // },
        pcBanner: osSummit_pc_light,
        moBanner: osSummit_mo_light,
        // moBanner: {
        //   light: osSummit_mo_light,
        //   dark: osSummit_mo_dark,
        // },
        link: '/zh/interaction/summit-list/summit2024/',
        id: 'devday',
        targetTap: 1,
        textImg_pc: {
          light: wenzi_light,
          dark: wenzi_dark,
        },
      },
      {
        pcBanner: osSummit_pc,
        moBanner: osSummit_mo,
        link: 'https://osseu2024.sched.com/event/1iWLB',
        id: 'osseu',
        btn: '',
        targetTap: 1,
      },
      {
        pcBanner: annualReport_pc,
        moBanner: annualReport_mo,
        link: '/zh/news/openEuler/20240223-nianbao/Untitled-1.html',
        id: 'annual-report',
        title: ['openEuler 2023 社区年报'],
        btn: '查看详情',
        targetTap: 1,
      },
      {
        pcBanner: banner1_pc,
        moBanner: banner1_mo,
        link: '/whitepaper/openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%EF%BC%88%E5%88%9B%E6%96%B0%E9%A1%B9%E7%9B%AE%E6%80%BB%E8%A7%88%EF%BC%89.pdf',
        id: 'whitepaper',
        title: ['《openEuler操作系统（创新项目总览）》'],
        btn: '查看详情',
        targetTap: 1,
      },
    ],
    en: [
      {
        pcBanner: {
          light: osSummit_pc_light,
          dark: osSummit_pc_dark,
        },
        moBanner: {
          light: osSummit_mo_light,
          dark: osSummit_mo_dark,
        },
        link: '/en/interaction/summit-list/summit2024/',
        id: 'devday',
        targetTap: 1,
        textImg_pc: {
          light: wenzi_light,
          dark: wenzi_dark,
        },
      },
      {
        pcBanner: osSummit_pc,
        moBanner: osSummit_mo,
        link: 'https://osseu2024.sched.com/event/1iWLB',
        id: 'osseu',
        btn: '',
        targetTap: 1,
      },
      {
        pcBanner: banner1_pc,
        moBanner: banner1_mo,
        link: '/whitepaper/en/openEuler%20OS%20Technical%20Whitepaper_Innovation%20Projects_EN.pdf',
        id: 'whitepaper',
        title: ['openEuler OS Technical Whitepaper', 'Innovation Projects'],
        btn: 'Download',
        targetTap: 1,
      },
    ],
  },
};

import annualReport_pc from '@/assets/category/home/banner/annual-report_pc.jpg';
import annualReport_mo from '@/assets/category/home/banner/annual-report_mo.jpg';

import banner1_pc from '@/assets/category/home/banner/banner1_pc.jpg';
import banner1_mo from '@/assets/category/home/banner/banner1_mo.jpg';

import banner_pc from '@/assets/category/home/banner/banner.jpg';
import banner_mo from '@/assets/category/home/banner/banner_mo.jpg';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: banner_pc,
        moBanner: banner_mo,
        link: '/zh/interaction/summit-list/devday2024/',
        id: 'devday2024',
        title: [
          '开放原子开源基金会',
          'openEuler Developer Day 2024',
          '诚邀您提交议题，申报SIG会议',
        ],
        desc: ['6月 中国-深圳'],
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

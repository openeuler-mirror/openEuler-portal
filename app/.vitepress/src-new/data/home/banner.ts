import newyear_pc from '~@/assets/category/home/banner/new-year/pc.jpg';
import newyear_pad from '~@/assets/category/home/banner/new-year/pad.jpg';
import newyear_mb from '~@/assets/category/home/banner/new-year/mb.jpg';

import innovation_pc from '~@/assets/category/home/banner/innovation/innovation_pc.jpg';
import innovation_pad from '~@/assets/category/home/banner/innovation/innovation_pad.jpg';
import innovation_mb from '~@/assets/category/home/banner/innovation/innovation_mb.jpg';

export default {
  zh: [
    {
      bg_pc: newyear_pc,
      bg_pad: newyear_pad,
      bg_mb: newyear_mb,
      bg_theme: 'light',
      title: ['openEuler 2024 社区年报'],
      btn: '查看详情',
      href: '/zh/annual-report/openEuler-annual-report-2024/',
      isBlank: true,
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
      bg_pc: innovation_pc,
      bg_pad: innovation_pad,
      bg_mb: innovation_mb,
      bg_theme: 'dark',
      href: '/whitepaper/en/openEuler%20OS%20Technical%20Whitepaper_Innovation%20Projects_EN.pdf',
      isBlank: true,
      title: ['openEuler OS Technical Whitepaper', 'Innovation Projects'],
      btn: 'Download',
    },
  ],
};

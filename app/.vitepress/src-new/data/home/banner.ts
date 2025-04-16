import newyear_pc from '~@/assets/category/home/banner/new-year/pc.jpg';
import newyear_pad from '~@/assets/category/home/banner/new-year/pad.jpg';
import newyear_mb from '~@/assets/category/home/banner/new-year/mb.jpg';
import newyear_mb_en from '~@/assets/category/home/banner/new-year/mb_en.png';

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
  ],
  en: [
    {
      bg_pc: newyear_pc,
      bg_pad: newyear_pad,
      bg_mb: newyear_mb_en,
      bg_theme: 'light',
      title: ['openEuler 2024 Annual Report'],
      btn: 'View More',
      href: '/en/annual-report/openEuler-annual-report-2024/',
      isBlank: true,
    },
  ],
};

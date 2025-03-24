import newyear_pc from '~@/assets/category/home/banner/new-year/pc.jpg';
import newyear_pad from '~@/assets/category/home/banner/new-year/pad.jpg';
import newyear_mb from '~@/assets/category/home/banner/new-year/mb.jpg';
import newyear_mb_en from '~@/assets/category/home/banner/new-year/mb_en.png';

import dev2025_pc from '~@/assets/category/home/banner/dev2025/dev2025-pc.jpg';
import dev2025_text from '~@/assets/category/home/banner/dev2025/dev2025-text.png';
import dev2025_mb from '~@/assets/category/home/banner/dev2025/dev2025-mb.jpg';
import dev2025_pad from '~@/assets/category/home/banner/dev2025/dev2025-pad.jpg';

export default {
  zh: [
    {
      bg_pc: dev2025_pc,
      bg_pad: dev2025_pad,
      bg_mb: dev2025_mb,
      bg_text: dev2025_text,
      bg_theme: 'light',
      href: '/zh/interaction/summit-list/devday2025/',
      isBlank: true,
    },
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

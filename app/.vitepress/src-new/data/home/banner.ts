import newyear_pc from '~@/assets/category/home/banner/new-year/pc.jpg';
import newyear_pad from '~@/assets/category/home/banner/new-year/pad.jpg';
import newyear_mb from '~@/assets/category/home/banner/new-year/mb.jpg';
import newyear_mb_en from '~@/assets/category/home/banner/new-year/mb_en.png';

import opensource_summer_pc from '~@/assets/category/home/banner/opensource-summer/pc.jpg';
import opensource_summer_text from '~@/assets/category/home/banner/opensource-summer/text.png';
import opensource_summer_mb from '~@/assets/category/home/banner/opensource-summer/mb.jpg';
import opensource_summer_pad from '~@/assets/category/home/banner/opensource-summer/pad.jpg';

import survey_pc from '~@/assets/category/home/banner/satisfaction-survey/pc.jpg';
import survey_pad from '~@/assets/category/home/banner/satisfaction-survey/pad.jpg';
import survey_mb from '~@/assets/category/home/banner/satisfaction-survey/mb.jpg';

export default {
  zh: [
    {
      bg_pc: survey_pc,
      bg_pad: survey_pad,
      bg_mb: survey_mb,
      bg_theme: 'light',
      title: ['openEuler用户满意度调研问卷'],
      btn: '查看详情',
      href: '/zh/news/2025-satisfaction-survey/2025-satisfaction-survey',
      isBlank: true,
    },
    {
      bg_pc: opensource_summer_pc,
      bg_pad: opensource_summer_pad,
      bg_mb: opensource_summer_mb,
      bg_text: opensource_summer_text,
      bg_theme: 'light',
      btn: '查看详情',
      href: 'https://summer-ospp.ac.cn/org/orgdetail/b9770f4d-f586-4373-bdac-ce6389065946?lang=zh',
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

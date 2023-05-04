import techDay_pc from '@/assets/category/home/banner/tech-day_pc.png';
import techDay_mo from '@/assets/category/home/banner/tech-day_mo.png';
import migrationImg_pc from '@/assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '@/assets/category/home/banner/migration_mo.png';

import downloadBanner_pc from '@/assets/category/home/banner/download-banner_pc.jpg';
import downloadBanner_mo from '@/assets/category/home/banner/download-banner_mo.jpg';
import eur_mo from '@/assets/category/home/banner/eur-banner_mo.jpg';
import eur_pc from '@/assets/category/home/banner/eur-banner_pc.jpg';

import internship_pc from '@/assets/category/home/banner/internship_pc.jpg';
import internship_mo from '@/assets/category/home/banner/internship_mo.jpg';
import devday_pc from '@/assets/category/home/banner/devday_pc.jpg';
import devday_mo from '@/assets/category/home/banner/devday_mo.png';
import devdayText_mo from '@/assets/category/home/banner/devday-text_mo.png';
import devdayText_pc from '@/assets/category/home/banner/devday-text_pc.png';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: devday_pc,
        moBanner: devday_mo,
        textImg_pc: devdayText_pc,
        textImg_mo: devdayText_mo,
        link: '/zh/interaction/summit-list/devday2023/',
        id: 'devday',
        targetTap: 1,
      },
      {
        pcBanner: downloadBanner_pc,
        moBanner: downloadBanner_mo,
        link: '/zh/download/',
        title: ['openEuler下载体验升级'],
        desc: ['更便捷地找到您需要的软件'],
        btn: '立即体验',
        id: 'download',
        targetTap: 1,
      },
      {
        pcBanner: internship_pc,
        moBanner: internship_mo,
        link: 'https://summer-ospp.ac.cn/',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: eur_pc,
        moBanner: eur_mo,
        link: '/zh/blog/waaagh/openEuler-user-repo-intro.html',
        id: 'eur',
        title: ['openEuler', '用户软件仓（EUR）发布'],
        targetTap: 1,
      },

      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: '/zh/migration/',
        targetTap: 1,
        id: '',
        title: ['openEuler迁移专区全面升级'],
        desc: ['助您平滑高效的迁移操作系统'],
        btn: '了解更多',
      },
    ],
    en: [
      {
        pcBanner: techDay_pc,
        moBanner: techDay_mo,
        id: '',
        link: `https://www.openeuler.org/en/blog/openeuler-techday/openEuler%20TechDay%20Invitation.html`,
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        id: '',
        link: `/zh/migration/`,
        targetTap: 1,
        title: ['Start Porting Now!'],
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
  },
};

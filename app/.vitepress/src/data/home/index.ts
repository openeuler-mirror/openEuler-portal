import satisfaction_pc from '@/assets/category/home/banner/satisfaction_pc.jpg';
import satisfaction_mo from '@/assets/category/home/banner/satisfaction_mo.jpg';

import summit_pc from '@/assets/category/home/banner/summit_pc.jpg';
import summit_mo from '@/assets/category/home/banner/summit_mo.png';
import textImg from '@/assets/category/home/banner/text.png';

import banner1_pc from '@/assets/category/home/banner/banner1_pc.jpg';
import banner1_mo from '@/assets/category/home/banner/banner1_mo.jpg';

import eulerSky_pc from '@/assets/category/home/banner/euler-sky_pc.jpg';
import eulerSky_mo from '@/assets/category/home/banner/euler-sky_mo.jpg';

import techDay_pc from '@/assets/category/home/banner/tech-day_pc.png';
import techDay_mo from '@/assets/category/home/banner/tech-day_mo.png';

import eur_mo from '@/assets/category/home/banner/eur-banner_mo.jpg';
import eur_pc from '@/assets/category/home/banner/eur-banner_pc.jpg';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: summit_pc,
        moBanner: summit_mo,
        link: '/zh/interaction/summit-list/summit2023/',
        id: 'summit',
        img: textImg,
        title: [''],
        desc: [],
        btn: '',
        targetTap: 1,
      },
      {
        pcBanner: satisfaction_pc,
        moBanner: satisfaction_mo,
        link: 'https://forum.openeuler.org/t/topic/2647',
        id: 'satisfaction',
        title: ['参加满意度调研 赢惊喜大奖'],
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

      {
        pcBanner: eulerSky_pc,
        moBanner: eulerSky_mo,
        link: '/zh/community/program/',
        id: '',
        title: ['openEuler Call for X 计划'],
        desc: ['热衷实践 乐于分享 多元贡献'],
        btn: '查看详情',
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
    ],
    en: [
      {
        pcBanner: summit_pc,
        moBanner: summit_mo,
        link: '/en/interaction/summit-list/summit2023/',
        id: 'summit',
        img: textImg,
        title: [''],
        desc: [],
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
      {
        pcBanner: techDay_pc,
        moBanner: techDay_mo,
        id: '',
        link: `https://www.openeuler.org/en/blog/openeuler-techday/openEuler%20TechDay%20Invitation.html`,
        targetTap: 1,
      },
    ],
  },
};

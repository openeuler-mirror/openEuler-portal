import banner1_pc from '@/assets/category/home/banner/banner1_pc.jpg';
import banner1_mo from '@/assets/category/home/banner/banner1_mo.jpg';
import banner2_pc from '@/assets/category/home/banner/banner2_pc.jpg';
import banner2_mo from '@/assets/category/home/banner/banner2_mo.jpg';
import eulerSky_pc from '@/assets/category/home/banner/euler-sky_pc.jpg';
import eulerSky_mo from '@/assets/category/home/banner/euler-sky_mo.png';

import kunpeng_pc from '@/assets/category/home/banner/kunpeng_pc.jpg';
import kunpeng_mo from '@/assets/category/home/banner/kunpeng_mo.jpg';

import easyEdit_pc from '@/assets/category/home/banner/easy-edit_pc.jpg';
import easyEdit_mo from '@/assets/category/home/banner/easy-edit_mo.jpg';

import techDay_pc from '@/assets/category/home/banner/tech-day_pc.png';
import techDay_mo from '@/assets/category/home/banner/tech-day_mo.png';

import eur_mo from '@/assets/category/home/banner/eur-banner_mo.jpg';
import eur_pc from '@/assets/category/home/banner/eur-banner_pc.jpg';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: banner1_pc,
        moBanner: banner1_mo,
        link: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/pdf/openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%EF%BC%88%E5%88%9B%E6%96%B0%E9%A1%B9%E7%9B%AE%E6%80%BB%E8%A7%88%EF%BC%89.pdf',
        id: 'whitepaper',
        title: ['《openEuler操作系统（创新项目总览）》'],
        btn: '查看详情',
        targetTap: 1,
      },
      {
        pcBanner: banner2_pc,
        moBanner: banner2_mo,
        link: '/zh/blog/20230711-AMIs/AMIs.html',
        id: '',
        title: ['openEuler 22.03 LTS','登陆 AWS Marketplace'],
        btn: '查看详情',
        targetTap: 1,
      },
      {
        pcBanner: eulerSky_pc,
        moBanner: eulerSky_mo,
        link: '/zh/community/program/',
        id: 'euler-sky',
        title: ['openEuler Call for X 计划'],
        desc: ['热衷实践 乐于分享 多元贡献'],
        btn: '查看详情',
        targetTap: 1,
      },
      {
        pcBanner: kunpeng_pc,
        moBanner: kunpeng_mo,
        link: 'https://www.hikunpeng.com/developer/contests/kunpeng-competition2023?tab=4',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: easyEdit_pc,
        moBanner: easyEdit_mo,
        link: '/zh/blog/20230506-EasyEditor/20230506-EasyEditor.html',
        title: ['社区SIG主页支持自编辑'],
        desc: ['欢迎使用EasyEditor'],
        btn: '查看详情',
        id: 'easy-edit',
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
        pcBanner: techDay_pc,
        moBanner: techDay_mo,
        id: '',
        link: `https://www.openeuler.org/en/blog/openeuler-techday/openEuler%20TechDay%20Invitation.html`,
        targetTap: 1,
      },
    ],
  },
};

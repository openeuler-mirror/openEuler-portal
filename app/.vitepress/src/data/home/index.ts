import newYear_pc from '@/assets/category/home/banner/new-year_pc.jpg';
import newYear_mo from '@/assets/category/home/banner/new-year_mo.jpg';

import banner1_pc from '@/assets/category/home/banner/banner1_pc.jpg';
import banner1_mo from '@/assets/category/home/banner/banner1_mo.jpg';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: newYear_pc,
        moBanner: newYear_mo,
        link: '',
        id: '',
        title: [''],
        desc: [],
        btn: '',
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
        pcBanner: newYear_pc,
        moBanner: newYear_mo,
        link: '',
        id: '',
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
    ],
  },
};

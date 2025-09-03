import download_pc from '~@/assets/category/home/banner/download/pc.jpg';
import download_pad from '~@/assets/category/home/banner/download/pad.jpg';
import download_mb_zh from '~@/assets/category/home/banner/download/banner-mb-zh.jpg';
import download_mb_en from '~@/assets/category/home/banner/download/banner-mb-en.jpg';

export default {
  zh: [
    {
      bg_pc: download_pc,
      bg_pad: download_pad,
      bg_mb: download_mb_zh,
      bg_text: '',
      bg_theme: 'light',
      title: '获取openEuler',
      subtitle: '一站式资源下载获取，欢迎使用',
      btn: '查看详情',
      href: '/zh/download',
      isBlank: true,
      pc_text_width: '658px',
      pc_text_height: '158px',
      pad_text_width: '395px',
      pad_text_height: '95px',
    },
  ],
  en: [
    {
      bg_pc: download_pc,
      bg_pad: download_pad,
      bg_mb: download_mb_en,
      bg_text: '',
      bg_theme: 'light',
      title: 'Get openEuler',
      subtitle: 'Find all resources in one place',
      btn: 'View More',
      href: '/en/download',
      isBlank: true,
      pc_text_width: '658px',
      pc_text_height: '158px',
      pad_text_width: '395px',
      pad_text_height: '95px',
    },
  ],
};

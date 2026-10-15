declare module '#content/footer' {
  import type { FooterT } from '@opendesign-plus/components';

  // 结构对齐 OFooter props，纯静态板块导入后直接传用；
  // footerBgImg 拆为 footer_bg_img.pc/mb 供屏宽切换，simple 为组件内部开关不进数据
  type FooterContentT = Omit<FooterT, 'footerBgImg' | 'simple'> & {
    footer_bg_img: { pc: string; mb: string };
  };

  const data: {
    zh: FooterContentT;
    en: FooterContentT;
  };

  export default data;
}

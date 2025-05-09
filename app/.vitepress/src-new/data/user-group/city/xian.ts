import weidong from '~@/assets/category/user-group/xian/weidong.png';
import weidong_dark from '~@/assets/category/user-group/xian/weidong-dark.png';
import wangdongxing from '~@/assets/category/user-group/xian/wangdongxing.png';
import wangdongxing_dark from '~@/assets/category/user-group/xian/wangdongxing-dark.png';
import guyuxin from '~@/assets/category/user-group/xian/guyuxin.png';
import guyuxin_dark from '~@/assets/category/user-group/xian/guyuxin-dark.png';

export default {
  title: '西安用户组',
  organizational: '陕西鲲鹏生态创新中心',
  organizer: [
    {
      name: '谷羽新',
      position: '陕西鲲鹏生态创新中心',
      homePage: 'https://forum.openeuler.org/u/dimwind51',
      avatar: guyuxin,
      avatarDark: guyuxin_dark,
    },
  ],
  ambassador: [
    {
      name: '魏东',
      position: '统信软件技术有限公司',
      technology: ['rpm', 'dnf', '桌面开发'],
      homePage: 'https://forum.openeuler.org/u/weidongkl/activity',
      avatar: weidong,
      avatarDark: weidong_dark,
      contribution:
        '主要负责openeuler社区dde软件包组的维护。对桌面相关软件，后端开发，系统开发都有一定了解',
    },
    {
      name: '王东兴',
      position: '中科创达',
      technology: ['Python', 'AI', 'Openstack', 'Edge'],
      homePage: 'https://forum.openeuler.org/u/desertsailor_king',
      avatar: wangdongxing,
      avatarDark: wangdongxing_dark,
      contribution:
        '主要参与SIG：Python、OpenStack、Edge、AIPython：Committer，引入和维护软件包300+；OpenStack：Maintainer，主要投入公共Python包的维护和升级； Edge：Maintainer，主要投入组织边缘设备应用组件相关软件包引入审核等；AI：Committer，主要投入pytorch、tensorboard软件包维护',
    },
  ],
  news: [
    {
      summary:
        '围绕openEuler 24.03LTS版本、openEuler嵌入式和基于openEuler的创新和服务进行交流探讨。',
      banner: 'img/banners/0705-xian.png',
      title:
        '【活动回顾】openEuler Meetup西安站举办，共话 openEuler新版本与嵌入式技术生态',
      path: 'zh/news/openEuler/20240705-xian/20240705-xian',
    },
    {
      summary:
        '9月1日，openEuler西安用户组Meetup成功举办，本次活动由openEuler社区、软通动力、陕西鲲鹏生态创新中心联合主办，统信软件协办。',
      banner: 'img/banners/20230908-xi.png',
      title: '【活动回顾】openEuler西安用户组Meetup',
      path: 'zh/news/20230908-xian/20230908-xian',
    },
  ],
  showcase: [
    {
      summary:
        'openEuler替代原有操作系统，大数据平台平滑迁移，文件读写性能平均提升20% ，业务稳定高效运行。',
      path: 'zh/showcase/others/yaxin/',
      industry: '其他',
      title: '亚信科技（大数据基础平台产品）',
    },
    {
      summary:
        '开源软件维护量减少30%；园区部署时长降低37%；园区人力投入减少28%；迁移后性能提升3%',
      path: 'zh/showcase/others/ruantong/',
      industry: '其他',
      title: '软通动力园区管理平台迁移适配',
    },
  ],
};

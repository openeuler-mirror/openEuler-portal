import liuhuajie from '~@/assets/category/user-group/changsha/liuhuajie.png';
import liuhuajie_dark from '~@/assets/category/user-group/changsha/liuhuajie-dark.png';
import zhouqiang from '~@/assets/category/user-group/changsha/zhouqiang.png';
import zhouqiang_dark from '~@/assets/category/user-group/changsha/zhouqiang-dark.png';

export default {
  title: '长沙用户组',
  organizational: '湖南欧拉生态创新中心',
  organizer: [
    {
      name: '刘华杰',
      position: '湖南欧拉生态创新中心',
      homePage: 'https://forum.openeuler.org/u/liuhuajie/activity',
      avatar: liuhuajie,
      avatarDark: liuhuajie_dark,
    },
  ],
  ambassador: [
    {
      name: '周强',
      position: '湖南麒麟信安科技股份有限公司',
      homePage: 'https://forum.openeuler.org/u/dave110/summary',
      avatarDark: zhouqiang_dark,
      avatar: zhouqiang,
    },
  ],
  news: [
    {
      summary:
        '活动对最新发布的openEuler 24.03 LTS版本进行深入分享和解读，吸引了众多技术专家、开发者和用户参加。',
      banner: 'img/banners/20240629-cs.webp',
      title:
        'openEuler Meetup长沙站成功举办！共话openEuler 24.03 LTS版本与社区创新',
      path: 'zh/news/openEuler/20240628-changsha/20240628-changsha',
    },
    {
      summary:
        '9月8日，由openEuler社区、麒麟信安、湖南欧拉生态创新中心以及湖南大学联合主办的openEuler嵌入式Meetup长沙站在湖南大学成功举办',
      banner: 'img/banners/20230915-hunan1.jpeg',
      title: '精彩回顾｜湖南大学openEuler技术小组成立！共话嵌入式技术创新未来',
      path: 'zh/news/20230915-hunan/20230915-hunan',
    },
  ],
  showcase: [
    {
      summary: '长沙智慧民政国产操作系统迁移，树立政务系统建设优秀示范',
      path: 'zh/showcase/others/changsha/',
      industry: '其他',
      title: '长沙市民政局',
    },
    {
      summary: '基于麒麟信安打造银行IT信息化系统安全底座',
      path: 'zh/showcase/finance/xiangjiang/',
      industry: '金融',
      title: '三湘银行',
    },
    {
      summary:
        '湖南省烟草专卖局业务系统建设项目 打造高可靠、高稳定和强安全的信息化系统',
      path: 'zh/showcase/others/O5/',
      industry: '其他',
      title: '湖南省烟草专卖局',
    },
  ],
};

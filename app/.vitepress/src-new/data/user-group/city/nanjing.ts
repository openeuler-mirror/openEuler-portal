import tangjingren from '~@/assets/category/user-group/nanjing/tangjingren.png';
import tangjingren_dark from '~@/assets/category/user-group/nanjing/tangjingren-dark.png';
import weijiangang from '~@/assets/category/user-group/nanjing/weijiangang.png';
import weijiangang_dark from '~@/assets/category/user-group/nanjing/weijiangang-dark.png';
import zhupeiwei from '~@/assets/category/user-group/nanjing/zhupeiwei.png';
import zhupeiwei_dark from '~@/assets/category/user-group/nanjing/zhupeiwei-dark.png';

export default {
  title: '南京用户组',
  organizational: '江苏欧拉生态创新中心',
  organizer: [
    {
      name: '汤景仁',
      position: '江苏欧拉生态创新中心',
      forum: 'https://forum.openeuler.org/u/tjr1219/activity',
      avatar: tangjingren,
      avatarDark: tangjingren_dark,
    },
  ],
  ambassador: [
    {
      name: '魏建刚',
      position: '江苏润和软件股份有限公司',
      technology: ['合规', '分布式', '虚拟化以及嵌入式'],
      homePage: 'https://gitee.com/bugflyfly',
      avatar: weijiangang,
      avatarDark: weijiangang_dark,
      contribution:
        '(1)openEuler技术委员会、用户委员会委员 (2)sig-Complaince、sig-Distributed-middleware两大SIG的发起者并担任maintainer；(3)sig-System-tool的Committer（4）作为南京用户组Ambassador在江苏信创巡展（六大地级市）、HDC.Cloud(南京)等多场合介绍传推广openEuler技术领先型；（5）以分论坛主持人、出品人、演讲者参与历届ODD、SUmmit等会议',
    },
    {
      name: '朱佩韦',
      position: '',
      technology: ['嵌入式', 'Linux'],
      homePage: 'http://t.csdnimg.cn/3JYiX',
      avatar: zhupeiwei,
      avatarDark: zhupeiwei_dark,
      contribution:
        '（1）在Sig yocto-meta-openeuler 里参与雪球计划（南向兼容NXP）imx8 硬件单板的欧拉支持；（2）在Embedded-SIG里贡献代码；（3）在CSDN开设openEuler技术专栏，发表系列文章，登上CSDN内容热榜。',
    },
  ],
  news: [
    {
      summary:
        'openEuler社区与江苏润和软件股份有限公司于6月21日在南京举办了一场围绕AI、嵌入式、分布式创新进展为主题的Meetup。',
      banner: 'img/banners/0625-nj.png',
      title: '【活动回顾】openEuler 24.03 LTS 版本与技术创新Meetup 南京站',
      path: 'zh/news/openEuler/20240625-nanjing/20240625-nanjing',
    },
    {
      summary: '2023年6月2日，openEuler南京用户组举办了线下交流Meetup。',
      banner: 'img/banners/20230609-nanjing.png',
      title:
        '活动回顾 | openEuler南京用户组Meetup运维专场，聚集南京区域用户交流',
      path: 'zh/news/20230609-nanjing/20230609-nanjing',
    },
  ],
  showcase: [
    {
      summary: 'openEuler在汽车零部件装配线曲线管理系统中的应用',
      path: 'zh/showcase/others/yinhu/',
      industry: '其他',
      title: '南京银湖数字技术有限公司',
    },
    {
      summary:
        '应⽤于机器⼈/机器视觉/⼯业控制，助⼒AI视觉产业快速发展，助力国产操作系统openEuler操作系统打入嵌入式领域。',
      path: 'zh/showcase/others/haiou/',
      industry: '其他',
      title: '南京启诺信息技术有限公司（欧拉派系列之海鸥派）',
    },
    {
      summary:
        'A-OPS智能运维助力边缘服务器运维效率提升30%，软总线提升对端设备扩展接入能力；',
      path: 'zh/showcase/energy/hanyuan/',
      industry: '能源',
      title: '南京瀚元科技有限公司（智能边缘服务器）',
    },
    {
      summary:
        '极端高温干旱天气模拟与预测平台，有效及时发现预警极端气候，提升应急处置能力，性能提升58%',
      path: 'zh/showcase/education/nanxinda/',
      industry: '高校&科研',
      title: '南京信息工程大学气象灾害重点实验室',
    },
  ],
};

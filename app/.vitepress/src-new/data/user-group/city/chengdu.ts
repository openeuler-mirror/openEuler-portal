import zengqiang from '~@/assets/category/user-group/chengdu/zengqiang.png';
import liuxin from '~@/assets/category/user-group/chengdu/liuxin.png';
import wangwei from '~@/assets/category/user-group/chengdu/wangwei.png';

import zengqiang_dark from '~@/assets/category/user-group/chengdu/zengqiang-dark.png';
import liuxin_dark from '~@/assets/category/user-group/chengdu/liuxin-dark.png';
import wangwei_dark from '~@/assets/category/user-group/chengdu/wangwei-dark.png';

export default {
  title: '成都用户组',
  organizational: '四川欧拉生态创新中心',
  organizer: [
    {
      name: '曾强',
      position: '四川欧拉生态创新中心',
      technology: [],
      homePage: '',
      avatar: zengqiang,
      avatarDark: zengqiang_dark,
      email: 'zengqiang50@huawei.com',
      contribution: '',
    },
  ],
  ambassador: [
    {
      name: '王伟',
      position: '成都菁蓉联创科技有限公司',
      technology: ['嵌入式', '边缘云', '混合部署'],
      homePage: 'https://gitee.com/wangwei622_admin',
      avatar: wangwei,
      avatarDark: wangwei_dark,
      contribution:
        '作为一名专注于openEuler的开发者，在openEuler embedded sig组参与BSP建设以及海鸥派的OS、AI建设；在openEuler Industrial Control SIG 组参与混合部署虚拟化建设；',
    },
    {
      name: '刘鑫',
      position: '中国科学院软件研究所',
      technology: ['RISC-V'],
      homePage: 'https://forum.openeuler.org/u/misaka00251',
      avatar: liuxin,
      avatarDark: liuxin_dark,
      contribution:
        'openEuler RISC-V sig maintainer，参与 openEuler RISC-V 的各项工作。',
    },
  ],
  news: [
    {
      summary:
        '2024年3月23日，openEuler G11N SIG 和 doc SIG 在成都联合举办了一次线下 Meetup。',
      banner: 'img/banners/0330-G11N.jpeg',
      title: '活动回顾 ｜ openEuler G11N & doc SIG Meetup 成都站',
      path: 'zh/news/openEuler/20240330-G11N/20240330-G11N',
    },
    {
      summary:
        'openEuler成都用户组以及电子科技大学 openEuler技术小组，为四川区域用户和高校学生构建持续学习交流openEuler的平台。',
      banner: 'img/banners/1127-cs.jpeg',
      title:
        '活动回顾 | openEuler Meetup 成都站，产学研共建 openEuler 用户生态',
      path: 'zh/news/20231127-cs/20231127-cs',
    },
  ],
  showcase: [
    {
      summary:
        '性能卓越，稳定可靠，环境级高可用， 智能运维，安全性，自主可控，可移植、易操作',
      path: 'zh/showcase/others/starvcenter/',
      industry: '其他',
      title: '四川中电启明星技术有限公司（StarVCenter云平台）',
    },
    {
      summary: 'IT 基础设施建设创新，引领信创云标准',
      path: 'zh/showcase/others/cdu/',
      industry: '其他',
      title: '成都城安院应急管理信创云平台建设项目',
    },
    {
      summary: '利用openEule操作系统构建商业卫星数智基座',
      path: 'zh/showcase/others/jingrong2/',
      industry: '其他',
      title: '成都菁蓉联创科技有限公司（卫星载荷欧拉嵌入式操作系统产品）',
    },
    {
      summary:
        '可弹性伸缩、资源动态调度、高可用、便于快速开发持续交付的PaaS云平台',
      path: 'zh/showcase/others/zhongdian/',
      industry: '其他',
      title: '四川中电启明星技术有限公司（SKE容器云平台）',
    },
    {
      summary:
        '结合openEuler，KubeEdge及iSulad技术，打造出无人装备统一操作系统。',
      path: 'zh/showcase/others/jingrong1/',
      industry: '其他',
      title: '成都菁蓉联创（无人装备统一操作系统）',
    },
  ],
};

import 姜召阳 from '@/assets/category/user-group/beijing/姜召阳.png';
import chenyunliang from '@/assets/category/user-group/chenyunliang.png';
import luochu from '@/assets/category/user-group/luochu.png';
import wangjianzhong from '@/assets/category/user-group/wangjianzhong.png';
import weiqiang from '@/assets/category/user-group/weiqiang.png';
import yanwei from '@/assets/category/user-group/yanwei.png';
import zhaoyuke from '@/assets/category/user-group/zhaoyuke.png';

export default {
  title: '深圳用户组',
  organizational: '',
  organizer: [],
  ambassador: [],
  member: [
    {
      name: '魏强',
      position: '招商银行',
      homePage: 'http://forum.openeuler.org/u/qiang-wei',
      avatar: weiqiang,
    },
    {
      name: '陈云亮',
      position: '深圳市华傲数据技术有限公司',
      homePage: 'https://forum.openeuler.org/u/chenyunliang/activity',
      avatar: chenyunliang,
    },
    {
      name: '罗除',
      position: '大湾区大学',
      homePage: 'https://forum.openeuler.org/u/cluo29/',
      avatar: luochu,
    },
    {
      name: '王建忠',
      position: '深圳市秦简计算机系统有限公司',
      homePage: 'https://forum.openeuler.org/u/djyos/summary',
      avatar: wangjianzhong,
    },
    {
      name: '颜维',
      position: '深圳云天励飞技术股份有限公司',
      homePage: 'https://forum.openeuler.org/u/yanwei/activity',
      avatar: yanwei,
    },
    {
      name: '赵育科',
      position: '超聚变数字技术有限公司',
      homePage: 'https://forum.openeuler.org/u/yk_zhao/activity',
      avatar: zhaoyuke,
    },
  ],
  news: [
    {
      date: '2023-04-06',
      summary:
        '3月31日，openEuler Meetup深圳站-机器人专场成功举办，本次Meetup由openEuler社区、超聚变、深圳昇腾创新中心联合主办，共同探讨openEuler在机器人领域的应用与发展。',
      archives: '2023-04',
      articleName: '20230407-sz.md',
      author: ['openEuler'],
      banner: 'img/banners/20230407sz.jpg',

      type: 'news',
      title: '活动回顾 | openEuler Meetup 机器人专场，推动嵌入式用户生态发展',
      tags: ['openEuler', 'meetup'],
      path: 'zh/news/20230407-sz/20230407-sz',
      lang: 'zh',
      category: 'news',
    },
  ],
  showcase: [
    {
      summary:
        '基于openEuler部署可靠、高质量的音视频融合通信系统，实现全灾种统一指挥、全链条有效覆盖、全过程综合管理',
      path: 'zh/showcase/others/xingwang/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',

      industry: '其他',
      company: '深圳星网信通科技股份有限公司',
      lang: 'zh',
      type: 'showcase',
      title: '深圳星网信通科技股份有限公司',
      category: 'showcase',
    },
  ],
};

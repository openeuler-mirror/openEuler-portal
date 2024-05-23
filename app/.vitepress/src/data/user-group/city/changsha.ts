import jinguangran from '@/assets/category/user-group/jinguangran.png';
import lijunyi from '@/assets/category/user-group/lijunyi.png';
import 刘华杰 from '@/assets/category/user-group/changsha/刘华杰.png';
import 刘华杰Dark from '@/assets/category/user-group/changsha/刘华杰-dark.png';
import songxueping from '@/assets/category/user-group/songxueping.png';
import 周强 from '@/assets/category/user-group/changsha/周强.png';
import 周强Dark from '@/assets/category/user-group/changsha/周强-dark.png';
import hutianming from '@/assets/category/user-group/hutianming.png';

export default {
  title: '长沙用户组',
  organizational: '湖南欧拉生态创新中心',
  organizer: [
    {
      name: '刘华杰',
      position: '湖南欧拉生态创新中心',
      homePage: 'https://forum.openeuler.org/u/liuhuajie/activity',
      avatar: 刘华杰,
      avatarDark: 刘华杰Dark,
    },
  ],
  ambassador: [
    {
      name: '周强',
      position: '湖南麒麟信安科技股份有限公司',
      homePage: 'https://forum.openeuler.org/u/dave110/summary',
      avatarDark: 周强Dark,
      avatar: 周强,
    },
  ],
  member: [
    {
      name: '金广然',
      position: '泰克教育',
      homePage: 'https://forum.openeuler.org/u/guangran/summary',
      avatar: jinguangran,
    },
    {
      name: '宋血平',
      position: '华锐分布式技术(长沙)有限公司',
      homePage: 'https://forum.openeuler.org/u/songxueping/activity',
      avatar: songxueping,
    },
    {
      name: '黎俊一',
      position: '湖南大众传媒职业技术学院',
      homePage: 'https://forum.openeuler.org/u/XiaoshaeCrocodile',
      avatar: lijunyi,
    },
    {
      name: '胡天明',
      position: '中机国际工程设计研究院',
      homePage: 'https://forum.openeuler.org/u/htm/summary',
      avatar: hutianming,
    },
  ],
  news: [
    {
      date: '2023-09-12',
      summary:
        '9月8日，由openEuler社区、麒麟信安、湖南欧拉生态创新中心以及湖南大学联合主办的openEuler嵌入式Meetup长沙站在湖南大学成功举办',
      archives: '2023-09',
      articleName: '20230915-hunan.md',
      author: ['openEuler'],
      banner: 'img/banners/20230915-hunan1.jpeg',
      type: 'news',
      title: '精彩回顾｜湖南大学openEuler技术小组成立！共话嵌入式技术创新未来',
      tags: ['openEuler'],
      path: 'zh/news/20230915-hunan/20230915-hunan',
      lang: 'zh',
      category: 'news',
    },
  ],
  showcase: [
    {
      summary: '长沙智慧民政国产操作系统迁移，树立政务系统建设优秀示范',
      path: 'zh/showcase/others/changsha/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 长沙市民政局智慧民政平台核心功能主要为便民业务的开展，拓宽老年人、残疾人业务申请的渠道，系统均部署在政务云上。因CentOS修改相关开源及维护策略，原有业务系统面临着系统安全漏洞风险、系统瘫痪等隐患，需将底层所采用的CentOS操作系统替换成一种安全、稳定、长期维护的基于国内根社区开发的国产操作系统。经过麒麟信安全新改造，将业务系统平滑迁移至麒麟信安服务器操作系统(openEuler商业发行版)。 解决方案 业务系统：长沙智慧民政平台系统 软件栈：达梦数据库、金蝶中间件 操作系统：麒麟信安服务器操作系统 客户价值 在业务系统改造过程中，将其整合为统一的智慧民政平台，并将底层的CentOS替换为国产操作系统上，安全性上得到了保障，解决了客户可能面临的系统安全漏洞风险、系统瘫痪等痛点问题，推动了基层民政信息化服务的建设，为党政人员办公提供了便利，促进了便民业务的开展，对党政行业政务系统建设具有示范作用。 伙伴',
      industry: '其他',
      company: '长沙市民政局',
      lang: 'zh',
      type: 'showcase',
      title: '长沙市民政局',
      category: 'showcase',
    },
    {
      summary: '基于麒麟信安打造银行IT信息化系统安全底座',
      path: 'zh/showcase/finance/xiangjiang/',
      img: '/category/showcase/finance.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 湖南三湘银行股份有限公司（简称“三湘银行”）是中部地区首家、全国第八家开业的民营银行。三湘银行以“做一流的数智银行”为愿景，坚持“规模服从效益，效益服从风险，经营服从监管”的经营理念，坚持“数字化、在线化、自动化、智能化”的发展道路，将三湘银行打造成为科技驱动的银行，敢闯新路、敢于突破、敢于胜利的特色银行，一流的数智银行，接地气、受老百姓喜欢的银行，最具凝聚力的员工家园。三湘银行已建成各种特色金融系统服务实体经济，缓解产业链小微企业和普罗大众融资慢、融资难、融资贵的问题。 当前三湘银行已将业务系统全部迁移到x86架构的本地私有云平台（基于VMware虚拟化平台），存在大量业务系统运行在CentOS 7.6版本的操作系统上，部分业务系统运行在Redhat 6/7不同版本的商业发行版本上，极少量业务系统运行在Oracle Linux系统上。三湘银行急需一种安全、稳定、长期维护的基于国内根社区开发的国产操作系统版本。 二、业务挑战 1、海量数据处理 三湘银行业务系统涉及海量数据处理，包括客户信息、交易记录、贷款申请、风险评估等多方面的数据。为了高效处理这些海量数据，银行业务系统采用大数据技术和高性能计算平台，以确保数据的安全性、完整性和可靠性。同时，银行业务系统也需要具备强大的实时处理能力，以满足客户快速的交易需求，保障资金安全和交易稳定。因此，支撑海量数据处理的服务器操作系统是银行业务运营的重要基础，也是银行数字化转型的关键环节。 2、复杂的业务流程和系统集成 银行的业务流程通常是非常复杂的，包括开户、存款、贷款、结算、理财、投资、外汇交易等多个环节。这些业务流程需要涉及到多个系统，如客户关系管理系统、核心银行系统、风险管理系统、支付结算系统等。银行对不同系统进行集成，以实现不同系统之间的数据共享和业务协同。操作系统需要能够支持各种业务流程和系统集成，以实现多方面的业务需求和协同工作。 3、数据保护和隐私 为了保障银行业务系统的稳定和安全，防范各类风险，确保客户的个人信息和财务数据得到妥善保护。银行在数据保护和隐私方面对操作系统提出了高要求，包括数据加密和访问控制、安全漏洞防范、合规法规要求、审计和监控功能等方面的挑战。 解决方案 三湘银行经过不断的探索和实践，联合湖南本土操作系统厂家麒麟信安实现金融科技赋能，助力在自主创新上实现突破，基于国内openEuler社区打造的麒麟信安服务器操作系统让三湘银行的业务发展实现了质的变化，三湘银行携手麒麟信安和openEuler社区，对如何完成银行业务系统的自主创新、兼容适配、迁移替换等问题进行了深入的探索分析和方案优化。 基于麒麟信安服务器操作系统和国内外数据库、中间件打造互联网金融平台，与各云平台及容器云服务商深度适配，实现多云协同，可以为业务系统提供充分广泛的算力支撑与加速能力。 针对三湘银行的业务系统情况和系统运行环境，麒麟信安自研了一站式系统迁移平台C2K。C2K可以支持将三湘银行现有生产环境中部署的RedHat操作系统、CentOS 操作系统迁移至麒麟信安操作系统，满足原地升级迁移和适配迁移的迁移需求。 三湘银行对麒麟信安服务器操作系统提出了更高的安全标准，麒麟信安在多种内核安全方面进行增强和优化，尤其是结构化保护级安全内核和实体一体化的强制访问控制机制，结合openEuler社区的持续版本更新，麒麟信安对安全漏洞进行及时修复，增强了三湘银行业务系统的安全性。 客户价值 1.麒麟信安服务器操作系统在三湘银行业务系统的自主创新上可以有效降低了三湘银行特色金融服务的信息化投资，将国外系统平滑迁移为国产商业版操作系统，夯实了三湘银行IT信息化系统的安全底座，为金融行业自主创新推广提供了可借鉴的技术路线。 2.麒麟信安服务器操作系统对系统内核、进程调度、内存拷贝、网络通信、安全组件、集中运维等做了深度定制与性能调优，组件方案更先进、并发性能更优、业务交互更安全，并形成具有自主知识产权的增值产品：高可用集群管理系统、存储多路径系统、高可用冗余网络系统、集中运维系统等，为三湘银行提供低成本、高效率的基础软件自主创新升级改造方案，提升运维效率、促进平滑替换。 合作伙伴',
      industry: '金融',
      company: '三湘银行',
      lang: 'zh',
      type: 'showcase',
      title: '三湘银行',
      category: 'showcase',
    },
    {
      summary:
        '湖南省烟草专卖局业务系统建设项目 打造高可靠、高稳定和强安全的信息化系统',
      path: 'zh/showcase/others/O5/',
      img: '/category/showcase/others.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 为落实和响应网络设备改造的相关政策，湖南省烟草专卖局需对业务系统进行改造升级，以实现高可靠、高稳定和强安全的信 息化系统。客户需要在不降低性能要求的基础上对原有业务进行全栈改造，包括服务器、操作系统、数据库、中间件、业务系 统、个人电脑、办公软件等，提升业务系统的安全性、可靠性。 解决方案 项目全部基于银河麒麟操作系统 V10 为安全底座。为满足 某省烟草专卖局未来近万台终端的办公需求，麒麟软件跟 腾讯云、神通数据库、宝蓝德中间件、泛微 OA 等产品进 行了适配和优化，在功能和性能上满足了用户的业务需求。 客户价值 性能领先：该项目采用了银河麒麟操作系统 V10 为安全底座，采用飞腾和海光服务器和神通数据库、宝蓝德中间件，对平台的 性能优化，在业务迁移到新平台后，性能达到并在某些应用超过了原平台。 稳定高效：银河麒麟操作系统在业务运行一年时间未出现任何事故，充分保障了烟草用户的业务运行和数据安全。 伙伴',
      industry: '其他',
      company: '湖南省烟草专卖局',
      lang: 'zh',
      type: 'showcase',
      title: '湖南省烟草专卖局',
      category: 'showcase',
    },
  ],
};

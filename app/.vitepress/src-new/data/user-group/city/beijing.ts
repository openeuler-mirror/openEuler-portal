import liushouyong from '~@/assets/category/user-group/beijing/liushouyong.png';
import liushouyong_dark from '~@/assets/category/user-group/beijing/liushouyong-dark.png';
import lvcongqing from '~@/assets/category/user-group/beijing/lvcongqing.png';
import lvcongqing_dark from '~@/assets/category/user-group/beijing/lvcongqing-dark.png';
import yangzhao from '~@/assets/category/user-group/beijing/yangzhao.png';
import yangzhao_dark from '~@/assets/category/user-group/beijing/yangzhao-dark.png';
import { PageDataT } from '~@/@types/type-user-group';

const cityData: PageDataT = {
  title: '北京城市用户组',
  organizational: '',
  organizer: [],
  ambassador: [
    {
      name: '吕从庆',
      position: '统信软件技术有限公司',
      technology: ['OS', 'DDE', 'CI&CD'],
      homePage: 'https://forum.openeuler.org/u/48vekpgjuhtte7sc/',
      avatar: lvcongqing,
      avatarDark: lvcongqing_dark,
      contribution:
        'openEuler技术委员会委员。目前主要参与TC、Release、DDE等SIG组，主要参与SIG组和社区的技术决策以及SIG组所属软件包的版本选型、发布和维护。',
    },
    {
      name: '杨昭',
      position: '麒麟软件有限公司',
      technology: ['CloudNative', 'ops', 'bigdata'],
      homePage: 'https://gitee.com/yangzhao_kl',
      avatar: yangzhao,
      avatarDark: yangzhao_dark,
      contribution:
        '自2020年6月以来一直在openEuler社区参与社区建设工作，参与核心事务决策，在CloudNative、ops、bigdata、python-modules等重要sig担任maitainer，支撑社区软件生态扩充及维护；在QA、release-management sig担任comitter，支撑多个社区OS版本特性的发布及测试。除此之外，在openEuler社区孵化PilotGo插件式运维管理平台，丰富社区运维软件生态，促进创新运维技术的孵化及落地。',
    },
    {
      name: '刘寿永',
      position: '北京孔皆智能科技有限公司',
      technology: ['OS', 'AI', 'MPC'],
      homePage: 'https://gitee.com/pangbanme',
      avatar: liushouyong,
      avatarDark: liushouyong_dark,
      contribution:
        '主导成立openEuler Edge SIG组织，以openEuler为操作系统底座，面向边缘计算领域提供对应的硬件，中间件，算法和整体解决方案，目前已经支持多个硬件平台和中间件，并应用到工业，交通等多个场景.',
    },
  ],
  salon: [],
  showcase: [
    {
      summary: '北京交通大学利用RPA智能人工系统减少人员投入 50%',
      path: 'zh/showcase/education/beijingjiaotong/',
      industry: '高校&科研',
      title: '北京交通大学',
    },
    {
      summary:
        '基于openEuler构建工业机器人操作系统，打造“开箱即用”的机器人基础软件平台',
      path: 'zh/showcase/education/beihang/',
      industry: '高校&科研',
      title: '北京航空航天大学',
    },
  ],
};

export default cityData;

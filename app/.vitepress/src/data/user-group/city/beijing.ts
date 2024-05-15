import 姜召阳 from '@/assets/category/user-group/beijing/姜召阳.png';
import 李天学 from '@/assets/category/user-group/beijing/李天学.png';
import 刘寿永 from '@/assets/category/user-group/beijing/刘寿永.png';
import 刘寿永Dark from '@/assets/category/user-group/beijing/刘寿永-dark.png';
import 吕从庆 from '@/assets/category/user-group/beijing/吕从庆.png';
import 吕从庆Dark from '@/assets/category/user-group/beijing/吕从庆-dark.png';
import 相全双 from '@/assets/category/user-group/beijing/相全双.png';
import 杨昭 from '@/assets/category/user-group/beijing/杨昭.png';
import 杨昭Dark from '@/assets/category/user-group/beijing/杨昭-dark.png';
import { PageDataT } from '@/shared/@types/type-usergroup';

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
      avatar: 吕从庆,
      avatarDark: 吕从庆Dark,
      contribution:
        'openEuler技术委员会委员。目前主要参与TC、Release、DDE等SIG组，主要参与SIG组和社区的技术决策以及SIG组所属软件包的版本选型、发布和维护。',
    },
    {
      name: '杨昭',
      position: '麒麟软件有限公司',
      technology: ['CloudNative', 'ops', 'bigdata'],
      homePage: 'https://gitee.com/yangzhao_kl',
      avatar: 杨昭,
      avatarDark: 杨昭Dark,
      contribution:
        '自2020年6月以来一直在openEuler社区参与社区建设工作，参与核心事务决策，在CloudNative、ops、bigdata、python-modules等重要sig担任maitainer，支撑社区软件生态扩充及维护；在QA、release-management sig担任comitter，支撑多个社区OS版本特性的发布及测试。除此之外，在openEuler社区孵化PilotGo插件式运维管理平台，丰富社区运维软件生态，促进创新运维技术的孵化及落地。',
    },
    {
      name: '刘寿永',
      position: '北京孔皆智能科技有限公司',
      technology: ['OS', 'AI', 'MPC'],
      homePage: 'https://gitee.com/pangbanme',
      avatar: 刘寿永,
      avatarDark: 刘寿永Dark,
      contribution:
        '主导成立openEuler Edge SIG组织，以openEuler为操作系统底座，面向边缘计算领域提供对应的硬件，中间件，算法和整体解决方案，目前已经支持多个硬件平台和中间件，并应用到工业，交通等多个场景.',
    },
  ],
  member: [
    {
      name: '李天学',
      position: '北京望云家德智能技术有限公司',
      technology: [],
      homePage: '',
      avatar: 李天学,
      contribution: '',
    },
    {
      name: '姜召阳',
      position: 'N/A',
      technology: [],
      homePage: '',
      avatar: 姜召阳,
      contribution: '',
    },
    {
      name: '相全双',
      position: '北京志翔信息技术有限公司',
      technology: [],
      homePage: '',
      avatar: 相全双,
      contribution: '',
    },
  ],
  salon: [],
  showcase: [
    {
      summary: '北京交通大学利用RPA智能人工系统减少人员投入 50%',
      path: 'zh/showcase/education/beijingjiaotong/',
      img: '/category/showcase/education.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 北京交通大学（Beijing Jiaotong University）是教育部直属的全国重点大学，是教育部、交通运输部、北京市人民政府、中国国家铁路集团有限公司共建高校，位列"211工程"、"985工程优势学科创新平台"、"世界一流学科建设高校"，入选高等学校创新能力提升计划、高等学校学科创新引智计划、卓越工程师教育培养计划"一带一路"铁路国际人才教育联盟理事单位。 北京交通大学致力于低碳经济与绿色大学，开启了全国高校"节约型校园"建设，建设方案包括校园节能监管平台建设，信息化建设及教育管理平台等。其中，通过在各平台中使用RPA智能人工系统，解决了大量人工的重复单一操作，实现低碳绿色的快速开发，节省了大量人力投入。 解决方案 系统使用新纽 RPA 一体机解决方案 新纽 RPA 一体机解决方案结合 NewLink RPA 机器人流程自动化平台 V3.1应用系统，华鲲振宇天宫鲲鹏 CPU 服务器及基于openEluer的发行版普华太极服务器操作系统，联合形成算力底座支撑。 普华太极服务器操作系统集成开源的数据库TiDB，对整体系统进行了优化，保证了RPA应用系统在天宫鲲鹏服务器上性能最大化。 客户价值 RPA一体化解决方案能够比人工更快速、更精确地实行重复性任务，支持7*24小时不间断运行，员工可以将时间和精力投入到更有价值的工作中； 降低人力资源成本：少量的人工投入结合数字员工队伍，带来人力成本节省50%； 为客户建设 COE完成知识转移：解决客户复杂的业务逻辑和运行，为客户提供专业化咨询服务；数字员工的部署和应用，可以有效降低人工的不确定性带来的风险。 伙伴',
      industry: '高校&科研',
      company: '北京交通大学',
      lang: 'zh',
      type: 'showcase',
      title: '北京交通大学',
      category: 'showcase',
    },
    {
      summary:
        '基于openEuler构建工业机器人操作系统，打造“开箱即用”的机器人基础软件平台',
      path: 'zh/showcase/education/beihang/',
      img: '/category/showcase/education.png',
      articleName: 'index.md',
      banner: '/category/showcase/case-detail-bg.jpg',
      textContent:
        '应用场景 北航是国家“双一流”建设高校，以建设扎根中国大地的世界一流大学为发展目标。北航在机器人领域一直处于行业前沿，以其亮眼的成果和优秀的师资力量，成为国内机器人领域的重要参与者和建设者。 机器人操作系统是机器人的核心基础软件，支撑着机器人应用对系统实时性、安全性及智能化等方面的共性诉求。面向智能工业机器人领域，突破开放式体系架构，在实时系统内核、通信协议栈、运动控制库、集成开发工具等方面进行研究，打造“开箱即用”的机器人基础软件平台，推进机器人软件生态体系建设。 解决方案 操作系统基于openEuler LTS 22.03内核，支持x86系列平台，并将支持ARM平台等 面向智能工业机器人领域，提供优秀的操作系统内核实时性性，研发EtherCAT通信协议栈、运动控制核心组件、智能算法库以及集成开发环境，建立机器人基础软件平台 面向具体典型应用场景提供复杂场景识别、智能化人机交互等功能拓展 客户价值 操作系统内核实现良好的实时性，7*24小时不间断运行最大中断时延≤10μs，满足EtherCAT的≤1ms的通信周期需求； 基于openEuler建立开放式嵌入式控制系统架构，驱动六轴工业机械臂正常运行，具有良好的兼容性和易用性； 面向典型行业应用已完成案例实施，系统可靠性在工业领域应用得到验证 伙伴',
      industry: '高校&科研',
      company: '北京航空航天大学',
      lang: 'zh',
      type: 'showcase',
      title: '北京航空航天大学',
      category: 'showcase',
    },
  ],
};

export default cityData;

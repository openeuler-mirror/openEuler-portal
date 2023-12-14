import hunan from '@/assets/category/university/hunan.png';
import chengdu from '@/assets/category/university/chengdu.png';
import lanzhou from '@/assets/category/university/lanzhou.png';
import bgAi from '@/assets/category/university/bg-ai.png';
import bgInternship from '@/assets/category/university/bg-internship.png';
import bgInternshipMb from '@/assets/category/university/bg-internship_mb.png';
import bgTalents from '@/assets/category/university/bg-talents.png';
import illustrationAi from '@/assets/category/university/illustration-ai.png';
import illustrationTalents from '@/assets/category/university/illustration-talents.png';
import beida from '@/assets/category/university/beida.png';
import beihang from '@/assets/category/university/beihang.png';
import changli from '@/assets/category/university/changli.png';
import huazhong from '@/assets/category/university/huazhong.png';
import jiangke from '@/assets/category/university/jiangke.png';
import jilin from '@/assets/category/university/jilin.png';
import shangjiao from '@/assets/category/university/shangjiao.png';
import zhongkuang from '@/assets/category/university/zhongkuang.png';

import useWindowResize from '@/components/hooks/useWindowResize';
const screenWidth = useWindowResize();

export default {
  title: '高校',
  technicalGroup: {
    title: '高校技术小组',
    description: {
      text: 'openEuler高校技术小组是在院校内围绕openEuler进行学习、科研及参与社区贡献的组织，该技术小组由高校老师指导学生学习openEuler相关知识、产出openEuler相关科研成果，或直接参与到社区贡献，同时社区及社区生态伙伴整合资源为技术小组的学习与科研提供支持和赋能。',
      linkText: '申请加入',
      linkHref: 'https://wj.qq.com/s2/13591159/5f50',
    },
    groupList: [
      {
        logo: hunan,
        name: '湖南大学openEuler技术小组',
        description:
          '湖南大学openEuler技术小组是openEuler社区、湖南欧拉生态创新中心、麒麟信安与湖南大学联合组建的高校交流平台。',
        contentList: [
          {
            title: '湖南大学合作捐赠项目',
            description:
              '湖南大学合作捐赠项目：嵌入式实时虚拟机ZVM（Zephyr-based Virtual Machine）是由湖南大学嵌入式与网络计算湖南省重点实验室（以下简称"湖大嵌入式实验室"）主任谢国琪教授主导设计并开发的虚拟化软件。该软件基于实时操作系统（RTOS）Zephyr开发，可同时启动Linux与Zephyr 2个Guest OS，从而在同一硬件平台上实现混合内核部署。2023年2月，湖大嵌入式实验室正式将该项目开源至openEuler社区。',
          },
          {
            title: '组织者',
            description: '赵欢（湖南大学信息科学与工程学院副书记）',
          },
          {
            title: '指导老师',
            description: '谢国琪（湖南大学嵌入式计算省重点实验室主任）',
          },
          {
            title: '小组成员',
            description:
              '赵思蓉/n胡宇昊/n王中甲/nBekalu Nigus Dawit/n邹雨欣/n雷权/n罗健淳/n张辛宇/n杨启/n丛嘉孚/n朱佳奕/n梁玉涵/n田瑞/n曾彩怡/n廖若竹/n陈兆基/n王子文/n李江伟/n雷景旭/n郑垚',
          },
        ],
      },
      {
        logo: chengdu,
        name: '成都电子科技大学技术小组',
        description:
          '成都电子科技大学技术小组拟研究方向：大数据、人工智能、视觉分析、智能语义识别等方面进行创新理论研究，在深度学习、机器视觉与人工智能等方面已取得一定科研成果。',
        contentList: [
          {
            title: '组织者',
            description: '廖勇（成都电子科技大学信息与软件工程学院副院长）',
          },
          {
            title: '指导老师',
            description: '陈佳（成都电子科技大学信息与软件工程学院副教授）',
          },
          {
            title: '小组成员',
            description:
              '孔翰林/n唐炽诚/n郑嘉睦/n李沛阳/n张立蒙/n陈泓旭/n时俊华',
          },
        ],
      },
      {
        logo: lanzhou,
        name: '兰州大学技术小组',
        description:
          '兰州大学技术小组研究方向：围绕openEuler机密计算技术开展研究和使用。目前已经在secGear方向上发表论文多篇，完成开源之夏、开源实习项目多项。今后，将继续围绕secGear建设技术小组。',
        contentList: [
          {
            title: '组织者',
            description: '刘忻（兰州大学信息科学与工程学院副教授）',
          },
          {
            title: '指导老师',
            description: '刘忻（兰州大学信息科学与工程学院副教授）',
          },
          {
            title: '小组成员',
            description: '景海鲲/n杨晶晶/n林家腾/n王淼/n杨浩睿/n孙思',
          },
        ],
      },
    ],
  },
  activityGame: {
    title: '活动与大赛',
    activityList: [
      {
        title: '开源实习',
        bgImg: screenWidth.value <= 768 ?bgInternshipMb: bgInternship,
        bgInset: '',
        detail:
          'openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力，在社区中成长为优秀的开源人才。由社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。',
        linkText: '前往领取任务',
        linkHref: 'https://www.openeuler.org/zh/internship/',
      },
      {
        title: 'openEuler AI 应用挑战赛',
        bgImg: bgAi,
        bgInset: illustrationAi,
        detail:
          '首届开放原子开源大赛由工业和信息化部、江苏省人民政府、湖南省人民政府共同主办，openEuler社区参与本赛事设置openEuler AI应用挑战赛，赛题奖金总额30w，由基金会直接发放给获奖团队。',
        linkText: '大赛官网信息',
        linkHref:
          'https://competition.atomgit.com/competitionInfo?id=1ea056d0418e11eeb9c0eb26c552c0c4',
      },
      {
        title: 'openEuler&openGauss人才发展加速计划',
        bgImg: bgTalents,
        bgInset: illustrationTalents,
        detail:
          '“openEuler&openGauss人才发展加速计划”是华为公司推进围绕openEuler开源操作系统、openGauss开源数据库全栈人才发展的一项计划举措，旨在鼓励高校和研究所师生加入欧拉、高斯生态，实现围绕openEuler、openGauss的教改创新、社区贡献、研究实习，全面加速欧拉、高斯人才建设。',
        linkText: '申请官网',
        linkHref:
          'https://edu.hicomputing.huawei.com/openeuler-opengauss-talent',
      },
    ],
  },
  universityContribution: {
    title: '高校贡献',
    universityContentList: [
      {
        logo: huazhong,
        name: '华中科技大学网络空间安全学院',
        detail:
          '华中科技大学网络空间安全学院贡献简介华中科技大学网络空间安全学院贡献简介华中科技大学网络空间安全学院贡献简介华中科技大学网络空间安全学院贡献简介',
        contributionName: 'SIG贡献',
        contributionTagList: ['Compiler', 'Base-service'],
        contributionDetail: '',
        contributionDetailLink: '',
        officialWebsite: '前往官网',
        officialWebsiteLink: 'https://cse.hust.edu.cn/',
      },
      {
        logo: hunan,
        name: '湖南大学',
        detail:
          '湖南大学嵌入式与网络计算湖南省重点实验室主任谢国琪教授主导设计并开发的嵌入式实时虚拟机ZVM（Zephyr-based Virtual Machine）于2023年2月开源至openEuler社区',
        contributionName: 'SIG贡献',
        contributionTagList: ['Zephyr'],
        contributionDetail: '贡献详情',
        contributionDetailLink: 'https://datastat.openeuler.org/zh/sig/sig-Zephyr',
        officialWebsite: '前往官网',
        officialWebsiteLink: 'https://www.hnu.edu.cn/',
      },
      {
        logo: beihang,
        name: '北京航空航天大学计算机学院',
        detail:
          '北京航空航天大学计算机学院王雷教授团队设计开发的虚拟机监控器 Rust-Shyper 实现了一个高可靠、嵌入式 Hypervisor，于2023年2月15日正式在openEuler社区开源',
        contributionName: 'SIG贡献',
        contributionTagList: ['Virt'],
        contributionDetail: '贡献详情',
        contributionDetailLink: 'https://datastat.openeuler.org/zh/sig/Virt',
        officialWebsite: '前往官网',
        officialWebsiteLink: 'https://scse.buaa.edu.cn/',
      },
      {
        logo: shangjiao,
        name: '上海交通大学',
        detail:
          '上海交通大学贡献简介上海交通大学贡献简介上海交通大学贡献简介上海交通大学贡献简介上海交通大学贡献简介上海交通大学贡献简介上海交通大学贡献简介',
        contributionName: 'SIG贡献',
        contributionTagList: ['sig-RISC-V', 'doc'],
        contributionDetail: '',
        contributionDetailLink: '',
        officialWebsite: '前往官网',
        officialWebsiteLink: 'https://www.sjtu.edu.cn/',
      },
    ],
    universityList: [
      {
        logo: beihang,
        name: '北京航空航天大学杭州创新研究院',
      },
      {
        logo: beida,
        name: '北京大学',
      },
      {
        logo: jiangke,
        name: '江苏科技大学海洋装备研究院',
      },
      {
        logo: changli,
        name: '长沙理工大学计算机与通信工程学院',
      },
      {
        logo: jilin,
        name: '吉林大学',
      },
      {
        logo: zhongkuang,
        name: '中国矿业大学',
      },
    ],
    more: '更多高校贡献…',
  },
  universityMooc: '课程与培训',
};

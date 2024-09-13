import hunan from '@/assets/category/university/hunan.png';
import chengdu from '@/assets/category/university/chengdu.png';
import lanzhou from '@/assets/category/university/lanzhou.png';
import bgInternship from '@/assets/category/university/bg-internship.png';
import bgInternshipMb from '@/assets/category/university/bg-internship_mb.png';
import illustrationAi from '@/assets/category/university/illustration-ai.png';
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
        bgImg: screenWidth.value <= 768 ? bgInternshipMb : bgInternship,
        bgInset: '',
        detail:
          'openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力，在社区中成长为优秀的开源人才。由社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。',
        linkText: '前往领取任务',
        linkHref: 'https://www.openeuler.org/zh/internship/',
      },
      {
        title: '第七届CCF开源创新大赛',
        bgImg: illustrationAi,
        id: 'ccf',
        detail:
          '第七届CCF开源创新大赛在国家自然科学基金委信息科学部的指导下，由中国计算机学会（CCF）主办，长沙理工大学、CCF 开源发展委员会联合承办。openEuler参与开源项目贡献赛道，赛事奖金10w，赛题主要聚焦在openEuler操作系统的内存池管理与用户态线程设计与调度两个方向。',
        linkText: '大赛官网信息',
        linkHref: 'https://www.gitlink.org.cn/competitions/track1_openEuler',
      },
      {
        title: '鲲鹏应用创新大赛-openEuler开源创新赛道',
        bgImg: illustrationAi,
        id: 'ccf',
        detail:
          '鲲鹏应用创新大赛2024是面向基础软/硬件开发者的顶级赛事，旨在鼓励广大开发者基于鲲鹏全栈根技术，围绕产业真实难题，共同打造基础软/硬件解决方案。 本届大赛开设openEuler开源创新赛道，分为基础赛（围绕openEuler 进行原生开发（初阶））与挑战赛围绕openEuler 进行原生开发（高阶）两个方向。',
        linkText: '大赛官网信息',
        linkHref:
          'https://www.hikunpeng.com/zh/developer/contests/kunpeng-competition2024?tab=4',
      },
      {
        title: '国家级大学生创新训练计划-华为命题',
        bgImg: illustrationAi,
        id: 'ccf',
        detail:
          '国家级大学生创新训练计划，简称“国创计划”，是教育部质量工程项目中作用面积最大、涉及人数最多的项目，秉承“兴趣驱动、自主实践、重在过程”的理念，目前已经成为面向全体大学生的一项创新人才基础培育工程，聚焦国家创新与发展，引领高校创新人才改革。开设“基于openEuler 开源操作系统的实践创新”单项赛题。',
        linkText: '大赛官网信息',
        linkHref: 'https://edu.hicomputing.huawei.com/guochuang2024',
      },
      {
        title: '中国国际大学生创新大赛（2024）',
        bgImg: illustrationAi,
        id: 'ccf',
        detail:
          '华为深度参与中国国际大学生创新大赛（2024），输出产业命题，推进产教融合、科教融汇。操作系统是整个计算机系统的核心基础软件，上承应用，下接硬件，面向用户，对生态要求极高，在鲲鹏赛道开设基于openEuler开源操作系统三个赛题，可官网详细了解。',
        linkText: '鲲鹏赛题-openEuler赛题报名入口',
        linkHref:
          'https://edu.hicomputing.huawei.com/InternetInnovate2024?tab=kunpeng',
      },
      {
        title: '开源之夏',
        bgImg: illustrationAi,
        id: 'ccf',
        detail:
          'openEuler社区连续四年连续四年参与由中国科学院软件所主办的开源软件供应链点亮计划-开源之夏活动，是目前规模最大最有影响力的高校开源活动。旨在鼓励在校学生积极参与开源软件的开发维护，培养和发掘更多优秀的开发者。',
        linkText: '开源之夏官网信息',
        linkHref: 'https://summer-ospp.ac.cn/',
      },
    ],
  },
  universityContribution: {
    title: '高校贡献',
    universityContentList: [
      {
        logo: beihang,
        name: '北京航空航天大学杭州创新研究院',
        detail:
          '北京航空航天大学杭州创新研究院大数据与工业智联网研究室的开发者完成了openEuler Embedded在工业领域的软硬件适配验证以及30*24H的不间断测试，基于此研究室决定将北航全部机器人底层系统迁移到openEuler生态，同时加强与openEuler社区的深入合作，继续拓展openEuler在嵌入式领域生态和应用。',
        contributionName: 'SIG贡献',
        contributionTagList: ['sig-embedded'],
        contributionDetail: '',
        contributionDetailLink: '',
        officialWebsite: '前往官网',
        officialWebsiteLink: 'https://hzii.buaa.edu.cn/',
      },
      {
        logo: hunan,
        name: '湖南大学',
        detail:
          '嵌入式实时虚拟机ZVM（Zephyr-based Virtual Machine）是由湖南大学嵌入式与网络计算湖南省重点实验室（以下简称“湖大嵌入式实验室”）主任谢国琪教授主导设计并开发的虚拟化软件。该软件基于实时操作系统（RTOS）Zephyr开发，可同时启动Linux与Zephyr 2个Guest OS，从而在同一硬件平台上实现混合内核部署。2023年2月，湖大嵌入式实验室正式将该项目开源至openEuler社区。',
        contributionName: 'SIG贡献',
        contributionTagList: ['Zephyr'],
        contributionDetail: '贡献详情',
        contributionDetailLink:
          'https://datastat.openeuler.org/zh/sig/sig-Zephyr',
        officialWebsite: '前往官网',
        officialWebsiteLink: 'https://www.hnu.edu.cn/',
      },
      {
        logo: beihang,
        name: '北京航空航天大学计算机学院',
        detail:
          'Rust-Shyper 是北京航空航天大学计算机学院王雷教授团队设计开发的虚拟机监控器，该系统基于 Rust 语言，实现了一个高可靠、嵌入式 Hypervisor。2023 年 2 月 15 日 Rust-Shyper 正式在 openEuler 社区开源。',
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
          '上海交通大学 IPADS 实验室将“蓬莱”TEE（可信执行环境）与 openEuler 进行整合，赋予机器学习新安全属性，以保障模型开发者、数据所有者与最终用户的隐私与权益。“蓬莱”TEE 作为 openEuler 安全计算的基石之一，将与 openEuler 社区一起，不断完善对多架构、多设备、多框架的支持，持续打造高效、安全、可信的机器学习框架。',
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
        logo: huazhong,
        name: '华中科技大学网络空间安全学院',
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

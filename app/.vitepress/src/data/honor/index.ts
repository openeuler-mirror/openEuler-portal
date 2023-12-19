import certificateImg1 from '@/assets/category/honor/certificate1.png';
import certificateImg2 from '@/assets/category/honor/certificate2.jpeg';
import certificateImg3 from '@/assets/category/honor/certificate3.png';

import jiangxinyu from '@/assets/category/honor/personal/jiangxinyu.png';
import licihua from '@/assets/category/honor/personal/licihua.png';
import liufushou from '@/assets/category/honor/personal/liufushou.png';
import liuxin from '@/assets/category/honor/personal/liuxin.png';
import liweigang from '@/assets/category/honor/personal/liweigang.png';
import tianjun from '@/assets/category/honor/personal/tianjun.png';
import xiashenlin from '@/assets/category/honor/personal/xiashenlin.png';
import xuyanqi from '@/assets/category/honor/personal/xuyanqi.png';
import zhanglin from '@/assets/category/honor/personal/zhanglin.png';
import zhengzengkai from '@/assets/category/honor/personal/zhengzengkai.png';

import chenqide from '@/assets/category/honor/personal/chenqide.png';
import chenruixin from '@/assets/category/honor/personal/chenruixin.png';
import duyiwei from '@/assets/category/honor/personal/duyiwei.png';
import fanglinxu from '@/assets/category/honor/personal/fanglinxu.png';
import fuanan from '@/assets/category/honor/personal/fuanan.png';
import gaoxingwang from '@/assets/category/honor/personal/gaoxingwang.png';
import hanguangyu from '@/assets/category/honor/personal/hanguangyu.png';
import humeng from '@/assets/category/honor/personal/humeng.png';
import huzongtang from '@/assets/category/honor/personal/huzongtang.png';
import jiangheng from '@/assets/category/honor/personal/jiangheng.png';
import jiangyikun from '@/assets/category/honor/personal/jiangyikun.png';
import liweigang1 from '@/assets/category/honor/personal/liweigang1.png';
import liyancheng from '@/assets/category/honor/personal/liyancheng.png';
import luoqing from '@/assets/category/honor/personal/luoqing.png';
import sanglipeng from '@/assets/category/honor/personal/sanglipeng.png';
import suqin from '@/assets/category/honor/personal/suqin.png';
import wangdongxing from '@/assets/category/honor/personal/wangdongxing.png';
import wangjingwei from '@/assets/category/honor/personal/wangjingwei.png';
import wangkai from '@/assets/category/honor/personal/wangkai.png';
import wangmeng from '@/assets/category/honor/personal/wangmeng.png';
import wangxing from '@/assets/category/honor/personal/wangxing.png';
import wangzengliang from '@/assets/category/honor/personal/wangzengliang.png';
import xujun from '@/assets/category/honor/personal/xujun.png';
import xuxuepeng from '@/assets/category/honor/personal/xuxuepeng.png';
import yangyajing from '@/assets/category/honor/personal/yangyajing.png';
import yangzhao from '@/assets/category/honor/personal/yangzhao.png';
import yanhaishuang from '@/assets/category/honor/personal/yanhaishuang.png';
import zengzhaorong from '@/assets/category/honor/personal/zengzhaorong.png';
import zhengjingkun from '@/assets/category/honor/personal/zhengjingkun.png';
import zhengyusheng from '@/assets/category/honor/personal/zhengyusheng.png';
import zhuchunyi from '@/assets/category/honor/personal/zhuchunyi.png';
import defaultImg from '@/assets/category/honor/personal/default.png';

export default {
  title: '社区荣誉',
  readNews: '查看新闻',
  viewCertificate: '查看证书',
  timeList: ['2021', '2022', '2023'],
  certificateList2021: [
    {
      name: '2021 软件产业发展十大事件',
      link: '/zh/news/20220510-ruanjian.html',
    },
    {
      name: '2021 软件行业典型示范案例',
      link: '/zh/news/20220510-ruanjian.html',
    },
    {
      name: '2021年软件行业卓越工程师',
      link: '/zh/news/20220510-ruanjian.html',
    },
    {
      name: '可信开源社区评估认证',
      link: '/zh/news/20210527-kexin.html',
    },
    {
      name: '中国软件行业优秀解决方案',
      link: '/zh/news/20210409-hangye.html',
    },
  ],
  certificateList2022: [
    {
      name: '2022世界互联网领先科技成果奖',
      link: 'https://www.openeuler.org/zh/news/20221112-lingxian.html',
      certificate: certificateImg1,
    },
    {
      name: '可信开源社区评估认证（先进级）',
      link: '/zh/news/20220520-kexin.html',
      certificate: certificateImg2,
    },
    {
      name: 'OSCAR尖峰开源项目及开源社区',
      certificate: certificateImg3,
    },
  ],
  certificateList2023: [
    {
      name: '中国软协产业协会多个奖项',
      link: '/zh/news/20230602-award/20230602-award.html',
    },
    {
      name: 'risc-v获奖',
      link: '/zh/news/20230529-riscv.html',
    },
  ],
  award: {
    personal: new Map([
      [
        '2022',
        {
          title: ['欧拉之星', '年度最佳开发者贡献奖'],
          subTitle: '个人奖',
          awardList: [
            {
              name: '夏森林',
              post: ['Huawei', 'Gitee id：@small_leek', 'SIG：Application'],
              img: xiashenlin,
              detail: [
                '1、深度参与社区自研OS统一构建系统的研发，承担核心模块的生产全流程。',
                '2、作为社区若干sig组（desktop/application/epol）的maintainer，检视社区开发者的贡献PR 1000+。',
                '3、解决构建类问题300+，独立解决阻塞镜像构建问题10+。',
                '4、开发了一套版本构建质量巡检及通知工具，辅助社区其他开发者快速识别版本构建类的共性问题，从人工分析小时级优化到分钟级。',
              ],
            },
            {
              name: '郑增凯',
              post: ['Huawei', 'Gitee id：@zhengzengkai', 'SIG：Kernel'],
              img: zhengzengkai,
              detail: [
                '1、作为openEuler Kernel SIG的Maintainer，整体负责 5.10 内核版本维护，和处理器团队密切配合，使openEuler 完整支持主流的处理器。',
                '2、拓展社区 Committer，达到 40+ 人。维护5.10版本，支撑下游大规模使用。',
                '3、改进内核合入流程，Kernel核心代码贡献合入PR 150+，提交需求&问题issue 53个， 发布评审Comment 733次。',
                '4、组织支持 PR 和 CI，改进补丁开发效率。',
              ],
            },
            {
              name: '李次华',
              post: [
                'Huawei',
                'Gitee id：@licihua',
                'SIG：Java、OpenStack、Application',
              ],
              img: licihua,
              detail: [
                'issue评论次数3600+，涉猎广，牵头制定openEuler软件包选型升级规范，开发开源软件生命周期管理工具，协助维护人员升级开源软件。',
              ],
            },
            {
              name: '田俊',
              post: [
                'Intel',
                'Gitee id：@juntianlinux',
                'SIG：Kernel、Intel Arch',
              ],
              img: tianjun,
              detail: [
                '担任SIG-Intel Arch Maintainer，在openEuler中完整的支持新一代处理器，涉及补丁 1000+。',
                '代表Intel和带领Intel的开发团队在openEuler社区引入了Intel第三代和第四代Xeon可扩展处理器的支持',
              ],
            },
            {
              name: '江新宇',
              post: [
                '麒麟软件有限公司',
                'Gitee id：@jxy_git',
                'SIG：python-modules',
              ],
              img: jiangxinyu,
              detail: [
                '担任openEuler社区SIG-HA、SIG-oVirt maintainer及SIG-CloudNative、SIG-ruby Committer，维护社区OS发行版中HA及oVirt软件特性，积极维护社区大量软件包，积极响应社区issue，贡献PR340+，评审数量1100+',
              ],
            },
            {
              name: '刘鑫',
              post: [
                '中国科学院软件研究所',
                'Gitee id：@misaka00251',
                'SIG：RISC-V',
              ],
              img: liuxin,
              detail: [
                '积极参与社区贡献，积极维护社区大量软件包，贡献PR390+，评审数量500+',
              ],
            },
            {
              name: '张琳',
              post: [
                '北京拓林思软件有限公司',
                'Gitee id：@zhang__3125',
                'SIG：GNOME、Desktop',
              ],
              img: zhanglin,
              detail: [
                '在GNOME相关软件包的维护和升级有突出贡献，贡献PR270+，评审数量800+',
              ],
            },
            {
              name: '李伟刚',
              post: ['统信软件技术有限公司', 'Gitee id：@leeffo', 'SIG：DDE'],
              img: liweigang,
              detail: [
                '在DDE桌面系统相关软件包的维护和升级有突出贡献，贡献PR600+，评审数量2000+',
              ],
            },
            {
              name: '刘福寿',
              post: [
                '黑龙江科技大学本科在读',
                'Gitee id：@liufushou',
                'SIG：Release',
              ],
              img: liufushou,
              detail: [
                '1、在5+SIG组社区群中活跃互动答疑，达到每周50+，参与社区Issue讨论，解决了不少新人问题，协助新用户评估 openEuler 在桌面和服务器上应用的可能性，协助 openEuler 小助手将用户向具体 sig 的专用交流群导流，在必要时候为基于 openEuler 的其它商业发行版导流。',
                '2、积极参与开源实习、暑期等，并主动承担一部分社区的传播布道工作。',
                '3、向 Anaconda-Installer 提交了1次PR，解决了系统安装之后网卡没有默认开启的问题。该问题是20.03版本遗留的问题，对许多新用户造成过困扰。',
                '4、向 netboot.xyz这个用户量不少的开源项目提交有关 openEuler 的 PR ，使得国内外 iPXE 用户可以用最简单的方式安装 openEuler 系统（无需下载ISO镜像，全程在线安装）。',
                '5、向 x2openEuler 提交过意见和建议，11月初的时候受邀参与过新版本工具的内测体验。',
                '6、今年3月份 moocstudio 预览版上线时，上报过 BUG，帮助完善其开发。',
              ],
            },
            {
              name: '许彦骐',
              post: [
                '加拿大滑铁卢大学本科在读',
                'Gitee id：@xyq_d48b',
                'SIG：Embedded、Yocto',
              ],
              img: xuyanqi,
              detail: [
                '6个月之内为openEuler Embedded增加嵌入式图形能力奠定了基础，做出了很有益的探索，整个工作质量很高，相关PR正在陆续合入openEuler Embedded的主线。嵌入式图形栈整体比较复杂，涉及组件众多，对基础软件的深度和广度都有一定的要求，在项目执行过程中遇到了一些难点和挑战，许彦琪同学都很好的解决了，期间沟通频繁且顺畅。',
              ],
            },
          ],
        },
      ],
      [
        '2023',
        {
          title: ['openEuler 年度优秀项目'],
          subTitle: '',
          awardList: [
            {
              name: ' 陈锐昕',
              detail: [
                '1. 作为 docs 仓库贡献者，在维护英文文档的过程中持续提供高质量的贡献，关注文档细节、表达清晰，保持文档的准确性和时效性，提升了用户体验，为 docs 仓库文档的完整性和全面性做出了重要贡献；',
                '2. 除例行的英文文档维护和更新之外，还主动发现中文文档里可以改进的地方，提升文档易用性。2023年 docs 仓库各分支提交代码上万行，处理因中文文档更新触发的翻译 issue 约 1300 个，持续整改英文历史文档适配 markdownlint 规则。',
              ],
              post: ['成都语言桥翻译有限责任公司', 'gomico'],
              img: chenruixin,
            },
            {
              name: '陈棋德',
              detail: [
                '参与186个项目开发和维护工作，一年内审核代码 600+次，提交 PR 80+次，在SIG内排名前列，社区贡献突出',
              ],
              post: ['麒麟软件有限公司', 'dillon_chen  '],
              img: chenqide,
            },
            {
              name: '杜奕威',
              detail: [
                '1. PR提交、Issue反馈、Issue修复、CVE修复',
                '   a. 2023全年在sig-Cloudnative合入111个，在sig-K8sDistro合入14个。',
                '   b. 同时作为相关软件包维护者，积极评审，累计评审230+，提出有效issue单13个，CVE修复4个，解决openEuler版本开发问题12个。以下为部分PR和issue单：',
                '   - eggo新增rpm-ostree字段：https://gitee.com/openeuler/eggo/pulls/203',
                '   - nkd新增证书管理模块：https://gitee.com/openeuler/nestos-kubernetes-deployer/pulls/35',
                '   - rpm-ostree组件升级与问题修复：https://gitee.com/src-openeuler/rpm-ostree/pulls/28',
                '   - skopeo问题修复：https://gitee.com/src-openeuler/skopeo/issues/I795G3?from=project-issue',
                '2. 特性开发、生态发展、公共事务、技术步道',
                '   a. 积极探索生态发展道路，将社区eggo工具与NestOS进行结合，实现可以使用eggo在NestOS中一键拉起K8S集群，并提交相关代码至社区；',
                '   b. 寻求合作之道，将Rubik特性在NestOS上充分验证，提升资源利用率，并将相关特性结合发布至NestOS-20230928版本中；',
                '   c. 开源布道，作为开源项目NestOS的负责人，在社区解决各类NestOS构建与使用问题，多次在sig-cloudnative、sig-K8sdistro例会上宣讲NestOS新版本架构与特性介绍。',
                '3. 参加SIG例会、openEuler峰会、社区影响力',
                '   a. 积极参加每次sig-cloudnative例会，多次主持sig-K8sDistro 例会；',
                '   b. 参加openEuler Summit 2021、2022；ODD2022、ODD2023；2022中国开源年会  并以NestOS为主题进行宣讲，参加2023鲲鹏应用创新大赛，带领NestOS获三等奖。',
              ],
              post: ['麒麟软件有限公司', 'duyiwei7w'],
              img: duyiwei,
            },
            {
              name: '方林旭',
              detail: [
                '1.OS humble在yocto的支持，完成在openEuler嵌入式的多项典型机器人场景的ROS应用穿刺；',
                '2. 贡献了Wayland基于wlroots的Wayfire等多个热门组合器、集成了常用极简终端、文件管理、图形查看器、文本编辑器、任务管理器等嵌入式图形里程碑应用支持；',
                '3. 贡献了iSulad在openEuler嵌入式标准全量功能支持、完善了glibc多字符集及嵌入式dnf包管理等用户关键需求特性；',
                '4. 作为Maintainer长期负责嵌入式版本软件维护和升级。',
              ],
              post: ['华为技术有限公司', 'fanglinxu'],
              img: fanglinxu,
            },
            {
              name: '付安安',
              detail: [
                '1. 参与68个项目维护工作，一年内代码提交140多次，在SIG内排名前列，提交PR质量高，社区反馈好；',
                '2. 快速解决、响应issue，issue解决效率>=1.5个/天，无引入问题；',
                '3. 升级软件包提前识别依赖关系、配套版本要求，仔细分析升级差异，不造成工程阻塞；',
                '4. 仔细分析PR中的代码动作，尽可能覆盖PR或issue中问题的POC场景复现以及修复有效性验证，将分析过程展现到讨论中，提高开源社区人员对PR以及issue页面的可读性（向优秀的上游社区学习、靠拢）',
              ],
              post: ['江苏润和软件股份有限公司', 'fly_fzc'],
              img: fuanan,
            },
            {
              name: '郜兴旺',
              detail: [
                '2023年度作为开发人员，维护iproute、initscripts、NetworkManager等6款软件，提交MR 38个，定位解决咪咕视频、浙江移动等openEuler用户问题20+，为江苏移动培训ipv6基本知识与使用，为openEuler推广提供有力支撑，作为Networking sig组committer，看护网络管理相关软件包，严格审核代码，提出有效review意见200+，零问题引入，保障社区代码高质量合入。',
              ],
              post: ['华为技术有限公司', 'robertxw'],
              img: gaoxingwang,
            },
            {
              name: '韩光宇',
              detail: [
                '作为 OpenStack SIG maintainer，长期积极参与 SIG 的相关开发和运营工作：',
                '1. 参与 22.03-LTS-SP2、22.03-LTS-SP3、20.03-LTS-SP4 中  OpenStack Train、Wallaby 支持工作，2023年度已合并 PR 293 个，修复 Issue 12 个，在 SIG 2023 年度贡献排名第 1 。',
                '例如：',
                'https://gitee.com/src-openeuler/openstack-masakari/pulls/1',
                'https://gitee.com/src-openeuler/ovn/pulls/4',
                'https://gitee.com/openeuler/openstack/issues/I77LN7',
                '2. 负责 SIG 联合创新特性-网络流量分散特性的设计与开发。特性开发已完成，本地测试通过，将在 20.03-LTS-SP4 及 22.03-LTS-SP3 发布。',
                '特性SPEC：',
                'https://gitee.com/openeuler/openstack/blob/master/docs/spec/distributed-traffic.md',
                '3. 持续维护 SIG 开发者工具软件，保障 SIG 开发效率；积极响应 SIG 用户问题；认真参与开发者 PR 审核。将实际生产问题，引入为 SIG 联合创新点开发，并实践将创新特性，落实到实际生产场景。积极参与 SIG 运营及 SIG 生态推广、落地。',
                '    https://gitee.com/openeuler/openstack/pulls/688',
                '4. 作为统信在 OpenStack SIG 的负责人，承接向 OpenStack 上游社区的 OpenStack-Helm 项目添加 openEuler 系统支持的工作。积极参与 openEuler 推广及生态发展，在各大互动中演讲 openEuler 相关议题，例如今年的OpenInfra China Day 就有相关呈现。',
              ],
              post: ['统信软件技术有限公司', 'han-guangyu'],
              img: hanguangyu,
            },
            {
              name: '韩昊旻',
              detail: [
                '2023年1月1日-2023年11月20日期间，负责了ROS2版本在openEuler的适配，使得openEuler成为国内第一个适配ROS2-humble版本的操作系统，期间贡献PR200+，修复issue若干，成功将ROS2+openEuler版本落地到实际产品中，扩展了openEuler操作系统下机器人软件的开发生态。',
              ],
              post: ['中国科学院软件研究所', 'davidhan008'],
              img: defaultImg,
            },
            {
              name: '胡萌',
              detail: [
                '1. 2023年新版本60+ 特性资料需求跟踪与进展对齐，协助完成创新版本与长周期版本的文档上线工作；参与openEuler社区资料10+ 历史版本文档日常修改与维护，官网文档走读，识别并修改文档资料规范性问题。协助完成新版本技术白皮书写作跟踪、评审、修改、翻译答疑、美化与上线工作；优化文档地图、文档目录结构调整。',
                '',
                '2. 2023年openEuler社区累计贡献 600+ 次，代码提交量近万行。期间创建 PR 341 条，创建 issue 1 条，处理 issue 138 条。',
              ],
              post: ['中软国际科技服务有限公司', 'u_meng'],
              img: humeng,
            },
            {
              name: '胡宗棠',
              detail: [
                '1. openEuler message middleware sig的治理/运营',
                '    a. 从0到1创建了该sig组（该sig组是中国移动在openEuler社区唯一个主导的sig组）;',
                '    b. 从sig创建至今，主导sig组的双周例会（sig组会采用创新思路，通过每次邀请1位业界知名的消息中间件技术专家分享议题），处理sig日常事务；',
                '    c. 组织社区年度规划，制定计划，跟踪事项，完成闭环；',
                '    d. 运营sig组的微信群，人数达到；150+；',
                '    e. 月报：23年共计为openEuler社区 7/8/9/10月输出和贡献了材料；',
                '    f. 开源文化建设：牵头制定和完善openEuler message-middleware sig组的相应的开源创新技术的文化；',
                '    g. sig组导师制建立：建立以Maintainer/Committer为主体的Mentor导师制流程和相应的规章制度，保证sig组良好健康的发展；',
                '    h. sig组开源人才建设与培养，先后培养6位童鞋成为Committer；',
                '    i. 邀请业界一流技术公司（腾讯云、京东云、美团、滴滴、streamNative）加入共同建设，提升sig组的多元化发展；',
                '2. openEuler message middleware sig的软件包适配/代码贡献',
                '    a. 从0到1创建message-middleware sig下面所有的软件包仓库（rocketmq、pulsar、eventmesh、amqp-proxy、mqtt-proxy），',
                '  并且辅导/review多名committer完成所有软件仓库的PR提交/合并；',
                '    b. 完成从java-sig、bigdata-sig中迁移rabbitmq-server、kafka和rabbitmq-client等软件包仓库至本sig下，进行托管和维护（7个PR（包括1000+代码贡献），',
                '   60+Commens/Issues，7个软件包版本的迭代和维护）；',
                '    c. 孵化并捐赠4款移动云自研消息组件至openEuler社区；',
                '3. openEuler message middleware sig的行业影响力提升(包括原创技术文章)',
                '    a. 23年6月至今，个人在openEuler公众号上先后发布5篇文章（其中部分文章在移动云、可信云开源、思否、移动Labs等公众号上转发，阅读量超过10K+；',
                '    b. 23年8月参加Apache Conf 2023 Aisa，议题内容包含宣传移动云协同openEuler的开源技术创新；',
                '    c. 23年9月参加信通院OSCAR开源大会，议题内容宣传移动云在openEuler社区的开源技术演进规划；',
                '    d. 23年10月14日，牵头组织并主办了杭州消息中间件专场线下Meetup（包括嘉宾邀请和承担志愿者/主持人工作）；',
                '    e. 23年11月12日，牵头组织并主办消息sig组线上直播Meetup（包括嘉宾邀请）；',
                '    f. 23年10月作为联合作者，以“以mqtt-proxy项目模糊安全攻击”为主题投稿1篇SCI三区论文(预计11月底出结果)，提升本sig组的科研界的影响力；',
                '4. 与其他开源社区合作',
                '    a. 与Apache RocketMQ社区紧密合作，共同推进openEuler RocketMQ与上游开源Apache RocketMQ的版本协同发布；',
                '    b. 与Apache EventMesh社区紧密合作，共同推进openEuler EventMesh与上游开源Apache EventMesh的版本协同发布；',
                '    c. 与Apache Pulsar社区紧密合作，共同推进openEuler Pulsar与上游开源Apache Pulsar的版本协同发布, 以及联合举办线上技术分享直播；',
                '5. 厂商交流',
                '    a. 作为sig Maintianer代表线下与中国传统中间件厂商东方通交流，并且邀请他们一起参与openEuler message-middleware sig组的消息相关的开源项目共同建设，',
                '提升sig组的多元化发展和行业影响力；       ',
              ],
              post: ['中国移动云能力中心', 'hu-zongtang '],
              img: huzongtang,
            },
            {
              name: '江新宇',
              detail: [
                '担任openEuler社区sig-HA、sig-oVirt maintainer及sig-CloudNative、sig-ruby、sig-ops、sig-python-modules committer，维护社区OS发行版中HA及PilotGo软件特性，积极维护社区大量软件包，积极响应社区issue，贡献PR520+，评审1500+。其中sig-python-modules贡献PR168+,参与维护python软件包161个。',
              ],
              post: ['麒麟软件有限公司', 'jxy_git'],
              img: jiangxinyu,
            },
            {
              name: '姜逸坤',
              detail: [
                '在2023年，姜逸坤活跃在openEuler HPC、Infrastructure、Bio、Cloud Native等多个SIG，在OpenHPC、Bioconductor等国际主流HPC项目推进openEuler原生支持，提升openEuler国际知名度。',
                '主要贡献事迹如下：',
                '1. HPC基础软件栈社区OpenHPC上游社区原生支持openEuler[1]：OpenHPC 3.0版本正式发布，OpenHPC上游合入openEuler相关适配40+ PR。',
                '2. 生信主流社区Bioconductor原生支持openEuler[2]：2000+生信软件包在openEuler持续验证，持续验证、可用。',
                '3. 制定openEuler官方容器镜像发布流程，完成oEEP-5的制定[3]，作为主要人员参与云镜像发布工具EulerPublisher的孵化[4]。',
                '4.  同时担任openEuler Infrastructure SIG Maintainer，2023年完成PR 17个，review 100+条[5]。',
                '举证链接如下所示：',
                '[1] https://github.com/openhpc/ohpc/releases/tag/v3.0.GA',
                '[2] https://bioconductor.org/checkResults/3.19/bioc-LATEST/long-report.html',
                '[3] https://www.openeuler.org/zh/oEEP/?name=oEEP-0005%20openEuler%E5%AE%98%E6%96%B9%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B',
                '[4] https://gitee.com/openeuler/eulerpublisher',
                '[5] https://datastat.openeuler.org/zh/user/yikunkero',
                '',
              ],
              post: ['华为技术有限公司', 'yikunkero'],
              img: jiangyikun,
            },
            {
              name: '蒋恒',
              detail: [
                '1. 作为sig-high-performance-network commiter， 负责用户态高性能网络协议栈gazelle的维护开发工作，一年内累计合入70+pr， 代码量5k+；',
                '2. 与移动云团队深度联创，支撑移动云essd存储场景稳定达到125w IOPS，优于内核态性能15%+，达成了BC-Parther产品1.0里程碑。',
              ],
              post: ['华为技术有限公司', 'jiangheng12'],
              img: jiangheng,
            },
            {
              name: '李伟刚',
              detail: [
                '1. 在2023年度完成openEuler-23.03、22.03-LTS-SP2、23.09版本中DDE的升级测试以及相关问题修复；',
                '2. 参与完成KDE组件5.100 5.108的升级以及桌面使用过程中KDE问题的修复；',
                '3. 参与负责Desktop、desktop-apps的日常issue修复、pr检视，cve修复；',
                '4. 参与perl-module的仓库提交；',
                '5. 2023年度sig-DDE贡献PR贡献量为304个，评审comment 853；社区全部PR贡献量为390个，评审comment 1800+，参与活跃SIG数量10个。',
              ],
              post: ['统信软件技术有限公司', 'kwg99(leeffo)'],
              img: liweigang1,
            },
            {
              name: '李彦成',
              detail: [
                '1. 作为Compiler SIG Maintainer，积极参与特性检视和版本问题处理，近一年参与代码检视600+，有效看护模块质量；负责和参与基础性能优化、反馈优化，提交PR和解决issue 20+，主动规划特性重构，消除历史遗留债务。',
                '2. 负责openEuler summit 2022、openEuler developer day 2023等多个峰会主题演讲；负责组织OSSEU 2023议题申报，支撑插件框架项目中选，提升Compiler SIG技术影响力；',
              ],
              post: ['华为技术有限公司', 'li-yanchen'],
              img: liyancheng,
            },
            {
              name: '罗清',
              detail: [
                '1. 在2023年度参与 openEuler-23.09、openEuler-22.03-LTS-SP2版本的kiran桌面环境的特性开发和issue修复；',
                '2. 主要负责KIRAN-DESKTOP桌面环境的开发和维护：参与完成KIRAN-DESKTOP v2.4和v2.5的开发和问题修复，主要有控制中心网络和音量，身份认证体系框架等特性开发；',
                '3. 参与贡献多个src-openEuler和openEuler仓库的代码和issue处理：kiran-desktop、kiran-control-panel 、kiran-authentication-devices、kiran-menu、 kiran-cc-daemon 、kiran-session-manager等；',
                '4. 参与多个社区活动：参与openEuler三周年线上会议，并分享感受；参与开发的身份认证体系框架项目登上openEuler Developer Day 2023的安全分论坛；',
                '5. 在2023年度共提交了161个PR，涉及4个sig组：sig-KIRAN-DESKTOP、sig-release-management、TC、Networking；社区总计提交286个PR，comment 120，涉及6个sig组；',
                '6. 生态发展：辅导同事向sig-mate-desktop和sig-desktop-apps提交近百个PR，为社区应用生态发展做出贡献；',
                '7. 开源实习：参与sig-KIRAN-DESKTOP的开源实习任务，作为导师，指导实习生两位。',
              ],
              post: ['湖南麒麟信安科技股份有限公司', 'uoqing_kylinsec'],
              img: luoqing,
            },
            {
              name: '桑力鹏',
              detail: [
                '1. 积极参与openEuler 社区开发工作，全年累计评审PR 795+ ，合入PR 28 个，提出有效issue单 25 个，CVE修复3个。组织推动京东内核组积极参与社区开发，累计合入PR 74个；',
                '2. 积极探索生态发展道路，基于openEuler 22.03 SP1创建京东的操作系统云舰OS，推动openEuler特性在京东集团上线使用，目前累计装机数千台，并经历了2023年618和双十一高并发场景考验。',
                '3. 积极参与和组织 SIG 例会，讨论各项议题。协同组织ODD2023 Kernel 分论坛，并作技术演讲。',
              ],
              post: ['京东科技', 'sanglipeng'],
              img: sanglipeng,
            },
            {
              name: '苏琴',
              detail: [
                '1. 管理SIG日常事务，策划课程、博客、海外参会翻译支撑等SIG活动；组织openEuler Developer Day 2023 G11N SIG组开放工作会议，收集开发者对G11N SIG在社区本地化、课程视频和技术博客等方面的意见和建议。组织技术直播-关于openEuler社区内容英文化的那些事儿，直播包含5个主题，持续1个多小时，受到开发者的欢迎和认可；',
                '2. 与docs和infrastructure SIG合作，推动落地CI Bot自动检测docs仓库中文内容变更，推送翻译issue；在openEuler/docs仓库上，贡献者只需认领和处理翻译Issues，提交PR合入译文，规避了中文内容漏翻译的问题，保障了中英文文档的一致性；推动落地docs仓库英文文档捉虫功能，调动社区开发者一起维护openEuler的英文文档；',
                '3. 为社区开发者参与FOSS Asia、IstioCon、OSSUMMIT EU等国际会议提供演示材料翻译；翻译Issue/PR模板、优化openEuler在Gitee的介绍页及README英文文件；',
                '4. 作为实习导师，发布6大开源实习任务，吸引10+浙大等学生参与开源贡献。写作、发布6篇英文技术博客，并在翻译论坛分享开源基础知识及开源社区全球化实践，提升社区影响力。',
              ],
              post: ['华为技术有限公司', 'Judithsq'],
              img: suqin,
            },
            {
              name: '孙志刚',
              detail: [
                '1. 作为Release SIG Committer，积极参与 Release 例会讨论、表决，协作完成 openEuler 23.03、23.09、22.03-LTS-SP2评审发布；',
                '2. 带领团队基于 openEuler开发的culinux发行版，用于通信、云平台等场景。鼓励并指导同事和社区用户向 openeuler 社区提交 issue 与 pr；',
                '3. 主动拓展openEuler生态，在教育行业项目中，联通云向客户推荐openEuler，并帮助客户定制Guest操作系统。',
              ],
              post: ['联通数字科技有限公司', 'zhgsun'],
              img: defaultImg,
            },
            {
              name: '王东兴',
              detail: [
                '担任openEuler社区sig-Openstack maintainer及sig-python-modules、sig-AI committer，积极维护社区Python软件包，响应社区issue，贡献PR217+，评审736+。其中sig-python-modules贡献PR86+，向TC提交引包PR 10+，组织本团队成员积极参与社区贡献，已引入/引入中 Python软件包 300+。 ',
              ],
              post: ['软通动力技术服务有限公司', 'desert-sailor'],
              img: wangdongxing,
            },
            {
              name: '王经纬 ',
              detail: [
                ' 1. 协调主导了23.09合入主线项目的完成；',
                ' 2. 完成了大型浏览器 chromium，firefox等软件在 oerv 平台的移植；',
                ' 3. 跟踪优化 oerv 系统，引入了多种jit技术集成，包括 luajit，llvmpipe，spidermonkey等；',
                ' 4. 发起 QT6 项目，协同完成 QT6 三架构支持，同时完成VLC，Thunderbird等软件在 oerv平台的初始化；',
                ' 5. 为 oerv 协同完成和发表多篇公众好文章在官方平台；',
                ' 6. 参与各项大型展示活动，宣传 openEuler RISC-V 操作系统，如中国科学院公众开放日、RISC-V 中国峰会、庆祝香港回归技术展示、各种内部和外部展示；',
                ' 7. 积极参与社区沟通与协助，带头促进主线代码回合、官方工程整合及正式的镜像的发布，打通官方发布的流程。',
              ],
              post: ['中国科学院软件研究所', 'Jingwiw'],
              img: wangjingwei,
            },
            {
              name: '王凯',
              detail: [
                '1. 在sig-application主要投入cve修复，缺陷修复，软件包升级等工作，其中提交pr 81+，提交issue 10个，评审项996+；',
                '2. 升级sig-application的firefox软件包到102.11.0版本一并解决了260+个cve（pr举例：https://gitee.com/src-openeuler/firefox/pulls/87）；',
                '3. 主动跟进软件包仓库下的历史遗留issue，如清理three-eight-nine-ds-base仓库下的历史缺陷问题（pr举例： https://gitee.com/src-openeuler/three-eight-nine-ds-base/pulls/45） ',
              ],
              post: ['江苏润和软件股份有限公司', 'wk333'],
              img: wangkai,
            },
            {
              name: '王萌',
              detail: [
                '负责utshell项目的重构工作，具体内容包括：',
                ' 1. 参与多个命令的重构：wait、exit、bind、caller、exec echo 等命令；',
                ' 2. 参与主体逻辑重构：jobs（工作控制逻辑）和execute_cmd(命令执行逻辑)的重构；',
                ' 3. utshell 项目共提交294个pr，其中合入280个。提交、修改代码超过2万余行；',
                ' 4. 修复并解决：',
                ' 4.1 解决 help -m 执行结果错误',
                ' 4.2 解决 enable-n 回显错误',
                ' 4.3 解决 pushd 和popd -n  执行报错',
                ' 4.4 修复 history -d不能使用等问题',
              ],
              post: ['统信软件技术有限公司', 'wangmengc'],
              img: wangmeng,
            },
            {
              name: '王杏',
              detail: [
                '1. 负责openEuler 社区官网日常维护及功能开发。支撑2023年ODD活动界面开发。oEEP、openEuler Call for X 计划、城市用户组模块开发；',
                '2. 负责openEuler 文档技术支撑，日常问题修复，版本发布支撑。有奖捉虫功能的开发落地，便于开发者快速反馈文档问题，提交issue，参与社区贡献；',
                '3. 负责quickIssue平台的前端开发维护，简易快捷地查询、提交社区Issues。及easyEditor平台的开发，便于SIG 定制编辑各自SIG主页；',
                '4. 负责2023年开发者年度贡献报告的开发，供开发者总结一年的贡献数据，分享自己的贡献成就；',
                '5. 负责openEuler 会议小程序开发及维护，开发者手机微信端快速预定会议及录入活动，官网展示便于查找快速入会，并有会议开始提醒，邮件通知功能方便实用。',
              ],
              post: ['深圳易宝软件有限公司', 'haml'],
              img: wangxing,
            },
            {
              name: '王增亮',
              detail: [
                '积极投身于openEuler SDS SIG的日常工作，积极参与社区建设、负责sig-SDS日常issue处理及CVE修复，2023年累计提交合入PR19个，代码2000+。修复了CVE-2023-43040等四个漏洞。完成了SDS看护的组件在openssl3.0 gcc12 python3.11上的适配工作。',
              ],
              post: ['深圳市海思半导体有限公司', 'wangzengliang1'],
              img: wangzengliang,
            },
            {
              name: '徐军',
              detail: [
                '1. 社区贡献',
                '   a. 和OE社区一同设计开发维护测试框架(mugen)和平台(radiatest)',
                '   b. 积极参与社区，目前总共提交PR：700+，审视PR：100+，合入PR：50+',
                '   c. 提出mugen框架2.0版本，并进行开发中',
                '',
                '2. 社区活动',
                '   a. 积极参与社区QA例会，并适当的提出意见',
                '   b.参与openEuler峰会，并在会议中，提供个人意见',
                '   c. 解答来自社区贡献者关于QA相关问题',
              ],
              post: ['超聚变数字技术有限公司', 'lemon-higgins'],
              img: xujun,
            },
            {
              name: '徐学鹏',
              detail: [
                '1. 主导iSulad社区中Sandbox API特性的设计与开发，在CRI V1版本中支持Sandbox API，实现沙箱与容器管理的解耦;',
                '2. 与Kuasar社区联动,  打造iSulad+Kuasar新一代统一容器运行时的云原生底座，提升openEuler在云原生领域的竞争力与影响力。',
              ],
              post: ['华为技术有限公司', 'xuxuepeng'],
              img: xuxuepeng,
            },
            {
              name: '严海双',
              detail: [
                '1. 长期参与兼容性SIG组运营和开发工作，参与迁移工具健康巡检功能研发，2023年累计提交并合并PR供165个，向社区贡献了3个自研项目，分别为KSPack、SecScanner与VMAnalyzer项目，积极邀请ISV合作伙伴加入openEuler社区，提升openEuler行业影响力。',
              ],
              post: ['中国移动云能力中心', 'gogoxiaoxiao'],
              img: yanhaishuang,
            },
            {
              name: '杨雅婧',
              detail: [
                '1. 积极拓展openEuler人才能力评定合作伙伴10家，助力openEuler生态快速推广。目前人才能力评定合作伙伴已成为快速发展openEuler生态人才的主要抓手之一；',
                '2. 协同构建了openEuler人才能力评定一体化IT平台，提高了openEuler人才能力评定工作效率；',
                '3. 联合多家openEuler人才能力评定合作伙伴，积极推广宣传openEuler专业人才培养，截止目前覆盖社会人群2000+，其中通过专业人才能力评定1200+人，为openEuler生态快速发展奠定人才基础；',
                '4. 积极组织openEuler人才能力评定考试，目前已形成初步生态闭环。',
              ],
              post: ['华为技术有限公司', 'Yangyajing168'],
              img: yangyajing,
            },
            {
              name: '杨昭',
              detail: [
                '1. 积极参与ops sig软件生态扩展维护及日常事务决策；在社区中维护Prometheus监控系列软件组件，扩充监控软件生态，并引入到社区OS多个发行版当中；在社区中孵化PilotGo运维管理平台项目，并引入到社区23.09创新版本当中，负责项目架构设计及核心功能开发，累计提交代码40000余行，并作为基础公共平台，对接ops sig中孵化的其他运维监控及调优组件，提供统一的运维管理平台，促进社区运维类软件的落地实践。',
                '2. 作为麒麟软件内部团队对接人，参与release sig OS版本及特性选型、社区运作等各项事务决策，推动release sig工作按质按量按时完成。推动HA、UKUI、prometheus、NestOS等特性在社区版本中的集成、测试及落地，丰富社区软件生态。推动麒麟软件研发团队参与社区OS发行版核心软件包的集成测试与CVE修复，保障社区发行版的稳定可靠。',
              ],
              post: ['麒麟软件有限公司', 'yangzhao_kl'],
              img: yangzhao,
            },
            {
              name: '曾昭荣',
              detail: [
                '现担任Intel Arch SIG 和 Kernel SIG的 Maintainer。作为Intel公司参与openEuler社区的代表之一，',
                '1. 积极参与、协调Intel内部对openEuler的支持，实现Intel新平台在openEuler 各版本的持续支持。',
                '组织Intel团队共合入超过60个平台新特性（PR），超过900 个补丁。个人提交和审视的补丁总共',
                '超过350个，审核意见超过160个。包括x86平台的特性支持，如intel，amd，海光平台等，',
                '也包括一些通用的技术领域，如内存管理，网络，bpf，安全CVE，kernel config等等。',
                '2. 积极参与x86平台的重要CVE的审视，为x86平台重要的CVE安全修复把关，特别是修复复杂的漏洞。',
                '3. 积极参与和推动Intel-Arch SIG的工作，未雨绸缪，针对Intel平台相关重大特性，提前规划和推动相关的疑难',
                ' 问题在Intel-Arch-SIG、Kernel-SIG和openEuler社区的讨论。积极参与，并为推动openEuler下一个LTS',
                ' 版本的kernel version的选型提供积极建议，并与Intel团队、Kernel-SIG、及其他社区积极协商。',
                '4. 积极参与Kernel SIG的创新活动, 完成基于openEuler Kernel的内核热升级方案的原型开发，并在Summit',
                ' 内核分论坛介绍热升级方案，及在社区积极组织相关讨论。持续跟进创新，提出内核热升级中SR-IOV设备',
                ' 的通用支持方法，完成原型开发。使能和完善x86平台reliable memory特性。',
              ],
              post: ['Intel', 'x56Jason'],
              img: zengzhaorong,
            },
            {
              name: '郑景坤',
              detail: [
                '1. 参与 openEuler 23.03 RISC-V 在 QEMU 与硬件开发板的测试，涵盖了功能测试、内核、长稳、编译器、文档等方面；',
                '2. 推动 openEuler 23.09 RISC-V 合入主线，促进 openEuler RISC-V 测试的规范化；',
                '3. 近一年在 openEuler 社区提交 PR 40 余个、Issue 15 个、commit 200+；',
                '4. 积极与 RISC-V 硬件厂商合作，促进 openEuler 在 RISC-V 硬件上的使用；',
                '5. 参加各项大型展示活动，进行技术支持和讲解，宣传 openEuler RISC-V 操作系统，如中国科学院科学节、中国科学院公众开放日、RISC-V 中国峰会、庆祝香港回归技术展示、各种内部和外部展示',
              ],
              post: ['中国科学院软件研究所', 'KevinMX'],
              img: zhengjingkun,
            },
            {
              name: '郑煜笙',
              detail: [
                '1. 持续撰写输出关于 eBPF 的教程、博客，并和社区分享；',
                '2. 开发了兼容内核的用户态 eBPF 运行时 bpftime，支持观测用户态进程函数调用、系统调用，并且相比内核对应方案有明显性能优势；维护了 eBPF 和 Wasm 相关的开源项目。',
              ],
              post: ['eunomia-bpf 开源社区', 'yunwei37'],
              img: zhengyusheng,
            },
            {
              name: '朱春意',
              detail: [
                '作为Sig-OS-Builder Maintainer，负责镜像定制裁剪工具imageTailor/oemaker的设计及开发，一年内共落地8个需求，构建文件级极致小型化镜像裁剪能力，实现全场景定制裁剪能力统一，包括ISO镜像、容器镜像、嵌入式镜像、树莓派镜像、qcow2镜像、通用开发环境镜像、livecd镜像等，填补社区空白，并在openEuler 2023年ODD大会上进行了技术分享。2023年底，已对接落地到了EulerMaker统一构建平台，并在众多OSV厂商进行部署使用，支撑各厂商构建基于openEuler的操作系统发行版。同时通过创建imageTailor/oemaker交流群，辐射到更多openEuler社区用户和厂商。',
              ],
              post: ['华为技术有限公司', 'zhuchunyi'],
              img: zhuchunyi,
            },
          ],
        },
      ],
    ]),
    team: new Map([
      [
        '2022',
        [
          {
            title: '团队奖',
            address: '项目地址',
            awardList: [
              {
                name: 'SIG Kernel',
                detail: [
                  '2022年新增 20 多位 Committer, 来自 10 余家不同的组织/公司。',
                  '顺利发布新一代 5.10 内核，完成多个主流架构处理器支持，包括鲲鹏、兆芯、龙芯、申威、飞腾、Intel、AMD 等。',
                  '在云原生调度、内存可靠性、新文件系统、可编程内核等领域孵化多个新技术点，在调度、网络、IO、文件系统等多个核心子系统性能优化，支撑下游商用发行版，在电信、金融等多个核心领域成功应用。',
                  '及时修复400余个安全漏洞，发布 140 余个 update 版本，保障下游各个版本及时获得安全更新。改进和优化代码提交合入方式，并通过基础设施，推广到整个社区。',
                ],
                link: 'https://www.openeuler.org/zh/sig/sig-detail/?name=Kernel',
              },
              {
                name: 'SIG Compiler',
                detail: [
                  '孵化gcc多版本、A-FOT、bishengjdk-17、bishengjdk-riscv等项目，支持多样性算力生态，包括intel SPR特性、龙芯LoongArch支持等。',
                  '完成4个openJDK版本发布，完成KAE Provider、dynamic CDS等特性，支持大数据领域应用性能提升10%，且多数项目已经商用落地。',
                ],
                link: 'https://www.openeuler.org/zh/sig/sig-detail/?name=Compiler',
              },
              {
                name: 'SIG CloudNative',
                detail: [
                  '汇聚来自20+企业的超过300位开发者，孵化iSula、CPDS、Eggo、Rubik、KubeOS、NestOS等原创技术项目，涵盖容器运行时、故障监测、部署、资源利用率提升等全栈能力，为用户提供高性能、高可靠的云原生解决方案，已在在金融、互联网、运营商等领域规模落地。',
                ],
                link: 'https://www.openeuler.org/zh/sig/sig-detail/?name=sig-CloudNative',
              },
            ],
          },
        ],
      ],
      [
        '2023',
        [
          {
            title: '社区优秀项目',
            address: '',
            awardList: [
              {
                name: 'openEuler Kernel',
                detail: [
                  'openEuler Kernel 是 openEuler 操作系统的核心组件，是数字基础设施的关键底座。支持服务器、云、边缘、嵌入式等应用场景，支持多样性计算，致力于提供高性能、安全、稳定可靠的操作系统内核。',
                ],
                link: 'https://gitee.com/openeuler/kernel',
              },
              {
                name: 'iSulad',
                detail: [
                  'iSulad项目是轻量级容器引擎解决方案，对比业界解决方案具有性能更高、内存开销更小、不受硬件规格和架构限制，应用的领域更为广泛等优点。',
                ],
                link: 'https://gitee.com/openeuler/iSulad',
              },
              {
                name: 'StratoVirt',
                detail: [
                  'StratoVirt是计算产业中面向云数据中心的企业级虚拟化平台，实现了一套架构统一支持虚拟机、容器、Serverless三种场景，在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。',
                ],
                link: 'https://gitee.com/openeuler/stratovirt',
              },
              {
                name: 'mugen',
                detail: [
                  'mugen是openEuler社区孵化的开源Linux测试框架，提供公共配置和方法以便社区开发者进行测试代码的编写和执行,旨在用例协同贡献，提高测试效率，提供如下关键能力：',
                  '1、持续丰富的操作系统测试用例。',
                  '2、高效的用例编写和执行公共方法库。',
                  '3、解耦式执行及完善的测试过程跟踪和结果统计。',
                ],
                link: 'https://gitee.com/openeuler/mugen',
              },
              {
                name: 'NestOS',
                detail: [
                  'NestOS是在openEuler社区孵化的云底座操作系统，集成了rpm-ostree支持、ignition配置等技术，采用双根文件系统、原子化更新的设计思路，使用nestos-assembler快速集成构建。并针对K8S、openStack等平台进行适配，优化容器运行底噪，使系统具备十分便捷的集群组件能力，可以更安全的运行大规模的容器化工作负载。',
                ],
                link: 'https://nestos.openeuler.org/',
              },
              {
                name: 'sysMaster',
                detail: [
                  'sysMaster：可靠系统中1号进程的新选择, 全新实现方案，秒级自愈，保障系统全天在线。',
                ],
                link: 'https://gitee.com/openeuler/sysMaster',
              },
              {
                name: 'A-ops',
                detail: [
                  '以操作系统基础，提供可观测，自动/智能化和热修复的系统级运维平台。',
                ],
                link: 'https://gitee.com/openeuler/aops-apollo',
              },
              {
                name: 'A-Tune',
                detail: [
                  'A-Tune是一款基于AI的操作系统性能调优引擎。A-Tune利用AI技术，使操作系统“懂”业务，简化IT系统调优工作的同时，让应用程序发挥出色性能。',
                ],
                link: 'https://gitee.com/openeuler/A-Tune',
              },
            ],
          },
          {
            title: '行业影响力',
            address: '',
            awardList: [
              {
                name: 'DDE（深度桌面环境）',
                detail: [
                  'DDE（深度桌面环境）是由统信软件完全自主研发的图形化操作界面，具有美观易用、安全可靠等特点。DDE（深度桌面环境）已集成到openEuler和UOS所有发行版本中，并应用到党政、教育、金融等多个行业。',
                ],
                link: 'https://gitee.com/openeuler/dde',
              },
              {
                name: 'Kiran桌面环境',
                detail: [
                  'Kiran作为一个轻量级的桌面环境，为用户提供了简单易用、界面友好、安全稳定的图形操作环境。',
                ],
                link: '',
              },
              {
                name: 'OEBuild',
                detail: [
                  '针对openEuler Embedded开发的元工具，负责构建环境管理、构建配置生成等工作，可大幅提升openEuler Embedded开发效率。',
                ],
                link: 'https://gitee.com/openeuler/oebuild',
              },
              {
                name: 'GCC for openEuler',
                detail: [
                  'GCC for openEuler是openEuler的默认编译器，继承了开源 GCC 能力的基础上，增强自动反馈优化、软硬件协同、内存优化、自动向量化等特性，并适配鲲鹏、飞腾、龙芯等硬件平台，充分释放硬件算力。',
                ],
                link: 'https://gitee.com/openeuler/gcc',
              },
              {
                name: 'Bigtop on openEuler',
                detail: [
                  '通过Apache Bigtop等大数据领域项目的openEuler原生支持，完善社区大数据生态，实现社区与全球顶级开源基金会项目的联接，提升openEuler社区影响力。',
                ],
                link: '',
              },
            ],
          },
          {
            title: '技术创新',
            address: '',
            awardList: [
              {
                name: 'GMEM',
                detail: [
                  '通过拓展Linux MM子系统，构建全场景加速器接入能力，使openEuler内核内存管理由CPU专用，演进为异构通用。',
                ],
                link: 'https://www.gmem.tech',
              },
              {
                name: 'Rust-Shyper',
                detail: [
                  '基于Rust编写的、面向嵌入式混合关键场景的、高安全Type-1型虚拟机监控器。',
                ],
                link: '',
              },
              {
                name: '嵌入式实时虚拟机ZVM',
                detail: [
                  'ZVM是一款基于Zephyr实时操作系统的虚拟化管理平台，以满足嵌入式场景下高实时与高安全的应用需求。',
                ],
                link: 'https://gitee.com/openeuler/zvm',
              },
              {
                name: 'secGear',
                detail: [
                  'secGear 机密计算统一开发框架致力于提供简单易用的机密计算软件栈及解决方案，降低机密计算开发门槛，推动机密计算生态发展。',
                ],
                link: 'https://gitee.com/openeuler/secGear',
              },
            ],
          },
          {
            title: '社区活跃',
            address: '',
            awardList: [
              {
                name: 'FangTian视窗引擎',
                detail: [
                  '构建openEuler视窗根技术，打造桌面环境基础底座。提供显示服务，窗口管理，图形绘制、合成、送显等。',
                ],
                link: '',
              },
              {
                name: 'PilotGo运维管理平台',
                detail: [
                  'PilotGo作为一款插件式的运维管理平台，提供强大的扩展能力，集管理、监控、性能优化于一体，为客户提供完善、一致、流畅的运维管理体验。',
                ],
                link: 'https://gitee.com/openeuler/PilotGo',
              },
              {
                name: 'Migration-tools',
                detail: [
                  'Migration-tools是一款操作系统迁移软件，面向已部署业务应用于CentOS系列操作系统且具有替换需求的用户，帮助其快速、平滑、稳定且安全地迁移至openEuler操作系统。',
                ],
                link: 'https://gitee.com/openeuler/migration-tools',
              },
              {
                name: 'radiaTest',
                detail: [
                  'radiaTest是孵化于openEuler社区的基于openEuler操作系统环境开发的测试管理平台。',
                  '提供测试资产管理、测试任务管理、测试资源调度与测试任务执行等功能，以更深远的覆盖社区测试需求为目标，意在一体化承载社区测试流程。',
                ],
                link: 'https://gitee.com/openeuler/radiaTest',
              },
              {
                name: ' sysBoost',
                detail: [
                  ' sysBoost是一个针对CPU微架构的程序优化工具，能够帮助用户无感提升业务性能。该工具使用了包括二进制合并，布局优化，汇编指令优化，内存大页等多项技术。',
                ],
                link: 'https://gitee.com/openeuler/sysboost',
              },
            ],
          },
          {
            title: '高质量开发与运营',
            address: '',
            awardList: [
              {
                name: 'Gala-ragdoll',
                detail: [
                  'Gala-ragdoll是基于OS的配置托管服务，能够实现对OS配置的集群式管理，屏蔽不同OS类型的配置差异，实现统一的、可溯源的、预期配置可管理的可信的OS配置运维入口。',
                ],
                link: 'https://gitee.com/openeuler/gala-ragdoll',
              },
              {
                name: 'Gazelle',
                detail: [
                  'Gazelle作为一款高性能用户态协议栈，通过零修改、零拷贝、无锁的加速技术，专注数据库、分布式存储、低时延等场景的网络I/O加速。在23年在证券交易、云盘场景分别获得了62.5%的时延优化，15%的IPOS优化成果。目前该项目已在电信、金融多个行业客户应用落地。',
                ],
                link: 'https://gitee.com/openeuler/gazelle',
              },
              {
                name: 'CVE-ease',
                detail: ['天翼云原创的多源CVE信息数据抓取、清洗、合并工具。'],
                link: 'https://gitee.com/openeuler/cve-ease',
              },
            ],
          },
          {
            title: '新项目',
            address: '',
            awardList: [
              {
                name: 'env_check',
                detail: [
                  '由中国移动云能力中心主导研发，它是一款在操作系统迁移后对操作系统进行全面检查的工具，用户可以通过检查报告来确认系统环境的健康状况，以确保操作系统在迁移后的使用过程中不会出现潜在的问题。',
                ],
                link: 'https://gitee.com/openeuler/env_check',
              },
              {
                name: 'CTinspector',
                detail: ['天翼云原创的ebpf多结点链式巡检工具。'],
                link: '',
              },
              {
                name: 'CPM4OSSP-UI',
                detail: [
                  '该项目的主要目标是提供一个功能齐全、高效、易用的界面，使用户能够通过浏览器访问和操作CPM4OSSP系统的各种功能、服务和数据。',
                ],
                link: 'https://gitee.com/openeuler/CTinspector',
              },
              {
                name: 'safeguard',
                detail: [
                  '针对操作系统、内核安全，safeguard是一个基于eBPF的Linux安全防护系统，可以实现安全操作的拦截及审计记录。',
                ],
                link: 'https://gitee.com/openeuler/safeguard',
              },
            ],
          },
        ],
      ],
    ]),
  },
  notice:
    '注：根据openEuler社区评奖规则，依据2021年12月1日 ~ 2022年11月30日的贡献进行评选，且展示不分先后顺序。',
  notice2023:
    '注：根据openEuler社区评奖规则，依据2022年12月1日 ~ 2023年11月30日的贡献进行评选，且展示不分先后顺序。',
};

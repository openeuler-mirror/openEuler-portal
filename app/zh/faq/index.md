---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<div class="markdown">

# openEuler 常见问题

## 通用

### 1. openEuler 是什么？

OpenAtom openEuler（简称“openEuler”）是开放原子开源基金会孵化及运营的开源项目。

作为面向数字基础设施的开源操作系统，openEuler支持服务器、云计算、边缘计算、嵌入式等应用场景，支持多样性计算，致力于提供安全、稳定、易用的操作系统。通过为应用提供确定性保障能力，支持OT领域应用及OT与ICT的融合。

### 2. openEuler社区是怎么样的？

2019年12月31日，面向多样性计算的操作系统开源社区openEuler正式成立。

openEuler社区致力于与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系，孵化支持多种处理器架构、覆盖数字基础设施全场景，推动企业数字基础设施软硬件、应用生态繁荣发展。

openEuler社区和上下游生态紧密连接，构建多样性的社区合作伙伴和协作模式，共同推进版本演进。

### 3. openEuler支持哪些架构？

openEuler社区当前已与多个设备厂商建立丰富的生态，包括Intel、AMD、兆芯、海光、鲲鹏、飞鹏、龙芯、申威等主流芯片厂商，支持x86、Arm、SW64、RISC-V、LoongArch等多种处理器架构，逐步扩展PowerPC 等更多芯片架构；支持多款CPU芯片，包括龙芯3号、兆芯开先和开胜系列、Intel Sierra Forest和Granite Rapids、AMD EPYC Milan和Genoa等芯片系列；支持多个硬件厂商发布的多款整机型号、板卡型号，支持网卡、RAID、FC、GPU&AI、DPU、SSD、安全卡七种类型的板卡，具备良好的兼容性。

### 4. openEuler多久发布一次新版本？

openEuler发布两种社区版本，包括长期支持版本（即“LTS版本”）和创新版本。

LTS版本每两年发布一版，提供四年社区支持，包括两年的维护支持和两年的延长支持。LTS版本为企业级用户提供一个安全稳定可靠的操作系统。

创新版每六个月发布一版，提供六个月社区支持。创新版本快速集成openEuler的最新技术成果，将验证成熟的特性逐步回合到发行版中。这些新特性以单个开源项目的方式存在于社区，方便开发者获得源代码，也方便用户使用。

在单个版本生命周期结束前，用户会提前三个月在社区[邮件列表](https://www.openeuler.org/zh/community/mailing-list/)中收到公告等通知。

### 5. openEuler有哪些SIG组？要如何加入？

目前openEuler社区共有超100个SIG组（special interest group），分别针对特定的技术主题或项目成立。每个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个仓库，SIG的交付成果会保存在这些仓库内。SIG成员可以在仓库内提交Issue、解决问题、参与评审等，推动交付成果成为openEuler社区发行的一部分。

openEuler的SIG分为代码仓管理和社区运营治理两种类型，致力于推动工具链、架构、桌面、通用中间件、云原生基础设施等领域的技术创新，覆盖了AI、嵌入式、安全和合规等热门主题，助力openEuler社区生态构建。

您可以通过订阅SIG邮件、参加公开例会或直接联系SIG maintainer，加入心仪的SIG。SIG全景图请见[SIG中心]( https://www.openeuler.org/zh/sig/sig-list/)。

如果现有的SIG中没有您感兴趣的，您可以在openEuler社区中寻找两到三个具有共同目标的人讨论决定成立SIG组，维护社区中的某个技术方向的软件包或发起孵化项目。具体如何成立SIG，请见[申请流程](https://www.openeuler.org/zh/sig/sig-guidance/)。

### 6. 如何贡献openEuler社区？

openEuler社区欢迎代码类贡献和非代码类贡献。您可以按照以下步骤进行社区贡献：

1. 在参与社区贡献之前，您需要根据自身身份（个人、员工、或企业），签署对应的[贡献者许可协议](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)，即“CLA协议”。
2. 在[SIG中心](https://www.openeuler.org/zh/sig/sig-list/)，找到您感兴趣的SIG并加入。如果您对某个方向有浓厚的兴趣，且未找到对应的SIG组，那么您可以参考[SIG组申请流程]( https://www.openeuler.org/zh/sig/sig-guidance/)来申请创建新的SIG进行维护和发展。
3. 贡献原创开源项目、进行代码类贡献和非代码类贡献。
openEuler社区有两类代码仓库，包括存放源码类项目的[代码仓](https://gitee.com/openeuler)和存放制作发布件所需的[软件包仓](https://gitee.com/src-openeuler)。
   - 可以直接在代码仓中创建原创项目，或者将您在其他社区开发的软件包加入到软件包仓。具体操作，请参考[新增代码包](https://gitee.com/openeuler/community/blob/master/zh/contributors/create-package.md)。
   - 可以使用Gitee、GitHub或邮箱账号登录官网的[QuickIssue](https://quickissue.openeuler.org/zh/issues/)页面，快速提交issue。
   - 如果您对非代码贡献感兴趣，也可以在[非代码贡献指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/non-code-contributions.md)中找到合适的项目。
5. 参加社区活动：openEuler社区举办多种线上线下活动，包括主题峰会、社媒直播、meetup、SIG活动等，期待您的加入。

想要了解更多openEuler社区贡献途径，请访问[贡献攻略]( https://www.openeuler.org/zh/community/contribution/detail.html)。

### 7. 从哪些渠道可以获取openEuler的最新资讯？可以在哪些平台和其他openEuler用户交流？

您可以通过以下方式获取openEuler的最新资讯和进行互动交流：

- 官方网站：通过浏览openEuler官方网站，获取文档、白皮书和用户案例等相关信息。
- 课程中心：探索我们的[在线课程](https://www.openeuler.org/zh/learn/mooc/)，深入了解openEuler的技术细节。
- 社交媒体：关注我们的社交媒体账号，如openEuler微信公众号、B站、头条号等，获取开源行业和操作系统行业相关的最新事件、合作关系以及技术解决方案的最新资讯。
- 邮件列表：订阅我们的[邮件列表](https://www.openeuler.org/zh/community/mailing-list/)，获取openEuler各个SIG的最新动态。
- 官方论坛：访问[openEuler论坛](https://forum.openeuler.org/)或通过添加openEuler小助手（微信号：openeuler123）微信好友加入社区交流群，进行提问和参与讨论。

openEuler社区欢迎您的加入，期待您能在社区中提升技能、结交朋友！

### 8. openEuler社区有哪些合作伙伴？应用于哪些行业？

openEuler目前已广泛应用于各行各业，包括政务、金融、运营商、互联网、电力、制造业、能源、教育、交通和医疗等行业。

openEuler 希望与广大生态伙伴、用户、开发者一起，通过联合创新、社区共建，不断增强场景化能力，最终实现统一操作系统支持多设备，应用一次开发覆盖全场景。

### 9. openEuler的WSL应用场景有？

- 在 Windows 中快速部署和体验 openEuler LTS 版本。
- 利用 vs code 和 openEuler WSL 打造流畅跨平台开发体验。
- 在 openEuler WSL 中搭建 K8S 集群。
- 使用你喜爱的 openEuler command-line 程序或脚本处理 Windows 或 WSL 中的文件和程序。

### 10. openEuler中的HMDFS是什么 ？

HMDFS 是从 OH 社区迁移而来的在软总线生态之上的一个分布式文件系统，  其在分布式软总线动态组网的基础上，  为网络上各个设备结点提供一个全局一致的访问视图，支持开发者通过基础文件系统接口进行读写访问，具有高性能、低延时等优点。

### 11.openEuler中的SysCare软件是什么？

SysCare 是一个系统级热修复软件，为操作系统提供安全补丁和系统错误热修复能力，主机无需重新启动即可修复该 系统问题。 SysCare 将内核态热补丁技术与用户态热补丁技术进行融合统一，用户仅需聚焦在自己核心业务中，系统修复 问题交予 SysCare 进行处理。后期计划根据修复组件的不同，提供系统热升级技术，进一步解放运维用户提升运维效率。

### 12. 什么是A-Ops？

A-Ops 是一款基于操作系统维度的故障运维平台，提供从数据采集，健康巡检，故障诊断，故障修复的到智能运维解决方案。A-Ops 项目包括了若干子项目：覆盖故障发现（Gala），故障定位支撑（X-diagnosis），缺陷修复（Apollo）等。

### 13. secGear 主要提供哪三大能力？

- 架构兼容：屏蔽不同 SDK 接口差异，提供统一开发接口，实现不同架构共源码。
- 易开发：提供开发工具、通用安全组件等，帮助用户聚焦业务，开发效率显著提升。
- 高性能：提供零切换特性，在 REE-TEE 频繁交互、大数据交互等典型场景下提升 REE-TEE 交互性能 10 倍 +。

### 14. AI for OS 安全主要有哪些技术？

1.漏洞挖掘：自动化漏洞挖掘是当前操作系统安全研究的热点，无论是基于代码分析的，还是模糊测试的，亦或两者结合的漏洞挖掘技术，都可以有效地识别出当前系统中存在的缺陷。传统的模糊测试工具在种子生成、选择、 变异、测试、评估、反馈等多个环节都存在一定的盲目性和随机性，代码分析技术，无论是源码级，还是二进制级或者特定拓展成 DSL(Domain-  Specific Language)  的 IR(Intermediate Representation) 级，都十分依赖基于专家经验构建的缺陷模式库。结合人工智能技术，可以很好地挖掘缺陷代码数据集中的模式信息，从而指导模糊测试和代码分析技术的各个过程，有效地提升识别精度和效率。

2.入侵检测：以 APT 威胁为代表的现代安全问题持续出现且变幻莫测，攻击组织会使用一整套大型的攻击武器库，对目标系统进行自动化、持续的攻击尝试和自反馈，并且基于固定模式的安全防御技术难以抵御未知的威胁。因此，我们需要结合人工智能技术，自动化深度挖掘其中的关键特征，支持多种高维数据的联合特征提取。这在当前大数据时代是必须具备的能力，但是对于个人来说却又是困难的。另外，结合人工智能技术可以更有效地识别出系统中 的异常行为或者状态，从而更准确、更及时地进行攻击阻断。比如，在异常流 量检测、侧信道攻击检测领域中，通过结合人工智能技术的入侵检测技术，都取得了很好的效果。

### 15. openEuler 提供的多级调度框架有什么优势？

openEuler 提供了多级调度框架，实现多种调度模型共存，业务可根据需要进行调度模型的选择。

- 相比于传统的进程/线程调度模型更为灵活，可移植性更好。
- 新增的协程等轻量级调度模型切换更快，调度时间占比更小。

### 16. 根据openEuler操作系统安全机制的作用范围，可将这些安全机制分为哪三种类型？

真实性保护、完整性保护和机密性保护三种类型。

### 17. 工业安全领域openEuler系统运用的安全隔离技术主要有哪两种范式？

- 隔离已知来源但可能存在漏洞的服务，以削减其受到攻击后对系统其他组成部分造成的危害。
- 限制不受信任来源的代码(可能是恶意代码或存在漏洞的组件)可能对系统其他组成部分造成的危害。

### 18. openEuler操作系统噪声是指什么？

操作系统噪声是指业务运行中执行的非应用计算任务，包括：

1.系统/用户态守护进程。

2.中断处理。

3.用户态或内核中驻留的进程。

4.内存管理、调度开销。

5.业务应用中的非计算任务，如监控 log 线程通信等。

6.资源竞争带来的噪声，如由共享高速缓存导致的高速缓存不命中 (Cache Miss), 以及由共享物理内存导致的页面错误 (Page Fault)。

### 19. openEuler常用repo源 

为了方便大家快速找到openEuler所需版本的repo源，现将openEuler各版本的repo源进行了整理并归类，详情可查看：[https://forum.openeuler.org/t/topic/768](https://forum.openeuler.org/t/topic/768)

### 20. 安装openEuler时选择第二盘位为安装目标，操作系统无法启动

原因分析：当安装系统到第二块磁盘时，MBR和GRUB会默认安装到第二块磁盘sdb。这样会有下面两种情况：

1. 如果第一块磁盘中有完整系统，则加载第一块磁盘中的系统启动。
2. 如果第一块磁盘中没有完好的操作系统，则会导致硬盘启动失败。

具体解决方案请参考文档[安装指南中的常见问题1](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%981%E5%AE%89%E8%A3%85openeuler%E6%97%B6%E9%80%89%E6%8B%A9%E7%AC%AC%E4%BA%8C%E7%9B%98%E4%BD%8D%E4%B8%BA%E5%AE%89%E8%A3%85%E7%9B%AE%E6%A0%87%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E6%97%A0%E6%B3%95%E5%90%AF%E5%8A%A8)

### 21. openEuler开机后进入emergency模式

操作系统文件系统损坏导致磁盘挂载失败、或io压力过大导致磁盘挂载超时（超时时间为90秒）、系统异常掉电、物理磁盘io性能低等情况都可能导致该问题的出现。

具体解决方式请参考文档[安装指南中的常见问题2](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%982openeuler%E5%BC%80%E6%9C%BA%E5%90%8E%E8%BF%9B%E5%85%A5emergency%E6%A8%A1%E5%BC%8F)

### 22. 系统中存在无法激活的逻辑卷组时，重装系统失败

由于磁盘故障，系统中存在无法激活的逻辑卷组，重装系统出现异常，需在重装前将逻辑卷组恢复到正常状态或者清除这些逻辑卷组。

具体操作请参考文档[安装指南中的常见问题3](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%983%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%AD%98%E5%9C%A8%E6%97%A0%E6%B3%95%E6%BF%80%E6%B4%BB%E7%9A%84%E9%80%BB%E8%BE%91%E5%8D%B7%E7%BB%84%E6%97%B6%E9%87%8D%E8%A3%85%E7%B3%BB%E7%BB%9F%E5%A4%B1%E8%B4%A5)

### 23. 选择安装源出现异常

选择安装源后出现："Error checking software selection"。这种现象是由于安装源中的软件包依赖存在问题，需要检查安装源是否存在异常，根据检查结果使用新的安装源。

### 24. 如何手动开启kdump服务

执行systemctl status kdump命令，提示无预留内存。这是因为kdump服务需要系统预留一段内存用于运行kdump内核，而当前系统没有为kdump服务预留内存，所以无法运行kdump服务。

具体解决方式请参考文档[安装指南中的常见问题5](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%985%E5%A6%82%E4%BD%95%E6%89%8B%E5%8A%A8%E5%BC%80%E5%90%AFkdump%E6%9C%8D%E5%8A%A1)

### 25. 多块磁盘组成逻辑卷安装系统后，再次安装不能只选其中一块磁盘

因为多块磁盘组成逻辑卷相当于一个整体，所以只需要删除对应的卷组即可。

具体操作请参考文档[安装指南中的常见问题6](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%986%E5%A4%9A%E5%9D%97%E7%A3%81%E7%9B%98%E7%BB%84%E6%88%90%E9%80%BB%E8%BE%91%E5%8D%B7%E5%AE%89%E8%A3%85%E7%B3%BB%E7%BB%9F%E5%90%8E%E5%86%8D%E6%AC%A1%E5%AE%89%E8%A3%85%E4%B8%8D%E8%83%BD%E5%8F%AA%E9%80%89%E5%85%B6%E4%B8%AD%E4%B8%80%E5%9D%97%E7%A3%81%E7%9B%98)

### 26. x86物理机UEFI模式由于security boot安全选项问题无法安装

x86物理机安装系统时，由于设置了BIOS选项security boot 为enable（默认是disable），导致系统一直停留在“No bootable device”提示界面。原因在与开启security boot后，主板会验证引导程序及操作系统 ，若没有用对应的私钥进行签名，则无法通过主板上内置公钥的认证。

具体解决方式请参考文档[安装指南中的常见问题7](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%987x86%E7%89%A9%E7%90%86%E6%9C%BAuefi%E6%A8%A1%E5%BC%8F%E7%94%B1%E4%BA%8Esecurity-boot%E5%AE%89%E5%85%A8%E9%80%89%E9%A1%B9%E9%97%AE%E9%A2%98%E6%97%A0%E6%B3%95%E5%AE%89%E8%A3%85)

### 27. 安装openEuler时，软件选择页面选择“服务器-性能工具”，安装后messages日志有pmie_check报错信息

安装系统时软件选择勾选服务器-性能工具，会安装pcp相关软件包，正常安装并重启后，/var/log/messages日志文件中会产生报错：pmie_check failed in /usr/share/pcp/lib/pmie。

具体原因与解决方式请参考文档[安装指南中的常见问题8](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%988%E5%AE%89%E8%A3%85openeuler%E6%97%B6%E8%BD%AF%E4%BB%B6%E9%80%89%E6%8B%A9%E9%A1%B5%E9%9D%A2%E9%80%89%E6%8B%A9%E6%9C%8D%E5%8A%A1%E5%99%A8-%E6%80%A7%E8%83%BD%E5%B7%A5%E5%85%B7%E5%AE%89%E8%A3%85%E5%90%8Emessages%E6%97%A5%E5%BF%97%E6%9C%89pmie_check%E6%8A%A5%E9%94%99%E4%BF%A1%E6%81%AF)

### 28. 在两块已经安装了系统的磁盘上进行重复选择，并自定义分区时，安装失败

直接选择目标磁盘进行自定义分区，请勿频繁取消操作，如果一定要进行取消重选，建议重新安装。参考[issue链接](https://gitee.com/src-openeuler/anaconda/issues/I29P84?from=project-issue)

### 29. 安装LSI MegaRAID卡的物理机kdump无法生成vmcore

在物理机etc/sysconfig/kdump文件中将second kernel默认启动参数reset_devices删除，可以规避second kernel启动过程中由于MegaRAID卡驱动复位设备所致IO请求未完成问题，以成功生成vmcore。

详情请参考文档[安装指南中的常见问题10](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%9810%E5%AE%89%E8%A3%85lsi-megaraid%E5%8D%A1%E7%9A%84%E7%89%A9%E7%90%86%E6%9C%BAkdump%E6%97%A0%E6%B3%95%E7%94%9F%E6%88%90vmcore)

### 30. 树莓派启动失败

刷写 openEuler 发布的树莓派镜像后，树莓派启动失败，可以尝试将完整的镜像重新刷写入 SD 卡。

详情请参考文档[安装在树莓派的常见问题1](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95-1.html#%E9%97%AE%E9%A2%981%E6%A0%91%E8%8E%93%E6%B4%BE%E5%90%AF%E5%8A%A8%E5%A4%B1%E8%B4%A5)

### 31. nmcli 命令连接 WIFI 失败

执行 nmcli dev wifi connect SSID password PWD 命令连接 WIFI 失败。原因在与执行的命令缺少密码。注意，如果密码中包含特殊字符，需要使用单引号将密码括起来。如果使用 nmcli 命令行连接 WIFI 失败，建议使用 nmtui 字符界面进行连接。

具体操作步骤请参考文档[安装在树莓派的常见问题2](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95-1.html#%E9%97%AE%E9%A2%982nmcli-%E5%91%BD%E4%BB%A4%E8%BF%9E%E6%8E%A5-wifi-%E5%A4%B1%E8%B4%A5)

### 32. tensorflow包及相关包安装失败

tensorflow的依赖包暂时未升级至适配tensorflow==2.12.1的版本，因此需要通过pip手动安装其依赖软件。

具体解决步骤请参考文档[安装在树莓派的常见问题3](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Installation/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95-1.html#%E9%97%AE%E9%A2%983tensorflow%E5%8C%85%E5%8F%8A%E7%9B%B8%E5%85%B3%E5%8C%85%E5%AE%89%E8%A3%85%E5%A4%B1%E8%B4%A5)

<p style="margin-top:32px">

如常见问题内未能解决您的需求，请邮件至社区[邮件列表](/zh/community/mailing-list/)或[社区论坛](https://forum.openeuler.org/)交流

</p>

</div>
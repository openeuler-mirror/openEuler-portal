---
title: 从 openEuler 兼容性测试看 RISC-V 软件生态协同缺口
category: blog 
date: 2026-03-23
tags:
    - openEuler
    - RISC-V 
archives: 2026-03-23
author:  openEuler
summary: 从 openEuler 兼容性测试的视角看，RISC-V 当前面临的已经不是简单的移植问题，也不是若干单点驱动缺失问题，而是平台能否被通用 Linux 稳定承接。
---

近期，OpenAtom openEuler （简称“openEuler”或“开源欧拉”）24.03 LTS SP3 RVA23 版本正式发布[1]。作为首个支持 RVA23、并初步支持 RISC-V Server Platform 的长周期维护版本，它意味着 RISC-V 正在从“能跑 Linux 系统”走向“标准化服务器平台”，也为 2026 年起逐步出现的 RISC-V 服务器/数据中心硬件提供了通用系统底座。

然而，要真正成为受 openEuler 认可的标准化服务器平台，绕不开社区现有的兼容性测试体系。笔者曾在 2025 年中国峰会 CSC Member's Day 上分析过 openEuler on RISC-V 兼容性测试现状[2]；即便此后生态有所推进，在符合标准服务器规范的 RISC-V 整机尚未大规模出现之前，核心论点依然有效：真正的问题是当一套面向成熟服务器生态构建的兼容性测试体系，应用到仍在快速演进的新平台时，测试结果把原本在成熟平台中被默认成立的底层前提与环境假设，逐一暴露成了可检测的问题。

## openEuler 在测什么

openEuler 社区已经形成一套硬件兼容性技术测评体系[3]，其对象覆盖发行版、商用软件、整机和板卡；其中，与 RISC-V 硬件厂商最直接相关的是 IHV 测评。

IHV 测评的核心工具是 oec-hardware。从社区文档和工具定位看，它主要面向通用基本功能兼容性验证，不承担性能评估，也不深入覆盖特定架构的平台语义。它默认站在较成熟的服务器基线上，例如完整整机环境、典型网卡和 RAID 卡配置，以及 ACPI、电源管理、系统完整性、NIC、RAID、NVMe、watchdog、IPMI 等服务器能力。

换言之，这套测评体系的出发点是验证一套已经进入成熟服务器生态的硬件平台，是否满足既有兼容性基线。

## 问题不在“没有规范”，而在“没有闭环”

过去几年里，RISC-V 在服务器方向的规范推进很快：BRS 提出了面向单一通用 OS 镜像的软件前提，Server SoC 给出了服务器 SoC 的基础能力约束，Server Platform 也在持续收敛服务器平台侧的能力定义[4]。这说明，RISC-V 已经不再只是开发板 bring-up 问题，而是在进入通用 OS 和服务器平台语境。

但与此同时，像 BRS 测试规范大量条目仍是 FIXME[5]，Server Platform 测试说明也明确表示，目前很多测试多数只检查 feature existence，并不做穷尽验证[6]。这意味着问题不是“没有规范”，而是规范、实现与测试套件之间还没有形成闭环，那么厂商的实现就是在摸着石头过河；因此，一旦进入 OS 兼容性测试，许多成熟服务器生态中的默认前提就有可能不再成立。

为了说明这一点，下面只选三个最典型的例子：时间基线、频率控制和扩展生态。

### 例子一：表面是 RTC，实际测到的是 runtime timekeeping

在现有测试中，Clock 相关检查通常是读取 /dev/rtc，等待一段固定时间后再次读取，再用两次读数的差值与 sleep 时间比较，判断系统时间是否准确。这个方法可以作为粗粒度检查，但它只能说明“时间有没有跑偏”，并不能说明问题就出在 RTC。

对 Linux 来说，运行时的基础时间线并不是由 RTC 直接提供的，而是由 clocksource 等内核时间基础设施维持。放到 RISC-V 上，这意味着时基频率描述、timer event 编程路径、SBI 实现和相关驱动假设，只要有一环不一致，都可能表现为“时钟不准”。同时，RISC-V 底层的平台 timer 建模也在持续迭代：以 SG2042 为例，Linux 6.7.2 稳定版已收录 thead,c900-aclint-mtimer 的相关修正[7]，说明 timer/IPI 设施的寄存器布局与描述方式本身也会影响整体计时可靠性。

当前国内发行版社区的主要维护基线仍是 6.6，因此国内厂商和 OS 社区更需要关注这些上游演化路径。而对 RISC-V 平台而言，Clock 测试不应被简单理解为“RTC 测试”，而应至少拆成三层：RTC 设备本身的正确性、runtime timekeeping 的正确性，以及频率变化与 timer 路径的交互。

### 例子二：表面是 cpufreq 支持，实际测到的是 DVFS 整个链路

cpufreq 是另一个典型例子。对成熟架构来说，测试往往默认“只要驱动存在、接口可见，剩下主要是调优问题”；但在当前 RISC-V 平台上，这个前提并不总成立。以 Pioneer 测试为例，由于平台侧驱动尚未准备好，相关测试甚至需要在其他平台替代完成；而即便测试通过，实际使用中调频能力仍可能并不稳定。

cpufreq 本身并不是 RISC-V 独有的难题。Linux 官方文档并没有承诺 scaling_cur_freq 等同于硬件此刻真实运行频率[8]；而在部分 RISC-V 平台上，这一语义边界还会进一步放大为平台协同问题。以 TH1520 为例，2026 年正在推进的上游 patch 系列仍在补齐 CPU frequency scaling 支撑[9]，其中 OPP table 与 CPU clock 相关改动甚至被明确标记为 “Not For Upstream” “only for testing”。这说明问题并不只是“有没有 cpufreq 节点”，而是整条 DVFS 路径是否已经进入 Linux 可验证、可稳定复现的状态。

目前面向 ACPI 平台的 CPPC 支持也已在上游推进[10]，至少说明性能控制这件事并不是没有标准化方向；真正还缺的，是围绕这条路径建立起 OS 侧可验证、可复现的测试方法。

### 例子三：表面是 RAID 测试失败，实际上暴露的是服务器扩展能力

AID 相关失败项很容易被理解成“某张 RAID 卡不兼容”。但在成熟服务器平台里，真正决定一张扩展卡能否被通用 OS 稳定消费的，往往不是卡本身有没有最基础的驱动，而是它背后整条运行时互操作链路是否成立：

- PCIe 枚举与资源分配是否正常；

- 中断路由与 MSI/MSI-X 是否可用；

- IOMMU 与 DMA 路径是否成立；

- 错误上报与恢复机制是否具备；

- 驱动、管理工具与监控链路是否可接入。

换句话说，测试对象不应只是“某一类外设”，而应是“平台是否具备承接服务器扩展生态的运行时能力”。否则，测试就很容易停留在“某类卡能不能工作”的结果层。

## CSC/ACT很重要，但不能替代OS兼容性测试

为了弥补规范与测试之间的差距，RISC-V 认证委员会 CSC[11] 正在推进一整套合规与认证体系。其公开结构已经包括 Requirements WG、Test Plan WG 以及面向认证计划运作的 RVCP Operations。Requirements WG 主要定义证书需求与 CRD/MRD，Test Plan WG 则负责与 TSC 协作，从规范中提取可验证规则，并定义测试过程与覆盖点。

一个自然的问题是：既然 RISC-V 已经在推进 CSC、ACT、RISCOF 等测试与认证体系，为什么还要单独强调发行版侧的兼容性测试？原因在于，两者解决的问题并不在同一层。

CSC 主要解决的是，如何围绕 RISC-V 规范、证书需求、测试计划与认证运作建立基础合规与认证体系；而 openEuler 这类发行版兼容性测试要回答的，则是这个平台能否作为通用 OS/服务器平台稳定运行，并接入真实固件、外设与管理面生态。

在 2024 年 RISC-V 中国峰会上，来自国内场景的需求已经把 Boot up requirements、Certified Server Platform 这些内容带入 CSC 的认证议题范围[12]。这说明，OS/Platform 层验证需求至少已经进入了 RISC-V 认证体系的讨论框架；但从 CSC 后续公开工作重心看，相关投入仍主要集中在证书定义、测试计划、覆盖点和认证运作机制上，OS 兼容性与系统级互操作验证仍缺少一套公开闭环。

## 今天真正需要推进的是什么

如果把这些问题收束起来，今天 RISC-V 最需要推进的，并不是再增加若干零散适配，而是建立一套分层的 Linux 互操作验证体系。它的核心任务，是把平台前提、Linux 运行时和服务器生态拓展这三层问题分开验证、分开归因。

**第一层，是固件与启动前提层。** 这里要回答的不是“系统能不能偶然启动一次”，而是平台是否已经进入可被通用 OS 正确承接的 profile。例如，BRS-I 所强调的单一通用镜像前提是否成立，UEFI、SBI、ACPI、SMBIOS、RIMT 以及 early boot 阶段的关键可见性是否具备。RISC-V Server Platform 当前公开文本中的 FIRM_090 和 FIRM_100 也属于这一层更偏 firmware/pre-boot 的兼容性要求[13]。这类问题不属于“最终发行版安装测试”能顺手覆盖的范围，需要在更前置的阶段统一验证。

**第二层，是 Linux 运行时互操作层。** 这是 RISC-V 真正从“能启动 Linux”走向“能稳定运行 Linux”的关键层。这里关注的不是驱动是否存在，而是硬件能力能否在 Linux 语义下被正确观察、正确归因、稳定复现；Clock/timekeeping、cpufreq、IOMMU、PCIe、watchdog、功耗状态切换等问题都属于这一层。

**第三层，是服务器管理面与扩展生态层。** 这里要验证的是，平台能否进入现实服务器运维和扩展生态：UART、BMC、watchdog、传感器、事件日志、远程控制，以及 IPMI、Redfish、MCTP、PLDM 等链路是否成立，以及 PCIe、NVMe、RAID/HBA、NIC 等扩展设备所依赖的枚举、资源分配、中断、IOMMU、错误恢复、驱动和管理工具链是否能够共同成立。

在这些基础能力之外，RISC-V 服务器平台还会逐步面对 RAS 与 QoS 这类更高阶的平台议题。它们今天未必都已进入发行版兼容性测试的核心清单，但从成熟服务器平台的视角看，迟早都需要被操作系统识别、消费并纳入验证范围。

最后，还需要补上一层性能合理性分析。对这些新兴服务器平台来说，“功能存在”并不等于“实现兑现了承诺”。timer 精度、cpufreq 调节有效性、IOMMU 开销、PCIe/NVMe 的合理性能区间，最终都要成为正式的平台质量问题。

>中国科学院软件研究所即将推出一款面向 RISC-V 生态验证的滚动发行版 openRuyi。如果说 openEuler 这类成熟发行版承担的是最终可交付的兼容性验证，那么 RISC-V 当前还需要一个前置参考平台，去承担生态标准演进阶段的验证前移工作：把正在标准化的平台语义、固件接口和 Linux 互操作问题尽量提前暴露、提前归因、提前修正。其关键在于，面对这种通用能力测试，靠每家厂商自己去推动，是容易产生共识错位的，要么在社区推不动，要么之后花费巨大代价弥补共识问题。openRuyi 所期望实现的价值正在于此：帮助厂商更早发现问题、更快落地实现、减少维护成本，并促进共识达成，缩短进入主流 OS 兼容体系的周期。

## 结语

从 openEuler 兼容性测试的视角看，RISC-V 当前面临的已经不是简单的移植问题，也不是若干单点驱动缺失问题，而是平台能否被通用 Linux 稳定承接。

对 RISC-V 而言，兼容性测试的意义，不只是发现若干未完成的接口或驱动，而是在持续暴露和收敛平台软件契约：哪些前提已经具备，哪些实现还不稳定，哪些测试还不能准确归因，哪些生态链路还没有真正接入。因此，兼容性测试不是生态成熟之后的验收环节，而正是推动 RISC-V 进入主流操作系统体系的过程本身。

## 联系我们

对 OERV 工作感兴趣的伙伴们可以加入到 openEuler RISC-V 社区开发群，获取更多即时信息。中国科学院软件研究所智能软件研究中心 OERV 团队长期招收全职/兼职/实习生，欢迎投递简历至邮箱 wangjingwei@iscas.ac.cn

## 相关链接

[1] openEuler 24.03 LTS SP3 RVA23 -- 由中国科学院软件研究所智能软件研究中心和相关 RISC-V厂商主导发布：<https://mp.weixin.qq.com/s/hTXR6pMpjCV36eCowCK_mQ>

[2] openEuler 硬件兼容性测试与 RISC-V 适配介绍：<https://openruyi.feishu.cn/wiki/SobywCrOAidjSikiuBzc82aDngG>

[3] openEuler 硬件兼容性测试体系：<https://www.openeuler.org/en/compatibility/hardware/>

[4] RISC-V Server Platform 规范收敛进展：<https://lists.riscv.org/g/tech-server-platform/message/212>

[5] BRS 测试规范：<https://github.com/riscv-non-isa/riscv-brs/blob/main/brs_tests.adoc>

[6] RISC-V Server Platform 测试规范简介：<https://github.com/riscv-non-isa/riscv-server-platform/blob/main/server_platform_ts_intro.adoc>

[7] SG2042 平台 timer/ACLINT 修正 (Linux 6.7.2): <https://www.kernel.org/pub/linux/kernel/v6.x/ChangeLog-6.7.2>

[8] Linux CPU Frequency Scaling 文档：<https://docs.kernel.org/admin-guide/pm/cpufreq.html>

[9] TH1520 CPU 频率调节补丁系列：<https://lore.kernel.org/linux-riscv/20251120131416.26236-1-ziyao@disroot.org/>

[10] ACPI 平台 CPPC 支持补丁系列：<https://lore.kernel.org/linux-riscv/20250515094301.40016-1-cuiyunhui@bytedance.com/>

[11] RISC-V 认证委员会 (CSC) 概览：<https://riscv.atlassian.net/wiki/spaces/CSC>

[12] 2024 RISC-V 中国峰会 CSC 认证议题：<https://docs.google.com/presentation/d/1_8hFCXaREaBKd93zM2vV-UDDkUQLJjIJ/edit?slide=id.p1#slide=id.p1>

[13] RISC-V Server Platform 硬件规则：<https://github.com/riscv-non-isa/riscv-server-platform/blob/main/server_platform_requirements.adoc>


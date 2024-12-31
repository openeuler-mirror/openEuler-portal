---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<div class="markdown">

# openEuler 常见问题

## 迁移

### 1. 迁移过程中可能需要用到的网站链接

- [openEuler迁移专区](https://www.openeuler.org/zh/migration/)
- [x2openEuler官方文档](https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/x2openEuler/Introduction.html)
- [x2openEuler工具下载](https://repo.oepkgs.net/openEuler/rpm/openEuler-22.03-LTS/contrib/x2openEuler/noarch/Packages/)
- x2openEuler需要用到的openEuler的源 [https://forum.openeuler.org/t/topic/768](https://forum.openeuler.org/t/topic/768)
- [x2openEuler迁移学习](https://hiss.shixizhi.huawei.com/center/privateCenter.htm?schoolId=1643780836745113602&type=studyCenter_LearningTask&sxz-lang=zh_CN&mapDetail=3&mapDetailId=1663089385654558721&freedomMapClickItemId=1681185900091936769&freedomMapClickItemId=1686217461215608834)

### 2. 为什么在同样分配的物理内存下，openEuler 显示的可用内存比 CentOS 少？

这个问题是由于两个操作系统在分配给 crashkernel（内核崩溃时使用的内存区域）的内存大小不同导致的。在实验中，给两个操作系统都分配了 4G 的内存，但是 CentOS 可用内存为 3.7G，而 openEuler 可用内存只有 3.3G。通过查看系统的 dmesg 日志，发现在 CentOS 中为 crashkernel 预留的内存是 161MB，而在 openEuler 中预留的内存是 512MB。将 openEuler 的 crashkernel 内存预留修改为 256MB 后，可用内存与 CentOS 相同，从而证明了是由于 crashkernel 的内存预留差异导致的可用内存差异。

解决方法：在 openEuler 的 grub 配置文件（/boot/grub2/grub.cfg）中将 crashkernel 的预留内存从 512MB 修改为 256MB，可以解决这个问题。

### 3. 如果在迁移软件包时遇到宏无法解析的问题，该如何解决？

这通常发生在从CentOS或Fedora迁移到其他系统时，因为不同系统的宏定义可能不同。解决方法有两种：一是查询宏的具体含义，并在spec文件中用其实际值替换宏；二是将提供宏定义的macros软件包引入到仓库中，并在BuildRequires中添加，以确保宏能够正确解析。

### 4. 在进行CentOS到openEuler的操作系统迁移时，为什么需要考虑硬件兼容性检测？

硬件兼容性检测在CentOS到openEuler的迁移中至关重要，因为这不仅涉及到操作系统的更换，还包括对操作系统上运行的应用软件和业务系统的替代、适配、迁移和重构。确保硬件兼容性可以保障迁移过程中的系统稳定性和业务的连续性，防止迁移后出现硬件不兼容导致的应用故障或性能下降。

### 5. 如何将SQL Server数据从Windows迁移到openEuler？

首先，在Windows上备份SQL Server数据库。可以使用SQL Server Management Studio (SSMS) 或使用SQL语句的方法进行备份。备份完成后，使用scp或其他方法将备份文件传输到openEuler系统。在openEuler上，创建一个新的备份目录并将备份文件移动到该目录。使用sqlcmd工具，执行SQL语句来还原数据库。如果数据库包含辅助文件，需要在RESTORE DATABASE命令中为这些文件添加MOVE子句。最后，通过列举所有数据库来验证数据迁移是否成功。

### 6. 在从CentOS迁移到openEuler的过程中，需要注意哪些关键问题？

在进行OS迁移时，需注意以下三个关键问题：

1.确定已有软件是否可以在新系统上运行，包括软件的安装与功能是否存在问题。

2.检查硬件与新操作系统的兼容性。

3.评估已有的相关配置是否可以继承到新操作系统。此外，在迁移实施中，需注意可能对现网业务的影响，进行数据备份，并建议按照详细的迁移流程执行，最好由专业人员或操作系统厂家提供技术支持。

### 7. openEuler社区提供的迁移工具x2openEuler具备哪些功能，它是如何应用于迁移评估？

openEuler社区提供的迁移工具x2openEuler主要用于迁移评估，具备以下功能：

1.软件评估：通过扫描依赖的软件包清单信息，对各类应用（如rpm, tar, zip, gzip, jar, py, pyc, sh, bin等）进行评估，并生成HTML格式的评估报告。

2.配置收集与评估：支持收集用户环境数据并生成JSON格式文件，包括硬件配置、配置接口、内核选项配置参数、系统配置参数（sysctl/proc/sys）、环境变量、服务、进程、端口、命令接口、系统调用项和设备驱动接口等信息，并完成配置信息分析评估。

3.硬件评估：评估运行环境的整机和整机板卡（如RAID, NIC, FC, IB, GPU, SSD, TPM等）是否在openEuler的兼容性清单中。这些功能帮助用户在迁移之前识别潜在的兼容性问题，为顺利迁移提供支持。

### 8. 在进行虚拟机热迁移时，应该如何准备环境并检查迁移前的必要条件？

进行虚拟机热迁移前，需要准备两个物理机（源端和目的端）并进行一系列的检查来确保迁移可以顺利进行。这些检查包括：

权限检查：确保当前用户有执行热迁移的权限。

网络检查：检查源端和目的端主机之间的网络是否互通，并保证两个主机在相同网段。

存储资源检查：确认两端是否可以访问相同的存储资源，并确保目的端主机有足够的CPU、内存和存储资源。

CPU资源检查：确认两个主机的CPU资源情况。

内存检查：核实两个主机的内存情况。

存储检查：检查两个主机的存储配置。

虚拟机状态检查：确认被迁移的虚拟机处于运行状态。

此外，可根据需要设置热迁移参数，如最大停机时间和迁移过程中的最大带宽，以及确定存储方式是共享存储还是非共享存储。在非共享存储的情况下，可能还需要进行额外的配置，如通过NFS设置共享存储。

### 9. 什么是虚拟机热迁移，它与虚拟机冷迁移有什么区别？

虚拟机热迁移是一种技术，它允许在不关闭虚拟机的情况下，将整个虚拟机的运行状态（包括内存中的数据和磁盘上的数据）完整地迁移到另一台物理服务器上。这种迁移过程对用户来说是透明的，即用户不会感受到任何服务中断或性能下降。热迁移通常用于硬件维护、升级，或是负载均衡等场景，确保关键业务连续性和服务的高可用性。

相比之下，虚拟机冷迁移（也称为静态迁移）涉及到在迁移前关闭虚拟机。这意味着在迁移过程中，该虚拟机上的服务是不可用的。冷迁移适用于非实时或可容忍停机时间的场景，例如批量处理作业或非关键业务的迁移。

总结两者的主要区别：

1.热迁移允许在不停机的情况下迁移虚拟机，保证了业务的连续性；而冷迁移需要在迁移前关闭虚拟机，导致服务暂时不可用。

2.热迁移对用户透明，用户体验不会受到影响；冷迁移则可能导致服务中断。

3.热迁移技术复杂度较高，因为它需要同步迁移内存中的数据；而冷迁移相对简单，因为只涉及静态数据的迁移。

<p style="margin-top:32px">

如常见问题内未能解决您的需求，请邮件至社区[邮件列表](/zh/community/mailing-list/)或[社区论坛](https://forum.openeuler.org/)交流

</p>

</div>
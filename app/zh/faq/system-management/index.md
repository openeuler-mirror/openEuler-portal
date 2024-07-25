---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<div class="markdown">

# openEuler 常见问题

## 系统管理

### 1. 为什么在 openEuler 22.03 SP1 系统中，启动 NFS 服务后，尽管最初可以达到千兆网络速率，但经过不到一天的写入操作，客户端的响应速度会急剧下降到大约 2MB/s？

这个性能下降的主要原因是 NFS 服务端的缓存上涨至 50% 时，其性能会骤降。这种现象主要是由于内存分配和回收机制的问题。在申请内存的过程中，系统不会立即同步回收内存，而是依赖于较慢的后台内存回收机制。当系统无法及时申请到足够的内存时，会导致等待时间（如 500 毫秒的延迟）。这个问题在高负载下尤为明显，因为 NFS 服务端需要大量内存来处理客户端的请求。随着服务运行时间的增长，可用内存的减少会导致性能急剧下降，特别是在密集的写入操作中。

### 2. 如何解决 openEuler 系统中由于 ext4 文件系统的 inode 错误而导致的文件创建失败问题？

为了解决这个问题，应该在处理 dx_node 块的 rec_len 字段时使用正确的方法。正确的做法是使用 ext4_rec_len_from_disk() 函数来转换 rec_len 为 65536，然后进行比较。这样可以确保在添加新的 dx_node 块时，正确地设置 rec_len 字段，并为节点计算并设置正确的校验和。这个更正将避免由于校验和不正确导致的 inode 错误，从而允许系统正常创建和管理大量文件。

### 3. 如何解决 openEuler 系统中业务进程因 glibc 线程缓存特性导致的内存占用过高问题？

解决这个问题的方法是关闭 glibc 的线程缓存特性。这可以通过在启动程序之前设置环境变量来实现。具体操作是在 bash_profile 中添加 GLIBC_TUNABLES=glibc.malloc.tcache_count=0，这样可以关闭线程缓存。在进程启动后，还需要检查进程的环境变量（/proc/pid/environ）以确保成功添加。关闭 glibc 的 tcache 之后，进程的内存管理将与 glibc 2.17 版本一致，不会有其他副作用。根据客户反馈，实施这一修改方案后，内存占用明显降低，且相比于 CentOS，openEuler 的内存占用也变得更低。

### 4. 为什么在 ARM 架构上进行 fio 压测多盘场景时，性能仅为 X86 架构的一半？

在 ARM 架构下进行 fio 压测时，性能低于 X86 架构的主要原因是中断处理机制的差异。在 ARM 环境中，8 盘同时压测时，所有盘的中断都集中在了 0、32、64 核心上，导致处理这些中断的 CPU 被压满。这个瓶颈主要是由于 ARM 架构下的 LPI (Large Payload Interface) 中断和 X86 架构下的 APIC 中断的实现机制不同。X86 架构通过 APIC 实现了中断负载均衡，而 ARM 架构的 LPI 中断主要由 ITS (Interrupt Translation Service) 驱动程序处理，它会默认将中断分配到最低编号的 CPU，导致单核处理中断出现瓶颈。

### 5. 为什么在机器掉电后，系统启动时 xfs 文件系统会出现问题，执行 ls 命令时显示 input/output error？

机器掉电可以导致 xfs 文件系统损坏，因为掉电可能发生在文件系统写入操作的过程中，导致数据未能完全写入磁盘。当系统重新启动后，xfs 文件系统可能处于不一致的状态，这种状态下执行文件系统操作，如 ls 命令，可能会遇到输入/输出错误。这类错误通常表明文件系统的某些部分未能正确加载或读取，可能是由于文件系统元数据损坏或者未完成的写入操作造成的。

### 6. 如何解决系统启动时未使用新内核的问题？

要解决这个问题，用户需要将 /boot/grub2/grub.cfg 文件的内容替换为 /boot/efi/EFI/xxxx/grub.cfg 中的内容。这样做可以确保在启动时系统会读取包含新内核的正确配置文件。此外，检查并确认系统的引导模式（UEFI 或 legacy）也是解决此类问题的重要步骤。

### 7. 使用systemctl和top命令查询libvirtd服务占用内存不同

systemd管理的服务（包括systemctl和systemd-cgtop）中显示的内存通过查询CGroup对应的memory.usage_in_bytes得到。top是直接统计/proc下内存相关信息计算得出。两者的统计方法不同，不能直接比较。

详情请参考文档[管理员指南中的常见问题1](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%981%E4%BD%BF%E7%94%A8systemctl%E5%92%8Ctop%E5%91%BD%E4%BB%A4%E6%9F%A5%E8%AF%A2libvirtd%E6%9C%8D%E5%8A%A1%E5%8D%A0%E7%94%A8%E5%86%85%E5%AD%98%E4%B8%8D%E5%90%8C)

### 8. 设置RAID0卷，参数stripsize设置为4时出错

64K页表开启只能支持64K场景。因此不需要修改配置文件。openEuler执行lvcreate命令时，条带化规格支持的stripesize最小值为64KB，将参数stripesize设置为64。

### 9. 使用rpmbuild编译mariadb失败

mariadb数据库不允许使用root权限的帐号进行测试用例执行，所以会阻止编译过程（编译过程中会自动执行测试用例）。具体解决方式为使用vi等文本编辑工具，修改mariadb.spec文件中runtest变量的值。

详情请参考文档[管理员指南中的常见问题3](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%983%E4%BD%BF%E7%94%A8rpmbuild%E7%BC%96%E8%AF%91mariadb%E5%A4%B1%E8%B4%A5)

### 10. 使用默认配置启动SNTP服务失败

原因在于默认配置中未添加授时服务器域名。需要修改/etc/sysconfig/sntp文件 ，在文件中添加中国NTP快速授时服务器域名：0.generic.pool.ntp.org。

### 11. 安装时出现软件包冲突、文件冲突或缺少软件包导致安装失败

需要具体问题具体分析。

详情请参考文档[管理员指南中的常见问题5](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%985%E5%AE%89%E8%A3%85%E6%97%B6%E5%87%BA%E7%8E%B0%E8%BD%AF%E4%BB%B6%E5%8C%85%E5%86%B2%E7%AA%81%E6%96%87%E4%BB%B6%E5%86%B2%E7%AA%81%E6%88%96%E7%BC%BA%E5%B0%91%E8%BD%AF%E4%BB%B6%E5%8C%85%E5%AF%BC%E8%87%B4%E5%AE%89%E8%A3%85%E5%A4%B1%E8%B4%A5)

### 12. libiscsi降级失败，怎么办

可以执行命令 yum remove libiscsi-utils，卸载 libiscsi-utils 子包，卸载成功后再进行降级操作。

详情请参考文档[管理员指南中的常见问题6](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%986libiscsi%E9%99%8D%E7%BA%A7%E5%A4%B1%E8%B4%A5)

### 13. xfsprogs降级失败，怎么办

执行下命令 # yum remove xfsprogs-xfs_scrub ，卸载 xfsprogs-xfs_scrub 子包，卸载成功后再进行降级操作。

详情请参考文档[管理员指南中的常见问题7](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%987xfsprogs%E9%99%8D%E7%BA%A7%E5%A4%B1%E8%B4%A5)

### 14. cpython/Lib发现CVE-2019-9674:Zip炸弹漏洞

在 zipfile 文档中添加告警信息： [https://github.com/python/cpython/blob/3.7/Doc/library/zipfile.rst](https://github.com/python/cpython/blob/3.7/Doc/library/zipfile.rst)。

详情请参考文档[管理员指南中的常见问题8](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%988cpythonlib%E5%8F%91%E7%8E%B0cve-2019-9674zip%E7%82%B8%E5%BC%B9%E6%BC%8F%E6%B4%9E)

### 15. 不合理使用glibc正则表达式引起ReDoS攻击

具体原因为glibc正则表达式的实现为NFA/DFA混合算法，内部原理是使用贪婪算法进行递归查找，目的是尽可能匹配更多的字符串，贪婪算法在处理递归正则表达式时会导致ReDoS。因此需要对用户做严格的权限控制，减少攻击面。

具体方式请参考文档[管理员指南中的常见问题9](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%989%E4%B8%8D%E5%90%88%E7%90%86%E4%BD%BF%E7%94%A8glibc%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%BC%95%E8%B5%B7redos%E6%94%BB%E5%87%BB)

### 16. 安装卸载httpd-devel和apr-util-devel软件包，其中的依赖包gdbm-devel安装、卸载有报错

具体问题具体分析，详情请参考文档[管理员指南中的常见问题10](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%9810%E5%AE%89%E8%A3%85%E5%8D%B8%E8%BD%BDhttpd-devel%E5%92%8Capr-util-devel%E8%BD%AF%E4%BB%B6%E5%8C%85%E5%85%B6%E4%B8%AD%E7%9A%84%E4%BE%9D%E8%B5%96%E5%8C%85gdbm-devel%E5%AE%89%E8%A3%85%E5%8D%B8%E8%BD%BD%E6%9C%89%E6%8A%A5%E9%94%99)

### 17. 系统reboot后，执行yum/dnf等命令报错，提示rpmdb error

执行安装升级动作过程中，会对/var/lib/rpm/__db.00*文件进行读写操作，如果在运行中出现强制下电、磁盘空间满或者 ‘kill -9’ 等异常中断操作，会导致对应_db文件损坏，后续执行rpm相关命令（dnf/yum）会发生报错。解决步骤：

1. 执行kill -9停止所有正在运行的rpm命令。
2. 执行rm -rf /var/lib/rpm/__db.00*删除所有db.00的文件。
3. 执行rpmdb --rebuilddb命令，重建rpm db后即可。

详情请参考文档[管理员指南中的常见问题11](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%9811%E7%B3%BB%E7%BB%9Freboot%E5%90%8E%E6%89%A7%E8%A1%8Cyumdnf%E7%AD%89%E5%91%BD%E4%BB%A4%E6%8A%A5%E9%94%99%E6%8F%90%E7%A4%BArpmdb-error)

### 18. 执行 rpmrebuild -d /home/test filesystem对filesystem包rebuild时，rebuild失败

建议暂时不使用rpmrebuild命令对filesystem进行rebuild。

具体原因分析请参考文档[管理员指南中的常见问题12](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%9812%E6%89%A7%E8%A1%8C-rpmrebuild--d-hometest-filesystem%E5%AF%B9filesystem%E5%8C%85rebuild%E6%97%B6rebuild%E5%A4%B1%E8%B4%A5)

### 19. 带参数f执行modprobe或insmod报错

建议对压缩了的ko不使用{insmod, modprobe} -f。

具体原因分析请参考文档[管理员指南中的常见问题13](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/Administration/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%9813%E5%B8%A6%E5%8F%82%E6%95%B0f%E6%89%A7%E8%A1%8Cmodprobe%E6%88%96insmod%E6%8A%A5%E9%94%99)

### 20. 热升级后，相关现场未被恢复

通过service nvwa status查看nvwa的日志，如果是服务启动失败，首先确认是否使能了该服务，再通过systemd查看对应服务的日志。进一步的日志，去criu_dir指定的路径对应命名的进程/服务文件夹中。其中dump.log为保存现场产生的日志，restore.log为恢复现场产生的。

详情请参考文档[内核热升级指南的常见问题3](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/KernelLiveUpgrade/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html)

### 21. 恢复失败，日志显示Can't fork for 948: File exists

当前内核没有提供保留pid的机制，相关策略正在开发，预计会在将来的内核版本中解决这一限制，当前仅能手动重启相关进程。

详情请参考文档[内核热升级指南的常见问题4](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/KernelLiveUpgrade/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html)

### 22. 使用nvwa去保存和恢复简单程序(hello world)，显示失败或者程序未在执行

查看nvwa的日志，如果显示是criu相关的错误，去相应的目录下检查dump.log或者restore.log，criu相关使用限制，可以参考criu社区wiki。

详情请参考文档[内核热升级指南的常见问题5](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/KernelLiveUpgrade/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html)

### 23. train命令训练模型出错，提示“training data failed”

collection命令只采集一种类型的数据，因此需要至少采集两种数据类型的数据进行训练。

### 24. atune-adm无法连接atuned服务

具体原因具体分析，详情请参考文档[A-Tune用户指南的常见问题2](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%982atune-adm%E6%97%A0%E6%B3%95%E8%BF%9E%E6%8E%A5atuned%E6%9C%8D%E5%8A%A1)

### 25. atuned服务无法启动，提示“Job for atuned.service failed because a timeout was exceeded.”

hosts文件中缺少localhost配置，在/etc/hosts文件中127.0.0.1这一行添加上localhost。

详情请参考文档[A-Tune用户指南的常见问题3](https://docs.openeuler.org/zh/docs/24.03_LTS/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.html#%E9%97%AE%E9%A2%983atuned%E6%9C%8D%E5%8A%A1%E6%97%A0%E6%B3%95%E5%90%AF%E5%8A%A8%E6%8F%90%E7%A4%BAjob-for-atunedservice-failed-because-a-timeout-was-exceeded)

<p style="margin-top:32px">

如常见问题内未能解决您的需求，请邮件至社区[邮件列表](/zh/community/mailing-list/)或[社区论坛](https://forum.openeuler.org/)交流

</p>

</div>
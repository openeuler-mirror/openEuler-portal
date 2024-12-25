---
title: '【案例】kump 常见问题'
date: '2024-11-25'
category: blog
tags:
  - 案例库
  - kump
  - 网络
  - vmcore
author: '苏伟峰'
summary: 'kump 常见问题'
---

# kump 常见问题

## 场景一：kdump服务启动失败

### 问题现象

systemctl status kdump查看状态为failed

### 原因分析及解决方案

1. crashkernel启动参数预留内存失败

    systemctl status kdump有以下报错：

    ```bash
    Aug 10 15:26:20 localhost.localdomain kdumpctl[772]: No memory reserved for crash kernel
    Aug 10 15:26:20 localhost.localdomain kdumpctl[772]: Starting kdump: [FAILED]
    ```

    crashkernel默认在低端内存（4G）预留，系统内存紧张时，可能会导致预留内存失败，进而导致kdump服务启动失败。

    **解决方案**：crashkernel=size,high，允许内核从高端内存预留。

2. 内核CONFIG不匹配导致dracut裁剪kdump.img失败

   systemctl status kdump有以下报错：

   ```bash
   Aug 10 16:25:52 localhost.localdomain kdumpctl[3972]: dracut-install: ERROR: installing 'loop'
   Aug 10 16:25:52 localhost.localdomain kdumpctl[2225]: dracut: FAILED:  /usr/lib/dracut/dracut-install -D /var/tmp/dracut.a9swIC/initramfs -N mdio_gpi|usb_8d>
   Aug 10 16:25:52 localhost.localdomain dracut[2271]: FAILED:  /usr/lib/dracut/dracut-install -D /var/tmp/dracut.a9swIC/initramfs -N mdio_gpi|usb_8dev|et1011c>
   Aug 10 16:25:52 localhost.localdomain kdumpctl[2225]: dracut: installkernel failed in module squash
   Aug 10 16:25:52 localhost.localdomain dracut[2271]: installkernel failed in module squash
   Aug 10 16:25:53 localhost.localdomain kdumpctl[1541]: mkdumprd: failed to make kdump initrd
   Aug 10 16:25:53 localhost.localdomain kdumpctl[1541]: Starting kdump: [FAILED]
   ```

   报错的原因是dracut会依赖squashfs.ko、loop.ko和delay.ko，如果缺失，就会导致dracut失败。

   这个问题一般不会在正式的openEuler LTS版本上出现，因为正式版本都包含这三个ko。如果是自行编译的内核，注意以下CONFIG的取值：

   ```bash
   CONFIG_SQUASHFS=m

   CONFIG_BLK_DEV_LOOP=m

   CONFIG_OVERLAY_FS=m
   ```

   另外，设置为y也是不行的，必须设置为m，编译出ko才可以。

3. KASLR生效且/proc/sys/kernel/kptr_restrict设置为2

    systemctl status kdump有以下报错：

    ```bash
    Aug 10 14:55:04 localhost.localdomain kdumpctl[637422]: Can't find kernel text map area from kcore
    Aug 10 14:55:04 localhost.localdomain kdumpctl[637422]: Cannot load /boot/vmlinuz-4.18.0-147.5.2.1.h579.hugetlb.eulerosv2r10.x86_64+
    Aug 10 14:55:04 localhost.localdomain kdumpctl[637001]: kexec: failed to load kdump kernel
    Aug 10 14:55:04 localhost.localdomain kdumpctl[637001]: Starting kdump: [FAILED]
    ```

    一般出现在x86上，目前arm64的KASLR未生效。

    在KASLR生效时，kdump无法从/proc/kcore中获取内核的布局信息；如果同时设置/proc/sys/kernel/kptr_restrict为2，/proc/kallsyms中的信息也会被隐藏。两者同时发生导致kdump启动失败。

    **解决方案**：设置/proc/sys/kernel/kptr_restrict为1，仅允许root用户查看/proc/kallsyms，以root用户启动kdump可以成功。

## 场景二：kdump服务正常但无法生成vmcore

### 问题现象

systemctl status kdump查看状态为active，但是系统挂掉重启之后，没有生成vmcore。

### 原因分析及解决方案

1. crashkernel预留内存太小，导致crash内核oom

    crash内核启动需要足够的内存，oom大概率是由于ko耗内存较多，正式的openEuler版本一般没有类似问题，自行编译的内核需要特别注意这种可能。另外，可以查看串口日志确认是否是发生了oom的问题。

    **解决方案**：crashkernel启动参数调大，如果调大后预留内存失败，可以使用crashkernel=size,high的方式预留内存。

2. SECTIONS_SIZE_BITS未适配

    vmcore的转储由makedumpfile工具（由kdump服务调用）来完成，makedumpfile中的SECTIONS_SIZE_BITS定义需要和内核保持一致。SECTIONS_SIZE_BITS定义在内核文件arch/arm64/include/asm/sparsemem.h中，正式的openEuler arm64版本定义为27，kdump中的SECTIONS_SIZE_BITS也适配修改为27。但是在社区源码中SECTIONS_SIZE_BITS的值为30，和kdump不匹配，就会导致makedumpfile生成vmcore失败。

    **解决方案**：内核源码arch/arm64/include/asm/sparsemem.h中的SECTIONS_SIZE_BITS修改为27

3. 带外硬件狗复位，导致转储vmcore的过程中断

    受系统使用内存大小以及落盘速度的影响，kdump转储vmcore耗时可能较长，如果存在带外硬件狗时，有可能中断vmcore的转储流程。

    **解决方案**：关闭带外硬件狗或者在kdump中重置带外硬件狗超时时间。

4. 磁盘上报有问题

    vmcore没有正常保存可能是因为保存vmcore的磁盘没有正常上报，可以通过串口日志来确认此类问题。

## 场景三：生成的vmcore，crash工具无法正常解析

### 问题现象

在生成vmcore之后，使用crash vmcore vmlinux解析时出错，无法正常解析

### 原因分析及解决方案

1. vmcore和vmlinux版本不匹配

   crash在解析vmcore时需要有内核源码编译出的vmlinux，同时，vmlinux的版本需要和转储vmcore的系统版本一致，crash才能正常解析。

   **解决方案**：使用和vmcore版本一致的vmlinux。

2. 环境缺少strings命令

    crash解析vmcore时需要依赖strings命令，缺少该命令会导致crash解析失败。

    **解决方案**：strings命令由binutils包提供，可以安装binutils包或者手动拷贝strings命令以及依赖库。

3. 原因三：vmcore有损坏

    可以查看kdump_status.log获取kdump转储vmcore时的流程，是否完整执行结束。

    **解决方案**：重新触发系统panic生成vmcore。

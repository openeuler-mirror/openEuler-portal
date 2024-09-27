---
title: '【案例】制作内核热补丁，插入时dmesg提示缺少sssnic模块'
date: '2024-08-01'
category: blog
tags:
  - 案例库
  - 内核热补丁
  - dmesg
  - sssnic模块'
author: '蔡小萌'
summary: '案例分析：制作内核热补丁，插入时dmesg提示缺少sssnic模块'
---

# 制作内核热补丁，插入时dmesg提示缺少sssnic模块

## 问题背景

在使用openEuler-LTS-SP3版本制作内核热补丁时，补丁并没有修改sssnic驱动模块，但是制作出来的热补丁激活失败，使用dmesg命令后提示：livepatch: module 'sssdk' not  loaded。（sssnic是网卡驱动模块，源码位于内核drivers/net/ethernet/sssnic目录下）

### 版本信息

内核版本：5.10.0-182.0.0.95.oe2203sp3.aarch64

kpatch版本：kpatch-0.9.5-7.oe2203sp3.aarch64

### 现象描述

使用命令`./make_hotpatch -d .new -i procversion`制作内核热补丁，能够正常制作，但是制作完成后发现sssnic模块的函数有修改，导致热补丁依赖sssnic模块，实际补丁并未对该驱动模块源码进行修改；热补丁依赖sssnic模块会导致补丁激活失败，会报错未加载sssnic模块（sssnic模块为sss网卡驱动模块，默认不加载），制作出来的热补丁无法正常使用。

```shell
[166439.721426] klp_procversion: tainting kernel with TAINT_LIVEPATCH
[166439.760137] livepatch: module 'sssdk' not loaded
```

## 原因分析

1.根据日志可以发现，在提取新的修改后的elf段时，`sss_tool_nic_func.c`和`sss_tool_sdk.c`两个文件的确被识别出有差异，并被当做差异段。

2.进一步排查后发现，增量编译时sssnic模块不论是否被修改，sssnic模块都会重新被编译，且增量编译前后的二进制.o文件会被kpatch识别存在变化，被制作成热补丁。

## 解决方案

方案一：

若制作的热补丁并非sssnic模块，可以在识别差异段时尝试屏蔽该模块，修改`/usr/libexec/kpatch/kpatch-cc`文件，在忽略文件列表中增加sssnic源码路径，再次制作热补丁就可以看到不会再依赖sssnic模块，热补丁正常使用。

```shell
diff --git a/kpatch-build/kpatch-cc b/kpatch-build/kpatch-cc
index 80d310c...688d92b 100755
--- a/kpatch-build/kpatch-cc
+++ b/kpatch-build/kpatch-cc
@@ -49,7 +49,8 @@ if [[ "$TOOLCHAINCMD" =~ ^(.*-)?gcc$ ||
                arch/powerpc/kernel/prom_init.o|\
                lib/*|\
                .*.o|\
-               */.lib_exports.o)
+               */.lib_exports.o|\
+               drivers/net/ethernet/3snic/sssnic/*)
                    break
                    ;;
                *.o)
```

方案二：

有时未作出修改的函数被识别为变化函数可能是编译器优化后导致汇编结果发生了变化，这种场景下可以使用`KPATCH_IGNORE_FUNCTION`宏忽略该函数，在制作热补丁时就不会将该函数做到热补丁中。

查看热补丁制作时屏幕输出的日志可以发现sssnic模块对应有两个函数发生了变化：

```txt
Testing patch file(s)
Reading special section data
Building original source
Building patched source
Extracting new and modified ELF sections
sss_tool_nic_func.o: changed function: sss_tool_ioctl
sss_tool_sdk.o: changed function: sss_tool_get_hw_drv_version
version.o: changed function: version_proc_show
```

在sssnic模块显示变化的函数后，分别在对应函数发生修改的文件里增加以下两句（注意宏`KPATCH_IGNORE_FUNCTION`在函数声明后再使用，否则会报错找不到符号）：

```c
#include "/usr/share/kpatch/patch/kpatch-macros.h"
KPATCH_IGNORE_FUNCTION(sss_tool_ioctl);
```

```c
#include "/usr/share/kpatch/patch/kpatch-macros.h"
KPATCH_IGNORE_FUNCTION(sss_tool_get_hw_drv_version);
```

重新执行命令`./make_hotpatch -d .new -i procversion`制作热补丁就不会再报关于sssnic模块未加载的错误。

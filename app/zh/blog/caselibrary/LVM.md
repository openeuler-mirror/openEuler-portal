---
title: '【案例】LVM标签损坏'
date: '2024-10-17'
category: blog
tags:
  - 案例库
  - LVM
author: '王志强'
summary: '案例分析：LVM标签损坏'
---

# LVM标签损坏

## 现象描述

pvs查询不到pv，blkid查询不到LVM2_member标签。
正常情况：

![](./figures/lvm-1.png)

异常情况：

![](./figures/lvm-2.png)

## 原因分析

hexdump查看元数据区域，发现标签损坏。

![](./figures/lvm-3.png)

![](./figures/lvm-4.png)

## 解决方法

1. 在/etc/lvm/backup目录查询卷组备份信息，获取pv的uuid，使用pvcreate命令恢复。

    ![](./figures/lvm-5.png)

    命令如下:

    ```
    pvcreate --uuid D8v9Qw-1EJw-cmRc-nY2y-AZbC-8eLd-5Cpi2s --restorefile /etc/lvm/backup/vg /dev/sdb
    ```

2. pv复之后，再恢复卷组。

    ```
    vgcfgrestore --file /etc/lvm/backup/vg vg
    ```

3. 最后激活卷组

    ```
    vgchange -ay vg
    ```

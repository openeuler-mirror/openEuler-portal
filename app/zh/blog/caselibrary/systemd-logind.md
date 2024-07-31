---
title: '【案例】systemd-logind服务无法获取NIS服务器上的用户信息'
date: '2023-06-04'
category: blog
tags:
  - 案例库
  - systemd-logind
  - NIS
author: '胡宇彪'
summary: '案例分析：systemd-logind服务无法获取NIS服务器上的用户信息'
---

# systemd-logind.service无法获取NIS服务器上的用户信息的解决方法

## 问题背景

在systemd-pam软件包已安装的前提下，使用NIS服务同步过来的用户登录时， /run/systemd/users/下面没有创建对应的uid文件，导致gnome-shell报错。

NIS（Network Information Service）是一种为网络中所有的机器提供网络信息的系统，包括用户名、密码、主目录、组信息等。NIS服务主要用于集中控制多个系统管理数据库的网络用品，其全称是Network Information Service。

相关issue：https://gitee.com/src-openeuler/systemd/issues/I9OXNC?from=project-issue

### 版本信息

systemd版本： systemd-249-75.oe2203sp1.aarch64

systemd-pam版本： systemd-pam-249-75.oe2203sp1.aarch64


## 现象描述

NIS服务器上创建了一个1015(ylp)用户，用户信息可以使用id命令查询到，但是登录1015用户后 /run/systemd/users/ 目录下没有uid对应的文件。
```
[root@server1 ~]# id ylp
uid=1015(ylp) gid=1015(ylp) groups=1015(ylp)
[root@server1 ~]# ll /run/systemd/users/
total 16
-rw-r--r-- 1 root root 345 May 13 17:23 0
-rw-r--r-- 1 root root 243 May 10 17:40 1002
-rw-r--r-- 1 root root 252 May 13 17:20 1004
-rw-r--r-- 1 root root 274 May 10 18:12 971
```

## 原因分析
1.  根据错误打印可以看出来是网络不通导致的连接不上NIS服务器。
    ```
    systemd-logind[2989387]: yp_bind_client_create_v3: RPC: Remote system error - Address family not supported by protocol
    server1 sshd[2989498]: pam_systemd(sshd:session): Failed to create session: No such process
    server1 sshd[2989498]: pam_unix(sshd:session): session opened for user ylp(uid=1015) by (uid=0)
    server1 sshd[2989498]: pam_systemd(sshd:session): Failed to create session: Transport endpoint is not connected
    ```
2. 查找systemd社区， 发现了类似的提交和讨论。以下两个提交都可能会导致systemd-logind无法与NIS服务器建立通信：
- sytemd在235版本对许多常驻的service（比如：systemd-logind.service）增加了`IPAddressDeny=any`，防止了与外部ip通信：https://github.com/systemd/systemd/pull/6921
- sytemd在239版本对systemd-logind.service的通信做了进一步的限制：禁止了`AF_INET` 和 `AF_INET6` 协议：https://github.com/systemd/systemd/issues/9072
3. 最终systemd社区对systemd-logind.service的兼容性变更做了一些解释以及文档承载：
- NWES文档中增加了不兼容说明：https://github.com/systemd/systemd/pull/7343
- systemd的开发者认为类似NIS的网络通信会增加遭受网络攻击的风险，最好使用 NSCD 或 SSSD （缓存远程用户信息的服务），systemd不会去改变这个默认的策略: https://github.com/systemd/systemd/issues/7074#issuecomment-338157851

## 解决方案

方案一：

添加NSCD或SSSD服务，以访问本地缓存数据。

方案二：

用户自行开启systemd-logind.service网络访问。
1. 首先在客户端的/usr/lib/systemd/system/systemd-logind.service.d/目录下查找 `IPAddressAllow`、`RestrictAddressFamilies`字段，保证这两个字段没有被其他服务重新设置。
    ```
    grep -rn "IPAddressAllow"
    grep -rn "RestrictAddressFamilies"
    ```
    - 场景1：如果有字段不存在，则在/usr/lib/systemd/system/systemd-logind.service.d/目录下新增配置文件systemd-logind-nis.conf（权限与其他文件保持一致），并在文件中新增`IPAddressAllow`和`RestrictAddressFamilies`中不存在的字段，IPAddressAllow字段增加`NIS服务器的IP地址`，RestrictAddressFamilies字段增加`AF_UNIX AF_NETLINK AF_INET AF_INET6`。如下所示:
        ```
        IPAddressAllow=需增加的NIS服务器的IP地址
        RestrictAddressFamilies=AF_UNIX AF_NETLINK AF_INET AF_INET6
        ```
    - 场景2：如果有文件中存在这两个字段，则在包含该字段的文件中追加配置。IPAddressAllow字段追加`NIS服务器的IP地址`，RestrictAddressFamilies字段追加`AF_UNIX AF_NETLINK AF_INET AF_INET6`。如下所示:
        ```
        IPAddressAllow=原配置 需增加的NIS服务器的IP地址
        RestrictAddressFamilies=原配置 AF_UNIX AF_NETLINK AF_INET AF_INET6
        ```
    - 场景3：如果有文件中只配置了其中一个字段，则在包含该字段的文件中追加配置，并将不存在的字段写入到/usr/lib/systemd/system/systemd-logind.service.d/systemd-logind-nis.conf中（参考场景1和场景2）。


2. 修改后需要在客户端重启systemd-logind.service服务。
    ```
    systemctl daemon-reload
    systemctl restart systemd-logind.service
    ```

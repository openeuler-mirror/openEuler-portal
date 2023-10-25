---
title: 操作系统迁移实战之在openEuler上部署MySQL数据库
titleTemplate: 数据库迁移方案 | openEuler社区官网
head:
  - - meta
    - name: description
      content: 本文主要用于在 openEuler 20.03 sp1 操作系统上部署 MySQL 数据库。本次实践主要使用 x86_64 架构虚拟机，通过评估工具 x2openEuler 评估 MySQL 5.7.21 软件移植到 openEuler 操作系统的兼容性，再实施数据搬迁。想要了解更多数据库迁移相关内容，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: 数据库迁移方案,Mysql数据库迁移,mysql数据库集群,mysql数据迁移工具,mysql移植方案,迁移工具
date: 2022-07-26
category: blog
tags:
  - openEuler
  - 迁移
archives: 2022-07
author:
  - openEuler
summary: openEuler社区提供了工具x2openEuler，能够提前评估将MySQL移植到openEuler操作系统的兼容性，再实时数据搬迁，减少很多准备工作和时间
---

系统迁移中库体迁移是一件让人挺“头秃”的事儿。简单的需求（照原样再复制一份到 XXX 环境）可不意味着它的过程简单……好在 openEuler 社区这边提供了工具 x2openEuler，能够提前评估将 MySQL 移植到 openEuler 操作系统的兼容性，再实时数据搬迁，减少很多准备工作和时间。想着可能也有朋友遇到同样的需求，这里我想分享下经验，也希望大家能够一起交流交流

## 1. 简要介绍

本文主要用于在 openEuler 20.03 sp1 操作系统上部署 MySQL 数据库。本次实践主要使用 x86_64 架构虚拟机，通过评估工具 x2openEuler 评估 MySQL 5.7.21 软件移植到 openEuler 操作系统的兼容性，再实施数据搬迁。如果您使用其他版本的 MySQL，可以参考参考。

## 2. 环境

OS

| 软件 | 版本                | 备注                  |
| ---- | ------------------- | --------------------- |
| OS   | Centos 7.6.1810     | 当前 mysql 集群服务器 |
| OS   | openEuler 20.03 SP1 | 迁移目标服务器        |

软件包

| 软件                  | 版本   |
| --------------------- | ------ |
| mysql5                | 5.7.21 |
| mysql5-common         | 5.7.21 |
| mysql5-embedded       | 5.7.21 |
| mysql5-embedded-devel | 5.7.21 |
| mysql5-errmsg         | 5.7.21 |
| mysql5-libs           | 5.7.21 |
| mysql5-server         | 5.7.21 |
| mysql5-test           | 5.7.21 |

## 3. 软件兼容性评估

openEuler 社区提供了 [x2openEuler 工具](https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/stable/contrib/x2openEuler/noarch/Packages/) ，针对已经编译好的二进制程序，进行主要完成软件包、接口级评估，明确应用软件是否需要移植适配，是否有依赖的软件包待引入；同时评估软件调用的接口原型在两个系统中是否有差异。
注：已经编译好的二进制程序，难以保障全部兼容新 OS，严重时会引发才内存风险，往往这种问题很难通过验证的方式识别出来，迁移前针对软件兼容性评估尤为重要。

### 3.1 获取 mysql 的 RPM 包并解压到/opt/mysql 目录下

```java
wget –P /opt https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.21-1.el7.x86_64.rpm-bundle.tar
```

```java
cd /opt/
mkdir mysql
tar -xf mysql-5.7.21-1.el7.x86_64.rpm-bundle.tar -C mysql
```

### 3.2 下载 x2openEuler 工具到/opt/mysql

```java
下载指引：https://www.openeuler.org/zh/other/migration/
```

### 3.3 部署工具

```java
cd /opt/mysql
rpm -ivh x2openEuler-2.0.0-1.x86_64.rpm
```

注意：安装 rpm 时需要使用 root 用户，且目前需要网络（用于下载安装依赖） 注意：根据提示安装依赖包如 bzip2-devel 等

```java
su x2openEuler
x2openEuler redis-db -init
```

依次录入 redis 数据库的 ip:127.0.0.1 端口：6379 数据库索引号（0-16）：0 密码（工具会对密码加密处理）：如果 redis 密码没有设置或者为空时，直接回车即可.

```java
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

备注：x2openEuler 使用 rpm 安装完成后会在/opt/x2openEuler 目录下带有 source_centos7.6-openEuler20.03-LTS-SP1.tar.gz 这个默认资源包，需要支持 centos8.2 到 openEuler20.03-LTS-SP1 的评估，则需获取对应的静态资源包导入，如对应的资源包为 source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，导入此包命令：x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，请示情况选择对应的资源包

### 3.4 扫描 mysql

```java
x2openEuler scan /opt/mysql/
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
扫描完成后会在/opt/x2openEuler/output目录生成html格式的报告
```

## 4. 评估结果分析

软件兼容性评估报告分三块内容展示软件兼容性，分别是依赖包兼容性、C/C++接口兼容性、java 接口兼容性，依赖包兼容性反映了软件包安装过程中的直接依赖，非 100%表明无法正确安装；接口兼容性反映的是单个软件运行过程中对其他软件包、动态库或系统接口的调用变化，非 100%表明在某个功能调用时可能会触发异常，未调用到时可能表现正常；部分结果建议人工复核，最终软件包使用建优先级建议 openEuler 已移植包>openEuler 上人工重编译包>centos 软件包。

### 4.1 报告分析

打开 html 报告，逐行分析，得出结论：在 openEuler 上直接使用 centos 的 mysql 包存在风险，风险如下：
1 个待确认接口表明 mysql 系列软件包会调用到 libaio.so.1.0.1，其函数参数数量从 4 变为 5，直接影响了功能，在某个功能调用时可能会触发异常；

另外，报告显示需要确认 3 个依赖软件包，经过人工确认属于 mysql 系列包自闭环的依赖，故软件包安装无影响。

<img src="./m01.png">

<img src="./m02.png">

### 4.2 分析结果建议

```java
建议：由于函数调用风险，建议直接使用在openEuler官方编译移植过的mysql-5.7.21系列软件包

https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mariadb-common-10.3.9-9.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-common-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-server-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-errmsg-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mecab-0.996-2.oe1.x86_64.rpm
```

## 5. 安装数据库 mysql

### 5.1 安装 mysql 并配置密码

#### 1）安装 mariadb 及 mysql 相关服务。

```java
rpm -ivh mysql5-5.7.21-3.oe1.x86_64.rpm mariadb-common-10.3.9-9.oe1.x86_64.rpm mysql5-common-5.7.21-3.oe1.x86_64.rpm mysql5-server-5.7.21-3.oe1.x86_64.rpm mecab-0.996-2.oe1.x86_64.rpm mysql5-errmsg-5.7.21-3.oe1.x86_64.rpm
```

#### 2） 启动 mysql。

```java
systemctl start mysqld
```

#### 3）mysql 状态查询。

systemctl status mysqld
状态为 running 则启动成功：

```java
root@vm-2p32g.2288hv5-2s44p-384g--b5-0 ~# systemctl status mysqld
● mysqld.service - MySQL 5.7 database server
Loaded: loaded (/usr/lib/systemd/system/mysqld.service; disabled; vendor preset: disabled)

  Active: active (running) since Thu 2021-09-09 10:23:25 CST; 1 day 4h ago

 Process: 103715 ExecStartPre=/usr/libexec/mysql-check-socket (code=exited, status=0/SUCCESS)

 Process: 103738 ExecStartPre=/usr/libexec/mysql-prepare-db-dir mysqld.service (code=exited, sta>

 Process: 103773 ExecStart=/usr/libexec/mysqld --daemonize --basedir=/usr --pid-file=/run/mysqld>

 Process: 103803 ExecStartPost=/usr/libexec/mysql-check-upgrade (code=exited, status=0/SUCCESS)

 Main PID: 103775 (mysqld)

  Tasks: 37

  Memory: 188.4M

  CGroup: /system.slice/mysqld.service

      └─103775 /usr/libexec/mysqld --daemonize --basedir=/usr --pid-file=/run/mysqld/mysqld.
```

#### 4） 登录并修改默认密码。

mysql -uroot -p

- a. 默认没有密码，按回车即可登录。

```java
root@vm-2p32g.2288hv5-2s44p-384g--b5-0 /# mysql -uroot -p

Enter password:

Welcome to the MySQL monitor. Commands end with ; or \g.

Your MySQL connection id is 2

Server version: 5.7.21 MySQL Community Server (GPL)
Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its affiliates. Other names may be trademarks of their respective owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

- b. 设置密码。

alter user 'user'@'localhost' identified by 'passward';

```java
mysql> alter user 'root'@'localhost' identified by '123456';

Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;

Query OK, 0 rows affected (0.00 sec)

mysql>
```

**flush privileges**必须执行，否则设置不生效。

#### 5） 验证密码。

退出后重新登录，查看密码是否修改成功。

```java
root@vm-2p32g.2288hv5-2s44p-384g--b5-0 /# mysql -uroot -p

Enter password:
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 3Server version: 5.7.21 MySQL Community Server (GPL)
Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its affiliates. Other names may be trademarks of their respective owners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql>
```

## 6. 总结

根据评估结果再去实施搬迁，整体还是比较好操作，如若评估结果有疑问，可以向 openEuler 社区邮件列表（dev@openeuler.org）咨询。

### 参考资料：

openEuler 官网：<https://www.openeuler.org/zh/other/migration/>

x2openEuler 用户指南：
<https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuleruseguide.html>

openEuler 社区邮件列表：<https://www.openeuler.org/zh/community/mailing-list/>

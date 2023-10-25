---
title: MySQL 5.7.21 移植指南（openEuler 20.03 LTS SP1）
titleTemplate: 数据库移植方案 | openEuler社区官网
head:
  - - meta
    - name: description
      content: 本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署MySQL 5.7.21数据库。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: 数据库迁移方案,Mysql数据库迁移,mysql数据库集群,mysql数据迁移工具,mysql移植方案,迁移工具
category: blog
date: 2022-01-05
tags:
  - MySQL
  - Migrate Case
sig: sig-Compatibility-Infra
archives: 2022-01
author: xielihao
summary: Just about everything of the MySQL 5.7.21 migrate case
---

## 1.简要介绍

本文主要用于指导在 openEuler 20.03 sp1 操作系统上部署 mysql 数据库。

MySQL 是一款安全、跨平台、高效的，并与 PHP、Java 等主流编程语言紧密结合的数据库系统。
本案例使用 x86_64 架构虚拟机，通过评估工具 x2openEuler 评估 MySQL 5.7.21 软件移植到 openEuler 操作系统的兼容性，再实施数据搬迁。

建议使用版本为 MySQL 5.7.21。

> 说明:
> 本文档适用于 MySQL 5.7.21，其他版本的 MySQL 移植步骤也可参考本文档。

## 2.案例环境



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

## 3.软件兼容性评估

openEuler 社区提供了 [x2openEuler 工具](https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/) ，针对已经编译好的二进制程序，进行主要完成软件包、接口级评估，明确应用软件是否需要移植适配，是否有依赖的软件包待引入；同时评估软件调用的接口原型在两个系统中是否有差异。

注：已经编译好的二进制程序，难以保障全部兼容新 OS，严重时会引发才内存风险，往往这种问题很难通过验证的方式识别出来，迁移前针对软件兼容性评估尤为重要。

#### 3.1 获取 mysql 的 RPM 包并解压到/opt/mysql 目录下

```
wget -P /opt https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.21-1.el7.x86_64.rpm-bundle.tar
```

```
cd /opt/
mkdir mysql
tar -xf mysql-5.7.21-1.el7.x86_64.rpm-bundle.tar -C mysql
```

#### 3.2 下载 x2openEuler 工具到/opt/mysql

```
下载指引：https://www.openeuler.org/zh/other/migration/
```

#### 3.3 部署工具

```
cd /opt/mysql
rpm -ivh x2openEuler-2.0.0-1.x86_64.rpm
```

> 注意：安装 rpm 时需要使用 root 用户，且目前需要网络（用于下载安装依赖）
> 注意：根据提示安装依赖包如 bzip2-devel 等

```
su x2openEuler
x2openEuler redis-db -init
```

> 依次录入 redis 数据库的 ip:127.0.0.1
> 端口：6379
> 数据库索引号（0-16）：0
> 密码（工具会对密码加密处理）：如果 redis 密码没有设置或者为空时，直接回车即可

```
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

> 备注：x2openEuler 使用 rpm 安装完成后会在/opt/x2openEuler 目录下带有 source_centos7.6-openEuler20.03-LTS-SP1.tar.gz 这个默认资源包
> 需要支持 centos8.2 到 openEuler20.03-LTS-SP1 的评估，则需获取对应的静态资源包导入，如对应的资源包为 source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，导入此包命令：`x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz`，请示情况选择对应的资源包

#### 3.4 扫描 mysql

```
x2openEuler scan /opt/mysql/
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
扫描完成后会在/opt/x2openEuler/output目录生成html格式的报告
```

## 4.评估结果分析

软件兼容性评估报告分三块内容展示软件兼容性，分别是依赖包兼容性、C/C++接口兼容性、java 接口兼容性，依赖包兼容性反映了软件包安装过程中的直接依赖，非 100%表明无法正确安装；接口兼容性反映的是单个软件运行过程中对其他软件包、动态库或系统接口的调用变化，非 100%表明在某个功能调用时可能会触发异常，未调用到时可能表现正常；部分结果建议人工复核，最终软件包使用建优先级建议 openEuler 已移植包>openEuler 上人工重编译包>centos 软件包。

#### 4.1 报告分析

```
打开html报告，逐行分析，得出结论：在openEuler上直接使用centos的mysql包存在风险，风险如下：
1个待确认接口表明mysql系列软件包会调用到libaio.so.1.0.1，其函数参数数量从4变为5，直接影响了功能，在某个功能调用时可能会触发异常；

另外，报告显示需要确认3个依赖软件包，经过人工确认属于mysql系列包自闭环的依赖，故软件包安装无影响
```

<img src="./image/Mysql-4.png">

<img src="./image/Mysql-3.png">

#### 4.2 分析结果建议

```
建议：由于函数调用风险，建议直接使用在openEuler官方编译移植过的mysql-5.7.21系列软件包
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mariadb-common-10.3.9-9.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-common-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-server-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mysql5-errmsg-5.7.21-3.oe1.x86_64.rpm
https://repo.openeuler.org/openEuler-20.03-LTS-SP1/everything/x86_64/Packages/mecab-0.996-2.oe1.x86_64.rpm
```

## 5.安装数据库 mysql

#### 5.1 安装 mysql 并配置密码

**1）安装 mariadb 及 mysql 相关服务。**

rpm -ivh mysql5-5.7.21-3.oe1.x86_64.rpm mariadb-common-10.3.9-9.oe1.x86_64.rpm mysql5-common-5.7.21-3.oe1.x86_64.rpm mysql5-server-5.7.21-3.oe1.x86_64.rpm mecab-0.996-2.oe1.x86_64.rpm mysql5-errmsg-5.7.21-3.oe1.x86_64.rpm

**2） 启动 mysql。**

systemctl start mysqld

**3）mysql 状态查询。**

systemctl status mysqld

状态为 running 则启动成功：

```
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

​      └─103775 /usr/libexec/mysqld --daemonize --basedir=/usr --pid-file=/run/mysqld/mysqld.
```

**4） 登录并修改默认密码。**

mysql -uroot -p

a. 默认没有密码，按回车即可登录。

```
root@vm-2p32g.2288hv5-2s44p-384g--b5-0 /# mysql -uroot -p

Enter password:

Welcome to the MySQL monitor. Commands end with ; or \g.

Your MySQL connection id is 2

Server version: 5.7.21 MySQL Community Server (GPL)


Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.


Oracle is a registered trademark of Oracle Corporation and/or its

affiliates. Other names may be trademarks of their respective

owners.


Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

b. 设置密码。

alter user 'user'@'localhost' identified by 'passward';

```
mysql> alter user 'root'@'localhost' identified by '123456';

Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;

Query OK, 0 rows affected (0.00 sec)

mysql>
```

> **flush privileges**必须执行，否则设置不生效。

**5） 验证密码。**

退出后重新登录，查看密码是否修改成功。

```
root@vm-2p32g.2288hv5-2s44p-384g--b5-0 /# mysql -uroot -p

Enter password:

Welcome to the MySQL monitor. Commands end with ; or \g.

Your MySQL connection id is 3

Server version: 5.7.21 MySQL Community Server (GPL)


Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.


Oracle is a registered trademark of Oracle Corporation and/or its

affiliates. Other names may be trademarks of their respective

owners.


Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


mysql>
```

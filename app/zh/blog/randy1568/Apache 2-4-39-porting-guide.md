---
title: Apache 2.4.39 移植指南（openEuler 20.03 LTS SP1）
titleTemplate: 服务器移植方案 | openEuler社区官网
head:
  - - meta
    - name: description
      content: 本文主要用于指导在openEuler 20.03 sp1 操作系统上部署Apache服务器。想要了解更多服务器移植相关内容，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: nginx移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具
category: blog
date: 2021-12-29
tags:
  - Apache
  - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Apache 2.4.39
---


# 介绍

## 简要介绍

Apache HTTP Server（简称 Apache）是 Apache 软件基金会的一个开放源码的网页服务器，可以在大多数计算机操作系统中运行，由于其多平台和安全性被广泛使用，是最流行的 Web 服务器端软件之一。它快速、可靠并且可通过简单的 API 扩展，将 Perl/Python 等解释器编译到服务器中。

开发语言：C

一句话描述：Web 服务器

## 建议的版本

建议使用版本为“Apache httpd 2.4.39”及以上版本。

# 环境要求

## 硬件要求


## 操作系统要求

操作系统要求如下所示。

| 项目      | 版本              |
| --------- | ----------------- |
| openEuler | 20.03 sp1 aarch64 |
| Kernel    | 4.19              |

说明：

    如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。

# 配置编译环境

1. 安装开发包

   yum update
   yum install gcc gcc-c++

2. 安装依赖库

   yum install apr-devel.aarch64 apr-util-devel.aarch64 pcre-devel.aarch64 -y

3. 获取源码

   下载地址： http://archive.apache.org/dist/httpd/httpd-2.4.39.tar.gz

## 配置安装

    tar xzvf httpd-2.4.39.tar.gz

## 修改源码配置

    cd httpd-2.4.39
    vi ./build/config.sub

    找到下面两行进行修改,添加aarch64：

    | x86 | xc16x | xstormy16 | xtensa \
    =>
    | x86 | aarch64 | xc16x | xstormy16 | xtensa \


    | x86-* | x86_64-* | xc16x-* | xps100-* \
    =>
    | x86-* | aarch64-* | x86_64-* | xc16x-* | xps100-* \

## 编译安装

    ./configure --host=aarch64 --build=aarch64
    make -j4
    make install

# 参数配置

## 修改 httpd.conf

    vi /usr/local/apache2/conf/httpd.conf

    89行取消注释：
      LoadModule socache_shmcb_module modules/mod_socache_shmcb.so

    196行取消注释，修改为当前服务器IP
      #ServerName www.example.com:80
      =>
      ServerName local_server_ip:80

    461行取消注释
      Include conf/extra/httpd-mpm.conf

    488行取消注释
      Include conf/extra/httpd-default.conf

## 修改 httpd-default.conf

    vi /usr/local/apache2/conf/extra/httpd-default.conf

    23行值修改为0
      MaxKeepAliveRequests 0

# 验证：

    apache启动命令:
      /usr/local/apache2/bin/httpd -f /usr/local/apache2/conf/httpd.conf -k start

    apache停止命令:
      /usr/local/apache2/bin/httpd -f /usr/local/apache2/conf/httpd.conf -k stop

    查看服务进程:
      ps -ef |grep httpd

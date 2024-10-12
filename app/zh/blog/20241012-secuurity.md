---
title: 'CVE-2024-47177 cups-filters远程代码执行问题'
date: '2024-10-12'
category: blog
tags:
  - openEuler
author: 'openEuler'
summary: '安全公告'
---

## 漏洞描述

CUPS是一个通用开源打印系统，主要使用IPP（Internet Printing Protocol）等协议来管理打印任务和队列。cups-filters为CUPS 2.x提供后端、过滤器和其他功能，cups-browsed是一个开源打印服务组件，是CUPS的一部分。当前cups-filters库存在命令注入漏洞，攻击者可以通过FoomaticRIPCommandLine PPD参数执行任意命令。
 

## 漏洞分析

攻击者可以利用cups-filters的漏洞，通过PPD文件传递恶意FoomaticRIPCommandLine命令行参数，该参数会被执行为用户控制的命令，实现远程代码执行，从而导致敏感数据被盗或系统损坏。
 

## 影响性分析


- 影响范围： 

安装了cups作为打印机系统，并且cups-filters 在1.28.15及以下版本存在该漏洞。


- 触发条件： 


使用以下命令查看cups-browsed服务是否在运行：


systemctl status cups-browsed


如果未安装该服务，显示“Unit cups-browsed.service could not be found”则不受影响；


如果安装了该服务，运行状态显示“inactive (dead)”，则不受影响；

如果安装了该服务，运行状态显示“active (running)”且配置文件/etc/cups/cups-browsed.conf中的“BrowseRemoteProtocols”指令包含值“cups”，则受影响；

CVE-2024-47177和CVE-2024-47076、CVE-2024-47175、CVE-2024-47176是一组漏洞，其他三个漏洞已修复，CVE-2024-47177漏洞得到了缓解，很难触发。
 

## 消减措施
- 停止正在运行的 cups-browsed 服务，可使用以下命令：

systemctl stop cups-browsed


- 可以通过以下方式阻止 cups-browsed 服务在系统重启时启动：

systemctl disable cups-browsed

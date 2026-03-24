---
title: 'secGear'
---

<MarkdownLayout>

![Banner](./assets/banner.jpg)

# secGear

## secGear是一款供开发者开发安全应用的机密计算框架

</MarkdownLayout>

<MarkdownLayout>

# 简介

## 

secGear是面向计算产业的机密计算安全应用开发套件，旨在方便开发者在不同的硬件设备上提供统一开发框架，让用户不感知底层各种机密计算架构和接口的差异，目前secGear支持Intel SGX硬件和ARM Trustzone(安全os支持iTrustee)。

secGear同时在中间件层和服务层提供丰富的扩展能力，让开发者能够方便得调用安全组件，乃至直接使用机密计算安全服务。

</MarkdownLayout>

<MarkdownLayout>

# 架构

##

如图所示，secGear 主题包含三个层级

服务层：提供完整的基于机密计算的安全服务，用户直接使用相关服务，享受机密计算带来的安全性。

中间件层：提供常见的安全协议组件以及各种安全函数库，用户可以直接在安全及非安全侧调用相关接口，不必从头造轮子。

基础层：提供丰富的 enclave 开发接口或工具，包含代码生成工具和enclave声明周期管理等接口，并且在安全侧支持POSIX APIs 和标准 OpenSSL 接口，用户基于这些接口可以自由开发安全应用程序 。

![示意图](./assets/business.png)

</MarkdownLayout>

<MarkdownLayout>

# 文档

## 整体介绍

查看secGear整体介绍

[了解更多](https://atomgit.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/introduction_to_secgear.md)

## 安装

学习如何安装secGear

[了解更多](https://atomgit.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/secgear_installation.md)

## 开发指南

secGear的开发指南

[了解更多](https://atomgit.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/developer_guide.md)

## 工具使用文档

学习secGear的工具使用

[了解更多](https://atomgit.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/using_secgear_tools.md)

## API接口文档

查看secGear API接口文档

[了解更多](https://atomgit.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/api_reference.md)

## 应用场景

介绍secGear的典型场景机密计算解决方案。

[了解更多](https://atomgit.com/openeuler/secGear/blob/master/docs/zh/2403_LTS_SP2/application_scenarios.md)

</MarkdownLayout>

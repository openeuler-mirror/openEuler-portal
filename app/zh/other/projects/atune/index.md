---
title: A-Tune | AI智能优化引擎
titleTemplate:  openEuler社区官网
head:
  - - meta
    - name: description
      content:  A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。想要了解更多信息，欢迎访问openEuler官网。 
---

<MarkdownLayout>

![Banner](./assets/banner.jpg)

# A-Tune

## 一款基于AI开发的智能优化引擎

[开启A-Tune调优之旅](https://atomgit.com/openeuler/A-Tune)

[Web UI](https://atomgit.com/openeuler/A-Tune-UI)

</MarkdownLayout>

<MarkdownLayout>

# 简介

## 

A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。

</MarkdownLayout>

<MarkdownLayout>

# 架构

## 

A-Tune主要包括在线时静态调优和离线时动态调优两大核心能力，整体架构包括智能决策、系统画像和交互系统三层。

智能决策层：包含感知和决策两个子系统，分别完成对应用的智能感知和对系统的调优决策。

系统画像层：主要包括自动特征工程和两层分类模型，自动特征工程用于业务特征的自动选择，两层分类模型用于业务模型的学习和分类。

交互系统层：用于各类系统资源的监控和配置，调优策略执行在本层进行。

优化模型库：包含10大类20+款应用场景的优化配置。

![示意图](./assets/business.png)

</MarkdownLayout>

<MarkdownLayout>

# 文档

## 认识A-Tune

查看A-Tune的简介、架构。了解其支持特性与业务模型。

[了解更多](https://atomgit.com/openeuler/A-Tune/blob/master/docs/zh/24.03_LTS_SP2/getting_to_know_a_tune.md)

## 安装与部署

了解安装A-Tune的软硬件要求与环境准备，学习安装、部署和启动A-Tune。

[了解更多](https://atomgit.com/openeuler/A-Tune/blob/master/docs/zh/24.03_LTS_SP2/installation_and_deployment.md)

## 使用方法

本章介绍A-Tune客户端包含的功能和使用方法。学习用命令行使用A-Tune。

[了解更多](https://atomgit.com/openeuler/A-Tune/blob/master/docs/zh/24.03_LTS_SP2/usage_instructions.md)

## 常见问题

点击查看A-Tune常见问题，在这里您可以获取解决方案。

[了解更多](https://atomgit.com/openeuler/docs/blob/stable-common/docs/zh/faq/server/atune_faqs.md)

#

[联系我们](mail-to:a-tune@openeuler.org)

</MarkdownLayout>

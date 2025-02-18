---
title: 基于 openEuler 22.09 版本构建的 NestOS 全新发布
category: blog
date: 2022-10-17
tags:
  - 镜像构建
archives: 2022-10
author:
  - openEuler
summary: 2022 年 9 月，在麒麟软件和欧拉开源社区开发者的共同努力下，基于 openEuler 22.09 版本构建的 NestOS 全新发布！
---

2022 年 9 月，在麒麟软件和欧拉开源社区开发者的共同努力下，基于 openEuler 22.09 版本构建的 NestOS 全新发布！大家可在 NestOS 官网获取镜像（nestos.openeuler.org）。

NestOS 是在欧拉开源社区孵化的云底座操作系统，集成了 rpm-ostree 支持、ignition 配置等技术，采用双根文件系统、原子化更新的设计思路，使用 nestos-assembler 快速集成构建，已与今年三月发布基于 openEuler 22.03 LTS 的稳定版本，在社区维护仓库 50+，涉及 sig 组 6+。

在 openEuler 22.09 版本的 NestOS 中，我们全新推出了构建工具 nestos-assembler 容器镜像，并根据 NestOS 的特性对 K8S，openstack 进行了适配优化，带来全新的安装体验，下面我们一起来看一下 NestOS 新版本的这些特性吧~

## NestOS-assembler

nestos-assembler（简称:nosa）是一个用来构建 NestOS 的容器镜像工具，该容器集成了构建 NestOS 所需的一些脚本、rpm 包和工具，实现了把构建 NestOS 的整个过程都封装在一个容器中。目前 nosa 22.09 版本容器镜像已经发布至 OEPKG 中，基于该镜像可以完成对 NestOS 22.09 版本的构建，并且 nosa 中的 kola 组件已支持对 NestOS 的 qcow2 和 iso 镜像进行测试。nosa 相关介绍详见nestos-assembler 组件介绍[1]

NestOS 中集成适配了 iSulad、Docker、Podman 等主流容器引擎，专为运行容器化工作负载而设计。NestOS 使用 ignition 点火文件配置系统，无论是虚拟化还是裸金属，NestOS 始终都从同一个地方开始，并且，还可将 ignition 保存于服务器中，供 NestOS 远程访问，实现集中式的配置管理，这为实现容器化部署 K8S，大规模部署 OpenStack 提供了可能。

## NestOS 容器化部署 K8S

Kubernetes 从 1.4 版本开始引入了命令行工具 kubeadm，致力于简化集群的安装过程，并解决了 Kubernetes 集群的高可用问题。但是使用 kubeadm 命令行工具安装集群，仍需要执行很多步骤，才能完成对 Kubernetes 的部署，整个过程比较复杂，也容易出错。

为了简化 Kubernetes 的部署过程，NestOS 云底座操作系统支持自定义集成 kubeadm、kubelet、kubectl 等二进制文件，以及其它部署 Kubernetes 所需的软件包依赖项。并且通过点火文件机制提供原生 K8S 部署方案，在安装 NestOS 的同时，即可完成对 Kubernetes 所需资源的部署，以及对 master、node 节点的创建。详细步骤介绍详见NestOS 容器化部署 K8S[2]

## NestOS 容器化部署 OpenStack

OpenStack 是一个云平台管理项目，该项目由 Nova、Keystone、Glance、Swift、Cinder 等重要组件组成，可为公有云、私有云和混合云的建设与管理提供软件，并支持 KVM、Xen、Lvc、Docker 等虚拟机软件或容器。目前，NestOS 已支持容器化部署 OpenStack。

NestOS 旨在作为不可变基础架构进行管理，当机器创建完成后，如想要更新配置，可使用新的 ignition 点火文件配置替换机器。基于该特性，我们可以在 OpenStack 负载增加时，轻松扩展。x 详细步骤介绍详见NestOS 容器化部署 OpenStack[3]

NestOS-22.03-LTS-SP1 版本正在构建和新特性引入中，欢迎感兴趣的开发者加入 sig-CloudNative 和 sig-K8sDistro，与我们一起助 NestOS 更好的成长~

### Reference

[1]nestos-assembler 组件介绍:
https://gitee.com/openeuler/NestOS/blob/master/docs/devel_manual/nestos-assembler%E7%BB%84%E4%BB%B6%E5%88%86%E6%9E%90/nestos-assembler%E7%BB%84%E4%BB%B6%E4%BB%8B%E7%BB%8D.md

[2]NestOS 容器化部署 K8S:
https://gitee.com/openeuler/NestOS/tree/master/docs/use_sample

[3]NestOS 容器化部署 OpenStack:
https://www.openeuler.org/zh/nestos/

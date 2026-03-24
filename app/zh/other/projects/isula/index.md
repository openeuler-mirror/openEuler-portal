---
title: iSula | 通用容器引擎
titleTemplate:  openEuler社区官网
head:
  - - meta
    - name: description
      content:  iSula /'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。想要了解更多信息，欢迎访问openEuler官网。 
---

<MarkdownLayout>

![Banner](./assets/banner.jpg)

# iSula

## 小个头，大能量

[开启iSula之旅](https://gitee.com/openeuler/community/tree/master/sig/iSulad)

</MarkdownLayout>

<MarkdownLayout>

# 简介

##

iSula /'i.zu.la/，其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。因其“小个头、大能量”的含义而取名。

</MarkdownLayout>

<MarkdownLayout>

# 架构

## iSulad

###

iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。

iSulad 的特点如下:

轻量语言：C/C++，Rust on the way

北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行

南向接口：支持OCI runtime和镜像规范，支持平滑替换

容器形态：支持系统容器、虚机容器等多种容器形态

扩展能力：提供插件化架构，可根据用户需要开发定制化插件

以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。

![示意图](./assets/business.png)

## isula-build

###

isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。

构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。

![示意图](./assets/business.png)

## isula-transform

###

isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。

![示意图](./assets/business.png)

</MarkdownLayout>

<MarkdownLayout>

# 文档

## iSulad

### README

阅读iSula的基础信息

[了解更多](https://gitee.com/openeuler/iSulad/blob/master/README.md)

### 架构说明

了解iSula的架构说明

[了解更多](https://gitee.com/openeuler/iSulad/blob/master/docs/design/architecture_zh.md)

### 编译手册

学习isula编译手册

[了解更多](https://gitee.com/openeuler/iSulad/blob/master/docs/build_docs/guide/build_guide_zh.md)

## isula-build

### README

阅读iSula基础信息

[了解更多](https://gitee.com/openeuler/isula-build/blob/master/README.zh.md)

### 使用手册

&nbsp;

[了解更多](https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md)

## isula-transform

### README

阅读iSula基础信息

[了解更多](https://gitee.com/openeuler/isula-transform/blob/master/README.md)

</MarkdownLayout>

<MarkdownLayout>

# 相关链接

## 想对iSula说

&nbsp;

[isulad@openeuler.org](mail-to:isulad@openeuler.org)

## 获取logo

&nbsp;

[点击下载]()

</MarkdownLayout>

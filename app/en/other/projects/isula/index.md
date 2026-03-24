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

## Packs a huge punch in a small size

[Try Now](https://atomgit.com/openeuler/community/tree/master/sig/iSulad)

</MarkdownLayout>

<MarkdownLayout>

# Overview

##

iSula derives its name from a species of ant, one of the most powerful insects in the world despite its small size. This combination of ultimate power and minimal size is the perfect description of the iSula container technology solution.

</MarkdownLayout>

<MarkdownLayout>

# Architecture

## iSulad

###

iSulad provides a unified architecture for different CT and IT requirements. It features a lightweight, fast, and flexible design, unlocking great power like the small isula ant.

iSulad boasts the following features:

Multiple languages: supports C/C++and will support Rust in the future.

Northbound interface: provides the CRI that connects to Kubernets, as well as easy-to-use command lines.

Southbound interface: supports OCI runtime and image specifications for smooth replacement.

Container forms: supports multiple container forms, such as system and VM.

Scalability: provides a plug-in architecture that allows you to develop custom plug-ins.

iSulad is not restricted by hardware specifications and architectures. It features minimal background noise, making it a perfect option for many fields.

![示意图](./assets/business.png)

## isula-build

###

isula-build usually runs in the build environment and provides template container images for the runtime system.

During the build operation, isula-build reads Dockerfile as the input to quickly build container images that comply with the Docker and OCI image specifications. Then, isula-build distributes the images to the iSulad/Docker on the same node, local TAR packages, or remote container image repositories.

![示意图](./assets/business.png)

## isula-transform

###

isula-transform was released together with iSulad 2.0 to convert containers managed by the Docker container engine and migrate them to the iSulad engine. After the migration, iSulad allows you to effortlessly manage the lifecycle of containers.

![示意图](./assets/business.png)

</MarkdownLayout>

<MarkdownLayout>

# Documentation

## iSulad

### README

&nbsp;

[Read more](https://atomgit.com/openeuler/iSulad/blob/master/README.md)

### Architecture

&nbsp;

[Read more](https://atomgit.com/openeuler/iSulad/blob/master/docs/design/architecture.md)

### Build Guide for RISC-V Integration

&nbsp;

[Read more](https://atomgit.com/openeuler/iSulad/blob/master/docs/build_docs/guide/build_guide.md)

## isula-build

### README

&nbsp;

[Read more](https://atomgit.com/openeuler/isula-build/blob/master/README.zh.md)

### Manual

&nbsp;

[Read more](https://atomgit.com/openeuler/isula-build/blob/master/doc/manual_zh.md)

## isula-transform

### README

&nbsp;

[Read more](https://atomgit.com/openeuler/isula-transform/blob/master/README.md)

</MarkdownLayout>

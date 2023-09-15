---
title: 'Release of NestOS Built on openEuler 22.09'
category: blog
date: 2022-10-17
tags:
  - Image building
archives: 2022-10
author:
  - openEuler
summary: In September 2022, with the joint efforts of developers from Kylinsoft and the openEuler community, NestOS built based on openEuler 22.09 was released.
---

In September 2022, with the joint efforts of developers from Kylinsoft and the openEuler community, NestOS built based on openEuler 22.09 was released. You can obtain the OS image from the [official website](https://nestos.openeuler.org).

NestOS is a cloud-based OS incubated in the openEuler community. It provides rpm-ostree support and Ignition mechanism, adopts the dual-root file system and atomic update design, and uses nestos-assembler (nosa for short) for fast building. The NestOS project involves multiple SIGs and maintains more than 50 repositories in the community. The first stable NestOS version was released in March 2022 based on openEuler 22.03 LTS.

The NestOS version built based on openEuler 22.09 provides the nosa container image toolchain, which is optimized based on NestOS features for Kubernetes and OpenStack, bringing brand-new installation experience. Now, let's take a look at features of the new NestOS version.

## nestos-assembler

nestos-assembler (nosa for short) is a container image toolchain that integrates some scripts, RPM packages, and tools required for building NestOS images and encapsulates the entire building process in a container. The container image of the nosa 22.09 version has been released in OEPKGS. Based on this image, NestOS 22.09 can be built. In addition, the kola component in nosa supports tests on QCOW2 and ISO images of NestOS. For details about nosa, see the introduction to nestos-assembler<sup>[1]</sup>.

NestOS integrates mainstream container engines, such as iSulad, Docker, and Podman, and is designed for containerized workloads. NestOS uses an Ignition file to configure the system, be it a virtual or bare metal environment. The Ignition file can be stored on a server for remote access by NestOS to implement centralized configuration and management. This makes it possible for container-based deployment of Kubernetes and large-scale deployment of OpenStack.

## Container-based Deployment of Kubernetes on NestOS

Kubernetes introduced the command line tool **kubeadm** since version 1.4 to simplify cluster installation and realize high availability for Kubernetes clusters. However, when you use **kubeadm** to install a cluster, you need to perform many steps to deploy Kubernetes, which is complex and error-prone.

To simplify Kubernetes deployment, NestOS supports custom integration of binary files such as **kubeadm**, **kubelet**, and **kubectl**, as well as other required software dependencies. In addition, the native Kubernetes deployment solution is provided through the Ignition file mechanism. When installing NestOS, you can deploy resources required by Kubernetes and create the master and other nodes. For details, see the reference about container-based deployment of Kubernetes on NestOS<sup>[2]</sup>.

## Container-based Deployment of OpenStack on NestOS

OpenStack is a cloud platform management project. It consists of key components such as Nova, Keystone, Glance, Swift, and Cinder for the construction and management of public clouds, private clouds, and hybrid clouds, and supports VM software or containers such as KVM, Xen, Lvc, and Docker. NestOS has supported container-based deployment of OpenStack.

NestOS adopts an immutable infrastructure. If you want to update the configuration after a machine is created, you can re-provision the machine using a new Ignition file. With this feature, you can easily expand resources when the OpenStack service load increases. For details, see the reference about container-based deployment of OpenStack on NestOS<sup>[3]</sup>.

The NestOS 22.03 LTS SP1 version is being built and new features are being introduced. You are welcome to join the CloudNative and K8sDistro SIGs to build NestOS together.

### References

[1] Introduction to nestos-assembler:
[https://gitee.com/openeuler/NestOS/blob/master/docs/en/devel_manual/nestos-assembler%20component%20analysis/nestos-assembler%20component%20introduction.md](https://gitee.com/openeuler/NestOS/blob/master/docs/en/devel_manual/nestos-assembler%20component%20analysis/nestos-assembler%20component%20introduction.md)

[2] Container-based deployment of Kubernetes on NestOS:
[https://gitee.com/openeuler/NestOS/blob/master/docs/en/use_sample/Kubernetes/Deploy%20the%20kubernetes%20cluster%20based%20on%20NestOS.md](https://gitee.com/openeuler/NestOS/blob/master/docs/en/use_sample/Kubernetes/Deploy%20the%20kubernetes%20cluster%20based%20on%20NestOS.md)

[3] Container-based deployment of OpenStack on NestOS:
[https://gitee.com/openeuler/NestOS/blob/master/docs/en/use_sample/OpenStack/Deploy%20OpenStack%20by%20container%20based%20on%20NestOS.md](https://gitee.com/openeuler/NestOS/blob/master/docs/en/use_sample/OpenStack/Deploy%20OpenStack%20by%20container%20based%20on%20NestOS.md)

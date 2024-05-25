---
title: 'GCC for openEuler'
category: blog
date: 2024-05-25
tags:
  - GCC
  - GNU compiler collection
  - openEuler
archives: 2024-05
author:
  - G11N SIG
summary: GCC for openEuler, the compiler purpose-built for openEuler, is developed based on the open source GNU Compiler Collection (GCC). It brings enhanced functions and features to openEuler than its ancestor.
---


![1](image/image1.png)

GCC for openEuler, the compiler purpose-built for openEuler, is developed based on the open source GNU Compiler Collection (GCC). It brings enhanced functions and features to openEuler than its ancestor.

As the de facto-standard compiler for the Linux kernel, GCC converts high-level source code into machine-readable instructions while shielding developers from hardware dependencies. It delivers trusted, stable performance and also builds many types of applications in popular Linux distributions.

GCC for openEuler inherits the capabilities of the open source GCC. It also has optimizations on C, C++, and Fortran languages. Its enhanced features, including automatic feedback-directed optimization (FDO), hardware-software collaboration, memory optimization, and automatic vectorization, help explore the ultimate performance of Kunpeng, Phytium, LoongArch, and other hardware platforms.

By supporting the Plug-IN (PIN) framework, GCC for openEuler offers universal plugins to boost the performance, security, reliability, and O&M capabilities of openEuler projects. GCC for openEuler brings the following benefits to developers:

-	Reliable design  
GCC for openEuler has successfully undergone rigorous testing within the open source ecosystem. These tests cover essential functionality, reliability, and compatibility, with an extensive suite of millions of test cases. The openEuler community vulnerability handling ensures that over 90% of public vulnerabilities are detected within 12 hours to prevent vicious attacks.

-	Ultimate performance  
GCC for openEuler provides multiple compilation optimizations across structures, build affinity, FDO, and pipelines. In the intrate performance test of SPEC CPU 2017, GCC for openEuler achieved 1.2 times the performance of GCC 10.3. For typical cloud applications like MySQL, Redis, Nginx, and Ceph, GCC for openEuler improves the scenario-specific performance by 5% to 10% compared with GCC 10.3.

-	Ease of use  
The cross-compilation toolchain of GCC for openEuler has been used to build the openEuler Embedded system. Leveraging the PIN framework, developers do not need to alter the internal logic of the compiler when developing plugins. This framework empowers developers to implement independent compilation optimizations.

-	Vibrant ecosystem  
By supporting programming languages such as C/C++, Fortran, and Objective-C/C++ and enhancing software-defined storage (SDS), database, web, and core network workloads, GCC for openEuler improves application performance by up to 15%. It supports Arm, x86, RISC-V, SW-64, and LoongArch and other mainstream architectures, as well as Kunpeng, Phytium, Zhaoxin, Hygon, Loongson, Sunway, Intel, and AMD processors.

In openEuler 22.03 LTS SP3, GCC for openEuler has several new capabilities available to fit into more application development scenarios. One of these capabilities is optimized last-level cache (LLC) allocation. By analyzing memory multiplexing on the main execution paths in a program, GCC for openEuler determines and sorts hot data. Then, prefetch instructions are inserted to pre-allocate data to the LLC, so as to reduce LLC misses.

For more information about how openEuler helps tackle modern workloads, please visit the [openEuler official website](https://www.openeuler.org/en/).


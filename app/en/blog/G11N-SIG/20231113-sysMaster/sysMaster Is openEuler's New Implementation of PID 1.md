---
title: 'sysMaster Is openEuler's New Implementation of PID 1'
category: blog
date: 2023-11-13
tags:
  - sysMaster
  - openEuler
  - PID 1
archives: 2023-11
author:
  - G11N SIG
summary: PID 1, also known as the init process, is the initial process that starts all other processes on Unix-like systems, including Linux.
---

PID 1, also known as the init process, is the initial process that starts all other processes on Unix-like systems, including Linux. It is the first program created during OS boot, responsible for bringing the system to a functional state. Traditionally, Linux used SysVinit as PID 1, but many modern Linux distributions have transitioned to systemd, a more sophisticated init process.

While systemd has gained popularity and brought several benefits to Linux distributions, it also faces criticism and concerns from some users and developers. Some commonly cited disadvantages of systemd are:

-	Complexity: systemd is overly complex, making it harder to understand and troubleshoot issues.

-	Tight integration: systemd's tight integration with the OS can lead to vendor lock-in.

-	Monolithic design: systemd combines rich functions into a single package, which some view as contrary to the Unix philosophy of "do one thing and do it well."

-	Slow boot: Despite claims of improved parallelization, some users report that systemd can lead to longer boot times.

-	Poor reliability: A function problem of systemd has a bigger impact. When systemd is faulty, the entire OS must be restarted to recover from the fault.

These challenges inspire the dev-utils SIG of the openEuler community to develop sysMaster. sysMaster is a collection of ultra-lightweight and highly reliable service management programs. It divides the functions of traditional PID 1 into a **1+1+N** architecture, corresponding to sysmaster-init, sysmaster-core, and sysmaster-extends:

-	**1: sysmaster-init** replaces the traditional init process or systemd. Written in only a thousand lines of code in Rust, sysmaster-init offers ultimate reliability and simplified functions, such as OS initialization, zombie process recycling, and keep-alive monitoring.
-	**1: sysmaster-core** undertakes the core service management functions and incorporates the reliability framework to enable live updates and quick self-recovery in the event of crashes, ensuring 24/7 service availability.

-	**N: sysmaster-extends** are a collection of components for you to extend OS functions based on your needs. With these components, such as devMaster for device management and busMaster for bus communication, key OS functions are no longer tightly coupled with PID 1.

Featuring a scalable component architecture and lightweight PID 1 process, sysMaster delivers fast startup speed with low memory overhead and can recover in seconds in the event of crashes. sysMaster also provides migration tools to help migrate programs from systemd to sysMaster.

sysMaster's design and performance will be further refined in the future for greater scalability and flexibility. New features and components will also be developed to satisfy the requirements in container, virtualization, and edge computing scenarios. These enhancements will make sysMaster a more powerful, efficient, and user-friendly OS management framework. 
For more about the new PID 1 implementation and other innovative features of openEuler, visit the
[openEuler official website](https://www.openeuler.org/en/).

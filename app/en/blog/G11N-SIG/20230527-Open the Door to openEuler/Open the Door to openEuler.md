---
title: 'Open the Door to openEuler'
category: blog
date: 2023-05-27
tags:
  - openEuler
archives: 2023-05
author:
  - G11N SIG
Summary: openEuler introduction
---
## What Is openEuler?  

openEuler is an open source OS that unleashes the potential of computing processors. It is a reliable OS built by global contributors, to fit database, big data, cloud computing, and artificial intelligence (AI) workloads. Currently, the latest openEuler kernel runs on Linux and supports Kunpeng and other mainstream processors.  

## Key Features

### Innovations Based on Linux Kernel 5.10

openEuler optimizes scheduling, I/O, and memory management and unleashes diversified computing power, such as ARM64, x86, and RISC-V.  

•	**Dynamic kernel preemption**: The boot option **preempt** is added, to allow the kernel to dynamically switch the preemption mode. The value of **preempt** can be **none**, **voluntary**, or **full**.  

•	**mremap performance optimization**: Entries at the PMD and PUD levels can be moved to accelerate mapping large memory blocks.  

•	**Per memory cgroup LRU lock**: It alleviates lock contention between cloud native container instances.  

•	**Huge page memory management optimization**: The tail pages of HugeTLB huge pages are released in shared mapping mode to reduce overheads and memory usage incurred by huge page memory.  

•	**Concurrent TLB updates**: The local and remote translation lookaside buffers (TLBs) can be updated concurrently to optimize the TLB shootdown process, accelerating TLB updates and improving performance.  

•	**Optimized huge page vmalloc**: When calling vmalloc() to allocate spaces that exceed the minimum size of huge pages, huge pages not base pages are used to map the memory, to improve the TLB utilization and slash TLB misses.  

•	**UCE fault tolerance**: When an uncorrectable error (UCE) occurs to the copy_from_user function, the system kills the associated user-mode process instead of kernel panicking. Disabled by default, you can enable this feature by adding **CONFIG_UCE_KERNEL_RECOVERY** to the kernel, and configure it in the kernel boot parameter interface **/proc/cmdline** (add **uce_kernel_recovery=[0,4]**) and proc interface **/proc/sys/kernel/uce_kernel_recovery**.  

### File System for New Media

EulerFS uses an innovative technology for metadata soft update. Its pointer-based dual-view counting mechanism for directories reduces metadata synchronization overhead and improves the call performance for file system functions (create, unlink, mkdir, and rmdir).

### Tiered Memory Expansion

Various memory and storage media can be used to expand the system memory capacity and free up memory.  

**User-mode swap**: The evicted cold memory can be swapped to the user-mode storage based on a preset etMem policy. The user-mode swap delivers higher performance than the kernel-mode swap and the whole swap process is transparent.  

### User-Mode Protocol Stack

The Gazelle user-mode protocol stack can be used without modifying or recompiling programs, to support high-performance and low-latency network transmission for upper-layer applications.  
**Gazelle user-mode protocol stack**: Powered by Data Plane Development Kit (DPDK) and lwIP, Gazelle is a lock-free, multi-thread, and high-performance user-mode protocol stack that improves network performance. It can be used without modification, adaptation, or recompilation.  

### Enhanced Cloud Native Scheduling

Online and interactive cloud services are impacted by latency and have a tidal effect. Typically, such services have a CPU usage of under 15%. A hybrid deployment of online and offline services can improve resource utilization.  

•	**Quality-Aware Scheduler (QAS)**: Ensures online tasks preempt CPU resources, schedules tasks in a deterministic manner, and suppresses interference from offline tasks.  

•	**Memory reclamation for OOM**: In the event of OOM, memory reclamation is preferentially performed for process groups with low priorities, ensuring the running of online services.  

•	**Hybrid container deployment framework**: In a hybrid Kubernetes cluster, openEuler users only need to add online or offline labels to services. The system automatically detects service creation and configures resources based on priorities, to implement resource isolation and preemption.  

### QEMU Hot Patch

LibcarePlus: A hot patch framework that can fix QEMU process bugs without impacting VM services.  

### KubeOS

KubeOS is a container OS that centrally manages cloud-native cluster OSs in containers. It provides the following functions:  

•	**OS containerization**: Interconnects with Kubernetes to facilitate unified OS management and atomized lifecycle management.  

•	**Lightweight OS tailoring**: Removes unnecessary packages for quicker upgrades and replacement.  

### Enhanced Lightweight Secure Container

Powered by StratoVirt, a lightweight virtualization technology, VMs are more secure with resource consumption at the container level.  

•	**UEFI boot**: Supports UEFI boot, ACPI tables, and addition of PCIe/PCI devices (including virtio-pci) to VMs.  

•	**VFIO**: Allows physical devices on the host to be accessed from VMs, and enables VMs to have similar performance to bare metal machines.  

•	**Hot swap of passthrough devices**: Devices such as virtio-blk-pci, virtio-net-pci, and VFIO can be hot swapped, which prevents system shutdown and service interruption caused by peripheral replacement.  

### Enhanced iSulad

The shimv2 process incorporates the kata-runtime, kata-shim, and kata-proxy processes, and the RPCs are invoked to process various containers during the runtime. Lifecycle management commands are used to simplify the system architecture.  

### Dual-Plane Deployment

eggo is a Kubernetes cluster deployment and management project that belongs to the openEuler CloudNative special interest group (SIG). It provides efficient and stable cluster deployment. 

•	**Version-based management**: Uses Git repositories to store and track cluster configuration changes.  

•	**x86/ARM dual planes**: Implements unified cluster deployment, monitoring, and audit of OSs.  

### Edge Computing

The unified edge-cloud framework KubeEdge+ implements base capabilities such as edge-cloud application management and deployment, as well as communication between edge and cloud.  

•	**Unified management**: Manages devices in a single cluster over a unified platform.  

•	**Network collaboration**: Supports edge-cloud bidirectional communication and communication between edge nodes in private subnets.  

•	**Edge autonomy**: Supports edge autonomy to ensure that edge nodes run even in unstable network conditions, and supports metadata persistence and quick recovery of edge nodes.  

•	**Lightweight edge**: Occupies less memory and runs properly even when resources are limited.  

### Embedded Image

•	**Lightweight models**: The Yocto small-scale build tailoring framework allows you to compress system items into lightweight models. For example, OS images can be reduced to less than 5 MB, memory overheads to under 15 MB, and startup to under 5s.  

•	**Multi-hardware support**: Supports Raspberry Pi 4B as the universal hardware for embedded scenarios.  

•	**Soft real-time kernel**: The capabilities of soft real-time kernel (Linux Kernel 5.10) ensures an interrupt response latency in microseconds.  

•	**Hybrid critical deployment**: Allows hybrid deployment of real-time and non-real-time planes in an SOC, as well as Zephyr real-time kernel.  

•	**Distributed soft bus (DSoftBus)**: DSoftBus is used to facilitate interconnection between embedded devices running on openEuler.  

•	**Embedded software package**: Over 80 common embedded software packages can be built using openEuler.  

### secPaver

secPaver is an SELinux policy development tool used to assist in development of security policies for new applications.  

Policy management: Provides a language for high-level configuration and generates SELinux policy files based on the policy configuration file, to lower the barrier for using SELinux.  

### NestOS

NestOS is a cloud-based OS provided by the CloudNative SIG of the openEuler community. It helps ensure container hosts run secure containerized workloads on a large scale.  

•	**Out-of-the-box container platforms**: Comprises mainstream basic container platforms such as iSulad, Docker, PodMan, and CRI-O.  

•	**Easy operations**: Ignition provides personalized configuration and installation.  

•	**Secure package management**: rpm-ostree is used for reliable package management.  

•	**Zincati**: The user-friendly and controllable automatic update agent Zincati provides insensible upgrade.  

•	**Dual-partition system**: This design ensures system security.  

### Third-Party Application Support

•	**KubeSphere**: It is an application-centric and open-source container platform built on Kubernetes. It is supported and maintained by the KubeSphere SIG of the openEuler community.  

•	**OpenStack Wallaby**: Released in April 2021, the latest Wallaby software includes important updates of core projects such as Nova, Kolla, Cyborg, and Tacker.  

•	**OpenResty**: A high-performance web platform built on Nginx and Lua.  

### Desktop Environments  

Extensive desktop environments are provided to better help development practices:  

•	**DDE**: upgraded to meet workloads of drawing board, music, and cinema applications  

•	**UKUI**: upgraded to ensure use of Chinese input method and multimedia  

•	**kiran-desktop**

•	**GNOME** 


Reference:  

openEuler website: Click [here](https://datastat.openeuler.org/en/overview).  

GitHub repo: Click [here](https://github.com/openeuler-mirror).

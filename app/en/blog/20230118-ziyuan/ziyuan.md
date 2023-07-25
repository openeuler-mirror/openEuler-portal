---
title: 'openEuler Resource Utilization Optimization (6): OpenStack Scheduling for VM Hybrid Deployment'
category: blog
date: 2023-01-17
tags:
  - openEuler
archives: 2023-01
author:
  - openEuler
summary: Hybrid VM deployment allows VMs that have different requirements on CPU, I/O, and memory resources to be deployed and migrated to the same compute node in scheduling mode, fully utilizing node resources.

---


Hybrid VM deployment allows VMs that have different requirements on CPU, I/O, and memory resources to be deployed and migrated to the same compute node in scheduling mode, fully utilizing node resources.


Hybrid VM deployment can be employed in many scenarios, such as dynamic resource scheduling for node resources, and dynamic VM distribution adjusted based on user habits. The scheduling based on VM priorities is one of the methods to employ hybrid VM deployment. For single-node resource scheduling and allocation, high-priority and low-priority VMs are distinguished. If a high-priority VM competes with a low-priority VM, resources are preferentially allocated to the high-priority VM to ensure its quality of service (QoS).


This technology is introduced to OpenStack Nova. By cooperating with Skylark QoS, the requirements of VM hybrid deployment can be met to some extent.

Implementation
--------


The concepts of high/low-priority have been introduced to the VM creation and migration processes in Nova, and these priorities are assigned as attributes to VM objects. High-priority VMs are scheduled to nodes with sufficient resources as much as possible. The memory and CPU resources of such nodes cannot be oversubscribed.

When creating a flavor or VM, you can specify the priority of the flavor or VM, and the priority attribute does not affect Nova's existing resource model and node scheduling polities. In other words, Nova selects compute nodes and create VMs following the normal process.

The high/low-priority of VMs affect the resource scheduling and allocation policies at the single-node level after VMs are created. When a high-priority VM competes with a low-priority VM for resources, resources are preferentially allocated to the high-priority VM to ensure its QoS.


Nova has the following changes based on the high/low-priority features of VMs:

-   The high/low-priority attributes are added to VM objects and flavors.
     Based on service scenarios, the high-priority attribute is set only for core-binding VMs, and the low-priority attribute is set only for non-core-binding VMs.

-   For VMs with priority attributes, modify their libvirt XML configuration files to enable QoS management component Skylark on the hosts for perception,
    so as to automatically allocate resources and manage QoS.

-   The core binding range of low-priority VMs is changed to make full use of idle resources that are not used by high-priority VMs.

How to Use
--------

### Preparations

Assume that one host meets the following requirements:

1.  The host has 12 CPU cores.

2.  The OS is openEuler 22.09 with Skylark service installed, and the kernel version meets the requirements of Syklark.
    
3.  OpenStack Yoga has been installed and deployed using an RPM package.

### Installation

1.  Install the plugin.

```
dnf install openstack-plugin-priority-vm
```

2.  Configure the databases.

```
nova-manage api_db sync

nova-manage db sync
```

3. Restart the Nova service.

```
systemctl restart openstack-nova-*
```

### Configuration

1.  Modify the **nova.conf** file.

Open **/etc/nova/nova.conf** and modify **cpu\_dedicated\_set**, **cpu\_shared\_set**, and **cpu\_priority\_mix\_enable** under **\[compute\]**. **cpu\_dedicated\_set** indicates the CPU cores that can be used by a high-priority VM, **cpu\_shared\_set** indicates the CPU cores that can be used by a low-priority VM, and **cpu\_priority\_mix\_enable** (defaults to **False**) indicates whether to allow a low-priority VM to use the CPU cores specified by **cpu\_dedicated\_set** at the same time.


The following is an example:

```
[compute]
cpu_dedicated_set=0-7
cpu_shared_set=8-11
cpu_priority_mix_enable=True
```

2.  Restart the nova-compute service.

```
systemctl restart openstack-nova-compute
```

### Usage

1.  Create new flavors.

```
openstack flavor create --ram 8192 --disk 50 --vcpus 8 --public  --property hw:cpu_priority='low' low_prio
openstack flavor create --ram 8192 --disk 50 --vcpus 8 --public  --property hw:cpu_priority='high' --property hw:cpu_policy='dedicated' high_prio
```

2.  Create VMs by using the flavors.

```
openstack server create --flavor high_prio --image openEuler2203 --network private-network high_prio_test
openstack server create --flavor low_prio --image openEuler2203 --network private-network low_prio_test
```

### Check

Run **virsh list** to view the VM IDs, and then run **virshvcpuinfo** to view the CPUs of the VMs. In the command output, the CPUs of **high\_prio\_test** are bound to CPUs 0—7, and the CPUs of **low\_prio\_test** are bound to CPUs 0—11.


Summary
----

This feature has been released in OpenStack Yoga of openEuler 22.09, and will be integrated in OpenStack Train in openEuler 22.03 LTS SP.  You are welcome to explore this feature and provide feedback and experience in OpenStack SIG.

Join Us
--------

The resource utilization optimization technologies described in this article are jointly developed by the Cloud Native SIG, Kernel SIG, OpenStack SIG, and Virt SIG. The source code will be gradually open-sourced in the openEuler community. If you are interested in related technologies, you are welcome to join us.  

Related Articles
------------

\[1\] openEuler Resource Utilization Optimization (1): Overview
: [https://mp.weixin.qq.com/s/x9sdogEslRJJ5mDbs5bxgQ](https://mp.weixin.qq.com/s/x9sdogEslRJJ5mDbs5bxgQ)

\[2\] openEuler Resource Utilization Optimization (2): Effect in Typical Applications
: [https://mp.weixin.qq.com/s/anOTdRIufYaj5pl4hy1e\_A](https://mp.weixin.qq.com/s/anOTdRIufYaj5pl4hy1e\_A)

\[3\] openEuler Resource Utilization Optimization (3): Introduction to Rubik
: [https://mp.weixin.qq.com/s/jJXeBCRM2k92rPqyA6SL-Q](https://mp.weixin.qq.com/s/jJXeBCRM2k92rPqyA6SL-Q)

\[4\] openEuler Resource Utilization Optimization (4): CPU Preemption and SMT Isolation Control
: [https://mp.weixin.qq.com/s/8Odi24WjKAho8SYsYd7a1A](https://mp.weixin.qq.com/s/8Odi24WjKAho8SYsYd7a1A)

\[5\] openEuler Resource Utilization Optimization (5): Introduction to VM Hybrid Deployment and Power Consumption Management
: [https://mp.weixin.qq.com/s/wXE5cpx2jBvXEISToqhW3Q](https://mp.weixin.qq.com/s/wXE5cpx2jBvXEISToqhW3Q)

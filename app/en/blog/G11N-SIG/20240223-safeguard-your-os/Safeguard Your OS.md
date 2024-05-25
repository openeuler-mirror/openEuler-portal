---
title: 'Safeguard Your OS'
category: blog
date: 2024-02-23
tags:
  - OS
  - openEuler
archives: 2024-02
author:
  - G11N SIG
summary: safeguard helps protect the Linux kernel and the OS based on eBPF by intercepting and auditing security operations. It uses the libbpfgo library and the Go language to implement top-level control. 
---

safeguard helps protect the Linux kernel and the OS based on eBPF by intercepting and auditing security operations. It uses the libbpfgo library and the Go language to implement top-level control. The safeguard project has been open-sourced and is maintained by sig-ebpf of openEuler at [https://gitee.com/openeuler/safeguard](https://gitee.com/openeuler/safeguard).

## Features

-	Audit: Logs behavior within the scope of the configuration file.

-	Control: Secures access control for files, processes, and networks.

-	Behavior analysis: Collects information and analyzes resources, hotspots, and exceptions.

## Functions

**File safeguarding**:
-	Traces file system activities, including file open, close, reads/writes, and delete.

-	Modifies the behavior of file systems through the interception of certain file operations and custom security policies.

Security policies:

1. Operations on files can be intercepted or redirected through eBPF. For example, read and write operations on sensitive files can be intercepted, and access to certain files can be redirected.

2. Access control can be customized. eBPF checks the identity, permissions, and environment of a user who requests access to a file, and allows or denies the request based on custom rules.

3. Audit and monitoring can be customized. For example, eBPF records the information about operations on certain files, such as the operator, time, and action, and outputs the information to the logs.

**Process safeguarding**:

-	Traces the process life cycles, such as process creation, termination, scheduling, and context switching.

-	Modifies the behavior of processes, such as injecting or modifying some system calls or implementing custom scheduling policies.

**Network safeguarding**:
-	Traces network activities, such as sending, receiving, forwarding, and discarding network packets.

-	Modifies the behavior of networks through filtering and rewriting of network packets and custom routing policies.


## Application Scenarios

safeguard is a Linux security audit and control solution based on KRSI, which is a combination of eBPF and LSM. safeguard ensures OS-wide comprehensive protection and monitoring. While able to fit into a wide range of scenarios, it mainly streamlines the following areas:

-	Container security: Audits and controls behavior inside a container. For example, safeguard records the container process, file, and network activities, limits resources or ports available to the container, and detects abnormal container behavior. In this way, safeguard protects the container against attacks or abuse, thereby improving the container security and stability.

-	Cloud service security: Audits and controls the clients of cloud service providers. For example, safeguard records OSs, applications, and users of clients, limits the commands and system calls available to clients, and detects malicious behavior or exploitation of vulnerabilities. This helps cloud service providers protect resources and reputations and prevents clients from being intruded upon or damaged.

-	Security compliance: Audits and controls system security compliance. For example, safeguard records information about system configurations, permissions, and logs, prevents the system from modifying specific settings or files, and detects violations and abnormal events in the system. This ensures compliance with security standards and regulations and improves the system credibility and legitimacy.


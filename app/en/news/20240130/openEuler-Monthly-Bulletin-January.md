---
title: 'openEuler Monthly Bulletin – January'
date: '2024-01-30'
category: news
tags:
  - openEuler
  - Newsletter
banner: 'img/banners/20240207-newsletter.jpg'
author: 'openEuler'
summary: "What's new in the openEuler community: Jan 2024"
---

![](./images/20240207-newsletter.jpg)

Greetings from the openEuler community! Welcome to the first edition of the openEuler monthly bulletin in 2024, where you can find the most recent updates and highlights of the openEuler community in January.

## Community Scale

As of January 31, 2024, the openEuler community has more than 2.16 million users and over 17,000 developers, with a total of over 150,000 PRs and 77,000+ issues created. In addition, the openEuler community has grown its network to 1,438 organizations, with 17 new ones joining this month.

## Community Highlights

### FOSSASIA Codeheat is underway
The annual coding competition Codeheat, organized by [FOSSASIA](https://fossasia.org/), has recently launched, with several [openEuler-related issues](https://github.com/search?q=org%3Afossasia+label%3Acodeheat+openEuler&type=issues). Developers are welcome to join the competition to solve practical problems and foster the innovation and development of open source projects. The competition is open to anyone from anywhere in the world. Interested participants can register on the [Codeheat official website](https://codeheat.org/) and choose the projects they want to contribute to. The competition will last until March 31, 2024.

![](./images/图片1.jpg)

## Community Governance

### The openEuler Committee holds its sixth meeting in Beijing
On January 25, the sixth meeting of the openEuler Committee was held at the Institute of Software, Chinese Academy of Sciences in Beijing. The meeting brought together the representatives of the openEuler community's Technical Committee, Marketing Committee, User Committee, and OSPO. They reviewed the community's operations and governance performance and achievements in 2023, and outlined the implementation strategy for the openEuler community in 2024. The openEuler Committee also set the goals for the community's development in 2024 at the meeting.

## Technical Progress

### The openEuler Embedded SIG works with Beihang University on the intelligent robot software stack based on a heterogeneous multi-core hybrid deployment platform
The [Embedded SIG](https://www.openeuler.org/en/sig/sig-detail/?name=sig-embedded) has developed a new out-of-the-box intelligent robot operating system, AiROS, which newly adds the following repositories:

- [RobotBrain](https://gitee.com/openeuler/RobotBrain)
Adapts to the six-axis robotic arm of the EtherCAT bus with robot controller program, which includes robot forward and inverse kinematics, data management, configuration management, demonstration, etc.

- [RobotStudio](https://gitee.com/openeuler/RobotStudio)
Provides a set of upper computer programs based on the RobotBrain controller runtime program, [Electron](https://www.electronjs.org/), and [Vue.js](https://vuejs.org/); supports the deployment of the handheld operator software via [Qt](https://www.qt.io/)+[WebEngine](https://webenginecms.org/)+Vue.js.

### openEuler Embedded 22.03 LTS SP3 is released
The [openEuler Embedded 22.03 LTS SP3](https://www.openeuler.org/en/download/?version=openEuler%2022.03%20LTS%20SP3) offers improved quality and features and streamlines engineering process of pulling source code, resulting in higher build efficiency. It also extends its support for multiple BSPs, such as RK3588, RK3399, and Allwinner A40i, broadening the applicability. The kernel minor release has been updated to 5.10.0-177.0.0, boosting the overall performance by about 2%. The SP3 has enhanced the support for iSula, making most of the [iSula](https://www.openeuler.org/en/other/projects/isula/) functions available on openEuler Embedded. It has also resolved the issue of HTTPS download, allowing iSula and other HTTPS-dependent processes to access the Internet properly, and further improving the ecological interconnection.

### openEuler natively supports Lustre
[Lustre](https://www.lustre.org/) is a parallel file system that is widely used in the HPC/AI field with high scalability, performance, and availability. Besides the Lustre client RPM packages integrated in the openEuler 22.03 LTS SP2, the latest openEuler 22.03 LTS SP3 has added the Lustre server RPM packages. Hence, openEuler now supports the full features of Lustre, which is based on the latest 2.15.4 LTS version of the upstream community, and merges compatible patchsets from the master branch. Welcome to [download](https://docs.openeuler.org/en/docs/22.03_LTS_SP3/docs/lustre/user-guide.html) and try it.

### Big Data SIG's work progress
The [Big Data SIG](https://www.openeuler.org/en/sig/sig-detail/?name=bigdata) continues to build and improve the openEuler community's big data ecosystem, create an active platform for big data exchange, enhance the functionality and performance of big data components, discover user needs for big data, and incubate potential big data components. The following are the technical achievements of the Big Data SIG in January:

- Added the [uadk-bigdata](https://github.com/openeuler-mirror/uadk-bigdata) project
This project aims to build a full-stack acceleration solution for big data, from hardware to software. It integrates UADK and OpenSSL 3.0 to create an effective channel, and connects JDK with OpenSSL 3.0, enabling hardware acceleration for big data applications.

- Added the [bigtop-manager](https://gitee.com/openeuler/bigtop-manager) project
Bigtop-manager is a cloud-native platform for big data cluster management, providing a lightweight solution to efficiently manage the big data components supported by Apache Bigtop. The initial code has been uploaded, and everyone is welcome to participate in the project.

### ROS SIG's work progress
The [ROS SIG](https://www.openeuler.org/en/sig/sig-detail/?name=sig-ROS) has added support for several ROS 2 packages, to enhance the performance and functionality of the ROS 2 humble desktop on openEuler 24.03. Moreover, the ROS SIG has enabled some of the large-scale ROS packages, such as SLAM and Navigation, to run on the robotic car based on the RISC-V architecture. In January, the ROS SIG also began the reconstruction of ROS 1 Noetic, which achieved a large-scale decoupling from the community dependency libraries, and is expected to be released with the community version in 2024.

### Infrastructure SIG's work progress
The [Infrastructure SIG](https://www.openeuler.org/en/sig/sig-detail/?name=Infrastructure) has always been working hard to improve the developer experience:

- Upgraded the intelligent search on the official website.
- Added new mirror sites, including [Jiangxi University of Science and Technology](https://mirrors.jxust.edu.cn/openeuler/) and [RWTH Aachen University](https://ftp.halifax.rwth-aachen.de/openeuler/).

### GreatSQL releases RPM packages for the openEuler LTS version
[GreatSQL](https://gitee.com/src-openeuler/greatsql) is an open source database designed for the finance sector that can run on ordinary hardware, featuring high availability, performance, compatibility, and security. It can be used as an ideal alternative to MySQL or Percona Server for MySQL. The latest GreatSQL 8.0.32-25, which offers high availability based on MGR, has released the RPM packages for the openEuler LTS version and is compatible with most of the Oracle features. It also supports the AP analysis engine, InnoDB parallel query, parallel data loading, and more enterprise-level security features. Welcome to download and install it.

### openEuler's gala-gopher project enables observability in cloud native based on eBPF
[gala-gopher](https://docs.openeuler.org/en/docs/22.03_LTS_SP1/docs/A-Ops/using-gala-gopher.html) is the observable component of openEuler's project A-Ops, which provides data such as Metrics, Event, and Perf. To address the issues of observability in cloud native, gala-gopher analyzes the O&M changes and challenges based on the eBPF technology, proposes the limitations and solutions of eBPF, and introduces the practice of openEuler to quickly build observability capabilities by integrating probes.

## Software & Hardware Compatibility

As of January 2024, a total of 1,486 hardware and software products were certified as compatible with openEuler. This includes 974 applications, 449 hardware components, and 129 OSs, among which, 67 applications, 13 hardware components, and 5 OSs were added to the [compatibility list](https://www.openeuler.org/en/compatibility/)  in January.

## Security Bulletins

In January, we published 107 security notices, patched 88 vulnerabilities (including 6 critical, 43 high, and 39 others).

The following vulnerabilities have a significant impact and require special attention:

In exif\_entry\_get\_value of exif-entry.c, there is a possible out of bounds write due to an integer overflow. This could lead to remote code execution if a third-party app used this library to process remote image data with no additional execution privileges needed. User interaction is not needed for exploitation. Product: AndroidVersions: Android-8.1 Android-9 Android-10 Android-11 Android-8.0Android ID: A-159625731 ([CVE-2020-0452](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2020-0452&packageName=libexif)) – CVSS 9.8
Affected release:
openEuler 20.03 LTS SP1
openEuler 20.03 LTS SP4
openEuler 22.03 LTS
openEuler 22.03 LTS SP1
openEuler 22.03 LTS SP2
openEuler 22.03 LTS SP3

Templates do not properly consider backticks (\`) as Javascript string delimiters, and do not escape them as expected. Backticks are used, since ES6, for JS template literals. If a template contains a Go template action within a Javascript template literal, the contents of the action can be used to terminate the literal, injecting arbitrary Javascript code into the Go template. As ES6 template literals are rather complex, and themselves can do string interpolation, the decision was made to simply disallow Go template actions from being used inside of them (e.g. var a = "." ), since there is no obviously safe way to allow this behavior. This takes the same approach as github.com/google/safehtml. With fix, Template.Parse returns an Error when it encounters templates like this, with an ErrorCode of value 12. This ErrorCode is currently unexported, but will be exported in the release of Go 1.21. Users who rely on the previous behavior can re-enable it using the GODEBUG flag jstmpllitinterp=1, with the caveat that backticks will now be escaped. This should be used with caution. ([CVE-2023-24538](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2023-24538&packageName=containernetworking-plugins)) – CVSS 9.8
Affected release:
openEuler 20.03 LTS SP1
openEuler 20.03 LTS SP4
openEuler 22.03 LTS
openEuler 22.03 LTS SP1
openEuler 22.03 LTS SP2
openEuler 22.03 LTS SP3

Netdata is an open source option for real-time infrastructure monitoring and troubleshooting. An attacker with the ability to establish a streaming connection can execute arbitrary commands on the targeted Netdata agent. When an alert is triggered, the function \`health\_alarm\_execute\` is called. This function performs different checks and then enqueues a command by calling \`spawn\_enq\_cmd\`. This command is populated with several arguments that are not sanitized. One of them is the \`registry\_hostname\` of the node for which the alert is raised. By providing a specially crafted \`registry\_hostname\` as part of the health data that is streamed to a Netdata (parent) agent, an attacker can execute arbitrary commands at the remote host as a side-effect of the raised alert. Note that the commands are executed as the user running the Netdata Agent. This user is usually named \`netdata\`. The ability to run arbitrary commands may allow an attacker to escalate privileges by escalating other vulnerabilities in the system, as that user. The problem has been fixed in: Netdata agent v1.37 (stable) and Netdata agent v1.36.0-409 (nightly). As a workaround, streaming is not enabled by default. If you have previously enabled this, it can be disabled. Limiting access to the port on the recipient Agent to trusted child connections may mitigate the impact of this vulnerability. ([CVE- 2023-22496](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2023-22496&packageName=netdata)) – CVSS 9.8
Affected release:
openEuler 20.03 LTS SP1
openEuler 22.03 LTS
openEuler 22.03 LTS SP1

In Perl before 5.38.2, S\_parse\_uniprop\_string in regcomp.c can write to unallocated space because a property name associated with a p{...} regular expression construct is mishandled. The earliest affected version is 5.30.0. ([CVE-2023-47100](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2023-47100&packageName=perl)) – CVSS 9.8
Affected release:
openEuler 22.03 LTS
openEuler 22.03 LTS SP1
openEuler 22.03 LTS SP2

Netdata is an open source option for real-time infrastructure monitoring and troubleshooting. Each Netdata Agent has an automatically generated MACHINE GUID. It is generated when the agent first starts and it is saved to disk, so that it will persist across restarts and reboots. Anyone who has access to a Netdata Agent has access to its MACHINE\_GUID. Streaming is a feature that allows a Netdata Agent to act as parent for other Netdata Agents (children), offloading children from various functions (increased data retention, ML, health monitoring, etc) that can now be handled by the parent Agent. Configuration is done via \`stream.conf\`. On the parent side, users configure in \`stream.conf\` an API key (any random UUID can do) to provide common configuration for all children using this API key and per MACHINE GUID configuration to customize the configuration for each child. The way this was implemented, allowed an attacker to use a valid MACHINE\_GUID as an API key. This affects all users who expose their Netdata Agents (children) to non-trusted users and they also expose to the same users Netdata Agent parents that aggregate data from all these children. The problem has been fixed in: Netdata agent v1.37 (stable) and Netdata agent v1.36.0-409 (nightly). As a workaround, do not enable streaming by default. If you have previously enabled this, it can be disabled. Limiting access to the port on the recipient Agent to trusted child connections may mitigate the impact of this vulnerability. ([CVE-2023-22497](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2023-22497&packageName=netdata)) – CVSS 9.8
Affected release:
openEuler 20.03 LTS SP1
openEuler 22.03 LTS
openEuler 22.03 LTS SP1

An issue in HTACG HTML Tidy v5.7.28 allows attacker to execute arbitrary code via the -g option of the CleanNode() function in gdoc.c. ([CVE-2021-33391](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2021-33391&packageName=tidy)) – CVSS 9.8
Affected release:
openEuler 20.03 LTS SP1
openEuler 20.03 LTS SP4
openEuler 22.03 LTS
openEuler 22.03 LTS SP1
openEuler 22.03 LTS SP2
openEuler 22.03 LTS SP3

Templates do not properly consider backticks (\`) as Javascript string delimiters, and do not escape them as expected. Backticks are used, since ES6, for JS template literals. If a template contains a Go template action within a Javascript template literal, the contents of the action can be used to terminate the literal, injecting arbitrary Javascript code into the Go template. As ES6 template literals are rather complex, and themselves can do string interpolation, the decision was made to simply disallow Go template actions from being used inside of them (e.g. "var a = ."), since there is no obviously safe way to allow this behavior. This takes the same approach as github.com/google/safehtml. With fix, Template.Parse returns an Error when it encounters templates like this, with an ErrorCode of value 12. This ErrorCode is currently unexported, but will be exported in the release of Go 1.21. Users who rely on the previous behavior can re-enable it using the GODEBUG flag jstmpllitinterp=1, with the caveat that backticks will now be escaped. This should be used with caution. ([CVE-2023-24538](https://www.openeuler.org/en/security/cve/detail/?cveId=CVE-2023-24538&packageName=ignition)) – CVSS 9.8
Affected release:
openEuler 22.03 LTS SP1

You can find the [security announcements](https://www.openeuler.org/en/security/security-bulletins/) on the openEuler official website and install the vulnerability patches in time.

## Thank You for Your Support

This is the end of the openEuler Monthly Bulletin for January. We would like to thank all the contributors, partners, and users who have made these achievements possible and supported openEuler. We appreciate your feedback and participation in the openEuler community. Please stay tuned for more updates and exciting news from openEuler in the future.
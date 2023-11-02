---
title: "openEuler's Basic Container Image Now Supports Periodic Updates"
category: blog
date: 2023-09-01
tags:
  - basic container image
archives: 2023-09
author:
  - openEuler
summary: The basic container image of the openEuler supports periodic update.
---

**Thanks to the joint efforts of the Release, Infra, and QA SIGs, the openEuler basic container image now supports periodic updates.**

The function of automatically updating container images periodically was made available on August 30, 2023, including the periodic update of the 20.03 and 22.03 maintenance versions.
\[1\]

The container image is updated once a month at the official website of openEuler\[2\] and automatically released to the container repository\[4\] including Dockerhub, through EulerPublisher\[3\]. This ensures that users of the openEuler community can experience stable, secure, and real-time updated basic container images. 

In the future, EulerPublisher will gradually integrate the cloud and WSL image customization, one-click release, and verification functions. You are welcome to provide feedback on the requirements, suggestions, and questions about container, cloud, and WSL images.

\[1\] [https://hub.docker.com/r/openeuler/openeuler/tags](https://hub.docker.com/r/openeuler/openeuler/tags)

\[2\] [https://repo.openeuler.org/openEuler-22.03-LTS-SP2/docker_img/update/](https://repo.openeuler.org/openEuler-22.03-LTS-SP2/docker_img/update/)

\[3\] EulerPublisher - A tool to publish openEuler docker and cloud
images: [https://gitee.com/openeuler/eulerpublisher](https://gitee.com/openeuler/eulerpublisher)

\[4\] Jenkins address for automatic container release: [https://jenkins.osinfra.cn/view/openEuler/job/luweijun/job/eulerpublisher/3](https://jenkins.osinfra.cn/view/openEuler/job/luweijun/job/eulerpublisher/3)


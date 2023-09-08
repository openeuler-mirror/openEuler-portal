---
title: openEuler容器基础镜像已支持周期更新
category: blog
date: 2023-09-01
tags:
  - 容器基础镜像
archives: 2023-09
author:
  - openEuler
summary: openEuler容器基础镜像已支持周期更新
---


**在release sig、infra sig、QA
sig的共同努力下，openEuler容器基础镜像已支持周期更新。**\
\
容器镜像周期自动更新功能已于2023年8月30上线，目前包含20.03及22.03维护版本的周期更新
\[1\]。\
\
容器镜像更新以每月一次的频率，发布在openEuler官方网站\[2\]，并通过EulerPublisher\[3\]自动发布在包括Dockerhub在内的容器仓库\[4\]，让openEuler社区用户可以体验稳定、安全、实时更新的容器基础镜像。\
\
后续，EulerPublisher也将陆续集成云镜像、WSL镜像的定制和一键发布、验证功能，也欢迎大家继续反馈对容器镜像、云、WSL等镜像的需求、建议和问题。

\[1\]https://hub.docker.com/r/openeuler/openeuler/tags\
\[2\]https://repo.openeuler.org/openEuler-22.03-LTS-SP2/docker_img/update/\
\[3\] EulerPublisher - A tool to publish openeuler docker and cloud
images.: https://gitee.com/openeuler/eulerpublisher

\[4\]
容器自动化发布的Jenkins地址：https://jenkins.osinfra.cn/view/openEuler/job/luweijun/job/eulerpublisher/3

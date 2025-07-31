---
title: 一文教你用 Apple Containerization 运行 openEuler
category: blog 
date: 2025-05-30
tags:
    - openEuler
    - Apple Containerization
archives: 2025-05-30
author:  openEuler
summary: 本文是基于 Containerization 运行 OpenAtom openEuler （简称“openEuler”） 的教程。
---

在 WWDC25 上，苹果发布了基于 macOS 的容器框架 —— Containerization。Containerization 框架赋予开发者直接在 Mac 上创建、下载或运行容器映像的能力。其基于针对 Apple 芯片优化的开源框架构建，能够对容器映像进行安全隔离。本文是基于 Containerization 运行 OpenAtom openEuler （简称“openEuler”） 的教程。


## 安装 Apple Containerization

你可以从 GitHub 下载 Apple Containerization 的 `.pkg` 安装包，具体下载链接请访问：  
https://github.com/apple/container/releases


### 1. 启动 Containerization

```
container system start
```


### 2. 查看容器列表

`container ls -a` 查看所有的容器列表，包括已经运行和停止的； `container ls` 是查看正在运行的容器。示例命令如下：

```
container ls -a
```


### 3. 运行 openEuler 容器

`container run -it openeuler/openeuler` 命令用于运行 openEuler 容器。如果本地没有该镜像，系统会自动从镜像仓库下载。示例命令如下：

```
container run -it openeuler/openeuler
```


### 4. 进入容器内部

当容器成功运行后，你可以使用以下命令进入容器内部：

```
container exec -it <容器id> /bin/bash
```


### 5. 启动已停止的容器

如果你需要启动之前停止的容器，可以使用以下命令：

```
container start <容器id>
```

注意：请将 `<容器id>` 替换为你实际的容器 ID。


### 6. 停止 Containerization

当你完成所有操作后，可以使用以下命令停止 Containerization：

```
container system stop
```


### 验证安装

在容器内部，你可以使用以下命令查看系统信息来验证 openEuler 是否安装成功：

```
cat /etc/os-release
```
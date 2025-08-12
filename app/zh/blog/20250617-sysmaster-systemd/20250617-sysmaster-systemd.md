---
title: 一文教你在 openEuler 使用 sysMaster 代替 systemd
category: blog 
date: 2025-06-17
tags:
    - openEuler
    - Apple Containerization
archives: 2025-06-17
author:  openEuler
summary: sysMaster 是一套超轻量、高可靠的服务管理程序集合，是对1号进程的全新实现，旨在改进传统的 init 守护进程。它使用 Rust 编写，具有故障监测、秒级自愈和快速启动等能力，从而提升操作系统可靠性和业务可用度。
---

sysMaster 是一套超轻量、高可靠的服务管理程序集合，是对 `1` 号进程的全新实现，旨在改进传统的 `init` 守护进程。它使用 `Rust` 编写，具有故障监测、秒级自愈和快速启动等能力，从而提升操作系统可靠性和业务可用度。

sysMaster 支持进程、容器和虚拟机的统一管理，其适用于服务器、云计算和嵌入式等多个场景。

sysMaster 实现思路是将传统 `1` 号进程的功能解耦分层，结合使用场景，拆分出 `1+1+N` 的架构。

本文将详细介绍 sysMaster 在 OpenAtom openEuler（简称 “openEuler”） 上的安装、部署以及使用方法。


### 环境要求

#### 软件要求
- 操作系统：`openEuler 25.03`

#### 硬件要求
- `x86_64` 架构、`aarch64` 架构


### 安装与部署 openEuler 虚拟机

#### 系统安装
参考文档：https://docs.openeuler.org/zh/docs/25.03/server/installation_upgrade/installation/installation-modes.html

#### `initramfs` 镜像制作
为了避免 `initrd` 阶段 `systemd` 的影响，需要制作一个剔除 `systemd` 的 `initramfs` 镜像，并以该镜像进入 `initrd` 流程。使用如下命令：
```bash
dracut -f --omit "systemd systemd-initrd systemd-networkd dracut-systemd" /boot/initrd_withoutsd.img
```

#### 新增启动项
在 `grub.cfg` 中增加新的启动项，`aarch64` 下的路径为 `/boot/efi/EFI/openEuler/grub.cfg`，`x86_64` 下的路径为 `/boot/grub2/grub.cfg`，拷贝一份原有启动项，并做以下几处修改：
- `menuentry` 项修改启动项名称为 `openEuler 25.03 withoutsd`
- `linux` 项内核启动参数修改为 `root=/dev/mapper/openeuler-root rw`
- `linux` 项内核启动参数修改 `plymouth`，如果环境上安装了 `plymouth`，需要添加 `plymouth.enable=0` 禁用 `plymouth`
- `linux` 项内核启动参数增加 `init=/usr/lib/sysmaster/init`
- `initrd` 项修改为 `/initrd_withoutsd.img`

#### 安装 sysMaster
```bash
yum install sysmaster
```

#### 验证启动配置
重启后出现 `openEuler 25.03 withoutsd` 启动项表示已成功配置，选择此启动项进入虚拟机


### sysMaster 使用指南

#### 创建单元配置文件
sysMaster 支持 `target`、`socket` 和 `service` 三种类型的单元配置文件，用户可以在 `/usr/lib/sysmaster/system/` 目录下创建这些文件。

#### 单元配置文件类型说明
- `target`：用于将多个单元集中到一个同步点，例如 `multi-user.target` 代表系统已完成启动，用户可以依赖此目标启动自定义服务。
- `socket`：封装用于进程间通信的套接字，支持基于套接字的启动。当套接字有数据写入时，sysMaster 会自动拉起对应的 `service` 单元。
- `service`：封装被 sysMaster 监视与控制的进程。

#### 单元配置文件构成
通常包含三个部分：
- `Unit`：单元的公共配置，如服务名称、描述、依赖关系等。
- `Install`：描述如何安装和启动服务。
- `Service` 或 `Socket`：各单元类型的特定配置。

#### 创建 `service` 单元配置示例
以 `sshd` 服务为例，以下是 `sshd.service` 单元配置文件：
```ini
[Unit]
Description="OpenSSH server daemon"
Documentation="man:sshd(8) man:sshd_config(5)"
After="sshd-keygen.target"
Wants="sshd-keygen.target"

[Service]
Type="notify"
EnvironmentFile="-/etc/sysconfig/sshd"
ExecStart="/usr/sbin/sshd -D $OPTIONS"
ExecReload="/bin/kill -HUP $MAINPID"
KillMode="process"
Restart="on-failure"
RestartSec=42

[Install]
WantedBy="multi-user.target"
```

#### 配置选项说明
- `Description`：说明单元的主要功能。
- `Documentation`：提供单元的文档链接。
- `After`：配置单元启动顺序，`sshd.service` 会在 `sshd-keygen.target` 之后启动。
- `Wants`：配置单元依赖关系，启动 `sshd.service` 时会自动启动 `sshd-keygen.target`。
- `Type`：配置服务启动方式，`notify` 表示需要主进程启动完成后发送通知消息。
- `EnvironmentFile`：设置环境变量的文件读取路径。
- `ExecStart`：配置服务启动时执行的命令。
- `ExecReload`：配置重新加载服务配置时执行的命令。
- `KillMode`：配置停止服务进程的方法，`process` 表示只杀死主进程。
- `Restart`：配置服务退出或终止时的重启策略，`on-failure` 表示服务非正常退出时重新启动。
- `RestartSec`：配置服务重启的间隔时间。
- `WantedBy`：配置依赖当前服务的单元。


### 管理单元服务
`sctl` 是 sysMaster 的命令行工具，可用于启动、停止、重启和查看服务状态。

#### 启动服务
```bash
sctl start sshd.service
```

#### 停止服务
```bash
sctl stop sshd.service
```

#### 重启服务
```bash
sctl restart sshd.service
```

#### 查看服务状态
```bash
sctl status sshd.service
```


### 总结
通过本文的介绍，你已经了解了 sysMaster 在 openEuler 上的安装、部署过程，以及如何创建单元配置文件和管理单元服务。更多详细信息可查阅文档。希望这些内容能帮助你更好地使用 sysMaster 管理系统服务。

- 文档链接：https://docs.openeuler.org/zh/docs/25.03/server/administration/sysmaster/overview.html
- 项目主页：https://gitee.com/openeuler/sysmaster
- 欢迎到 openEuler 论坛分享使用经验：https://forum.openeuler.org/

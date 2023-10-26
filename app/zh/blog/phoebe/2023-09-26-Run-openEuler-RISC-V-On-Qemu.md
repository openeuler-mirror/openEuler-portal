---
title: 通过 QEMU 仿真 RISC-V 环境并启动 openEuler RISC-V 系统
date: '2023-10-26'
category: blog
tags:
  - RISC-V
  - QEMU
sig: RISC-V
archives: '2023-10'
author:
  - openEuler Blog Maintainer
summary: Steps to start openEuler for RISC-V in QEMU environment.
---

## 安装 QEMU

### 系统环境

目前该方案测试过的环境包括 WSL2 (Ubuntu 20.04.4 LTS and Ubuntu 22.04.1 LTS) 和 Ubuntu 22.04.1 live-server LTS。

## 安装支持 RISC-V 架构的 QEMU 模拟器

安装发行版提供的 `qemu-system-riscv64` 软件包。截止本文档编写时，openEuler 23.09 x86_64 提供 QEMU 6.2.0 (qemu-system-riscv-6.2.0-80.oe2309.x86_64)：

```
dnf install -y qemu-system-riscv
```

由于 QEMU 8.0 及更新版本提供了大量针对 RISC-V 的修复和更新，我们推荐使用 QEMU 8.0 或更新版本以获得更佳体验。下面以 QEMU 8.1.2 为例。

### 手动编译安装

由于自带的包常常过旧，若软件包过旧，使用以下方案编译和安装。

```bash
wget https://download.qemu.org/qemu-8.1.2.tar.xz
tar -xvf qemu-8.1.2.tar.xz
cd qemu-8.1.2
mkdir res
cd res
sudo apt install libspice-protocol-dev libepoxy-dev libgtk-3-dev libspice-server-dev build-essential autoconf automake autotools-dev pkg-config bc curl gawk git bison flex texinfo gperf libtool patchutils mingw-w64 libmpc-dev libmpfr-dev libgmp-dev libexpat-dev libfdt-dev zlib1g-dev libglib2.0-dev libpixman-1-dev libncurses5-dev libncursesw5-dev meson libvirglrenderer-dev libsdl2-dev -y
../configure --target-list=riscv64-softmmu,riscv64-linux-user --prefix=/usr/local/bin/qemu-riscv64 --enable-slirp
make -j$(nproc)
sudo make install
```

上述指令会将 QEMU 安装到 `/usr/local/bin/qemu-riscv64`。将 `/usr/local/bin/qemu-riscv64/bin` 添加至 `$PATH` 即可使用。

如需在其他操作系统下，包括 openEuler 下进行编译安装，请参考 [QEMU 官方文档](https://wiki.qemu.org/Hosts/Linux)。

openEuler 编译所需依赖包可参考 RHEL / CentOS，如下：

```bash
sudo dnf install -y git glib2-devel libfdt-devel pixman-devel zlib-devel bzip2 ninja-build python3 \
                libaio-devel libcap-ng-devel libiscsi-devel capstone-devel \
                gtk3-devel vte291-devel ncurses-devel \
                libseccomp-devel nettle-devel libattr-devel libjpeg-devel \
                brlapi-devel libgcrypt-devel lzo-devel snappy-devel \
                librdmacm-devel libibverbs-devel cyrus-sasl-devel libpng-devel \
                libuuid-devel pulseaudio-libs-devel curl-devel libssh-devel \
                systemtap-sdt-devel libusbx-devel
curl -LO https://download.qemu.org/qemu-8.1.2.tar.xz
tar -xvf qemu-8.1.2.tar.xz
cd qemu-8.1.2
mkdir res
cd res
../configure --target-list=riscv64-softmmu,riscv64-linux-user --prefix=/usr/local/bin/qemu-riscv64
make -j$(nproc)
sudo make install
```

## 准备 openEuler RISC-V 磁盘映像

### 下载磁盘映像

需要下载启动固件 (`fw_payload_oe_uboot_2304.bin`)，磁盘映像(`openEuler-23.09-RISC-V-qemu-riscv64.qcow2.xz`)和启动脚本(`start_vm.sh`)。

### 下载目录

目前的构建位于 [openEuler Repo](https://repo.openeuler.org/openEuler-23.09/virtual_machine_img/riscv64/) 中。您也可以访问 [openEuler 官网](https://www.openeuler.org/zh/download/)，从其他镜像源获取镜像。

### 内容说明

- `fw_payload_oe_uboot_2304.bin`: 启动固件
- `openEuler-23.09-RISC-V-qemu-riscv64.qcow2.xz`: openEuler RISC-V QEMU 虚拟机磁盘映像压缩包
- `openEuler-23.09-RISC-V-qemu-riscv64.qcow2.xz.sha256sum`: openEuler RISC-V QEMU 虚拟机磁盘映像压缩包的校验。使用 `sha256sum -c openEuler-23.09-RISC-V-qemu-riscv64.qcow2.xz.sha256sum` 校验。
- `start_vm.sh`: 官方虚拟机启动脚本

### [可选] 配置 copy-on-write（COW）磁盘

> 写时复制（copy-on-write，缩写COW）技术不会对原始的映像文件做更改，变化的部分写在另外的映像文件中，这种特性在 QEMU 中只有 QCOW 格式支持，多个磁盘映像可以指向同一映像同时测试多个配置, 而不会破坏原映像。

#### 创建新映像

使用如下的命令创建新的映像，并在下方启动虚拟机时使用新映像。假设原映像为 `openEuler-23.09-RISC-V-qemu-riscv64.qcow2`，新映像为 `test.qcow2`。

```bash
qemu-img create -o backing_file=openEuler-23.09-RISC-V-qemu-riscv64.qcow2,backing_fmt=qcow2 -f qcow2 test.qcow2
```

#### 查看映像信息

```bash
qemu-img info --backing-chain test.qcow2
```

#### 修改基础映像位置

使用如下的命令修改基础映像位置。假设新的基础映像为 `another.qcow2`，欲修改映像为 `test.qcow2`。

```bash
qemu-img rebase -b another.qcow2 test.qcow2
```

#### 合并映像

将修改后的镜像合并到原来的镜像。假设新映像为 `test.qcow2`。

```bash
qemu-img commit test.qcow2
```

#### 扩容根分区

为了扩大根分区以获得更大的可使用空间，按照如下操作进行。

扩大磁盘镜像。

```bash
qemu-img resize test.qcow2 +100G
```

输出

```text
Image resized.
```

启动虚拟机，使用下列指令检查磁盘大小。

```bash
lsblk
```

列出分区情况。

```bash
fdisk -l
```

修改根分区。

```bash
fdisk /dev/vda
Welcome to fdisk (util-linux 2.35.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p # 输出分区情况
Disk /dev/vda: 70 GiB, 75161927680 bytes, 146800640 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x247032e6

Device     Boot   Start      End  Sectors Size Id Type
/dev/vda1          2048  4194303  4192256   2G  e W95 FAT16 (LBA)
/dev/vda2       4194304 83886079 79691776  38G 83 Linux

Command (m for help): d # 删除原有分区
Partition number (1,2, default 2): 2

Partition 2 has been deleted.

Command (m for help): n # 新建分区
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p # 选择主分区
Partition number (2-4, default 2): 2
First sector (4194304-146800639, default 4194304): # 此处和上文的 /dev/vda2 的起始块应当一致
Last sector, +/-sectors or +/-size{K,M,G,T,P} (4194304-146800639, default 146800639): #保持默认直接分配到最尾端

Created a new partition 2 of type 'Linux' and of size 68 GiB.
Partition #2 contains a ext4 signature.Do you want to remove the signature? [Y]es/[N]o: n

Command (m for help): p #再次检查

Disk /dev/vda: 70 GiB, 75161927680 bytes, 146800640 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x247032e6

Device     Boot   Start       End   Sectors Size Id Type
/dev/vda1          2048   4194303   4192256   2G  e W95 FAT16 (LBA)
/dev/vda2       4194304 146800639 142606336  68G 83 Linux

Command (m for help): w # 写入到磁盘
The partition table has been altered.
Syncing disks.
```

更新磁盘信息。

```bash
resize2fs /dev/vda2
```

## 启动 openEuler RISC-V 虚拟机

### 启动虚拟机

- 确认当前目录内包含 `fw_payload_oe_uboot_2304.bin`，磁盘映像压缩包，以及启动脚本。
- 解压映像压缩包 `xz -dk openEuler-23.09-RISC-V-qemu-riscv64.qcow2.xz`
- 调整启动参数
- 执行启动脚本 `$ bash start_vm.sh`

### [可选] 启动参数调整

- `vcpu` 为 QEMU 运行线程数，与 CPU 核数没有严格对应。当设定的 `vcpu` 值大于宿主机核心值时，可能导致运行阻塞和速度严重降低。默认为 `4`。
- `memory` 为虚拟机内存大小，可随需要调整。默认为 `2`。
- `drive` 为虚拟磁盘路径，如果在上文中配置了 COW 映像，此处填写创建的新映像。
- `fw` 为 U-Boot 镜像路径。
- `ssh_port` 为转发的 SSH 端口，默认为 `12055`。设定为空以关闭该功能。

## 登录虚拟机

脚本提供了 SSH 登录支持。

如果这是暴露在外网的虚拟机，请在登录成功之后立即修改 root 用户密码。

### SSH 登录

Secure Shell（安全外壳协议，简称 SSH）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境。SSH 通过在网络中创建安全隧道来实现SSH客户端与服务器之间的连接。SSH 最常见的用途是远程登录系统，人们通常利用SSH来传输命令行界面和远程执行命令。SSH 使用频率最高的场合是类 Unix 系统，但是 Windows 操作系统也能有限度地使用 SSH。2015 年，微软宣布将在未来的操作系统中提供原生SSH协议支持，Windows 10 1803 及更新版本中已提供 OpenSSH 客户端。

- 用户名: `root` 或 `openeuler`
- 默认密码: `openEuler12#$`
- 登录方式: 参见脚本提示 (或使用您偏好的 ssh 客户端)

登录成功之后，可以看到如下的信息：

```bash
Authorized users only. All activities may be monitored and reported.

Authorized users only. All activities may be monitored and reported.
Last login: Sun Oct 15 17:19:52 2023 from 10.0.2.2


Welcome to 6.4.0-10.1.0.20.oe2309.riscv64

System information as of time:  Sun Oct 15 19:40:07 CST 2023

System load:    0.47
Processes:      161
Memory used:    .7%
Swap used:      0.0%
Usage On:       11%
IP address:     10.0.2.15
Users online:   1


[root@openeuler ~]#
```

### VNC 登录

这是一个类似于远程操作真机的方式，但是没有声音，受 QEMU 原生支持。

> VNC（Virtual Network Computing），为一种使用 RFB 协议的屏幕画面分享及远程操作软件。此软件借由网络，可发送键盘与鼠标的动作及即时的屏幕画面。
>
> VNC 与操作系统无关，因此可跨平台使用，例如可用 Windows 连接到某 Linux 的电脑，反之亦同。甚至在没有安装客户端程序的电脑中，只要有支持 Java 的浏览器，也可使用。

#### 安装 VNC Viewer

前往 [此处](https://sourceforge.net/projects/tigervnc/files/stable/) 下载 TigerVNC，或前往 [此处](https://www.realvnc.com/en/connect/download/viewer/) 下载 VNC Viewer。

#### 修改启动脚本

在启动脚本 `sleep 2` 行之前中添加如下内容：

```bash
vnc_port=12056
echo -e "\033[37mVNC Port:        \033[0m \033[34m"$vnc_port"\033[0m"
cmd="${cmd} -vnc :"$((vnc_port-5900))
```

#### 连接到 VNC

启动 TigerVNC 或 VNC Viewer，粘贴地址按下回车即可。操作界面和真机类似。

## 修改默认软件源配置

openEuler 23.09 RISC-V 版本的软件源目前仅包含 [OS] 和 [source] 仓库，而默认配置文件中包含了其他 RISC-V 版本并未提供的仓库。

用户在使用包管理器安装软件包之前，需要手动编辑软件源配置，移除 [OS] 和 [source] 两节之外的内容。

SSH 或 VNC 连接至虚拟机，使用 root 用户登录（若使用非特权用户登录，需要使用 sudo），在终端中进行如下操作：

### 修改 /etc/yum.repos.d/openEuler.repo

```bash
vi /etc/yum.repos.d/openEuler.repo
# 或者 nano /etc/yum.repos.d/openEuler.repo
```

删除 [everything], [EPOL], [debuginfo], [update], [update-source] 小节，仅保留 [OS] 和 [source] 两部分。

修改完成后，您的 openEuler.repo 配置应该与下述基本一致：

```
#generic-repos is licensed under the Mulan PSL v2.
#You can use this software according to the terms and conditions of the Mulan PSL v2.
#You may obtain a copy of Mulan PSL v2 at:
#    http://license.coscl.org.cn/MulanPSL2
#THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR
#PURPOSE.
#See the Mulan PSL v2 for more details.

[OS]
name=OS
baseurl=http://repo.openeuler.org/openEuler-23.09/OS/$basearch/
metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/OS&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=http://repo.openeuler.org/openEuler-23.09/OS/$basearch/RPM-GPG-KEY-openEuler

[source]
name=source
baseurl=http://repo.openeuler.org/openEuler-23.09/source/
metalink=https://mirrors.openeuler.org/metalink?repo=$releasever&arch=source
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=http://repo.openeuler.org/openEuler-23.09/source/RPM-GPG-KEY-openEuler
```

接下来就可以正常使用 `dnf` 包管理器进行软件包的安装了。初次安装的时候需要导入 openEuler 的 GPG key，若出现如下提示时，需输入 y 并确认，还请注意。

```
retrieving repo key for OS unencrypted from http://repo.openeuler.org/openEuler-23.09/OS/riscv64/RPM-GPG-KEY-openEuler
OS                                               18 kB/s | 2.1 kB     00:00    
Importing GPG key 0xB25E7F66:
 Userid     : "private OBS (key without passphrase) <defaultkey@localobs>"
 Fingerprint: 12EA 74AC 9DF4 8D46 C69C A0BE D557 065E B25E 7F66
 From       : http://repo.openeuler.org/openEuler-23.09/OS/riscv64/RPM-GPG-KEY-openEuler
Is this ok [y/N]: y
Key imported successfully
```
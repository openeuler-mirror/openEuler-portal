---
title: 在 QEMU 环境中启动 openEuler for RISC-V 
date: '2023-09-26'
category: blog
tags:
  - RISC-V
  - QEMU
sig: RISC-V
archives: '2023-09'
author:
  - openEuler Blog Maintainer
summary: Steps to start openEuler for RISC-V in QEMU environment.
---

# QEMU环境下启动镜像

## 环境要求
- 硬件要求：x86_64架构、AArch64架构
- 软件要求：
  - 操作系统： 建议 openEuler 22.03 及以上版本。（原则上任何支持QEMU 5.0 及以上版本的linux发行版均可。）
  - QEMU： QEMU 5.0 以上。

## 安装支持 RISC-V 架构的 QEMU 模拟器

### 使用发行版提供的预编译软件包安装QEMU

一般来说，常见 GNU/Linux 发行版软件源中都提供了包含 `qemu-system-riscv64` 的软件包。各发行版间以及其各个大小版本间对应的包名可能略有不同，详情可移步 [pkgs.org](https://pkgs.org) 进行查询。

> 通常可以通过 `lsb_release -a` 来查询自己正在使用哪个发行版和具体的大版本 (或与之对应的 codename)。

- Ubuntu :  `$ sudo apt install qemu-system-misc`
  - 注: 20.04 及以前的版本过旧
- Debian : `$ sudo apt install qemu-system-misc`
  - 注: 10 及以前的版本过旧
- openEuler : `$ sudo dnf install qemu-system-riscv`
  - 注: 21.09 及以前的版本过旧
- Fedora : `$ sudo dnf install qemu-system-riscv`
- Arch Linux : `$ sudo pacman -Syu qemu-full`
- openSUSE Tumbleweed : `$ sudo dnf install qemu`

如果官方仓库 (及各种 **您信任的** 第三方仓库) 中未收录 QEMU 或版本过旧 (低于 5.0)，或者发行版提供的软件包构建时未开启本项目所需的 slirp 网络模块（如运行时出现报错：`network backend 'user' is not compiled into this binary` ），请移步下一部分从 [QEMU 项目主页](https://www.qemu.org/) 获取源代码进行手动构建。

> QEMU 从 7.2.0 版本之后[移除了 slirp 子模块](https://wiki.qemu.org/ChangeLog/7.2#Removal_of_the_%22slirp%22_submodule_(affects_%22-netdev_user%22))，会影响用户模式的网络功能，需要提前加上依赖包和配置选项。

### 手动编译安装QEMU

> 建议优先考虑发行版提供的软件包或在有能力的情况下自行打包，不鼓励非必要情况的编译安装。
> 下述内容以 Ubuntu 为例展示手动编译安装QEMU过程，供参考。

1. 安装必要的构建工具。
    ```
    $ sudo apt install build-essential git libglib2.0-dev libfdt-dev libpixman-1-dev zlib1g-dev ninja-build libslirp-dev
    ```

2. 创建 /usr/local 下的目标目录。
    ```
    $ sudo mkdir -p /usr/local/bin/qemu-riscv64
    ```

3. 下载 QEMU 源码包 (此处以 7.2 版本为例)。
    ```
    $ wget https://download.qemu.org/qemu-7.2.0.tar.xz
    ```

4. 解压源码包并切换目录。
    ```
    $ tar xvJf qemu-7.2.0.tar.xz && cd qemu-7.2.0
    ```

5. 配置编译选项。
    ```
    $ sudo ./configure --enable-slirp --target-list=riscv64-softmmu,riscv64-linux-user --prefix=/usr/local/bin/qemu-riscv64
    ```
    >`riscv64-softmmu` 为系统模式，`riscv64-linux-user` 为用户模式。为了测试方便建议两个都编译，以免后续需要时重复编译。

6. 编译安装。
    ```
    $ sudo make && sudo make install
    ```

7. 检查是否安装成功。
    ```
    $ qemu-system-riscv64 --version
    ```
    如正常输出版本信息则表示 QEMU 成功安装并正常工作。


## 准备openEuler for RISC-V 镜像
1. 下载openEuler for RISC-V 镜像文件。
   
    QEMU 镜像目录下文件介绍：
    - `openEuler-23.09-base-qemu-riscv64.qcow2.zst` 基础镜像的根文件系统。
    - `openEuler-23.09-xfce-qemu-riscv64.qcow2.zst` 带有 xfce 桌面镜像的根文件系统。
    - `fw_payload_oe_uboot.bin` 启动用内核。
    - `start_vm.sh` 启动不带有桌面的镜像的根文件系统用脚本。
    - `start_vm_xfce.sh` 启动带有 xfce 桌面镜像的根文件系统用脚本。

2. 确认镜像文件。
   
   确认镜像目录内包含 `fw_payload_oe_uboot.bin`、磁盘映像压缩包、启动脚本 `start_vm.sh`和大于 5 GiB 的剩余可用空间。

3. 解压映像压缩包或使用解压工具解压磁盘映像。
   
   使用下面的命令解压缩：
   ```bash
    sudo apt install zstd -y
    unzstd openEuler-23.09-base-qemu-riscv64.qcow2.zst
    或
    zstd -d openEuler-23.09-base-qemu-riscv64.qcow2.zst
   ```
4. 镜像登录用户名和密码。
   
   - `root` 的用户密码是 `openEuler12#$`。
   - 默认用户 `openeuler` 的用户密码是 `openEuler12#$`。

## 使用QEMU启动openEuler for RISC-V 镜像
1. [可选]修改脚本，调整启动参数。
   
    针对`start_vm.sh`或`start_vm_xfce.sh`启动脚本中的参数，可以根据实际情况和需求进行调整：
   - `vcpu`       为 qemu 运行线程数，可随需要调整，建议 vcpu 值小于或等于宿主机核心值。
   - `memory`     为虚拟机内存大小，可随需要调整。
   - `drive`      为虚拟磁盘路径，可随需要调整。
   - `fw`         为启动内核，默认为fw_payload_oe_uboot.bin 文件，不需要修改。
   - `ssh_port`   为转发的 SSH 端口，默认为 12055，可按需调整。


2. 执行脚本启动QEMU虚拟机。
   
   执行启动脚本 `bash start_vm.sh` 启动虚拟机。


## 使用openEuler for RISC-V 系统
### 直接登录使用

可以直接在QEMU窗口中使用和体验 openEuler for RISC-V 虚拟机。

### SSH 登录

在宿主机的终端中输入 `ssh -p <ssh_port> root@localhost`访问 openEuler for RISC-V 虚拟机。
按照提示输入 openEuler for RISC-V 虚拟机的用户名和密码即可完成连接。接下来，你就可以继续输入linux 命令来操作 openEuler RISC-V 虚拟机系统了。


### VNC 登录

VNC方式支持图像传输，可以远程访问 openEuler 虚机桌面，但是没有声音，受 QEMU 原生支持。拷贝启动脚本保存为start_vm.sh文件。
启动脚本如下：
```bash
#!/bin/bash

# The script is created for starting a riscv64 qemu virtual machine with specific parameters

## Configuration
vcpu=8 # CPU 核心数。
memory=8 # 运行存储大小，单位 GiB。
memory_append=`expr $memory \* 1024`
drive="openEuler-23.03-V1-xfce-qemu-preview.qcow2" # 根文件系统路径
kernel="fw_payload_oe_uboot_2304.bin" # 内核文件路径
bios="none" # BIOS 文件路径，设置为 none 表示 kernel 已包含相关文件。
ssh_port=12055 # 控制端口映射：将虚拟机内部的端口 22 映射到外部的 ssh_port。设置为空表示不启用该功能。
vnc_port=12056 # 控制 VNC 端口。设置为空表示不启用该功能。
spice_port=12057 # 控制 Cpice 端口。设置为空表示不启用该功能。
remoteip=localhost # 控制随后显示脚本的本机地址。
[[ $spice_port ]] && audiobackend="spice" || audiobackend="none" # 当 Spice 启用时，设置音频后端为 spice，否则为 none。可按需改动。
sleeptime=0 # 启动前等待时间

cmd="qemu-system-riscv64 \
  -nographic -machine virt \
  -smp "$vcpu" -m "$memory"G \
  -audiodev "$audiobackend",id=snd0 \
  -kernel "$kernel" \
  -bios "$bios" \
  -drive file="$drive",format=qcow2,id=hd0 \
  -object rng-random,filename=/dev/urandom,id=rng0 \
  -device virtio-vga \
  -device virtio-rng-device,rng=rng0 \
  -device virtio-blk-device,drive=hd0 \
  -device virtio-net-device,netdev=usernet \
  -device qemu-xhci -usb -device usb-kbd -device usb-tablet -device usb-audio,audiodev=snd0 \
  -append 'root=/dev/vda1 rw console=ttyS0 swiotlb=1 loglevel=3 systemd.default_timeout_start_sec=600 selinux=0 highres=off mem="$memory_append"M earlycon' "

echo -e "\033[37mUsing the following configuration: \033[0m"
echo ""
echo -e "\033[37mvCPU Cores:      \033[0m \033[34m"$vcpu"\033[0m"
echo -e "\033[37mMemory:          \033[0m \033[34m"$memory"\033[0m"
echo -e "\033[37mDisk Path:       \033[0m \033[34m"$drive"\033[0m"
echo -e "\033[37mKernal Path:     \033[0m \033[34m"$kernel"\033[0m"
echo -e "\033[37mBIOS Path:       \033[0m \033[34m"$bios"\033[0m"

if [ $ssh_port ]
then
echo -e "\033[37mSSH Port:        \033[0m \033[34m"$ssh_port"\033[0m"
cmd="${cmd} -netdev user,id=usernet,hostfwd=tcp::"$ssh_port"-:22 "
else
cmd="${cmd} -netdev user,id=usernet "
fi

if [ $vnc_port ]
then
echo -e "\033[37mVNC Port:        \033[0m \033[34m"$vnc_port"\033[0m"
cmd="${cmd} -vnc :"$((vnc_port-5900))
fi

if [ $spice_port ]
then
echo -e "\033[37mSPICE Port:      \033[0m \033[34m"$spice_port"\033[0m"
cmd="${cmd} -device virtio-serial-pci \
-device virtserialport,chardev=spicechannel0,name=com.redhat.spice.0 \
-chardev spicevmc,id=spicechannel0,name=vdagent \
-spice port=${spice_port},disable-ticketing=on"
fi
echo ""
if [ $ssh_port ]
then
echo -e "\033[37mUse the following command to connect SSH server:\0\033[0m\033[34m ssh root@"$remoteip" -p "$ssh_port"\033[0m"
fi
if [ $vnc_port ]
then
echo -e "\033[37mUse the following address to connect VNC server:\0\033[0m\033[34m "$remoteip":"$vnc_port"\033[0m"
fi
if [ $spice_port ]
then
echo -e "\033[37mUse the following address to connect SPICE server:\0\033[0m\033[34m spice://"$remoteip":"$spice_port"\033[0m"
fi
echo ""
echo -e "\033[37mUsing the following command to start VM: \033[0m"
echo ""
echo $cmd
echo ""
sleep $sleeptime
echo -e "\033[37mStarting VM... \033[0m"
eval $cmd
echo -e "Exit."

``````


#### 安装 VNC Viewer

点击 [此处](https://www.realvnc.com/en/connect/download/viewer/) 前往下载地址下载安装软件。

#### 连接到 VNC

在VNC Viewer的输入框中输入VNC Server address并回车即可完成连接操作。


### SPICE 登录

SPICE登录是一个类似于远程桌面的方式，有声音、共享文件夹、共享剪贴板、共享 USB 设备，受 QEMU 支持。
采用此种方式也需要修改启动脚本，脚本同VNC模式下一致。

#### 安装 Virt-Viewer

点击 [此处](https://virt-manager.org/download/) 前往下载地址，下载 virt-viewer 11.0 。

#### 连接到 SPICE

linux客户端：
```bash
sudo apt install virt-viewer            #安装virt-viewer
remote-viewer spice://localhost:12057   #使用spice连接虚拟机
```

windows客户端：

在Virt-Viewer的输入框中输入Server address：`remote-viewer spice://localhost:12057`点击连接即可。

### 其它

除了上述方式和客户端外，还可以有其它的方式，这里不一一列举了。


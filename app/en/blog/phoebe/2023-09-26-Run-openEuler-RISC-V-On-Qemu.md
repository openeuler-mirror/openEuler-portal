---
title: 'Booting openEuler for RISC-V Under the QEMU Environment'
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

# Booting an Image Under the QEMU Environment

## Environment Requirements
- Hardware: x86_64 and AArch64 architecture
- Software:
  - OS: openEuler 22.03 or later (In principle, any Linux distribution that supports QEMU 5.0 or later can be used.)
  - QEMU: QEMU 5.0 or later

## Installing a QEMU Simulator That Supports the RISC-V Architecture

### Installing QEMU Using the Prebuilt Software Package Provided by the Distribution

Generally, GNU/Linux distribution software sources provide software packages that contain `qemu-system-riscv64`. The package name may vary according to distributions and versions. For details, see [pkgs.org](https://pkgs.org).

> You can run the `lsb_release -a` command to query the distribution and major version (or the corresponding codename) that you are using.

- Ubuntu :  `$ sudo apt install qemu-system-misc`
  - Note: 20.04 and earlier versions are outdated.
- Debian : `$ sudo apt install qemu-system-misc`
  - Note: 10 and earlier versions are outdated.
- openEuler : `$ sudo dnf install qemu-system-riscv`
  - Note: 21.09 and earlier versions are outdated.
- Fedora : `$ sudo dnf install qemu-system-riscv`
- Arch Linux : `$ sudo pacman -Syu qemu-full`
- openSUSE Tumbleweed : `$ sudo dnf install qemu`

If QEMU is not included in the official repository (or any trusted third-party repositories) or the version (earlier than 5.0) is outdated, or the slirp network module required by the project is not enabled when the software package provided by the distribution is built (for example, `network backend 'user' is not built into this binary` is reported during running), move to the next section to get the source code from [QEMU Project Home](https://www.qemu.org/) for a manual build.

> In QEMU 7.2.0 and later versions, the [slirp submodule is removed](https://wiki.qemu.org/ChangeLog/7.2#Removal_of_the_%22slirp%22_submodule_(affects_%22-netdev_user%22)), which affects the network function in user mode. Therefore, you need to add the dependency package and configuration options in advance.

### Manually Building and Installing QEMU

> It is advised to use the software packages provided by the distribution or package the software if possible. Building and installation are not encouraged unless necessary.
> The following uses Ubuntu as an example to demonstrate how to manually build and install QEMU.

1. Install necessary build tools.
    ```
    $ sudo apt install build-essential git libglib2.0-dev libfdt-dev libpixman-1-dev zlib1g-dev ninja-build libslirp-dev
    ```

2. Create a target directory in **/usr/local**.
    ```
    $ sudo mkdir -p /usr/local/bin/qemu-riscv64
    ```

3. Download the QEMU source package, for example, version 7.2.
    ```
    $ wget https://download.qemu.org/qemu-7.2.0.tar.xz
    ```

4. Decompress the source package and switch the directory.
    ```
    $ tar xvJf qemu-7.2.0.tar.xz && cd qemu-7.2.0
    ```

5. Configure building options.
    ```
    $ sudo ./configure --enable-slirp --target-list=riscv64-softmmu,riscv64-linux-user --prefix=/usr/local/bin/qemu-riscv64
    ```
    >`riscv64-softmmu` indicates the system mode, while `riscv64-linux-user` indicates the user mode. To facilitate the test, you are advised to build both of them to avoid repeated building.

6. Perform building and installation.
    ```
    $ sudo make && sudo make install
    ```

7. Check whether the installation is successful.
    ```
    $ qemu-system-riscv64 --version
    ```
    If the version information is displayed, the QEMU is successfully installed and works properly.


## Preparing the openEuler for RISC-V Image
1. Download the openEuler for RISC-V image file.
   
    Files in the QEMU image directory:
    - `openEuler-23.09-base-qemu-riscv64.qcow2.zst`: root file system of the basic image  
    - `openEuler-23.09-xfce-qemu-riscv64.qcow2.zst`: root file system with the Xfce desktop image.  
    - `fw_payload_oe_uboot.bin`: kernel for starting  
    - `start_vm.sh`: script used to start the root file system that does not contain the desktop image.  
    - `start_vm_xfce.sh`: script used to start the root file system with the Xfce desktop image.  

2. Confirm the image file.
   
   Ensure that the image directory contains `fw_payload_oe_uboot.bin`, disk image package, startup script `start_vm.sh`, and available space greater than 5 GiB.

3. Decompress the image package or use the decompression tool to decompress the disk image.
   
   Run the following commands to decompress the package:
   ```bash
    sudo apt install zstd -y
    unzstd openEuler-23.09-base-qemu-riscv64.qcow2.zst
    or
    zstd -d openEuler-23.09-base-qemu-riscv64.qcow2.zst
   ```
4. Username and password for logging in to the image.
   
   - The password of user root is `openEuler12#$`.  
   - The password of the default user `openeuler` is `openEuler12#$`.  

## Using QEMU to Start the openEuler for RISC-V Image
1. (Optional) Modify the script to adjust the startup parameters.
   
    You can adjust the parameters in the `start_vm.sh` or `start_vm_xfce.sh` startup script as needed.
   - `vcpu` indicates the number of QEMU running threads and can be adjusted as needed. It is recommended that the value be less than or equal to the core value of the host machine.  
   - `memory` indicates the memory size of the VM and can be adjusted as needed.  
   - `drive` indicates the virtual disk path and can be adjusted as needed.  
   - `fw` is the boot kernel. The default file is **fw_payload_oe_uboot.bin**, which does not need to be modified.  
   - `ssh_port` indicates the SSH port for forwarding. The default value is **12055**. You can change the value as needed.  


2. Run the script to start the QEMU VM.
   
   Run the `bash start_vm.sh` startup script to start the VM.


## Using openEuler for RISC-V
### Direct Login

You can directly run openEuler for RISC-V VM in the QEMU window.

### SSH Login

On the terminal of the host machine, enter `ssh -p <ssh_port> root@localhost` to access the openEuler for RISC-V VM.
Enter the username and password of the openEuler for RISC-V VM as prompted. Enter Linux commands to operate the openEuler RISC-V VM.


### VNC Login

The VNC mode supports image transmission. You can remotely access the openEuler VM desktop, but there is no sound. This mode is natively supported by QEMU. Copy the startup script and save it as the **start_vm.sh** file.
The startup script is as follows:
```bash
#!/bin/bash

# The script is created for starting a riscv64 qemu virtual machine with specific parameters

## Configuration
vcpu=8 # Number of CPU cores
memory=8 # Size of the running storage, in GiB
memory_append=`expr $memory \* 1024`
drive="openEuler-23.03-V1-xfce-qemu-preview.qcow2" # path of the root file system
kernel="fw_payload_oe_uboot_2304.bin" # kernel file path
bios="none" # BIOS file path. If this parameter is set to none, the kernel contains related files.
ssh_port=12055 # Control port mapping: Map internal port 22 of the VM to external ssh_port. If this parameter is left blank, this function is disabled.
vnc_port=12056 # Control VNC port. If this parameter is left blank, this function is disabled.
spice_port=12057 # Control the Cpice port. If this parameter is left blank, this function is disabled.
remoteip=localhost # Control the local address of the script to be displayed.
[[ $spice_port ]] && audiobackend="spice" || audiobackend="none" # When Spice is enabled, set the audio backend to spice. Otherwise, set the audio backend to none. The value can be changed as needed.
sleeptime=0 # Waiting time before startup

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


#### Installing VNC Viewer

Click [here](https://www.realvnc.com/en/connect/download/viewer/) to download the software.

#### Connecting to VNC

In the VNC Viewer text box, type *VNC Server address* and press **Enter**.


### SPICE Login

SPICE, supported by QEMU, is a remote desktop-like system that provides sound, folder sharing, clipboard sharing, and USB device sharing functions.
To use this mode, you need to modify the startup script. The script is the same as that in VNC mode.

#### Installing Virt-Viewer

Click [here](https://virt-manager.org/download/) to download virt-viewer 11.0.

#### Connecting to SPICE

Linux client:
```bash
sudo apt install virt-viewer            # Install virt-viewer.
remote-viewer spice://localhost:12057   # Use SPICE to connect to the VM.
```

Windows client:

Enter server address `remote-viewer spice://localhost:12057` in the Virt-Viewer text box and click the connect button.

### Others

You can also use other methods and clients beyond the foregoing.

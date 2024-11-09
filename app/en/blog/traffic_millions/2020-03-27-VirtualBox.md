---
title: Installing openEuler with VirtualBox on Windows
category: blog
date: 2020-03-27
tags:
    - Installing openEuler
archives: 2020-03
author: traffic_millions
summary: Installing openEuler with VirtualBox on Windows

---

### 【Background】
The openEuler community has released the latest LTS version. If you have only one Windows PC, you can use VirtualBox to install the openEuler VM.

### 【Environment Preparation】

- Windows 10 64-bit
- Oracle VM VirtualBox 6.1.4
- download: [openEuler-20.03-LTS-x86_64-dvd.iso](https://repo.openeuler.org/openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-x86_64-dvd.iso)  （X86）

<img src="./2020-03-27-VirtualBox-media/index-x86.png" >

### 【Installation Procedure】

##### 一、Download and install Virtual Box

Download the installation program from the [VirtualBox official website](https://www.virtualbox.org/wiki/Downloads)

<img src="./2020-03-27-VirtualBox-media/VirtualBox-main.png" >

During the installation, you can customize the installation path (D:\software\Oracle\VirtualBox) and click `Next`.

<img src="./2020-03-27-VirtualBox-media/route.png" >

After the installation is complete, press `Ctrl+G` to open the global settings and change the default virtual computer location (D:\myVM) to facilitate future search.

<img src="./2020-03-27-VirtualBox-media/global.png" >

##### 二、Create a VM

Choose `Control` and `Create`, and enter the VM configuration information, for example:
Name: openEuler
Type: Linux
Since there is no openEuler, select Other Linux (64-bit) for the version and click `Next`.

<img src="./2020-03-27-VirtualBox-media/config-virtual-machine.png" >

Set the VM memory, which is the system memory occupied by the VM. In this example, set the virtual memory to 4 GB.

<img src="./2020-03-27-VirtualBox-media/4G.png" >

Select 【Create a virtual hard disk now (c)】

<img src="./2020-03-27-VirtualBox-media/hard.png" >

Select【VDI（VirtualBox Disk Image）】，Next

<img src="./2020-03-27-VirtualBox-media/virtual_file.png" >

Select【Dynamic Allocation】，Next

The memory space allocated to the VM is large. When the memory space is used, the disk space is occupied gradually. When the memory space is idle, the memory space is automatically reduced.

<img src="./2020-03-27-VirtualBox-media/dynamic.png" >

In this example, the VM disk size is set to 64 GB.

<img src="./2020-03-27-VirtualBox-media/64G.png" >

The VM has been created, and hardware resources required by the openEuler have been prepared.

<img src="./2020-03-27-VirtualBox-media/virtual_done.png" >

##### 三、Install openEuler

Start the VM created in the previous step. 

<img src="./2020-03-27-VirtualBox-media/start.png" >

Click the folder icon on the right.

<img src="./2020-03-27-VirtualBox-media/file_icon.png" >

Click Register and select the **openEuler-20.03-LTS-x86_64-dvd.iso** downloaded in the preparation phase.

<img src="./2020-03-27-VirtualBox-media/select_iso.png" >

Select【Start】, to enter the installation interface.

<img src="./2020-03-27-VirtualBox-media/select_start.png" >

Select 【Install openEuler 20.03-LTS】and press Enter. 

<img src="./2020-03-27-VirtualBox-media/install_lts.png" >

Select【Continue】

<img src="./2020-03-27-VirtualBox-media/continue.png" >

Select 【Installation Destination】

<img src="./2020-03-27-VirtualBox-media/install_destination.png" >

Select the disk to be installed, Done.

<img src="./2020-03-27-VirtualBox-media/select_disk.png" >

Select 【Begin Installation】

<img src="./2020-03-27-VirtualBox-media/begin_install.png" >

The installation status is as follows:

<img src="./2020-03-27-VirtualBox-media/install_status.png" >

Select 【Root Password】 to set the password of the root user.
(Note: The password will be used for login later.)

<img src="./2020-03-27-VirtualBox-media/set_pass.png" >

After the installation is complete, click 【Reboot】 to restart the VM.

<img src="./2020-03-27-VirtualBox-media/reboot.png" >

The installation page is displayed again.

<img src="./2020-03-27-VirtualBox-media/return.png" >

Shut down the VM, choose 【Settings】, right-click **openEuler-20.03-LTS-x86_64-dvd.iso**, and delete the disk. Save the settings and exit.

<img src="./2020-03-27-VirtualBox-media/save.png" >

Restart the VM. When the following page is displayed, press Enter.

<img src="./2020-03-27-VirtualBox-media/reboot_start.png" >

Enter the password (configured during the installation) of user (root), log in to the openEuler VM.

<img src="./2020-03-27-VirtualBox-media/install_over.png" >

The openEuler virtual machine is now installed.
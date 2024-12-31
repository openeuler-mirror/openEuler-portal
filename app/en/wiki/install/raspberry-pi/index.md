---
title: Installation Guide
category: wiki
---

# Installation on Raspberry Pi

This section describes the compatibility of the hardware and software and the related configurations and preparations required for the installation.

## Installation Source

Before installation, obtain the openEuler Raspberry Pi image and its verification file.

1. Visit [openEuler Repo](https://repo.openeuler.org/).
2. Choose **openEuler 24.03 LTS**.
3. Click **raspi_img**. The download list of Raspberry Pi images is displayed.
4. Click **openEuler-24.03-LTS-raspi-aarch64.img.xz** to download the openEuler Raspberry Pi image to the local PC.
5. Click **openEuler-24.03-LTS-raspi-aarch64.img.xz.sha256sum** to download the verification file of the openEuler Raspberry Pi image to the local PC.

## Verifying the Image Integrity

### Overview

During package transmission, to prevent software packages from being incompletely downloaded due to network or storage device problems, you need to verify the integrity of the software packages after obtaining them. Only the software packages that pass the verification can be deployed.

Compare the verification value recorded in the verification file with the verification value that is manually calculated to determine whether the software package is complete. If the two values are the same, the downloaded file is complete. Otherwise, the downloaded file is incomplete and you need to obtain the software package again.

### Prerequisites

Before verifying the integrity of the image file, ensure that the following files are available:

Image file: **openEuler-24.03-LTS-raspi-aarch64.img.xz**
Image file: **openEuler-24.03-LTS-raspi-aarch64.img.xz**

Verification file: **openEuler-24.03-LTS-raspi-aarch64.img.xz.sha256sum**
Verification file: **openEuler-24.03-LTS-raspi-aarch64.img.xz.sha256sum**

### Procedures

To verify the file integrity, perform the following procedures:

1. Obtain the verification value from the verification file. Run the following command:

    ```shell
    cat openEuler-24.03-LTS-raspi-aarch64.img.xz.sha256sum
    ```

2. Calculate the SHA256 verification value of the file. Run the following command:

    ```shell
    sha256sum openEuler-24.03-LTS-raspi-aarch64.img.xz
    ```
   
   After the command is executed, the verification value is displayed.

3. Check whether the verification values obtained from the step 1 and step 2 are consistent.
   
   If they are consistent, the downloaded file is not damaged. Otherwise, the downloaded file is incomplete and you need to obtain the file again.

## Installation Requirements

If the openEuler OS is installed in the Raspberry Pi environment, the Raspberry Pi environment must meet the following requirements.

### Hardware Compatibility

Currently, the openEuler Raspberry Pi image supports the 3B, 3B+, and 4B versions.

### Minimum Hardware Specifications

[Table 1](#tff48b99c9bf24b84bb602c53229e2542) lists the minimum hardware specifications for the openEuler Raspberry Pi image.

**Table 1** Minimum hardware specifications

<a name="tff48b99c9bf24b84bb602c53229e2542"></a>

<table><thead align="left"><tr id="r36f08b63edea4973a8228200caa2a50b"><th class="cellrowborder" valign="top" width="11.19111911191119%" id="mcps1.2.4.1.1"><p id="aef3575d97cdf4dcfb65f8d0c8d2d4a76"><a name="aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a><a name="aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a><strong id="abf63bde6a66a4ce5b21d81948fcafe36"><a name="abf63bde6a66a4ce5b21d81948fcafe36"></a><a name="abf63bde6a66a4ce5b21d81948fcafe36"></a>Component Name</strong></p>
</th>
<th class="cellrowborder" valign="top" width="40.06400640064006%" id="mcps1.2.4.1.2"><p id="a919d3bb266c8432fb33c51fa8f3a4fc3"><a name="a919d3bb266c8432fb33c51fa8f3a4fc3"></a><a name="a919d3bb266c8432fb33c51fa8f3a4fc3"></a><strong id="a9386cf027c1e47d99651159bb62130e7"><a name="a9386cf027c1e47d99651159bb62130e7"></a><a name="a9386cf027c1e47d99651159bb62130e7"></a>Minimum Hardware Specifications</strong></p>
</th>
<th class="cellrowborder" valign="top" width="48.74487448744874%" id="mcps1.2.4.1.3"><p id="a3ac7cf4867974c4990ee6deab716db5f"><a name="a3ac7cf4867974c4990ee6deab716db5f"></a><a name="a3ac7cf4867974c4990ee6deab716db5f"></a><strong id="a0206841e981640cf833dc2556a7def50"><a name="a0206841e981640cf833dc2556a7def50"></a><a name="a0206841e981640cf833dc2556a7def50"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody>
<tr id="ra68eff5c33a84bb2be6672a48a643d26"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="ac0a50d2069ab444cafff180647772df4"><a name="ac0a50d2069ab444cafff180647772df4"></a><a name="ac0a50d2069ab444cafff180647772df4"></a>Raspberry Pi version</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><a name="ul97131912175915"></a><a name="ul97131912175915"></a><ul id="ul97131912175915"><li>Raspberry Pi 3B</li><li>Raspberry Pi 3B+</li><li>Raspberry Pi 4B</li><li>Raspberry Pi 400</li></ul>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="a2601e9eece5f4c7bb02881c9ac647a61"><a name="a2601e9eece5f4c7bb02881c9ac647a61"></a><a name="a2601e9eece5f4c7bb02881c9ac647a61"></a>-</p>
</td>
</tr>
<tr id="rf2a5d43b74894a0882b7c17bdfeb697f"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="ad00611ec129a41a9841fb579eece7804"><a name="ad00611ec129a41a9841fb579eece7804"></a><a name="ad00611ec129a41a9841fb579eece7804"></a>Memory</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><p id="a94efe642b8694e5a85747e123b951efc"><a name="a94efe642b8694e5a85747e123b951efc"></a><a name="a94efe642b8694e5a85747e123b951efc"></a>≥ 2 GB (4 GB or higher recommended for better user experience)</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="abfb44d28dca741f68df94e4e276d2410"><a name="abfb44d28dca741f68df94e4e276d2410"></a><a name="abfb44d28dca741f68df94e4e276d2410"></a>-</p>
</td>
</tr>
<tr id="rd2c1ebd93ea64e85a5f3fc88dc5ba456"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="afd36954546334c1681b5a391bbc386ae"><a name="afd36954546334c1681b5a391bbc386ae"></a><a name="afd36954546334c1681b5a391bbc386ae"></a>Drive</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><p id="p1224172312719"><a name="p1224172312719"></a><a name="p1224172312719"></a>8 GB or higher recommended for better user experience</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="acc0affdd82e34f32966171e21855ef40"><a name="acc0affdd82e34f32966171e21855ef40"></a><a name="acc0affdd82e34f32966171e21855ef40"></a>-</p>
</td>
</tr>
</tbody>
</table>

## Installation Modes

> ![](./public_sys-resources/icon-notice.gif) **NOTE**
> 
> - The hardware supports only Raspberry Pi 3B/3B+/4B.
> - The installation is performed by writing images to the SD card. This section describes how to write images on Windows, Linux, and Mac.
> - The image used in this section is the Raspberry Pi image of openEuler. For details about how to obtain the image, see [Installation Preparations](Installation-Preparations1.md).

<!-- TOC -->

- [Installation Modes](#installation-modes)
    - [Writing Images on Windows](#writing-images-on-windows)
        - [Formatting the SD Card](#formatting-the-sd-card)
        - [Writing Images to the SD Card](#writing-images-to-the-sd-card)
    - [Writing Images on Linux](#writing-images-on-linux)
        - [Checking Drive Partition Information](#checking-drive-partition-information)
        - [Unmounting the SD Card](#unmounting-the-sd-card)
        - [Writing Images to the SD Card](#writing-images-to-the-sd-card-1)
    - [Writing Images on Mac](#writing-images-on-mac)
        - [Checking Drive Partition Information](#checking-drive-partition-information-1)
        - [Unmounting the SD Card](#unmounting-the-sd-card-1)
        - [Writing Images to the SD Card](#writing-images-to-the-sd-card-2)

<!-- /TOC -->
## Writing Images on Windows

This section uses Windows 10 as an example to describe how to write images to the SD card in the Windows environment.

### Formatting the SD Card

To format the SD card, perform the following procedures:

1. Download and install a SD card formatting tool. The following operations use SD Card Formatter as an example.

2. Start SD Card Formatter. In **Select card**, select the drive letter of the SD card to be formatted.
   
   If no image has been installed in the SD card, only one drive letter exists. In **Select card**, select the drive letter of the SD card to be formatted.
   
   If an image has been installed in the SD card, one or more drive letters exist. For example, the SD card corresponds to three drive letters: E, G, and H. In **Select card**, you can select the drive letter E of the boot partition.

3. In **Formatting options**, select a formatting mode. The default mode is **Quick format**.

4. Click **Format** to start formatting. A progress bar is displayed to show the formatting progress.

5. After the formatting is completed, the message "Formatting was successfully completed" is displayed. Click **OK**.

### Writing Images to the SD Card

> ![](./public_sys-resources/icon-notice.gif) **NOTE**   
If the compressed image file **openEuler-21.09-raspi-aarch64.img.xz** is obtained, decompress the file to obtain the **openEuler-21.09-raspi-aarch64.img** image file.

To write the **openEuler-21.09-raspi-aarch64.img** image file to the SD card, perform the following procedures:

1. Download and install a tool for writing images. The following operations use Win32 Disk Imager as an example.
2. Start Win32 Disk Imager and right-click **Run as administrator**.
3. Select the path of the image file in IMG format from the **Image File** drop-down list box.
4. In **Device**, select the drive letter of the SD card to which the image is written.
5. Click **Write**. A progress bar is displayed to show the progress of writing the image to the SD card.
6. After the write operation is completed, a dialog box is displayed, indicating that the write operation is successfully completed. Click **OK**.

## Writing Images on Linux

This section describes how to write images to the SD card in the Linux environment.

### Checking Drive Partition Information

Run the ` **fdisk -l** ` command as the  **root**  user to obtain the drive information of the SD card. For example, the drive partition corresponding to the SD card can be  **/dev/sdb**.

### Unmounting the SD Card

1. Run the ` **df -lh** ` command to check the mounted volumes.

2. If the partitions corresponding to the SD card are not mounted, skip this step. If the partitions (for example, /dev/sdb1 and /dev/sdb3) are mounted, run the following commands as the  **root**  user to unmount them:
   
   `umount /dev/sdb1`
   
   `umount /dev/sdb3`

### Writing Images to the SD Card

1. If the image obtained is compressed, run the ` **xz -d openEuler-21.09-raspi-aarch64.img.xz** ` command to decompress the compressed file to obtain the **openEuler-21.09-raspi-aarch64.img** image file. Otherwise, skip this step.

2. Run the following command as the  **root**  user to write the `openEuler-21.09-raspi-aarch64.img` image to the SD card:
   
   `dd bs=4M if=openEuler-21.09-raspi-aarch64.img of=/dev/sdb`
   
   > ![](./public_sys-resources/icon-note.gif) **NOTE** 
   Generally, the block size is set to 4 MB. If the write operation fails or the written image cannot be used, you can set the block size to 1 MB and try again. However, the write operation is time-consuming when the block size is set to 1 MB.

## Writing Images on Mac

This section describes how to flash images to the SD card in the Mac environment.

### Checking Drive Partition Information

Run the ` **diskutil list** ` command as the  **root**  user to obtain the drive information of the SD card. For example, the drive partition corresponding to the SD card can be  **/dev/disk3**.

### Unmounting the SD Card

1. Run the ` **df -lh** ` command to check the mounted volumes.

2. If the partitions corresponding to the SD card are not mounted, skip this step. If the partitions (for example, dev/disk3s1 and /dev/disk3s3) are mounted, run the following commands as the  **root**  user to unmount them:
   
   `diskutil umount /dev/disk3s1`
   
   `diskutil umount /dev/disk3s3`

### Writing Images to the SD Card

1. If the image obtained is compressed, run the `xz -d openEuler-21.09-raspi-aarch64.img.xz` command to decompress the compressed file to obtain the **openEuler-21.09-raspi-aarch64.img** image file. Otherwise, skip this step.

2. Run the following command as the  **root**  user to write the image `openEuler-21.09-raspi-aarch64.img` to the SD card:
   
   `dd bs=4m if=openEuler-21.09-raspi-aarch64.img of=/dev/disk3`
   
   > ![](./public_sys-resources/icon-note.gif) **NOTE**
   > Generally, the block size is set to 4 MB. If the write operation fails or the written image cannot be used, you can set the block size to 1 MB and try again. However, the write operation is time-consuming when the block size is set to 1 MB.


## Installation Guide

This section describes how to enable the Raspberry Pi function after [Writing Raspberry Pi Images into the SD card](./Installation-Modes1.md).

<!-- TOC -->
- [Installation Guide](#installation-guide)
    - [Starting the System](#starting-the-system)
    - [Logging in to the System](#logging-in-to-the-system)
    - [Configuring the System](#configuring-the-system)
        - [Expanding the Root Directory Partition](#expanding-the-root-directory-partition)
        - [Connecting to the Wi-Fi Network](#connecting-to-the-wi-fi-network)

<!-- /TOC -->
## Starting the System

After an image is written into the SD card, insert the SD card into the Raspberry Pi and power on the SD card.

For details about the Raspberry Pi hardware, visit the [Raspberry Pi official website](https://www.raspberrypi.org/).

## Logging in to the System

You can log in to the Raspberry Pi in either of the following ways:

1. Local login
   
   Connect the Raspberry Pi to the monitor (the Raspberry Pi video output interface is Micro HDMI), keyboard, and mouse, and start the Raspberry Pi. The Raspberry Pi startup log is displayed on the monitor. After Raspberry Pi is started, enter the user name **root** and password **openeuler** to log in.

2. SSH remote login
   
   By default, the Raspberry Pi uses the DHCP mode to automatically obtain the IP address. If the Raspberry Pi is connected to a known router, you can log in to the router to check the IP address. The new IP address is the Raspberry Pi IP address.

   **Figure 1** Obtain the IP address<a name="zh-cn_topic_0151920806_f6ff7658b349942ea87f4521c0256c313"></a>  
   ![](./figures/Obtain the IP address)
   
   According to the preceding figure, the IP address of the Raspberry Pi is **192.168.31.109**. You can run the `ssh root@192.168.31.109` command and enter the password `openeuler` to remotely log in to the Raspberry Pi.

## Configuring the System

### Expanding the Root Directory Partition

The space of the default root directory partition is small. Therefore, you need to expand the partition capacity before using it.

To expand the root directory partition capacity, perform the following procedure:

1. Run the `fdisk -l` command as the root user to check the drive partition information. The command output is as follows:
   
   ```shell
   # fdisk -l
   Disk /dev/mmcblk0: 14.86 GiB, 15931539456 bytes, 31116288 sectors
   Units: sectors of 1 * 512 = 512 bytes
   Sector size (logical/physical): 512 bytes / 512 bytes
   I/O size (minimum/optimal): 512 bytes / 512 bytes
   Disklabel type: dos
   Disk identifier: 0xf2dc3842
   
   Device         Boot   Start     End Sectors  Size Id Type
   /dev/mmcblk0p1 *       8192  593919  585728  286M  c W95 FAT32 (LBA)
   /dev/mmcblk0p2       593920 1593343  999424  488M 82 Linux swap / Solaris
   /dev/mmcblk0p3      1593344 5044223 3450880  1.7G 83 Linux
   ```
   
   The drive letter of the SD card is **/dev/mmcblk0**, which contains three partitions:
   
   - **/dev/mmcblk0p1**: boot partition
   - **/dev/mmcblk0p2**: swap partition
   - **/dev/mmcblk0p3**: root directory partition
   
   Here, we need to expand the capacity of `/dev/mmcblk0p3`.

2. Run the `fdisk /dev/mmcblk0` command as the root user and the interactive command line interface (CLI) is displayed. To expand the partition capacity, perform the following procedure as shown in [Figure 2](#zh-cn_topic_0151920806_f6ff7658b349942ea87f4521c0256c315).
   
   1. Enter `p` to check the partition information.
      
      Record the start sector number of `/dev/mmcblk0p3`. That is, the value in the `Start` column of the `/dev/mmcblk0p3` information. In the example, the start sector number is `1593344`.
   
   2. Enter `d` to delete the partition.
   
   3. Enter `3` or press `Enter` to delete the partition whose number is `3`. That is, the `/dev/mmcblk0p3`.
   
   4. Enter `n` to create a partition.
   
   5. Enter `p` or press `Enter` to create a partition of the `Primary` type.
   
   6. Enter `3` or press `Enter` to create a partition whose number is `3`. That is, the `/dev/mmcblk0p3`.
   
   7. Enter the start sector number of the new partition. That is, the start sector number recorded in Step `1`. In the example, the start sector number is `1593344`.
      
      > ![](./public_sys-resources/icon-notice.gif) **NOTE:**   
Do not press **Enter** or use the default parameters.
   
   8. Press `Enter` to use the last sector number by default as the end sector number of the new partition.
   
   9. Enter `N` without changing the sector ID.
   
   10. Enter `w` to save the partition settings and exit the interactive CLI.
   
   **Figure 2** Expand the partition capacity<a name="zh-cn_topic_0151920806_f6ff7658b349942ea87f4521c0256c315"></a>  
![](./figures/Expand the partition capacity)

3. Run the `fdisk -l` command as the root user to check the drive partition information and ensure that the drive partition is correct. The command output is as follows:
   
   ```shell
   # fdisk -l
   Disk /dev/mmcblk0: 14.86 GiB, 15931539456 bytes, 31116288 sectors
   Units: sectors of 1 * 512 = 512 bytes
   Sector size (logical/physical): 512 bytes / 512 bytes
   I/O size (minimum/optimal): 512 bytes / 512 bytes
   Disklabel type: dos
   Disk identifier: 0xf2dc3842
   
   Device         Boot   Start      End  Sectors  Size Id Type
   /dev/mmcblk0p1 *       8192   593919   585728  286M  c W95 FAT32 (LBA)
   /dev/mmcblk0p2       593920  1593343   999424  488M 82 Linux swap / Solaris
   /dev/mmcblk0p3      1593344 31116287 29522944 14.1G 83 Linux
   ```

4. Run the `resize2fs /dev/mmcblk0p3` command as the root user to increase the size of the unloaded file system.

5. Run the `df -lh` command to check the drive space information and ensure that the root directory partition has been expanded.
   
   > ![](./public_sys-resources/icon-notice.gif) **NOTE:**   
If the root directory partition is not expanded, run the `reboot` command to restart the Raspberry Pi and then run the `resize2fs /dev/mmcblk0p3` command as the root user.

### Connecting to the Wi-Fi Network

To connect to the Wi-Fi network, perform the following procedure:

1. Check the IP address and network adapter information.
   
   `ip a`
   
   Obtain information about the wireless network adapter **wlan0**:
   
   ```text
   1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
       link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
       inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
       inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
   2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
       link/ether dc:a6:32:50:de:57 brd ff:ff:ff:ff:ff:ff
       inet 192.168.31.109/24 brd 192.168.31.255 scope global dynamic noprefixroute eth0
       valid_lft 41570sec preferred_lft 41570sec
       inet6 fe80::cd39:a969:e647:3043/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
   3: wlan0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
       link/ether e2:e6:99:89:47:0c brd ff:ff:ff:ff:ff:ff
   ```

2. Scan information about available Wi-Fi networks.
   
   `nmcli dev wifi`

3. Connect to the Wi-Fi network.
   
   Run the `nmcli dev wifi connect SSID password PWD` command as the root user to connect to the Wi-Fi network.
   
   In the command, `SSID` indicates the SSID of the available Wi-Fi network scanned in the preceding step, and `PWD` indicates the password of the Wi-Fi network. For example, if the `SSID` is `openEuler-wifi`and the password is `12345678`, the command for connecting to the Wi-Fi network is `nmcli dev wifi connect openEuler-wifi password 12345678`. The connection is successful.
   
   ```text
   Device 'wlan0' successfully activated with '26becaab-4adc-4c8e-9bf0-1d63cf5fa3f1'.
   ```

4. Check the IP address and wireless network adapter information.
   
   `ip a`
   
   ```text
   1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
       link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
       inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
       inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
   2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
       link/ether dc:a6:32:50:de:57 brd ff:ff:ff:ff:ff:ff
       inet 192.168.31.109/24 brd 192.168.31.255 scope global dynamic noprefixroute eth0
       valid_lft 41386sec preferred_lft 41386sec
       inet6 fe80::cd39:a969:e647:3043/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
   3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
       link/ether dc:a6:32:50:de:58 brd ff:ff:ff:ff:ff:ff
       inet 192.168.31.110/24 brd 192.168.31.255 scope global dynamic noprefixroute wlan0
       valid_lft 43094sec preferred_lft 43094sec
       inet6 fe80::394:d086:27fa:deba/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
   ```
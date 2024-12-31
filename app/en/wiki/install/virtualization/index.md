---
title: Installation and Usage
category: wiki
---

# Installing openEuler in VirtualBox on Windows

VirtualBox, originally developed by Innotek GmbH and now maintained by Oracle Corporation, is a VM software component of the Oracle xVM virtualization platform. Users can install openEuler VMs through VirtualBox using images downloaded from the official openEuler repository.

openEuler download link: <https://www.openeuler.org/en/download>

## Environment Preparation

- Windows 10 (64-bit)
- Oracle VM VirtualBox 6.1.4
- openEuler image for x86: [openEuler-20.03-LTS-x86_64-dvd.iso](https://repo.openeuler.org/openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-x86_64-dvd.iso)

![](./images/e01.png)

## Installation Procedure

### 1. VirtualBox Installation

Download the VirtualBox installer from the [VirtualBox official website](https://www.virtualbox.org/wiki/Downloads).

![](./images/e02.png)

Use a custom installation path, for example, **D:\software\Oracle\VirtualBox**, and use default settings for subsequent steps.

![](./images/e03.png)

After the installation is complete, press **Ctrl**+**G** to open global settings and change the default VM location, for example, **D:\myVM**.

![](./images/e04.png)

### 2. VM Creation

Choose **Machine** > **New** and enter the VM configuration information, as shown in the following figure.

Set **Name** to openEuler, **Type** to Linux, and **Version** to **Other Linux (64-bit)**. Then, click **Next**.

![](./images/e05.png)

Allocate system memory to the VM as its memory. Set the value to 4 GB (4,096 MB).

![](./images/e06.png)

Choose **Create a virtual hard disk now**.

![](./images/e06-2.png)

Select **VDI (VirtualBox Disk Image)** for the hard disk file type and click **Next**.

![](./images/e07.png)

Select **Dynamically allocated** and click **Next**.

It is more efficient to allocate a large amount of memory to a VM and let it dynamically use drive space as needed, shrinking automatically when idle.

![](./images/e08.png)

Set the VM hard disk size to 64 GB.

![](./images/e09.png)

Now, the VM has been created, and hardware resources required by openEuler have been prepared.

![](./images/e10.png)

### 3. openEuler Installation

Start the VM created in the previous step.

![](./images/e11.png)

Click the folder icon on the right.

![](./images/e12.png)

Click **Add** and select **openEuler-20.03-LTS-x86_64-dvd.iso** downloaded during preparation.

![](./images/e13.png)

Click **Start** to enter the installation page.

![](./images/e14.png)

Select **Install openEuler 20.03-LTS** and press **Enter**.

![](./images/e15.png)

Click **Continue**.

![](./images/e16.png)

Select **Installation Destination**.

![](./images/e17.png)

Select the target drive and click **Done**.

![](./images/e18.png)

Select **Begin Installation**.

![](./images/e19.png)

The following figure shows installation in progress:

![](./images/e20.png)

Set the password of the **root** user. The password will be used for subsequent login.  

![](./images/e21.png)

After the installation is complete, click **Reboot** to restart the VM.

![](./images/e22.png)

The installation page is displayed again.

![](./images/e23.png)

Stop the VM. In **Storage** of VM settings, right-click **openEuler-20.03-LTS-x86_64-dvd.iso**, choose **Remove Attachment**, save the settings, and exit.

![](./images/e24.png)

Restart the VM. When the following screen is displayed, press **Enter**.

![](./images/e25.png)

Enter the user (**root**) and password set during the installation to log in to the VM.

![](./images/e26.png)

Now, the openEuler VM is ready for use.

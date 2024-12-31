---
title: Installation Guide
category: wiki
---

## Obtaining the openEuler Image on AWS

#### Step 1

Log in to the [AWS Console](https://console.aws.amazon.com).

#### Step 2

Expand the **Services** tab, select **Compute** and then **EC2**.

![](./images/aws_4.12.05.png)

![](./images/aws_4.13.43.png)

![](./images/aws_4.34.37.png)

#### Step 3

In the **Images** list, choose **AMI Catalog**.
![](./images/aws_4.38.12.png)

#### Step 4

Choose **Community AMIs** and search for "openEuler."

![](./images/aws_4.39.49.png)

#### Step 5

Select an openEuler version to create a VM.


## Obtaining the openEuler Shared Image on Azure

#### Step 1

Log in to the [Azure Portal](https://portal.azure.com/).

#### Step 2

Go to the account home page and search for "Community images."

   ![](./images/az01.png)

#### Step 3

On the **Community images** page, search for the "openEuler" to view available openEuler images.

   ![](./images/az02.jpeg)

#### Step 4

Click the target image and create a VM.

   ![](./images/az03.jpeg)


## Obtaining the openEuler Image on Alibaba Cloud

#### Step 1

Log in to the [Alibaba Cloud Console](https://cn.aliyun.com).

#### Step 2

Expand the **Home** tab and choose **Elastic Compute Service**.

   ![](./images/al01.png)

   ![](./images/al02.png)

#### Step 3

In the **Images** list, choose **Community Images**, and search for "openEuler."

   ![](./images/al03.png)

#### Step 4

Select an openEuler version to create a VM.

## Obtaining the openEuler Image on Huawei Cloud

This section takes cloud host (instance) creation on Huawei Cloud as an example to illustrate how to use openEuler on a public cloud.

1. Log in to the HUAWEI CLOUD website and click **Console**.

   ![](./images/d01.png)

2. Select **Elastic Cloud Server**.

   ![](./images/d02.png)
   ![](./images/d03.png)

3. Buy and configure an ECS.

   ![](./images/d04.png)

   1. Configure computing resources.
      ![](./images/d05.png)
   2. Select an openEuler image.
      ![](./images/d06.png)
      ![](./images/d07.png)
      ![](./images/d08.png)
   3. Configure the network.
      ![](./images/d09.png)
      ![](./images/d10.png)
   4. Configure the login mode.
      ![](./images/d11.png)
      Huawei Cloud KooGallery requires released images to prohibit **root** user login. Therefore, the **root** user can only log in through the console. If you need to use the **root** user, log in through the console and modify the **/etc/ssh/sshd_config** file.
   5. Completing the purchase.
      ![](./images/d12.png)
   6. Log in and use the ECS.

      After the status of the created ECS changes to **Running**, you can remotely log in to the ECS.
      ![](./images/d13.png)

      Due to the image release requirements of Huawei Cloud KooGallery, ECSs running openEuler images cannot be accessed via root login or password authentication. The default user is **openeuler**. Therefore, before using the ECS, you need to log in to the console as the **root** user set in step 4 and modify the configuration items in the **/etc/ssh/sshd_config** file as follows:

      ```ini
      # /etc/ssh/sshd_config

      # Allows root user login.
      PermitRootLogin yes
      # Allows password authentication.
      PasswordAuthentication yes
      ```

      After the modification, you can log in as the **root** user from any terminal through SSH.

      ```shell
      $ ssh root@1.92.159.107

      Authorized users only. All activities may be monitored and reported.
      root@1.92.159.107's password:

      Authorized users only. All activities may be monitored and reported.
      Last login: Mon Apr 29 11:03:05 2024


      Welcome to 5.10.0-182.0.0.95.oe2203sp3.x86_64

      System information as of time:  Mon Apr 29 11:19:11 AM UTC 2024

      System load: 	0.00
      Processes: 	80
      Memory used: 	3.7%
      Swap used: 	0.0%
      Usage On: 	4%
      IP address: 	192.168.0.231
      Users online: 	2

      [root@openeuler-host ~]#
      ```

**The method of using openEuler images on other clouds is similar to that on Huawei Cloud. For details, see the user guide of the respective cloud product.**

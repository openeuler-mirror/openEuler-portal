---
title: 安装指引
category: wiki
---

##  在AWS获取openEuler镜像

#### 步骤 1 

登陆AWS控制台<https://console.aws.amazon.com>

#### 步骤 2 展开主页选项卡，进入计算列表，选择EC2

![输入图片说明](./images/aws_3.47.22.png)

![输入图片说明](./images/aws_4.03.06.png)

![输入图片说明](./images/aws_4.04.36.png)

#### 步骤 3 进入映像列表，选择AMI目录

![输入图片说明](./images/aws_3.58.41.png)

#### 步骤 4 选择社区AMI，搜索openEuler

![输入图片说明](./images/aws_4.06.48.png)

#### 步骤 5 选择目标版本创建实例

## Azure获取openEuler共享镜像

#### 步骤 1 

登录 [Azure Portal](https://portal.azure.com/)

#### 步骤 2 

进入账户主页搜索：Community images 服务并进入

![输入图片说明](./images/az01.jpg)

#### 步骤 3 

在 Community images 服务页面搜索关键词：openEuler，即可看到可用的 openEuler 镜像

![输入图片说明](./images/az02.jpg)

#### 步骤 4 

点击目标镜像，即可创建 VM

![输入图片说明](./images/az03.jpg)

## 在阿里云获取openEuler镜像

#### 步骤 1 

登录阿里云控制台<https://cn.aliyun.com>

#### 步骤 2 

展开主页选项卡，选择云服务器 ECS

![输入图片说明](./images/al01.jpeg)

![输入图片说明](./images/al02.jpeg)

#### 步骤 3 

进入**镜像**列表，选择**社区镜像**，搜索 openEuler

![输入图片说明](./images/al03.jpeg)

### 步骤 4 

选择目标版本创建虚机。

## 在华为云获取openEuler镜像

以在华为云上创建云主机（实例）为例，说明公有云上 openEuler 的使用方法

### 登陆华为云并进入控制台

![输入图片说明](./images/d01.jpeg)

### 选择弹性云服务器 ECS

![输入图片说明](./images/d02.jpeg)
![输入图片说明](./images/d03.jpeg)

### 购买弹性云服务器并配置

![输入图片说明](./images/d04.jpeg)

1. **配置算力资源**
   ![输入图片说明](./images/d05.png)
2. **选择 openEuler 镜像**
   ![输入图片说明](./images/d06.png)
   ![输入图片说明](./images/d07.png)
   ![输入图片说明](./images/d08.png)
3. **进行网络配置**
   ![输入图片说明](./images/d09.png)
   ![输入图片说明](./images/d10.png)
4. **设置登录方式**
   ![输入图片说明](./images/d11.png)
   **需要注意华为云商店要求发布的镜像禁止 root 用户登录** ，因此这里设置的 root 用户仅限于控制台登录，如果用户需要使用 root 权限，则可通过控制台登入后修改`/etc/ssh/sshd_config`文件进行配置。
5. **完成购买**
   ![输入图片说明](./images/d12.png)
6. **登录使用**

   等待创建的云主机状态变成运行中即可进行远程登录。
   ![输入图片说明](./images/d13.png)

   由于华为云商店发布镜像的要求，openEuler 镜像启动的主机 **禁止以 root 用户登录、禁止使用密码认证** ，其默认用户为 openeuler。因此，主机在正常使用之前需要通过步骤 4 设置的 root 用户在控制台登录修改`/etc/ssh/sshd_config`文件的配置项以满足要求，具体配置如下：

   ```
   # /etc/ssh/sshd_config

   # 允许以root用户登录
   PermitRootLogin yes
   # 允许使用密码认证登录
   PasswordAuthentication yes
   ```

   修改完成后即可在任意终端使用 ssh 以 root 用户密码登录：

   ```
   $ ssh root@1.92.159.107

     Authorized users only. All activities may be monitored and reported.
     root@1.92.159.107's password:

     Authorized users only. All activities may be monitored and reported.
     Last login: Mon Apr 29 11:03:05 2024


     Welcome to 5.10.0-182.0.0.95.oe2203sp3.x86_64

     System information as of time: 	2024年 04月 29日 星期一 11:19:11 UTC

     System load: 	0.00
     Processes: 	80
     Memory used: 	3.7%
     Swap used: 	0.0%
     Usage On: 	4%
     IP address: 	192.168.0.231
     Users online: 	2

    [root@openeuler-host ~]#
   ```

<br/>

**其他云上 openEuler 镜像的使用方式与华为云相似，详细使用方法可参考对应云上商品的使用指南。**

## 在腾讯云获取openEuler镜像

#### 步骤 1 

登陆腾讯云控制台 <https://console.cloud.tencent.com/>

#### 步骤 2 

展开选项卡，选择云服务器

![输入图片说明](./images/tt_10.33.39.png)

![输入图片说明](./images/tt_10.36.40.png)

#### 步骤 3 

进入实例列表，选择目标实例类型

![输入图片说明](./images/tt_10.39.15.png)

#### 步骤 4 

选择自定义配置

![输入图片说明](./images/tt_10.42.17.png)

#### 步骤 5

进入云镜像市场，搜索openEuler

![输入图片说明](./images/tt_10.44.00.png)

![输入图片说明](./images/tt_10.46.54.png)

#### 步骤 6 选择目标版本创建实例

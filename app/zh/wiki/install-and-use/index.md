---
title: 安装使用
category: wiki
---

# 安装使用

openEuler 社区版分为长期支持版本（LTS）和创新版本，并提供多种环境以便开发者[下载使用](https://www.openeuler.org/zh/download/get-os/)。

## 1. 公有云上 openEuler 镜像使用指南

目前，社区已经将多个版本的 openEuler 云镜像发布到公有云厂商以方便用户使用 openEuler。

### 1. 1 可用版本

以下是主流公有云上已发布的 openEuler 镜像版本：

- **AWS Marketplace**

| Version         | AMI ID                | Arch    |
| :-------------- | :-------------------- | :------ |
| 22.03-LTS-SP1 2 | ami-0baeb9308b134d488 | x86_64  |
| 22.03-LTS-SP1   | ami-03231b47c646ab173 | aarch64 |
| 22.03-LTS-SP2   | ami-0eceb9e642c0299f8 | x86_64  |
| 22.03-LTS-SP2   | ami-067e1b0f491b95db2 | aarch64 |
| 22.03-LTS-SP3   | ami-0145435b3931b0fe7 | x86_64  |
| 22.03-LTS-SP3   | ami-01677a5af1dee0f72 | aarch64 |
| 23.09           | ami-08556c9d0dd2f0a01 | x86_64  |
| 23.09           | ami-051484777fe029d4e | aarch64 |

- **华为云商店**

| Version         | Arch    |
| :-------------- | :------ |
| 22.03-LTS-SP2 1 | x86_64  |
| 22.03-LTS-SP2   | aarch64 |
| 22.03-LTS-SP3   | x86_64  |
| 22.03-LTS-SP3   | aarch64 |
| 23.09           | x86_64  |
| 23.09           | aarch64 |

注意，腾讯云还未大规模使用arm算力，发布时国内很多区不可用，因此未在腾讯云上发布openEuler的arm镜像。

### 1.2 创建openEuler云实例

以在华为云上创建云主机（实例）为例，说明公有云上openEuler的使用方法

 - 登陆华为云并进入控制台

   ![输入图片说明](image1/d01.jpeg)

 - 选择弹性云服务器ECS

  ![输入图片说明](image1/d02.jpeg)
  ![输入图片说明](image1/d03.jpeg)

 - 购买弹性云服务器并配置

  ![输入图片说明](image1/d04.jpeg)

  1. 配置算力资源

  ![输入图片说明](image1/d05.png)


  2. 选择openEuler镜像

  ![输入图片说明](image1/d06.png)
  ![输入图片说明](image1/d07.png)
  ![输入图片说明](image1/d08.png)


  3. 进行网络配置

  ![输入图片说明](image1/d09.png)
  ![输入图片说明](image1/d10.png)

  4. 设置登录方式
 
  ![输入图片说明](image1/d11.png)
  
 **需要注意华为云商店要求发布的镜像禁止root用户登录** ，因此这里设置的root用户仅限于控制台登录，如果用户需要使用root权限，则可通过控制台登入后修改`/etc/ssh/sshd_config`文件进行配置。

  5. 完成购买

  ![输入图片说明](image1/d12.png)

  6. 登录使用

  等待创建的云主机状态变成运行中即可进行远程登录。

   ![输入图片说明](image1/d13.png)
  
由于华为云商店发布镜像的要求，openEuler镜像启动的主机 **禁止以root用户登录、禁止使用密码认证** ，其默认用户为openeuler。
因此，主机在正常使用之前需要通过步骤4设置的root用户在控制台登录修改`/etc/ssh/sshd_config`文件的配置项以满足要求，具体配置如下：


```
# /etc/ssh/sshd_config

# 允许以root用户登录
PermitRootLogin yes
# 允许使用密码认证登录
PasswordAuthentication yes
```

修改完成后即可在任意终端使用ssh以root用户密码登录：


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

其他云上openEuler镜像的使用方式与华为云相似，详细使用方法可参考对应云上商品的使用指南。

### 1.3 Hello World

至此，创建的openEuler云主机已经可以进行开发活动，让我们一起写出openEuler上的第一个Hello World'


```
# hello_world.py
print("Hello, world!")
```

使用python3运行


```
[root@openeuler-host ~]# python3 hello_world.py 
Hello, World!
```


## 2. openEuler容器镜像部署指南

当前openEuler社区除过基础镜像之外，已经发布和上线了20+核心的开源应用镜像，本文着重分享openEuler基础镜像的安装和使用的初步实践，如果您对openEuler社区其他镜像感兴趣，欢迎大家使用和体验。

### 2.1 基础镜像简介


   1. 容器镜像仓库

openEuler官方容器镜像仓库，包含openEuler基础镜像、应用镜像。在这里，你可以找到相应镜像的使用和介绍。

       - [openeuler-docker-images](https://gitee.com/openeuler/openeuler-docker-images)
   
   2. 基础镜像地址

openEuler的基础镜像官方地址
      - [repo.openeuler.org](https://repo.openeuler.org/)

   3. 基础镜像版本

         - [20.03-lts](https://repo.openeuler.org/openEuler-20.03-LTS/docker_img/)
         - [20.03-lts-sp1](https://repo.openeuler.org/openEuler-20.03-LTS-SP1/docker_img/)
	  - [20.03-lts-sp2](https://repo.openeuler.org/openEuler-20.03-LTS-SP2/docker_img/)
	  - [20.03-lts-sp3](https://repo.openeuler.org/openEuler-20.03-LTS-SP3/docker_img/)
	  - [20.03-lts-sp4, 20.03](https://repo.openeuler.org/openEuler-20.03-LTS-SP4/docker_img/)
	  - [20.09](https://archives.openeuler.openatom.cn/openEuler-20.09/docker_img/)
	  - [21.03](https://archives.openeuler.openatom.cn/openEuler-21.03/docker_img/)
	  - [21.09](https://archives.openeuler.openatom.cn/openEuler-21.09/docker_img/)
	  - [22.03-lts](https://repo.openeuler.org/openEuler-22.03-LTS/docker_img/)
	  - [22.09](https://archives.openeuler.openatom.cn/openEuler-22.09/docker_img/)
	  - [22.03-lts-sp1](https://repo.openeuler.org/openEuler-22.03-LTS-SP1/docker_img/)
	  - [22.03-lts-sp2](https://repo.openeuler.org/openEuler-22.03-LTS-SP2/docker_img/)
	  - [22.03-lts-sp3, 22.03, latest](https://repo.openeuler.org/openEuler-22.03-LTS-SP3/docker_img/)
	  - [23.03](https://repo.openeuler.org/openEuler-23.03/docker_img/)
	  - [23.09](https://repo.openeuler.org/openEuler-23.09/docker_img/)

### 2.2 镜像仓库

基础镜像和应用镜像支持的版本会发布到以下平台的镜像仓库，供开发者下载和使用。

   - [hub.docker.com](https://hub.docker.com/)
   - [quay.io](https://quay.io/)
   - [hub.oepkgs.net](https://hub.oepkgs.net/)
   - [repo.openeuler.org](https://repo.openeuler.org/)

### 2.3 镜像部署流程

#### 2.3.1 准备环境

* windows系统需要准备一台虚拟机
* mac系统可以使用自带的shell终端

#### 2.3.2 部署docker

```bash
#1、执行docker安装命令，已安装docker或下载docker客户端，跳过
dnf -y install docker  # 虚拟机安装docker示例, mac系统需自行安装

# 2、docker安装成功后，如docker安装成功，可以看到安装的版本
docker version 
```

![输入图片说明](image2/c01.png)

#### 2.3.3 拉取镜像

> 镜像版本一般采用最新版本，如需其他版本替换**latest**为对应版本即可。拉取和运行都不建议以默认方式运行， 防止国外镜像容器网络问题导致网络不稳定。

```bash
# 拉取方式一: 默认方式，国内环境不建议使用
docker pull openeuler/openeuler:latest
# 拉取方式二：指定国内仓库，国内用户推荐使用
docker pull hub.oepkgs.net/openeuler/openeuler:latest
```

```bash
#镜像拉取完成后可以看到
docker images 
```

![输入图片说明](image2/c02.png)

#### 2.3.4 运行容器

> 镜像版本一般采用最新版本，如需其他版本替换**latest**为对应版本即可。

```bash
# 运行方式一: 默认方式，国内环境不建议使用
docker run -it  openeuler/openeuler:latest
# 运行方式二：指定国内仓库，国内用户推荐使用
docker run -it  hub.oepkgs.net/openeuler/openeuler:latest
```
![输入图片说明](image2/c03.png)


#### 2.3.5 容器运行测试

编写测试脚本，openeuler默认自带python3工具，可以编写一个简单的HelloWorld脚本测试。

参考如下:

```bash
# 打开文件编辑器
vi HelloWorld.py
```

```bash
# 按键insert或者i键开始编辑
```

```bash
# 输入测试程序
print("Hello, world!")
```

```bash
# 按键esc 退出编辑 按键 shift+:  输入wq! 保存文件
```

```bash
# 执行python脚本，测试程序
python3 HelloWorld.py
```

文件编辑示例

![输入图片说明](image2/c04.png)

程序运行示例

![输入图片说明](image2/c05.png)

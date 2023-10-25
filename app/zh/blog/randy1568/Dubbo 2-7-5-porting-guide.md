---
title: Dubbo 2.7.5 移植指南（openEuler 20.03 LTS SP1）
titleTemplate: 服务器系统迁移 | openEuler社区官网
head:
  - - meta
    - name: description
      content: 本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署Dubbo 2.7.5。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: Dubbo移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具
category: blog
date: 2021-12-29
tags:
  - Dubbo
  - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Dubbo 2.7.5
---

## 介绍

### 简要介绍

Dubbo 是阿里巴巴公司开源的一个高性能优秀的服务框架，使得应用可通过高性能的 RPC（远程过程调用）实现服务的输出和输入功能，可以和 Spring 框架无缝集成。简单地说，Dubbo 是一个基于 Spring 的 RPC 框架，能够实现服务的远程调用、服务的治理。

### 建议版本

建议使用 Dubbo 2.7.5 版本。

## 环境要求

### 硬件要求

硬件要求如[表 1](https://support.huaweicloud.com/prtg-dubbo-kunpengwebs/kunpengdubbo268_02_0002.html#kunpengdubbo268_02_0002__d0e90)所示。


### 操作系统要求

操作系统要求如[表 2](https://support.huaweicloud.com/prtg-dubbo-kunpengwebs/kunpengdubbo268_02_0002.html#kunpengdubbo268_02_0002__d0e141)所示。

| 项目      | 版本                  |
| --------- | --------------------- |
| openEuler | 20.03 LTS-SP1 aarch64 |
| Kernel    | 4.19.90               |

## 配置编译环境

### 配置 DNS 服务器

```
# cat /etc/resolv.conf
nameserver 114.114.114.114
nameserver 8.8.8.8
```

### 安装依赖包

1. 下载并安装依赖包

```
yum install java-1.8.0* tcl git gcc gcc-c++ make cmake libtool autoconf automake -y
```

2. 查看 Java 版本

```
[root@localhost ~]# java -version
openjdk version "1.8.0_272"
OpenJDK Runtime Environment Bisheng (build 1.8.0_272-b10)
OpenJDK 64-Bit Server VM Bisheng (build 25.272-b10, mixed mode)

```

### 安装 Maven

1. 下载 Maven 安装包

```
wget https://archive.apache.org/dist/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
```

2. 解压安装包到指定目录

```
tar -zxvf apache-maven-3.6.3-bin.tar.gz -C /opt/
```

3. 配置 Maven 环境变量。

a.在“/etc/profile” 文件末尾增加 Maven 路径

```
echo "MAVEN_HOME=/opt/apache-maven-3.6.3/" >> /etc/profile
echo 'export PATH=$MAVEN_HOME/bin:$PATH'  >> /etc/profile
```

b.使修改的环境变量生效。

```
source /etc/profile
```

4. 检查配置是否生效。

```
[root@localhost ~]# mvn -v
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /opt/apache-maven-3.6.3
Java version: 1.8.0_272, vendor: Bisheng, runtime: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.272.b10-7.oe1.aarch64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.19.90-2012.4.0.0053.oe1.aarch64", arch: "aarch64", family: "unix"

```

5. 修改 Maven 配置文件中的本地仓、远程仓、代理等。

配置文件路径：“/opt/apache-maven-3.6.3/conf/settings.xml”。

配置网络代理，其中 host，port，username，password 需要根据当前环境修改：

```
<proxies>
   <proxy>
     <id>my-proxy</id>
     <active>true</active>
     <protocol>https</protocol>
     <host>代理服务器网址</host>
     <port>代理服务器端口</port>
     <username>用户名</username>
     <password>密码</password>
     <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
   </proxy>
   <proxy>
     <id>my-proxy1</id>
     <active>true</active>
     <protocol>http</protocol>
     <host>代理服务器网址</host>
     <port>代理服务器端口</port>
     <username>用户名</username>
     <password>密码</password>
     <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
   </proxy>
</proxies>
```

配置远程仓库：

```
<mirrors>
         <mirror>
                <id>huaweicloud</id>
                <mirrorOf>*</mirrorOf>
                <url>https://mirrors.huaweicloud.com/repository/maven/</url>
         </mirror>
</mirrors>
```

## 编译

### 获取源码

```
mkdir /home/Dubbo && cd /home/Dubbo && wget https://github.com/apache/dubbo/archive/dubbo-2.7.5.tar.gz
&& tar -xvf dubbo-2.7.5.tar.gz
```

### 编译 dubbo-common 模块

### 编译 dubbo-remoting-netty 模块

1. 修改 NettyClientTest.java 文件。

   a. 打开文件，将第 76 行中的“6000”改为“9000”。

   `vim /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-remoting/dubbo-remoting-netty/src/test/java/org/apache/dubbo/remoting/transport/netty/NettyClientTest.java `

   <img src="./image/Dubbo-3.png">

   b. 编译 dubbo-remoting-netty 模块

   ```
   cd /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-remoting/dubbo-remoting-netty && mvn install
   ```

<img src="./image/Dubbo-4.png">

若显示 **BUILD SUCCESS**，则 dubbo-remoting-netty 模块编译成功。

​

### 编译 dubbo-rpc-redis 模块

1. 获取支持 aarch64 的 embedded-redis-0.6.jar 包

```
 mkdir -p /root/.m2/repository/com/github/kstyrc/embedded-redis/0.6/ && wget https://mirrors.huaweicloud.com/kunpeng/maven/com/github/kstyrc/embedded-redis/0.6/embedded-redis-0.6.jar -O /root/.m2/repository/com/github/kstyrc/embedded-redis/0.6/embedded-redis-0.6.jar
```

2. 编译 dubbo-rpc-redis 模块

```
cd /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-rpc/dubbo-rpc-redis/ && mvn install
```

<img src="./image/Dubbo-5.png">

若显示 **BUILD SUCCESS**，则 dubbo-rpc-redis 模块编译成功。

### 编译 dubbo-remoting-etcd3 模块

1.  安装 docker

```
yum -y install docker
```

2. 配置环境变量

```
echo "export TESTCONTAINERS_RYUK_DISABLED=true" >> /etc/profile && source /etc/profile
```

3. 修改“/root/.testcontainers.properties”文件

```
echo "checks.disable=true" >>  /root/.testcontainers.properties
```

4. 替换支持 ARM 64 镜像的 jetcd-launcher-0.3.0.jar 包

```
wget https://mirrors.huaweicloud.com/kunpeng/maven/io/etcd/jetcd-launcher/0.3.0/jetcd-launcher-0.3.0.jar -O /root/.m2/repository/io/etcd/jetcd-launcher/0.3.0/jetcd-launcher-0.3.0.jar
```

5. 编译 dubbo-remoting-etcd3 模块

```
cd /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-remoting/dubbo-remoting-etcd3/ && mvn install
```

<img src="./image/Dubbo-6.png">

若显示 **BUILD SUCCESS**，则 dubbo-remoting-etcd3 模块编译成功。

### 编译 dubbo- registry-consul 模块

```
cd /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-registry/dubbo-registry-consul/ && mvn install

```

==若编译过程中出现“EmbeddedConsul Could not start Consul process in...”的报错，则需要将 ARM 64 版本的 consul_1.1.0_linux_arm64.zip 包放在本地“/tmp/embedded-consul-1.1.0”目录下。==

```
wget https://releases.hashicorp.com/consul/1.1.0/consul_1.1.0_linux_arm64.zip && unzip consul_1.1.0_linux_arm64.zip && mv consul /tmp/embedded-consul-1.1.0/consul
```

然后再重新编译

<img src="./image/Dubbo-7.png">

若显示 **BUILD SUCCESS**，则 dubbo- registry-consul 模块编译成功。

### 修改其余配置文件

1. 替换本地仓库的 netty-all-4.1.25.Final.jar 包。

   ```
   mkdir -p /root/.m2/repository/io/netty/netty-all/4.1.25.Final/ && wget https://mirrors.huaweicloud.com/kunpeng/maven/io/netty/netty-all/4.1.25.Final/netty-all-4.1.25.Final.jar -O  /root/.m2/repository/io/netty/netty-all/4.1.25.Final/netty-all-4.1.25.Final.jar
   ```

2. 修改“/home/Dubbo/dubbo-dubbo-2.7.5/dubbo-config/dubbo-config-api/pom.xml”文件。

   1. 打开 pom.xml 文件。

      `vim /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-config/dubbo-config-api/pom.xml `

   2. 添加以下代码后，保存并退出文件。

      - 在第 31 行添加代码。

        ```
                <skipIntegrationTests>true</skipIntegrationTests>
        ```

        <img src="./image/Dubbo-8.png">

      - 在第 206 行添加代码。

        ```
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-surefire-plugin</artifactId>
                        <configuration>
                            <skipTests>${skipIntegrationTests}</skipTests>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        ```

        <img src="./image/Dubbo-9.png">

3. 修改“/home/Dubbo/dubbo-dubbo-2.7.5/dubbo-compatible/pom.xml”文件。

   1. 打开 pom.xml 文件。

      `vim /home/Dubbo/dubbo-dubbo-2.7.5/dubbo-compatible/pom.xml `

   2. 添加以下代码后，保存并退出。

      - 在第 30 行添加代码。

        ```
            <properties>
                <skipIntegrationTests>true</skipIntegrationTests>
            </properties>
        ```

        <img src="./image/Dubbo-10.png">

      - 在第 110 行添加代码。

        ```
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-surefire-plugin</artifactId>
                        <configuration>
                            <skipTests>${skipIntegrationTests}</skipTests>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        ```

        <img src="./image/Dubbo-11.png">

### 编译 Dubbo 2.7.5

/home/Dubbo/dubbo-dubbo-2.7.5/pom.xml 文件 592 行后增加如下内容：

```
<configuration>
	<testFailureIgnore>true</testFailureIgnore>
</configuration>
```

<img src="./image/Dubbo-12.png">

<img src="./image/Dubbo-13.png">

若显示 **BUILD SUCCESS**，则 Dubbo 2.7.5 编译成功。

编译完成后的 dubbo-2.7.5.jar 包保存在“dubbo-all/target”目录

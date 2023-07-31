---
title: 如何在openEuler WSL中体验完整的桌面环境
date: 2023-07-25
category: blog
tags:
  - 用户软件仓库
  - EUR
  - xrdp
  - DE
  - infrastructure
  - WSL
sig: sig-infrastructure
archives: 2023-07
author: waaagh
summary: "在windows中体验完整的openEuler 桌面环境"
---

## openEuler WSL
[WSL(Windows Subsystem For Linux)](https://learn.microsoft.com/en-us/windows/wsl/about) 是微软发布的让用户能够在windows上使用Linux环境的技术

而通过使用openEuler发布的WSL应用，则可以让大家在Windows中体验原汁原味的openEuler开发环境


目前openEuler已经将 openEuler 20.03-LTS，22.03-LTS，22.03，23.03等版本相继上架到了[微软应用商店](https://apps.microsoft.com/store/search/openeuler)，欢迎大家下载试用

如果无法访问应用商店，还可以[参考之前的文章，使用sideload](https://mp.weixin.qq.com/s/XKkapDSG98UlhtS4wVBCQA)
## openEuler User Repo
为了丰富openEuler的软件包生态，社区也推出了[openEuler用户软件仓系统(EUR)](https://eur.openeuler.openatom.cn/)，关于EUR更详细的介绍和使用指南可以参考[这篇博文](https://zhengzhenyu.gitee.io/post/intro-eur/)或者[官方博客1](https://www.openeuler.org/zh/blog/waaagh/openEuler-user-repo-howto.html)和[官方博客2](https://www.openeuler.org/zh/blog/waaagh/openEuler-user-repo-intro.html)

当您在使用openEuler时发现缺少某些软件包或已有包不满足需要，EUR就是您最好的帮手

## WSL + EUR
笔者自己是重度Linux桌面用户，在使用openEuler WSL的过程中，也一直期望能够用上原生的DE（Desktop Environment）

当前WSL社区主流的桌面解决方案是[kex](https://www.kali.org/docs/wsl/win-kex/)，而`kex`又是`kali linux`独家的软件包，但`kex`的`Seamless Mode`其实是借助了`xrdp`来实现的

可惜openEuler社区暂时没有引入`xrdp`这个软件包

不过在EUR和WSL的加持下，我们是不是也可尝试为openEuler添加`xrdp`并在WSL下使用`xrdp`体验桌面环境呢？

Talk is cheap，借助EUR和WSL的一番折腾，最后终于实现了在Windows中完全使用openEuler 桌面环境进行开发的小目标 :smile:

![](wsl7.png)
下面是个人折腾的步骤，最终结果是在openEuler 23.03的WSL中使用Gnome桌面环境：
1. 在windows server中安装WSL：
    1. 本文步骤均在`openEuler 23.03`版本上执行，如果无法访问windows store，可以下载最新发布的[openEuler 22.03-LTS-SP2的WSL sideload安装包](https://repo.openeuler.org/openEuler-22.03-LTS-SP2/WSL/openEuler-WSL-22.03.zip)，如果是通过应用商店途径安装，则可以跳过下面2步

    1. 下载后首先安装证书：双击压缩包中的`DistroLauncher-Appx_2203.1.164.0_x64_ARM64.cer`，依次选择`安装证书`->`本地计算机`->`将所有的证书都放入下列存储`->`受信任的人`

    ![](./wsl1.png)
    1. 安装sideload应用：以管理员权限开启一个powershell终端，并执行压缩包中的`Add-AppDevPackage.ps1`脚本

    ![](./wsl2.png)
    1. 初始化WSL环境：安装完成后，在开始菜单即可找到openEuler 22.03/23.03的应用图标，双击即可启动，启动后跟随引导初始化账号密码即可开始体验WSL环境

    ![](./wsl3.png)
1. 安装桌面环境：本文采用`xrdp`的方式来实现WSL中的桌面环境，由于`xrdp`包还不存在于openEuler官方仓库，笔者在[EUR](https://eur.openeuler.openatom.cn/coprs/mywaaagh_admin/xrdp/)中引入了最新的`0.9.22.1`版本：
    1. 首先获取`23.03`版本EUR仓库配置，其他版本可以到[这里](https://eur.openeuler.openatom.cn/coprs/mywaaagh_admin/xrdp/)获取
        ```
        $ sudo curl -o /etc/yum.repos.d/xrdp.repo -L https://eur.openeuler.openatom.cn/coprs/mywaaagh_admin/xrdp/repo/openeuler-23.03/mywaaagh_admin-xrdp-openeuler-23.03.repo

        We trust you have received the usual lecture from the local System
        Administrator. It usually boils down to these three things:

            #1) Respect the privacy of others.
            #2) Think before you type.
            #3) With great power comes great responsibility.

        [sudo] password for lcr:
        % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                        Dload  Upload   Total   Spent    Left  Speed
        100   379  100   379    0     0   1237      0 --:--:-- --:--:-- --:--:--  1238
        ```
    1. 接着，安装`xrdp`和`gnome`相关的软件包
        ```
        $ sudo dnf in xrdp gnome-terminal gdm neofetch
        ...
        Total                                                                                   1.2 MB/s | 358 MB     05:05
        Copr repo for xrdp owned by mywaaagh_admin                                              7.0 kB/s | 1.0 kB     00:00
        Importing GPG key 0xA893D75B:
        Userid     : "mywaaagh_admin_xrdp (None) <mywaaagh_admin#xrdp@copr.osinfra.cn>"
        Fingerprint: 945E 21A6 D982 49A7 A61A E62A 026A 219C A893 D75B
        From       : https://eur.openeuler.openatom.cn/results/mywaaagh_admin/xrdp/pubkey.gpg
        Is this ok [y/N]: y
        ...

        Complete!
        ```

    1. 随后，启动`xrdp`和`gdm`服务
        ```bash
        sudo systemctl start xrdp
        sudo systemctl restart gdm
        ```

1. 最后，通过windows的`mstsc.exe`命令即可访问刚刚启动的`xrdp`服务，`WSL`的IP可以通过`ip a`命令获取
    ```
    $ ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
        inet6 ::1/128 scope host
        valid_lft forever preferred_lft forever
    2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
        link/ether 00:15:5d:1a:3f:30 brd ff:ff:ff:ff:ff:ff
        inet 172.29.191.92/20 brd 172.29.191.255 scope global eth0
        valid_lft forever preferred_lft forever
        inet6 fe80::215:5dff:fe1a:3f30/64 scope link
        valid_lft forever preferred_lft forever
    (base) [lcr@lcrpc cascadia-code-nerd-fonts-mono]$
    ```
    ![](wsl4.png)

    ![](wsl6.png)
1. 在远程桌面连接后，选择`Xvnc`，在填入`WSL`首次启动是创建的用户名和密码，即可进入openEuler的`gnome`桌面

    ![](./wsl5.png)

    ![](./wsl7.png)
## 注意事项
- 由于多个WSL实例是共享网络的，因此在其中一个实例开启xrdp后，再另外一个WSL中启动服务会失败，此时可以通过修改`/etc/xrdp/xrdp.ini`和`/etc/xrdp/sesman.ini`中的监听端口实现开启多个实例的远程桌面
- 有时连接远程桌面成功后会出现窗口闪退，可能是系统中残留了一些X-session，这种情况可以尝试重启`gdm`服务
    ```
    sudo systemctl restart gdm
    ```
- 截图的`gnome-termial`中使用的字体是自己打包的`cascadia-code-nerd-fonts-mono`，也托管在EUR的[xrdp仓库中](https://eur.openeuler.openatom.cn/coprs/mywaaagh_admin/xrdp/)上，可以通过`dnf in cascadia-code-nerd-fonts-mono`来进行安装
- 理论上`xrdp`通过`/etc/xrdp/startwm.sh`能够启动任意的桌面环境，在`$HOME/.xsession`中可以添加任意桌面会话的进程，例如要启动`i3`，只需要`echo i3 > $HOME/.xsession && chmod +x ~/.xsession`即可，在xrdp连接时，就会启动一个i3的会话
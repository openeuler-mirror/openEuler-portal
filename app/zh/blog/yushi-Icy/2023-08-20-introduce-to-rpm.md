---
title: 软件包引入前置基础知识（RPM/SPEC/DNF）
date: '2023-08-21'
category: blog
tags:
  - rpm
  - spec
  - dnf
  - 软件包引入
sig: QA
archives: '2023-08'
author:
  - yushi
summary: 在openEuler社区内引入软件包采用RPM方式，简要列举了一些相关的知识文档和并总结了要点。
---
## RPM软件包
**学习文档来源：RPM软件包简介**https://bbs.huaweicloud.com/forum/thread-126361-1-1.html

RPM源码软件包装至系统的过程可以分为编译和安装两部分：
- 获取软件包源码(**大部分**是tar.gz等形式的压缩包)并编写SPEC文件
- 编译，若缺少依赖需提前安装，编译成功后打包完成的文件放在/root/rpmbuild/RPMS/目录中，此时获得了.rpm
- rpm -ivh安装RPM软件包，安装的过程可以理解为是把编译得到的rpm解开，放至对应的软件目录过程

RPM软件包主要有二进制包和源代码包，两者的区别总结如下：
- 二进制包可直接安装使用，后缀名为.rpm，安装后可直接使用，不用编译
- 源代码包不可直接安装，后缀名为src.rpm，包含源码、SPEC文件等，编译后可安装

RPM包编译的四个阶段（`rpmbuild -ba`拆解）：
- prep阶段：`rpmbuild -bp`
- build阶段：`rpmbuild -bc`
- install阶段：`rpmbuild -bi`
- file阶段：`rpmbuild -bb`

学习文档中关于**rpmbuild的使用**的几处个人补充:
- rpm-build是一个软件包，因此需要使用`dnf install rpm-build`先安装，rpmbuild是该软件包下的一条指令，安装该软件包后即可使用
- 在使用`rpmdev`命令建立工作目录之前需要先执行`dnf install rpmdevtools`，否则无法识别`rpmdev`命令
- 建立工作目录这一步骤可缺省，在`rpmbuild`的时候，这些目录会自动生成

## SPEC文件
**学习文档来源：**

**1、SPEC文件介绍** https://bbs.huaweicloud.com/forum/thread-126363-1-1.html

**2、SPEC文件编写** https://gitee.com/cherry530/doc/blob/master/SPEC%E6%96%87%E4%BB%B6%E7%BC%96%E5%86%99.md

SPEC文件由文件头和rpmbuild对应的阶段配置组成，以下是一个简易的SPEC模板。
```
# 文件头
Name: %{name}  
Version: %{version}  # 软件版本号，跟随软件包的上游社区版本
Release: 1  # 软件包释出号，对软件包做小补丁的时候+1
Summary: xxxx  # 软件包的总结
License: GPLv2+  # 协议
URL: www.foo.org  # 软件的主页
Source0: www.xxx%{name}-%{version}.tar.gz  # 软件包源码对应地址，大部分是.tar.gz等类型的压缩包
BuildArch：noarch  # 打包的文件不依赖任何架构（e.g.,  shell脚本，数据文件），支持相关架构则不写，会自动探测获取

Patch0：

BuildRequires:    # 编译软件包所需的依赖包列表
Requires:    # 安装软件包时所需的依赖包列表,rpmbuild 会⾃动探测依赖，可不写

%description

# 预处理阶段：打包准备，解压源码包等，把源码包从SOURCE目录拷贝至BUILD目录
%prep
%setup -q  # 解压
%autosetup  # 解压后打补丁（二选一即可）

# 编译阶段：c语言相关的用make, make install等，python相关的用pybuild等
%build
%configure
make %{?_smp_mflags}

# 安装阶段：读取位于%{build}构建⽬录下的文件并将其安装⾄%{buildroot}⽬录
%install
rm -rf %{buildroot}
make install DESTDIR=%{buildroot}

%clean
rm -rf %{buildroot}

# 定义文件阶段：说明会将%{buildroot}⽬录下的哪些文件和⽬录最终打包到rpm包⾥，不能写绝对路径，⽤宏或变量表⽰相对路径（打包的具体内容需要自己指定）
%files
%defattr(-,root,root,-)   # %defattr(<文件权限>, <用户>, <用户组>, <目录权限>)，设置所有文件权限，文件夹755，文件644
%attr(0644, root, root) FOO.BAR   # %attr(mode, user, group)用于对文件进行更精细的权限控制
%doc

# 修改日志阶段
%changelog
```
Fedora 16 `eject`程序的spec文件：
```
Summary:            A program that ejects removable media using software control
Name:               eject
Version:            2.1.5
Release:            21%{?dist}
License:            GPLv2+
Group:              System Environment/Base
Source:             %{name}-%{version}.tar.gz  # 源文件，%{name}等是预置的宏，引用name字段内容，在升级软件包等操作时比直接写死更方便
Patch1:             eject-2.1.1-verbose.patch
Patch2:             eject-timeout.patch
Patch3:             eject-2.1.5-opendevice.patch
Patch4:             eject-2.1.5-spaces.patch
Patch5:             eject-2.1.5-lock.patch
Patch6:             eject-2.1.5-umount.patch
URL:                http://www.pobox.com/~tranter
ExcludeArch:        s390 s390x   # 在哪些架构上不编译
BuildRequires:      gettext   # 编译依赖
BuildRequires:      libtool

%description
The eject program allows the user to eject removable media (typically
CD-ROMs, floppy disks or Iomega Jaz or Zip disks) using software
control. Eject can also control some multi-disk CD changers and even
some devices' auto-eject features.

Install eject if you'd like to eject removable media using software
control.

%prep
%autosetup -n %{name}  # 拷贝文件的同时默认把补丁打上，不用再指定

%build
%configure
make %{?_smp_mflags}

%install
%make_install

install -m 755 -d %{buildroot}/%{_sbindir}   
ln -s ../bin/eject %{buildroot}/%{_sbindir}

%find_lang %{name}

%files -f %{name}.lang   # 打包所有二进制文件
%doc README TODO COPYING ChangeLog   # 把build目录下的这些doc文件拷贝至buildroot下，再进行打包，压缩至rpm包
%{_bindir}/*   # 预置的宏，将/usr/dir下的所有二进制文件打包
%{_sbindir}/*  
%{_mandir}/man1/*

%changelog
* Tue Feb 08 2011 Fedora Release Engineering <rel-eng@lists.fedoraproject.org> - 2.1.5-21
- Rebuilt for https://fedoraproject.org/wiki/Fedora_15_Mass_Rebuild

* Fri Jul 02 2010 Kamil Dudka <kdudka@redhat.com> 2.1.5-20
- handle multi-partition devices with spaces in mount points properly (#608502)
```
查看预置宏定义的方法：
```
rpm -E "宏"
例如：
[root@localhost rpmbuild]# rpm -E "{_bindir}"
/usr/bin
```

在spec中展开宏的方法：`rpmspec -P xx/xx.spec`（rpm-build的指令，须在rpmbuild目录下执行）

## DNF
**DNF详细操作可见学习文档：使用DNF管理软件包**https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/Administration/%E4%BD%BF%E7%94%A8DNF%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%E5%8C%85.html

基于YUM优化的RPM软件包管理器，能从指定的YUM源服务器下载、安装和更新RPM包，可以自动处理依赖性关系。有个形象的比喻可以区分RPM安装和DNF安装：  
>如果你要吃回锅肉，只买肉回来肯定不行，你还得有油盐酱醋锅碗瓢盆等，传统的RPM安装方式就相当于你去超市一样一样的买全，而DNF/YUM则会在你买肉的同时把你所依赖的其他东西一次打包完成。    
<!-- TOC -->

但管理软件包的大前提是，必须配置软件仓库repository，或叫YUM源。基于YUM，因此配置DNF软件仓库的方式有两种：
- 直接配置/etc/dnf/dnf.conf文件中的repository部分，主要配置内容有name(仓库名字不可重复，否则会冲突), baseurl，enabled(=1,启用该软件源仓库)
    ```
    [repository]
    name=openEuler
    baseurl=https://repo.openeuler.org/openEuler-21.03/OS/aarch64/
    enabled=1
    ```
- 在/etc/yum.repos.d目录下增加.repo文件

    ```
    # vi /etc/yum.repos.d/openEuler.repo
    ```

    ```
    [OS]
    name=openEuler-$releasever - OS
    baseurl=https://repo.openeuler.org/openEuler-21.03/OS/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=https://repo.openeuler.org/openEuler-21.03/OS/$basearch/RPM-GPG-KEY-openEuler
    ```  # 验证签名用的公钥
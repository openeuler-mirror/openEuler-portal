---
title: 'Basics About Software Package Introduction (RPM/SPEC/DNF)'
date: '2023-08-21'
category: blog
tags:
  - rpm
  - spec
  - dnf
  - software package introduction
sig: QA
archives: '2023-08'
author:
  - yushi
summary: In the openEuler community, software packages are introduced in RPM mode. This blog briefly lists some related knowledge documents and summarizes the key points.
---
## RPM Software Packages
**Source of the learning document *RPM Software Package Introduction***: [https://bbs.huaweicloud.com/forum/thread-126361-1-1.html](https://bbs.huaweicloud.com/forum/thread-126361-1-1.html)

The process of loading an RPM source package to a system involves both build and installation.  

- Obtain the source code of the software package (**mostly** in .tar.gz format) and write a SPEC file.  

- Build the package. If a dependency is missing, install it in advance. After the build is successful, store the packaged file in the **/root/rpmbuild/RPMS/** directory to obtain the RPM software package (.rpm file).  

- Run the **rpm -ivh** command to install the RPM software package. The installation process is to decompress the built .rpm file and save it to the corresponding software directory.

RPM software packages are classified into binary packages and source packages, and their differences can be summarized as follows:  

- A binary package, whose name extension is .rpm, can be directly installed. After the installation is complete, it can be directly used without build.  

- A source package, whose name extension is .src.rpm, cannot be directly installed. It contains the source code and SPEC file and can be installed after build.

Four phases of RPM package build (`rpmbuild -ba`):
- **prep** phase: `rpmbuild -bp`
- **build** phase: `rpmbuild -bc`
- **install** phase: `rpmbuild -bi`
- **file** phase: `rpmbuild -bb`

Personal supplements to the **use of rpmbuild**:
- **rpm-build** is a software package, and you can run the `dnf install rpm-build` command to install it. **rpmbuild** is an instruction in the package and can be directly used after the package is installed.

- Before running the `rpmdev` command to create a work directory, run the `dnf install rpmdevtools` command first. Otherwise, the `rpmdev` command cannot be identified.

- You can skip the default step for creating work directories, because required directories are automatically generated during `rpmbuild`.

## SPEC File

**Sources of learning documents:**

**1. SPEC file introduction**: [https://bbs.huaweicloud.com/forum/thread-126363-1-1.html](https://bbs.huaweicloud.com/forum/thread-126363-1-1.html)

**2. SPEC file writing**: [https://gitee.com/cherry530/doc/blob/master/SPEC%E6%96%87%E4%BB%B6%E7%BC%96%E5%86%99.md](https://gitee.com/cherry530/doc/blob/master/SPEC%E6%96%87%E4%BB%B6%E7%BC%96%E5%86%99.md)

A SPEC file consists of a file header and the phase settings of **rpmbuild**. The following is a simple SPEC template.

```
# File header
Name: %{name}  
Version: %{version}  # Software version, which is the same as the upstream community version
Release: 1 # Release number of the software package. The number is incremented by 1 when a small patch is installed on the software package.
Summary: xxxx # Summary of the software package
License: GPLv2+  # Protocol
URL: www.foo.org  # Home page of the software
Source0: www.xxx%{name}-%{version}.tar.gz  # Address of the software package's source code. Most of the packages are the .tar.gz packages.
BuildArch:noarch  # The packaged files do not depend on any architecture (such as the shell script and data file). If there is support for specific architectures, they will not be written and will be automatically detected and obtained.

Patch0:

BuildRequires:    # List of dependency packages required for building the software package
Requires:    # List of dependency packages required for installing the software package. rpmbuild automatically detects dependencies, so they do not need to be written.

%description

# Preprocessing phase: Prepare for packaging, decompress the source package, and copy the source package from the SOURCE directory to the BUILD directory.
%prep
%setup -q  # Decompression
%autosetup  # Install a patch after decompression. (Select one out of two options.)

# Build phase: Use make and make install for C language-related operations, and use pybuild for Python-related operations.
%build
%configure
make %{?_smp_mflags}

# Installation phase: Read files in the %{build} directory and install them in the %{buildroot} directory.
%install
rm -rf %{buildroot}
make install DESTDIR=%{buildroot}

%clean
rm -rf %{buildroot}

# File definition phase: Describe the files and directories in the %{buildroot} directory to be packaged into the RPM package. Do not enter absolute paths, instead use macros or variables to represent relative paths. (The packaging content needs to be specified.)
%files
%defattr(-,root,root,-)   # %defattr (<file permission>, <user>, <user group>, <directory permission>) is used to set permissions for all files (644) and folders (755).
%attr(0644, root, root) FOO.BAR   # %attr(mode, user, group) is used to implement fine-grained permission control on files.
%doc

# Log modification phase
%changelog
```
SPEC file of the Fedora 16 `eject` program:
```
Summary:            A program that ejects removable media using software control
Name:               eject
Version:            2.1.5
Release:            21%{?dist}
License:            GPLv2+
Group:              System Environment/Base
Source:             %{name}-%{version}.tar.gz  # Source file. %{name} and %{version} are preset macros that reference the content of the name and version fields. Using this method is more convenient than setting a fixed name and version during software package upgrade.
Patch1:             eject-2.1.1-verbose.patch
Patch2:             eject-timeout.patch
Patch3:             eject-2.1.5-opendevice.patch
Patch4:             eject-2.1.5-spaces.patch
Patch5:             eject-2.1.5-lock.patch
Patch6:             eject-2.1.5-umount.patch
URL:                http://www.pobox.com/~tranter
ExcludeArch:        s390 s390x   # Architectures on which build is not performed
BuildRequires:      gettext   # Dependency build
BuildRequires:      libtool

%description
The eject program allows the user to eject removable media (typically
CD-ROMs, floppy disks or Iomega Jaz or Zip disks) using software
control. Eject can also control some multi-disk CD changers and even
some devices' auto-eject features.

Install eject if you'd like to eject removable media using software
control.

%prep
%autosetup -n %{name}  # Patches are installed by default during file copying.

%build
%configure
make %{?_smp_mflags}

%install
%make_install

install -m 755 -d %{buildroot}/%{_sbindir}   
ln -s ../bin/eject %{buildroot}/%{_sbindir}

%find_lang %{name}

%files -f %{name}.lang   # Package all binary files.
%doc README TODO COPYING ChangeLog   # Copy the .doc files in the build directory to the buildroot directory, and then package and compress them into an RPM package.
%{_bindir}/*   # Preset macro, which packages all binary files in /usr/dir.
%{_sbindir}/*  
%{_mandir}/man1/*

%changelog
* Tue Feb 08 2011 Fedora Release Engineering <rel-eng@lists.fedoraproject.org> - 2.1.5-21
- Rebuilt for https://fedoraproject.org/wiki/Fedora_15_Mass_Rebuild

* Fri Jul 02 2010 Kamil Dudka <kdudka@redhat.com> 2.1.5-20
- handle multi-partition devices with spaces in mount points properly (#608502)
```
To view the definition of a preset macro, run the following command:
```
rpm -E "macro"
Example:
[root@localhost rpmbuild]# rpm -E "{_bindir}"
/usr/bin
```

To expand a macro in **spec**, run the `rpmspec -P xx/xx.spec` command. (The **rpm-build** instruction must be executed in the **rpmbuild** directory.)

## DNF
For details about how to use DNF, see the DNF software package management document at [https://docs.openeuler.org/en/](https://docs.openeuler.org/en/).

The YUM-optimized RPM package manager can download, install, and update RPM packages from a specified YUM source server and automatically process dependencies.   
>    
<!-- TOC -->

The prerequisite for managing software packages is that a software repository, or YUM source, must be configured. Based on YUM, you can configure the DNF software repository in either of the following ways:
- Configure the **repository** part in the **/etc/dnf/dnf.conf** file. The main configurations include the repository name (must be unique to avoid conflicts), baseurl, and enabled (=1 to enable the software repository).

    ```
    [repository]
    name=openEuler
    baseurl=https://repo.openeuler.org/openEuler-21.03/OS/aarch64/
    enabled=1
    ```
- Add the **.repo** file to the **/etc/yum.repos.d** directory.

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
    ```  #  Public key used to verify the signature.

---
title: 开源贡献
category: wiki
---

# 开源贡献

openEuler 社区是按照不同的 SIG 来组织、管理社区工作。开发者们通过 Issue、邮件列表、SIG 例会、技术交流群等形式来沟通协作，以便社区更好地运转。参与社区贡献的方式有很多种，并不局限于编码。但每一种贡献都将受到社区的欢迎和重视。
在参与社区贡献前，您需要根据自身的参与身份（个人、员工、企业），提前签署 [openEuler 社区贡献者许可协议（CLA）](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)。

**我能做点什么**

## 1. 提交 Issue 或 PR

通过 Issue /PR 参与自己感兴趣的项目，是比较常见的参与社区贡献方式之一。您可以通过 [QuickIssue](https://quickissue.openeuler.org/) 快速查找并提交 Issue。常见的 Issue/PR 场景有：

a) 报告或修复 bug

b) 提交建议

c) 记录一个待完成任务

d) 指出并修复文档缺失/安装问题

e) 答疑交流

## 2. 软件包贡献

### 2.1 新增软件包

执行以下步骤，可以在 gitee 新增软件包的同时在 obs 建立同名仓库！

#### 2.1.1 操作步骤

通过修改 gitee 中的 openeuler/community 仓库实现新增软件包的具体操作步骤如下：

1. 点击进入 [community](https://gitee.com/openeuler/community) 仓库，将其 fork 到自己的仓库。
2. 将 fork 完成的 community 仓库 clone 到本地。

   ```shell
    git clone https://gitee.com/"$username"/community.git
   ```

   修改 community 仓库。以在 gitee 新增 zip 软件包，并且同步在 openEuler:Factory 工程项目下添加该包为例。

   - cd community/sig
   - 明确软件包所属的 sig 组，如 zip 属于 Base-service 组（请参考贡献者指南中的找到您感兴趣的 SIG 或项目）；
   - 修改所属 sig 文件夹下的内容，如项目清单等；
   - 修改所属 sig 文件夹下的 sig-info.yaml，将要新增的软件包以"- src-openeuler/zip"的形式添加到对应的 sig 组列表下；以 zip 为例，修改 sig/Base-service/sig-info.yaml：

   ```yaml
   repositories:
     - repo:
         - openeuler/openEuler-rpm-config
         - src-openeuler/abseil-cpp
         - src-openeuler/acl
         - src-openeuler/acpica-tools
         - src-openeuler/adcli
         - src-openeuler/aide
         - src-openeuler/airline
         - ...
         - src-openeuler/jansson
         - src-openeuler/apr
         - src-openeuler/python-lxml
         - src-openeuler/zip
   ```

   - 建仓：在 sig/{sig 目录}/src-openeuler/软件名首字母 新增下对应的 yaml 文件(openeuler 社区维护项目: openeuler 目录；其他社区引入包: src-openeuler 目录。示例参考：sig/Base-service/src-openeuler/z/ zip.yaml)

   ```yaml
   name: pkgname
   description: about pkgname
   upstream: https://somepkg.org/
   branches:- name: master
   type: protected
   type: public
   ```

   - 提交 PR（请参考 PR 提交指南，PR 合入后将会在 gitee 建立同名仓库。查看地 址：src-openeuler。同时在 obs 上建立同名仓库，可在 obs 网站查看： [https://build.openeuler.org/project/show/openEuler:Factory](https://build.openeuler.org/project/show/openEuler:Factory)

#### 2.1.2 修改 obs 拉取代码方式

obs 使用源服务获取源码([源服务](https://gitee.com/openbuildservice.org/help/manuals/obs-user-guide/cha.obs.source_service.html))，要使用源服务，需要\_service 文件。新增软件包时，openEuler 自动使用了 tar_scm_kernel_repo 插件拉取代码。可通过修改 src-openeuler/obs_meta 仓库下对应软件包的\_service 文件实现自定义更改，具体步骤如下：

1. 点击进入 obs_meta 仓库，将其 fork 到自己的仓库。
2. 将 fork 完成的 obs_meta 仓库 clone 到本地。

```shell
git clone https://gitee.com/"$username"/obs_meta.git
```

3. 修改 obs_meta 仓库。
   - cd obs_meta/master/openEuler:Factory/
   - vim "package_name"/\_service 根据自己的需求修改 \_service 文件。(package_name 是需要自定义\_service 文件的软件包名称)
   - 提交 PR，PR 合入后将会把修改后的\_service 文件同步到该仓库。

### 2.2 构建软件包

#### 2.2.1 rpm-build 本地构建

通过 rpm-build 本地构建软件包的基本过程如下：

1. 从 openEuler 社区下载源码。
2. 使用 rpm-build 进行本地构建。
3. 获取并安装已构建的软件包。

rpm-build 本地构建软件包的具体操作步骤如下：

1. 配置 repo 源，具体请参考[开发环境](https://gitee.com/openeuler/community/blob/master/zh/contributors/prepare-environment.md)准备中的配置 repo 源内容。
2. 使用 rpm-build 进行本地构建。

（1）查找需要操作的源码。以 openssl 为例，请根据实际修改。

```shell
$ dnf list | grep openssl
```

查看打印信息中是否有包含 openssl 软件名的.src 的文件，若有则继续下面的操作，若无则在社区上留言。

（2）下载源码文件。

```shell
$ yumdownloader --source openssl
```

（3）安装 openssl 软件包。

```shell
$ rpm -ivh openssl-1.1.1d-5.src.rpm
```

命令执行完成后，会在 $HOME 目录下生成 rpmbuild 目录。rpmbuild 目录下有如下目录：

- SOURCES：源代码目录，保存源码包（如 .tar 包）和所有 patch 补丁。
- SPECS：Spec 文件目录，保存 RPM 包配置（.spec）文件。

（4）切换目录到$HOME/rpmbuild/SPECS，然后执行 rpmbuild 命令构建软件包。注意 rpmbuild 并不需要 root 权限执行。我们强烈建议使用普通用户执行这一命令。

```bash
$ cd ~/rpmbuild/SPECS$ rpmbuild -ba openssl.spec
```

命令执行后，可能会有一些报错信息，且构建不同的软件包报错信息不同。请根据具体的报错信息进行解决。

- 缺少依赖包报错信息。

  命令执行后，若有缺少依赖的软件包报错信息，则根据提示安装依赖软件包。 如下所示：

  ```shell
  error: Failed build dependencies:
  lksctp-tools-devel is needed by openssl-1:1.1.1d-5.aarch64
  ```

  ```shell
  $ sudo dnf install lksctp-tools-devel -y
  ```

- 自检失败报错信息。

  有些软件包，如 coreutils，augeas，diffutils，在 rpmbuild 命令执行后，有提示“FAIL test-localeconv (exit status: 134)”报错信息。该报错信息是由于 Aarch64 和 x86_64 在 char 类型上定义不一致导致的，请在 Makefile 文件中增加--fsigned-char 编译选项以解决。

### 2.3 社区组件打包与EUR使用

您也可以参与社区组件打包工作，请参考[openEuler 打包指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md) 。
如果您在使用 openEuler 时发现缺少某些软件包或已有包不满足您的需要时，还可以通过 [openEuler 用户软件仓系统(EUR)](https://eur.openeuler.openatom.cn/) 来帮助完善。参考：[EUR 的介绍](https://www.openeuler.org/zh/blog/waaagh/openEuler-user-repo-intro.html) 和 [使用指南](https://www.openeuler.org/zh/blog/waaagh/openEuler-user-repo-howto.html) 。

您也可以参与社区组件打包，请参考[如何打包](https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md)。

## 3. 内容创作与优化

a) 参与[文档捉虫](https://docs-bug.openeuler.sh/)，优化 openEuler 社区技术文档，

b) 通过[博客](https://www.openeuler.org/zh/interaction/blog-list/)创作或[社区论坛](https://forum.openeuler.org/)，分享您在社区的技术方案与成果，

c) 文章投稿宣传、技术直播分享、[技术课程](https://www.openeuler.org/zh/community/program/technical-tutorial/)投稿可联系小助手（微信号：openeuler123），

d) 参与[用户案例](https://www.openeuler.org/zh/showcase/)的编写，展示用户在自身业务场景中使用 openEuler 操作系统或 openEuler 社区中的各技术项目，及其所带来的积极效果。

## 4. 社区交流

通过[邮件列表](https://www.openeuler.org/zh/community/mailing-list/)，[社区论坛](https://forum.openeuler.org/)、社区交流群等方式，帮助引导社区新人参与社区贡献，回答社区上的疑问等；

## 5. 开源布道

参与社区线上线下活动，阐述对 openEuler 操作系统的架构理念、实践经验，分享前沿技术信息与简洁，您的每一次分享都将为 openEuler 社区注入新的生机和活力，共同促进更繁荣、更活跃的开源生态建设。

## 6. 组织SIG会议

运维社区通信工具，包括协助 sig-Maintainer 完善 [SIG 主页](https://www.openeuler.org/zh/sig/sig-list/)信息、组织[社区例会](https://www.openeuler.org/zh/sig/meeting-guide/)等；

## 7. 社区活动

协助组织[社区技术活动](https://www.openeuler.org/zh/interaction/event-list/collect/)，包括 Meetups、直播、社区开发者大会等

## 8. 其他

参与社区基础设施建设，请加入 [sig-infrastructure](https://gitee.com/openeuler/infrastructure)

参与社区视觉设计，请加入 [sig-OpenDesign](https://gitee.com/openeuler/opendesign)

参与社区文档写作，请加入 [sig-doc](https://gitee.com/openeuler/docs)

参与社区翻译服务，请加入 [sig-G11N](https://gitee.com/openeuler/G11N)

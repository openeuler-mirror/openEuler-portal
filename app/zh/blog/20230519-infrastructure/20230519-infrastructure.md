---
title: 开源之夏 2023 | 欢迎报名openEuler sig-infrastructure开发任务
category: blog
date: 2023-05-15
tags:
  - infrastructure
archives: 2023-05
author:
  - openEuler
summary: sig-infrastructure开发任务正式发布，欢迎报名申请
---

<img src="./media/image1.png" width="1000" >



开源之夏是中国科学院软件研究所联合openEuler发起的开源软件供应链点亮计划系列暑期活动，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展。活动联合各大开源社区，针对重要开源软件的开发与维护提供项目，并向全球高校学生开放报名。

openEuler社区目前已上线94个项目！欢迎各大学子按照自己感兴趣或擅长的方向进行申请，扫码可查看全部项目。


<img src="./media/image2.png" width="200" >

今天给大家带来sig-infrastructure的任务介绍，sig-infrastructure
本次发布了9个项目，涉及**操作系统，开发工具，AI**等领域。欢迎大家参与到感兴趣的项目中，我们将为大家提供丰富的学习资源和技术指导
。

# 项目1：pyporter支持打包pyproject的项目

**项目描述：**

pyporter目前不支持打包以pyproject.toml格式打包的python项目

**产出标准：**

pyporter能够支持打包包含pyproject.toml的项目，并在EUR中完成500个软件包的自动打包

**技术要求：**

python, rpm打包

**项目导师：**

pkwarcraft@hotmail.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6Z2YK?from=project-issue

# 项目2：问答机器人NLP训练语料收集整理

**项目描述：**

目标：使用爬虫，人工智能等方式获取、整理openEuler业务相关的资料，扩充小智语料库。\
1、爬取openEuler官方gitee仓中的可作为有效问答的issue并已表格存储；\
2、爬取openEuler官方gitee仓中的md文档，并生成一段文档的导语；\
3、针对2中获取的文档，使用人工智能进行切片，将文章内容生成问答对，并以表格形式存储；\
4、为已有问答打标签，比如'操作系统'、'搬迁工具'等，借助人工智能模型进行分类。

**产出标准：**

代码仓中进行代码提交，完成上述项目表述中的功能，具体可在任务接受后和导师一起确定。

**技术要求：**

1、熟悉python/go/java等开发语言其一；

2、有一定的nlp基础

**项目导师：**

muyuying1@huawei.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YZS9?from=project-issue

# 项目3：优化EulerLauncher镜像管理相关功能

**项目描述：**

优化EulerLauncher镜像管理相关功能：

EulerLauncer是由openEuler社区技术运营团队及基础设施团队孵化的开发者工具集，通过对主流桌面操作系统中的虚拟化技术(LXD、HyperV、Virtualization
framework)等技术进行有机整合，使用openEuler社区官方发布的虚拟机、容器镜像，为开发者在Windows、MacOS、Linux上提供统一的开发资源(虚拟机、容器)发放和管理体验，提升主流桌面操作系统上openEuler开发环境使用的便利性和稳定性，有效提升开发者体验。

EulerLauncher支持镜像下载及镜像导入功能；

1、当前镜像导入功能仅支持导入\*.qcow2.xz格式的镜像，无法导入其他格式镜像，为EulerLauncher添加qcow2等其他主流镜像格式导入功能；

2、优化当前EulerLauncher镜像下载、导入相关流程及用户响应，提升用户体验；

3、增加虚拟机快照功能(为当前虚拟机打快照，产生一个当前状态的镜像)，导出Python/Go/Java等主流编程框架开发镜像

**产出标准：**

1、为EulerLauncher实现上述功能\
2、提供完善的编译、安装、使用指导

**技术要求：**

python语言基础

**项目导师：**

834864567@qq.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YUCL?from=project-issue

# 项目4：为EulerLauncher在Windows平台上添加Qemu后端支持

**项目描述：**

为openEuler跨平台统一开发环境管理工具EulerLauncher添加UI界面

EulerLauncer是由openEuler社区技术运营团队及基础设施团队孵化的开发者工具集，通过对主流桌面操作系统中的虚拟化技术(LXD、HyperV、Virtualization
framework)等技术进行有机整合，使用openEuler社区官方发布的虚拟机、容器镜像，为开发者在Windows、MacOS、Linux上提供统一的开发资源(虚拟机、容器)发放和管理体验，提升主流桌面操作系统上openEuler开发环境使用的便利性和稳定性，有效提升开发者体验。

EulerLauncher在Windows上当前仅支持Hyper-V后端，Hyper-V需要Professional版本支持，对普通版用户并不友好；QEMU是一套由法布里斯·贝拉(Fabrice
Bellard)所编写的以GPL许可证分发源码的模拟处理器软件，功能强大，可以提供跨平台的全虚拟化支持(https://www.qemu.org/download/#windows)；通过在Windows上添加EulerLauncher的QEMU后端支持，可以为非Professional用户提供便利的openEuler虚拟机发放能力。

**产出标准：**

1、实现EulerLauncher Windows平台上Qemu后端支持\
2、提供完善的编译、安装、使用指导

**技术要求：**

1、python语言基础\
2、了解QEMU基本使用

**项目导师：**

wengqz@qq.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YUAA?from=project-issue

# 项目5：在openEuler中引入ONNXRuntime+昇腾后端软件包

**项目描述：**

ONNXRuntime是微软开源的ONNX模型推理平台，是目前业界主流的通用AI推理平台，目前已官方支持昇腾硬件后端。本项目要求开发者在openEuler上完成ONNXRuntime+昇腾场景的编译构建和功能测试。保证ONNXRuntime在openEuler上原生可用，并制作对应的RPM软件包，引入openEuler
23.09创新版中。

**产出标准：**

1、在openEuler上完成ONNXRuntime+昇腾后端的编译和功能测试，发现的问题提交issue到onnxruntime社区并提交PR修复。

2、在openEuler中建立onnxruntime仓库，并引入onnxruntime最新版的rpm
spec，保证软件包构建成功，若发现相关软件包依赖问题，也需要一并刷新和修复。

**技术要求：**

1、熟练掌握C/C++编程语言

2、了解并熟悉AI训练、推理的相关概念和技术

3、加分项：掌握python编程语言、了解熟悉RPM软件包制作、有ONNXRuntime使用经验。

**项目导师：**

wangxiyuan1007@gmail.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YTQZ?from=project-issue

# 项目6：为EulerLauncher添加UI界面

**项目描述：**

为openEuler跨平台统一开发环境管理工具EulerLauncher添加UI界面

EulerLauncer是由openEuler社区技术运营团队及基础设施团队孵化的开发者工具集，通过对主流桌面操作系统中的虚拟化技术(LXD、HyperV、Virtualization
framework)等技术进行有机整合，使用openEuler社区官方发布的虚拟机、容器镜像，为开发者在Windows、MacOS、Linux上提供统一的开发资源(虚拟机、容器)发放和管理体验，提升主流桌面操作系统上openEuler开发环境使用的便利性和稳定性，有效提升开发者体验。

EulerLauncher当前使用CLI做为客户端，本题目要求为EulerLauncher开发可跨平台使用(Win、MacOS、Linux)的UI界面

**产出标准：**

1、实现美观、好用的EulerLauncher UI界面\
2、提供完善的编译、安装、使用指导

**技术要求：**

1、python语言基础\
2、UI设计及开发

**项目导师：**

409601498@qq.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YGL3?from=project-issue

# 项目7：为EulerLauncher在Hyper-V后端上支持虚拟机复杂操作

**项目描述：**

为EulerLauncher在Hyper-V后端上支持虚拟机复杂操作

EulerLauncer是由openEuler社区技术运营团队及基础设施团队孵化的开发者工具集，通过对主流桌面操作系统中的虚拟化技术(LXD、HyperV、Virtualization
framework)等技术进行有机整合，使用openEuler社区官方发布的虚拟机、容器镜像，为开发者在Windows、MacOS、Linux上提供统一的开发资源(虚拟机、容器)发放和管理体验，提升主流桌面操作系统上openEuler开发环境使用的便利性和稳定性，有效提升开发者体验。

EulerLauncher当前仅支持虚拟机增删改查的基本功能，本题目希望为EulerLauncher在Windows +
HyperV后端上提供包括虚拟机启动、停止、挂载新硬盘的功能；同时新增创建虚拟机规格(cpu/ram/disk等)的功能，用于控制创建虚拟机的规格。

**产出标准：**

1、实现EulerLauncher在Windows+HyperV后端上的上述功能\
2、提供完善的编译、安装、使用指导

**技术要求：**

python语言基础

**项目导师：**

746364661@qq.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YUEK?from=project-issue

# 项目8：为EulerLauncher开发VSCode插件以实现自动化开发

**项目描述：**

为EulerLauncher开发VSCode插件以实现自动化开发

EulerLauncer是由openEuler社区技术运营团队及基础设施团队孵化的开发者工具集，通过对主流桌面操作系统中的虚拟化技术(LXD、HyperV、Virtualization
framework)等技术进行有机整合，使用openEuler社区官方发布的虚拟机、容器镜像，为开发者在Windows、MacOS、Linux上提供统一的开发资源(虚拟机、容器)发放和管理体验，提升主流桌面操作系统上openEuler开发环境使用的便利性和稳定性，有效提升开发者体验。

VScode全称是Visual Studio
Code，是微软推出的一个跨平台的编辑器，能够在windows、Linux、IOS等平台上运行，通过安装一些插件可以让这个编辑器变成一个编译器。VSCode支持C++、Python、Java、C#、Go等多种语言，功能强大、插件丰富并且启动速度极快；通过为EulerLauncher添加VSCode插件支持，可以实现VSCode代码开发，EulerLauncher上代码测试的openEuler原生开发体验，极大方便openEuler开发者。

**产出标准：**

实现EulerLauncher的VSCode插件，实现代码自动同步，虚拟机自动拉起，按照配置脚本自动测试等功能\
提供完善的编译、安装、使用指导

**技术要求：**

python语言基础

**项目导师：**

826144794@qq.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YUGK?from=project-issue

# 项目9：GitHub 与其它 Git 服务双向同步

**项目描述：**

当前开源社区主要是使用 GitHub 进行开源协作，协作的模式主要是依靠 ForK/PR
模型，优秀的开发者体验和大量免费资源的投入，使得 GitHub
具备虹吸效应的能力，成为整个开源社区的枢纽。当然很多企业选择使用不同开源项目（包括
GitLab 、Gitee、Gitea 等），
在公司内部搭建独立的代码管理系统。当公司内部代码开源后，就出现了代码在公司内部和
GitHub 同时存在的问题，随着时间推移必然形成两个住分支而无力维护。

为了解决这个问题， 本项目需要实现 GitHub
和内部代码仓库之间的双向同步，不管是外部贡献者的代码 PR
，还是内部代码仓库的提交都可以及时同步到另一侧以两侧保持一致。内部代码部署方案不确定，外部
GitHub 服务相对确定，需要项目设计的时候要保持兼容，能够实现面对多种 Git
服务实现双向同步。

双向同步的内容仅限于代码、PR 和 Issue 三种类型数据，系统使用 Rust
编程语言开发，使用本地数据库缓存。

**产出标准：**

1、分析 GitHub 授权机制和 API 对于代码仓库、PR 和 Issue 的实现机制

2、设计兼容性的接口，能够对不同的目标系统实现双向同步

3、以 Vecel 服务为部署的目标系统，支持容器化部署

4、输出英文的设计文档

**技术要求：**

1、对 Rust 编程语言比较了解，有一定的 Rust 开发经验

2、英语熟练

**项目导师：**

chenzeng2@huawei.com

**项目主页：**

https://gitee.com/openeuler/open-source-summer/issues/I6YJ2N?from=project-issue

# 活动日程及参与方式

目前正处于学生注册、沟通导师、提交项目申请环节。

<img src="./media/image3.png" width="1000" >

各位学生如果对上述项目感兴趣，欢迎扫码加入交流群。

<img src="./media/image4.jpeg" width="200" >

若群已满可添加openEuler小助手微信"openeuler123"进入【开源之夏｜openEuler交流群】，请备注【开源之夏】噢～

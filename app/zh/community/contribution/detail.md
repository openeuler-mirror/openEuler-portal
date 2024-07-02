---
title: '贡献攻略'
---

<script lang="ts" setup>
import BannerLevel2 from '@/components/BannerLevel2.vue'
import ContributionTab from "@/views/contribution/ContributionTab.vue";

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/contribution.png';

</script>

<ClientOnly>
  <BannerLevel2
  title="贡献攻略"
  :illustration="illustration"
  :background-image="banner"
  background-text="COMMUNITY"
  />
</ClientOnly>
<ContributionTab />

<div class="markdown">

# 欢迎来到 OpenAtom openEuler

OpenAtom openEuler (简称 openEuler) 是由开放原子开源基金会孵化及运营的开源项目。

openEuler 是面向数字基础设施的操作系统开源项目，支持服务器、 云计算、边缘计算、嵌入式等应用场景，支持多样性计算，致力于提供安全、稳定、易用的操作系统。通过为应用提供确定性保障能力，支持 OT 领域应用及 OT 与 ICT 的融合。

openEuler 开源社区通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系，孵化支持多种处理器架构、覆盖数字设施全场景，推动企业数字基础设施软硬件、应用生态繁荣发展。

## 1. 体验 openEuler

### 1.1 体验 openEuler 操作系统

openEuler 社区版本分为长期支持版本（LTS）和创新版本[（生命周期管理规范）](https://www.openeuler.org/zh/other/lifecycle/)。您可以通过：[https://www.openeuler.org/zh/download/get-os/](https://www.openeuler.org/zh/download/get-os/) 获取并体验 openEuler 操作系统。

### 1.2 体验原创开源项目

您可以体验 openEuler 社区里的以下原创开源项目：

- [StratoVirt](https://www.openeuler.org/zh/other/projects/stratovirt/)：面向云数据中心的企业级虚拟化平台
- [Tune](https://www.openeuler.org/zh/other/projects/atune/)：一款基于 AI 开发的智能优化引擎
- [iSula](https://www.openeuler.org/zh/other/projects/isula/)：轻量级容器解决方案
- [secGear](https://www.openeuler.org/zh/other/projects/secgear/)：面向计算产业的机密计算安全应用开发套件
- [pkgship](https://pkgmanage.openeuler.org/)：管理 OS 软件包依赖关系，提供依赖和被依赖关系完整图谱的查询工具
- [BiSheng JDK](https://www.openeuler.org/zh/other/projects/bishengjdk/): OpenJDK 定制版 Huawei JDK 的开源版本，是一个高性能、可用于生产环境的 OpenJDK 发行版
- [Compass-CI ](https://compass-ci.openeuler.org/): 可持续集成的开源软件平台, 构建一个开放、完整的测试系统
- [View More](https://gitee.com/openeuler)

## 2. 签署 CLA

在参与社区贡献前，您需要根据自身的参与身份（个人、员工、企业），提前[签署 openEuler 社区贡献者许可协议（CLA）](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)。

- 个人 CLA：以个人身份参与社区，请签署个人 CLA
- 企业 CLA: 以企业身份参与社区，请签署企业 CLA
- 员工 CLA: 以企业员工的身份参与社区，请签署员工 CLA

参考资料：

[[1] openEuler CLA 指引](https://www.bilibili.com/video/BV12A411o7zY/?spm_id_from=333.337.search-card.all.click&vd_source=0aa547ea87e7a7505cf544eacc2236ac)

[[2] 企业签署 CLA ，正式加入 openEuler 社区的流程](https://www.openeuler.org/zh/blog/2022-11-25-cla/CLA%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B.html)

## 3. 找到您想参与的 SIG

在 openEuler 社区的[组织架构](https://www.openeuler.org/zh/community/organization/)中，SIG 组（Special Interest Group）是重要的组成部分。openEuler 社区按照不同的 SIG 来组织、管理社区工作，以便于社区更好地运转。SIG 组是开放的，任何人均可参与 SIG 的工作。关于 SIG 组的详细介绍请查看 [一文了解 openEuler SIG 组角色划分与管理运作](https://www.openeuler.org/zh/blog/2022-11-12-04/04.html)。

### 因此，参与社区事务正确的起始姿势是 —— 先找到您感兴趣的 SIG 或项目

- 随着社区的发展，openEuler 已有 100+ SIG 组，您可以查看  [openEuler SIG 列表](https://www.openeuler.org/zh/sig/sig-list/)  找到感兴趣的 SIG。
- 如果定位不到您感兴趣的 SIG，可以向 [community@openeuler.org](mailto:community@openeuler.org) 发求助邮件。建议在邮件列表内用“【开发过程疑问】”作为标题，在内容中写出您寻找的 SIG 或项目的特征，我们会为您提供帮助。
- 如果在已有的 [SIG 组列表](https://www.openeuler.org/zh/sig/sig-list/) 里面没有找到您感兴趣的 SIG，而您对某个方向有浓厚的兴趣，希望在 openEuler 社区成立一个新的相关 SIG 进行维护和发展，那您可以参考   [申请新 SIG 流程指南](https://www.openeuler.org/zh/sig/sig-guidance/)   来申请创建新的 SIG。

## 4. 参与社区贡献

在签署了[CLA 协议](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)、找到了你想参与的[ SIG ](https://www.openeuler.org/zh/sig/sig-list/)之后，就可以开始你的社区贡献之旅啦。当然，为维护社区的友好开发和协作环境，在参与社区贡献之前，请先阅读并遵守 [openEuler 社区的行为守则](https://gitee.com/openeuler/community/blob/master/code-of-conduct.md) 以及 [openEuler 社区开发行为规范](https://gitee.com/openeuler/community/blob/master/zh/technical-committee/governance/openEuler%E7%A4%BE%E5%8C%BA%E5%BC%80%E5%8F%91%E8%A1%8C%E4%B8%BA%E8%A7%84%E8%8C%83.md) 。

- [贡献原创开源项目](/zh/community/contribution/detail.html#_4-1-贡献原创开源项目)
- [代码类贡献](/zh/community/contribution/detail.html#_4-2-代码类贡献)
- [非代码类贡献](/zh/community/contribution/detail.html#_4-3-非代码类贡献)

### 4.1 贡献原创开源项目

如果你想将自己原创的开源项目融入到 openEuler 社区，成为 openEuler 发行版本中的一份子，您首先需要遵循

1. 项目代码必须开源开放，遵循相关的[开源协议](https://opensource.org/licenses/alphabetical)。

2. [通过邮件列表预约 TC（即 openEuler 技术委员会）例会](https://www.openeuler.org/zh/sig/sig-detail/?name=TC)，在会上申请将您的开源项目融入到社区中。

#### 4.1.1 经 TC 例会之后，您可以参考以下两种方式将您的作品融入到 openEuler 中：

方式一：在 openEuler 社区中开发，在 openEuler 中集成

直接在[openEuler 代码仓](https://gitee.com/openeuler)中建立原创项目，类似将项目“托管”到 openEuler 社区，比如现在社区中的 [iSulad](https://gitee.com/openeuler/iSulad) 和 [A-Tune](https://gitee.com/openeuler/A-Tune) 就是这样的模式。

如果您有了一个很棒的 idea 想要在 openEuler 社区里实现，那么可以依照下面的过程来深度参与到 openEuler 中。

1. 在 [TC 委员会的例会中](https://www.openeuler.org/zh/sig/sig-detail/?id=21&name=TC&mail=dev%40openeuler.org) 申请一个开源项目；

2. 如果 TC 委员会认为这是一个很好的 idea，并且认为值得去推进，那么我们会在[ https://gitee.com/openeuler ](https://gitee.com/openeuler)中建立一个 repo；

3. 这个项目在 openEuler 中持续开发和孵化，直到项目逐渐成熟，那么就可以在 src-openeuler 中建立一个仓，为该项目提供相关的 spec 文件，制作成为一个 rpm，跟随着 openEuler 的版本发布，为世界人民所使用。

4. 具体可参考：[openEuler 社区项目运作流程介绍（第 4 页）](https://gitee.com/openeuler/community/raw/master/zh/contributors/openEuler%20%E7%A4%BE%E5%8C%BA%E9%A1%B9%E7%9B%AE%E8%BF%90%E4%BD%9C%E6%B5%81%E7%A8%8B%E8%AF%B4%E6%98%8E.pdf)

方式二：在其它社区开发，集成到 openEuler 中

假定你已经在 github，gitlab 或者 gitee 上拥有了自己的项目，那么只需要按照以上提到的 [如何新增软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/create-package.md) 那样，将软件加入到 [src-openeuler](https://gitee.com/src-openeuler) 这个 repo 仓就可以了。

### 4.2 代码类贡献

openEuler 社区主要包括两个代码仓库：

1、代码仓：[https://gitee.com/openeuler](https://gitee.com/openeuler)

2、软件包仓：[https://gitee.com/src-openeuler](https://gitee.com/src-openeuler)

openEuler 主要用于存放源码类项目。

src-openeuler 主要用于存放制作发布件所需的软件包。

#### 4.2.1 提交 Issue / 处理 Issue

- 在社区，Issue 是用来记录和追踪开发者的想法、反馈、任务和缺陷。因此，通过 Issue 参与自己感兴趣的 SIG 或项目，是比较便捷的参与社区贡献方式之一。您可以通过 [QuickIssue](https://quickissue.openeuler.org/zh/issues/) 服务快速查找并提交 Issue。常见的 Issue 场景有：

  a）报告 bug

  b）提交建议

  c）记录一个待完成任务

  d）指出文档缺失/安装问题

  e）答疑交流

- 找到 Issue 列表：

  在 openEuler 的代码仓中，找到您感兴趣的 SIG 或项目主页，点击工具栏目的“Issues”，您可以找到其 Issue 列表（如[openEuler/community 的 Issue 列表](https://gitee.com/openeuler/community/issues))。

- 提交 Issue：

  如果您准备向社区上报 Bug 或者提交需求，为 openEuler 社区贡献自己的意见或建议，可以在 openEuler 社区对应的仓库上提交 Issue（请参考 [Issue 提交指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/issue-submit.md)。为了吸引更广泛的注意，您也可以把 Issue 的链接附在邮件内，通过 [邮件列表](https://www.openeuler.org/zh/community/mailing-list/) 发送给所有人。

- 参与 Issue 内的讨论：

  每个 Issue 下面可能有参与者们的交流和讨论，如果您感兴趣，可以在评论框中发表自己的意见。

- 找到愿意处理的 Issue：

  如果您愿意处理其中的一个 issue，可以将它分配给自己。只需要在评论框内输入 /assign 或 /assign @yourself，机器人就会将问题分配给您，您的名字将显示在负责人列表里。

- 相关链接：[QuickIssue 服务介绍](https://www.openeuler.org/zh/blog/georgecao/QuickIssue.html)

#### 4.2.2 贡献编码

- 搭建开发环境

  1.开发环境准备：如果您想参与编码贡献，需要准备 openEuler 的开发环境，请参考[开发环境准备](https://gitee.com/openeuler/community/blob/master/zh/contributors/prepare-environment.md)。

  2.下载和构建软件包：如果您想下载、修改、构建及验证 openEuler 提供的软件包，请参考[构建软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/package-install.md)。

- 了解 SIG 和项目内的开发注意事项

  每个 SIG 内的项目使用的编码语言、开发环境、编码约定等都可能存在差异的。如果您想了解并参与到编码类贡献，可以先找到该项目给开发者提供的贡献者指南——这个指南一般是在该 SIG 的首页地址内，以 CONTRIBUTING.md 文件的形式提供，或者在该项目的 README.md 内。

- 下载代码和拉分支

  如果要参与代码贡献，您还需要了解如何在 Gitee 下载代码，通过 PR（Pull Request） 合入代码等。openEuler 使用 Gitee 代码托管平台，想了解具体的指导，请参考 [Gitee Workflow Guide](https://gitee.com/openeuler/community/blob/master/zh/contributors/Gitee-workflow.md)。该托管平台的使用方法类似 GitHub，如果您以前使用过 GitHub，本节的内容您可以大致了解甚至跳过。

- 修改构建和本地验证

  在本地分支上完成修改后，进行构建和本地验证，请参考[构建软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/package-install.md)。

- 提交一个 PR（Pull Request）

  当您提交一个 PR 的时候，就意味您已经开始给社区贡献代码了。请参考  [openEuler 社区 PR 提交指导](https://gitee.com/openeuler/community/blob/master/zh/contributors/pull-request.md)。为了使您的提交更容易被接受，您需要：

  1.遵循 SIG 组的编码约定，如果有的话

  2.准备完善的提交信息

  3.如果一次提交的代码量较大，建议将大型的内容分解成一系列逻辑上较小的内容，分别进行提交会更便于检视者理解您的想法

  4.使用适当的 SIG 组和检视者（Committer）标签去标记 PR。当您完成 PR 的提交时，社区机器人会发送给您消息，以方便您更好的完成整个 PR 的过程。

注意：如果您的 PR 请求没有引起足够的关注，可以在 [SIG 的邮件列表](https://www.openeuler.org/zh/community/mailing-list/) 或 [dev@openeuler.org](mailto:dev@openeuler.org) 求助。

#### 4.2.3 贡献软件包 / 为社区组件打包

如果你发现 openEuler 缺失了一个软件包，可以帮 openEuler 把这个软件包补上。实际上贡献软件包的过程就是帮助 openEuler 提供更丰富功能的过程。

- openEuler 支持在 gitee 新增软件包的同时，自动在 obs 的 openEuler:Factory 上创建同名仓库。这样在向已创建的 gitee 仓库提交代码时，会自动对代码编译进行检测。具体流程可参考  [如何新增软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/create-package.md)。

- 您也可以参与社区组件打包工作，请参考 [openEuler 打包指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md) 。

- 当然，如果您在使用 openEuler 时发现缺少某些软件包或已有包不满足您的需要时，还可以通过 [openEuler 用户软件仓系统(EUR)](https://eur.openeuler.openatom.cn/) 来帮助完善。参考：[EUR 的介绍](https://www.openeuler.org/zh/blog/waaagh/openEuler-user-repo-intro.html) 和 [使用指南](https://www.openeuler.org/zh/blog/waaagh/openEuler-user-repo-howto.html) 。

#### 4.2.4 检视代码

openEuler 是一个开放的社区，我们希望所有参与社区的人都能成为活跃的检视者。可以参考 [社区成员](https://gitee.com/openeuler/community/blob/master/community-membership_cn.md)，该文档描述了不同贡献者的角色职责。

当成为 SIG 组的 Committer 或 Maintainer 角色时，便拥有审核代码的责任与权利。强烈建议本着 [行为准则](https://gitee.com/openeuler/community/blob/master/code-of-conduct.md)，超越自我，相互尊重和促进协作。在检视其他人的 PR 时，[《补丁审核的柔和艺术》](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/)一文中提出了一系列检视的重点，说明代码检视的活动能够帮助促进新的贡献者积极参与，而不会使贡献者一开始就被细微的错误淹没，所以检视的时候，可以重点关注包括：

1.贡献背后的想法是否合理

2.贡献的架构是否正确

3.贡献是否完善

#### 4.2.5 测试

测试——是所有贡献者的责任，对于社区版本来说，[sig-QA](https://gitee.com/openeuler/QA) 组是负责测试活动的社区官方组织。如果您希望在自己的基础架构上开展测试活动，可以参考：[社区测试体系介绍](https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E6%B5%8B%E8%AF%95%E4%BD%93%E7%B3%BB%E4%BB%8B%E7%BB%8D.md) 。

为了成功发行一个社区版本，openEuler 需要完成多种测试活动。不同的测试活动，测试代码的位置也有所不同，成功运行测试所需的环境细节也会有差异，有关的信息可以参考 [测试指南](https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E5%BC%80%E5%8F%91%E8%80%85%E6%B5%8B%E8%AF%95%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.md) 。

#### 4.2.6

- [安全处理流程](https://gitee.com/openeuler/security-committee/blob/master/%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.jpg) ——简要描述了处理安全问题的过程。
- [安全披露信息](https://gitee.com/openeuler/security-committee/blob/master/security-disclosure.md) ——如果您希望报告安全漏洞，请参考此页面。

### 4.3 非代码类贡献

如果您的兴趣不在编写代码方面，可以在 [非代码贡献指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/non-code-contributions.md) 中找到感兴趣的工作。本章节将介绍一些常见的非编码类社区工作，希望对大家有帮助。

#### 4.3.1 openEuler Call for X

“[openEuler Call for X 计划](https://www.openeuler.org/zh/community/program/)”是一个开放的社区项目，鼓励所有社区成员以及开源爱好者积极贡献、乐于分享、热衷实践。通过“[openEuler Call for X 计划](https://www.openeuler.org/zh/community/program/)”，您不仅可以参与组织感兴趣的社区活动（Meetups、技术研讨会、直播、大会等，点此了解 [活动申请](https://www.openeuler.org/zh/interaction/event-list/collect/) 要求），也可以分享技术教程、基础设施、场地等资源，共建繁荣开源生态。
联系：[events@openeuler.sh](mailto:events@openeuler.sh) 或 openEuler 小助手（微信号：openeuler123）

#### 4.3.2 城市用户组

openEuler 用户组（openEuler User Group），简称 oEUG，这是为方便 openEuler 各区域用户及开发者交流 openEuler 技术、应用经验，拓展 openEuler 用户生态而成立的地域性组织。您可以申请加入用户组，作为成员共同建设社区用户生态。更多介绍详情请查看 [openEuler 用户组](https://www.openeuler.org/zh/community/user-group/) 。

#### 4.3.3 社区其他工作

- 参与社区交流，通过[邮件列表](https://www.openeuler.org/zh/community/mailing-list/)，[社区论坛](https://forum.openeuler.org/)或添加小助手（微信号：openeuler123）加入社区交流群，帮助引导社区新人贡献社区，回答社区上的疑问等；

- 运维社区通信工具，包括协助 sig-Maintainer 完善 SIG 主页信息（[EasyEditor 服务](https://www.openeuler.org/zh/blog/20230506-EasyEditor/20230506-EasyEditor.html)）、组织社区例会等；

- 成为社区布道师，共同组织社区聚会，包括 Meetups、直播、社区开发者大会等；

- 参与社区宣传推广与内容制作，包括 [文档捉虫](https://docs.openeuler.org/zh/)、[博客写作](https://www.openeuler.org/zh/interaction/blog-list/)、[用户案例编写](https://www.openeuler.org/zh/showcase/) 、事件/技术/课程/视频投稿（联系小助手，微信号：openeuler123）等；

- 参与社区基础设施建设，请加入 [sig-infrastructure](https://www.openeuler.org/zh/sig/sig-detail/?name=Infrastructure)

- 参与社区视觉设计，请加入 [sig-OpenDesign](https://www.openeuler.org/zh/sig/sig-detail/?name=sig-OpenDesign)

- 参与社区翻译服务，请加入 [sig-G11N](https://www.openeuler.org/zh/sig/sig-detail/?name=G11N)

## 5. 和社区一起成长

openEuler 技术委员会

openEuler 技术委员会（Technical Committee，简称 TC）是 openEuler 社区的技术决策机构，负责社区技术决策和技术资源的协调。详情请查看  [openEuler 技术委员会介绍](https://www.openeuler.org/zh/sig/sig-detail/?id=21&name=TC&mail=dev%40openeuler.org)。

社区角色说明

社区不同角色对应不同的责任与权利，每种角色都是社区不可或缺的一部分，您可以通过积极贡献不断积累经验和影响力，并获得角色上的成长。更详细介绍与责任权利描述请查看  [社区角色说明](https://www.openeuler.org/zh/sig/role-description/)。

## 6. 相关阅读

- [openEuler 社区参与之旅](https://www.openeuler.org/zh/blog/myeuler/2020-5-13-openEuler-Travel.html)
- [参与 openEuler 社区不到 1 年，我成为了 Maintainer](https://www.openeuler.org/zh/news/20220810.html)

</div>

<style lang="scss" scoped>
  .care {
    color: var(--o-color-red5);
  }
</style>

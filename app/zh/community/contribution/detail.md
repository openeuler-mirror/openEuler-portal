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

### 欢迎来到 openEuler！

## 1. 体验 openEuler

### 1.1 体验 openEuler 操作系统

您可以通过以下四种方式体验 openEuler 操作系统：

- [公有云](https://huaweicloud.com/product/ecs.html)
- [虚拟机](https://www.openeuler.org/zh/docs/20.03_LTS/docs/Virtualization/virtualization.html)
- [硬件](https://www.openeuler.org/zh/docs/20.03_LTS/docs/Installation/installation.html)
- [树莓派](https://gitee.com/openeuler/raspberrypi)

### 1.2 体验原创开源项目

您可以体验 openEuler 社区里的以下原创开源项目：

- [StratoVirt](https://www.openeuler.org/zh/other/projects/stratovirt/)：面向云数据中心的企业级虚拟化平台
- [A-Tune](https://www.openeuler.org/zh/other/projects/atune/)：一款基于 AI 开发的智能优化引擎
- [iSula](https://www.openeuler.org/zh/other/projects/isula/)：轻量级容器解决方案
- [secGear](https://www.openeuler.org/zh/other/projects/secgear/)：面向计算产业的机密计算安全应用开发套件
- [pkgship](https://pkgmanage.openeuler.org/)：管理 OS 软件包依赖关系，提供依赖和被依赖关系完整图谱的查询工具
- [BiSheng JDK](https://www.openeuler.org/zh/other/projects/bishengjdk/): OpenJDK 定制版 Huawei JDK 的开源版本，是一个高性能、可用于生产环境的 OpenJDK 发行版
- [Compass-CI ](https://compass-ci.openeuler.org/): 可持续集成的开源软件平台, 构建一个开放、完整的测试系统

## 2. 签署 CLA

在参与社区贡献前，您需要签署 openEuler 社区贡献者许可协议（CLA）。   
查看：[openEuler CLA 签署](https://www.bilibili.com/video/BV12A411o7zY/?spm_id_from=333.337.search-card.all.click&vd_source=0aa547ea87e7a7505cf544eacc2236ac)。   
根据您的参与身份，选择签署个人 CLA、员工 CLA 或企业 CLA，请点击[这里](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)签署

- 个人 CLA：以个人身份参与社区，请签署个人 CLA
- 企业 CLA: 以企业身份参与社区，请签署企业 CLA
- 员工 CLA: 以企业员工的身份参与社区，请签署员工 CLA

## 3. 参与 openEuler 社区

### 3.1 参与社区活动

您可以了解并参与丰富多彩的社区活动：

- [Meeting](https://www.openeuler.org/zh/#meeting)：查看官网首页 SIG 公开例会日程安排，可参与你感兴趣的会议
- [Meetups](https://www.openeuler.org/zh/interaction/event-list/)
- [直播](https://www.openeuler.org/zh/interaction/live-list/)
- [峰会](https://www.openeuler.org/zh/interaction/summit-list/summit2021/)

### 3.2 找到您想参与的 SIG

#### 3.2.1 了解 SIG 并找到您感兴趣的 SIG

SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织，以便于更好的管理和改善工作流程。因此参与社区事务正确的起始姿势是先找到您感兴趣的 SIG， SIG 组均是开放的，欢迎任何人来参与。  
目前 openEuler 社区已有 70+ SIG 组，可查看 [openEuler SIG 列表](https://www.openeuler.org/zh/sig/sig-list/) 找到您感兴趣的 SIG。  
如果定位不到您感兴趣的 SIG，您可以向[community@openeuler.org](mailto:community@openeuler.org)发求助邮件。建议您在邮件列表内用“【开发过程疑问】”作为标题，在内容中写出你寻找的 SIG 或项目的特征，我们会为您提供帮助。

#### 3.2.2 成立新的 SIG

如果在已有的 SIG 组列表里面没有找到您感兴趣的 SIG，而您对某个方向有浓厚的兴趣，希望在 openEuler 社区成立一个新的相关 SIG 进行维护和发展，那您可以参考 [申请新 SIG 流程指南](https://www.openeuler.org/zh/sig/sig-guidance/) 来申请创建新的 SIG.

### 3.3 参与社区贡献

在签署了[CLA 协议](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)、找到了你想参与的[SIG 组](https://www.openeuler.org/zh/sig/sig-list/)之后，就可以开始你的社区贡献之旅啦！社区贡献的方式有很多种，每一种贡献都将受到社区的欢迎和重视。

##### 3.3.1.提交 Issue/处理 issue 任务

- 找到 Issue 列表：  
  在您感兴趣的 SIG 项目 Gitee 主页内，点击“Issues”，您可以找到其 Issue 列表（如[Community 团队的 Issue 列表](https://gitee.com/openeuler/community/issues))
- 提交 Issue  
  如果您准备向社区上报 Bug 或者提交需求，或者为 openEuler 社区贡献自己的意见或建议，请在 openEuler 社区对应的仓库上提交 Issue。  
  提交 Issue 请参考 [Issue 提交指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/issue-submit.md)。为了吸引更广泛的注意，您也可以把 Issue 的链接附在邮件内，通过[邮件列表](https://www.openeuler.org/zh/community/mailing-list/)发送给所有人。
- 参与 Issue 内的讨论  
  每个 Issue 下面可能已经有参与者们的交流和讨论，如果您感兴趣，也可以在评论框中发表自己的意见。
- 找到愿意处理的 Issue  
  如果您愿意处理其中的一个 issue，可以将它分配给自己。只需要在评论框内输入 /assign 或 /assign @yourself，机器人就会将问题分配给您，您的名字将显示在负责人列表里。

##### 3.3.2.贡献编码

- 准备 openEuler 的开发环境  
  如果您想参与编码贡献，需要准备 openEuler 的开发环境，请参考[开发环境准备](https://gitee.com/openeuler/community/blob/master/zh/contributors/prepare-environment.md)。
- 了解 SIG 和项目内的开发注意事项  
  每个 SIG 内的项目使用的编码语言、开发环境、编码约定等都可能存在差异的。如果您想了解并参与到编码类贡献，可以先找到该项目给开发者提供的贡献者指南——这个指南一般是在该 SIG 的首页地址内，以CONTRIBUTING.md文件的形式提供，或者就直接在该项目的README.md内。
- 下载代码和拉分支  
  如果要参与代码贡献，您还需要了解如何在 Gitee 下载代码，通过 PR 合入代码等。openEuler 使用 Gitee 代码托管平台，想了解具体的指导，请参考[Gitee Workflow Guide](https://gitee.com/openeuler/community/blob/master/zh/contributors/Gitee-workflow.md)。该托管平台的使用方法类似 GitHub，如果您以前使用过 GitHub，本节的内容您可以大致了解甚至跳过。
- 修改、构建和本地验证  
  在本地分支上完成修改后，进行构建和本地验证，请参考[构建软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/package-install.md)。
- 提交一个 Pull-Request  
  当你提交一个 PR 的时候，就意味您已经开始给社区贡献代码了。请参考 openEuler 社区 PR 提交指导。  
  为了使您的提交更容易被接受，您需要：

  - 遵循 SIG 组的编码约定，如果有的话
  - 准备完善的提交信息
  - 如果一次提交的代码量较大，建议将大型的内容分解成一系列逻辑上较小的内容，分别进行提交会更便于检视者理解您的想法
  - 使用适当的 SIG 组和监视者标签去标记 PR：社区机器人会发送给您消息，以方便您更好的完成整个 PR 的过程

  <span class="care">注意：如果您的 PR 请求没有引起足够的关注，可以在 SIG 的邮件列表或dev@openeuler.org求助。</span>

##### 3.3.3.贡献软件包

如果你发现 openEuler 缺失了一个软件包，可以帮 openEuler 把这个软件包补上。实际上贡献软件包的过程就是帮助 openEuler 提供更丰富功能的过程。希望随着大家的参与，openEuler 能够成为一个“无所不有”的软件生态系统。openEuler 支持在 gitee 新增软件包的同时自动在 obs 的 openEuler:Fctory 上创建同名仓库。这样在向已创建的 gitee 仓库提交代码时，会自动对代码编译进行检测。具体流程可参考 [如何新增软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/create-package.md)。

##### 3.3.4.贡献原创开源项目

如果你想将自己原创的开源项目贡献到 openEuler 社区，成为 openEuler 发行版本中的一份子，那么可参考以下两种方式：

- 方式一：在其它社区开发，集成到 openEuler 中  
  假定你已经在 github，gitlab 或者 gitee 上拥有了自己的项目，那么只需要按照以上提到的 [如何新增软件包](https://gitee.com/openeuler/community/blob/master/zh/contributors/create-package.md) 那样，将软件加入到 src-openeuler 这个 repo 仓就可以了。
- 方式二：在 openEuler 社区中开发，在 openEuler 中集成  
  直接在https://gitee.com/openeuler中建立原创项目，类似将项目“托管”到openEuler社区，比如现在社区中的iSula和A-Tune就是这样的模式。  
  如果你有了一个很棒的 idea 想要在 openEuler 社区里实现，那么他可以依照下面的过程来深度参与到 openEuler 中。  
  1.在[TC 委员会的例会](https://www.openeuler.org/zh/sig/sig-detail/?id=21&name=TC&mail=dev%40openeuler.org)中申请一个开源项目；  
  2.如果 TC 委员会认为这是一个很好的 idea，并且认为值得去推进，那么我们会在[https://gitee.com/openeuler](https://gitee.com/openeuler)中建立一个 repo；  
  3.这个项目在 openEuler 中持续开发和孵化，直到项目逐渐成熟，那么就可以在 src-openeuler 中建立一个仓，为该项目提供相关的 spec 文件，制作成为一个 rpm；  
  4.最终这个原创的开源项目会随着 openEuler 的发布版本走遍全世界，为世界人民所使用。

##### 3.3.5.检视代码

openEuler 是一个开放的社区，我们希望所有参与社区的人都能成为活跃的检视者。当成为 SIG 组的 committer 或 maintainer 角色时，便拥有审核代码的责任与权利。  
强烈建议本着[行为准则](https://gitee.com/openeuler/community/blob/master/code-of-conduct.md)，超越自我，相互尊重和促进协作。[《补丁审核的柔和艺术》](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/)一文中提出了一系列检视的重点，说明代码检视的活动也希望能够促进新的贡献者积极参与，而不会使贡献者一开始就被细微的错误淹没，所以检视的时候，可以重点关注包括：  
&nbsp;&nbsp;1.贡献背后的想法是否合理  
&nbsp;&nbsp;2.贡献的架构是否正确  
&nbsp;&nbsp;3.贡献是否完善

##### 3.3.6.测试

测试——是所有贡献者的责任，对于社区版本来说，[sig-qa](https://gitee.com/openeuler/QA)组是负责测试活动的社区官方组织。如果您希望在自己的基础架构上开展测试活动，可以参考：[社区测试体系介绍](https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E6%B5%8B%E8%AF%95%E4%BD%93%E7%B3%BB%E4%BB%8B%E7%BB%8D.md) 。  
为了成功发行一个社区版本，需要完成多种测试活动。不同的测试活动，测试代码的位置也有所不同，成功运行测试所需的环境的细节也会有差异，有关的信息可以参考：[社区开发者测试贡献指南](https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E5%BC%80%E5%8F%91%E8%80%85%E6%B5%8B%E8%AF%95%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.md)。

##### 3.3.7.选择社区组件打包

您也可以参与社区组件打包，请参考 [如何打包](https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md)。

##### 3.3.8.参与非代码类贡献

如果您的兴趣不在编写代码方面，可以在[ 非代码贡献指南 ](https://gitee.com/openeuler/community/blob/master/zh/contributors/non-code-contributions.md)中找到感兴趣的工作。

##### 3.3.9.社区安全问题披露

[安全处理流程](https://gitee.com/openeuler/security-committee/blob/master/%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.jpg)——简要描述了处理安全问题的过程。  
[安全披露信息](https://gitee.com/openeuler/security-committee/blob/master/security-disclosure.md)——如果您希望报告安全漏洞，请参考此页面。

## 4. 和社区一起成长

### 4.1 社区角色说明

社区不同角色对应不同的责任与权利，每种角色都是社区不可或缺的一部分，您可以通过积极贡献不断积累经验和影响力，并获得角色上的成长。更详细角色说明与责任权利描述请查看 [角色说明](https://gitee.com/openeuler/community/blob/master/community-membership_cn.md)。

### 4.2 技术委员会

openEuler 技术委员会（Technical Committee，简称 TC）是 openEuler 社区的技术决策机构，负责社区技术决策和技术资源的协调。  
详情请查看 [openEuler 技术委员会介绍](https://www.openeuler.org/zh/sig/sig-detail/?id=21&name=TC&mail=dev%40openeuler.org)

</div>

<style lang="scss" scoped>
  .care {
    color: var(--o-color-red5);
  }
</style>

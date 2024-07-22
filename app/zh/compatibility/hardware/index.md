---
title: 'Hardware'
---

<script setup lang="ts">
  import TheHardWare from "@/views/support/compatibility/TheHardWare.vue";
</script>

<TheHardWare />

<div class='markdown'>

## 简介
openEuler为用户测试openEuler与硬件的兼容性提供了两条路径，分别是社区认证和创新中心认证。社区认证能使用户在短期内完成兼容性测试并将测试结果展示于兼容性列表上。如果您需要在兼容性测试认证完成后获取相应证书，请走 [创新中心认证](https://gitee.com/openeuler/technical-certification/blob/master/README.md) / [测评联系](https://gitee.com/openeuler/technical-certification/issues/I9MY2A?from=project-issue)

下文提供了社区兼容性认证流程，并且每个阶段提供了预计需要的时间供参考。

## 兼容性测试流程
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  01
</div>

<div class="content">

###  成为openEuler社区开发者（0.5天）
通过社区进行硬件兼容性测试需要使用gitee平台进行流程处理，因此需要 [注册Gitee平台账号](https://gitee.com/signup?redirect_to_url=%2F) 。
在Gitee平台使用相同账号申请加入openEuler社区，成为组织成员（[怎么成为openEuler组织成员](https://gitee.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ.md)）。
为了后续能够在openEuler社区进行社区贡献，需要签署社区CLA（**贡献者许可协议：Contributor License Agreement**）。
[CLA签署页面](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  02
</div>

<div class="content">

###  申请兼容性测试（0.5天）
使用您已经签署过CLA的邮箱订阅兼容性组公共邮箱，[openEuler邮箱列表](https://www.openeuler.org/zh/community/mailing-list/)，名称选择Oecompatibility，点击邮件地址右侧的【订阅邮件】；
*tips:只有订阅了此邮箱后，您向公共邮箱发送的邮件才不会被搁置；*
向公共邮箱发送[兼容性测试申请](mailto:oecompatibility@openeuler.org?subject=申请硬件兼容性测试)，openEuler兼容性SIG（**特别兴趣小组：Special Interest Group**）团队成员在收到邮件后会与您进行沟通，收集兼容性认证必要的部分信息。

</div>

</div>

<div class='step'>

<div class="order-number">
  03
</div>

<div class="content">

###  了解兼容性策略（0.5天）
兼容性测试包括了服务器整机测试与板卡测试，在展开兼容性测试前，您需要了解针对不同硬件openEuler的兼容性策略，[点击此处获取文档](https://www.openeuler.org/category/support/compatibility/openEuler-compatibility.pdf)。

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  04
</div>

<div class="content">

###  创建issue（0.5天）
在第一步完成，成为openEuler社区开发者并完成协议签署后，您便可以在openEuler社区的[oec-hardware项目](https://gitee.com/openeuler/oec-hardware)下创建issue([issue提交指南](https://gitee.com/openeuler/community/blob/master/zh/contributors/issue-submit.md))
您需要将所需要认证的硬件信息在issue中明确，以**xx硬件与openEuler xx版本适配**为标题，并在正文中描述清楚问题背景及诉求。openEuler团队会第一时间了解您的issue的信息，并提出建议。
[整机issue模板参考](https://gitee.com/openeuler/oec-hardware/issues/IACFVK?from=project-issue) / [板卡issue模板参考](https://gitee.com/openeuler/oec-hardware/issues/IACFTN?from=project-issue)

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  05
</div>

<div class="content">

###  测试兼容性（10天）
完成issue创建后，您即可开展兼容性测试。openEuler团队提供了兼容性测试框架以及测试工具使用指南，您可以根据提供的资料自助完成兼容性测试。[oec-hardware工具说明](https://gitee.com/openeuler/oec-hardware/blob/master/README.md)

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  06
</div>

<div class="content">

###  提交测试结果审核（2天）
完成兼容性测试并通过后，需要您将测试结果添加到对应issue的附件中，同时向公共邮箱（oecompatibility@openeuler.org ）发送兼容性结果审核申请，邮件标题需要注明“xxx硬件兼容性测试结果信息”（其中xxx为社区issue ID）
**如何获取issue ID：** issue链接格式如下（https://gitee.com/openeuler/oec-hardware/issues/**XXXXXX**） 此处**“XXXXXX”**就是我们需要的issue ID）

*tips：您提交的测试结果应包含以下内容*
| 内容                         | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 测试日志                     | 使用oec-hardware工具测试完成后会自动生成测试日志tar包并保存在`/usr/share/oech/logs/`目录下                                                                                                                                                                                                                                                                                                                                                                          |
| 整机/板卡 兼容性信息发布清单 | 您需要按照信息模板正确填写您的硬件兼容性信息，这里是模板链接：[整机兼容性发布信息模板](https://gitee.com/openeuler/oec-hardware/blob/master/templates/%E6%95%B4%E6%9C%BA%E5%85%BC%E5%AE%B9%E6%80%A7%E5%8F%91%E5%B8%83%E4%BF%A1%E6%81%AF%E6%A8%A1%E6%9D%BF.xlsx) / [板卡兼容性发布信息模板](https://gitee.com/openeuler/oec-hardware/blob/master/templates/%E6%9D%BF%E5%8D%A1%E5%85%BC%E5%AE%B9%E6%80%A7%E5%8F%91%E5%B8%83%E6%B8%85%E5%8D%95%E6%A8%A1%E6%9D%BF.xlsx) |


</div>

</div>
<!-- ----------------------------------------------------------------------- -->
<div class='step'>

<div class="order-number">
  07
</div>

<div class="content">

###  结果发布（2天）
openEuler团队会针对提交的测试结果进行审核，如果通过，会将硬件添加到 [兼容性列表](https://www.openeuler.org/zh/compatibility/) 中。如未通过，则需要您与openEuler团队针对测试未通过的原因进行后续跟进。

</div>

</div>

</div>

<style lang="scss" scoped> @import './index.scss'; </style>

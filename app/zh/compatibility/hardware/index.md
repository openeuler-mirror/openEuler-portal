---
title: 'Hardware'
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import {
  OBreadcrumb,
  OBreadcrumbItem,
  OTab,
  OTabPane,
} from '@opensig/opendesign';
import TheHardWare from "~@/views/compatibility/TheHardWare.vue";
import { getUrlParams } from "~@/utils/common.ts";
import { useI18n } from '@/i18n';
const i18n = useI18n();
const activeTab = ref('');

const handleTabChange = (val:string) => {
  if (val) {
    history.pushState(null, '', `?overview=true`);
  } else {
   const urlWithoutParams = window.location.href.split('?')[0];
   history.pushState(null, '', urlWithoutParams);
  }
}
onMounted(() => {
  activeTab.value = getUrlParams(window.location.href).get('overview') || '';
})
</script>

<TheHardWare />

<div class='wrapper'>

<OTab
  v-model="activeTab"
  @change="handleTabChange"
  variant="text"
  :style="{
    '--tab-nav-justify': 'left',
    '--tab-nav-text-size': 'var(--o-font_size-h4)',
    '--tab-nav-text-height': 'var(--o-line_height-h4)',
  }"
  :line="false"
>
<OTabPane :label="i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE" value="">
<div class='markdown'>

# openEuler 硬件兼容性认证整体介绍

## 简介
openEuler为用户测试openEuler与硬件的兼容性提供了两条路径，分别是社区认证和现场认证。社区认证能使用户在短期内完成兼容性测试并将测试结果展示于兼容性列表上。如果您需要在兼容性测试认证完成后获取相应证书，请走 [现场认证](https://gitee.com/openeuler/technical-certification/blob/master/README.md) / [测评联系](https://gitee.com/openeuler/technical-certification/issues/I9MY2A?from=project-issue)

下文提供了社区兼容性认证流程，并且每个阶段提供了预计需要的时间供参考。

## 社区兼容性认证流程
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
</OTabPane>
<!-- 硬件兼容性整体介绍 -->
<OTabPane :label="i18n.compatibility.COMPATIBILITY_HARDWARE" value="true">

<div class="markdown">

# 硬件兼容性整体介绍

## 一、评测服务背景介绍

开放原子-英特尔联合验证中心（以下简称“联合验证中心”）由开放原子开源基金会（以下简称“开放原子”）和英特尔（中国）有限公司（“英特尔”）联合成立并运行。为提升软硬件融合水平，联合验证中心将开展openEuler社区硬件兼容性测试（整机）（以下简称“openEuler评测”）、英特尔<sup>®</sup>平台先进技术评测（以下简称“英特尔评测”）。

开放原子负责openEuler评测，英特尔负责英特尔评测。开放原子和英特尔各自负责业务范围内的评测要求、管理整个评测项目并颁发其负责范围内的测试函。

## 二、前置条件

送测厂商须为英特尔<sup>®</sup>合作伙伴联盟会员。

申请者须为英特尔<sup>®</sup>合作伙伴联盟会员。

送测对象为送测厂商产品测试验证平台（PVT）阶段之后的服务器产品，须基于第四代以及后续英特尔<sup>®</sup>至强<sup>®</sup>处理器。送测对象须预装openEuler官网列示的社区发行版或基于openEuler社区发行版所研发的操作系统商业发行版。

## 三、评测申请

送测厂商应通过以下渠道申请评测：[英特尔官网](https://www.intel.cn/content/www/cn/zh/homepage.html)或[openEuler社区官网](/zh/)。送测厂商申请评测即表示其接受本流程及指南、《英特尔<sup>®</sup>平台先进技术评测条款与条件》的管辖和适用。

## 四、技术评测

送测厂商需自担运费和保价费邮寄送测对象及物料至联合验证中心指定收件地址，收件人 **寇雨**，联系电话 **17600801705**，地址 **北京市通州区科谷一街8号院8号楼B1**。联合验证中心在收到送测厂商通过上述渠道申请且收到送测对象后，根据申请范围开展评测工作。测试结束后送测厂商自行取回。联合验证中心占有送测对象期间，将尽合理义务保管送测对象。联合验证中心强烈建议送测厂商为其送测对象购买足额的保险抵抗风险。

为完成上述评测，联合验证中心将委托开放原子负责送测对象在验证中心内的上线、摆放等工作；联合验证中心委托开放原子负责openEuler评测，联合验证中心委托英特尔负责英特尔评测。开放原子或英特尔根据[《openEuler兼容性协议》](https://certification.openeuler.org/#/compatibilityProtocol)或[《英特尔<sup>®</sup>平台先进技术评测规范》](/zh/compatibility/intel-validation-specification/)和《英特尔<sup>®</sup>平台先进技术评测条款与条件》安装、运行测试套件，并书面通知送测厂商评测结果。评测通过的，开放原子、英特尔将分别依据测试结果出具各自的验证函。

## 五、评测结果的公布与使用

送测厂商、联合验证中心、开放原子、英特尔均可对外公布及使用验证函。

开放原子-英特尔联合验证中心

2024年8月8日

</div>

</OTabPane>
</OTab>

</div>


<style lang="scss" scoped> @import './index.scss';


</style>

---
title: '角色说明'
---

<script setup lang="ts">
import { computed } from 'vue';
import BannerLevel2 from '@/components/BannerLevel2.vue'
import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-role.png';

</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    background-text="SIG"
    title="角色说明"
    :illustration="illustration"
  />
</ClientOnly>
<div class="markdown">

### 社区成员

本文简要描述了 openEuler 社区中贡献者角色的各种职责。大部分角色的职责限于这些 SIG(Special Interest Group)内：

| 角色        | 职责范围（简要描述） | 要求                                                   | 定义的文件                                                            |
| :---------- | :------------------- | :----------------------------------------------------- | :-------------------------------------------------------------------- |
| Contributor | 项目的贡献者         |                                                        | Gitee 注册成员                                                        |
| Committer   | 审核其他成员的贡献   | SIG 的积极贡献者，经验丰富，愿意投入精力参与到审核工作 | openEuler SIG 拥有的存储库中 sig-info.yaml 文件中的 Commiter 条目。   |
| Maintainer  | 项目 Owner           | 经验丰富，富有责任心、出色的技术能力和管理能力         | openEuler SIG 拥有的存储库中 sig-info.yaml 文件中的 Maintainer 条目。 |

说明：Maintainer 和 Committer 在 Gitee 的权限上不做区分，两者的区分主要是集中在 SIG 治理的管理范围上。详细可以见下面的描述。

## 新的贡献者

欢迎新成员加入社区。我们有关于如何开始贡献的指导文档请参考：
<a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" >openEuler 贡献者指南</a>

## 既有社区成员

既有的社区成员应证明能够遵守本文中的原则，熟悉 SIG 的组织、角色、政策、软件、约定等，以及相关的技术和/或写作能力。社区成员角色的期望、职责和要求，请参考下面的内容。

## 贡献者 Contributor

贡献者是社区中持续活跃的贡献者，他们可以认领问题和 PR，可以参与 SIG 组活动，并且可以为 PR 提交前完成测试。

### 要求

- Gitee 上的注册会员

- 为 SIG 或社区做出多方面贡献，包括不限于：

  - 在 Gitee 上提交或审核 PR

  - 在 Gitee 上对问题进行归档或评论
  - 参与 SIG 或社区讨论

- 已阅读
  <a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" class="link">贡献者指南</a>
- 积极参与 1 个或多个 SIG

### 责任与权利

- 响应被分配的问题和 PR

- 贡献的代码应该

  - 经过良好的测试

  - 能够让测试用例始终通过
  - 解决后继发生的错误或问题

- 可以分配问题或 PR

注意：经常贡献代码的成员应积极的参与代码审查，并努力成为 SIG 的审核者 Committer。

## 审核者 Committer

审核者能够在 SIG 或 SIG 的某些部分中审核代码的质量和正确性。审核者对代码库和软件工程原理非常了解。

定义：openEuler SIG 拥有的存储库中 sig-info.yaml 文件中的 Committer 条目。

### 要求

- 作为贡献者至少 3 个月

- 作为主要审阅者至少参与了 6 次 PR 的审阅
- 审阅或合并至少 20 个基本 PR 到代码库
- 熟悉代码库
- 可以自我提名，或由该 SIG 的审核者或维护者提名

### 责任与权力

- 评审 PR：对 Contributor 提交的 PR 完成评审，评审可以参考社区的[软件包开发规范](https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md)和[安全编程指南](https://gitee.com/openeuler/security-committee/blob/master/docs/zh/developer-guide/SecureCoding.md)。

- 分发处理问题:请参考“[问题处理流程](https://gitee.com/openeuler/community/blob/master/zh/contributors/issue-submit.md)”。
- 跟踪依赖性问题：在开发分支中，其他 SIG 组的软件包的更新可能会到导致破坏本 SIG 内软件包的依赖关系。此时 Committer 会收到告警提示，Committer 应尽力重建软件包。依赖关系出错可能会使最终用户无法更新系统，打包团队也会介入并重建存在依赖性问题的软件包，但 Committer 不应依赖这些重建。
- 如有接口变更，通知可能会影响到的 SIG：其他 SIG 或项目会依赖本 SIG 的软件包，对软件包接口的变更可能会对他们造成影响。Committer 应了解并评审&决策变更造成的依赖影响，并公告和发送 API 或 ABI 变更的告警邮件。这类公告应在变更发生至少一周前完成，并应通知到所有可能受影响的 SIG。具体请参考[KABI接口变更评审实例](https://www.openeuler.org/zh/oEEP/?name=oEEP-0009%20openEuler%20LTS%20%E7%89%88%E6%9C%AC%E5%86%85%E6%A0%B8%20KABI%20%E5%8F%98%E6%9B%B4%E7%AD%96%E7%95%A5)。
- 更新和维护软件包版本：遵守社区的[软件包更新质量控制策略](https://www.openeuler.org/zh/oEEP/?name=oEEP-0017%20openEuler%E8%BD%AF%E4%BB%B6%E8%B4%A8%E9%87%8F%E5%88%86%E7%BA%A7%26%E6%89%A7%E8%A1%8C%E7%AD%96%E7%95%A5)完成软件包的更新。
- 和上游社区合作，包括：

  - 将所有变更推送到上游社区

  - 参与上游社区邮件列表
  - 获取上游社区的 bug 跟踪器的账户，并跟踪上游社区的重要 bug
  - 将严重的错误转发给上游社区以寻求帮助，更多信息请参考“[上游社区软件包管理建议]()”

- 和测试团队合作，包括：

  - 在提交软件包时，向质量检查人员提供如何调试/分类软件包的信息，以供问题的分类

  - 提供基本功能的测试用例，用于测试回归
  - 提交软件包更新时，提供有关更新中已经修复问题的测试用例，以供质量检查人员使用。

## 维护者 Maintainer

维护者是 SIG 组的组长或者管理委员会成员，也是软件包的维护者，能够像 Committer 一样审查和批准代码贡献。代码审查的重点是代码质量和正确性，而批准的重点是对贡献的整体接受度。所有 Committer 的责任与权力，Maintainer 均具有。除此之外，Maintainer 还承担了团队的技术路线、内外协调等工作。

定义：openEuler SIG 拥有的存储库中 sig-info.yaml 文件中的 Maintainer 条目。

### 要求

- 作为审核者至少 3 个月

- 作为主要审阅者至少参与了 12 次 PR 的审阅
- 审阅或合并至少 30 个基本 PR 到代码库
- 熟悉代码库
- 可以自我提名，也可以由子项目 Maintainer 提名，并且没有其他子项目 Maintainer 的反对

### 责任与权力

- 确定 SIG 所负责项目的技术路线：包括规划和决策 SIG 技术方向、路标规划、架构演进。

- 制定 SIG 所负责项目的发布计划：确定 SIG 的关键需求和发布计划；参与社区的 PM 活动，并协调 SIG 计划和社区版本的里程碑时间表匹配。
- 参与社区协调活动：作为 SIG 的代表参与 openEuler 技术委员会或理事会组织的活动和特定会议等。
- 召集 SIG 组会议：定期召集 SIG 会议，决策 SIG 内上升的争议。

</div>

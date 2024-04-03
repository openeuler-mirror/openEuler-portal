---
title: 'Bug Management'
---

<script setup lang="ts">
import BannerLevel2 from '@/components/BannerLevel2.vue'
import banner from '@/assets/banner/banner-security.png';
import illustration from '@/assets/illustrations/support/vulnerability-reporting.png';
</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    title="Bug Management"
    :illustration="illustration"
/>
</ClientOnly>

<div class='markdown'>

# Bug Management

## Response to Bugs

The Release and QA SIGs are jointly responsible for the quality of openEuler releases. The openEuler QA SIG controls the software quality of the community by formulating bug management policies and working with test teams to carry out tests on openEuler releases. The Release SIG manages releases by coordinating the openEuler community, developers, and test teams to ensure high-quality delivery of milestones of the development version and iterations of the maintenance versions. openEuler welcomes and encourages community developers to find or fix CVEs to continuously improve software user experience. The community will quickly respond to, analyze, and fix reported bugs based on feedback and build releases in a timely manner.



## Supported Releases

The bug response process is designed for LTS versions and of the openEuler community and their services packs.



## Bug Fixing Process

Version bugs are specific types of issues reported by community developers, test teams, or users. They are associated with version milestones. After an issue is submitted to the openEuler community, the maintainers or committers of the corresponding SIG are responsible for analyzing and handling the issue. The QA and Release SIGs periodically review version bugs in the community and promote the community to handle issues as soon as possible based on priorities. The following figure shows the end-to-end bug fixing process of the community.

![Bug fixing process](./img.png)



## Bug Reporting

### Reporting Method

The openEuler community relies on Gitee issues for bug management. To improve version bug awareness efficiency, the openEuler community provides a dedicated issue feedback template that interconnects with the community awareness tool. Developers are advised to use this template to submit issues to the src-openEuler software package repositories so that SIGs can detect and handle the issues as soon as possible. The template is as follows:

```markdown
**[Issue Title]: Briefly describe the issue, inlcuding the scenario, actions taken, and results. (Positive words are recommended.)**

**I. Bug Information**

**Kernel: **

**Component to which the bug belongs: **

**Version to which the bug belongs: **

**Bug description: **

**[Environment information]**
Hardware:
- Provide information about the faulty hardware in bare metal scenarios.
- Provide XML files or configurations in VM scenarios.
Software:
- Provide the OS version and branch.
- Provide the kernel information.
- Provide the version of the faulty component.
Network:
- If special networking is used, provide the network topology.

**[Issue reproduction]**: Describe operation details.
**[Actual result]**: Describe the result of the issue.
**[Additional information]**
Such as system message logs, component logs, dump information, and images.

**Reference link to bug details: **

**Link to the bug analysis guide: **
https:xxx


**II. Bug Analysis Feedback**
**Impact analysis: **

**Bug severity: (Critical/High/Moderate/Low)**

**Affected version check (affected/unaffected): **
openEuler-xxxx-xxxx: affected/unaffected

**ABI change (affected/unaffected): **
openEuler-xxxx-xxxx: affected/unaffected
```



#### Description of Bug Reporting Fields (Specified by the Issue Submitter)

| Field             | Description                       | Example                        | Mandatory |
| ---------------- | -------------------------- | --------------------------- | -------- |
| Kernel         | Kernel version in the environment where the bug occurs. | 4.19.0.20230601.5.0         | Yes       |
| Component to which the bug belongs     | Component to which the bug belongs.               | kernel-4.19.0.20230601.5.0  | Yes       |
| Version to which the bug belongs:   | openEuler version where the bug is found.    | openEuler-22.03-LTS-SP1     | Yes       |
| Bug description         | Bug description.                  |                             | Yes       |
| Reference link to bug details | Reference link to bug details.             | GitHub or other community issue link| Recommended|



#### Description of Bug Analysis Fields (Specified by SIG Maintainers)

| Field                | Description                            | Example                                 | Mandatory |
| ------------------- | ------------------------------- | ------------------------------------ | -------- |
| Impact analysis      | Impact of the bug analyzed by the SIG.             | Functions, security, and upper-layer dependencies affected by the bug.| Yes       |
| Bug severity        | Severity of the bug.                | Critical/High/Moderate/Low            | Yes       |
| Affected version check      | Check for the bug in all openEuler versions under maintenance. | openEuler 20.03/22.03 series           | Yes       |
| ABI change| Check for the impact on all openEuler versions under maintenance.| openEuler 20.03/22.03 series          | Yes       |



## Bug Severity Evaluation

The bug severity evaluation principles are developed by the QA SIG of the openEuler community. If you have any questions, contact maintainers of the SIG.

| Dimension | Critical                                                         | High                                                         | Moderate                                                         | Low                                                       | Reference                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Function     | An issue that blocks the basic OS test and causes other servers and OSs (including clients) to malfunction exists. | 1. The requirements to be implemented have not been implemented or are incorrectly implemented. As a result, the features cannot meet the requirements. <br>2. An issue that blocks the basic component test exists, but the normal running of the OS and other programs is not affected.| 1. The specification implementation is incorrect, but the entire feature does not fail. <br>2. An issue that blocks the function test of the component module exists, but the basic functions of the component and other programs are not affected. | 1. UCD errors such as spelling errors. <br>2. Usability issues. <br>3. Suggestions on adding or optimizing functions.| N/A                                                           |
| Performance     | The performance test result is [30%, ) lower than the specifications.                               | 1. The performance test result is [20%, 30%) lower than the specifications. <br>2. The performance deteriorates [5%, ) during a long-term test.| 1. The performance test result is [10%, 20%) lower than the specifications. <br>2. The performance deteriorates [0%, 5%) during a long-term test.| The performance test result is [0%, 10%) lower than the specifications.                            | N/A                                                           |
| Security     | CVEs with CVSS scores of [9, ) have not been fixed.                       | 1. CVEs with CVSS scores of [7, 9) have not been fixed. <br>2. Malicious files such as viruses and Trojan horses exist. <br>3. Some security test baseline cases fail to be passed. <br>4. An open source fragment reference issue exists. <br>5. A license compliance issue exists.| 1. CVEs with CVSS scores of [4, 7) have not been fixed. <br>2. Unused compiler security options exist. <br>3. A secure coding issue exists.| CVEs with CVSS scores of [0, 4) have not been fixed.                      | [SecureRelease.md](https://gitee.com/openeuler/security-committee/blob/master/guide/SecureRelease_en.md) |



## Contact



### QA SIG

| Gitee ID      | Name          | Email                     |
| ------------- | ------------- | ------------------------ |
| wu_fengguang  | wufengguang   | wufengguang@huawei.com   |
| walkingwalk   | wubodong      | wubodong@huawei.com      |
| lemon-higgins | lemon.higgins | lemon.higgins@aliyun.com |
| lutianxiong   | lutianxiong   | lutianxiong@huawei.com   |
| rigorous      | yanjin        | yanjin.yan@huawei.com    |
| SupMario      | tangjie       | tangjie18@huawei.com     |
| charlie_li    | liyongqiang   | liyongqiang329@163.com   |
| disnight      | fanjiachen    | fanjiachen3@huawei.com   |
| Ethan-Zhang   | zhangyizheng  | ethanzhang55@outlook.com |



### Release SIG

| Gitee ID    | Name           | Email                      |
| ----------- | -------------- | ------------------------- |
| yaqiangchen | chenyaqiang    | chenyaqiang@huawei.com    |
| solarhu     | Hufeng         | solar.hu@huawei.com       |
| paul-huang  | Huangchengpiao | huangchengpiao@huawei.com |
| gitee-cmd   | chemingdao     | chemingdao@huawei.com     |

</div>

<style lang="scss" scoped>

</style>

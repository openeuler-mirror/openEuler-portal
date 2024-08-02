---
title: 'Contribution'
---

<script lang="ts" setup>
import BannerLevel2 from '@/components/BannerLevel2.vue'
import ContributionTab from "@/views/contribution/ContributionTab.vue";

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/contribution.png';
</script>

<ClientOnly>
  <BannerLevel2
  title="How to Contribute"
  :illustration="illustration"
  :background-image="banner"
  background-text="COMMUNITY"
  />
</ClientOnly>
<ContributionTab />

<div class="markdown word">

# Welcome to OpenAtom openEuler!

OpenAtom openEuler (openEuler for short) is an open source project incubated and operated by the OpenAtom Foundation.

openEuler is an open source operating system (OS) oriented to digital infrastructure that fits into any server, cloud computing, edge computing, and embedded deployment. This secure, stable, and easy-to-use open source OS is compatible with multiple computing architectures. openEuler suits operational technology (OT) applications and empowers the convergence of OT and information and communications technology (ICT).

The openEuler open source community works with global developers to build an open, diversified, and architecture-inclusive software ecosystem. It covers all scenarios of digital facilities, and empowers enterprises to develop their hardware and software as well as application ecosystems.

## 1. Experience openEuler

### 1.1 Experience the openEuler OS

openEuler community versions include long-term support (LTS) versions and innovation versions, as described in [openEuler Community Version Lifecycle Management](https://www.openeuler.org/en/other/lifecycle/). You can [download](https://www.openeuler.org/en/download/get-os/) and experience openEuler community versions.

### 1.2 Experience Original Open Source Projects

Experience a range of original open source projects in the openEuler community.

- [StratoVirt](https://www.openeuler.org/en/other/projects/stratovirt/): enterprise-class virtualization platform oriented to cloud data centers
- [A-Tune](https://www.openeuler.org/en/other/projects/atune/): AI-based tuning engine
- [iSula](https://www.openeuler.org/en/other/projects/isula/): lightweight container solution
- [secGear](https://www.openeuler.org/en/other/projects/secgear/): security application development kit for confidential computing
- [pkgship](https://pkgmanage.openeuler.org/): software package dependency management with detailed dependency graphs
- [BiSheng JDK](https://www.openeuler.org/en/other/projects/bishengjdk/): open source version of Huawei JDK, a high-performance, production-ready OpenJDK distribution
- [Compass-CI](https://compass-ci.openeuler.org/): open source software platform for continuous integration (CI) with an open and comprehensive test system
- [More](https://gitee.com/openeuler)

## 2. Sign the CLA

Sign the [openEuler Contributor License Agreement (CLA)](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340) before contributing to the community. Choose a CLA type based on whether you are contributing as an individual, an employee, or on behalf of a corporation.

- Individual CLA: participating in the community as an individual
- Corporate CLA: participating in the community on behalf of a corporation
- Employee CLA: participating in the community as a corporation employee

References:

[[1] openEuler CLA Signing Guide](https://www.bilibili.com/video/BV12A411o7zY/?spm_id_from=333.337.search-card.all.click&vd_source=0aa547ea87e7a7505cf544eacc2236ac)

[[2] A Guide to Signing the openEuler Corporation CLA](https://www.openeuler.org/en/blog/2022-11-25-cla/CLA%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B.html)

## 3. Find SIGs to Participate In

Special interest groups (SIGs) are a crucial part in the [openEuler community organizational structure](https://www.openeuler.org/en/community/organization/). The community is organized into SIGs to better coordinate and manage workflows. SIGs are open to everyone. For details about SIGs, see [openEuler SIG Role Division and Management](https://www.openeuler.org/en/blog/2022-11-12-04/04.html).

### So, the right way to start participating in the community is to find a SIG or project that interests you.

- Currently, the openEuler community has more than 100 SIGs. View the [openEuler SIG list](https://www.openeuler.org/en/sig/sig-list/) to find the SIG you want to join.
- If you cannot find a SIG that you are interested in, send an email to [community@openeuler.org](mailto:community@openeuler.org). You are advised to use "\[Development Process Question\]" in the email subject and write down the characteristics of the SIG or project that you are looking for in the content. We are glad to help.
- If you cannot find a SIG that interests you in the existing SIGs, and you have a strong interest in a certain development direction and wish to establish a relevant SIG, you can [apply for setting up a new SIG](https://www.openeuler.org/en/sig/sig-guidance/).

## 4. Contribute to the Community

After signing the CLA and joining a SIG, you can start your contribution journey. To maintain the friendly environment for development and collaboration, observe the [_openEuler Community Code of Conduct_](https://gitee.com/openeuler/community/blob/master/code-of-conduct_en.md) and [_openEuler Community Code of Conduct for Development_](https://gitee.com/openeuler/community/blob/master/zh/technical-committee/governance/openEuler%E7%A4%BE%E5%8C%BA%E5%BC%80%E5%8F%91%E8%A1%8C%E4%B8%BA%E8%A7%84%E8%8C%83.md) when you engage in community contributions.

- [Contribute Original Open Source Projects](#_4-1-contribute-original-open-source-projects)
- [Contribute Code](#_4-2-contribute-code)
- [Participate in Non-Code Contributions](#_4-3-make-non-code-contributions)

### 4.1 Contribute Original Open Source Projects

If you want to contribute your original open source project to the openEuler community and make it a part of the openEuler releases, you need to:

1. Open the source code of your project under an [open source license](https://opensource.org/license).

2. Use the mailing list to schedule a [Technical Committee (TC) regular meeting](https://www.openeuler.org/en/sig/sig-detail/?name=TC) and apply to contribute your project to the community.

#### With approval from the TC, you can integrate your work into openEuler using either of the following methods:

- Method 1: Develop a project in the community and integrate it into openEuler.

  Creating an original project directly in [openEuler code repositories](https://gitee.com/openeuler) is like hosting the project in the openEuler community. This is the practice of [iSula](https://gitee.com/openeuler/iSulad) and [A-Tune](https://gitee.com/openeuler/A-Tune).

  If you have a great idea that you want to implement in the openEuler community, follow the procedure below to get deeply involved in the openEuler community.

  1. Apply for setting up an open source project in [regular meetings of the TC](https://www.openeuler.org/en/sig/sig-detail/?name=TC).

  2. If the TC determines that your proposal is valuable and deserves further development, a repository will be created in [https://gitee.com/openeuler](https://gitee.com/openeuler).

  3. The project will be continuously developed and incubated within openEuler until it reaches maturity. At that point, a repository can be created in src-openeuler to provide the relevant spec file for packaging the project into an RPM file, which will eventually be used by people around the world with openEuler releases.

- Method 2: Develop a project in another community and integrate it into openEuler.

  Assuming that you already have a project on GitHub, GitLab, or Gitee, simply add the software to [src-openeuler](https://gitee.com/src-openeuler) by referring to [Adding a New Software Package](https://gitee.com/openeuler/community/blob/master/en/contributors/create-package.md).

### 4.2 Contribute Code

The openEuler community has two repositories:

1. Code repository: [https://gitee.com/openeuler](https://gitee.com/openeuler)

2. Software package repository: [https://gitee.com/src-openeuler](https://gitee.com/src-openeuler)

The **openeuler** repository stores source code.

The **src-openeuler** repository stores the software packages required for building the OS.

#### 4.2.1 Submit and Handle Issues

- Issues serve as a platform for documenting and tracking developer ideas, feedback, tasks, and software defects. By engaging with issues, you can easily participate in SIGs and projects that interest you, contributing to the community effectively. [QuickIssue](https://quickissue.openeuler.org/en/issues/) allows you to quickly search for and submit issues. Generally, issues are used to:

  - Report bugs.

  - Submit suggestions.

  - Record tasks to complete.

  - Give feedback on missing documentation or installation problems.

  - Ask and discuss questions.

- Issue list

  Enter the home page of the SIG or project that interests you from the community code repository, then click **Issues** on the toolbar to check the issue list, for example, [the issue list of the **community** repository](https://gitee.com/openeuler/community/issues).

- Issue submission

  You can submit issues regarding bugs or requests to related repositories in the community. For details, see the [_Issue Submission and Handling Guide_](https://gitee.com/openeuler/community/blob/master/en/contributors/issue-submit.md). To attract more attention, you can also attach the issue link to an email and send it to a [mailing list](https://www.openeuler.org/en/community/mailing-list/).

- Issue discussion

  Each issue may have discussions from other participants. If you are interested, you can share your thoughts in the comment area.

- Issue assignment

  If you want to handle one of the issues, you can assign it to yourself. You only need to comment **/assign** or **/assign @yourself**. The community bot will assign the issue to you and your name will be displayed in the assignee list.

- [QuickIssue](https://quickissue.openeuler.org/en/issues/) allows you to quickly search for and submit issues. For details, see [Introduction to the QuickIssue Service](https://www.openeuler.org/en/blog/georgecao/QuickIssue.html).

#### 4.2.2 Submit Code

- Development environment setup

  1. If you want to submit code, you need to prepare an openEuler development environment. For details, see [Development Environment Preparations](https://gitee.com/openeuler/community/blob/master/en/contributors/prepare-environment.md).

  2. If you want to download, modify, build, or verify an openEuler software package, see [Software Package Building](https://gitee.com/openeuler/community/blob/master/en/contributors/package-install.md).

- Development precautions

  The programming languages, development environments, and coding conventions used by SIG projects may vary. A contributor guide, which is typically provided as a **CONTRIBUTING.md** file on the SIG home page or a **README.md** file within the project repository, offers essential information for you to understand and participate in coding.

- Code download and branching

  To submit code, you also need to know how to download code from Gitee and merge code through pull request (PRs). The openEuler community hosts code on Gitee. For details, see [Gitee Workflow](https://gitee.com/openeuler/community/blob/master/en/contributors/Gitee-workflow.md). Gitee provides similar experience to GitHub. If you have used GitHub before, you can have a quick look at or even skip this chapter.

- Build modification and local verification

  After modifying code on a local branch, you can perform building and verification locally by referring to [Software Package Building](https://gitee.com/openeuler/community/blob/master/en/contributors/package-install.md).

- PR submission

  When you submit a PR, you are starting to contribute code to the community. The [_Pull Request Submission Guide_](https://gitee.com/openeuler/community/blob/master/en/contributors/pull-request.md) will familiarize you with PR submission requirements. To increase the chances of your PR being accepted, you should:

  1. Comply with any coding conventions of the SIG.

  2. Write good commit messages.

  3. When submitting a large amount of code, you are advised to break down the code into a series of smaller, logically contained commits. This will make it easier for reviewers to understand your thoughts.

  4. Attach appropriate SIG and committer labels to your PR. The community bot will send you a message to guide you through the entire PR process.

Note: If your PR does not draw enough attention, you can seek help from the SIG mailing list or send email to [dev@openeuler.org](mailto:dev@openeuler.org).

#### 4.2.3 Contribute Software Packages or Package Community Components

If you find a software package missing from openEuler, you can add it to supplement openEuler and help expand its functionality.

- When a software package is added on Gitee, openEuler automatically creates a repository with the same name in openEuler:Factory of the Open Build Service (OBS). In this way, every time code is submitted to the created Gitee repository, a code compilation check is automatically triggered. [Adding a New Software Package](https://gitee.com/openeuler/community/blob/master/en/contributors/create-package.md) describes the detailed process.

- You can also participate in community component packaging. For details, see the [_openEuler Packaging Guide_](https://gitee.com/openeuler/community/blob/master/en/contributors/packaging.md).

- If you find that some software packages are missing or the existing packages do not satisfy your needs, you can help supplement openEuler by using [openEuler User Repo (EUR)](https://eur.openeuler.openatom.cn). For details, see [Introduction to the openEuler User Software Repository](https://www.openeuler.org/en/blog/waaagh/waaagh/openEuler-user-repo-intro.html) and [How to Use the openEuler User Repository](https://www.openeuler.org/en/blog/waaagh/waaagh/openEuler-user-repo-howto.html).

#### 4.2.4 Review Code

openEuler is an open community and every community member is expected to be an active reviewer. For details about responsibilities of different contributor roles, see [Community Membership](https://gitee.com/openeuler/community/blob/master/community-membership.md).

As a SIG committer or maintainer, you have the responsibility and permission to review code. It is strongly recommended that you comply with the _Code of Conduct_ and respect others to foster a collaborative environment and improve yourself. When reviewing PRs, consider the key points outlined in [_The Gentle Art Of Patch Review_](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/). This resource emphasizes fostering an encouraging environment for new contributors instead of giving nit-picking comments. To this end, please keep the following points in mind during your review:

1. Is the idea behind the contribution sound?

2. Is the contribution architected correctly?

3. Is the contribution polished?

#### 4.2.5 Test

Testing is the responsibility of all contributors. The [QA SIG](https://gitee.com/openeuler/QA) is the official organization responsible for testing activities related to the community version. If you want to carry out testing activities on your own infrastructure, see [Community Test System](https://gitee.com/openeuler/QA/blob/master/GuideBook/community-test-system.md).

A successful release of the community version requires multiple types of testing activities. Different tests target different code segments and require varying execution environments. For details, see [Community Developer Test Contribution Guide](https://gitee.com/openeuler/QA/blob/master/GuideBook/community-developer-test-contribution-guide.md).

#### 4.2.6 Report Community Security Issues

- [openEuler Community Security Issue Handling Process](https://gitee.com/openeuler/security-committee/blob/master/security-issue-handling-process.png) briefly introduces the process of handling security issues.
- [openEuler Security Disclosure](https://gitee.com/openeuler/security-committee/blob/master/security-disclosure-en.md) describes how to report security vulnerabilities.

### 4.3 Make Non-Code Contributions

If you are not interested in coding, you can make [Non-Code Contributions](https://gitee.com/openeuler/community/blob/master/en/contributors/non-code-contributions.md). This section will describe some common non-code community work.

#### 4.3.1 openEuler Call for X

[openEuler Call for X](https://www.openeuler.org/en/community/program/) is a program that encourages community members and open source enthusiasts to contribute, share experiences, and exchange resources. Through openEuler Call for X, you can participate in community by sharing your valuable experiences and contribute technical tutorials.

Contact: [events@openeuler.sh](mailto:events@openeuler.sh)

#### 4.3.2 Other Community Work

- Participating in community communication through [mailing lists](https://www.openeuler.org/en/community/mailing-list/) and [community forum](https://forum.openeuler.org/), helping new members engage and contribute to the community

- Maintaining community communication tool and organizing community meetings

- Participating in community conference organization as an openEuler evangelist, including meetups, live broadcast, and openEuler Developer Day.

- Participating in community publicity, promotion, and content creation, including [document bug catching](https://docs.openeuler.org/en/), [blog writing](https://www.openeuler.org/en/interaction/blog-list/), and [success story writing](https://www.openeuler.org/en/showcase/).

- Participating in community infrastructure construction by joining the [infrastructure SIG](https://www.openeuler.org/en/sig/sig-detail/?name=Infrastructure)

- Participating in community visual design by joining the [OpenDesign SIG](https://www.openeuler.org/en/sig/sig-detail/?name=sig-OpenDesign)

- Participating in community translation by joining the [G11N SIG](https://www.openeuler.org/en/sig/sig-detail/?name=G11N)

## 5. Grow with the Community

- openEuler TC

  The openEuler TC makes technical decisions and coordinates technical resources. For details, see the [TC home page](https://www.openeuler.org/en/sig/sig-detail/?id=21&name=TC&mail=dev%40openeuler.org).

- Community roles

  Everyone in the community plays an important part. Roles differ in terms of responsibilities and permissions. Grow, accumulate experience, and gain influence by contributing to the community. For details about roles, responsibilities, and permissions, see [Role Description](https://www.openeuler.org/en/sig/role-description/).

</div>

<style lang="scss" scoped>
.word {
  margin-top: var(--o-spacing-h2);
  max-width: 1416px;
  li::marker {
    color: var(--o-color-text1) !important;
  }
 a {
    color: var(--o-color-link1);
    word-break: break-word ;
  }
  .care {
    color: var(--o-color-red5);
  }
  @media screen and (max-width: 769px) {
    padding: var(--o-spacing-h5);
  }
}
</style>

---
title: 'Characters'
---

<script setup lang="ts">
import { computed } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import BannerLevel2 from '@/components/BannerLevel2.vue'
import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-role.png';
const tableData = [
  {
    SigName: 'Contributor',
    Gitee: 'Contributors of the project',
    IRC: 'Registered members on Gitee'
  },
  {
    SigName: 'Committer',
    Gitee: 'Review and approve the contributions submitted',
    Email: 'Frequently contributing to SIG, experienced,and willing to undertake review work',
    IRC: 'developer entry in the OWNERS file owned by openEuler SIG。'
  },
  {
    SigName: 'Maintainer',
    Gitee: 'Owner of the project',
    Email: 'Experienced, responsible, outstanding technologies and management skills',
    IRC: 'developer entry in the OWNERS file owned by openEuler SIG'
  }
]
const screenWidth = useWindowResize();
const isMobile = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});
</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    background-text="SIG"
    title="Role Description"
    :illustration="illustration"
  />
</ClientOnly>

<div :class="['markdown', isMobile ? 'markdown-mo' : '']">

<div class="top">Community Member</div>

This article briefly describes the responsibilities and privilege of the contributor in the openEuler community. The responsibilities of most contributor are limited to SIG (Special Interest groups) :

<OTable :data="tableData" v-show="!isMobile" class="duty-table">
  <OTableColumn prop="SigName" label="Role"/>
  <OTableColumn prop="Gitee" label="Responsibilities"/>
  <OTableColumn prop="Email" label="Requirement"/>
  <OTableColumn prop="IRC" label="Defined Document"/>
</OTable>

<div class="mo-card" v-show="isMobile">
  <div
    v-for="(item,index) in tableData"
    :key="item.SigName"
    :class="['mo-card-item', index === 1 ? 'mo-card-middle' : 'mo-card-sides' ]">
    <div class="mo-card-item-text">
      <p class="text-title">Role：</p>
      <p class="text-content">{{ item.SigName }}</p>
    </div>
    <div class="mo-card-item-text">
      <p class="text-title">Responsibilities：</p>
      <p class="text-content">{{ item.Gitee }}</p>
    </div>
    <div class="mo-card-item-text">
      <p class="text-title">Requirement：</p>
      <p class="text-content">{{ item.Email }}</p>
    </div>
    <div class="mo-card-item-text">
      <p class="text-title">Defined Document：</p>
      <p class="text-content">{{ item.IRC }}</p>
    </div>
  </div>
</div>

Description：The permissions of Maintainer and Committer are the same on Gitee, and the difference lies in the scope of SIG governance. The detailed informationes are described below.

## New Contributor

Welcome to join the community. Start contributing by referring to:
<a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" class="link">contribution guidience</a>

## Existing Community Member

Existing community members should follow the principles in this article and be familiar with SIG's organization, roles, policies, software, and etc. At the same time, they should have corresponding technical and writing skills. The detailed informatione of responsibilities and requirements of the community member are described below.

## Contributor

Contributors are people who frequently contribute to the community. They take part in SIG group activities, resolve questions, review PR, and complete tests before submitting the PR.

### Requirement

- Registered member on Gitee

- Contribute to SIG or community in many ways, including but not limited to:：

  - Submitting or reviewing PR(Pull Request) on Gitee

  - Documenting or commenting issues on Gitee
  - Participating in SIG or community discussions

- Read
  <a href="https://gitee.com/openeuler/community/blob/master/zh/contributors/README.md" class="link">Contribution Guideline</a>
- Join one or more SIGs

### Responsibility and Powers

- Respond to assigned issues and PR(Pull Request)

- Contributed code should satisfy the criteria described below

  - Well tested

  - Passing the test correctly and completely
  - Resolving subsequent errors or problems

- Agree PR by executing '/ lgtm'
- Assign issue or PR, ask memebers to comment by execting/assign @username
- Run PR test automatically. /ok-to-test is not necessary
- Operate the PR with needs-ok-to-test label by execting /ok-to-test and close PR by execting /close.

Note: Contributors should actively take part in code review and if they'd like to help more, strive to be a Committer of SIG.

## Committer

Committers can review the quality and correctness of code in SIG or some parts of SIG. Committers should have a good knowledge of code repository and software engineering principles.

Definition：developer entry in the OWNERS file owned by each SIG

### Requirement

- Have worked in openEuler for At least 3 months as contributors

- Participated in at least 6 PR reviews as the main reviewer
- Review or merge at least 30 PR into the code repo
- Being Familiar with code repo
- Can be self-nominated or nominated by the committers or maintainer of the SIG

### Responsibility and Privilege

- Review PR：Review the PR submitted by contributor. The review can refer to community coding suggestions and [openEuler Secure Coding Guide](https://gitee.com/openeuler/security-committee/blob/master/guide/SecureCoding_en.md).

- Distribute and deal with problems:Please refer to [Issue Submission and Handling Guide](https://gitee.com/openeuler/community/blob/master/en/contributors/issue-submit.md).
- Tracking dependency issues：In the development branch, software package's dependencies in the SIG may be broken due to the software package updates in other SIG. At this time, the Committer will receive an alert. Then, the committer should try to rebuild the software package. Because dependency problem may prevent users from updating the system, the build team will also participates in rebuilding packages that have dependency issues, but the Maintainer should not rely on these works.
- Notify SIG that may be affected due to interface changes：Because other SIGs or projects rely on software package of this SIG, changes to the package interface may affect them. Maintainer should review the dependency impact caused by decision changes. Then Maintainer should announce and send alert emails of API or ABI changes. Those work should be completed at least one week before the change occurs, and all SIGs that may be affected should be notified. For detailed informationes please refer to [API Change Notification Process]().
- Update and maintain package version：Follow the startegy of [Software Package Update Quality Control Policies]() and complete the package update.
- Collaborate with upstream community, including:

  - Push all changes to upstream community

  - Participate in upstream community mailing list
  - Get the account of the Bug Tracker of the upstream community, and track the important bugs of the upstream community
  - Push serious errors to upstream community for help For further information, please refer to [ Upstream Software Package Management Suggestions]()

- Collaborate with test team including:

  - When you submit the software packages, the information how to debug and classify the packages should be provided to QA for problem classification

  - Provide basic functional test cases for regression testing
  - When you update the software package, the test cases related to fixed problems in the update package should be provided to QA

## Maintainer

Maintainer is the leader of SIG group or member of management Committee, and also the maintainer of software package. They can review and approve code like committers. The key of code review is the code quality and correctness, while the approvals focus on overall acceptance of contributions. Maintainer has all the responsibility and privilege of Committer . In addition, Maintainer is also need to work out technical roadmap and undertake coordination within and outside the team.

Definition：developer entry in the OWNERS file owned by openEuler SIG.

### Requirement

- At least 3 months as committer

- Participated in at least 12 PR reviews as the main reviewer
- Review or merge at least 30 basic PR into the code repo
- Being familiar with code repo
- Could be self-nominated or nominated by sub-project Maintainer, and there is no objection from other sub-project Maintainers.

### Responsibility and Power

- Work out technical roadmap for SIG project：Including planning the SIG technical direction, roadmap, solution of software architecture evolution

- Prepare release plan for SIG project: Make key requirements and release plans for project;Participate in community PM activities and coordinate SIG initiatives to match community release milestone schedules
- Participate in community coordination activities：As a representative of SIG, Maintainer should attend the meetings and activites organized by Technical committee or the Community Council
- Organize SIG meetings：Regularly organize SIG meetings and make decisions on contentious issues within SIG


</div>

<style scoped lang="scss">
  .markdown {
    margin-top: var(--e-spacing-h1);
  }
  .markdown-mo {
    margin-top: var(--e-spacing-h2);
    padding: var(--e-spacing-h5);
  }
  .top {
    font-size: var(--e-font-size-h7);
    font-weight: 500;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
  }
  .duty-table {
    margin-top: var(--e-spacing-h4);
    margin-bottom: var(--e-spacing-h5);
    box-shadow: none;
    :deep(.el-table__header) {
      tr {
        border: none;
      }
    }
    :deep(.el-table__body) {
      border-collapse: separate;
    }
  }
  .link {
    color: var(--e-color-brand1);
  }
  .mo-card {
    margin: var(--e-spacing-h4) 0;
    &-item {
      padding: var(--e-spacing-h5);
      &-text {
        display: flex;
        .text-title {
          white-space:nowrap;
        }
        .text-content {
          color: var(--e-color-text4);
        }
      }
    }
    &-sides {
      background-color: var(--e-color-bg1);
    }
  }
</style>

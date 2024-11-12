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

# Overall Introduction to the openEuler Hardware Compatibility Certification

## Introduction

openEuler provides a series of tools, documents, and operation procedures to help you test the compatibility between openEuler and hardware. If you need to perform compatibility tests on hardware such as servers, perform the following process:

## Compatibility Test Process
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  01
</div>

<div class="content">

###  Apply to join the openEuler community (0.5 days).）
You need to apply to join the openEuler community on the Gitee platform to become a member of the organization. Application address: [https://gitee.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ-en.md](https://gitee.com/openeuler/infrastructure/blob/master/docs/openEuler-Infra-FAQ-en.md).


</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  02
</div>

<div class="content">

###  Apply for a compatibility test (0.5 days).

Send a compatibility test application to the public mailbox ([ oecompatibility@openeuler.org](mailto: oecompatibility@openeuler.org)). The email subject must contain "Apply for a Hardware Compatibility Test". After receiving the email, the SIG will contact you and sign an agreement with you.
Before submit an application, sign the CLA first: [https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340)

</div>

</div>
<!-- ---------------------------------------------------------- -->
<div class='step'>

<div class="order-number">
  03
</div>

<div class="content">

###  Understand the compatibility policies. (0.5 days)

Before performing the compatibility test, understand the openEuler hardware compatibility policies.
[Click here to obtain the document](https://www.openeuler.org/category/support/compatibility/openEuler-compatibility-en.pdf).

</div>

</div>
<div class='step'>

<div class="order-number">
  04
</div>

<div class="content">

###  Create an issue (0.5 days).

After signing the agreement, create an issue under the oec-hardware project ([https://gitee.com/openeuler/oec-hardware ](https://gitee.com/openeuler/oec-hardware )) in the openEuler community and specify the hardware information in the issue. The SIG will give feedback on the issue in a timely manner.

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  05
</div>

<div class="content">

###  Perform the compatibility test (10 days).
After the issue is created, perform the compatibility test. openEuler provides the compatibility test framework and user guide to help you complete the test. [Click here to obtain the user guide](https://gitee.com/src-openeuler/oec-hardware/releases).

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  06
</div>

<div class="content">

###  Submit the result for review (2 days).
After the compatibility test is completed and passed, update the test result to the issue. Send the test result to the public mailbox as instructed by the user guide. Send the application for reviewing the compatibility result to [oecompatibility@openeuler.org](mailto:oecompatibility@openeuler.org) . The email subject must contain "xxx Hardware Compatibility Test Result", where xxx indicates the community issue ID.

</div>

</div>
<!-- ----------------------------------------------------------------------- -->

<div class='step'>

<div class="order-number">
  07
</div>

<div class="content">

###  Release the result (2 days).

The SIG will review the submitted result and add the hardware to the [Compatibility List](/en/compatibility/) after it is approved.

</div>

</div>

</div>
</OTabPane>
<!-- 硬件兼容性整体介绍 -->
<OTabPane :label="i18n.compatibility.COMPATIBILITY_HARDWARE" value="true">

<div class="markdown">

# Hardware Compatibility Testing for openEuler Operating System (Whole System) and "Intel<sup>®</sup> Platform Advanced Technology Validation" Process and Guidelines

### 1.Background of the Validation Service

The OpenAtom-Intel Joint Validation Center (hereinafter referred to as "the Joint Validation Center") is jointly established and operated by the OpenAtom Foundation (hereinafter referred to as "OpenAtom") and Intel (China) Co., Ltd. ("Intel"). To enhance the integration of software and hardware, the Joint Validation Center will conduct hardware compatibility testing for the openEuler community (whole system) (hereinafter referred to as "openEuler Validation") and Intel Platform Advanced Technology Validation (hereinafter referred to as "Intel Validation"). 

OpenAtom is responsible for the openEuler Validation, while Intel is responsible for the Intel Validation. OpenAtom and Intel are each responsible for setting the validation requirements within their respective business scopes, managing the entire validation project, and issuing test letters for the validations they oversee.

### 2.Pre-requisites

2.1	Vendors submitting products for testing must be members of the Intel<sup>®</sup> Partner Alliance.

2.2	The products submitted for testing must be server products after the product validation test (PVT) stage of the submitting vendor, based on 4th generation and later Intel<sup>®</sup> Xeon<sup>®</sup> processors. 

2.3	The products submitted for testing must come pre-installed with an openEuler community release version or a commercial release version of an operating system developed based on the openEuler community release version, as listed on the openEuler official website.


### 3.Validation Application

3.1	Vendors submitting products for testing should apply through the following channels: [the Intel official website](https://www.intel.cn/content/www/cn/en/homepage.html) or [the openEuler community official website](/zh/). By applying for the validation, vendors agree to be governed by this process and guidelines and the Intel<sup>®</sup> Platform Advanced Technology Validation Terms and Conditions.

### 4.Technical Validation

4.1	Vendors submitting products for testing must bear the cost of shipping and insurance to send the products and materials to the designated address of the Joint Validation Center, contact person **Kou Yu**, phone number **17600801705**, address **B1, Building 8, Courtyard 8, Kegu 1st Street, Tongzhou District, Beijing**. After receiving the application from the vendor through the above channels and the product for testing, the Joint Validation Center will conduct the validation according to the application scope. 

4.2	After the testing is completed, the vendor retrieves the product. 

4.3	During the period that the Joint Validation Center has possession of the product, it will exercise reasonable care. The Joint Validation Center is only liable for direct economic losses caused by its own intentional actions or gross negligence, up to a maximum of RMB 18,000, and does not assume liability for any other losses. Therefore, the Joint Validation Center strongly recommends that vendors purchase adequate insurance for the products submitted for testing.

4.4	To complete the validation, the Joint Validation Center will entrust OpenAtom with the setup and arrangement of the products in the validation center; OpenAtom is responsible for the openEuler Validation, and Intel is responsible for the Intel Validation. OpenAtom or Intel will install and run the test suite according to the [openEuler Compatibility Agreement](https://certification.openeuler.org/#/compatibilityProtocol). or the [Intel Validation Specification](/en/compatibility/intel-validation-specification/). and the Intel Platform Advanced Technology Validation Terms and Conditions, and notify the vendor of the validation results in writing.

4.5	If the validation is successful, OpenAtom and Intel will issue their respective "Validation Letters" based on the results.

### 5.Validation by Intel

5.1	The vendor, the Joint Validation Center, OpenAtom, and Intel may all publicly announce and use the "Validation Letter."

</div>

</OTabPane>
</OTab>

</div>


<style lang="scss" scoped> @import './index.scss'; </style>

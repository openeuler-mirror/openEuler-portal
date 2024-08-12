---
title: 'certificate-center'
---

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { withBase } from 'vitepress';

import { useCommon } from '@/stores/common';

import BannerLevel2 from '@/components/BannerLevel2.vue'

import banner from '@/assets/banner/banner-security.png';
import illustration from '@/assets/illustrations/support/vulnerability-reporting.png';

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    background-text="SUPPORT"
    title="Certificate Center"
    :illustration="illustration"
/>
</ClientOnly>

<div class='markdown'>

## Certificate Center
openEuler certificate center is used to store the public key and certificate information used in each system of the community。
| Certificate/Public key    | Format | Certificate Properties           | Generate Time | Expiration Time | Algorithm | Download Link                                                                                                                                                                                                                                                |
| ------------------------- | ------ | -------------------------------- | ------------- | --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| openEuler Shim Default CA | X509   | c813cda25ee2749e5551b8919a0537db | 2023-11-14    | 2053-12-31      | RSA-4096  | download(<a :href="withBase('/certificates/openEuler-x509ca.cer.pem')" download="openEuler-x509ca.cer.pem">pem</a> \| <a :href="withBase('/certificates/openEuler-x509ca.cer.der')" download="openEuler-x509ca.cer.der">der</a>) |

</div>
---
title: '证书中心'
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
    title="证书中心"
    :illustration="illustration"
/>
</ClientOnly>

<div class='markdown'>

## 证书中心
openEuler证书中心用于存放社区各个系统中具体使用的公钥及证书信息。
|  证书/公钥别名 | 格式 | 证书属性 | 启用时间 | 到期时间 | 算法 | 下载地址 |
|  ----------- | --- | ------ | ------ | ----- | ------ | ------- |
|  openEuler Shim Default CA | X509 | c813cda25ee2749e5551b8919a0537db |2023-11-14 | 2053-12-31 | RSA-4096 | <a :href="withBase('/certificates/default-x509ca.cert')" download>证书下载</a> |

</div>

<style lang="scss" scoped>
.table-striped{
    margin-top: 20px;
    td,
    th{
        padding: 16px 0 16px 37px;
    }
}
.pc{
    margin: 20px 0;
    width:100%;
    @media screen and (max-width: 768px) {
        display: none;
    }
}
.mobile{
    display:none;
    @media screen and (max-width: 768px) {
        display: block;
    }
}
</style>
---
title: openEuler移植案例
titleTemplate:  移植操作指南 | openEuler社区官网
head:
  - - meta
    - name: description
      content: openEuler助力企业简单、平稳、高效进行操作系统升级。移植案例移植指南专区涵盖MySQL移植案例、Apache移植指南、Nginx移植指南、Dubbo移植指南。想要了解更多系统迁移案例及移植指南相关信息，欢迎访问openEuler官网。
  # - - meta
  #   - name: keywords
  #     content: openEuler移植案例,linux系统移植,mysql移植方案,apache移植方案,nginx移植方案,mysql数据迁移工具
category: migration
---

<script setup lang="ts">
import { useData } from 'vitepress';
import TheMigrationCase from "@/views/migration/TheMigrationCase.vue";
import seoConfig from '@/data/common/seo';

const { lang } = useData();
</script>

<SeoBox :seo-data="seoConfig[lang]?.migrationCase" />
<p class="migration-transplantation-desc">
  操作系统迁移时，软件也需要同步适配移植，openEuler提下这些典型软件移植指南供参考。如果您也想贡献移植案例参考<a
    href="/zh/migration/contribution/"
    >贡献攻略</a
  >。
</p>
<TheMigrationCase />

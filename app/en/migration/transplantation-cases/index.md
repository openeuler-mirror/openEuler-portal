---
title: openEuler Porting Guide
titleTemplate: Porting Guide | openEuler Official Website
head:
  - - meta
    - name: description
      content: openEuler helps enterprises upgrade their OSs in a simple, stable, and efficient manner. It provides porting guides for a wide array of scenarios, including MySQL, Apache, Nginx, and Dubbo. For more information about system migration cases and porting guides, visit the openEuler official website.
  # - - meta
  #   - name: keywords
  #     content: openEuler porting cases, Linux system porting, MySQL porting solution, Apache porting solution, Nginx porting solution, MySQL data migration tool
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
      openEuler provides typical software porting guides to fit most deployment needs. You can also contribute your successful migration cases. For details, see <a
        href="/en/migration/contribution/"
        >Contribution Guide</a
      >.
    </p>
<TheMigrationCase />

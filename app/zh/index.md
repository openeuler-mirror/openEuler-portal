---
title: openEuler
titleTemplate: 开源社区 | openEuler社区官网
head:
  - - meta
    - name: description
      content: openEuler是一个开源、免费的 Linux 发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler 也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。想要了解更多信息，欢迎访问openEuler官网。
  - - script
    - { type: "application/ld+json" }
    - |
      [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "openEuler社区",
          "alternateName": "openEuler",
          "url": "https://www.openeuler.org/zh/",
          "logo": "https://www.openeuler.org/assets/logo.XeUCiAZu.svg",
          "description": "openEuler是一个开源、免费的 Linux 发行版平台，通过开放的形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@openeuler.io",
            "contactType": "customer service"
          },
          "parentOrganization": {
            "@type": "Organization",
            "name": "开放原子开源基金会",
            "alternateName": "OpenAtom Foundation"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "openEuler",
          "applicationCategory": "Operating System",
          "operatingSystem": "Linux",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CNY",
            "description": "openEuler社区版完全免费开源"
          },
          "description": "面向数字基础设施的开源操作系统，支持服务器、云计算、边缘计算、嵌入式四大场景，支持ARM、x86、RISC-V、LoongArch、PowerPC、SW-64六种处理器架构。",
          "softwareVersion": "24.03 LTS SP3",
          "releaseNotes": "https://www.openeuler.org/zh/",
          "downloadUrl": "https://www.openeuler.org/zh/download/",
          "license": "https://license.coscl.org.cn/MulanPSL2",
          "aggregateRating": {
            "@type": "AggregateRating",
            "description": "中国服务器操作系统市场占有率 36.8%（2023年）"
          },
          "featureList": [
            "支持多样性设备",
            "全量组件原子化，构建服务自助化",
            "覆盖全场景应用",
            "一次开发，覆盖数字基础设施全场景",
            "完整开发工具链",
            "统一API跨多设备调用"
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "首页",
              "item": "https://www.openeuler.org/zh/"
            }
          ]
        }
      ]
  # - - meta
  #   - name: keywords
  #     content: openEuler,开源Linux系统,linux开源社区,开源社区,Linux迁移,openEuler社区官网
---

<script setup lang="ts">
  import TheHome from "~@/views/home/TheHome.vue"
</script>

<TheHome />

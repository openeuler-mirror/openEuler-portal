---
title: '查看SIG'

head:
  - - meta
    - property: "og:title"
      content: "openEuler SIG 中心 | 100+ 特别兴趣小组目录"
  - - meta
    - property: "og:description"
      content: "浏览 openEuler 社区全部 SIG 组，查询成员、代码仓库、申请流程和会议安排。任何人均可参与这一开源操作系统项目。"
  - - meta
    - property: "og:image"
      content: "https://www.openeuler.org/assets/og-sig-center.png"
  - - meta
    - property: "og:type"
      content: "website"
  - - meta
    - property: "og:url"
      content: "https://www.openeuler.org/zh/sig/sig-list/"
  - - meta
    - property: "og:site_name"
      content: "openEuler 社区"
  - - meta
    - property: "og:locale"
      content: "zh_CN"

  - - script
    - { type: "application/ld+json" }
    - |
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "openEuler 社区",
        "alternateName": "openEuler Community",
        "url": "https://www.openeuler.org",
        "logo": "https://www.openeuler.org/assets/logo.png",
        "foundingDate": "2020",
        "parentOrganization": {
          "@type": "Organization",
          "name": "开放原子开源基金会",
          "alternateName": "OpenAtom Foundation",
          "url": "https://openatom.cn"
        },
        "description": "openEuler 是由开放原子开源基金会孵化的全场景开源操作系统，面向服务器、云计算、边缘计算、嵌入式四大核心场景"
      }
  - - script
    - { type: "application/ld+json" }
    - |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "什么是 openEuler SIG 组？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "openEuler SIG（Special Interest Group，特别兴趣小组）是 openEuler 开源社区的基本协作单元，每个 SIG 专注于特定技术领域的代码维护、评审和版本发布工作。"
            }
          },
          {
            "@type": "Question",
            "name": "如何申请加入 openEuler SIG 组？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "加入现有 SIG 只需向该 SIG 仓库提交 PR 即可开始贡献。创建新 SIG 需向 openEuler/community 仓库提交申请 PR，经 TC 审核后约 2 周获批。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler 有多少个 SIG 组？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "截至 2025 年，openEuler 社区共设有 100 余个 SIG 组，覆盖内核、虚拟化、云原生、嵌入式、AI、安全等核心技术领域。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler SIG 组的角色有哪些？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SIG 组主要角色包括：Maintainer（维护者，负责最终代码合并）、Committer（提交者，有特定范围合并权限）、Contributor（贡献者，通过 PR 参与贡献）。"
            }
          }
        ]
      }
  - - script
    - { type: "application/ld+json" }
    - |
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "openEuler SIG 组列表",
        "description": "openEuler 社区完整的 SIG 组目录，包含各 SIG 的成员、代码仓库和会议信息",
        "url": "https://www.openeuler.org/zh/sig/sig-list/",
        "publisher": {
          "@type": "Organization",
          "name": "openEuler 社区"
        },
        "inLanguage": "zh-CN",
        "isPartOf": {
          "@type": "WebSite",
          "name": "openEuler 官网",
          "url": "https://www.openeuler.org"
        }
      }
---

<script setup lang="ts">
  import TheSig from "~@/views/sig/TheSig.vue"
</script>

<TheSig />

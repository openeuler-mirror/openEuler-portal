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
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "openEuler 是什么操作系统？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "openEuler 是由开放原子开源基金会孵化及运营的开源 Linux 操作系统，前身是华为 EulerOS。它面向服务器、云计算、边缘计算、嵌入式四大场景，支持 ARM、x86、RISC-V、LoongArch、PowerPC、SW-64 六种处理器架构，是中国服务器操作系统市场占有率最高的开源发行版（36.8%，2023年）。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler 是免费的吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "是的。openEuler 社区版完全免费开源，采用木兰宽松许可证（Mulan PSL）。商业支持版本由麒麟软件、统信软件等合作伙伴提供，可按需购买商业服务。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler 支持哪些 CPU 架构？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "openEuler 24.03 LTS 支持六种主流处理器架构：ARM（含鲲鹏）、x86_64、RISC-V、LoongArch（龙芯）、PowerPC 和 SW-64（申威）。RISC-V 已在 24.03 LTS 中与 x86 和 ARM 并列成为主流支持架构。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler 与 CentOS 有什么区别？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "openEuler 是 CentOS 停服后主流的国产替代选项之一。主要区别：① openEuler 由开放原子基金会治理，CentOS 由红帽控制；② openEuler 支持 6 种架构（CentOS 主要支持 x86/ARM）；③ openEuler 内置 AI 原生优化框架（A-Tune、MindSpore 等）；④ openEuler 提供专门的迁移工具 x2openEuler，支持从 CentOS 7/8 平滑迁移。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler 的社区规模有多大？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "截至 2024 年底，openEuler 社区拥有超过 385 万用户、21,000 名以上活跃开发者、1,944 家成员单位，累计 Pull Request 超 20 万次。2,079 款硬件和软件产品已通过 openEuler 兼容性认证。"
            }
          },
          {
            "@type": "Question",
            "name": "openEuler 适合用于 AI 工作负载吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "是的。openEuler 24.03 LTS 是首个 AI 原生开源操作系统，原生支持 TensorFlow、PyTorch 框架，提供 CUDA 和昇腾 NPU SDK，并集成 AI 机密计算方案，适用于大模型训练、推理和数据安全场景。"
            }
          }
        ]
      }
  # - - meta
  #   - name: keywords
  #     content: openEuler,开源Linux系统,linux开源社区,开源社区,Linux迁移,openEuler社区官网
---

<script setup lang="ts">
  import TheHome from "~@/views/home/TheHome.vue"
</script>

<TheHome />

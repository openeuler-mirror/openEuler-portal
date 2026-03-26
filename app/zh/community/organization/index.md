---
title: '组织架构'
category: about-us
custom-layout: true
anchor: true

head: 
  - - script
    - { type: '' }
    - |
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://www.openeuler.org/zh/community/organization/",
            "name": "openEuler 社区组织架构",
            "description": "openEuler 社区治理架构全览，包括顾问专家委员会（5位中国工程院院士）、技术委员会（27名委员）、品牌委员会、用户委员会及7个专项工作组，共覆盖140+名治理成员。",
            "inLanguage": "zh-CN",
            "url": "https://www.openeuler.org/zh/community/organization/",
            "isPartOf": {
              "@type": "WebSite",
              "url": "https://www.openeuler.org/zh/",
              "name": "openEuler 社区官网"
            }
          },
          {
            "@type": "Organization",
            "@id": "https://www.openeuler.org/#organization",
            "name": "openEuler 社区",
            "alternateName": ["openEuler", "欧拉操作系统"],
            "url": "https://www.openeuler.org/zh/",
            "description": "openEuler 是由开放原子开源基金会孵化及运营的开源 Linux 操作系统社区，采用多委员会治理架构，覆盖服务器、云计算、边缘计算、嵌入式四大场景。",
            "parentOrganization": {
              "@type": "Organization",
              "name": "开放原子开源基金会",
              "url": "https://www.openatom.org/"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "Linux Foundation",
              "url": "https://www.linuxfoundation.org/"
            },
            "founders": [
              {
                "@type": "Organization",
                "name": "华为技术有限公司",
                "url": "https://www.huawei.com/"
              }
            ]
          },
          {
            "@type": "Person",
            "name": "倪光南",
            "jobTitle": "中国工程院院士",
            "affiliation": {
              "@type": "Organization",
              "name": "中国工程院"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "openEuler 顾问专家委员会"
            }
          },
          {
            "@type": "Person",
            "name": "王怀民",
            "jobTitle": "中国科学院院士",
            "affiliation": {
              "@type": "Organization",
              "name": "中国科学院"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "openEuler 顾问专家委员会"
            }
          },
          {
            "@type": "Person",
            "name": "廖湘科",
            "jobTitle": "中国工程院院士",
            "affiliation": {
              "@type": "Organization",
              "name": "中国工程院"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "openEuler 顾问专家委员会"
            }
          },
          {
            "@type": "Person",
            "name": "邬贺铨",
            "jobTitle": "中国工程院院士",
            "affiliation": {
              "@type": "Organization",
              "name": "中国工程院"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "openEuler 顾问专家委员会"
            }
          },
          {
            "@type": "Person",
            "name": "熊伟",
            "jobTitle": "openEuler 委员会主席",
            "affiliation": {
              "@type": "Organization",
              "name": "华为技术有限公司"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "openEuler 委员会"
            }
          },
          {
            "@type": "Person",
            "name": "胡欣蔚",
            "jobTitle": "openEuler 技术委员会主席，AI 联合工作组组长",
            "memberOf": [
              {
                "@type": "Organization",
                "name": "openEuler 技术委员会"
              },
              {
                "@type": "Organization",
                "name": "openEuler AI 联合工作组"
              }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "openEuler 的治理模式是什么？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "openEuler 采用"委员会 + 工作组"双轨治理模型，由开放原子开源基金会监督。委员会负责社区战略和资源分配；技术委员会（TC）通过公开 RFC 流程处理技术决策；各工作组聚焦品牌、用户、教育、法务、AI、全球化、业务发展、社区运营等具体职能领域。"
                }
              },
              {
                "@type": "Question",
                "name": "openEuler 技术委员会（TC）的职责是什么？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "openEuler 技术委员会（TC）由 27 名委员组成，负责审批新增代码仓和 SIG 组、制定技术标准和 API 规范、处理跨 SIG 架构争议、评审重大版本特性。TC 决策通过公开投票机制进行，所有讨论记录可在 openEuler 邮件列表和 Gitee 上公开查阅。"
                }
              },
              {
                "@type": "Question",
                "name": "openEuler 顾问专家委员会由哪些人组成？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "openEuler 顾问专家委员会由 7 位专家组成，其中包括 5 位中国工程院院士（倪光南、廖湘科、邬贺铨等）和 1 位中国科学院院士（王怀民），以及北京大学教授周明辉和极客邦科技创始人霍太稳。"
                }
              },
              {
                "@type": "Question",
                "name": "如何参与 openEuler 社区治理？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "参与 openEuler 治理有以下路径：① 通过 SIG 组贡献代码，积累 Committer/Maintainer 身份后可被提名为 TC 委员；② 代表企业申请成为 openEuler 成员单位，参与委员会选举；③ 作为商用用户申请加入用户委员会；④ 参与各工作组的开放活动。"
                }
              },
              {
                "@type": "Question",
                "name": "openEuler AI 联合工作组具体做什么？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "openEuler AI 联合工作组（32 名成员）负责将 openEuler 打造为 AI 原生操作系统，核心工作包括：昇腾 NPU 和 GPU 驱动上游化、MindSpore/PyTorch/TensorFlow 框架与 OS 的深度集成优化、AI 机密计算基础设施建设，以及面向大模型训练和推理场景的内核调优。"
                }
              },
              {
                "@type": "Question",
                "name": "openEuler 背后有哪些企业支持？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "openEuler 委员会成员来自华为、麒麟软件、统信软件、中国科学院软件研究所、英特尔中国、聚变数字、天翼云、软通动力、南方电网数字电网、江苏润和软件、中国移动、联通数字科技等 12 家主要机构。"
                }
              },
              {
                "@type": "Question",
                "name": "openEuler 的全球化进展如何？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "openEuler 已成为 Linux Foundation 的 Associate Member，并与 Linaro、OpenChain、OpenHPC、OpenInfra 等国际开源组织建立了合作关系。全球化工作组负责国际社区建设，AI 联合工作组中已有 Andrew Wafaa、Fred Huang 等国际社区成员参与。"
                }
              },
              {
                "@type": "Question",
                "name": "openEuler 委员会的任期和遴选标准是什么？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "委员会成员的任期和遴选标准由 openEuler 社区章程规定，具体条款可参见 openEuler 官网"社区章程"页面。成员通常通过成员单位提名和委员会投票确认产生。"
                }
              }
            ]
          }
        ]
      }
---

<script setup lang="ts">
  import TheOrganization from "@/views/organization/TheOrganization.vue"
</script>

<TheOrganization />

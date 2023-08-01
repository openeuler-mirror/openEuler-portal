<script setup lang="ts">
import { ref } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/category/honor/banner.jpg';
import illustration from '@/assets/category/honor/ill.png';
import bgImg from '@/assets/category/honor/bg-right.png';

import certificateImg1 from '@/assets/category/honor/certificate1.png';
import certificateImg2 from '@/assets/category/honor/certificate2.jpeg';
import certificateImg3 from '@/assets/category/honor/certificate3.png';

import jiangxinyu from '@/assets/category/honor/personal/jiangxinyu.png';
import licihua from '@/assets/category/honor/personal/licihua.png';
import liufushou from '@/assets/category/honor/personal/liufushou.png';
import liuxin from '@/assets/category/honor/personal/liuxin.png';
import liweigang from '@/assets/category/honor/personal/liweigang.png';
import tianjun from '@/assets/category/honor/personal/tianjun.png';
import xiashenlin from '@/assets/category/honor/personal/xiashenlin.png';
import xuyanqi from '@/assets/category/honor/personal/xuyanqi.png';
import zhanglin from '@/assets/category/honor/personal/zhanglin.png';
import zhengzengkai from '@/assets/category/honor/personal/zhengzengkai.png';

import IconChecked from '~icons/app/icon-checked.svg';
import IconUnchecked from '~icons/app/icon-unchecked.svg';
import IconRight from '~icons/app/icon-arrow-right.svg';

const honorData = {
  title: '社区荣誉',
  readNews: '查看新闻',
  viewCertificate: '查看证书',
  timeList: ['2021', '2022', '2023'],
  certificateList2021: [
    {
      name: '2021 软件产业发展十大事件',
      link: '/zh/news/20220510-ruanjian.html',
    },
    {
      name: '2021 软件行业典型示范案例',
      link: '/zh/news/20220510-ruanjian.html',
    },
    {
      name: '2021年软件行业卓越工程师',
      link: '/zh/news/20220510-ruanjian.html',
    },
    {
      name: '可信开源社区评估认证',
      link: '/zh/news/20210527-kexin.html',
    },
    {
      name: '中国软件行业优秀解决方案',
      link: '/zh/news/20210409-hangye.html',
    },
  ],
  certificateList2022: [
    {
      name: '2022世界互联网领先科技成果奖',
      link: 'https://www.openeuler.org/zh/news/20221112-lingxian.html',
      certificate: certificateImg1,
    },
    {
      name: '可信开源社区评估认证（先进级）',
      link: '/zh/news/20220520-kexin.html',
      certificate: certificateImg2,
    },
    {
      name: 'OSCAR尖峰开源项目及开源社区',
      certificate: certificateImg3,
    },
  ],
  certificateList2023: [
    {
      name: '中国软协产业协会多个奖项',
      link: '/zh/news/20230602-award/20230602-award.html',
    },
    {
      name: 'risc-v获奖',
      link: '/zh/news/20230529-riscv.html',
    },
  ],
  award: {
    title: ['欧拉之星', '年度最佳开发者贡献奖'],
    personal: {
      title: '个人奖',
      awardList: [
        {
          name: '夏森林',
          post: ['Huawei', 'Gitee id：@small_leek', 'SIG：Application'],
          img: xiashenlin,
          detail: [
            '1、深度参与社区自研OS统一构建系统的研发，承担核心模块的生产全流程。',
            '2、作为社区若干sig组（desktop/application/epol）的maintainer，检视社区开发者的贡献PR 1000+。',
            '3、解决构建类问题300+，独立解决阻塞镜像构建问题10+。',
            '4、开发了一套版本构建质量巡检及通知工具，辅助社区其他开发者快速识别版本构建类的共性问题，从人工分析小时级优化到分钟级。',
          ],
        },
        {
          name: '郑增凯',
          post: ['Huawei', 'Gitee id：@zhengzengkai', 'SIG：Kernel'],
          img: zhengzengkai,
          detail: [
            '1、作为openEuler Kernel SIG的Maintainer，整体负责 5.10 内核版本维护，和处理器团队密切配合，使openEuler 完整支持主流的处理器。',
            '2、拓展社区 Committer，达到 40+ 人。维护5.10版本，支撑下游大规模使用。',
            '3、改进内核合入流程，Kernel核心代码贡献合入PR 150+，提交需求&问题issue 53个， 发布评审Comment 733次。',
            '4、组织支持 PR 和 CI，改进补丁开发效率。',
          ],
        },
        {
          name: '李次华',
          post: [
            'Huawei',
            'Gitee id：@licihua',
            'SIG：Java、OpenStack、Application',
          ],
          img: licihua,
          detail: [
            'issue评论次数3600+，涉猎广，牵头制定openEuler软件包选型升级规范，开发开源软件生命周期管理工具，协助维护人员升级开源软件。',
          ],
        },
        {
          name: '田俊',
          post: ['Intel', 'Gitee id：@juntianlinux', 'SIG：Kernel、Intel Arch'],
          img: tianjun,
          detail: [
            '担任SIG-Intel Arch Maintainer，在openEuler中完整的支持新一代处理器，涉及补丁 1000+。',
            '代表Intel和带领Intel的开发团队在openEuler社区引入了Intel第三代和第四代Xeon可扩展处理器的支持',
          ],
        },
        {
          name: '江新宇',
          post: [
            '麒麟软件有限公司',
            'Gitee id：@jxy_git',
            'SIG：python-modules',
          ],
          img: jiangxinyu,
          detail: [
            '担任openEuler社区SIG-HA、SIG-oVirt maintainer及SIG-CloudNative、SIG-ruby Committer，维护社区OS发行版中HA及oVirt软件特性，积极维护社区大量软件包，积极响应社区issue，贡献PR340+，评审数量1100+',
          ],
        },
        {
          name: '刘鑫',
          post: [
            '中国科学院软件研究所',
            'Gitee id：@misaka00251',
            'SIG：RISC-V',
          ],
          img: liuxin,
          detail: [
            '积极参与社区贡献，积极维护社区大量软件包，贡献PR390+，评审数量500+',
          ],
        },
        {
          name: '张琳',
          post: [
            '北京拓林思软件有限公司',
            'Gitee id：@zhang__3125',
            'SIG：GNOME、Desktop',
          ],
          img: zhanglin,
          detail: [
            '在GNOME相关软件包的维护和升级有突出贡献，贡献PR270+，评审数量800+',
          ],
        },
        {
          name: '李伟刚',
          post: ['统信软件技术有限公司', 'Gitee id：@leeffo', 'SIG：DDE'],
          img: liweigang,
          detail: [
            '在DDE桌面系统相关软件包的维护和升级有突出贡献，贡献PR600+，评审数量2000+',
          ],
        },
        {
          name: '刘福寿',
          post: [
            '黑龙江科技大学本科在读',
            'Gitee id：@liufushou',
            'SIG：Release',
          ],
          img: liufushou,
          detail: [
            '1、在5+SIG组社区群中活跃互动答疑，达到每周50+，参与社区Issue讨论，解决了不少新人问题，协助新用户评估 openEuler 在桌面和服务器上应用的可能性，协助 openEuler 小助手将用户向具体 sig 的专用交流群导流，在必要时候为基于 openEuler 的其它商业发行版导流。',
            '2、积极参与开源实习、暑期等，并主动承担一部分社区的传播布道工作。',
            '3、向 Anaconda-Installer 提交了1次PR，解决了系统安装之后网卡没有默认开启的问题。该问题是20.03版本遗留的问题，对许多新用户造成过困扰。',
            '4、向 netboot.xyz这个用户量不少的开源项目提交有关 openEuler 的 PR ，使得国内外 iPXE 用户可以用最简单的方式安装 openEuler 系统（无需下载ISO镜像，全程在线安装）。',
            '5、向 x2openEuler 提交过意见和建议，11月初的时候受邀参与过新版本工具的内测体验。',
            '6、今年3月份 moocstudio 预览版上线时，上报过 BUG，帮助完善其开发。',
          ],
        },
        {
          name: '许彦骐',
          post: [
            '加拿大滑铁卢大学本科在读',
            'Gitee id：@xyq_d48b',
            'SIG：Embedded、Yocto',
          ],
          img: xuyanqi,
          detail: [
            '6个月之内为openEuler Embedded增加嵌入式图形能力奠定了基础，做出了很有益的探索，整个工作质量很高，相关PR正在陆续合入openEuler Embedded的主线。嵌入式图形栈整体比较复杂，涉及组件众多，对基础软件的深度和广度都有一定的要求，在项目执行过程中遇到了一些难点和挑战，许彦琪同学都很好的解决了，期间沟通频繁且顺畅。',
          ],
        },
      ],
    },
    team: {
      title: '团队奖',
      address: '项目地址',
      awardList: [
        {
          name: 'SIG Kernel',
          detail: [
            '2022年新增 20 多位 Committer, 来自 10 余家不同的组织/公司。',
            '顺利发布新一代 5.10 内核，完成多个主流架构处理器支持，包括鲲鹏、兆芯、龙芯、申威、飞腾、Intel、AMD 等。',
            '在云原生调度、内存可靠性、新文件系统、可编程内核等领域孵化多个新技术点，在调度、网络、IO、文件系统等多个核心子系统性能优化，支撑下游商用发行版，在电信、金融等多个核心领域成功应用。',
            '及时修复400余个安全漏洞，发布 140 余个 update 版本，保障下游各个版本及时获得安全更新。改进和优化代码提交合入方式，并通过基础设施，推广到整个社区。',
          ],
          link: 'https://www.openeuler.org/zh/sig/sig-detail/?name=Kernel',
        },
        {
          name: 'SIG Compiler',
          detail: [
            '孵化gcc多版本、A-FOT、bishengjdk-17、bishengjdk-riscv等项目，支持多样性算力生态，包括intel SPR特性、龙芯LoongArch支持等。',
            '完成4个openJDK版本发布，完成KAE Provider、dynamic CDS等特性，支持大数据领域应用性能提升10%，且多数项目已经商用落地。',
          ],
          link: 'https://www.openeuler.org/zh/sig/sig-detail/?name=Compiler',
        },
        {
          name: 'SIG CloudNative',
          detail: [
            '汇聚来自20+企业的超过300位开发者，孵化iSula、CPDS、Eggo、Rubik、KubeOS、NestOS等原创技术项目，涵盖容器运行时、故障监测、部署、资源利用率提升等全栈能力，为用户提供高性能、高可靠的云原生解决方案，已在在金融、互联网、运营商等领域规模落地。',
          ],
          link: 'https://www.openeuler.org/zh/sig/sig-detail/?name=sig-CloudNative',
        },
      ],
    },
  },
  notice:
    '注：根据openEuler社区评奖规则，依据2021年12月1日 ~ 2022年11月30日的贡献进行评选，且展示不分先后顺序。',
};
const activeYear = ref('2023');
const showNumber = ref(-1);
function useClickTab(year: string) {
  activeYear.value = year;
}
function clickBtn(link: string) {
  window.open(link);
}
function clickDetail(index: number) {
  showNumber.value = index;
}
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMUNITY"
    :title="honorData.title"
    :illustration="illustration"
  />
  <ul class="h5-time">
    <li
      v-for="item in honorData.timeList"
      :key="item"
      :class="activeYear === item ? 'active' : ''"
      @click="useClickTab(item)"
    >
      {{ item }}
    </li>
  </ul>
  <AppContent>
    <div class="honor-time">
      <ul class="o-timeline-list pc-time">
        <li
          v-for="item in honorData.timeList"
          :key="item"
          class="o-timeline-item"
          :class="activeYear === item ? 'active' : ''"
          @click="useClickTab(item)"
        >
          <p class="o-timeline-day">{{ item }}</p>
          <IconChecked
            v-if="activeYear === item"
            class="o-timeline-icon"
          ></IconChecked>
          <IconUnchecked v-else class="o-timeline-icon"></IconUnchecked>
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-show="activeYear === '2022'" class="certificate-box">
        <OCard
          v-for="(item, index) in honorData.certificateList2022"
          :key="item.name"
          class="certificate-item"
        >
          <p>{{ item.name }}</p>
          <OButton
            v-if="item.link"
            class="detail-btn"
            type="text"
            animation
            size="nomral"
            @click="clickBtn(item.link)"
          >
            {{ honorData.readNews }}
            <template #suffixIcon>
              <OIcon class="detail-icon"><IconRight /></OIcon>
            </template>
          </OButton>
          <OButton
            class="detail-btn"
            type="text"
            animation
            size="nomral"
            @click="clickDetail(index)"
          >
            {{ honorData.viewCertificate }}
            <template #suffixIcon>
              <OIcon class="detail-icon"><IconRight /></OIcon>
            </template>
          </OButton>
          <img class="bg-right" :src="bgImg" alt="" />
          <div
            v-if="showNumber === index"
            class="certificate"
            @click="clickDetail(-1)"
          >
            <img :class="'img' + index" :src="item.certificate" alt="" />
          </div>
        </OCard>
      </div>
      <div v-show="activeYear === '2021'" class="certificate-box">
        <OCard
          v-for="item in honorData.certificateList2021"
          :key="item.name"
          class="certificate-item"
        >
          <p>{{ item.name }}</p>
          <OButton
            class="detail-btn"
            type="text"
            animation
            size="nomral"
            @click="clickBtn(item.link)"
          >
            {{ honorData.readNews }}
            <template #suffixIcon>
              <OIcon class="detail-icon"><IconRight /></OIcon>
            </template>
          </OButton>
          <img class="bg-right" :src="bgImg" alt="" />
        </OCard>
      </div>
      <div v-show="activeYear === '2023'" class="certificate-box">
        <OCard
          v-for="item in honorData.certificateList2023"
          :key="item.name"
          class="certificate-item"
        >
          <p>{{ item.name }}</p>
          <OButton
            class="detail-btn"
            type="text"
            animation
            size="nomral"
            @click="clickBtn(item.link)"
          >
            {{ honorData.readNews }}
            <template #suffixIcon>
              <OIcon class="detail-icon"><IconRight /></OIcon>
            </template>
          </OButton>
          <img class="bg-right" :src="bgImg" alt="" />
        </OCard>
      </div>
      <div v-show="activeYear === '2022'" class="award-box">
        <h2 v-for="item in honorData.award.title" :key="item">{{ item }}</h2>
        <div class="award-personal">
          <h5>{{ honorData.award.personal.title }}</h5>
          <div class="personal-box">
            <OCard
              v-for="item in honorData.award.personal.awardList"
              :key="item"
              class="personal-item"
            >
              <div class="item-head">
                <img class="item-img" :src="item.img" alt="" />
                <img class="bg-right" :src="bgImg" alt="" />
              </div>
              <div class="item-body">
                <p class="name">{{ item.name }}</p>
                <p v-for="itemPost in item.post" :key="itemPost" class="post">
                  {{ itemPost }}
                </p>
              </div>
              <div class="personal-hover">
                <p class="name">{{ item.name }}</p>
                <div class="detail">
                  <p v-for="itemDetail in item.detail" :key="itemDetail">
                    {{ itemDetail }}
                  </p>
                </div>
              </div>
            </OCard>
          </div>
        </div>
        <div class="award-team">
          <h5>{{ honorData.award.team.title }}</h5>
          <div class="team-box">
            <OCard
              v-for="item in honorData.award.team.awardList"
              :key="item"
              class="team-item"
            >
              <p class="name">{{ item.name }}</p>
              <div class="detail">
                <p v-for="itemDetail in item.detail" :key="itemDetail">
                  {{ itemDetail }}
                </p>
              </div>
              <OButton
                class="address-btn"
                type="text"
                animation
                size="nomral"
                @click="clickBtn(item.link)"
              >
                {{ honorData.award.team.address }}
                <template #suffixIcon>
                  <OIcon class="address-icon"><IconRight /></OIcon>
                </template>
              </OButton>
              <img :src="bgImg" alt="" />
            </OCard>
          </div>
        </div>
      </div>
      <p v-show="activeYear === '2022'" class="notice">
        {{ honorData.notice }}
      </p>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.honor-time {
  .o-timeline-list {
    max-width: 270px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .o-timeline-item {
      position: relative;
      z-index: 3;
      list-style: none;
      text-align: center;
      cursor: pointer;
      .o-timeline-day {
        font-size: var(--o-font-size-h6);
        color: var(--o-color-text4);
        line-height: var(--o-line-height-h6);
        margin-bottom: var(--o-spacing-h10);
        transition: all 0.2s;
      }
      .o-timeline-icon {
        cursor: pointer;
        width: var(--o-font-size-h5);
        height: var(--o-font-size-h5);
        color: var(--o-color-text4);
        display: inline-block;
        background-color: var(--o-color-bg1);
        transition: all 0.2s;
      }
      &.active .o-timeline-day,
      &.active .o-timeline-icon {
        color: var(--o-color-brand1);
      }
    }
    &::after {
      width: 86%;
      height: 2px;
      background-color: var(--o-color-neutral11);
      content: '';
      display: block;
      position: absolute;
      top: 43px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  }
  .pc-time {
    @media (max-width: 768px) {
      display: none;
    }
  }
}
.h5-time {
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--o-color-bg2);
    height: 34px;
  }
  li {
    font-size: var(--o-font-size-text);
    line-height: 34px;
    color: var(--o-color-text1);
    &:nth-of-type(1) {
      margin-right: 20px;
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: transparent;
    }
  }
  .active {
    color: var(--o-color-brand1);
    &::after {
      background-color: var(--o-color-brand1);
    }
  }
}
.content {
  margin-top: var(--o-spacing-h3);
  @media (max-width: 768px) {
    margin-top: 0;
  }
  .certificate-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--o-spacing-h4);
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      gap: var(--o-spacing-h5);
    }
    .certificate-item {
      background-image: url(@/assets/category/honor/bg1.png);
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      padding: var(--o-spacing-h2);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h6);
      }
      :deep(.el-card__body) {
        padding: 0;
      }
      p {
        min-height: 52px;
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        font-weight: 500;
        @media (max-width: 768px) {
          max-width: 100%;
          min-height: auto;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .detail-btn {
        margin-top: 26px;
        padding-left: 0;
        padding-bottom: 0;
        @media (max-width: 768px) {
          margin-top: 24px;
          font-size: var(--o-font-size-text);
          padding-bottom: 0;
          padding-top: 0;
        }
        .detail-icon {
          color: var(--o-color-brand1);
          font-size: 16px;
        }
      }
      .bg-right {
        position: absolute;
        width: 36px;
        right: 0;
        top: 0;
        @media (max-width: 768px) {
          width: 28px;
        }
      }
      .certificate {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 72vh;
          position: relative;
          @media (max-width: 768px) {
            width: 80%;
            height: auto;
          }
        }
      }
    }
  }
  .award-box {
    margin-top: var(--o-spacing-h2);
    h2 {
      text-align: center;
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      font-weight: 300;
      color: var(--o-color-text1);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
    .award-personal {
      margin-top: var(--o-spacing-h3);
      @media (max-width: 768px) {
        margin-top: var(--o-spacing-h6);
      }
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        color: var(--o-color-text1);
        text-align: center;
        font-weight: 400;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .personal-box {
        margin-top: var(--o-spacing-h4);
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--o-spacing-h4);
        @media (max-width: 768px) {
          grid-template-columns: repeat(1, 1fr);
          gap: var(--o-spacing-h5);
        }
        .personal-item {
          width: 100%;
          position: relative;
          :deep(.el-card__body) {
            padding: 0;
          }
          .item-head {
            position: relative;
            background: url(@/assets/category/honor/bg2.png) no-repeat;
            background-size: cover;
            text-align: center;
            padding: var(--o-spacing-h2) 0;
            @media (max-width: 768px) {
              padding: var(--o-spacing-h5) 0;
            }
            .item-img {
              max-width: 122px;
              @media (max-width: 768px) {
                max-width: 82px;
              }
            }
            .bg-right {
              width: 36px;
              position: absolute;
              top: 0;
              right: 0;
              @media (max-width: 768px) {
                width: 28px;
              }
            }
          }
          .item-body {
            padding: var(--o-spacing-h4);
            @media (max-width: 768px) {
              padding: var(--o-spacing-h5);
            }
            .name {
              font-size: var(--o-font-size-h5);
              line-height: var(--o-line-height-h5);
              color: var(--o-color-text1);
              font-weight: 400;
              text-align: center;
              margin-bottom: var(--o-spacing-h5);
              @media (max-width: 768px) {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
                margin-bottom: var(--o-spacing-h8);
              }
            }
            .post {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text4);
              font-weight: normal;
              text-align: center;
              @media (max-width: 768px) {
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
              }
            }
          }
          .personal-hover {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            width: 100%;
            height: 100%;
            padding: var(--o-spacing-h4);
            transition: all 0.2s;
            background-color: var(--o-color-brand1);
            z-index: 9;
            @media (max-width: 768px) {
              padding: var(--o-spacing-h5);
            }
            .name {
              font-size: var(--o-font-size-h5);
              line-height: var(--o-line-height-h5);
              color: #fff;
              text-align: center;
              font-weight: 400;
              @media (max-width: 768px) {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
              }
            }
            .detail {
              margin-top: var(--o-spacing-h5);
              overflow-y: scroll;
              max-height: calc(100% - 48px);
              @media (max-width: 768px) {
                margin-top: var(--o-spacing-h8);
              }
              &::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: var(--o-color-bg2);
                background-color: var(--o-color-brand1);
              }

              &::-webkit-scrollbar {
                width: 6px;
                background-color: var(--o-color-brand1);
              }

              &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: var(--o-color-division1);
              }
              p {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
                color: #fff;
                @media (max-width: 768px) {
                  font-size: var(--o-font-size-tip);
                  line-height: var(--o-line-height-tip);
                }
              }
            }
          }
          &:hover {
            .personal-hover {
              display: block;
              opacity: 0.7;
            }
            .item-body {
              opacity: 0.5;
            }
          }
        }
      }
    }
    .award-team {
      margin-top: var(--o-spacing-h3);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        color: var(--o-color-text1);
        text-align: center;
        font-weight: 400;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .team-box {
        margin-top: var(--o-spacing-h4);
        @media (max-width: 768px) {
          margin-top: var(--o-spacing-h6);
        }
        .team-item {
          width: 100%;
          background: url(@/assets/category/honor/bg3.png) no-repeat;
          background-size: 100% 100%;
          position: relative;
          min-height: 242px;
          position: relative;
          padding: var(--o-spacing-h2);
          @media (max-width: 768px) {
            background: url(@/assets/category/honor/bg3-mobild.png) no-repeat;
            background-size: cover;
            padding: var(--o-spacing-h5) var(--o-spacing-h6);
            min-height: auto;
          }
          :deep(.el-card__body) {
            padding: 0;
          }
          .name {
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
            color: var(--o-color-text1);
            font-weight: 500;
            @media (max-width: 768px) {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
            }
          }
          .detail {
            margin-top: 2px;
            @media (max-width: 768px) {
              margin-top: 8px;
            }
            p {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text4);
              font-weight: 400;
              @media (max-width: 768px) {
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
              }
            }
            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 40px;
            }
          }
          .address-btn {
            position: absolute;
            bottom: 40px;
            padding-left: 0;
            padding-bottom: 0;
            @media (max-width: 768px) {
              font-size: var(--o-font-size-text);
              bottom: 12px;
            }
            .address-icon {
              color: var(--o-color-brand1);
              font-size: 16px;
            }
          }
          & + .team-item {
            margin-top: var(--o-spacing-h4);
          }
          img {
            display: none;
            @media (max-width: 768px) {
              display: inline-block;
              width: 28px;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
  .notice {
    margin-top: var(--o-spacing-h3);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text1);
    width: 100%;
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
  }
}
.dark {
  .content .certificate-box .certificate-item {
    background-image: url(/.vitepress/src/assets/category/honor/bg1-dark-mobile.png);
    background-size: 100% 100%;
    @media (max-width: 768px) {
      background-image: url(/.vitepress/src/assets/category/honor/bg1-dark-mobile.png);
      background-size: cover;
    }
  }
  .content .award-box .award-personal .personal-box .personal-item .item-head {
    background-image: url(/.vitepress/src/assets/category/honor/bg2-dark.png);
    @media (max-width: 768px) {
      background-image: url(/.vitepress/src/assets/category/honor/bg2-dark-mobile.png);
    }
  }
  .content .award-box .award-team .team-box .team-item {
    background-image: url(/.vitepress/src/assets/category/honor/bg3-dark.png);
  }
  img {
    filter: brightness(80%) grayscale(20%) contrast(1.2);
  }
}
</style>

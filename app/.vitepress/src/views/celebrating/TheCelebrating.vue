<script lang="ts" setup>
import { ref, computed } from 'vue';
import { showGuard, useStoreData } from '@/shared/login';
import { useCommon } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';

import bannerMo from '@/assets/category/celebrating/banner-mo.png';
import illustration from '@/assets/category/celebrating/illustration.png';
import giftImg from '@/assets/category/celebrating/gift.png';
import giftImgMo from '@/assets/category/celebrating/gift-mo.png';
import downIllImg1Light from '@/assets/category/celebrating/down-ill1.png';
import downIllImg2Light from '@/assets/category/celebrating/down-ill2.png';
import downIllImg1Dark from '@/assets/category/celebrating/down-ill1-dark.png';
import downIllImg2Dark from '@/assets/category/celebrating/down-ill2-dark.png';
import succeedTipImg from '@/assets/category/celebrating/succeed-tip.png';

const { guardAuthClient } = useStoreData();
const commonStore = useCommon();
const downIllImg1 = computed(() =>
  commonStore.theme === 'light' ? downIllImg1Light : downIllImg1Dark
);
const downIllImg2 = computed(() =>
  commonStore.theme === 'light' ? downIllImg2Light : downIllImg2Dark
);
const data = {
  title: ['下载体验openEuler', '赢开源三周年纪念礼包！'],
  detail: [
    'openEuler 于2019年12月31日正式开源，三年来快速成长，吸引上万开发者加入，迭代了6个版本，已有上百万用户，成为国计民生行业首选的开源操作系统。作为一个面向数字基础设施的开源操作系统，openEuler 已支持服务器、 云计算、边缘计算、嵌入式等应用场景，支持多样性计算，致力于提供安全、稳定、易用的操作系统。',
    '值Celebrating 3 years of openEuler 庆典活动之际，邀您来下载体验openEuler，即有机会获得openEuler 开源三周年纪念礼包！',
  ],
  rule: {
    title: '抽奖规则',
    ruleList: [
      '•  点击下载按钮下载体验openEuler，后台将给参与本次活动的用户按照下载顺序排序，排序尾号为3的朋友即为中奖者，例如从参与本次活动的第1位下载用户计算，第xx3位下载的用户即为中奖者。（限前2000位）',
      '•  奖品为Celebrating 3 years of openEuler定制礼包一份，获奖名单将于12月30日在本页面公示，并邮件提示中奖者。',
    ],
  },
  nameList: [
    'Mrdong_123',
    'zyddyz',
    'kirchhoff',
    'shawncn',
    'DingliZhang',
    'ftboy',
    'riscv',
    'lilong',
    'WangTsing-Yan',
    'yinxx',
    'alonglang ',
    'zlx_sd',
    'HWLB',
    'Vien_Sky',
    'liuming3',
    'J123456',
    'jieXu',
    'liuqiang',
    'szuor8dtrf0yeb17',
    'SmallPegasus',
    'love67890',
    'victorcheung',
    'Camp186',
    'xkp',
    'BaiMax',
    'fanzhicheng',
    'huwei3',
    'xychong123',
    'rectifyingcircuit',
    'A13522806615',
    'xiaoshaeCrocodile',
    'wessonhuang ',
    'cen195',
    'jimmyyu',
    'duyiwei7w',
    'Brace',
    'khdkskho',
    'YINJIAYI',
  ],
  down: {
    title: '即刻体验openEuler',
    btn: '下载赢好礼',
    link: 'https://repo.openeuler.org/openEuler-22.09/docker_img/x86_64/openEuler-docker.x86_64.tar.xz',
  },
  tip: {
    tipText: '下载中，您已计入本次下载体验抽奖名单。附',
    course: 'openEuler安装教程',
    courseLink:
      'https://docs.openeuler.org/zh/docs/22.09/docs/Installation/installation.html',
  },
};
const isTipShow = ref(false);

function onDownBtnClick() {
  if (guardAuthClient.value.photo && guardAuthClient.value.username) {
    isTipShow.value = true;
    window.open(data.down.link, '_self');
  } else {
    showGuard();
  }
}
function onMaskClick() {
  isTipShow.value = false;
}

</script>

<template>
  <div class="celebrating-banner">
    <div class="banner-pc">
      <div class="banner-content">
        <div class="banner-text">
          <p v-for="item in data.title" :key="item">{{ item }}</p>
        </div>
        <div class="ill-img">
          <img :src="illustration" alt="" />
        </div>
      </div>
    </div>
    <img :src="bannerMo" alt="" class="banner-mo" />
  </div>
  <AppContext>
    <div class="celebrating-content">
      <div class="detail">
        <p v-for="item in data.detail" :key="item">{{ item }}</p>
      </div>
      <div class="rule">
        <h3>{{ data.rule.title }}</h3>
        <div class="rule-list">
          <p v-for="item in data.rule.ruleList" :key="item">{{ item }}</p>
        </div>
      </div>
      <div class="down">
        <div class="left">
          <img :src="downIllImg1" alt="" />
          <p>{{ data.down.title }}</p>
        </div>
        <div class="right">
          <OButton
            class="down-btn"
            type="primary"
            animation
            @click="onDownBtnClick"
            >{{ data.down.btn }}</OButton
          >
        </div>
        <img :src="downIllImg2" class="ill-bg" alt="" />
      </div>
      <div class="gift">
        <img :src="giftImg" alt="" class="gift-pc" />
        <img :src="giftImgMo" alt="" class="gift-mo" />
      </div>
      <div class="award">
        <h3>中奖名单</h3>
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>中奖人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.nameList" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppContext>
  <div v-if="isTipShow" class="tip">
    <div class="tip-content">
      <img :src="succeedTipImg" alt="" />
      <div>
        <span>{{ data.tip.tipText }}</span>
        <a
          :href="data.tip.courseLink"
          target="_blank"
          rel="noopener noreferrer"
          >{{ data.tip.course }}</a
        >
      </div>
    </div>
    <div class="mask" @click="onMaskClick"></div>
  </div>
</template>

<style lang="scss" scoped>
.dark .celebrating-banner,
.dark .gift {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.celebrating-banner {
  .banner-pc {
    background-image: url(@/assets/category/celebrating/banner.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 380px;
    width: 100%;
    background-color: var(--o-color-kleinblue6);
    .banner-content {
      max-width: 1504px;
      height: 100%;
      padding: 0 44px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .banner-text {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        p {
          position: relative;
          z-index: 1;
          color: var(--o-color-white);
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
          margin-bottom: 0;
          font-weight: 500;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-h3);
            line-height: var(--o-line-height-h3);
          }
        }
      }
      .ill-img {
        img {
          height: 380px;
          @media (max-width: 1100px) {
            height: 160px;
          }
        }
      }
    }
    @media (max-width: 1100px) {
      height: 256px;
    }
    @media (max-width: 768px) {
      display: none;
    }
    :deep(.banner-text) {
      max-width: 50%;
    }
  }
  .banner-mo {
    display: none;
    @media (max-width: 768px) {
      width: 100%;
      display: inline-block;
    }
  }
}
.celebrating-content {
  .detail {
    padding: var(--o-spacing-h2);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l2);
    @media (max-width: 1100px) {
      padding: var(--o-spacing-h5) var(--o-spacing-h6);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .rule {
    margin-top: var(--o-spacing-h1);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h2);
    }
    h3 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      font-weight: 300;
      text-align: center;
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
    .rule-list {
      margin-top: var(--o-spacing-h2);
      padding: var(--o-spacing-h2);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      background-color: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l2);
      @media (max-width: 1100px) {
        margin-top: var(--o-spacing-h5);
        padding: var(--o-spacing-h5) var(--o-spacing-h6);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
  }
  .down {
    margin-top: var(--o-spacing-h4);
    padding: var(--o-spacing-h4);
    box-shadow: var(--o-shadow-l2);
    background-color: var(--o-color-bg2);
    display: flex;
    justify-content: space-between;
    position: relative;
    @media (max-width: 1100px) {
      padding: var(--o-spacing-h5) var(--o-spacing-h6);
      margin-top: var(--o-spacing-h5);
      display: block;
    }
    .left {
      display: flex;

      align-items: center;
      img {
        height: 74px;
        margin-right: var(--o-spacing-h4);
        @media (max-width: 1100px) {
          display: none;
        }
      }
      p {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text1);
        font-weight: 500;
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      padding-right: var(--o-spacing-h2);
      @media (max-width: 1100px) {
        margin-top: var(--o-spacing-h5);
      }
      .down-btn {
        margin-right: 180px;
        padding: 9px 55px;
        color: #fff;
        @media (max-width: 1100px) {
          margin-right: 0px;
          padding: 3px 14px;
          font-size: var(--o-font-size-tip);
        }
      }
    }
    .ill-bg {
      height: 96px;
      position: absolute;
      right: var(--o-spacing-h2);
      bottom: 0;
      @media (max-width: 1100px) {
        right: 5vw;
      }
    }
  }
  .gift {
    width: 100%;
    margin-top: var(--o-spacing-h4);
    box-shadow: var(--o-shadow-l2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
    }
    img {
      width: 100%;
    }
    .gift-pc {
      @media (max-width: 768px) {
        display: none;
      }
    }
    .gift-mo {
      display: none;
      @media (max-width: 768px) {
        display: inline-block;
      }
    }
  }
  .award {
    width: 100%;
    margin-top: var(--o-spacing-h1);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h2);
    }
    h3 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      font-weight: 300;
      text-align: center;
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
    table {
      width: 100%;
      margin-top: var(--o-spacing-h2);
      border-collapse: collapse;
      text-align: center;
      @media (max-width: 1100px) {
        margin-top: var(--o-spacing-h5);
      }
      thead {
        tr {
          height: 48px;
          color: #fff;
          background-color: var(--o-color-brand1);
          @media (max-width: 1100px) {
            height: 32px;
          }
          th {
            padding: 15px 0;
            text-align: center;
            border: 1px solid var(--o-color-brand1);
            font-size: var(--o-font-size-h8);
            @media (max-width: 1100px) {
              font-size: var(--o-font-size-tip);
              padding: 0;
            }
          }
        }
      }
      tbody {
        tr {
          height: 48px;
          overflow: hidden;
          transition: 0.2s;
          color: var(--o-color-text1);
          @media (max-width: 1100px) {
            height: 32px;
          }
          td {
            padding: 15px 0;
            text-align: center;
            border: 1px solid var(--o-color-brand1);
            font-size: var(--o-font-size-h8);
            @media (max-width: 1100px) {
              font-size: var(--o-font-size-tip);
              padding: 0;
            }
          }
        }
      }
    }
  }
}
.tip {
  .tip-content {
    position: fixed;
    padding: var(--o-spacing-h2);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--o-color-bg2);
    z-index: 9;
    display: flex;
    align-items: center;
    font-size: 18px;
    span {
      color: var(--o-color-text1);
    }
    img {
      height: 32px;
      margin-right: 16px;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.2;
  }
}
</style>

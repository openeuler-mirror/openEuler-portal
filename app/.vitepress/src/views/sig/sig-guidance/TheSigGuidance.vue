<script setup lang="ts">
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';

import AppContext from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-guidance.png';

import sig1 from '@/assets/category/sig/guidance/sig1.png';
import sig2 from '@/assets/category/sig/guidance/sig2.png';
import sig3 from '@/assets/category/sig/guidance/sig3.png';
import sig4 from '@/assets/category/sig/guidance/sig4.png';
import sig5 from '@/assets/category/sig/guidance/sig5.png';
import sig6 from '@/assets/category/sig/guidance/sig6.png';

const LEFT_IMG = [sig1, sig2, sig3];
const RIGHT_IMG = [sig4, sig5, sig6];

const i18n = useI18n();
const configData = useData();
const language = configData.lang;
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="SIG"
    :title="i18n.sig.GUIDANCE_LIST.GUIDE.TITLE"
    :illustration="illustration"
  />
  <AppContext :pc-top="40">
    <div class="application">
      <div class="middle">
        <div
          v-for="(item, index) in i18n.sig.GUIDANCE_LIST.GUIDE.LINE_CONTENT"
          :key="item.LEFT.LEFT_CIRCLE"
          class="middle-item"
        >
          <div
            :class="[
              'middle-item-left',
              index === 0 && language === 'ru' ? 'middle-item-left-ruf' : '',
              index === 1 && language === 'ru' ? 'middle-item-left-rus' : '',
            ]"
          >
            <div class="middle-item-bgdconfig">
              <img :src="LEFT_IMG[index]" />
            </div>
            <div class="middle-item-infoconfig">
              <div class="middle-item-infoconfig-circle">
                <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
              </div>
              <div>
                <span v-if="item.LEFT.LEFT_DESC" style="font-size: 22px">
                  {{ item.LEFT.LEFT_DESC }}
                </span>
                <span>{{ item.LEFT.LEFT_INFO }}</span>
              </div>
            </div>
          </div>
          <div
            :class="[
              'middle-item-right',
              index === 0 ? 'middle-item-right-f' : '',
              index === 0 && language === 'ru' ? 'middle-item-right-ruf' : '',
            ]"
          >
            <div class="middle-item-bgdconfig">
              <img :src="RIGHT_IMG[index]" />
            </div>
            <div class="middle-item-infoconfig">
              <div class="middle-item-infoconfig-circle">
                <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
              </div>
              <div>
                <span v-if="item.RIGHT.RIGHT_DESC" style="font-size: 22px">
                  {{ item.RIGHT.RIGHT_DESC }}
                </span>
                <!-- eslint-disable -->
                <span v-dompurify-html="item.RIGHT.RIGHT_INFO" class="right-info"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="[
          language === 'zh'
            ? 'linebox-zh'
            : language === 'en'
            ? 'linebox-en'
            : 'linebox-ru',
        ]"
      >
        <div class="line-first"></div>
        <div class="line-second"></div>
        <div class="line-third"></div>
        <div class="line-forth"></div>
        <div class="line-fifth"></div>
      </div>
    </div>
  </AppContext>
</template>

<style lang="scss" scoped>
.application {
  .middle {
    position: relative;
    z-index: 90;
    &-item {
      min-height: 154px;
      display: flex;
      align-items: flex-start;
      margin-top: var(--e-spacing-h4);
      justify-content: center;
      @media (max-width: 1080px) {
        display: block;
        margin: var(--e-spacing-h5) auto;
        width: 450px;
      }
      @media (max-width: 780px) {
        width: 100%;
        &:first-child {
          margin-top: 3px;
        }
        &:nth-child(3) {
          margin-bottom: 3px;
        }
      }
      &-left {
        display: flex;
        margin-right: var(--e-spacing-h4);
        min-height: 204px;
        @media (max-width: 1080px) {
          margin-right: 0px;
          margin-bottom: var(--e-spacing-h5);
          min-height: 120px;
        }
      }
      &-left-ruf {
        @media (max-width: 1280px) {
          margin-bottom: 100px;
        }
        @media (max-width: 1080px) {
          margin-bottom: var(--e-spacing-h5);
        }
      }
      &-left-rus {
        position: relative;
        top: 35px;
        @media (max-width: 1280px) {
          top: 0;
        }
      }
      &-right {
        margin-top: 80px;
        display: flex;
        margin-right: var(--e-spacing-h4);
        min-height: 204px;
        @media (max-width: 1080px) {
          margin-right: 0px;
          margin-top: var(--e-spacing-h5);
          min-height: 120px;
        }
      }
      &-right-f {
        margin-top: 100px;
        @media (max-width: 1080px) {
          margin-top: 0px;
        }
      }
      &-right-ruf {
        margin-top: 120px;
        @media (max-width: 1280px) {
          margin-top: 180px;
        }
        @media (max-width: 1080px) {
          margin-top: 0px;
        }
      }
      &-bgdconfig {
        width: 240px;
        background-color: var(--e-color-kleinblue8);
        @media (max-width: 1280px) {
          width: 180px;
        }
        @media (max-width: 1080px) {
          width: 98px;
        }
        img {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 100px;
          object-fit: contain;
          @media (max-width: 1080px) {
            height: 80px;
          }
          @media (max-width: 780px) {
            width: 50px;
          }
        }
      }
      &-infoconfig {
        max-width: 456px;
        background-color: var(--e-color-bg2);
        @media (max-width: 1280px) {
          max-width: 350px;
        }
        @media (max-width: 1080px) {
          width: 300px;
        }
        span {
          color: var(--e-color-text1);
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-h8);
          float: left;
          margin: 0 var(--e-spacing-h4) var(--e-spacing-h4) var(--e-spacing-h1);
          position: relative;
          bottom: var(--e-spacing-h4);
          @media (max-width: 780px) {
            margin: 0 var(--e-spacing-h6) var(--e-spacing-h10)
              var(--e-spacing-h4);
            line-height: var(--e-line-height-tip);
            color: var(--e-color-text4);
            font-size: var(--e-font-size-tip);
            position: relative;
            bottom: 15px;
          }
        }
        &-circle {
          height: 78px;
          width: 78px;
          border: 4px solid var(--e-color-white);
          border-radius: 50%;
          background-color: var(--e-color-kleinblue5);
          position: relative;
          top: 50%;
          transform: translate(-50%, -50%);
          @media (max-width: 780px) {
            height: 36px;
            width: 36px;
            border: 2px solid var(--e-color-white);
          }
          span {
            white-space: nowrap;
            font-size: var(--e-font-size-h5);
            color: var(--e-color-white);
            line-height: var(--e-line-height-h5);
            position: relative;
            top: 50%;
            right: 43%;
            transform: translate(-50%, -50%);
            font-weight: 500;
            @media (max-width: 780px) {
              font-size: var(--e-font-size-tip);
              transform: translate(-30%, -50%);
              line-height: var(--e-line-height-text);
            }
          }
        }
      }
    }
  }
  .linebox {
    &-zh {
      .line-first {
        position: absolute;
        top: 384px;
        left: 47%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
      }
      .line-second {
        position: absolute;
        top: 622px;
        left: 31%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-left: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 610px;
        }
      }
      .line-third {
        position: absolute;
        top: 702px;
        left: 48%;
        height: 50px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 700px;
        }
      }
      .line-forth {
        position: absolute;
        top: 926px;
        left: 31%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-left: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 920px;
        }
      }
      .line-fifth {
        position: absolute;
        top: 1016px;
        left: 48%;
        height: 50px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 1010px;
        }
      }
      @media (max-width: 1080px) {
        display: none;
      }
    }
    &-en {
      .line-first {
        position: absolute;
        top: 375px;
        left: 48%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
      }
      .line-second {
        position: absolute;
        top: 655px;
        left: 31%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-left: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 680px;
        }
      }
      .line-third {
        position: absolute;
        top: 745px;
        left: 48%;
        height: 50px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 770px;
        }
      }
      .line-forth {
        position: absolute;
        top: 1010px;
        left: 31%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-left: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 1050px;
        }
      }
      .line-fifth {
        position: absolute;
        top: 1100px;
        left: 48%;
        height: 50px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          top: 1150px;
        }
      }
      @media (max-width: 1080px) {
        display: none;
      }
    }
    &-ru {
      .line-first {
        position: absolute;
        top: 375px;
        left: 48%;
        height: 100px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          left: 45%;
          height: 200px;
        }
      }
      .line-second {
        position: absolute;
        top: 675px;
        left: 31%;
        height: 100px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-left: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          left: 34%;
          top: 760px;
        }
      }
      .line-third {
        position: absolute;
        top: 800px;
        left: 48%;
        height: 50px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          left: 45%;
          top: 890px;
        }
      }
      .line-forth {
        position: absolute;
        top: 1050px;
        left: 31%;
        height: 94px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-left: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          left: 30%;
          top: 1220px;
        }
      }
      .line-fifth {
        position: absolute;
        top: 1140px;
        left: 48%;
        height: 70px;
        width: 400px;
        border-top: 2px dashed var(--e-color-brand1);
        border-right: 2px dashed var(--e-color-brand1);
        @media (max-width: 1280px) {
          left: 45%;
          top: 1315px;
        }
      }
      @media (max-width: 1080px) {
        display: none;
      }
    }
  }
}
</style>

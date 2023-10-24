<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';

import { useCommon } from '@/stores/common';

import SummitBanner from './components/SummitBanner.vue';
import AppContext from '@/components/AppContent.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import data_zh from './data/data_zh';
import data_en from './data/data_en';

import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

const { lang } = useData();
const isMobile = computed(() =>
  useWindowResize().value <= 768 ? true : false
);

let summitData: any;

if (lang.value === 'zh') {
  summitData = data_zh;
} else {
  summitData = data_en;
}
const dialogVisible = ref(false);
const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
</script>
<template>
  <SummitBanner :banner-data="summitData.banner" />

  <AppContext>
    <div class="introduce">
      <p>{{ summitData.introduce }}</p>
      <p>{{ summitData.introduce2 }}</p>
    </div>
    <div class="visa-btn-box">
      <OButton
        v-if="lang === 'en'"
        @click="dialogVisible = true"
        class="visa-btn"
        size="mini"
        type="primary"
        >Visa Letter Request</OButton
      >
    </div>
    <div class="call-content">
      <a
        v-for="item in summitData.contentList"
        :key="item.link"
        class="content-item"
        :href="item.link"
        target="_blank"
      >
        <img class="pc-img" :src="item.img" :alt="item.name" />
        <img class="mo-img" :src="item.img_mo" :alt="item.name" />
        <div v-if="lang === 'zh'" class="cn-title call-title">
          {{ item.name }}
        </div>
        <div
          class="en-title call-title"
          :class="{ 'in-en-lang': lang === 'en' }"
        >
          {{ item.name_en || item.name }}
        </div>
      </a>
    </div>

    <div v-if="lang === 'zh'" class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.list"
          :key="item.link"
          :href="item.link"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </AppContext>
  <ClientOnly>
    <ODialog
      v-if="lang === 'en'"
      v-model="dialogVisible"
      :show-close="false"
      class="visa-lette-dialog"
      lock-scroll
      close-on-press-escape
      close-on-click-modal
      destroy-on-close
      :width="isMobile ? '85%' : '74%'"
      center
    >
      <template #header>Visa Letter Request</template>
      <div class="visa-letter-request">
        <ul class="letter-content">
          <li>
            openEuler is an open source platform developed and operated by the
            OpenAtom Foundation. The visa invitation letter will be processed by
            the OpenAtom Foundation.
          </li>
          <li>
            Provision of a visa letter by the OpenAtom Foundation does not
            guarantee visa approval, which is made at the sole discretion of the
            government of the event's host country.
          </li>
          <li>
            Visa letter requests should be made 90 days prior to an event and
            may be submitted no fewer than two weeks prior to the event. The
            OpenAtom Foundation cannot guarantee that letters will be provided
            in response to requests submitted fewer than two weeks prior to an
            event, though we will make every effort to process them.
          </li>
          <li>
            The OpenAtom Foundation processes most visa letter requests in (3)
            business days. Please download and complete the form below as
            accurately as possible. Failure to do so may result in a delay to
            the typical processing time.
          </li>
          <li>
            By completing the form below, you are authorizing the OpenAtom
            Foundation and openEuler to use the details you provided as needed
            to process your invitation request.
          </li>
          <li>
            For questions, please contact <a href="mailto:visa@openeuler.sh"
              >visa@openeuler.sh.</a
            >
          </li>
        </ul>
        <div class="step-1">
          <div class="step-title">Step 1</div>
          <div class="step-content">
            Download the application form by clicking the button below.
          </div>
        </div>
        <div class="step-2">
          <div class="step-title">Step 2</div>
          <div class="step-content">
            Fill out the form and attach it to an email to
            <a href="mailto:visa@openeuler.sh">visa@openeuler.sh.</a>
          </div>
        </div>
        <p class="last-letter-content">
          The OpenAtom Foundation processes most visa letter requests in (3)
          business days and then sends the visa letter to your email.
        </p>
      </div>
      <template #footer>
        <a
          href="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/excel/Visa.xlsx"
        >
          <OButton @click="dialogVisible = true" size="mini" type="primary"
            >Download the Application Form
          </OButton>
        </a>
        <div class="footer-text">
          <p>
            You are responsible for ensuring that any individual whose personal
            data you provide (i) is aware that you have provided
          </p>
          <p>
            such information to us for purposes of registration for this event
            and (ii) agrees to
            <a
              href="/en/other/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              >openEuler’s Privacy Policy.</a
            >
          </p>
        </div>
      </template>
    </ODialog>
  </ClientOnly>
</template>
<style scoped lang="scss">
@mixin mobile {
  @media screen and (max-width: 768px) {
    @content;
  }
}

.o-button.o-button-type-primary {
  font-size: var(--o-font-size-h8);
  color: var(--o-color-white);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
  }
}
.visa-letter-request {
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h6);
  font-size: var(--o-font-size-h6);
  word-break: keep-all;
  @include mobile {
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
  }
  .step-1,
  .step-2 {
    margin-top: 16px;
    .step-title {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        height: 2px;
        width: 20px;
        background-color: var(--o-color-brand2);
      }
    }
    .step-content {
      position: relative;
      margin-top: 24px;
      padding: 12px;
      padding-left: 28px;
      line-height: var(--o-line-height-h8);
      font-size: var(--o-font-size-h8);
      background-color: var(--o-color-bg1);
      &::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        left: 16px;
        top: 20px;
        border-radius: 50%;
        background-color: var(--o-color-brand1);
        @media screen and (max-width: 768px) {
          top: 18px;
        }
      }
      @include mobile {
        line-height: var(--o-line-height-tip);
        font-size: var(--o-font-size-tip);
      }
    }
  }
  .letter-content {
    padding-left: 16px;
    list-style-type: disc;
  }
  .last-letter-content {
    margin-top: 24px;
  }
}
.visa-btn-box {
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
}
.visa-btn {
  margin-top: 24px;
  padding-left: 62px;
  padding-right: 62px;
  @media screen and (max-width: 768px) {
    margin-top: 16px;
  }
}
.footer-text {
  margin-top: 24px;
  line-height: var(--o-line-height-text);
  font-size: var(--o-font-size-text);
  @media screen and (max-width: 768px) {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
  }
}
.dark img,
.dark .banner {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;

    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.introduce {
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h6);
  color: var(--o-color-text1);
  p {
    &:last-child {
      margin-top: 24px;
      @include mobile {
        margin-top: 16px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}
.call-content {
  display: grid;
  margin: var(--o-spacing-h1) auto 0 auto;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--o-spacing-h4);
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 270px;
    gap: var(--o-spacing-h4);
  }
  @media screen and (max-width: 768px) {
    margin-top: 40px;
  }
  .content-item {
    position: relative;
    width: 100%;
    display: block;
    width: 100%;
    text-align: center;
    box-shadow: var(--o-shadow-l2);
    &:hover {
      box-shadow: var(--o-shadow-l2_hover);
      @media screen and (max-width: 1100px) {
        box-shadow: var(--o-shadow-l2);
      }
    }
    .call-title {
      width: 100%;
      max-width: 270px;
      top: 19%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 40px;
      color: var(--o-color-white);
      @media screen and (max-width: 1416px) {
        font-size: var(--o-font-size-h3);
      }
      @media screen and (max-width: 768px) {
        max-width: 160px;
        font-size: var(--o-font-size-h5);
      }
    }
    .en-title {
      top: unset;
      bottom: 23%;
    }
    .in-en-lang {
      top: 50%;
      left: 50%;
      bottom: unset;
      transform: translate(-50%, -50%);
    }
    .pc-img {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .mo-img {
      display: none;
      max-width: 270px;
      @media screen and (max-width: 768px) {
        display: inline-block;
      }
    }
    img {
      width: 100%;
    }
  }
}
.previous {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--o-spacing-h6);
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      & + a {
        margin-top: var(--o-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
      }
    }
  }
}
</style>
<style lang="scss">
@media screen and (max-width: 768px) {
  .el-dialog {
    .el-dialog__header {
      padding: 24px 16px;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
    }
    .el-dialog__body {
      padding: 0 16px;
    }
    .el-dialog__footer {
      padding-left: 16px;
      padding-right: 16px;
      @media screen and (max-width: 768px) {
        padding-top: 24px;
        padding-bottom: 24px;
      }
    }
  }
}
</style>

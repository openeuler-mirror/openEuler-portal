<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { useRouter, useData } from 'vitepress';

import {
  getCertification,
  getSendCode,
  downloadCard,
} from '@/api/api-certification';
import { useStoreData } from '@/shared/login';

import IconChevron from '~icons/app/icon-chevron-right.svg';
import IconRequiredFields from '~icons/app/icon-required-fields.svg';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import OInput from 'opendesign/input/OInput.vue';
import AppContent from '@/components/AppContent.vue';

import hcia from '@/assets/category/certification/hcia.png';
import hcie from '@/assets/category/certification/hcie.png';
import hcip from '@/assets/category/certification/hcip.png';

const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();
const { guardAuthClient } = useStoreData();

const imgList: any = {
  OECA: hcia,
  OECP: hcip,
  OECE: hcie,
};
const language = computed(() =>
  lang.value === 'zh' ? 'zh_CN' : lang.value === 'en' ? 'en_US' : 'ru_RU'
);
const notFoundImg = computed(() =>
  commonStore.theme === 'light' ? notFoundImg_light : notFoundImg_dark
);
const router = useRouter();
const isBreadShow = computed(() => (lang.value === 'zh' ? true : false));
// 证书的选择控制
const chooseList = ref([false, false]);
// 查询或下载显示控制
const isDownloadShow = ref(false);
// 邮箱
const emailInput = ref('');
watch(guardAuthClient.value, () => {
  // 若用户未输入邮箱，则使用登录用户的默认邮箱
  if (!emailInput.value) {
    emailInput.value = guardAuthClient.value.email || '';
  }
});
// 提示语
const resultTip = ref('');
const identification = ref('');
// 验证码
const codeInput = ref('');
const codeSuccess = ref(false);
const successTip = ref(false);
const emailReg = new RegExp(
  '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'
);
const resend = computed(() => (lang.value === 'zh' ? '重新发送' : 'Resend'));
const send = computed(() =>
  lang.value === 'zh' ? '发送验证码' : 'Send a verification code'
);
const countSecond = ref(60);
const buttonText = ref('');
buttonText.value = send.value;
// 接收证书信息
const paList: any = ref([]);
// 成功获取验证码后再次获取需等待60s
function handleWaitingEvent() {
  const setWaitingTime = setInterval(() => {
    countSecond.value--;
    buttonText.value = resend.value + '（' + countSecond.value + '）';
    if (countSecond.value === 0) {
      clearInterval(setWaitingTime);
      resultTip.value = '';
      codeSuccess.value = false;
      buttonText.value = send.value;
      countSecond.value = 60;
    }
  }, 1000);
}
// 点击发送验证码
function getCode(params: string, lang: string) {
  // 已成功发送且在60s之内时点击时直接返回不进行再次发送
  if (codeSuccess.value) {
    return;
  }
  if (emailReg.test(emailInput.value.trim())) {
    getCertification(params, lang)
      .then((res) => {
        resultTip.value = res.message;
        if (res.success) {
          handleWaitingEvent();
          identification.value = res.data.identification;
          codeSuccess.value = true;
          successTip.value = true;
        } else {
          successTip.value = false;
          codeSuccess.value = false;
          identification.value = '';
        }
      })
      .catch((error: any) => {
        successTip.value = false;
        codeSuccess.value = false;
        identification.value = '';
        throw new Error(error);
      });
  } else {
    resultTip.value = i18n.value.certification.emailErrorTip;
  }
}
// 接收证书信息
const dataList: any = ref([]);
// 输入验证码后点击确认
function onConfirmationClick(identification: string, codeInput: string) {
  isAgreeTipShow.value = isAgree.value;
  if (emailInput.value && codeInput && isAgree.value) {
    if (identification === '') {
      resultTip.value =
        lang.value === 'zh'
          ? '您输入的验证码或邮箱有误！'
          : 'The verification code or email is incorrect.';
      successTip.value = false;
      return;
    }
    getSendCode(identification, codeInput.trim())
      .then((res) => {
        if (res.success) {
          paList.value = [];
          resultTip.value = res.message;
          isDownloadShow.value = true;
          dataList.value = res.data;
          successTip.value = true;
          res.data.forEach((item: any) => {
            paList.value.push(item.signInfo);
          });
        } else {
          resultTip.value =
            lang.value === 'zh'
              ? '您输入的验证码有误！'
              : 'The verification code is incorrect.';
          successTip.value = false;
        }
      })
      .catch((error: any) => {
        resultTip.value =
          lang.value === 'zh'
            ? '您输入的验证码有误！'
            : 'The verification code is incorrect.';
        successTip.value = false;
        throw new Error(error);
      });
  } else if (!emailInput.value || !codeInput) {
    successTip.value = false;
    resultTip.value =
      lang.value === 'zh'
        ? '邮箱或验证码不能为空！'
        : 'The verification code or email is incorrect.';
  }
}
// 面包屑点击事件
function onBreadcrumbClick() {
  const i = router.route.path.replace('search.html', '');
  router.go(i);
}
// 证书点击选择事件
function selectCertification(index: number) {
  chooseList.value[index] = !chooseList.value[index];
}
// 判断下载链接是否失效
const disabledTip = ref('');
function downloadCertification(paString: string) {
  downloadCard(paString, language.value)
    .then((res) => {
      if (res.success) {
        disabledTip.value = '';
        function dataURLtoBlob(dataurl: any) {
          const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        }
        function blobToFile(theBlob: any, fileName: any) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        const str = 'data:application/pdf;base64,' + res.data.data;
        const blob = dataURLtoBlob(str);
        const file = blobToFile(blob, 'zs');
        const href = URL.createObjectURL(file);
        const downloadElement = document.createElement('a');
        downloadElement.href = href;
        downloadElement.download = res.data.fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      } else {
        disabledTip.value = res.message;
      }
    })
    .catch((error: any) => {
      throw new Error(error);
    });
}
// 点击下载按钮
const showIcon = ref(false);
const existChoose = ref(false);
function handleDownloadingEvent() {
  if (!showIcon.value) {
    showIcon.value = true;
    return;
  }
  existChoose.value = true;
  chooseList.value.forEach((item, index) => {
    if (item) {
      downloadCertification(paList.value[index]);
      existChoose.value = false;
    }
  });
  if (existChoose.value) {
    setTimeout(() => {
      existChoose.value = false;
    }, 500);
  }
}
// 是否同意隐私政策
const isAgree = ref(false);
const isAgreeTipShow = ref(true);
</script>

<template>
  <AppContent>
    <div v-if="lang !== 'zh'" class="breadcrumb">
      <p class="last-page" @click="onBreadcrumbClick">
        {{ i18n.certification.title }}
      </p>
      <span class="separtor">
        <o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">
        <span v-if="!isDownloadShow">{{
          i18n.certification.verificationQuery
        }}</span>
        <span v-else>{{ i18n.certification.certificateDownload }}</span>
      </p>
    </div>
    <div
      v-if="!isDownloadShow"
      class="certificate-search"
      :class="isBreadShow ? '' : 'false'"
    >
      <h2>{{ i18n.certification.verificationQuery }}</h2>
      <div class="search-content">
        <div class="input-box">
          <div class="email-box">
            <div class="left">
              <OIcon>
                <IconRequiredFields />
              </OIcon>
              <span>{{ i18n.certification.email }}</span>
            </div>
            <div class="right">
              <OInput
                v-model="emailInput"
                type="text"
                :placeholder="i18n.certification.placeholderEmail"
              />
              <p class="tip">{{ i18n.certification.tipEmail }}</p>
            </div>
          </div>
          <div class="code-box">
            <div class="left">
              <OIcon>
                <IconRequiredFields />
              </OIcon>
              <span>{{ i18n.certification.verificationCode }}</span>
            </div>
            <div class="right">
              <OInput
                v-model="codeInput"
                type="text"
                :placeholder="i18n.certification.placeholderCode"
              />
              <p class="tip" :class="successTip ? 'success-tip' : 'error-tip'">
                {{ resultTip }}
              </p>
              <OButton
                size="small"
                :class="codeSuccess ? 'await' : ''"
                @click="getCode(emailInput, language)"
                >{{ buttonText }}</OButton
              >
            </div>
          </div>
          <div class="agree-box">
            <el-checkbox v-model="isAgree"
              >{{ i18n.certification.agreeDeclaration }}
              <a :href="'/' + lang + '/other/privacy/'">{{
                i18n.certification.policy
              }}</a>
              <span v-show="!isAgreeTipShow" class="agree-tip">{{
                i18n.certification.agreeTip
              }}</span>
            </el-checkbox>
          </div>
          <div class="button-box">
            <OButton
              size="small"
              @click="onConfirmationClick(identification, codeInput)"
              >{{ i18n.certification.sure }}</OButton
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="certificate-download"
      :class="isBreadShow ? '' : 'false'"
    >
      <h2>{{ i18n.certification.certificateDownload }}</h2>
      <div v-if="disabledTip === ''" class="certificate-box">
        <div class="certificate-item-box" :class="'box-' + dataList.length">
          <div
            v-for="(item, index) in dataList"
            :key="item.iconUrl"
            class="item"
            :class="{
              checked: chooseList[index],
              down: showIcon,
              shakeShow: existChoose,
            }"
            @click="showIcon ? selectCertification(index) : ''"
          >
            <div class="choose-img"></div>
            <div class="item-img">
              <img :src="imgList[item.title[0]]" alt="" />
            </div>
            <div class="item-text">
              <p class="title">{{ item.title[0] }}</p>
              <p class="name">{{ item.title[1] }}</p>
            </div>
          </div>
        </div>
        <OButton size="small" @click="handleDownloadingEvent">{{
          showIcon
            ? i18n.certification.certificateDownload2
            : i18n.certification.certificateDownload
        }}</OButton>
      </div>
      <div v-else class="nofound">
        <img class="nofound-img" :src="notFoundImg" alt="404" />
        <p class="nofound-text">
          {{ disabledTip }}
        </p>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.breadcrumb {
  color: var(--e-color-text1);
  background: var(--e-color-bg1);
  display: flex;
  margin-bottom: var(--e-spacing-h2);
  @media screen and (max-width: 840px) {
    margin-bottom: var(--e-spacing-h5);
  }
  .last-page {
    font-size: var(--e-font-size-tip);
    font-weight: 300;
    color: var(--e-color-text4);
    line-height: var(--e-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--e-spacing-h10);
    .o-icon {
      color: var(--e-color-text1);
    }
  }
  .current-page {
    font-size: var(--e-font-size-tip);
    font-weight: 600;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-tip);
  }
}
.certificate-search {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 840px) {
    margin-top: 0;
  }
  h2 {
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    text-align: center;
    font-weight: 300;
    @media screen and (max-width: 840px) {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
    }
  }
  .search-content {
    margin-top: var(--e-spacing-h1);
    width: 100%;
    background-color: var(--e-color-bg2);
    padding: var(--e-spacing-h2) 0;
    @media screen and (max-width: 840px) {
      margin-top: var(--e-spacing-h7);
      padding: var(--e-spacing-h5);
      min-width: 328px;
    }
    .input-box {
      max-width: 710px;
      margin: 0 auto;
      .email-box {
        display: flex;
        align-items: flex-start;
        max-width: 536px;
        .left {
          display: flex;
          align-items: center;
          width: 136px;
          height: 38px;
          @media screen and (max-width: 840px) {
            height: 24px;
          }
          @media screen and (max-width: 468px) {
            width: 90px;
          }

          .o-icon {
            color: red;
            font-size: var(--e-font-size-h5);
          }
          span {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text1);
          }
        }
        .right {
          position: relative;
          max-width: 400px;
          flex-grow: 1;
          @media screen and (max-width: 840px) {
            .o-input {
              height: 24px;
              font-size: var(--e-font-size-tip);
            }
          }
          @media screen and (max-width: 410px) {
            max-width: 223px;
          }
          .tip {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            color: #ff8d4d;
            margin-top: var(--e-spacing-h8);
            @media screen and (max-width: 840px) {
              display: none;
            }
          }
        }
      }
      .code-box {
        display: flex;
        align-items: flex-start;
        max-width: 536px;
        margin-top: 28px;
        @media screen and (max-width: 840px) {
          margin-top: 40px;
        }
        .left {
          display: flex;
          align-items: center;
          width: 136px;
          height: 38px;
          @media screen and (max-width: 840px) {
            height: 24px;
          }
          @media screen and (max-width: 468px) {
            width: 90px;
          }
          .o-icon {
            color: red;
            font-size: var(--e-font-size-h5);
          }
          span {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text1);
          }
        }
        .right {
          position: relative;
          max-width: 400px;
          flex-grow: 1;
          @media screen and (max-width: 840px) {
            padding-right: 88px;
            .o-input {
              height: 24px;
              font-size: var(--e-font-size-tip);
            }
          }
          @media screen and (max-width: 410px) {
            max-width: 223px;
          }
          @media screen and (max-width: 410px) {
            width: 206px;
          }
          .tip {
            position: absolute;
            bottom: -8px;
            left: 0;
            transform: translateY(100%);
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            color: #ff8d4d;
            @media screen and (max-width: 840px) {
              bottom: -6px;
            }
          }
          .success-tip {
            color: #002fa7;
          }
          .error-tip {
            color: #f3524d;
          }
          .o-button {
            position: absolute;
            right: -24px;
            top: 0;
            transform: translateX(100%);
            height: 38px !important;
            white-space: nowrap;
            height: 100%;
            padding-left: 16px;
            padding-right: 16px;
            justify-content: center;
            @media screen and (max-width: 840px) {
              height: 24px !important;
              right: 0px;
              transform: none;
              background-color: var(--e-color-brand1);
              color: var(--e-color-white);
              font-size: var(--e-font-size-tip);
            }
          }
          .await {
            cursor: not-allowed;
            border: 1px solid var(--e-color-text3);
            color: var(--e-color-text3);
          }
        }
      }
      .agree-box {
        width: 100%;
        margin-top: var(--e-spacing-h2);
        font-size: var(--e-font-size-text);
        :deep(.el-checkbox) {
          height: auto;
          width: 100%;
          justify-content: center;
          .el-checkbox__inner {
            width: 14px;
            height: 14px;
          }
        }
        :deep(.el-checkbox__label) {
          font-size: var(--e-font-size-h9);
          line-height: var(--e-line-height-h9);
          color: var(--e-color-text1);
          position: relative;
          white-space: break-spaces;
          .agree-tip {
            position: absolute;
            bottom: -24px;
            left: -14px;
            color: #f3524d;
          }
        }
        a {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .button-box {
        max-width: 536px;
        margin-top: var(--e-spacing-h2);
        text-align: center;
        @media screen and (max-width: 840px) {
          margin-top: var(--e-spacing-h2);
        }
        .o-button {
          padding-top: 7px;
          padding-bottom: 7px;
          height: 36px;
          @media screen and (max-width: 840px) {
            height: 24px;
            color: var(--e-color-white);
            background-color: var(--e-color-brand1);
            font-size: var(--e-font-size-tip);
          }
        }
      }
    }
  }
}
.certificate-download {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 840px) {
    margin-top: 0;
  }
  h2 {
    margin-top: var(--e-spacing-h2);
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    text-align: center;
    font-weight: 300;
    @media screen and (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-font-size-h8);
    }
  }
  .certificate-box {
    margin-top: var(--e-spacing-h2);
    background-color: var(--e-color-bg2);
    padding: var(--e-spacing-h2);
    text-align: center;
    @media screen and (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
      background-color: var(--e-color-bg1);
      padding: 0;
    }
    .certificate-item-box {
      max-width: 736px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 64px;
      margin: 0 auto;
      @media screen and (max-width: 1100px) {
        max-width: 100%;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 16px;
      }
      .item {
        width: 336px;
        height: 263px;
        border: 1px solid transparent;
        box-shadow: var(--e-shadow-l1);
        position: relative;
        @media screen and (max-width: 1100px) {
          width: 100%;
          height: 98px;
          display: flex;
        }

        .item-img {
          background-color: var(--e-color-bg4);
          padding: 14px 0 10px;
          text-align: center;
          position: relative;
          @media screen and (max-width: 1100px) {
            padding: 12px;
            background-color: var(--e-color-brand1);
          }

          img {
            height: 127px;
            @media screen and (max-width: 1100px) {
              width: 88px;
              height: 70px;
            }
          }
        }
        .item-text {
          padding: var(--e-spacing-h4) 0;
          text-align: center;
          @media screen and (max-width: 1100px) {
            padding-left: var(--e-spacing-h5);
          }
          .title {
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
            color: var(--e-color-text1);
            font-weight: 300;
            @media screen and (max-width: 1100px) {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              text-align: left;
            }
          }
          .name {
            margin-top: var(--e-spacing-h8);
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text1);
            font-weight: 300;
            @media screen and (max-width: 1100px) {
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              color: var(--e-color-text3);
            }
          }
        }
      }
      .down {
        cursor: pointer;
        .choose-img {
          width: 24px;
          height: 24px;
          background-image: url(@/assets/category/certification/unchoose.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 16px;
          top: 16px;
          z-index: 9;
          @media screen and (max-width: 1100px) {
            width: 16px;
            height: 16px;
            left: auto;
            right: 8px;
            top: 8px;
          }
        }
        &.checked {
          border: 1px solid var(--e-color-brand1);
          .choose-img {
            background-image: url(@/assets/category/certification/choose.png);
          }
        }
      }
      .shakeShow {
        animation: shake 0.1s infinite;
      }
      @keyframes shake {
        0%,
        100% {
          transform: translateX(5px);
        }
        10% {
          transform: translateX(5px);
        }
        15%,
        25%,
        35% {
          transform: translateX(-5px);
        }
        20%,
        30%,
        40%,
        50% {
          transform: translateX(-5px);
        }
        55%,
        90% {
          transform: translateX(5px);
        }
      }
    }
    .box-1 {
      max-width: 334px;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (max-width: 1100px) {
        max-width: 100%;
      }
    }
    .box-3 {
      max-width: 100%;
      grid-template-columns: repeat(3, 1fr);
      @media screen and (max-width: 1100px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    .o-button {
      margin-top: var(--e-spacing-h2);
      @media screen and (max-width: 1100px) {
        font-size: var(--e-font-size-tip);
        height: 24px;
        line-height: 24px;
        background-color: var(--e-color-brand1);
        color: var(--e-color-white);
      }
    }
  }
  .nofound {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: var(--e-font-size-h6);
    color: var(--e-color-text1);
    padding: var(--e-spacing-h2) 0;
    min-height: calc(100vh - 339px);
    .nofound-text {
      margin-top: var(--e-spacing-h5);
      font-size: var(--e-font-size-h7);
    }
    .nofound-img {
      height: 300px;
    }
    @media screen and (max-width: 840px) {
      padding-top: var(--e-spacing-h2);
      font-size: var(--e-font-size-text);
      .nofound-img {
        max-height: 232px;
      }
      .nofound-text {
        margin-top: var(--e-spacing-h6);
        font-size: var(--e-font-size-tip);
      }
    }
  }
}
:deep(.el-input__wrapper) {
  @media screen and (max-width: 840px) {
    height: 24px;
  }
}
.false {
  margin-top: 0;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, inBrowser } from 'vitepress';

import {
  DialogActionT,
  OButton,
  ODialog,
  OIcon,
  OSwitch,
  isBoolean,
} from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

// TODO:分析代码整改
import {
  enableOA,
  disableOA,
  reportPV,
  reportPerformance,
} from '@/shared/analytics';

import { setCookie, getCookie, removeCookie } from '~@/utils/common';

import { useCookieStore } from '~@/stores/common';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import IconClose from '~icons/app-new/icon-close.svg';

const route = useRoute();

const { t, isZh } = useLocale();
const { leLaptop, lePadV } = useScreen();

const cookieStore = useCookieStore();

const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN;

// cookie的key
const COOKIE_KEY = 'agreed-cookiepolicy';

// 是否允许分析cookie
const analysisAllowed = ref(false);

// -------------------- cookie状态 --------------------
const COOKIE_AGREED_STATUS = {
  NOT_SIGNED: '0', // 未签署
  ALL_AGREED: '1', // 同意所有cookie
  NECCESSARY_AGREED: '2', // 仅同意必要cookie
};

// 获取cookie状态
const getUserCookieStatus = () => {
  const cookieVal = getCookie(COOKIE_KEY) ?? '0';

  const cookieStatusVal = cookieVal[0];
  const privacyVersionVal = cookieVal.slice(1);

  if (privacyVersionVal !== cookieStore.version) {
    return COOKIE_AGREED_STATUS.NOT_SIGNED;
  }

  if (cookieStatusVal === COOKIE_AGREED_STATUS.ALL_AGREED) {
    return COOKIE_AGREED_STATUS.ALL_AGREED;
  } else if (cookieStatusVal === COOKIE_AGREED_STATUS.NECCESSARY_AGREED) {
    return COOKIE_AGREED_STATUS.NECCESSARY_AGREED;
  } else {
    return COOKIE_AGREED_STATUS.NOT_SIGNED;
  }
};

// 是否未签署
const isNotSigned = () => {
  return getUserCookieStatus() === COOKIE_AGREED_STATUS.NOT_SIGNED;
};

// 是否全部同意
const isAllAgreed = () => {
  return getUserCookieStatus() === COOKIE_AGREED_STATUS.ALL_AGREED;
};

// -------------------- 埋点 --------------------
const initSensor = () => {
  // 百度统计
  (function () {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?ab8d86daab9a8e98cf8faa239aefcd3c';
    const s = document.getElementsByTagName('HEAD')[0];
    s.appendChild(hm);
  })();

  // 分析埋点
  enableOA();
  reportPV();
  reportPerformance();
};

// -------------------- 展示底部提示 --------------------
const isNoticeVisible = ref(false);

// 显示/隐藏cookie提示
const toggleNoticeVisible = (val: boolean) => {
  if (isBoolean(val)) {
    isNoticeVisible.value = val;
  } else {
    isNoticeVisible.value = !isNoticeVisible.value;
  }
};

// -------------------- 同意/拒绝cookie --------------------
// 用户同意所有cookie
const acceptAll = () => {
  cookieStore.status = COOKIE_AGREED_STATUS.ALL_AGREED;
  removeCookie(COOKIE_KEY);
  setCookie(
    COOKIE_KEY,
    `${COOKIE_AGREED_STATUS.ALL_AGREED}${cookieStore.version}`,
    180,
    COOKIE_DOMAIN
  );
  toggleNoticeVisible(false);
  initSensor();
};

// 用户拒绝所有cookie，即仅同意必要cookie
const rejectAll = () => {
  cookieStore.status = COOKIE_AGREED_STATUS.NECCESSARY_AGREED;
  removeCookie(COOKIE_KEY);
  setCookie(
    COOKIE_KEY,
    `${COOKIE_AGREED_STATUS.NECCESSARY_AGREED}${cookieStore.version}`,
    180,
    COOKIE_DOMAIN
  );
  toggleNoticeVisible(false);
};

// -------------------- 展示弹出框 --------------------
const isDlgVisible = ref(false);

// 显示/隐藏弹出框
const toggleDlgVisible = (val: boolean) => {
  if (isBoolean(val)) {
    isDlgVisible.value = val;
  } else {
    isDlgVisible.value = !isNoticeVisible.value;
  }
};

// 弹出框设置
const dlgActions: Array<DialogActionT> = [
  {
    id: 'save',
    color: 'primary',
    label: t('cookie.saveSetting'),
    variant: 'outline',
    size: 'large',
    round: 'pill',
    onClick: () => {
      if (analysisAllowed.value) {
        acceptAll();
      } else {
        rejectAll();
      }

      toggleDlgVisible(false);
    },
  },
  {
    id: 'allowAll',
    color: 'primary',
    label: t('cookie.allowAll'),
    variant: 'outline',
    size: 'large',
    round: 'pill',
    onClick: () => {
      analysisAllowed.value = true;
      acceptAll();
      toggleDlgVisible(false);
    },
  },
];

// 弹窗框关闭
const onDlgChange = (val: boolean) => {
  // 关闭时
  if (!isAllAgreed()) {
    setTimeout(() => {
      analysisAllowed.value = false;
    }, 800);
  }
};

// -------------------- 初次加载 --------------------
if (inBrowser) {
  // 未签署，展示cookie notice
  if (isNotSigned()) {
    toggleNoticeVisible(true);
  }

  if (isAllAgreed()) {
    cookieStore.status = COOKIE_AGREED_STATUS.ALL_AGREED;
    analysisAllowed.value = true;
    initSensor();
  } else {
    disableOA();
  }
}

// -------------------- 路由变化 --------------------
watch(
  () => route.path,
  () => {
    if (isNotSigned()) {
      toggleNoticeVisible(true);
    }

    reportPV();
  }
);
</script>

<template>
  <div v-if="isNoticeVisible" class="cookie-notice">
    <div class="cookie-notice-content">
      <ContentWrapper class="cookie-notice-wrap">
        <div class="cookie-notice-left">
          <p class="cookie-title">{{ t('cookie.title') }}</p>
          <p class="cookie-desc">
            {{ t('cookie.desc') }}
            <a
              :href="isZh ? '/zh/other/cookies/' : '/en/other/cookies/'"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('cookie.link') }}
            </a>
            {{ isZh ? '。' : '.' }}
          </p>
        </div>
        <div class="cookie-notice-right">
          <OButton round="pill" color="primary" @click="acceptAll">
            {{ t('cookie.acceptAll') }}
          </OButton>
          <OButton round="pill" color="primary" @click="rejectAll">
            {{ t('cookie.rejectAll') }}
          </OButton>
          <OButton round="pill" color="primary" @click="toggleDlgVisible(true)">
            {{ t('cookie.manage') }}
          </OButton>
        </div>

        <OIcon class="cookie-notice-close" @click="toggleNoticeVisible(false)">
          <IconClose />
        </OIcon>
      </ContentWrapper>
    </div>
    <ODialog
      v-model:visible="isDlgVisible"
      :size="leLaptop ? 'medium' : 'large'"
      :phone-half-full="lePadV"
      class="cookie-dlg"
      :actions="dlgActions"
      @change="onDlgChange"
    >
      <template #header>
        <span class="cookie-dlg-title">{{ t('cookie.manage') }}</span>
      </template>
      <div class="cookie-dlg-content">
        <div class="content-item">
          <div class="item-header">
            <span class="item-title">{{ t('cookie.necessaryCookie') }}</span>
            <span class="item-extra">{{ t('cookie.necessaryCookieTip') }}</span>
          </div>
          <div class="item-detail">
            {{ t('cookie.necessaryCookieDetail') }}
          </div>
        </div>
        <div class="content-item">
          <div class="item-header">
            <span class="item-title">{{ t('cookie.analyticalCookie') }}</span>
            <span class="item-extra">
              <OSwitch v-model="analysisAllowed"></OSwitch>
            </span>
          </div>
          <div class="item-detail">
            {{ t('cookie.analyticalCookieDetail') }}
          </div>
        </div>
      </div>
    </ODialog>
  </div>
</template>

<style lang="scss" scoped>
.cookie-notice {
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
}

.cookie-notice-content {
  background-color: rgba(var(--o-mixedgray-1), 0.9);
  backdrop-filter: blur(5px);
  box-shadow: var(--o-shadow-1);
}

.cookie-notice-wrap {
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
  position: relative;

  @include respond-to('<=pad_v') {
    padding-top: 16px;
    padding-bottom: 16px;
    flex-direction: column;
    align-items: center;
  }
}

.cookie-notice-left {
  width: 60%;

  @include respond-to('<=pad') {
    width: 58%;
  }

  @include respond-to('<=pad_v') {
    width: 100%;
  }

  .cookie-title {
    @include text1;
    color: var(--o-color-info1);
    font-weight: 500;
    @include respond-to('<=pad_v') {
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }

  .cookie-desc {
    @include tip2;
    color: var(--o-color-info2);
    margin-top: 8px;
  }
}

.cookie-notice-right {
  display: flex;
  align-items: center;
  margin-top: 12px;

  @include respond-to('<=pad_v') {
    width: 100%;
  }

  @include respond-to('<=pad_v') {
    flex-direction: column;
    align-items: center;
  }

  .o-btn {
    @include respond-to('<=pad_v') {
      width: 100%;
    }
  }

  .o-btn + .o-btn {
    margin-left: 16px;

    @include respond-to('<=pad_v') {
      margin-left: 0;
      margin-top: 12px;
    }
  }
}

.cookie-notice-close {
  position: absolute;
  top: 12px;
  right: var(--layout-content-padding);
  @include x-hover;
  cursor: pointer;
  color: var(--o-color-info1);
  transform-origin: center;
  @include h2;

  @include hover {
    color: var(--o-color-primary2);
  }

  &.active {
    color: var(--o-color-primary3);
  }
}

.cookie-dlg {
  .cookie-dlg-title {
    color: var(--o-color-info1);
  }
  .cookie-dlg-content {
    .content-item + .content-item {
      margin-top: 24px;
    }

    .content-item {
      .item-header {
        display: flex;
        align-items: center;
        .item-title {
          @include h4;
          color: var(--o-color-info1);
          font-weight: 500;
        }

        .item-extra {
          display: flex;
          align-items: center;
          @include tip1;
          color: var(--o-color-info3);
          margin-left: 24px;
        }
      }

      .item-detail {
        @include text1;
        color: var(--o-color-info2);
        margin-top: 12px;
      }
    }
  }
}
</style>

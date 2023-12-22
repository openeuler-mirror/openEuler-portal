<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import { ElDialog, ElSwitch } from 'element-plus';
import { setCustomCookie, isBoolean, getCustomCookie } from '@/shared/utils';
import { useCookieStatus, usePrivacyVersion } from '@/stores/common';
import { useScreen } from '@/shared/useScreen';
import { useI18n } from '@/i18n';

import IconClose from '~icons/app/icon-cancel.svg';

const { lePadV } = useScreen();
const i18n = useI18n();
const { lang } = useData();
const isZh = computed(() => (lang.value === 'zh' ? true : false));

const cookieStatus = useCookieStatus();
const privacyVersion = usePrivacyVersion();

const route = useRoute();

const COOKIE_AGREED_STATUS = {
  NOT_SIGNED: '0', // 未签署
  ALL_AGREED: '1', // 同意所有cookie
  NECCESSARY_AGREED: '2', // 仅同意必要cookie
};

const COOKEY_KEY = 'agreed-cookiepolicy';

// 是否允许分析cookie
const analysisAllowed = ref(false);

// cookie提示是否显示
const isNoticeVisible = ref(false);

// 显示/隐藏cookie提示
const toggleNoticeVisible = (val: boolean) => {
  if (isBoolean(val)) {
    isNoticeVisible.value = val;
  } else {
    isNoticeVisible.value = !isNoticeVisible.value;
  }
};

// 弹出框是否显示
const isDlgVisible = ref(false);

// 显示/隐藏弹出框
const toggleDlgVisible = (val: boolean) => {
  if (isBoolean(val)) {
    isDlgVisible.value = val;
  } else {
    isDlgVisible.value = !isNoticeVisible.value;
  }
};

// 获取cookie状态
const getUserCookieStatus = () => {
  const cookieVal = getCustomCookie(COOKEY_KEY) ?? '0';

  const cookieStatusVal = cookieVal[0];
  const privacyVersionVal = cookieVal.slice(1);

  if (privacyVersionVal !== privacyVersion.version) {
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

// 是否未签署
const isAllAgreed = () => {
  return getUserCookieStatus() === COOKIE_AGREED_STATUS.ALL_AGREED;
};

// 埋点
const initSensor = () => {
  // 百度统计
  (function () {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?ab8d86daab9a8e98cf8faa239aefcd3c';
    const s = document.getElementsByTagName('HEAD')[0];
    s.appendChild(hm);
  })();

  // ds埋点
  (function () {
    const sensorsdata = document.createElement('script');
    sensorsdata.src = '/allow_sensor/sensorsdata.min.js';

    const hm = document.createElement('script');
    hm.src = '/allow_sensor/sensors.js';
    const s = document.getElementsByTagName('HEAD')[0];
    s.appendChild(sensorsdata);
    s.appendChild(hm);
  })();
};

onMounted(() => {
  // 未签署，展示cookie notice
  if (isNotSigned()) {
    toggleNoticeVisible(true);
  }

  if (isAllAgreed()) {
    cookieStatus.status = COOKIE_AGREED_STATUS.ALL_AGREED;
    analysisAllowed.value = true;
    initSensor();
  }
});

// 用户同意所有cookie
const acceptAll = () => {
  cookieStatus.status = COOKIE_AGREED_STATUS.ALL_AGREED;
  setCustomCookie(
    COOKEY_KEY,
    `${COOKIE_AGREED_STATUS.ALL_AGREED}${privacyVersion.version}`,
    180
  );
  toggleNoticeVisible(false);
  initSensor();
};

// 用户拒绝所有cookie，即仅同意必要cookie
const rejectAll = () => {
  cookieStatus.status = COOKIE_AGREED_STATUS.NECCESSARY_AGREED;
  setCustomCookie(
    COOKEY_KEY,
    `${COOKIE_AGREED_STATUS.NECCESSARY_AGREED}${privacyVersion.version}`,
    180
  );
  toggleNoticeVisible(false);
};

const handleSave = () => {
  if (analysisAllowed.value) {
    acceptAll();
  } else {
    rejectAll();
  }

  toggleDlgVisible(false);
};

const handleAllowAll = () => {
  analysisAllowed.value = true;
  acceptAll();
  toggleDlgVisible(false);
};

const onDlgChange = () => {
  if (!isAllAgreed()) {
    setTimeout(() => {
      analysisAllowed.value = false;
    }, 800);
  }
  toggleDlgVisible(false);
};

watch(
  () => route.path,
  () => {
    if (isNotSigned()) {
      toggleNoticeVisible(true);
    }
  }
);
</script>

<template>
  <div v-if="isNoticeVisible" class="cookie-notice">
    <div class="cookie-notice-content">
      <div class="cookie-notice-wrap">
        <div class="cookie-notice-left">
          <p class="cookie-title">{{ i18n.cookie.title }}</p>
          <p class="cookie-desc">
            {{ i18n.cookie.desc }}
            <a :href="isZh ? '/zh/other/privacy/' : '/en/other/privacy/'">
              {{ i18n.cookie.link }} </a
            >{{ isZh ? '。' : '.' }}
          </p>
        </div>
        <div class="cookie-notice-right">
          <OButton type="outline" size="mini" @click="acceptAll">{{
            i18n.cookie.acceptAll
          }}</OButton>
          <OButton type="outline" size="mini" @click="rejectAll">{{
            i18n.cookie.rejectAll
          }}</OButton>
          <OButton type="outline" size="mini" @click="toggleDlgVisible(true)">
            {{ i18n.cookie.manage }}
          </OButton>
        </div>

        <IconClose
          class="cookie-notice-close"
          @click="toggleNoticeVisible(false)"
        />
      </div>
    </div>
    <client-only>
      <ElDialog
        v-model="isDlgVisible"
        :width="lePadV ? '90%' : '50%'"
        :title="i18n.cookie.manage"
        destroy-on-close
        :before-close="onDlgChange"
      >
        <div class="cookie-dlg-content">
          <div class="content-item">
            <div class="item-header">
              <span class="item-title">{{ i18n.cookie.necessaryCookie }}</span>
              <span class="item-extra">{{
                i18n.cookie.necessaryCookieTip
              }}</span>
            </div>
            <div class="item-detail">
              {{ i18n.cookie.necessaryCookieDetail }}
            </div>
          </div>
          <div class="content-item">
            <div class="item-header">
              <span class="item-title">{{ i18n.cookie.analyticalCookie }}</span>
              <span class="item-extra">
                <ElSwitch v-model="analysisAllowed"></ElSwitch>
              </span>
            </div>
            <div class="item-detail">
              {{ i18n.cookie.analyticalCookieDetail }}
            </div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <OButton type="outline" size="mini" @click="handleSave">{{
              i18n.cookie.saveSetting
            }}</OButton>
            <OButton type="outline" size="mini" @click="handleAllowAll">
              {{ i18n.cookie.acceptAll }}
            </OButton>
          </span>
        </template>
      </ElDialog>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.cookie-notice {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  .o-button {
    --o-button-font-size-mini: 14px;
  }
  .o-button + .o-button {
    margin-left: 16px;

    @media (max-width: 840px) {
      margin-left: 0;
      margin-top: 12px;
    }
  }
}

.cookie-notice-content {
  background-color:rgba(255, 255, 255, .9);
  backdrop-filter: blur(5px);
  box-shadow: var(--o-shadow-l1);
}
.dark .cookie-notice-content {
  background-color:rgba(0, 0, 0, .9);
}

.cookie-notice-wrap {
  padding: 24px 44px;
  max-width: 1504px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  @media (max-width: 840px) {
    padding-top: 16px;
    padding-bottom: 16px;
    flex-direction: column;
    align-items: center;
  }
}

.cookie-notice-left {
  width: 60%;

  @media (max-width: 1100px) {
    width: 58%;
  }

  @media (max-width: 840px) {
    width: 100%;
  }

  .cookie-title {
    font-size: 16px;
    line-height: 28px;
    color: var(--o-color-text1);
    font-weight: 500;
    @media (max-width: 840px) {
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }

  .cookie-desc {
    font-size: 12px;
    line-height: 18px;
    color: var(--o-color-text3);
    margin-top: 8px;
  }
}

.cookie-notice-right {
  display: flex;
  align-items: center;
  margin-top: 12px;

  @media (max-width: 840px) {
    width: 100%;
  }

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: center;
  }

  .o-button {
    @media (max-width: 840px) {
      width: 100%;
      justify-content: center;
    }
  }
}

.cookie-notice-close {
  position: absolute;
  top: 12px;
  right: 24px;
  cursor: pointer;
  transform-origin: center;
  color: var(--o-color-text1);
  &:hover {
    color: var(--o-color-brand1);
  }
}


:deep(.el-dialog) {
  .el-dialog__header {
    text-align: center;
    padding: 24px;
  }
  .el-dialog__title {
    font-size: 32px;
    color: var(--o-color-text1);
    @media (max-width: 840px) {
      font-size: 22px;
    }
  }
  .el-dialog__body{
    padding: 0 24px;
    .content-item + .content-item {
      margin-top: 24px;
    }

    .content-item {
      .item-header {
        display: flex;
        align-items: center;
        .item-title {
          font-size: 18px;
          line-height: 32px;
          color: var(--o-color-text1);
          font-weight: 500;
        }

        .item-extra {
          font-size: 14px;
          line-height: 22px;
          color: var(--o-color-text4);
          margin-left: 24px;
        }
      }

      .item-detail {
        font-size: 16px;
        line-height: 28px;
        color: var(--o-color-text3);
        margin-top: 12px;
        @media (max-width: 840px) {
          font-size: 14px;
          line-height: 21px;
          margin-top: 8px;
        }
      }
    }
  }
  .el-dialog__footer {
    text-align: center;
    padding: 24px;
    @media (max-width: 840px) {
      .o-button {
        margin: 0 8px;
      }
    }
  }
}
</style>

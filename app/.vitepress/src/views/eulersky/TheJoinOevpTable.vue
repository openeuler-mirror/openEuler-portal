<script lang="ts" setup>
import { ref, computed } from 'vue';
import { showGuard, getUserAuth } from '@/shared/login';
import { useI18n } from '@/i18n';

import AppContent from '@/components/AppContent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { token } = getUserAuth();

const i18n = useI18n();
const oevpI18n = computed(() => {
  return i18n.value.sky.JOIN_OEVP;
});
const feedbackUrl = `https://wenjuan.feishu.cn/m/cfm?t=spl4AZmP75Mi-qxrq`;

const height = ref(1710);
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="12">
    <BreadCrumbs
      :bread1="oevpI18n.APPLY_BREAD1"
      :bread2="oevpI18n.APPLU_BREAD2"
      :link1="oevpI18n.APPLY_BREAD1_URL"
    />
    <div class="feedback-wrap">
      <h2>{{ oevpI18n.APPLU_BREAD2 }}</h2>
      <template v-if="token">
        <iframe
          ref="feedbackPage"
          :height="height"
          allow="camera *;microphone *;"
          border="0"
          scolling="no"
          :src="feedbackUrl"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          class="feedback-iframe"
        ></iframe>
      </template>
      <template v-else>
        <div class="auth-box">
          <OButton type="primary" @click="showGuard()">
            请先登录后，在填写
          </OButton>
        </div>
      </template>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.feedback-wrap {
  margin-top: 40px;
  background: var(--e-color-bg2);
  box-shadow: var(--e-shadow-l1);
  padding: 40px;
  @media (max-width: 1100px) {
    margin-top: 24px;
    padding: 16px;
  }

  .feedback-iframe {
    border: 0;
    width: 100%;
  }
  h2 {
    font-size: 32px;
    font-weight: 500;
    margin: 0 0 40px;
    text-align: center;
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      font-size: 24px;
      margin: 24px 0;
    }
  }
  .auth-box {
    padding: 64px 0;
    display: grid;
    place-items: center;
  }
}
</style>

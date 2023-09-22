<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import GroupRole from './GroupRole.vue';
import GroupRight from './GroupRight.vue';
import CertifiedMember from './CertifiedMember.vue';
import GroupActtivity from './GroupActtivity.vue';

import banner from '@/assets/banner/banner-user-group.png';
import groupIllustration from '@/assets/illustrations/user-group.png';

const i18n = useI18n();
const groupI18n = computed(() => {
  return i18n.value.group;
});
</script>
<template>
  <BannerLevel2
    :background-image="banner"
    :title="groupI18n.BANNER_TITLE"
    :illustration="groupIllustration"
    class="banner"
  >
  </BannerLevel2>
  <AppContent>
    <p class="word-style">
      {{ groupI18n.INTRODUCE }}
      <a :href="groupI18n.LINK" target="_blank">{{ groupI18n.LINK_TEXT }}</a>
    </p>
    <GroupRole />
    <GroupRight />
    <CertifiedMember />
    <GroupActtivity />
    <div class="btn-box">
      <a href="/zh/interaction/event-list/collect/" class="btn">发起活动</a>
    </div>
  </AppContent>
</template>

<style scoped lang="scss">
:deep(.word-style) {
  color: var(--o-color-text1);
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}
:deep(.title) {
  font-size: var(--o-font-size-h3);
  font-weight: 300;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--o-spacing-h1);
  margin-bottom: var(--o-spacing-h2);
  @media (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: var(--o-spacing-h2);
    margin-bottom: var(--o-spacing-h5);
  }
}
.btn-box {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  font-size: var(--o-line-height-h8);
  .btn {
    cursor: pointer;
    padding: 16px 72px;
    background-color: var(--o-color-brand1);
    color: var(--o-color-white);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
    }
  }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import GroupRole from './GroupRole.vue';
import GroupRight from './GroupRight.vue';
import GroupCity from './GroupCity.vue';

import banner from '@/assets/banner/banner-user-group.png';
import groupIllustration from '@/assets/illustrations/user-group.png';
import IconRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();
const groupI18n = computed(() => {
  return i18n.value.group;
});

const jumpTo = (path: string) => {
  window.open(path, '_blank');
};
</script>
<template>
  <BannerLevel2
    :background-image="banner"
    :title="groupI18n.BANNER_TITLE"
    :illustration="groupIllustration"
    class="banner"
  >
    <template #default>
      <OButton
        class="post-btn"
        @click="jumpTo(groupI18n.LINK)"
        type="outline"
        animation
        size="nomral"
      >
        {{ groupI18n.LINK_TEXT }}
        <template #suffixIcon>
          <OIcon class="right-icon"><IconRight /></OIcon>
        </template>
      </OButton>
    </template>
  </BannerLevel2>
  <AppContent>
    <p class="word-style">
      {{ groupI18n.INTRODUCE }}
    </p>
    <GroupCity />
    <GroupRole />
    <GroupRight />

    <div class="btn-box">
      <a href="/zh/interaction/event-list/collect/" class="btn">发起活动</a>
    </div>
  </AppContent>
</template>

<style scoped lang="scss">
.post-btn {
  color: var(--e-color-white);
  border-color: var(--e-color-white);
  @media (max-width: 767px) {
    padding: 3px 16px;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
  .right-icon {
    color: var(--e-color-white);
    @media (max-width: 767px) {
      font-size: var(--e-font-size-text);
    }
  }
}

:deep(.word-style) {
  color: var(--e-color-text1);
  font-size: var(--e-font-size-h8);
  line-height: var(--e-line-height-h8);
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
}
:deep(.title) {
  font-size: var(--e-font-size-h3);
  font-weight: 300;
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--e-spacing-h1);
  margin-bottom: var(--e-spacing-h2);
  @media (max-width: 768px) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    margin-top: var(--e-spacing-h2);
    margin-bottom: var(--e-spacing-h5);
  }
}
.btn-box {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  font-size: var(--e-line-height-h8);
  .btn {
    cursor: pointer;
    padding: 16px 72px;
    background-color: var(--e-color-brand1);
    color: var(--e-color-white);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-text);
    }
  }
}
</style>

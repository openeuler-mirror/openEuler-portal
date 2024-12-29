<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';


defineProps({
  docs: {
    type: String,
    default: '',
  },
});

const commonStore = useCommon();

const notFoundImg = computed(() =>
  commonStore.theme === 'light' ? notFoundImg_light : notFoundImg_dark
);
</script>

<template>
  <div class="nofound">
    <img class="nofound-img" :src="notFoundImg" alt="404" />
    <p class="nofound-text">
      <slot name="title">
        {{ docs || $t('common.empty') }}
      </slot>
    </p>
  </div>
</template>

<style lang="scss" scoped>
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
  @media screen and (max-width: 768px) {
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
</style>

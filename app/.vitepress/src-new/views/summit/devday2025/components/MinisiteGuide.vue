<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';

const { isPhone } = useScreen();

const props = defineProps({
  guideData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const guideImage = computed(() => {
  return isPhone.value ? props.guideData.imageMo : props.guideData.imagePc;
});
</script>

<template>
  <div class="guide">
    <div class="title-img">
      <p class="title-text">{{ guideData.title }}</p>
      <img :src="isDark ? guideData.titleImDark : guideData.titleImg" />
    </div>
    <img
      class="guide-image"
      :class="{ 'image-dark': isDark }"
      :src="guideImage"
      alt="会场导览"
    />
  </div>
</template>

<style lang="scss" scoped>
.guide {
  margin-top: 72px;

  .guide-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--o-radius-xs);
  }
  .image-dark {
    filter: brightness(80%) grayscale(20%) contrast(1.2);
  }
}
</style>

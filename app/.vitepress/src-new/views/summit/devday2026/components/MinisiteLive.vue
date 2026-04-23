<script setup lang="ts">
import { ref, computed } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import { useScreen } from '~@/composables/useScreen';

const { isPhone, isPadV } = useScreen();

const props = defineProps({
  liveData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const screenWidth = useWindowResize();

const height = computed(() => {
  const ratio = isPhone.value ? 0.66 : isPadV.value ? 0.62 : 0.58;
  return Math.min(ratio * Number(screenWidth.value), 800);
});
</script>

<template>
  <p class="floor-title">{{ liveData.title }}</p>
  <div class="live-room">
    <iframe
      ref="livePage"
      :height="height"
      allow="camera *;microphone *;"
      border="0"
      scolling="no"
      :src="liveData.url"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      class="live-room-video"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.live-room {
  margin-top: 40px;

  @include respond-to('<=laptop') {
    margin-top: 24px;
  }
  @include respond-to('<=pad') {
    margin-top: 16px;
  }
  @include respond-to('<=pad_v') {
    margin-top: 12px;
  }

  .live-room-video {
    margin-bottom: var(--e-spacing-h4);
    width: 100%;
    display: block;
    border: none;
    border-radius: 6px;
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
    }
  }
}
</style>

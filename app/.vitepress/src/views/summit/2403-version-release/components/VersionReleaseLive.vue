<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useWindowResize from '@/components/hooks/useWindowResize';

const liveUrl =
  'https://live.vhall.com/v3/lives/embedclientfull/watch/181394321';

const screenWidth = useWindowResize();

const height = ref(820);

const getLiveHeight = () => {
  if (screenWidth.value > 1200) {
    height.value = 820;
  } else if (screenWidth.value >= 820 && screenWidth.value <= 1200) {
    height.value = screenWidth.value * 0.6;
  } else if (screenWidth.value > 768 && screenWidth.value < 820) {
    height.value = 880;
  } else if (screenWidth.value <= 768) {
    height.value = screenWidth.value * 1.1;
  }
};

onMounted(() => {
  getLiveHeight();
});
</script>
<template>
  <div class="live-container">
    <iframe
      :height="height"
      allow="camera *;microphone *;"
      frameborder="0"
      scolling="no"
      :src="liveUrl"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      oallowfullscreen="true"
      msallowfullscreen="true"
      class="live-room-video"
    ></iframe>
  </div>
</template>
<style lang="scss" scoped>
.live-room-video {
  width: 100%;
  display: block;
  border: none;
}
.live-container {
  background-color: var(--o-color-bg1);
  box-shadow: var(--o-shadow-l1);
  border-radius: 8px;
  overflow: hidden;
}
</style>

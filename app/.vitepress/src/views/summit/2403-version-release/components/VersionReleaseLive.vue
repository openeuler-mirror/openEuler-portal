<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useWindowResize from '@/components/hooks/useWindowResize';

const liveUrl =
  'https://wx.vzan.com/live/m/vzliveplayer?type=live&vid=1895448586&liveId=506087';

const screenWidth = useWindowResize();

const height = ref(820);

const getLiveHeight = () => {
  if (screenWidth.value >= 1416) {
    height.value = 797;
  } else if (screenWidth.value > 1024) {
    height.value = (screenWidth.value - 64) * 0.56;
  } else {
    height.value = (screenWidth.value - 32) / 2;
  }
};

window.addEventListener('message', (e) => {
  console.log(e);
});

onMounted(() => {
  getLiveHeight();
});
</script>
<template>
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
</template>
<style lang="scss" scoped>
.live-room-video {
  width: 100%;
  display: block;
  border: none;
  border-radius: 8px;
}
</style>

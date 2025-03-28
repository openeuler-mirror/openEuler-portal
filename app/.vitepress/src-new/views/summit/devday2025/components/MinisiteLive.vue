<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import { useCommon } from '@/stores/common';
import { uniqueId } from '@/shared/utils';

const props = defineProps({
  liveData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const screenWidth = useWindowResize();

const liveUrl = ref('');
const generateUrl = () => {
  const { liveId, liveTestId, liveDate } = props.liveData;
  const currentId = new Date() > new Date(liveDate) ? liveId : liveTestId;
  let userId = uniqueId();
  if (
    typeof window !== 'undefined' &&
    localStorage.getItem('oa-openEuler-client')
  ) {
    userId = JSON.parse(localStorage.getItem('oa-openEuler-client') || '').value
      .id;
  }
  liveUrl.value = `https://hw.vhallyun.com/v2/watch/${currentId}?lang=zh&thirdId=user-${userId}`;
};

const height = ref(800);
function setHeight(data: any) {
  // data.state=0,直播未开始，1正在直播，2直播结束，3回放中
  // 注意pc端对面会传一个高度过来可以直接用，但是移动端不会传，所以要根据直播状态自己写
  if (screenWidth.value <= 1100) {
    if (data.state === 1 || data.state === 3) {
      height.value = screenWidth.value * 1.31;
    } else if (data.state === 0 || data.state === 2) {
      height.value = screenWidth.value * 0.5;
    }
  } else {
    height.value = data.height ? parseInt(data.height) : 800;
  }
}
function messageEvent() {
  window.addEventListener(
    'message',
    function (event) {
      if (event.origin === 'https://hw.vhallyun.com') {
        let data = {
          state: '',
        };
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          data = event.data;
        }
        setHeight(data);
      }
    },
    false
  );
}
onMounted(async () => {
  generateUrl();
  messageEvent();
});

onUnmounted(() => {
  window.removeEventListener('message', () => {});
});
</script>

<template>
  <div class="live-room">
    <div class="title-img">
      <p class="title-text">{{ liveData.title }}</p>
      <img :src="isDark ? liveData.titleImDark : liveData.titleImg" />
    </div>
    <iframe
      ref="livePage"
      :height="height"
      allow="camera *;microphone *;"
      border="0"
      scolling="no"
      :src="liveUrl"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      class="live-room-video"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.live-room {
  margin-top: 72px;
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

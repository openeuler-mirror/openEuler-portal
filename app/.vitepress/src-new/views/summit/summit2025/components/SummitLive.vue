<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { OSelect, OOption } from '@opensig/opendesign';

import useWindowResize from '@/components/hooks/useWindowResize';

import { VHALLYUN } from '~@/shared/config';

import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { uniqueId } from '@/shared/utils';

const { lePad } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

interface RenderData {
  id: number;
  liveId: number;
  liveTestId: number;
  name: string;
}

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
const liveUrl = ref('');
const renderData: Array<RenderData> = props.liveData as any;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  getLiveUrl(item.liveId);
};

const createUserId = () => {
  let userId = uniqueId();
  if (
    typeof window !== 'undefined' &&
    localStorage.getItem('oa-openEuler-client')
  ) {
    userId = JSON.parse(localStorage.getItem('oa-openEuler-client') || '')?.value?.id;
  }

  return userId;
}

const getLiveUrl = (liveId: number) => {
  liveUrl.value = `${VHALLYUN}/v2/watch/${liveId}?lang=zh&thirdId=${createUserId()}&landScape=true`;
}
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
      if (event.origin === VHALLYUN) {
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

const liveRoom = ref();

const changeLive = (val: number): void => {
  getLiveUrl(val);
};

onMounted(async () => {
  liveRoom.value = renderData[0].liveId;
  changeLive(renderData[0].liveId);
  messageEvent();
});
</script>

<template>
  <div class="live-room">
    <div v-if="lePad" class="select-room">
      <OSelect v-model="liveRoom" @change="changeLive">
        <OOption
          v-for="item in renderData"
          :key="item.liveId"
          :label="item.name"
          :value="item.liveId"
        />
      </OSelect>
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
    <div v-if="!lePad" class="live-room-web" :class="{'live-room-web-dark': isDark}">
      <div class="live-room-web-itembox">
        <div
          v-for="(item, index) in renderData"
          :key="item.id"
          :class="[
            'link',
            roomId === index ? 'link-active' : '',
            index === 0 ? 'link-main' : ' ',
          ]"
          @click="setLiveRoom(item, index)"
        >
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-room {
  margin-bottom: 16px;
  :deep(.o-select) {
    width: 100%;
    height: 48px;
  }
}
.live-room {
  .live-room-video {
    width: 100%;
    display: block;
    border: none;
  }
  .live-room-web {
    margin-top: 24px;
    .live-room-web-itembox {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .link {
        width: calc((100% - 48px) / 4);
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--o-color-fill2);
        border-radius: var(--o-radius-xs);
        margin-left: 16px;
        margin-top: 16px;
        padding: 12px 0;
        cursor: pointer;
        background-image: url('../img/live/btn-bg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        p {
          text-align: center;
          color: var(--o-color-info1);
          @include text2;
        }

        @include hover {
          box-shadow: 0 6px 18px rgba(var(--o-kleinblue-6), 0.14);
        }

        &:first-of-type {
          width: 100%;
          margin-top: 0;
        }
        &:nth-child(-n + 2) {
          margin-left: 0;
        }
        &:nth-child(6n) {
          margin-left: 0;
        }
      }

      .link.link-main {
        background-image: url('../img/live/btn-long-bg.jpg');
      }
      .link-active {
        background-image: url('../img/live/live-btn_light.jpg');
      }
      .link-active.link-main {
        background-image: url('../img/live/live-btn-long_light.jpg');
      }
    }
  }
  .live-room-web-dark {
    .live-room-web-itembox {
      .link {
        background-image: url('../img/live/btn-bg-dark.jpg');
      }
      .link.link-main {
        background-image: url('../img/live/btn-long-bg-dark.jpg');
      }
      .link-active {
        background-image: url('../img/live/live-btn_dark.jpg');
      }
      .link-active.link-main {
        background-image: url('../img/live/live-btn-long_dark.jpg');
      }
    }
  }
}

@include respond('<=pad_v') {
  .live-room {
    .live-room-web {
      margin-top: 16px;
    }
  }
}
</style>

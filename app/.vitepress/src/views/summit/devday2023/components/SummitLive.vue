<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import liveActiveBg from '../img/live/live-btn.png';
import liveActiveBgLong from '../img/live/live-btn-long.png';

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
  className: {
    type: String,
    default: '',
  },
});
const screenWidth = useWindowResize();
const liveUrl = ref('');
const renderData: Array<RenderData> = props.liveData as any;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  createLiveUrl(item.liveId);
};

function createLiveUrl(liveId: number) {
  liveUrl.value = `https://vhall.huawei.com/v2/watch/${liveId}?lang=zh&landScape=true`;
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
      let data = {
        state: '',
      };
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        data = event.data;
      }
      setHeight(data);
    },
    false
  );
}
onMounted(async () => {
  createLiveUrl(renderData[0].liveId);
  messageEvent();
});

// 背景
const ActiveBg = `url(${liveActiveBg})`;
const ActiveBgLong = `url(${liveActiveBgLong})`;

const liveRoom = ref(renderData[0].name);
const changeLive = (val: number): void => {
  createLiveUrl(val);
};
</script>

<template>
  <div class="live-room">
    <div class="select-room">
      <OSelect v-model="liveRoom" clearable filterable @change="changeLive">
        <OOption
          v-for="item in renderData"
          :key="item.id"
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
    <div class="live-room-web">
      <div class="live-room-web-itembox" :class="className">
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
  display: none;
  :deep(.e-select) {
    width: 100%;
    .el-input {
      height: 48px;
    }
  }
  @media (max-width: 1100px) {
    display: block;
  }
}
.live-room {
  .live-room-video {
    margin-bottom: var(--e-spacing-h4);
    width: 100%;
    display: block;
    border: none;
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
    }
  }
  .live-room-web {
    display: block;
    @media (max-width: 1100px) {
      display: none;
    }
    .live-room-web-itembox {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      &.odd2022 {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16px;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        .link-main {
          grid-column: 1/7;
        }
      }
      &.odd2023 {
        display: grid;
        grid-template-columns: 300px 1fr 300px;
        grid-template-areas: 'a b c';
        gap: 16px;
        width: 100%;
        .link-main {
          grid-area: b;
        }
      }
      .link {
        flex: 1;
        padding: var(--e-spacing-h6) 0;
        cursor: pointer;
        background-color: var(--e-color-bg2);
        height: 88px;
        text-align: center;
        display: grid;
        align-items: center;
        border: 1px solid var(--e-color-brand1);
        p {
          color: var(--e-color-text1);
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
        }

        &:hover {
          box-shadow: var(--e-shadow-l2_hover);
        }
      }

      .link-active {
        background: v-bind('ActiveBg') no-repeat center/cover;
        p {
          color: #fff;
        }
      }
      .link-active.link-main {
        background: v-bind('ActiveBgLong') no-repeat center/cover;
      }
    }
  }
}
</style>

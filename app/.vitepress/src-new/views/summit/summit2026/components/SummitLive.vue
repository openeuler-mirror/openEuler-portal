<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { OSelect, OOption } from '@opensig/opendesign';

import { useCommon } from '@/stores/common';

import { useScreen } from '~@/composables/useScreen';
import { VHALLYUN, IS_TEST_ENV } from '~@/shared/config';

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
  dayIndex: {
    type: Number,
    default: 0,
  },
});
const { lePad, size } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
const screenWidth = computed(() => size.width);
// 移动端（宽 ≤1100，对面按 UA 下发移动版页面；更宽的桌面窗口下发的 PC 版页面走实测高度）
const isMobileScreen = computed(() => screenWidth.value <= 1100);
const liveUrl = ref('');
const renderData: Array<RenderData> = props.liveData as any;
const getLiveId = (item: RenderData): number => (IS_TEST_ENV ? item.liveTestId : item.liveId);
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  getLiveUrl(getLiveId(item));
};

const createUserId = () => {
  let userId = crypto.randomUUID();
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
const livePage = ref();
// 直播间状态：0未开播 1已开播 2已结束 3回放中（来自对面 roomStatue 消息）
const roomState = ref(-1);
// iframe 实际宽度（取不到时退化为屏幕宽度）
const getIframeWidth = (): number => livePage.value?.clientWidth || screenWidth.value;
// 未开播/已结束：可见区域高度 = 16:9 视频区 + 2px 缓冲。
// 移动版页面此状态下播放区下方是空白的 bottombox/ques-wrapper 占位元素（跨域无法 display:none），
// 通过外层容器裁剪隐藏：iframe 拉高到一屏让内部弹性占满（无内部滚动条），可见区域只保留视频区
const getIdleHeight = (): number => Math.ceil((getIframeWidth() * 9) / 16) + 2;
// 移动端 iframe 高度：一屏（内部 bottombox 弹性填满剩余空间，不产生内部滚动条）
const getMobileIframeHeight = (): number => Math.round(window.innerHeight);
// 可见区域高度（外层裁剪容器）：直播中/回放中与 iframe 等高；未开播/已结束只保留 16:9 视频区
const videoBoxHeight = computed(() => {
  if (!isMobileScreen.value) {
    return null;
  }
  return roomState.value === 1 || roomState.value === 3
    ? getMobileLiveHeight()
    : getIdleHeight();
});
// 移动版横屏比例判定：宽 ≥ 高*0.75（非明显竖屏）时移动版页面为横屏布局（播放区撑满、互动区在侧边/浮层）
const isLandscapeRatio = (): boolean =>
  getIframeWidth() >= Math.round(window.innerHeight) * 0.75;
// 移动版直播中/回放中：横屏比例下 = 16:9 * 宽 + 60（播放区下方的控制/投票操作条，对应文档公式 +60）；
// 竖屏比例下一屏（视频区在上、互动区在下）
const getMobileLiveHeight = (): number =>
  isLandscapeRatio()
    ? Math.ceil((getIframeWidth() * 9) / 16) + 60
    : Math.round(window.innerHeight);
// PC 版页面兜底公式（与对面 playerBoxH 的宽度计算一致，用实际嵌入宽度）：
// 直播中/回放中 = (宽度 - 352) / 16 * 9 + 48 + 60；未开播/已结束 = 宽度 / 16 * 9 + 48
const getPcFallbackHeight = (state: number): number => {
  const width = getIframeWidth();
  return state === 1 || state === 3
    ? Math.ceil(((width - 352) / 16) * 9 + 48 + 60)
    : Math.ceil((width / 16) * 9 + 48);
};
function setHeight(data: any) {
  // data.state=0,直播未开始，1正在直播，2直播结束，3回放中
  if (data.state !== undefined && data.state !== '') {
    const state = Number(data.state);
    if (!Number.isNaN(state)) {
      roomState.value = state;
    }
  }
  // 对面按 UA 下发两种页面，高度消息不同：
  // - PC 版（桌面 UA）：setIframeHeight 携带实测内容高度（ResizeObserver 实测推送）
  // - 移动版（移动 UA）：setMobIframeHeight 只传 auto（直播中/回放中/有回放记录的已结束）
  //   或回声值（等于我们的当前高度）；parseInt('auto') 为 NaN，必须过滤
  const parsed = data.height ? parseInt(data.height) : NaN;
  const hasParsed = Number.isFinite(parsed) && parsed > 0;
  // 直播中/回放中：对面实测/公式高度比实际内容略矮（底部操作条贴边），统一 +16 校正；
  // 移动版回声值等于当前高度，不可加校正（否则回声叠加高度无限增长）
  const isLiveState = roomState.value === 1 || roomState.value === 3;
  const liveBuffer = isLiveState ? 16 : 0;
  if (data.name === 'setIframeHeight') {
    // PC 版页面实测高度（未开播/已结束为精确值；直播中/回放中 +16 校正）
    height.value = hasParsed
      ? parsed + liveBuffer
      : getPcFallbackHeight(roomState.value) + liveBuffer;
  } else if (hasParsed) {
    // 移动版回声值：等于当前高度，直接采用
    height.value = parsed;
  } else if (isMobileScreen.value) {
    // 移动版 auto/无高度：一屏 + 16（直播中/回放中操作条不贴边；未开播/已结束由外层容器裁剪）
    height.value = getMobileIframeHeight() + liveBuffer;
  } else {
    // PC 版页面无高度消息：按状态对应的文档公式兜底
    height.value = getPcFallbackHeight(roomState.value) + liveBuffer;
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
        } catch (_e) {
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
  // 切换直播间后状态未知，等新房间 roomStatue 消息到达后再校正高度
  roomState.value = -1;
  getLiveUrl(val);
};

onMounted(async () => {
  liveRoom.value = getLiveId(renderData[0]);
  changeLive(getLiveId(renderData[0]));
  // 初始高度：移动端一屏（配合外层裁剪），PC 端按「未开播/已结束」公式预设（状态未知的安全默认值），消息到达后校正
  height.value = isMobileScreen.value ? getMobileIframeHeight() : getPcFallbackHeight(-1);
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
          :value="getLiveId(item)"
        />
      </OSelect>
    </div>
    <div
      class="live-room-video-box"
      :style="videoBoxHeight ? { height: videoBoxHeight + 'px' } : null"
    >
      <iframe
        ref="livePage"
        :height="height"
        allow="camera *;microphone *;"
        border="0"
        scrolling="no"
        :src="liveUrl"
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        class="live-room-video"
      ></iframe>
    </div>
    <div
      v-if="!lePad"
      class="live-room-web"
      :class="[isDark ? 'live-room-web-dark' : '', dayIndex === 0 ? 'sub5' : 'sub3']"
    >
      <div class="live-room-web-itembox" :class="{ 'layout-five': renderData.length === 6 }">
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
  // 移动端裁剪容器：未开播/已结束状态高度为 16:9 视频区，
  // 裁掉 iframe 内播放区下方的 bottombox 空白占位区域（等效 display:none）
  .live-room-video-box {
    overflow: hidden;
  }
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
      // 间距统一由 gap 控制；13 号（5 个分论坛）单行五张，14 号（6 个分论坛）3+3
      gap: 16px;
      .link {
        width: calc((100% - 32px) / 3);
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--o-color-fill2);
        border-radius: var(--o-radius-xs);
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
        }
      }
      // 13 号：主论坛卡片独占一行，5 个分论坛一行五个；主论坛卡片保持全宽
      &.layout-five .link {
        width: calc((100% - 64px) / 5);
        &:first-of-type {
          width: 100%;
        }
      }

      .link.link-main {
        background-image: url('../img/live/btn-long-bg.png');
      }
      .link-active {
        background-image: url('../img/live/live-btn_light.jpg');
      }
      .link-active.link-main {
        background-image: url('../img/live/live-btn-long_light.png');
      }
    }
  }
  .live-room-web-dark {
    .live-room-web-itembox {
      .link {
        background-image: url('../img/live/btn-bg-dark.jpg');
      }
      .link.link-main {
        background-image: url('../img/live/btn-long-bg-dark.png');
      }
      .link-active {
        background-image: url('../img/live/live-btn_dark.jpg');
      }
      .link-active.link-main {
        background-image: url('../img/live/live-btn-long_dark.png');
      }
    }
  }
  .live-room-web.sub5 {
    .live-room-web-itembox {
      .link:not(.link-main) {
        background-image: url('../img/live/sub5-bg.png');
      }
      .link-active:not(.link-main) {
        background-image: url('../img/live/sub5-bg-active.png');
      }
    }
  }
  .live-room-web.sub5.live-room-web-dark {
    .live-room-web-itembox {
      .link:not(.link-main) {
        background-image: url('../img/live/sub5-bg-dark.png');
      }
      .link-active:not(.link-main) {
        background-image: url('../img/live/sub5-bg-active-dark.png');
      }
    }
  }
  .live-room-web.sub3 {
    .live-room-web-itembox {
      .link:not(.link-main) {
        background-image: url('../img/live/sub3-bg.png');
      }
      .link-active:not(.link-main) {
        background-image: url('../img/live/sub3-bg-active.png');
      }
    }
  }
  .live-room-web.sub3.live-room-web-dark {
    .live-room-web-itembox {
      .link:not(.link-main) {
        background-image: url('../img/live/sub3-bg-dark.png');
      }
      .link-active:not(.link-main) {
        background-image: url('../img/live/sub3-bg-active-dark.png');
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

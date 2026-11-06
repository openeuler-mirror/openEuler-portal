<script setup lang="ts">
import { ref, watch, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';

import SummitSchedule from './SummitSchedule.vue';

import IconAddress from '~icons/app-new/icon-address.svg';
import IconTime from '~icons/app-new/icon-time.svg';
import IconArrowDownDouble from '~icons/app-new/icon-arrow-down-double.svg';

import { useCommon } from '@/stores/common';

interface DateT {
  day: string;
  month: string;
}

interface AgentItemT {
  title: string;
  time: string;
  name: string;
  post: string;
}

interface TabItemT {
  label: string;
  time: string;
  address: string;
  url?: string;
  // tab 面板头部：分论坛标题（配合 address / time 展示在议程行上方）
  title?: string;
  // 闭门分论坛：无公开议程，面板展示 closedTitle / closedTips 与特殊背景 closedBg（深浅两套）
  // 注意：TheSummit.vue 已把 yaml 的 snake_case 键递归转为 camelCase 后传入，此处均为 camelCase
  closed?: boolean;
  closedTitle?: string;
  closedTips?: string;
  closedBg?: { light: string; dark: string };
  children?: AgentItemT[];
}

interface ListItemT {
  title: string;
  children: TabItemT[];
}

interface PendingCardT {
  label: string;
  address: string;
  time: string;
}

interface ForumT {
  title: string;
  children: AgentItemT[];
  tab: TabItemT[];
  list?: ListItemT[];
  // 分论坛信息未确定时的占位卡片；有值时替代 tab 议程展示，确认后由 yaml 移除
  pendingCards?: PendingCardT[];
  pendingTips?: string;
}

const props = defineProps({
  agentData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

// 分论坛页签索引（自绘页签栏，支持横向滚动）
const tabType = ref<number>(0);

// 当前激活的分论坛 tab
const activeTab = computed(() => forumTabData.value[tabType.value]);
// 切换页签并把激活项平滑滚动到页签栏中部
const switchTab = (i: number, e?: MouseEvent) => {
  tabType.value = i;
  nextTick(() => {
    (e?.currentTarget as HTMLElement | undefined)?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  });
};

// 页签栏滚动状态：按滚动位置渐进显示两端渐变（起点无左渐变、接近末尾右渐变消失）
const tabBarRef = ref<HTMLElement>();
const tabFade = ref({ left: 0, right: 0 });
const updateTabScroll = () => {
  const bar = tabBarRef.value;
  if (!bar) return;
  const maxScroll = bar.scrollWidth - bar.clientWidth;
  tabFade.value = {
    left: Math.min(1, Math.max(0, bar.scrollLeft / 96)),
    right: Math.min(1, Math.max(0, (maxScroll - bar.scrollLeft) / 96)),
  };
};
// 内容遮罩：对应侧还有隐藏页签时，淡出该侧边缘的页签文字（任意背景下均可见）
const tabBarMaskStyle = computed(() => {
  const li = tabFade.value.left > 0 ? 'transparent 0, #000 32px' : '#000 0';
  const ri = tabFade.value.right > 0 ? '#000 calc(100% - 32px), transparent 100%' : '#000 100%';
  const v = `linear-gradient(to right, ${li}, ${ri})`;
  return { '-webkit-mask-image': v, 'mask-image': v };
});
const onResize = () => updateTabScroll();
onMounted(() => {
  window.addEventListener('resize', onResize);
  updateTabScroll();
});
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
// 页签栏实际挂载后再补测一次（初始渲染时 ref 尚未绑定，首测会被守卫跳过）
watch(tabBarRef, () => updateTabScroll());

// 论坛切换
const activeIndex = ref(0);
const isCardVisible = ref(false);
const dateData = ref<ForumT[]>([]);
const forumData = ref<AgentItemT[]>([]);
const forumTabData = ref<TabItemT[]>([]);
const listData = ref<ListItemT[]>([]);
const pendingCards = ref<PendingCardT[]>([]);
const pendingTips = ref('');

// 当前激活 tab 是否为闭门分论坛（面板覆盖整个 tab 区域，文案在页签栏顶部到内容底部区间居中）
const activeTabClosed = computed(() => forumTabData.value[tabType.value]?.closed === true);

// 技术沙龙卡片手风琴展开（默认全部折叠，同时只展开一个）
const openSalon = ref<string | null>(null);
const isOpenSalon = (i: number, c: number) => openSalon.value === `${i}-${c}`;
const toggleSalon = (key: string, e?: MouseEvent) => {
  const head = e?.currentTarget as HTMLElement | undefined;
  const topBefore = head?.getBoundingClientRect().top ?? 0;
  openSalon.value = openSalon.value === key ? null : key;
  // 手风琴切换改变上方卡片高度会使被点击标题位移，补偿滚动量让标题保持点击时的位置
  nextTick(() => {
    if (!head) return;
    const delta = head.getBoundingClientRect().top - topBefore;
    if (Math.abs(delta) > 1) {
      window.scrollBy({ top: delta, behavior: 'smooth' });
    }
  });
};

const forumClick = (val: number) => {
  tabType.value = 0;
  activeIndex.value = val;
  forumData.value = dateData.value[val].children;
  forumTabData.value = dateData.value[val].tab;
  pendingCards.value = dateData.value[val]?.pendingCards || [];
  pendingTips.value = dateData.value[val]?.pendingTips || '';
  listData.value = dateData.value[val]?.list || [];
  isCardVisible.value =
    (val === 1 || val === 2) &&
    forumTabData.value.length > 0 &&
    // 仅当所有 tab 都无议程且非闭门态时才切换到占位卡片；存在闭门 tab（closed）时保持 tab 形式
    forumTabData.value.every((item) => !item.closed && (item.children?.length ?? 0) === 0);
}

// 闭门分论坛面板背景（深浅主题取不同图）；经 CSS 变量注入，便于移动端断点隐藏
const closedBgStyle = (item: TabItemT) => {
  if (!item.closedBg) return {};
  return { '--closed-bg': `url(${isDark.value ? item.closedBg.dark : item.closedBg.light})` };
};

// 议程日期切换
const dateList = ref<DateT[]>([]);
const dateIndex = ref(0);

const setDateIndex = (index: number) => {
  activeIndex.value = 0;
  dateIndex.value = index;
  // 支持 yaml 中 visible: false 隐藏某个论坛（如暂不展示的 SIG Gathering）
  dateData.value = props.agentData.list[index].children.filter(
    (item: { visible?: boolean }) => item.visible !== false
  );
  forumClick(activeIndex.value)
}

watch(
  () => props.agentData,
  (val) => {
    val.list.forEach((item: any) => {
      dateList.value.push({
        day: item.date,
        month: 'NOV',
      })
    });
    setDateIndex(0);
  },
  { immediate: true }
);
</script>

<template>
  <div class="agent">
    <p class="section-title">{{ agentData.title }}</p>
    <!--  日期切换  -->
    <div class="date">
      <div
        v-for="(item, index) in dateList"
        :key="item.day"
        class="date-item"
        :class="{ active: dateIndex === index, 'date-item-dark': isDark }"
        @click="setDateIndex(index)"
      >
        <p class="date-day">{{ item.day }}</p>
        <p class="date-month">{{ item.month }}</p>
      </div>
    </div>
    <!-- 论坛切换 -->
    <div class="forum">
      <div
        v-for="(item, index) of dateData"
        :key="item.title"
        class="forum-title"
        :class="{ active: activeIndex === index }"
        @click="forumClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
    <!-- 议程 -->
    <div
      v-if="!isCardVisible && listData.length === 0"
      class="agent-list"
      :class="{ 'agent-list-dark': isDark, 'agent-list-plain': pendingCards.length > 0 }"
    >
      <template v-if="forumData?.length">
        <ClientOnly>
          <SummitSchedule :options="forumData" :date-index="dateIndex" />
        </ClientOnly>
      </template>
      <template v-if="forumTabData?.length && !pendingCards.length">
        <div class="agenda-tabs" :class="{ 'agenda-tabs-closed': activeTabClosed }">
          <div class="agenda-tab-bar-wrap">
            <div
            ref="tabBarRef"
            class="agenda-tab-bar"
            :style="tabBarMaskStyle"
            @scroll="updateTabScroll"
          >
              <div
                v-for="(item, i) in forumTabData"
                :key="i"
                class="agenda-tab-item"
                :class="{ 'agenda-tab-item-active': tabType === i }"
                @click="switchTab(i, $event)"
              >
                {{ item.label }}
              </div>
              <span
                class="agenda-tab-fade agenda-tab-fade-left"
                :style="{ opacity: tabFade.left }"
              ></span>
              <span
                class="agenda-tab-fade agenda-tab-fade-right"
                :style="{ opacity: tabFade.right }"
              ></span>
            </div>
          </div>
          <div class="agenda-tab-body">
            <template v-if="activeTab">
              <template v-if="activeTab.closed">
                <div class="tab-closed" :style="closedBgStyle(activeTab)">
                  <div class="tab-closed-text">
                    <p class="closed-title">{{ activeTab.closedTitle }}</p>
                    <p class="closed-tips">{{ activeTab.closedTips }}</p>
                  </div>
                </div>
              </template>
              <template v-else>
                <div v-if="activeTab.title" class="tab-head">
                  <p class="tab-head-title">{{ activeTab.title }}</p>
                  <div class="tab-head-info">
                    <span v-if="activeTab.address" class="info-item">
                      <IconAddress /><span>{{ activeTab.address }}</span>
                    </span>
                    <span class="info-item">
                      <IconTime /><span>{{ dateIndex === 0 ? '2026/11/13' : '2026/11/14' }} {{ activeTab.time }}</span>
                    </span>
                  </div>
                </div>
                <SummitSchedule :options="activeTab.children" :address="activeTab.address" :date-index="dateIndex" />
              </template>
            </template>
          </div>
        </div>
      </template>
      <template v-if="pendingCards.length">
        <div class="agent-list-card pending-cards">
          <div
            v-for="(card, i) in pendingCards"
            :key="i"
            class="item-card"
            :class="{ 'item-card-dark': isDark }"
          >
            <p class="card-title">{{ card.label }}</p>
            <div v-if="card.address || card.time" class="bottom">
              <div v-if="card.address" class="item-bottom">
                <span class="item-date"><IconAddress /><span>{{ card.address }}</span></span>
              </div>
              <div class="item-bottom">
                <span class="item-date"><IconTime /><span>{{ dateIndex === 0 ? '2026/11/13' : '2026/11/14' }}</span></span>
                <span class="time">{{ card.time }}</span>
              </div>
            </div>
          </div>
        </div>
        <p v-if="pendingTips" class="pending-tips">{{ pendingTips }}</p>
      </template>
    </div>
    <div v-if="isCardVisible && listData.length === 0">
      <div class="agent-list-card">
        <div v-for="(item, i) in forumTabData" :key="i" class="item-card" :class="{'item-card-layout': forumTabData.length === 2, 'item-card-dark': isDark}">
          <p class="card-title">{{ item.label }}</p>
          <div class="bottom">
            <div v-if="item.address" class="item-bottom">
              <span class="item-date"><IconAddress /><span>{{ item.address }}</span></span>
            </div>
            <div class="item-bottom">
              <span class="item-date"><IconTime /><span>{{ dateIndex === 0 ? '2026/11/13' : '2026/11/14' }}</span></span>
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <p class="tips">{{ agentData.tips }}</p>
    </div>
    <div v-if="!isCardVisible && listData.length" class="sig-agent">
      <template v-for="(item, i) in listData" :key="i">
        <div
          v-for="(card, c) in item.children"
          :key="`${i}-${c}`"
          class="salon-card"
          :class="{ 'salon-card-dark': isDark, 'salon-card-open': isOpenSalon(i, c) }"
        >
          <div class="salon-head" @click="toggleSalon(`${i}-${c}`, $event)">
            <div class="salon-head-main">
              <p class="salon-title">{{ card.label }}</p>
              <div class="salon-info">
                <span v-if="card.address" class="info-item">
                  <IconAddress /><span>{{ card.address }}</span>
                </span>
                <span class="info-item">
                  <IconTime /><span>{{ dateIndex === 0 ? '2026/11/13' : '2026/11/14' }} {{ card.time }}</span>
                </span>
              </div>
            </div>
            <span class="salon-arrow" :class="{ 'salon-arrow-open': isOpenSalon(i, c) }">
              <IconArrowDownDouble />
            </span>
          </div>
          <div v-show="isOpenSalon(i, c)" class="salon-body">
            <SummitSchedule :options="card.children" :date-index="dateIndex" />
          </div>
        </div>
      </template>
      <p v-if="agentData.salonTips" class="pending-tips">{{ agentData.salonTips }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.agent {
  .section-title {
    text-align: center;
    font-weight: var(--o-font_weight-bold);
    @include display3;
  }
}

.date {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .date-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #cbcbcb;
    border-radius: 8px;
    // 非选中态：浅色边框 rgba(203,203,203,1)，dark 模式 rgba(255,255,255,0.1)；背景用 fill2 token
    border: 1px solid rgba(203, 203, 203, 1);
    background-color: var(--o-color-fill2);
    // 只过渡颜色类属性：border 宽度保持 1px 不参与过渡，避免选中/取消时盒子尺寸变化引起抖动
    transition: background-color 0.3s ease-out, border-color 0.3s ease-out, color 0.3s ease-out;

    & ~ div {
      margin-left: 40px;
    }
    &.active {
      color: #fff;
      background-color: var(--e-color-brand1);
      // 选中态保留 1px 边框仅变色（与底色一致），避免 border 消失导致布局抖动
      border-color: var(--e-color-brand1);
    }
    &.date-item-dark:not(.active) {
      border-color: rgba(255, 255, 255, 0.1);
    }
    .date-day {
      padding: 13px 17px 3px 15px;
      line-height: 48px;
      font-size: 48px;
      font-weight: 700;
      border-bottom: 1px solid #cbcbcb;
      @media screen and (max-width: 1120px) {
        padding: 6px 16px;
        font-size: 32px;
        line-height: 32px;
      }
    }
    .date-month {
      padding: 6px 0;
      font-size: 24px;
      font-weight: 100;
      line-height: 24px;
      @media screen and (max-width: 1120px) {
        padding: 4px 0;
        font-size: 16px;
      }
    }
  }
}
.forum {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .forum-title {
    display: inline-block;
    cursor: pointer;
    color: var(--e-color-text1);
    text-align: center;
    background: var(--o-color-fill2);
    // 主论坛/分论坛/技术沙龙按钮宽度统一
    width: 190px;
    padding: 12px 0;
    @include h3;
    &.active {
      color: #fff;
      background: var(--e-color-brand1);
      border-color: var(--e-color-brand1);
    }
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
    &:last-of-type {
      border-radius: 0 4px 4px 0;
    }
  }
}

.agent-list {
  background-color: var(--o-color-fill2);
  margin-top: 40px;
  border-radius: 4px;
  padding: 40px 32px;
  background-image: url('../img/agenda-bottom-right.png'), url('../img/agenda-bg.png');
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  background-position: right bottom, top;
}
.agent-list-dark {
  background-image: url('../img/agenda-bottom-right-dark.png'), url('../img/agenda-bg-dark.png');
}
// 分论坛占位卡片态：外层不显示背景图/背景色，内边距全部为 0
.agent-list-plain {
  background-image: none;
  background-color: transparent;
  padding: 0;
}

// 分论坛页签栏：横向滚动 + 两端渐变遮罩（中英文长标签均可滚动查看，无省略号）
.agenda-tabs {
  position: relative;
  // 渐变遮罩的定位上下文：只覆盖页签栏一行，不延伸到下方内容
  .agenda-tab-bar-wrap {
    position: relative;
  }
  .agenda-tab-bar {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .agenda-tab-item {
    flex-shrink: 0;
    margin: 0 16px;
    padding: 10px 2px;
    color: var(--e-color-text1);
    cursor: pointer;
    text-align: center;
    border-bottom: 2px solid transparent;
    transition: color var(--o-duration-s) var(--o-easing-standard);
    &:first-of-type {
      margin-left: auto;
    }
    &:last-of-type {
      margin-right: auto;
    }
    &.agenda-tab-item-active {
      color: var(--e-color-brand1);
      border-bottom-color: var(--e-color-brand1);
    }
  }
  // 两端渐变遮罩：左右还有隐藏页签时常驻显示（颜色过渡到卡片底色），透明度随边缘页签裁切比例渐进变化
  .agenda-tab-fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 48px;
    pointer-events: none;
    z-index: 1;
    &.agenda-tab-fade-right {
      right: 0;
      background: linear-gradient(to right, transparent, var(--o-color-fill2));
    }
    &.agenda-tab-fade-left {
      left: 0;
      background: linear-gradient(to left, transparent, var(--o-color-fill2));
    }
  }
  .agenda-tab-body {
    margin-top: 40px;
  }
  // 闭门分论坛激活时：面板覆盖整个 tab 区域（含页签栏），文案在整体区间垂直居中
  &.agenda-tabs-closed {
    position: relative;
    aspect-ratio: 2976 / 1170;
    .agenda-tab-bar {
      // 页签栏浮于面板之上，保证可点击
      position: relative;
      z-index: 2;
    }
    .tab-closed {
      position: absolute;
      // 负向 inset 抵消 .agent-list 内边距，使面板铺满整卡（插画贴左下角）
      top: -40px;
      left: -32px;
      right: -32px;
      bottom: -40px;
      z-index: 1;
    }
  }
}

// 分论坛 tab 面板头部：标题 + 地点/日期时间
.tab-head {
  margin-bottom: 16px;
  text-align: center;
  .tab-head-title {
    color: var(--o-color-info1);
    font-weight: var(--o-font_weight-bold);
    @include h2;
  }
  .tab-head-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    color: var(--o-color-info1);
    @include text1;
  }
  .info-item {
    display: flex;
    align-items: center;
    svg {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
  .info-item + .info-item {
    margin-left: 16px;
  }
}

// 闭门分论坛面板：特殊背景卡片（深浅主题由 CSS 变量注入），标题与提示居中
.tab-closed {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--closed-bg, none);
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  .tab-closed-text {
    max-width: 100%;
  }
  .closed-title {
    text-align: center;
    color: var(--o-color-info1);
    font-weight: var(--o-font_weight-bold);
    @include h2;
  }
  .closed-tips {
    margin-top: 8px;
    text-align: center;
    color: var(--o-color-info1);
    font-weight: var(--o-font_weight-bold);
    @include h2;
  }
}

.agent-list-card {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
.item-card {
  width: calc((100% - 64px) / 3);
  height: 200px;
  background-color: var(--e-color-bg2);
  padding: 32px;
  border-radius: 4px;
  margin: 32px 0 0 32px;
  background-image: url('../img/card-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
  &:nth-child(3n + 1) {
    margin-left: 0;
  }
  &:nth-child(-n + 3) {
    margin-top: 0;
  }

  .card-title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .bottom {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    font-weight: 400;
    margin-top: var(--o-gap-2);
    @include text1;
    .item-bottom {
      display: flex;
      align-items: center;
    }
    .item-bottom + .item-bottom {
      margin-left: 16px;
    }
    .item-date {
      display: flex;
      align-items: center;
      svg {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
    }
    .time {
      margin-left: var(--o-gap-4);
    }
  }
  .url {
    margin-top: 32px;
    color: var(--o-color-info1);
    font-weight: 400;
  }
  .o-link {
    padding: 8px 0;
  }
}
.item-card-en {
  display: flex;
  flex-direction: column;
  .url {
    margin-top: auto;
  }
}
.item-card-dark {
  background-image: url('../img/card-bg-dark.png');
}
// 分论坛占位卡片：使用专用卡片背景（深浅模式）
.pending-cards {
  .item-card {
    background-image: url('../img/sub-agenda.png');
  }
  .item-card-dark {
    background-image: url('../img/sub-agenda-dark.png');
  }
}
.pending-tips {
  margin-top: var(--o-gap-5);
  text-align: center;
  color: var(--o-color-info3);
  @include text1;
}
.item-card-layout {
  width: calc((100% - 32px) / 2);
}

// 技术沙龙：整宽可展开/收起卡片，背景图保持比例贴卡片底部（展开时位于议程区下方，深浅模式）
// 顶部间距与主/分论坛内容区（.agent-list）保持一致
.sig-agent {
  margin-top: 40px;
}
.salon-card {
  margin-top: 24px;
  border-radius: 4px;
  background-color: var(--e-color-bg2);
  background-image: url('../img/tech-salon.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: left bottom;
  overflow: hidden;
  &:first-child {
    margin-top: 0;
  }
  &.salon-card-dark {
    background-image: url('../img/tech-salon-dark.png');
  }
  .salon-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    cursor: pointer;
  }
  .salon-title {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
    &::before {
      content: '';
      width: 6px;
      height: 22px;
      margin-left: 8px;
      margin-right: 12px;
      border-radius: 3px;
      background-color: var(--e-color-brand1);
    }
  }
  .salon-info {
    display: flex;
    align-items: center;
    margin-top: 24px;
    color: var(--o-color-info1);
    @include text1;
  }
  .info-item {
    display: flex;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
  }
  .info-item + .info-item {
    margin-left: 16px;
  }
  .salon-arrow {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    transition: transform 0.3s;
    svg {
      width: 24px;
      height: 24px;
    }
    &.salon-arrow-open {
      transform: rotate(180deg);
    }
  }
}

// 展开内容区（议程行）左右间距与卡片头部一致；分割线随文字内缩，不贯穿整卡
.salon-body {
  :deep(.item-row) {
    padding-left: 0;
    padding-right: 0;
    margin-left: 24px;
    margin-right: 24px;
  }
}

.tips {
  text-align: center;
  color: var(--o-color-info3);
  margin-top: var(--o-gap-4);
  @include text1;
}

@include respond('laptop') {
  .agent-list {
    padding: 32px;
  }
  // 占位卡片态（无背景）在所有断点 padding 为 0
  .agent-list-plain {
    padding: 0;
  }
  .agenda-tabs {
    .agenda-tab-body {
      margin-top: 32px;
    }
    .agenda-tabs-closed .tab-closed {
      top: -32px;
      left: -32px;
      right: -32px;
      bottom: -32px;
    }
  }
  .item-card {
    width: calc((100% - 48px) / 3);
    height: 160px;
    padding: 24px;
    margin: 24px 0 0 24px;
    .bottom {
      .item-bottom + .item-bottom {
        margin-left: 12px;
      }
      .item-date {
        svg {
          margin-right: 4px;
        }
      }
      .time {
        margin-left: 8px;
      }
    }
    .url {
      margin-top: 16px;
    }
  }
  .item-card-layout {
    width: calc((100% - 24px) / 2);
  }
}
@include respond('pad_h') {
  .forum {
    .forum-title {
      padding: 8px 16px;
    }
  }
  .agent-list {
    padding: 24px;
  }
  .agent-list-plain {
    padding: 0;
  }
  .agenda-tabs {
    .agenda-tab-body {
      margin-top: 24px;
    }
    .agenda-tabs-closed .tab-closed {
      top: -24px;
      left: -24px;
      right: -24px;
      bottom: -24px;
    }
  }
  .item-card {
    width: calc((100% - 32px) / 3);
    height: auto;
    padding: 16px;
    margin: 16px 0 0 16px;
    .bottom {
      flex-direction: column;
      align-items: flex-start;
      .item-bottom + .item-bottom {
        margin-left: 0;
        margin-top: 8px;
      }
    }
    .url {
      margin-top: 16px;
    }
  }
  .item-card-layout {
    width: calc((100% - 16px) / 2);
  }

  .sig-agent {
    .agent-list-card1 {
      .item-card {
        .bottom {
          flex-direction: row;
        }
      }
    }
  }
}
@include respond('<=pad_v') {
  .forum {
    .forum-title {
      padding: 8px 16px;
      width: auto;
    }
  }
  .agent-list {
    padding: 16px;
  }
  // 分论坛占位态：移动端整块无内边距
  .agent-list-plain {
    padding: 0;
  }
  // 移动端：活动日程标题与日期切换的间距
  .date {
    margin-top: 24px;
  }
  .agenda-tabs {
    .agenda-tab-body {
      margin-top: 16px;
    }
  }
  .tab-head {
    margin-bottom: 8px;
    .info-item + .info-item {
      margin-left: 12px;
    }
  }
  // 移动端闭门面板回到文档流，文案在内容区内居中，避免绝对定位在窄屏下的宽度溢出；不显示人物插画
  .agenda-tabs.agenda-tabs-closed {
    aspect-ratio: auto;
    min-height: 0;
  }
  .agenda-tabs.agenda-tabs-closed .tab-closed {
    position: static;
    background-image: none;
    padding: 48px 16px;
  }
  // 移动端展开态：头部与内容之间加横线区分（折叠时不显示）；横线随文字内缩，颜色与议程行分隔线一致
  .salon-card.salon-card-open .salon-head {
    margin-right: 24px;
    margin-left: 24px;
    padding-right: 0;
    padding-left: 0;
    border-bottom: 1px solid rgba(0, 47, 167, 0.1);
  }
  .salon-card-dark.salon-card-open .salon-head {
    border-bottom-color: rgba(255, 255, 255, 0.15);
  }
  .item-card {
    width: 100%;
    height: auto;
    padding: 16px;
    margin: 12px 0 0 0;
    background-image: none;
    &:nth-child(-n + 3) {
      margin-top: 12px;
    }
    &:first-child {
      margin-top: 0;
    }
    .bottom {
      .item-bottom + .item-bottom {
        margin-left: 12px;
      }
      .item-date {
        svg {
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
      }
      .time {
        margin-left: var(--o-gap-2);
      }
    }
    .url {
      margin-top: 8px;
    }
  }
  .item-card-en {
    .bottom {
      flex-direction: column;
      align-items: flex-start;
      .item-bottom + .item-bottom {
        margin-left: 0;
        margin-top: 8px;
      }
    }
  }
  .salon-card .salon-info {
    flex-wrap: wrap;
    margin-top: 8px;
    // 信息项换行后与首行左对齐：间距用 margin-right 而非第二项的 margin-left
    .info-item {
      margin-right: 16px;
    }
    .info-item + .info-item {
      margin-left: 0;
    }
  }
  // 移动端展开态：头部与内容之间加横线区分（折叠时不显示）
  .salon-card.salon-card-open .salon-head {
    border-bottom: 1px solid var(--o-color-control1);
  }
  .salon-card .info-item svg {
    width: 16px;
    height: 16px;
  }
  .salon-card .info-item + .info-item {
    margin-left: 12px;
  }
}
</style>

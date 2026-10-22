<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { OLink, OIcon, OTab, OTabPane } from '@opensig/opendesign';

import SummitSchedule from './SummitSchedule.vue';

import IconAddress from '~icons/app-new/icon-address.svg';
import IconTime from '~icons/app-new/icon-time.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

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

const { isEn } = useLocale();

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const tabType = ref(0);

// 论坛切换
const activeIndex = ref(0);
const isCardVisible = ref(false);
const dateData = ref<ForumT[]>([]);
const forumData = ref<AgentItemT[]>([]);
const forumTabData = ref<TabItemT[]>([]);
const listData = ref<ListItemT[]>([]);
const pendingCards = ref<PendingCardT[]>([]);
const pendingTips = ref('');

const forumClick = (val: number) => {
  tabType.value = 0;
  activeIndex.value = val;
  forumData.value = dateData.value[val].children;
  forumTabData.value = dateData.value[val].tab;
  pendingCards.value = dateData.value[val]?.pendingCards || [];
  pendingTips.value = dateData.value[val]?.pendingTips || '';
  listData.value = dateData.value[val]?.list || [];
  isCardVisible.value = (val === 1 || val === 2) && forumTabData.value.some(item => item.children?.length === 0);
}

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
        <OTab v-model="tabType" :line="false" class="agenda-tabs">
          <OTabPane
            v-for="(item, i) in forumTabData"
            :key="i"
            :label="item.label"
            :value="i"
          >
            <SummitSchedule :options="item.children" :address="item.address" :date-index="dateIndex" />
          </OTabPane>
        </OTab>
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
    <div v-if="!isCardVisible && listData.length"  class="sig-agent">
      <template v-for="(item, i) in listData" :key="i">
        <div class="agent-list-card" :class="`agent-list-card${i}`">
          <div v-for="(card, c) in item.children" :key="c" class="item-card" :class="{'item-card-dark': isDark, 'item-card-en': isEn}">
            <p class="card-title">{{ card.label }}</p>
            <div class="bottom">
              <div v-if="card.address" class="item-bottom">
                <span class="item-date"><IconAddress /><span>{{ card.address }}</span></span>
              </div>
              <div class="item-bottom">
                <span class="item-date"><IconTime /><span>{{ dateIndex === 0 ? '2026/11/13' : '2026/11/14' }}</span></span>
                <span class="time">{{ card.time }}</span>
              </div>
            </div>
            <div v-if="card.url" class="url">
              <OLink color="normal" variant="text" size="large" hover-underline :href="card.url" target="_blank" rel="noopener noreferrer">
                {{ agentData.text }}
                <template #suffix>
                  <OIcon><IconChevronRight /> </OIcon>
                </template>
              </OLink>
            </div>
          </div>
        </div>
      </template>
      <p v-if="agentData.salonTips" class="pending-tips">{{ agentData.salonTips }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.agent {
  margin-top: 72px;
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }

  .section-title {
    text-align: center;
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
    padding: 12px 24px;
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

.agenda-tabs {
  :deep(.o-tab-body) {
    margin-top: 40px;
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

.sig-agent {
  // 技术沙龙卡片：与分论坛占位卡片使用同一背景图（深浅模式）
  .item-card {
    background-image: url('../img/sub-agenda.png');
  }
  .item-card-dark {
    background-image: url('../img/sub-agenda-dark.png');
  }
  .agent-list-card1 {
    .item-card {
      width: 100%;
      height: auto;
      text-align: center;
      background-image: url('../img/developer-bg.jpg');
      .bottom {
        justify-content: center;
      }
    }
    .item-card-dark {
      background-image: url('../img/developer-bg-dark.jpg');
    }
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
    :deep(.o-tab-body) {
      margin-top: 32px;
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
    :deep(.o-tab-body) {
      margin-top: 24px;
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
    }
  }
  .agent-list {
    padding: 16px;
  }
  // 分论坛占位态：移动端整块无内边距
  .agent-list-plain {
    padding: 0;
  }
  .agenda-tabs {
    :deep(.o-tab-body) {
      margin-top: 16px;
    }
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
}
</style>

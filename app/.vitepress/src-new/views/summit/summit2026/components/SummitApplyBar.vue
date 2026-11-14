<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { OButton } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const props = defineProps({
  barData: {
    type: Object,
    required: true,
    default: () => null,
  },
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { lePadV } = useScreen();
const commonStore = useCommon();
const theme = computed<'light' | 'dark'>(() => (commonStore.theme === 'dark' ? 'dark' : 'light'));

// 背景图：>840px 使用 bg_pc，<=840px 使用 bg_mb
const bg = computed(() => {
  const data = props.barData as Record<string, Record<string, string>> | null;
  if (!data) return '';
  return data[lePadV.value ? 'bgMb' : 'bgPc']?.[theme.value] ?? '';
});

// 按钮链接：与本页面顶部 banner 一致（报名期为外部报名页，会后为站内回放锚点），<=840px 使用移动端链接
const applyLink = computed(() => {
  const data = props.bannerData as Record<string, string> | null;
  if (!data) return undefined;
  const link = lePadV.value ? data.buttonLinkMb || data.buttonLink : data.buttonLink;
  return link || undefined;
});

// 外链新窗口打开；站内链接（如回放锚点 #live）不设 target，
// 由 VitePress 路由接管点击，同页平滑滚动到锚点（带 target 属性的链接路由不拦截）
const isExternalLink = computed(() => /^https?:\/\//.test(applyLink.value ?? ''));

// -------------------- 与顶部 banner 的显示联动 --------------------
// 页面顶部 banner（含按钮）在视口内可见时隐藏底部横幅；banner 完全滚出视口（看不到）后再显示。
// IntersectionObserver 以 banner 元素与视口的实际相交为准，初始默认隐藏（页面加载时 banner 必然可见）
const isBannerVisible = ref(true);
let intersectionObserver: IntersectionObserver | null = null;

// -------------------- 与 cookie 提示的物理堆叠 --------------------
// cookie 提示（OCookieNotice，teleport 至 #app，fixed bottom）存在时，横幅 bottom 实时等于其真实高度，
// 两者像蛋糕一样物理堆叠、互不重叠；cookie 提示从 DOM 移除后，横幅自然落回最底部。
// 完全以 DOM 为准（不依赖组件显隐状态）：MutationObserver 监听 cookie 提示的插入/移除，
// ResizeObserver 监听其尺寸变化（含响应式断点、动画过程），保证任意时机都不重叠。
const bottomOffset = ref(0);
let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;

// -------------------- 与移动端页头导航的联动 --------------------
// 移动端页头导航抽屉展开时隐藏横幅：OHeaderMobile 打开菜单会给
// .header-content-mb 追加 header-content-active 类，以 MutationObserver 监听该类的切换
const isNavOpen = ref(false);
let navObserver: MutationObserver | null = null;

const updateNavOpen = () => {
  isNavOpen.value = !!document.querySelector('.header-content-mb.header-content-active');
};

const updateOffset = () => {
  const el = document.querySelector('.cookie-notice');
  bottomOffset.value = el ? el.getBoundingClientRect().height : 0;
};

const startObserve = (el: Element) => {
  updateOffset();
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver(updateOffset);
  }
  resizeObserver.observe(el);
};

const stopObserve = () => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  bottomOffset.value = 0;
};

onMounted(() => {
  // 观察顶部 banner 与视口的相交状态：完全离开视口后显示横幅，重新进入视口则隐藏
  const bannerEl = document.querySelector('.summit-banner');
  if (bannerEl) {
    intersectionObserver = new IntersectionObserver((entries) => {
      isBannerVisible.value = entries[0]?.isIntersecting ?? true;
    });
    intersectionObserver.observe(bannerEl);
  } else {
    // 找不到顶部 banner 时始终显示横幅
    isBannerVisible.value = false;
  }

  // cookie 提示可能先于本组件挂载（如已缓存渲染），先补一次初始测量
  const existing = document.querySelector('.cookie-notice');
  if (existing) {
    startObserve(existing);
  }

  // OCookieNotice teleport 目标为 #app（无该节点时兜底观察 body 的一级子节点）
  const target = document.querySelector('#app') ?? document.body;
  mutationObserver = new MutationObserver(() => {
    const el = document.querySelector('.cookie-notice');
    if (el) {
      startObserve(el);
    } else {
      stopObserve();
    }
  });
  mutationObserver.observe(target, { childList: true });

  // 监听移动端页头导航抽屉的展开/收起（class 切换）
  navObserver = new MutationObserver(updateNavOpen);
  navObserver.observe(document.querySelector('#app') ?? document.body, {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true,
  });
  updateNavOpen();
});

onUnmounted(() => {
  intersectionObserver?.disconnect();
  intersectionObserver = null;
  resizeObserver?.disconnect();
  resizeObserver = null;
  mutationObserver?.disconnect();
  mutationObserver = null;
  navObserver?.disconnect();
  navObserver = null;
});
</script>

<template>
  <div
    class="summit-apply-bar"
    :class="{ 'is-hidden': isBannerVisible || isNavOpen }"
    :style="{ bottom: `${bottomOffset}px`, backgroundImage: `url(${bg})` }"
  >
    <!-- >840px：大会名称 + 时间地点 + 按钮，整体居中 -->
    <div v-if="!lePadV" class="bar-content">
      <span class="bar-title">{{ barData.title }}</span>
      <span class="bar-date-place">{{ barData.datePlace }}</span>
      <OButton
        class="bar-btn"
        variant="solid"
        color="primary"
        size="small"
        :href="applyLink"
        :target="isExternalLink ? '_blank' : undefined"
        :rel="isExternalLink ? 'noopener noreferrer' : undefined"
      >
        {{ barData.buttonText }}
      </OButton>
    </div>
    <!-- <=840px：大会名称居左（可换行），按钮居右 -->
    <div v-else class="bar-content-mb">
      <span class="bar-title">{{ barData.title }}</span>
      <OButton
        class="bar-btn"
        variant="solid"
        color="primary"
        size="small"
        :href="applyLink"
        :target="isExternalLink ? '_blank' : undefined"
        :rel="isExternalLink ? 'noopener noreferrer' : undefined"
      >
        {{ barData.buttonText }}
      </OButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-apply-bar {
  position: fixed;
  left: 0;
  // 堆叠通过 bottom 联动 cookie 提示真实高度实现（物理堆叠）；
  // z-index 仅作兜底：全局 cookie 提示（OCookieNotice）为 999，浮窗低于其
  z-index: 998;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: bottom 0.2s, opacity 0.3s, visibility 0.3s;

  // 顶部 banner 在视口内可见时隐藏横幅（淡出，visibility 延迟生效保证过渡完整）
  &.is-hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .bar-title {
    color: var(--o-color-info1);
    // text1：PC 16px/24px，断点降为 14px
    @include text1;
    font-weight: 500;
  }

  .bar-btn {
    flex-shrink: 0;
    // PC 端按钮高度 32px（覆盖 OButton small 档的 --btn-height: 28px）
    --btn-height: 32px;
  }
}

.bar-content {
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  // 上下 padding 12px，与移动端内容区一致
  padding: 12px 24px;

  .bar-title {
    margin-right: 12px;
  }

  .bar-date-place {
    color: var(--o-color-info3);
    font-weight: 400;
    @include text1;
  }
}

// <=840px：文字居左（可换行），按钮居右；左右内边距对齐页面内容区
@include respond('<=pad_v') {
  .bar-content-mb {
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    // 上下 padding 12px；左右对齐页面内容区（--layout-content-padding 定义在 #app 上：
    // <=1200px 为 32px、<=600px 为 24px，与上方内容区一致）
    padding: 12px var(--layout-content-padding);

    .bar-title {
      flex: 1;
    }

    .bar-btn {
      // 移动端按钮高度 28px（OButton small 档默认值）
      --btn-height: 28px;
    }
  }
}
</style>

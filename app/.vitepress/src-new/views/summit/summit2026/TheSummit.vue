<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { OTab, OTabPane } from '@opensig/opendesign';

import { oaReport } from '@opendesign-plus/plugins/analytics';
import { getUrlParams } from '~@/utils/common';
import { useCookieStore } from '~@/stores/common';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntroduce from './components/SummitIntroduce.vue';
import SummitLive from './components/SummitLive.vue';
import SummitAgent from './components/SummitAgent.vue';
import SummitGuest from './components/SummitGuest.vue';
import SummitPartner from './components/SummitPartner.vue';
import SummitPrevious from './components/SummitPrevious.vue';
import SummitApplyBar from './components/SummitApplyBar.vue';

import summitContent from '#content/interaction/summit-list/summit2026';

import { useLocale } from '~@/composables/useLocale';

const { locale, isZh } = useLocale();
const cookieStore = useCookieStore();

// YAML 字段名为 snake_case，子组件期望 camelCase，递归转换
function snakeToCamel(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
      result[camelKey] = snakeToCamel((obj as Record<string, unknown>)[key]);
    }
    return result;
  }
  return obj;
}

const summitData = computed(
  () => snakeToCamel(summitContent[locale.value]) as typeof summitContent[typeof locale.value]
);

// 埋点统计投放流量
function collectAdvertisedData() {
  const { href } = window.location;
  const regex = /[?&]utm_source=/;
  const containsUtmSource = regex.test(href);
  if (!containsUtmSource) {
    return;
  }
  const channel = getUrlParams(href)?.get('utm_source');
  oaReport('fromAdvertised', {
    origin: href,
    channel,
  });
  history.pushState(null, '', location.origin + location.pathname);
}

onMounted(() => {
  // zh 下插件门控（isCookieAgreed）恒通过，直接上报；
  // en 下监听 OCookieNotice 的 analysisAllowed（同意分析 cookie）后再上报
  if (isZh.value) {
    collectAdvertisedData();
    return;
  }
  watch(
    () => cookieStore.analysisAllowed,
    (val) => {
      if (!val) return;
      collectAdvertisedData();
      // 用户停留期间点击同意时插件可能仍处于禁用态（初始化时 en 门控未过），
      // 手动启用以立即冲刷队列，否则要等 visibilitychange/路由变化
      // any 原因：插件全局实例类型未导出，同 src/stores/user.ts 的既有用法
      (window as any)?.__OA_INSTANCE__?.enableReporting?.(true);
    },
    { immediate: true }
  );
});

//-------- 直播 --------
const LIVE_TAB_START_TIME = new Date('2026-11-14T00:00:00').getTime();
const LIVE_TAB_END_TIME = new Date('2026-11-15T00:00:00').getTime();
const tabLive = ref(0);

onMounted(() => {
  const now = Date.now();
  if (now >= LIVE_TAB_START_TIME && now < LIVE_TAB_END_TIME) {
    tabLive.value = 1;
  }
});
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <ContentWrapper vertical-padding="0">
    <SummitIntroduce :introduce-data="summitData.introduce" />
    <div id="live" class="live">
      <p class="section-title">{{ summitData.live.title }}</p>
      <OTab v-model="tabLive" :line="false" class="live-tabs">
        <OTabPane
          v-for="(item, i) in summitData.live.list"
          :key="i"
          :label="item.time"
          :value="i"
        >
          <ClientOnly>
            <SummitLive v-if="tabLive === i" :live-data="item.lives" :day-index="i" class="live-box" :key="i"/>
          </ClientOnly>
        </OTabPane>
      </OTab>
    </div>
    <SummitAgent :agent-data="summitData.agent" />
    <SummitGuest :guest-data="summitData.guest" />
    <SummitPartner v-if="summitData.partner?.visible !== false" :partner-data="summitData.partner" />
    <SummitPrevious :previous-data="summitData.previous" />
  </ContentWrapper>
  <!-- 底部浮窗（大会期「立即报名」，会后「观看回放」），链接复用顶部 banner -->
  <SummitApplyBar
    :bar-data="summitData.applyBar"
    :banner-data="summitData.banner"
  />
</template>

<style scoped lang="scss">
:deep(.section-title) {
  text-align: center;
  @include display3;
}

// 直播区域与下方活动日程的间距：PC 72px（--o-gap-10）
.live {
  margin-bottom: var(--o-gap-10);
}

.live-tabs {
  margin-top: 40px;
  --tab-nav-bg-color: var(--o-color-fill2);
  --tab-nav-bg-color-active: var(--o-color-primary1);
  --tab-nav-bg-color-hover: var(--o-color-fill2);
  --tab-icon-color: var(--o-color-info1);
  --tab-nav-color-active: var(--o-color-white);
  --tab-nav-color-hover: var(--o-color-info1);
  --tab-nav-gap: 0;
  --tab-nav-padding: 12px 24px;
  --tab-nav-anchor-color: transparent;
  :deep(.o-tab-head) {
    @include h3;
    .o-tab-nav {
      width: 190px;
      justify-content: center;
      &:first-of-type {
        border-radius: 4px 0 0 4px;
      }
      &:last-of-type {
        border-radius: 0 4px 4px 0;
      }

      @include respond('laptop') {
        width: 190px;
      }
      @include respond('pad_h') {
        width: 190px;
      }
      @include respond('<=pad_v') {
        width: auto;
      }
    }
  }
  :deep(.o-tab-body) {
    margin-top: 40px;
  }

  @include respond('<=pad_v') {
    --tab-nav-padding: 8px 16px;
  }
}
</style>

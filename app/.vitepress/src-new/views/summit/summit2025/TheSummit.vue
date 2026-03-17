<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { OTab, OTabPane } from '@opensig/opendesign';

import { oaReport } from '@/shared/analytics';
import { getUrlParams } from '~@/utils/common';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntroduce from './components/SummitIntroduce.vue';
import SummitLive from './components/SummitLive.vue';
import SummitAgent from './components/SummitAgent.vue';
import SummitGuest from './components/SummitGuest.vue';
import SummitPartner from './components/SummitPartner.vue';
import SummitPrevious from './components/SummitPrevious.vue';

import data_zh from './data/data_zh';
import data_en from './data/data_en';

import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

const summitData = computed(() => {
  return locale.value === 'zh' ? data_zh : data_en;
});

// 埋点统计投放流量
function collectAdvertisedData() {
  const { href } = window.location;
  const regex = /[\\?&]utm_source=/;
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
  collectAdvertisedData();
});
//-------- 直播 --------
const tabLive = ref(0)
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
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
            <SummitLive v-if="tabLive === i" :live-data="item.lives" class="live-box" :key="i"/>
          </ClientOnly>
        </OTabPane>
      </OTab>
    </div>
    <SummitAgent :agent-data="summitData.agent" />
    <SummitGuest v-if="summitData.guest.title" :guest-data="summitData.guest" />
    <SummitPartner :partner-data="summitData.partner" />
    <SummitPrevious :previous-data="summitData.previous" />
  </AppContext>
</template>

<style scoped lang="scss">
:deep(.section-title) {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--o-color-info1);
  font-weight: 500;
  @include display3;
  .o-icon {
    --icon-size: 32px;
    margin-left: 16px;
  }
  @include respond-to('<=pad_v') {
    .o-icon {
      --icon-size: 16px;
      margin-left: 12px;
    }
  }
}

.live {
  margin-top: 72px;
  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }
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
      width: 193px;
      justify-content: center;
      &:first-of-type {
        border-radius: 4px 0 0 4px;
      }
      &:last-of-type {
        border-radius: 0 4px 4px 0;
      }

      @include respond-to('laptop') {
        width: 154px;
      }
      @include respond-to('pad_h') {
        width: 124px;
      }
      @include respond-to('<=pad_v') {
        width: auto;
      }
    }
  }
  :deep(.o-tab-body) {
    margin-top: 40px;
  }

  @include respond-to('<=pad_v') {
    --tab-nav-padding: 8px 16px;
  }
}
</style>

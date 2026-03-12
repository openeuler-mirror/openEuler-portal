<script lang="ts" setup>
import { OTab, OTabPane } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import archImg from '@/assets/nestos/architecture.png';

const { t } = useLocale();
</script>

<template>
  <AppSection :title="t('nestos.archTitle')">
    <OTab default-value="container" variant="text" :line="false" class="arch-tab">
      <OTabPane value="container" :label="t('nestos.nfcTitle')">
        <div class="arch-content">
          <p class="arch-desc">{{ t('nestos.nfcDesc') }}</p>
          <div class="arch-img-wrapper">
            <img :src="archImg" alt="NestOS Architecture" class="arch-img" />
          </div>
        </div>
      </OTabPane>
      <OTabPane value="virt" :label="t('nestos.nfvTitle')">
        <div class="arch-content">
          <p class="arch-desc">{{ t('nestos.nfvDesc') }}</p>
        </div>
      </OTabPane>
    </OTab>
  </AppSection>
</template>

<style scoped lang="scss">
.arch-tab {
  :deep(.o-tab-navs) {
    --tab-nav-justify: center;
    margin-bottom: 24px;
  }
}

.arch-content {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px;
}

.arch-desc {
  @include text2;
  color: var(--o-color-info2);
  line-height: 1.75;
  margin-bottom: 24px;
}

.arch-img-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arch-img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: var(--o-radius-xs);
}

@include respond-to('laptop') {
  .arch-content {
    padding: 24px;
  }
}

@include respond-to('pad_h') {
  .arch-content {
    padding: 20px;
  }
}

@include respond-to('<=pad_v') {
  .arch-content {
    padding: 16px;
  }

  .arch-desc {
    @include text1;
    margin-bottom: 16px;
  }
}
</style>


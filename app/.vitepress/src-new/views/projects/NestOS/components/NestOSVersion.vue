<script lang="ts" setup>
import { OTab, OTabPane, OFigure } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import archImg from '~@/assets/category/nestos/architecture.png';

const { t } = useLocale();
</script>

<template>
  <AppSection :title="t('nestos.archTitle')">
    <OTab default-value="container" variant="text" :line="false" class="arch-tab">
      <OTabPane value="container" :label="t('nestos.nfcTitle')">
        <div class="arch-content">
          <p class="arch-desc">{{ t('nestos.nfcDesc') }}</p>
          <OFigure :src="archImg" class="arch-img"></OFigure>
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
  padding: 40px 32px;
}

.arch-desc {
  color: var(--o-color-info2);
  @include text2;
}
.arch-img {
  max-width: 1125px;
  --figure-radius: var(--o-radius-xs);
  margin: 32px auto 0;
  display: flex;
}

@include respond-to('laptop') {
  .arch-content {
    padding: 32px 24px;
  }
  .arch-img {
    margin: 24px auto 0;
  }
}

@include respond-to('pad_h') {
  .arch-content {
    padding: 16px;
  }
  .arch-img {
    margin: 16px auto 0;
  }
}

@include respond-to('<=pad_v') {
  .arch-content {
    padding: 16px;
  }

  .arch-desc {
    @include text1;
  }
  .arch-img {
    margin: 12px auto 0;
  }
}
</style>


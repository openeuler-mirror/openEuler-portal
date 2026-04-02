<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OCard } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { t } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

const features = [
  {
    titleKey: 'nestos.feature1Title',
    descKey: 'nestos.feature1Desc',
    slug: 'kernel',
  },
  {
    titleKey: 'nestos.feature2Title',
    descKey: 'nestos.feature2Desc',
    slug: 'pilotgo',
  },
  {
    titleKey: 'nestos.feature3Title',
    descKey: 'nestos.feature3Desc',
    slug: 'nkd',
  },
  {
    titleKey: 'nestos.feature4Title',
    descKey: 'nestos.feature4Desc',
    slug: 'rubik',
  },
  {
    titleKey: 'nestos.feature5Title',
    descKey: 'nestos.feature5Desc',
    slug: 'custom-image',
  },
  {
    titleKey: 'nestos.feature6Title',
    descKey: 'nestos.feature6Desc',
    slug: 'x2nestos',
  },
];

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (leLaptop.value) {
    return '24px 24px';
  }
  return '32px 32px';
})
</script>

<template>
  <AppSection id="features" :title="t('nestos.featuresTitle')">
    <ORow :gap="gap" wrap="wrap">
      <OCol v-for="(item, i) in features" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <OCard hoverable :href="`/zh/other/projects/nestos/feature/${item.slug}/`" target="_blank">
          <p class="feature-title">{{ t(item.titleKey) }}</p>
          <p class="feature-desc">{{ t(item.descKey) }}</p>
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.o-card {
  --card-main-padding: 24px 32px;
  @include hover {
    .feature-title {
      color: var(--o-color-primary1);
    }
  }
}
.feature-title {
  font-weight: 600;
  color: var(--o-color-info1);
  @include h3;
}

.feature-desc {
  font-weight: 400;
  color: var(--o-color-info3);
  margin-top: 8px;
  @include text1;
}

@include respond-to('laptop') {
  .o-card {
    --card-main-padding: 24px;
  }
}

@include respond-to('pad_h') {
  .o-card {
    --card-main-padding: 16px;
  }
}

@include respond-to('<=pad_v') {
  .o-card {
    --card-main-padding: 16px;
  }
}
</style>

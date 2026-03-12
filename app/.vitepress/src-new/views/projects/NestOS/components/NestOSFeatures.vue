<script lang="ts" setup>
import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

const { t } = useLocale();

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
</script>

<template>
  <AppSection id="features" :title="t('nestos.featuresTitle')">
    <div class="features-grid">
      <a
        v-for="(feature, i) in features"
        :key="i"
        :href="`/zh/other/projects/nestos/feature/${feature.slug}/`"
        class="feature-card"
      >
        <p class="feature-title">{{ t(feature.titleKey) }}</p>
        <p class="feature-desc">{{ t(feature.descKey) }}</p>
      </a>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.features-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 32px;
  background-color: var(--o-color-fill2);
  border-radius: 4px;
  text-decoration: none;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: var(--o-shadow-2);

    .feature-title {
      color: var(--o-color-primary1);
    }
  }
}

.feature-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: var(--o-color-info1);
  transition: color 0.2s;
}

.feature-desc {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--o-color-info3);
}

@include respond-to('laptop') {
  .features-grid {
    gap: 24px;
  }

  .feature-card {
    padding: 20px 24px;
  }

  .feature-title {
    font-size: 20px;
    line-height: 28px;
  }
}

@include respond-to('pad_h') {
  .feature-card {
    padding: 18px 20px;
  }

  .feature-title {
    font-size: 18px;
    line-height: 26px;
  }
}

@include respond-to('<=pad_v') {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .feature-card {
    padding: 16px 20px;
  }

  .feature-title {
    font-size: 16px;
    line-height: 24px;
  }

  .feature-desc {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>

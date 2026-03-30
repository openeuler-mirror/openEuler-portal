<script lang="ts" setup>
import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

const { t } = useLocale();

const infoList = [
  'bishengJdk.infoLicense',
  'bishengJdk.infoVersions',
  'bishengJdk.infoArch',
  'bishengJdk.infoOS',
];
</script>

<template>
  <AppSection :title="t('bishengJdk.introTitle')">
    <div class="intro-card">
      <p class="intro-desc">{{ t('bishengJdk.introDesc1') }}</p>
      <p class="intro-desc">{{ t('bishengJdk.introDesc2') }}</p>
      <p class="info-label">{{ t('bishengJdk.moreInfo') }}</p>
      <ul class="info-list">
        <li v-for="key in infoList" :key="key" class="info-item">
          {{ t(key) }}
        </li>
      </ul>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.app-section {
  :deep(.section-wrapper) {
    margin-top: 40px;
  }
}
.intro-card {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 40px 32px;
  color: var(--o-color-info1);
  @include text2;
}

.info-label {
  margin-top: 12px;
  font-weight: 500;
  @include text2;
}

.info-list {
  margin-top: 12px;
  padding-left: 20px;
  list-style: disc;
}

.info-item {
  color: var(--o-color-info1);
}

@include respond-to('laptop') {
  .intro-card {
    padding: 32px 24px;
  }
}

@include respond-to('pad_h') {
  .intro-card {
    padding: 24px 16px;
  }
}

@include respond-to('<=pad_v') {
  .app-section {
    :deep(.section-wrapper) {
      margin-top: 32px;
    }
  }
  .intro-card {
    padding: 12px;
    @include text1;
  }
}
@include respond-to('phone') {
  .app-section {
    :deep(.section-wrapper) {
      margin-top: 16px;
    }
  }
}
</style>

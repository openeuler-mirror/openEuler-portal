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
.intro-card {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px;
  color: var(--o-color-info1);
  @include text2;
}

.intro-desc {
  @include text2;
  line-height: 1.75;

  & + .intro-desc {
    margin-top: 12px;
  }
}

.info-label {
  margin-top: 20px;
  @include text2;
  font-weight: 500;
}

.info-list {
  margin-top: 8px;
  padding-left: 20px;
  list-style: disc;
}

.info-item {
  @include text2;
  line-height: 1.75;
  color: var(--o-color-info1);

  & + .info-item {
    margin-top: 4px;
  }
}

@include respond-to('laptop') {
  .intro-card {
    padding: 24px;
  }
}

@include respond-to('pad_h') {
  .intro-card {
    padding: 20px;
  }
}

@include respond-to('<=pad_v') {
  .intro-card {
    padding: 16px;
  }

  .intro-desc {
    @include text1;
  }

  .info-label {
    margin-top: 16px;
    @include text1;
  }

  .info-item {
    @include text1;
  }
}
</style>

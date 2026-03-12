<script lang="ts" setup>
import { OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

const { t } = useLocale();
</script>

<template>
  <AppSection :title="t('nestos.introTitle')">
    <div class="intro-card">
      <p class="intro-desc">{{ t('nestos.introDesc1') }}</p>
      <p class="intro-desc">
        {{ t('nestos.introDesc2Pre') }}<OLink
          href="https://nestos.org.cn/"
          target="_blank"
          color="primary"
          class="intro-link"
        >{{ t('nestos.introDesc2Link1') }}</OLink>{{ t('nestos.introDesc2Mid') }}<OLink
          href="https://gitee.com/openeuler/NestOS/issues"
          target="_blank"
          color="primary"
          class="intro-link"
        >{{ t('nestos.introDesc2Link2') }}</OLink>{{ t('nestos.introDesc2Post') }}
      </p>
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
}

.intro-desc {
  @include text2;
  line-height: 1.75;
  color: var(--o-color-info2);

  & + .intro-desc {
    margin-top: 12px;
  }
}

.intro-link {
  :deep(.o-link-label) {
    @include text2;
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

  .intro-link {
    :deep(.o-link-label) {
      @include text1;
    }
  }
}
</style>

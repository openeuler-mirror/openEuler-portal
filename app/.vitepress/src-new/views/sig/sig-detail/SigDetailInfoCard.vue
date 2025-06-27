<script lang="ts" setup>
import { useLocale } from '~@/composables/useLocale';

import { OIcon, ODivider, OLink } from '@opensig/opendesign';

import IconOutlink from '~icons/sig/icon-outlink.svg';

const { t } = useLocale();

defineProps({
  sigName: {
    type: String,
    default: '',
  },
  giteeAddress: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <div class="sig-detail-info-card">
    <div class="sig-name-box">
      <span class="sig-name">{{ sigName }}</span>
      <ODivider v-if="!lePadV" direction="v" />
      <OLink
        color="primary"
        :href="giteeAddress"
        target="_blank"
        class="more-gitee"
      >
        <span>{{ t('sig.giteeMore') }}</span>
        <OIcon><IconOutlink /></OIcon>
      </OLink>
    </div>
    <div class="content">
      <div class="sig-description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-detail-info-card {
  position: relative;
  padding: 24px 40px;
  border-radius: var(--o-radius-xs);
  background-size: cover;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-image: url('~@/assets/category/sig/sig-card_bg_light.png'),
    linear-gradient(163deg, #e3f0ff 0%, #cae4ff 100%);
  @include respond-to('<=pad_v') {
    padding: 16px;
    background-image: linear-gradient(163deg, #eef4fe 0%, #dfecfe 100%);
  }

  .sig-name-box {
    display: flex;
    align-items: center;
  }
  .sig-name {
    font-weight: 500;
    @include h2;
  }
  .more-gitee {
    :deep(.o-link-label) {
      display: flex;
      align-items: center;
      .o-icon {
        margin-left: 4px;
      }
    }
  }

  .sig-description {
    margin-top: 24px;
    @include text1;
  }

  .divider-mo {
    display: none;
    @include respond-to('<=pad_v') {
      display: block;
    }
  }
}

@include respond-to('<=pad_v') {
  .sig-detail-info-card {
    padding: 0;
    background-image: none;
    .sig-name-box {
      align-items: flex-start;
      flex-direction: column;
    }
    .sig-description {
      margin-top: 12px;
    }
    .o-link {
      margin-top: 8px;
      @include text2;
    }
  }
}

[data-o-theme='dark'] {
  .sig-detail-info-card {
    background-image: url('~@/assets/category/sig/sig-card_bg_dark.png'),
      linear-gradient(163deg, #30364e 0%, #1d2855 100%);
  }
  @include respond-to('<=pad_v') {
    .sig-detail-info-card {
      background-image: none;
    }
  }
}
</style>

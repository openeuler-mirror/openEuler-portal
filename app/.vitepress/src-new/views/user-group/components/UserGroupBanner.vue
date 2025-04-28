<script lang="ts" setup>
import { computed } from 'vue';

import { OButton } from '@opensig/opendesign';
import BannerLevel2 from '~@/components/BannerLevel2.vue';

import { bannerData } from '~@/data/user-group';
import { useScreen } from '~@/composables/useScreen';

const { isPhone } = useScreen();
</script>

<template>
  <div class="user-group-banner">
    <BannerLevel2
      :background-image="bannerData.bg_pc"
      :title="bannerData.title"
      :subtitle="bannerData.desc"
    >
      <OButton
        animation
        variant="solid"
        color="primary"
        size="large"
        :href="bannerData.href"
        target="_blank"
      >
        {{ bannerData.btn }}
      </OButton>
    </BannerLevel2>
  </div>
</template>

<style lang="scss" scoped>
.user-group-banner {
  :deep(.banner-level2 .wrap) {
    .banner-text {
      max-width: 60%;
    }
    .banner-title,
    .banner-subtitle {
      color: rgba(var(--o-black));
    }
  }

  @include respond-to('phone') {
    :deep(.banner-level2) {
      background-color: unset;

      .banner-bg {
        display: none;
      }
      .wrap {
        height: auto;
        margin-top: var(--o-gap-5);
      }
      .wrap .banner-text {
        max-width: 100%;

        .banner-title {
          color: var(--o-color-info1);
        }
        .banner-subtitle {
          color: var(--o-color-info2);
          margin-top: var(--o-gap-2);
        }
        .banner-operation {
          margin-top: var(--o-gap-3);
        }
      }
    }
  }

  @include respond-to('pad_v') {
    :deep(.banner-level2 .wrap .banner-text) {
      max-width: 70%;
    }
  }
}
</style>

<script lang="ts" setup>
import { OButton } from '@opensig/opendesign';
import BannerLevel2 from '~@/components/BannerLevel2.vue';

import { bannerData } from '~@/data/user-group';
import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();
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
        :size="lePadV ? 'small' : 'large'"
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
    .banner-title {
      @include display2;
      color: rgba(var(--o-black));
    }
    .banner-subtitle {
      @include text2;
      color: rgba(var(--o-black));
      margin-top: var(--o-gap-2);
    }

    height: 280px;

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-title {
        font-size: 40px;
        line-height: 56px;
      }
      .banner-subtitle {
        font-size: 16px;
        line-height: 24px;
      }
      .banner-operation {
        margin-top: var(--o-gap-4);

        .o-btn {
          --btn-height: 32px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-title {
        @include display2;
      }
      .banner-subtitle {
        @include text2;
      }
    }
  }

  @include respond-to('<=pad_v') {
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
}
</style>

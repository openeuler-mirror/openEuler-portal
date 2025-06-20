<script lang="ts" setup>
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import SigWelcomeJoin from './SigWelcomeJoin.vue';
import SigAbout from './SigAbout.vue';
import SigList from './SigList.vue';

import banner from '~@/assets/category/sig/sig-center-banner.jpg';
</script>
<template>
  <BannerLevel2
    class="sig-banner"
    :title="$t('sig.sigCenter')"
    :subtitle="$t('sig.subtitle')"
    :background-image="banner"
  />
  <div class="mo-title">{{ $t('sig.sigCenter') }}</div>
  <SigWelcomeJoin class="sig-welcome" />
  <SigAbout />
  <SigList />
</template>

<style scoped lang="scss">
.sig-banner {
  :deep(.wrap) {
    .banner-text {
      max-width: 60%;
      .banner-title {
        @include display2;
        color: var(--o-color-black);
      }
      .banner-subtitle {
        @include text2;
        color: var(--o-color-black);
        margin-top: var(--o-gap-2);
      }
    }

    height: 280px;

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
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
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
        .banner-subtitle {
          @include text2;
        }
      }
    }
  }
}

.sig-banner {
  @include respond-to('<=pad_v') {
    display: none;
  }
}

.mo-title {
  display: none;
  @include respond-to('<=pad_v') {
    margin-top: 16px;
    display: block;
    text-align: center;
    @include display1;
  }
}

.sig-welcome {
  :deep(.section-wrapper) {
    margin-top: 40px;
    @include respond-to('<=pad_v') {
      margin-top: 12px;
    }
  }
}
</style>

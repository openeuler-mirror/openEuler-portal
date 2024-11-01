<script lang="ts" setup>
import { OCard, OButton, OIcon } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';

import IconOutLink from '~icons/app/icon-out-link2.svg';
import illustration from '~@/assets/category/talent-assessment/rencai.png';

const { isPhone } = useScreen();
</script>
<template>
  <div class="talent-certification">
    <h2 class="talent-title">{{ $t('talent.talentCertificationTitle') }}</h2>
    <OCard
      class="talent-certification-card"
      :style="{ '--card-main-padding': '6px' }"
    >
      <img class="card-img img-in-dark" :src="illustration" alt="" />
      <div class="card-info">
        <p class="introduce">{{ $t('talent.talentCertificationIntro') }}</p>
        <a
          :href="$t('talent.talentCertificationIntroLink')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OButton color="primary" :size="isPhone ? 'medium' : 'large'">
            {{ $t('talent.talentCertificationBtn') }}
            <template #suffix>
              <OIcon><IconOutLink /></OIcon>
            </template>
          </OButton>
        </a>
      </div>
    </OCard>
  </div>
</template>

<style scoped lang="scss">
.talent-certification {
  .talent-title {
    margin-top: 0;
  }
}

.talent-certification-card {
  margin-top: 40px;
  color: var(--o-color-info1);
  @include respond-to('phone') {
    margin-top: 16px;
    background-color: transparent;
    :deep(.o-card-main) {
      padding: 0;
    }
  }

  :deep(.o-card-content) {
    display: flex;
    .card-img {
      max-width: 400px;
      margin-right: 40px;
      @include respond-to('<=laptop') {
        max-width: 300px;
      }
      @include respond-to('phone') {
        display: none;
      }
    }
    .card-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px;
      @include text1;
      a {
        width: min-content;
      }
      .o-btn {
        margin-top: 24px;
      }
      @include respond-to('<=laptop') {
        .o-btn {
          margin-top: 12px;
          width: min-content;
        }
        padding: 16px;
      }
      @include respond-to('phone') {
        padding: 0;
        align-items: center;
        .o-btn {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>

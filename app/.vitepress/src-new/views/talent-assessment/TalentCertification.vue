<script lang="ts" setup>
import { reactive, computed, ref, onMounted, onUpdated } from 'vue';
import { OCard, OButton, OIcon } from '@opensig/opendesign';

import illustration from '~@/assets/category/talent-assessment/rencai.png';
</script>
<template>
  <div class="talent-certification">
    <h2 class="talent-title">{{ $t('talent.talentCertificationTitle') }}</h2>
    <OCard class="talent-certification-card">
      <img class="card-img" :src="illustration" alt="" />
      <div class="card-info">
        <p class="introduce">{{ $t('talent.talentCertificationIntro') }}</p>
        <OButton>
          {{ $t('talent.talentCertificationBtn') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
      </div>
    </OCard>
  </div>
</template>

<style scoped lang="scss">
.talent-certification-card {
  margin-top: 40px;
  color: var(--o-color-info1);
  :deep(.o-card-content) {
    display: flex;
    .card-img {
      max-width: 400px;
      margin-right: 40px;
    }
    .card-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px;
      @include text1;
      .o-btn {
        width: min-content;
      }
    }
  }
}
</style>

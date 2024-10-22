<script lang="ts" setup>
import { OCard, OButton, OIcon, ODivider } from '@opensig/opendesign';

import talentDemand from '~@/data/talent/talent-demand';
</script>
<template>
  <div class="talent-demand">
    <h2 class="talent-title">{{ $t('talent.talentdemandTitle') }}</h2>
    <p class="introduce">{{ $t('talent.talentdemandIntro') }}</p>
    <OCard v-for="companyData in talentDemand" class="talent-demand-card">
      <img class="card-img" :src="companyData.logo" alt="" />
      <div class="card-info">
        <h4 class="company">{{ companyData.company }}</h4>
        <p class="company-introduce">{{ companyData.intro }}</p>
        <h5 class="post-title">{{ $t('talent.post') }}</h5>
        <div class="post-list">
          <div
            class="post"
            v-for="(post, index) in companyData.posts"
            :key="post"
          >
            {{ post }}
            <ODivider
              direction="v"
              v-if="index !== companyData.posts.length - 1"
            />
          </div>
        </div>
        <OButton
          color="primary"
          hover="none"
          variant="text"
          size="large"
          :style="{ '--btn-padding': 0 }"
        >
          {{ $t('talent.viewPost') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
      </div>
    </OCard>
  </div>
</template>

<style scoped lang="scss">
.introduce {
  margin-top: 16px;
  text-align: center;
}
.talent-demand-card {
  margin-top: 40px;
  color: var(--o-color-info1);
  :deep(.o-card-content) {
    display: flex;
    align-items: center;
    .card-img {
      max-width: 160px;
      margin-right: 32px;
    }
    .card-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px 0 0 0;
      @include text1;
      .company {
        font-weight: 500;
        @include h3;
        color: var(--o-color-info1);
      }
      .company-introduce {
        margin-top: 16px;
        color: var(--o-color-info2);
      }
      .post-title {
        font-weight: 500;
        margin-top: 24px;
        color: var(--o-color-info1);
      }
      .post-list {
        margin-top: 8px;
        display: flex;
      }
      .o-btn {
        margin-top: 24px;
        width: min-content;
      }
    }
  }
}
</style>

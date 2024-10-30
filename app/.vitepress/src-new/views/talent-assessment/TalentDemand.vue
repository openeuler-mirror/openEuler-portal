<script lang="ts" setup>
// TODO: 使用新主题切换 hook
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

import { OCard, OButton, OIcon, ODivider } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';

import IconOutLink from '~icons/app/icon-out-link2.svg';

import talentDemand from '~@/data/talent/talent-demand';

const { theme } = storeToRefs(useCommon());

const { isPhone } = useScreen();
</script>
<template>
  <div class="talent-demand">
    <h2 class="talent-title">{{ $t('talent.talentdemandTitle') }}</h2>
    <p class="introduce">{{ $t('talent.talentdemandIntro') }}</p>
    <OCard v-for="companyData in talentDemand" class="talent-demand-card">
      <img class="card-img" :src="companyData.logo[theme]" alt="" />
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
        <a :href="companyData.link" target="_blank" rel="noopener noreferrer">
          <OButton
            color="primary"
            hover="none"
            variant="text"
            :size="isPhone ? 'medium' : 'large'"
            :style="{
              '--btn-padding': 0,
              '--btn-bg-color-hover': 'transparent',
              '--btn-bg-color-active': 'transparent',
            }"
          >
            {{ $t('talent.viewPost') }}
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
.introduce {
  margin-top: 16px;
  text-align: center;
  color: var(--o-color-info1);
  @include text1;
  @include respond-to('phone') {
    text-align: left;
    color: var(--o-color-info2);
  }
}
.talent-demand-card {
  margin-top: 40px;
  &:not(:first-child) {
    margin-top: 24px;
  }
  color: var(--o-color-info1);
  @include respond-to('phone') {
    margin-top: 16px;
  }
  :deep(.o-card-content) {
    display: flex;
    align-items: center;
    .card-img {
      max-width: 160px;
      margin-right: 32px;
      background-color: var(--o-white);
      @include respond-to('phone') {
        margin: 0;
        height: 84px;
        max-width: fit-content;
      }
    }
    .card-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @include text1;
      @include respond-to('phone') {
        margin-top: 12px;
      }
      .company {
        font-weight: 500;
        @include h3;
        color: var(--o-color-info1);
      }
      .company-introduce {
        margin-top: 16px;
        color: var(--o-color-info2);
        @include respond-to('phone') {
          margin-top: 4px;
        }
      }
      .post-title {
        font-weight: 500;
        margin-top: 24px;
        @include text1;
        color: var(--o-color-info1);
        @include respond-to('phone') {
          margin-top: 12px;
        }
      }
      .post-list {
        display: flex;
        margin-top: 8px;
        color: var(--o-color-info2);
        flex-wrap: wrap;
      }
      a {
        width: min-content;
      }
      .o-btn {
        margin-top: 24px;
        @include respond-to('phone') {
          margin-top: 16px;
        }
      }
    }
    @include respond-to('phone') {
      flex-direction: column;
    }
  }
}
</style>

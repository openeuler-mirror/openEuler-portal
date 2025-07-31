<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import { OFigure, OLink } from '@opensig/opendesign';
import { storeToRefs } from 'pinia';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { vAnalytics } from '~@/directive/analytics';
import { friendlyCommunityConfig } from '~@/data/home/friendly-community';

const { theme } = storeToRefs(useCommon());
const { isEn } = useLocale();
</script>

<template>
  <AppSection
    :title="$t('home.friendlyCommunity')"
    :subtitle="$t('home.friendlyCommunityDesc')"
    class="friendly-community-section"
  >
    <div class="community-container">
      <div v-for="community in friendlyCommunityConfig" :key="community.url" :class="['community', { 'with-desc': 'desc' in community }]">
        <OLink
          :href="community.url"
          target="_blank"
          v-analytics.bubble="{
            target: community.url,
            level1: $t('home.friendlyCommunity')
          }"
        >
          <div class="community-logo">
            <OFigure :src="community.logo[theme]" />
          </div>
        </OLink>
        <p class="community-desc">{{ isEn ? community.desc_en : community.desc }}</p>
      </div>
    </div>
    <template #footer>
      <p class="partner-tips">{{ $t('home.sortTips') }}</p>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
.friendly-community-section {
  @include respond-to('>phone') {
    :deep(.section-subtitle) {
      width: 90%;
      text-align: center;
    }
  }
}
.community-container {
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  padding: 24px 115px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 72px;

  .community {
    position: relative;
    text-align: center;

    .community-desc {
      position: absolute;
      white-space: nowrap;
      left: 50%;
      transform: translate(-50%);
      color: var(--o-color-info3);
      @include tip2;
    }
  }

  .community-logo {
    width: 270px;
    height: 90px;
  }

  @include respond-to('pad_v-laptop') {
    padding: 24px 72px;

    .community-logo {
      width: 210px;
      height: 70px;
    }
  }

  @include respond-to('pad_h') {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include respond-to('pad_v') {
    padding: 12px 0;
    row-gap: 36px;

    .community .community-desc {
      font-size: 10px;
    }

    .community-logo {
      width: 140px;
      height: 48px;
    }
  }

  @media (min-width: 601px) and (max-width: 770px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include respond-to('phone') {
    padding: 12px 0;
    display: flex;
    flex-wrap: wrap;
    row-gap: 12px;
    align-items: center;
    justify-content: center;

    .community {
      flex: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .community-desc {
        position: relative;
      }

      .community-logo {
        width: 155px;
        height: 52px;
      }

      &.with-desc {
        display: unset;
        text-align: center;
        flex: 100%;
      }
    }
  }
}
</style>

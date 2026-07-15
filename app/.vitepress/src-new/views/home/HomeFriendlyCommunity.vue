<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import { OFigure, OLink } from '@opensig/opendesign';
import { storeToRefs } from 'pinia';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
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
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
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

  @include respond-to('>pad') {
    /* 情况1：最后一行只有1个元素 */
    .community:nth-last-child(1):nth-child(4n + 1) {
      grid-column: 2 / 4; /* 让单个元素占据第2-3列中间位置 */
    }

    /* 情况2：最后一行有2个元素 */
    .community:nth-last-child(2):nth-child(4n + 3) {
      grid-column: 2 / 3; /* 第一个元素放第2列 */
    }
    .community:nth-last-child(1):nth-child(4n + 4) {
      grid-column: 3 / 4; /* 第二个元素放第3列 */
    }

    /* 情况3：最后一行有3个元素 */
    .community:nth-last-child(3):nth-child(4n + 2) {
      grid-column: 1 / 2; /* 第一个元素放第1列 */
    }
    .community:nth-last-child(2):nth-child(4n + 3) {
      grid-column: 2 / 3; /* 第二个元素放第2列 */
    }
    .community:nth-last-child(1):nth-child(4n + 4) {
      grid-column: 3 / 4; /* 第三个元素放第3列 */
    }
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

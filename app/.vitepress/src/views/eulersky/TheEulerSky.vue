<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import banner from '@/assets/banner/banner-interaction.png';
import skyIllustration from '@/assets/illustrations/euler-sky.png';

const i18n = useI18n();
const router = useRouter();
const homeI18n = computed(() => {
  return i18n.value.sky.HOME;
});
function goDetail(url: string) {
  router.go(url);
}
</script>
<template>
  <BannerLevel2
    :background-image="banner"
    :title="homeI18n.BANNER_TITLE"
    :illustration="skyIllustration"
    class="banner"
  >
    <template #default>
      <p class="banner-introduction">{{ homeI18n.BANNER_INTRODUCTION }}</p>
    </template>
  </BannerLevel2>
  <AppContent>
    <div class="sky">
      <p class="sky-introduction word-style">
        {{ homeI18n.PLAN_INTRODUCE }}
      </p>
      <div class="sky-card-list">
        <OContainer
          v-for="item in homeI18n.CARD_DATA"
          :style="{ backgroundImage: `url(${item.IMG})` }"
          :key="item.TITLE"
          class="item"
        >
          <div class="item-content">
            <div class="item-title">{{ item.TITLE }}</div>
            <OButton
              animation
              type="text"
              size="small"
              class="item-link"
              @click="goDetail(item.URL)"
            >
              {{ i18n.sky.VIEW_MORE }}
              <template #suffixIcon>
                <OIcon><IconArrowRight /></OIcon>
              </template>
            </OButton>
          </div>
        </OContainer>
      </div>
      <p class="sky-event-collection word-style">
        {{ homeI18n.EVENT_COLLECTION }}
        <a :href="homeI18n.EVENT_COLLECTION_URL">{{
          homeI18n.EVENT_COLLECTION1
        }}</a>
      </p>
    </div>
  </AppContent>
</template>

<style scoped lang="scss">
.banner {
  :deep(.wrap) {
    .banner-illustration {
      top: inherit;
      transform: translateY(0);
      bottom: 0 !important;
    }
  }
}
.banner-introduction {
  font-size: var(--o-font-size-h6);
  color: var(--o-color-white);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
  }
}

.word-style {
  color: var(--o-color-text1);
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
}
.sky {
  .sky-card-list {
    display: grid;
    margin: 0 auto;
    margin-top: 40px;
    max-width: 936px;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 24px;
    grid-column-gap: 24px;
    @media screen and (max-width: 767px) {
      margin-top: 24px;
      grid-template-columns: 1fr;
    }
    .item {
      padding: var(--o-spacing-h2) 0 var(--o-spacing-h2) var(--o-spacing-h2);
      height: 192px;
      font-size: var(--o-font-size-h7);
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h6);
      background-position: right bottom;
      background-repeat: no-repeat;
      background-size: 180px 120px;
      @media screen and (max-width: 768px) {
        padding: 16px;
        height: 144px;
        font-size: var(--o-font-size-text);
        background-size: 150px 100px;
      }
      .item-content {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
      }
      .item-link {
        max-width: 256px;
        margin-top: var(--o-spacing-h2);
        padding: 0;
        margin-right: var(--o-spacing-h5);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        svg {
          color: var(--o-color-brand1);
        }
      }
      .item:hover {
        box-shadow: var(--o-shadow-l2_hover);
      }
    }
  }
  .sky-event-collection {
    margin-top: 40px;
    @media screen and (max-width: 768px) {
      margin-top: 24px;
    }
  }
}
</style>

<script lang="ts" setup>
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import { useI18n } from '@/i18n';

defineProps({
  services: {
    type: Object,
    default() {
      return {};
    },
  },
});
const i18n = useI18n();

function goDetail(url: string) {
  window.open(url);
}
</script>
<template>
  <ul class="search-service">
    <li v-for="service in services" :key="service.path" class="service-item">
      <div class="service-left">
        <span v-dompurify-html="service.title" class="service-title"></span
        ><span
          v-if="service.secondaryTitle"
          v-dompurify-html="service.secondaryTitle"
          class="service-intro"
        ></span>
      </div>
      <div class="service-right">
        <OButton
          animation
          type="outline"
          size="mini"
          @click.stop="goDetail(service.path)"
        >
          {{ i18n.search.service }}
          <template #suffixIcon>
            <OIcon><icon-arrow-right></icon-arrow-right></OIcon>
          </template>
        </OButton>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
.search-service {
  padding: 12px 24px;
  width: 100%;
  margin-bottom: 24px;
  background-color: var(--o-color-bg2);
  box-shadow: var(--o-shadow-l1);
  @media screen and (max-width: 768px) {
    width: calc(100% - 32px);
    padding: 4px 16px;
  }
  .service-item {
    display: flex;
    padding: 12px 0;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--o-color-division1);
    .service-left {
      .service-title {
        margin-right: 12px;
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-brand1);
      }
      .service-intro {
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
    @media screen and (max-width: 768px) {
      padding: 6px 0;
      .service-left {
        .service-title {
          margin-right: 8px;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
        .service-intro {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
    }
  }
  .service-item:first-child {
    border: none;
  }
  .o-button {
    margin-left: 12px;
    white-space: nowrap;
  }
}
</style>

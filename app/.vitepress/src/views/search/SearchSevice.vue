<script lang="ts" setup>
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
  <div class="search-service">
    <h3>{{ i18n.search.service }}</h3>
    <div v-for="service in services" :key="service.path" class="service-item">
      <div class="service-left">
        <a @click.stop="goDetail(service.path)" v-dompurify-html="service.title" class="service-title"></a>
        <p
          v-if="service.secondaryTitle"
          v-dompurify-html="service.secondaryTitle"
          class="service-intro"
        ></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search-service {
  background-color: var(--o-color-bg2);
  box-shadow: var(--o-shadow-l1);
  padding: var(--o-spacing-h2);
  margin-bottom: var(--o-spacing-h3);
  h3 {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
  }
  .service-item {
    padding-top: var(--o-spacing-h4);
    .service-title {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-brand1);
    }
    .service-intro {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-top: var(--o-spacing-h8);
      color: var(--o-color-text4);
    }
  }
}
</style>

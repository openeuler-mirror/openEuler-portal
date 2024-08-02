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
  background-color: var(--e-color-bg2);
  box-shadow: var(--e-shadow-l1);
  padding: var(--e-spacing-h2);
  margin-bottom: var(--e-spacing-h3);
  h3 {
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    color: var(--e-color-text1);
  }
  .service-item {
    padding-top: var(--e-spacing-h4);
    .service-title {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-brand1);
    }
    .service-intro {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      margin-top: var(--e-spacing-h8);
      color: var(--e-color-text4);
    }
  }
}
</style>

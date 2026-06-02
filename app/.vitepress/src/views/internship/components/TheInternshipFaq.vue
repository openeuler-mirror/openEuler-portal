<script setup lang="ts">
import { useI18n } from '@/i18n';
import { computed } from 'vue';

const i18n = useI18n();

const faqList = computed(() => [
  { q: i18n.value.internship.faqQ1, a: i18n.value.internship.faqA1 },
  { q: i18n.value.internship.faqQ2, a: i18n.value.internship.faqA2 },
  { q: i18n.value.internship.faqQ3, a: i18n.value.internship.faqA3 },
]);
</script>

<template>
  <div class="internship-faq-container">
    <div v-for="(item, index) in faqList" :key="index" class="faq-item">
      <p class="faq-question">{{ item.q }}</p>
      <p class="faq-answer">{{ item.a }}</p>
      <p v-if="index === 2" class="faq-answer faq-answer-tip">{{ i18n.internship.moreQuestion }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.internship-faq-container {
  background-color: var(--o-color-fill2);
  border-radius: 4px;
  padding: 24px;
}

.faq-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--o-color-control4);

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.faq-question {
  @include text1;
  font-weight: 600;
  margin-bottom: 12px;
}

.faq-answer {
  @include text1;
  color: var(--o-color-info3);
}

.faq-answer-tip {
  color: var(--o-color-control3);
  @include title-margin-top3;
}

@include respond-to('>pc_b') {
  .internship-faq-container {
    padding: 32px;
  }
}

@include respond-to('<=pad_v') {
  .internship-faq-container {
    padding: 12px;
  }
}
</style>

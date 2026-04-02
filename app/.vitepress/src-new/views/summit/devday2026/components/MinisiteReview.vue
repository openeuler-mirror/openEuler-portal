<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OLink } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';

defineProps({
  reviewData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { lePadV, lePad } = useScreen();

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '0 16px';
  }
  return '0 24px';
});
</script>

<template>
  <div class="minisite-review">
    <p class="floor-title">{{ reviewData.title }}</p>
    <ORow :gap="gap" wrap="wrap" class="review-list">
      <OCol v-for="(item, i) in reviewData.links" :key="i" flex="0 0 100%">
        <OLink color="primary" :href="item.url" target="_blank" hover-underline>
          <p>{{ item.label }}</p>
        </OLink>
      </OCol>
    </ORow>
  </div>
</template>

<style lang="scss" scoped>
.review-list {
  margin-top: 40px;
}
.o-col {
  text-align: center;
}
.o-link {
  @include text2;
}

@include respond-to('<=laptop') {
  .review-list {
    margin-top: 24px;
  }
}
@include respond-to('<=pad') {
  .review-list {
    margin-top: 16px;
  }
}
@include respond-to('<=pad_v') {
  .review-list {
    margin-top: 12px;
  }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';
import { useScreen } from '~@/composables/useScreen';
import { OSkeleton, OSkeletonText } from '@opensig/opendesign';

const { lePad } = useScreen();

const skeletonNumber = computed(() => {
  return lePad.value ? 5 : 5;
});
</script>

<template>
  <OSkeleton
    v-for="item in skeletonNumber"
    :key="item"
    animation
    class="skeleton-fullname"
  >
    <template #template>
      <OSkeletonText class="title" animation :rows="1" />
      <OSkeletonText class="detail" animation :rows="2" />
      <OSkeletonText class="from" animation :rows="1" />
    </template>
  </OSkeleton>
</template>

<style lang="scss" scoped>
.skeleton-fullname {
  margin-bottom: 40px;
  .o-skeleton-item {
    --skeleton-item-gap: 8px;
  }
  .o-skeleton-text {
    --skeleton-height: 100%;
  }

  .title {
    width: 320px;
    height: 28px;
  }
  .detail {
    height: 48px;
    margin: 8px 0;
    overflow: hidden;
  }
  .from {
    height: 18px;
    width: 220px;
  }
}
</style>

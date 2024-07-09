<script lang="ts" setup>
import { computed } from 'vue';

import { useCommon } from '@/stores/common';

defineProps({
  topicData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="agenda">
    
  </div>
</template>

<style lang="scss" scoped>

</style>

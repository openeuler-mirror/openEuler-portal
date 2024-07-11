<script lang="ts" setup>
import { computed } from 'vue';

import { useCommon } from '@/stores/common';

defineProps({
  introduceData: {
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
  <div class="introduce">
    <div class="title-img">
      {{ introduceData.title }}
      <img
        class="introduction-img"
        :src="isDark ? introduceData.titleImDark : introduceData.titleImg"
        alt=""
      />
    </div>
    <ul>
      <li v-for="(item, i) in introduceData.list" :key="i" :class="{'dark': isDark}">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
li {
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h6);
  color: rgba(0, 0, 0, 0.8);
  margin-top: 28px;
  &:first-of-type {
    margin-top: 0;
  }
  @media (max-width: 767px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    margin-top: 16px;
  }
}
.dark {
  color: rgba(255, 255, 255, 0.8);
}
</style>

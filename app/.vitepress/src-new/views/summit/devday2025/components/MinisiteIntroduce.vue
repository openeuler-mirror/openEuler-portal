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
      <li v-for="(item, i) in introduceData.list" :key="i">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
li {
  @include h4;
  color: var(--o-color-info2);
  margin-top: 40px;
  text-align: justify;
  &:first-of-type {
    margin-top: 0;
  }
  @include respond-to('<=pad_v') {
    font-size: 12px;
    line-height: 18px;
    margin-top: 16px;
  }
}
</style>

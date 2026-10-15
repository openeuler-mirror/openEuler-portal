<script setup lang="ts">
import { computed } from 'vue';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntroduce from './components/SummitIntroduce.vue';
import SummitCallFor from './components/SummitCallFor.vue';
import SummitPrevious from './components/SummitPrevious.vue';

import summitContent from '#content/interaction/summit-list/summit2026';

import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

// YAML 字段名为 snake_case，子组件期望 camelCase，递归转换
function snakeToCamel(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
      result[camelKey] = snakeToCamel((obj as Record<string, unknown>)[key]);
    }
    return result;
  }
  return obj;
}

const summitData = computed(
  () => snakeToCamel(summitContent[locale.value]) as typeof summitContent[typeof locale.value]
);
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <ContentWrapper vertical-padding="0">
    <SummitIntroduce :introduce-data="summitData.introduce" />
    <SummitCallFor :callfor-data="summitData.callfor" />
    <SummitPrevious :previous-data="summitData.previous" />
  </ContentWrapper>
</template>

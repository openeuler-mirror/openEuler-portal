<script lang="ts" setup>
import { ref, computed } from 'vue';
import { OTab, OTabPane } from '@opensig/opendesign';
import MarkdownCommonLayout from './MarkdownCommonLayout.vue';
import MarkdownCardLayout from './MarkdownCardLayout.vue';
import MarkdownFlatLayout from './MarkdownFlatLayout.vue';
import MarkdownLogoList from './MarkdownLogoList.vue';
import MarkdownTable from './MarkdownTable.vue';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
});
const activeTab = ref('');

const tabs = computed(() => {
  const result = [];
  
  let currentTab = null;
  
  for (let i = 0; i < props.data.length; i++) {
    const item = props.data[i];
    
    // 遇到 h2，开始新的 tab
    if (item.type === 'h2') {
      // 保存之前的 tab（如果有）
      if (currentTab) {
        result.push({ ...currentTab });
      }
      
      // 创建新的 tab
      currentTab = {
        value: item.content,     // tab 的值
        label: item.content,     // tab 的标签
        content: []              // 这个 tab 下的内容
      };
    } else if (currentTab) {
      currentTab.content.push(item);
    }
  }
  
  // 添加最后一个 tab
  if (currentTab) {
    result.push(currentTab);
  }
  
  activeTab.value = result[0].value;
  return result;
});

const componentType = (tabData: any) => {
  const isTable = tabData.some(item => item.type === 'table')
  if (isTable) {
    return 'table';
  }
  
  const hasLink = tabData.some(item => item.type === 'a');
  if (hasLink) {
    return 'card';
  }
  
  const h2Count = tabData.filter(item => item.type === 'h3').length;
  if (h2Count % 2 === 0 && h2Count >= 4) {
    return 'flat';
  }

  const onlyImages = tabData.every(item => item.type === 'img');
  if (onlyImages) {
    return 'image';
  }
  
  return 'common';
}
</script>

<template>
  <OTab v-model="activeTab" :line="false">
    <OTabPane
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      :label="tab.label"
    >
      <MarkdownCardLayout v-if="componentType(tab.content) === 'card'" :data="tab.content" />
      <MarkdownFlatLayout v-if="componentType(tab.content) === 'flat'" :data="tab.content" />
      <MarkdownLogoList v-if="componentType(tab.content) === 'image'" :data="tab.content" />
      <MarkdownCommonLayout v-if="componentType(tab.content) === 'common'" :data="tab.content" />
      <MarkdownTable v-if="componentType(tab.content) === 'table'" :data="tab.content" />
    </OTabPane>
  </OTab>
</template>

<style lang="scss" scoped>
</style>
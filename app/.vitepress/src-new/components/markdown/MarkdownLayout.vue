<script setup>
import { ref, onMounted, useSlots, computed } from 'vue';
import { OLink } from '@opensig/opendesign';
import MarkdownCardLayout from './MarkdownCardLayout.vue';
import MarkdownFlatLayout from './MarkdownFlatLayout.vue';
import MarkdownTabsLayout from './MarkdownTabsLayout.vue';
import MarkdownCommonLayout from './MarkdownCommonLayout.vue';
import MarkdownLogoList from './MarkdownLogoList.vue';
import MarkdownTable from './MarkdownTable.vue';
import MarkdownBanner from './MarkdownBanner.vue';
import AppSection from '../AppSection.vue';

const slots = useSlots();
const nodesData = ref([]);
const sectionTitle = ref('');
const sectionSubTitle = ref('');
const sectionFooter = ref('');

onMounted(() => {
  if (!slots.default) return;
  const slotContent = slots.default();
  console.log(slotContent)
  
  nodesData.value = slotContent.map(node => {
    if (!node || typeof node !== 'object') return null;
    
    let targetNode = null;

    if (['h1', 'h2', 'h3'].includes(node.type)) {
      targetNode  = {
        type: node.type,
        content: cleanZeroWidthSpaces(node.children[0]?.children),
      }
    } else if (node.type === 'p') {
      // 链接或图片
      if (Array.isArray(node.children)) {
        const child = node.children[0];
        if (child.type === 'a') {
          targetNode = {
            type: child.type,
            content: child.children,
            link: child.props.href,
          }
        } else if (child.type === 'strong') {
          targetNode  = {
            type: child.type,
            content: child.children,
          }
        } else {
          targetNode = {
            type: child.type,
            alt: child.props.alt,
            src: child.props.src,
          }
        }
      } else {
        targetNode  = {
          type: node.type,
          content: node.children,
        }
      }
    } else if (node.type === 'table') {
      // 提取表头信息
      const thead = node.children[0].children[0].children.map(item => 
        item.children
      );

      // 标注哪些列里有链接

      // 提取表格数据行
      const tableData = node.children[1].children.map(row => {
        const rowData = {};
        
        // 遍历每一行的单元格
        row.children.forEach((cell, index) => {
          const cellContent = cell.children[0]?.type === 'a' ? [cell.children[0].children.trim()] : cell.children.trim();
          const headerKey = thead[index];
          rowData[headerKey] = cellContent;
        });
        
        return rowData;
      });

      targetNode  = {
        type: node.type,
        columns: thead,
        data: tableData,
      }
    } else if (node.type === 'ul') {
      const list = node.children.map(li => li.children);
      targetNode  = {
        type: node.type,
        content: list,
      }
    }
    return targetNode;
  }).filter(Boolean);

  if (nodesData.value[0].type !== 'img') { 
    sectionTitle.value = nodesData.value.shift().content;
    if (nodesData.value[0].type === 'p') {
      sectionSubTitle.value = nodesData.value.shift().content;
    }
    if (nodesData.value[nodesData.value.length - 2].type === 'h1' && nodesData.value[nodesData.value.length - 1].type === 'a') {
      sectionFooter.value = nodesData.value.pop();
      nodesData.value.pop();
    }
  }
});

function cleanZeroWidthSpaces(str) {
  return str.replace(/[\u200B-\u200D\uFEFF]/g, '');
}

const componentType = computed(() => {
  if (nodesData.value[0]?.type === 'img' && !sectionTitle.value) {
    return 'banner';
  }
  const isTable = nodesData.value.some(item => item.type === 'table')
  if (isTable) {
    return 'table';
  }
  // 1. 检查是否有 h3
  const hasH3 = nodesData.value.some(item => item.type === 'h3');
  if (hasH3) {
    return 'tab';
  }
  
  // 2. 检查是否有 a
  const hasLink = nodesData.value.some(item => item.type === 'a');
  if (hasLink) {
    return 'card';
  }
  
  // 3. 检查 h2 数量是否为偶数且大于四个，将会被识别成flat
  const h2Count = nodesData.value.filter(item => item.type === 'h2').length;
  if (h2Count % 2 === 0 && h2Count >= 4) {
    return 'flat';
  }

  // 4. 检查是否全为图片
  const onlyImages = nodesData.value.every(item => item.type === 'img');
  if (onlyImages) {
    return 'image';
  }
  
  return 'common';
})

const footerVisible = computed(() => {
  const url = sectionFooter.value?.link;
  if (typeof url === 'string') {
    return url.includes('mailto:');
  }
  return false;
})
</script>

<template>
  <MarkdownBanner v-if="componentType === 'banner'" :data="nodesData" />
  <AppSection
    v-else
    :title="sectionTitle"
    :subtitle="sectionSubTitle"
    :footer="sectionFooter.content"
    :footer-href="sectionFooter.link"
    class="markdown-section"
  >
    <MarkdownCardLayout v-if="componentType === 'card'" :data="nodesData" />
    <MarkdownFlatLayout v-if="componentType === 'flat'" :data="nodesData" />
    <MarkdownTabsLayout v-if="componentType === 'tab'" :data="nodesData" />
    <MarkdownLogoList v-if="componentType === 'image'" :data="nodesData" />
    <MarkdownCommonLayout v-if="componentType === 'common'" :data="nodesData" />
    <MarkdownTable v-if="componentType === 'table'" :data="nodesData" />
    <template v-if="footerVisible" #footer>
      <span>{{sectionFooter.content }}</span>
      <OLink :href="sectionFooter.link" target="_blank" color="primary" hover-underline v-analytics.bubble="{ target: sectionFooter.content }">
        {{ sectionFooter?.link.replace('mailto:', '') }}
      </OLink>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
.markdown-section {
  :deep(.section-subtitle) {
    margin-top: var(--o-gap-4);
  }

  :deep(.section-body) {
    margin-top: var(--o-gap-7);
  }

  :deep(.o-tab-body) {
    margin-top: var(--o-gap-5);
  }
}
</style>
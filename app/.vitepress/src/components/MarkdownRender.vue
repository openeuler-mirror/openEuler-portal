<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { handleMarkdown } from '@/shared/markdown';

import MermaidPlugIn from '@/shared/markdown-it-mermaid';

import mermaid from 'mermaid';

import { useOeep } from '@/stores/oeep';

const props = defineProps({
  statement: {
    type: String,
    default: '',
  },
});

const mkit = handleMarkdown();
mkit.use(MermaidPlugIn);

watch(
  () => props.statement,
  (val) => {
    useOeep().setStatementHtml(mkit.render(val));
    nextTick(() => {
      if (document.querySelector('#mermaid')) {
        mermaid.run({
          querySelector: '#mermaid',
        });
      }
    });
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div v-dompurify-html="useOeep().statementHtml" class="markdown"></div>
</template>

<style lang="scss" scoped>
.statement {
  max-width: 1472px;
  margin: 0 auto;
  padding-top: 80px;
  padding-left: 16px;
  padding-right: 16px;
}
</style>

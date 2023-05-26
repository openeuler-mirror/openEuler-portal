<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { handleMarkdown } from '@/shared/markdown';
import type MarkdownIt from 'markdown-it';
import { useOeep } from '@/stores/oeep';

const props = defineProps({
  statement: {
    type: String,
    default: '',
  },
});

let markdownItMermaid: MarkdownIt.PluginSimple | null = null;
const mkit = handleMarkdown();

onMounted(async () => {
  await import('@/shared/markdown-it-mermaid')
    .then((m) => {
      markdownItMermaid = m.default;
      if (!markdownItMermaid) return;
      mkit.use(markdownItMermaid);
    })
    .catch((err) => {
      console.error(err);
    });
  useOeep().setStatementHtml(mkit.render(props.statement));
});
watch(
  () => props.statement,
  (val) => {
    useOeep().setStatementHtml(mkit.render(val));
  }
);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown" v-html="useOeep().statementHtml"></div>
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

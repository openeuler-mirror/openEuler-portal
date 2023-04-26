<script setup lang="ts">
import { ref, watch } from 'vue';
import { handleMarkdown } from '@/shared/markdown';

const props = defineProps({
  statement: {
    type: String,
    default: '',
  },
});

const mkit = handleMarkdown();

const statementHtml = ref(mkit.render(props.statement));
watch(
  () => props.statement,
  (val) => {
    statementHtml.value = mkit.render(val);
  }
);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown" v-html="statementHtml"></div>
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

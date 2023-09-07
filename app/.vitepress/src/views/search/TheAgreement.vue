<script setup lang="ts">
import showMd from 'markdown-it';
import agree from './agree.md?raw'

// 转换md语法
function convertMd(data: string) {
  return showMd().render(data);
}
</script>
<template>
  <div v-dompurify-html="convertMd(agree)" class="markdown"></div>
</template>
<style lang="scss" scoped></style>

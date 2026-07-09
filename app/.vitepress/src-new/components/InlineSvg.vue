<script lang="ts" setup>
defineProps<{ raw: string }>();
</script>

<template>
  <span class="inline-svg" v-dompurify-html="raw"></span>
</template>

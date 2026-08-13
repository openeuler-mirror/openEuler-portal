<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const match = window.location.pathname.match(/^\/(zh|en)\//);
  const locale = match?.[1] ?? 'zh';
  window.location.replace(`/${locale}/interaction/event-list/latest/`);
});
</script>

<template>
  <div class="event-detail-redirect"></div>
</template>

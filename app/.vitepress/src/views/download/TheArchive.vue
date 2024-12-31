<!-- ---------------------旧路由页面仅作路由重定向----------------------------->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';

const router = useRouter();
const { lang } = useData();

onMounted(() => {
  router.go(`/${lang.value}/download/?archive=true`);
});
</script>
<template></template>

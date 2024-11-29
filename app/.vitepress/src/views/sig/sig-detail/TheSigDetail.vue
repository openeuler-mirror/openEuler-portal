<!-- ---------------------旧路由页面仅作路由重定向----------------------------->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';

import { getUrlParam } from '@/shared/utils';

const router = useRouter();
const sigName = ref('');
const { lang } = useData();

onMounted(() => {
  sigName.value = getUrlParam('name');
  if (sigName.value) {
    router.go(`/${lang.value}/sig/${sigName.value}`);
  } else {
    router.go(`/${lang.value}/sig/sig-list/`);
  }
});
</script>
<template></template>

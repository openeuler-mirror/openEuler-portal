<template>
  <div class="fireContent">
    <div v-for="item in docFile" :key="item" class="miniContent">
      <MiniDocs :item="item" />
    </div>
  </div>
</template>

<script setup>
import MiniDocs from '@/components/nestos/MiniDocs.vue';
import { docFile } from '../utils/resource';
</script>

<style lang="scss" scoped>
.fireContent {
  width: 100%;
  display: flex;

  .miniContent {
    width: 100%;
  }
}
</style>

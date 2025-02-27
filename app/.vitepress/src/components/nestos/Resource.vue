<template>
  <div class="resource">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="i18n.nestos.resource.mirror" name="mirror">
        <Mirror />
      </el-tab-pane>
      <el-tab-pane :label="i18n.nestos.resource.document" name="document">
        <Document />
      </el-tab-pane>
      <el-tab-pane :label="i18n.nestos.resource.other" name="other">
        <Other />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';
import Mirror from './resources/mirror.vue';
import Document from './resources/document.vue';
import Other from './resources/other.vue';
const i18n = useI18n();
const activeName = ref('mirror');
</script>

<style lang="scss" scoped>
.resource {
  width: 100%;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vitepress';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';
import type { TabsPaneContext } from 'element-plus';

const i18n = useI18n();
const { lang } = useData();
const router = useRouter();
const activeName = ref('');
const preName = ref('');
// init:
if (router.route.path.includes('detail')) {
  activeName.value = 'second';
  preName.value = 'second';
} else {
  activeName.value = 'first';
  preName.value = 'first';
}
const handleClick = () => {
  if (preName.value === activeName.value) return;
  if (activeName.value === 'first') {
    router.go(`/${lang.value}/community/contribution/`);
  } else {
    router.go(`/${lang.value}/community/contribution/detail`);
  }
};
</script>
<template>
  <div class="tab-wrapper">
    <OTabs v-model="activeName" @tab-click="handleClick">
      <OTabPane :label="i18n.contribution.LOOK_MAP" name="first"></OTabPane>
      <OTabPane :label="i18n.contribution.LOOK_DESC" name="second"></OTabPane>
    </OTabs>
  </div>
</template>

<style lang="scss" scoped>
.tab-wrapper {
  background-color: var(--e-color-bg2);
  display: flex;
  justify-content: center;
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
}
</style>

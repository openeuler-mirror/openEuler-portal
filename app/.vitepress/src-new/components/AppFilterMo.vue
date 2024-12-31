<script lang="ts" setup>
import { OIcon } from '@opensig/opendesign';

import IconFilter from '~icons/app-new/icon-filter.svg';

defineProps({
  label: {
    type: String,
  },
});
</script>
<template>
  <div class="app-filter-mo">
    <span class="filter-label">
      {{ label }}
    </span>
    <OIcon><IconFilter /> </OIcon>
  </div>
</template>

<style scoped lang="scss">
.app-filter-mo {
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  align-items: center;
  @include text2;
  color: var(--o-color-info2);
  .o-icon {
    margin-left: 2px;
    // TODO: 为什么有22px 大小的高保真
    font-size: 22px;
  }
}
</style>

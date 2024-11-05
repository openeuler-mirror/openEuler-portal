<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '~@/i18n';
import { OIcon } from '@opensig/opendesign';

import DropInfo from './DropInfo.vue';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';
import IconOutLink from '~icons/app/icon-out-link.svg';

const i18n = useI18n();
const sourceCode = computed(() => i18n.value.header.SOURCE_CODE);

const itemChange = (data: any) => {
  window.open(data.url, '_blank');
}
</script>

<template>
  <DropInfo :data="sourceCode" :field="'URL'" @item-change="itemChange">
    <template #title>
      <span>{{ $t('header.CODE') }}</span>
      <OIcon>
        <IconChevronDown class="icon"/>
      </OIcon>
    </template>
    <template #item="{ item }">
      {{ item.NAME }}
      <OIcon>
        <IconOutLink class="icon" />
      </OIcon>
    </template>
  </DropInfo>
</template>

<style lang="scss" scoped>
.icon {
  font-size: var(--o-icon_size_control-xs);
  margin-left: var(--o-gap-1);
}
</style>
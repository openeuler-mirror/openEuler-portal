<script setup lang="ts">
import { useCookieStore } from '~@/stores/common';

import { useLocale } from '~@/composables/useLocale';
const { t } = useLocale();

const cookieStore = useCookieStore();

const onClick = () => {
  cookieStore.isNoticeVisible = !cookieStore.isNoticeVisible;
};
</script>

<template>
  <span class="reset-cookie" @click="onClick">{{ t('cookie.setting') }} </span>
</template>

<style lang="scss" scoped>
.reset-cookie {
  cursor: pointer;
  color: var(--o-color-link1);
  &:hover {
    color: var(--o-color-link2);
  }
  &:active {
    color: var(--o-color-link3);
  }
}
</style>
